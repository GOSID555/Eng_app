// โหมดใช้งานจริง: เสิร์ฟไฟล์ที่ build แล้ว + WebSocket บนพอร์ตเดียว
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStore } from './store.js';
import { attachSocket } from './socket.js';
import { infoHandler, lanAddresses } from './info.js';

const PORT = Number(process.env.PORT) || 3000;
const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
};

const info = infoHandler(() => PORT);

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  if (pathname === '/api/info') return info(req, res);

  let file = path.join(DIST, decodeURIComponent(pathname));
  if (!file.startsWith(DIST)) return res.writeHead(403).end();
  fs.stat(file, (err, st) => {
    if (err || st.isDirectory()) file = path.join(DIST, 'index.html'); // SPA: /control, /overlay
    if (!fs.existsSync(file)) return res.writeHead(500).end('dist not found - run "npm run build" first');
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
});

attachSocket(server, createStore());

server.listen(PORT, '0.0.0.0', () => {
  console.log('\n  Scoreboard Studio is running\n');
  console.log(`  Control:  http://localhost:${PORT}/control`);
  console.log(`  Overlay:  http://localhost:${PORT}/overlay   ← ใส่ใน OBS (Browser Source 1920×1080)`);
  lanAddresses().forEach((ip) => console.log(`  Phone:    http://${ip}:${PORT}/control`));
  console.log('');
});
