import { cacheLife } from "next/cache";
import { locales, localeTags, type Locale } from "@/i18n/config";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

/** Absolute URL for a locale-relative path, e.g. ("en", "/projects") -> https://site/en/projects */
export function localeUrl(locale: Locale, path = ""): string {
  return `${siteUrl}/${locale}${path}`;
}

/** hreflang map for `metadata.alternates.languages`. */
export function languageAlternates(path = ""): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((l) => [localeTags[l], `/${l}${path}`])),
    "x-default": `/pt${path}`,
  };
}

/**
 * Today's date, cached for a day so pages stay statically prerendered.
 * Used for "N+ years of experience" and the footer year.
 */
export async function getToday(): Promise<string> {
  "use cache";
  cacheLife("days");
  return new Date().toISOString();
}
