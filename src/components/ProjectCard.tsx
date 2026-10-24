import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/profile";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative flex h-full w-[min(82vw,24rem)] flex-col overflow-hidden rounded-[2rem] border border-black/10 bg-cream text-coal shadow-2xl shadow-black/15">
      <div
        aria-hidden="true"
        className={`relative h-40 shrink-0 overflow-hidden bg-linear-to-br ${project.tone}`}
      >
        <span className="absolute bottom-3 left-6 text-7xl font-semibold leading-none tracking-[-0.075em] text-ink/85">
          {project.number}
        </span>
        <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-ink text-cream transition-transform group-hover:rotate-45">
          <ArrowIcon diagonal />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="mb-3 text-xs uppercase tracking-wider text-black/55">
          {project.category}
        </p>
        <h3 className="mb-4 text-3xl font-semibold tracking-[-0.045em]">
          {project.title}
        </h3>
        <p className="mb-6 leading-relaxed text-black/55">{project.description}</p>
        <ul className="mb-8 flex flex-wrap gap-2" aria-label="Tecnologías">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        {project.repoUrl && (
          // The ::after overlay stretches the link over the whole card.
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            draggable={false}
            className="mt-auto inline-flex w-fit items-center gap-3 border-b border-black/40 pb-2 text-sm font-semibold uppercase tracking-widest transition-colors after:absolute after:inset-0 after:content-[''] hover:border-coal"
          >
            Ver repositorio
            <span className="sr-only">
              de {project.title} (se abre en una pestaña nueva)
            </span>
            <span className="transition-transform group-hover:translate-x-1">
              <ArrowIcon diagonal />
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
