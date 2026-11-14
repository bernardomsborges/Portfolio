import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { RiseText } from "./RiseText";
import { ScrollGhost } from "./ScrollGhost";

type SectionTitleProps = {
  title: string;
  /** Huge faded word behind the title, e.g. "PORTFOLIO". Decorative only. */
  ghost?: string;
  /** Where the ghost word sits. Defaults to the title's alignment. */
  ghostAlign?: "left" | "center";
  /** Content shown on the same row as the title (pushed to the right). */
  aside?: ReactNode;
  id?: string;
  as?: ElementType;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
};

/** "/SECTION" heading that rises in, with an optional ghost word drifting behind it. */
export function SectionTitle({
  title,
  ghost,
  ghostAlign,
  aside,
  id,
  as: Tag = "h2",
  tone = "dark",
  align = "left",
  className,
}: SectionTitleProps) {
  const ghostPosition = ghostAlign ?? align;
  const heading = (
    <Tag
      id={id}
      className={cn(
        "relative font-display text-3xl font-semibold tracking-tight uppercase sm:text-4xl md:text-5xl",
        tone === "dark" ? "text-ink" : "text-paper",
      )}
    >
      <RiseText text={title} prefix="/" />
    </Tag>
  );

  return (
    <div className={cn("relative", align === "center" && "text-center", className)}>
      {ghost && (
        <ScrollGhost
          className={cn(
            "pointer-events-none absolute -top-[0.45em] block font-display text-[clamp(3.5rem,13vw,9.5rem)] leading-none font-bold tracking-[0.06em] whitespace-nowrap uppercase select-none",
            // Centre with a transform so a word wider than the box still overflows evenly.
            ghostPosition === "center" ? "left-1/2 -translate-x-1/2" : "left-0",
            tone === "dark" ? "text-ink/[0.045]" : "text-paper/[0.05]",
          )}
        >
          {ghost}
        </ScrollGhost>
      )}
      {aside ? (
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          {heading}
          {aside}
        </div>
      ) : (
        heading
      )}
    </div>
  );
}
