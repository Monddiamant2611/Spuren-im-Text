import {expect,test,type Page} from "@playwright/test";
import {categoryPractice,certaintyPractice,historyConditionPractice,situationPracticeScenes} from "../../src/games/dramatik/data/chapter_01_content";
import {initialChapter01Session} from "../../src/games/dramatik/mechanics/chapter_01_engine";

const key="lernwerkstatt-games:state:v1";
async function openRound(page:Page,round:number){await page.goto("/dramatik");await page.evaluate(({key,session})=>localStorage.setItem(key,JSON.stringify({version:1,currentGame:"dramatik",currentChapter:"chapter_01",completedChapters:[],decisions:{chapter_01:session},competencies:{},failedAttempts:{},stagingDecisions:{},selectedEvidence:[],progress:{},theatreState:"INITIAL",settings:{music:false,soundEffects:false,reducedMotion:true},lastSavedAt:new Date().toISOString()})),{key,session:{...initialChapter01Session,round,seenGlossaryIntroductions:["chapter_01","chapter_01_evidence"]}});await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click()}

test("independent training precedes every Shakespeare application",async({page})=>{
 for(const round of [4,5,6,7,8,9]){await openRound(page,round);await expect(page.getByText("Didaktischer Übungstext · nicht von Shakespeare")).toBeVisible();await expect(page.getByText("Originaltext · Wieland-Ausgabe")).toHaveCount(0)}
 await openRound(page,10);await expect(page.getByText(/Das Verfahren sitzt/)).toBeVisible();await expect(page.getByText("Originaltext · Wieland-Ausgabe")).toHaveCount(0);
 await page.getByRole("button",{name:"Shakespeare-Regiebuch öffnen"}).click();await expect(page.getByText("Originaltext · Wieland-Ausgabe")).toBeVisible();
});

test("training uses six distinct scenes and delayed combined checking",async({page})=>{
 expect(new Set(situationPracticeScenes.map(scene=>scene.id)).size).toBe(6);
 await openRound(page,4);await expect(page.getByRole("status")).toHaveCount(0);
 await page.getByRole("button",{name:categoryPractice[0].text}).click();await page.locator(".situation-ledger").getByRole("button",{name:/Nicht feststellbar/}).click();
 await expect(page.getByRole("status")).toHaveCount(0);await expect(page.getByRole("button",{name:"Gesamtanalyse prüfen"})).toBeDisabled();
});

test("independent consolidation uses a new scene and no per-option feedback",async({page})=>{
 await openRound(page,9);await expect(page.getByRole("heading",{name:"Eine Entscheidung"})).toBeVisible();await expect(page.getByText(/SARA|LEON|Bahnsteig/)).toHaveCount(0);await expect(page.locator(".situation-multiselect input")).toHaveCount(16);await page.locator(".situation-multiselect input").first().check();await expect(page.getByRole("status")).toHaveCount(0);
});

test("Capulet and Paris source stays readable and reopenable on phone",async({page})=>{
 await page.setViewportSize({width:390,height:844});await openRound(page,13);const source=page.getByText("Originaltext · Wieland-Ausgabe");await expect(source).toBeVisible();await page.getByRole("button",{name:"Originaltext schließen"}).click();await expect(source).toHaveCount(0);await page.getByRole("button",{name:"Text erneut anzeigen"}).click();await expect(source).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
});

test("Capulet and Paris use a readable one-column phone layout",async({page})=>{
 await page.setViewportSize({width:390,height:844});await openRound(page,13);const layout=await page.evaluate(()=>{const analysis=document.querySelector(".transfer-analysis-layout")!;const source=document.querySelector(".transfer-source-column .primary-leaf")!.getBoundingClientRect();const task=document.querySelector(".transfer-task-column")!.getBoundingClientRect();const style=getComputedStyle(analysis);const label=getComputedStyle(document.querySelector(".transfer-task-column .situation-multiselect label")!);return{columns:style.gridTemplateColumns,sourceRatio:source.width/analysis.getBoundingClientRect().width,sourceBeforeTask:source.top<task.bottom,fontSize:parseFloat(label.fontSize),scrollWidth:document.documentElement.scrollWidth,innerWidth}});expect(layout.columns.split(" ")).toHaveLength(1);expect(layout.sourceRatio).toBeGreaterThan(.95);expect(layout.sourceBeforeTask).toBe(true);expect(layout.fontSize).toBeGreaterThanOrEqual(16);expect(layout.scrollWidth).toBeLessThanOrEqual(layout.innerWidth+1);
});

