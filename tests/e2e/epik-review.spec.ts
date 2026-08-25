import { expect, test, type Page } from "@playwright/test";

const emptyProgress = { version: 1, completedChapters: [] };

async function openManipulatedUrl(page: Page, query: string) {
  await page.addInitScript((progress) => localStorage.setItem("epik.learningProgress.v1", JSON.stringify(progress)), emptyProgress);
  await page.goto(`/epik?${query}`);
  await expect(page.getByRole("button", { name: /Prüfmodus|Review|QA/i })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "2 Erzählinstanz und Perspektive" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /9 Von der Analyse/ })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /Abschlussfall/ })).toHaveCount(0);
  await expect(page.getByText("Erzählen verstehen · Lernschritt 1 von 5")).toBeVisible();
  await expect(page.locator(".epik-path-progress .is-current")).toHaveText("1");
}

for (const query of ["review=1", "target=chapter-9", "target=chapter-2&step=5", "step=5", "target=final-case", "target=final-case&phase=7"]) {
  test(`${query} umgeht bei leerem Fortschritt keine Freischaltung`, async ({ page }) => {
    await openManipulatedUrl(page, query);
    expect(await page.evaluate(() => localStorage.getItem("epik.learningProgress.v1"))).toBe(JSON.stringify(emptyProgress));
  });
}

test("regulär freigeschaltete Bereiche bleiben wiederholbar", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("epik.learningProgress.v1", JSON.stringify({ version: 1, completedChapters: [1] })));
  await page.goto("/epik");
  await page.getByRole("button", { name: "Direkt starten" }).click();
  await expect(page.getByRole("button", { name: "2 Erzählinstanz und Perspektive" })).toBeVisible();
  await page.getByRole("button", { name: "1 Erzählen verstehen", exact: true }).click();
  await page.getByRole("button", { name: "Direkt starten" }).click();
  await expect(page.getByText("Erzählen verstehen · Lernschritt 1 von 5")).toBeVisible();
  await expect(page.locator(".epik-path-progress .is-current")).toHaveText("1");
});

test("Level-Vorbereitung, Begriffswiederholung und Glossar bleiben erreichbar", async ({ page }) => {
  await page.goto("/epik");
  const preparation = page.getByRole("dialog", { name: "Begriffe kurz wiederholen" });
  await preparation.getByRole("button", { name: "Begriffe wiederholen", exact: true }).click();
  await preparation.getByRole("button", { name: "Erzählte Welt", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Erzählte Welt" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Erzählte Welt" })).toHaveCount(0);
  await page.getByRole("button", { name: "Direkt starten" }).click();
  await expect(page.getByText("Erzählen verstehen · Lernschritt 1 von 5")).toBeVisible();
});

test("manipulierte URL bleibt auf dem Smartphone ohne Überlauf", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openManipulatedUrl(page, "review=1&target=final-case&step=7");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});
