'use client';
import { useEffect, useRef } from 'react';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function FancyCursor() {
  const inner = useRef<HTMLDivElement | null>(null);
  const outline = useRef<HTMLDivElement | null>(null);
  const arrow = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const canUse = matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (!canUse) return;

    document.documentElement.classList.add('custom-cursor');

    const cur = { x: innerWidth / 2, y: innerHeight / 2 };
    const fast = { ...cur };
    const slow = { ...cur };

    let pressing = false;
    let hoveringLink = false;     // ⟵ a/button hover?
    let showArrowOpt = false;     // ⟵ only when data-cursor="arrow"

    const onMove = (e: MouseEvent) => { cur.x = e.clientX; cur.y = e.clientY; };
    const onDown = () => { pressing = true; };
    const onUp   = () => { pressing = false; };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // any clickable?
      const clickable = target.closest<HTMLElement>('a,button,[role="button"]');
      hoveringLink = !!clickable;

      // arrow only if explicitly requested
      const wantsArrow = target.closest<HTMLElement>('[data-cursor="arrow"]');
      showArrowOpt = !!wantsArrow;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);

    let raf = 0;
    const loop = () => {
      fast.x = lerp(fast.x, cur.x, 0.35);
      fast.y = lerp(fast.y, cur.y, 0.35);
      slow.x = lerp(slow.x, cur.x, 0.12);
      slow.y = lerp(slow.y, cur.y, 0.12);

      const dx = fast.x - slow.x;
      const dy = fast.y - slow.y;
      const angDeg = Math.atan2(dy, dx) * 180 / Math.PI;

      // scales
      const innerScale   = pressing ? 0.85 : hoveringLink ? 1.12 : 1;
      const outlineScale = pressing ? 0.92 : hoveringLink ? 1.60 : 1.0; // ⟵ bigger on links/buttons

      if (inner.current) {
        inner.current.style.transform =
          `translate3d(${fast.x}px, ${fast.y}px, 0) scale(${innerScale})`;
        inner.current.style.opacity = '1';
      }
      if (outline.current) {
        outline.current.style.transform =
          `translate3d(${slow.x}px, ${slow.y}px, 0) scale(${outlineScale})`;
        outline.current.style.opacity = '1';
      }
      if (arrow.current) {
        // ⟵ arrow now ONLY when element has data-cursor="arrow"
        arrow.current.style.opacity = showArrowOpt ? '1' : '0';
        arrow.current.style.transform = `rotate(${angDeg}deg)`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden>
      <div className="inner" ref={inner}>
        {/* Arrow will only show if hovered element has data-cursor="arrow" */}
        <svg ref={arrow} className="arrow-svg" viewBox="0 0 75 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M61.0109 16.8393C61.4921 16.8393 61.7327 16.2571 61.3918 15.9174L46.3397 0.921817C45.9988 0.582201 46.2393 0 46.7205 0H55.7413C55.8841 0 56.021 0.0565705 56.1222 0.157321L73.9075 17.876C75.3642 19.3272 75.3642 21.68 73.9075 23.1312L56.1222 40.8499C56.021 40.9506 55.8841 41.0072 55.7413 41.0072H46.7205C46.2393 41.0072 45.9988 40.425 46.3397 40.0854L61.2882 25.193C61.629 24.8533 61.3885 24.2711 60.9073 24.2711L0.539568 24.2712C0.241573 24.2712 0 24.0296 0 23.7316V17.3788C0 17.0808 0.241575 16.8393 0.53957 16.8393L61.0109 16.8393Z" fill="currentColor"/>
        </svg>
        <div className="dot" />
      </div>

      <div className="outline" ref={outline}>
        <svg className="circle-svg" viewBox="0 0 197 197">
          <circle cx="98.5" cy="98.5" r="97.5" vectorEffect="non-scaling-stroke" />
          <circle cx="98.5" cy="98.5" r="97.5" className="dash" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
}
