import { expect, test, type Page } from "@playwright/test";
import { characterizationCards, chapter02PrimaryById, comparisonCards, ensembleLinks, highlightTasks, momentClaims, practiceClaims, relationshipTasks, roleTasks, selfOtherTasks, transferTasks } from "../../src/games/dramatik/data/chapter_02_content";
import { chapter03Source, comparisonTasks as chapter03Comparisons, goalChange, goalTasks as chapter03Goals, languageTasks as chapter03Language, mainSections, practiceActs as chapter03Practice, speechTasks as chapter03Speech, transferTasks as chapter03Transfer } from "../../src/games/dramatik/data/chapter_03_content";
import { causalIntro, chain, chainLinks, conflictTypes, escalationCards, finalConnections, introFacts, julietCards, knowledgeCards, situationCards } from "../../src/games/dramatik/data/chapter_04_content";
import { argumentBlocks, classificationCards, commonErrors, generalChain, hypothesisOptions, interpretationStructure, julietFindings, julietHypothesis, julietReverseChain, transferArgument, transferChain, transferEvidence, transferHypotheses, transferRefined } from "../../src/games/dramatik/data/chapter_05_content";
import { certaintyClaims, situationEvidence, streetSituationCards, transferFields } from "../../src/games/dramatik/data/chapter_01_content";

test.beforeEach(async ({ page }) => { await page.goto("/dramatik"); await page.evaluate(() => localStorage.clear()); await page.reload(); });

