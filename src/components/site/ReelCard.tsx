import { motion, useReducedMotion } from "motion/react";
import { Play } from "lucide-react";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import type { Reel } from "@/data/site";

export function ReelCard({
  reel,
  index = 0,
  total = 1,
}: {
  reel: Reel;
  index?: number;
  total?: number;
}) {
  const reduceMotion = useReducedMotion();
  const offset = index - (total - 1) / 2;
  const rotate = offset * 8;
  const lift = Math.abs(offset) * 20;

  return (
    <motion.a
      href={reel.url}
      target="_blank"
      rel="noreferrer"
      className="group relative -ml-10 block w-40 shrink-0 overflow-hidden rounded-md border border-border bg-card shadow-2xl first:ml-0 sm:w-48 md:w-56"
      style={{ transformOrigin: "bottom center", zIndex: total - Math.abs(offset) }}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 0, y: 48 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, rotate, y: lift }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: lift - 20, rotate: rotate * 0.3, zIndex: 30, transition: { duration: 0.3 } }
      }
    >
      <img
        src={reel.image}
        alt={reel.caption}
        loading="lazy"
        className="aspect-[9/16] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-accent/90 text-accent-foreground transition-transform group-hover:scale-110">
          <Play className="size-5 translate-x-0.5 fill-current" />
        </span>
      </span>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-xs font-semibold text-foreground">{reel.caption}</p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-accent">
          <AnimatedCounter value={reel.likes} suffix=" likes" />
        </p>
      </div>
    </motion.a>
  );
}
