'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import mainLogo from '../assets/Images/main-logo.png';
import menuBurger from '../assets/Images/burger-menu.png';
import ScrollIndicator from './AnimationComponent/ScrollIndicator';

const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [invertLogo, setInvertLogo] = useState(false);
  const headerRef = useRef(null);
  
  // Observer to detect the accomplishment section visibility
  useEffect(() => {
    const accomplishmentSec = document.querySelector('.accomplishment-sec');
    if (!accomplishmentSec) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInvertLogo(true); // Change logo color when section is visible
        } else {
          setInvertLogo(false); // Revert logo color when section is not visible
        }
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    observer.observe(accomplishmentSec);

    return () => observer.disconnect();
  }, []);

  return (
    <header className="main-header" ref={headerRef}>
      <div className="header-wrapper">
        {/* Logo */}
        <Link href="/" className="font-semibold text-lg tracking-tight">
          <Image 
            src={mainLogo}
            className={`main-header-logo ${invertLogo ? 'invert' : ''}`} // Apply class based on scroll position
            alt="Picture of the author"
          />
        </Link>
        <div className="menu">
          <ScrollIndicator />
          <div className="chapter">
            <div>
              Menu
            </div>
          </div>
          <div className="burger">
            <Image
              src={menuBurger}
              alt="Burger Menu"
            />
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center rounded px-3 py-2 border"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile nav panel */}
      {open && (
        <div className="md:hidden border-t">
          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="py-1"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
