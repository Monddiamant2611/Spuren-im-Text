import {mkdirSync,writeFileSync} from "node:fs";
import {resolve} from "node:path";
import {describe,expect,it} from "vitest";
import {answerBiasAudit} from "../src/games/lyrik/data/answerBiasAudit";
import {tasks} from "../src/games/lyrik/data/game";
import {tasksForRelease} from "../src/games/lyrik/data/releasePolicy";

describe("Antwortbias-Auditartefakt",()=>{
 it("schreibt den vollständigen produktiven Audit",()=>{
  const audit=answerBiasAudit(tasksForRelease(tasks,"student"));
  const directory=resolve("artifacts");mkdirSync(directory,{recursive:true});writeFileSync(resolve(directory,"lyrik-answer-bias-audit.json"),JSON.stringify(audit,null,2));
  expect(audit.closedTasks).toBeGreaterThan(100);
 });
});
