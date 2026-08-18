import { expect, test } from "@playwright/test";

const storageKey = "lernwerkstatt-games:state:v1";

async function seed(page: import("@playwright/test").Page, patch: Record<string, unknown> = {}) {
  await page.evaluate(({ key, patch }) => localStorage.setItem(key, JSON.stringify({
    version: 1,
    currentGame: "dramatik",
    currentChapter: "chapter_04",
    completedChapters: ["chapter_01", "chapter_02", "chapter_03", "chapter_04"],
    decisions: {}, competencies: {}, failedAttempts: {}, stagingDecisions: {}, selectedEvidence: [], progress: {},
    theatreState: "AFTER_CHAPTER_4",
    settings: { music: true, soundEffects: true, reducedMotion: false },
    lastSavedAt: new Date().toISOString(),
    ...patch,
  })), { key: storageKey, patch });
}

test.beforeEach(async ({ page }) => {
  await page.goto("/dramatik");
  await page.evaluate(() => localStorage.clear());
});

test("mobile theatre navigator exposes every unlocked area without horizontal discovery", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page);
  await page.reload();
  await page.getByRole("button", { name: "Fortsetzen" }).click();
  const navigator = page.getByRole("navigation", { name: "Theaterbereiche" });
  await expect(navigator).toBeVisible();
  for (const label of ["Regiepult", "Ensemblewand", "Probenbühne", "Bühne", "Regiebuch"]) {
    const button = navigator.getByRole("button", { name: new RegExp(label) });
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    const box = await button.boundingBox();
    expect(box && box.x >= 0 && box.x + box.width <= 390).toBeTruthy();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await navigator.getByRole("button", { name: /Regiebuch/ }).press("Enter");
  await expect(page.getByRole("heading", { name: "Was bedeutet das?" })).toBeVisible();
});

test("locked mobile theatre areas remain locked", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.getByRole("button", { name: "Spiel beginnen" }).click();
  const navigator = page.getByRole("navigation", { name: "Theaterbereiche" });
  await expect(navigator.getByRole("button", { name: /Regiepult/ })).toBeEnabled();
  for (const label of ["Ensemblewand", "Probenbühne", "Bühne", "Regiebuch"]) await expect(navigator.getByRole("button", { name: new RegExp(label) })).toBeDisabled();
});

test("modal traps focus, closes with Escape and restores its trigger", async ({ page }) => {
  await page.reload();
  const trigger = page.getByRole("button", { name: "Textgrundlage & Quellen" });
  await trigger.focus();
  await trigger.press("Enter");
  const dialog = page.getByRole("dialog");
  const close = dialog.getByRole("button", { name: "Fenster schließen" });
  const sourceLink = dialog.getByRole("link", { name: "Wikisource" });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(sourceLink).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("chapter 4 stays operable and its production figures remain contained on mobile", async ({ page }) => {
  const chapter04 = { round: 5, failedAttempts: 0, competencyEvents: [] };
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page, { currentChapter: "chapter_04", completedChapters: ["chapter_01", "chapter_02", "chapter_03"], theatreState: "AFTER_CHAPTER_3", decisions: { chapter_04: chapter04 } });
  await page.reload();
  await page.getByRole("button", { name: "Fortsetzen" }).click();
  await expect(page.getByRole("heading", { name: "Der Punkt ohne Rückkehr" })).toBeVisible();
  await expect(page.locator(".assignment-board")).toBeVisible();
  await expect(page.locator(".causal-stage")).toBeVisible();
  await page.waitForFunction(()=>[...document.querySelectorAll<HTMLImageElement>(".causal-character")].every(image=>image.complete&&image.naturalWidth>0));
  const result = await page.locator(".causal-stage").evaluate((stage) => {
    const bounds = stage.getBoundingClientRect();
    const figures = [...stage.querySelectorAll<HTMLImageElement>(".causal-character")];
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      loaded: figures.every((image) => image.complete && image.naturalWidth > 0),
      contained: figures.every((image) => { const rect = image.getBoundingClientRect(); return rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1 && rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1; }),
    };
  });
  expect(result).toEqual({ pageOverflow: 0, loaded: true, contained: true });
  const firstChoice = page.locator(".assignment-board fieldset").first().getByRole("button").first();await firstChoice.scrollIntoViewIfNeeded();await expect(firstChoice).toBeInViewport();
});

test("orientation change preserves the active chapter state", async ({ page }) => {
  const chapter04 = { round: 5, knowledgeAssignments:{}, failedAttempts: 0, competencyEvents: [] };
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page, { currentChapter: "chapter_04", completedChapters: ["chapter_01", "chapter_02", "chapter_03"], theatreState: "AFTER_CHAPTER_3", decisions: { chapter_04: chapter04 } });
  await page.reload(); await page.getByRole("button", { name: "Fortsetzen" }).click();
  const before = await page.evaluate((key) => localStorage.getItem(key), storageKey);
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(page.getByRole("heading", { name: "Der Punkt ohne Rückkehr" })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByText("Station 5/15")).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), storageKey)).toBe(before);
});

for (const viewport of [{ width: 1920, height: 1080 }, { width: 1600, height: 900 }, { width: 1366, height: 768 }, { width: 1280, height: 800 }, { width: 1180, height: 820 }, { width: 1024, height: 768 }, { width: 768, height: 1024 }, { width: 430, height: 932 }, { width: 390, height: 844 }, { width: 360, height: 800 }]) {
  test(`theatre assets and controls fit ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await seed(page);
    await page.reload(); await page.getByRole("button", { name: "Fortsetzen" }).click();
    await expect(page.locator(".theatre-scene>.asset-backdrop")).toBeVisible();
    await page.locator(".theatre-scene img").evaluateAll((images) => Promise.all(images.map((image) => {
      const asset = image as HTMLImageElement;
      if (asset.complete && asset.naturalWidth > 0) return Promise.resolve();
      return new Promise<void>((resolve, reject) => { asset.addEventListener("load", () => resolve(), { once: true }); asset.addEventListener("error", () => reject(new Error(`Asset konnte nicht geladen werden: ${asset.src}`)), { once: true }); });
    })));
    const theatreLayout = await page.locator(".theatre-scene").evaluate((scene) => {
      const bounds = scene.getBoundingClientRect();
      const background = scene.querySelector<HTMLImageElement>(".theatre-main-background")!;
      const accesses = [...scene.querySelectorAll<HTMLButtonElement>(".theatre-access")];
      return {
        backgroundLoaded: background.complete && background.naturalWidth > 0,
        aspectDelta: Math.abs(background.naturalWidth / background.naturalHeight - bounds.width / bounds.height),
        accessesLoaded: accesses.every((button) => button.querySelector<HTMLImageElement>("img")?.naturalWidth),
        accessesContained: accesses.every((button) => { const rect = button.getBoundingClientRect(); return rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1 && rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1; }),
      };
    });
    expect(theatreLayout.backgroundLoaded).toBe(true);
    expect(theatreLayout.aspectDelta).toBeLessThan(.01);
    expect(theatreLayout.accessesLoaded).toBe(true);
    expect(theatreLayout.accessesContained).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    if (viewport.width <= 704) await expect(page.getByRole("navigation", { name: "Theaterbereiche" })).toBeVisible();
    else await expect(page.getByRole("navigation", { name: "Theaterbereiche" })).toBeHidden();
  });
}
