'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import img1 from '@/app/assets/Images/expending-slider-1.jpg';
import img2 from '@/app/assets/Images/expending-slider-2.jpg';
import img3 from '@/app/assets/Images/expending-slider-3.jpg';

type Slide = { id: number; title: string; desc: string; img: string };

const SLIDES: Slide[] = [
  { id: 1, title: 'Over 50 AI-powered, industry-specific frameworks and toolkits accessible to our clients and teams',
    desc: 'Product-enabled delivery model expedites your project lifecycle with a core focus on efficiency and quality',
    img: img1.src },
  { id: 2, title: 'Collaborate with industry leaders for maximum efficiency and impactful solutions',
    desc: 'We combine expertise, AI-powered insights, and proven models for scalable delivery',
    img: img1.src },
  { id: 3, title: 'Drive innovation with tailor-made digital frameworks and automation',
    desc: 'Unlock your project’s true potential with rapid prototyping and scalable design systems',
    img: img1.src },
];

export default function ExpandingSliderPlain() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const wrapRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  // pause on hover (whole strip)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onEnter = () => (paused.current = true);
    const onLeave = () => (paused.current = false);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // arrow keys
  useEffect(() => {
    const last = SLIDES.length - 1;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setDir(active === last ? -1 : 1);
        setActive((i) => (i === last ? i - 1 : i + 1));
      }
      if (e.key === 'ArrowLeft') {
        setDir(active === 0 ? 1 : -1);
        setActive((i) => (i === 0 ? i + 1 : i - 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  // widths: devin-like (avoid 100/10 snap)
  const ACTIVE_PCT = 90;
  const INACTIVE_PCT = 10;

  const widthSpring = { type: 'spring', stiffness: 140, damping: 22, mass: 0.7 };

  return (
    <section className="ex-slider-section">
      <div ref={wrapRef} className="ex-wrap">
        <div className="ex-row" aria-label="Expanding slider">
          {SLIDES.map((s, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={s.id}
                className={`ex-panel ${isActive ? 'is-active' : 'is-inactive'}`}
                animate={{ flexBasis: `${isActive ? ACTIVE_PCT : INACTIVE_PCT}%` }}
                transition={widthSpring}
                onMouseEnter={() => {
                  paused.current = true;
                  setDir(i > active ? 1 : -1);
                  setActive(i);
                }}
                onClick={() => {
                  setDir(i > active ? 1 : -1);
                  setActive(i);
                }}
                aria-label={`Show slide ${i + 1}`}
              >
                {/* veil */}
                <motion.div
                  className="ex-veil"
                  animate={{ opacity: isActive ? 0 : 0.6 }}
                  transition={{ duration: 0.3 }}
                />

                {/* IMPORTANT: content always mounted + absolutely positioned */}
                <div className="ex-content" aria-hidden={!isActive}>
                  <div className="ex-inner">
                    <div className="ex-copy">
                      <h3 className="ex-hl">{s.title}</h3>
                      <p className="ex-p">{s.desc}</p>
                    </div>
                    <div className="ex-media">
                      <img className="ex-card" src={s.img} alt="" />
                    </div>
                  </div>

                  {/* indicators */}
                  <div className="ex-indicator ex-indicator--inside">
                    {SLIDES.map((_, j) => (
                      <span
                        key={j}
                        className={`ex-seg ${j === active ? 'seg-active' : 'seg-idle'}`}
                        onClick={() => {
                          setDir(j > active ? 1 : -1);
                          setActive(j);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
