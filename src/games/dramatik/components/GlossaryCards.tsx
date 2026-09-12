"use client";
import {useState} from "react";
import type {GlossaryEntry} from "../data/glossary";
import styles from "./GlossaryCards.module.css";

export function GlossaryCards({entries}:{entries:readonly GlossaryEntry[]}){
 const unique=[...new Map(entries.map(entry=>[entry.term,entry])).values()];
 const[open,setOpen]=useState<string[]>([]);
 return <section aria-labelledby="term-cards-title"><h3 id="term-cards-title">Begriffskarten</h3><p>Öffnen Sie eine Karte per Klick, Tippen, Enter oder Leertaste. Die Karten dienen nur zum freiwilligen Nachschlagen.</p><div className={styles.grid}>{unique.map(entry=>{const revealed=open.includes(entry.id);return <button key={entry.term} type="button" className={styles.card} aria-expanded={revealed} onClick={()=>setOpen(items=>revealed?items.filter(id=>id!==entry.id):[...items,entry.id])}><strong>{entry.term}</strong>{revealed?<span>{entry.definition}</span>:<small>Definition anzeigen</small>}</button>})}</div></section>;
}
