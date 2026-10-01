const KEY_PROGRESS = 'etalk.progress';
const KEY_SETTINGS = 'etalk.settings';

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore (private mode) */
  }
};

export const DEFAULT_SETTINGS = {
  playerName: 'Ploy',
  playerGender: 'female',
  rate: 0.9,
  showThai: true,
  autoPlay: true,
};

export const loadSettings = () => ({ ...DEFAULT_SETTINGS, ...read(KEY_SETTINGS, {}) });
export const saveSettings = (s) => write(KEY_SETTINGS, s);

export const loadProgress = () => read(KEY_PROGRESS, {});
export function saveResult(lessonId, { stars, score }) {
  const all = loadProgress();
  const prev = all[lessonId] || { stars: 0, score: 0, plays: 0 };
  all[lessonId] = {
    stars: Math.max(prev.stars, stars),
    score: Math.max(prev.score, score),
    plays: prev.plays + 1,
  };
  write(KEY_PROGRESS, all);
  return all;
}
