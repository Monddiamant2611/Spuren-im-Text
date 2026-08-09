import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/"); await page.evaluate(() => localStorage.clear()); await page.reload(); });

test("start, theatre, keyboard hotspots, sources and persistence", async ({ page }) => {
  await expect(page.getByRole("heading", { name: /DIE LETZTE AUFFÜHRUNG/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "Fortsetzen" })).toHaveCount(0);
  await page.getByRole("button", { name: "Spiel beginnen" }).click();
  const desk = page.getByRole("button", { name: /Regiepult: verfügbar/ });
  await expect(desk).toBeEnabled(); await desk.focus(); await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Das zerrissene Regiebuch" })).toBeVisible(); await page.getByRole("button", { name: "← Theater" }).click();
  for (const name of ["Ensemblewand", "Theaterarchiv", "Bühne", "Regiebuch"]) await expect(page.getByRole("button", { name: new RegExp(`${name}: gesperrt`) })).toBeDisabled();
  await page.getByRole("button", { name: "Quellen" }).click(); await expect(page.getByRole("heading", { name: /William Shakespeare/ })).toBeVisible(); await page.getByRole("button", { name: "Fenster schließen" }).click();
  await page.reload(); await expect(page.getByRole("button", { name: "Fortsetzen" })).toBeVisible();
});

test("chapter 1 supports keyboard reconstruction and mid-chapter reload", async ({ page }) => {
  await page.getByRole("button", { name: "Spiel beginnen" }).click();
  await page.getByRole("button", { name: /Regiepult: verfügbar/ }).press("Enter");
  await page.getByRole("button", { name: /Mantua\. Eine Straße\./ }).press("Enter");
  await page.getByRole("button", { name: /Ort \/ Szenenangabe/ }).press("Enter");
  await page.reload();
  await page.getByRole("button", { name: "Fortsetzen" }).click();
  await expect(page.getByText("Originaltext · restauriert")).toBeVisible();
});

test("chapter 2 relationship graph is keyboard operable, responsive and persistent", async ({ page }) => {
  await page.evaluate(() => localStorage.setItem("lernwerkstatt-games:state:v1", JSON.stringify({
    version: 1, currentGame: "dramatik", currentChapter: "chapter_02", completedChapters: ["chapter_01"],
    decisions: {}, competencies: {}, failedAttempts: {}, stagingDecisions: {}, selectedEvidence: [], progress: {},
    theatreState: "AFTER_CHAPTER_1", settings: { music: true, soundEffects: true, reducedMotion: false }, lastSavedAt: new Date().toISOString(),
  })));
  await page.reload();
  await page.getByRole("button", { name: "Fortsetzen" }).click();
  await expect(page.getByRole("heading", { name: "Das Ensemble erwacht" })).toBeVisible();
  await page.getByRole("button", { name: /Romeo.*Figur wählen/ }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: /Julia.*Figur wählen/ }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: /Redaktioneller Primärtextbeleg steht noch aus/ }).press("Enter");
  await expect(page.getByText("Verbindung und Begründung ergänzt")).toBeVisible();
  await page.reload(); await page.getByRole("button", { name: "Fortsetzen" }).click();
  await expect(page.getByText("Verbindung und Begründung ergänzt")).toBeVisible();
  await page.setViewportSize({ width: 1024, height: 768 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await expect(page.getByRole("button", { name: /Mercutio.*Figur wählen/ })).toBeVisible();
});

test("chapter 3 causal chain is keyboard operable, responsive and persistent", async ({ page }) => {
  const chapter03 = { round:4,messageAssignments:{},knowledgeAssignments:{},foundClues:[],orderedEvents:[],causalConnections:[],roleAssignments:{},missingInformationSelected:false,audienceAssignments:{},claimAssignments:{},relevanceSelections:[],completed:false,failedAttempts:0,competencyEvents:[] };
  await page.evaluate((session) => localStorage.setItem("lernwerkstatt-games:state:v1", JSON.stringify({
    version:1,currentGame:"dramatik",currentChapter:"chapter_03",completedChapters:["chapter_01","chapter_02"],decisions:{chapter_03:session},competencies:{},failedAttempts:{},stagingDecisions:{},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_2",settings:{music:true,soundEffects:true,reducedMotion:false},lastSavedAt:new Date().toISOString(),
  })), chapter03);
  await page.reload(); await page.getByRole("button",{name:"Fortsetzen"}).click();
  await expect(page.getByRole("heading",{name:"Der Brief, der nie ankam"})).toBeVisible();
  await page.getByRole("button",{name:"Lorenzo plant, Romeo zu informieren."}).press("Enter");
  await page.getByRole("button",{name:"Position 1 belegen"}).press("Enter");
  await page.reload(); await page.getByRole("button",{name:"Fortsetzen"}).click();
  await expect(page.getByRole("button",{name:/Position 1: Lorenzo plant/})).toBeVisible();
  await page.setViewportSize({width:1024,height:768});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBe(true);
  await expect(page.getByRole("button",{name:/Position 1: Lorenzo plant/})).toBeVisible();
});

