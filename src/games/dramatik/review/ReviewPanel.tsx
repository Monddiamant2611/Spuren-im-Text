"use client";
import {useEffect,useRef,useState} from "react";
import {reviewGroups,reviewTargets,type ReviewTarget} from "./reviewRegistry";

export function ReviewPanel({current,onSelect,onDisable}:{current:ReviewTarget;onSelect:(target:ReviewTarget)=>void;onDisable:()=>void}){
 const[open,setOpen]=useState(false);const panelRef=useRef<HTMLElement>(null);const triggerRef=useRef<HTMLButtonElement>(null);
 useEffect(()=>{if(!open)return;panelRef.current?.querySelector<HTMLElement>("button,[href],select")?.focus();const key=(event:KeyboardEvent)=>{if(event.key==="Escape"){setOpen(false);queueMicrotask(()=>triggerRef.current?.focus())}};document.addEventListener("keydown",key);return()=>document.removeEventListener("keydown",key)},[open]);
 const index=reviewTargets.findIndex(target=>target.id===current.id);const move=(offset:number)=>onSelect(reviewTargets[Math.min(reviewTargets.length-1,Math.max(0,index+offset))]);
 return <div className={`review-navigation ${open?"is-open":""}`}>
  <button ref={triggerRef} className="review-toggle" aria-expanded={open} aria-controls="review-panel" onClick={()=>setOpen(value=>!value)}>PRÜFMODUS</button>
  {open&&<aside ref={panelRef} id="review-panel" aria-label="Interne Entwicklungsnavigation">
   <header><strong>PRÜFMODUS</strong><small>Keine Speicherung · keine Kompetenzwertung</small><button onClick={()=>setOpen(false)} aria-label="Prüfmodus-Navigation schließen">×</button></header>
   <div className="review-current" aria-live="polite"><span>Aktuelle Prüfstelle</span><strong>{current.label}</strong></div>
   <div className="review-step-buttons"><button disabled={index===0} onClick={()=>move(-1)}>← Vorheriger Schritt</button><button disabled={index===reviewTargets.length-1} onClick={()=>move(1)}>Nächster Schritt →</button></div>
   <button className="review-theatre-jump" onClick={()=>{onSelect(reviewTargets[0]);setOpen(false)}}>Zur großen Bühne</button>
   <nav aria-label="Prüfstellen">{reviewGroups.map(group=><details key={group.id} open={group.targets.some(target=>target.id===current.id)}><summary>{group.label}</summary>{group.targets.map(target=><button key={target.id} aria-current={target.id===current.id?"page":undefined} onClick={()=>{onSelect(target);setOpen(false)}}>{target.label.replace(/^.*? · /,"")}</button>)}</details>)}</nav>
   <button className="review-disable" onClick={onDisable}>Prüfmodus ausschalten</button>
  </aside>}
 </div>
}