async function leaveChapter(page: Page) { await page.getByRole("button", { name: /Theater/ }).click(); }
async function selectAndPlace(page: Page, item: string | RegExp, zone: string | RegExp) { await page.getByRole("button", { name: item }).click(); await page.getByRole("button", { name: zone }).click(); }
async function completeChapter01(page:Page){
  await page.getByRole("button",{name:"Regiebuch untersuchen"}).click();
  await page.getByRole("button",{name:"ANNA"}).click();
  await page.getByRole("button",{name:/bleibt vor der Tür stehen/}).click();
  await page.getByRole("button",{name:"Noch könnte ich umkehren."}).click();
  for(const claim of certaintyClaims)await selectAndPlace(page,claim.text,claim.target==="explicit"?"Eindeutig belegt":claim.target==="inference"?"Plausibel erschließbar":"Nicht belegt");
  await page.getByRole("button",{name:"Shakespeare-Regiebuch öffnen"}).click();
  for(const card of streetSituationCards){
    await page.getByRole("button",{name:card.text,exact:true}).click();
    await page.getByRole("button",{name:card.target==="place"?"Ort":card.target==="characters"?"Figuren":card.target==="history"?"Vorgeschichte":card.target==="conditions"?"Bedingungen":"Nicht feststellbar"}).click();
  }
  await page.getByRole("button",{name:/Sampson\. Sey ohne Sorge/}).click();
  await page.getByRole("button",{name:situationEvidence.observation}).click();
  await page.getByRole("button",{name:situationEvidence.situation}).click();
  await page.getByRole("button",{name:"Verbindung in das Regiebuch eintragen"}).click();
  for(const field of transferFields){
    const label=field.field==="place"?"Ort":field.field==="time"?"Zeit":field.field==="characters"?"Figuren":field.field==="history"?"Vorgeschichte":"Bedingungen";
    const card=page.locator(".transfer-ledger article").filter({has:page.getByRole("heading",{name:label,exact:true})});
    await card.locator("select").nth(0).selectOption({label:field.answer});
    await card.locator("select").nth(1).selectOption(field.evidenceId??"Keine Textstelle erforderlich");
    await card.getByRole("button",{name:"Eintrag prüfen"}).click();
  }
}
async function completeChapter04(page:Page){
 for(const item of introFacts.filter(x=>x.relevant))await page.getByRole("button",{name:item.label}).click();
 await page.getByRole("button",{name:"Mara: Feier · Vater: Lernen"}).click();
 for(const item of conflictTypes)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.answer==="external"?"Äußerer Konflikt":"Innerer Konflikt"}).click();
 for(const item of causalIntro)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.answer==="temporal"?"Nur zeitlich nacheinander":"Kausal verbunden"}).click();
 for(const item of situationCards)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.target==="situation"?"Ausgangslage":item.target==="prior"?"Vorgeschichte":"Nicht feststellbar"}).click();
 for(const item of knowledgeCards)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.target==="romeo"?/Romeo weiß/:/Paris weiß/}).click();
 await page.locator(".causal-board>fieldset").nth(0).locator(".source-card").first().click();
 await page.locator(".causal-board>fieldset").nth(1).locator(".source-card").first().click();
 for(const item of chain)await page.getByRole("button",{name:item.label,exact:true}).click();
 for(const [index,link] of chainLinks.entries()){const field=page.locator(".relation-checks>fieldset").nth(index);await field.getByRole("button",{name:link.type==="causes"?"Verursacht":"Trägt bei",exact:true}).click()}
 await page.locator("fieldset").filter({hasText:"Paris hält Romeo an."}).getByRole("button",{name:"Handlung"}).click();
 await page.locator("fieldset").filter({hasText:"Romeo fordert Paris"}).getByRole("button",{name:"Reaktion"}).click();
 await page.getByRole("button",{name:/Paris hätte Romeos Aufforderung/}).click();
 for(const item of escalationCards)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.level==="tension"?"Anspannung":item.level==="escalation"?"Zuspitzung":"Wendepunkt"}).click();
 await page.getByRole("button",{name:/Sie fechten\. Paris fällt/}).click();
 await page.locator("fieldset").filter({hasText:"Der Konflikt wird körperlich."}).getByRole("button",{name:"Unmittelbare Folge"}).click();
 await page.locator("fieldset").filter({hasText:"Paris fällt im Kampf."}).getByRole("button",{name:"Weitere Folge"}).click();
 await page.locator("fieldset").filter({hasText:"Ohne Kampf wäre sicher Frieden entstanden."}).getByRole("button",{name:"Nicht feststellbar"}).evaluate(element=>(element as HTMLButtonElement).click());
 await page.getByRole("button",{name:"Den inneren Konflikt untersuchen"}).click();
 for(const item of julietCards)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.kind==="situation"?"Ausgangslage":item.kind==="supports_action"?"Spricht für das Handeln":item.kind==="feared_possibility"?"Befürchtete Möglichkeit":item.kind==="decision"?"Entscheidung":"Ausführung"}).dispatchEvent("click");
 for(const item of julietCards)await page.getByRole("button",{name:item.label,exact:true}).dispatchEvent("click");
 await page.getByRole("button",{name:/Romeo, ich komme/}).click();
 await page.getByRole("button",{name:/An der Gruft treffen unvereinbare/}).click();
 for(const item of finalConnections)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.answer==="causes"?"Verursacht":item.answer==="contributes"?"Trägt bei":"Nur später"}).click();
 for(const label of ["Ausgangslage","Ziel","Konflikt","Handlung","Reaktion","Wendepunkt oder begründet keiner","Folge","Textbeleg"])await page.getByRole("button",{name:label,exact:true}).click();
 await page.getByRole("button",{name:"Handlungsbuch restaurieren"}).click();
}

