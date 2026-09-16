import {describe,expect,it} from "vitest";
import {tasks} from "../src/games/lyrik/data/game";
import {guidedChapters} from "../src/games/lyrik/data/guidedAnalysis";
import {studentGuidedChapters,tasksForRelease} from "../src/games/lyrik/data/releasePolicy";
import {auditTaskSource} from "../src/games/lyrik/data/taskSourceValidation";

describe("unveränderliche Aufgaben-Quellpakete",()=>{
 it("verändert beim Guided-Release weder Werk noch Text noch Versbereich",()=>{
  for(const released of studentGuidedChapters.flat()){
   const authored=guidedChapters.flat().find(step=>step.id===released.id)!;
   expect(released.material).toBe(authored.material);
   expect(released.sourceWorkIds).toEqual([authored.material.poemId]);
  }
 });

 it("lässt nur valide literarische Single-Source-Aufgaben in den Student Mode",()=>{
  const productive=tasksForRelease(tasks,"student");
  const literary=productive.filter(task=>task.sourceType==="authentic");
  expect(literary.length).toBeGreaterThan(0);
  for(const task of literary){
   const audit=auditTaskSource(task);
   expect(audit.status,task.id).toBe("valid");
   expect(audit.sourceMatch,task.id).toBe(true);
   expect(audit.sourceWorkId,task.id).toBe(audit.renderedWorkId);
   expect(audit.promptMatch,task.id).toBe(true);
   expect(audit.evidenceMatch,task.id).toBe(true);
   expect(audit.solutionMatch,task.id).toBe(true);
   expect(audit.feedbackMatch,task.id).toBe(true);
  }
 });

 it("blockiert literarische Aufgaben ohne valides Quellpaket fail-closed",()=>{
  const productiveIds=new Set(tasksForRelease(tasks,"student").map(task=>task.id));
  for(const task of tasks.filter(item=>item.sourceType==="authentic"&&auditTaskSource(item).status!=="valid"))expect(productiveIds.has(task.id),task.id).toBe(false);
 });
});
