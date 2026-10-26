import { getPreferredLocale, hasLocale } from "./config";

export type RouteDecision =
  { type: "next" } | { type: "redirect"; pathname: string } | { type: "rewrite"; pathname: string };

/**
 * Decides what the proxy does with a request path.
 * - No locale prefix -> redirect to the visitor's preferred language.
 * - Unknown project slug -> rewrite to a path no route matches, so Next answers with a real 404
 *   (otherwise Cache Components streams the page shell with status 200 before `notFound()` runs).
 */
export function resolveRoute(
  pathname: string,
  acceptLanguage: string | null,
  projectSlugs: readonly string[],
): RouteDecision {
  const [, first = "", ...rest] = pathname.split("/");

  if (!hasLocale(first)) {
    const locale = getPreferredLocale(acceptLanguage);
    return { type: "redirect", pathname: `/${locale}${pathname === "/" ? "" : pathname}` };
  }

  const [section, slug, ...extra] = rest;
  if (
    section === "projects" &&
    slug &&
    extra.every((s) => s === "") &&
    !projectSlugs.includes(slug)
  ) {
    return { type: "rewrite", pathname: `/${first}/404` };
  }

  return { type: "next" };
}
