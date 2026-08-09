"use client";
import { useState, type DragEvent } from "react";
export interface ChainCard { id:string; label:string; }
export function CausalChainBoard({cards,orderedIds,onPlace}:{cards:readonly ChainCard[];orderedIds:readonly string[];onPlace:(id:string,index:number)=>void}){
 const[selected,setSelected]=useState<string|null>(null);const remaining=cards.filter((card)=>!orderedIds.includes(card.id));
 const drop=(event:DragEvent,index:number)=>{event.preventDefault();const id=event.dataTransfer.getData("text/plain");if(id)onPlace(id,index)};
 return <div className="causal-board"><div className="causal-tray" aria-label="Ereigniskarten">{remaining.map((card)=><button key={card.id} draggable onDragStart={(event)=>event.dataTransfer.setData("text/plain",card.id)} aria-pressed={selected===card.id} onClick={()=>setSelected(card.id)}>{card.label}</button>)}</div><ol className="causal-slots" aria-label="Kausalkette">{cards.map((_,index)=>{const card=cards.find((item)=>item.id===orderedIds[index]);return <li key={index} onDragOver={(event)=>event.preventDefault()} onDrop={(event)=>drop(event,index)}><button onClick={()=>selected&&(onPlace(selected,index),setSelected(null))} aria-label={`Position ${index+1}${card?`: ${card.label}`:" belegen"}`}>{card?<><small>Ereignis {index+1}</small>{card.label}</>:<span>Ereigniskarte einsetzen</span>}</button>{index<cards.length-1&&<span aria-hidden="true">↓</span>}</li>})}</ol></div>;
}
