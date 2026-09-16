import {describe,expect,it} from "vitest";
import {guidedChapters} from "../src/games/lyrik/data/guidedAnalysis";
import {canonicalTasks} from "../src/games/lyrik/data/canonicalTasks";

describe("angeleitete Analyse mit authentischer Lyrik",()=>{
 it("redigiert alle neun Kapitel als vollständige Interaktionsfolgen",()=>{expect(guidedChapters).toHaveLength(9);expect(guidedChapters[8]).toHaveLength(6);for(const chapter of guidedChapters){expect(chapter.length).toBeGreaterThanOrEqual(4);for(const step of chapter){expect(step.instruction.length).toBeGreaterThan(35);expect(step.material.text.length).toBeGreaterThan(20);expect(step.interaction).toBeTruthy();expect(step.solution.length).toBeGreaterThan(20);expect(step.feedback.length).toBeGreaterThan(20);}}});
 it("verwendet keine identischen Antwortsets in aufeinanderfolgenden Schritten",()=>{for(const chapter of guidedChapters)for(let i=1;i<chapter.length;i++){const current=chapter[i].options?.map(x=>x.label).join("|")??chapter[i].instruction;const previous=chapter[i-1].options?.map(x=>x.label).join("|")??chapter[i-1].instruction;expect(current).not.toBe(previous);}});
 it("gibt Kapitel 1 vier unterschiedliche Operationen",()=>{expect(guidedChapters[0].map(x=>x.interaction)).toEqual(["multi","multi","sorting","free"]);expect(new Set(guidedChapters[0].map(x=>x.instruction))).toHaveLength(4);});
 it("bewahrt authentische Aufgaben und kennzeichnet gesperrte statt sie zu löschen",()=>{expect(canonicalTasks.length).toBeGreaterThanOrEqual(30);expect(canonicalTasks.every(x=>x.sourceType==="authentic")).toBe(true);expect(canonicalTasks.some(x=>x.verificationStatus==="blockedPendingVerification")).toBe(true);expect(canonicalTasks.filter(x=>x.kind==="free").every(x=>x.criteria?.length)).toBe(true);});
 it("setzt Autor und Sprecher nirgends gleich",()=>{const corpus=JSON.stringify(guidedChapters);expect(corpus).not.toMatch(/(Ich|Sprecher) ist (automatisch )?(Rilke|Goethe|Eichendorff)\.(?!.*nicht)/);expect(corpus).toContain("Autor und Sprecher unterscheiden");});
});
