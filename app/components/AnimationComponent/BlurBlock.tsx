'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  yOffset?: number;   // px
  duration?: number;  // ms
  threshold?: number; // 0..1
  once?: boolean;
  className?: string;
};

export default function BlurBlock({
  children,
  yOffset = 10,
  duration = 700,
  threshold = 0.2,
  once = false,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setHasPlayed(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={`blur-block ${inView ? 'is-in' : hasPlayed ? '' : ''} ${className}`}
      style={
        {
          ['--y' as any]: `${yOffset}px`,
          ['--dur' as any]: `${duration}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
