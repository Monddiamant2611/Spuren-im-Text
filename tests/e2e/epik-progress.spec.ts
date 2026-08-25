import { expect, test } from "@playwright/test";

test.use({ actionTimeout: 15_000 });

test("Fortschritt überlebt Reload und lässt sich zurücksetzen", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/epik");
  await page.evaluate(() => localStorage.setItem("epik.learningProgress.v1", JSON.stringify({ version: 1, completedChapters: [1] })));
  await page.reload();
  await page.getByRole("button", { name: "Direkt starten" }).click();
  await expect(page.getByRole("button", { name: "2 Erzählinstanz und Perspektive" })).toBeVisible();
  await page.getByRole("button", { name: "Lernfortschritt zurücksetzen" }).click();
  await expect(page.getByText("Möchten Sie den gespeicherten Lernfortschritt wirklich zurücksetzen?")).toBeVisible();
  await page.getByRole("button", { name: "Fortschritt zurücksetzen", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Epische Werke entschlüsseln" })).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("epik.learningProgress.v1"))).toBeNull();
});

for (const viewport of [{ width: 768, height: 1024 }, { width: 390, height: 844 }]) {
  test(`Reset-Bereich bleibt bei ${viewport.width}×${viewport.height} erreichbar`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/epik");
    await page.getByRole("button", { name: "Analysewerkstatt betreten" }).click();
    await page.getByRole("button", { name: "Direkt starten" }).click();
    const reset = page.getByRole("button", { name: "Lernfortschritt zurücksetzen" });
    await reset.scrollIntoViewIfNeeded();
    await expect(reset).toBeVisible();
    await expect(page.getByText("Der Lernfortschritt wird ausschließlich auf diesem Gerät im Browser gespeichert.")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });
}
