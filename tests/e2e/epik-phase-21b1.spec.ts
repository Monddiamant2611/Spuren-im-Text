import { expect, test } from "@playwright/test";

async function openCards(page: import("@playwright/test").Page) {
  await page.goto("/epik?__epik_test=1");
  await page.getByRole("button", { name: "Prüfmodus · Bereich wechseln" }).click();
  await page.getByRole("button", { name: "Lernkartei", exact: true }).click();
}

test("Lernkartei zeigt Familien statt 88 gleichrangiger Einzelkarten", async ({ page }) => {
  await openCards(page);
  await expect(page.getByText("1 Begriffsfamilien")).toBeVisible();
  await expect(page.locator(".epik-family-card")).toHaveCount(1);
  await page.getByRole("button", { name: /Wer gehört zu welcher Ebene/ }).click();
  for (const term of ["Realer Autor", "Realer Leser", "Erzählinstanz", "Figur", "Erzählte Welt"]) await expect(page.getByRole("button", { name: term, exact: true })).toBeVisible();
  await page.getByRole("button", { name: /Vertiefung anzeigen/ }).click();
  await page.getByRole("button", { name: "Impliziter Leser", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Impliziter Leser" })).toContainText("Leserrolle");
});

test("Erzählsituation trennt Achsen und ordnet Spezialbegriffe unter", async ({ page }) => {
  await openCards(page); await page.getByRole("button", { name: "Erzählsituation" }).click();
  await expect(page.locator(".epik-family-card")).toHaveCount(6);
  await page.getByRole("button", { name: /Wie ist die Vermittlung des Wissens organisiert/ }).click();
  for (const term of ["auktorial", "personal", "neutral"]) await expect(page.getByRole("button", { name: term, exact: true })).toBeVisible();
  await page.getByRole("button", { name: /Vertiefung anzeigen/ }).click();
  await expect(page.getByRole("button", { name: "personale Multiperspektive", exact: true })).toBeVisible();
  await page.getByRole("button", { name: /Welches Ich erlebt/ }).click();
  await expect(page.getByRole("button", { name: "Erlebendes Ich", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Erzählendes Ich", exact: true })).toBeVisible();
});

for (const viewport of [{ width: 1440, height: 900 }, { width: 1366, height: 768 }, { width: 768, height: 1024 }, { width: 390, height: 844 }]) test(`Familienkarten bleiben bei ${viewport.width}×${viewport.height} bedienbar`, async ({ page }) => {
  await page.setViewportSize(viewport); await openCards(page);
  await page.getByRole("button", { name: "Zeitgestaltung", exact: true }).click();
  await page.getByRole("button", { name: /Wie ausführlich wird/ }).click();
  await expect(page.getByRole("button", { name: "Zeitdeckung", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const body = page.locator('[data-family-id="dauer"] .epik-family-card__body');
  expect(await body.evaluate((element) => element.scrollHeight >= element.clientHeight)).toBe(true);
});

test("Level-Vorbereitung und Wissen testen bleiben funktionsfähig", async ({ page }) => {
  await page.goto("/epik");
  const preparation = page.getByRole("dialog", { name: "Begriffe kurz wiederholen" });
  await preparation.getByRole("button", { name: "Begriffe wiederholen" }).click();
  await preparation.getByRole("button", { name: "Erzählinstanz", exact: true }).click();
  await page.getByRole("dialog", { name: "Erzählinstanz" }).getByRole("button", { name: "In der Lernkartei ansehen" }).click();
  await expect(page.getByRole("button", { name: /Wer gehört zu welcher Ebene/ })).toBeVisible();
  await expect(page.locator('[data-family-id="erzaehlebenen"]')).toHaveClass(/is-open/);
  await expect(page.locator(".epik-family-terms .is-focused").getByRole("button", { name: "Erzählinstanz", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Wissen testen" }).click();
  await expect(page.locator(".epik-card-test")).toBeVisible();
});
