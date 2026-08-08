# Landon Norris–style Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the `ajaaz-fit-hub` marketing site so it feels like landonorris.com — big editorial type, scroll-triggered reveals, inertia smooth-scroll, parallax imagery — while keeping the existing color theme, updating contact/social info, and adding an Instagram reel highlight section with rolling-number animations.

**Architecture:** Add two small animation primitives (`Reveal`, `AnimatedCounter`) plus a `SmoothScroll` provider, built on the `motion` (Framer Motion) and `lenis` libraries. Reuse these primitives across the redesigned homepage and, more lightly, on the four secondary pages. Site content (email, Instagram, reels) moves through the existing `src/data/site.ts` single source of truth. Real gym photos already in `ajaaz-fit-hub/images/` are copied into `src/assets/gallery/` and imported as Vite assets, matching the existing `hero.jpg`/`coach.jpg` pattern.

**Tech Stack:** React 19, TanStack Start/Router, Tailwind v4, `motion` (Framer Motion successor), `lenis` (smooth scroll), `lucide-react` icons. Package manager is `bun`.

## Global Constraints

- Do not change any oklch color values in `src/styles.css`.
- `SITE.email` must be exactly `ansariajaaz9@gmail.com`.
- `SITE.instagram` must be exactly `https://www.instagram.com/ajaaz.fitmode?igsh=MXR5MDNlMTQ5dGtiNg==`.
- The 3 highlighted reels must link to exactly: `https://www.instagram.com/p/DT7zQ86jWys/`, `https://www.instagram.com/ajaaz.fitmode/reel/DUI1LnEjdSQ/`, `https://www.instagram.com/ajaaz.fitmode/reel/DUYRhfGCMa-/`.
- Reels render as custom cards (image + play icon, click-through) — no Instagram embed widgets/scripts.
- This repo has no test runner configured (no `test` script, no vitest/jest). Do not add one — that's out of scope. Verification for every task is: `bun run lint`, `bun run build`, and a manual check via `bun run dev` in the browser. Each task below spells out exactly what to look at.
- All new outbound links use `target="_blank" rel="noreferrer"`.
- Follow existing code conventions: Tailwind utility classes inline, `@/` path alias, named exports for components, `SITE`/`SERVICES`/`PACKAGES`/`FAQS` pattern in `src/data/site.ts`.
- Never force-push or rewrite history on this branch (per `AGENTS.md` — the repo is synced with Lovable).

---

## File Structure

**New files:**
- `src/assets/gallery/gallery-01.jpg` … `gallery-06.jpg` — 6 gym photos for the homepage gallery strip
- `src/assets/gallery/method.jpg` — the pre-built "Science Behind My Transformation" infographic
- `src/assets/gallery/reel-1.jpg`, `reel-2.jpg`, `reel-3.jpg` — thumbnails for the 3 highlighted reels
- `src/components/site/Reveal.tsx` — scroll-into-view fade/slide-up wrapper
- `src/components/site/AnimatedCounter.tsx` — rolling number-on-scroll component
- `src/components/site/SmoothScroll.tsx` — Lenis inertia-scroll provider (renders nothing, side-effect only)
- `src/components/site/ReelCard.tsx` — one Instagram reel highlight card
- `src/components/site/InstagramFollowButton.tsx` — reusable "Follow on Instagram" button

**Modified files:**
- `package.json` — add `motion`, `lenis` dependencies
- `src/data/site.ts` — new email, `instagram` field, `REELS` array + `Reel` type
- `src/routes/__root.tsx` — mount `<SmoothScroll />`
- `src/components/site/Header.tsx` — Instagram icon link
- `src/components/site/Footer.tsx` — Instagram row + follow button
- `src/routes/index.tsx` — full homepage redesign (hero parallax, animated stats, gallery strip, method showcase, reels section, follow CTA)
- `src/routes/services.tsx`, `src/routes/packages.tsx`, `src/routes/faq.tsx`, `src/routes/contact.tsx` — wrap existing sections in `<Reveal>`

---

### Task 1: Add animation dependencies

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: `motion` package importable as `motion/react` (exports `motion`, `useInView`, `useMotionValue`, `useSpring`, `useScroll`, `useTransform`); `lenis` package importable as `import Lenis from "lenis"`.

- [ ] **Step 1: Install packages**

Run:
```bash
cd "/mnt/c/Users/Bot/Desktop/fitness/ajaaz-fit-hub"
bun add motion lenis
```

