import type { ElementType } from "react";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  title: string;
  /** Huge faded word behind the title, e.g. "PORTFOLIO". Decorative only. */
  ghost?: string;
  id?: string;
  as?: ElementType;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
};

/** "/SECTION" heading with an optional ghost word behind it. */
export function SectionTitle({
  title,
  ghost,
  id,
  as: Tag = "h2",
  tone = "dark",
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("relative", align === "center" && "text-center", className)}>
      {ghost && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 -top-[0.45em] block font-display text-[clamp(3.5rem,13vw,9.5rem)] leading-none font-bold tracking-[0.06em] whitespace-nowrap uppercase select-none",
            align === "center" ? "text-center" : "text-left",
            tone === "dark" ? "text-ink/[0.045]" : "text-paper/[0.05]",
          )}
        >
          {ghost}
        </span>
      )}
      <Tag
        id={id}
        className={cn(
          "relative font-display text-3xl font-semibold tracking-tight uppercase sm:text-4xl md:text-5xl",
          tone === "dark" ? "text-ink" : "text-paper",
        )}
      >
        <span aria-hidden="true">/</span>
        {title}
      </Tag>
    </div>
  );
}
