# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Personal Landing Page

## Overview
Personal profile landing page for Luis Reyes, full-stack developer. Section components live in feature folders under `src/components/` (`hero/`, `projects/`, `about/`, ...), content (profile, projects, skills) in `src/lib/profile.ts`. Copy is in Spanish (`<html lang="es">`). `profile.ts` has no email field despite its header comment.

## Tech Stack
- Framework: Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Styling: Tailwind CSS v4
- Animation: mostly `gsap`, with one pure-CSS exception. `HeroSection.tsx` plays a one-shot intro timeline on mount (replayable via a `hero-intro:replay` window event); `ui/ScrollProgressBar.tsx` uses the `ScrollTrigger` plugin to drive a fixed, read-only progress bar (fill + dot) tied to scroll position — no drag-to-scroll, that's handled by the themed native scrollbar instead (`::-webkit-scrollbar*` rules + `scrollbar-color` in `globals.css`: `color-ink` track, `color-lime` thumb, no scrollbar buttons); `ProjectRing.tsx` positions the project cards on a 3D ring with `gsap.set` and tweens its rotation (autoplay, drag, horizontal wheel, arrow keys, prev/next buttons); `ProjectsSection.tsx`, `AboutSection.tsx`, `ContactSection.tsx` and `Footer.tsx` use the `hooks/useScrollReveal.ts` hook (scrubbed-`ScrollTrigger`) to fade an element in as it nears and back out once it's scrolled past — mark an element `data-reveal` to pick it up; `HeroSection.tsx` and `contact/ContactMeSection.tsx` use the `hooks/useGlowRef.ts` hook to make a glow follow the cursor inside a container (the caller renders the absolutely positioned glow element and attaches both returned refs). All of the gsap-driven animation respects `prefers-reduced-motion`; follow that pattern for any new gsap usage. The one non-gsap case is `about/SkillsMarquee.tsx` (rendered twice by `AboutSection.tsx`, for `frontendSkills`/`backendSkills` in `profile.ts`): a pure-CSS `animate-[marquee_...]` loop (keyframes in `globals.css`) rendering `ui/TechIcon.tsx` per skill, gated by the `motion-safe:`/`motion-reduce:` Tailwind variants instead of a gsap check.
- Linting: ESLint 9 flat config (`eslint.config.mjs`, extends `eslint-config-next` core-web-vitals + typescript)
- No test framework is set up yet.

## Next.js 16 caveat
This Next.js version has breaking changes relative to older training data. Before writing Next-specific code, check the bundled docs in `node_modules/next/dist/docs/` (`01-app/` covers the App Router; ignore `02-pages/`, this project doesn't use the Pages Router) and heed deprecation notices. Notable points already visible in the code:
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`, which change data-fetching/caching semantics; check the docs before using dynamic APIs or fetch caching.
- `next.config.ts` also sets `experimental.agentUpgrade: "security"` and allows `next/image` to load from `images.unsplash.com` via `images.remotePatterns`.
- Next generates global typed helpers for route props (e.g. `LayoutProps<"/">`, `PageProps<...>`). Prefer them in new routes; the existing layouts still hand-write their `children` prop.


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
│   ├── layout.tsx      # Root layout: fonts, metadata, global UI (progress bar, conditional navbar/footer). Required.
│   ├── page.tsx        # Content for the current route
│   ├── loading.tsx     # Loading state for the route segment (create when needed)
│   ├── error.tsx       # Error boundary for the route segment ('use client', create when needed)
│   └── globals.css
├── components/         # Reusable React components
│   └── ui/             # Atomic elements (Button, Input, Badge, Card...)
├── lib/                # Utilities, helpers, API integrations, constants
└── hooks/              # Reusable custom React hooks (e.g. useScrollReveal.ts)
```

- `page.tsx` stacks the sections in order: Hero, Projects, About, Contact. Projects is the only light section (`bg-lime-cream`, with a `ui/GridTunnel.tsx` canvas behind it from `md` up and two `ui/GridCorner.tsx` decorations below that, where the tunnel would crowd the view); it renders `ProjectRing.tsx`, which renders a `ProjectCard.tsx` per entry in `projects` (`profile.ts`). `ProjectsSection.tsx` forwards the ring's `onRotate` degrees to the tunnel's `advance` ref method, so the tunnel only moves inward while the ring turns, in either direction. A card links to `liveUrl` when set, otherwise `repoUrl`. The root layout renders `ui/ScrollProgressBar.tsx` (fixed above the header) on every route, plus `ConditionalChrome.tsx`, which adds `Header` and `Footer` around the page.
- `/contact_me` is the only route besides `/`, reached from the "Hagámosla realidad." CTA in `ContactSection.tsx`. `ConditionalChrome.tsx` hides the global `Header` and `Footer` for paths starting with an entry in `HIDDEN_CHROME_PREFIXES`, and `app/contact_me/layout.tsx` supplies its own minimal header instead. A new route without the global chrome needs an entry there. The hash targets only exist on `/`, and `HashLink` only accepts `#...` hrefs, so use `next/link` to get home from this route. The page content lives in `contact/ContactMeSection.tsx`, not in the route files, and `contact_me/layout.tsx` must keep rendering `children`: if it doesn't, the build still passes but the page never appears.
- `contact/ContactForm.tsx` submits to the `lib/sendContactMessage.ts` Server Action: honeypot check (`website` field), Zod validation, then Resend. It reads `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and optionally `CONTACT_FROM_EMAIL` from `.env.local`. `.gitignore` covers `.env*`, so there's no committed env template, and production needs the same variables set in Vercel plus a redeploy. A missing variable or a Resend failure only shows the user a generic error; the cause is in the `Contact form: ...` server log line. The default sender, `onboarding@resend.dev`, only delivers to the Resend account owner's address; any other recipient needs a verified domain and `CONTACT_FROM_EMAIL`.
- In-page navigation uses hash links (`#inicio`, `#proyectos`, `#sobre-mi`, `#contact`) that must match target `id`s. Three resolve to their own section (`HeroSection.tsx`, `ProjectsSection.tsx`, `AboutSection.tsx`); `#contact` resolves to `id="contact"` on `Footer.tsx` — `ContactSection.tsx` itself has no matching `id`, only an `aria-label`. If you rename or add a section, update the links in `Header.tsx`, `MobileMenu.tsx`, and `HeroSection.tsx`.
- The header is `fixed`; its own nav is desktop-only (`hidden md:flex`). Below `md`, `Header.tsx` renders `MobileMenu.tsx` (`'use client'`, toggled open/close state), which duplicates the same links and uses `ui/BurgerIcon.tsx` for the toggle icon. Keep both navs in sync when changing links.

## Skills
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
- Components: PascalCase file names (`HeroSection.tsx`). Utilities and hooks: camelCase.

## Before finishing
After any code change, run `npx tsc --noEmit` and `npm run lint` and fix the errors. Also run `npm run build` when you add a route or use dynamic APIs.