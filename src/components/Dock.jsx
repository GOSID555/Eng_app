import { GRADES } from '../data/lessons.js';
import Icon from './Icon.jsx';

// แถบเมนูลอยด้านล่าง (เลือกระดับชั้น + ตั้งค่า)
export default function Dock({ grade, onGrade, onSettings }) {
  return (
    <nav className="dock" aria-label="เลือกระดับชั้น">
      {GRADES.map((g) => (
        <button
          key={g.id}
          className={`dock-btn ${grade === g.id ? 'active' : ''}`}
          style={{ '--tint': g.color }}
          onClick={() => onGrade(g.id)}
          aria-pressed={grade === g.id}
        >
          {g.label}
        </button>
      ))}
      <span className="dock-sep" />
      <button className="dock-btn plain" onClick={onSettings} aria-label="ตั้งค่า">
        <Icon name="sliders" size={18} />
      </button>
    </nav>
  );
}
