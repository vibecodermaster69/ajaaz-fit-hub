import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { FAQS } from "@/data/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Coaching, Diet & Payments | Ajaaz Fitmode" },
      {
        name: "description",
        content:
          "Answers about training without a gym, vegetarian diet plans, results timelines, injuries and how to pay Ajaaz.",
      },
      { property: "og:title", content: "FAQ | Ajaaz Fitmode" },
      {
        property: "og:description",
        content: "Common questions about coaching with Ajaaz, answered.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="section-shell py-20">
      <SectionHeading
        eyebrow="Questions"
        title={
          <>
            Before you <span className="text-gradient-gold">start</span>
          </>
        }
        subtitle="Everything clients usually ask before their first week of coaching."
      />

      <Reveal>
        <Accordion type="single" collapsible className="mt-12 max-w-3xl">
          {FAQS.map((faq, i) => (
            <AccordionItem key={faq.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-semibold hover:text-accent">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>

      <p className="mt-12 text-sm text-muted-foreground">
        Still unsure?{" "}
        <Link
          to="/contact"
          className="font-semibold text-accent underline-offset-4 hover:underline"
        >
          Send Ajaaz your question
        </Link>
        .
      </p>
    </div>
  );
}
