"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollProgressBar() {
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const setProgress = useCallback((progress: number) => {
    const fill = fillRef.current;
    const dot = dotRef.current;
    if (!fill || !dot) return;
    gsap.set(fill, { scaleX: progress });
    gsap.set(dot, { left: `${progress * 100}%` });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => {
      trigger.kill();
    };
  }, [setProgress]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.75 bg-ink">
      <div
        ref={fillRef}
        className="h-full w-full origin-left bg-lime"
        style={{ transform: "scaleX(0)" }}
      />
      <div
        ref={dotRef}
        style={{ left: "0%" }}
        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)]"
      />
    </div>
  );
}
