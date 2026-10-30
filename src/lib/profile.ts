// Page content ported from the Figma Make prototype.
// The email is still a placeholder.

export type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  /** Link to the project's repository or live demo, if available. */
  repoUrl: string;
  /** Link to the deployed app; the card links here instead of the repo when set. */
  liveUrl?: string;
};

export const profile = {
  name: "Luis Reyes",
  firstName: "Luis",
  initials: "LR",
  role: "Desarrollador full stack",
  location: "Barranquilla · Colombia ",
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
    repoUrl: "https://github.com/Callcenter-Application/cc_backend_v1_fastapi.git",
  },
  {
    number: "02",
    title: "Aplicación Callcenter Frontend",
    category: "Producto · BPO",
    description:
      "Aplicación web para la gestión de campañas de call center, con panel de administración y diseño responsivo.",
    tags: ["TypeScript", "Next.js", "TailwindCSS"],
    repoUrl: "https://github.com/Callcenter-Application/cc_frontend_v2_next.git",
  },
  {
    number: "03",
    title: "Recorder Screen",
    category: "Creación · digital",
    description:
      "Grabador de pantalla hecho con JavaScript Vanilla. Permite al usuario grabar su pantalla y descargar el video resultante en formato WebM.",
    tags: ["JavaScript", "MediaRecorder", "WebM"],
    repoUrl: "https://github.com/LuisReyes970304/recorder_screen.git",
  },
  {
    number: "04",
    title: "KeepeR",
    category: "Producto · Seguridad ciudadana",
    description:
      "Plataforma de seguridad ciudadana con paneles por rol, mapa de incidentes y botón SOS.",
    tags: ["FastAPI", "PostgreSQL", "MapLibre"],
    repoUrl: "https://github.com/LuisReyes970304/keeper-frontend",
    liveUrl: "https://keeper-frontend-tcqm.onrender.com/",
  },
];

export type SkillIcon =
  | "react"
  | "nextjs"
  | "typescript"
  | "javascript"
  | "tailwindcss"
  | "sass"
  | "express"
  | "nestjs"
  | "typeorm"
  | "sequelize"
  | "postgresql"
  | "python"
  | "fastapi";

export const frontendSkills: SkillIcon[] = [
  "react",
  "nextjs",
  "typescript",
  "javascript",
  "tailwindcss",
  "sass",
];

export const backendSkills: SkillIcon[] = [
  "express",
  "nestjs",
  "typeorm",
  "sequelize",
  "postgresql",
  "python",
  "fastapi",
];
