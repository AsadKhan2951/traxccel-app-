'use client';

import { JSX, useEffect, useMemo, useRef } from 'react';

type SplitMode = 'words' | 'chars';

type BlurTextProps = {
  text?: string;
  children?: React.ReactNode;                 // works if string or ReactNode
  as?: keyof JSX.IntrinsicElements;
  split?: SplitMode;                           // 'words' | 'chars'
  stagger?: number;                            // ms
  blurAmount?: number;                         // ghost blur px
  yOffset?: number;                            // px
  duration?: number;                           // ms
  threshold?: number;                          // 0..1
  once?: boolean;                              // run once then stay clear
  initialIn?: boolean;                         // if true, do an initial in-view check on mount
  className?: string;
};

export default function BlurText({
  text,
  children,
  as = 'div',
  split = 'words',
  stagger = 35,
  blurAmount = 10,
  yOffset = 14,
  duration = 700,
  threshold = 0.1,          // ↓ smaller = easier to trigger
  once = false,
  initialIn = true,         // ↓ try to show if already in viewport on mount
  className = '',
}: BlurTextProps) {
  const Wrapper = as as any;
  const hostRef = useRef<HTMLDivElement | null>(null);

  // Choose content if it's a string; otherwise we will render children as-is
  const content =
    text ?? (typeof children === 'string' ? (children as string) : '');

  // Split string -> pieces (preserve spaces in words mode)
  const pieces = useMemo(() => {
    if (!content) return [] as string[];
    return split === 'chars' ? Array.from(content) : content.split(/(\s+)/);
  }, [content, split]);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    // feed CSS variables once
    el.style.setProperty('--blur', `${blurAmount}px`);
    el.style.setProperty('--y', `${yOffset}px`);
    el.style.setProperty('--dur', `${duration}ms`);
    el.style.setProperty('--stagger', `${stagger}ms`);

    // add transitionDelay per piece once (no React re-renders)
    // note: select only direct pieces in the "main line", not the ghost
    const piecesInMain = el.querySelectorAll<HTMLSpanElement>(':scope > .piece');
    piecesInMain.forEach((s, i) => (s.style.transitionDelay = `calc(${stagger}ms * ${i})`));
    // ghost pieces: same delay to match
    const ghostPieces = el.querySelectorAll<HTMLSpanElement>(':scope > .ghost > .piece');
    ghostPieces.forEach((s, i) => (s.style.transitionDelay = `calc(${stagger}ms * ${i})`));

    // If initialIn enabled, run a cheap first-pass check
    if (initialIn) {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const inViewNow = r.top < vh * 0.9 && r.bottom > vh * 0.05;
      if (inViewNow) el.classList.add('is-in');
    }

    // robust IO (wider rootMargin so it triggers sooner)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          el.classList.remove('is-out');
          if (once) io.disconnect();
        } else if (!once) {
          el.classList.remove('is-in');
          el.classList.add('is-out');
        }
      },
      {
        threshold,                 // e.g., 0.1
        root: null,
        rootMargin: '0px 0px -10%',// start a bit before fully in view
      }
    );
    io.observe(el);

    return () => io.disconnect();
  }, [blurAmount, yOffset, duration, stagger, threshold, once, initialIn]);

  // If no string content, still work: wrap children in a single .piece (and ghost copy)
  if (!content) {
    return (
      <Wrapper ref={hostRef} className={`blur-reveal ${className}`}>
        <span className="piece">{children}</span>
        <div className="ghost" aria-hidden>
          <span className="piece">{children}</span>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper ref={hostRef} className={`blur-reveal ${className}`}>
      {/* main visible line */}
      {pieces.map((p, i) => (
        <span key={i} className="piece">{p}</span>
      ))}

      {/* blurred ghost clone */}
      <div className="ghost" aria-hidden>
        {pieces.map((p, i) => (
          <span key={`g-${i}`} className="piece">{p}</span>
        ))}
      </div>
    </Wrapper>
  );
}
