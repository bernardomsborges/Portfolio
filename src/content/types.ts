import type { Localized } from "@/i18n/config";

export type ProjectCategory = "real" | "exploration";

export type Project = {
  slug: string;
  title: Localized;
  summary: Localized;
  /** Paragraphs shown on the project page. */
  body: Localized<string[]>;
  category: ProjectCategory;
  tags: string[];
  stack: string[];
  year: number;
  role: Localized;
  client?: string;
  /** Path inside /public. Recommended 1600×1000 (16:10). */
  cover: string;
  links?: { live?: string; repo?: string };
  /** Shown in the home "Selected work" section. */
  featured?: boolean;
};

export type Service = {
  id: string;
  title: Localized;
  description: Localized;
  image: string;
};

/** "YYYY-MM" */
export type YearMonth = `${number}-${number}`;

export type Experience = {
  company: string;
  role: Localized;
  start: YearMonth;
  /** Omit for the current position. */
  end?: YearMonth;
  image?: string;
  url?: string;
};

export type SocialId = "github" | "linkedin" | "instagram" | "dribbble" | "behance" | "x";

export type Social = { id: SocialId; label: string; url: string };

export type Profile = {
  firstName: string;
  lastName: string;
  role: Localized;
  tagline: Localized;
  email: string;
  /** Portrait in /public. A transparent PNG/WebP cut-out works best. */
  photo: string;
  /** Small square face crop used in round avatars. */
  avatar: string;
  available: boolean;
};
