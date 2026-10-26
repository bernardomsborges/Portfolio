"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState, type ReactNode } from "react";
import type { Project } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { filterProjects, format, type ProjectFilter } from "@/lib/portfolio";
import { ProjectCard } from "./ProjectCard";

export type ProjectBrowserLabels = {
  filters: Record<ProjectFilter, string>;
  filterLabel: string;
  empty: string;
  open: string;
  /** e.g. "{n} projects" — announced to screen readers when the filter changes. */
  results: string;
};

type ProjectBrowserProps = {
  projects: Project[];
  locale: Locale;
  labels: ProjectBrowserLabels;
  /** Rendered on the right of the filter bar, e.g. "View all work". */
  action?: ReactNode;
};

const filterOrder: ProjectFilter[] = ["all", "real", "exploration"];

export function ProjectBrowser({ projects, locale, labels, action }: ProjectBrowserProps) {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const visible = filterProjects(projects, filter);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={labels.filterLabel} className="flex flex-wrap gap-1">
          {filterOrder.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                filter === value ? "bg-ink text-paper" : "text-ink hover:bg-mist",
              )}
            >
              {labels.filters[value]}
            </button>
          ))}
        </div>
        {action}
      </div>

      <p aria-live="polite" className="sr-only">
        {format(labels.results, { n: visible.length })}
      </p>

      {visible.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-mist p-8 text-center text-mute">{labels.empty}</p>
      ) : (
        <motion.ul layout className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, index) => (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard
                  project={project}
                  locale={locale}
                  priority={index < 2}
                  labels={{ real: labels.filters.real, open: labels.open }}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </MotionConfig>
  );
}
