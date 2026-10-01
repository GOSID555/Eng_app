import { useState } from 'react';
import { GRADES, LESSONS } from '../data/lessons.js';
import { useSpeech } from '../hooks/useSpeech.js';
import Avatar from './Avatar.jsx';
import Dock from './Dock.jsx';
import Icon from './Icon.jsx';
import NextUpCard from './NextUpCard.jsx';
import PathNode from './PathNode.jsx';
import SettingsPanel from './SettingsPanel.jsx';
import { playerLook } from '../utils/player.js';

const PASTELS = ['blue', 'lav', 'yellow', 'mint', 'pink'];
const TAGS = ['Phrase', 'Word', 'Tip', 'Phrase', 'Word'];

export default function Home({ settings, onSettings, progress, onStart }) {
  const [grade, setGrade] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const { speak } = useSpeech();

  const gradeInfo = GRADES.find((g) => g.id === grade);
  const lessons = LESSONS.filter((l) => l.grade === grade);
  const isUnlocked = (i) => i === 0 || Boolean(progress[lessons[i - 1].id]);
  const nextIdx = Math.max(0, lessons.findIndex((l, i) => isUnlocked(i) && !progress[l.id]));
  const nextLesson = lessons[nextIdx];

  const doneCount = LESSONS.filter((l) => progress[l.id]).length;
  const totalStars = Object.values(progress).reduce((s, p) => s + p.stars, 0);
  const name = settings.playerName.trim() || 'Student';
  const me = playerLook(settings.playerGender);

  return (
    <main className="home">
      <div className="home-grid">
        <section className="home-main">
          <header className="home-head">
            <div>
              <p className="eyebrow">English Talk Studio · {gradeInfo.label}</p>
              <h1>
                Hi, {name}! <span className="emoji">👋</span>
              </h1>
              <p className="lead">วันนี้มาฝึกพูดภาษาอังกฤษผ่านหนังสั้นกันเถอะ</p>
            </div>
            <button className="me-chip" onClick={() => setShowSettings(true)} aria-label="ตั้งค่าโปรไฟล์">
              <Avatar look={me} framed bg="#FFE89A" />
            </button>
          </header>

          <div className="stats">
            <div className="stat">
              <strong>{LESSONS.length}</strong>
              <span>ตอนทั้งหมด</span>
            </div>
            <div className="stat mint">
              <strong>{doneCount}</strong>
              <span>เล่นจบแล้ว</span>
              {doneCount > 0 && <i className="stat-pop">🎉</i>}
            </div>
            <div className="stat dashed">
              <strong>{totalStars}</strong>
              <span>ดาวสะสม / {LESSONS.length * 3}</span>
            </div>
          </div>

          <NextUpCard lesson={nextLesson} done={Boolean(progress[nextLesson.id])} onStart={() => onStart(nextLesson.id)} />

          <div className="section-head">
            <h2>เส้นทาง {gradeInfo.label} <span className="muted">· {gradeInfo.title}</span></h2>
          </div>
          <ol className="path">
            {lessons.map((l, i) => (
              <PathNode
                key={l.id}
                lesson={l}
                number={i + 1}
                progress={progress[l.id]}
                locked={!isUnlocked(i)}
                current={i === nextIdx}
                onStart={() => onStart(l.id)}
              />
            ))}
          </ol>
        </section>

        <aside className="home-side">
          <div className="section-head">
            <h2>Phrase Box <span className="emoji">💬</span></h2>
          </div>
          <p className="muted side-sub">สำนวนจากตอน “{nextLesson.title}” กดฟังเสียงได้เลย</p>
          <div className="phrase-list">
            {nextLesson.vocab.map((v, i) => (
              <article key={v.word} className={`phrase ${PASTELS[i % PASTELS.length]}`}>
                <div className="phrase-top">
                  <span className="phrase-tag">{TAGS[i % TAGS.length]}</span>
                  <span className="phrase-no">#{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="phrase-word">{v.word}</p>
                <p className="phrase-meaning">{v.meaning}</p>
                <button className="pill-btn" onClick={() => speak(v.word, { rate: settings.rate })}>
                  <Icon name="speaker" size={16} /> ฟังเสียง
                </button>
              </article>
            ))}
          </div>
        </aside>
      </div>

      <Dock grade={grade} onGrade={setGrade} onSettings={() => setShowSettings(true)} />

      {showSettings && (
        <div className="sheet-backdrop" onClick={() => setShowSettings(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="ตั้งค่า">
            <div className="sheet-head">
              <h3>ตั้งค่า ⚙️</h3>
              <button className="round-btn light" onClick={() => setShowSettings(false)} aria-label="ปิด">
                <Icon name="x" />
              </button>
            </div>
            <SettingsPanel settings={settings} onChange={onSettings} />
          </div>
        </div>
      )}
    </main>
  );
}
