import { useCallback, useEffect, useRef, useState } from 'react';

// เชื่อมต่อ WebSocket กับ server, ต่อใหม่อัตโนมัติถ้าหลุด
export function useScoreboard() {
  const [state, setState] = useState(null);
  const [status, setStatus] = useState('connecting');
  const [canUndo, setCanUndo] = useState(false);
  const wsRef = useRef(null);
  const offsetRef = useRef(0); // เวลา server - เวลาเครื่องนี้ (ให้นาฬิกาตรงกันทุกจอ)

  useEffect(() => {
    let closed = false;
    let retry;
    const connect = () => {
      const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
      const ws = new WebSocket(`${proto}://${window.location.host}/ws`);
      wsRef.current = ws;
      ws.onopen = () => setStatus('online');
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.type !== 'state') return;
        offsetRef.current = msg.serverTime - Date.now();
        setState(msg.state);
        setCanUndo(msg.canUndo);
      };
      ws.onclose = () => {
        if (closed) return;
        setStatus('offline');
        retry = setTimeout(connect, 1000);
      };
    };
    connect();
    return () => {
      closed = true;
      clearTimeout(retry);
      wsRef.current?.close();
    };
  }, []);

  const dispatch = useCallback((action) => {
    const ws = wsRef.current;
    if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'action', action }));
  }, []);

  const serverNow = useCallback(() => Date.now() + offsetRef.current, []);

  return { state, status, canUndo, dispatch, serverNow };
}
