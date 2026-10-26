import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/content/projects";
import { resolveRoute } from "@/i18n/routing";

const projectSlugs = projects.map((p) => p.slug);

export function proxy(request: NextRequest) {
  const decision = resolveRoute(
    request.nextUrl.pathname,
    request.headers.get("accept-language"),
    projectSlugs,
  );
  if (decision.type === "next") return;

  const url = request.nextUrl.clone();
  url.pathname = decision.pathname;
  return decision.type === "redirect" ? NextResponse.redirect(url) : NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, sitemap.xml, robots.txt...)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
