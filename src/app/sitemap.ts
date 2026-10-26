import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { locales, localeTags } from "@/i18n/config";
import { localeUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/projects", ...projects.map((p) => `/projects/${p.slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: localeUrl(locale, path),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [localeTags[l], localeUrl(l, path)])),
      },
    })),
  );
}
