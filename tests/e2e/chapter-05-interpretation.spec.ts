import {expect,test} from "@playwright/test";
import {argumentBlocks,classificationCards,commonErrors,errorRepairs,generalChain,generalCountercheckOptions,hypothesisOptions,interpretationStructure,julietCountercheckOptions,julietFindings,julietRefinementParts,julietReverseChain,synthesisSteps,transferArgument,transferChain,transferCountercheckOptions,transferEvidence,transferHypotheses,transferRefined,transferRefinementParts} from "../../src/games/dramatik/data/chapter_05_content";

test("dramatik starts without an uncaught error and opens chapter 5 from a compatible save",async({page})=>{
 const pageErrors:string[]=[];page.on("pageerror",error=>pageErrors.push(error.message));
 await page.goto("/dramatik");await page.evaluate(()=>localStorage.clear());await page.reload();
 await expect(page.getByRole("heading",{name:/DIE LETZTE AUFFÜHRUNG/})).toBeVisible();await page.getByRole("button",{name:"Spiel beginnen"}).click();
 await expect(page.getByRole("region",{name:"Interaktive Theaterübersicht"})).toBeVisible();
 await page.evaluate(()=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify({version:1,currentGame:"dramatik",currentChapter:"chapter_05",completedChapters:["chapter_01","chapter_02","chapter_03","chapter_04"],decisions:{},competencies:{},failedAttempts:{},stagingDecisions:{chapter_04:{}},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_4",settings:{music:false,soundEffects:false,reducedMotion:true},lastSavedAt:new Date().toISOString()})));
 await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await expect(page.getByRole("heading",{name:"Was bedeutet das?"})).toBeVisible();
 expect(pageErrors).toEqual([]);
});

test("chapter 5 builds and persists a complete evidence-based interpretation without staging",async({page})=>{
 await page.goto("/dramatik");
 await page.evaluate(()=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify({version:1,currentGame:"dramatik",currentChapter:"chapter_05",completedChapters:["chapter_01","chapter_02","chapter_03","chapter_04"],decisions:{},competencies:{},failedAttempts:{},stagingDecisions:{chapter_04:{}},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_4",settings:{music:false,soundEffects:false,reducedMotion:true},lastSavedAt:new Date().toISOString()})));
 await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();
 await expect(page.getByRole("heading",{name:"Was bedeutet das?"})).toBeVisible();
 for(const item of classificationCards){await page.getByRole("button",{name:item.text}).click();await page.getByRole("button",{name:item.target==="observation"?"Textbefund":"geht über die Beobachtung hinaus",exact:true}).click()}
 for(const item of generalChain)await page.getByRole("button",{name:new RegExp(item.text.slice(0,18))}).click();
 await page.getByRole("button",{name:hypothesisOptions.find(x=>x.quality==="supported")!.text}).click();
 await page.getByRole("button",{name:generalCountercheckOptions.find(item=>item.action==="refine")!.text}).click();
 for(const item of julietFindings){await page.getByRole("button",{name:item.text}).click();const zone=item.accepted[0]==="direct"?"stützt unmittelbar":item.accepted[0]==="supplement"?"ergänzt":"kaum relevant";await page.getByRole("button",{name:zone,exact:true}).click()}
 for(const item of [...julietReverseChain].reverse())await page.getByRole("button",{name:new RegExp(item.text.slice(0,16))}).click();
 await page.getByRole("button",{name:julietCountercheckOptions.find(item=>item.id==="juliet_has_agency")!.text,exact:true}).click();for(const part of julietRefinementParts)await page.getByRole("button",{name:part.text,exact:true}).click();
 for(const item of argumentBlocks)await page.getByRole("button",{name:new RegExp(item.text.slice(0,16))}).click();
 for(const item of commonErrors){await page.getByRole("button",{name:item.text}).click();await page.getByRole("button",{name:({evidence_without_analysis:"Beleg ohne Analyse",unsupported_claim:"unbelegte Behauptung",summary_only:"bloße Inhaltsangabe",overinterpretation:"Überinterpretation",missing_link:"fehlende Rückbindung"} as Record<string,string>)[item.target]}).click();const repair=errorRepairs.find(entry=>entry.id===item.id)!;await page.getByRole("button",{name:repair.text}).click()}
 for(const text of interpretationStructure)await page.getByRole("button",{name:text}).click();
 for(const item of transferEvidence.filter(x=>x.relevance!=="little").slice(0,4))await page.getByRole("button",{name:item.text}).click();
 await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await expect(page.getByRole("heading",{name:"Transferanalyse"})).toBeVisible();
 for(const item of transferChain)await page.getByRole("button",{name:new RegExp(item.text.slice(0,18))}).click();
 await page.getByRole("button",{name:transferHypotheses.find(x=>x.quality==="supported")!.text}).click();await page.getByRole("button",{name:transferCountercheckOptions.find(item=>item.id==="apothecary_resists")!.text,exact:true}).click();for(const part of transferRefinementParts)await page.getByRole("button",{name:part.text,exact:true}).click();
 for(const item of transferArgument)await page.getByRole("button",{name:new RegExp(item.text.slice(0,18))}).click();
 for(const item of synthesisSteps)await page.getByRole("button",{name:item.text,exact:true}).click();await page.getByRole("button",{name:"Zur großen Bühne"}).click();await page.getByRole("region",{name:"Kapitel abgeschlossen"}).getByRole("button",{name:"Zur großen Bühne"}).click();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("lernwerkstatt-games:state:v1")!));
 expect(saved.currentChapter).toBe("finale");expect(saved.completedChapters).toContain("chapter_05");expect(saved.decisions.chapter_05.transferRevision).toBe(transferRefined);expect(saved.stagingDecisions.chapter_05_revision).toBeUndefined();
});

for(const viewport of [{width:1366,height:768},{width:1024,height:768},{width:768,height:1024},{width:390,height:844},{width:360,height:800}])test(`chapter 5 remains readable at ${viewport.width}x${viewport.height}`,async({page})=>{
 await page.setViewportSize(viewport);await page.goto("/dramatik?review=1&step=chapter_05-round-12");
 await expect(page.locator(".chapter05-workshop")).toHaveCSS("background-image",/bg_analysis_room|Weitere%20Theaterkulisse|Weitere Theaterkulisse/);
 await expect(page.getByRole("heading",{name:/Romeo und der Apotheker/})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
 const labels=await page.locator(".chapter05-desk").innerText();expect(labels).not.toMatch(/\b(CLAIM|MEANING|ANALYSIS|OBSERVATION|EVIDENCE|INTERPRETATION)\b/);
});

test("interpretation track, contextual help, diagnostic feedback and recursive countercheck are accessible",async({page})=>{
 await page.goto("/dramatik?review=1&step=chapter_05-round-1");
 const trace=page.getByRole("region",{name:"Begriffshilfen zur Interpretation"});const textFinding=trace.getByRole("button",{name:"Begriff Textbefund erklären"});await expect(textFinding).not.toHaveAttribute("aria-current");await expect(trace.getByText("Interpretationsspur",{exact:true})).toHaveCount(0);await expect(trace.locator(".glossary-tool-check")).toHaveCount(0);
 for(const term of ["Textbefund","Analyse","Wirkung / Funktion","Bedeutung","Deutungshypothese","Argumentation","Gegenbefund","Rückbindung"]){const trigger=trace.getByRole("button",{name:`Begriff ${term} erklären`});await trigger.click();await expect(page.locator(".glossary-backdrop")).toBeVisible();const dialog=page.getByRole("dialog",{name:term});await expect(dialog).toBeVisible();if(term==="Textbefund"){await expect(dialog).toContainText("noch nicht deuten");await dialog.getByRole("button",{name:"Schließen"}).click()}else await page.keyboard.press("Escape");await expect(trigger).toBeFocused()}
 await page.getByRole("button",{name:classificationCards[0].text}).click();await page.getByRole("button",{name:"geht über die Beobachtung hinaus",exact:true}).click();
 await expect(page.locator(".interpretation-feedback")).toContainText("Noch nicht");
 await page.goto("/dramatik?review=1&step=chapter_05-round-18");await expect(page.getByRole("button",{name:"Begriff Gegenbefund erklären"})).toBeVisible();await expect(page.getByRole("button",{name:"Begriff Rückbindung erklären"})).toBeVisible();
});

test("chapter 5 glossary controls use the same computed visual path as chapter 3",async({page})=>{
 const styles=async()=>page.locator(".glossary-tools button").first().evaluate(element=>{const style=getComputedStyle(element);return {minHeight:style.minHeight,padding:style.padding,background:style.backgroundColor,color:style.color,border:style.border,borderRadius:style.borderRadius,fontSize:style.fontSize}});
 await page.goto("/dramatik?review=1&step=chapter_03-round-8");const chapter3=await styles();await page.getByRole("button",{name:"Begriff Gesprächsziel erklären"}).click();const chapter3Dialog=await page.locator(".glossary-dialog").evaluate(element=>{const style=getComputedStyle(element);return {width:style.width,padding:style.padding,border:style.border,borderRadius:style.borderRadius,background:style.backgroundImage,position:style.position}});
 await page.goto("/dramatik?review=1&step=chapter_05-round-1");expect(await styles()).toEqual(chapter3);await page.getByRole("button",{name:"Begriff Textbefund erklären"}).click();expect(await page.locator(".glossary-dialog").evaluate(element=>{const style=getComputedStyle(element);return {width:style.width,padding:style.padding,border:style.border,borderRadius:style.borderRadius,background:style.backgroundImage,position:style.position}})).toEqual(chapter3Dialog);
});

test("Juliette uses the portrait room and the completion stays quiet",async({page})=>{
 await page.goto("/dramatik?review=1&step=chapter_05-round-5");await expect(page.locator(".chapter05-workshop")).toHaveCSS("background-image",/bg_portrait_room|Figurenportr/);
 await page.goto("/dramatik?review=1&step=chapter_05-completion");const completion=page.getByRole("region",{name:"Kapitel abgeschlossen"});await expect(completion).toContainText("DIE DEUTUNG IST BEGRÜNDET.");await expect(completion.getByRole("button",{name:"Zur großen Bühne"})).toBeVisible();await expect(page.locator(".glossary-intro-dialog")).toHaveCount(0);await expect(page.locator(".chapter05-desk")).toHaveCount(0);await expect(page.locator(".interpretation-trace")).toHaveCount(0);
});

test("chapter 5 visual workshop keeps trace, manuscripts, argument paths and completion readable",async({page})=>{
 await page.setViewportSize({width:1366,height:768});
 await page.goto("/dramatik?review=1&step=chapter_05-round-1");
 const traceBox=await page.locator(".interpretation-trace").boundingBox();expect(traceBox!.height).toBeLessThan(120);
 await page.goto("/dramatik?review=1&step=chapter_05-round-5");
 const julietSource=await page.locator(".chapter05-source").boundingBox();expect(julietSource!.width).toBeGreaterThan(400);await expect(page.locator(".chapter05-round-5")).toHaveCSS("grid-template-columns",/px/);
 await page.goto("/dramatik?review=1&step=chapter_05-round-12");
 const romeoSource=await page.locator(".chapter05-source").boundingBox();expect(romeoSource!.width).toBeGreaterThan(400);
 await page.goto("/dramatik?review=1&step=chapter_05-round-17");
 const argumentCards=await page.locator(".argument-path .choice-grid button").all();for(const card of argumentCards){const box=await card.boundingBox();expect(box!.width).toBeGreaterThan(230)}
 await page.goto("/dramatik?review=1&step=chapter_05-completion");
 const completion=page.getByRole("region",{name:"Kapitel abgeschlossen"});const completionBox=await completion.boundingBox();expect(Math.abs((completionBox!.y+completionBox!.height/2)-768/2)).toBeLessThan(90);await expect(page.locator(".chapter05-desk,.interpretation-trace,.scene-characters")).toHaveCount(0);
});
