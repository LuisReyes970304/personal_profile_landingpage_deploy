// Page content ported from the Figma Make prototype.
// The email is still a placeholder.

export type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  /** Tailwind gradient stops for the decorative pill. */
  tone: string;
};

export const profile = {
  name: "Luis Reyes",
  firstName: "Luis",
  initials: "LR",
  role: "Desarrollador full stack",
  location: "Barranquilla · Colombia",
  copyrightYear: 2026,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/luis-reyes-caro/?isSelfProfile=true" },
    { label: "GitHub", href: "https://github.com/LuisReyes970304" },
  ],
};

export const projects: Project[] = [
  {
    number: "01",
    title: "CRUD FastApi",
    category: "Backend· Novedad",
    description:
      "La sencilles de python en cada endpoint.",
    tags: ["Python", "Postgres", "API"],
    tone: "from-[#c7ff43] to-[#76d8ff]",
  },
  {
    number: "02",
    title: "Arco Finance",
    category: "Producto · Fintech",
    description:
      "Plataforma financiera que transforma datos densos en decisiones simples, rápidas y humanas.",
    tags: ["TypeScript", "Design System", "API"],
    tone: "from-[#ff7a59] to-[#ffcf48]",
  },
  {
    number: "03",
    title: "Lumen AI",
    category: "Experiencia · Inteligencia artificial",
    description:
      "Un espacio de trabajo colaborativo diseñado para incorporar IA sin perder el control creativo.",
    tags: ["Next.js", "AI", "WebGL"],
    tone: "from-[#9a7cff] to-[#ff82c8]",
  },
];

export const skills = [
  "React / Next.js",
  "TypeScript",
  "Node.js / Express",
  "Nest.js / TypeORM",
  "SQLite / Postgres",
  "Python / FastApi",
];
