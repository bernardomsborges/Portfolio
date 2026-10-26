import { describe, expect, it } from "vitest";
import type { Experience, Project } from "@/content/types";
import {
  filterProjects,
  findProject,
  format,
  formatPeriod,
  nextProject,
  yearsOfExperience,
} from "./portfolio";

const project = (slug: string, category: Project["category"]): Project => ({
  slug,
  category,
  title: { pt: slug, en: slug },
  summary: { pt: "", en: "" },
  body: { pt: [], en: [] },
  role: { pt: "", en: "" },
  tags: [],
  stack: [],
  year: 2025,
  cover: `/projects/${slug}.svg`,
});

const list = [project("a", "real"), project("b", "exploration"), project("c", "real")];

describe("filterProjects", () => {
  it("returns every project for 'all'", () => {
    expect(filterProjects(list, "all").map((p) => p.slug)).toEqual(["a", "b", "c"]);
  });

  it("keeps only the chosen category, preserving order", () => {
    expect(filterProjects(list, "real").map((p) => p.slug)).toEqual(["a", "c"]);
    expect(filterProjects(list, "exploration").map((p) => p.slug)).toEqual(["b"]);
  });
});

describe("findProject / nextProject", () => {
  it("finds by slug", () => {
    expect(findProject(list, "b")?.slug).toBe("b");
    expect(findProject(list, "zzz")).toBeUndefined();
  });

  it("wraps around to the first project", () => {
    expect(nextProject(list, "a")?.slug).toBe("b");
    expect(nextProject(list, "c")?.slug).toBe("a");
    expect(nextProject(list, "zzz")).toBeUndefined();
    expect(nextProject([project("solo", "real")], "solo")).toBeUndefined();
  });
});

describe("yearsOfExperience", () => {
  const jobs: Experience[] = [
    { company: "B", role: { pt: "", en: "" }, start: "2022-01" },
    { company: "A", role: { pt: "", en: "" }, start: "2019-08", end: "2021-12" },
  ];

  it("counts whole years since the earliest start", () => {
    expect(yearsOfExperience(jobs, new Date(2026, 9, 26))).toBe(7);
    expect(yearsOfExperience(jobs, new Date(2026, 6, 1))).toBe(6);
  });

  it("is zero without experience", () => {
    expect(yearsOfExperience([], new Date())).toBe(0);
  });
});

describe("formatPeriod", () => {
  const job: Experience = {
    company: "X",
    role: { pt: "", en: "" },
    start: "2022-01",
    end: "2024-02",
  };

  it("formats in each language", () => {
    expect(formatPeriod(job, "en", "Now")).toBe("Jan 2022 – Feb 2024");
    expect(formatPeriod(job, "pt", "Atual")).toBe("jan 2022 – fev 2024");
  });

  it("uses the present label for current positions", () => {
    expect(formatPeriod({ ...job, end: undefined }, "en", "Now")).toBe("Jan 2022 – Now");
  });
});

describe("format", () => {
  it("replaces known placeholders and keeps unknown ones", () => {
    expect(format("{n}+ years", { n: 7 })).toBe("7+ years");
    expect(format("{a} {b}", { a: "x" })).toBe("x {b}");
  });
});
