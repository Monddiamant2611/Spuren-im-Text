import { expect, test } from "@playwright/test";

async function openTraining(page: import("@playwright/test").Page) {
  await page.goto("/epik?__epik_test=1");
  await page.getByRole("button", { name: "Prüfmodus · Bereich wechseln" }).click();
  await page.getByRole("button", { name: "Lernkartei", exact: true }).click();
  await page.getByRole("button", { name: "Wissen testen" }).click();
}

async function completeChoice(page: import("@playwright/test").Page) {
  await page.locator(".epik-choice button").first().click();
  await page.getByRole("button", { name: /Antwort prüfen|Auswahl prüfen/ }).click();
  await expect(page.locator(".epik-feedback")).toBeVisible();
  await page.getByRole("button", { name: "Weiter" }).click();
}

test("Freitext bietet diagnostischen Ersthinweis und anschließenden Selbstcheck", async ({ page }) => {
  await openTraining(page);
  await page.getByLabel("Fachbegriff").fill("falscher Versuch");
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await expect(page.locator(".epik-feedback")).toContainText("Erster Hinweis");
  await page.getByRole("button", { name: "Zweiten Versuch prüfen" }).click();
  await expect(page.locator(".epik-feedback")).toContainText("Beispielantwort");
  await expect(page.locator(".epik-feedback")).toContainText("Selbstcheck");
});

test("Matching und Sortierung erklären konkrete Fehler", async ({ page }) => {
  await openTraining(page);
  await page.getByLabel("Fachbegriff").fill("falsch");
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await page.getByRole("button", { name: "Zweiten Versuch prüfen" }).click();
  await page.getByRole("button", { name: "Weiter" }).click();
  await completeChoice(page);
  const terms = page.locator(".epik-matching-terms button");
  const targets = page.locator(".epik-matching-targets button");
  for (let index = 0; index < await terms.count(); index += 1) { await terms.nth(index).click(); await targets.first().click(); }
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await expect(page.locator(".epik-feedback")).toContainText("passt nicht");
  await page.getByRole("button", { name: "Weiter" }).click();
  await completeChoice(page);
  await completeChoice(page);
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await expect(page.locator(".epik-feedback")).toContainText("erste unstimmige Übergang");
});

for (const viewport of [{ width: 1440, height: 900 }, { width: 1366, height: 768 }, { width: 768, height: 1024 }, { width: 390, height: 844 }]) test(`Feedback bleibt bei ${viewport.width}×${viewport.height} im Layout`, async ({ page }) => {
  await page.setViewportSize(viewport);
  await openTraining(page);
  await page.getByLabel("Fachbegriff").fill("falsch");
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await expect(page.locator(".epik-feedback")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});
