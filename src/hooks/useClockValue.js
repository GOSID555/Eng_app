import { useEffect, useState } from 'react';
import { clockValue } from '../utils/time.js';

// คืนค่าเวลาที่ต้องแสดง (ms) และอัปเดตทุก 100ms ขณะนาฬิกาเดิน
export function useClockValue(clock, serverNow) {
  const [, tick] = useState(0);
  const running = Boolean(clock?.running);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => tick((t) => t + 1), 100);
    return () => clearInterval(id);
  }, [running]);
  return clock ? clockValue(clock, serverNow()) : 0;
}
