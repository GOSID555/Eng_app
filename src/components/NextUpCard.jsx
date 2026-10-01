import Avatar from './Avatar.jsx';
import Icon from './Icon.jsx';
import SceneBackdrop from './SceneBackdrop.jsx';

export default function NextUpCard({ lesson, done, onStart }) {
  const cast = Object.values(lesson.characters);
  const choices = lesson.steps.filter((s) => s.type === 'choice').length;

  return (
    <article className="nextup">
      <span className="note n1">♪</span>
      <span className="note n2">♫</span>
      <div className="nextup-text">
        <p className="eyebrow">{done ? 'เล่นอีกครั้ง' : 'ตอนต่อไปของคุณ'}</p>
        <h2>{lesson.title}</h2>
        <p>{lesson.goal}</p>
        <span className="chip white">
          <Icon name="play" size={13} /> {choices} บทพูด · {lesson.scene.placeTh}
        </span>
      </div>
      <button className="play-disc" onClick={onStart} aria-label={`เริ่ม ${lesson.title}`}>
        <SceneBackdrop set={lesson.scene.set} />
        <span className="play-core">
          <Icon name="play" size={26} />
        </span>
      </button>
      <div className="cast-stack">
        {cast.map((c) => (
          <span key={c.name} className="cast-face">
            <Avatar look={c.look} framed bg="#FFF6D6" />
          </span>
        ))}
      </div>
    </article>
  );
}
