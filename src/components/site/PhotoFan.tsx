import { motion, useReducedMotion } from "motion/react";

type Photo = { image: string; caption: string };

export function PhotoFan({ photos }: { photos: Photo[] }) {
  const reduceMotion = useReducedMotion();
  const n = photos.length;
  const mid = (n - 1) / 2;

  return (
    <div className="mt-12">
      {/* Mobile: plain wrapped grid — a fanned deck can't fit narrow viewports without overlap/overflow. */}
      <div className="grid grid-cols-2 gap-4 sm:hidden">
        {photos.map((g) => (
          <div
            key={g.caption}
            className="group relative overflow-hidden rounded-md border border-border"
          >
            <img
              src={g.image}
              alt={g.caption}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold text-foreground">
              {g.caption}
            </p>
          </div>
        ))}
      </div>

      {/* sm+: fanned deck, spreads into place on scroll. */}
      <div className="hidden overflow-hidden py-6 sm:flex sm:justify-center">
        {photos.map((g, i) => {
          const offset = i - mid;
          const rotate = offset * 4;
          const lift = Math.abs(offset) * 12;
          const zIndex = n - Math.round(Math.abs(offset));

          return (
            <motion.div
              key={g.caption}
              className="group relative -ml-5 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-card shadow-xl first:ml-0 md:-ml-6 md:w-32 lg:-ml-8 lg:w-40"
              style={{ transformOrigin: "bottom center", zIndex }}
              initial={
                reduceMotion ? { opacity: 1, rotate, y: lift } : { opacity: 0, rotate: 0, y: 40 }
              }
              whileInView={{ opacity: 1, rotate, y: lift }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: lift - 14, zIndex: n + 1, transition: { duration: 0.25 } }
              }
            >
              <img
                src={g.image}
                alt={g.caption}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold text-foreground">
                {g.caption}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
