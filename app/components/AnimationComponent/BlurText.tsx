"use client"
import React, {
  ElementType,
  ComponentPropsWithoutRef,
  useRef,
  useMemo,
  useEffect,
} from "react";

type BlurTextOwnProps = {
  text?: string;
  split?: "words" | "chars";
  stagger?: number;
  blurAmount?: number;
  yOffset?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  initialIn?: boolean;
  className?: string;
};

// Polymorphic prop typing: BlurText can render as any intrinsic element
type BlurTextProps<C extends ElementType> = {
  as?: C;
  children?: React.ReactNode;
} & BlurTextOwnProps &
  Omit<ComponentPropsWithoutRef<C>, keyof BlurTextOwnProps | "as" | "children">;

export default function BlurText<C extends ElementType = "div">({
  text,
  children,
  as,
  split = "words",
  stagger = 35,
  blurAmount = 10,
  yOffset = 14,
  duration = 700,
  threshold = 0.1,
  once = false,
  initialIn = true,
  className = "",
  ...rest
}: BlurTextProps<C>) {
  const Component = as || "div";

  // ref works for any HTMLElement
  const hostRef = useRef<HTMLDivElement | null>(null);

  const content = text ?? (typeof children === "string" ? children : "");

  const pieces = useMemo(() => {
    if (!content) return [] as string[];
    return split === "chars" ? Array.from(content) : content.split(/(\s+)/);
  }, [content, split]);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    el.style.setProperty("--blur", `${blurAmount}px`);
    el.style.setProperty("--y", `${yOffset}px`);
    el.style.setProperty("--dur", `${duration}ms`);
    el.style.setProperty("--stagger", `${stagger}ms`);

    const piecesInMain = el.querySelectorAll<HTMLSpanElement>(
      ":scope > .piece"
    );
    piecesInMain.forEach(
      (s, i) => (s.style.transitionDelay = `calc(${stagger}ms * ${i})`)
    );

    const ghostPieces = el.querySelectorAll<HTMLSpanElement>(
      ":scope > .ghost > .piece"
    );
    ghostPieces.forEach(
      (s, i) => (s.style.transitionDelay = `calc(${stagger}ms * ${i})`)
    );

    if (initialIn) {
      const r = el.getBoundingClientRect();
      const vh =
        window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.9 && r.bottom > vh * 0.05) el.classList.add("is-in");
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          el.classList.remove("is-out");
          if (once) io.disconnect();
        } else if (!once) {
          el.classList.remove("is-in");
          el.classList.add("is-out");
        }
      },
      { threshold, root: null, rootMargin: "0px 0px -10%" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [blurAmount, yOffset, duration, stagger, threshold, once, initialIn]);

  if (!content) {
    return (
      <Component ref={hostRef} className={`blur-reveal ${className}`} {...rest}>
        <span className="piece">{children}</span>
        <div className="ghost" aria-hidden>
          <span className="piece">{children}</span>
        </div>
      </Component>
    );
  }

  return (
    <Component ref={hostRef} className={`blur-reveal ${className}`} {...rest}>
      {pieces.map((p, i) => (
        <span key={i} className="piece">
          {p}
        </span>
      ))}
      <div className="ghost" aria-hidden>
        {pieces.map((p, i) => (
          <span key={`g-${i}`} className="piece">
            {p}
          </span>
        ))}
      </div>
    </Component>
  );
}
