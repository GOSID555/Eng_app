import { useEffect, useMemo, useRef, useState } from 'react';
import { useSpeech } from '../hooks/useSpeech.js';
import { fill, shuffle } from '../utils/text.js';
import Stage from './Stage.jsx';
import Transcript from './Transcript.jsx';
import ChoicePanel from './ChoicePanel.jsx';
import SettingsPanel from './SettingsPanel.jsx';
import Icon from './Icon.jsx';
import { GRADES } from '../data/lessons.js';
import { playerLook } from '../utils/player.js';

export default function ConversationPlayer({ lesson, settings, onSettings, onFinish, onExit }) {
  const { speak, stop, speaker, supported } = useSpeech();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // stepIndex -> index ของตัวเลือกที่ถูก
  const [wrong, setWrong] = useState([]); // ตัวเลือกที่ตอบผิดในข้อปัจจุบัน
  const [feedback, setFeedback] = useState(null);
  const [lineDone, setLineDone] = useState(false);
  const [paused, setPaused] = useState(false);
  const [replayTick, setReplayTick] = useState(0);
  const [busy, setBusy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const statsRef = useRef({ firstTry: 0, total: 0, mistakes: [] });
  const timerRef = useRef();
  const mountedRef = useRef(true);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const name = settings.playerName.trim() || 'Student';
  const cast = useMemo(
    () => ({
      ...lesson.characters,
      you: {
        name,
        look: playerLook(settings.playerGender),
        voice: { gender: settings.playerGender, pitch: 1.1, variant: 3 },
        isPlayer: true,
      },
    }),
    [lesson, name, settings.playerGender],
  );

  const steps = lesson.steps;
  const step = steps[index];
  const done = index >= steps.length;

  const voiceOf = (key) => {
    const v = cast[key].voice;
    return { speaker: key, gender: v.gender, variant: v.variant || 0, pitch: v.pitch || 1, rate: (v.rate || 1) * settingsRef.current.rate };
  };

  const next = () => {
    clearTimeout(timerRef.current);
    setWrong([]);
    setFeedback(null);
    setLineDone(false);
    setIndex((i) => i + 1);
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimeout(timerRef.current);
    };
  }, []);

  // เล่นบทพูดของตัวละคร แล้วไปต่ออัตโนมัติ (ถ้าเปิดไว้)
  useEffect(() => {
    if (!step || step.type !== 'line' || paused) return;
    let cancelled = false;
    setLineDone(false);
    speak(fill(step.text, name), voiceOf(step.speaker)).then(() => {
      if (cancelled) return;
      setLineDone(true);
      if (settingsRef.current.autoPlay) timerRef.current = setTimeout(next, 700);
    });
    return () => {
      cancelled = true;
      clearTimeout(timerRef.current);
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, replayTick]);

  // จบบทเรียน → คำนวณคะแนน
  useEffect(() => {
    if (!done) return;
    const s = statsRef.current;
    const ratio = s.total ? s.firstTry / s.total : 1;
    const stars = ratio >= 0.85 ? 3 : ratio >= 0.6 ? 2 : 1;
    onFinish({ stars, score: Math.round(ratio * 100), firstTry: s.firstTry, total: s.total, mistakes: s.mistakes });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const order = useMemo(
    () => (step?.type === 'choice' ? shuffle(step.options.map((_, i) => i)) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index],
  );

  const choose = async (optIdx) => {
    if (busy || step?.type !== 'choice' || answers[index] !== undefined) return;
    const opt = step.options[optIdx];
    stop();

    if (!opt.correct) {
      if (wrong.includes(optIdx)) return;
      if (wrong.length === 0) {
        statsRef.current.mistakes.push({
          prompt: step.prompt,
          wrong: fill(opt.text, name),
          right: fill(step.options.find((o) => o.correct).text, name),
          why: opt.feedback,
        });
      }
      setWrong((w) => [...w, optIdx]);
      setFeedback({ ok: false, text: opt.feedback });
      return;
    }

    statsRef.current.total++;
    if (wrong.length === 0) statsRef.current.firstTry++;
    setAnswers((a) => ({ ...a, [index]: optIdx }));
    setFeedback({ ok: true, text: opt.feedback || 'ถูกต้อง!', firstTry: wrong.length === 0 });
    setBusy(true);
    await speak(fill(opt.text, name), voiceOf('you'));
    if (!mountedRef.current) return;
    setBusy(false);
    timerRef.current = setTimeout(next, 900);
  };

  // บทสนทนาที่เกิดขึ้นแล้ว (สร้างจาก index + answers)
  const transcript = [];
  steps.slice(0, index + 1).forEach((s, i) => {
    if (s.type === 'line') {
      transcript.push({ key: i, speaker: s.speaker, text: fill(s.text, name), th: fill(s.th, name) });
    } else if (answers[i] !== undefined) {
      const o = s.options[answers[i]];
      transcript.push({ key: i, speaker: 'you', text: fill(o.text, name), th: fill(o.th, name) });
    }
  });
  const subtitle = transcript[transcript.length - 1];
  const awaitingChoice = step?.type === 'choice' && answers[index] === undefined;
  const progress = Math.min(index, steps.length) / steps.length;

  const replay = (entry) => speak(entry.text, voiceOf(entry.speaker));

  if (done) return null;

  return (
    <main className="player">
      <header className="player-top">
        <button className="round-btn light" onClick={() => { stop(); onExit(); }} aria-label="กลับหน้าหลัก">
          <Icon name="back" />
        </button>
        <div className="player-title">
          <p className="eyebrow">{GRADES.find((g) => g.id === lesson.grade).label} · {lesson.titleTh}</p>
          <h1>{lesson.title}</h1>
        </div>
        <span className="step-count">{Math.min(index + 1, steps.length)}/{steps.length}</span>
        <button className={`round-btn light ${showSettings ? 'active' : ''}`} onClick={() => setShowSettings((v) => !v)} aria-label="ตั้งค่า">
          <Icon name="sliders" />
        </button>
      </header>
      <div className="progress"><div style={{ width: `${progress * 100}%` }} /></div>

      {showSettings && <SettingsPanel compact settings={settings} onChange={onSettings} />}
      {!supported && <p className="warn">เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง แนะนำให้ใช้ Chrome, Edge หรือ Safari</p>}

      <div className="player-body">
        <div className="player-main">
          <Stage
            scene={lesson.scene}
            cast={cast}
            speaking={speaker}
            subtitle={subtitle}
            showThai={settings.showThai}
            cue={awaitingChoice}
          />

          {step.type === 'line' && (
            <div className="controls">
              <button className="pill-btn" onClick={() => { setPaused(false); setReplayTick((t) => t + 1); }}>
                <Icon name="replay" size={16} /> ฟังซ้ำ
              </button>
              <button className="pill-btn" onClick={() => setPaused((p) => !p)}>
                <Icon name={paused ? 'play' : 'pause'} size={16} /> {paused ? 'เล่นต่อ' : 'หยุด'}
              </button>
              <button className={`pill-btn dark ${lineDone && !settings.autoPlay ? 'pulse' : ''}`} onClick={next}>
                ถัดไป <Icon name="arrow" size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="player-side">
          {step.type === 'choice' && (
            <ChoicePanel
              step={step}
              order={order}
              name={name}
              wrong={wrong}
              answered={answers[index]}
              busy={busy}
              feedback={feedback}
              onChoose={choose}
              onListen={(text) => speak(text, voiceOf('you'))}
            />
          )}

          <Transcript entries={transcript} cast={cast} showThai={settings.showThai} speaking={speaker} onReplay={replay} />
        </div>
      </div>
    </main>
  );
}
