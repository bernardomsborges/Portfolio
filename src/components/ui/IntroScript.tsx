"use client";

import { useSyncExternalStore } from "react";
import { introScript } from "@/lib/intro";

const subscribe = () => () => {};

/**
 * Inline script that sets the intro state on <html> before first paint.
 *
 * It is only needed in the server HTML. When React renders the layout from scratch in the
 * browser (e.g. after switching language), it would create a <script> that never runs and
 * warn about it, so it renders nothing there.
 */
export function IntroScript() {
  // false during SSR and hydration, true for renders that start in the browser.
  const clientOnly = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  if (clientOnly) return null;
  return <script dangerouslySetInnerHTML={{ __html: introScript }} />;
}
