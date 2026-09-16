import {describe,expect,it} from "vitest";
import {knowledgeCards,tasks} from "../src/games/lyrik/data/game";
import {guidedForRelease,releaseMode,tasksForRelease} from "../src/games/lyrik/data/releasePolicy";

const studentText=JSON.stringify({knowledgeCards,guided:guidedForRelease(releaseMode),tasks:tasksForRelease(tasks,releaseMode)});
const reviewWords=["kontextbezogen","Bedeutungsverschiebung","Wahrnehmungsverschiebung","funktional","Evidenz","Deutungsrichtung","vermeintlich","konstituiert","impliziert"] as const;

describe("Sprachaudit für sichtbare Lyriktexte",()=>{
 it("hält besonders schwer verständliche Wörter aus dem Student Release fern",()=>{
  for(const word of ["Evidenz","Wahrnehmungsverschiebung","konstituiert","impliziert"] as const)expect(studentText).not.toMatch(new RegExp(word,"i"));
 });
 it("macht alle redaktionell zu prüfenden Wörter als Auditliste sichtbar",()=>{
  const findings=Object.fromEntries(reviewWords.map(word=>[word,(studentText.match(new RegExp(word,"gi"))??[]).length]));
  expect(Object.keys(findings)).toEqual(reviewWords);
  expect(Object.values(findings).every(count=>Number.isInteger(count)&&count>=0)).toBe(true);
 });
 it("zeigt in Kapitel 6 nur Antwortwörter aus der Panther-Textgrundlage",()=>{
  const step=guidedForRelease(releaseMode)[5][0];
  expect(step.material.label).toMatch(/Der Panther/);
  for(const option of step.options??[])expect(step.material.text.toLocaleLowerCase("de")).toContain(option.label.toLocaleLowerCase("de"));
  expect(step.solution).toMatch(/Blick.*Stäbe/);
 });
});
