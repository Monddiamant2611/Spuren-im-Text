import { describe,expect,it } from "vitest";
import { poolExercises } from "../src/games/lyrik/data/exercises/pools";
import { knowledgeCards } from "../src/games/lyrik/data/game";
import { metricExamples } from "../src/games/lyrik/data/meter";
import { contentQualityReport } from "../src/games/lyrik/data/quality";
import { microTexts } from "../src/games/lyrik/data/texts/microTexts";
import { transferCases } from "../src/games/lyrik/data/texts/transferCases";

describe("redaktionelle Mindestqualität",()=>{
 it("enthält keine exakt identischen vollständigen Aufgaben",()=>expect(contentQualityReport.exactDuplicateTaskBodies).toEqual([]));
 it("enthält keine leeren Erklärungen oder Ersatzmarkierungen",()=>{for(const item of poolExercises)expect(item.feedback.trim().length).toBeGreaterThan(20);expect(JSON.stringify({poolExercises,knowledgeCards}).toLowerCase()).not.toMatch(/platzhalter|todo|tbd|kuratiertes kurzbeispiel/);});
 it("verwendet eindeutige, vollständige Optionen",()=>{for(const item of poolExercises.filter(x=>x.options)){expect(new Set(item.options).size).toBe(item.options!.length);expect(item.correct?.every(answer=>item.options!.includes(answer))).toBe(true);}});
 it("referenziert nur gültige Wissenskarten",()=>{const ids=new Set(knowledgeCards.map(card=>card.id));for(const item of poolExercises)if("cardId" in item&&typeof item.cardId==="string")expect(ids.has(item.cardId)).toBe(true);});
 it("kennzeichnet alle Übungstexte ohne fingierte Attribution",()=>{for(const item of microTexts){expect(item.sourceType).toBe("exerciseText");expect(item.title).toContain("Übungstext");expect(item).not.toHaveProperty("author");}});
 it("führt im produktiven Metrikpool nur akzeptierte Datensätze",()=>expect(metricExamples.every(item=>item.verificationStatus==="accepted")).toBe(true));
 it("besitzt vollständige, relevanzgesteuerte Transferfälle",()=>{for(const item of transferCases){expect(item.steps).toHaveLength(5);expect(item.relevant.length).toBeGreaterThan(2);expect(item.notProminent.length).toBeGreaterThan(0);expect(item.notDeterminable.length).toBeGreaterThan(0);}});
 it("hat 50 einzeln redaktionell markierte Texte",()=>expect(contentQualityReport.editoriallyRewrittenTexts).toBe(50));
});
