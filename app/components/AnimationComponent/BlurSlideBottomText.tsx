"use client";
import { useEffect, useRef, useState } from "react";

export default function BlurSlideBottomText({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.intersectionRatio > 0);
      },
      { threshold: [0, 0.1, 0.9, 1] }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible
          ? "blur-0 opacity-100 translate-y-0"
          : "blur-md opacity-0 translate-y-20"
      }`}
    >
      {children}
    </div>
  );
}