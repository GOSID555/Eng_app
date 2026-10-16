import { Badge, Score } from './parts.jsx';

// การ์ดใหญ่ด้านล่าง แสดงชื่อเต็ม (เหมาะกับช่วงพัก/สรุปผล)
export default function BroadcastTheme({ state, time, lowTime }) {
  const { home, away, overlay } = state;
  return (
    <div className="theme-broadcast">
      {overlay.showTitle && state.title && <div className="bc-title">{state.title}</div>}
      <div className="bc-card">
        <div className="bc-team home" style={{ '--team': home.color }}>
          <Badge team={home} />
          <span className="bc-name">{home.name}</span>
          <Score value={home.score} />
        </div>
        <div className={`bc-mid ${lowTime ? 'low' : ''}`}>
          {overlay.showClock ? <span className="bc-time">{time}</span> : <span className="bc-vs">VS</span>}
          {state.period && <span className="bc-period">{state.period}</span>}
        </div>
        <div className="bc-team away" style={{ '--team': away.color }}>
          <Score value={away.score} />
          <span className="bc-name">{away.name}</span>
          <Badge team={away} />
        </div>
      </div>
    </div>
  );
}
