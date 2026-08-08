import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
} from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Photo = { image: string; caption: string };

export function PhotoFan({ photos }: { photos: Photo[] }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const n = photos.length;
  const mid = (n - 1) / 2;

  // Scroll tracking for desktop progressive fanout
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  // Handle keyboard navigation in Lightbox
  useEffect(() => {
    if (selectedPhotoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhotoIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) => (prev !== null ? (prev - 1 + n) % n : null));
      }
      if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % n : null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, n]);

  // Track active card on mobile horizontal scroll
  const handleMobileScroll = () => {
    const container = mobileContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.65 + 24; // Width + gap
    const index = Math.round(scrollLeft / cardWidth);
    if (index >= 0 && index < n && index !== activeMobileIndex) {
      setActiveMobileIndex(index);
    }
  };

  return (
    <div className="mt-12 w-full">
      {/* Mobile: Interactive 3D Coverflow Carousel (viewports < sm) */}
      <div className="relative block sm:hidden w-full overflow-hidden py-8">
        <div
          ref={mobileContainerRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 px-[20vw] py-4 w-full"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {photos.map((g, i) => {
            const isActive = i === activeMobileIndex;
            const diff = i - activeMobileIndex;
            const rotate = diff * 8; // Tilt fanned effect for non-active cards
            const scale = isActive ? 1.05 : 0.9;
            const opacity = isActive ? 1 : 0.45;

            return (
              <motion.div
                key={g.caption}
                className="w-[60vw] shrink-0 snap-center overflow-hidden rounded-md border border-border bg-card shadow-2xl relative"
                animate={{
                  rotate: reduceMotion ? 0 : rotate,
                  scale,
                  opacity,
                  y: isActive ? -10 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={() => {
                  if (isActive) {
                    setSelectedPhotoIndex(i);
                  } else {
                    // Scroll to card
                    const container = mobileContainerRef.current;
                    if (container) {
                      const cardWidth = container.clientWidth * 0.65 + 24;
                      container.scrollTo({
                        left: i * cardWidth,
                        behavior: "smooth",
                      });
                    }
                  }
                }}
              >
                <img
                  src={g.image}
                  alt={g.caption}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-4 text-xs font-semibold text-foreground text-center">
                  {g.caption}
                </p>
              </motion.div>
            );
          })}
        </div>
        {/* Carousel Pagination Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const container = mobileContainerRef.current;
                if (container) {
                  const cardWidth = container.clientWidth * 0.65 + 24;
                  container.scrollTo({ left: i * cardWidth, behavior: "smooth" });
                }
              }}
              className={`size-2 rounded-full transition-all duration-300 ${
                i === activeMobileIndex ? "bg-accent w-4" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* sm+: Progressive Scroll Fanout Deck */}
      <div
        ref={containerRef}
        className="hidden overflow-hidden py-10 sm:flex sm:justify-center relative min-h-[400px] items-center w-full"
      >
        {photos.map((g, i) => (
          <PhotoCard
            key={g.caption}
            g={g}
            i={i}
            mid={mid}
            n={n}
            scrollYProgress={scrollYProgress}
            reduceMotion={reduceMotion}
            setSelectedPhotoIndex={setSelectedPhotoIndex}
          />
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute -top-14 right-2 p-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="size-5" />
              </button>

              {/* Main Content Area */}
              <div className="relative flex items-center justify-center w-full max-h-[75vh] overflow-hidden rounded-md border border-border bg-card/60 p-2 shadow-2xl">
                <img
                  src={photos[selectedPhotoIndex].image}
                  alt={photos[selectedPhotoIndex].caption}
                  className="max-h-[70vh] w-auto object-contain rounded-sm select-none"
                />

                {/* Left navigation arrow */}
                <button
                  onClick={() => setSelectedPhotoIndex((selectedPhotoIndex - 1 + n) % n)}
                  className="absolute left-4 p-3 rounded-full bg-black/60 border border-white/10 text-white/80 hover:text-white hover:bg-black/80 hover:scale-105 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-5" />
                </button>

                {/* Right navigation arrow */}
                <button
                  onClick={() => setSelectedPhotoIndex((selectedPhotoIndex + 1) % n)}
                  className="absolute right-4 p-3 rounded-full bg-black/60 border border-white/10 text-white/80 hover:text-white hover:bg-black/80 hover:scale-105 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>

              {/* Caption details */}
              <div className="mt-4 flex flex-col items-center">
                <p className="text-center text-sm font-semibold text-accent bg-accent/10 border border-accent/20 px-5 py-2.5 rounded-full shadow-lg">
                  {photos[selectedPhotoIndex].caption}
                </p>
                <p className="mt-2 text-xs text-muted-foreground select-none">
                  {selectedPhotoIndex + 1} of {n}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Child Card component to respect React Hooks guidelines
function PhotoCard({
  g,
  i,
  mid,
  n,
  scrollYProgress,
  reduceMotion,
  setSelectedPhotoIndex,
}: {
  g: Photo;
  i: number;
  mid: number;
  n: number;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean | null;
  setSelectedPhotoIndex: (idx: number) => void;
}) {
  const offset = i - mid;

  // Progressive scroll mapping
  const xProgress = useTransform(scrollYProgress, [0, 0.7], [offset * -25, offset * 50]);
  const rotateProgress = useTransform(scrollYProgress, [0, 0.7], [offset * 1.5, offset * 6.5]);
  const yProgress = useTransform(
    scrollYProgress,
    [0, 0.7],
    [Math.abs(offset) * 4, Math.abs(offset) * 14],
  );

  const x = reduceMotion ? offset * 40 : xProgress;
  const rotate = reduceMotion ? offset * 4 : rotateProgress;
  const y = reduceMotion ? Math.abs(offset) * 12 : yProgress;
  const zIndex = n - Math.round(Math.abs(offset));

  return (
    <motion.div
      className="group relative w-24 shrink-0 overflow-hidden rounded-md border border-border bg-card shadow-2xl transition-shadow hover:shadow-[0_0_20px_rgba(204,255,0,0.15)] first:ml-0 md:w-32 lg:w-40 cursor-pointer"
      style={{
        transformOrigin: "bottom center",
        zIndex,
        x,
        rotate,
        y,
      }}
      onClick={() => setSelectedPhotoIndex(i)}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -25,
              scale: 1.08,
              rotate: 0,
              zIndex: n + 10,
              transition: { type: "spring", stiffness: 400, damping: 20 },
            }
      }
    >
      <img
        src={g.image}
        alt={g.caption}
        loading="lazy"
        className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
      <p className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold text-foreground opacity-90 group-hover:opacity-100 group-hover:text-accent transition-colors">
        {g.caption}
      </p>
    </motion.div>
  );
}
