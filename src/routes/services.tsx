import { createFileRoute, Link } from "@tanstack/react-router";
import { Dumbbell, Salad, Flame, TrendingUp, Video, Moon } from "lucide-react";
import { SectionHeading } from "@/components/site/Section";
import { SERVICES } from "@/data/site";

const ICONS = [Dumbbell, Salad, Flame, TrendingUp, Video, Moon];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Fitness & Nutrition Services | Ajaaz Fitmode" },
      {
        name: "description",
        content:
          "Personalised training, nutrition coaching, fat loss and muscle gain programs from certified coach Ajaaz.",
      },
      { property: "og:title", content: "Fitness & Nutrition Services | Ajaaz Fitmode" },
      {
        property: "og:description",
        content: "Coaching services built around your body, schedule and goals.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="section-shell py-20">
      <SectionHeading
        eyebrow="What you get"
        title={<>Coaching that <span className="text-gradient-gold">works in real life</span></>}
        subtitle="Every service below is delivered personally by Ajaaz — no bots, no copy-paste PDFs."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <article
              key={service.title}
              className="group relative overflow-hidden rounded-md border border-border bg-card p-7 transition-colors hover:border-accent"
            >
              <span className="absolute -right-6 -top-6 size-24 rounded-full bg-primary/25 blur-2xl transition-opacity group-hover:opacity-100" />
              <Icon className="size-8 text-accent" />
              <h3 className="mt-5 text-2xl uppercase">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-16 rounded-md border border-accent/40 bg-secondary p-8 text-center">
        <h3 className="text-3xl uppercase">Not sure which service fits?</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Tell Ajaaz your goal, your schedule and your setup. He'll tell you exactly where to start.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex rounded-sm bg-accent px-7 py-3 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-105"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}