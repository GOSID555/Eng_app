import { useState } from 'react';

const THEMES = [
  { id: 'bar', name: 'Top Bar', desc: 'แถบบนกลางจอ' },
  { id: 'corner', name: 'Corner', desc: 'กล่องมุมซ้ายบน' },
  { id: 'broadcast', name: 'Broadcast', desc: 'การ์ดใหญ่ด้านล่าง' },
];

export default function OverlayCard({ overlay, dispatch }) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/overlay`;
  const set = (patch) => dispatch({ type: 'overlay/update', ...patch });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt('คัดลอกลิงก์นี้ไปใส่ใน OBS', url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="panel overlay-card">
      <header className="panel-head">
        <span>Overlay บน OBS</span>
        <span className="hint">
          <kbd>H</kbd> ซ่อน/แสดง
        </span>
      </header>

      <div className="preview">
        <iframe src="/overlay" title="ตัวอย่าง overlay" tabIndex={-1} />
        {!overlay.visible && <span className="preview-hidden">ซ่อนอยู่</span>}
      </div>

      <button className={`btn big ${overlay.visible ? 'danger-outline' : 'primary'}`} onClick={() => set({ visible: !overlay.visible })}>
        {overlay.visible ? 'ซ่อน Scoreboard' : 'แสดง Scoreboard'}
      </button>

      <div className="theme-list">
        {THEMES.map((t) => (
          <button key={t.id} className={`theme-opt ${overlay.theme === t.id ? 'on' : ''}`} onClick={() => set({ theme: t.id })}>
            <span className={`theme-thumb ${t.id}`}>
              <i />
            </span>
            <strong>{t.name}</strong>
            <small>{t.desc}</small>
          </button>
        ))}
      </div>

      <div className="toggle-row">
        <label className="switch">
          <input type="checkbox" checked={overlay.showClock} onChange={(e) => set({ showClock: e.target.checked })} />
          <i />
          <span>แสดงเวลา</span>
        </label>
        <label className="switch">
          <input type="checkbox" checked={overlay.showTitle} onChange={(e) => set({ showTitle: e.target.checked })} />
          <i />
          <span>แสดงชื่อรายการ</span>
        </label>
      </div>

      <div className="obs-url">
        <span className="obs-label">URL สำหรับ OBS</span>
        <div className="url-box">
          <code>{url}</code>
          <button className="btn small" onClick={copy}>
            {copied ? 'คัดลอกแล้ว ✓' : 'คัดลอก'}
          </button>
        </div>
        <p className="obs-help">
          OBS → Sources → <b>+</b> → <b>Browser</b> → วางลิงก์นี้ → Width <b>1920</b> Height <b>1080</b>
        </p>
      </div>
    </section>
  );
}
