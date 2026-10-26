import type { Service } from "./types";

export const services: Service[] = [
  {
    id: "web",
    title: { pt: "Desenvolvimento Web", en: "Web Development" },
    description: {
      pt: "Sites e aplicações web rápidos, acessíveis e prontos para escalar, do protótipo à produção.",
      en: "Fast, accessible web apps and sites ready to scale, from prototype to production.",
    },
    image: "/projects/atlas.svg",
  },
  {
    id: "frontend",
    title: { pt: "Front-end & UI", en: "Front-end & UI" },
    description: {
      pt: "Interfaces bem acabadas e design systems consistentes para dashboards, produtos e landing pages.",
      en: "Polished interfaces and consistent design systems for dashboards, products and landing pages.",
    },
    image: "/projects/glyph.svg",
  },
  {
    id: "backend",
    title: { pt: "Back-end & APIs", en: "Back-end & APIs" },
    description: {
      pt: "APIs, integrações e bancos de dados confiáveis, com testes e observabilidade desde o início.",
      en: "Reliable APIs, integrations and databases, with tests and observability from day one.",
    },
    image: "/projects/nimbus.svg",
  },
  {
    id: "ai",
    title: { pt: "Automação & IA", en: "Automation & AI" },
    description: {
      pt: "Fluxos automatizados e funcionalidades com IA que economizam tempo e resolvem problemas reais.",
      en: "Automated workflows and AI-powered features that save time and solve real problems.",
    },
    image: "/projects/pulse.svg",
  },
];
