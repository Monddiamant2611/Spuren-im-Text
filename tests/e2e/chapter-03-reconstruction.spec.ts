import {expect,test} from "@playwright/test";

const sizes=[
 {name:"desktop",width:1920,height:1080},
 {name:"laptop",width:1366,height:768},
 {name:"tablet-landscape",width:1024,height:768},
 {name:"tablet-portrait",width:768,height:1024},
 {name:"phone",width:390,height:844},
] as const;

for(const size of sizes)test(`chapter 3 reconstruction remains contained at ${size.name}`,async({page})=>{
 await page.setViewportSize(size);
 await page.goto("/dramatik?review=1&step=chapter_03-round-8");
 await expect(page.getByRole("heading",{name:"Gesprächsziele am Text"})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1)).toBe(true);
 const source=page.locator(".dialogue-source-panel");
 await expect(source).toBeVisible();
 if(size.width<=768){await source.locator("summary").click();await expect(source).not.toHaveAttribute("open","");await source.locator("summary").click();await expect(source).toHaveAttribute("open","")}
});

test("large cast montage is limited to the chapter opening",async({page})=>{
 await page.goto("/dramatik?review=1&step=chapter_03-round-1");
 await expect(page.getByRole("region",{name:"Szenenfiguren"})).toBeVisible();
 await page.goto("/dramatik?review=1&step=chapter_03-round-8");
 await expect(page.getByRole("region",{name:"Szenenfiguren"})).toHaveCount(0);
});

test("phone transfer uses a vertical, collapsible source view",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto("/dramatik?review=1&step=chapter_03-round-16");
 await expect(page.getByRole("heading",{name:"Transfer: vorsichtige Annäherung"})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1)).toBe(true);
 await expect(page.locator(".evidence-list")).toHaveCSS("grid-template-columns",/\d+px/);
});

test("conversation line offers pointer-independent move controls",async({page})=>{
 await page.goto("/dramatik?review=1&step=chapter_03-round-11");
 await expect(page.locator(".sortable-dialogue li")).toHaveCount(4);
 await expect(page.getByRole("button",{name:/Abschnitt D nach oben/})).toBeVisible();
 await expect(page.getByRole("button",{name:/Abschnitt D nach unten/})).toBeVisible();
});

test("conversation line can be reordered with a pointer drag",async({page})=>{
 await page.goto("/dramatik?review=1&step=chapter_03-round-11");
 const rows=page.locator(".sortable-dialogue li");
 const moved=rows.first();
 await moved.dragTo(rows.last());
 await expect(rows.last()).toContainText("Abschnitt D");
});

test("glossary reopens deliberately at the top",async({page})=>{
 await page.goto("/dramatik?review=1&step=chapter_03-round-8");
 await page.getByRole("button",{name:"Begriff Sprachhandlung erklären"}).click();
 const dialog=page.locator(".glossary-dialog");
 await dialog.evaluate(element=>element.scrollTop=element.scrollHeight);
 await page.getByRole("button",{name:"Schließen"}).click();
 await page.getByRole("button",{name:"Begriff Gesprächsziel erklären"}).click();
 expect(await dialog.evaluate(element=>element.scrollTop)).toBe(0);
});

test("glossary auto-opens only at the first relevant chapter step",async({page})=>{
 await page.goto("/dramatik?review=1&step=chapter_03-round-2");
 await expect(page.locator(".glossary-dialog")).toBeVisible();
 await page.getByRole("button",{name:"Analyse beginnen"}).click();
 await page.getByRole("button",{name:"PRÜFMODUS"}).click();
 await page.getByRole("button",{name:"Nächster Schritt"}).click();
 await expect(page.getByRole("heading",{name:"Was tut die Figur mit den Worten?"})).toBeVisible();
 await expect(page.locator(".glossary-dialog")).toHaveCount(0);
 await page.goto("/dramatik?review=1&step=chapter_03-completion");
 await expect(page.locator(".glossary-dialog")).toHaveCount(0);
 await expect(page.getByText("DIE STIMMEN SIND GEORDNET.",{exact:true})).toBeVisible();
});
