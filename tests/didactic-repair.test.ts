import {describe,expect,it} from "vitest";
import {dramaGlossary,glossaryFor} from "../src/games/dramatik/data/glossary";
import {sceneCharacters} from "../src/games/dramatik/data/scene_characters";
import {streetSituationCards,transferSituationGroups} from "../src/games/dramatik/data/chapter_01_content";
import {checkStreetSituation,checkTransferAnalysis,draftSituation,initialChapter01Session,toggleTransferStatement,type Chapter01Session} from "../src/games/dramatik/mechanics/chapter_01_engine";
import {chapter02PrimaryById,roleTasks} from "../src/games/dramatik/data/chapter_02_content";
import {practiceActs,speechTasks} from "../src/games/dramatik/data/chapter_03_content";
import {connectSpeechChain,createChapter03Session} from "../src/games/dramatik/mechanics/chapter_03_engine";
import {julietCountercheckOptions,transferCountercheckOptions} from "../src/games/dramatik/data/chapter_05_content";

describe("szenenabhängige Figuren",()=>{
 it("ordnet den geforderten Szenen ausschließlich ihre beteiligten Figuren zu",()=>{
  expect(sceneCharacters["chapter_01.street"].map(x=>x.name)).toEqual(["Sampson","Gregorio"]);
  expect(sceneCharacters["chapter_01.capulet_paris"].map(x=>x.name)).toEqual(["Capulet","Paris","Bedienter"]);
  expect(sceneCharacters["chapter_02.main"].map(x=>x.name)).toEqual(["Juliette","Lady Capulet","Amme"]);
  expect(sceneCharacters["chapter_03.conflict"].map(x=>x.name)).toEqual(["Benvolio","Mercutio","Tybalt","Romeo"]);
  expect(sceneCharacters["chapter_03.garden"].map(x=>x.name)).toEqual(["Romeo","Juliette"]);
  expect(sceneCharacters["chapter_04.tomb"].map(x=>x.name)).toEqual(["Romeo","Paris"]);
  expect(sceneCharacters["chapter_04.juliet"].map(x=>x.name)).toEqual(["Juliette"]);
  expect(sceneCharacters["chapter_05.apothecary"].map(x=>x.name)).toEqual(["Romeo","Apotheker"]);
 });
 it("behandelt Lorenzo nicht als Szenenfigur",()=>expect(Object.values(sceneCharacters).flat().some(x=>x.name==="Lorenzo")).toBe(false));
 it("verwendet bei fehlenden Assets keinen falschen Ersatz",()=>{
  expect(sceneCharacters["chapter_01.street"].every(x=>!x.assetId)).toBe(true);
  expect(sceneCharacters["chapter_05.apothecary"].find(x=>x.name==="Apotheker")?.assetId).toBeUndefined();
 });
});

describe("offene Situationsanalyse",()=>{
 const correctSession=()=>transferSituationGroups.reduce((session,group)=>group.options.filter(x=>x.correct).reduce((next,option)=>toggleTransferStatement(next,group.field,option.id),session),structuredClone(initialChapter01Session));
 it("unterstützt in jeder Kategorie Antwortmengen statt genau einer Lösung",()=>{
  expect(transferSituationGroups.every(group=>group.options.length>1)).toBe(true);
  expect(transferSituationGroups.find(x=>x.field==="characters")?.options.filter(x=>x.correct)).toHaveLength(3);
  expect(transferSituationGroups.find(x=>x.field==="history")?.options.filter(x=>x.correct)).toHaveLength(1);
  expect(transferSituationGroups.find(x=>x.field==="conditions")?.options.filter(x=>x.correct)).toHaveLength(2);
 });
 it("akzeptiert alle richtigen Mehrfachauswahlen gemeinsam",()=>expect(checkTransferAnalysis(correctSession(),transferSituationGroups).valid).toBe(true));
 it("weist eine unvollständige oder um eine falsche Figur ergänzte Auswahl zurück",()=>{
  let partial=correctSession();partial={...partial,transferSelections:{...partial.transferSelections,characters:partial.transferSelections.characters.slice(0,2)}};
  expect(checkTransferAnalysis(partial,transferSituationGroups).fieldResults.characters).toBe("incomplete");
  const wrong=toggleTransferStatement(correctSession(),"characters","char_romeo");
  expect(checkTransferAnalysis(wrong,transferSituationGroups).fieldResults.characters).toBe("contains_wrong");
 });
 it("bewahrt richtige Bereiche bei der Korrektur",()=>{
  const wrong=toggleTransferStatement(correctSession(),"characters","char_romeo");const checked=checkTransferAnalysis(wrong,transferSituationGroups).session;
  expect(checked.transferConfirmed).toEqual(expect.arrayContaining(["place","time","history","conditions"]));
 });
});

