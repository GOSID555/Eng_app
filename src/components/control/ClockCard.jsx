import { useState } from 'react';
import { useClockValue } from '../../hooks/useClockValue.js';
import { formatClock, parseClock } from '../../utils/time.js';

const ADJUST = [-60000, -10000, -1000, 1000, 10000, 60000];
const label = (ms) => `${ms > 0 ? '+' : '−'}${Math.abs(ms) >= 60000 ? `${Math.abs(ms) / 60000}m` : `${Math.abs(ms) / 1000}s`}`;

export default function ClockCard({ clock, serverNow, dispatch }) {
  const ms = useClockValue(clock, serverNow);
  const [timeText, setTimeText] = useState('');
  const [error, setError] = useState(false);
  const down = clock.direction === 'down';

  const setTime = (e) => {
    e.preventDefault();
    const value = parseClock(timeText);
    if (value === null) return setError(true);
    dispatch({ type: 'clock/set', ms: value });
    setTimeText('');
    setError(false);
  };

  const finished = down && ms === 0 && !clock.running;

  return (
    <section className="panel clock-card">
      <header className="panel-head">
        <span>นาฬิกาแข่งขัน</span>
        <span className={`status-pill ${clock.running ? 'live' : finished ? 'done' : ''}`}>
          {clock.running ? '● กำลังเดิน' : finished ? 'หมดเวลา' : 'หยุดอยู่'}
        </span>
      </header>

      <div className={`clock-display ${down && ms <= 10000 ? 'low' : ''}`}>{formatClock(ms, clock.direction)}</div>

      <div className="clock-main">
        <button
          className={`btn big ${clock.running ? 'danger' : 'primary'}`}
          onClick={() => dispatch({ type: clock.running ? 'clock/pause' : 'clock/start' })}
          disabled={finished}
        >
          {clock.running ? 'หยุดเวลา' : 'เริ่มเวลา'} <kbd>Space</kbd>
        </button>
        <button className="btn" onClick={() => dispatch({ type: 'clock/reset' })}>
          รีเซ็ต
        </button>
      </div>

      <div className="adjust-row">
        {ADJUST.map((d) => (
          <button key={d} className="chip-btn" onClick={() => dispatch({ type: 'clock/set', ms: Math.max(0, ms + d) })}>
            {label(d)}
          </button>
        ))}
      </div>

      <form className="inline-form" onSubmit={setTime}>
        <input
          className={error ? 'invalid' : ''}
          value={timeText}
          onChange={(e) => {
            setTimeText(e.target.value);
            setError(false);
          }}
          placeholder="ตั้งเวลา เช่น 45:00"
          aria-label="ตั้งเวลา (นาที:วินาที)"
        />
        <button className="btn" type="submit">
          ตั้งเวลา
        </button>
      </form>

      <div className="clock-config">
        <div className="seg">
          <button className={!down ? 'on' : ''} onClick={() => dispatch({ type: 'clock/config', direction: 'up' })}>
            นับขึ้น
          </button>
          <button className={down ? 'on' : ''} onClick={() => dispatch({ type: 'clock/config', direction: 'down' })}>
            นับถอยหลัง
          </button>
        </div>
        {down && (
          <label className="duration">
            <span>เวลาเต็ม</span>
            <select
              value={clock.durationMs / 60000}
              onChange={(e) => dispatch({ type: 'clock/config', durationMs: Number(e.target.value) * 60000 })}
            >
              {[...new Set([1, 2, 3, 5, 8, 10, 12, 15, 20, 25, 30, 40, 45, clock.durationMs / 60000])]
                .sort((a, b) => a - b)
                .map((m) => (
                  <option key={m} value={m}>
                    {m} นาที
                  </option>
                ))}
            </select>
          </label>
        )}
      </div>
    </section>
  );
}
