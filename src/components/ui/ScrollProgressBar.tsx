"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const bar = barRef.current;
    if (!bar) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-white/5 pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-lime via-[#9aff43] to-white shadow-[0_0_12px_var(--color-lime)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
