import { useEffect, useRef } from 'react';
import Avatar from './Avatar.jsx';
import Icon from './Icon.jsx';

export default function Transcript({ entries, cast, showThai, speaking, onReplay }) {
  const boxRef = useRef(null);
  useEffect(() => {
    const box = boxRef.current;
    if (box) box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' });
  }, [entries.length]);

  return (
    <section className="transcript">
      <div className="transcript-head">
        <h3>บทสนทนา 💬</h3>
        <span className="muted">{entries.length} ประโยค</span>
      </div>
      <div className="transcript-body" ref={boxRef}>
        {entries.map((e) => {
          const c = cast[e.speaker];
          return (
            <div key={e.key} className={`bubble-row ${c.isPlayer ? 'me' : ''}`}>
              <span className="bubble-avatar">
                <Avatar look={c.look} framed bg={c.isPlayer ? '#E6D7FA' : '#EFEFEC'} />
              </span>
              <div className="bubble">
                <span className="bubble-name">{c.isPlayer ? 'คุณ' : c.name}</span>
                <p className="bubble-en">{e.text}</p>
                {showThai && <p className="bubble-th">{e.th}</p>}
              </div>
              <button
                className={`round-btn light small ${speaking === e.speaker ? 'active' : ''}`}
                onClick={() => onReplay(e)}
                aria-label="ฟังประโยคนี้"
              >
                <Icon name="speaker" size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
