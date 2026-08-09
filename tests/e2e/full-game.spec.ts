import { expect, test, type Page } from "@playwright/test";
import { relationships } from "../../src/games/dramatik/data/chapter_02/relationships";
import { chapter02Characters } from "../../src/games/dramatik/data/chapter_02/characters";
import { characterizationFindings, characterizationTasks } from "../../src/games/dramatik/data/chapter_02/characterization";
import { conflictChain } from "../../src/games/dramatik/data/chapter_02/conflicts";
import { knowledgeStates } from "../../src/games/dramatik/data/chapter_02/knowledge_states";
import { developmentCards } from "../../src/games/dramatik/data/chapter_02/development";
import { chapter03Messages } from "../../src/games/dramatik/data/chapter_03/messages";
import { chapter03Knowledge } from "../../src/games/dramatik/data/chapter_03/knowledge_states";
import { archiveClues } from "../../src/games/dramatik/data/chapter_03/evidence";
import { causalEvents } from "../../src/games/dramatik/data/chapter_03/causal_chain";
import { relationalRoles } from "../../src/games/dramatik/data/chapter_03/cause_effect";
import { audienceKnowledge } from "../../src/games/dramatik/data/chapter_03/audience_knowledge";
import { evidenceClaims } from "../../src/games/dramatik/data/chapter_03/unsupported_claims";
import { relevanceCards } from "../../src/games/dramatik/data/chapter_03/relevance";
import { perspectives, speechActs, dialoguePhases, escalationPoints, languageObservations } from "../../src/games/dramatik/data/chapter_04/analysis";
import { stagingOptions } from "../../src/games/dramatik/data/chapter_04/staging_options";
import { interpretationClaims } from "../../src/games/dramatik/data/chapter_05/unsupported_claims";
import { analysisResults } from "../../src/games/dramatik/data/chapter_05/evidence_selection";
import { escalationStructure } from "../../src/games/dramatik/data/chapter_05/countercheck";
import { argumentBlocks } from "../../src/games/dramatik/data/chapter_05/argument_chain";

const chapter01Round1 = [
  { text: "Mantua. Eine Straße.", target: "Ort / Szenenangabe" },
  { text: "(Romeo tritt auf.)", target: "Regieanweisung" },
  { text: "Romeo.", target: "Sprecherangabe" },
  { text: "Darf ich dem holden Tod des Schlafes traun,", target: "Figurenrede" },
];
const chapter01Information = [
  { text: "Balthasar berichtet Romeo von Julias vermeintlichem Tod.", target: "Romeo weiß" },
  { text: "Romeo erwartet beziehungsweise erfragt eine Nachricht des Paters.", target: "Romeo weiß" },
  { text: "Romeo hat zu diesem Zeitpunkt keinen Brief des Paters erhalten.", target: "Romeo weiß" },
  { text: "Romeo kennt den vollständigen Plan des Paters.", target: "Romeo weiß nicht" },
];
const chapter01Checks = ["Darf ich dem holden Tod des Schlafes traun,", "(Romeo tritt auf.)", "Romeo.", "Mantua. Eine Straße."];

test.beforeEach(async ({ page }) => { await page.goto("/"); await page.evaluate(() => localStorage.clear()); await page.reload(); });

async function leaveChapter(page: Page) { await page.getByRole("button", { name: /Theater/ }).click(); }
async function selectAndPlace(page: Page, item: string | RegExp, zone: string | RegExp) { await page.getByRole("button", { name: item }).click(); await page.getByRole("button", { name: zone }).click(); }

