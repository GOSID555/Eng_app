const STAR = 'M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z';

export default function Stars({ value, max = 3, small = false, big = false }) {
  const size = big ? 48 : small ? 13 : 18;
  return (
    <span className={`stars ${big ? 'big' : ''}`} aria-label={`${value} จาก ${max} ดาว`}>
      {Array.from({ length: max }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" className={i < value ? 'on' : ''} aria-hidden="true">
          <path d={STAR} strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}
