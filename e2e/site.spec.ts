import { expect, test } from "@playwright/test";

test.describe("routing & i18n", () => {
  test("redirects / to the preferred language", async ({ browser }) => {
    const context = await browser.newContext({ locale: "en-US" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en-US");
    await context.close();
  });

  test("defaults to Portuguese", async ({ browser }) => {
    const context = await browser.newContext({ locale: "de-DE" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/pt$/);
    await context.close();
  });

  test("unknown routes return 404", async ({ page }) => {
    const res = await page.goto("/pt/projects/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Página não encontrada" })).toBeVisible();

    const nested = await page.goto("/en/nothing/here");
    expect(nested?.status()).toBe(404);
  });

  test("exposes SEO metadata", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveTitle(/Software Developer/);
    await expect(page.locator('link[rel="alternate"][hreflang="pt-BR"]')).toHaveAttribute(
      "href",
      /\/pt$/,
    );
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  });
});

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
  });

  test("renders every section", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const name of ["Selected work", "Services", "Experience", "Have a project in mind?"]) {
      await expect(page.getByRole("heading", { name, exact: true })).toBeAttached();
    }
  });

  test("filters selected work", async ({ page }) => {
    const work = page.locator("#work");
    await work.getByRole("button", { name: "Real project" }).click();
    await expect(work.getByRole("article")).toHaveCount(2);
    await work.getByRole("button", { name: "All" }).click();
    await expect(work.getByRole("article")).toHaveCount(4);
  });

  test("service accordion opens one item at a time", async ({ page }) => {
    const first = page.getByRole("button", { name: "Web Development" });
    const second = page.getByRole("button", { name: "Back-end & APIs" });
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await second.click();
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(first).toHaveAttribute("aria-expanded", "false");
  });

  test("opens a project and switches language on the same page", async ({ page }) => {
    await page.locator("#work").getByRole("link", { name: /Atlas/ }).click();
    await expect(page).toHaveURL(/\/en\/projects\/atlas$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Analytics Dashboard");

    const menu = page.getByRole("button", { name: "Open menu" });
    if (await menu.isVisible()) await menu.click();
    await page
      .getByRole("navigation", { name: "Switch language" })
      .getByRole("link", { name: "pt" })
      .click();
    await expect(page).toHaveURL(/\/pt\/projects\/atlas$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Dashboard de Analytics");
  });

  test("has no horizontal overflow", async ({ page }) => {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test("mobile menu navigates to a section", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/pt");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("navigation", { name: "Navegação principal" })
    .getByRole("link", { name: /Contato/ })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByRole("button", { name: "Abrir menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});
