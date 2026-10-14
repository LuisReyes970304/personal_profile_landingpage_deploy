import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function ContactSection() {
  return (
    <section aria-label="Contacto" className="px-5 pt-28 md:px-10 md:pt-36">
      <div className="mx-auto max-w-7xl border-t border-white/15 pt-16">
        <p className="mb-6 text-sm text-white/45">¿Tienes una idea en mente?</p>
        <a
          href="#"
          className="group flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="text-[clamp(2.8rem,7vw,6.5rem)] font-semibold leading-none tracking-[-0.06em] transition-colors group-hover:text-lime">
            Hagámosla realidad.
          </span>
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-lime text-ink transition-transform group-hover:rotate-45 sm:h-20 sm:w-20">
            <ArrowIcon diagonal />
          </span>
        </a>
      </div>
    </section>
  );
}
