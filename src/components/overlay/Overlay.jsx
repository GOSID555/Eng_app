import { useScoreboard } from '../../hooks/useScoreboard.js';
import { useClockValue } from '../../hooks/useClockValue.js';
import { formatClock } from '../../utils/time.js';
import BarTheme from './BarTheme.jsx';
import CornerTheme from './CornerTheme.jsx';
import BroadcastTheme from './BroadcastTheme.jsx';

const THEMES = { bar: BarTheme, corner: CornerTheme, broadcast: BroadcastTheme };

// หน้านี้ใส่ใน OBS → Browser Source (พื้นหลังโปร่งใส)
export default function Overlay() {
  const { state, serverNow } = useScoreboard();
  const ms = useClockValue(state?.clock, serverNow);
  if (!state) return null;

  const Theme = THEMES[state.overlay.theme] || BarTheme;
  const time = formatClock(ms, state.clock.direction);
  const lowTime = state.clock.direction === 'down' && ms <= 10000;

  return (
    <div className={`ov-root ${state.overlay.visible ? '' : 'ov-hidden'}`}>
      <Theme state={state} time={time} lowTime={lowTime} />
    </div>
  );
}
