# Landon Norris–style redesign — design spec

Date: 2026-08-08

## Goal

Redesign the `ajaaz-fit-hub` marketing site so it feels like landonorris.com: big
editorial typography, scroll-triggered reveals, inertia smooth-scroll, and
parallax imagery — while keeping the existing violet/gold dark theme, updating
contact/social details, and adding an Instagram reel highlight section. The
site should visually "wow" a first-time visitor and push them toward the
Get in Touch / enquiry flow.

## Non-goals

- No color/theme token changes (`src/styles.css` oklch values stay as-is).
- No backend/payment changes — enquiry flow stays WhatsApp/email based.
- No structural redesign of Services/Packages/FAQ/Contact pages beyond adding
  the shared scroll-reveal treatment for visual consistency with the new home
  page.
- No real Instagram embed widgets (confirmed with user) — reels use custom
  cards linking out to Instagram.

## Content updates (`src/data/site.ts`)

- `email`: `ansariajaaz9@gmail.com` (replaces placeholder).
- Add `instagram: "https://www.instagram.com/ajaaz.fitmode?igsh=MXR5MDNlMTQ5dGtiNg=="`.
- Add `REELS`: array of 3 entries, each `{ url, caption, image }` for:
  - `https://www.instagram.com/p/DT7zQ86jWys/`
  - `https://www.instagram.com/ajaaz.fitmode/reel/DUI1LnEjdSQ/`
  - `https://www.instagram.com/ajaaz.fitmode/reel/DUYRhfGCMa-/`
  - Captions are short, benefit-oriented (e.g. "The lift that changed his
    client's shoulder pain"), written to sound plausible without claiming
    fabricated stats as fact — like counts shown are illustrative UI numbers
    labeled as such conceptually (see Animated counters below), not scraped
    real data.
  - Thumbnail images are sourced from `ajaaz-fit-hub/images/*.jpg` (copied
    into `src/assets/gallery/`).

## Images

All 11 files in `ajaaz-fit-hub/images/` are usable assets:
- 10 are portrait gym photos of Coach Ajaaz (flexing / training poses,
  various angles) — good for hero, coach section, gallery mosaic, and reel
  thumbnails.
- 1 (`PHOTO-2026-08-08-11-37-22_5.jpg`) is a pre-built infographic, "The
  Science Behind My Transformation" (training/nutrition/recovery/lifestyle
  breakdown) — high production value, used as its own full-width showcase
  section ("The Method") since it's ready-made proof-of-expertise content.

Selected images are copied into `src/assets/gallery/` (Vite-processed,
optimized) rather than served from `public/`, consistent with how
`hero.jpg`/`coach.jpg` are already imported.

## Animation infrastructure

- Add `motion` (Framer Motion) — scroll-reveal, stagger, and animated counters.
- Add `lenis` — inertia smooth scroll, initialized once in `src/routes/__root.tsx`
  and cleaned up on unmount.
- `src/components/site/Reveal.tsx`: wraps children, animates opacity/translateY
  in when scrolled into view (`whileInView`, `viewport={{ once: true }}`),
  accepts `delay`/`stagger` props for groups of children.
- `src/components/site/AnimatedCounter.tsx`: takes a numeric target (and
  optional suffix like "+", "%"), rolls up from 0 when scrolled into view,
  using a spring/tween over ~1.2s. Used for the stats band and for the
  illustrative like/view counters on reel cards.

## Homepage redesign (`src/routes/index.tsx`)

1. **Hero** — larger type scale, headline lines fade/slide in with stagger,
   hero image gets a subtle parallax drift (translateY tied to scroll
   progress via `useScroll`/`useTransform`).
2. **Stats band** — existing 4 stats, values now animate via
   `AnimatedCounter` on scroll-into-view.
3. **Coach section** — existing content, now wrapped in `Reveal` with the
   coach image getting a slight scale-in.
4. **Gallery strip (new)** — a horizontal row of 5-6 gym photos, staggered
   reveal (alternating slide-up), each captioned with a short benefit line
   (e.g. "Progressive overload, tracked every session") to justify their
   presence as proof of coaching quality, not just decoration.
5. **"The Method" showcase (new)** — full-bleed section presenting the
   infographic image large, with `Reveal` fade/scale-in, framed by a short
   intro line and a CTA into Packages.
6. **Services / Packages previews** — unchanged content, wrapped in `Reveal`.
7. **Reels to watch (new)** — section heading ("Reels worth your 30 seconds"
   or similar), 3 `ReelCard`s in a grid: thumbnail image, centered play
   icon overlay, caption, an `AnimatedCounter`-driven "likes" number that
   rolls up on scroll, and the whole card links to the Instagram reel
   (`target="_blank" rel="noreferrer"`). Below the grid, an Instagram
   "Follow" button (icon + `@ajaaz.fitmode`) linking to the profile URL.
8. **FAQ + CTA** — unchanged content, wrapped in `Reveal`.

## Header / Footer

- `Header.tsx`: add an Instagram icon link (lucide `Instagram`) next to the
  existing YouTube button, pointing at `SITE.instagram`.
- `Footer.tsx`: replace email with the new address, add an Instagram row
  (icon + handle) under "Reach Ajaaz", and add the same Follow button used
  on the homepage reels section (small variant).

## Other pages

`services.tsx`, `packages.tsx`, `faq.tsx`, `contact.tsx` get their existing
sections wrapped in `<Reveal>` for scroll-in consistency with the home page.
No layout/content changes beyond that.

## Testing / verification

- `bun run dev`, visually check hero parallax, stat counters, gallery
  reveal, method section, reel cards, follow button, and mobile nav on a
  narrow viewport.
- `bun run lint` and `bun run build` must pass.
- Confirm all outbound links (Instagram profile, 3 reels, mailto, YouTube,
  WhatsApp) open correct targets.
