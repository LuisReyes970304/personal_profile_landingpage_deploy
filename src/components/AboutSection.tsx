import Image from "next/image";
import { skills } from "@/lib/profile";

export function AboutSection() {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="sobre-mi-title"
      className="relative px-5 pt-24 md:px-10 md:pt-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div className="relative min-h-[32rem] overflow-hidden rounded-[2rem]">
          <Image
            src="https://images.unsplash.com/photo-1765539160785-e7953620488f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1080"
            alt="Desarrollador trabajando frente a un ordenador en un estudio con iluminación ambiental"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-center grayscale transition duration-700 hover:scale-105 hover:grayscale-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"
          />
          <p className="absolute bottom-7 left-7 max-w-48 text-sm leading-relaxed text-white/75">
            En busqueda de la perfección. Apasionado por los detalles.
          </p>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="mb-7 text-xs font-bold uppercase tracking-[0.2em] text-lime">
              02 — Sobre mí
            </p>
            <h2
              id="sobre-mi-title"
              className="mb-9 text-4xl font-semibold leading-[1.04] tracking-[-0.05em] md:text-6xl"
            >
              Código limpio.
              <span className="block text-white/35">Ideas sin ruido.</span>
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-white/55 md:text-xl">
              Llevo más de 8 años creando productos digitales para startups y
              equipos ambiciosos. Me gusta convertir problemas complejos en
              experiencias sencillas, útiles y con carácter.
            </p>
          </div>

          <ul
            className="mt-12 grid grid-cols-2 border-t border-white/15 sm:grid-cols-3"
            aria-label="Habilidades"
          >
            {skills.map((skill) => (
              <li key={skill} className="border-b border-white/15 py-4 text-sm text-white/70">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
