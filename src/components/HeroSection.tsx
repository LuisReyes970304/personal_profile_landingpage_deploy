"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { profile } from "@/lib/profile";
import { gsap } from "gsap";

export function HeroSection() {
  const headingRef = useRef<HTMLSpanElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const playIntro = () => {
      const heading = headingRef.current;
      const accent = accentRef.current;
      if (!heading || !accent) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([heading, accent], { xPercent: 0, opacity: 1 });
        return;
      }

      gsap
        .timeline()
        .fromTo(
          heading,
          { xPercent: -100, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
        )
        .fromTo(
          accent,
          { xPercent: 100, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
          "<",
        );
    };

    playIntro();
    window.addEventListener("hero-intro:replay", playIntro);
    return () => window.removeEventListener("hero-intro:replay", playIntro);
  }, []);

  return (
    <section
      id="inicio"
      className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end overflow-hidden px-5 pb-10 pt-32 md:px-10 md:pb-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12%] top-28 h-80 w-80 rounded-full bg-lime/10 blur-[100px]"
      />

      <p className="mb-12 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/55 md:mb-16">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-lime shadow-[0_0_16px_var(--color-lime)]"
        />
        Disponible para nuevos retos
      </p>

      <div className="grid items-end gap-15 lg:grid-cols-[1fr_0.38fr]">
        <div>
          <p className="mb-5 text-lg text-white/60 md:text-2xl">
            Hola, soy <span className="text-lime transition-all duration-300 hover:text-white hover:[text-shadow:0_0_10px_var(--color-lime),0_0_20px_var(--color-lime),0_0_40px_var(--color-lime)]">{profile.firstName}</span>. {profile.role}.
          </p>
          <h1 className="max-w-5xl overflow-hidden text-[clamp(4.2rem,10vw,6rem)] font-semibold leading-[1.2] tracking-[-0.075em]">
            <span ref={headingRef} className="block">
              Rest API <br /> Landing page
            </span>
            <span
              ref={accentRef}
              className="block text-lime text-[clamp(4.2rem,10vw,8rem)] font-semibold leading-[0.83] tracking-[-0.075em]"
            >
              Experiencias digitales!
            </span>
          </h1>
        </div>

        <div className="flex flex-col gap-7 border-l border-white/15 pl-6 lg:mb-2">
          <p className="max-w-sm text-base leading-relaxed text-white/55 md:text-lg">
            Desarrollo productos web rápidos y memorables donde el diseño, la
            tecnología, la seguridad y el propósito trabajan juntos.
          </p>
          <Link
            href="#proyectos"
            className="group flex w-fit items-center gap-3 border-b border-white/40 pb-2 text-sm font-semibold uppercase tracking-widest transition-colors hover:border-lime hover:text-lime"
          >
            Ver mi trabajo
            <span className="transition-transform group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-5 text-xs uppercase tracking-[0.15em] text-white/35">
        <span>{profile.location}</span>
        
        <span>© {profile.copyrightYear}</span>
      </div>
    </section>
  );
}
