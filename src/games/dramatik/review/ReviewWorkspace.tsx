"use client";
import {useMemo,useState} from "react";
import {deriveTheatreState,isChapterUnlocked} from "../../../core/progress/progress";
import {initialGameState,type GameState} from "../../../core/state/types";
import {AssetImage} from "../../../shared/components/AssetImage";
import {ChapterCompletion} from "../../../shared/components/ChapterCompletion";
import {Chapter01} from "../scenes/Chapter01";
import {Chapter02} from "../scenes/Chapter02";
import {Chapter03} from "../scenes/Chapter03";
import {Chapter04} from "../scenes/Chapter04";
import {Chapter05} from "../scenes/Chapter05";
import {Finale} from "../scenes/Finale";
import {initialChapter01Session,type Chapter01Session} from "../mechanics/chapter_01_engine";
import {createChapter02Session,type Chapter02Session} from "../mechanics/chapter_02_engine";
import {initialChapter03Session,type Chapter03Session} from "../mechanics/chapter_03_engine";
import {initialChapter04Session,type Chapter04Session} from "../mechanics/chapter_04_engine";
import {initialChapter05Session,type Chapter05Session} from "../mechanics/chapter_05_engine";
import {theatreAreas} from "../data/theatre";
import {ReviewPanel} from "./ReviewPanel";
import {reviewTargetById,type ReviewChapterId,type ReviewTarget} from "./reviewRegistry";

type ReviewSession=Chapter01Session|Chapter02Session|Chapter03Session|Chapter04Session|Chapter05Session;

export function ReviewWorkspace({initialTargetId,onDisable}:{initialTargetId:string;onDisable:()=>void}){
 const[target,setTarget]=useState<ReviewTarget>(()=>reviewTargetById(initialTargetId));
 const[state,setState]=useState<GameState>(()=>stateForTarget(reviewTargetById(initialTargetId)));
 const select=(next:ReviewTarget)=>{setTarget(next);setState(stateForTarget(next));const url=new URL(window.location.href);url.searchParams.set("review","1");url.searchParams.set("step",next.id);url.searchParams.delete("chapter");url.searchParams.delete("round");window.history.replaceState({},"",url)};
 const save=(chapterId:ReviewChapterId,session:ReviewSession)=>setState(current=>({...current,decisions:{...current.decisions,[chapterId]:{...session,failedAttempts:0,competencyEvents:[]}}}));
 const content=useMemo(()=>{
  const noopExit=()=>select(reviewTargetById("theatre-initial"));
  if(target.kind==="theatre")return <ReviewTheatre target={target} onOpen={chapterId=>select(reviewTargetById(`${chapterId}-round-1`))} onFinale={()=>select(reviewTargetById("finale-welcome"))}/>;
  if(target.kind==="finale")return <Finale key={target.id} state={state} previewMode={target.mode} onUpdate={patch=>setState(current=>({...current,...patch}))} onExit={noopExit}/>;
  const props={gameState:state,onExit:noopExit};
  if(target.chapterId==="chapter_01")return <Chapter01 {...props} onSave={session=>save("chapter_01",session)} onComplete={session=>save("chapter_01",session)}/>;
  if(target.chapterId==="chapter_02")return <Chapter02 {...props} onSave={session=>save("chapter_02",session)} onComplete={session=>save("chapter_02",session)}/>;
  if(target.chapterId==="chapter_03")return <Chapter03 {...props} onSave={session=>save("chapter_03",session)} onComplete={session=>save("chapter_03",session)}/>;
  if(target.chapterId==="chapter_04")return <Chapter04 {...props} onSave={session=>save("chapter_04",session)} onComplete={session=>save("chapter_04",session)}/>;
  return <Chapter05 {...props} onSave={session=>save("chapter_05",session)} onComplete={session=>save("chapter_05",session)}/>;
 },[state,target]);
 return <div className="review-workspace"><div className="review-banner" role="status">PRÜFMODUS · Änderungen werden nicht gespeichert und nicht bewertet.</div><div key={target.id}>{content}</div>{target.kind==="chapter"&&target.completion&&<ChapterCompletion chapterId={target.chapterId} onExit={()=>select(reviewTargetById("theatre-initial"))}/>}<ReviewPanel current={target} onSelect={select} onDisable={onDisable}/></div>;
}

