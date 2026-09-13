import { expect, test, type Locator, type Page } from "@playwright/test";
import { categoryPractice } from "../../src/games/dramatik/data/chapter_01_content";
import { practiceClaims } from "../../src/games/dramatik/data/chapter_02_content";
import { practiceActs } from "../../src/games/dramatik/data/chapter_03_content";
import { conflictTypes } from "../../src/games/dramatik/data/chapter_04_content";
import { classificationCards, transferChain } from "../../src/games/dramatik/data/chapter_05_content";

const situationLabel = (target: string) => target === "place" ? "Ort" : target === "time" ? "Zeit" : target === "characters" ? "Figuren" : target === "history" ? "Vorgeschichte" : target === "conditions" ? "Bedingungen" : target === "current_condition" ? "Gegenwärtige Bedingung" : target === "other" ? "Andere Situationsinformation" : "Nicht feststellbar";
const certaintyLabel = (target: string) => target === "explicit" ? "Eindeutig belegt" : target === "inference" ? "Plausibel erschließbar" : "Nicht belegt";
async function assign(page: Page, item: string, zone: string | RegExp) {
  await page.getByRole("button", { name: item, exact: true }).click();
  await page.getByRole("button", { name: zone }).last().click();
}

async function expectReadablePositiveCard(card: Locator) {
  await expect(card).toBeVisible();
  const result = await card.evaluate(element => {
    const style = getComputedStyle(element);
    const textElements = [element, ...element.querySelectorAll("span,small,strong,b,em,p,label,legend,div")]
      .filter(candidate => candidate.childNodes.length === 0 || [...candidate.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()))
      .filter(candidate => { const candidateStyle = getComputedStyle(candidate); return candidateStyle.display !== "none" && candidateStyle.visibility !== "hidden"; });
    const rgb = (value: string) => (value.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
    const luminance = (value: string) => {
      const channels = rgb(value).map(channel => channel / 255).map(channel => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4);
      return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2];
    };
    const backgroundLuminance = luminance(style.backgroundColor);
    const colors = textElements.map(candidate => getComputedStyle(candidate).color);
    const contrasts = colors.map(color => {
      const foregroundLuminance = luminance(color);
      return (Math.max(foregroundLuminance, backgroundLuminance) + .05) / (Math.min(foregroundLuminance, backgroundLuminance) + .05);
    });
    return { colors, contrasts };
  });
  expect(result.colors.every(color => !["rgb(113, 57, 67)", "rgb(116, 55, 68)", "rgb(111, 47, 58)"].includes(color))).toBe(true);
  expect(result.contrasts.every(contrast => contrast >= 4.5)).toBe(true);
}

