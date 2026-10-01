import Character from './Character.jsx';
import SceneBackdrop from './SceneBackdrop.jsx';

export default function Stage({ scene, cast, speaking, subtitle, showThai, cue }) {
  const npcs = Object.entries(cast).filter(([, c]) => !c.isPlayer);
  const subSpeaker = subtitle && cast[subtitle.speaker];

  return (
    <section className="stage">
      <SceneBackdrop set={scene.set} />
      <div className="stage-top">
        <span className="chip white">📍 {scene.place}<em> · {scene.placeTh}</em></span>
        {cue && <span className="chip yellow cue">ถึงตาคุณพูดแล้ว ✨</span>}
      </div>

      <div className="actors">
        <div className="actor-group">
          {npcs.map(([key, c]) => (
            <Character key={key} character={c} speaking={speaking === key} />
          ))}
        </div>
        <div className="actor-group">
          <Character character={cast.you} speaking={speaking === 'you'} />
        </div>
      </div>

      <div className={`subtitle ${subtitle ? '' : 'empty'}`} aria-live="polite">
        {subtitle && (
          <>
            <span className="sub-name" style={{ '--tint': subSpeaker.look.shirt }}>
              {subSpeaker.isPlayer ? `${subSpeaker.name} (คุณ)` : subSpeaker.name}
            </span>
            <p className="sub-en">{subtitle.text}</p>
            {showThai && <p className="sub-th">{subtitle.th}</p>}
          </>
        )}
      </div>
    </section>
  );
}
