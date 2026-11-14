import { autogestor } from "./case-studies/autogestor";
import { communitySplit } from "./case-studies/community-split";
import { observatorio } from "./case-studies/observatorio";
import { sketchExecucaoOrcamentaria } from "./case-studies/sketch-execucao-orcamentaria";
import type { Project } from "./types";

// Each case study lives in ./case-studies; its images go in /public/projects/<slug>.
export const projects: Project[] = [
  communitySplit,
  autogestor,
  observatorio,
  sketchExecucaoOrcamentaria,
];
