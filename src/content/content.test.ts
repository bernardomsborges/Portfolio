import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/config";
import { experience } from "./experience";
import { profile } from "./profile";
import { projects } from "./projects";
import { services } from "./services";

const publicFile = (path: string) => existsSync(join(process.cwd(), "public", path));

describe("content integrity", () => {
  it("project slugs are unique and URL-safe", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("every referenced image exists in /public", () => {
    const images = [
      profile.photo,
      profile.avatar,
      ...projects.map((p) => p.cover),
      ...services.map((s) => s.image),
      ...experience.flatMap((e) => (e.image ? [e.image] : [])),
    ];
    expect(images.filter((img) => !publicFile(img))).toEqual([]);
  });

  it("every project is translated in all languages", () => {
    for (const p of projects) {
      for (const locale of locales) {
        expect(p.title[locale], `${p.slug}.title.${locale}`).toBeTruthy();
        expect(p.summary[locale], `${p.slug}.summary.${locale}`).toBeTruthy();
        expect(p.body[locale].length, `${p.slug}.body.${locale}`).toBeGreaterThan(0);
      }
    }
  });

  it("has at least one featured project for the home page", () => {
    expect(projects.some((p) => p.featured)).toBe(true);
  });

  it("experience summaries are translated in all languages", () => {
    for (const e of experience) {
      if (!e.summary) continue;
      for (const locale of locales) {
        expect(e.summary[locale], `${e.company}.summary.${locale}`).toBeTruthy();
      }
    }
  });

  it("experience dates are valid and ordered", () => {
    for (const e of experience) {
      expect(e.start).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
      if (e.end) {
        expect(e.end).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
        expect(e.end >= e.start, `${e.company} ends before it starts`).toBe(true);
      }
    }
  });
});
