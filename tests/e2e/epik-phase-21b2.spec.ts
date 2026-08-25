import { expect, test } from "@playwright/test";

async function openCards(page: import("@playwright/test").Page) {
  await page.goto("/epik?__epik_test=1");
  await page.getByRole("button", { name: "Prüfmodus · Bereich wechseln" }).click();
  await page.getByRole("button", { name: "Lernkartei", exact: true }).click();
}

test("Wissen testen rendert alle elf Kategorien mit familiengebundenen Aufgaben", async ({ page }) => {
  await openCards(page);
  const categories = ["Grundlagen des Erzählens", "Erzählsituation", "Wahrnehmung & Nähe", "Darbietungsformen", "Zeitgestaltung", "Figurenanalyse", "Raumanalyse", "Handlung, Konflikt & Textaufbau", "Sprache & Stil", "Interpretation", "Analyse schreiben"];
  for (const category of categories) {
    await page.getByRole("button", { name: category, exact: true }).click();
    await page.getByRole("button", { name: "Wissen testen" }).click();
    const task = page.locator(".epik-card-test");
    await expect(task).toBeVisible();
    await expect(task.getByText(/Übung 1 von 6/)).toBeVisible();
    await expect(task.locator("h3")).not.toBeEmpty();
  }
});

test("Abschlusstest führt durch alle 30 Aufgaben bis zur fachlichen Auflösung", async ({ page }) => {
  await openCards(page);
  await page.getByRole("button", { name: "Abschlusstest" }).click();
  for (let index = 1; index <= 30; index += 1) {
    await expect(page.getByText(`Abschlusstest · Aufgabe ${index} von 30`)).toBeVisible();
    const task = page.locator(".epik-card-test");
    const textInput = task.getByRole("textbox");
    if (await textInput.count()) await textInput.fill("Beobachtung");
    else if (await task.locator(".epik-matching").count()) {
      const terms = task.locator(".epik-matching-terms button");
      const target = task.locator(".epik-matching-targets button").first();
      for (let termIndex = 0; termIndex < await terms.count(); termIndex += 1) {
        await terms.nth(termIndex).click();
        await target.click();
      }
    } else if (!(await task.locator(".epik-sort").count())) await task.locator(".epik-choice button").first().click();
    await task.getByRole("button", { name: "Antwort speichern" }).click();
    await expect(task.getByText("Antwort gespeichert", { exact: false })).toBeVisible();
    await task.getByRole("button", { name: "Weiter", exact: true }).click();
  }
  await expect(page.getByRole("heading", { name: "Abschlusstest ausgewertet" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Fachliche Auflösung" })).toBeVisible();
  await page.locator(".epik-test-review details summary").first().click();
  await expect(page.getByText("Ihre Antwort:", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Richtige Antwort:", { exact: true }).first()).toBeVisible();
});

for (const viewport of [{ width: 1440, height: 900 }, { width: 1366, height: 768 }, { width: 768, height: 1024 }, { width: 390, height: 844 }]) test(`Abschlusstest bleibt bei ${viewport.width}×${viewport.height} ohne horizontalen Überlauf`, async ({ page }) => {
  await page.setViewportSize(viewport);
  await openCards(page);
  await page.getByRole("button", { name: "Abschlusstest" }).click();
  await expect(page.getByText("Abschlusstest · Aufgabe 1 von 30")).toBeVisible();
  await expect(page.getByText(/Bereich:/)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});
