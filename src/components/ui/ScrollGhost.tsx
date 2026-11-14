"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Decorative ghost word that drifts sideways while its section scrolls past. */
export function ScrollGhost({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["9%", "-9%"]);

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      className={className}
      style={reduce ? undefined : { x }}
    >
      {children}
    </motion.span>
  );
}
