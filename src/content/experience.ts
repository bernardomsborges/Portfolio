import type { Experience } from "./types";

// TODO: replace with your real experience (most recent first).
export const experience: Experience[] = [
  {
    company: "Empresa Atual",
    role: { pt: "Desenvolvedor Full-Stack", en: "Full-Stack Developer" },
    start: "2024-03",
    image: "/projects/atlas.svg",
  },
  {
    company: "Studio Exemplo",
    role: { pt: "Desenvolvedor Front-end", en: "Front-end Developer" },
    start: "2022-01",
    end: "2024-02",
    image: "/projects/lumen.svg",
  },
  {
    company: "Agência Exemplo",
    role: { pt: "Desenvolvedor Júnior", en: "Junior Developer" },
    start: "2020-06",
    end: "2021-12",
    image: "/projects/orbit.svg",
  },
  {
    company: "Universidade Exemplo",
    role: { pt: "Estagiário de Desenvolvimento", en: "Software Intern" },
    start: "2019-08",
    end: "2020-05",
    image: "/projects/pulse.svg",
  },
];
