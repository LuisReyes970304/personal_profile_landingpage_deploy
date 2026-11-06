"use client";

import { ContactForm } from "@/components/contact/ContactForm";
import { useGlowRef } from "@/hooks/useGlowRef";

export function ContactMeSection() {
  const { containerRef, glowRef } = useGlowRef<HTMLElement>();

  return (
    <section
      ref={containerRef}
      className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-5 py-24 md:px-10 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgb(255_255_255/0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.025)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,black_70%,transparent_100%)]"
      />

      {/* Behind the content so the glow doesn't wash out the text. */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/10 blur-[100px]"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="flex flex-col justify-between gap-12">
          <div>
            <h1 className="text-4xl font-semibold leading-none tracking-[-0.06em] sm:text-6xl xl:text-7xl">
              Contáctame y hagamos tus ideas <span className="text-lime">realidad.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/55 md:text-lg">
              Cuéntame sobre tu proyecto, idea o colaboración. Estoy listo para
              ayudarte a construir el siguiente paso.
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
