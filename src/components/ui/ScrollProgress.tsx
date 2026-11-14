"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Thin bar at the top of the window showing how far down the page you are. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-ink"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  );
}
