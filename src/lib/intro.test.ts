import { describe, expect, it } from "vitest";
import { formatCounter, preloaderProgress } from "./intro";

describe("preloaderProgress", () => {
  it("starts at 0 and reaches 100 after the minimum time once loaded", () => {
    expect(preloaderProgress(0, true, 1000)).toBe(0);
    expect(preloaderProgress(1000, true, 1000)).toBe(100);
    expect(preloaderProgress(5000, true, 1000)).toBe(100);
  });

  it("eases out, moving faster at the start", () => {
    const early = preloaderProgress(250, true, 1000);
    const late = preloaderProgress(1000, true, 1000) - preloaderProgress(750, true, 1000);
    expect(early).toBeGreaterThan(late);
  });

  it("holds below 100 while the page is still loading", () => {
    expect(preloaderProgress(5000, false, 1000)).toBe(90);
    expect(preloaderProgress(100, false, 1000)).toBeLessThan(90);
  });

  it("clamps negative time", () => {
    expect(preloaderProgress(-50, true, 1000)).toBe(0);
  });
});

describe("formatCounter", () => {
  it("pads to three digits and clamps to 0–100", () => {
    expect(formatCounter(7)).toBe("007");
    expect(formatCounter(42.6)).toBe("043");
    expect(formatCounter(100)).toBe("100");
    expect(formatCounter(130)).toBe("100");
    expect(formatCounter(-3)).toBe("000");
  });
});
