import { expect, test, type Locator, type Page } from "@playwright/test";

test.use({ actionTimeout: 15_000 });
const completed = { version: 1, completedChapters: [1, 2, 3, 4, 5, 6, 7, 8, 9] };

async function startPrepared(page: Page) { await page.getByRole("button", { name: "Direkt starten" }).click(); }
async function unlockAll(page: Page) { await page.goto("/epik"); await page.evaluate((progress) => localStorage.setItem("epik.learningProgress.v1", JSON.stringify(progress)), completed); await page.reload(); await page.waitForTimeout(1_000); await startPrepared(page); }
async function expectActuallySticky(page: Page, card: Locator) { await page.evaluate(() => window.scrollTo(0, 0)); await card.evaluate((element) => element.scrollIntoView({ block: "start" })); const first = await card.evaluate((element) => element.getBoundingClientRect().top); await page.evaluate(() => window.scrollBy(0, 250)); const second = await card.evaluate((element) => element.getBoundingClientRect().top); expect(first).toBeGreaterThanOrEqual(0); expect(second).toBeGreaterThanOrEqual(0); expect(second).toBeLessThan(80); await expect(card).toBeVisible(); }
async function chooseTextuallySupportedAnswer(group: Locator) { const labels = await group.getByRole("button").allTextContents(); for (const label of labels) { const option = group.getByRole("button", { name: label, exact: true }); await option.click(); await expect(option).toHaveClass(/is-selected/); const response = group.locator("small"); await expect(response).toBeVisible(); if ((await response.textContent())?.startsWith("Richtig")) return; } throw new Error("Keine textnahe Antwortoption gefunden."); }

test("Bereich 1 hält den Übungstext beim echten Scrollen sichtbar", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await page.goto("/epik"); await page.getByRole("button", { name: "Analysewerkstatt betreten" }).click(); await page.waitForTimeout(1_000); await startPrepared(page);
  await page.getByLabel("Das Grundgeschehen bleibt ähnlich.").check(); await page.getByLabel("Nicht jede Fassung nennt dieselben Einzelheiten.").check(); await page.getByLabel("Die Darstellung kann unterschiedlich wirken.").check(); await page.getByLabel("Eine Fassung kann Informationen ergänzen, die eine andere auslässt.").check(); await page.getByLabel("Ein vergleichbares Geschehen bedeutet nicht denselben Informationsumfang.").check(); await page.getByRole("button", { name: "Beobachtungen prüfen" }).click();
  await expectActuallySticky(page, page.locator(".epik-sticky-text"));
});

test("ein mittlerer Bereich hält den Übungstext beim echten Scrollen sichtbar", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await unlockAll(page); await page.getByRole("button", { name: "5 Zeitgestaltung", exact: true }).click(); await startPrepared(page);
  await page.getByRole("button", { name: "A folgt der zeitlichen Abfolge; B beginnt später und macht das frühere Ereignis rückblickend bedeutsam." }).click(); await page.getByRole("button", { name: "Zeitordnung sichern" }).click();
  await expectActuallySticky(page, page.locator(".epik-sticky-text"));
});

test("Bereich 9 hält den Übungstext beim echten Scrollen sichtbar", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await unlockAll(page); await page.getByRole("button", { name: "9 Von der Analyse zur Interpretation", exact: true }).click(); await startPrepared(page);
  for (const name of ["Textbeobachtung", "Analyse", "Deutung", "Überinterpretation"]) await chooseTextuallySupportedAnswer(page.getByRole("group", { name }));
  const finish = page.getByRole("button", { name: "Aussageebenen sichern" }); await expect(finish).toBeEnabled(); await finish.click(); await expectActuallySticky(page, page.locator(".epik-sticky-text"));
});

test("der Abschlussfall hält seine Textreferenz beim echten Scrollen sichtbar", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await unlockAll(page); await page.getByRole("button", { name: "✓ Abschlussfall", exact: true }).click();
  await expectActuallySticky(page, page.locator(".epik-sticky-text"));
});
