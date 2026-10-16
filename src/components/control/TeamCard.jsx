import { useEffect, useRef, useState } from 'react';
import TextField from './TextField.jsx';

const KEYS = { home: ['Q', 'A'], away: ['P', 'L'] };

export default function TeamCard({ side, team, dispatch }) {
  const [color, setColor] = useState(team.color);
  const colorTimer = useRef();
  useEffect(() => setColor(team.color), [team.color]);

  const update = (patch) => dispatch({ type: 'team/update', side, patch });
  const add = (delta) => dispatch({ type: 'score/add', side, delta });
  const [plusKey, minusKey] = KEYS[side];

  // หน่วงการส่งสีเล็กน้อย กันส่งถี่ตอนลากเลือกสี
  const pickColor = (v) => {
    setColor(v);
    clearTimeout(colorTimer.current);
    colorTimer.current = setTimeout(() => update({ color: v }), 150);
  };

  return (
    <section className={`panel team-card team-${side}`} style={{ '--team': color }}>
      <header className="panel-head">
        <span className="team-side">
          <i className="team-dot" />
          {side === 'home' ? 'ทีมเหย้า · HOME' : 'ทีมเยือน · AWAY'}
        </span>
        <span className="hint">
          <kbd>{plusKey}</kbd> +1 <kbd>{minusKey}</kbd> −1
        </span>
      </header>

      <div className="score-box">
        <button className="step-btn" onClick={() => add(-1)} disabled={team.score === 0} aria-label="ลบ 1 คะแนน">
          −
        </button>
        <TextField
          className="score-input"
          inputMode="numeric"
          aria-label="คะแนน"
          value={team.score}
          transform={(v) => v.replace(/\D/g, '').slice(0, 4)}
          onCommit={(v) => dispatch({ type: 'score/set', side, value: Number(v) || 0 })}
        />
        <button className="step-btn plus" onClick={() => add(1)} aria-label="เพิ่ม 1 คะแนน">
          +
        </button>
      </div>
      <div className="quick-row">
        {[2, 3, 5].map((n) => (
          <button key={n} className="chip-btn" onClick={() => add(n)}>
            +{n}
          </button>
        ))}
      </div>

      <div className="fields">
        <label className="field">
          <span>ชื่อทีม</span>
          <TextField value={team.name} maxLength={40} onCommit={(v) => update({ name: v })} />
        </label>
        <div className="field-row">
          <label className="field">
            <span>ชื่อย่อ</span>
            <TextField
              value={team.short}
              maxLength={5}
              transform={(v) => v.toUpperCase()}
              onCommit={(v) => update({ short: v })}
            />
          </label>
          <label className="field color-field">
            <span>สีทีม</span>
            <input type="color" value={color} onChange={(e) => pickColor(e.target.value)} />
          </label>
        </div>
        <label className="field">
          <span>โลโก้ (ลิงก์รูปภาพ ไม่บังคับ)</span>
          <TextField value={team.logo} placeholder="https://…/logo.png" onCommit={(v) => update({ logo: v.trim() })} />
        </label>
      </div>
    </section>
  );
}
