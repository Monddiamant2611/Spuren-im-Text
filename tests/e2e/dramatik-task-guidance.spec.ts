import {expect,test} from "@playwright/test";

const chapters=[
 ["chapter_01",13],
 ["chapter_02",17],
 ["chapter_03",16],
 ["chapter_04",22],
 ["chapter_05",18],
] as const;

test("all 86 learning stations show an explicit instruction at the workspace",async({page})=>{
 for(const[chapter,count]of chapters){
  for(let round=1;round<=count;round+=1){
   await page.goto(`/dramatik?review=1&step=${chapter}-round-${round}`);
   const instructions=page.locator("[data-task-instruction]");
   await expect(instructions.first(),`${chapter}, station ${round}`).toBeVisible();
   await expect(instructions.first(),`${chapter}, station ${round}`).not.toBeEmpty();
  }
 }
});

test("task instructions remain readable without horizontal overflow",async({page})=>{
 for(const viewport of[{width:360,height:800},{width:390,height:844},{width:430,height:932},{width:768,height:1024},{width:1366,height:768}]){
  await page.setViewportSize(viewport);
  for(const step of["chapter_01-round-11","chapter_02-round-15","chapter_03-round-8","chapter_04-round-14","chapter_05-round-12"]){
   await page.goto(`/dramatik?review=1&step=${step}`);
   const instruction=page.locator("[data-task-instruction]").first();
   await expect(instruction).toBeVisible();
   const box=await instruction.boundingBox();
   expect(box?.x??-1).toBeGreaterThanOrEqual(0);
   expect((box?.x??0)+(box?.width??0)).toBeLessThanOrEqual(viewport.width+1);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
  }
 }
});

test("Begriffskarten are optional, keyboard-operable, and deduplicated",async({page})=>{
 await page.goto("/dramatik");
 await page.getByRole("button",{name:"Spiel beginnen"}).click();
 const trigger=page.getByRole("button",{name:"Begriffskarten"});
 await trigger.focus();
 await page.keyboard.press("Enter");
 await expect(page.getByRole("heading",{name:"Begriffskarten",level:2})).toBeVisible();
 const cards=page.locator('button[aria-expanded]');
 expect(await cards.count()).toBeGreaterThanOrEqual(25);
 const labels=await cards.locator("strong").allTextContents();
 expect(new Set(labels).size).toBe(labels.length);
 await cards.first().focus();
 await page.keyboard.press("Space");
 await expect(cards.first()).toHaveAttribute("aria-expanded","true");
});
