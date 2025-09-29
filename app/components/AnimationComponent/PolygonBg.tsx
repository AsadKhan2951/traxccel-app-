'use client';

import Image, { StaticImageData } from 'next/image';
import { useEffect } from 'react';

type Props = {
  src: StaticImageData;
  baseDeg?: number;
  maxDeg?: number;
  pathPx?: number;
  rotateSpeed?: number; // ⬅️ new
};

export default function GlobalPolygonBG({
  src,
  baseDeg = 8,
  maxDeg = 22,
  pathPx = 140,
  rotateSpeed = 2.0, // ⬅️ 1 = old speed, 2 = 2x, etc.
}: Props) {
  useEffect(() => {
    // Next/Image <img> ko class se uthao (wrapper span ignore)
    const img = document.querySelector<HTMLElement>('.global-poly-img');
    if (!img) return;

    let raf = 0;

    const clamp = (n: number, a: number, b: number) =>
      Math.max(a, Math.min(b, n));

    const animate = () => {
      // pure page ka scroll progress
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const prog = clamp(window.scrollY / maxScroll, 0, 1); // 0..1

      // rotation + rotated-axis descent
      const rot = baseDeg + (maxDeg * rotateSpeed) * prog;
      const s   = pathPx * prog;
      img.style.transform = `translate(-50%, -50%) rotate(${rot}deg) translateY(${s}px)`;

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [baseDeg, maxDeg, pathPx]);

  return (
    <div className="global-poly-wrap" aria-hidden>
      <Image
        src={src}
        alt=""
        className="global-poly-img"
        priority
      />
    </div>
  );
}
