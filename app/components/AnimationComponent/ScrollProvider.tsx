'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProvider() {
  // In your component, only use Lenis on the client-side
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const Lenis = require("lenis"); // Dynamically import Lenis
  //     const lenis = new Lenis();

  //     function raf() {
  //       lenis.raf();
  //       requestAnimationFrame(raf);
  //     }

  //     requestAnimationFrame(raf);
  //   }
  // }, []);

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.12 });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // bridge Lenis <-> ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) lenis.scrollTo(value as number);
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: innerWidth, height: innerHeight };
      },
      // pinType not needed for docElement
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return null;
}
