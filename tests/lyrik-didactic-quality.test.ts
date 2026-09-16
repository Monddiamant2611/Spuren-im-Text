import { describe,expect,it } from "vitest";
import { didacticQualityReport,validateDidacticQuality } from "../src/games/lyrik/data/didactic-quality";
import { masterRoundTasks } from "../src/games/lyrik/data/exercises/masterRound";
import { poolExercises } from "../src/games/lyrik/data/exercises/pools";
import { knowledgeCards } from "../src/games/lyrik/data/game";
import { microTexts } from "../src/games/lyrik/data/texts/microTexts";
import { transferCases } from "../src/games/lyrik/data/texts/transferCases";

describe("kognitive und didaktische Aufgabenqualität",()=>{
 it("klassifiziert jede produktive Aufgabe nach Operation, Level und Domain",()=>{expect(validateDidacticQuality()).toEqual([]);for(const task of poolExercises){expect(task.cognitiveOperation).toBeTruthy();expect([1,2,3]).toContain(task.level);expect(task.domain).toBe(task.area);}});
 it("macht Level 3 zu Analyse, Vernetzung, Bewertung, Deutung oder Transfer",()=>{const level3=poolExercises.filter(task=>task.level===3);expect(level3.length).toBeGreaterThan(0);expect(level3.some(task=>task.cognitiveOperation!=="recognize")).toBe(true);expect(level3.filter(task=>task.cognitiveOperation==="recognize")).toHaveLength(0);expect((didacticQualityReport.level3Audit["A-echter-Transfer"]??0)+(didacticQualityReport.level3Audit["B-Analyse-Vernetzung"]??0)).toBe(level3.length);});
 it("strukturiert die Meisterrunde in zwölf Aufgaben und sechs Phasen",()=>{expect(masterRoundTasks).toHaveLength(12);expect(new Set(masterRoundTasks.map(task=>task.cognitivePhase))).toEqual(new Set(["observe","analyze","evidence","connect","interpret","transfer"]));expect(masterRoundTasks.filter(task=>task.styleAnswer&&task.cognitiveOperation==="recognize").length).toBeLessThanOrEqual(2);expect(new Set(masterRoundTasks.map(task=>task.text)).size).toBe(3);});
 it("gibt allen Transferfällen zusammenhängende Analyseschritte",()=>{for(const item of transferCases){expect(item.steps).toHaveLength(5);expect(new Set(item.steps.map(step=>step.cognitiveOperation)).size).toBeGreaterThanOrEqual(5);expect(item.steps[0].cognitivePhase).toBe("observe");expect(item.steps.at(-1)?.cognitivePhase).toBe("transfer");expect(item.steps.every(step=>item.relevant.includes(step.area))).toBe(true);}});
 it("bewertet offene Freitexte ausschließlich per Kriteriencheck",()=>{for(const task of poolExercises.filter(task=>task.mechanic==="free")){expect(task.correct).toBeUndefined();expect(task.openResponse).toBe(true);expect(task.criteria?.length).toBeGreaterThanOrEqual(3);expect(task.sample?.trim().length).toBeGreaterThan(40);}expect(didacticQualityReport.openResponse.exactStringScoring).toBe(false);});
 it("enthält gültige Referenzen und vollständiges Feedback",()=>{const cards=new Set(knowledgeCards.map(card=>card.id)),texts=new Set(microTexts.map(text=>text.id));for(const task of poolExercises){expect(task.feedback.trim().length).toBeGreaterThan(20);if("cardId" in task&&task.cardId)expect(cards.has(task.cardId)).toBe(true);}for(const item of transferCases)expect(texts.has(item.textId)).toBe(true);});
});
