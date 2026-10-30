import { TechIcon } from "@/components/ui/TechIcon";
import type { SkillIcon } from "@/lib/profile";

type SkillsMarqueeProps = {
  skills: SkillIcon[];
  /** Flows right-to-left instead of left-to-right. */
  reverse?: boolean;
};

const SKILL_LABELS: Record<SkillIcon, string> = {
  react: "React",
  nextjs: "Next.js",
  typescript: "TypeScript",
  javascript: "JavaScript",
  tailwindcss: "Tailwind CSS",
  sass: "Sass",
  express: "Express",
  nestjs: "NestJS",
  typeorm: "TypeORM",
  sequelize: "Sequelize",
  postgresql: "PostgreSQL",
  python: "Python",
  fastapi: "FastAPI",
};

/** Continuous, icon-only ticker: the list is rendered twice so a -50% translate loops seamlessly. */
export function SkillsMarquee({ skills, reverse = false }: SkillsMarqueeProps) {
  return (
    <div className="overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <span className="sr-only">{skills.map((icon) => SKILL_LABELS[icon]).join(", ")}</span>
      <div
        aria-hidden="true"
        className={`flex w-max items-center gap-[30px] motion-safe:animate-[marquee_60s_linear_infinite] ${
          reverse ? "motion-safe:[animation-direction:reverse]" : ""
        }`}
      >
        <div className="flex shrink-0 items-center gap-[30px]">
          {skills.map((icon) => (
            <TechIcon
              key={icon}
              name={icon}
              className="h-5 w-auto shrink-0 text-white/70 transition-colors hover:text-lime"
            />
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-[30px] motion-reduce:hidden">
          {skills.map((icon) => (
            <TechIcon
              key={icon}
              name={icon}
              className="h-5 w-auto shrink-0 text-white/70 transition-colors hover:text-lime"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
