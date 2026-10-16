# Scoreboard Studio

ระบบป้ายคะแนนสำหรับไลฟ์สตรีม ใช้กับ **OBS Studio** ได้ทันที
หน้าควบคุมเปิดบนคอมหรือมือถือ แล้ว overlay บน OBS จะอัปเดตแบบเรียลไทม์ (WebSocket)

- ควบคุมคะแนน 2 ทีม (+1/+2/+3/+5, แก้ตัวเลขตรง ๆ ได้)
- นาฬิกานับขึ้น / นับถอยหลัง (หยุดเองเมื่อหมดเวลา), ปรับ ±1s/10s/1m, ตั้งเวลาได้
- ชื่อทีม ชื่อย่อ สีทีม โลโก้ (ลิงก์รูป) ชื่อรายการ และช่วงการแข่งขัน (1st Half, Q1, Set 1 …)
- Overlay 3 แบบ: **Top Bar**, **Corner**, **Broadcast** พร้อมซ่อน/แสดงแบบมีแอนิเมชัน
- ย้อนกลับ (Undo), สลับฝั่ง, เริ่มแมตช์ใหม่
- ควบคุมจากมือถือที่ต่อ Wi-Fi เดียวกันได้ และข้อมูลถูกบันทึกไว้ (`data/state.json`) ปิดเปิดใหม่ไม่หาย

## เริ่มใช้งาน

ต้องมี [Node.js](https://nodejs.org) 18 ขึ้นไป

```bash
npm install
npm start
```

จะได้ลิงก์:

| หน้า | ลิงก์ |
|---|---|
| หน้าควบคุม | http://localhost:3000/control |
| Overlay สำหรับ OBS | http://localhost:3000/overlay |
| ควบคุมจากมือถือ | http://IP-ของเครื่อง:3000/control (แสดงในหน้าควบคุม) |

> ตอนพัฒนาโค้ดใช้ `npm run dev` (พอร์ต 5173, แก้โค้ดแล้วรีเฟรชอัตโนมัติ)

## เชื่อมกับ OBS

1. OBS → **Sources** → **+** → **Browser**
2. URL: `http://localhost:3000/overlay`
3. Width `1920` · Height `1080` (ขนาดอื่นได้ overlay จะย่อ/ขยายตามสัดส่วนเอง)
4. กด OK — พื้นหลังโปร่งใสอยู่แล้ว ไม่ต้องใส่ Custom CSS

ถ้า OBS อยู่คนละเครื่องกับที่รัน server ให้ใช้ IP ของเครื่อง server แทน `localhost`

## คีย์ลัด (หน้าควบคุม)

| ปุ่ม | การทำงาน |
|---|---|
| `Q` / `A` | ทีมเหย้า +1 / −1 |
| `P` / `L` | ทีมเยือน +1 / −1 |
| `Space` | เริ่ม / หยุดเวลา |
| `H` | ซ่อน / แสดง overlay |
| `Ctrl/⌘ + Z` | ย้อนกลับ |

## โครงสร้าง

```
server/
├── store.js     state ของแมตช์ + การกระทำทั้งหมด (reducer), undo, บันทึกไฟล์, หยุดนาฬิกาเมื่อหมดเวลา
├── socket.js    WebSocket /ws กระจาย state ให้ทุกหน้าจอ
├── info.js      /api/info (IP ในวง LAN)
└── index.js     server โหมดใช้งานจริง (เสิร์ฟ dist + WebSocket พอร์ตเดียว)
src/
├── main.jsx                  /overlay → Overlay, อื่น ๆ → หน้าควบคุม
├── hooks/useScoreboard.js    เชื่อม WebSocket + ต่อใหม่อัตโนมัติ + ซิงก์เวลากับ server
├── hooks/useClockValue.js    คำนวณเวลาที่ต้องแสดงทุก 100ms
├── components/control/       หน้าควบคุม (TeamCard, ClockCard, MatchCard, OverlayCard)
├── components/overlay/       Overlay + ธีม BarTheme / CornerTheme / BroadcastTheme
└── styles/                   control.css, overlay.css
vite.config.js                ตอน dev ฝัง WebSocket server ไว้ใน Vite
```

นาฬิกาเก็บเป็น "เวลาที่เริ่ม" บน server ทุกหน้าจอคำนวณเองจากเวลานั้น จึงตรงกันทุกเครื่องและไม่ค้างแม้เน็ตกระตุก

> หมายเหตุ: server ไม่มีระบบล็อกอิน ใครที่อยู่ในวง Wi-Fi เดียวกันและรู้ลิงก์จะควบคุมได้ ใช้ในเครือข่ายที่ไว้ใจได้
