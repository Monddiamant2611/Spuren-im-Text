import {describe,it,expect} from "vitest";
import {tasks as allTasks} from "../src/games/lyrik/data/game";
import {guidedForRelease,tasksForRelease} from "../src/games/lyrik/data/releasePolicy";
import {pickChapterTasks,pickUnseenTransferTasks,shuffledOptions} from "../src/games/lyrik/data/chapterTaskSelection";
import {parseProgress} from "../src/games/lyrik/progress";
import type {AnalysisAreaId} from "../src/games/lyrik/data/game";
import {styleExampleReviews} from "../src/games/lyrik/data/knowledge/styleDevices";

const areas:AnalysisAreaId[]=["lyric","interpretation","form","speaker","movement","metre","language","mood","integration"];
const released=tasksForRelease(allTasks,"student");
const guided=guidedForRelease("student");

describe("visuelle Abnahme 3B",()=>{
 it("liefert bei einem vollständig gesperrten Pool keinen Phantom-Task",()=>{for(const area of areas){expect(pickChapterTasks([],area,3)).toEqual([]);expect(pickChapterTasks([],area,4)).toEqual([]);expect(pickUnseenTransferTasks([],area,[])).toEqual([]);}});
 it("nutzt in allen neun Kapiteln zwei bisher ungesehene Transfer-Bundles",()=>{
  areas.forEach((area,index)=>{
   const local=released.filter(task=>task.area===area);
   const prior=[...pickChapterTasks(local,area,3),...pickChapterTasks(local,area,4)];
   const seenWorks=new Set([...guided[index].flatMap(step=>step.sourceWorkIds),...prior.flatMap(task=>task.sourceWorkIds??(task.source?.workId?[task.source.workId]:[]))]);
   const seenTexts=new Set(prior.map(task=>task.text?.trim()));
   const transfer=pickUnseenTransferTasks(local,area,[...seenWorks]);
   expect(transfer,`Kapitel ${index+1}`).toHaveLength(2);
   transfer.forEach(task=>{
    expect(seenTexts.has(task.text?.trim()),task.id).toBe(false);
    expect((task.sourceWorkIds??(task.source?.workId?[task.source.workId]:[])).some(id=>seenWorks.has(id)),task.id).toBe(false);
   });
  });
 });
 it("behält Transfer und Kapitelabschluss beim erneuten Lesen des Fortschritts",()=>{
  const progress=parseProgress(JSON.stringify({version:1,completedTransferChapters:[3],completedChapters:[3]}));
  expect(progress.completedTransferChapters).toContain(3);
  expect(progress.completedChapters).toContain(3);
 });
 it("prüft Mehrfachlösungen nach stabilen IDs unabhängig von der Optionsreihenfolge",()=>{
  const task=released.find(item=>item.id==="style-recognize-7")!;
  expect(task.correct).toEqual(expect.arrayContaining(["Anapher","Parallelismus"]));
  for(const seed of ["first","second"]){
   const options=shuffledOptions(task,seed);
   const correct=options.filter(option=>option.correct).map(option=>option.id);
   expect(correct).toHaveLength(2);
   expect(new Set(correct)).toEqual(new Set((task.correct??[]).map(label=>options.find(option=>option.label===label)!.id)));
  }
 });
 it("fragt beim Wortakzent nicht nach einem Wortmetrum",()=>{
  const word=released.find(task=>task.id==="exercise-meter-jambus-word-1")!;
  expect(word.prompt).toContain("Zu welchem Versfuß passt seine Betonung?");
  expect(word.feedback).toContain("ganzer Vers");
 });
 it("lässt redaktionell erfasste Stilmittelüberlappungen zu oder fokussiert präzise",()=>{
  styleExampleReviews.forEach((example,index)=>{
   const task=released.find(item=>item.id===`style-recognize-${index+1}`)!;
   if(example.text==="Der Wind flüstert durch die Zweige."){
    expect(task.prompt).toContain("genauere Bezeichnung");
    expect(task.correct).toEqual(["Personifikation"]);
    expect(task.options).not.toContain("Metapher");
   }else for(const figure of example.coexistingDevices)expect(task.correct,`${task.id}: ${figure}`).toContain(figure);
  });
  const anaphora=released.find(task=>task.id==="style-recognize-7")!;
  expect(anaphora.feedback).toContain("Parallelismus");
 });
});