test("Capulet and Paris use a single-column tablet layout",async({page})=>{
 await page.setViewportSize({width:768,height:1024});await openRound(page,13);const layout=await page.evaluate(()=>({columns:getComputedStyle(document.querySelector(".transfer-analysis-layout")!).gridTemplateColumns,categoryColumns:getComputedStyle(document.querySelector(".transfer-scene .situation-multiselect")!).gridTemplateColumns,overflow:document.documentElement.scrollWidth>innerWidth+1}));expect(layout.columns.split(" ")).toHaveLength(1);expect(layout.categoryColumns.split(" ")).toHaveLength(1);expect(layout.overflow).toBe(false);
});

test("Capulet and Paris retain desktop columns, sticky source and larger portraits",async({page})=>{
 await page.setViewportSize({width:1366,height:768});await openRound(page,13);const layout=await page.evaluate(()=>{const analysis=document.querySelector(".transfer-analysis-layout")!;const source=document.querySelector(".transfer-source-column")!;const figures=[...document.querySelectorAll(".scene-characters[data-scene='chapter_01.capulet_paris'] .scene-character.primary")].map(item=>item.getBoundingClientRect().width);return{columns:getComputedStyle(analysis).gridTemplateColumns,sourcePosition:getComputedStyle(source).position,figureRatios:figures.map(width=>width/innerWidth)}});expect(layout.columns.split(" ")).toHaveLength(2);expect(layout.sourcePosition).toBe("sticky");expect(layout.figureRatios).toHaveLength(2);expect(layout.figureRatios.every(ratio=>ratio>.14)).toBe(true);
});

test("training state persists and every new round starts at its workspace",async({page})=>{
 await openRound(page,5);await page.getByRole("button",{name:certaintyPractice[0].text}).click();await page.getByRole("button",{name:"Eindeutig belegt"}).click();await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();
 await expect(page.getByRole("button",{name:certaintyPractice[0].text})).toHaveClass(/is-assigned/);
 const top=await page.locator(".regiebuch-workspace").evaluate(element=>Math.round(element.getBoundingClientRect().top));expect(top).toBeLessThan(180);
});

test("review deep-links reach every new stage without changing storage",async({page})=>{
 await page.goto("/dramatik");await page.evaluate(key=>localStorage.setItem(key,"review-sentinel"),key);
 for(const round of [4,5,6,7,8,9]){await page.goto(`/dramatik?review=1&step=chapter_01-round-${round}`);await expect(page.getByText("PRÜFMODUS · Änderungen werden nicht gespeichert und nicht bewertet.")).toBeVisible()}
 expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe("review-sentinel");
});

test("training remains contained on desktop and phone",async({page})=>{
 for(const viewport of [{width:1366,height:768},{width:390,height:844}]){await page.setViewportSize(viewport);await openRound(page,6);await expect(page.getByRole("heading",{name:"Was geschah vorher – und was gilt jetzt?"})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);await expect(page.getByRole("button",{name:historyConditionPractice[0].text})).toBeVisible()}
});

test("Lorenzo is a grounded desktop guide without narrowing the work surface",async({page})=>{
 await page.setViewportSize({width:1366,height:768});await openRound(page,4);const layout=await page.evaluate(()=>{const guide=document.querySelector(".chapter-one-scene .lorenzo-guide")!.getBoundingClientRect();const workspace=document.querySelector(".regiebuch-workspace")!.getBoundingClientRect();return{guideRatio:guide.width/innerWidth,groundGap:Math.abs(innerHeight-guide.bottom),workspaceRatio:workspace.width/innerWidth}});expect(layout.guideRatio).toBeGreaterThan(.3);expect(layout.groundGap).toBeLessThan(2);expect(layout.workspaceRatio).toBeGreaterThan(.68);
});

test("Shakespeare context does not state the servant assignment in solution language",async({page})=>{
 await openRound(page,11);const task=page.locator(".task-slip");await expect(task).toContainText("länger andauernder Konflikt");await expect(task).not.toContainText("Auch Bedienstete beider Häuser tragen den Streit aus");
});
