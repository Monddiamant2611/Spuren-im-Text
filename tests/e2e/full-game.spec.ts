import { expect, test, type Page } from "@playwright/test";
import { characterizationCards, chapter02PrimaryById, comparisonCards, ensembleLinks, highlightReasoning, highlightTasks, momentClaims, momentPractice, practiceClaims, relationshipPractice, relevancePractice, rolePractice, relationshipTasks, roleTasks, selfOtherPractice, selfOtherTasks, shakespeareCharacterizationCards, transferTasks } from "../../src/games/dramatik/data/chapter_02_content";
import { chapter03Source, comparisonTasks as chapter03Comparisons, goalTasks as chapter03Goals, initiativeTasks as chapter03Initiative, initiativeTurning, languageTasks as chapter03Language, mainEvidenceLabels, mainSections, miniAnalysis, neutralBoundary, neutralLanguage, neutralPhases, practiceActs as chapter03Practice, speechTasks as chapter03Speech, stageEffectTask, transferSections, transferTasks as chapter03Transfer, turningPoints } from "../../src/games/dramatik/data/chapter_03_content";
import { causalIntro, chain, chainLinks, comparisonAspects, conflictTypes, dramaticCurve, escalationCards, finalConnections, finalCurve, finalEvidence, finalMeaningOptions, finalTransferOptions, generalEpistemicPractice, generalEvidenceTasks, generalGoalTasks, goals as chapter04Goals, historyPractice, internalPreparation, introFacts, julietAlternatives, julietCards, julietSequence, knowledgeCards, neutralActionChains, neutralTurningPoints, situationCards, tombActionChains } from "../../src/games/dramatik/data/chapter_04_content";
import { argumentBlocks, classificationCards, commonErrors, errorRepairs, generalChain, generalCountercheckOptions, hypothesisOptions, interpretationStructure, julietCountercheckOptions, julietFindings, julietRefinementParts, julietReverseChain, synthesisSteps, transferArgument, transferChain, transferCountercheckOptions, transferEvidence, transferHypotheses, transferRefinementParts } from "../../src/games/dramatik/data/chapter_05_content";
import { analysisErrorPractice, categoryPractice, certaintyClaims, certaintyPractice, consolidationGroups, historyConditionPractice, signalChainPractice, situationEvidence, streetSituationCards, transferSituationGroups } from "../../src/games/dramatik/data/chapter_01_content";

test.beforeEach(async ({ page }) => { await page.goto("/dramatik"); await page.evaluate(() => localStorage.clear()); await page.reload(); });

