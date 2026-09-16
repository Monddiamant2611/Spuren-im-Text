import {describe,expect,it} from "vitest";
import {tasks} from "../src/games/lyrik/data/game";
import {canonicalPoems} from "../src/games/lyrik/data/texts/canonicalPoems";
import {guidedChapters} from "../src/games/lyrik/data/guidedAnalysis";
import {guidedForRelease,isStudentContentAllowed,poemsForRelease,tasksForRelease} from "../src/games/lyrik/data/releasePolicy";

describe("fail-closed Student Release",()=>{
 const poems=poemsForRelease("student"),releaseTasks=tasksForRelease(tasks,"student"),guided=guidedForRelease("student");
 it("enthält nur freigegebene kanonische Primärtexte",()=>{expect(poems).toHaveLength(6);for(const poem of poems){expect(isStudentContentAllowed(poem)).toBe(true);expect(poem.text).toBe(poem.canonicalText);}});
 it("schließt unresolved, rights-blocked und blockierte Aufgaben zentral aus",()=>{expect(poems.some(p=>p.textVerificationStatus!=="verified"||p.rightsStatus==="translation-review-required")).toBe(false);expect(releaseTasks.some(t=>t.verificationStatus==="blockedPendingVerification")).toBe(false);});
 it("auditiert 38 und sperrt den einen ungeprüften Gemeinsam-Schritt",()=>{expect(guidedChapters.flat()).toHaveLength(38);expect(guided.flat()).toHaveLength(37);for(const step of guided.flat()){expect(step.sourceWorkIds.length).toBeGreaterThan(0);expect(isStudentContentAllowed(step)).toBe(true);const poem=canonicalPoems.find(p=>p.id===step.sourceWorkIds[0])!;expect(String(poem.canonicalText).replace(/\n+/g,"\n")).toContain(step.material.text.replace(/\n+/g,"\n"));expect(step.material.label).not.toMatch(/unresolved|verified|pending|canonical|CorpusEntry|rights-blocked|Allowed/i);}});
 it("behält in allen neun Kapiteln freigegebene vollständige Aufgabenpakete",()=>{for(let chapter=1;chapter<=9;chapter++){expect(guided[chapter-1].length).toBeGreaterThan(0);const area=["lyric","interpretation","form","speaker","movement","metre","language","mood","integration"][chapter-1];expect(releaseTasks.filter(t=>t.area===area).length,`${chapter}`).toBeGreaterThan(0);}});
});