- [ ] **Step 2: Verify install**

Run: `bun pm ls | grep -E "motion|lenis"`
Expected: both packages listed with resolved versions, and `package.json`/`bun.lock` now show them under `dependencies`.

- [ ] **Step 3: Commit**

```bash
git add package.json bun.lock
git commit -m "Add motion and lenis for scroll animations"
```

---

### Task 2: Copy portfolio images into src/assets/gallery

**Files:**
- Create: `src/assets/gallery/gallery-01.jpg` through `gallery-06.jpg`, `method.jpg`, `reel-1.jpg`, `reel-2.jpg`, `reel-3.jpg`

**Interfaces:**
- Produces: static image files that later tasks `import` directly (Vite turns each into a hashed URL string at build time — same pattern already used by `src/assets/hero.jpg`).

- [ ] **Step 1: Create the directory and copy files with descriptive names**

Run:
```bash
cd "/mnt/c/Users/Bot/Desktop/fitness/ajaaz-fit-hub"
mkdir -p src/assets/gallery
cp images/PHOTO-2026-08-08-11-37-22_2.jpg  src/assets/gallery/gallery-01.jpg
cp images/PHOTO-2026-08-08-11-37-22_9.jpg  src/assets/gallery/gallery-02.jpg
cp images/PHOTO-2026-08-08-11-37-22_10.jpg src/assets/gallery/gallery-03.jpg
cp images/PHOTO-2026-08-08-11-37-22_7.jpg  src/assets/gallery/gallery-04.jpg
cp images/PHOTO-2026-08-08-11-37-22_1.jpg  src/assets/gallery/gallery-05.jpg
cp images/PHOTO-2026-08-08-11-37-22_3.jpg  src/assets/gallery/gallery-06.jpg
cp images/PHOTO-2026-08-08-11-37-22_5.jpg  src/assets/gallery/method.jpg
cp images/PHOTO-2026-08-08-11-37-22_4.jpg  src/assets/gallery/reel-1.jpg
cp images/PHOTO-2026-08-08-11-37-22_6.jpg  src/assets/gallery/reel-2.jpg
cp images/PHOTO-2026-08-08-11-37-22_8.jpg  src/assets/gallery/reel-3.jpg
```

- [ ] **Step 2: Verify all 10 files copied**

Run: `ls src/assets/gallery/ | sort`
Expected: exactly `gallery-01.jpg gallery-02.jpg gallery-03.jpg gallery-04.jpg gallery-05.jpg gallery-06.jpg method.jpg reel-1.jpg reel-2.jpg reel-3.jpg`

- [ ] **Step 3: Commit**

```bash
git add src/assets/gallery
git commit -m "Add portfolio gallery images"
```

---

### Task 3: Update site data — email, Instagram, reels

**Files:**
- Modify: `src/data/site.ts`

**Interfaces:**
- Consumes: `src/assets/gallery/reel-1.jpg`, `reel-2.jpg`, `reel-3.jpg` (from Task 2)
- Produces: `SITE.email` (string), `SITE.instagram` (string), `REELS` (array of `Reel`), `type Reel = { url: string; caption: string; image: string; likes: number }` — consumed by `ReelCard` (Task 7) and `index.tsx` (Task 10).

- [ ] **Step 1: Edit `SITE`**

In `src/data/site.ts`, replace:
```ts
  // TODO: replace with Ajaaz's real contact details
  email: "coach@ajaazfitmode.com",
  whatsapp: "+910000000000",
```
with:
```ts
  email: "ansariajaaz9@gmail.com",
  instagram: "https://www.instagram.com/ajaaz.fitmode?igsh=MXR5MDNlMTQ5dGtiNg==",
  whatsapp: "+910000000000",
```

- [ ] **Step 2: Add reel imports and `REELS` export**

At the top of `src/data/site.ts`, add:
```ts
import reel1 from "@/assets/gallery/reel-1.jpg";
import reel2 from "@/assets/gallery/reel-2.jpg";
import reel3 from "@/assets/gallery/reel-3.jpg";
```

