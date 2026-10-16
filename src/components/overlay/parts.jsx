import { readableText } from '../../utils/color.js';

// key={value} ทำให้ตัวเลขเด้งใหม่ทุกครั้งที่คะแนนเปลี่ยน
export const Score = ({ value, className = '' }) => (
  <span key={value} className={`ov-score ${className}`}>
    {value}
  </span>
);

export const Badge = ({ team, className = '' }) =>
  team.logo ? (
    <img className={`ov-logo ${className}`} src={team.logo} alt="" />
  ) : (
    <span className={`ov-badge ${className}`} style={{ background: team.color, color: readableText(team.color) }}>
      {team.short.slice(0, 3)}
    </span>
  );
