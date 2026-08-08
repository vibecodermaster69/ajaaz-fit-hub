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
