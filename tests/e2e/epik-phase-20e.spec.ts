import { expect, test, type Page } from "@playwright/test";

async function reviewStep(page: Page, area: number, step: number) { await page.getByRole("button", { name: "Prüfmodus · Bereich wechseln" }).click(); await page.getByLabel(`Lernschritte Bereich ${area}`).getByRole("button", { name: `Schritt ${step}`, exact: true }).click(); }
async function fixedSeed(page: Page, seed: number) { await page.addInitScript((value) => { Object.defineProperty(globalThis.crypto, "getRandomValues", { configurable: true, value: (array: Uint32Array) => { array.fill(value); return array; } }); }, seed); }

test("Der fremde Balkon nennt die konkrete Wissensfrage und hält Lösungshinweise zurück", async ({ page }) => {
  await fixedSeed(page, 3); await page.goto("/epik?__epik_test=1"); await reviewStep(page, 2, 2);
  await expect(page.getByRole("heading", { name: "Der fremde Balkon" })).toBeVisible();
  const question = page.getByRole("group", { name: "Weiß das erzählende Ich sicher, warum sein Vater damals nicht widersprochen hat?" });
  await expect(question).toBeVisible(); await expect(question.getByRole("button")).toHaveCount(2);
  await expect(page.locator(".epik-information-feedback")).toHaveCount(0);
  await question.getByRole("button", { name: "Nein, der konkrete Grund bleibt unbekannt." }).click();
  await expect(page.locator(".epik-information-feedback")).toContainText("Warum der Vater schwieg");
});

test("Bereich 2 trennt Erzählform, Beteiligung und Erzählverhalten", async ({ page }) => {
  await page.goto("/epik?__epik_test=1"); await reviewStep(page, 2, 3);
  await expect(page.getByRole("group", { name: "In welcher Erzählform wird erzählt?" })).toHaveCount(3);
  await expect(page.getByRole("group", { name: "Ist die Erzählinstanz selbst Teil der erzählten Welt?" })).toHaveCount(3);
  const behavior = page.getByRole("group", { name: "Welches Erzählverhalten ist durch die Informationsverteilung belegt?" }).first();
  expect(new Set(await behavior.getByRole("button").allTextContents())).toEqual(new Set(["Auktorial", "Personal", "Neutral"]));
  await expect(behavior.getByRole("button", { name: "Ich-Erzähler" })).toHaveCount(0);
});

test("Fundas Nachtschicht prüft Frequenz ohne fremde Analyseachsen", async ({ page }) => {
  await fixedSeed(page, 1); await page.goto("/epik?__epik_test=1"); await reviewStep(page, 5, 4);
  await expect(page.getByRole("heading", { name: "Immer um 02:40 Uhr" })).toBeVisible();
  const routine = page.getByRole("group", { name: "Wie wird Fundas regelmäßiger Rundgang erzählt?" });
  await expect(routine.getByRole("button")).toHaveCount(3);
  await expect(routine).toContainText("iterativ"); await expect(routine).toContainText("singulativ"); await expect(routine).toContainText("repetitiv");
  await expect(page.getByText(/heterodiegetisch|Autor|Erzählerbeteiligung/i)).toHaveCount(0);
  await expect(page.getByRole("group", { name: "Wie wird der konkrete Dienstag erzählt?" })).toBeVisible();
});

for (const viewport of [{ width: 1440, height: 900 }, { width: 1366, height: 768 }, { width: 768, height: 1024 }, { width: 390, height: 844 }]) test(`lange Glossarbegriffe bleiben bei ${viewport.width}×${viewport.height} lesbar`, async ({ page }) => {
  await page.setViewportSize(viewport); await page.goto("/epik?__epik_test=1"); await reviewStep(page, 2, 1);
  for (const term of ["Informationsvorsprung", "Informationsbegrenzung", "heterodiegetisch"]) { const summary = page.getByText(term, { exact: true }).last(); await expect(summary).toBeVisible(); expect(await summary.evaluate((node) => node.scrollWidth <= node.clientWidth + 1)).toBe(true); }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test("Abschlussfall beginnt kategorienrein und Abschlusstest zeigt den Bereich", async ({ page }) => {
  await page.goto("/epik?__epik_test=1"); await page.getByRole("button", { name: "Prüfmodus · Bereich wechseln" }).click(); await page.getByRole("button", { name: "Abschlussfall", exact: true }).click();
  await expect(page.getByRole("group", { name: "Welche Situation ist sicher gegeben?" })).toBeVisible();
  const figures = page.getByRole("group", { name: "Wer ist unmittelbar beteiligt oder relevant?" }); await expect(figures).toBeVisible(); await expect(figures).not.toContainText(/auktorial|personal|Ich-Form/i);
  await page.getByRole("button", { name: "↗ Lernkartei", exact: true }).click(); await page.getByRole("button", { name: "Abschlusstest" }).click();
  await expect(page.getByText("Bereich:", { exact: true })).toBeVisible();
});
