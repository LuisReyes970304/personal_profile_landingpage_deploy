import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { profile } from "@/lib/profile";

export default function contactLayout({children}: {children: React.ReactNode}) {
    return (
        <div
            lang="es"
            data-scroll-behavior="smooth"
        >
            <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
                    <Link
                        href="/"
                        className="group flex items-center gap-3 font-semibold tracking-tight text-white"
                        aria-label="Ir al inicio"
                    >
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-lime text-sm font-bold text-ink transition-transform group-hover:rotate-12">
                            {profile.initials}
                        </span>
                        <span className="hidden sm:inline">{profile.name}</span>
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-lime hover:bg-lime hover:text-ink"
                    >
                        <span className="rotate-180" aria-hidden="true">
                            <ArrowIcon />
                        </span>
                        Volver
                    </Link>
                </div>
            </header>
            <div className="pt-20">{children}</div>
        </div>
    );
}
