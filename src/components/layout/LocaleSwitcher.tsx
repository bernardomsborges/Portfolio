"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** Swaps the first path segment, keeping the visitor on the same page. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const [, , ...rest] = pathname.split("/");
  return `/${[target, ...rest].join("/")}`.replace(/\/$/, "");
}

export function LocaleSwitcher({
  current,
  label,
  className,
}: {
  current: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname() ?? `/${current}`;

  return (
    <nav
      aria-label={label}
      className={cn("flex items-center rounded-full bg-mist p-0.5", className)}
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={switchLocalePath(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors",
              active ? "bg-ink text-paper" : "text-mute hover:text-ink",
            )}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
