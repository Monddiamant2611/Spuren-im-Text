import { expect, test, type Locator, type Page } from "@playwright/test";

async function texts(locator: Locator) {
  return locator.allTextContents().then((values) => values.map((value) => value.trim()));
}

async function openChapter(page: Page, chapter: string, round: number, completed: string[]) {
  await page.goto("/dramatik");
  await page.evaluate(({ chapter, round, completed }) => {
    localStorage.setItem("lernwerkstatt-games:state:v1", JSON.stringify({
      version: 1,
      currentGame: "dramatik",
      currentChapter: chapter,
      completedChapters: completed,
      decisions: { [chapter]: { round, seenGlossaryIntroductions: [chapter], failedAttempts: 0, competencyEvents: [] } },
      competencies: {}, failedAttempts: {}, stagingDecisions: {}, selectedEvidence: [], progress: {},
      theatreState: completed.length === 0 ? "INITIAL" : `AFTER_CHAPTER_${completed.length}`,
      settings: { music: false, soundEffects: false, reducedMotion: false },
      lastSavedAt: new Date().toISOString(),
    }));
  }, { chapter, round, completed });
  await page.reload();
  await page.getByRole("button", { name: "Fortsetzen" }).click();
}

test("matching sources are mixed but stable during an attempt", async ({ page }) => {
  await openChapter(page, "chapter_01", 4, []);
  const chapterOneCards = page.locator(".loose-pages button");
  const chapterOneOrder = await texts(chapterOneCards);
  expect(chapterOneOrder.length).toBeGreaterThan(2);
  await chapterOneCards.first().click();
  expect(await texts(chapterOneCards)).toEqual(chapterOneOrder);

  await openChapter(page, "chapter_02", 3, ["chapter_01"]);
  const chapterTwoCards = page.locator(".assignment-cards button");
  const chapterTwoOrder = await texts(chapterTwoCards);
  expect(chapterTwoOrder.length).toBe(4);
  await page.reload();
  await page.getByRole("button", { name: "Fortsetzen" }).click();
  expect(await texts(chapterTwoCards)).toEqual(chapterTwoOrder);

  await openChapter(page, "chapter_03", 5, ["chapter_01", "chapter_02"]);
  const chapterThreeChoices = page.locator(".dialogue-choice button");
  const chapterThreeOrder = await texts(chapterThreeChoices);
  expect(chapterThreeOrder.length).toBeGreaterThan(2);
  await page.reload();
  await page.getByRole("button", { name: "Fortsetzen" }).click();
  expect(await texts(chapterThreeChoices)).toEqual(chapterThreeOrder);
});

for (const viewport of [{ width: 360, height: 800 }, { width: 390, height: 844 }, { width: 430, height: 932 }]) {
  test(`mixed assignments remain touchable without overflow at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await openChapter(page, "chapter_05", 1, ["chapter_01", "chapter_02", "chapter_03", "chapter_04"]);
    await expect(page.locator(".assign-board button").first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    const smallestButton = await page.locator(".assign-board button").evaluateAll((buttons) => Math.min(...buttons.map((button) => button.getBoundingClientRect().height)));
    expect(smallestButton).toBeGreaterThanOrEqual(44);
  });
}

test("choice feedback does not reshuffle and source order is not the answer key", async ({ page }) => {
  await openChapter(page, "chapter_04", 2, ["chapter_01", "chapter_02", "chapter_03"]);
  const fields = page.locator(".assignment-board fieldset");
  const before = await texts(fields.locator("legend"));
  expect(before.length).toBeGreaterThan(2);
  const external = fields.filter({ hasText: "Mara will zur Feier; ihr Vater verlangt Lernen." });
  await external.getByRole("button", { name: "Innerer Konflikt", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Liegt der Gegensatz");
  expect(await texts(fields.locator("legend"))).toEqual(before);

  await openChapter(page, "chapter_05", 3, ["chapter_01", "chapter_02", "chapter_03", "chapter_04"]);
  const choices = page.locator(".choice-grid button");
  const chapterFiveOrder = await texts(choices);
  expect(chapterFiveOrder.length).toBeGreaterThan(2);
  await page.reload();
  await page.getByRole("button", { name: "Fortsetzen" }).click();
  expect(await texts(choices)).toEqual(chapterFiveOrder);
});
