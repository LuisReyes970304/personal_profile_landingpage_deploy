import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/profile";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const href = project.liveUrl ?? project.repoUrl;
  const linkLabel = project.liveUrl ? "Ver sitio" : "Ver repositorio";

  return (
    <article className="relative flex h-full w-[min(82vw,24rem)] flex-col overflow-hidden rounded-[2rem] border border-black/10 bg-cream text-coal shadow-2xl shadow-black/15">
      <div
        className={`relative flex h-40 shrink-0 items-end overflow-hidden bg-linear-to-br px-6 pb-5 ${project.tone}`}
      >
        <h3 className="text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-ink">
          {project.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-black/70">
          {project.category}
        </p>
        <p className="mb-6 leading-relaxed text-black/75">{project.description}</p>
        <ul className="mb-8 flex flex-wrap gap-2" aria-label="Tecnologías">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        {href && (
          // The ::after overlay stretches the link over the whole card.
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            draggable={false}
            className="mt-auto inline-flex w-fit items-center gap-3 border-b border-black/40 pb-2 text-sm font-semibold uppercase tracking-widest transition-colors after:absolute after:inset-0 after:content-[''] hover:border-coal"
          >
            {linkLabel}
            <span className="sr-only">
              de {project.title} (se abre en una pestaña nueva)
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
