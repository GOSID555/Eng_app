import { Score } from './parts.jsx';

// กล่องเล็กมุมซ้ายบน แถวละทีม (เหมาะกับเกม/อีสปอร์ต)
export default function CornerTheme({ state, time, lowTime }) {
  const { home, away, overlay } = state;
  const row = (t) => (
    <div className="corner-row">
      <span className="corner-swatch" style={{ background: t.color }} />
      {t.logo && <img className="corner-logo" src={t.logo} alt="" />}
      <span className="corner-name">{t.short}</span>
      <Score value={t.score} />
    </div>
  );

  return (
    <div className="theme-corner">
      {overlay.showTitle && state.title && <div className="corner-title">{state.title}</div>}
      {row(home)}
      {row(away)}
      {overlay.showClock && (
        <div className={`corner-foot ${lowTime ? 'low' : ''}`}>
          <span className="corner-time">{time}</span>
          {state.period && <span className="corner-period">{state.period}</span>}
        </div>
      )}
    </div>
  );
}
