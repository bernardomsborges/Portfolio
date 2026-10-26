import { describe, expect, it } from "vitest";
import { resolveRoute } from "./routing";

const slugs = ["atlas", "lumen"];

describe("resolveRoute", () => {
  it("redirects locale-less paths to the preferred language", () => {
    expect(resolveRoute("/", "en-US", slugs)).toEqual({ type: "redirect", pathname: "/en" });
    expect(resolveRoute("/projects", null, slugs)).toEqual({
      type: "redirect",
      pathname: "/pt/projects",
    });
    expect(resolveRoute("/de/x", "de", slugs)).toEqual({ type: "redirect", pathname: "/pt/de/x" });
  });

  it("lets known pages through", () => {
    for (const path of [
      "/pt",
      "/en/",
      "/en/projects",
      "/pt/projects/atlas",
      "/en/projects/lumen/",
    ]) {
      expect(resolveRoute(path, null, slugs), path).toEqual({ type: "next" });
    }
  });

  it("rewrites unknown project slugs to a 404", () => {
    expect(resolveRoute("/en/projects/nope", null, slugs)).toEqual({
      type: "rewrite",
      pathname: "/en/404",
    });
  });
});
