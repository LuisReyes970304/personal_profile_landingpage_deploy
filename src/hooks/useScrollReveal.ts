"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ScrollRevealOptions = {
  /** CSS selector (relative to the returned ref) for elements to reveal individually. Omit to reveal the container itself. */
  targets?: string;
  y?: number;
  /** Starting/ending scale, for a subtle settle-into-place feel alongside the fade and displacement. */
  scale?: number;
  /** Where the fade-in starts, relative to the element. */
  start?: string;
  /** Where the fade-out finishes, relative to the element. */
  end?: string;
  /** Scroll smoothing, same idea as ScrollProgressBar's scrubbed bar: true/a number ties opacity directly to scroll position instead of playing once. */
  scrub?: number | boolean;
};

export function useScrollReveal<T extends HTMLElement>({
  targets,
  y = 32,
  scale = 0.94,
  start = "top 95%",
  end = "bottom 5%",
  scrub = true,
}: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const els = targets
      ? Array.from(container.querySelectorAll<HTMLElement>(targets))
      : [container];
    if (!els.length) return;

    const tweens = els.map((el) =>
      gsap.to(el, {
        keyframes: {
          "0%": { opacity: 0, y, scale, transformOrigin: "20% 100%" },
          "38%": { opacity: 1, y: 0, scale: 1, ease: "power3.out" },
          "62%": { opacity: 1, y: 0, scale: 1 },
          "100%": { opacity: 0, y: -y, scale, ease: "power2.in" },
        },
        ease: "none",
        scrollTrigger: { trigger: el, start, end, scrub },
      }),
    );

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [targets, y, scale, start, end, scrub]);

  return ref;
}
