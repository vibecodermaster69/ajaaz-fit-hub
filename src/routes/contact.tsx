import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Youtube, Mail, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { SectionHeading } from "@/components/site/Section";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Get in Touch with Coach Ajaaz | Ajaaz Fitmode" },
      {
        name: "description",
        content:
          "Send your goal to Ajaaz on WhatsApp, email or YouTube and get a personalised fitness and nutrition plan.",
      },
      { property: "og:title", content: "Get in Touch | Ajaaz Fitmode" },
      {
        property: "og:description",
        content: "No online payments — start your coaching with a direct conversation.",
      },
    ],
  }),
  component: ContactPage,
});

const GOALS = ["Fat loss", "Muscle gain", "Nutrition only", "General fitness"];

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    goal: GOALS[0]!,
    message: "",
  });

  const summary = `Hi Ajaaz, I'm ${form.name || "..."}. Goal: ${form.goal}. ${form.message}`.trim();

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim()) {
      toast.error("Add your name and a way to reach you.");
      return;
    }
    window.open(
      `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(summary)}`,
      "_blank",
      "noopener",
    );
    toast.success("Enquiry ready — send it to Ajaaz on WhatsApp.");
  }

  return (
    <div className="section-shell py-20">
      <SectionHeading
        eyebrow="Get in touch"
        title={<>Start your <span className="text-gradient-gold">transformation</span></>}
        subtitle="There are no online payments here. Share your goal and Ajaaz will personally reply with the right package and pricing."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-border bg-card p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-semibold uppercase tracking-widest text-muted-foreground">Name</span>
              <input
                value={form.name}
                onChange={set("name")}
                className="rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
                placeholder="Your name"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-semibold uppercase tracking-widest text-muted-foreground">Phone / Email</span>
              <input
                value={form.contact}
                onChange={set("contact")}
                className="rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
                placeholder="How Ajaaz can reach you"
              />
            </label>
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Primary goal
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {GOALS.map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => setForm((f) => ({ ...f, goal: g }))}
                className={
                  form.goal === g
                    ? "rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-widest text-accent-foreground"
                    : "rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:border-accent hover:text-accent"
                }
              >
                {g}
              </button>
            ))}
          </div>

          <label className="mt-6 flex flex-col gap-2 text-sm">
            <span className="font-semibold uppercase tracking-widest text-muted-foreground">
              Tell Ajaaz about yourself
            </span>
            <textarea
              value={form.message}
              onChange={set("message")}
              rows={5}
              className="rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
              placeholder="Current routine, diet, injuries, schedule..."
            />
          </label>

          <button
            type="submit"
            className="mt-7 inline-flex items-center gap-2 rounded-sm bg-accent px-7 py-3 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-[1.03]"
          >
            <Send className="size-4" /> Send enquiry
          </button>
        </form>

        <aside className="space-y-4">
          <a
            href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-4 rounded-md border border-border bg-card p-6 transition-colors hover:border-accent"
          >
            <MessageCircle className="size-6 text-accent" />
            <span>
              <span className="block font-display text-2xl uppercase">WhatsApp</span>
              <span className="text-sm text-muted-foreground">Fastest reply, usually same day</span>
            </span>
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-start gap-4 rounded-md border border-border bg-card p-6 transition-colors hover:border-accent"
          >
            <Mail className="size-6 text-accent" />
            <span>
              <span className="block font-display text-2xl uppercase">Email</span>
              <span className="text-sm text-muted-foreground">{SITE.email}</span>
            </span>
          </a>
          <a
            href={SITE.youtube}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-4 rounded-md border border-border bg-card p-6 transition-colors hover:border-accent"
          >
            <Youtube className="size-6 text-accent" />
            <span>
              <span className="block font-display text-2xl uppercase">YouTube</span>
              <span className="text-sm text-muted-foreground">@ajaaz.fitmode — free workouts & tips</span>
            </span>
          </a>
          <p className="rounded-md border border-accent/40 bg-secondary p-6 text-sm text-muted-foreground">
            Ajaaz does not take payments through this site. Pricing, payment and onboarding are
            handled personally once he understands your goal.
          </p>
        </aside>
      </div>
    </div>
  );
}