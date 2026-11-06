"use client";

import { useCallback, useRef } from "react";
import { ProjectRing } from "@/components/projects/ProjectRing";
import { GridCorner } from "@/components/ui/GridCorner";
import { GridTunnel, type GridTunnelHandle } from "@/components/ui/GridTunnel";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { projects } from "@/lib/profile";

/** Degrees the ring has to turn to move the tunnel in by one cross-section. */
const DEGREES_PER_TUNNEL_RING = 45;

export function ProjectsSection() {
  const ref = useScrollReveal<HTMLDivElement>({ targets: "[data-reveal]" });
  const tunnelRef = useRef<GridTunnelHandle>(null);

  const handleRingRotate = useCallback((degrees: number) => {
    tunnelRef.current?.advance(degrees / DEGREES_PER_TUNNEL_RING);
  }, []);

  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-title"
      className="relative isolate flex min-h-screen flex-col overflow-x-clip bg-lime-cream pb-6 pt-20 text-coal md:h-screen md:pb-10 md:pt-28"
    >
      <GridCorner className="left-0 top-0 h-full w-1/2 -z-10 md:hidden" />
      <GridCorner className="bottom-0 right-0 h-full w-1/2 -z-10 rotate-180 md:hidden" />
      <GridTunnel ref={tunnelRef} className="inset-0 -z-10 hidden md:block" />
      <div ref={ref} className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col px-5 md:px-10">
        <div
          data-reveal
          className="mb-5 flex shrink-0 flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-end md:gap-7"
        >
          <div>
            <h2
              id="proyectos-title"
              className="text-5xl font-semibold tracking-[-0.055em] md:text-7xl"
            >
              Proyectos con
              <span className="block font-serif font-normal italic">
                <span className="bg-[linear-gradient(transparent_80%,var(--color-lime)_60%,var(--color-lime)_90%,transparent_90%)]">
                  intención.
                </span>
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-black/90">
            Una selección de productos digitales creados para conectar marcas,
            personas y buenas ideas.
          </p>
        </div>

        <ProjectRing projects={projects} onRotate={handleRingRotate} />
      </div>
    </section>
  );
}
