"use client";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Tag } from "@/components/ui/Tag";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { projects } from "@/lib/profile";

export function ProjectsSection() {
  const ref = useScrollReveal<HTMLDivElement>({ targets: "[data-reveal]" });

  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-title"
      className="bg-paper px-5 py-24 text-coal md:px-10 md:py-32"
    >
      <div ref={ref} className="mx-auto max-w-7xl">
        <div
          data-reveal
          className="mb-16 flex flex-col justify-between gap-7 md:mb-24 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-black/45">
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

        <div className="border-t border-black/20">
          {projects.map((project) => (
            <article
              data-reveal
              key={project.title}
              className="group grid gap-7 border-b border-black/20 py-9 md:grid-cols-[0.12fr_0.75fr_0.95fr_0.4fr] md:items-center md:py-12"
            >
              <span className="text-xs font-semibold text-black/40">{project.number}</span>

              <div>
                <p className="mb-2 text-xs uppercase tracking-wider text-black/45">
                  {project.category}
                </p>
                <h3 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                  {project.title}
                </h3>
              </div>

              <div>
                <p className="mb-5 max-w-md leading-relaxed text-black/55">
                  {project.description}
                </p>
                <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                aria-hidden="true"
                className="flex items-center justify-between md:justify-end md:gap-5"
              >
                <div
                  className={`h-14 w-24 rounded-full bg-linear-to-r ${project.tone} opacity-80 blur-[1px] transition-all duration-500 group-hover:w-28 group-hover:opacity-100`}
                />
                <span className="grid h-11 w-11 place-items-center rounded-full border border-black/25 transition-all group-hover:rotate-45 group-hover:bg-black group-hover:text-white">
                  <ArrowIcon diagonal />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
