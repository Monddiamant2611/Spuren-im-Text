import { expect, test } from "@playwright/test";
const viewports = [{ width: 1440, height: 900 }, { width: 1024, height: 768 }, { width: 768, height: 1024 }, { width: 390, height: 844 }];
for (const viewport of viewports) test(`archive flow fits ${viewport.width}x${viewport.height}`, async ({ page }) => {
  await page.setViewportSize(viewport); await page.goto("/"); await expect(page.getByRole("heading", { name: "Das Literatur-Archiv" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.getByRole("button", { name: /Archiv öffnen/ }).click(); await expect(page.getByText("produktionsorientiert", { exact: true })).toBeVisible();
  const term = page.getByRole("button", { name: "Ambiguität" }); await term.focus(); await term.press("Enter"); const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible(); await expect(dialog).toContainText("Fachbegriff für Mehrdeutigkeit."); const box = await dialog.boundingBox();
  expect(box && box.x >= 0 && box.y >= 0 && box.x + box.width <= viewport.width && box.y + box.height <= viewport.height).toBeTruthy();
  await page.keyboard.press("Escape"); await expect(dialog).toHaveCount(0); await expect(term).toBeFocused(); await term.click();
  await dialog.getByRole("button", { name: "Glossar schließen" }).click(); await expect(term).toBeFocused(); await page.getByRole("button", { name: /Weiter/ }).click();
  await expect(page.getByRole("heading", { name: "Grundsystem bereit" })).toBeVisible(); await page.getByRole("button", { name: /Zurück zum Start/ }).click();
  await expect(page.getByRole("heading", { name: "Das Literatur-Archiv" })).toBeVisible(); expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});