async function leaveChapter(page: Page) { const completion=page.getByRole("button",{name:"Zur großen Bühne"});await expect(completion).toBeVisible();await completion.click(); }
async function selectAndPlace(page: Page, item: string | RegExp, zone: string | RegExp) { await page.getByRole("button", { name: item }).click(); await page.getByRole("button", { name: zone }).last().evaluate(element=>(element as HTMLButtonElement).click()); }
async function completeChapter01(page:Page){
  await page.getByRole("button",{name:"Regiebuch untersuchen"}).click();
  await page.getByRole("button",{name:"ANNA"}).click();
  await page.getByRole("button",{name:/bleibt vor der Tür stehen/}).click();
  await page.getByRole("button",{name:"Noch könnte ich umkehren."}).click();
  await page.getByRole("button",{name:"Analyse beginnen"}).click();
  for(const claim of certaintyClaims)await selectAndPlace(page,claim.text,claim.target==="explicit"?"Eindeutig belegt":claim.target==="inference"?"Plausibel erschließbar":"Nicht belegt");
  await page.getByRole("button",{name:"Analyse beginnen"}).click();
  const situationLabel=(target:string)=>target==="place"?"Ort":target==="time"?"Zeit":target==="characters"?"Figuren":target==="history"?"Vorgeschichte":target==="conditions"?"Bedingungen":target==="current_condition"?"Gegenwärtige Bedingung":target==="other"?"Andere Situationsinformation":"Nicht feststellbar";
  for(const item of categoryPractice)await selectAndPlace(page,item.text,situationLabel(item.target));
  await page.getByRole("button",{name:"Gesamtanalyse prüfen"}).click();
  for(const item of certaintyPractice)await selectAndPlace(page,item.text,item.target==="explicit"?"Eindeutig belegt":item.target==="inference"?"Plausibel erschließbar":"Nicht belegt");
  await page.getByRole("button",{name:"Gesamtanalyse prüfen"}).click();
  for(const item of historyConditionPractice)await selectAndPlace(page,item.text,situationLabel(item.target));
  await page.getByRole("button",{name:"Gesamtanalyse prüfen"}).click();
  for(const link of signalChainPractice.links){await page.getByRole("button",{name:signalChainPractice.signals[link.signal],exact:true}).click();await page.getByRole("button",{name:signalChainPractice.findings[link.finding],exact:true}).click();await page.getByRole("button",{name:signalChainPractice.inferences[link.inference],exact:true}).click();await page.getByRole("button",{name:"Verbindung prüfen"}).click()}
  for(const item of analysisErrorPractice)await selectAndPlace(page,item.text,item.target==="explicit"?"Ausreichend belegt":item.target==="inference"?"Plausibel erschließbar":"Methodisch problematisch");
  await page.getByRole("button",{name:"Gesamtanalyse prüfen"}).click();
  for(const group of consolidationGroups)for(const option of group.options.filter(item=>item.correct))await page.getByText(option.text,{exact:true}).click();
  await page.getByRole("button",{name:"Analyse prüfen"}).click();
  await page.getByRole("button",{name:"Shakespeare-Regiebuch öffnen"}).click();
  for(const card of streetSituationCards){
    await page.locator(".loose-pages button").filter({hasText:card.text}).first().click();
    await page.locator(".situation-ledger").getByRole("button",{name:card.target==="place"?"Ort":card.target==="characters"?"Figuren":card.target==="history"?"Vorgeschichte":card.target==="conditions"?"Bedingungen":"Nicht feststellbar"}).click();
  }
  await page.getByRole("button",{name:"Auswahl prüfen"}).click();
  await page.getByRole("button",{name:/Sampson\. Sey ohne Sorge/}).click();
  await page.getByRole("button",{name:situationEvidence.observation}).click();
  await page.getByRole("button",{name:situationEvidence.situation}).click();
  await page.getByRole("button",{name:"Verbindung in das Regiebuch eintragen"}).click();
  for(const group of transferSituationGroups)for(const option of group.options.filter(item=>item.correct))await page.getByText(option.text,{exact:true}).click();
  await page.getByRole("button",{name:"Situationsanalyse prüfen"}).click();
}
async function completeChapter04(page:Page){
 const sort=async(items:readonly {label:string}[])=>{for(const [targetIndex,item] of items.entries()){const row=page.locator(".curve-sorter li").filter({hasText:item.label});while(await row.evaluate((element,index)=>[...element.parentElement!.children].indexOf(element)>index,targetIndex))await row.getByRole("button",{name:/nach oben/}).click()}await page.getByRole("button",{name:"Verlauf prüfen"}).click()};
 for(const item of introFacts.filter(x=>x.relevant))await page.getByRole("button",{name:item.label}).click();
 await page.getByRole("button",{name:"Mara: Feier · Vater: Lernen"}).click();
 for(const item of generalGoalTasks)await page.getByRole("button",{name:item.options[item.answer],exact:true}).click();
 for(const item of conflictTypes)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.answer==="external"?"Äußerer Konflikt":"Innerer Konflikt"}).click();
 for(const item of historyPractice)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.target==="history"?"Vorgeschichte":item.target==="current"?"Gegenwärtige Ausgangslage":item.target==="knowledge"?"Wissensstand":item.target==="future"?"Vermutete Zukunft":"Irrelevante Information",exact:true}).click();
 for(const item of causalIntro)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.answer==="causes"?"Verursacht":item.answer==="contributes"?"Trägt bei":"Nur später / kein belegter Zusammenhang",exact:true}).click();
 for(const item of generalEpistemicPractice)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.target==="knowledge"?"Wissensstand":item.target==="intention"?"Absicht":item.target==="interpretation"?"Deutung":"Nicht ausreichend belegt",exact:true}).click();
 for(const item of generalEvidenceTasks){await page.getByRole("button",{name:item.evidenceOptions[item.evidenceAnswer],exact:true}).click();await page.getByRole("button",{name:item.analysisOptions[item.analysisAnswer],exact:true}).click()}
 await page.getByRole("button",{name:"Verlaufskurve anwenden"}).click();
 await sort(dramaticCurve);
 await page.getByRole("button",{name:"Analyse sichern"}).click();
 for(const item of neutralActionChains){await page.getByRole("button",{name:item.impulse,exact:true}).click();await page.getByRole("button",{name:item.reaction,exact:true}).click();await page.getByRole("button",{name:item.effect,exact:true}).click()}
 const neutral=neutralTurningPoints.find(x=>x.judgement==="turning")!;await page.getByRole("button",{name:neutral.label,exact:true}).click();await page.getByRole("button",{name:"Zentraler Wendepunkt",exact:true}).click();
 for(const item of situationCards)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.target==="situation"?"Ausgangslage":item.target==="prior"?"Vorgeschichte":"Nicht ausreichend belegt"}).click();
 const knowledgeLabel=(target:string)=>target==="romeo_knowledge"?"Romeo: Wissensstand":target==="romeo_intention"?"Romeo: Absicht":target==="paris_knowledge"?"Paris: Wissensstand":target==="paris_interpretation"?"Paris: Deutung":target==="paris_intention"?"Paris: Absicht":"Nicht ausreichend belegt";
 for(const item of knowledgeCards)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:knowledgeLabel(item.target),exact:true}).click();
 for(const task of chapter04Goals){await page.getByRole("button",{name:task.goalOptions[task.goalAnswer],exact:true}).click();const source=task.evidenceOptions.indexOf(task.evidence);await page.locator("fieldset").filter({hasText:"Welcher Primärtextbeleg"}).getByRole("button").nth(source).click();await page.getByRole("button",{name:task.analysis,exact:true}).click()}
 await page.getByRole("button",{name:"Beide Ziele können nicht zugleich verwirklicht werden.",exact:true}).click();
 await sort(chain);
 for(const link of chainLinks){const field=page.locator(".relation-checks>fieldset").first();await field.getByRole("button",{name:link.type==="causes"?"Verursacht die unmittelbare Reaktion":"Trägt zur Entwicklung oder Eskalation bei",exact:true}).click()}
 for(const item of tombActionChains){await page.getByRole("button",{name:item.impulse,exact:true}).click();await page.getByRole("button",{name:item.reaction,exact:true}).click();await page.getByRole("button",{name:item.effect,exact:true}).click()}
 for(const item of escalationCards)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.level==="tension"?"Anspannung":item.level==="escalation"?"Zuspitzung":"Wendepunkt"}).click();
 await page.getByRole("button",{name:"Beginn des Fechtens",exact:true}).click();await page.getByRole("button",{name:"Zentraler Wendepunkt",exact:true}).click();
 await page.getByRole("button",{name:/Die Konfliktform verändert sich/}).click();
 await page.locator("fieldset").filter({hasText:"Der Konflikt wird körperlich."}).getByRole("button",{name:"Unmittelbare Folge"}).click();
 await page.locator("fieldset").filter({hasText:"Paris fällt im Kampf."}).getByRole("button",{name:"Weitere Folge"}).click();
 await page.locator("fieldset").filter({hasText:"Ohne Kampf wäre sicher Frieden entstanden."}).getByRole("button",{name:"Nicht ausreichend belegt"}).evaluate(element=>(element as HTMLButtonElement).click());
 for(const item of internalPreparation)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.target==="wish"?"Handlungswunsch":item.target==="fear"?"Befürchtung / Gegenkraft":item.target==="weighing"?"Abwägung":item.target==="decision"?"Entscheidung":"Ausführung",exact:true}).click();
 await page.getByRole("button",{name:"Den inneren Konflikt untersuchen"}).click();
 for(const item of julietCards)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.kind==="situation"?"Ausgangslage":item.kind==="supports_action"?"Spricht für das Handeln":item.kind==="feared_possibility"?"Befürchtete Möglichkeit":item.kind==="decision"?"Entscheidung":"Ausführung"}).dispatchEvent("click");
 await sort(julietSequence);
 await page.getByRole("button",{name:/Juliettes an Romeo gerichtete Worte/}).click();
 for(const item of julietAlternatives)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.target==="textual"?"Textlich erwogen":item.target==="plausible"?"Situativ plausibel":"Nicht ausreichend belegt",exact:true}).click();
 for(const item of comparisonAspects)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.target==="external"?"Äußerer Konflikt":"Innerer Konflikt",exact:true}).click();
 await page.getByRole("button",{name:/Im äußeren Verlauf treiben gegenseitige Handlungen/}).click();
 await sort(finalCurve);
 for(const item of finalConnections)await page.locator("fieldset").filter({hasText:item.label}).getByRole("button",{name:item.answer==="causes"?"Verursacht":item.answer==="contributes"?"Trägt bei":"Nur später / kein belegter Zusammenhang",exact:true}).click();
 await page.getByRole("button",{name:finalMeaningOptions.find(x=>x.valid)!.label,exact:true}).click();
 await page.locator("fieldset").filter({hasText:"Behauptung:"}).getByRole("button").nth(finalEvidence.evidenceOptions.indexOf(finalEvidence.evidence)).click();
 await page.getByRole("button",{name:finalEvidence.analysisOptions[finalEvidence.analysisAnswer],exact:true}).click();
 await page.getByRole("button",{name:finalTransferOptions.find(x=>x.valid)!.label,exact:true}).click();
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
  await page.getByRole("button",{name:"Analyse beginnen"}).click();
  for(const item of practiceClaims)await selectAndPlace(page,item.text,item.target==="explicit"?"Eindeutig belegt":item.target==="inference"?"Plausibel erschließbar":"Nicht belegt");
  for(const item of characterizationCards)await selectAndPlace(page,item.text,item.target==="direct"?/^Direkt\b/:item.target==="indirect"?/^Indirekt\b/:"Nicht ausreichend belegt");
  for(const item of momentPractice)await selectAndPlace(page,item.text,item.target==="snapshot"?"Situationsbezogener Befund":item.target==="pattern"?"Wiederkehrendes Verhalten":item.target==="cautious"?"Vorsichtige Charakterisierung":"Unzulässige Verallgemeinerung");
  for(const item of relevancePractice)await selectAndPlace(page,item.text,item.target==="high"?"Besonders relevant":item.target==="supporting"?"Ergänzend relevant":item.target==="low"?"Für diese Frage wenig relevant":"Nicht ausreichend belegt");
  for(const item of rolePractice)await selectAndPlace(page,item.text,item.target==="goal"?"Ziel":item.target==="motive"?"Motiv":item.target==="interest"?"Interesse / Bedürfnis":"Nicht sicher feststellbar");
  for(const task of relationshipPractice){const card=page.locator(".evidence-entry");await card.getByText(task.options[task.answer],{exact:true}).click();await card.getByText(task.signal,{exact:true}).click();await card.getByRole("button",{name:"Analyse und Beleg prüfen"}).click()}
  for(const item of selfOtherPractice)await selectAndPlace(page,item.text,item.target==="self"?"Selbstbild":item.target==="other"?"Fremdbild":item.target==="finding"?"Textbefund":"Überdehnung");
  for(const item of shakespeareCharacterizationCards)await selectAndPlace(page,item.text,item.target==="direct"?/^Direkt\b/:item.target==="indirect"?/^Indirekt\b/:"Nicht ausreichend belegt");
  for(const task of highlightTasks)await page.getByRole("button",{name:chapter02PrimaryById(task.sourceId).text}).click();
  await page.getByRole("button",{name:"Gesamtauswahl prüfen"}).click();
  await page.getByRole("button",{name:highlightReasoning.find(item=>item.valid)!.text}).click();
  for(const item of momentClaims)await selectAndPlace(page,item.text,item.target==="supported"?"Gut gestützt":item.target==="uncertain"?"Möglich, aber unsicher":"Nicht gestützt");
  for(const item of roleTasks)await selectAndPlace(page,item.observation,item.target==="goal"?"Ziel":item.target==="motive"?"Motiv":item.target==="interest"?"Interesse / Bedürfnis":"Nicht sicher feststellbar");
  for(const task of relationshipTasks){const card=page.locator(".evidence-entry");await card.getByText(task.options[task.answer],{exact:true}).click();await card.getByText(chapter02PrimaryById(task.sourceId).text,{exact:true}).click();await card.getByRole("button",{name:"Analyse und Beleg prüfen"}).click()}
  for(const item of selfOtherTasks)await selectAndPlace(page,item.text,item.target==="self"?"Selbstbild":item.target==="other"?"Fremdbild":item.target==="finding"?"Beobachtbares Verhalten":"Nicht ausreichend gestützt");
  for(const task of transferTasks){const card=page.locator(".evidence-entry:not(.done)").first();await card.getByText(task.options[task.answer],{exact:true}).click();await card.getByText(chapter02PrimaryById(task.sourceId).text,{exact:true}).click();await card.getByRole("button",{name:"Analyse und Beleg prüfen"}).click()}
  for(const item of comparisonCards)await selectAndPlace(page,item.text,item.target==="early"?"Frühere Situation":item.target==="late"?"Spätere Situation":item.target==="conclusion"?"Vorsichtige Schlussfolgerung":"Nicht ausreichend belegt");
  for(const link of ensembleLinks){await page.getByRole("button",{name:/Ausgangsfigur:/}).click();await page.getByRole("button",{name:`${link.from} als Ausgangsfigur wählen`,exact:true}).click();await page.getByRole("button",{name:`${link.to} als Zielfigur wählen`,exact:true}).click();await page.getByText(link.label,{exact:true}).click();await page.getByText(chapter02PrimaryById(link.sourceId).text,{exact:true}).click();await page.getByRole("button",{name:"Verbindung eintragen"}).click()}
  await leaveChapter(page);
  await page.getByRole("button", { name: /Probenbühne: verfügbar/ }).click();
  await page.getByRole("button",{name:"Allgemeine Dialogprobe beginnen"}).click();
  await page.getByRole("button",{name:"Analyse beginnen"}).click();
  await page.getByRole("button",{name:"Reihenfolge prüfen"}).click();
  for(const item of chapter03Practice)await page.locator(".dialogue-choice").first().getByRole("button",{name:item.act,exact:true}).click();
  for(const item of chapter03Practice)await page.locator(".dialogue-choice").first().getByRole("button",{name:item.goal,exact:true}).click();
  for(const item of chapter03Initiative)await page.getByRole("button",{name:item.label,exact:true}).click();
  await page.getByRole("button",{name:chapter03Initiative.find(item=>item.id===initiativeTurning)!.text,exact:true}).click();
  for(const [targetIndex,item] of neutralPhases.entries()){const row=page.locator(".sortable-dialogue li").filter({hasText:item.text});while(await row.evaluate((element,index)=>[...element.parentElement!.children].indexOf(element)>index,targetIndex))await row.getByRole("button",{name:/nach oben/}).click()}
  await page.getByRole("button",{name:"Reihenfolge prüfen"}).click();
  await page.getByRole("button",{name:"nach Reaktion",exact:true}).click();
  await page.getByRole("button",{name:neutralBoundary.reason,exact:true}).click();
  await page.getByRole("button",{name:neutralLanguage[0].finding,exact:true}).click();
  await page.getByRole("button",{name:neutralLanguage[0].effect,exact:true}).click();
  await page.getByRole("button",{name:neutralLanguage[0].function,exact:true}).click();
  for(const task of chapter03Goals){await page.getByRole("button",{name:task.goal,exact:true}).click();await page.getByRole("button",{name:task.id==="goal_benvolio"?/beschwichtigen und eine Verlagerung/:task.id==="goal_tybalt"?"herausfordern":"beschwichtigen",exact:task.id!=="goal_benvolio"}).click();await page.getByRole("button",{name:new RegExp(mainEvidenceLabels[task.sourceId])}).click()}
  await page.getByRole("button",{name:"Tybalt beruhigen und den Konflikt vermeiden",exact:true}).click();
  await page.getByRole("button",{name:"in den Kampf eingreifen und die Degen trennen",exact:true}).click();
  await page.getByRole("button",{name:/von sprachlicher Beschwichtigung/}).click();
  for(const task of chapter03Speech){await page.getByRole("button",{name:task.act,exact:true}).click();const correct=task.options.find(option=>option.act===task.act&&option.reactionId===task.reactionId)!;await page.getByRole("button",{name:correct.label.split("→")[1].trim(),exact:true}).click();await page.getByRole("button",{name:task.effect,exact:true}).click()}
  for(const [targetIndex,section] of mainSections.entries()){const row=page.locator(".sortable-dialogue li").filter({hasText:section.label});while(await row.evaluate((element,index)=>[...element.parentElement!.children].indexOf(element)>index,targetIndex))await row.getByRole("button",{name:/nach oben/}).click()}
  await page.getByRole("button",{name:"Reihenfolge prüfen"}).click();
  await page.getByRole("button",{name:"nach Abschnitt C",exact:true}).click();
  await page.getByRole("button",{name:/Mercutio übernimmt nach Romeos Beschwichtigungsversuch/}).click();
  await page.getByRole("button",{name:/Der Deeskalationsversuch endet/}).click();
  const turning=turningPoints.find(x=>x.id==="turn_draw")!;await page.getByRole("button",{name:chapter03Source(turning.sourceId).text,exact:true}).click();await page.getByRole("button",{name:"zentraler Wendepunkt",exact:true}).click();
  for(const task of chapter03Language){await page.getByRole("button",{name:task.feature,exact:true}).click();await page.getByRole("button",{name:task.effect,exact:true}).first().click();await page.getByRole("button",{name:task.function,exact:true}).click()}
  for(const name of ["TEXTLICH VORGEGEBEN","ALS INSZENIERUNG MÖGLICH","TEXTLICH VORGEGEBEN","NICHT AUSREICHEND BELEGT"])await page.getByRole("button",{name,exact:true}).click();
  await page.getByRole("button",{name:stageEffectTask.effect,exact:true}).click();
  for(const item of miniAnalysis)await page.getByRole("button",{name:new RegExp((item.text??"").slice(0,20))}).click();
  await page.getByRole("button",{name:"Analyseabsatz zusammensetzen"}).click();
  const transferIds=transferSections.flatMap(section=>section.sourceIds);for(const task of chapter03Transfer)await page.locator(".evidence-list button").nth(transferIds.indexOf(task.sourceId)).click();
  for(const task of chapter03Comparisons)await page.getByRole("button",{name:task.target==="main"?"KONFLIKTDIALOG":task.target==="transfer"?"ANNÄHERUNGSDIALOG":"BEIDE DIALOGE",exact:true}).click();
  for(const index of [0,1,2])await page.getByRole("button",{name:new RegExp(`Schritt ${index+1}`)}).click();
  await page.getByRole("button",{name:"Dialoganalyse abschließen"}).click();
  await leaveChapter(page);
  await page.getByRole("button", { name: /Bühne: verfügbar/ }).click();
  await page.getByRole("button",{name:"Analyse beginnen"}).click();

  await completeChapter04(page);
  await leaveChapter(page);
  await page.getByRole("button", { name: /Regiebuch: verfügbar/ }).click();
  for(const item of classificationCards)await selectAndPlace(page,item.text,item.target==="observation"?"Textbefund":"geht über die Beobachtung hinaus");
  for(const item of generalChain)await page.getByRole("button",{name:new RegExp(item.text.slice(0,18))}).click();
  await page.getByRole("button",{name:hypothesisOptions.find(x=>x.quality==="supported")!.text}).click();await page.getByRole("button",{name:generalCountercheckOptions.find(item=>item.action==="refine")!.text}).click();
  for(const item of julietFindings)await selectAndPlace(page,item.text,item.accepted[0]==="direct"?"stützt unmittelbar":item.accepted[0]==="supplement"?"ergänzt":"kaum relevant");
  for(const item of [...julietReverseChain].reverse())await page.getByRole("button",{name:new RegExp(item.text.slice(0,16))}).click();
  await page.getByRole("button",{name:julietCountercheckOptions.find(item=>item.id==="juliet_has_agency")!.text,exact:true}).click();for(const part of julietRefinementParts)await page.getByRole("button",{name:part.text,exact:true}).click();
  for(const item of argumentBlocks)await page.getByRole("button",{name:new RegExp(item.text.slice(0,16))}).click();
  for(const item of commonErrors){await selectAndPlace(page,item.text,({evidence_without_analysis:"Beleg ohne Analyse",unsupported_claim:"unbelegte Behauptung",summary_only:"bloße Inhaltsangabe",overinterpretation:"Überinterpretation",missing_link:"fehlende Rückbindung"} as Record<string,string>)[item.target]);await page.getByRole("button",{name:errorRepairs.find(entry=>entry.id===item.id)!.text}).click()}
  for(const text of interpretationStructure)await page.getByRole("button",{name:text}).click();
  for(const item of transferEvidence.filter(x=>x.relevance!=="little").slice(0,4))await page.getByRole("button",{name:item.text}).click();
  for(const item of transferChain)await page.getByRole("button",{name:new RegExp(item.text.slice(0,18))}).click();
  await page.getByRole("button",{name:transferHypotheses.find(x=>x.quality==="supported")!.text}).click();await page.getByRole("button",{name:transferCountercheckOptions.find(item=>item.id==="apothecary_resists")!.text,exact:true}).click();for(const part of transferRefinementParts)await page.getByRole("button",{name:part.text,exact:true}).click();
  for(const item of transferArgument)await page.getByRole("button",{name:new RegExp(item.text.slice(0,18))}).click();
  for(const item of synthesisSteps)await page.getByRole("button",{name:item.text,exact:true}).click();await page.getByRole("button",{name:"Zur großen Bühne"}).click();
  await leaveChapter(page);

  await page.getByRole("button", { name: /Finale: Die letzte Probe/ }).click();
  await page.getByRole("button", { name: "Restauriertes Theater betreten" }).click();
  for (const name of ["Regiebuch", "Ensemble", "Probenbühne", "Handlungsbuch", "Analysepult"]) { await page.getByRole("button", { name: new RegExp(`^${name}`) }).click(); await page.getByRole("button", { name: "Erinnerung schließen" }).click(); }
  await page.getByRole("button", { name: "Eine letzte Verbindung herstellen" }).click();
  for (const [a,b] of [["Situation","Figur und Ziel"],["Figur und Ziel","Konflikt und Handlung"],["Sprache und Dialog","Konflikt und Handlung"],["Sprache und Dialog","Deutung"],["Konflikt und Handlung","Deutung"]]) { await page.getByRole("button", { name: new RegExp(`^${a}`) }).click(); await page.getByRole("button", { name: new RegExp(`^${b}`) }).click(); }
  await page.getByRole("button", { name: "Mein Regiebuch öffnen" }).click();
  await expect(page.getByRole("heading", { name: "Persönliche Lernübersicht" })).toBeVisible();
  await page.getByRole("button", { name: "Regiebuch schließen" }).click(); await page.getByRole("button", { name: "Vorhang auf" }).click();
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("lernwerkstatt-games:state:v1")!));
  expect(saved).toMatchObject({ completedChapters: ["chapter_01","chapter_02","chapter_03","chapter_04","chapter_05"], finaleCompleted: true, gameCompleted: true, performanceState: "PERFORMANCE_COMPLETE" });
});

test("recovers from malformed compatible save and continues from a normalized chapter session", async ({ page }) => {
  await page.evaluate(() => localStorage.setItem("lernwerkstatt-games:state:v1", JSON.stringify({ version:1,currentGame:"dramatik",currentChapter:"chapter_01",completedChapters:"broken",decisions:{chapter_01:{round:99,restoredIds:"broken"}},settings:{music:"broken"},theatreState:"BROKEN" })));
  await page.reload(); await page.getByRole("button", { name: "Fortsetzen" }).click();
  await expect(page.getByRole("heading", { name: "Das zerrissene Regiebuch" })).toBeVisible();
  await expect(page.getByText("Szene 1 von 13")).toBeVisible();
});
