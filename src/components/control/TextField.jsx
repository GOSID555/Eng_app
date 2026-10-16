import { useEffect, useRef, useState } from 'react';

// พิมพ์ได้ลื่น ๆ แล้วค่อยส่งไป server ตอนกด Enter หรือออกจากช่อง
export default function TextField({ value, onCommit, transform = (v) => v, ...props }) {
  const [draft, setDraft] = useState(String(value ?? ''));
  const focused = useRef(false);
  const cancel = useRef(false);

  useEffect(() => {
    if (!focused.current) setDraft(String(value ?? ''));
  }, [value]);

  return (
    <input
      {...props}
      value={draft}
      onFocus={(e) => {
        focused.current = true;
        e.target.select();
      }}
      onChange={(e) => setDraft(transform(e.target.value))}
      onBlur={() => {
        focused.current = false;
        if (cancel.current) {
          cancel.current = false;
          setDraft(String(value ?? ''));
          return;
        }
        if (draft !== String(value ?? '')) onCommit(draft);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.currentTarget.blur();
        if (e.key === 'Escape') {
          cancel.current = true;
          e.currentTarget.blur();
        }
      }}
    />
  );
}
