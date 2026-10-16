import { useEffect, useRef, useState } from 'react';
import { useScoreboard } from '../../hooks/useScoreboard.js';
import ClockCard from './ClockCard.jsx';
import MatchCard from './MatchCard.jsx';
import OverlayCard from './OverlayCard.jsx';
import TeamCard from './TeamCard.jsx';

const STATUS = { online: 'เชื่อมต่อแล้ว', offline: 'หลุดการเชื่อมต่อ กำลังต่อใหม่…', connecting: 'กำลังเชื่อมต่อ…' };

export default function ControlPanel() {
  const { state, status, canUndo, dispatch, serverNow } = useScoreboard();
  const [lan, setLan] = useState([]);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    fetch('/api/info')
      .then((r) => r.json())
      .then((d) => setLan(d.lan || []))
      .catch(() => {});
  }, []);

  // คลิกปุ่มด้วยเมาส์แล้วไม่ค้างโฟกัส (กัน Space ไปกดปุ่มเดิมซ้ำ)
  useEffect(() => {
    const onUp = (e) => {
      const b = e.target.closest?.('button');
      if (b && e.pointerType) setTimeout(() => b.blur(), 0);
    };
    document.addEventListener('pointerup', onUp);
    return () => document.removeEventListener('pointerup', onUp);
  }, []);

  // คีย์ลัด
  useEffect(() => {
    const onKey = (e) => {
      const s = stateRef.current;
      const el = e.target instanceof Element ? e.target : null;
      if (!s || el?.closest('input, select, textarea')) return;
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === 'z') {
        e.preventDefault();
        dispatch({ type: 'undo' });
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const score = { q: ['home', 1], a: ['home', -1], p: ['away', 1], l: ['away', -1] }[k];
      if (score) return dispatch({ type: 'score/add', side: score[0], delta: score[1] });
      if (k === ' ' && !el?.closest('button')) {
        e.preventDefault();
        dispatch({ type: s.clock.running ? 'clock/pause' : 'clock/start' });
      }
      if (k === 'h') dispatch({ type: 'overlay/update', visible: !s.overlay.visible });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dispatch]);

  const port = window.location.port ? `:${window.location.port}` : '';

  return (
    <div className="cp">
      <header className="cp-top">
        <div className="brand">
          <span className="brand-mark">2:1</span>
          <div>
            <strong>Scoreboard Studio</strong>
            <small>หน้าควบคุมคะแนน</small>
          </div>
        </div>
        <div className="top-right">
          {lan[0] && (
            <span className="lan" title="เปิดลิงก์นี้บนมือถือที่ต่อ Wi-Fi เดียวกันเพื่อควบคุมจากมือถือ">
              📱 {lan[0]}
              {port}/control
            </span>
          )}
          <span className={`conn ${status}`}>
            <i /> {STATUS[status]}
          </span>
        </div>
      </header>

      {!state ? (
        <div className="cp-loading">กำลังโหลดข้อมูลจาก server…</div>
      ) : (
        <main className="cp-grid">
          <TeamCard side="home" team={state.home} dispatch={dispatch} />
          <div className="cp-center">
            <div className="scoreline">
              <span style={{ color: state.home.color }}>{state.home.short}</span>
              <b>
                {state.home.score} – {state.away.score}
              </b>
              <span style={{ color: state.away.color }}>{state.away.short}</span>
            </div>
            <ClockCard clock={state.clock} serverNow={serverNow} dispatch={dispatch} />
            <div className="action-row">
              <button className="btn" onClick={() => dispatch({ type: 'undo' })} disabled={!canUndo}>
                ↶ ย้อนกลับ <kbd>Ctrl Z</kbd>
              </button>
              <button className="btn" onClick={() => dispatch({ type: 'teams/swap' })}>
                ⇄ สลับฝั่ง
              </button>
              <button
                className="btn danger-outline"
                onClick={() => window.confirm('เริ่มแมตช์ใหม่? คะแนนและเวลาจะกลับเป็น 0') && dispatch({ type: 'match/reset' })}
              >
                เริ่มแมตช์ใหม่
              </button>
            </div>
          </div>
          <TeamCard side="away" team={state.away} dispatch={dispatch} />
          <MatchCard state={state} dispatch={dispatch} />
          <OverlayCard overlay={state.overlay} dispatch={dispatch} />
        </main>
      )}

      <footer className="cp-foot">
        คีย์ลัด: <kbd>Q</kbd>/<kbd>A</kbd> คะแนนทีมเหย้า · <kbd>P</kbd>/<kbd>L</kbd> คะแนนทีมเยือน · <kbd>Space</kbd> เริ่ม/หยุดเวลา ·{' '}
        <kbd>H</kbd> ซ่อน/แสดง overlay · <kbd>Ctrl Z</kbd> ย้อนกลับ
      </footer>
    </div>
  );
}
