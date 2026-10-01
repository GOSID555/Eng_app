export default function SettingsPanel({ settings, onChange, compact = false }) {
  const set = (patch) => onChange({ ...settings, ...patch });

  return (
    <section className={`settings ${compact ? 'compact' : ''}`}>
      {!compact && (
        <>
          <label className="field">
            <span>ชื่อของฉัน (ภาษาอังกฤษ)</span>
            <input
              value={settings.playerName}
              maxLength={16}
              onChange={(e) => set({ playerName: e.target.value.replace(/[^A-Za-z .'-]/g, '') })}
              placeholder="Your name"
            />
          </label>
          <div className="field">
            <span>ตัวละครของฉัน</span>
            <div className="seg">
              <button className={settings.playerGender === 'female' ? 'on' : ''} onClick={() => set({ playerGender: 'female' })}>หญิง</button>
              <button className={settings.playerGender === 'male' ? 'on' : ''} onClick={() => set({ playerGender: 'male' })}>ชาย</button>
            </div>
          </div>
        </>
      )}
      <div className="field">
        <span>ความเร็วเสียง</span>
        <div className="seg">
          <button className={settings.rate < 0.8 ? 'on' : ''} onClick={() => set({ rate: 0.7 })}>ช้า</button>
          <button className={settings.rate >= 0.8 && settings.rate < 1 ? 'on' : ''} onClick={() => set({ rate: 0.9 })}>ปกติ</button>
          <button className={settings.rate >= 1 ? 'on' : ''} onClick={() => set({ rate: 1.05 })}>เร็ว</button>
        </div>
      </div>
      <div className="toggles">
        <label className="switch">
          <input type="checkbox" checked={settings.showThai} onChange={(e) => set({ showThai: e.target.checked })} />
          <i />
          <span>แสดงคำแปลไทย</span>
        </label>
        <label className="switch">
          <input type="checkbox" checked={settings.autoPlay} onChange={(e) => set({ autoPlay: e.target.checked })} />
          <i />
          <span>เล่นต่ออัตโนมัติ</span>
        </label>
      </div>
    </section>
  );
}
