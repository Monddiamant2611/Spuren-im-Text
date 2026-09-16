import {describe,expect,it} from "vitest";
import {pickChapterTasks,shuffledOptions} from "../src/games/lyrik/data/chapterTaskSelection";
import {tasks,type AnalysisAreaId} from "../src/games/lyrik/data/game";
import {tasksForRelease} from "../src/games/lyrik/data/releasePolicy";
import {chapterSkillAllowLists,classifyTask,isEligibleForTraining} from "../src/games/lyrik/data/training";

const areas:AnalysisAreaId[]=["lyric","interpretation","form","speaker","movement","metre","language","mood","integration"];
const released=tasksForRelease(tasks,"student");

describe("kapitelgebundene Aufgabenqualität",()=>{
 it("liefert je Kapitel genau sechs Übungs- und drei andere Challenge-Aufgaben",()=>{
  for(const area of areas){
   const eligible=released.filter(task=>task.area===area&&isEligibleForTraining(task,area));
   const practice=pickChapterTasks(eligible,area,3),challenge=pickChapterTasks(eligible,area,4);
   expect(practice,`${area}/Üben`).toHaveLength(6);
   expect(challenge,`${area}/Challenge`).toHaveLength(3);
   expect(challenge.some(task=>practice.some(item=>item.id===task.id)),area).toBe(false);
   for(const task of [...practice,...challenge])expect(chapterSkillAllowLists[area],task.id).toContain(classifyTask(task).skill);
  }
 });

 it("mischt mindestens 100 geschlossene Aufgaben ohne Positions- oder Längenverräter",()=>{
  const closed=released.filter(task=>task.kind!=="free"&&task.options?.length===4&&task.correct?.length===1).slice(0,150);
  expect(closed.length).toBeGreaterThanOrEqual(100);
  const positions=closed.map(task=>shuffledOptions(task).findIndex(option=>task.correct?.includes(option.label)));
  const distribution=positions.reduce((counts,position)=>(counts[position]=(counts[position]??0)+1,counts),{} as Record<number,number>);
  expect(Math.max(...Object.values(distribution))/closed.length).toBeLessThan(0.4);
  let consecutive=1,maxConsecutive=1;for(let index=1;index<positions.length;index++){consecutive=positions[index]===positions[index-1]?consecutive+1:1;maxConsecutive=Math.max(maxConsecutive,consecutive);}
  expect(maxConsecutive).toBeLessThanOrEqual(2);
  const longest=closed.filter(task=>{const options=shuffledOptions(task);return task.correct![0].length===Math.max(...options.map(option=>option.label.length));}).length;
  expect(longest/closed.length).toBeLessThanOrEqual(0.45);
 });

 it("mischt Kapitel 6 über vier Metren und mehrere Aufgabenarten",()=>{
  const metre=pickChapterTasks(released.filter(task=>task.area==="metre"),"metre",3);
  expect(metre.map(task=>task.id).slice(2)).toEqual(["exercise-meter-jambus-verse-b","exercise-meter-trochaeus-verse-a","exercise-cadence-male-1","exercise-meter-trochaeus-verse-e"]);
  expect(metre[0].correct).not.toEqual(metre[1].correct);
  expect(new Set(metre.map(task=>classifyTask(task).skill)).size).toBeGreaterThanOrEqual(5);
 });

 it("zeigt über mehrere Kapitel-6-Sitzungen alle vier Versfüße",()=>{
  const pool=released.filter(task=>task.area==="metre"),feet=new Set<string>();
  for(const seed of ["session-a","session-b","session-c","session-d","session-e","session-f","session-g","session-h"])for(const task of pickChapterTasks(pool,"metre",3,seed).slice(0,2))for(const answer of task.correct??[])feet.add(answer);
  expect(feet).toEqual(new Set(["Jambus","Trochäus","Daktylus","Anapäst"]));
 });
});
