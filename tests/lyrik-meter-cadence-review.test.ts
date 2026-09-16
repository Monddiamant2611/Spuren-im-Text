import { describe,expect,it } from "vitest";
import { cadenceExamples } from "../src/games/lyrik/data/cadence";
import { poolExercises } from "../src/games/lyrik/data/exercises/pools";
import { meterQualityReport } from "../src/games/lyrik/data/meter-quality";
import { metricExamples, studentMetricAnnotations } from "../src/games/lyrik/data/meter";

describe("Metrum- und Kadenzfreigabe",()=>{
 it("liefert ausschließlich akzeptierte Produktionsdaten",()=>{expect(metricExamples.every(item=>item.verificationStatus==="accepted")).toBe(true);expect(cadenceExamples.every(item=>item.verificationStatus==="accepted")).toBe(true);expect(poolExercises.filter(item=>item.area==="metre")).toHaveLength(metricExamples.length+cadenceExamples.length);});
 it("hält Silben und Betonungen synchron",()=>{for(const item of metricExamples)expect(item.syllables).toHaveLength(item.stresses.length);for(const item of cadenceExamples)expect(item.finalSyllables).toHaveLength(item.finalStresses.length);});
 it("hinterlegt für jeden produktiven Vollvers eine explizite verifizierte Annotation",()=>{const verses=metricExamples.filter(item=>item.kind==="verse");expect(studentMetricAnnotations).toHaveLength(verses.length);for(const annotation of studentMetricAnnotations){expect(annotation.verificationStatus).toBe("verified");expect(annotation.syllables).toHaveLength(annotation.stressPattern.length);expect(annotation.sourceWorkId).toMatch(/^exercise-meter-/);expect(annotation.feetCount).toBeGreaterThan(0);expect(annotation.text).toBeTruthy();}});
 it("weist jedem metrischen Beispiel eine positive Hebungszahl zu",()=>{for(const item of metricExamples)expect(item.feet).toBeGreaterThan(0);});
 it("trennt Wortakzent und Versmetrum explizit",()=>{expect(metricExamples.filter(item=>item.kind==="word").every(item=>item.verificationNote.includes("kein Beleg für ein Versmetrum"))).toBe(true);expect(metricExamples.filter(item=>item.kind==="verse").every(item=>item.text.includes(" "))).toBe(true);});
 it("bestimmt Kadenzen nur an vollständigen Versen",()=>{for(const item of cadenceExamples){expect(item.text.trim().split(/\s+/).length).toBeGreaterThanOrEqual(4);expect(item.text.endsWith(".")).toBe(true);expect(item.explanation.length).toBeGreaterThan(40);}});
 it("verwendet über beide Register eindeutige IDs",()=>{const ids=[...metricExamples,...cadenceExamples].map(item=>item.id);expect(new Set(ids).size).toBe(ids.length);});
 it("bilanziert den zurückgesetzten Altbestand vollständig",()=>{expect(meterQualityReport.meter.accepted+meterQualityReport.meter.rejected).toBe(240);expect(meterQualityReport.cadence.accepted+meterQualityReport.cadence.rejected).toBe(80);expect(meterQualityReport.policy.productionStatus).toBe("accepted");});
 it("ordnet Wortakzent, Kadenz und Abweichung fachlich passenden Leveln zu",()=>{const metre=poolExercises.filter(item=>item.area==="metre");expect(metre.filter(item=>item.title==="Wortakzent erkennen").every(item=>item.level===1)).toBe(true);expect(metre.filter(item=>item.title==="Kadenz bestimmen").every(item=>item.level===2)).toBe(true);expect(metre.filter(item=>item.title==="Grundmetrum trotz Abweichung").every(item=>item.level===3)).toBe(true);});
});
