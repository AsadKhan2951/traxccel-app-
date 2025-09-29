'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type Slide = {
  id: number;
  title: string;
  bullets: string[];
  media: { src: string; alt: string };
};

const SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Code Migration + Refactors',
    bullets: ['Language migrations', 'Version upgrades', 'Codebase restructuring'],
    media: { src: '/steps/step1.jpg', alt: 'Migration' },
  },
  {
    id: 2,
    title: 'End-to-End Feature Delivery',
    bullets: ['Spec to PR', 'Iterative planning', 'Automated testing'],
    media: { src: '/steps/step2.jpg', alt: 'Feature' },
  },
  {
    id: 3,
    title: 'Autonomous Testing',
    bullets: ['Unit + E2E', 'Flake reduction', 'Coverage dashboards'],
    media: { src: '/steps/step3.jpg', alt: 'Testing' },
  },
  {
    id: 4,
    title: 'Review & PR',
    bullets: ['Native code review', 'Diff summaries', 'Merge readiness'],
    media: { src: '/steps/step4.jpg', alt: 'PR' },
  },
];

export default function DevinSection() {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;
  const active = SLIDES[index];

  // autoplay with pause on hover
  const delay = 4800; // ms
  const hoverRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const tRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => setIndex((i) => (i + 1) % total);
  const go = (i: number) => setIndex(i);

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

  useEffect(() => {
    if (tRef.current) clearInterval(tRef.current);
    tRef.current = setInterval(() => {
      if (!paused.current) next();
    }, delay);
    return () => {
      if (tRef.current) clearInterval(tRef.current);
    };
  }, [index]);

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + total) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // progress 0..1
  const progress = useMemo(() => (index + 1) / total, [index, total]);

  return (
    <section className="px-4">
      <div
        ref={hoverRef}
        className="mx-auto max-w-7xl relative rounded-[28px] overflow-hidden"
        aria-label="Devin-like split showcase"
      >
        {/* Gradient background container */}
        <div className="relative bg-gradient-to-r from-[#3aa7ff] to-[#47dbc9] p-4 md:p-6">
          {/* Inner dark panel */}
          <div className="relative rounded-3xl bg-[#0E2A36]/95 text-white p-6 md:p-10 overflow-hidden">
            {/* Decorative right rails */}
            <div className="pointer-events-none absolute inset-y-0 right-4 hidden lg:flex gap-4">
              <div className="h-full w-20 rounded-2xl bg-white/6" />
              <div className="h-full w-14 rounded-2xl bg-white/8" />
              <div className="h-full w-10 rounded-2xl bg-white/10" />
            </div>

            {/* Content grid */}
            <div className="grid items-center gap-8 lg:gap-12 md:grid-cols-2">
              {/* LEFT: text block + dots */}
              <div>
                <h3 className="text-[28px] md:text-[34px] leading-tight font-semibold">
                  {active.title}
                </h3>

                <ul className="mt-6 space-y-3 text-white/90">
                  {active.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-white/80" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* tiny pager bars (bottom-left) */}
                <div className="mt-10 flex items-center gap-3">
                  {SLIDES.map((_s, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      aria-label={`Go to item ${i + 1}`}
                      className={`h-2 rounded-full transition-all
                        ${i === index ? 'w-10 bg-white' : 'w-6 bg-white/30 hover:bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT: opening/expanding card */}
              <div className="relative">
                <div
                  key={active.media.src /* force transition on change */}
                  className="
                    group relative aspect-[16/9] rounded-2xl bg-white
                    ring-1 ring-white/20 shadow-2xl overflow-hidden
                    will-change-transform
                    transition-all duration-600
                    scale-95 opacity-0 translate-x-8
                    data-[enter]:scale-100 data-[enter]:opacity-100 data-[enter]:translate-x-0
                  "
                  // trick: apply a data attr just after mount to trigger CSS transitions
                  ref={(el) => {
                    if (!el) return;
                    requestAnimationFrame(() => el.setAttribute('data-enter', ''));
                  }}
                >
                  {/* subtle double-card frame */}
                  <div className="absolute inset-0 rounded-[18px] ring-1 ring-black/5 pointer-events-none" />
                  {/* media */}
                  <Image
                    src={active.media.src}
                    alt={active.media.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* bottom progress bar */}
            <div className="mt-8 h-[3px] bg-white/20 rounded">
              <div
                className="h-[3px] bg-white rounded transition-[width] duration-500"
                style={{ width: `${Math.max(0.05, progress) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
