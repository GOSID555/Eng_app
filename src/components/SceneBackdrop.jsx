// ฉากหลังวาดด้วย SVG แบบ flat (viewBox 800×400, พื้นอยู่ที่ราว y=300)

const tee = (x, y, fill) => (
  <g key={x}>
    <path d={`M${x} ${y - 30}v12`} stroke="#6B6259" strokeWidth="2" />
    <path d={`M${x - 24} ${y - 12}l14-8h20l14 8-7 16h-6v40h-22v-40h-6z`} fill={fill} />
  </g>
);

const SETS = {
  hallway: (
    <>
      <rect width="800" height="400" fill="#F0E2C4" />
      <rect y="300" width="800" height="100" fill="#C98F5B" />
      <rect y="292" width="800" height="9" fill="#A9744A" />
      <rect x="70" y="80" width="230" height="140" rx="4" fill="#B98552" />
      <rect x="84" y="94" width="202" height="112" fill="#D9A877" />
      <rect x="100" y="106" width="60" height="74" fill="#FBF7EE" transform="rotate(-4 130 143)" />
      <rect x="176" y="112" width="52" height="40" fill="#F2B134" />
      <rect x="236" y="122" width="38" height="56" fill="#FBF7EE" transform="rotate(5 255 150)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={400 + i * 64} y="104" width="60" height="190" fill={i % 2 ? '#357A70' : '#3E8C80'} />
          <path d={`M${414 + i * 64} 124h32 M${414 + i * 64} 132h32 M${414 + i * 64} 140h32`} stroke="#2A6359" strokeWidth="3" />
          <rect x={448 + i * 64} y="190" width="5" height="18" rx="2" fill="#2A6359" />
        </g>
      ))}
    </>
  ),
  gate: (
    <>
      <rect width="800" height="400" fill="#CFE7F1" />
      <circle cx="690" cy="76" r="34" fill="#F9D371" />
      <rect x="190" y="96" width="420" height="206" fill="#EAD7B0" />
      <rect x="176" y="82" width="448" height="18" fill="#B5523B" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4, 5].map((c) =>
          r === 2 && (c === 2 || c === 3) ? null : (
            <rect key={`${r}${c}`} x={214 + c * 66} y={118 + r * 58} width="42" height="36" fill="#8FBCD4" />
          ),
        ),
      )}
      <rect x="352" y="234" width="96" height="68" fill="#7A4A35" />
      <rect y="300" width="800" height="100" fill="#9CC47F" />
      <path d="M330 300h140l60 100H270z" fill="#E8DCC2" />
      <rect x="40" y="168" width="44" height="140" fill="#C9B79A" />
      <rect x="716" y="168" width="44" height="140" fill="#C9B79A" />
      <rect x="34" y="158" width="56" height="14" fill="#A8977C" />
      <rect x="710" y="158" width="56" height="14" fill="#A8977C" />
      <rect x="136" y="220" width="12" height="84" fill="#7A5A3E" />
      <circle cx="142" cy="200" r="46" fill="#6FA75A" />
      <circle cx="118" cy="226" r="30" fill="#5E954C" />
    </>
  ),
  classroom: (
    <>
      <rect width="800" height="400" fill="#EFE4CF" />
      <rect y="306" width="800" height="94" fill="#B98A5E" />
      <rect x="40" y="66" width="120" height="150" fill="#CDE7F1" stroke="#FBF7EE" strokeWidth="10" />
      <path d="M100 66v150 M40 141h120" stroke="#FBF7EE" strokeWidth="6" />
      <rect x="210" y="56" width="390" height="190" rx="4" fill="#2F4A3F" stroke="#8A6A48" strokeWidth="12" />
      <text x="240" y="122" fill="#F4F1E8" fontFamily="Courier Prime, monospace" fontSize="30">Good morning!</text>
      <text x="240" y="166" fill="#F4F1E8" opacity=".7" fontFamily="Courier Prime, monospace" fontSize="22">Page 25 →</text>
      <rect x="200" y="246" width="410" height="10" fill="#8A6A48" />
      <circle cx="704" cy="96" r="30" fill="#FBF7EE" stroke="#1E1B18" strokeWidth="4" />
      <path d="M704 96V76 M704 96l13 8" stroke="#1E1B18" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  cafe: (
    <>
      <rect width="800" height="400" fill="#F4DCC9" />
      <rect y="226" width="800" height="84" fill="#9A5B3E" />
      <rect y="306" width="800" height="94" fill="#6E4A33" />
      {[150, 400, 650].map((x) => (
        <g key={x}>
          <path d={`M${x} 0v74`} stroke="#2B2622" strokeWidth="2" />
          <circle cx={x} cy="96" r="44" fill="#F2B134" opacity=".18" />
          <path d={`M${x - 26} 98a26 24 0 0 1 52 0z`} fill="#2B2622" />
          <ellipse cx={x} cy="99" rx="12" ry="4" fill="#F9D371" />
        </g>
      ))}
      <rect x="320" y="122" width="160" height="92" rx="3" fill="#2B2622" />
      <text x="342" y="150" fill="#F3EDE2" fontFamily="Courier Prime, monospace" fontSize="16">MENU</text>
      <path d="M342 166h90 M342 180h70 M342 194h100" stroke="#F3EDE2" strokeWidth="2" opacity=".55" />
      <rect x="560" y="164" width="34" height="62" fill="#C25B3A" />
      <path d="M577 166c-24-30-6-56 0-60 6 4 24 30 0 60z" fill="#4E8A55" />
    </>
  ),
  street: (
    <>
      <rect width="800" height="400" fill="#D3E9F2" />
      {[
        [0, 120, 150, '#E3A869'],
        [140, 60, 170, '#8FB3C9'],
        [300, 140, 140, '#E9D6B3'],
        [430, 90, 180, '#C77D62'],
        [600, 150, 200, '#A7C49A'],
      ].map(([x, y, w, c]) => (
        <g key={x}>
          <rect x={x} y={y} width={w} height={310 - y} fill={c} />
          {Array.from({ length: Math.floor((290 - y) / 46) }, (_, r) =>
            Array.from({ length: Math.floor(w / 46) }, (_, k) => (
              <rect key={`${r}-${k}`} x={x + 16 + k * 46} y={y + 18 + r * 46} width="22" height="26" fill="#FBF7EE" opacity=".7" />
            )),
          )}
        </g>
      ))}
      <rect y="298" width="800" height="22" fill="#CFC6BA" />
      <rect y="320" width="800" height="80" fill="#5F5A57" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={20 + i * 120} y="356" width="64" height="7" fill="#F3EDE2" />
      ))}
      <rect x="716" y="170" width="8" height="130" fill="#2B2622" />
      <rect x="700" y="118" width="40" height="80" rx="8" fill="#2B2622" />
      <circle cx="720" cy="138" r="9" fill="#E4572E" />
      <circle cx="720" cy="160" r="9" fill="#4A4540" />
      <circle cx="720" cy="182" r="9" fill="#4A4540" />
    </>
  ),
  shop: (
    <>
      <rect width="800" height="400" fill="#F3E6EC" />
      <rect y="304" width="800" height="96" fill="#D9C4A7" />
      <path d="M100 96h440" stroke="#6B6259" strokeWidth="6" strokeLinecap="round" />
      <path d="M110 96v206 M530 96v206" stroke="#6B6259" strokeWidth="5" />
      {['#2A7F72', '#F2B134', '#7FA8C9', '#E4572E', '#3D5A98', '#C2577A'].map((c, i) => tee(160 + i * 66, 128, c))}
      <rect x="620" y="70" width="120" height="230" rx="60" fill="#FBF7EE" stroke="#B89A6F" strokeWidth="8" />
      <path d="M650 120l40 40 M660 150l20 20" stroke="#E2D4DB" strokeWidth="6" strokeLinecap="round" />
      <rect x="40" y="40" width="80" height="34" fill="#E4572E" />
      <text x="54" y="64" fill="#FBF7EE" fontFamily="Courier Prime, monospace" fontSize="18" fontWeight="700">SALE</text>
    </>
  ),
  night: (
    <>
      <rect width="800" height="400" fill="#2C2950" />
      <rect x="220" y="46" width="360" height="220" fill="#191A36" stroke="#4A4578" strokeWidth="12" />
      <path d="M400 46v220" stroke="#4A4578" strokeWidth="8" />
      <circle cx="500" cy="116" r="30" fill="#F4E7B5" />
      <circle cx="514" cy="106" r="26" fill="#191A36" />
      {[
        [270, 90], [330, 140], [300, 210], [450, 200], [540, 230], [360, 80],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="2.4" fill="#F4E7B5" />
      ))}
      <ellipse cx="120" cy="250" rx="140" ry="110" fill="#F2B134" opacity=".12" />
      <path d="M90 220h60l-12-40h-36z" fill="#F2B134" />
      <path d="M120 220v80" stroke="#4A4578" strokeWidth="6" />
      <rect y="300" width="800" height="100" fill="#3B3463" />
    </>
  ),
};

export default function SceneBackdrop({ set, className = '' }) {
  return (
    <svg className={`backdrop ${className}`} viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {SETS[set] || SETS.hallway}
    </svg>
  );
}