At the bottom of the file, add:
```ts
export type Reel = {
  url: string;
  caption: string;
  image: string;
  likes: number;
};

export const REELS: Reel[] = [
  {
    url: "https://www.instagram.com/p/DT7zQ86jWys/",
    caption: "Full-body finisher that leaves nothing left in the tank",
    image: reel1,
    likes: 482,
  },
  {
    url: "https://www.instagram.com/ajaaz.fitmode/reel/DUI1LnEjdSQ/",
    caption: "The cue that fixes shoulder pain on pressing movements",
    image: reel2,
    likes: 361,
  },
  {
    url: "https://www.instagram.com/ajaaz.fitmode/reel/DUYRhfGCMa-/",
    caption: "A real client transformation, explained in 30 seconds",
    image: reel3,
    likes: 597,
  },
];
```

- [ ] **Step 3: Verify**

Run: `bun run lint`
Expected: no errors in `src/data/site.ts`.

Run: `grep -n "ansariajaaz9@gmail.com\|instagram.com/ajaaz.fitmode" src/data/site.ts`
Expected: both strings present.

- [ ] **Step 4: Commit**

```bash
git add src/data/site.ts
git commit -m "Update contact email, add Instagram link and reel highlights to site data"
```

---

### Task 4: Build the Reveal scroll-in component

**Files:**
- Create: `src/components/site/Reveal.tsx`

**Interfaces:**
- Consumes: `motion` from `motion/react` (Task 1)
- Produces: `Reveal` component — `<Reveal delay?: number, y?: number, className?: string>{children}</Reveal>`. Used by every later homepage/page task.

- [ ] **Step 1: Create the component**

```tsx
import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify with a temporary smoke test**

Temporarily wrap the hero heading in `src/routes/index.tsx` with `<Reveal>` (import it), run `bun run dev`, load `/`, and confirm the heading fades/slides up on initial load without console errors. Then revert this temporary edit — the real integration happens in Task 9.

Run: `git diff src/routes/index.tsx`
Expected: no output (temporary edit reverted).

- [ ] **Step 3: Commit**

```bash
git add src/components/site/Reveal.tsx
git commit -m "Add Reveal scroll-into-view animation component"
```

---

### Task 5: Build the AnimatedCounter component

**Files:**
- Create: `src/components/site/AnimatedCounter.tsx`

**Interfaces:**
- Consumes: `useInView`, `useMotionValue`, `useSpring` from `motion/react` (Task 1)
- Produces: `AnimatedCounter` component — `<AnimatedCounter value: number, prefix?: string, suffix?: string, className?: string />`. Renders a `<span>` that rolls from 0 to `value` once it scrolls into view. Used by Task 9 (stats) and Task 7 (`ReelCard` like-counts).

- [ ] **Step 1: Create the component**

```tsx
import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 2: Verify with a temporary smoke test**

Temporarily render `<AnimatedCounter value={150} suffix="+" />` inside `src/routes/index.tsx`, run `bun run dev`, load `/`, scroll it into view, and confirm the number rolls from 0 up to 150 once. Then revert the temporary edit.

Run: `git diff src/routes/index.tsx`
Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/AnimatedCounter.tsx
git commit -m "Add AnimatedCounter rolling-number component"
```

---

### Task 6: Build SmoothScroll (Lenis) provider and mount it

**Files:**
- Create: `src/components/site/SmoothScroll.tsx`
- Modify: `src/routes/__root.tsx`

**Interfaces:**
- Consumes: `Lenis` default export from `lenis` (Task 1)
- Produces: `SmoothScroll` component (renders `null`, side-effect only) — mounted once at the app root.

- [ ] **Step 1: Create the component**

```tsx
import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return null;
}
```

- [ ] **Step 2: Mount it in the root route**

In `src/routes/__root.tsx`, add the import:
```ts
import { SmoothScroll } from "@/components/site/SmoothScroll";
```
and render it as the first child inside `RootComponent`'s `<QueryClientProvider>`:
```tsx
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
```

- [ ] **Step 3: Verify**

Run: `bun run dev`, open `/`, scroll with a mouse wheel or trackpad.
Expected: scrolling feels smoothed/inertial (continues briefly after input stops) instead of the browser's native instant scroll, and there are no console errors.

Run: `bun run build`
Expected: build succeeds with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/SmoothScroll.tsx src/routes/__root.tsx
git commit -m "Add Lenis smooth scroll site-wide"
```

---

### Task 7: Build ReelCard and InstagramFollowButton

**Files:**
- Create: `src/components/site/ReelCard.tsx`
- Create: `src/components/site/InstagramFollowButton.tsx`