test("complete learning path reaches the restored director's book without a dead state", async ({ page }) => {
  test.setTimeout(120_000);
  await page.getByRole("button", { name: "Spiel beginnen" }).click();
  await page.getByRole("button", { name: /Regiepult: verfügbar/ }).click();

  for (const fragment of chapter01Round1) await selectAndPlace(page, fragment.text, fragment.target);
  await page.getByRole("button", { name: /Balthasar tritt auf/ }).click();
  await page.getByRole("button", { name: /Balthasar ab/ }).click();
  for (const card of chapter01Information) await selectAndPlace(
    page,
    card.text,
    card.target === "Romeo weiß" ? /^Romeo weiß(?! nicht)/ : /^Romeo weiß nicht/,
  );
  for (const text of chapter01Checks) await page.getByRole("button", { name: text }).last().click();
  await leaveChapter(page);
  await expect(page.getByRole("button", { name: /Ensemblewand: verfügbar/ })).toBeEnabled();
  await page.getByRole("button", { name: /Ensemblewand: verfügbar/ }).click();

  const names = Object.fromEntries(chapter02Characters.map((item) => [item.id, item.name]));
  for (const relation of relationships) {
    await page.getByRole("button", { name: new RegExp(`${names[relation.a]}.*Figur wählen`) }).click();
    await page.getByRole("button", { name: new RegExp(`${names[relation.b]}.*Figur wählen`) }).click();
    await page.getByRole("button", { name: relation.evidenceOptions.find((item) => item.correct)!.text }).click();
  }
  for (const task of characterizationTasks) for (const text of [task.observation, task.evidence, task.interpretation]) await page.getByRole("button", { name: new RegExp(text.slice(0, 24)) }).click();
  for (const finding of characterizationFindings) await selectAndPlace(page, finding.text, finding.target === "direct" ? /^Direkte Charakterisierung\b/ : /^Indirekte Charakterisierung\b/);
  for (const stage of conflictChain) await page.getByRole("button").filter({ hasText: stage.text }).click();
  for (const item of knowledgeStates) await selectAndPlace(page, item.text, item.target === "romeo" ? "Romeo weiß" : "Das Publikum weiß mehr");
  for (const item of developmentCards) await page.getByRole("button").filter({ hasText: item.text }).click();
  await page.locator(".ensemble-finale button").first().click();
  await leaveChapter(page);
  await page.getByRole("button", { name: /Theaterarchiv: verfügbar/ }).click();

  for (const item of chapter03Messages) await selectAndPlace(page, `${item.label}: ${item.description}`, item.id === "message_balthasar" ? /^Nachricht von Balthasar\s+0/ : /^Nachricht von Lorenzo\s+0/);
  for (const item of chapter03Knowledge) await selectAndPlace(page, item.text, item.target === "romeo" ? /^Romeo weiß\s+\d/ : /^Romeo weiß nicht\s+\d/);
  for (const clue of archiveClues) await page.getByRole("button", { name: `${clue.label} Untersuchen`, exact: true }).click();
  for (let index = 0; index < causalEvents.length; index += 1) await selectAndPlace(page, causalEvents[index].label, `Position ${index + 1} belegen`);
  for (let index = 0; index < causalEvents.length - 1; index += 1) await page.getByRole("button", { name: /Verbinden:/ }).first().click();
  for (const item of relationalRoles) await page.locator("article").filter({ hasText: item.label }).getByRole("button", { name: item.role === "cause" ? "Ursache von" : "Folge von" }).click();
  await page.getByRole("button", { name: /Lorenzos Plan und Julias tatsächlicher Zustand/ }).click();
  for (const item of audienceKnowledge) await selectAndPlace(page, item.text, item.target === "romeo" ? /^Romeo weiß\s+\d/ : /^Das Publikum weiß\s+\d/);
  for (const item of evidenceClaims) await selectAndPlace(page, item.text, item.supported ? "Textlich gestützt" : "Vermutung / nicht gestützt");
  for (const item of relevanceCards.filter((entry) => entry.relevant)) await page.getByRole("button", { name: item.text }).click();
  await page.getByRole("button", { name: "Zusammenhang archivieren" }).click();
  await leaveChapter(page);
  await page.getByRole("button", { name: /Bühne: verfügbar/ }).click();

  await page.getByRole("button", { name: "REGIE!" }).click();
  for (const item of perspectives) await selectAndPlace(page, item.text, item.target === "observation" ? "Beobachtung" : "Deutung");
  await page.locator(".goal-card button").click(); await page.locator(".goal-card button").click();
  for (const item of speechActs) await selectAndPlace(page, new RegExp(item.text), item.target);
  for (const phase of dialoguePhases) await page.getByRole("button", { name: phase }).click();
  for (const point of escalationPoints.slice(0, 2)) await page.getByRole("button", { name: point.label }).click();
  await page.getByRole("button", { name: "Konfliktlinie sichern" }).click();
  for (const item of languageObservations) await page.getByRole("button", { name: new RegExp(item.observation) }).click();
  for (const [index, option] of stagingOptions.entries()) {
    const choice = page.locator(".staging-choice").nth(index % 3);
    const combination = option.combinations.find((item) => item.quality !== "problematic")!;
    const reasoning = option.reasoning_options.find((item) => item.id === combination.reasoningId)!;
    await choice.getByRole("button", { name: combination.value, exact: true }).click();
    await choice.getByRole("button", { name: reasoning.label, exact: true }).click();
    await choice.getByRole("button", { name: "Regieentscheidung prüfen" }).click();
  }
  await page.getByRole("button", { name: "Generalprobe mit Ihrer Inszenierung beginnen" }).click();
  for (let index = 0; index < 3; index += 1) await page.getByRole("button", { name: "Probe fortsetzen" }).click();
  await page.getByRole("button", { name: "Gegenprobe starten" }).click();
  await page.getByRole("button", { name: /Romeo fordert Paris zunächst mehrfach/ }).click();
  await page.locator(".revision-options button").first().click();
  await page.getByRole("button", { name: "Korrigierte Version ansehen" }).click();
  await page.getByRole("button", { name: "Regiecheck abschließen" }).click();
  await leaveChapter(page);
  await page.getByRole("button", { name: /Regiebuch: verfügbar/ }).click();

  for (const item of analysisResults) await selectAndPlace(page, item.text, item.relevance === "high_relevance" ? "besonders relevant" : item.relevance === "medium_relevance" ? "ergänzend" : "für diese Deutung kaum relevant");
  await page.locator(".meaning-chain button").click();
  await page.locator(".evidence-drawer button").first().click();
  for (const item of interpretationClaims) await selectAndPlace(page, item.text, item.status === "supported" ? "textlich begründbar" : item.status === "unsupported" ? "geht über den Text hinaus" : "widerspricht dem Verlauf");
  for (const item of escalationStructure) await selectAndPlace(page, item.text, item.level === "perception" ? "Wahrnehmung" : item.level === "goal" ? "Gesprächsziel" : item.level === "reaction" ? "Reaktion" : "Konsequenz");
  await page.locator(".countercheck button").first().click();
  for (const block of argumentBlocks) await page.getByRole("button", { name: new RegExp(block.text.slice(0, 25)) }).click();
  await page.getByRole("button", { name: /Regieentscheidungen aus Kapitel 4/ }).click();
  const revision = page.locator(".staging-review article").first();
  await revision.getByRole("button", { name: "geringe Distanz", exact: true }).click();
  await revision.getByRole("button", { name: /zunehmende Bedrängung/ }).click();
  await revision.getByRole("button", { name: "Ausgewählte Änderung speichern" }).click();
  await page.getByRole("button", { name: "Deutung und Inszenierung abschließen" }).click();
  await leaveChapter(page);

  await page.getByRole("button", { name: /Finale: Die letzte Aufführung/ }).click();
  await page.getByRole("button", { name: "Aufführung beginnen" }).click();
  for (let index = 0; index < 6; index += 1) await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByRole("button", { name: "Vorhang schließen" }).click();
  await page.getByRole("button", { name: "Restauriertes Regiebuch öffnen" }).click();
  await expect(page.getByRole("heading", { name: "Kompetenzübersicht" })).toBeVisible();
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("lernwerkstatt-games:state:v1")!));
  expect(saved).toMatchObject({ completedChapters: ["chapter_01","chapter_02","chapter_03","chapter_04","chapter_05"], finaleCompleted: true, gameCompleted: true, performanceState: "PERFORMANCE_COMPLETE" });
});

test("recovers from malformed compatible save and continues from a normalized chapter session", async ({ page }) => {
  await page.evaluate(() => localStorage.setItem("lernwerkstatt-games:state:v1", JSON.stringify({ version:1,currentGame:"dramatik",currentChapter:"chapter_01",completedChapters:"broken",decisions:{chapter_01:{round:99,restoredIds:"broken"}},settings:{music:"broken"},theatreState:"BROKEN" })));
  await page.reload(); await page.getByRole("button", { name: "Fortsetzen" }).click();
  await expect(page.getByRole("heading", { name: "Das zerrissene Regiebuch" })).toBeVisible();
  await expect(page.getByText("Runde 1 von 5")).toBeVisible();
});
