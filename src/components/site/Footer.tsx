import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Instagram } from "lucide-react";
import { SITE } from "@/data/site";
import { InstagramFollowButton } from "@/components/site/InstagramFollowButton";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">
            AJAAZ<span className="text-accent">.FITMODE</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {SITE.tagline}. {SITE.clientsServed} clients coached through fitness and nutrition
            transformations.
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-accent">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/services" className="hover:text-foreground">
              Services
            </Link>
            <Link to="/packages" className="hover:text-foreground">
              Packages
            </Link>
            <Link to="/faq" className="hover:text-foreground">
              FAQ
            </Link>
            <Link to="/contact" className="hover:text-foreground">
              Get in Touch
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-accent">Reach Ajaaz</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <Instagram className="size-4" /> @ajaaz.fitmode
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 hover:text-foreground"
            >
              <Mail className="size-4" /> {SITE.email}
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <MessageCircle className="size-4" /> WhatsApp enquiry
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground/70">
            No online payments — every plan starts with a personal conversation.
          </p>
          <InstagramFollowButton className="mt-5" />
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