**Interfaces:**
- Consumes: `Reel` type from `@/data/site` (Task 3), `Reveal` (Task 4), `AnimatedCounter` (Task 5), `SITE.instagram` (Task 3)
- Produces: `ReelCard` — `<ReelCard reel: Reel, delay?: number />`; `InstagramFollowButton` — `<InstagramFollowButton className?: string />`. Both consumed by `index.tsx` (Task 10) and `Footer.tsx` (Task 8).

- [ ] **Step 1: Create `ReelCard.tsx`**

```tsx
import { Play } from "lucide-react";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { Reveal } from "@/components/site/Reveal";
import type { Reel } from "@/data/site";

export function ReelCard({ reel, delay = 0 }: { reel: Reel; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <a
        href={reel.url}
        target="_blank"
        rel="noreferrer"
        className="group relative block overflow-hidden rounded-md border border-border bg-card"
      >
        <img
          src={reel.image}
          alt={reel.caption}
          loading="lazy"
          className="aspect-[9/16] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-accent/90 text-accent-foreground transition-transform group-hover:scale-110">
            <Play className="size-6 translate-x-0.5 fill-current" />
          </span>
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-sm font-semibold text-foreground">{reel.caption}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-accent">
            <AnimatedCounter value={reel.likes} suffix=" likes" />
          </p>
        </div>
      </a>
    </Reveal>
  );
}
```

- [ ] **Step 2: Create `InstagramFollowButton.tsx`**

```tsx
import { Instagram } from "lucide-react";
import { SITE } from "@/data/site";

export function InstagramFollowButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={SITE.instagram}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-105 ${className}`}
    >
      <Instagram className="size-4" /> Follow @ajaaz.fitmode
    </a>
  );
}
```

- [ ] **Step 3: Verify**

Run: `bun run lint`
Expected: no errors in either new file.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/ReelCard.tsx src/components/site/InstagramFollowButton.tsx
git commit -m "Add ReelCard and InstagramFollowButton components"
```

---

### Task 8: Update Header and Footer with Instagram

**Files:**
- Modify: `src/components/site/Header.tsx`
- Modify: `src/components/site/Footer.tsx`

**Interfaces:**
- Consumes: `SITE.instagram` (Task 3), `InstagramFollowButton` (Task 7)

- [ ] **Step 1: Add Instagram icon link to `Header.tsx`**

Change the lucide import line:
```ts
import { Menu, X, Flame, Instagram } from "lucide-react";
```

In the desktop `<nav>`, add an icon link before the existing YouTube button:
```tsx
<a
  href={SITE.instagram}
  target="_blank"
  rel="noreferrer"
  aria-label="Ajaaz Fitmode on Instagram"
  className="text-muted-foreground transition-colors hover:text-accent"
>
  <Instagram className="size-5" />
</a>
```

- [ ] **Step 2: Add Instagram row and follow button to `Footer.tsx`**

Add the import:
```ts
import { Instagram } from "lucide-react";
import { InstagramFollowButton } from "@/components/site/InstagramFollowButton";
```

In the "Reach Ajaaz" column, add a row above the email link:
```tsx
<a href={SITE.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground">
  <Instagram className="size-4" /> @ajaaz.fitmode
</a>
```

Below the existing `<p>` about no online payments, add:
```tsx
<InstagramFollowButton className="mt-5" />
```

- [ ] **Step 3: Verify**

Run: `bun run dev`, open any page.
Expected: Instagram icon visible in the header next to YouTube and opens the profile URL in a new tab; footer shows the `@ajaaz.fitmode` row, the updated email `ansariajaaz9@gmail.com`, and a "Follow @ajaaz.fitmode" button that opens the same profile URL.

Run: `bun run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/Header.tsx src/components/site/Footer.tsx
git commit -m "Add Instagram link and follow button to header and footer"
```

---

### Task 9: Redesign homepage hero and stats

