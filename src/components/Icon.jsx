// ไอคอนเส้น (stroke) ชุดเล็ก ๆ ใช้แทนอีโมจิในปุ่ม
const PATHS = {
  speaker: 'M4 9v6h4l5 4V5L8 9H4z M16.5 8.5a5 5 0 0 1 0 7 M19 6a8.5 8.5 0 0 1 0 12',
  replay: 'M3 12a9 9 0 1 0 3-6.7 M3 4v5h5',
  pause: 'M8 5v14 M16 5v14',
  play: 'M7 5l12 7-12 7z',
  next: 'M5 5l10 7-10 7z M19 5v14',
  back: 'M15 18l-6-6 6-6',
  sliders: 'M4 7h10 M18 7h2 M4 17h4 M12 17h8 M16 5v4 M10 15v4',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  x: 'M6 6l12 12 M18 6L6 18',
  home: 'M4 11l8-7 8 7 M6 9.5V20h12V9.5',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
};

export default function Icon({ name, size = 18, strokeWidth = 2 }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
