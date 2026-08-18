import { expect, test } from "@playwright/test";

const viewports = [
  { name: "full-hd", width: 1920, height: 1080 },
  { name: "desktop", width: 1600, height: 900 },
  { name: "notebook", width: 1366, height: 768 },
  { name: "compact-notebook", width: 1280, height: 800 },
  { name: "tablet-wide", width: 1180, height: 820 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "phone-fallback", width: 390, height: 844 },
] as const;

const completedSave = {
  version: 1,
  currentGame: "dramatik",
  currentChapter: "finale",
  completedChapters: ["chapter_01", "chapter_02", "chapter_03", "chapter_04", "chapter_05"],
  decisions: {}, competencies: {}, failedAttempts: {}, stagingDecisions: {}, selectedEvidence: [],
  theatreState: "PERFORMANCE_COMPLETE", settings: { music: false, soundEffects: false, reducedMotion: true },
  lastSavedAt: "2026-08-09T12:00:00.000Z", finaleStarted: true, finaleCompleted: true,
  gameCompleted: true, performanceState: "PERFORMANCE_COMPLETE", finalStaging: {},
  finalHypothesis: "Gespeicherte Deutungshypothese", visibleCompetencyResults: [],
  finaleVisitedAreas: ["situation", "figures", "dialogue", "conflict", "interpretation"], finaleSynthesisCompleted: true,
  finaleBookOpened: true, finaleClosingSeen: true,
};

for (const viewport of viewports) {
  test(`${viewport.name} keeps the theatre and restored book operable`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/dramatik");
    await page.evaluate((save) => localStorage.setItem("lernwerkstatt-games:state:v1", JSON.stringify(save)), completedSave);
    await page.reload();
    await page.getByRole("button", { name: "Fortsetzen" }).click();
    await expect(page.getByRole("heading", { name: "Das Theater ist restauriert." })).toBeVisible();
    await page.getByRole("button", { name: "Regiebuch öffnen" }).click();
    await expect(page.getByRole("heading", { name: "Werkzeuge für Analyse und Interpretation dramatischer Texte" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Zum Startbildschirm" })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test("overlays close with Escape and return focus to a usable shell", async ({ page }) => {
  await page.goto("/dramatik");
  await page.getByRole("button", { name: "Textgrundlage & Quellen" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByRole("button", { name: "Spiel beginnen" })).toBeEnabled();
});
