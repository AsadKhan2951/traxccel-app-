'use client';

import { useEffect, useRef } from 'react';

export default function ScrollIndicator({ className = '' }) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = barRef.current!;
    const label = labelRef.current!;
    let raf = 0;

    const clamp = (n: number, a: number, b: number) =>
      Math.max(a, Math.min(b, n));

    const loop = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = clamp(window.scrollY / max, 0, 1);      // 0 → 1

      // CSS var set (GPU-friendly transforms use करेंगे)
      el.style.setProperty('--p', String(p));
      // label (integer percent)
      label.textContent = String(Math.round(p * 100));

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={barRef} className={`indicator ${className}`}>
      {/* track & fill pseudo-elements से बनेंगे */}
      <div className="label" ref={labelRef}>0</div>
      {/* <div className="dot" aria-hidden /> */}
    </div>
  );
}