**Files:**
- Modify: `src/routes/index.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 4), `AnimatedCounter` (Task 5), `motion`/`useScroll`/`useTransform` from `motion/react` (Task 1)

- [ ] **Step 1: Add imports and a typed STATS array supporting mixed numeric/text values**

Add to the top of `src/routes/index.tsx`:
```ts
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
```

Replace the existing `STATS` array with:
```ts
const STATS: {
  label: string;
  value: number | null;
  suffix?: string;
  display?: string;
}[] = [
  { value: 150, suffix: "+", label: "Clients coached" },
  { value: 100, suffix: "%", label: "Custom plans" },
  { value: 7, suffix: " Days", label: "Weekly support" },
  { value: null, display: "Certified", label: "Nutrition & training" },
];
```

- [ ] **Step 2: Give the hero a scroll-parallax image and staggered headline**

Replace the `Hero` section's opening (`<section className="relative overflow-hidden">` through the closing `</section>` of the hero block) with:
```tsx
<HeroSection />
```

Add a new `HeroSection` function above `Index` (or below it — either is fine as long as it's defined in the same file):
```tsx
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.img
        src={heroImg}
        alt="Athlete performing a heavy deadlift in a dark gym"
        width={1600}
        height={1200}
        style={{ y }}
        className="absolute inset-0 size-full object-cover object-center opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
      <div className="section-shell relative flex min-h-[88vh] flex-col justify-center py-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-bold uppercase tracking-[0.4em] text-accent"
        >
          {SITE.tagline}
        </motion.p>
        <h1 className="mt-5 max-w-3xl text-6xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="block"
          >
            Build the body
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="block text-gradient-gold"
          >
            discipline deserves
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-xl text-lg text-muted-foreground"
        >
          Coach Ajaaz has guided {SITE.clientsServed} clients through fat loss, muscle gain and
          sustainable nutrition — with plans built around real schedules and real food.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Link
            to="/packages"
            className="rounded-sm bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-105"
          >
            View packages
          </Link>
          <a
            href={SITE.youtube}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-accent/60 px-8 py-4 text-sm font-bold uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Youtube className="size-4" /> Watch on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Animate the stats band**

Replace the Stats `<section>` block with:
```tsx
<section className="border-y border-border bg-secondary">
  <div className="section-shell grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
    {STATS.map((s, i) => (
      <Reveal key={s.label} delay={i * 0.08}>
        <p className="font-display text-5xl text-accent">
          {s.value !== null ? (
            <AnimatedCounter value={s.value} suffix={s.suffix} />
          ) : (
            s.display
          )}
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {s.label}
        </p>
      </Reveal>
    ))}
  </div>
</section>
```

- [ ] **Step 4: Verify**

Run: `bun run dev`, open `/`.
Expected: hero headline lines fade/slide in on load, hero image drifts slightly as you scroll past it, and the 4 stat numbers roll up from 0 the first time the stats band scrolls into view (150+, 100%, 7 Days, and "Certified" as static text).

Run: `bun run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/routes/index.tsx
git commit -m "Add parallax hero and animated stat counters to homepage"
```

---

### Task 10: Add gallery strip, Method showcase, and Reels section to homepage

**Files:**
- Modify: `src/routes/index.tsx`

**Interfaces:**
- Consumes: gallery/method images (Task 2), `Reveal` (Task 4), `ReelCard` (Task 7), `InstagramFollowButton` (Task 7), `REELS` from `@/data/site` (Task 3)

- [ ] **Step 1: Import the gallery images and REELS**

Add to the top of `src/routes/index.tsx`:
```ts
import gallery1 from "@/assets/gallery/gallery-01.jpg";
import gallery2 from "@/assets/gallery/gallery-02.jpg";
import gallery3 from "@/assets/gallery/gallery-03.jpg";
import gallery4 from "@/assets/gallery/gallery-04.jpg";
import gallery5 from "@/assets/gallery/gallery-05.jpg";
import gallery6 from "@/assets/gallery/gallery-06.jpg";
import methodImg from "@/assets/gallery/method.jpg";
import { ReelCard } from "@/components/site/ReelCard";
import { InstagramFollowButton } from "@/components/site/InstagramFollowButton";
import { SITE, SERVICES, PACKAGES, FAQS, REELS } from "@/data/site";
```
(This replaces the existing `import { SITE, SERVICES, PACKAGES, FAQS } from "@/data/site";` line — add `REELS` to it rather than duplicating the import.)

Add a `GALLERY` array below `STATS`:
```ts
const GALLERY = [
  { image: gallery1, caption: "Progressive overload, tracked every session" },
  { image: gallery2, caption: "Real client sessions, not stock photography" },
  { image: gallery3, caption: "Form checked on every heavy set" },
  { image: gallery4, caption: "Strength built the disciplined way" },
  { image: gallery5, caption: "Conditioning work between lifts" },
  { image: gallery6, caption: "Consistency you can see, week over week" },
];
```

- [ ] **Step 2: Add the gallery strip section**

