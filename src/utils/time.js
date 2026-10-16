export function clockValue(clock, now) {
  const elapsed = clock.elapsedMs + (clock.running ? now - clock.startedAt : 0);
  return clock.direction === 'down' ? Math.max(0, clock.durationMs - elapsed) : elapsed;
}

// นับถอยหลังปัดขึ้น (เหลือ 0.4 วิ ยังแสดง 00:01) / นับขึ้นปัดลง
export function formatClock(ms, direction = 'up') {
  const total = direction === 'down' ? Math.ceil(ms / 1000) : Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// "12:34" | "12" (นาที) → ms
export function parseClock(text) {
  const parts = String(text).trim().split(':').map((p) => p.trim());
  if (!parts.length || parts.some((p) => p === '' || !/^\d+$/.test(p)) || parts.length > 2) return null;
  const [m, s = '0'] = parts;
  if (Number(s) >= 60) return null;
  return (Number(m) * 60 + Number(s)) * 1000;
}
