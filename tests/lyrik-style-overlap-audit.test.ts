import {describe,it,expect} from "vitest";
import {writeFileSync,mkdirSync} from "node:fs";
import {tasks as allTasks} from "../src/games/lyrik/data/game";
import {tasksForRelease} from "../src/games/lyrik/data/releasePolicy";
import {styleExampleReviews} from "../src/games/lyrik/data/knowledge/styleDevices";

describe("Stilmittelüberlappungen im Student Release",()=>{
 it("auditiert alle produktiven geschlossenen Stilmittelaufgaben",()=>{
  const released=tasksForRelease(allTasks,"student");
  const rows=styleExampleReviews.map((example,index)=>{
   const task=released.find(item=>item.id===`style-recognize-${index+1}`);
   if(!task)throw new Error(`Produktive Stilmittelaufgabe fehlt: ${index+1}`);
   const preciseFocus=example.text==="Der Wind flüstert durch die Zweige.";
   const overlapHandledSafely=preciseFocus?task.prompt.includes("genauere Bezeichnung")&&!task.options?.includes("Metapher"):example.coexistingDevices.every(figure=>task.correct?.includes(figure))&&example.coexistingDevices.every(figure=>!task.options?.includes(figure)||task.correct?.includes(figure));
   return {taskId:task.id,text:task.text,questionFocus:task.prompt,correctFigures:task.correct,possibleOverlaps:example.coexistingDevices,singleOrMultipleChoice:task.kind,overlapHandledSafely};
  });
  expect(rows).toHaveLength(100);
  expect(rows.filter(row=>!row.overlapHandledSafely)).toEqual([]);
  const directory=new URL("../artifacts/",import.meta.url);
  mkdirSync(directory,{recursive:true});
  writeFileSync(new URL("lyrik-style-overlap-audit.json",directory),JSON.stringify({taskCount:rows.length,unsafeCount:0,rows},null,2));
 });
});
