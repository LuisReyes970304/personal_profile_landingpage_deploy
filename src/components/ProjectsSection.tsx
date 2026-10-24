"use client";

import { ProjectRing } from "@/components/ProjectRing";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { projects } from "@/lib/profile";

export function ProjectsSection() {
  const ref = useScrollReveal<HTMLDivElement>({ targets: "[data-reveal]" });

  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-title"
      className="flex min-h-screen flex-col overflow-x-clip bg-paper pb-10 pt-28 text-coal md:h-screen"
    >
      <div ref={ref} className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col px-5 md:px-10">
        <div
          data-reveal
          className="mb-8 flex shrink-0 flex-col justify-between gap-7 md:mb-10 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-black/55">
              01 — Trabajo seleccionado
            </p>
            <h2
              id="proyectos-title"
              className="text-5xl font-semibold tracking-[-0.055em] md:text-7xl"
            >
              Proyectos con
              <span className="block font-serif font-normal italic">intención.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-black/55">
            Una selección de productos digitales creados para conectar marcas,
            personas y buenas ideas.
          </p>
        </div>

        <ProjectRing projects={projects} />
      </div>
    </section>
  );
}
