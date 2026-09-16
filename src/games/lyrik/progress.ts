"use client";
import { useSyncExternalStore } from "react";
import type { LyrikLevel, LyrikPhaseId } from "./data/game";

export const LYRIK_PROGRESS_KEY = "lyrik.learningProgress.v1";
export type LyrikProgress = { version:1; completed:LyrikPhaseId[]; completedTogetherChapters:number[]; completedPracticeChapters:number[]; completedChallengeChapters:number[]; completedTransferChapters:number[]; completedChapters:number[]; level:LyrikLevel; strengths:Record<string,number>; attempts:number };
const empty: LyrikProgress = { version:1,completed:[],completedTogetherChapters:[],completedPracticeChapters:[],completedChallengeChapters:[],completedTransferChapters:[],completedChapters:[],level:1,strengths:{},attempts:0 };
const eventName = "lyrik-progress-change";
let cachedRaw:string|null|undefined;
let cachedProgress:LyrikProgress=empty;
export function parseProgress(raw:string|null):LyrikProgress { try { const item=JSON.parse(raw ?? "null") as Partial<LyrikProgress>; if(item?.version!==1)return empty; const valid=(value:unknown)=>Array.isArray(value)?[...new Set(value.filter(chapter=>Number.isInteger(chapter)&&chapter>=1&&chapter<=9))] as number[]:[];return {version:1,completed:Array.isArray(item.completed)?item.completed:[],completedTogetherChapters:valid(item.completedTogetherChapters),completedPracticeChapters:valid(item.completedPracticeChapters),completedChallengeChapters:valid(item.completedChallengeChapters),completedTransferChapters:valid(item.completedTransferChapters),completedChapters:valid(item.completedChapters),level:[1,2,3].includes(item.level as number)?item.level!:1,strengths:item.strengths??{},attempts:Number.isInteger(item.attempts)?item.attempts!:0}; } catch { return empty; } }
export function readProgress(){ if(typeof window==="undefined")return empty;const raw=localStorage.getItem(LYRIK_PROGRESS_KEY);if(raw===cachedRaw)return cachedProgress;cachedRaw=raw;cachedProgress=parseProgress(raw);return cachedProgress; }
function write(progress:LyrikProgress){ localStorage.setItem(LYRIK_PROGRESS_KEY,JSON.stringify(progress)); window.dispatchEvent(new Event(eventName)); }
export function savePhase(phase:LyrikPhaseId,area:string,correct:boolean){ const old=readProgress(); write({...old,completed:old.completed.includes(phase)?old.completed:[...old.completed,phase],attempts:old.attempts+1,strengths:{...old.strengths,[area]:(old.strengths[area]??0)+(correct?1:-1)}}); }
export function saveLevel(level:LyrikLevel){ write({...readProgress(),level}); }
export function completeTogetherChapter(chapter:number){const old=readProgress();if(old.completedTogetherChapters.includes(chapter))return;write({...old,completedTogetherChapters:[...old.completedTogetherChapters,chapter]});}
export function completeChapterPhase(chapter:number,phase:"practice"|"challenge"|"transfer"){const old=readProgress(),key=phase==="practice"?"completedPracticeChapters":phase==="challenge"?"completedChallengeChapters":"completedTransferChapters",done=old[key];if(done.includes(chapter))return;write({...old,[key]:[...done,chapter],...(phase==="transfer"?{completedChapters:[...new Set([...old.completedChapters,chapter])]}:{})});}
export function resetProgress(){ localStorage.removeItem(LYRIK_PROGRESS_KEY); window.dispatchEvent(new Event(eventName)); }
const subscribe=(callback:()=>void)=>{ window.addEventListener("storage",callback);window.addEventListener(eventName,callback);return()=>{window.removeEventListener("storage",callback);window.removeEventListener(eventName,callback);};};
export function useLyrikProgress(){ return useSyncExternalStore(subscribe,readProgress,()=>empty); }
