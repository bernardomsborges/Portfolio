"use client";

import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import Image from "next/image";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = { id: string; title: string; description: string; image: string };

/** One service open at a time; the open one turns into a dark card with a tilted preview. */
export function ServicesAccordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <MotionConfig reducedMotion="user">
      <ul className="border-t border-ink/15">
        {items.map((item) => {
          const open = item.id === openId;
          const buttonId = `${baseId}-${item.id}-button`;
          const panelId = `${baseId}-${item.id}-panel`;

          return (
            <li
              key={item.id}
              className={cn(
                "relative border-b border-ink/15 transition-colors duration-500",
                open && "rounded-xl border-transparent bg-ink text-paper shadow-frame",
              )}
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex w-full items-center justify-between gap-6 px-4 py-6 text-left sm:px-6 sm:py-8"
                >
                  <span className="font-display text-2xl font-medium tracking-tight uppercase sm:text-4xl md:text-5xl">
                    {item.title}
                  </span>
                  {open ? (
                    <X aria-hidden="true" className="size-6 shrink-0 sm:size-7" />
                  ) : (
                    <ArrowUpRight aria-hidden="true" className="size-6 shrink-0 sm:size-7" />
                  )}
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-md px-4 pb-8 text-paper/75 sm:px-6">{item.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {open && (
                  <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0, rotate: 0, y: 20 }}
                    animate={{ opacity: 1, rotate: 7, y: 0 }}
                    exit={{ opacity: 0, rotate: 0, y: 20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-none absolute -top-10 right-24 hidden w-64 overflow-hidden rounded-lg shadow-2xl ring-4 ring-paper md:block lg:w-72"
                  >
                    <Image src={item.image} alt="" width={1600} height={1000} sizes="18rem" />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </MotionConfig>
  );
}
