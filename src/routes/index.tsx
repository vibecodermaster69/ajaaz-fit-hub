import { createFileRoute, Link } from "@tanstack/react-router";
import { Youtube, Check, Dumbbell, Salad, Flame } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import coachImg from "@/assets/coach.jpg";
import { SectionHeading } from "@/components/site/Section";
import { SITE, SERVICES, PACKAGES, FAQS } from "@/data/site";

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

const STATS = [
  { value: SITE.clientsServed, label: "Clients coached" },
  { value: "100%", label: "Custom plans" },
  { value: "7 Days", label: "Weekly support" },
  { value: "Certified", label: "Nutrition & training" },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt="Athlete performing a heavy deadlift in a dark gym"
          width={1600}
          height={1200}
          className="absolute inset-0 size-full object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="section-shell relative flex min-h-[88vh] flex-col justify-center py-24">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent">
            {SITE.tagline}
          </p>
          <h1 className="mt-5 max-w-3xl text-6xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
            Build the body <br />
            <span className="text-gradient-gold">discipline</span> deserves
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Coach Ajaaz has guided {SITE.clientsServed} clients through fat loss, muscle gain and
            sustainable nutrition — with plans built around real schedules and real food.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
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
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary">
        <div className="section-shell grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-5xl text-accent">{s.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Coach */}
      <section className="section-shell grid gap-12 py-24 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="absolute -inset-3 rounded-md bg-primary/25 blur-2xl" />
          <img
            src={coachImg}
            alt="Coach Ajaaz, certified nutritionist and fitness trainer"
            width={1024}
            height={1280}
            loading="lazy"
            className="relative rounded-md border border-border object-cover"
          />
        </div>
        <div>
          <SectionHeading
            eyebrow="Meet your coach"
            title={<>Coached by <span className="text-gradient-gold">Ajaaz</span></>}
            subtitle="A certified nutritionist and fitness coach who has worked with over 150 clients across body recomposition, strength and everyday health goals."
          />
          <ul className="mt-7 space-y-3">
            {[
              "Certified in nutrition and fitness training",
              "150+ clients coached online and offline",
              "Plans built around Indian home food and real schedules",
              "Free workout and nutrition content on YouTube",
            ].map((point) => (
              <li key={point} className="flex gap-3 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services preview */}
      <section className="border-t border-border bg-card/40 py-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Services"
            title={<>Training, nutrition, <span className="text-gradient-gold">accountability</span></>}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICES.slice(0, 3).map((s, i) => {
              const Icon = [Dumbbell, Salad, Flame][i]!;
              return (
                <article
                  key={s.title}
                  className="rounded-md border border-border bg-card p-7 transition-colors hover:border-accent"
                >
                  <Icon className="size-8 text-accent" />
                  <h3 className="mt-5 text-2xl uppercase">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
                </article>
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
          title={<>Pick your <span className="text-gradient-gold">duration</span></>}
          subtitle="No online payments — enquire and Ajaaz shares pricing personally."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PACKAGES.map((p) => (
            <div
              key={p.name}
              className={
                p.featured
                  ? "rounded-md border-2 border-accent bg-secondary p-7"
                  : "rounded-md border border-border bg-card p-7"
              }
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{p.duration}</p>
              <h3 className="mt-2 text-3xl uppercase">{p.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.features.slice(0, 3).join(" · ")}</p>
            </div>
          ))}
        </div>
        <Link
          to="/packages"
          className="mt-10 inline-block text-sm font-bold uppercase tracking-widest text-accent underline-offset-8 hover:underline"
        >
          Compare packages →
        </Link>
      </section>

      {/* FAQ preview + CTA */}
      <section className="border-t border-border bg-card/40 py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-2">
          <div>
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
          </div>

          <div className="flex flex-col justify-center rounded-md border border-accent/40 bg-secondary p-10">
            <h2 className="text-4xl uppercase leading-none">
              Ready to <span className="text-gradient-gold">start</span>?
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Send Ajaaz your goal and current routine. He'll reply with the right package,
              pricing and a starting plan.
            </p>
            <Link
              to="/contact"
              className="mt-7 self-start rounded-sm bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-105"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
