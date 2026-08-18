import { expect, test } from "@playwright/test";
import { practiceClaims, transferTasks } from "../../src/games/dramatik/data/chapter_02_content";
import { transferChain, transferHypotheses, transferRefined } from "../../src/games/dramatik/data/chapter_05_content";

test.beforeEach(async ({ page }) => { await page.goto("/dramatik"); await page.evaluate(() => localStorage.clear()); await page.reload(); });

test("start, theatre, keyboard hotspots, sources and persistence", async ({ page }) => {
  await expect(page.getByRole("heading", { name: /DIE LETZTE AUFFÜHRUNG/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "Fortsetzen" })).toHaveCount(0);
  await page.getByRole("button", { name: "Spiel beginnen" }).click();
  const desk = page.getByRole("button", { name: /Regiepult: verfügbar/ });
  await expect(desk).toBeEnabled(); await desk.focus(); await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Das zerrissene Regiebuch" })).toBeVisible(); await page.getByRole("button", { name: "← Theater" }).click();
  for (const name of ["Ensemblewand", "Probenbühne", "Bühne", "Regiebuch"]) await expect(page.getByRole("button", { name: new RegExp(`${name}: gesperrt`) })).toHaveCount(0);
  await page.getByRole("button", { name: "Quellen" }).click(); await expect(page.getByRole("heading", { name: /William Shakespeare/ })).toBeVisible(); await page.getByRole("button", { name: "Fenster schließen" }).click();
  await page.reload(); await expect(page.getByRole("button", { name: "Fortsetzen" })).toBeVisible();
});

test("chapter 1 supports keyboard reconstruction and mid-chapter reload", async ({ page }) => {
  await page.getByRole("button", { name: "Spiel beginnen" }).click();
  await page.getByRole("button", { name: /Regiepult: verfügbar/ }).press("Enter");
  await page.getByRole("button", { name: "Regiebuch untersuchen" }).press("Enter");
  await page.getByRole("button", { name: "ANNA" }).press("Enter");
  await page.reload();
  await page.getByRole("button", { name: "Fortsetzen" }).click();
  await expect(page.getByText("Markieren Sie eine Information, die nicht gesprochen wird, sondern das Bühnengeschehen beschreibt.")).toBeVisible();
});

