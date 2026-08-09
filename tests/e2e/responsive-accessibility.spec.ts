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
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
});

test("mobile theatre navigator exposes every unlocked area without horizontal discovery", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page);
  await page.reload();
  await page.getByRole("button", { name: "Fortsetzen" }).click();
  const navigator = page.getByRole("navigation", { name: "Theaterbereiche" });
  await expect(navigator).toBeVisible();
  for (const label of ["Regiepult", "Ensemblewand", "Theaterarchiv", "Bühne", "Regiebuch"]) {
    const button = navigator.getByRole("button", { name: new RegExp(label) });
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    const box = await button.boundingBox();
    expect(box && box.x >= 0 && box.x + box.width <= 390).toBeTruthy();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await navigator.getByRole("button", { name: /Regiebuch/ }).press("Enter");
  await expect(page.getByRole("heading", { name: "Die Deutungsprobe" })).toBeVisible();
});

test("locked mobile theatre areas remain locked", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.getByRole("button", { name: "Spiel beginnen" }).click();
  const navigator = page.getByRole("navigation", { name: "Theaterbereiche" });
  await expect(navigator.getByRole("button", { name: /Regiepult/ })).toBeEnabled();
  for (const label of ["Ensemblewand", "Theaterarchiv", "Bühne", "Regiebuch"]) await expect(navigator.getByRole("button", { name: new RegExp(label) })).toBeDisabled();
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
  const chapter04 = { round: 7, perspectiveAssignments: {}, goalEvidence: { romeo: "c04_romeo_warning" }, speechAssignments: {}, orderedPhases: [], escalationSelections: ["paris_rejects", "fight"], languageFindings: [], stagingDecisions: {}, rehearsalPlayed: false, rehearsalMoment: 0, counterprobeActive: false, correctionUsed: false, directorErrorResolved: false, revisedRehearsalPlayed: false, completed: false, failedAttempts: 0, competencyEvents: [] };
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page, { currentChapter: "chapter_04", completedChapters: ["chapter_01", "chapter_02", "chapter_03"], theatreState: "AFTER_CHAPTER_3", decisions: { chapter_04: chapter04 } });
  await page.reload();
  await page.getByRole("button", { name: "Fortsetzen" }).click();
  await expect(page.getByRole("heading", { name: "Die Generalprobe" })).toBeVisible();
  await expect(page.locator(".staging-choice").first()).toBeVisible();
  await expect(page.locator(".rehearsal-stage").first()).toBeVisible();
  const result = await page.locator(".rehearsal-stage").first().evaluate((stage) => {
    const bounds = stage.getBoundingClientRect();
    const figures = [...stage.querySelectorAll<HTMLImageElement>(".stage-figure img")];
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      loaded: figures.every((image) => image.complete && image.naturalWidth > 0),
      contained: figures.every((image) => { const rect = image.getBoundingClientRect(); return rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1 && rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1; }),
    };
  });
  expect(result).toEqual({ pageOverflow: 0, loaded: true, contained: true });
  const firstChoice = page.locator(".staging-choice").first();
  await firstChoice.getByRole("button", { name: "große Distanz", exact: true }).click();
  await firstChoice.getByRole("button", { name: /Romeos Versuch, die Konfrontation/ }).click();
  const saveDecision = firstChoice.getByRole("button", { name: "Regieentscheidung prüfen" });
  await saveDecision.scrollIntoViewIfNeeded();
  await expect(saveDecision).toBeInViewport();
});

test("orientation change preserves the active chapter state", async ({ page }) => {
  const chapter04 = { round: 7, perspectiveAssignments: {}, goalEvidence: {}, speechAssignments: {}, orderedPhases: [], escalationSelections: [], languageFindings: [], stagingDecisions: {}, rehearsalPlayed: false, rehearsalMoment: 0, counterprobeActive: false, correctionUsed: false, directorErrorResolved: false, revisedRehearsalPlayed: false, completed: false, failedAttempts: 0, competencyEvents: [] };
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page, { currentChapter: "chapter_04", completedChapters: ["chapter_01", "chapter_02", "chapter_03"], theatreState: "AFTER_CHAPTER_3", decisions: { chapter_04: chapter04 } });
  await page.reload(); await page.getByRole("button", { name: "Fortsetzen" }).click();
  const before = await page.evaluate((key) => localStorage.getItem(key), storageKey);
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(page.getByRole("heading", { name: "Die Generalprobe" })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByText("Probe 7 von 10")).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), storageKey)).toBe(before);
});

for (const viewport of [{ width: 1920, height: 1080 }, { width: 1600, height: 900 }, { width: 1366, height: 768 }, { width: 1280, height: 800 }, { width: 1180, height: 820 }, { width: 1024, height: 768 }, { width: 768, height: 1024 }, { width: 430, height: 932 }, { width: 390, height: 844 }, { width: 360, height: 800 }]) {
  test(`theatre assets and controls fit ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await seed(page);
    await page.reload(); await page.getByRole("button", { name: "Fortsetzen" }).click();
    await expect(page.locator(".theatre-scene>.asset-backdrop")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    if (viewport.width <= 704) await expect(page.getByRole("navigation", { name: "Theaterbereiche" })).toBeVisible();
    else await expect(page.getByRole("navigation", { name: "Theaterbereiche" })).toBeHidden();
  });
}
