import { useEffect, useRef } from 'react';
import { fill } from '../utils/text.js';
import Icon from './Icon.jsx';

const LETTERS = ['A', 'B', 'C', 'D'];
const TINTS = ['blue', 'lav', 'yellow', 'peach'];

export default function ChoicePanel({ step, order, name, wrong, answered, busy, feedback, onChoose, onListen }) {
  const panelRef = useRef(null);
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight - 120 || r.bottom < 0) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, []);
  const texts = order.map((i) => fill(step.options[i].text, name));
  const locked = busy || answered !== undefined;

  return (
    <section className="choices" ref={panelRef}>
      <p className="eyebrow">ภารกิจของคุณ</p>
      <h3 className="choice-prompt">{step.prompt}</h3>

      <div className="choice-list">
        {order.map((optIdx, pos) => {
          const isWrong = wrong.includes(optIdx);
          const isRight = answered === optIdx;
          return (
            <div key={optIdx} className={`choice ${TINTS[pos % TINTS.length]} ${isWrong ? 'wrong' : ''} ${isRight ? 'right' : ''}`}>
              <button className="choice-main" disabled={locked || isWrong} onClick={() => onChoose(optIdx)}>
                <span className="choice-letter">
                  {isWrong ? <Icon name="x" size={15} strokeWidth={2.6} /> : isRight ? <Icon name="check" size={15} strokeWidth={2.6} /> : LETTERS[pos]}
                </span>
                <span className="choice-text">{texts[pos]}</span>
              </button>
              <button className="round-btn light" onClick={() => onListen(texts[pos])} aria-label="ฟังตัวเลือกนี้" disabled={busy}>
                <Icon name="speaker" size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {feedback && (
        <div className={`feedback ${feedback.ok ? 'ok' : 'bad'}`}>
          <span className="feedback-icon">
            <Icon name={feedback.ok ? 'check' : 'x'} size={16} strokeWidth={2.6} />
          </span>
          <div>
            <strong>{feedback.ok ? (feedback.firstTry ? 'ถูกต้อง! เก่งมาก' : 'ถูกแล้ว!') : 'ยังไม่ใช่นะ ลองอีกที'}</strong>
            <p>{feedback.text}</p>
          </div>
        </div>
      )}
    </section>
  );
}
