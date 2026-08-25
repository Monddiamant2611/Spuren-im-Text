import { expect, test } from "@playwright/test";

test("regulärer Einstieg bietet Begriffsvorbereitung und passende Lernkartei", async ({ page }) => {
  await page.goto("/epik");
  await page.getByRole("button", { name: "Analysewerkstatt betreten" }).click();
  const preparation = page.getByRole("dialog", { name: "Begriffe kurz wiederholen" });
  await expect(preparation).toBeVisible();
  await preparation.getByRole("button", { name: "Begriffe wiederholen" }).click();
  const term = preparation.getByRole("button", { name: "Erzählinstanz", exact: true });
  await term.click();
  const help = page.getByRole("dialog", { name: "Erzählinstanz" });
  await expect(help).toContainText("Kurzdefinition:");
  await expect(help).toContainText("Beispiel:");
  await page.keyboard.press("Escape");
  await expect(term).toBeFocused();
  await preparation.getByRole("button", { name: "Zur passenden Lernkartei" }).click();
  await expect(page.getByRole("heading", { name: "Lernkartei" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Grundlagen des Erzählens" })).toHaveClass(/is-active/);
  await page.getByRole("button", { name: "Zurück zu Bereich 1" }).click();
  await expect(preparation).toBeVisible();
});

test("Prüfmodus zeigt keine automatische Begriffsvorbereitung", async ({ page }) => {
  await page.goto("/epik?__epik_test=1");
  await expect(page.getByRole("dialog", { name: "Begriffe kurz wiederholen" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Prüfmodus · Bereich wechseln" })).toBeVisible();
});
