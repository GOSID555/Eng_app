import TextField from './TextField.jsx';

const PERIODS = ['1st Half', '2nd Half', 'Extra Time', 'Penalties', 'Q1', 'Q2', 'Q3', 'Q4', 'OT', 'Set 1', 'Set 2', 'Set 3', 'Half Time', 'Full Time'];

export default function MatchCard({ state, dispatch }) {
  return (
    <section className="panel match-card">
      <header className="panel-head">
        <span>ข้อมูลการแข่งขัน</span>
      </header>
      <label className="field">
        <span>ชื่อรายการ</span>
        <TextField value={state.title} maxLength={60} placeholder="เช่น กีฬาสี 2026 รอบชิง" onCommit={(v) => dispatch({ type: 'match/update', title: v })} />
      </label>
      <label className="field">
        <span>ช่วงการแข่งขัน</span>
        <TextField value={state.period} maxLength={20} onCommit={(v) => dispatch({ type: 'match/update', period: v })} />
      </label>
      <div className="period-chips">
        {PERIODS.map((p) => (
          <button key={p} className={`chip-btn ${state.period === p ? 'on' : ''}`} onClick={() => dispatch({ type: 'match/update', period: p })}>
            {p}
          </button>
        ))}
      </div>
    </section>
  );
}
