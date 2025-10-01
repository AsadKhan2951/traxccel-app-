'use client';

import { useEffect, useRef, useState } from 'react';

export default function SplashIntro() {
  // Visible until click → then we fade and unmount
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);

  // Lock scroll while splash visible
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [visible]);

  // Prepare circle stroke draw & kick entrance class ONCE
  useEffect(() => {
    if (!visible) return;
    const root = rootRef.current;
    if (!root) return;

    // set stroke dash for each circle
    const circles = Array.from(root.querySelectorAll<SVGCircleElement>('.ecosystem-svg circle'));
    circles.forEach((c, i) => {
      const r = Number(c.getAttribute('r') || '0');
      const len = 2 * Math.PI * r;
      c.style.strokeDasharray = `${len}`;
      c.style.strokeDashoffset = `${len}`;
      c.style.setProperty('--dly', `${i * 90}ms`);
    });
    // also prepare ENTER ring draw
    const ring = root.querySelector<SVGCircleElement>('.circle-svg .ring');
    if (ring) {
    const r = Number(ring.getAttribute('r') || '0');
    const len = 2 * Math.PI * r;
    ring.style.strokeDasharray = `${len}`;
    ring.style.strokeDashoffset = `${len}`;
    }

    // start entrance animations
    root.classList.add('is-mounted');
  }, [visible]);

  const onEnter = () => {
    // only on click do we exit
    setExiting(true);
    // after CSS fade, unmount
    setTimeout(() => setVisible(false), 700);
  };

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className={`splash-wrap ${exiting ? 'is-exiting' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Intro overlay"
    >
      <div className="splash-bg" />

      <div className="splash">
        <svg viewBox="0 0 672 655" className="ecosystem-svg" aria-hidden>
          <circle cx="336" cy="123" r="122" />
          <circle cx="458" cy="209" r="122" />
          <circle cx="549" cy="328" r="122" />
          <circle cx="458" cy="453" r="122" />
          <circle cx="336" cy="532" r="122" />
          <circle cx="215" cy="453" r="122" />
          <circle cx="123" cy="328" r="122" />
          <circle cx="214" cy="209" r="122" />
          <circle cx="335" cy="328" r="122" />
        </svg>

        <button name="enter" className="enter" onClick={onEnter}>
        <svg viewBox="0 0 197 197" className="circle-svg" aria-hidden>
            {/* draw-ring */}
            <circle cx="98.5" cy="98.5" r="97.5" className="ring" />
            {/* lagging dash ring */}
            <circle cx="98.5" cy="98.5" r="97.5" className="dash" />
        </svg>

        <div className="enter-label" aria-hidden>
            {Array.from('Click to Enter').map((ch, i) => (
            <span className="bit" style={{ transitionDelay: `${i * 26}ms` }} key={i}>
                {ch === ' ' ? '\u2009' : ch}
            </span>
            ))}
        </div>
        <span className="sr-only">Enter site</span>
        </button>
      </div>
    </div>
  );
}
