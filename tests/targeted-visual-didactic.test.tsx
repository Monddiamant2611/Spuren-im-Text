import {renderToStaticMarkup} from "react-dom/server";
import {describe,expect,it} from "vitest";
import {evidenceRoundOptions,primaryById,transferSituationGroups} from "../src/games/dramatik/data/chapter_01_content";
import {theatreAreas} from "../src/games/dramatik/data/theatre";
import {SceneCharacters} from "../src/shared/components/SceneCharacters";
import {ChapterCompletion} from "../src/shared/components/ChapterCompletion";
import {practiceActs,speechTasks} from "../src/games/dramatik/data/chapter_03_content";
import {hypothesisOptions,julietCountercheckOptions,transferCountercheckOptions,transferHypotheses} from "../src/games/dramatik/data/chapter_05_content";

describe("gezielter visuell-didaktischer Korrekturpass",()=>{
 it("variiert Szene 6 und bietet mehrere plausible Kandidaten",()=>{
  expect(evidenceRoundOptions.textIds.indexOf("c01_street_provocation_1")+1).toBe(2);
  expect(evidenceRoundOptions.observations.indexOf("Sampson will, dass die andere Seite den Streit offiziell beginnt.")+1).toBe(4);
  expect(evidenceRoundOptions.situations.indexOf("Die Figuren achten darauf, wer den Streit nach außen hin beginnt.")+1).toBe(3);
  expect(evidenceRoundOptions.observations.length).toBeGreaterThanOrEqual(4);
  expect(evidenceRoundOptions.situations.length).toBeGreaterThanOrEqual(4);
 });
 it("behandelt allgemeines Werkwissen nicht als relevante Kernantwort",()=>{
  expect(transferSituationGroups.flatMap(group=>group.options).find(option=>option.id==="history_feud")?.correct).toBe(false);
  expect(transferSituationGroups.flatMap(group=>group.options).find(option=>option.id==="condition_sanction")?.correct).toBe(false);
 });
 it("behält den Bedienten nur wegen der sichtbaren originalen Bühnenangabe als Textfigur",()=>{
  expect(primaryById("c01_transfer_direction").text).toContain("Bedienter treten auf");
  expect(transferSituationGroups.flatMap(group=>group.options).find(option=>option.id==="char_servant")?.correct).toBe(true);
 });
 it("rendert ohne Asset keine leeren Figurenflächen",()=>{
  expect(renderToStaticMarkup(<SceneCharacters sceneId="chapter_01.street"/>)).toBe("");
  const apothecary=renderToStaticMarkup(<SceneCharacters sceneId="chapter_05.apothecary"/>);
  expect(apothecary).toContain("Romeo");expect(apothecary).not.toContain("Apotheker");expect(apothecary).not.toContain("scene-character-fallback");
 });
 it("definiert fünf unterschiedliche Tiefenrollen",()=>expect(new Set(theatreAreas.map(area=>area.depth)).size).toBe(5));
 it("stellt einen konsistenten Abschlussweg bereit",()=>{
  const html=renderToStaticMarkup(<ChapterCompletion chapterId="chapter_02" onExit={()=>{}}/>);expect(html).toContain("Die Figurenakte ist vollständig.");expect(html).toContain("Zur großen Bühne");
 });
 it("verteilt richtige Choice-Positionen ohne lange Erstpositionsserie",()=>{
  const positions=[
   ...practiceActs.flatMap(task=>[(task.actOptions as readonly string[]).indexOf(task.act),(task.goalOptions as readonly string[]).indexOf(task.goal)]),
   ...speechTasks.map(task=>task.options.findIndex(option=>option.act===task.act&&option.reactionId===task.reactionId)),
   hypothesisOptions.findIndex(item=>item.quality==="supported"),
   julietCountercheckOptions.findIndex(item=>item.id==="juliet_has_agency"),
   transferHypotheses.findIndex(item=>item.quality==="supported"),
   transferCountercheckOptions.findIndex(item=>item.id==="apothecary_resists"),
  ];
  expect(new Set(positions)).toEqual(new Set([0,1,2]));
  let longest=1,current=1;for(let i=1;i<positions.length;i++){current=positions[i]===positions[i-1]?current+1:1;longest=Math.max(longest,current)}
  expect(longest).toBeLessThanOrEqual(2);
 });
});