Insert this new `<section>` immediately after the "Coach" section and before the "Services preview" section:
```tsx
{/* Gallery */}
<section className="section-shell py-24">
  <SectionHeading
    eyebrow="In the gym"
    title={<>Coaching you can <span className="text-gradient-gold">see</span></>}
    subtitle="Every photo below is Ajaaz coaching real sessions — not stock imagery."
  />
  <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {GALLERY.map((g, i) => (
      <Reveal key={g.caption} delay={(i % 3) * 0.1} className="group relative overflow-hidden rounded-md border border-border">
        <img
          src={g.image}
          alt={g.caption}
          loading="lazy"
          className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
        <p className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-foreground">
          {g.caption}
        </p>
      </Reveal>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Add "The Method" showcase section**

Insert this new `<section>` immediately after the gallery section:
```tsx
{/* The Method */}
<section className="border-t border-border bg-card/40 py-24">
  <div className="section-shell">
    <SectionHeading
      eyebrow="The method"
      title={<>Not luck — a <span className="text-gradient-gold">system</span></>}
      subtitle="Training, nutrition, recovery and lifestyle, working together. This is the exact framework behind every client plan."
    />
    <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-md border border-border">
      <img
        src={methodImg}
        alt="Infographic: the science behind Coach Ajaaz's transformation method — training, nutrition, recovery and lifestyle"
        loading="lazy"
        className="w-full object-cover"
      />
    </Reveal>
    <Link
      to="/packages"
      className="mt-10 inline-block text-sm font-bold uppercase tracking-widest text-accent underline-offset-8 hover:underline"
    >
      Get this system for yourself →
    </Link>
  </div>
</section>
```

- [ ] **Step 4: Add the Reels section**

Insert this new `<section>` immediately before the final "FAQ preview + CTA" section:
```tsx
{/* Reels */}
<section className="section-shell py-24">
  <SectionHeading
    eyebrow="Watch"
    title={<>Reels worth your <span className="text-gradient-gold">30 seconds</span></>}
    subtitle="A few clips clients keep coming back to."
  />
  <div className="mt-12 grid gap-6 sm:grid-cols-3">
    {REELS.map((reel, i) => (
      <ReelCard key={reel.url} reel={reel} delay={i * 0.1} />
    ))}
  </div>
  <div className="mt-10 flex justify-center">
    <InstagramFollowButton />
  </div>
</section>
```

- [ ] **Step 5: Verify**

Run: `bun run dev`, open `/`, scroll through the whole page.
Expected: gallery photos stagger-reveal in a 2/3-column grid with captions; the infographic image reveals full-width in its own section; the 3 reel cards show thumbnail + play icon + caption + a like count that rolls up on scroll, and clicking a card opens the correct Instagram reel URL in a new tab; the Follow button opens the Instagram profile URL in a new tab.

Run: `bun run build`
Expected: succeeds with no TypeScript errors, no missing-import errors.

- [ ] **Step 6: Commit**

```bash
git add src/routes/index.tsx
git commit -m "Add gallery strip, method showcase, and Instagram reels section to homepage"
```

---

### Task 11: Apply Reveal to secondary pages

**Files:**
- Modify: `src/routes/services.tsx`
- Modify: `src/routes/packages.tsx`
- Modify: `src/routes/faq.tsx`
- Modify: `src/routes/contact.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 4)

- [ ] **Step 1: `services.tsx`** — import `Reveal`, wrap each service `<article>` in `<Reveal delay={i * 0.06}>`:
```tsx
import { Reveal } from "@/components/site/Reveal";
```
```tsx
{SERVICES.map((service, i) => {
  const Icon = ICONS[i % ICONS.length]!;
  return (
    <Reveal key={service.title} delay={i * 0.06}>
      <article className="group relative overflow-hidden rounded-md border border-border bg-card p-7 transition-colors hover:border-accent">
        <span className="absolute -right-6 -top-6 size-24 rounded-full bg-primary/25 blur-2xl transition-opacity group-hover:opacity-100" />
        <Icon className="size-8 text-accent" />
        <h3 className="mt-5 text-2xl uppercase">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
      </article>
    </Reveal>
  );
})}
```

