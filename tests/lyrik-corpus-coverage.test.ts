import {describe,expect,it} from "vitest";
import {canonicalPoems} from "../src/games/lyrik/data/texts/canonicalPoems";
import {corpusCoverage} from "../src/games/lyrik/data/corpusCoverage";
import {corpusReachabilityTasks} from "../src/games/lyrik/data/canonicalTasks";
import {tasks} from "../src/games/lyrik/data/game";
import {isEligibleForTraining} from "../src/games/lyrik/data/training";

describe("47-Werke-Coverage",()=>{
 it("weist jedem Werk genau einen dokumentierten Verwendungspunkt zu",()=>{expect(corpusCoverage).toHaveLength(47);expect(new Set(corpusCoverage.map(x=>x.work)).size).toBe(47);expect(corpusCoverage.filter(x=>x.productive)).toHaveLength(45);expect(corpusCoverage.filter(x=>!x.productive).map(x=>x.work)).toEqual([6,17]);});
 it("macht alle 45 freigabefähigen Werke als konkrete Aufgabe erreichbar",()=>{expect(corpusReachabilityTasks).toHaveLength(45);for(const use of corpusCoverage.filter(x=>x.productive)){const poem=canonicalPoems[use.work-1];const task=corpusReachabilityTasks.find(x=>x.id===`corpus-${String(use.work).padStart(2,"0")}`);expect(task?.text).toContain(poem.title);expect(task?.prompt).toContain(use.competence);}});
 it("bewahrt Strophengrenzen im angezeigten kanonischen Ausschnitt",()=>{const task=corpusReachabilityTasks.find(x=>x.id==="corpus-43");expect(canonicalPoems[42].canonicalText).toContain("Stäbe gäbe\n\nund hinter");expect(task?.source?.canonicalExcerpt).toContain("Stäbe gäbe\n\nund hinter");expect(task?.text).toContain("Stäbe gäbe\n\nund hinter");});
 it("hält rights-blocked Übersetzungen aus produktiven Aufgaben",()=>{for(const poem of canonicalPoems.filter(x=>x.publicReleaseStatus==="rights-blocked")){expect(tasks.some(task=>task.text?.includes(`${poem.title} — ${poem.author}`))).toBe(false);expect(poem.approvedForProductiveUse).toBe(false);}});
 it("erzeugt keine Metrikaufgabe aus ungeprüften Korpusdaten",()=>{for(const task of corpusReachabilityTasks.filter(x=>x.area==="metre")){const number=Number(task.id.slice(-2));expect(canonicalPoems[number-1].meterStatus).toBe("accepted");}});
 it("lässt blockierte Korpusaufgaben nie ins Training",()=>{const blocked=corpusReachabilityTasks.filter(task=>task.verificationStatus==="blockedPendingVerification");expect(blocked.length).toBeGreaterThan(0);for(const task of blocked)for(const area of ["mixed",task.area] as const)expect(isEligibleForTraining(task,area)).toBe(false);expect(corpusReachabilityTasks.find(task=>task.corpusWorkNumber===47)?.verificationStatus).toBe("allowed");});
});
