import { describe, expect, it } from "vitest";
import { isChapterUnlocked } from "../src/core/progress/progress";
import { initialGameState } from "../src/core/state/types";
import { loadGameState, saveGameState } from "../src/core/state/store";
import { archiveClues } from "../src/games/dramatik/data/chapter_03/evidence";
import { causalEvents } from "../src/games/dramatik/data/chapter_03/causal_chain";
import { audienceKnowledge } from "../src/games/dramatik/data/chapter_03/audience_knowledge";
import { missingInformation } from "../src/games/dramatik/data/chapter_03/cause_effect";
import { evidenceClaims } from "../src/games/dramatik/data/chapter_03/unsupported_claims";
import { relevanceCards } from "../src/games/dramatik/data/chapter_03/relevance";
import { assignAudienceKnowledge, classifyClaim, completeChapter03, initialChapter03Session, toggleRelevance, type Chapter03Session } from "../src/games/dramatik/mechanics/chapter_03_engine";

describe("chapter 3 archive content and state",()=>{
 it("unlocks chapter 3 only after chapter 2",()=>{expect(isChapterUnlocked("chapter_03",["chapter_01"])).toBe(false);expect(isChapterUnlocked("chapter_03",["chapter_01","chapter_02"])).toBe(true)});
 it("loads archive clues from data",()=>{expect(archiveClues.map((item)=>item.id)).toContain("clue_marcus");expect(archiveClues).toHaveLength(6)});
 it("contains no unverified content presented as primary source",()=>{const content=[...archiveClues,...causalEvents];expect(content.some((item)=>item.text_origin===("primary_source" as string))).toBe(false);expect(content.every((item)=>item.source_verified===false)).toBe(true)});
 it("keeps Romeo and audience knowledge separate",()=>{expect(audienceKnowledge.filter((item)=>item.target==="romeo")).toHaveLength(2);expect(audienceKnowledge.filter((item)=>item.target==="audience")).toHaveLength(2);const placed=assignAudienceKnowledge({...initialChapter03Session,round:7},audienceKnowledge[0].id,"audience");expect(placed.valid).toBe(false)});
 it("rejects the unsupported intentional-prevention claim",()=>{const unsupported=evidenceClaims.find((item)=>!item.supported)!;expect(classifyClaim({...initialChapter03Session,round:8},unsupported.id,"supported").valid).toBe(false);expect(classifyClaim({...initialChapter03Session,round:8},unsupported.id,"unsupported").valid).toBe(true)});
 it("uses cautious counterfactual feedback",()=>{expect(missingInformation.feedback).toContain("nicht sicher ableiten");expect(missingInformation.feedback).not.toContain("wäre die Katastrophe verhindert")});
 it("completes relevance selection only with the relevant subset",()=>{let session:Chapter03Session={...initialChapter03Session,round:9};for(const item of relevanceCards.filter((entry)=>entry.relevant))session=toggleRelevance(session,item.id);const result=completeChapter03(session);expect(result.valid).toBe(true);expect(result.session.completed).toBe(true)});
 it("unlocks chapter 4 only after chapter 3",()=>{expect(isChapterUnlocked("chapter_04",["chapter_01","chapter_02"])).toBe(false);expect(isChapterUnlocked("chapter_04",["chapter_01","chapter_02","chapter_03"])).toBe(true)});
 it("persists the investigation after reload",()=>{const memory=new Map<string,string>();const storage={getItem:(key:string)=>memory.get(key)??null,setItem:(key:string,value:string)=>memory.set(key,value)};const session={...initialChapter03Session,round:3 as const,foundClues:["clue_letter"]};saveGameState({...initialGameState,currentGame:"dramatik",currentChapter:"chapter_03",completedChapters:["chapter_01","chapter_02"],decisions:{chapter_03:session}},storage);expect((loadGameState(storage).decisions.chapter_03 as typeof session).foundClues).toEqual(["clue_letter"])});
});
