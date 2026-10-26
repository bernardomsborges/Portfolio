import { describe, expect, it } from "vitest";
import en from "./dictionaries/en";
import pt from "./dictionaries/pt";

function keyPaths(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) return [prefix];
  return Object.entries(value).flatMap(([key, child]) =>
    keyPaths(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe("dictionaries", () => {
  it("have the same keys in every language", () => {
    expect(keyPaths(en).sort()).toEqual(keyPaths(pt).sort());
  });

  it("have no empty strings", () => {
    for (const dict of [pt, en]) {
      const empty = keyPaths(dict).filter((path) => {
        const leaf = path
          .split(".")
          .reduce<unknown>((acc, k) => (acc as Record<string, unknown>)[k], dict);
        return typeof leaf === "string" && leaf.trim() === "";
      });
      expect(empty).toEqual([]);
    }
  });
});
