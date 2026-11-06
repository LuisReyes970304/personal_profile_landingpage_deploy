"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Makes a glow element follow the cursor while it moves over a container.
 * Attach `containerRef` to the container and `glowRef` to the glow, which
 * should be absolutely positioned and centered inside the container.
 */
export function useGlowRef<T extends HTMLElement = HTMLElement>() {
  const containerRef = useRef<T>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const moveX = gsap.quickTo(glow, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(glow, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      moveX(event.clientX - rect.left - rect.width / 2);
      moveY(event.clientY - rect.top - rect.height / 2);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { containerRef, glowRef };
}
