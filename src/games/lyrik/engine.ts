import type { LyrikLevel, LyrikTask } from "./data/game";

export function seededShuffle<T>(items: readonly T[], seed: number, salt = "", id: (item: T) => string = String): T[] {
  let state = seed >>> 0 || 1;
  for (const char of salt) state = Math.imul(state ^ char.charCodeAt(0), 16777619) >>> 0;
  const output = [...items];
  for (let index = output.length - 1; index > 0; index -= 1) {
    for (const char of id(output[index])) state = Math.imul(state ^ char.charCodeAt(0), 16777619) >>> 0;
    state ^= state << 13; state ^= state >>> 17; state ^= state << 5;
    const target = (state >>> 0) % (index + 1);
    [output[index], output[target]] = [output[target], output[index]];
  }
  return output;
}

export function optionsForLevel(task: LyrikTask, level: LyrikLevel, seed: number): readonly string[] {
  const amount = level === 1 ? 4 : level === 2 ? 6 : 8;
  const base = task.options ?? [];
  const fallbacks = ["Die Aussage nennt keinen überprüfbaren Textbeleg.","Die Wirkung wird ohne sprachliches Signal behauptet.","Der Fachbegriff wird mit einer pauschalen Wirkung verbunden.","Die Aussage verwechselt Sprecher und Autor.","Aus dem Ausschnitt lässt sich diese Behauptung nicht absichern."];
  const correct=[...new Set(task.correct??[])];
  const ownDistractors=seededShuffle([...new Set(base)].filter(item=>!correct.includes(item)),seed,`${task.id}-own-distractors`);
  const fallbackDistractors=seededShuffle(fallbacks.filter(item=>!correct.includes(item)&&!ownDistractors.includes(item)),seed,`${task.id}-fallback-distractors`);
  const distractors=[...ownDistractors,...fallbackDistractors];
  return seededShuffle([...correct,...distractors.slice(0,Math.max(0,amount-correct.length))],seed,task.id);
}

export function createSeed(): number { return Math.floor(Math.random() * 0x7fffffff) || 1; }
export function isCorrect(task: LyrikTask, selected: readonly string[]): boolean { return !!task.correct && task.correct.length === selected.length && task.correct.every((answer) => selected.includes(answer)); }

export function selectRound(tasks:readonly LyrikTask[],seed:number,size:number,recentlyUsed:readonly string[]=[]):LyrikTask[]{
  const recent=new Set(recentlyUsed.slice(-Math.max(size*4,24)));
  const fresh=tasks.filter(task=>!recent.has(task.id));
  const source=fresh.length>=size?fresh:[...fresh,...tasks.filter(task=>recent.has(task.id))];
  return seededShuffle(source,seed,"round",task=>task.id).slice(0,size);
}

export function diversifyStyleTasks(tasks:readonly LyrikTask[]):LyrikTask[]{
  const remaining=[...tasks],output:LyrikTask[]=[];
  while(remaining.length){
    const previous=output.at(-1),beforePrevious=output.at(-2),styleCounts=new Map<string,number>(),textCounts=new Map<string,number>();
    for(const item of remaining){if(item.styleAnswer)styleCounts.set(item.styleAnswer,(styleCounts.get(item.styleAnswer)??0)+1);if(item.text)textCounts.set(item.text,(textCounts.get(item.text)??0)+1);}
    const valid=remaining.map((candidate,index)=>({candidate,index})).filter(({candidate})=>!previous||(candidate.text!==previous.text&&(!candidate.styleAnswer||candidate.styleAnswer!==previous.styleAnswer)&&(!beforePrevious||candidate.area!==previous.area||previous.area!==beforePrevious.area||candidate.cognitiveOperation!==previous.cognitiveOperation||previous.cognitiveOperation!==beforePrevious.cognitiveOperation)));
    const score=(item:LyrikTask)=>(item.styleAnswer?styleCounts.get(item.styleAnswer)??0:0)+(item.text?textCounts.get(item.text)??0:0);
    const candidateIndex=valid.sort((left,right)=>score(right.candidate)-score(left.candidate))[0]?.index??0;
    output.push(...remaining.splice(candidateIndex,1));
  }
  return output;
}
