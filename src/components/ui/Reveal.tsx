"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "motion/react";
import type { ReactNode } from "react";

/** Where an element comes from as it scrolls into view. */
export type RevealFrom = "up" | "down" | "left" | "right" | "scale" | "card" | "zoom" | "fade";

const starts: Record<RevealFrom, TargetAndTransition> = {
  up: { opacity: 0, y: 40 },
  down: { opacity: 0, y: -40 },
  left: { opacity: 0, x: -64 },
  right: { opacity: 0, x: 64 },
  scale: { opacity: 0, scale: 0.85 },
  // Section cards: rise and settle, like a card being placed on the stack.
  card: { opacity: 0, y: 80, scale: 0.96 },
  // Images: start zoomed in and settle (Ken Burns), already visible.
  zoom: { scale: 1.18 },
  fade: { opacity: 0 },
};

const end: TargetAndTransition = { opacity: 1, x: 0, y: 0, scale: 1 };

export const revealEase = [0.22, 1, 0.36, 1] as const;

type Tag = "div" | "li" | "span" | "p";

type RevealProps = {
  children: ReactNode;
  from?: RevealFrom;
  delay?: number;
  duration?: number;
  className?: string;
  as?: Tag;
};

/** Animates content in the first time it scrolls into view. Static with reduced motion. */
export function Reveal({
  children,
  from = "up",
  delay = 0,
  duration = 0.8,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const Motion = motion[as];
  return (
    <Motion
      className={className}
      initial={starts[from]}
      whileInView={end}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: revealEase }}
    >
      {children}
    </Motion>
  );
}
