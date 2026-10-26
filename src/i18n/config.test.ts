import { describe, expect, it } from "vitest";
import { getPreferredLocale, hasLocale } from "./config";

describe("hasLocale", () => {
  it("accepts supported locales only", () => {
    expect(hasLocale("pt")).toBe(true);
    expect(hasLocale("en")).toBe(true);
    expect(hasLocale("de")).toBe(false);
    expect(hasLocale("")).toBe(false);
  });
});

describe("getPreferredLocale", () => {
  it("falls back to the default locale", () => {
    expect(getPreferredLocale(null)).toBe("pt");
    expect(getPreferredLocale("")).toBe("pt");
    expect(getPreferredLocale("de-DE,fr;q=0.8")).toBe("pt");
  });

  it("matches on the primary language subtag", () => {
    expect(getPreferredLocale("en-GB")).toBe("en");
    expect(getPreferredLocale("pt-PT")).toBe("pt");
  });

  it("respects quality values over order", () => {
    expect(getPreferredLocale("pt;q=0.5,en;q=0.9")).toBe("en");
    expect(getPreferredLocale("de,en;q=0.7,pt;q=0.8")).toBe("pt");
  });

  it("ignores languages explicitly refused with q=0", () => {
    expect(getPreferredLocale("en;q=0,pt;q=0.1")).toBe("pt");
  });
});
