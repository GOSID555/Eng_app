import { useSpeech } from '../hooks/useSpeech.js';
import { playerLook } from '../utils/player.js';
import Avatar from './Avatar.jsx';
import Icon from './Icon.jsx';
import Stars from './Stars.jsx';

const MESSAGES = ['', 'พยายามได้ดีมาก! ลองอีกรอบนะ 💪', 'เก่งมาก! อีกนิดเดียวได้ 3 ดาว ✨', 'สุดยอด! พูดได้คล่องเลย 🏆'];
const TINTS = ['blue', 'lav', 'yellow', 'mint', 'pink'];

export default function ResultScreen({ lesson, result, settings, onReplay, onNext, onHome }) {
  const { speak } = useSpeech();
  const say = (text) => speak(text, { rate: settings.rate, gender: 'female' });

  return (
    <main className="result">
      <section className="result-hero">
        <span className="confetti c1" />
        <span className="confetti c2" />
        <span className="confetti c3" />
        <span className="result-face">
          <Avatar look={playerLook(settings.playerGender)} framed bg="#FFE89A" />
        </span>
        <p className="eyebrow">จบตอนแล้ว · {lesson.title}</p>
        <h1>{MESSAGES[result.stars]}</h1>
        <Stars value={result.stars} big />
      </section>

      <div className="stats">
        <div className="stat">
          <strong>{result.firstTry}/{result.total}</strong>
          <span>ตอบถูกครั้งแรก</span>
        </div>
        <div className="stat mint">
          <strong>{result.score}%</strong>
          <span>ความแม่นยำ</span>
        </div>
        <div className="stat lav">
          <strong>{result.stars}</strong>
          <span>ดาวที่ได้</span>
        </div>
      </div>

      <div className="result-grid">
        {result.mistakes.length > 0 && (
          <section>
            <h2 className="section-title">ทบทวนข้อที่พลาด 📌</h2>
            {result.mistakes.map((m, i) => (
              <article key={i} className="review-card">
                <p className="eyebrow">{m.prompt}</p>
                <p className="review-wrong">
                  <Icon name="x" size={14} strokeWidth={2.6} /> {m.wrong}
                </p>
                <p className="review-why">{m.why}</p>
                <div className="review-right">
                  <span>
                    <Icon name="check" size={14} strokeWidth={2.6} /> {m.right}
                  </span>
                  <button className="round-btn light small" onClick={() => say(m.right)} aria-label="ฟังประโยคที่ถูก">
                    <Icon name="speaker" size={14} />
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}

        <section>
          <h2 className="section-title">คำศัพท์ในตอนนี้ 📖</h2>
          <div className="vocab-grid">
            {lesson.vocab.map((v, i) => (
              <button key={v.word} className={`vocab-card ${TINTS[i % TINTS.length]}`} onClick={() => say(v.word)}>
                <span className="vocab-word">{v.word}</span>
                <span className="vocab-meaning">{v.meaning}</span>
                <span className="vocab-play">
                  <Icon name="speaker" size={14} />
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="result-actions">
        <button className="pill-btn" onClick={onHome}>
          <Icon name="home" size={16} /> หน้าหลัก
        </button>
        <button className="pill-btn" onClick={onReplay}>
          <Icon name="replay" size={16} /> เล่นอีกครั้ง
        </button>
        {onNext && (
          <button className="pill-btn dark" onClick={onNext}>
            ตอนต่อไป <Icon name="arrow" size={16} />
          </button>
        )}
      </div>
    </main>
  );
}
