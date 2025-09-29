'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Item = {
  id: number;
  title: string;
  points: string[];
  media?: { src: string; alt: string }; // optional image on right
};

const ITEMS: Item[] = [
  {
    id: 1,
    title: 'Code Migration + Refactors',
    points: ['Language migrations', 'Version upgrades', 'Codebase restructuring'],
    media: { src: '/steps/step1.jpg', alt: 'Step 1' },
  },
  {
    id: 2,
    title: 'End-to-End Feature Delivery',
    points: ['Spec to PR', 'Iterative planning', 'Automated testing'],
    media: { src: '/steps/step2.jpg', alt: 'Step 2' },
  },
  {
    id: 3,
    title: 'Autonomous Testing',
    points: ['Unit + E2E', 'Flake reduction', 'Coverage dashboards'],
    media: { src: '/steps/step3.jpg', alt: 'Step 3' },
  },
];

export default function SegmentSlider() {
  const [active, setActive] = useState(0); // index
  const total = ITEMS.length;

  // (optional) autoplay
  const autoplayMs = 4500;
  const hoverRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = hoverRef.current;
    const onEnter = () => (paused.current = true);
    const onLeave = () => (paused.current = false);
    el?.addEventListener('mouseenter', onEnter);
    el?.addEventListener('mouseleave', onLeave);
    return () => {
      el?.removeEventListener('mouseenter', onEnter);
      el?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // TOP: type the ref safely


// EFFECT: autoplay interval
useEffect(() => {
  // clear any previous
//   const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  if (timer.current) {
    clearInterval(timer.current);
    timer.current = null;
  }

  // set new interval
  timer.current = setInterval(() => {
    if (!paused.current) setActive((i) => (i + 1) % total);
  }, autoplayMs);

  // CLEANUP — always returns void
  return () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };
}, [autoplayMs, total, setActive]); // or [active, total] if you prefer


  // keyboard (← →)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % total);
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + total) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  return (
    <section className="px-4">
      <div
        ref={hoverRef}
        className="mx-auto max-w-7xl rounded-[28px] bg-gradient-to-r from-sky-500 to-teal-400 p-4 md:p-6"
      >
        <div className="rounded-3xl bg-[#0E2A36] text-white p-6 md:p-10">
          {/* TOP: content area (only active item visible) */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* LEFT: text */}
            <div>
              {ITEMS.map((it, i) => (
                <div key={it.id} className={i === active ? 'block' : 'hidden'}>
                  <h3 className="text-2xl md:text-[32px] font-semibold leading-tight">
                    {it.title}
                  </h3>
                  <ul className="mt-6 space-y-3 text-white/90">
                    {it.points.map((p, k) => (
                      <li key={k} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-white/80" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* RIGHT: optional media */}
            <div className="relative">
              {ITEMS.map((it, i) =>
                it.media ? (
                  <div
                    key={it.id}
                    className={`relative aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl transition-opacity duration-300 ${
                      i === active ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'
                    }`}
                  >
                    <Image
                      src={it.media.src}
                      alt={it.media.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* BOTTOM: segmented indicator (active = wide), click to jump */}
          <div className="mt-10 flex items-center gap-4">
            {ITEMS.map((_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to item ${i + 1}`}
                  className={`
                    h-2 rounded-full transition-all duration-300
                    ${isActive ? 'w-20 bg-white' : 'w-10 bg-white/40 hover:bg-white/70'}
                  `}
                />
              );
            })}

            {/* subtle trailing fade on the right like the screenshot */}
            <span className="ml-auto h-2 w-10 rounded-full bg-white/30 bg-gradient-to-r from-white/60 to-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
