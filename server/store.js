import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'state.json');
const SIDES = ['home', 'away'];
const HISTORY_LIMIT = 50;

export const DEFAULT_STATE = {
  title: 'Friendly Match',
  period: '1st Half',
  home: { name: 'Home Team', short: 'HOM', color: '#E23B3B', logo: '', score: 0 },
  away: { name: 'Away Team', short: 'AWY', color: '#2F6FED', logo: '', score: 0 },
  clock: { direction: 'up', durationMs: 45 * 60 * 1000, elapsedMs: 0, running: false, startedAt: null },
  overlay: { visible: true, theme: 'bar', showClock: true, showTitle: true },
};

const THEMES = ['bar', 'corner', 'broadcast'];
const str = (v, max) => String(v ?? '').slice(0, max);
const isColor = (v) => /^#[0-9a-f]{6}$/i.test(v);
const elapsedOf = (c, now) => c.elapsedMs + (c.running ? now - c.startedAt : 0);

// การกระทำที่ "ย้อนกลับ" ได้ (ไม่รวมนาฬิกา เพราะเวลาเดินตลอด)
const UNDOABLE = new Set(['score/add', 'score/set', 'team/update', 'teams/swap', 'match/update', 'match/reset']);

function reduce(s, a, now) {
  const next = structuredClone(s);
  const c = next.clock;
  const side = SIDES.includes(a.side) ? a.side : null;

  switch (a.type) {
    case 'score/add':
      if (!side) return s;
      next[side].score = Math.max(0, next[side].score + (Number(a.delta) || 0));
      break;
    case 'score/set':
      if (!side) return s;
      next[side].score = Math.max(0, Math.floor(Number(a.value) || 0));
      break;
    case 'team/update': {
      if (!side) return s;
      const t = next[side];
      const p = a.patch || {};
      if ('name' in p) t.name = str(p.name, 40);
      if ('short' in p) t.short = str(p.short, 5).toUpperCase();
      if ('color' in p && isColor(p.color)) t.color = p.color;
      if ('logo' in p) t.logo = str(p.logo, 500);
      break;
    }
    case 'teams/swap':
      [next.home, next.away] = [next.away, next.home];
      break;
    case 'match/update':
      if ('title' in a) next.title = str(a.title, 60);
      if ('period' in a) next.period = str(a.period, 20);
      break;
    case 'match/reset':
      next.home.score = 0;
      next.away.score = 0;
      Object.assign(c, { elapsedMs: 0, running: false, startedAt: null });
      break;

    case 'clock/start':
      if (c.running) return s;
      if (c.direction === 'down' && c.elapsedMs >= c.durationMs) return s;
      Object.assign(c, { running: true, startedAt: now });
      break;
    case 'clock/pause':
      if (!c.running) return s;
      Object.assign(c, { elapsedMs: elapsedOf(c, now), running: false, startedAt: null });
      break;
    case 'clock/expire':
      Object.assign(c, { elapsedMs: c.durationMs, running: false, startedAt: null });
      break;
    case 'clock/reset':
      Object.assign(c, { elapsedMs: 0, running: false, startedAt: null });
      break;
    case 'clock/set': {
      // ตั้งเวลาที่ "แสดงบนจอ"
      const ms = Math.max(0, Number(a.ms) || 0);
      c.elapsedMs = c.direction === 'down' ? Math.max(0, c.durationMs - ms) : ms;
      if (c.running) c.startedAt = now;
      break;
    }
    case 'clock/config':
      if (a.direction === 'up' || a.direction === 'down') c.direction = a.direction;
      if (Number(a.durationMs) > 0) c.durationMs = Math.min(Number(a.durationMs), 24 * 3600 * 1000);
      Object.assign(c, { elapsedMs: 0, running: false, startedAt: null });
      break;

    case 'overlay/update': {
      const o = next.overlay;
      if (typeof a.visible === 'boolean') o.visible = a.visible;
      if (THEMES.includes(a.theme)) o.theme = a.theme;
      if (typeof a.showClock === 'boolean') o.showClock = a.showClock;
      if (typeof a.showTitle === 'boolean') o.showTitle = a.showTitle;
      break;
    }
    default:
      return s;
  }
  return next;
}

function load() {
  try {
    const saved = JSON.parse(fs.readFileSync(FILE, 'utf8'));
    return {
      ...DEFAULT_STATE,
      ...saved,
      home: { ...DEFAULT_STATE.home, ...saved.home },
      away: { ...DEFAULT_STATE.away, ...saved.away },
      clock: { ...DEFAULT_STATE.clock, ...saved.clock },
      overlay: { ...DEFAULT_STATE.overlay, ...saved.overlay },
    };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

export function createStore() {
  let state = load();
  const history = [];
  const listeners = new Set();
  let saveTimer;
  let expireTimer;

  const persist = () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      fs.writeFile(FILE, JSON.stringify(state, null, 2), () => {});
    }, 300);
  };

  // นับถอยหลังถึง 0 แล้วหยุดเอง
  const scheduleExpire = () => {
    clearTimeout(expireTimer);
    const c = state.clock;
    if (!c.running || c.direction !== 'down') return;
    const remaining = c.durationMs - elapsedOf(c, Date.now());
    expireTimer = setTimeout(() => store.dispatch({ type: 'clock/expire' }), Math.max(0, remaining));
  };

  const commit = (next) => {
    state = next;
    persist();
    scheduleExpire();
    listeners.forEach((fn) => fn(state));
  };

  const store = {
    get state() {
      return state;
    },
    get canUndo() {
      return history.length > 0;
    },
    dispatch(action) {
      if (!action || typeof action.type !== 'string') return;
      if (action.type === 'undo') {
        const prev = history.pop();
        if (!prev) return;
        // คืนค่าทุกอย่างยกเว้นนาฬิกา (ให้เวลาเดินต่อตามจริง)
        return commit({ ...prev, clock: state.clock, overlay: state.overlay });
      }
      const next = reduce(state, action, Date.now());
      if (next === state) return;
      if (UNDOABLE.has(action.type)) {
        history.push(state);
        if (history.length > HISTORY_LIMIT) history.shift();
      }
      commit(next);
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };

  scheduleExpire();
  return store;
}
