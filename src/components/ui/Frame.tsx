import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type Variant = "paper" | "ink" | "glass" | "bare";

const variants: Record<Variant, string> = {
  paper: "bg-paper shadow-frame ring-1 ring-black/5",
  ink: "bg-ink text-paper shadow-frame ring-1 ring-white/10",
  glass: "bg-paper/55 shadow-frame ring-1 ring-white/70 backdrop-blur-xl",
  bare: "",
};

type FrameProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
} & ComponentPropsWithoutRef<T>;

/** Rounded page "card" used by every section, matching the framed look of the design. */
export function Frame<T extends ElementType = "section">({
  as,
  variant = "paper",
  className,
  ...props
}: FrameProps<T>) {
  const Tag: ElementType = as ?? "section";
  return (
    <Tag
      className={cn(
        "relative mx-auto w-full max-w-6xl overflow-hidden rounded-frame",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