test("chapter 2 evidence classification is keyboard operable, responsive and persistent", async ({ page }) => {
  await page.evaluate(() => localStorage.setItem("lernwerkstatt-games:state:v1", JSON.stringify({
    version: 1, currentGame: "dramatik", currentChapter: "chapter_02", completedChapters: ["chapter_01"],
    decisions: {}, competencies: {}, failedAttempts: {}, stagingDecisions: {}, selectedEvidence: [], progress: {},
    theatreState: "AFTER_CHAPTER_1", settings: { music: true, soundEffects: true, reducedMotion: false }, lastSavedAt: new Date().toISOString(),
  })));
  await page.reload();
  await page.getByRole("button", { name: "Fortsetzen" }).click();
  await expect(page.getByRole("heading", { name: "Das Ensemble" })).toBeVisible();
  await page.getByRole("button", { name: "Erste Figurenakte öffnen" }).press("Enter");
  const claim=practiceClaims[0];
  await page.getByRole("button",{name:claim.text}).press("Enter");
  await page.getByRole("button",{name:/Eindeutig belegt/}).press("Enter");
  await page.reload(); await page.getByRole("button", { name: "Fortsetzen" }).click();
  await expect(page.getByRole("button",{name:claim.text})).toHaveCount(0);
  await page.setViewportSize({ width: 1024, height: 768 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await expect(page.getByText("MARA:").first()).toBeVisible();
});

test("chapter 2 transfer rejects a wrong evidence link and chapter 5 countercheck survives reload", async ({ page }) => {
  const save = async (currentChapter:string,completedChapters:string[],decisions:Record<string,unknown>,theatreState:string) => page.evaluate(({currentChapter,completedChapters,decisions,theatreState}) => localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify({version:1,currentGame:"dramatik",currentChapter,completedChapters,decisions,competencies:{},failedAttempts:{},stagingDecisions:{chapter_04:{}},selectedEvidence:[],progress:{},theatreState,settings:{music:true,soundEffects:true,reducedMotion:false},lastSavedAt:new Date().toISOString()})),{currentChapter,completedChapters,decisions,theatreState});

  const chapter02={round:9,practiceAssignments:{},characterizationAssignments:{},highlights:[],momentAssignments:{},roleAssignments:{},relationshipSteps:[],selfOtherAssignments:{},transferSteps:[],comparisonAssignments:{},ensembleConnections:[],completed:false,failedAttempts:0,competencyEvents:[]};
  await save("chapter_02",["chapter_01"],{chapter_02:chapter02},"AFTER_CHAPTER_1");
  await page.reload(); await page.getByRole("button",{name:"Fortsetzen"}).click();
  const first=page.locator(".evidence-entry").first();
  await first.locator("select").selectOption(transferTasks[1].sourceId);
  await first.getByRole("button",{name:"Beleg prüfen"}).click();
  await expect(page.getByRole("status")).toContainText("anderen Beleg");
  await first.locator("select").selectOption(transferTasks[0].sourceId);
  await first.getByRole("button",{name:"Beleg prüfen"}).click();
  await page.reload(); await page.getByRole("button",{name:"Fortsetzen"}).click();
  await expect(page.locator(".evidence-entry.done")).toHaveCount(1);

  const chapter05={round:15,transferHypothesis:transferHypotheses.find(item=>item.quality==="supported")!.text,failedAttempts:0,competencyEvents:[]};
  await save("chapter_05",["chapter_01","chapter_02","chapter_03","chapter_04"],{chapter_05:chapter05},"AFTER_CHAPTER_4");
  await page.reload(); await page.getByRole("button",{name:"Fortsetzen"}).click();
  await page.getByRole("button",{name:/bietet das Gift begeistert/}).click();
  await expect(page.getByRole("status")).toContainText("Denkbewegung");
  await expect(page.getByText("Station 15 von 18")).toBeVisible();
  await page.getByRole("button",{name:/verweist auf das Gesetz/}).click();
  await expect(page.getByText("Station 16 von 18")).toBeVisible();
  await page.reload(); await page.getByRole("button",{name:"Fortsetzen"}).click();
  await expect(page.getByText("Station 16 von 18")).toBeVisible();
});

test("chapter 3 dialogue analysis is keyboard operable, responsive and persistent", async ({ page }) => {
  const chapter03 = { round:4,practiceActs:{practice_mara_stop:"auffordern"},practiceGoals:{},goalEvidence:{},goalChange:null,speechChains:[],phaseOrder:[],turningPoint:null,languageChains:[],findingAssignments:{},transferEvidence:{},comparisonAssignments:{},finalSteps:[],completed:false,failedAttempts:0,competencyEvents:[] };
  await page.evaluate((session) => localStorage.setItem("lernwerkstatt-games:state:v1", JSON.stringify({
    version:1,currentGame:"dramatik",currentChapter:"chapter_03",completedChapters:["chapter_01","chapter_02"],decisions:{chapter_03:session},competencies:{},failedAttempts:{},stagingDecisions:{},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_2",settings:{music:true,soundEffects:true,reducedMotion:false},lastSavedAt:new Date().toISOString(),
  })), chapter03);
  await page.reload(); await page.getByRole("button",{name:"Fortsetzen"}).click();
  await expect(page.getByRole("heading",{name:"Die Stimmen auf der Bühne"})).toBeVisible();
  await page.locator(".source-button").first().press("Enter");
  await page.reload(); await page.getByRole("button",{name:"Fortsetzen"}).click();
  await expect(page.getByText("Wer will in diesem Abschnitt was?")).toBeVisible();
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBe(true);
  await expect(page.locator(".dialogue-stage")).toBeVisible();
});

test("chapter 4 causal workshop opens and persists keyboard analysis", async ({ page }) => {
  await page.evaluate(()=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify({version:1,currentGame:"dramatik",currentChapter:"chapter_04",completedChapters:["chapter_01","chapter_02","chapter_03"],decisions:{},competencies:{},failedAttempts:{},stagingDecisions:{},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_3",settings:{music:true,soundEffects:true,reducedMotion:false},lastSavedAt:new Date().toISOString()})));
  await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await expect(page.getByRole("heading",{name:"Der Punkt ohne Rückkehr"})).toBeVisible();
  await page.getByRole("button",{name:"Mara möchte zu einer Feier gehen."}).press("Enter");
  await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await expect(page.getByRole("button",{name:"Mara möchte zu einer Feier gehen."})).toBeDisabled();
  await page.setViewportSize({width:1024,height:768});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBe(true);
});

test("chapter 4 stores a causal classification and keeps it after reload", async ({ page }) => {
  const session = { round:3,causalIntroAssignments:{},failedAttempts:0,competencyEvents:[] };
  await page.evaluate((chapter04) => localStorage.setItem("lernwerkstatt-games:state:v1", JSON.stringify({
    version:1,currentGame:"dramatik",currentChapter:"chapter_04",completedChapters:["chapter_01","chapter_02","chapter_03"],decisions:{chapter_04:chapter04},competencies:{},failedAttempts:{},stagingDecisions:{},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_3",settings:{music:true,soundEffects:true,reducedMotion:false},lastSavedAt:new Date().toISOString(),
  })), session);
  await page.reload(); await page.getByRole("button",{name:"Fortsetzen"}).click();
  const rain=page.locator("fieldset").filter({hasText:"Mara verlässt das Haus"});await rain.getByRole("button",{name:"Nur zeitlich nacheinander"}).click();
  await page.reload(); await page.getByRole("button",{name:"Fortsetzen"}).click();
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("lernwerkstatt-games:state:v1")!).decisions.chapter_04.causalIntroAssignments.rain);
  expect(stored).toBe("temporal");
  await page.setViewportSize({width:1024,height:768});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBe(true);
  await expect(page.getByRole("heading",{name:"Danach – oder deshalb?"})).toBeVisible();
});

test("chapter 5 transfer chain is keyboard operable, persistent and responsive",async({page})=>{
 const chapter05={round:13,transferChain:[],failedAttempts:0,competencyEvents:[]};
 await page.evaluate(session=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify({version:1,currentGame:"dramatik",currentChapter:"chapter_05",completedChapters:["chapter_01","chapter_02","chapter_03","chapter_04"],decisions:{chapter_05:session},competencies:{},failedAttempts:{},stagingDecisions:{chapter_04:{}},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_4",settings:{music:true,soundEffects:true,reducedMotion:false},lastSavedAt:new Date().toISOString()})),chapter05);
 await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await page.getByRole("button",{name:new RegExp(transferChain[0].text.slice(0,18))}).press("Enter");await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await expect(page.getByRole("listitem").filter({hasText:"Meine Dürftigkeit"})).toBeVisible();await page.setViewportSize({width:1024,height:768});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBe(true);await expect(page.getByRole("heading",{name:"Was bedeutet das?"})).toBeVisible();
});

test("chapter 5 requires a real hypothesis revision and does not write staging",async({page})=>{
 const chapter05={round:16,transferHypothesis:transferHypotheses.find(item=>item.quality==="supported")!.text,transferCountercheck:"apothecary_resists",failedAttempts:0,competencyEvents:[]};
 const state={version:1,currentGame:"dramatik",currentChapter:"chapter_05",completedChapters:["chapter_01","chapter_02","chapter_03","chapter_04"],decisions:{chapter_05:chapter05},competencies:{},failedAttempts:{},stagingDecisions:{chapter_04:{}},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_4",settings:{music:false,soundEffects:false,reducedMotion:true},lastSavedAt:new Date().toISOString()};
 await page.evaluate(saved=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify(saved)),state);await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();
 await page.getByRole("button",{name:chapter05.transferHypothesis}).click();await expect(page.getByRole("status")).toContainText("tatsächliche");expect((await page.evaluate(()=>JSON.parse(localStorage.getItem("lernwerkstatt-games:state:v1")!).decisions.chapter_05.transferRevision))).toBeUndefined();
 await page.getByRole("button",{name:transferRefined}).click();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("lernwerkstatt-games:state:v1")!));expect(saved.decisions.chapter_05.transferRevision).toBe(transferRefined);expect(saved.stagingDecisions.chapter_05_revision).toBeUndefined();
});

test("finale synthesizes the learning path, restores the book, replays and survives reload", async ({ page }) => {
  const state = { version:1,currentGame:"dramatik",currentChapter:"finale",completedChapters:["chapter_01","chapter_02","chapter_03","chapter_04","chapter_05"],decisions:{chapter_05:{hypothesisRefined:true,relevanceAssignments:{analysis_paris_arrest:"high_relevance"},argumentOrder:[]}},competencies:{evidence_reasoning:{value:5,level:"secure"},staging_reasoning:{value:4,level:"secure"}},failedAttempts:{chapter_04:8},stagingDecisions:{chapter_04:{}},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_5",settings:{music:false,soundEffects:false,reducedMotion:true},lastSavedAt:new Date().toISOString() };
  await page.evaluate((saved) => localStorage.setItem("lernwerkstatt-games:state:v1", JSON.stringify(saved)), state);
  await page.reload(); await page.getByRole("button", { name: "Fortsetzen" }).click();
  await expect(page.getByRole("heading", { name: "Die letzte Probe" })).toBeVisible();
  await expect(page.locator(".finale-new")).toHaveClass(/reduce-motion/);
  await page.getByRole("button", { name: "Restauriertes Theater betreten" }).press("Enter");
  for (const name of ["Regiebuch", "Ensemble", "Probenbühne", "Handlungsbuch", "Analysepult"]) { await page.getByRole("button", { name: new RegExp(`^${name}`) }).press("Enter"); await page.getByRole("button", { name: "Erinnerung schließen" }).press("Enter"); }
  await page.getByRole("button", { name: "Eine letzte Verbindung herstellen" }).press("Enter");
  for (const [a,b] of [["Situation","Figur und Ziel"],["Figur und Ziel","Konflikt und Handlung"],["Sprache und Dialog","Konflikt und Handlung"],["Sprache und Dialog","Deutung"],["Konflikt und Handlung","Deutung"]]) { await page.getByRole("button", { name: new RegExp(`^${a}`) }).press("Enter"); await page.getByRole("button", { name: new RegExp(`^${b}`) }).press("Enter"); }
  await page.getByRole("button", { name: "Mein Regiebuch öffnen" }).press("Enter");
  await expect(page.getByRole("heading", { name: "Persönliche Lernübersicht" })).toBeVisible();
  await expect(page.locator("body")).not.toContainText("%");
  await page.emulateMedia({ media: "print" });
  await expect(page.getByRole("navigation", { name: "Regiebuch-Aktionen" })).toBeHidden();
  await expect(page.getByRole("heading", { name: "Zentrale Lernformeln" })).toBeVisible();
  await page.emulateMedia({ media: "screen" });
  await page.setViewportSize({ width: 1024, height: 768 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.getByRole("button", { name: "Regiebuch schließen" }).press("Enter"); await page.getByRole("button", { name: "Vorhang auf" }).press("Enter");
  await page.getByRole("button", { name: "Noch einmal spielen" }).press("Enter");
  await expect(page.getByRole("button", { name: "Restauriertes Theater betreten" })).toBeVisible();
  await page.reload(); await expect(page.getByRole("button", { name: "Regiebuch ansehen" })).toBeVisible(); await page.getByRole("button", { name: "Regiebuch ansehen" }).click();
  await expect(page.getByRole("button", { name: "Regiebuch öffnen" })).toBeVisible(); await page.getByRole("button", { name: "Regiebuch öffnen" }).click();
  await expect(page.getByRole("heading", { name: "Zentrale Lernformeln" })).toBeVisible();
  await expect(page.locator(".analysis-book")).toHaveCSS("display", "block");
});
