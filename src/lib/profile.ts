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
  /** Link to the project's repository or live demo, if available. */
  repoUrl: string;
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
    category: "Backend · Novedad",
    description:
      "API REST modular construida con FastAPI, pensada como base reutilizable para servicios backend: operaciones CRUD, validación con Pydantic y persistencia en PostgreSQL.",
    tags: ["Python", "Postgres", "API"],
    tone: "from-[#c7ff43] to-[#76d8ff]",
    repoUrl: "https://github.com/Callcenter-Application/cc_backend_v1_fastapi.git",
  },
  {
    number: "02",
    title: "Aplicación Callcenter Frontend",
    category: "Producto · BPO",
    description:
      "Aplicación web para la gestión de campañas de call center, con panel de administración y diseño responsivo.",
    tags: ["TypeScript", "Next.js", "TailwindCSS"],
    tone: "from-[#ff7a59] to-[#ffcf48]",
    repoUrl: "https://github.com/Callcenter-Application/cc_frontend_v2_next.git",
  },
  {
    number: "03",
    title: "Recorder Screen",
    category: "Creación · digital",
    description:
      "Grabador de pantalla hecho con JavaScript Vanilla. Permite al usuario grabar su pantalla y descargar el video resultante en formato WebM.",
    tags: ["JavaScript", "MediaRecorder", "WebM"],
    tone: "from-[#9a7cff] to-[#ff82c8]",
    repoUrl: "https://github.com/LuisReyes970304/recorder_screen.git",
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
