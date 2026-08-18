import {expect,test} from "@playwright/test";
import {argumentBlocks,classificationCards,commonErrors,generalChain,hypothesisOptions,interpretationStructure,julietFindings,julietHypothesis,julietReverseChain,transferArgument,transferChain,transferEvidence,transferHypotheses,transferRefined} from "../../src/games/dramatik/data/chapter_05_content";

test("chapter 5 builds and persists a complete evidence-based interpretation without staging",async({page})=>{
 await page.goto("/dramatik");
 await page.evaluate(()=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify({version:1,currentGame:"dramatik",currentChapter:"chapter_05",completedChapters:["chapter_01","chapter_02","chapter_03","chapter_04"],decisions:{},competencies:{},failedAttempts:{},stagingDecisions:{chapter_04:{}},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_4",settings:{music:false,soundEffects:false,reducedMotion:true},lastSavedAt:new Date().toISOString()})));
 await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();
 await expect(page.getByRole("heading",{name:"Was bedeutet das?"})).toBeVisible();
 for(const item of classificationCards){await page.getByRole("button",{name:item.text}).click();await page.getByRole("button",{name:({observation:"Textbeobachtung",analysis:"Analyse",interpretation:"Interpretation",unsupported:"nicht ausreichend belegt"} as Record<string,string>)[item.target]}).click()}
 for(const item of generalChain)await page.getByRole("button",{name:new RegExp(item.text.slice(0,18))}).click();
 await page.getByRole("button",{name:hypothesisOptions.find(x=>x.quality==="supported")!.text}).click();
 await page.getByRole("button",{name:/durch den widersprüchlichen zweiten Satz präzisieren/}).click();
 for(const item of julietFindings){await page.getByRole("button",{name:item.text}).click();const zone=item.accepted[0]==="direct"?"stützt unmittelbar":item.accepted[0]==="supplement"?"ergänzt":"kaum relevant";await page.getByRole("button",{name:zone,exact:true}).click()}
 for(const item of [...julietReverseChain].reverse())await page.getByRole("button",{name:new RegExp(item.text.slice(0,16))}).click();
 await page.getByRole("button",{name:/widerspricht ausdrücklich und bittet/}).click();await page.getByRole("button",{name:julietHypothesis}).click();
 for(const item of argumentBlocks)await page.getByRole("button",{name:new RegExp(item.text.slice(0,16))}).click();
 for(const item of commonErrors){await page.getByRole("button",{name:item.text}).click();await page.getByRole("button",{name:({evidence_without_analysis:"Beleg ohne Analyse",unsupported_claim:"unbelegte Behauptung",summary_only:"bloße Inhaltsangabe"} as Record<string,string>)[item.target]}).click()}
 for(const text of interpretationStructure)await page.getByRole("button",{name:text}).click();
 for(const item of transferEvidence.filter(x=>x.relevance!=="little").slice(0,4))await page.getByRole("button",{name:item.text}).click();
 await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await expect(page.getByText("Transferkette",{exact:true})).toBeVisible();
 for(const item of transferChain)await page.getByRole("button",{name:new RegExp(item.text.slice(0,18))}).click();
 await page.getByRole("button",{name:transferHypotheses.find(x=>x.quality==="supported")!.text}).click();await page.getByRole("button",{name:/verweist auf das Gesetz/}).click();await page.getByRole("button",{name:transferRefined}).click();
 for(const item of transferArgument)await page.getByRole("button",{name:new RegExp(item.text.slice(0,18))}).click();
 await page.getByRole("button",{name:/Gegenbelege bestimmen ihre Reichweite/}).click();await page.getByRole("button",{name:"Kapitel abschließen"}).click();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("lernwerkstatt-games:state:v1")!));
 expect(saved.currentChapter).toBe("finale");expect(saved.completedChapters).toContain("chapter_05");expect(saved.decisions.chapter_05.transferRevision).toBe(transferRefined);expect(saved.stagingDecisions.chapter_05_revision).toBeUndefined();
});
