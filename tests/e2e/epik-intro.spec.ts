import { expect, test, type Page } from "@playwright/test";

const progressKey = "epik.learningProgress.v1";

async function openFreshIntro(page: Page) {
  await page.goto("/epik");
  await expect(page.getByRole("heading", { name: "Epische Werke entschlüsseln" })).toBeVisible();
}

test("neuer Fortschritt zeigt das Intro einmal und öffnet danach die reguläre Werkstatt", async ({ page }) => {
  await openFreshIntro(page);
  await expect(page.getByRole("heading", { name: "Ihre Mission" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "So funktioniert das Spiel" })).toBeVisible();
  await expect(page.getByText("Beobachtung", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: /Prüfmodus|Review|Abschlussfall|Bereich wechseln/i })).toHaveCount(0);
  await page.getByRole("button", { name: "Analysewerkstatt betreten" }).click();
  await expect(page.getByRole("heading", { name: "Analysewerkstatt Epik" })).toBeVisible();
  await expect(page.getByRole("dialog", { name: "Begriffe kurz wiederholen" })).toBeVisible();
  expect(JSON.parse((await page.evaluate((key) => localStorage.getItem(key), progressKey))!)).toEqual({ version: 1, completedChapters: [], introSeen: true });
  await page.reload();
  await expect(page.getByRole("heading", { name: "Epische Werke entschlüsseln" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Analysewerkstatt Epik" })).toBeVisible();
});

test("manuelles Wiederöffnen und Schließen verändert den Fortschritt nicht", async ({ page }) => {
  await page.addInitScript((key) => localStorage.setItem(key, JSON.stringify({ version: 1, completedChapters: [1, 2], introSeen: true })), progressKey);
  await page.goto("/epik");
  await page.getByRole("button", { name: "Direkt starten" }).click();
  const before = await page.evaluate((key) => localStorage.getItem(key), progressKey);
  await page.getByRole("button", { name: "So funktioniert das Spiel" }).click();
  await expect(page.getByRole("heading", { name: "Epische Werke entschlüsseln" })).toBeVisible();
  await page.getByRole("button", { name: "Analysewerkstatt betreten" }).click();
  expect(await page.evaluate((key) => localStorage.getItem(key), progressKey)).toBe(before);
  await expect(page.getByRole("button", { name: "3 Nähe, Distanz und Wahrnehmung" })).toBeVisible();
});

test("vollständiger Reset zeigt das Intro erneut", async ({ page }) => {
  await page.addInitScript((key) => localStorage.setItem(key, JSON.stringify({ version: 1, completedChapters: [1], introSeen: true })), progressKey);
  await page.goto("/epik");
  await page.getByRole("button", { name: "Direkt starten" }).click();
  await page.getByRole("button", { name: "Lernfortschritt zurücksetzen" }).click();
  await page.getByRole("button", { name: "Fortschritt zurücksetzen", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Epische Werke entschlüsseln" })).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), progressKey)).toBeNull();
});

for (const viewport of [{ width: 1440, height: 900 }, { width: 1366, height: 768 }, { width: 768, height: 1024 }, { width: 390, height: 844 }]) {
  test(`Intro bleibt bei ${viewport.width}×${viewport.height} vollständig und ohne horizontalen Überlauf`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await openFreshIntro(page);
    const enter = page.getByRole("button", { name: "Analysewerkstatt betreten" });
    await enter.scrollIntoViewIfNeeded();
    await expect(enter).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });
}
