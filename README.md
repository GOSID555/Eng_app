# 🎬 English Talk Studio — ฝึกบทสนทนาภาษาอังกฤษ ม.1–3

เว็บแอป React (Vite) สำหรับฝึก conversation แบบ "ดูหนังแล้วเล่นตาม": ตัวละครพูดมีเสียง มีซับไตเติล EN/TH และผู้เรียนเลือกคำตอบ (กดฟังเสียงแต่ละตัวเลือกได้) — ดีไซน์โทนพาสเทล การ์ดมน ตัวละครวาดด้วย SVG ปากขยับตามเสียงเพื่อให้เรื่องดำเนินต่อ

## วิธีรัน

```bash
npm install
npm run dev
```

เปิด http://localhost:5173 (แนะนำ Chrome / Edge / Safari เพราะรองรับเสียงพูด)

## โครงสร้างโปรเจกต์

```
src/
├── main.jsx                  จุดเริ่มต้น
├── App.jsx                   สลับหน้า home → play → result, เก็บ settings/progress
├── data/
│   └── lessons.js            ⭐ เนื้อหาบทเรียนทั้งหมด (แก้/เพิ่มบทเรียนที่นี่)
├── hooks/
│   └── useSpeech.js          อ่านออกเสียง (Web Speech API) เลือกเสียงชาย/หญิงตามตัวละคร
├── utils/
│   ├── text.js               แทนชื่อ {name}, สุ่มลำดับตัวเลือก
│   └── storage.js            บันทึกดาว/คะแนน/การตั้งค่าใน localStorage
├── components/
│   ├── Home.jsx              หน้าหลัก เลือกระดับชั้น ม.1/ม.2/ม.3
│   ├── LessonCard.jsx        การ์ดแต่ละตอน
│   ├── SettingsPanel.jsx     ชื่อ, เสียงผู้เรียน, ความเร็ว, คำแปล, เล่นอัตโนมัติ
│   ├── ConversationPlayer.jsx ⭐ ตัวควบคุมเกม (ลำดับบท, เสียง, ตอบถูก/ผิด, คะแนน)
│   ├── Stage.jsx             ฉากแบบหนัง + ซับไตเติล
│   ├── Character.jsx         ตัวละคร (ขยับเมื่อพูด)
│   ├── ChoicePanel.jsx       ตัวเลือกคำตอบ + ปุ่มฟัง + feedback
│   ├── Transcript.jsx        ประวัติบทสนทนาแบบแชต กดฟังซ้ำได้
│   ├── ResultScreen.jsx      สรุปดาว ทบทวนข้อผิด และคำศัพท์
│   └── Stars.jsx
└── styles/index.css
```

## บทเรียนที่มี

| ชั้น | ตอน | หัวข้อ |
|---|---|---|
| ม.1 | Hello! (Warm-up) | ทักทายง่าย ๆ 3 ประโยค |
| ม.1 | Nice to Meet You! | แนะนำตัว |
| ม.1 | Can I Borrow Your Pen? | ภาษาในห้องเรียน |
| ม.2 | At the Restaurant | สั่งอาหาร |
| ม.2 | Excuse Me, Where Is...? | บอกทาง |
| ม.3 | Shopping for Clothes | ซื้อเสื้อผ้า |
| ม.3 | Weekend Plans | ชวนเพื่อน / นัดหมาย |

## เพิ่มบทเรียนใหม่

เพิ่ม object ใน `LESSONS` ของ `src/data/lessons.js`:

```js
{
  id: 'm2-new', grade: 2, title: '...', titleTh: '...', goal: '...',
  scene: { place: 'Park', placeTh: 'สวน', icon: '🌳', bg: 'linear-gradient(...)' },
  characters: { lily: { name: 'Lily', avatar: '👧', voice: { gender: 'female', pitch: 1.2 } } },
  vocab: [{ word: '...', meaning: '...' }],
  steps: [
    { type: 'line', speaker: 'lily', text: 'Hi {name}!', th: 'สวัสดี{name}!' },
    { type: 'choice', prompt: 'ทักทายกลับ', options: [
      { text: 'Hi, Lily!', th: 'สวัสดีลิลลี่', correct: true, feedback: 'ถูกต้อง!' },
      { text: 'Bye, Lily!', th: 'ลาก่อน', feedback: 'นี่คือการบอกลา' },
    ]},
  ],
}
```

- `{name}` จะถูกแทนด้วยชื่อผู้เรียนที่ตั้งไว้
- ตัวละคร `you` (ผู้เรียน) สร้างให้อัตโนมัติ
- คะแนน = สัดส่วนข้อที่ตอบถูกในครั้งแรก (≥85% = 3 ดาว, ≥60% = 2 ดาว)
