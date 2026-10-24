---
name: app-style
description: Visual style guide for this landing page (colors, typography, spacing, hover effects, accessibility). Use whenever writing or changing any UI, Tailwind classes or CSS in this app, or when the user asks to restyle something or make it match the site's look.
---

# Landing page style guide
components in `src/components/` are the reference. Match them before inventing anything new.

## Colors

Theme tokens are defined in `@theme` in `src/app/globals.css`. Always use them, never raw hex values or Tailwind's default palette (`lime-400` is a different green):

| Token | Value | Use |
|---|---|---|
| `ink` | `#0c0c0c` | Page background, dark sections, text on lime |
| `cream` | `#f5f4ef` | Default text on dark |
| `paper` | `#f1f0e9` | Light section background |
| `coal` | `#111111` | Text on light sections |
| `lime` | `#c7ff43` | The single accent: highlights, CTAs, hover states |

- Secondary text uses opacity, not new colors: on dark `text-white/55` (body and muted), `text-white/60`–`/70` (emphasis); on light `text-black/55`. These are the lowest opacities that meet WCAG AA (4.5:1) on `ink` and `paper`; lower values (`text-white/35`, `text-black/45`) are only for large headings or decorative text.
- Borders: `border-white/10`–`/15` on dark, `border-black/20` on light.
- In arbitrary values, reference tokens with `var(--color-lime)` instead of hex.
- If a new color is truly needed, add a token to `@theme` in `globals.css` instead of a one-off value.
- Sections alternate dark (`bg-ink`, default) and light (`bg-paper text-coal`). The site does not switch on `prefers-color-scheme`.

## Typography

Fonts come from `next/font` in `src/app/layout.tsx`: `font-sans` = Manrope (default), `font-serif` = DM Serif Display (accent only, usually `font-serif italic font-normal`).

- **Eyebrow label** above section titles: `text-xs font-bold uppercase tracking-[0.2em]` with numbered text like `03 — Experiencia` (continue the existing numbering), colored `text-black/45` on light or `text-lime` on dark.
- **Headings**: `font-semibold` with tight negative tracking (`tracking-[-0.04em]` to `tracking-[-0.075em]`, tighter as size grows). Big sizes use `text-5xl md:text-7xl` or `text-[clamp(...)]`.
- **Two-line headings**: the second line is a `<span className="block ...">` with a contrast treatment: `text-lime`, `text-white/35`, or `font-serif italic font-normal`.
- **Body**: `text-base`/`text-lg leading-relaxed`, constrained with `max-w-sm`/`max-w-md`/`max-w-2xl`.
- **Small caps metadata** (locations, footer, links): `text-xs uppercase tracking-widest` or `tracking-[0.15em]`.

## Layout and spacing

- Content container: `mx-auto max-w-7xl`, with horizontal padding `px-5 md:px-10` on the section.
- Section vertical padding: `py-24 md:py-32`.
- Grids use fractional columns from `lg`/`md` up (e.g. `lg:grid-cols-[0.85fr_1.15fr]`) and stack on mobile.
- Lists of items are separated by hairline borders (`border-t` on the list, `border-b` on each row) rather than cards with backgrounds.
- Mobile first: must work at 320px wide without horizontal scroll.

## Shapes and interactions

- Pills and icon buttons are `rounded-full`; large media uses `rounded-[2rem]`.
- Hover states are short color/transform transitions (`transition-colors`, `transition-transform`), usually turning things `lime` or `white`.
- Arrow affordances use `ArrowIcon` from `@/components/ui/ArrowIcon` (`diagonal` for external/CTA links), often in a round button that does `group-hover:rotate-45`.
- Use `group` / `group-hover:` so the whole row or link reacts, not just the icon.
- Decorative glows: a blurred `bg-lime/10 blur-[100px]` circle, or `shadow-[0_0_16px_var(--color-lime)]`.
- Small chips use `Tag` from `@/components/ui/Tag`.

## Accessibility (required)

- Decorative elements (glows, gradients, icon wrappers) get `aria-hidden="true"`.
- Images use `next/image` with meaningful Spanish `alt` text.
- Keep contrast readable: text that conveys information stays at `/55` or above (WCAG AA); `text-white/35` is fine only for large heading contrast lines like `Ideas sin ruido.`
- Every interactive element must be reachable and visible with the keyboard; don't remove focus outlines.
- Smooth scrolling is already gated behind `prefers-reduced-motion` in `globals.css`; keep new motion subtle.

## Copy

Visible text is in Spanish; code, comments and identifiers are in English.
