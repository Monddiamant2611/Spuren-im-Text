import {describe,expect,it} from "vitest";
import {pickChapterTasks} from "../src/games/lyrik/data/chapterTaskSelection";
import {tasks,type AnalysisAreaId} from "../src/games/lyrik/data/game";
import {tasksForRelease} from "../src/games/lyrik/data/releasePolicy";
import {chapterSkillAllowLists,classifyTask,isEligibleForTraining} from "../src/games/lyrik/data/training";

const areas:AnalysisAreaId[]=["lyric","interpretation","form","speaker","movement","metre","language","mood","integration"];
const released=tasksForRelease(tasks,"student");
const forbidden=["Die Aussage setzt den Sprecher mit dem echten Autor gleich.","Die Textstelle hat angeblich immer dieselbe Wirkung.","Das Merkmal muss angeblich in jedem Gedicht vorkommen.","Der Text belegt diese Behauptung nicht.","Die Antwort nennt nur den Fachbegriff und erklärt ihn nicht.","Eine andere Deutung ist angeblich unmöglich."];

describe("fail-closed Skill-Pools",()=>{
 it("liefert produktive Tasks nur mit erlaubtem Skill und konsistenten Metadaten",()=>{
  for(const task of released.filter(task=>isEligibleForTraining(task,task.area))){
   const meta=classifyTask(task);
   expect(meta.chapter).toBe(task.area);
   expect(chapterSkillAllowLists[task.area],task.id).toContain(meta.skill);
   expect(meta.trainingTags,task.id).toEqual(expect.arrayContaining([task.area,meta.skill]));
   expect(task.phase,task.id).toMatch(/^(discover|understand|remember|apply|connect|transfer)$/);
  }
 });

 it("zieht für Üben und Challenge niemals einen globalen Fallback heran",()=>{
  for(const area of areas){
   const local=released.filter(task=>task.area===area&&isEligibleForTraining(task,area));
   for(const step of [3,4])for(const task of pickChapterTasks(local,area,step)){
    expect(task.area,task.id).toBe(area);
    expect(chapterSkillAllowLists[area],task.id).toContain(classifyTask(task).skill);
   }
  }
 });

 it("enthält keine universellen Fülldistraktoren mehr",()=>{
  const options=released.flatMap(task=>task.options??[]);
  for(const phrase of forbidden)expect(options).not.toContain(phrase);
 });
});
