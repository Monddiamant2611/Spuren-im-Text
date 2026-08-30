import { expect,test } from "@playwright/test";

const base={version:1,currentGame:"dramatik",completedChapters:[],competencies:{},failedAttempts:{},stagingDecisions:{},selectedEvidence:[],progress:{},theatreState:"INITIAL",settings:{music:false,soundEffects:false,reducedMotion:true},lastSavedAt:"2026-08-09T12:00:00.000Z"};
async function save(page:import("@playwright/test").Page,currentChapter:string,decisions:Record<string,unknown>,completedChapters:string[]=[]){await page.evaluate(({state})=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify(state)),{state:{...base,currentChapter,decisions,completedChapters}});await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click()}

test.beforeEach(async({page})=>{await page.goto("/dramatik");await page.evaluate(()=>localStorage.clear())});

test("neutral theatre reveals only the current image-based chapter access",async({page})=>{
 await page.getByRole("button",{name:"Spiel beginnen"}).click();
 await expect(page.locator(".theatre-main-background")).toHaveAttribute("src",/Theater_neutral_Hauptansicht/);
 await expect(page.locator(".theatre-access")).toHaveCount(1);
 await expect(page.locator(".theatre-access-image")).toHaveAttribute("src",/Kapitelzugang_1_Regiebuch/);
 await expect(page.getByRole("button",{name:/Kapitel 1 öffnen: Das zerrissene Regiebuch/})).toBeEnabled();
 await expect(page.locator(".theatre-access-label")).toHaveText(/Kapitel 1Das zerrissene RegiebuchJetzt betreten/);
});

test("completed access objects remain subdued while progression reveals the next chapter",async({page})=>{
 const state={...base,currentChapter:"chapter_02",completedChapters:["chapter_01","chapter_02"],decisions:{},theatreState:"AFTER_CHAPTER_2"};
 await page.evaluate(saved=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify(saved)),state);await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();
 await expect(page.locator(".theatre-access")).toHaveCount(3);
 await expect(page.locator(".theatre-access.completed")).toHaveCount(2);
 await expect(page.locator(".theatre-access.current")).toHaveCount(1);
 await expect(page.locator(".theatre-access.current .theatre-access-image")).toHaveAttribute("src",/Kapitelzugang_3_Archivtruhe/);
 await page.getByRole("button",{name:/Kapitel 1 öffnen: Das zerrissene Regiebuch/}).click();
 await expect(page.getByRole("heading",{name:"Das zerrissene Regiebuch"})).toBeVisible();
 await page.getByRole("button",{name:"← Theater"}).click();
 await expect(page.locator(".theatre-access.current")).toHaveCount(1);
});

test("chapter 1 uses Lorenzo as guide while a failed image keeps the fallback",async({page})=>{
 await page.route(/Bruder%20Lorenzo%20mit%20Brief\(1\)\.png$/,route=>route.abort());
 const chapter01={round:1,signalStep:0,signalAnswers:[],certaintyAssignments:{},situationAssignments:{},evidenceLinked:false,transferAssignments:{},transferEvidence:{},completed:false,failedAttempts:0,competencyEvents:[]};
 await save(page,"chapter_01",{chapter_01:chapter01});
 await expect(page.locator(".lorenzo-guide")).toBeVisible();
 await expect(page.locator(".lorenzo-fallback")).toHaveText("Bruder Lorenzo");
});

test("chapter 3 uses the rehearsal cast and analysis-room background",async({page})=>{
 const chapter03={round:1,practiceActs:{},practiceGoals:{},goalEvidence:{},goalChange:null,speechChains:[],phaseOrder:[],turningPoint:null,languageChains:[],findingAssignments:{},transferEvidence:{},comparisonAssignments:{},finalSteps:[],completed:false,failedAttempts:0,competencyEvents:[]};
 await save(page,"chapter_03",{chapter_03:chapter03},["chapter_01","chapter_02"]);
 await expect(page.locator(".dialogue-opening>.asset-backdrop")).toHaveAttribute("src",/Weitere Theaterkulisse/);await expect(page.locator('[data-scene="chapter_03.conflict"] .scene-character img')).toHaveCount(4);const benvolio=page.getByRole("img",{name:"Benvolio"});await expect(benvolio).toHaveAttribute("src",/Benvolio, der blaue Degenkämpfer/);await expect(page.locator('[data-scene="chapter_03.conflict"] .scene-character-fallback')).toHaveCount(0);expect(await benvolio.evaluate(image=>({loaded:(image as HTMLImageElement).naturalWidth>0,ratio:(image as HTMLImageElement).naturalWidth/(image as HTMLImageElement).naturalHeight}))).toMatchObject({loaded:true,ratio:expect.any(Number)});
});

test("learner-facing source labels use Wieland and hide internal EPUB paths",async({page})=>{
 await page.getByRole("button",{name:"Textgrundlage & Quellen"}).click();const dialog=page.getByRole("dialog");await expect(dialog).toContainText("Christoph Martin Wieland");await expect(dialog).not.toContainText(/Schlegel|Wikisource|OEBPS\/chapter-/);await dialog.getByRole("button",{name:"Fenster schließen"}).click();
 await save(page,"chapter_04",{chapter_04:{round:8,seenGlossaryIntroductions:["chapter_04"]}},["chapter_01","chapter_02","chapter_03"]);await page.getByText("Primärtext anzeigen").click();await expect(page.locator("body")).not.toContainText(/OEBPS\/chapter-/);
});

test("chapter 4 uses Romeo, Paris and the tomb stage for the external conflict",async({page})=>{
 await save(page,"chapter_04",{chapter_04:{round:8,seenGlossaryIntroductions:["chapter_04"]}},["chapter_01","chapter_02","chapter_03"]);
 await expect(page.locator('[data-scene="chapter_04.tomb"] [data-character="Romeo"] img')).toHaveAttribute("src",/Romeo, nachdenklich/);
 await expect(page.locator('[data-scene="chapter_04.tomb"] [data-character="Paris"] img')).toHaveAttribute("src",/Paris, ruhig/);
 await expect(page.locator(".causal-stage>.asset-backdrop")).toHaveAttribute("src",/Bühne mit Gruftkulisse/);
});

test("finale uses the restored theatre background",async({page})=>{const state={...base,currentChapter:"finale",completedChapters:["chapter_01","chapter_02","chapter_03","chapter_04","chapter_05"],decisions:{},theatreState:"AFTER_CHAPTER_5"};await page.evaluate(saved=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify(saved)),state);await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await expect(page.locator(".finale-new>.asset-backdrop")).toHaveAttribute("src",/Finale helle/)});

for(const viewport of [{width:1920,height:1080},{width:1366,height:768},{width:1180,height:820},{width:1024,height:768},{width:390,height:844}])test(`production stage assets remain contained at ${viewport.width}x${viewport.height}`,async({page})=>{await page.setViewportSize(viewport);await save(page,"chapter_04",{chapter_04:{round:8,seenGlossaryIntroductions:["chapter_04"]}},["chapter_01","chapter_02","chapter_03"]);const result=await page.locator(".causal-stage").evaluate(stage=>{const box=stage.getBoundingClientRect();const images=[...stage.querySelectorAll("img")];return{overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,loaded:images.every(image=>image.naturalWidth>0),contained:images.filter(image=>image.classList.contains("causal-character")).every(image=>{const rect=image.getBoundingClientRect();return rect.left>=box.left-1&&rect.right<=box.right+1&&rect.top>=box.top-1&&rect.bottom<=box.bottom+1})}});expect(result).toEqual({overflow:0,loaded:true,contained:true})});
