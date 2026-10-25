import { HashLink } from "@/components/ui/HashLink";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { MobileMenu } from "@/components/header/MobileMenu";
import { profile } from "@/lib/profile";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
        <HashLink
          href="#inicio"
          className="group flex items-center gap-3 font-semibold tracking-tight text-white"
          aria-label="Ir al inicio"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-lime text-sm font-bold text-ink transition-transform group-hover:rotate-12">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </HashLink>

        <nav
          className="hidden items-center gap-25 text-sm text-white/60 md:flex"
          aria-label="Navegación principal"
        >
          <HashLink 
            className="uppercase tracking-wider transition-colors hover:text-lime" 
            href="#proyectos"
          >
            Proyectos
          </HashLink>
          <HashLink 
            className="uppercase tracking-wider transition-colors hover:text-lime" 
            href="#sobre-mi"
          >
            Sobre mí
          </HashLink>
      
          <HashLink
            className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-lime hover:bg-lime hover:text-ink"
            href="#contact"
          >
            Hablemos
            <ArrowIcon diagonal />
          </HashLink>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
