import { expect, test } from "@playwright/test";
import { classificationCards } from "../../src/games/dramatik/data/chapter_05_content";
import { practiceClaims } from "../../src/games/dramatik/data/chapter_02_content";
import { practiceActs } from "../../src/games/dramatik/data/chapter_03_content";
import { conflictTypes } from "../../src/games/dramatik/data/chapter_04_content";

async function expectResolvedSupport(page: import("@playwright/test").Page, itemText: string, solutionText: string) {
  const support = page.locator("[data-learning-support]");
  await expect(support).toContainText(itemText);
  await expect(support.getByRole("button", { name: "Mit Unterstützung weiterarbeiten" })).toHaveCount(0);
  await support.getByRole("button", { name: "Lösungshilfe anzeigen" }).click();
  await expect(support.locator("[data-support-resolution]")).toContainText(solutionText);
  await expect(support.getByRole("button", { name: "Mit Unterstützung weiterarbeiten" })).toBeVisible();
}

test("feedback escalates and supported progression prevents a dead end", async ({ page }) => {
  await page.goto("/dramatik?review=1&step=chapter_05-round-1");
  const card = classificationCards.find(item => item.target === "observation")!;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    await page.getByRole("button", { name: card.text }).click();
    await page.getByRole("button", { name: "geht über die Beobachtung hinaus", exact: true }).click();
  }
  const support = page.locator("[data-learning-support]");
  await expect(support).toContainText("Der entscheidende Hinweis");
  await expect(support).toContainText(card.text);
  await expect(support.getByRole("button", { name: "Mit Unterstützung weiterarbeiten" })).toHaveCount(0);
  await support.getByRole("button", { name: "Lösungshilfe anzeigen" }).click();
  await expect(support.locator("[data-support-resolution]")).toContainText("gehört zu");
  await support.getByRole("button", { name: "Mit Unterstützung weiterarbeiten" }).click();
  await expect(page.getByText("Station 2 von 18")).toBeVisible();
});

test("chapter 2 names the wrong figure card and reveals its exact category before progression", async ({ page }) => {
  await page.goto("/dramatik?review=1&step=chapter_02-round-2");
  const item = practiceClaims.find(entry => entry.target === "explicit")!;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    await page.getByRole("button", { name: item.text }).click();
    await page.getByRole("button", { name: /Plausibel erschließbar/ }).click();
  }
  await expectResolvedSupport(page, item.text, "Eindeutig belegt");
});

test("chapter 3 names the wrong utterance and reveals the exact speech act", async ({ page }) => {
  await page.goto("/dramatik?review=1&step=chapter_03-round-3");
  const item = practiceActs[0];
  const fieldset = page.getByRole("group", { name: practiceDialogueLabel(item.line) });
  for (let attempt = 0; attempt < 2; attempt += 1) await fieldset.getByRole("button", { name: "feststellen" }).click();
  await expectResolvedSupport(page, `„${practiceDialogueLabel(item.line)}“`, `Sprachhandlung „${item.act}“`);
});

test("chapter 4 names the wrong conflict item and reveals its exact conflict type", async ({ page }) => {
  await page.goto("/dramatik?review=1&step=chapter_04-round-2");
  const item = conflictTypes.find(entry => entry.answer === "external")!;
  const fieldset = page.getByRole("group", { name: item.label });
  for (let attempt = 0; attempt < 2; attempt += 1) await fieldset.getByRole("button", { name: "Innerer Konflikt" }).click();
  await expectResolvedSupport(page, item.label, "Äußerer Konflikt");
});

function practiceDialogueLabel(line: number) {
  return ["Du gehst jetzt nicht.", "Ich habe dir nichts zu erklären.", "Dann sieh mich wenigstens an.", "Lass mich vorbei."][line];
}

for (const viewport of [{ width: 360, height: 800 }, { width: 390, height: 844 }, { width: 430, height: 932 }]) {
  test(`mobile diagnostic feedback stays visible at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/dramatik?review=1&step=chapter_05-round-1");
    const card = classificationCards.find(item => item.target === "observation")!;
    await page.getByRole("button", { name: card.text }).click();
    await page.getByRole("button", { name: "geht über die Beobachtung hinaus", exact: true }).click();
    const support = page.locator("[data-learning-support]");
    await expect(support).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  });
}
