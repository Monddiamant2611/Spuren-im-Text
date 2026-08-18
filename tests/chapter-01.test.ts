import { describe,expect,it } from "vitest";
import { certaintyClaims, chapter01PrimarySources, situationEvidence, streetSituationCards, transferFields } from "../src/games/dramatik/data/chapter_01_content";
import { advanceChapter01,classifyClaim,identifySignal,initialChapter01Session,linkSituationEvidence,placeSituation,setTransferField } from "../src/games/dramatik/mechanics/chapter_01_engine";
import type { Chapter01Session } from "../src/games/dramatik/mechanics/chapter_01_engine";
import { isChapterUnlocked } from "../src/core/progress/progress";
import { createNewGameState,loadGameState,saveGameState } from "../src/core/state/store";

function memoryStorage(){const data=new Map<string,string>();return{getItem:(key:string)=>data.get(key)??null,setItem:(key:string,value:string)=>void data.set(key,value)}}
function reachSignals(){return advanceChapter01(initialChapter01Session)}

describe("chapter 1 reconstructed director's book",()=>{
  it("identifies speaker, stage direction, and speech in sequence",()=>{let s=reachSignals();expect(identifySignal(s,"anna_speaker","speaker").valid).toBe(true);s=identifySignal(s,"anna_speaker","speaker").session;expect(identifySignal(s,"anna_direction_1","stage_direction").valid).toBe(true);s=identifySignal(s,"anna_direction_1","stage_direction").session;expect(identifySignal(s,"anna_speech_1","speech").session.round).toBe(3)});
  it("allows retry after a wrong signal",()=>{const wrong=identifySignal(reachSignals(),"anna_speech_1","speech");expect(wrong.valid).toBe(false);expect(wrong.session.signalStep).toBe(0);expect(identifySignal(wrong.session,"anna_speaker","speaker").valid).toBe(true)});
  it("distinguishes direct evidence, inference, and unsupported claims",()=>{let s:Chapter01Session={...initialChapter01Session,round:3};const fear=classifyClaim(s,"claim_fear","explicit");expect(fear.valid).toBe(false);expect(fear.session.certaintyAssignments.claim_fear).toBeUndefined();s=classifyClaim(fear.session,"claim_fear","inference").session;expect(s.certaintyAssignments.claim_fear).toBe("inference");expect(classifyClaim(s,"claim_person","unsupported").valid).toBe(true)});
  it("accepts information that is not ascertainable",()=>{const s={...initialChapter01Session,round:5 as const};expect(placeSituation(s,"street_time","unknown").valid).toBe(true);expect(placeSituation(s,"street_romeo","unknown").valid).toBe(true)});
  it("requires observation before situational inference",()=>{const s={...initialChapter01Session,round:6 as const};expect(linkSituationEvidence(s,situationEvidence.textId,"Sampson ist feige.",situationEvidence.situation).valid).toBe(false);expect(linkSituationEvidence(s,situationEvidence.textId,situationEvidence.observation,situationEvidence.situation).valid).toBe(true)});
  it("loads both excerpts only from the protected EPUB dataset",()=>{expect(chapter01PrimarySources).toHaveLength(10);expect(chapter01PrimarySources.every(item=>item.source.endsWith("william-shakespeare-romeo-und-juliette.epub")&&item.text_origin==="primary_source"&&item.editable===false&&item.source_verified)).toBe(true)});
  it("completes the transfer and unlocks chapter 2",()=>{let s:Chapter01Session={...initialChapter01Session,round:7};for(const field of transferFields)s=setTransferField(s,field.id,field.answer,field.evidenceId).session;expect(s.completed).toBe(true);expect(isChapterUnlocked("chapter_02",["chapter_01"])).toBe(true)});
  it("persists a meaningful mid-chapter state",()=>{const storage=memoryStorage();const session=classifyClaim({...initialChapter01Session,round:3 as const},certaintyClaims[0].id,certaintyClaims[0].target).session;saveGameState({...createNewGameState(),decisions:{chapter_01:session}},storage);expect((loadGameState(storage).decisions.chapter_01 as typeof session).certaintyAssignments.claim_door).toBe("explicit")});
  it("keeps all situation and transfer answers unambiguous",()=>{expect(new Set(streetSituationCards.map(item=>item.id)).size).toBe(streetSituationCards.length);expect(transferFields.filter(item=>item.answer==="Nicht eindeutig angegeben").map(item=>item.field)).toEqual(["place","time"])});
});
