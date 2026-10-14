---
name: new-section
description: Add a new section to the landing page or a new page/route to the app. Use when the user asks to create, add or build a section, page, route, block or similar piece of the site.
---

# Adding a section or a page

Follow the `app-style` skill for all visual decisions. Ask the user only if the content is unknown; otherwise use clearly marked placeholder content and say so at the end.

## New section on the home page

1. **Content first**: put text, lists and links in `src/lib/profile.ts` (export a typed constant, like `projects` and `skills`). Keep only structural copy (headings, labels) in the component.
2. **Component**: create `src/components/<Name>Section.tsx` (PascalCase) as a Server Component with a named export:
   ```tsx
   export function TestimonialsSection() {
     return (
       <section
         id="testimonios"
         aria-labelledby="testimonios-title"
         className="px-5 py-24 md:px-10 md:py-32"
       >
         <div className="mx-auto max-w-7xl">
           <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-lime">
             03 — Testimonios
           </p>
           <h2 id="testimonios-title" className="text-5xl font-semibold tracking-[-0.055em] md:text-7xl">
             ...
           </h2>
         </div>
       </section>
     );
   }
   ```
   - `id` is a Spanish slug used for anchor links; `aria-labelledby` points at the `<h2>`.
   - Continue the eyebrow numbering (`01`, `02`, ... in page order) and renumber later sections if inserting in the middle.
   - Pick dark (`bg-ink`, default) or light (`bg-paper text-coal`) so sections keep alternating.
3. **Small reusable pieces** (a badge, a card, an icon) go in `src/components/ui/` and must be generic and stateless.
4. **Render it** in `src/app/page.tsx` in the right order.
5. **Navigation**: if it should be reachable from the header, add a link in `src/components/Header.tsx` (`<Link href="#<id>">`).
6. Add `'use client'` only if the section needs state, effects or browser APIs; if so, keep the interactive part in a small client component and the rest on the server.

## New page (route)

1. Create `src/app/<slug>/page.tsx`. Keep it thin: it composes components from `src/components/`; no business logic or large markup in `app/`.
2. Export `metadata` (Spanish `title` and `description`) from the page.
3. Dynamic routes use the global typed helpers: `export default async function Page(props: PageProps<"/blog/[slug]">)`, with `await props.params`.
4. The header and footer come from `src/app/layout.tsx` automatically. Because the header is `fixed`, give the page's first section top padding (`pt-32`) so content isn't hidden behind it.
5. **Header anchors break off the home page**: links like `#proyectos` must become `/#proyectos` once more than one page exists. Update `Header.tsx` when adding the first extra page.
6. This project uses Next.js 16 with `cacheComponents` enabled. Before using `fetch`, `cookies()`, `headers()`, `searchParams`, `new Date()` or other dynamic APIs, check `node_modules/next/dist/docs/01-app/` for the current rules.
7. Remote images need their host in `images.remotePatterns` in `next.config.ts`.

## Before finishing

Run and fix any errors:

```
npx tsc --noEmit
npm run lint
```

Then summarize what was added and list any placeholder content the user needs to replace.
