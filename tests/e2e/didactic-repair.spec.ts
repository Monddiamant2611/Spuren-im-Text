import {expect,test,type Page} from "@playwright/test";
import {streetSituationCards,transferSituationGroups} from "../../src/games/dramatik/data/chapter_01_content";
import {roleTasks} from "../../src/games/dramatik/data/chapter_02_content";
import {practiceActs} from "../../src/games/dramatik/data/chapter_03_content";
import {julietCountercheckOptions,transferCountercheckOptions,transferHypotheses} from "../../src/games/dramatik/data/chapter_05_content";

const storageKey="lernwerkstatt-games:state:v1";
async function openChapter(page:Page,chapter:string,session:Record<string,unknown>,completed:string[]=[]){
 await page.goto("/dramatik");await page.evaluate(({storageKey,chapter,session,completed})=>localStorage.setItem(storageKey,JSON.stringify({version:1,currentGame:"dramatik",currentChapter:chapter,completedChapters:completed,decisions:{[chapter]:session},competencies:{},failedAttempts:{},stagingDecisions:{},selectedEvidence:[],progress:{},theatreState:"INITIAL",settings:{music:false,soundEffects:false,reducedMotion:true},lastSavedAt:new Date().toISOString()})),{storageKey,chapter,session,completed});await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();
}

test("chapter 1 introduces situation terms before the task and persists that introduction",async({page})=>{
 await openChapter(page,"chapter_01",{round:4,signalStep:3,signalAnswers:[],certaintyAssignments:{},situationAssignments:{},evidenceLinked:false,transferAssignments:{},transferEvidence:{},transferSelections:{},transferConfirmed:[],seenGlossaryIntroductions:[],completed:false,failedAttempts:0,competencyEvents:[]});
 const dialog=page.getByRole("dialog",{name:"Was gehört zu einer Situationsanalyse?"});await expect(dialog).toBeVisible();await expect(dialog).toContainText("Die Situationsanalyse klärt die Ausgangslage einer Szene.");await expect(dialog).toContainText("Textbefund – plausible Erschließung – nicht feststellbar");await expect(dialog).not.toContainText("Eine Information, die sich unmittelbar am vorliegenden Text nachweisen lässt.");await expect(dialog).toContainText("Ort");await expect(dialog).not.toContainText(/Capulet|Paris|Romeo|Verona/);await dialog.getByRole("button",{name:"Analyse beginnen"}).click();
 await expect(page.getByRole("button",{name:"Begriff Ort erklären"})).toBeVisible();await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await expect(dialog).toBeHidden();
 const saved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!),storageKey);expect(saved.decisions.chapter_01.failedAttempts).toBe(0);expect(saved.decisions.chapter_01.competencyEvents).toHaveLength(0);
});

test("chapter 1 transfer uses responsive multi-selection and one combined check",async({page})=>{
 await page.setViewportSize({width:390,height:844});await openChapter(page,"chapter_01",{round:13,signalStep:3,signalAnswers:[],certaintyAssignments:{},situationAssignments:{},evidenceLinked:true,transferAssignments:{},transferEvidence:{},transferSelections:{},transferConfirmed:[],seenGlossaryIntroductions:["chapter_01"],completed:false,failedAttempts:0,competencyEvents:[]});
 await expect(page.locator(".transfer-ledger select")).toHaveCount(0);await expect(page.getByRole("button",{name:"Situationsanalyse prüfen"})).toHaveCount(1);await expect(page.getByText(/Wählen Sie \d|Markieren Sie \d/)).toHaveCount(0);
 for(const group of transferSituationGroups)for(const option of group.options.filter(item=>item.correct))await page.getByText(option.text,{exact:true}).click();await page.getByRole("button",{name:"Situationsanalyse prüfen"}).click();await expect(page.getByRole("status")).toContainText("Das Regiebuch ist wieder lesbar.");
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
});

test("scene cast changes with the actual Shakespeare scene",async({page})=>{
 await openChapter(page,"chapter_03",{round:11,seenGlossaryIntroductions:["chapter_03"]},["chapter_01","chapter_02"]);let cast=page.getByRole("region",{name:"Szenenfiguren"});await expect(cast.getByText("Romeo",{exact:true})).toBeVisible();await expect(cast.getByText("Juliette",{exact:true})).toBeVisible();await expect(cast.getByText("Tybalt",{exact:true})).toHaveCount(0);
 await openChapter(page,"chapter_04",{round:10,seenGlossaryIntroductions:["chapter_04"]},["chapter_01","chapter_02","chapter_03"]);cast=page.getByRole("region",{name:"Szenenfiguren"});await expect(cast.locator("figure")).toHaveCount(1);await expect(cast.getByText("Juliette",{exact:true})).toBeVisible();
});

test("chapter 1 explains evidence terms before their first use",async({page})=>{
 await openChapter(page,"chapter_01",{round:3,seenGlossaryIntroductions:[]});const dialog=page.getByRole("dialog",{name:"Textbefund, Erschließung und Nicht-Belegtes"});await expect(dialog).toBeVisible();await expect(dialog).toContainText("unmittelbar am vorliegenden Text");await expect(dialog).toContainText("nachvollziehbare Schlussfolgerung");await expect(dialog).not.toContainText(/Anna|Tür|Leon|Romeo/);await dialog.getByRole("button",{name:"Analyse beginnen"}).click();await expect(page.getByRole("heading",{name:"Was wissen wir wirklich?"})).toBeVisible();
});

