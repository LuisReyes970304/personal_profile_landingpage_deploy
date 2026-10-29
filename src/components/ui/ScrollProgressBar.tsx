"use client";

import { useCallback, useEffect, useRef } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Fraction of the scrollable height an arrow-key press moves the thumb. */
const KEY_STEP = 0.05;

function scrollableHeight() {
  return document.documentElement.scrollHeight - window.innerHeight;
}

function currentFraction() {
  const max = scrollableHeight();
  return max > 0 ? window.scrollY / max : 0;
}

export function ScrollProgressBar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  // While dragging, the pointer drives progress directly instead of ScrollTrigger's onUpdate.
  const dragging = useRef(false);

  const setProgress = useCallback((progress: number) => {
    const fill = fillRef.current;
    const thumb = thumbRef.current;
    if (!fill || !thumb) return;
    gsap.set(fill, { scaleX: progress });
    gsap.set(thumb, { left: `${progress * 100}%` });
    thumb.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
  }, []);

  const scrollToFraction = useCallback((fraction: number) => {
    window.scrollTo({ top: Math.min(1, Math.max(0, fraction)) * scrollableHeight() });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (!dragging.current) setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [setProgress]);

  const updateFromPointer = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const fraction = (clientX - rect.left) / rect.width;
      const clamped = Math.min(1, Math.max(0, fraction));
      setProgress(clamped);
      scrollToFraction(clamped);
    },
    [setProgress, scrollToFraction],
  );

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    // Jumping the page while dragging should track the pointer instantly, not ease into place.
    document.documentElement.style.scrollBehavior = "auto";
    updateFromPointer(event.clientX);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    updateFromPointer(event.clientX);
  }

  function handlePointerUp() {
    if (!dragging.current) return;
    dragging.current = false;
    document.documentElement.style.scrollBehavior = "";
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") next = currentFraction() + KEY_STEP;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = currentFraction() - KEY_STEP;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 1;
    if (next === null) return;
    event.preventDefault();
    scrollToFraction(next);
  }

  return (
    <div ref={trackRef} className="fixed inset-x-0 top-0 z-60 h-0.75 bg-white/5 pointer-events-none">
      <div
        aria-hidden="true"
        ref={fillRef}
        className="h-full w-full origin-left bg-linear-to-r from-lime via-[#9aff43] to-white shadow-[0_0_12px_var(--color-lime)]"
        style={{ transform: "scaleX(0)" }}
      />
      {/* Draggable like a scrollbar thumb: dragging it scrolls the page, scrolling the page moves it. */}
      <div
        ref={thumbRef}
        role="slider"
        aria-orientation="horizontal"
        aria-label="Progreso de la página"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        style={{ left: "0%" }}
        className="pointer-events-auto absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none rounded-full bg-lime shadow-[0_0_10px_var(--color-lime)] active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
      >
        <span className="absolute inset-0.75 rounded-full bg-cream" />
      </div>
    </div>
  );
}
