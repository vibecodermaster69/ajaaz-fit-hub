import { Instagram } from "lucide-react";
import { SITE } from "@/data/site";

export function InstagramFollowButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={SITE.instagram}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-105 ${className}`}
    >
      <Instagram className="size-4" /> Follow @ajaaz.fitmode
    </a>
  );
}
