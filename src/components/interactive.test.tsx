import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { projects } from "@/content/projects";
import en from "@/i18n/dictionaries/en";
import { LocaleSwitcher, switchLocalePath } from "./layout/LocaleSwitcher";
import { MobileMenu } from "./layout/MobileMenu";
import { ServicesAccordion } from "./sections/ServicesAccordion";
import { projectBrowserLabels } from "./work/labels";
import { ProjectBrowser } from "./work/ProjectBrowser";

// Render next/image as a plain <img> in jsdom, dropping Next-only props.
vi.mock("next/image", () => ({
  default: (props: ComponentProps<"img"> & { priority?: boolean; fill?: boolean }) => {
    const imgProps = { ...props };
    delete imgProps.priority;
    delete imgProps.fill;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt="" {...imgProps} />;
  },
}));

vi.mock("next/navigation", () => ({ usePathname: () => "/pt/projects/atlas" }));

describe("ProjectBrowser", () => {
  const setup = () =>
    render(<ProjectBrowser projects={projects} locale="en" labels={projectBrowserLabels(en)} />);

  it("shows every project by default", () => {
    setup();
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
  });

  it("filters by category and announces the count", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Exploration" }));
    const expected = projects.filter((p) => p.category === "exploration");

    expect(screen.getByRole("button", { name: "Exploration" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText(`Projects shown: ${expected.length}`)).toBeInTheDocument();
    for (const p of expected) {
      expect(screen.getByRole("link", { name: new RegExp(p.title.en) })).toHaveAttribute(
        "href",
        `/en/projects/${p.slug}`,
      );
    }
  });
});

describe("ServicesAccordion", () => {
  const items = [
    { id: "a", title: "Alpha", description: "Alpha text", image: "/a.svg" },
    { id: "b", title: "Beta", description: "Beta text", image: "/b.svg" },
  ];

  it("opens the first item and keeps only one open at a time", async () => {
    render(<ServicesAccordion items={items} />);
    const alpha = screen.getByRole("button", { name: "Alpha" });
    const beta = screen.getByRole("button", { name: "Beta" });

    expect(alpha).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Alpha" })).toHaveTextContent("Alpha text");

    await userEvent.click(beta);
    expect(beta).toHaveAttribute("aria-expanded", "true");
    expect(alpha).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the open item when clicked again", async () => {
    render(<ServicesAccordion items={items} />);
    const alpha = screen.getByRole("button", { name: "Alpha" });
    await userEvent.click(alpha);
    expect(alpha).toHaveAttribute("aria-expanded", "false");
  });
});

describe("MobileMenu", () => {
  it("toggles with the button, closes on Escape and after following a link", async () => {
    render(
      <MobileMenu
        items={[{ href: "/pt#work", label: "Projetos", count: "6" }]}
        openLabel="Abrir menu"
        closeLabel="Fechar menu"
        navLabel="Navegação"
        footer={null}
      />,
    );
    const toggle = screen.getByRole("button", { name: "Abrir menu" });
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /Projetos/ })).toBeVisible();

    await userEvent.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(toggle);
    await userEvent.click(screen.getByRole("link", { name: /Projetos/ }));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});

describe("LocaleSwitcher", () => {
  it("keeps the current page when switching language", () => {
    render(<LocaleSwitcher current="pt" label="Idioma" />);
    const nav = screen.getByRole("navigation", { name: "Idioma" });
    expect(within(nav).getByRole("link", { name: "en" })).toHaveAttribute(
      "href",
      "/en/projects/atlas",
    );
    expect(within(nav).getByRole("link", { name: "pt" })).toHaveAttribute("aria-current", "true");
  });

  it("switchLocalePath swaps only the first segment", () => {
    expect(switchLocalePath("/pt", "en")).toBe("/en");
    expect(switchLocalePath("/pt/projects", "en")).toBe("/en/projects");
    expect(switchLocalePath("/en/projects/atlas", "pt")).toBe("/pt/projects/atlas");
  });
});
