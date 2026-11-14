"use client";

import { motion, useReducedMotion } from "motion/react";
import { revealEase } from "./Reveal";

type RiseTextProps = {
  text: string;
  /** Decorative text glued to the first word (hidden from screen readers), e.g. "/". */
  prefix?: string;
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
};

/** Words rise one by one out of a mask when scrolled into view. */
export function RiseText({ text, prefix, delay = 0, stagger = 0.08 }: RiseTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return words.map((word, i) => {
    const content = (
      <>
        {i === 0 && prefix && <span aria-hidden="true">{prefix}</span>}
        {word}
      </>
    );
    return (
      <span key={i}>
        {i > 0 && " "}
        {reduce ? (
          content
        ) : (
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, delay: delay + i * stagger, ease: revealEase }}
            >
              {content}
            </motion.span>
          </span>
        )}
      </span>
    );
  });
}