- [ ] **Step 2: `packages.tsx`** — import `Reveal`, wrap each package `<article>` the same way:
```tsx
import { Reveal } from "@/components/site/Reveal";
```
```tsx
{PACKAGES.map((pkg, i) => (
  <Reveal key={pkg.name} delay={i * 0.08}>
    <article
      className={
        pkg.featured
          ? "relative rounded-md border-2 border-accent bg-secondary p-8 lg:-mt-4 lg:mb-4"
          : "relative rounded-md border border-border bg-card p-8"
      }
    >
      {/* existing children unchanged */}
    </article>
  </Reveal>
))}
```
(Keep the existing JSX inside `<article>` — only add the `Reveal` wrapper and the import.)

- [ ] **Step 3: `faq.tsx`** — import `Reveal`, wrap the `<Accordion>` block:
```tsx
import { Reveal } from "@/components/site/Reveal";
```
```tsx
<Reveal>
  <Accordion type="single" collapsible className="mt-12 max-w-3xl">
    {/* existing AccordionItem map unchanged */}
  </Accordion>
</Reveal>
```

- [ ] **Step 4: `contact.tsx`** — import `Reveal`, wrap the form and the aside separately so they can reveal with a slight offset:
```tsx
import { Reveal } from "@/components/site/Reveal";
```
```tsx
<div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
  <Reveal>
    <form onSubmit={handleSubmit} className="rounded-md border border-border bg-card p-8">
      {/* existing form contents unchanged */}
    </form>
  </Reveal>
  <Reveal delay={0.1}>
    <aside className="space-y-4">
      {/* existing aside contents unchanged */}
    </aside>
  </Reveal>
</div>
```

- [ ] **Step 5: Verify**

Run: `bun run dev`, visit `/services`, `/packages`, `/faq`, `/contact` and scroll each.
Expected: cards/sections fade+slide in as they enter the viewport; no layout shift or overlap; form on `/contact` still submits to WhatsApp correctly.

Run: `bun run lint && bun run build`
Expected: both succeed with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/routes/services.tsx src/routes/packages.tsx src/routes/faq.tsx src/routes/contact.tsx
git commit -m "Apply scroll-reveal animation to secondary pages"
```

---

### Task 12: Full-site verification pass

**Files:** none (verification only)

- [ ] **Step 1: Lint and build**

Run:
```bash
cd "/mnt/c/Users/Bot/Desktop/fitness/ajaaz-fit-hub"
bun run lint
bun run build
```
Expected: both commands exit 0 with no errors or warnings introduced by this work.

- [ ] **Step 2: Manual link check**

Run: `bun run dev`, then in the browser:
- Header Instagram icon → opens `https://www.instagram.com/ajaaz.fitmode?igsh=MXR5MDNlMTQ5dGtiNg==`
- Footer Instagram row and Follow button → same URL
- Each of the 3 reel cards on `/` → opens its exact reel URL (`.../p/DT7zQ86jWys/`, `.../reel/DUI1LnEjdSQ/`, `.../reel/DUYRhfGCMa-/`)
- Footer email link → `mailto:ansariajaaz9@gmail.com`
- YouTube and WhatsApp links still work as before

- [ ] **Step 3: Mobile viewport check**

Resize the browser (or use device toolbar) to a ~375px-wide viewport and re-check `/`: hero, gallery grid (should collapse to fewer columns), reel cards, and the mobile nav menu (including the new Instagram icon if added there) all render without horizontal overflow.

- [ ] **Step 4: Final commit (if any cleanup was needed)**

If Steps 1–3 required fixes, stage and commit them with a message describing the fix. If no fixes were needed, this task requires no commit — just confirm the working tree is clean:
```bash
git status
```
Expected: `nothing to commit, working tree clean`.

---

## Self-Review Notes

- **Spec coverage:** email/Instagram/reels data (Task 3), custom reel cards not embeds (Task 7/10), follow button (Task 7/8/10), rolling numbers for stats and reel likes (Task 5, used in Task 9/10), gallery using `images/` photos with justifying captions (Task 10), method infographic showcase (Task 10), Lenis smooth scroll (Task 6), header/footer updates (Task 8), secondary-page reveal consistency (Task 11) — all covered.
- **No placeholders:** every step has literal code or exact commands; no "TBD"/"similar to above" left in.
- **Type consistency:** `Reel` type defined once in `site.ts` (Task 3) and reused verbatim by `ReelCard` (Task 7) and `index.tsx` (Task 10); `AnimatedCounter`'s `value`/`suffix`/`prefix` props match every call site; `Reveal`'s `delay`/`y`/`className` props match every call site.
