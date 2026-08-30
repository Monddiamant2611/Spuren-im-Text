import {expect,test} from "@playwright/test";

const key="lernwerkstatt-games:state:v1";
async function openRound(page:import("@playwright/test").Page,round:number,viewport={width:1366,height:768}){
 await page.setViewportSize(viewport);
 await page.goto("/dramatik");
 await page.evaluate(({key,round})=>localStorage.setItem(key,JSON.stringify({version:1,currentGame:"dramatik",currentChapter:"chapter_04",completedChapters:["chapter_01","chapter_02","chapter_03"],decisions:{chapter_04:{round,seenGlossaryIntroductions:["chapter_04"],failedAttempts:0,competencyEvents:[]}},competencies:{},failedAttempts:{},stagingDecisions:{},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_3",settings:{music:false,soundEffects:false,reducedMotion:false},lastSavedAt:new Date().toISOString()})),{key,round});
 await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();
}

test("chapter 4 exposes all 22 real stations through review deep links",async({page})=>{
 await page.goto("/dramatik?review=1&step=chapter_04-round-22");
 await expect(page.getByText("Station 22/22")).toBeVisible();
 await expect(page.getByRole("heading",{name:"Vom Textbefund zur Bedeutung"})).toBeVisible();
});

test("general training precedes the protected Shakespeare application",async({page})=>{
 await openRound(page,5);
 await expect(page.getByRole("heading",{name:"Eine allgemeine Handlungskurve rekonstruieren"})).toBeVisible();
 await expect(page.getByText("ORIGINALTEXT")).toHaveCount(0);
 await openRound(page,8);
 await expect(page.getByText("ORIGINALTEXT").first()).toBeVisible();
 await expect(page.getByRole("heading",{name:"Die Situation an der Gruft rekonstruieren"})).toBeVisible();
});

test("the solved general curve exposes its analytical phases before advancing",async({page})=>{
 await page.goto("/dramatik");
 await page.evaluate(key=>localStorage.setItem(key,JSON.stringify({version:1,currentGame:"dramatik",currentChapter:"chapter_04",completedChapters:["chapter_01","chapter_02","chapter_03"],decisions:{chapter_04:{round:5,curveOrder:["curve_start","curve_tension","curve_escalation","curve_turn","curve_result"],seenGlossaryIntroductions:["chapter_04"],failedAttempts:0,competencyEvents:[]}},competencies:{},failedAttempts:{},stagingDecisions:{},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_3",settings:{music:false,soundEffects:false,reducedMotion:false},lastSavedAt:new Date().toISOString()})),key);
 await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();
 await expect(page.getByRole("heading",{name:"Funktionen im Handlungsverlauf"})).toBeVisible();
 await expect(page.getByText("Ausgangslage",{exact:true})).toBeVisible();
 await expect(page.getByText("Wendepunkt",{exact:true})).toBeVisible();
 await expect(page.getByRole("button",{name:"Analyse sichern"})).toBeVisible();
});

test("chapter 4 avoids an inner analysis scroll container",async({page})=>{
 await openRound(page,12,{width:390,height:844});
 expect(await page.locator(".relation-checks").evaluate(element=>({overflowY:getComputedStyle(element).overflowY,maxHeight:getComputedStyle(element).maxHeight}))).toEqual({overflowY:"visible",maxHeight:"none"});
});

test("incorrect choices explain the missing reasoning and remain correctable",async({page})=>{
 await openRound(page,2);
 const task=page.locator("fieldset").first();await task.getByRole("button",{name:/Konflikt/}).last().click();
 await expect(page.getByRole("status")).toContainText("Liegt der Gegensatz");
 await expect(task.getByRole("button").first()).toBeEnabled();
});

test("the first automatic glossary closes with Escape and does not reopen",async({page})=>{
 await page.goto("/dramatik");
 await page.evaluate(key=>localStorage.setItem(key,JSON.stringify({version:1,currentGame:"dramatik",currentChapter:"chapter_04",completedChapters:["chapter_01","chapter_02","chapter_03"],decisions:{chapter_04:{round:1,seenGlossaryIntroductions:[],failedAttempts:0,competencyEvents:[]}},competencies:{},failedAttempts:{},stagingDecisions:{},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_3",settings:{music:false,soundEffects:false,reducedMotion:false},lastSavedAt:new Date().toISOString()})),key);
 await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();
 await expect(page.getByRole("dialog",{name:"Werkzeuge der Handlungsanalyse"})).toBeVisible();
 await page.keyboard.press("Escape");
 await expect(page.getByRole("dialog",{name:"Werkzeuge der Handlungsanalyse"})).toBeHidden();
 await expect(page.getByRole("heading",{name:"Welche Informationen erzeugen den Konflikt?"})).toBeVisible();
});

test("goal evidence is presented as real excerpts without answer labels",async({page})=>{
 await openRound(page,10);
 await page.getByRole("button",{name:/Romeo anhalten und festnehmen/}).click();
 await expect(page.locator(".causal-choice").filter({hasText:"Welcher Primärtextbeleg"}).getByRole("button")).toHaveCount(4);
 await expect(page.locator("body")).not.toContainText("passende Stelle im Manuskript");
 await expect(page.locator("body")).not.toContainText("andere Figurenäußerung");
});

for(const viewport of [{width:1366,height:768},{width:768,height:1024},{width:390,height:844},{width:360,height:800}])test(`manuscript and analysis stay usable at ${viewport.width}x${viewport.height}`,async({page})=>{
 await openRound(page,10,viewport);
 await expect(page.locator(".chapter04-manuscript")).toBeVisible();
 await expect(page.getByRole("heading",{name:"Paris: Ziel selbst erschließen"})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1)).toBe(true);
});
