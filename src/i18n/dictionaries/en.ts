import type { Dictionary } from "./pt";

const en = {
  meta: {
    title: "Portfolio",
    description:
      "Software portfolio: web products, interfaces and systems built with a focus on clarity, performance and great experience.",
  },
  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    socialLinks: "Social links",
    switchLanguage: "Switch language",
    opensInNewTab: "(opens in a new tab)",
  },
  status: { available: "Available for new projects" },
  nav: {
    work: "Work",
    services: "Services",
    experience: "Experience",
    contact: "Contact",
    cta: "Let's talk",
  },
  hero: {
    cta: "Let's collaborate",
  },
  work: {
    ghost: "Portfolio",
    title: "Selected work",
    allTitle: "All work",
    allDescription: "Everything I've built — from real products to explorations and experiments.",
    filters: { all: "All", real: "Real project", exploration: "Exploration" },
    filterLabel: "Filter projects",
    viewAll: "View all work",
    empty: "No projects in this category yet.",
    results: "Projects shown: {n}",
    openProject: "Open project",
  },
  project: {
    back: "Back to work",
    year: "Year",
    role: "Role",
    client: "Client",
    stack: "Stack",
    live: "View live",
    repo: "Source code",
    next: "Next project",
  },
  services: {
    title: "Services",
  },
  experience: {
    ghost: "Experience",
    title: "Experience",
    years: "{n}+ years of experience",
    present: "Now",
  },
  contact: {
    title: "Have a project in mind?",
    text: "Together, we can create something clear and impactful. Let's collaborate to bring your ideas to life in a way that resonates with everyone.",
    cta: "Contact me",
  },
  footer: {
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
  notFound: {
    title: "Page not found",
    text: "The page you are looking for doesn't exist or has been moved.",
    cta: "Go home",
  },
} satisfies Dictionary;

export default en;