test("chapter 1 checks the street situation only after the complete draft",async({page})=>{
 await openChapter(page,"chapter_01",{round:11,seenGlossaryIntroductions:["chapter_01"],situationDraft:{}});await expect(page.getByRole("status")).toHaveCount(0);
 for(const card of streetSituationCards){await page.locator(".loose-pages button").filter({hasText:card.text}).first().click();const target=card.id==="street_place"?"Zeit":card.target==="characters"?"Figuren":card.target==="history"?"Vorgeschichte":card.target==="conditions"?"Bedingungen":card.target==="place"?"Ort":"Nicht feststellbar";await page.locator(".situation-ledger").getByRole("button",{name:new RegExp(`^${target}`)}).click()}
 await expect(page.getByRole("status")).toHaveCount(0);await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await page.getByRole("button",{name:"Auswahl prüfen"}).click();await expect(page.getByRole("status")).toContainText("Ort");
 await page.locator(".loose-pages button").filter({hasText:streetSituationCards[0].text}).first().click();await page.locator(".situation-ledger").getByRole("button",{name:/^Ort/}).click();await page.getByRole("button",{name:"Auswahl prüfen"}).click();await expect(page.getByRole("heading",{name:"Figurenrede ergänzt die Situation"})).toBeVisible();
});

test("chapter 2 shows a protected source for every goal motive and interest task",async({page})=>{
 await openChapter(page,"chapter_02",{round:6,seenGlossaryIntroductions:["chapter_02"]},["chapter_01"]);await expect(page.getByText("Mein Gemahl ist auf Erden",{exact:false})).toBeVisible();await expect(page.getByText("Was möchte eine Figur in der konkreten Situation erreichen?",{exact:true})).toBeVisible();await expect(page.getByText("Der Text liefert nicht genug Hinweise, um eine Aussage zuverlässig zu begründen.",{exact:true})).toBeVisible();for(const task of roleTasks.slice(0,4))await expect(page.getByText(task.observation,{exact:true})).toBeVisible();
});

test("chapter 2 completion is explicit and returns to the unlocked theatre",async({page})=>{
 await openChapter(page,"chapter_02",{round:11,completed:true,seenGlossaryIntroductions:["chapter_02"]},["chapter_01","chapter_02"]);await page.getByRole("button",{name:/Kapitel 2 öffnen/}).click();await expect(page.getByText("Die Figurenakte ist vollständig.",{exact:true})).toBeVisible();await page.getByRole("button",{name:"Zur großen Bühne"}).click();await expect(page.getByRole("button",{name:/Kapitel 3 öffnen/})).toBeVisible();
});

test("glossary dialogs reopen at their beginning",async({page})=>{
 await openChapter(page,"chapter_02",{round:6,seenGlossaryIntroductions:["chapter_02"]},["chapter_01"]);await page.getByRole("button",{name:"Begriff Motiv erklären"}).click();const dialog=page.getByRole("dialog",{name:"Motiv"});await dialog.evaluate(node=>{node.scrollTop=999});await dialog.getByRole("button",{name:"Schließen"}).click();await page.getByRole("button",{name:"Begriff Motiv erklären"}).click();expect(await dialog.evaluate(node=>node.scrollTop)).toBe(0);
});

test("always choosing the first answer no longer solves chapter 3",async({page})=>{
 await openChapter(page,"chapter_03",{round:2,seenGlossaryIntroductions:["chapter_03"]},["chapter_01","chapter_02"]);const task=practiceActs[0];expect(task.actOptions[0]).not.toBe(task.act);await page.locator(".dialogue-choice").first().getByRole("button").first().click();await expect(page.getByRole("status")).toContainText("Prüfen");await expect(page.getByText("Probe 2 von 12")).toBeVisible();
});

test("chapter 1 scene 6 cannot be solved by always choosing the first option",async({page})=>{
 await openChapter(page,"chapter_01",{round:12,evidenceLinked:false,seenGlossaryIntroductions:["chapter_01","chapter_01_evidence"]});for(const field of await page.locator(".evidence-chain fieldset").all())await field.getByRole("button").first().click();await page.getByRole("button",{name:"Verbindung in das Regiebuch eintragen"}).click();await expect(page.getByRole("heading",{name:"Figurenrede ergänzt die Situation"})).toBeVisible();
});

test("chapter 5 counterchecks use plausible distractors at different positions",async({page})=>{
 await openChapter(page,"chapter_05",{round:7,seenGlossaryIntroductions:["chapter_05"]},["chapter_01","chapter_02","chapter_03","chapter_04"]);await page.getByRole("button",{name:julietCountercheckOptions[0].text,exact:true}).click();await expect(page.getByText("Station 7 von 18")).toBeVisible();await page.getByRole("button",{name:julietCountercheckOptions.find(item=>item.id==="juliet_has_agency")!.text,exact:true}).click();await expect(page.getByText("Station 8 von 18")).toBeVisible();
 await openChapter(page,"chapter_05",{round:15,seenGlossaryIntroductions:["chapter_05"],transferHypothesis:transferHypotheses.find(item=>item.quality==="supported")!.text},["chapter_01","chapter_02","chapter_03","chapter_04"]);expect(transferCountercheckOptions.findIndex(item=>item.id==="apothecary_resists")).toBe(2);await page.getByRole("button",{name:transferCountercheckOptions[0].text,exact:true}).click();await expect(page.getByText("Station 15 von 18")).toBeVisible();await page.getByRole("button",{name:transferCountercheckOptions[2].text,exact:true}).click();await expect(page.getByText("Station 16 von 18")).toBeVisible();
});
