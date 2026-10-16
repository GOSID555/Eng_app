import { readableText } from '../../utils/color.js';
import { Score } from './parts.jsx';

// แถบคะแนนด้านบนตรงกลาง สไตล์ถ่ายทอดฟุตบอล
export default function BarTheme({ state, time, lowTime }) {
  const { home, away, overlay } = state;
  const team = (t, side) => (
    <div className={`bar-team ${side}`} style={{ background: t.color, color: readableText(t.color) }}>
      {t.logo && <img className="bar-logo" src={t.logo} alt="" />}
      <span>{t.short}</span>
    </div>
  );

  return (
    <div className="theme-bar">
      {overlay.showTitle && state.title && <div className="bar-title">{state.title}</div>}
      <div className="bar-row">
        {team(home, 'home')}
        <div className="bar-score">
          <Score value={home.score} />
          <span className="bar-dash" />
          <Score value={away.score} />
        </div>
        {team(away, 'away')}
        {overlay.showClock && (
          <div className={`bar-clock ${lowTime ? 'low' : ''}`}>
            <span className="bar-time">{time}</span>
            {state.period && <span className="bar-period">{state.period}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
