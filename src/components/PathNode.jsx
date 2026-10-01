import Icon from './Icon.jsx';
import SceneBackdrop from './SceneBackdrop.jsx';
import Stars from './Stars.jsx';

export default function PathNode({ lesson, number, progress, locked, current, onStart }) {
  const status = progress ? 'done' : locked ? 'locked' : 'open';

  return (
    <li className={`node ${status} ${current ? 'current' : ''}`}>
      <span className="node-dot" />
      <article className="node-card">
        <div className="node-top">
          <span className="node-ep">EP.{String(number).padStart(2, '0')}</span>
          <span className="node-thumb">
            {locked ? <span className="lock">🔒</span> : <SceneBackdrop set={lesson.scene.set} />}
          </span>
        </div>
        <h3>{lesson.title}</h3>
        <p className="node-th">{lesson.titleTh}</p>
        <p className="node-goal">{lesson.goal}</p>
        <div className="node-foot">
          {status === 'done' && (
            <span className="chip mint">
              เล่นจบแล้ว <Stars value={progress.stars} small />
            </span>
          )}
          {status === 'open' && <span className="chip yellow">พร้อมเล่น ✨</span>}
          {status === 'locked' && <span className="chip grey">จบตอนก่อนหน้าเพื่อปลดล็อก</span>}
          <button className="round-btn" disabled={locked} onClick={onStart} aria-label={`เล่น ${lesson.title}`}>
            <Icon name={status === 'done' ? 'replay' : 'play'} size={16} />
          </button>
        </div>
      </article>
    </li>
  );
}