test("complete learning path reaches the restored director's book without a dead state", async ({ page }) => {
  test.setTimeout(120_000);
  await page.getByRole("button", { name: "Spiel beginnen" }).click();
  await page.getByRole("button", { name: /Regiepult: verfügbar/ }).click();

  await completeChapter01(page);
  await leaveChapter(page);
  await expect(page.getByRole("button", { name: /Ensemblewand: verfügbar/ })).toBeEnabled();
  await page.getByRole("button", { name: /Ensemblewand: verfügbar/ }).click();

  await page.getByRole("button",{name:"Erste Figurenakte öffnen"}).click();
  for(const item of practiceClaims)await selectAndPlace(page,item.text,item.target==="explicit"?"Eindeutig belegt":item.target==="inference"?"Plausibel erschließbar":"Nicht belegt");
  for(const item of characterizationCards)await selectAndPlace(page,item.text,item.target==="direct"?/^Direkt\b/:/^Indirekt\b/);
  for(const task of highlightTasks)await page.getByRole("button",{name:chapter02PrimaryById(task.sourceId).text}).click();
  for(const item of momentClaims)await selectAndPlace(page,item.text,item.target==="supported"?"Gut gestützt":item.target==="uncertain"?"Möglich, aber unsicher":"Nicht gestützt");
  for(const item of roleTasks)await selectAndPlace(page,item.observation,item.target==="goal"?"Ziel":item.target==="interest"?"Interesse / Bedürfnis":"Nicht sicher feststellbar");
  for(const task of relationshipTasks){const card=page.locator(".evidence-entry:not(.done)").first();await card.locator("select").selectOption(task.sourceId);await card.getByRole("button",{name:"Beleg prüfen"}).click()}
  for(const item of selfOtherTasks)await selectAndPlace(page,item.text,item.target==="self"?"So zeigt sich die Figur":"So erscheint sie anderen");
  for(const task of transferTasks){const card=page.locator(".evidence-entry:not(.done)").first();await card.locator("select").selectOption(task.sourceId);await card.getByRole("button",{name:"Beleg prüfen"}).click()}
  for(const item of comparisonCards)await selectAndPlace(page,item.text,item.target==="early"?"Frühere Situation":item.target==="late"?"Spätere Situation":"Vorsichtige Schlussfolgerung");
  for(const link of ensembleLinks){const selects=page.locator(".connection-builder select");await selects.nth(0).selectOption(link.from);await selects.nth(1).selectOption(link.to);await selects.nth(2).selectOption(link.sourceId);await page.getByRole("button",{name:"Verbindung eintragen"}).click()}
  await leaveChapter(page);
  await page.getByRole("button", { name: /Probenbühne: verfügbar/ }).click();
  await page.getByRole("button",{name:"Allgemeine Dialogprobe beginnen"}).click();
  for(const item of chapter03Practice)await page.locator(".dialogue-choice").first().getByRole("button",{name:item.act,exact:true}).click();
  for(const item of chapter03Practice)await page.locator(".dialogue-choice").first().getByRole("button",{name:item.goal,exact:true}).click();
  for(const task of chapter03Goals)await page.locator(".source-button").filter({hasText:chapter03Source(task.sourceId).text}).click();
  await page.getByRole("button",{name:goalChange.answer.replaceAll("_"," "),exact:true}).click();
  for(const task of chapter03Speech)await page.getByRole("button",{name:`${task.act} → passende Reaktion`,exact:true}).click();
  for(const section of mainSections)await page.getByRole("button",{name:new RegExp(section.label)}).click();
  await page.getByRole("button",{name:"Gesprächslinie prüfen"}).click();
  await page.locator(".dialogue-choice button").first().click();
  for(const task of chapter03Language)await page.getByRole("button",{name:new RegExp(task.feature)}).first().click();
  for(const name of ["IM TEXT BELEGT","ALS INSZENIERUNG MÖGLICH","NICHT BELEGT"])await page.getByRole("button",{name,exact:true}).click();
  for(const task of chapter03Transfer)await page.locator(".dialogue-options button").filter({hasText:chapter03Source(task.sourceId).text}).click();
  for(const task of chapter03Comparisons)await page.getByRole("button",{name:task.target==="main"?"KONFLIKTDIALOG":task.target==="transfer"?"ANNÄHERUNGSDIALOG":"BEIDE DIALOGE",exact:true}).click();
  for(const id of ["c03_transfer_juliette_danger","c03_transfer_romeo_love","c03_transfer_juliette_concern"])await page.locator(".source-button").filter({hasText:chapter03Source(id).text}).click();
  await page.getByRole("button",{name:"Dialogprotokoll abschließen"}).click();
  await leaveChapter(page);
  await page.getByRole("button", { name: /Bühne: verfügbar/ }).click();

  await completeChapter04(page);
  await leaveChapter(page);
  await page.getByRole("button", { name: /Regiebuch: verfügbar/ }).click();

  for(const item of classificationCards)await selectAndPlace(page,item.text,({observation:"Textbeobachtung",analysis:"Analyse",interpretation:"Interpretation",unsupported:"nicht ausreichend belegt"} as Record<string,string>)[item.target]);
  for(const item of generalChain)await page.getByRole("button",{name:new RegExp(item.text.slice(0,18))}).click();
  await page.getByRole("button",{name:hypothesisOptions.find(x=>x.quality==="supported")!.text}).click();await page.getByRole("button",{name:/durch den widersprüchlichen zweiten Satz präzisieren/}).click();
  for(const item of julietFindings)await selectAndPlace(page,item.text,item.accepted[0]==="direct"?"stützt unmittelbar":item.accepted[0]==="supplement"?"ergänzt":"kaum relevant");
  for(const item of [...julietReverseChain].reverse())await page.getByRole("button",{name:new RegExp(item.text.slice(0,16))}).click();
  await page.getByRole("button",{name:/widerspricht ausdrücklich und bittet/}).click();await page.getByRole("button",{name:julietHypothesis}).click();
  for(const item of argumentBlocks)await page.getByRole("button",{name:new RegExp(item.text.slice(0,16))}).click();
  for(const item of commonErrors)await selectAndPlace(page,item.text,({evidence_without_analysis:"Beleg ohne Analyse",unsupported_claim:"unbelegte Behauptung",summary_only:"bloße Inhaltsangabe"} as Record<string,string>)[item.target]);
  for(const text of interpretationStructure)await page.getByRole("button",{name:text}).click();
  for(const item of transferEvidence.filter(x=>x.relevance!=="little").slice(0,4))await page.getByRole("button",{name:item.text}).click();
  for(const item of transferChain)await page.getByRole("button",{name:new RegExp(item.text.slice(0,18))}).click();
  await page.getByRole("button",{name:transferHypotheses.find(x=>x.quality==="supported")!.text}).click();await page.getByRole("button",{name:/verweist auf das Gesetz/}).click();await page.getByRole("button",{name:transferRefined}).click();
  for(const item of transferArgument)await page.getByRole("button",{name:new RegExp(item.text.slice(0,18))}).click();
  await page.getByRole("button",{name:/Gegenbelege bestimmen ihre Reichweite/}).click();await page.getByRole("button",{name:"Kapitel abschließen"}).click();
  await leaveChapter(page);

  await page.getByRole("button", { name: /Finale: Die letzte Aufführung/ }).click();
  await page.getByRole("button", { name: "Aufführung beginnen" }).click();
  for (let index = 0; index < 6; index += 1) await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByRole("button", { name: "Vorhang schließen" }).click();
  await page.getByRole("button", { name: "Restauriertes Regiebuch öffnen" }).click();
  await expect(page.getByRole("heading", { name: "Kompetenzübersicht" })).toBeVisible();
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("lernwerkstatt-games:state:v1")!));
  expect(saved).toMatchObject({ completedChapters: ["chapter_01","chapter_02","chapter_03","chapter_04","chapter_05"], finaleCompleted: true, gameCompleted: true, performanceState: "PERFORMANCE_COMPLETE" });
});

test("recovers from malformed compatible save and continues from a normalized chapter session", async ({ page }) => {
  await page.evaluate(() => localStorage.setItem("lernwerkstatt-games:state:v1", JSON.stringify({ version:1,currentGame:"dramatik",currentChapter:"chapter_01",completedChapters:"broken",decisions:{chapter_01:{round:99,restoredIds:"broken"}},settings:{music:"broken"},theatreState:"BROKEN" })));
  await page.reload(); await page.getByRole("button", { name: "Fortsetzen" }).click();
  await expect(page.getByRole("heading", { name: "Das zerrissene Regiebuch" })).toBeVisible();
  await expect(page.getByText("Szene 1 von 7")).toBeVisible();
});
