import { expect, test } from "@playwright/test";

test.use({ actionTimeout: 15_000 });

for (const viewport of [{ width: 1440, height: 900 }, { width: 768, height: 1024 }]) {
  test(`lange Begriffsfamilie bleibt bei ${viewport.width}×${viewport.height} im Layout`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/epik");
    await page.getByRole("button", { name: "Analysewerkstatt betreten" }).click();
    await page.waitForTimeout(1_000);
    await page.getByRole("button", { name: "Direkt starten" }).click();
    await page.getByRole("button", { name: "Zur Lernkartei", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Lernkartei" })).toBeVisible();
    const firstCard = page.locator(".epik-family-card").first();
    await firstCard.locator(".epik-family-card__summary").click();
    await expect(firstCard.getByRole("button", { name: "Konnte ich" }).first()).toBeVisible();
    await expect(firstCard.getByRole("button", { name: "Noch üben" }).first()).toBeVisible();
    const contained = await firstCard.evaluate((card) => {
      const cardBox = card.getBoundingClientRect();
      const ratingBox = card.querySelector(".epik-family-rating")!.getBoundingClientRect();
      return ratingBox.bottom <= cardBox.bottom + 1 && card.scrollWidth <= card.clientWidth;
    });
    expect(contained).toBe(true);
    await page.getByRole("button", { name: "Wissen testen" }).click();
    await expect(page.getByText(/Übung 1 von 6/)).toBeVisible();
    await page.getByRole("button", { name: "Abschlusstest" }).click();
    await expect(page.getByText("Alle Analysebereiche gemischt")).toBeVisible();
    await expect(page.getByText(/Aufgabe 1 von 30/)).toBeVisible();
  });
}

test("Smartphone hält die einklappbare Textreferenz erreichbar", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/epik");
  await page.getByRole("button", { name: "Analysewerkstatt betreten" }).click();
  await page.waitForTimeout(1_000);
  await page.getByRole("button", { name: "Direkt starten" }).click();
  await page.getByLabel("Das Grundgeschehen bleibt ähnlich.").check();
  await page.getByLabel("Nicht jede Fassung nennt dieselben Einzelheiten.").check();
  await page.getByLabel("Die Darstellung kann unterschiedlich wirken.").check();
  await page.getByLabel("Eine Fassung kann Informationen ergänzen, die eine andere auslässt.").check();
  await page.getByLabel("Ein vergleichbares Geschehen bedeutet nicht denselben Informationsumfang.").check();
  await page.getByRole("button", { name: "Beobachtungen prüfen" }).click();
  const toggle = page.getByRole("button", { name: "Text anzeigen" });
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator(".epik-sticky-text .epik-text-body")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.getByRole("button", { name: "Text schließen" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".epik-sticky-text .epik-text-body")).toBeHidden();
});
