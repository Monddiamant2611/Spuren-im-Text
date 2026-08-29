import {expect,test} from "@playwright/test";

async function openReview(page:import("@playwright/test").Page,round:number){await page.goto(`/dramatik?review=1&step=chapter_02-round-${round}`);await expect(page.getByText("PRÜFMODUS · Änderungen werden nicht gespeichert und nicht bewertet.")).toBeVisible()}

test("all general figure-analysis training precedes Shakespeare",async({page})=>{
 for(const round of [3,4,5,6,7,8]){await openReview(page,round);await expect(page.getByText("Originaltext · Wieland-Ausgabe")).toHaveCount(0);await expect(page.getByText(/Übungstext · nicht von Shakespeare|Eine einzelne Handlung/).first()).toBeVisible()}
 await openReview(page,9);await expect(page.getByText("Originaltext · Wieland-Ausgabe")).toBeVisible();await expect(page.getByText(/Die Figurenakte ist vorbereitet/)).toBeVisible();
});

test("chapter 2 uses readable evidence cards instead of truncated quote selects",async({page})=>{
 await openReview(page,13);await expect(page.locator(".evidence-entry select")).toHaveCount(0);await expect(page.locator(".text-card-picker label").first()).toBeVisible();
 await openReview(page,17);await expect(page.locator(".text-card-picker label").first()).toBeVisible();await expect(page.locator(".connection-builder select")).toHaveCount(0);await expect(page.getByRole("button",{name:/Zielfigur:/})).toBeVisible();
});

test("relationship rounds require one active analysis and evidence pair",async({page})=>{
 await openReview(page,7);await expect(page.getByText("Beziehung 1 von 4")).toBeVisible();await expect(page.locator(".evidence-entry")).toHaveCount(1);await expect(page.getByText("Aylin vertraut Ben Verantwortung an, behält aber einen Teil der Kontrolle.")).toBeVisible();
 await openReview(page,13);await expect(page.getByText("Beziehungsrichtung 1 von 2")).toBeVisible();await expect(page.locator(".evidence-entry")).toHaveCount(1);await expect(page.getByText("Juliette orientiert ihre Antwort am Willen ihrer Mutter und setzt zugleich eine Grenze.")).toBeVisible();
});

test("transfer is sequential and comparison sources remain reopenable",async({page})=>{
 await openReview(page,15);await expect(page.getByText("Analyse 1 von 4")).toBeVisible();await expect(page.locator(".evidence-entry")).toHaveCount(1);
 await openReview(page,16);await expect(page.getByRole("button",{name:"Frühere Szene erneut anzeigen"})).toBeVisible();await expect(page.getByRole("button",{name:"Spätere Szene erneut anzeigen"})).toBeVisible();
});

test("ensemble uses one selectable portrait row and the unambiguous Zielfigur label",async({page})=>{
 await openReview(page,17);await expect(page.locator(".final-portraits")).toHaveCount(1);await expect(page.getByText("Zielfigur",{exact:false}).first()).toBeVisible();await expect(page.getByText("Eine Figur zeigt sich durch das, was sie sagt, tut und auslöst.")).toHaveCount(0);
});

for(const viewport of [{width:1920,height:1080},{width:1366,height:768},{width:1024,height:768},{width:768,height:1024},{width:390,height:844}])test(`chapter 2 remains readable at ${viewport.width}x${viewport.height}`,async({page})=>{
 for(const round of [7,13,15,17]){await page.setViewportSize(viewport);await openReview(page,round);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await expect(page.locator(".ensemble-dossier")).toBeVisible()}
});

test("Lorenzo uses the larger grounded desktop guide rule",async({page})=>{
 await page.setViewportSize({width:1366,height:768});await openReview(page,2);const box=await page.locator(".ensemble-lorenzo").evaluate(node=>{const r=node.getBoundingClientRect();return{ratio:r.width/innerWidth,gap:Math.abs(innerHeight-r.bottom)}});expect(box.ratio).toBeGreaterThan(.3);expect(box.gap).toBeLessThan(2);
});
