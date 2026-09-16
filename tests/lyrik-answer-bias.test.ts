import {describe,expect,it} from "vitest";
import {answerBiasAudit} from "../src/games/lyrik/data/answerBiasAudit";
import {shuffledOptions} from "../src/games/lyrik/data/chapterTaskSelection";
import {tasks} from "../src/games/lyrik/data/game";
import {tasksForRelease} from "../src/games/lyrik/data/releasePolicy";

const released=tasksForRelease(tasks,"student"),audit=answerBiasAudit(released);

describe("Antwortdesign ohne Lösungsheuristik",()=>{
 it("solutionByIdSurvivesShuffle",()=>{for(const task of released.filter(task=>task.kind!=="free"&&task.correct?.length)){const options=shuffledOptions(task,"session-a");expect(options.filter(option=>option.correct).map(option=>option.label).sort(),task.id).toEqual([...task.correct!].sort());expect(new Set(options.map(option=>option.id)).size).toBe(options.length);}});
 it("noSystematicFirstOptionBias",()=>{expect(audit.fourOptionTasks).toBeGreaterThanOrEqual(100);expect(Math.max(...audit.positions)/audit.fourOptionTasks).toBeLessThan(0.35);});
 it("noLongCorrectPositionRun",()=>expect(audit.maxConsecutiveSameCorrectPosition).toBeLessThanOrEqual(2));
 it("noSystematicLengthBias",()=>{expect(audit.correctIsLongestRate).toBeGreaterThanOrEqual(0.15);expect(audit.correctIsLongestRate).toBeLessThanOrEqual(0.4);expect(audit.correctIsShortestRate).toBeLessThan(0.45);});
 it("noUniversalSignalWordDistractors",()=>{expect(audit.genericDistractorTasks).toBe(0);expect(audit.signalWordBiasTasks/audit.closedTasks).toBeLessThan(0.1);});
 it("noImmediateIdenticalOptionOrderForRepeatedTaskAcrossNewSession",()=>{const sample=released.filter(task=>task.options?.length===4).slice(0,100),changed=sample.filter(task=>shuffledOptions(task,"session-a").map(option=>option.id).join()!==shuffledOptions(task,"session-b").map(option=>option.id).join());expect(changed.length/sample.length).toBeGreaterThan(0.7);});
});