test("chapter 4 rehearsal opens by director signal and persists keyboard analysis", async ({ page }) => {
  await page.evaluate(()=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify({version:1,currentGame:"dramatik",currentChapter:"chapter_04",completedChapters:["chapter_01","chapter_02","chapter_03"],decisions:{},competencies:{},failedAttempts:{},stagingDecisions:{},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_3",settings:{music:true,soundEffects:true,reducedMotion:false},lastSavedAt:new Date().toISOString()})));
  await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await expect(page.getByRole("button",{name:"REGIE!"})).toBeVisible();await page.getByRole("button",{name:"REGIE!"}).press("Enter");
  await page.getByRole("button",{name:"Romeo befindet sich am Familienbegräbnis der Capulets."}).press("Enter");await page.getByRole("button",{name:"Beobachtung"}).press("Enter");
  await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await expect(page.getByRole("heading",{name:"Die Generalprobe"})).toBeVisible();
  await page.setViewportSize({width:1024,height:768});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBe(true);await expect(page.getByText("Originaltext anzeigen")).toBeVisible();
});

test("chapter 5 argument puzzle is keyboard operable, persistent and responsive",async({page})=>{
 const chapter05={round:7,relevanceAssignments:{},pendingInterpretation:null,interpretationLinks:[],claimAssignments:{},escalationAssignments:{},countercheckPassed:true,hypothesisRefined:true,argumentOrder:[],stagingReviewLoaded:false,stagingRevision:null,revisionCount:0,completed:false,failedAttempts:0,competencyEvents:[]};
 await page.evaluate(session=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify({version:1,currentGame:"dramatik",currentChapter:"chapter_05",completedChapters:["chapter_01","chapter_02","chapter_03","chapter_04"],decisions:{chapter_05:session},competencies:{},failedAttempts:{},stagingDecisions:{chapter_04:{}},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_4",settings:{music:true,soundEffects:true,reducedMotion:false},lastSavedAt:new Date().toISOString()})),chapter05);
 await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await page.getByRole("button",{name:/hypothesis Deutungshypothese/}).press("Enter");await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await expect(page.getByRole("listitem").filter({hasText:"Deutungshypothese"})).toBeVisible();await page.setViewportSize({width:1024,height:768});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBe(true);await expect(page.getByRole("heading",{name:"Die Deutungsprobe"})).toBeVisible();
});

test("finale performs existing text, restores the book, replays and survives reload", async ({ page }) => {
  const state = { version:1,currentGame:"dramatik",currentChapter:"finale",completedChapters:["chapter_01","chapter_02","chapter_03","chapter_04","chapter_05"],decisions:{chapter_05:{hypothesisRefined:true,relevanceAssignments:{analysis_paris_arrest:"high_relevance"},argumentOrder:[]}},competencies:{evidence_reasoning:{value:5,level:"secure"},staging_reasoning:{value:4,level:"secure"}},failedAttempts:{chapter_04:8},stagingDecisions:{chapter_04:{}},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_5",settings:{music:false,soundEffects:false,reducedMotion:true},lastSavedAt:new Date().toISOString() };
  await page.evaluate((saved) => localStorage.setItem("lernwerkstatt-games:state:v1", JSON.stringify(saved)), state);
  await page.reload(); await page.getByRole("button", { name: "Fortsetzen" }).click();
  await expect(page.getByRole("heading", { name: "Die letzte Aufführung" })).toBeVisible();
  await expect(page.locator(".finale-title")).toHaveClass(/reduce-motion/);
  await page.getByRole("button", { name: "Aufführung beginnen" }).press("Enter");
  await expect(page.getByText("Originaltext · Paris")).toBeVisible();
  for (let index = 0; index < 6; index += 1) await page.getByRole("button", { name: "Weiter" }).press("Enter");
  await expect(page.getByText("Originaltext · Regieanweisung")).toBeVisible();
  await page.getByRole("button", { name: "Vorhang schließen" }).press("Enter");
  await page.getByRole("button", { name: "Restauriertes Regiebuch öffnen" }).press("Enter");
  await expect(page.getByRole("heading", { name: "Kompetenzübersicht" })).toBeVisible();
  await expect(page.locator("body")).not.toContainText("%");
  await page.emulateMedia({ media: "print" });
  await expect(page.getByRole("navigation", { name: "Regiebuch-Aktionen" })).toBeHidden();
  await expect(page.getByRole("heading", { name: "Kompetenzübersicht" })).toBeVisible();
  await page.emulateMedia({ media: "screen" });
  await page.setViewportSize({ width: 1024, height: 768 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.getByRole("button", { name: "Aufführung erneut ansehen" }).press("Enter");
  await expect(page.getByRole("button", { name: "Aufführung erneut beginnen" })).toBeVisible();
  await page.reload(); await expect(page.getByRole("button", { name: "Regiebuch ansehen" })).toBeVisible();
  await page.getByRole("button", { name: "Regiebuch ansehen" }).click();
  await expect(page.getByRole("heading", { name: "Deutungshypothese" })).toBeVisible();
  await expect(page.locator(".restored-book")).toHaveCSS("display", "block");
});
