'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import BlurText from './BlurText';

export type ServiceItem = { title: string; description: string };

type Props = {
  heading: string;
  intro: string;
  stickyTitle: React.ReactNode;
  services: ServiceItem[];
  polygonImage?: StaticImageData;
  lineSvg?: React.ReactNode;
};

export default function ServiceSection({
  heading,
  intro,
  stickyTitle,
  services,
  polygonImage,
  lineSvg,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const colStickyRef = useRef<HTMLDivElement | null>(null);

  // ---------- Reveal effect ---------- (same as your previous logic)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const boxes = Array.from(
      root.querySelectorAll<HTMLElement>('.guiding-principles .service-box')
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) el.classList.add('is-in');
          else el.classList.remove('is-in');
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10%' }
    );
    boxes.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  // ---------- Sticky Heading Effect ---------- 
   // Set initial translation value and maximum allowed translation
  const [customTranslation, setCustomTranslation] = useState(10);
  const MAX_TRANSLATION = 900;  // Limit the translation to a maximum value (e.g., 600px)

  useEffect(() => {
    const root = rootRef.current;
    const col = colStickyRef.current;
    if (!root || !col) return;

    const headingEl = col.querySelector<HTMLElement>('.main-left-heading');
    if (!headingEl) return;

    const secTop = root.offsetTop;
    const secHeight = root.offsetHeight;

    const onScroll = () => {
      // Calculate translation
      const y = window.scrollY;  // Get current scroll position
      const secScroll = y - secTop;  // Scroll position relative to the section

      // Apply translation increment but clamp it to the max translation value
      const newTranslation = secScroll * 0.30;  // Adjust multiplier as needed

      // Ensure translation doesn't exceed the max value
      const clampedTranslation = Math.min(newTranslation, MAX_TRANSLATION);

      // Set the custom translation
      setCustomTranslation(clampedTranslation);

      // Apply the 3D translate effect for smooth scrolling
      headingEl.style.transform = `translate3d(0, ${clampedTranslation}px, 0)`;  // Apply translation
    };

    // Listen for scroll events
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll(); // Apply immediately on page load

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);




  return (
    <section ref={rootRef} className="guiding-principles">
      <div className="container">
        {/* Column 1 */}
        <div className="column col-intro">
          <BlurText as="h1" split="words" stagger={40} blurAmount={14} yOffset={18} duration={800} className="heading">
            {heading}
          </BlurText>
          <BlurText as="p" split="chars" stagger={12} blurAmount={10} yOffset={5} duration={1500}>
            {intro}
          </BlurText>
        </div>

        {/* Column 2: Sticky Heading */}
        <div className="column col-sticky" ref={colStickyRef}>
          <div className="sticky-wrap">
            <h1 className="main-left-heading">{stickyTitle}</h1>
          </div>
        </div>

        {/* Column 3: Services */}
        <div className="column col-list">
          {services.map((s, i) => (
            <div className="service-box" key={i}>
              <h2 className="service-title">
                <span className="dot" />
                <span className="label">{s.title}</span>
              </h2>
              <p className="service-para">{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="background">{lineSvg}</div>
    </section>
  );
}