describe("verdeckte Antwortpositionen",()=>{
 const actPositions=practiceActs.map(task=>task.actOptions.findIndex(option=>option===task.act)+1);
 const goalPositions=practiceActs.map(task=>task.goalOptions.findIndex(option=>option===task.goal)+1);
 const chainPositions=speechTasks.map(task=>task.options.findIndex(option=>option.act===task.act&&option.reactionId===task.reactionId)+1);
 it("variiert die Positionen in beiden allgemeinen Dialogübungen",()=>{
  expect(new Set(actPositions).size).toBeGreaterThan(1);
  expect(new Set(goalPositions).size).toBeGreaterThan(1);
 });
 it("variiert die Positionen der sechs Shakespeare-Ketten",()=>expect(new Set(chainPositions).size).toBeGreaterThan(1));
 it("erzeugt über alle vierzehn Aufgaben keine konstante Positionsregel",()=>{
  const all=[...actPositions,...goalPositions,...chainPositions];expect(new Set(all)).toEqual(new Set([1,2,3]));expect(all.every(position=>position===all[0])).toBe(false);
 });
 it("lässt plausible falsche Ketten auswählen und weist sie fachlich zurück",()=>{
  for(const task of speechTasks){const wrong=task.options.find(option=>option.act!==task.act||option.reactionId!==task.reactionId)!;expect(connectSpeechChain({...createChapter03Session(),round:6},task.id,wrong.act,wrong.reactionId).valid).toBe(false)}
 });
});

describe("Ziel, Motiv und Interesse",()=>{
 it("enthält einen textgestützten Motivfall und einen nicht feststellbaren Fall",()=>{
  expect(roleTasks.find(task=>task.target==="motive")?.sourceId).toBe("c02_transfer_juliette_nurse_plea");
  expect(roleTasks.some(task=>task.target==="unknown")).toBe(true);
 });
 it("kann für jede Rollenaufgabe den geschützten Primärtext unmittelbar laden",()=>{
  for(const task of roleTasks)expect(chapter02PrimaryById(task.sourceId)?.text).toBeTruthy();
 });
});

describe("verzögerte Straßensituationsprüfung",()=>{
 it("wertet Entwürfe erst bei der Gesamtprüfung und nicht beim Zuordnen aus",()=>{
  const draft=draftSituation({...initialChapter01Session,round:5},"street_time","place");expect(draft.competencyEvents).toHaveLength(0);expect(draft.situationAssignments).toEqual({});expect(checkStreetSituation(draft).valid).toBe(false);
 });
 it("lässt eine fehlerhafte Gesamtauswahl korrigieren",()=>{
  let session:Chapter01Session={...initialChapter01Session,round:5};for(const card of streetSituationCards)session=draftSituation(session,card.id,card.id==="street_time"?"time":card.target);
  const wrong=checkStreetSituation(session);expect(wrong.valid).toBe(false);expect(wrong.problemFields).toContain("unknown");
  session=draftSituation(wrong.session,"street_time","unknown");
  expect(checkStreetSituation(session).valid).toBe(true);
 });
});

describe("plausible Gegenchecks",()=>{
 it("positioniert die richtigen Gegenbelege unterschiedlich",()=>{
  expect(julietCountercheckOptions.findIndex(item=>item.id==="juliet_has_agency")).not.toBe(transferCountercheckOptions.findIndex(item=>item.id==="apothecary_resists"));
 });
 it("verwendet typische Überdehnungen statt sachfremder Optionen",()=>{
  expect(julietCountercheckOptions.map(item=>item.text).join(" ")).toMatch(/Machtgefälle|Entscheidungsmacht/);
  expect(transferCountercheckOptions.map(item=>item.text).join(" ")).toMatch(/Verantwortung|innerlich zustimmt/);
 });
});

describe("Begriffshilfen",()=>{
 it("enthält die fünf Kategorien der Situationsanalyse",()=>{
  const terms=glossaryFor("chapter_01").map(x=>x.term);expect(terms).toEqual(expect.arrayContaining(["Ort","Zeit","Figuren","Vorgeschichte","Bedingungen"]));
 });
 it("führt Fachbegriffe kapitelweise und ohne konkrete Szenenlösung",()=>{
  for(const chapter of ["chapter_01","chapter_02","chapter_03","chapter_04","chapter_05"] as const)expect(glossaryFor(chapter).length).toBeGreaterThan(0);
  expect(dramaGlossary.map(x=>x.definition).join(" ")).not.toMatch(/Capulet|Paris|Romeo|Juliette|Verona/);
 });
});
