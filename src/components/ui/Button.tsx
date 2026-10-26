import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "dark" | "light";

const variants: Record<Variant, string> = {
  dark: "bg-ink text-paper shadow-[inset_0_1px_0_rgb(255_255_255/0.15),0_8px_20px_-8px_rgb(0_0_0/0.6)] hover:bg-ink-soft",
  light: "bg-paper text-ink ring-1 ring-line shadow-pill hover:bg-mist",
};

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; icon?: boolean };

/** Pill-shaped link with the ↗ arrow, used for every CTA. */
export function ButtonLink({
  variant = "dark",
  icon = true,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      {icon && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Link>
  );
}
