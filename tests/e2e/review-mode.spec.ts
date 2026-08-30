import {expect,test} from "@playwright/test";

const key="lernwerkstatt-games:state:v1";
const sentinel={version:1,currentGame:"dramatik",currentChapter:"chapter_01",completedChapters:[],decisions:{},competencies:{marker:{successes:2,failures:0,mastery:2}},failedAttempts:{},stagingDecisions:{},selectedEvidence:[],progress:{},theatreState:"INITIAL",settings:{music:false,soundEffects:false,reducedMotion:true},lastSavedAt:"2026-08-26T00:00:00.000Z"};

test("normal mode contains no review interface",async({page})=>{await page.goto("/dramatik");await expect(page.getByRole("button",{name:"PRÜFMODUS"})).toHaveCount(0);await expect(page.getByText(/Keine Speicherung/)).toHaveCount(0)});

test("review deep-link opens locked chapter 5 without touching the student save",async({page})=>{
 await page.goto("/dramatik");await page.evaluate(({key,sentinel})=>localStorage.setItem(key,JSON.stringify(sentinel)),{key,sentinel});await page.goto("/dramatik?review=1&step=chapter_05-round-12");await expect(page.getByText(/PRÜFMODUS · Änderungen werden nicht gespeichert/)).toBeVisible();await expect(page.getByText("Station 12 von 18")).toBeVisible();expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(JSON.stringify(sentinel));
});

test("previous and next navigation update a stable deep-link and survive reload",async({page})=>{
 await page.goto("/dramatik?review=1&chapter=1&round=1");await page.getByRole("button",{name:"PRÜFMODUS"}).click();await page.getByRole("button",{name:"Nächster Schritt →"}).click();await expect(page).toHaveURL(/step=chapter_01-round-2/);await expect(page.getByText("Szene 2 von 13")).toBeVisible();await page.reload();await expect(page.getByText("Szene 2 von 13")).toBeVisible();
});

test("chapter completion and theatre progression previews remain transient",async({page})=>{
 await page.goto("/dramatik");await page.evaluate(({key,sentinel})=>localStorage.setItem(key,JSON.stringify(sentinel)),{key,sentinel});await page.goto("/dramatik?review=1&step=chapter_02-completion");await expect(page.getByText("Die Figurenakte ist vollständig.",{exact:true})).toBeVisible();await page.getByRole("button",{name:"PRÜFMODUS"}).click();const panel=page.getByRole("complementary",{name:"Interne Entwicklungsnavigation"});await panel.getByText("Große Bühne",{exact:true}).click();await panel.getByRole("button",{name:"Finale verfügbar"}).click();await expect(page.getByRole("button",{name:"Finale verfügbar"})).toBeVisible();expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(JSON.stringify(sentinel));
});

test("review interaction creates neither durable failures nor competency events",async({page})=>{
 await page.goto("/dramatik");await page.evaluate(({key,sentinel})=>localStorage.setItem(key,JSON.stringify(sentinel)),{key,sentinel});await page.goto("/dramatik?review=1&step=chapter_03-round-3");await page.getByRole("button",{name:"feststellen"}).first().click();expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(JSON.stringify(sentinel));
});

test("mobile review navigation is operable and closes with Escape",async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto("/dramatik?review=1&step=chapter_04-round-9");const toggle=page.getByRole("button",{name:"PRÜFMODUS"});await toggle.click();await expect(page.getByRole("complementary",{name:"Interne Entwicklungsnavigation"})).toBeVisible();await page.keyboard.press("Escape");await expect(page.getByRole("complementary",{name:"Interne Entwicklungsnavigation"})).toBeHidden();await expect(toggle).toBeFocused();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
});

for(const viewport of [
 {name:"desktop",width:1920,height:1080},
 {name:"laptop",width:1366,height:768},
 {name:"tablet landscape",width:1024,height:768},
 {name:"tablet portrait",width:768,height:1024},
 {name:"phone",width:390,height:844},
]) test(`review navigation remains contained at ${viewport.name}`,async({page})=>{
 await page.setViewportSize({width:viewport.width,height:viewport.height});
 await page.goto("/dramatik?review=1&step=chapter_02-round-4");
 await page.getByRole("button",{name:"PRÜFMODUS"}).click();
 const panel=page.getByRole("complementary",{name:"Interne Entwicklungsnavigation"});
 await expect(panel).toBeVisible();
 const box=await panel.boundingBox();
 expect(box).not.toBeNull();
 expect(box!.x).toBeGreaterThanOrEqual(0);
 expect(box!.x+box!.width).toBeLessThanOrEqual(viewport.width+1);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
});

test("review controls are absent from print",async({page})=>{
 await page.goto("/dramatik?review=1&step=finale-book");
 await page.getByRole("button",{name:"PRÜFMODUS"}).click();
 await page.emulateMedia({media:"print"});
 await expect(page.getByRole("button",{name:"PRÜFMODUS"})).toBeHidden();
 await expect(page.getByRole("complementary",{name:"Interne Entwicklungsnavigation"})).toBeHidden();
});

test("review mode can be disabled without changing the student save",async({page})=>{
 await page.goto("/dramatik");
 await page.evaluate(({key,sentinel})=>localStorage.setItem(key,JSON.stringify(sentinel)),{key,sentinel});
 await page.goto("/dramatik?review=1&step=finale-closing");
 await page.getByRole("button",{name:"PRÜFMODUS"}).click();
 await page.getByRole("button",{name:"Prüfmodus ausschalten"}).click();
 await expect(page).toHaveURL(/\/dramatik$/);
 await expect(page.getByRole("button",{name:"PRÜFMODUS"})).toHaveCount(0);
 expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(JSON.stringify(sentinel));
});
