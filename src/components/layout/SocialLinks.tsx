import { SocialIcon } from "@/components/ui/SocialIcon";
import type { Social } from "@/content/types";
import { cn } from "@/lib/cn";

type SocialLinksProps = {
  socials: Social[];
  label: string;
  newTabLabel: string;
  className?: string;
};

export function SocialLinks({ socials, label, newTabLabel, className }: SocialLinksProps) {
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-2.5", className)}>
      {socials.map((social) => (
        <li key={social.id}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink shadow-pill ring-1 ring-line transition hover:-translate-y-0.5 hover:ring-ink/30"
          >
            <SocialIcon id={social.id} className="size-4" />
            {social.label}
            <span className="sr-only">{newTabLabel}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
