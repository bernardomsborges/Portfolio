"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Image from "next/image";
import { useState, type PointerEvent } from "react";

export type ExperienceRow = {
  company: string;
  role: string;
  period: string;
  image?: string;
};

/** Experience rows; on desktop, hovering a row shows its image following the cursor. */
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
    <div className="relative">
      <ul onPointerMove={onPointerMove} onPointerLeave={() => setActive(null)}>
        {rows.map((row, index) => (
          <li
            key={`${row.company}-${row.period}`}
            onPointerEnter={(event) => event.pointerType === "mouse" && setActive(index)}
            className="flex flex-col gap-1 border-b border-line-dark py-5 transition-opacity duration-300 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-6"
            style={{ opacity: active === null || active === index ? 1 : 0.45 }}
          >
            <div>
              <p className="font-medium text-paper">{row.company}</p>
              <p className="text-mute-dark">{row.role}</p>
            </div>
            <p className="text-sm text-mute-dark sm:text-base sm:text-paper/85">{row.period}</p>
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
  );
}
