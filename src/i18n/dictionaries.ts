import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { hasLocale, type Locale } from "./config";
import type { Dictionary } from "./dictionaries/pt";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  pt: () => import("./dictionaries/pt").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};

/** Current locale from the root `[locale]` segment. 404s on unsupported values. */
export async function getLocale(): Promise<Locale> {
  const value = await rootLocale();
  if (!hasLocale(value)) notFound();
  return value;
}

export async function getDictionary(locale?: Locale): Promise<Dictionary> {
  return dictionaries[locale ?? (await getLocale())]();
}

export type { Dictionary };
