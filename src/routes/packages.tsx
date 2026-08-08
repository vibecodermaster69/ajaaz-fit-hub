import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { PACKAGES } from "@/data/site";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Coaching Packages | Ajaaz Fitmode" },
      {
        name: "description",
        content:
          "1, 3 and 6 month online coaching packages covering training, nutrition and weekly check-ins with Ajaaz.",
      },
      { property: "og:title", content: "Coaching Packages | Ajaaz Fitmode" },
      {
        property: "og:description",
        content: "Pick a coaching duration and message Ajaaz to get started.",
      },
    ],
  }),
  component: PackagesPage,
});

function PackagesPage() {
  return (
    <div className="section-shell py-20">
      <SectionHeading
        align="center"
        eyebrow="Packages"
        title={
          <>
            Commit to a <span className="text-gradient-gold">timeline</span>
          </>
        }
        subtitle="Pricing is shared personally so it can be matched to your goal and duration. There is no online checkout — every plan begins with a conversation."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PACKAGES.map((pkg, i) => (
          <Reveal
            key={pkg.name}
            delay={i * 0.08}
            className={pkg.featured ? "h-full lg:-mt-4 lg:mb-4" : "h-full"}
          >
            <article
              className={
                pkg.featured
                  ? "relative flex h-full flex-col rounded-md border-2 border-accent bg-secondary p-8"
                  : "relative flex h-full flex-col rounded-md border border-border bg-card p-8"
              }
            >
              <span
                className={
                  pkg.featured
                    ? "inline-block rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-foreground"
                    : "inline-block rounded-full bg-primary/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground"
                }
              >
                {pkg.tag}
              </span>
              <h3 className="mt-5 text-2xl xl:text-3xl uppercase">{pkg.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-accent">
                {pkg.duration}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={
                  pkg.featured
                    ? "mt-8 flex justify-center rounded-sm bg-accent px-6 py-3 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-[1.03]"
                    : "mt-8 flex justify-center rounded-sm border border-accent/60 px-6 py-3 text-sm font-bold uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                }
              >
                Enquire now
              </Link>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        All packages include a starting assessment call. Plans can be paused for travel or illness.
      </p>
    </div>
  );
}
