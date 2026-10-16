import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createStore } from './server/store.js';
import { attachSocket } from './server/socket.js';
import { infoHandler } from './server/info.js';

// ตอน dev ให้ Vite ทำหน้าที่เป็น server ของ scoreboard ด้วย (WebSocket /ws + /api/info)
const scoreboardServer = () => ({
  name: 'scoreboard-server',
  configureServer(server) {
    const store = createStore();
    server.middlewares.use('/api/info', infoHandler(() => server.config.server.port));
    attachSocket(server.httpServer, store);
  },
});

export default defineConfig({
  plugins: [react(), scoreboardServer()],
  server: { host: true, port: 5173 },
  // OBS ใช้ Chromium รุ่นเก่ากว่าเบราว์เซอร์ปกติ
  build: { target: ['chrome95', 'safari15', 'firefox100', 'edge95'] },
});