test("chapter 1 shows correct and incorrect parts together only after the batch check", async ({ page }) => {
  await page.goto("/dramatik?review=1&step=chapter_01-round-4");
  for (const [index, item] of categoryPractice.entries()) await assign(page, item.text, index === 0 ? situationLabel(item.target === "place" ? "time" : "place") : situationLabel(item.target));
  await expect(page.getByText("✓ Richtig", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Gesamtanalyse prüfen" }).click();
  await expect(page.getByText("✓ Richtig", { exact: true }).first()).toBeVisible();
  await expectReadablePositiveCard(page.locator(".answer-correct").first());
  await expect(page.getByText("✗ Noch zu prüfen", { exact: true })).toBeVisible();
});

test("chapter 2 retains a correct assignment beside a differentiated wrong attempt", async ({ page }) => {
  await page.goto("/dramatik?review=1&step=chapter_02-round-2");
  const correct = practiceClaims[0];
  await assign(page, correct.text, certaintyLabel(correct.target));
  const wrong = practiceClaims.find(item => item.id !== correct.id)!;
  await assign(page, wrong.text, certaintyLabel(wrong.target) === "Eindeutig belegt" ? /Plausibel erschließbar/ : /Eindeutig belegt/);
  await expect(page.getByText(/✓ Richtig ·/).first()).toBeVisible();
  await expectReadablePositiveCard(page.locator(".confirmed-answer-list li").first());
  await expect(page.getByText(/✗ Noch zu prüfen ·/)).toBeVisible();
});

test("chapter 3 keeps a secured speech act visible when the next answer is wrong", async ({ page }) => {
  await page.goto("/dramatik?review=1&step=chapter_03-round-3");
  const first = practiceActs[0];
  await page.getByRole("group", { name: "Du gehst jetzt nicht." }).getByRole("button", { name: first.act, exact: true }).click();
  await page.getByRole("group", { name: "Ich habe dir nichts zu erklären." }).getByRole("button").first().click();
  await expect(page.getByText(/✓ Richtig ·/).first()).toBeVisible();
  await expectReadablePositiveCard(page.locator(".confirmed-answer-list li").first());
  await expect(page.getByText(/✗ Noch zu prüfen ·/)).toBeVisible();
});

test("chapter 3 conversation goals show a correct and a wrong partial result together", async ({ page }) => {
  await page.goto("/dramatik?review=1&step=chapter_03-round-3");
  for (const item of practiceActs) {
    await page.getByRole("group", { name: practiceDialogueText(item.line), exact: true }).getByRole("button", { name: item.act, exact: true }).click();
  }
  const first = practiceActs[0];
  await page.getByRole("group", { name: new RegExp(first.act) }).getByRole("button", { name: first.goal, exact: true }).click();
  const next = practiceActs[1];
  const wrongGoal = next.goalOptions.find(option => option !== next.goal)!;
  await page.getByRole("group", { name: new RegExp(next.act) }).getByRole("button", { name: wrongGoal, exact: true }).click();
  await expect(page.getByRole("list", { name: "Bereits richtige Teilantworten" }).getByText(/✓ Richtig ·/)).toBeVisible();
  await expect(page.getByText(`✗ Noch zu prüfen · ${wrongGoal}`, { exact: true })).toBeVisible();
  await page.getByRole("group", { name: new RegExp(next.act) }).getByRole("button", { name: wrongGoal, exact: true }).click();
  await expect(page.getByRole("button", { name: "Lösungshilfe anzeigen" })).toBeVisible();
});

test("chapter 3 conversation goals show their shared instruction only once", async ({ page }) => {
  await page.goto("/dramatik?review=1&step=chapter_03-round-4");
  await expect(page.locator("[data-task-instruction]")).toHaveCount(1);
  await expect(page.locator("[data-task-instruction]")).toContainText("Ordnen Sie jeder Äußerung das übergeordnete Gesprächsziel zu");
  await expect(page.getByRole("group")).toHaveCount(4);
});

test("chapter 5 transfer analysis uses readable light text throughout a positive card", async ({ page }) => {
  await page.goto("/dramatik?review=1&step=chapter_05-round-13");
  await page.getByRole("button", { name: new RegExp(transferChain[0].text) }).click();
  const confirmed = page.locator(".ordered-board .answer-correct").first();
  await expect(confirmed).toBeVisible();
  await expectReadablePositiveCard(confirmed);
  await expect(confirmed.getByText("✓ Richtig", { exact: true })).toBeVisible();
});

for (const viewport of [{ width: 360, height: 800 }, { width: 390, height: 844 }, { width: 430, height: 932 }]) {
  test(`chapter 5 positive transfer card remains readable at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/dramatik?review=1&step=chapter_05-round-13");
    await page.getByRole("button", { name: new RegExp(transferChain[0].text) }).click();
    const card = page.locator(".ordered-board .answer-correct").first();
    await expect(card).toBeVisible();
    await expect(card.locator("small")).toHaveCSS("color", "rgb(246, 255, 248)");
    await expect(card.locator(".answer-status")).toHaveCSS("color", "rgb(213, 237, 217)");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  });
}

const practiceDialogueText = (line: number) => ["Du gehst jetzt nicht.", "Ich habe dir nichts zu erklären.", "Dann sieh mich wenigstens an.", "Lass mich vorbei."][line];

test("chapter 4 labels correct and wrong assignment controls textually", async ({ page }) => {
  await page.goto("/dramatik?review=1&step=chapter_04-round-2");
  const correct = conflictTypes[0];
  const group = page.getByRole("group", { name: correct.label });
  await group.getByRole("button", { name: correct.answer === "external" ? "Äußerer Konflikt" : "Innerer Konflikt" }).click();
  await expect(group.getByText(/✓ Richtig/)).toBeVisible();
  await expectReadablePositiveCard(page.locator(".answer-correct").first());
  const wrong = conflictTypes.find(item => item.id !== correct.id)!;
  const wrongGroup = page.getByRole("group", { name: wrong.label });
  await wrongGroup.getByRole("button", { name: wrong.answer === "external" ? "Innerer Konflikt" : "Äußerer Konflikt" }).click();
  await expect(wrongGroup.getByText(/✗ Noch zu prüfen/)).toBeVisible();
});

for (const viewport of [{ width: 360, height: 800 }, { width: 390, height: 844 }, { width: 430, height: 932 }]) {
  test(`chapter 5 retains differentiated feedback at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/dramatik?review=1&step=chapter_05-round-1");
    const correct = classificationCards[0];
    await assign(page, correct.text, correct.target === "observation" ? "Textbefund" : "geht über die Beobachtung hinaus");
    const wrong = classificationCards.find(item => item.id !== correct.id)!;
    await assign(page, wrong.text, wrong.target === "observation" ? "geht über die Beobachtung hinaus" : "Textbefund");
    await expect(page.getByText(/✓ Richtig ·/).first()).toBeVisible();
    await expect(page.getByText(/✗ Noch zu prüfen ·/)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  });
}
