import { useCallback, useEffect, useRef, useState } from 'react';

// ใช้ Web Speech API (speechSynthesis) ที่มีในเบราว์เซอร์ ไม่ต้องมีไฟล์เสียง
const FEMALE_HINTS = ['female', 'samantha', 'victoria', 'karen', 'moira', 'tessa', 'fiona', 'zira', 'susan', 'aria', 'jenny', 'ava', 'allison', 'serena', 'libby', 'sonia', 'google us english'];
const MALE_HINTS = ['male', 'daniel', 'alex', 'fred', 'david', 'mark', 'guy', 'rishi', 'aaron', 'tom', 'ryan', 'arthur', 'oliver'];

const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

function matchesGender(voice, gender) {
  const name = voice.name.toLowerCase();
  if (gender === 'female') return FEMALE_HINTS.some((h) => name.includes(h));
  return !name.includes('female') && MALE_HINTS.some((h) => name.includes(h));
}

export function useSpeech() {
  const voicesRef = useRef([]);
  const tokenRef = useRef(0);
  const [speaker, setSpeaker] = useState(null); // ตัวละครที่กำลังพูดอยู่

  useEffect(() => {
    if (!supported) return;
    const load = () => {
      voicesRef.current = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('en'));
    };
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', load);
      window.speechSynthesis.cancel();
    };
  }, []);

  const pickVoice = (gender, variant) => {
    const voices = voicesRef.current;
    if (!voices.length) return null;
    const matched = voices.filter((v) => matchesGender(v, gender));
    const pool = matched.length ? matched : voices;
    return pool[variant % pool.length];
  };

  // คืนค่า Promise ที่ resolve เมื่อพูดจบ (หรือถูกยกเลิก)
  const speak = useCallback((text, { speaker = null, gender = 'female', variant = 0, pitch = 1, rate = 1 } = {}) => {
    return new Promise((resolve) => {
      const token = ++tokenRef.current;
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        if (tokenRef.current === token) setSpeaker(null);
        resolve();
      };
      setSpeaker(speaker);

      if (!supported) {
        // ไม่มีเสียง: จำลองเวลาพูดเพื่อให้บทสนทนายังเดินต่อได้
        setTimeout(finish, 800 + (text.length * 55) / rate);
        return;
      }
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const voice = pickVoice(gender, variant);
      if (voice) u.voice = voice;
      u.lang = voice?.lang || 'en-US';
      u.pitch = pitch;
      u.rate = rate;
      u.onend = finish;
      u.onerror = finish;
      synth.speak(u);
      // กันกรณีบางเบราว์เซอร์ไม่ส่ง onend
      setTimeout(finish, 4000 + (text.length * 150) / rate);
    });
  }, []);

  const stop = useCallback(() => {
    tokenRef.current++;
    if (supported) window.speechSynthesis.cancel();
    setSpeaker(null);
  }, []);

  return { supported, speak, stop, speaker };
}
