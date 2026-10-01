// ตัวละครวาดด้วย SVG — ปากขยับเมื่อพูด กะพริบตาเอง
const CURLS = [
  [40, 46, 9], [45, 35, 10], [54, 28, 10], [65, 27, 10], [75, 32, 10], [81, 42, 9], [83, 52, 6], [37, 55, 6],
];

export default function Avatar({ look, speaking = false, framed = false, bg = '#E9DFCB' }) {
  const { skin, hair, hairStyle = 'short', shirt, glasses, apron } = look;
  const id = `clip-${hairStyle}-${shirt.slice(1)}-${skin.slice(1)}`;

  return (
    <svg className={`avatar ${speaking ? 'speaking' : ''}`} viewBox="0 0 120 120" aria-hidden="true">
      {framed && (
        <defs>
          <clipPath id={id}>
            <circle cx="60" cy="60" r="60" />
          </clipPath>
        </defs>
      )}
      <g clipPath={framed ? `url(#${id})` : undefined}>
        {framed && <rect width="120" height="120" fill={bg} />}

        {/* ผมด้านหลัง */}
        {hairStyle === 'long' && <path d="M33 54C30 28 45 20 60 20c16 0 30 9 27 36l3 44H30z" fill={hair} />}
        {hairStyle === 'bun' && <circle cx="60" cy="21" r="11" fill={hair} />}

        {/* ลำตัว */}
        <path d="M16 122c0-24 18-37 44-37s44 13 44 37z" fill={shirt} />
        {apron && <path d="M44 94h32v28H44z" fill="#F3EDE2" />}
        <path d="M52 86l8 9 8-9" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="2.5" strokeLinejoin="round" />
        {hairStyle === 'long' && <path d="M30 96c4-12 6-30 6-30h8l-2 32z M90 96c-4-12-6-30-6-30h-8l2 32z" fill={hair} />}

        {/* คอ หู หัว */}
        <rect x="53" y="70" width="14" height="17" rx="5" fill={skin} />
        <rect x="53" y="76" width="14" height="5" fill="rgba(0,0,0,.08)" />
        <circle cx="39" cy="57" r="4.5" fill={skin} />
        <circle cx="81" cy="57" r="4.5" fill={skin} />
        <ellipse cx="60" cy="53" rx="21.5" ry="24" fill={skin} />

        {/* หน้า */}
        <g className="eyes">
          <circle cx="52" cy="56" r="2.7" fill="#1E1B18" />
          <circle cx="68" cy="56" r="2.7" fill="#1E1B18" />
        </g>
        <path d="M48 49.5q4-2.5 8 0 M64 49.5q4-2.5 8 0" fill="none" stroke={hair} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="46" cy="64" r="3.6" fill="#E46B5D" opacity=".22" />
        <circle cx="74" cy="64" r="3.6" fill="#E46B5D" opacity=".22" />
        {speaking ? (
          <ellipse className="mouth-talk" cx="60" cy="67.5" rx="4.6" ry="3.4" fill="#7A2E2A" />
        ) : (
          <path d="M55 66.5q5 4 10 0" fill="none" stroke="#1E1B18" strokeWidth="2" strokeLinecap="round" />
        )}
        {glasses && (
          <g fill="none" stroke="#1E1B18" strokeWidth="1.7">
            <circle cx="52" cy="56" r="6.2" />
            <circle cx="68" cy="56" r="6.2" />
            <path d="M58.2 56h3.6" />
          </g>
        )}

        {/* ผมด้านหน้า */}
        {hairStyle === 'short' && <path d="M37 50c-3-21 10-28 24-28 15 0 26 9 23 28-3-9-12-15-23-14-12 0-21 5-24 14z" fill={hair} />}
        {hairStyle === 'long' && <path d="M36 52c1-20 13-27 26-26 12 1 22 9 22 25-8-8-17-12-27-10-9 2-15 6-21 11z" fill={hair} />}
        {hairStyle === 'bun' && <path d="M37 50c-1-19 11-25 23-25 13 0 25 7 23 25-3-10-12-15-23-14-11 0-20 5-23 14z" fill={hair} />}
        {hairStyle === 'curly' && CURLS.map(([cx, cy, r]) => <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={r} fill={hair} />)}
      </g>
    </svg>
  );
}
