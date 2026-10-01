// ข้อมูลบทเรียนทั้งหมด
// - steps.type 'line'   = ตัวละครพูด (มีเสียง)
// - steps.type 'choice' = ผู้เรียนเลือกคำตอบ (ข้อที่ correct: true คือคำตอบที่ถูก)
// - {name} ในข้อความจะถูกแทนที่ด้วยชื่อผู้เรียน
// - ตัวละคร 'you' (ผู้เรียน) ถูกสร้างอัตโนมัติจากการตั้งค่า ไม่ต้องใส่ใน characters

export const GRADES = [
  { id: 1, label: 'ม.1', title: 'Basic Talk', color: '#FFE89A' },
  { id: 2, label: 'ม.2', title: 'Daily Life', color: '#BFEBCB' },
  { id: 3, label: 'ม.3', title: 'Real World', color: '#DCCBF7' },
];

export const LESSONS = [
  // ───────────────────────────── ม.1 ─────────────────────────────
  {
    id: 'm1-hello',
    grade: 1,
    title: 'Hello! (Warm-up)',
    titleTh: 'ทักทายง่าย ๆ',
    goal: 'อุ่นเครื่อง: ทักทาย ถามสบายดีไหม และบอกลา (3 ประโยค)',
    scene: {
      place: 'School Hallway',
      placeTh: 'ทางเดินในโรงเรียน',
      set: 'hallway',
    },
    characters: {
      tom: { name: 'Tom', look: { skin: '#F1C7A5', hair: '#3B2A20', hairStyle: 'short', shirt: '#E4572E' }, voice: { gender: 'male', pitch: 1.2, rate: 1 } },
    },
    vocab: [
      { word: 'Hello / Hi', meaning: 'สวัสดี' },
      { word: 'How are you?', meaning: 'สบายดีไหม' },
      { word: "I'm fine, thank you.", meaning: 'สบายดี ขอบคุณ' },
      { word: 'Bye! / See you!', meaning: 'ลาก่อน / แล้วเจอกัน' },
    ],
    steps: [
      { type: 'line', speaker: 'tom', text: 'Hello! Good morning!', th: 'สวัสดี! อรุณสวัสดิ์!' },
      {
        type: 'choice',
        prompt: 'ทักทายทอมกลับ',
        options: [
          { text: 'Hello, Tom! Good morning!', th: 'สวัสดีทอม! อรุณสวัสดิ์!', correct: true, feedback: 'ถูกต้อง! ทักทายกลับด้วย Hello / Good morning' },
          { text: 'Good night, Tom!', th: 'ราตรีสวัสดิ์ ทอม', feedback: 'Good night ใช้ตอนกลางคืนก่อนนอน ไม่ใช่ตอนเช้า' },
        ],
      },
      { type: 'line', speaker: 'tom', text: 'How are you?', th: 'สบายดีไหม' },
      {
        type: 'choice',
        prompt: 'ตอบว่าสบายดี',
        options: [
          { text: "I'm fine, thank you.", th: 'สบายดี ขอบคุณ', correct: true, feedback: 'เยี่ยม! I\'m fine, thank you.' },
          { text: "I'm Tom.", th: 'ฉันชื่อทอม', feedback: 'นี่คือการบอกชื่อ และคุณไม่ใช่ทอมนะ 😄' },
        ],
      },
      { type: 'line', speaker: 'tom', text: 'Great! Bye!', th: 'ดีเลย! บาย!' },
      {
        type: 'choice',
        prompt: 'บอกลาทอม',
        options: [
          { text: 'Bye, Tom! See you!', th: 'บายทอม! แล้วเจอกัน', correct: true, feedback: 'สมบูรณ์แบบ! อุ่นเครื่องผ่านแล้ว 🎉' },
          { text: 'Hello, Tom!', th: 'สวัสดีทอม', feedback: 'Hello ใช้ตอนเจอกัน ไม่ใช่ตอนลา' },
        ],
      },
    ],
  },
  {
    id: 'm1-greetings',
    grade: 1,
    title: 'Nice to Meet You!',
    titleTh: 'การทักทายและแนะนำตัว',
    goal: 'ทักทาย แนะนำตัว บอกอายุ และวิชาที่ชอบ',
    scene: {
      place: 'School Gate',
      placeTh: 'หน้าประตูโรงเรียน',
      set: 'gate',
    },
    characters: {
      amy: { name: 'Amy', look: { skin: '#F6D3B8', hair: '#C98B2E', hairStyle: 'long', shirt: '#2A7F72' }, voice: { gender: 'female', pitch: 1.25, rate: 1 } },
    },
    vocab: [
      { word: 'Nice to meet you', meaning: 'ยินดีที่ได้รู้จัก' },
      { word: 'new student', meaning: 'นักเรียนใหม่' },
      { word: 'favorite subject', meaning: 'วิชาที่ชอบที่สุด' },
      { word: 'Where are you from?', meaning: 'คุณมาจากไหน' },
    ],
    steps: [
      { type: 'line', speaker: 'amy', text: "Hi there! I'm Amy. I'm a new student here.", th: 'สวัสดี! ฉันชื่อเอมี่ ฉันเป็นนักเรียนใหม่ที่นี่' },
      {
        type: 'choice',
        prompt: 'ทักทายเอมี่และแนะนำตัวเอง',
        options: [
          { text: "Hi, Amy! I'm {name}. Nice to meet you.", th: 'สวัสดีเอมี่! ฉันชื่อ{name} ยินดีที่ได้รู้จัก', correct: true, feedback: 'เยี่ยม! ทักทาย + บอกชื่อ + Nice to meet you ครบเลย' },
          { text: 'Goodbye, Amy. See you later.', th: 'ลาก่อนเอมี่ แล้วเจอกัน', feedback: 'ประโยคนี้เป็นการบอกลา ไม่ใช่การทักทายครั้งแรก' },
          { text: "I'm fine, thank you. And you?", th: 'ฉันสบายดี ขอบคุณ แล้วคุณล่ะ', feedback: 'ใช้ตอบคำถาม How are you? แต่เอมี่ยังไม่ได้ถาม' },
        ],
      },
      { type: 'line', speaker: 'amy', text: 'Nice to meet you too! Where are you from?', th: 'ยินดีที่ได้รู้จักเหมือนกัน! เธอมาจากไหน' },
      {
        type: 'choice',
        prompt: 'บอกว่าคุณมาจากไหน',
        options: [
          { text: "I'm from Thailand. I live in Chiang Mai.", th: 'ฉันมาจากประเทศไทย ฉันอยู่เชียงใหม่', correct: true, feedback: 'ถูกต้อง! I\'m from + ประเทศ/เมือง' },
          { text: "I'm from thirteen years old.", th: '(ประโยคผิด)', feedback: 'from ใช้กับสถานที่ ไม่ใช้กับอายุ' },
          { text: 'I am going to Thailand.', th: 'ฉันกำลังจะไปประเทศไทย', feedback: 'ความหมายคือ "กำลังจะไป" ไม่ได้ตอบว่ามาจากไหน' },
        ],
      },
      { type: 'line', speaker: 'amy', text: "Cool! I'm from Canada. How old are you?", th: 'เจ๋งเลย! ฉันมาจากแคนาดา เธออายุเท่าไหร่' },
      {
        type: 'choice',
        prompt: 'บอกอายุของคุณ',
        options: [
          { text: "I'm thirteen years old.", th: 'ฉันอายุ 13 ปี', correct: true, feedback: 'ถูกต้อง! บอกอายุใช้ I\'m + ตัวเลข + years old' },
          { text: 'I have thirteen years old.', th: '(ประโยคผิด)', feedback: 'ภาษาอังกฤษไม่ใช้ have กับอายุ ต้องใช้ I am' },
          { text: 'My age thirteen.', th: '(ประโยคผิด)', feedback: 'ขาดกริยา ถ้าจะใช้ต้องเป็น My age is thirteen.' },
        ],
      },
      { type: 'line', speaker: 'amy', text: "Me too! What's your favorite subject?", th: 'ฉันก็เหมือนกัน! วิชาที่เธอชอบที่สุดคืออะไร' },
      {
        type: 'choice',
        prompt: 'บอกวิชาที่คุณชอบที่สุด',
        options: [
          { text: 'My favorite subject is English.', th: 'วิชาที่ฉันชอบที่สุดคือภาษาอังกฤษ', correct: true, feedback: 'ถูกต้อง! My favorite ... is ...' },
          { text: 'I favorite English.', th: '(ประโยคผิด)', feedback: 'favorite ไม่ใช่กริยา ใช้ I like English. หรือ My favorite subject is English.' },
          { text: 'Yes, I like it.', th: 'ใช่ ฉันชอบมัน', feedback: 'คำถาม What ตอบด้วย Yes/No ไม่ได้' },
        ],
      },
      { type: 'line', speaker: 'amy', text: "Great! Let's be friends. See you in class!", th: 'เยี่ยม! มาเป็นเพื่อนกันนะ แล้วเจอกันในห้องเรียน!' },
      {
        type: 'choice',
        prompt: 'ตอบรับและบอกลาเอมี่',
        options: [
          { text: 'Sure! See you later, Amy!', th: 'ได้เลย! แล้วเจอกันนะเอมี่', correct: true, feedback: 'สมบูรณ์แบบ! คุณได้เพื่อนใหม่แล้ว 🎉' },
          { text: 'No, thank you.', th: 'ไม่ล่ะ ขอบคุณ', feedback: 'เป็นการปฏิเสธ ไม่สุภาพเมื่อมีคนชวนเป็นเพื่อน' },
          { text: "You're welcome.", th: 'ไม่เป็นไร (ตอบคำขอบคุณ)', feedback: 'You\'re welcome ใช้ตอบเมื่อมีคนพูด Thank you' },
        ],
      },
    ],
  },
  {
    id: 'm1-classroom',
    grade: 1,
    title: 'Can I Borrow Your Pen?',
    titleTh: 'ภาษาในห้องเรียน',
    goal: 'ขอยืมของ ขอบคุณ ขอให้พูดซ้ำ และขอโทษอย่างสุภาพ',
    scene: {
      place: 'Classroom',
      placeTh: 'ห้องเรียน',
      set: 'classroom',
    },
    characters: {
      smith: { name: 'Ms. Smith', look: { skin: '#EFC9A8', hair: '#6B4A3A', hairStyle: 'bun', shirt: '#3D5A98', glasses: true }, voice: { gender: 'female', pitch: 1, rate: 0.95, variant: 1 } },
      ben: { name: 'Ben', look: { skin: '#A86F4C', hair: '#1F1A17', hairStyle: 'curly', shirt: '#F2B134' }, voice: { gender: 'male', pitch: 1.2, rate: 1.05 } },
    },
    vocab: [
      { word: 'borrow', meaning: 'ขอยืม (เราเป็นคนยืม)' },
      { word: 'lend', meaning: 'ให้ยืม (เราเป็นคนให้)' },
      { word: 'Here you are.', meaning: 'นี่ไง / เอาไปเลย' },
      { word: 'Could you say that again?', meaning: 'ช่วยพูดอีกครั้งได้ไหม' },
      { word: 'forgot', meaning: 'ลืม (อดีตของ forget)' },
    ],
    steps: [
      { type: 'line', speaker: 'smith', text: 'Good morning, class. Please take out your notebooks and a pen.', th: 'สวัสดีตอนเช้านักเรียน หยิบสมุดและปากกาออกมาด้วยนะ' },
      {
        type: 'choice',
        prompt: 'คุณลืมเอาปากกามา ขอยืมปากกาจากเบนอย่างสุภาพ',
        options: [
          { text: 'Ben, can I borrow your pen, please?', th: 'เบน ขอยืมปากกาหน่อยได้ไหม', correct: true, feedback: 'สุภาพมาก! Can I borrow ..., please?' },
          { text: 'Ben, give me pen now.', th: 'เบน เอาปากกามาเดี๋ยวนี้', feedback: 'เป็นคำสั่ง ฟังดูไม่สุภาพ ควรใช้ Can I ..., please?' },
          { text: 'Ben, can you borrow my pen?', th: 'เบน เธอจะยืมปากกาฉันไหม', feedback: 'สลับกัน! borrow = ขอยืม ถ้าเราเป็นคนขอต้องพูด Can I borrow your pen?' },
        ],
      },
      { type: 'line', speaker: 'ben', text: 'Sure, here you are.', th: 'ได้สิ นี่ไง' },
      {
        type: 'choice',
        prompt: 'ขอบคุณเบน',
        options: [
          { text: 'Thank you so much!', th: 'ขอบคุณมากนะ!', correct: true, feedback: 'ถูกต้อง! อย่าลืมขอบคุณทุกครั้งนะ' },
          { text: "You're welcome.", th: 'ไม่เป็นไร', feedback: 'You\'re welcome เป็นคำของคนที่ถูกขอบคุณ ไม่ใช่คนที่ขอบคุณ' },
          { text: 'Here you are.', th: 'นี่ไง', feedback: 'Here you are ใช้ตอนยื่นของให้คนอื่น' },
        ],
      },
      { type: 'line', speaker: 'ben', text: 'No problem!', th: 'ไม่มีปัญหา!' },
      { type: 'line', speaker: 'smith', text: 'Okay everyone, open your books to page twenty-five.', th: 'โอเคทุกคน เปิดหนังสือหน้า 25' },
      {
        type: 'choice',
        prompt: 'คุณได้ยินไม่ชัด ขอให้ครูพูดอีกครั้ง',
        options: [
          { text: 'Excuse me, could you say that again, please?', th: 'ขอโทษค่ะ/ครับ ช่วยพูดอีกครั้งได้ไหม', correct: true, feedback: 'สุภาพมาก! Excuse me + Could you ...?' },
          { text: 'What? Say again!', th: 'อะไรนะ? พูดอีกที!', feedback: 'ห้วนเกินไป ไม่ควรพูดกับครู' },
          { text: 'Yes, I am a question.', th: 'ใช่ ฉันเป็นคำถาม', feedback: 'ความหมายแปลกมาก 😅' },
        ],
      },
      { type: 'line', speaker: 'smith', text: 'Of course. Page twenty-five. Now, {name}, where is your homework?', th: 'ได้เลย หน้า 25 แล้ว{name} การบ้านของเธออยู่ไหน' },
      {
        type: 'choice',
        prompt: 'คุณลืมการบ้านไว้ที่บ้าน ขอโทษครู',
        options: [
          { text: "I'm sorry, I forgot it at home. Can I bring it tomorrow?", th: 'ขอโทษค่ะ/ครับ ลืมไว้ที่บ้าน พรุ่งนี้เอามาส่งได้ไหม', correct: true, feedback: 'ดีมาก! ขอโทษ + บอกเหตุผล + เสนอทางแก้' },
          { text: "It's okay. Never mind.", th: 'ไม่เป็นไร ช่างมันเถอะ', feedback: 'เป็นคำของคนที่ให้อภัย ไม่ใช่คนที่ทำผิด' },
          { text: "I'm sorry, I lose it tomorrow.", th: '(ประโยคผิด)', feedback: 'เหตุการณ์เกิดแล้วต้องใช้อดีต และ tomorrow ไม่เข้ากับความหมาย' },
        ],
      },
      { type: 'line', speaker: 'smith', text: "All right, but please don't forget again.", th: 'ก็ได้ แต่อย่าลืมอีกนะ' },
      {
        type: 'choice',
        prompt: 'สัญญากับครูว่าจะไม่ลืมอีก',
        options: [
          { text: "I won't. Thank you, Ms. Smith.", th: 'จะไม่ลืมแล้วค่ะ/ครับ ขอบคุณครูสมิธ', correct: true, feedback: 'ถูกต้อง! I won\'t = I will not' },
          { text: 'Yes, I forget.', th: 'ใช่ ฉันลืม', feedback: 'ไม่ได้สัญญาอะไรเลย' },
          { text: "Don't worry about it.", th: 'ไม่ต้องห่วงเรื่องนั้นหรอก', feedback: 'ฟังดูไม่ใส่ใจ ไม่เหมาะจะพูดกับครู' },
        ],
      },
    ],
  },

  // ───────────────────────────── ม.2 ─────────────────────────────
  {
    id: 'm2-restaurant',
    grade: 2,
    title: 'At the Restaurant',
    titleTh: 'สั่งอาหารในร้าน',
    goal: 'จองโต๊ะ สั่งอาหารและเครื่องดื่ม ขอเช็กบิล',
    scene: {
      place: 'Sunny Cafe',
      placeTh: 'ร้านซันนี่คาเฟ่',
      set: 'cafe',
    },
    characters: {
      waiter: { name: 'Waiter', look: { skin: '#E8B892', hair: '#2B211C', hairStyle: 'short', shirt: '#2B2622', apron: true }, voice: { gender: 'male', pitch: 0.95, rate: 1 } },
    },
    vocab: [
      { word: "I'd like ...", meaning: 'ฉันต้องการ... (สุภาพ)' },
      { word: 'menu', meaning: 'รายการอาหาร' },
      { word: 'Anything else?', meaning: 'รับอะไรเพิ่มไหม' },
      { word: 'delicious', meaning: 'อร่อย' },
      { word: 'the bill', meaning: 'ใบเสร็จ / เช็กบิล' },
    ],
    steps: [
      { type: 'line', speaker: 'waiter', text: 'Good evening! Welcome to Sunny Cafe. How many people?', th: 'สวัสดีตอนเย็นครับ ยินดีต้อนรับสู่ซันนี่คาเฟ่ กี่ท่านครับ' },
      {
        type: 'choice',
        prompt: 'คุณมากับเพื่อน 1 คน ขอโต๊ะสำหรับ 2 คน',
        options: [
          { text: 'A table for two, please.', th: 'ขอโต๊ะสำหรับสองคน', correct: true, feedback: 'ถูกต้อง! A table for + จำนวนคน, please.' },
          { text: "I'm two people.", th: 'ฉันคือสองคน', feedback: 'ความหมายผิด ฉันเป็นคนเดียว จะเป็นสองคนไม่ได้ 😄' },
          { text: 'Two years, please.', th: 'สองปีครับ', feedback: 'years = ปี ไม่เกี่ยวกับจำนวนคน' },
        ],
      },
      { type: 'line', speaker: 'waiter', text: 'Right this way. Here is the menu. Are you ready to order?', th: 'ทางนี้เลยครับ นี่เมนูครับ พร้อมสั่งหรือยังครับ' },
      {
        type: 'choice',
        prompt: 'สั่งแซนด์วิชไก่อย่างสุภาพ',
        options: [
          { text: "Yes. I'd like a chicken sandwich, please.", th: 'ค่ะ/ครับ ขอแซนด์วิชไก่หนึ่งที่', correct: true, feedback: 'เยี่ยม! I\'d like ... เป็นวิธีสั่งอาหารที่สุภาพ' },
          { text: 'Yes. I like chicken sandwich.', th: 'ใช่ ฉันชอบแซนด์วิชไก่', feedback: 'I like = ชอบ (โดยทั่วไป) ไม่ใช่การสั่ง ต้องใช้ I\'d like = I would like' },
          { text: "Yes, I'm a chicken sandwich.", th: 'ใช่ ฉันเป็นแซนด์วิชไก่', feedback: 'คุณกลายเป็นแซนด์วิชไปแล้ว 🥪😂' },
        ],
      },
      { type: 'line', speaker: 'waiter', text: 'Great choice. Would you like something to drink?', th: 'เลือกได้ดีครับ รับเครื่องดื่มอะไรไหมครับ' },
      {
        type: 'choice',
        prompt: 'สั่งน้ำส้ม',
        options: [
          { text: 'Could I have an orange juice, please?', th: 'ขอน้ำส้มหนึ่งแก้วได้ไหม', correct: true, feedback: 'ถูกต้อง! Could I have ..., please? สุภาพมาก' },
          { text: 'Yes, I would like to drink.', th: 'ใช่ ฉันอยากดื่ม', feedback: 'ยังไม่ได้บอกว่าจะดื่มอะไร' },
          { text: "No, I don't eat.", th: 'ไม่ ฉันไม่กิน', feedback: 'ไม่ตรงคำถาม และเราอยากได้น้ำส้มนี่นา' },
        ],
      },
      { type: 'line', speaker: 'waiter', text: 'Sure. Anything else?', th: 'ได้ครับ รับอะไรเพิ่มไหมครับ' },
      {
        type: 'choice',
        prompt: 'บอกว่าแค่นี้พอแล้ว',
        options: [
          { text: "No, that's all. Thank you.", th: 'ไม่แล้วค่ะ/ครับ แค่นี้พอ ขอบคุณ', correct: true, feedback: 'ถูกต้อง! That\'s all = แค่นั้น' },
          { text: "Yes, that's all.", th: 'ใช่ แค่นั้น', feedback: 'Anything else? ถ้าไม่เอาเพิ่มควรตอบ No' },
          { text: "I'm else.", th: '(ประโยคผิด)', feedback: 'ไม่มีความหมายในภาษาอังกฤษ' },
        ],
      },
      { type: 'line', speaker: 'waiter', text: 'Here is your food. Enjoy your meal!', th: 'อาหารมาแล้วครับ ทานให้อร่อยนะครับ' },
      { type: 'line', speaker: 'waiter', text: 'How was everything?', th: 'อาหารเป็นอย่างไรบ้างครับ' },
      {
        type: 'choice',
        prompt: 'ชมว่าอาหารอร่อย แล้วขอเช็กบิล',
        options: [
          { text: 'It was delicious! Can I have the bill, please?', th: 'อร่อยมาก! ขอเช็กบิลด้วย', correct: true, feedback: 'ยอดเยี่ยม! ใช้ was เพราะกินเสร็จแล้ว' },
          { text: 'It is delicious yesterday.', th: '(ประโยคผิด)', feedback: 'yesterday ต้องใช้อดีต และเรากินวันนี้ ไม่ใช่เมื่อวาน' },
          { text: 'I want bill. Bring now.', th: 'อยากได้บิล เอามาเดี๋ยวนี้', feedback: 'ห้วนและไม่สุภาพ' },
        ],
      },
      { type: 'line', speaker: 'waiter', text: "Of course. That's one hundred and fifty baht. Thank you for coming!", th: 'ได้ครับ ทั้งหมด 150 บาทครับ ขอบคุณที่มาใช้บริการครับ' },
    ],
  },
  {
    id: 'm2-directions',
    grade: 2,
    title: 'Excuse Me, Where Is...?',
    titleTh: 'การบอกทาง',
    goal: 'บอกทางนักท่องเที่ยว ใช้ go straight, turn left/right, next to',
    scene: {
      place: 'City Street',
      placeTh: 'ถนนในเมือง',
      set: 'street',
    },
    characters: {
      emma: { name: 'Emma', look: { skin: '#F7D9C4', hair: '#B5482A', hairStyle: 'long', shirt: '#7FA8C9' }, voice: { gender: 'female', pitch: 1.05, rate: 0.95, variant: 2 } },
    },
    vocab: [
      { word: 'go straight', meaning: 'ตรงไป' },
      { word: 'turn left / right', meaning: 'เลี้ยวซ้าย / ขวา' },
      { word: 'traffic lights', meaning: 'สัญญาณไฟจราจร' },
      { word: 'next to', meaning: 'ถัดจาก / ข้าง ๆ' },
      { word: 'How long does it take?', meaning: 'ใช้เวลานานเท่าไหร่' },
    ],
    steps: [
      { type: 'line', speaker: 'emma', text: "Excuse me. Could you help me, please? I'm looking for the City Museum.", th: 'ขอโทษนะคะ ช่วยหน่อยได้ไหมคะ ฉันกำลังหาพิพิธภัณฑ์เมือง' },
      {
        type: 'choice',
        prompt: 'บอกให้เดินตรงไปสองช่วงตึก',
        options: [
          { text: 'Sure. Go straight along this road for two blocks.', th: 'ได้เลย เดินตรงไปตามถนนนี้สองช่วงตึก', correct: true, feedback: 'ถูกต้อง! Go straight along ... for ... blocks' },
          { text: 'Sure. Go straightly this road two block.', th: '(ประโยคผิด)', feedback: 'ไม่มีคำว่า straightly และ two ต้องตามด้วย blocks (พหูพจน์)' },
          { text: "Sorry, I'm a museum.", th: 'ขอโทษ ฉันเป็นพิพิธภัณฑ์', feedback: 'คุณกลายเป็นพิพิธภัณฑ์ไปแล้ว 🏛️😆' },
        ],
      },
      { type: 'line', speaker: 'emma', text: 'Go straight for two blocks. And then?', th: 'ตรงไปสองช่วงตึก แล้วยังไงต่อคะ' },
      {
        type: 'choice',
        prompt: 'บอกให้เลี้ยวซ้ายที่ไฟแดง',
        options: [
          { text: 'Then turn left at the traffic lights.', th: 'แล้วเลี้ยวซ้ายที่สัญญาณไฟจราจร', correct: true, feedback: 'ถูกต้อง! turn left at + สถานที่' },
          { text: 'Then turning left in traffic lights.', th: '(ประโยคผิด)', feedback: 'ประโยคบอกทางใช้กริยาช่องที่ 1 (turn) และใช้ at ไม่ใช่ in' },
          { text: 'Then you can turn off the lights.', th: 'แล้วคุณก็ปิดไฟได้', feedback: 'turn off = ปิด (ไฟ/เครื่อง) ไม่ใช่การเลี้ยว 💡' },
        ],
      },
      { type: 'line', speaker: 'emma', text: 'Turn left at the traffic lights. Is it far from there?', th: 'เลี้ยวซ้ายที่ไฟแดง แล้วจากตรงนั้นไกลไหมคะ' },
      {
        type: 'choice',
        prompt: 'บอกว่าไม่ไกล อยู่ข้าง ๆ ไปรษณีย์',
        options: [
          { text: "No, it's not far. It's next to the post office.", th: 'ไม่ไกลครับ/ค่ะ อยู่ข้างที่ทำการไปรษณีย์', correct: true, feedback: 'เยี่ยม! next to = ข้าง ๆ' },
          { text: "No, it's far. It's very far.", th: 'ไม่ มันไกล ไกลมาก', feedback: 'ตอบ No แล้วบอกว่าไกล ขัดแย้งกันเอง' },
          { text: "Yes, it's near.", th: 'ใช่ มันใกล้', feedback: 'ถามว่า "ไกลไหม" ตอบ Yes แปลว่าไกล แต่ต่อด้วย near ขัดกัน' },
        ],
      },
      { type: 'line', speaker: 'emma', text: 'How long does it take to walk there?', th: 'เดินไปใช้เวลานานเท่าไหร่คะ' },
      {
        type: 'choice',
        prompt: 'บอกว่าใช้เวลาประมาณ 10 นาที',
        options: [
          { text: 'It takes about ten minutes.', th: 'ใช้เวลาประมาณสิบนาที', correct: true, feedback: 'ถูกต้อง! It takes + ระยะเวลา' },
          { text: "It's ten o'clock.", th: 'ตอนนี้สิบโมง', feedback: 'บอกเวลา (กี่โมง) ไม่ใช่ระยะเวลา' },
          { text: "It's ten kilometers long.", th: 'มันยาวสิบกิโลเมตร', feedback: 'ถามเรื่องเวลา ไม่ใช่ความยาว (และเดิน 10 กม. ไกลมาก!)' },
        ],
      },
      { type: 'line', speaker: 'emma', text: 'Thank you so much for your help!', th: 'ขอบคุณมากที่ช่วยนะคะ' },
      {
        type: 'choice',
        prompt: 'ตอบรับคำขอบคุณ',
        options: [
          { text: "You're welcome. Have a nice day!", th: 'ไม่เป็นไรครับ/ค่ะ ขอให้เป็นวันที่ดีนะ', correct: true, feedback: 'สุภาพมาก! คุณเป็นไกด์ที่ดี 🌟' },
          { text: 'Yes, please.', th: 'ค่ะ/ครับ กรุณา', feedback: 'ใช้ตอบรับข้อเสนอ ไม่ใช่ตอบคำขอบคุณ' },
          { text: "I'm sorry.", th: 'ขอโทษ', feedback: 'ไม่ได้ทำอะไรผิด ไม่ต้องขอโทษ' },
        ],
      },
    ],
  },

  // ───────────────────────────── ม.3 ─────────────────────────────
  {
    id: 'm3-shopping',
    grade: 3,
    title: 'Shopping for Clothes',
    titleTh: 'ซื้อเสื้อผ้า',
    goal: 'ถามไซซ์ ขอลองเสื้อ ถามราคา และเลือกวิธีจ่ายเงิน',
    scene: {
      place: 'Clothing Store',
      placeTh: 'ร้านเสื้อผ้า',
      set: 'shop',
    },
    characters: {
      clerk: { name: 'Shop Assistant', look: { skin: '#EBC3A0', hair: '#2B1E18', hairStyle: 'bun', shirt: '#C2577A' }, voice: { gender: 'female', pitch: 1.15, rate: 1.05, variant: 1 } },
    },
    vocab: [
      { word: 'size', meaning: 'ขนาด' },
      { word: 'try it on', meaning: 'ลองสวม (สรรพนามอยู่ตรงกลาง)' },
      { word: 'fitting room', meaning: 'ห้องลองเสื้อ' },
      { word: 'How much ...?', meaning: 'ราคาเท่าไหร่' },
      { word: 'change', meaning: 'เงินทอน' },
    ],
    steps: [
      { type: 'line', speaker: 'clerk', text: 'Hello! Can I help you?', th: 'สวัสดีค่ะ มีอะไรให้ช่วยไหมคะ' },
      {
        type: 'choice',
        prompt: 'บอกว่าคุณกำลังหาเสื้อยืด',
        options: [
          { text: "Yes, please. I'm looking for a T-shirt.", th: 'ค่ะ/ครับ กำลังหาเสื้อยืดอยู่', correct: true, feedback: 'ถูกต้อง! look for = มองหา' },
          { text: "No, I'm looking for a T-shirt.", th: 'ไม่ ฉันกำลังหาเสื้อยืด', feedback: 'ตอบ No แต่อยากให้ช่วยหา ขัดกันเอง' },
          { text: 'Yes, I help you.', th: 'ใช่ ฉันช่วยคุณ', feedback: 'สลับบทบาท! พนักงานเป็นคนช่วย ไม่ใช่เรา' },
        ],
      },
      { type: 'line', speaker: 'clerk', text: 'What size do you wear?', th: 'ใส่ไซซ์อะไรคะ' },
      {
        type: 'choice',
        prompt: 'บอกว่าปกติใส่ไซซ์ M',
        options: [
          { text: 'I usually wear a medium.', th: 'ปกติใส่ไซซ์กลาง (M)', correct: true, feedback: 'ถูกต้อง! usually = โดยปกติ' },
          { text: 'I wear size blue.', th: 'ฉันใส่ไซซ์สีฟ้า', feedback: 'blue เป็นสี ไม่ใช่ไซซ์' },
          { text: 'I wore a medium tomorrow.', th: '(ประโยคผิด)', feedback: 'wore เป็นอดีต ใช้กับ tomorrow ไม่ได้' },
        ],
      },
      { type: 'line', speaker: 'clerk', text: "How about this blue one? It's very popular.", th: 'ตัวสีฟ้านี้เป็นอย่างไรคะ ขายดีมากเลย' },
      {
        type: 'choice',
        prompt: 'ชมว่าสวย และขอลองใส่',
        options: [
          { text: 'It looks nice. Can I try it on?', th: 'ดูดีนะ ขอลองใส่ได้ไหม', correct: true, feedback: 'เยี่ยม! try + it + on (สรรพนามต้องอยู่ตรงกลาง)' },
          { text: 'It looks nice. Can I try on it?', th: '(ประโยคผิดไวยากรณ์)', feedback: 'phrasal verb แยกได้ ถ้าเป็นสรรพนาม (it) ต้องอยู่ตรงกลาง: try it on' },
          { text: 'It looks nice. Can I take it home free?', th: 'ดูดีนะ เอากลับบ้านฟรีได้ไหม', feedback: 'ร้านคงไม่ยอมแน่ ๆ 😂' },
        ],
      },
      { type: 'line', speaker: 'clerk', text: 'Sure. The fitting room is over there.', th: 'ได้ค่ะ ห้องลองอยู่ทางโน้นค่ะ' },
      { type: 'line', speaker: 'clerk', text: 'So, how does it fit?', th: 'เป็นอย่างไรบ้างคะ ใส่พอดีไหม' },
      {
        type: 'choice',
        prompt: 'เสื้อเล็กไป ขอตัวที่ใหญ่กว่า',
        options: [
          { text: "It's a bit too small. Do you have a bigger one?", th: 'เล็กไปนิด มีตัวใหญ่กว่านี้ไหม', correct: true, feedback: 'ถูกต้อง! too + adj = ...เกินไป, bigger = ใหญ่กว่า' },
          { text: "It's a bit too small. Do you have a smaller one?", th: 'เล็กไปนิด มีตัวเล็กกว่านี้ไหม', feedback: 'เล็กไปแล้ว ถ้าเอาตัวเล็กกว่าจะยิ่งใส่ไม่ได้' },
          { text: "It's too much small. Do you have more big?", th: '(ประโยคผิด)', feedback: 'ใช้ too small ไม่ต้องมี much และขั้นกว่าของ big คือ bigger' },
        ],
      },
      { type: 'line', speaker: 'clerk', text: 'Here you are. This one is a large. It looks great on you!', th: 'นี่ค่ะ ตัวนี้ไซซ์ L ใส่แล้วดูดีมากเลยค่ะ' },
      {
        type: 'choice',
        prompt: 'ขอบคุณ แล้วถามราคา',
        options: [
          { text: 'Thanks! How much is it?', th: 'ขอบคุณ! ราคาเท่าไหร่', correct: true, feedback: 'ถูกต้อง! ถามราคาใช้ How much' },
          { text: 'Thanks! How many is it?', th: '(ประโยคผิด)', feedback: 'How many ใช้ถามจำนวน (นับได้) ราคาต้องใช้ How much' },
          { text: 'Thanks! How much does it costs?', th: '(ประโยคผิด)', feedback: 'หลัง does กริยาต้องไม่เติม s: How much does it cost?' },
        ],
      },
      { type: 'line', speaker: 'clerk', text: "It's two hundred and ninety-nine baht. Would you like to pay by cash or card?", th: '299 บาทค่ะ จะจ่ายเงินสดหรือบัตรคะ' },
      {
        type: 'choice',
        prompt: 'บอกว่าจะจ่ายเงินสด',
        options: [
          { text: "I'll pay by cash, please.", th: 'จ่ายเงินสดค่ะ/ครับ', correct: true, feedback: 'ถูกต้อง! pay by cash / pay by card' },
          { text: 'Yes, I would.', th: 'ใช่ ฉันจะ', feedback: 'คำถามแบบ A or B? ต้องเลือกตอบ ตอบ Yes/No ไม่ได้' },
          { text: 'I pay cash by card.', th: '(ประโยคสับสน)', feedback: 'จ่ายเงินสดด้วยบัตร? ความหมายขัดกันเอง' },
        ],
      },
      { type: 'line', speaker: 'clerk', text: "Thank you. Here's your change. Have a nice day!", th: 'ขอบคุณค่ะ นี่เงินทอนค่ะ ขอให้เป็นวันที่ดีนะคะ' },
    ],
  },
  {
    id: 'm3-plans',
    grade: 3,
    title: 'Weekend Plans',
    titleTh: 'ชวนเพื่อนเที่ยวสุดสัปดาห์',
    goal: 'ตอบรับคำชวน นัดเวลา เสนอความคิด ใช้ future tense',
    scene: {
      place: 'Phone Call',
      placeTh: 'คุยโทรศัพท์',
      set: 'night',
    },
    characters: {
      jake: { name: 'Jake', look: { skin: '#8C5A3C', hair: '#17120F', hairStyle: 'short', shirt: '#2A7F72' }, voice: { gender: 'male', pitch: 1.05, rate: 1.05, variant: 1 } },
    },
    vocab: [
      { word: 'free', meaning: 'ว่าง' },
      { word: "I'd love to!", meaning: 'อยากไปมาก! (ตอบรับคำชวน)' },
      { word: 'Sounds good!', meaning: 'ฟังดูดี / ตกลง' },
      { word: "Why don't we ...?", meaning: 'ทำไมเราไม่... ล่ะ (ใช้เสนอความคิด)' },
      { word: 'book (v.)', meaning: 'จอง' },
    ],
    steps: [
      { type: 'line', speaker: 'jake', text: 'Hey {name}! Are you free this Saturday?', th: 'เฮ้{name}! เสาร์นี้ว่างไหม' },
      {
        type: 'choice',
        prompt: 'ตอบว่าว่าง และถามว่ามีอะไร',
        options: [
          { text: 'Yes, I am. Why?', th: 'ว่างสิ มีอะไรเหรอ', correct: true, feedback: 'ถูกต้อง! ถามด้วย Are you ...? ตอบด้วย I am' },
          { text: 'Yes, I do. Why?', th: '(ประโยคผิด)', feedback: 'คำถามขึ้นต้นด้วย Are ต้องตอบด้วย am ไม่ใช่ do' },
          { text: 'I was free yesterday.', th: 'เมื่อวานฉันว่าง', feedback: 'เพื่อนถามถึงวันเสาร์นี้ ไม่ใช่เมื่อวาน' },
        ],
      },
      { type: 'line', speaker: 'jake', text: "There's a new movie at the mall. Would you like to see it with me?", th: 'มีหนังใหม่เข้าที่ห้าง อยากไปดูด้วยกันไหม' },
      {
        type: 'choice',
        prompt: 'ตอบรับคำชวนอย่างดีใจ และถามเวลาหนังเริ่ม',
        options: [
          { text: "I'd love to! What time does it start?", th: 'อยากไปมาก! หนังเริ่มกี่โมง', correct: true, feedback: 'ยอดเยี่ยม! I\'d love to = ตอบรับคำชวนแบบกระตือรือร้น' },
          { text: 'I love it to! When it start?', th: '(ประโยคผิด)', feedback: 'ต้องเป็น I\'d love to และคำถามต้องมี does: When does it start?' },
          { text: "No, I wouldn't. Sure!", th: 'ไม่ไป...ได้เลย!', feedback: 'ปฏิเสธแล้วตอบรับในประโยคเดียว ขัดกันเอง' },
        ],
      },
      { type: 'line', speaker: 'jake', text: "It starts at two p.m. Let's meet in front of the cinema at one thirty.", th: 'เริ่มบ่ายสอง เจอกันหน้าโรงหนังบ่ายโมงครึ่งนะ' },
      {
        type: 'choice',
        prompt: 'ตกลง และถามว่าจะเดินทางไปอย่างไร',
        options: [
          { text: 'Sounds good! How are we going to get there?', th: 'ตกลง! เราจะไปที่นั่นยังไงดี', correct: true, feedback: 'ถูกต้อง! be going to = แผนในอนาคต' },
          { text: 'Sounds good! How we will go there?', th: '(ประโยคผิด)', feedback: 'ประโยคคำถามต้องสลับ will ไว้หน้าประธาน: How will we go there?' },
          { text: 'Sounds good! What are we going there?', th: '(ประโยคผิด)', feedback: 'ถามวิธีการเดินทางต้องใช้ How ไม่ใช่ What' },
        ],
      },
      { type: 'line', speaker: 'jake', text: "Let's take the bus. It's cheaper than a taxi.", th: 'นั่งรถเมล์ไปกัน ถูกกว่าแท็กซี่' },
      {
        type: 'choice',
        prompt: 'เห็นด้วย และเสนอให้กินข้าวกลางวันก่อนดูหนัง',
        options: [
          { text: "Good idea. Why don't we have lunch before the movie?", th: 'ดีเลย งั้นเรากินข้าวกลางวันก่อนดูหนังดีไหม', correct: true, feedback: 'เยี่ยม! Why don\'t we + V1 ...? ใช้เสนอความคิด' },
          { text: "Good idea. Why don't we had lunch before the movie?", th: '(ประโยคผิด)', feedback: 'หลัง don\'t ต้องใช้กริยาช่อง 1: have' },
          { text: "Good idea. Why we don't have lunch before the movie?", th: '(ประโยคผิด)', feedback: 'ลำดับคำผิด ต้องเป็น Why don\'t we ...?' },
        ],
      },
      { type: 'line', speaker: 'jake', text: "That's a great idea! I'll book the tickets tonight.", th: 'ความคิดดีมาก! คืนนี้เราจะจองตั๋วไว้นะ' },
      {
        type: 'choice',
        prompt: 'ขอบคุณ และบอกลา',
        options: [
          { text: 'Great, thanks! See you on Saturday.', th: 'เยี่ยม ขอบใจนะ! เจอกันวันเสาร์', correct: true, feedback: 'สมบูรณ์แบบ! นัดเพื่อนสำเร็จ 🎬🍿' },
          { text: 'Great! See you last Saturday.', th: 'เยี่ยม! เจอกันเสาร์ที่แล้ว', feedback: 'last Saturday = เสาร์ที่แล้ว (อดีต) นัดล่วงหน้าไม่ได้' },
          { text: 'Great! I saw you on Saturday.', th: 'เยี่ยม! ฉันเห็นเธอวันเสาร์', feedback: 'saw เป็นอดีต แต่เรากำลังนัดอนาคต' },
        ],
      },
      { type: 'line', speaker: 'jake', text: 'See you! Bye!', th: 'เจอกัน! บาย!' },
    ],
  },
];
