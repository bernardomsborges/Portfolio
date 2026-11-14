/**
 * Site intro: a preloader on the first visit of a session, then an entrance animation.
 *
 * State lives on <html> so plain CSS can drive it before React hydrates:
 * - data-intro="pending" → entrance elements wait in their start position
 * - data-intro="play"    → entrance transitions run
 * - data-preloader="on" | "exit" → preloader shown / sliding away
 */

export const INTRO_SEEN_KEY = "intro-seen";

/** Minimum time the preloader counter takes to reach 100. */
export const PRELOADER_MIN_MS = 1500;

/** How long the preloader takes to slide out (keep in sync with globals.css). */
export const PRELOADER_EXIT_MS = 1800;

/** If hydration never happens, show the page anyway after this long. */
export const INTRO_FALLBACK_MS = 6000;

/** Highest value the counter shows while the page is still loading. */
const WAITING_CAP = 90;

/**
 * Counter value (0–100) after `elapsedMs`. Eases out over `minMs`
 * and holds below 100 until the page has finished loading.
 */
export function preloaderProgress(
  elapsedMs: number,
  loaded: boolean,
  minMs = PRELOADER_MIN_MS,
): number {
  const t = Math.min(Math.max(elapsedMs / minMs, 0), 1);
  const value = Math.round((1 - (1 - t) ** 3) * 100);
  return loaded ? value : Math.min(value, WAITING_CAP);
}

/** Zero-padded counter label, e.g. 7 → "007". */
export function formatCounter(value: number): string {
  return String(Math.round(Math.min(Math.max(value, 0), 100))).padStart(3, "0");
}

/**
 * Inline script that runs before first paint and sets the intro state on <html>.
 * Skips everything for reduced motion; skips the preloader if already seen this session.
 */
export const introScript = `(function(){
var d=document.documentElement;
if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;
var seen=false;
try{seen=sessionStorage.getItem(${JSON.stringify(INTRO_SEEN_KEY)})==="1"}catch(e){}
d.setAttribute("data-intro","pending");
if(!seen)d.setAttribute("data-preloader","on");
setTimeout(function(){if(d.getAttribute("data-intro")==="pending"){d.setAttribute("data-intro","play");d.removeAttribute("data-preloader")}},${INTRO_FALLBACK_MS});
})();`;
