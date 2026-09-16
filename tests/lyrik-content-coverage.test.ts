import { describe,expect,it } from "vitest";
import { cadenceExamples } from "../src/games/lyrik/data/cadence";
import { coverageReport,validateCoverage } from "../src/games/lyrik/data/coverage";
import { poolExercises } from "../src/games/lyrik/data/exercises/pools";
import { styleDevices } from "../src/games/lyrik/data/knowledge/styleDevices";
import { metricExamples } from "../src/games/lyrik/data/meter";
import { microTexts } from "../src/games/lyrik/data/texts/microTexts";
import { transferCases } from "../src/games/lyrik/data/texts/transferCases";
import { optionsForLevel,selectRound } from "../src/games/lyrik/engine";

describe("Lyrik-Inhaltsabdeckung",()=>{
 it("erfüllt den Coverage-Vertrag",()=>expect(validateCoverage()).toEqual([]));
 it("enthält 52 vollständige Stilmittelkarten mit akzeptierten Kernbeispielen",()=>{expect(styleDevices).toHaveLength(52);for(const card of styleDevices){expect(card.definition.length).toBeGreaterThan(20);expect(card.recognition.startsWith("Man erkennt")).toBe(true);expect(card.functions.length).toBeGreaterThanOrEqual(3);expect(card.pitfall.length).toBeGreaterThan(20);expect(card.analysisHint.length).toBeGreaterThan(20);expect(card.examples.length).toBeGreaterThanOrEqual(1);expect(JSON.stringify(card).toLowerCase()).not.toMatch(/platzhalter|kuratiertes kurzbeispiel|zweites beispiel|drittes beispiel/);}});
 it("deckt alle Domains und drei Level ab",()=>{for(const area of ["lyric","form","speaker","movement","metre","language","mood","integration","interpretation"]){const relevant=poolExercises.filter(x=>x.area===area);expect(relevant.length).toBeGreaterThanOrEqual(area==="metre"?50:area==="lyric"?70:90);expect(new Set(relevant.map(x=>x.level))).toEqual(new Set([1,2,3]));}});
 it("besitzt eindeutige IDs, Quellenstatus und gültige Lösungen",()=>{expect(new Set(poolExercises.map(x=>x.id)).size).toBe(poolExercises.length);for(const item of poolExercises){expect(item.sourceType).toBe("exerciseText");if(item.mechanic!=="free"){expect(item.correct?.length).toBeGreaterThan(0);expect(new Set(item.options).size).toBe(item.options?.length);for(const answer of item.correct??[])expect(item.options).toContain(answer);}}});
 it("annotiert nur redaktionell akzeptiertes Metrum und vollständige Versschlüsse",()=>{expect(coverageReport.meterWords).toEqual({jambus:8,trochaeus:11,dactyl:8,anapaest:8});expect(coverageReport.meterLines).toEqual({jambus:3,trochaeus:5});for(const item of metricExamples){expect(item.verificationStatus).toBe("accepted");expect(item.syllables.length).toBe(item.stresses.length);}expect(coverageReport.cadence).toEqual({male:4,female:4,rich:4});expect(cadenceExamples.every(x=>x.verificationStatus==="accepted")).toBe(true);});
 it("enthält 50 Texte und 15 Transferfälle",()=>{expect(microTexts).toHaveLength(50);expect(transferCases).toHaveLength(15);expect(microTexts.every(x=>x.sourceType==="exerciseText")).toBe(true);});
 it("hält richtige Antworten in allen Leveln und verteilt ihre Position",()=>{const task=poolExercises.find(x=>x.correct?.length===1)!;for(const level of [1,2,3] as const){const positions=Array(level===1?4:level===2?6:8).fill(0);for(let seed=1;seed<=10000;seed++)positions[optionsForLevel({...task,kind:"choice"},level,seed).indexOf(task.correct![0])]++;const expected=10000/positions.length;for(const count of positions)expect(Math.abs(count-expected)/expected).toBeLessThan(.12);}});
 it("vermeidet unmittelbare Wiederholung",()=>{const tasks=poolExercises.slice(0,100).map(x=>({...x,kind:"choice" as const}));const first=selectRound(tasks,1,12);const second=selectRound(tasks,2,12,first.map(x=>x.id));expect(second.some(x=>first.some(y=>y.id===x.id))).toBe(false);});
});
