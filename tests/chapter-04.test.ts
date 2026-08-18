import {describe,expect,it} from "vitest";
import {isChapterUnlocked} from "../src/core/progress/progress";
import {causalIntro,chain,chainLinks,chapter04Source,conflictTypes,finalConnections,julietCards,knowledgeCards} from "../src/games/dramatik/data/chapter_04_content";
import {assignActionReaction,assignCausalIntro,assignConflictType,assignConsequence,assignFinalRelation,assignJuliet,chooseAlternative,chooseTurningPoint,completeChapter04,distinguishDecision,initialChapter04Session,placeChainEvent,setChainRelation,toggleMiniAnalysis,type Chapter04Session} from "../src/games/dramatik/mechanics/chapter_04_engine";

describe("chapter 4 – Der Punkt ohne Rückkehr",()=>{
 it("remains locked until chapter 3",()=>{expect(isChapterUnlocked("chapter_04",["chapter_01","chapter_02"])).toBe(false);expect(isChapterUnlocked("chapter_04",["chapter_01","chapter_02","chapter_03"])).toBe(true)});
 it("marks every excerpt as protected Wieland primary source",()=>expect(chapter04Source.every(x=>x.text_origin==="primary_source"&&x.editable===false&&x.source_verified===true&&x.translation==="Christoph Martin Wieland")).toBe(true));
 it("distinguishes external and internal conflict",()=>{let s={...structuredClone(initialChapter04Session),round:2};for(const item of conflictTypes)s=assignConflictType(s,item.id,item.answer).session;expect(s.round).toBe(3)});
 it("rejects chronological succession as automatic causality",()=>{const s={...structuredClone(initialChapter04Session),round:3};expect(assignCausalIntro(s,"rain","causal").valid).toBe(false);expect(assignCausalIntro(s,"rain","temporal").valid).toBe(true)});
 it("keeps knowledge states data-driven",()=>expect(knowledgeCards.every(x=>x.origin==="didactic_summary"&&chapter04Source.some(source=>source.id===x.evidence))).toBe(true));
 it("requires the exact causal chain order",()=>{let s={...structuredClone(initialChapter04Session),round:7};expect(placeChainEvent(s,"fight").valid).toBe(false);for(const item of chain)s=placeChainEvent(s,item.id).session;expect(s.chainOrder).toEqual(chain.map(x=>x.id))});
 it("supports causal, contributing and merely later relations",()=>{expect(new Set([...chainLinks.map(x=>x.type),...finalConnections.map(x=>x.answer)])).toEqual(new Set(["causes","contributes","only_later"]))});
 it("rejects a wrong causal link",()=>expect(setChainRelation({...structuredClone(initialChapter04Session),round:7},"paris_interprets","paris_stops","only_later").valid).toBe(false));
 it("separates action and reaction",()=>{const s={...structuredClone(initialChapter04Session),round:8};expect(assignActionReaction(s,"paris_stops","action").valid).toBe(true);expect(assignActionReaction(s,"romeo_appeals","action").valid).toBe(false)});
 it("marks an alternative as possible rather than actual",()=>expect(chooseAlternative({...structuredClone(initialChapter04Session),round:8},"paris_allows_exit").session.alternative).toBe("paris_allows_exit"));
 it("requires a supported turning point",()=>expect(chooseTurningPoint({...structuredClone(initialChapter04Session),round:9},"appeal").valid).toBe(false));
 it("distinguishes immediate, farther and uncertain consequences",()=>{let s={...structuredClone(initialChapter04Session),round:9};s=assignConsequence(s,"fight","immediate").session;s=assignConsequence(s,"paris_falls","farther").session;s=assignConsequence(s,"peace","not_determinable").session;expect(s.round).toBe(10)});
 it("does not present Juliet's fears as actual consequences",()=>expect(julietCards.filter(x=>x.id==="poison"||x.id==="wake").every(x=>x.kind==="feared_possibility")).toBe(true));
 it("classifies Juliet's inner conflict from evidence",()=>{const s={...structuredClone(initialChapter04Session),round:11};expect(assignJuliet(s,"poison","feared_possibility").valid).toBe(true);expect(assignJuliet(s,"poison","execution").valid).toBe(false)});
 it("separates decision from execution",()=>{const s={...structuredClone(initialChapter04Session),round:13};expect(distinguishDecision(s,"c04_juliet_drinks","c04_juliet_execution").valid).toBe(true);expect(distinguishDecision(s,"c04_juliet_execution","c04_juliet_drinks").valid).toBe(false)});
 it("records only valid final relations",()=>{const s={...structuredClone(initialChapter04Session),round:15};expect(assignFinalRelation(s,"after","causes").valid).toBe(false);expect(assignFinalRelation(s,"after","only_later").valid).toBe(true)});
 it("requires every mini-analysis layer",()=>{let s={...structuredClone(initialChapter04Session),round:15,finalAssignments:{after:"only_later",cause:"causes",part:"contributes"}} as Chapter04Session;expect(completeChapter04(s).valid).toBe(false);for(const id of ["situation","goal","conflict","action","reaction","turning","consequence","evidence"])s=toggleMiniAnalysis(s,id);expect(completeChapter04(s).valid).toBe(true)});
 it("unlocks chapter 5 only after chapter 4 completion",()=>expect(isChapterUnlocked("chapter_05",["chapter_01","chapter_02","chapter_03","chapter_04"])).toBe(true));
 it("does not preselect staging values during the conflict chapter",()=>expect(initialChapter04Session.stagingDecisions).toEqual({}));
 it("contains no didactic text marked as primary source",()=>expect([...knowledgeCards,...causalIntro].some(x=>"text_origin" in x)).toBe(false));
});
