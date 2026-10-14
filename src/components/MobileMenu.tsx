"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { BurgerIcon } from "@/components/ui/BurgerIcon";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-lime hover:text-lime"
      >
        <BurgerIcon open={isOpen} />
      </button>

      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navegación principal"
          className="absolute inset-x-0 top-20 flex flex-col gap-1 border-b border-white/10 bg-ink/95 px-5 py-6 text-sm text-white/60 backdrop-blur-xl"
        >
          <Link
            className="border-b border-white/10 py-3 uppercase tracking-wider transition-colors hover:text-lime"
            href="#proyectos"
            onClick={close}
          >
            Proyectos
          </Link>
          <Link
            className="border-b border-white/10 py-3 uppercase tracking-wider transition-colors hover:text-lime"
            href="#sobre-mi"
            onClick={close}
          >
            Sobre mi
          </Link>
          <Link
            className="mt-4 flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-lime hover:bg-lime hover:text-ink"
            href="#contact"
            onClick={close}
          >
            Hablemos
            <ArrowIcon diagonal />
          </Link>
        </nav>
      )}
    </div>
  );
}
