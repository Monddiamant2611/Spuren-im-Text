"use client";

import { useState, type DragEvent } from "react";

export interface BoardItem { id: string; text: string; textOrigin: "primary_source" | "didactic_summary"; }
export interface BoardTarget { id: string; label: string; help?: string; }

export function DragDropBoard({ items, targets, assigned, onAssign, feedback }: { items: readonly BoardItem[]; targets: readonly BoardTarget[]; assigned: Readonly<Record<string,string>>; onAssign: (itemId: string, targetId: string) => void; feedback?: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const unassigned = items.filter((item) => !assigned[item.id]);
  const drop = (targetId: string, itemId?: string) => { const id = itemId ?? selected; if (!id) return; onAssign(id, targetId); setSelected(null); };
  const dragStart = (event: DragEvent, itemId: string) => { event.dataTransfer.setData("text/plain", itemId); event.dataTransfer.effectAllowed = "move"; };
  return <div className="dnd-board"><section className="fragment-tray" aria-label="Manuskriptfragmente"><h3>Papierfragmente</h3>{unassigned.map((item) => <button key={item.id} draggable onDragStart={(event) => dragStart(event,item.id)} onClick={() => setSelected(item.id)} aria-pressed={selected===item.id} className={`paper-fragment ${selected===item.id?"selected":""}`}><span className="origin-label">Originaltext</span>{item.text}</button>)}</section><section className="target-grid" aria-label="Zielbereiche">{targets.map((target) => { const placed = items.find((item) => assigned[item.id] === target.id); return <button key={target.id} className={`drop-zone ${placed?"restored":""}`} onDragOver={(event)=>event.preventDefault()} onDrop={(event)=>{event.preventDefault();drop(target.id,event.dataTransfer.getData("text/plain"));}} onClick={()=>drop(target.id)} disabled={Boolean(placed)}><strong>{target.label}</strong>{placed?<span className="restored-text"><small>Originaltext · restauriert</small>{placed.text}</span>:<small>{selected?"Hier einsetzen":"Fragment wählen oder hierher ziehen"}</small>}</button>;})}</section>{feedback&&<p className="chapter-feedback" role="status">{feedback}</p>}</div>;
}