function stateForTarget(target:ReviewTarget):GameState{
 const base:GameState={...structuredClone(initialGameState),currentGame:"dramatik",settings:{...initialGameState.settings,reducedMotion:true},lastSavedAt:null};
 if(target.kind==="theatre")return{...base,completedChapters:[...target.completedChapters],theatreState:deriveTheatreState(target.completedChapters,target.completedChapters.length===5)};
 if(target.kind==="finale")return finaleState(base,target.mode);
 const session=sessionFor(target.chapterId,target.round,target.completion===true);
 return{...base,currentChapter:target.chapterId,decisions:{[target.chapterId]:session}};
}

function sessionFor(chapterId:ReviewChapterId,round:number,completed:boolean):ReviewSession{
 if(chapterId==="chapter_01")return{...structuredClone(initialChapter01Session),round:Math.min(13,round) as Chapter01Session["round"],completed};
 if(chapterId==="chapter_02")return{...createChapter02Session(),round:Math.min(11,round) as Chapter02Session["round"],completed};
 if(chapterId==="chapter_03")return{...structuredClone(initialChapter03Session),round:Math.min(12,round) as Chapter03Session["round"],completed};
 if(chapterId==="chapter_04")return{...structuredClone(initialChapter04Session),round:Math.min(15,round),completed};
 return{...structuredClone(initialChapter05Session),round:Math.min(19,round),completed};
}

function finaleState(base:GameState,mode:"welcome"|"review"|"synthesis"|"book"|"closing"|"complete"):GameState{
 return{...base,currentChapter:"finale",completedChapters:["chapter_01","chapter_02","chapter_03","chapter_04","chapter_05"],theatreState:mode==="complete"?"PERFORMANCE_COMPLETE":"FINALE_READY",finaleStarted:mode!=="welcome",finaleVisitedAreas:mode==="review"?[]:["structure","figures","dialogue","conflict","interpretation"],finaleSynthesisCompleted:["synthesis","book","closing","complete"].includes(mode),finaleBookOpened:["book","closing","complete"].includes(mode),finaleClosingSeen:mode==="complete",finaleCompleted:mode==="complete",gameCompleted:mode==="complete",performanceState:mode==="complete"?"PERFORMANCE_COMPLETE":"FINALE_READY"};
}

function ReviewTheatre({target,onOpen,onFinale}:{target:Extract<ReviewTarget,{kind:"theatre"}>;onOpen:(chapterId:ReviewChapterId)=>void;onFinale:()=>void}){
 const theatreState=deriveTheatreState(target.completedChapters,target.completedChapters.length===5);
 return <main className={`game-shell theatre-${theatreState.toLowerCase()}`}><section className="theatre-wrap" aria-label="Theater-Progressionsvorschau"><div className="theatre-scene" data-state={theatreState}><AssetImage id="bg_theatre_main" className="asset-backdrop theatre-main-background" loading="eager" decorative/>{theatreAreas.map(area=>{const unlocked=isChapterUnlocked(area.chapterId,target.completedChapters),completed=target.completedChapters.includes(area.chapterId);if(!unlocked)return null;return <button key={area.id} className={`theatre-access theatre-access-${area.id} ${completed?"completed":"current"}`} onClick={()=>onOpen(area.chapterId as ReviewChapterId)}><AssetImage id={area.assetId} className="theatre-access-image" decorative/><span className="theatre-access-label"><small>{completed?"Abgeschlossen":"Verfügbar"}</small><strong>{area.title}</strong></span></button>})}{target.completedChapters.length===5&&<button className="finale-entry" onClick={onFinale}><strong>Finale verfügbar</strong></button>}</div></section></main>;
}
