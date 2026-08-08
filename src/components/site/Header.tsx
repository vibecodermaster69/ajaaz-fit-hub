import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Flame, Instagram } from "lucide-react";
import { SITE } from "@/data/site";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/packages", label: "Packages" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Get in Touch" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="section-shell flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex size-8 items-center justify-center rounded-sm bg-accent">
            <Flame className="size-5 text-accent-foreground" />
          </span>
          <span className="font-display text-2xl leading-none tracking-wide">
            AJAAZ<span className="text-accent">.FITMODE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Ajaaz Fitmode on Instagram"
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            <Instagram className="size-5" />
          </a>
          <a
            href={SITE.youtube}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm bg-accent px-4 py-2 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-105"
          >
            YouTube
          </a>
        </nav>

        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-border bg-card md:hidden">
          <div className="section-shell flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
                activeProps={{ className: "text-accent" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
