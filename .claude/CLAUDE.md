# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Personal Landing Page

## Overview
Personal profile landing page for Luis Reyes, full-stack developer. Section components in `src/components/`, content (profile, projects, skills) in `src/lib/profile.ts`. Copy is in Spanish (`<html lang="es">`). Still a placeholder: the "Hagámosla realidad." CTA in `ContactSection.tsx` links to `href="#"` because there's no contact email yet (`profile.ts` has no email field despite its header comment).

## Tech Stack
- Framework: Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Styling: Tailwind CSS v4
- Animation: mostly `gsap`, with one pure-CSS exception. `HeroSection.tsx` plays a one-shot intro timeline on mount (replayable via a `hero-intro:replay` window event); `ui/ScrollProgressBar.tsx` uses the `ScrollTrigger` plugin to drive a fixed, read-only progress bar (fill + dot) tied to scroll position — no drag-to-scroll, that's handled by the themed native scrollbar instead (`::-webkit-scrollbar*` rules + `scrollbar-color` in `globals.css`: `color-ink` track, `color-lime` thumb, no scrollbar buttons); `ProjectRing.tsx` positions the project cards on a 3D ring with `gsap.set` and tweens its rotation (autoplay, drag, horizontal wheel, arrow keys, prev/next buttons); `ProjectsSection.tsx`, `AboutSection.tsx`, `ContactSection.tsx` and `Footer.tsx` use the `hooks/useScrollReveal.ts` hook (scrubbed-`ScrollTrigger`) to fade an element in as it nears and back out once it's scrolled past — mark an element `data-reveal` to pick it up. All of the gsap-driven animation respects `prefers-reduced-motion`; follow that pattern for any new gsap usage. The one non-gsap case is `about/SkillsMarquee.tsx` (rendered twice by `AboutSection.tsx`, for `frontendSkills`/`backendSkills` in `profile.ts`): a pure-CSS `animate-[marquee_...]` loop (keyframes in `globals.css`) rendering `ui/TechIcon.tsx` per skill, gated by the `motion-safe:`/`motion-reduce:` Tailwind variants instead of a gsap check.
- Linting: ESLint 9 flat config (`eslint.config.mjs`, extends `eslint-config-next` core-web-vitals + typescript)
- No test framework is set up yet.

## Next.js 16 caveat
This Next.js version has breaking changes relative to older training data. Before writing Next-specific code, check the bundled docs in `node_modules/next/dist/docs/` (`01-app/` covers the App Router; ignore `02-pages/`, this project doesn't use the Pages Router) and heed deprecation notices. Notable points already visible in the code:
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`, which change data-fetching/caching semantics; check the docs before using dynamic APIs or fetch caching.
- `next.config.ts` also sets `experimental.agentUpgrade: "security"` and allows `next/image` to load from `images.unsplash.com` via `images.remotePatterns`.
- Route props use the global typed helpers (e.g. `LayoutProps<"/">`, `PageProps<...>`) rather than hand-written prop types.


## Styling
Tailwind v4 is wired through Turbopack (`@tailwindcss/turbopack` loader in `next.config.ts`), not PostCSS. There is no `tailwind.config` or `postcss.config`; theme tokens live in `src/app/globals.css`. For any visual decision, use the `app-style` skill, then any other relevant skill below (e.g. `accessibility-review`, `design-critique`).

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
└── hooks/              # Reusable custom React hooks (e.g. useScrollReveal.ts)
```

- `page.tsx` stacks the sections in order: Hero, Projects, About, Contact. Projects is the only light section (`bg-lime-cream`, with two `ui/GridCorner.tsx` decorations); it renders `ProjectRing.tsx`, which renders a `ProjectCard.tsx` per entry in `projects` (`profile.ts`). A card links to `liveUrl` when set, otherwise `repoUrl`. `Header` and `Footer` come from the root layout, alongside `ui/ScrollProgressBar.tsx` (also rendered in the root layout, fixed above the header).
- In-page navigation uses hash links (`#inicio`, `#proyectos`, `#sobre-mi`, `#contact`) that must match target `id`s. Three resolve to their own section (`HeroSection.tsx`, `ProjectsSection.tsx`, `AboutSection.tsx`); `#contact` resolves to `id="contact"` on `Footer.tsx` — `ContactSection.tsx` itself has no matching `id`, only an `aria-label`. If you rename or add a section, update the links in `Header.tsx`, `MobileMenu.tsx`, and `HeroSection.tsx`.
- The header is `fixed`; its own nav is desktop-only (`hidden md:flex`). Below `md`, `Header.tsx` renders `MobileMenu.tsx` (`'use client'`, toggled open/close state), which duplicates the same links and uses `ui/BurgerIcon.tsx` for the toggle icon. Keep both navs in sync when changing links.
Project skills in `.claude/skills/`:
- `app-style`: visual style guide. Use for any UI, Tailwind or CSS change.
- `new-section`: workflow for adding a section or a route.
- `accessibility-review`: WCAG 2.1 AA audit of a design or page.
- `design-critique`: structured feedback on usability, hierarchy and consistency.
- `design-handoff`: developer handoff spec (tokens, props, states, breakpoints) from a design.
- `design-system`: audit, document or extend the design system.
- `research-synthesis`: distill research data (interviews, surveys, tickets) into themes and recommendations.
- `user-research`: plan, conduct and synthesize user research studies.
- `ux-copy`: write or review UX microcopy (CTAs, errors, empty states).


## Rules
- Only change what is explicitly requested. Don't refactor, restyle or "fix" unrelated code; mention issues you notice instead.
- Keep `app/` for routing: no business logic or large markup in route files.
- Atomic, generic, stateless elements go in `components/ui/`; composed components in `components/`; content, helpers and API clients in `lib/`.
- Custom hooks go in `hooks/` as `useSomething.ts`.
- Server Components by default. Add `'use client'` only for state, effects or browser APIs, and keep the client part as small as possible.
- Import with the `@/*` alias. Use `next/image` for images and `next/link` for internal links. For in-page hash links (`#section`), use `ui/HashLink.tsx` instead, so clicking a link whose hash is already in the URL still scrolls to the section.
- Semantic HTML and accessibility are required (see `app-style`).
- Don't add a Claude `Co-Authored-By` line or any other Claude attribution to commits or PRs.
- Commit directly on `main`. Don't create branches or worktrees unless explicitly asked.

## Conventions
- All code, comments, and docs must be in English.
- Only change what is explicitly requested; do not refactor unrelated code.
- Components: PascalCase file names (`HeroSection.tsx`). Utilities and hooks: camelCase.

## Before finishing
After any code change, run `npx tsc --noEmit` and `npm run lint` and fix the errors. Also run `npm run build` when you add a route or use dynamic APIs.