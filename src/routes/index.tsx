import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { Instagram, Check, Dumbbell, Salad, Flame } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import coachImg from "@/assets/coach.jpg";
import gallery1 from "@/assets/gallery/gallery-01.jpg";
import gallery2 from "@/assets/gallery/gallery-02.jpg";
import gallery3 from "@/assets/gallery/gallery-03.jpg";
import gallery4 from "@/assets/gallery/gallery-04.jpg";
import gallery5 from "@/assets/gallery/gallery-05.jpg";
import gallery6 from "@/assets/gallery/gallery-06.jpg";
import methodImg from "@/assets/gallery/method.jpg";
import { SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { ReelCard } from "@/components/site/ReelCard";
import { PhotoFan } from "@/components/site/PhotoFan";
import { InstagramFollowButton } from "@/components/site/InstagramFollowButton";
import { SITE, SERVICES, PACKAGES, FAQS, REELS } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ajaaz Fitmode — Fitness & Nutrition Coaching by Coach Ajaaz" },
      {
        name: "description",
        content:
          "Train with certified nutritionist and fitness coach Ajaaz. 150+ clients coached with personalised workout and diet plans.",
      },
      { property: "og:title", content: "Ajaaz Fitmode — Fitness & Nutrition Coaching" },
      {
        property: "og:description",
        content: "Personalised training and nutrition plans. 150+ clients transformed.",
      },
    ],
  }),
  component: Index,
});

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

const GALLERY = [
  { image: gallery1, caption: "Progressive overload, tracked every session" },
  { image: gallery2, caption: "Real client sessions, not stock photography" },
  { image: gallery3, caption: "Form checked on every heavy set" },
  { image: gallery4, caption: "Strength built the disciplined way" },
  { image: gallery5, caption: "Conditioning work between lifts" },
  { image: gallery6, caption: "Consistency you can see, week over week" },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Stats */}
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

      {/* Coach */}
      <section className="section-shell grid gap-12 py-24 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative">
          <div className="absolute -inset-3 rounded-md bg-primary/25 blur-2xl" />
          <img
            src={coachImg}
            alt="Coach Ajaaz, certified nutritionist and fitness trainer, in the gym"
            width={738}
            height={1314}
            loading="lazy"
            className="relative aspect-[4/5] w-full rounded-md border border-border object-cover"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading
            eyebrow="Meet your coach"
            title={
              <>
                Ajaaz as a <span className="text-gradient-gold">Coach</span>
              </>
            }
            subtitle="A certified nutritionist and fitness coach who has worked with over 150 clients across body recomposition, strength and everyday health goals."
          />
          <ul className="mt-7 space-y-3">
            {[
              "Certified in nutrition and fitness training",
              "150+ clients coached online and offline",
              "Plans built around Indian home food and real schedules",
              "Free workout and nutrition content on Instagram",
            ].map((point) => (
              <li key={point} className="flex gap-3 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="section-shell py-24">
        <SectionHeading
          eyebrow="In the gym"
          title={
            <>
              Coaching you can <span className="text-gradient-gold">see</span>
            </>
          }
          subtitle="Every photo below is Ajaaz coaching real sessions — not stock imagery."
        />
        <PhotoFan photos={GALLERY} />
      </section>

      {/* The Method */}
      <section className="border-t border-border bg-card/40 py-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow="The method"
            title={
              <>
                Not luck — a <span className="text-gradient-gold">system</span>
              </>
            }
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

      {/* Services preview */}
      <section className="border-t border-border bg-card/40 py-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                Training, nutrition, <span className="text-gradient-gold">accountability</span>
              </>
            }
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICES.slice(0, 3).map((s, i) => {
              const Icon = [Dumbbell, Salad, Flame][i]!;
              return (
                <Reveal key={s.title} delay={i * 0.08} className="h-full">
                  <article className="h-full rounded-md border border-border bg-card p-7 transition-colors hover:border-accent">
                    <Icon className="size-8 text-accent" />
                    <h3 className="mt-5 text-2xl uppercase">{s.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <Link
            to="/services"
            className="mt-10 inline-block text-sm font-bold uppercase tracking-widest text-accent underline-offset-8 hover:underline"
          >
            See all services →
          </Link>
        </div>
      </section>

      {/* Packages preview */}
      <section className="section-shell py-24">
        <SectionHeading
          eyebrow="Packages"
          title={
            <>
              Pick your <span className="text-gradient-gold">duration</span>
            </>
          }
          subtitle="No online payments — enquire and Ajaaz shares pricing personally."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="h-full">
              <div
                className={
                  p.featured
                    ? "h-full rounded-md border-2 border-accent bg-secondary p-7"
                    : "h-full rounded-md border border-border bg-card p-7"
                }
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  {p.duration}
                </p>
                <h3 className="mt-2 break-words text-3xl uppercase">{p.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {p.features.slice(0, 3).join(" · ")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Link
          to="/packages"
          className="mt-10 inline-block text-sm font-bold uppercase tracking-widest text-accent underline-offset-8 hover:underline"
        >
          Compare packages →
        </Link>
      </section>

      {/* Reels */}
      <section className="section-shell py-24">
        <SectionHeading
          eyebrow="Watch"
          title={
            <>
              Reels worth your <span className="text-gradient-gold">30 seconds</span>
            </>
          }
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

      {/* FAQ preview + CTA */}
      <section className="border-t border-border bg-card/40 py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Quick answers" />
            <div className="mt-8 space-y-6">
              {FAQS.slice(0, 3).map((f) => (
                <div key={f.q}>
                  <p className="font-semibold">{f.q}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
            <Link
              to="/faq"
              className="mt-8 inline-block text-sm font-bold uppercase tracking-widest text-accent underline-offset-8 hover:underline"
            >
              Read the full FAQ →
            </Link>
          </Reveal>

          <Reveal
            delay={0.1}
            className="flex flex-col justify-center rounded-md border border-accent/40 bg-secondary p-10"
          >
            <h2 className="text-4xl uppercase leading-none">
              Ready to <span className="text-gradient-gold">start</span>?
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Send Ajaaz your goal and current routine. He'll reply with the right package, pricing
              and a starting plan.
            </p>
            <Link
              to="/contact"
              className="mt-7 self-start rounded-sm bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-105"
            >
              Get in touch
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

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
            Build the strongest
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="block text-gradient-gold"
          >
            version of yourself
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
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-accent/60 px-8 py-4 text-sm font-bold uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Instagram className="size-4" /> Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
