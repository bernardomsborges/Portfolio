import type { Dictionary } from "@/i18n/dictionaries/pt";
import type { ProjectBrowserLabels } from "./ProjectBrowser";

export function projectBrowserLabels(dict: Dictionary): ProjectBrowserLabels {
  return {
    filters: dict.work.filters,
    filterLabel: dict.work.filterLabel,
    empty: dict.work.empty,
    open: dict.work.openProject,
    results: dict.work.results,
  };
}
