import { siBehance, siDribbble, siGithub, siInstagram, siX } from "simple-icons";
import type { SocialId } from "@/content/types";

// simple-icons does not ship LinkedIn (brand policy), so it is drawn here.
const linkedinPath =
  "M4 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Zm1.8 6.6h2.6V18H5.8V9.6Zm1.3-4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.4 4h2.5v1.2h.04c.35-.66 1.2-1.36 2.47-1.36 2.64 0 3.13 1.74 3.13 4V18h-2.6v-4c0-.95-.02-2.18-1.33-2.18-1.33 0-1.53 1.04-1.53 2.11V18h-2.6V9.6Z";

const paths: Record<SocialId, string> = {
  github: siGithub.path,
  linkedin: linkedinPath,
  instagram: siInstagram.path,
  dribbble: siDribbble.path,
  behance: siBehance.path,
  x: siX.path,
};

export function SocialIcon({ id, className }: { id: SocialId; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={paths[id]} />
    </svg>
  );
}
