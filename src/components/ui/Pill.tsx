import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small rounded label, e.g. project tags. */
export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-paper px-3.5 py-1.5 text-sm text-ink ring-1 ring-line",
        className,
      )}
    >
      {children}
    </span>
  );
}
