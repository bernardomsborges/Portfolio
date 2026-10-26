import { localeTags, type Locale } from "@/i18n/config";
import type { Experience, Project, ProjectCategory, YearMonth } from "@/content/types";

export type ProjectFilter = "all" | ProjectCategory;

export function filterProjects(projects: readonly Project[], filter: ProjectFilter): Project[] {
  return filter === "all" ? [...projects] : projects.filter((p) => p.category === filter);
}

export function findProject(projects: readonly Project[], slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** The project after `slug`, wrapping around to the first one. */
export function nextProject(projects: readonly Project[], slug: string): Project | undefined {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1 || projects.length < 2) return undefined;
  return projects[(index + 1) % projects.length];
}

function parseYearMonth(value: YearMonth): { year: number; month: number } {
  const [year, month] = value.split("-").map(Number);
  return { year: year ?? 0, month: month ?? 1 };
}

/** Whole years between the earliest start date and `now`. */
export function yearsOfExperience(items: readonly Experience[], now: Date): number {
  if (items.length === 0) return 0;
  const earliest = items
    .map((item) => parseYearMonth(item.start))
    .reduce((a, b) => (a.year * 12 + a.month <= b.year * 12 + b.month ? a : b));
  const months =
    now.getFullYear() * 12 + (now.getMonth() + 1) - (earliest.year * 12 + earliest.month);
  return Math.max(0, Math.floor(months / 12));
}

function formatYearMonth(value: YearMonth, locale: Locale): string {
  const { year, month } = parseYearMonth(value);
  const formatted = new Intl.DateTimeFormat(localeTags[locale], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
  // "jan. de 2024" -> "jan 2024" for a compact, consistent look in both languages.
  return formatted.replace(/\./g, "").replace(" de ", " ");
}

export function formatPeriod(item: Experience, locale: Locale, presentLabel: string): string {
  const start = formatYearMonth(item.start, locale);
  const end = item.end ? formatYearMonth(item.end, locale) : presentLabel;
  return `${start} – ${end}`;
}

/** Replaces `{name}` placeholders in a dictionary string. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
