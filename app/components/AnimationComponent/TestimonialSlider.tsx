'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  photo: any; // Next/Image static import
};

type Props = {
  certificationLogo: any;         // Next/Image static import
  logosCount?: number;            // default 5
  testimonials: Testimonial[];    // 3–4 items recommended
};

export default function PinnedTestimonials({
  certificationLogo,
  logosCount = 5,
  testimonials,
}: Props) {
  const [active, setActive] = useState(0);
  const hostRef = useRef<HTMLDivElement | null>(null);

  // STEP observers (each step triggers a new testimonial)
  useEffect(() => {
    const host = hostRef.current!;
    const steps = Array.from(host.querySelectorAll<HTMLElement>('.pin-step'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.step || 0);
            setActive(idx);
          }
        }
      },
      { threshold: 0.5 }
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // expose step count to CSS for height calc
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    host.style.setProperty('--steps', String(testimonials.length));
  }, [testimonials.length]);

  const prevRef = useRef(0);
  useEffect(() => { prevRef.current = active; }, [active]);

  return (
    <section ref={hostRef} className="pin-wrap">
      {/* sticky viewport content */}
      <div className="pin-sticky">
        <div className="certifications-container">
          <h1 className="cert-h1">Our Certifications</h1>
          <ul className="cert-logos">
            {Array.from({ length: logosCount }).map((_, i) => (
              <li key={i}>
                <Image
                  src={certificationLogo}
                  alt="Certification Logo"
                  className="certification-logo"
                />
              </li>
            ))}
          </ul>

          <h1 className="testi-h1">what our clients say about us</h1>
          {/* <p className="testimonial-para">
            Discover influencers worldwide with our powerful Global Search. Filter by
            location, niche, and audience demographics to find the perfect match for
            your brand, no matter where they are.
          </p> */}

          {/* stack all cards; show one based on `active` */}
          <div className="testi-stage" aria-live="polite">
            {testimonials.map((t, i) => (
              <article
                key={t.name}
                className={`testi-card ${
                i === active ? 'is-active' : (i === prevRef.current ? 'was-active' : 'is-idle')
                }`}
                aria-hidden={i !== active}
              >
                <blockquote className="testimonial-para quote">
                {Array.from(t.quote).map((ch, j) => (
                    <span
                    key={j}
                    className="qch"
                    style={{ transitionDelay: `${j * 4}ms` }}  // ⟵ same stagger you liked
                    >
                    {ch === ' ' ? '\u00A0' : ch}
                    </span>
                ))}
                </blockquote>
                <Image src={t.photo} alt={`${t.name} photo`} className="testi-photo" />
                <h2 className="testimonial-title">{t.name}</h2>
                <p className="testimonial-tag">{t.role}</p>
              </article>
            ))}
          </div>

          {/* small progress dots (optional) */}
          <div className="testi-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === active ? 'on' : ''}`}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* scroll drivers: each step = 100vh, triggers active index */}
      {testimonials.map((_, i) => (
        <div key={i} className="pin-step" data-step={i} />
      ))}
    </section>
  );
}
