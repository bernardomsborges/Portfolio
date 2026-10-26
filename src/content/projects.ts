import type { Project } from "./types";

// TODO: replace with your real projects. Covers live in /public/projects.
export const projects: Project[] = [
  {
    slug: "atlas",
    title: { pt: "Atlas — Dashboard de Analytics", en: "Atlas — Analytics Dashboard" },
    summary: {
      pt: "Dashboard em tempo real para acompanhar métricas de produto.",
      en: "Real-time dashboard for tracking product metrics.",
    },
    body: {
      pt: [
        "Atlas reúne métricas de diferentes fontes em um único painel, com atualização em tempo real e filtros rápidos.",
        "O foco foi performance: gráficos renderizados sob demanda, cache agressivo e carregamento progressivo.",
      ],
      en: [
        "Atlas brings metrics from several sources into a single dashboard, with real-time updates and quick filters.",
        "The focus was performance: on-demand chart rendering, aggressive caching and progressive loading.",
      ],
    },
    category: "real",
    tags: ["Dashboard", "SaaS"],
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    year: 2025,
    role: { pt: "Full-stack", en: "Full-stack" },
    client: "Empresa Atual",
    cover: "/projects/atlas.svg",
    links: { live: "https://example.com" },
    featured: true,
  },
  {
    slug: "lumen",
    title: { pt: "Lumen — Landing Page de Produto", en: "Lumen — Product Landing Page" },
    summary: {
      pt: "Landing page com animações e foco em conversão.",
      en: "Animated, conversion-focused landing page.",
    },
    body: {
      pt: [
        "Landing page para o lançamento de um app, com narrativa visual e animações guiadas pelo scroll.",
      ],
      en: [
        "Launch landing page for an app, with visual storytelling and scroll-driven animations.",
      ],
    },
    category: "real",
    tags: ["Landing Page", "Motion"],
    stack: ["Astro", "Tailwind CSS"],
    year: 2024,
    role: { pt: "Front-end", en: "Front-end" },
    client: "Studio Exemplo",
    cover: "/projects/lumen.svg",
    featured: true,
  },
  {
    slug: "orbit",
    title: { pt: "Orbit — App de Finanças", en: "Orbit — Finance App" },
    summary: {
      pt: "Conceito de app mobile para controle de gastos.",
      en: "Mobile app concept for expense tracking.",
    },
    body: {
      pt: [
        "Exploração de um app de finanças pessoais com foco em hábitos e visualizações simples.",
      ],
      en: ["Exploration of a personal finance app focused on habits and simple visualizations."],
    },
    category: "exploration",
    tags: ["Mobile", "Fintech"],
    stack: ["React Native", "Expo"],
    year: 2024,
    role: { pt: "Design & desenvolvimento", en: "Design & development" },
    cover: "/projects/orbit.svg",
    links: { repo: "https://github.com/" },
    featured: true,
  },
  {
    slug: "pulse",
    title: { pt: "Pulse — Assistente com IA", en: "Pulse — AI Assistant" },
    summary: {
      pt: "Assistente que resume reuniões e cria tarefas automaticamente.",
      en: "Assistant that summarizes meetings and creates tasks automatically.",
    },
    body: {
      pt: [
        "Experimento com LLMs para transformar transcrições de reuniões em resumos e tarefas acionáveis.",
      ],
      en: [
        "Experiment using LLMs to turn meeting transcripts into summaries and actionable tasks.",
      ],
    },
    category: "exploration",
    tags: ["IA", "Produtividade"],
    stack: ["Python", "FastAPI", "Claude API"],
    year: 2025,
    role: { pt: "Full-stack", en: "Full-stack" },
    cover: "/projects/pulse.svg",
    links: { repo: "https://github.com/" },
    featured: true,
  },
  {
    slug: "nimbus",
    title: { pt: "Nimbus — Plataforma de Reservas", en: "Nimbus — Booking Platform" },
    summary: {
      pt: "Sistema de reservas com pagamentos e painel administrativo.",
      en: "Booking system with payments and an admin panel.",
    },
    body: {
      pt: ["Plataforma completa de reservas com calendário, pagamentos online e notificações."],
      en: ["Full booking platform with calendar, online payments and notifications."],
    },
    category: "real",
    tags: ["Web App", "Pagamentos"],
    stack: ["Node.js", "React", "Stripe"],
    year: 2023,
    role: { pt: "Back-end", en: "Back-end" },
    client: "Agência Exemplo",
    cover: "/projects/nimbus.svg",
  },
  {
    slug: "glyph",
    title: { pt: "Glyph — Design System", en: "Glyph — Design System" },
    summary: {
      pt: "Biblioteca de componentes acessíveis e documentados.",
      en: "Library of accessible, documented components.",
    },
    body: {
      pt: [
        "Design system open source com tokens, componentes acessíveis e documentação interativa.",
      ],
      en: ["Open-source design system with tokens, accessible components and interactive docs."],
    },
    category: "exploration",
    tags: ["Design System", "Open Source"],
    stack: ["React", "Storybook"],
    year: 2023,
    role: { pt: "Front-end", en: "Front-end" },
    cover: "/projects/glyph.svg",
    links: { repo: "https://github.com/" },
  },
];
