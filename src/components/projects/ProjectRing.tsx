"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { gsap } from "gsap";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import type { Project } from "@/lib/profile";

/** Seconds each project stays in the middle before the ring turns on its own. */
const AUTOPLAY_DELAY = 3;
/** Pixels a pointer has to travel before a press becomes a drag instead of a click. */
const DRAG_THRESHOLD = 6;
/** Accumulated horizontal wheel delta that turns the ring one step. */
const WHEEL_STEP = 60;
/** Minimum visual gap, in pixels, between two adjacent cards on the ring. */
const CARD_GAP = 40;

type ProjectRingProps = {
  projects: Project[];
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ProjectRing({ projects }: ProjectRingProps) {
  const count = projects.length;
  const step = 360 / count;

  const regionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Ring angle in degrees. It only grows or shrinks, never wraps back, so the
  // ring keeps turning the same way past the last project.
  const rotation = useRef({ value: 0 });
  const target = useRef(0);
  const autoplay = useRef<gsap.core.Tween | null>(null);
  const drag = useRef<{
    startX: number;
    startRotation: number;
    pointerId: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  // Scale that fits the cards into the stage's height.
  const fit = useRef(1);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);

  const render = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const baseRadius = Math.min(stage.offsetWidth * 0.36, 460) * fit.current;
    // Radius needed so adjacent cards keep CARD_GAP of breathing room instead of overlapping.
    const cardWidth = (cardRefs.current[0]?.offsetWidth ?? 320) * fit.current;
    // Guard against a near-180° step (e.g. only 2 projects), where the "neighbor" sits
    // almost directly behind the front card and needs no sideways room.
    const neighborSin = Math.max(Math.sin((step * Math.PI) / 180), 0.5);
    const minRadius = (cardWidth + CARD_GAP) / neighborSin;
    const radius = Math.max(baseRadius, minRadius);

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      // Angle from the front of the ring, normalized to (-180, 180].
      const angle = ((((rotation.current.value - i * step) % 360) + 540) % 360) - 180;
      const rad = (angle * Math.PI) / 180;
      const front = (Math.cos(rad) + 1) / 2;
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50,
        scale: fit.current,
        x: Math.sin(rad) * radius,
        z: (Math.cos(rad) - 1) * radius * 0.9,
        rotationY: Math.sin(rad) * 35,
        opacity: 0.55 + front * 0.45,
        zIndex: Math.round(front * 100),
      });
    });

    const index = ((Math.round(rotation.current.value / step) % count) + count) % count;
    setActive(index);
  }, [count, step]);

  // Gives every card the tallest card's height, then scales them all to fit the stage.
  const measure = useCallback(() => {
    const stage = stageRef.current;
    const cards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null);
    if (!stage || !cards.length) return;
    cards.forEach((card) => {
      card.style.height = "";
    });
    const tallest = Math.max(...cards.map((card) => card.offsetHeight));
    cards.forEach((card) => {
      card.style.height = `${tallest}px`;
    });
    fit.current = Math.min(1, stage.clientHeight / tallest);
    render();
  }, [render]);

  const goTo = useCallback(
    (index: number) => {
      target.current = index;
      gsap.to(rotation.current, {
        value: index * step,
        duration: prefersReducedMotion() ? 0 : 0.8,
        ease: "power3.inOut",
        overwrite: true,
        onUpdate: render,
        onComplete: render,
      });
      autoplay.current?.restart(true);
    },
    [render, step],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    measure();
    // Web fonts can change the cards' height after the first measurement.
    document.fonts.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    if (paused || interacting || prefersReducedMotion()) return;
    const call = gsap.delayedCall(AUTOPLAY_DELAY, () => goTo(target.current + 1));
    autoplay.current = call;
    return () => {
      call.kill();
      autoplay.current = null;
    };
  }, [paused, interacting, goTo]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let delta = 0;

    // Horizontal trackpad swipes turn the ring; vertical scrolling is left alone.
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      delta += event.deltaX;
      if (Math.abs(delta) < WHEEL_STEP || gsap.isTweening(rotation.current)) return;
      goTo(target.current + (delta > 0 ? -1 : 1));
      delta = 0;
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [goTo]);

  useEffect(() => () => void gsap.killTweensOf(rotation.current), []);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    gsap.killTweensOf(rotation.current);
    autoplay.current?.pause();
    drag.current = {
      startX: event.clientX,
      startRotation: rotation.current.value,
      pointerId: event.pointerId,
      moved: false,
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current) return;
    const dx = event.clientX - current.startX;
    if (!current.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      current.moved = true;
      event.currentTarget.setPointerCapture(current.pointerId);
    }
    const cardWidth = cardRefs.current[0]?.offsetWidth ?? 320;
    rotation.current.value = current.startRotation + (dx / cardWidth) * step;
    render();
  }

  function handlePointerEnd() {
    const current = drag.current;
    if (!current) return;
    drag.current = null;
    if (current.moved) {
      suppressClick.current = true;
      requestAnimationFrame(() => {
        suppressClick.current = false;
      });
    }
    // Snap to the nearest project, or return to the current one after a plain click.
    goTo(Math.round(rotation.current.value / step));
  }

  // Turns the shortest way round to project `index`.
  function goToProject(index: number) {
    const current = ((target.current % count) + count) % count;
    const forward = (index - current + count) % count;
    goTo(target.current + (forward > count / 2 ? forward - count : forward));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    // Focus inside the current card would be lost once that card turns away.
    const focusedCard = cardRefs.current.some((card) =>
      card?.contains(document.activeElement),
    );
    goTo(target.current + (event.key === "ArrowRight" ? 1 : -1));
    if (focusedCard) regionRef.current?.focus();
  }

  return (
    <div
      ref={regionRef}
      data-reveal
      tabIndex={-1}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Proyectos"
      className="flex min-h-0 flex-1 flex-col outline-none"
      onKeyDown={handleKeyDown}
      onPointerEnter={(event) => event.pointerType === "mouse" && setInteracting(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
      }}
    >
      <div
        ref={stageRef}
        className="relative min-h-144 flex-1 cursor-grab touch-pan-y select-none perspective-[1800px] active:cursor-grabbing md:min-h-0"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onClickCapture={(event) => {
          if (!suppressClick.current) return;
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        {projects.map((project, i) => (
          <div
            key={project.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            role="group"
            aria-roledescription="proyecto"
            aria-label={`${i + 1} de ${count}`}
            inert={i !== active}
            className={`absolute left-1/2 top-1/2 will-change-transform ${
              i === active ? "" : "pointer-events-none"
            }`}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex shrink-0 items-center justify-between gap-5">
        <div className="flex items-center gap-5">
          <p
            aria-live={paused || interacting ? "polite" : "off"}
            className="text-xs font-semibold uppercase tracking-widest text-black/70"
          >
            <span aria-hidden="true">
              {projects[active].number} / {String(count).padStart(2, "0")}
            </span>
            <span className="sr-only">
              Proyecto {active + 1} de {count}: {projects[active].title}
            </span>
          </p>

          <ul className="hidden items-center sm:flex" aria-label="Ir a un proyecto">
            {projects.map((project, i) => (
              <li key={project.title}>
                <button
                  type="button"
                  onClick={() => goToProject(i)}
                  aria-label={`Ver ${project.title}`}
                  aria-current={i === active ? "true" : undefined}
                  className="group/step grid h-11 place-items-center px-1"
                >
                  <span
                    className={`block h-1 rounded-full motion-safe:transition-all ${
                      i === active
                        ? "w-10 bg-coal"
                        : "w-5 bg-black/70 group-hover/step:bg-black/50"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPaused((prev) => !prev)}
            className="h-11 rounded-full border border-black px-5 text-xs font-semibold bg-white/25 uppercase tracking-widest transition-colors hover:bg-coal hover:text-cream"
          >
            {paused ? "Reanudar" : "Pausar"}
          </button>
          <button
            type="button"
            onClick={() => goTo(target.current - 1)}
            aria-label="Proyecto anterior"
            className="grid h-11 w-11 place-items-center rounded-full border bg-white/25 border-black transition-colors hover:bg-coal hover:text-cream"
          >
            <span className="block rotate-180">
              <ArrowIcon />
            </span>
          </button>
          <button
            type="button"
            onClick={() => goTo(target.current + 1)}
            aria-label="Proyecto siguiente"
            className="grid h-11 w-11 place-items-center rounded-full border bg-white/25 border-black transition-colors hover:bg-coal hover:text-cream"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
