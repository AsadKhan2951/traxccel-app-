'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function SectionReveal({ children }: { children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current!;
    const m = media.current!;

    // initial: clipped
    gsap.set(el, { clipPath: 'inset(20% 20% 20% 20% round 24px)' });
    gsap.to(el, {
      clipPath: 'inset(0% 0% 0% 0% round 24px)',
      ease: 'power3.out', duration: 1.2,
      scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 40%', scrub: false, once: true }
    });

    // subtle parallax on inner media
    gsap.fromTo(m, { y: 40, scale: 1.03 }, {
      y: 0, scale: 1, ease: 'power2.out', duration: 1.2,
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 30%', scrub: false, once: true }
    });
  }, []);

  return (
    <div ref={box} style={{ overflow: 'hidden', borderRadius: 24 }}>
      <div ref={media}>{children}</div>
    </div>
  );
}
