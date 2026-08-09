"use client";
import { useState } from "react";
import { AssetBackdrop, AssetImage } from "./AssetImage";

export interface GraphCharacter { id:string; name:string; assetId?:string; }
export interface GraphConnection { id:string; a:string; b:string; label:string; symbol:string; completed:boolean; }

export function RelationshipGraph({characters,connections,onConnect}:{characters:readonly GraphCharacter[];connections:readonly GraphConnection[];onConnect:(a:string,b:string)=>void}){
 const [selected,setSelected]=useState<string|null>(null);
 const choose=(id:string)=>{if(!selected){setSelected(id);return;}if(selected!==id)onConnect(selected,id);setSelected(null);};
 return <div className="relationship-graph" aria-label="Ensemble-Beziehungsnetz"><AssetBackdrop id="bg_relationship_room"/><div className="ensemble-nodes">{characters.map((character)=><button key={character.id} aria-pressed={selected===character.id} onClick={()=>choose(character.id)} className={selected===character.id?"selected":""}><AssetImage id={character.assetId??""} className="ensemble-portrait" fallback={<span aria-hidden="true">{character.name.slice(0,1)}</span>}/><strong>{character.name}</strong><small>{selected===character.id?"Ausgewählt":"Figur wählen"}</small></button>)}</div><ol className="connection-ledger" aria-label="Rekonstruierte Beziehungen">{connections.map((connection)=><li key={connection.id} className={connection.completed?"completed":"pending"}><span>{connection.symbol}</span><strong>{connection.label}</strong><small>{connection.completed?"Verbindung und Begründung ergänzt":"Noch zu rekonstruieren"}</small></li>)}</ol></div>;
}
