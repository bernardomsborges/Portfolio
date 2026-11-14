"use client";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { revealEase } from "@/components/ui/Reveal";

export type ExperienceRow = {
  company: string;
  role: string;
  summary?: string;
  /** Translated focus labels shown as tags. */
  focus: string[];
  period: string;
  image?: string;
};

const inView = { once: true, margin: "0px 0px -10% 0px" } as const;

/**
 * Experience rows. Each row animates in as it scrolls into view (text rises, the period
 * comes from the right, the divider draws itself); on desktop, hovering a row shows its
 * image following the cursor.
 */
export function ExperienceList({ rows }: { rows: ExperienceRow[] }) {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const onPointerMove = (event: PointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  const preview = active !== null ? rows[active]?.image : undefined;

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative">
        <ul onPointerMove={onPointerMove} onPointerLeave={() => setActive(null)}>
          {rows.map((row, index) => (
            <li
              key={`${row.company}-${row.period}`}
              onPointerEnter={(event) => event.pointerType === "mouse" && setActive(index)}
              className="relative flex flex-col gap-1 py-5 transition-opacity duration-300 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:py-6"
              style={{ opacity: active === null || active === index ? 1 : 0.45 }}
            >
              <motion.div
                className="max-w-3xl"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.8, ease: revealEase }}
              >
                <p className="font-medium text-paper">{row.company}</p>
                <p className="text-mute-dark">{row.role}</p>
                {row.summary && (
                  <p className="mt-2 text-sm leading-relaxed text-paper/75">{row.summary}</p>
                )}
                {row.focus.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {row.focus.map((label) => (
                      <li
                        key={label}
                        className="rounded-full border border-line-dark px-2.5 py-0.5 text-xs text-paper/85"
                      >
                        {label}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
              <motion.p
                className="shrink-0 text-sm text-mute-dark sm:text-base sm:text-paper/85"
                initial={{ opacity: 0, x: 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={inView}
                transition={{ duration: 0.8, delay: 0.15, ease: revealEase }}
              >
                {row.period}
              </motion.p>
              {index < rows.length - 1 && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left bg-line-dark"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={inView}
                  transition={{ duration: 1.2, delay: 0.1, ease: revealEase }}
                />
              )}
            </li>
          ))}
        </ul>

        <AnimatePresence>
          {preview && (
            <motion.div
              key={preview}
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 z-10 hidden w-56 overflow-hidden rounded-lg shadow-2xl ring-2 ring-paper/80 md:block"
              style={{
                x: reduce ? x : springX,
                y: reduce ? y : springY,
                translateX: "-30%",
                translateY: "-60%",
              }}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25 }}
            >
              <Image src={preview} alt="" width={1600} height={1000} sizes="14rem" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
