# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Personal Landing Page

## Overview
Personal profile landing page for Luis Reyes, full-stack developer. Section components in `src/components/`, content (profile, projects, skills) in `src/lib/profile.ts`. Copy is in Spanish (`<html lang="es">`). Placeholder content: the contact email in `profile.ts`, the sample projects, and the about-me text in `AboutSection.tsx` (inherited from the prototype). `gsap` (with `ScrollToPlugin`) is imported in `HeroSection.tsx` but not yet wired to any actual animation — treat it as unfinished prototype wiring, not a pattern to copy.

## Tech Stack
- Framework: Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Styling: Tailwind CSS v4
- Animation: `gsap` (currently only imported in `HeroSection.tsx`, see note above)
- Linting: ESLint 9 flat config (`eslint.config.mjs`, extends `eslint-config-next` core-web-vitals + typescript)
- No test framework is set up yet.

## Next.js 16 caveat
This Next.js version has breaking changes relative to older training data. Before writing Next-specific code, check the bundled docs in `node_modules/next/dist/docs/` (`01-app/` covers the App Router; ignore `02-pages/`, this project doesn't use the Pages Router) and heed deprecation notices. Notable points already visible in the code:
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`, which change data-fetching/caching semantics; check the docs before using dynamic APIs or fetch caching.
- Route props use the global typed helpers (e.g. `LayoutProps<"/">`, `PageProps<...>`) rather than hand-written prop types.


## Styling
Tailwind v4 is wired through Turbopack (`@tailwindcss/turbopack` loader in `next.config.ts`), not PostCSS. There is no `tailwind.config` or `postcss.config`; theme tokens live in `src/app/globals.css`. For any visual decision, use the `app-style` skill.

## Commands
- `npm run dev`: start dev server (http://localhost:3000)
- `npm run build`: production build
- `npm run start`: run production build
- `npm run lint`: lint the project
- `npx tsc --noEmit`: type-check only (`npm run build` also type-checks)

## Architecture
All source code is in `src/`; config files stay at the root. `@/*` maps to `./src/*`.

```
src/
├── app/                # File-based routing (App Router). Routes only.
│   ├── layout.tsx      # Root layout: global, persistent UI (navbar, footer). Required.
│   ├── page.tsx        # Content for the current route
│   ├── loading.tsx     # Loading state for the route segment (create when needed)
│   ├── error.tsx       # Error boundary for the route segment ('use client', create when needed)
│   └── globals.css
├── components/         # Reusable React components
│   └── ui/             # Atomic elements (Button, Input, Badge, Card...)
├── lib/                # Utilities, helpers, API integrations, constants
└── hooks/              # Reusable custom React hooks (not created yet)
```

- `page.tsx` stacks the sections in order: Hero, Projects, About, Contact. `Header` and `Footer` come from the root layout.
- In-page navigation uses hash links (`#inicio`, `#proyectos`, `#sobre-mi`) that must match section `id`s. If you rename or add a section, update the links in `Header.tsx` and `HeroSection.tsx`.
- The header is `fixed` and its nav is desktop-only (`hidden md:flex`); there is no mobile menu yet.
Project skills in `.claude/skills/`:
- `app-style`: visual style guide. Use for any UI, Tailwind or CSS change.
- `new-section`: workflow for adding a section or a route.


## Rules
- Only change what is explicitly requested. Don't refactor, restyle or "fix" unrelated code; mention issues you notice instead.
- Keep `app/` for routing: no business logic or large markup in route files.
- Atomic, generic, stateless elements go in `components/ui/`; composed components in `components/`; content, helpers and API clients in `lib/`.
- Custom hooks go in `hooks/` as `useSomething.ts`.
- Server Components by default. Add `'use client'` only for state, effects or browser APIs, and keep the client part as small as possible.
- Import with the `@/*` alias. Use `next/image` for images and `next/link` for internal links.
- Semantic HTML and accessibility are required (see `app-style`).
- Don't add a Claude `Co-Authored-By` line or any other Claude attribution to commits or PRs.

## Conventions
- All code, comments, and docs must be in English.
- Only change what is explicitly requested; do not refactor unrelated code.
- Components: PascalCase file names (`HeroSection.tsx`). Utilities and hooks: camelCase.

## Before finishing
After any code change, run `npx tsc --noEmit` and `npm run lint` and fix the errors. Also run `npm run build` when you add a route or use dynamic APIs.