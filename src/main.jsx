import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ControlPanel from './components/control/ControlPanel.jsx';
import Overlay from './components/overlay/Overlay.jsx';
import './styles/control.css';
import './styles/overlay.css';

// /overlay = หน้าสำหรับ OBS, หน้าอื่นทั้งหมด = หน้าควบคุม
const isOverlay = window.location.pathname.startsWith('/overlay');
document.documentElement.classList.add(isOverlay ? 'is-overlay' : 'is-control');

createRoot(document.getElementById('root')).render(
  <StrictMode>{isOverlay ? <Overlay /> : <ControlPanel />}</StrictMode>,
);
