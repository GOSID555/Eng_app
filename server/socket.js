import { WebSocketServer } from 'ws';

// WebSocket ที่ /ws: ส่ง state ให้ทุกหน้าจอทันทีที่มีการเปลี่ยนแปลง
export function attachSocket(httpServer, store) {
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (req, socket, head) => {
    if (new URL(req.url, 'http://localhost').pathname !== '/ws') return; // ปล่อยให้ Vite HMR จัดการ
    wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req));
  });

  const payload = () =>
    JSON.stringify({ type: 'state', state: store.state, canUndo: store.canUndo, serverTime: Date.now() });

  wss.on('connection', (ws) => {
    ws.send(payload());
    ws.on('message', (raw) => {
      try {
        const msg = JSON.parse(raw);
        if (msg.type === 'action') store.dispatch(msg.action);
      } catch {
        /* ignore bad message */
      }
    });
  });

  store.subscribe(() => {
    const data = payload();
    wss.clients.forEach((ws) => ws.readyState === 1 && ws.send(data));
  });

  return wss;
}
