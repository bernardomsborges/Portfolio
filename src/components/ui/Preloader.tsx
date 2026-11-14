"use client";

import { useEffect, useState } from "react";
import { formatCounter, INTRO_SEEN_KEY, PRELOADER_EXIT_MS, preloaderProgress } from "@/lib/intro";

type PreloaderProps = { name: string; role: string; label: string };

/**
 * Full-screen counter shown on the first visit of a session, then slides up
 * to reveal the page. Visibility is controlled by `introScript` + globals.css,
 * so it never shows without JavaScript or with reduced motion.
 */
export function Preloader({ name, role, label }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro !== "pending") return;

    // Preloader already seen this session: just play the entrance.
    if (html.dataset.preloader !== "on") {
      html.dataset.intro = "play";
      return;
    }

    let loaded = document.readyState === "complete";
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);

    let frame = 0;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();

    const tick = (now: number) => {
      const value = preloaderProgress(now - start, loaded);
      setProgress(value);
      if (value < 100) {
        frame = requestAnimationFrame(tick);
        return;
      }
      try {
        sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {
        // Storage blocked: the preloader will simply show again next time.
      }
      html.dataset.preloader = "exit";
      html.dataset.intro = "play";
      exitTimer = setTimeout(() => {
        delete html.dataset.preloader;
      }, PRELOADER_EXIT_MS);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(exitTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div aria-hidden="true" className="preloader bg-ink text-paper">
      <div className="preloader-inner flex h-full flex-col justify-between p-5 sm:p-10">
        <div className="flex items-start justify-between gap-6 text-xs font-medium tracking-[0.2em] text-paper/60 uppercase sm:text-sm">
          <span>{name}</span>
          <span className="text-right">{role}</span>
        </div>

        <div>
          <div className="flex items-end justify-between gap-6">
            <span className="pb-2 text-xs font-medium tracking-[0.2em] text-paper/60 uppercase sm:text-sm">
              {label}
            </span>
            <span className="font-display text-[clamp(5rem,22vw,15rem)] leading-[0.8] font-bold tracking-tight tabular-nums">
              {formatCounter(progress)}
            </span>
          </div>
          <div className="mt-6 h-px w-full bg-paper/15">
            <div
              className="h-full origin-left bg-paper"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
