import { describe, expect, it } from "vitest";
import { analysisAreas, knowledgeCards, phases, tasks } from "../src/games/lyrik/data/game";
import { diversifyStyleTasks, optionsForLevel, seededShuffle, selectRound } from "../src/games/lyrik/engine";
import { parseProgress } from "../src/games/lyrik/progress";

describe("Lyrikwerkstatt",()=>{
  it("enthält alle Phasen, Analysebereiche und Stilmittel",()=>{ expect(phases).toHaveLength(6);expect(analysisAreas).toHaveLength(9);expect(knowledgeCards.filter(x=>x.id.startsWith("style-"))).toHaveLength(52); });
  it("mischt deterministisch und über Seeds verschieden",()=>{ const source=["a","b","c","d","e","f"];expect(seededShuffle(source,7,"x")).toEqual(seededShuffle(source,7,"x"));expect(seededShuffle(source,7,"x")).not.toEqual(seededShuffle(source,8,"x")); });
  it("liefert je Level 4, 6 oder 8 Optionen",()=>{ const task=tasks.find(x=>x.options)!;expect(optionsForLevel(task,1,1)).toHaveLength(4);expect(optionsForLevel(task,2,1)).toHaveLength(6);expect(optionsForLevel(task,3,1)).toHaveLength(8); });
  it("verwirft beschädigten Fortschritt",()=>{ expect(parseProgress("kaputt").completed).toEqual([]);expect(parseProgress(JSON.stringify({version:2,completed:["transfer"]})).completed).toEqual([]); });
  it("variiert Stilbegriffe und schließt kürzlich verwendete Beispiele aus",()=>{const styles=tasks.filter(task=>task.id.startsWith("style-recognize-"));const diversified=diversifyStyleTasks(styles);for(let index=1;index<diversified.length;index++){expect(diversified[index].styleAnswer).not.toBe(diversified[index-1].styleAnswer);expect(diversified[index].text).not.toBe(diversified[index-1].text);}const first=selectRound(styles,17,20);const second=selectRound(styles,23,20,first.map(task=>task.id));expect(second.some(task=>first.some(previous=>previous.id===task.id))).toBe(false);});
  it("verhindert direkte Textwiederholungen auch zwischen verschiedenen Aufgabenarten",()=>{for(const phase of phases){const pool=diversifyStyleTasks(seededShuffle(tasks.filter(task=>task.phase===phase.id),1701,phase.id,task=>task.id));for(let index=1;index<pool.length;index++)expect(pool[index].text).not.toBe(pool[index-1].text);}});
});
