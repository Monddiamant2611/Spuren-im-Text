import {describe,it,expect} from "vitest";
import {mkdirSync,writeFileSync} from "node:fs";
import {tasks as allTasks,knowledgeCards} from "../src/games/lyrik/data/game";
import {tasksForRelease,guidedForRelease} from "../src/games/lyrik/data/releasePolicy";
import {curriculum} from "../src/games/lyrik/data/curriculum";

const meta=/\b(?:kontextabhängig|textimmanent|funktional(?:e|en|er|es)?|Deutungsrichtung|Bedeutungsdimension|strukturell(?:e|en|er|es)?|positionsbezogen(?:e|en|er|es)?|satzbaubezogen(?:e|en|er|es)?|Wahrnehmungsverschiebung|semantische Verdichtung|biografische Zuschreibung|interpretative Reichweite|textbezogene Plausibilisierung)\b/gi;
const nominal=/\b\w+(?:ung|keit|heit|tion|isierung)\b/gi;
const passive=/\b(?:wird|werden|wurde|wurden)\s+(?:\w+\s+){0,3}\w+(?:t|en)\b/gi;
const sentences=(value:string)=>value.split(/(?<=[.!?])\s+|\n+/).map(part=>part.trim()).filter(Boolean);

describe("sprachlicher Warnlisten-Audit",()=>{
 it("markiert Schülertexte, ohne sie automatisch zu verändern",()=>{
  const fields:{id:string;section:string;field:string;text:string}[]=[];
  const add=(id:string,section:string,field:string,text:string|undefined)=>{if(text?.trim())fields.push({id,section,field,text});};
  for(const task of tasksForRelease(allTasks,"student")){
   add(task.id,"task","title",task.title);add(task.id,"task","prompt",task.prompt);add(task.id,"task","feedback",task.feedback);add(task.id,"task","sample",task.sample);
   task.options?.forEach((text,index)=>add(task.id,"task",`option-${index+1}`,text));
   task.criteria?.forEach((text,index)=>add(task.id,"task",`criterion-${index+1}`,text));
  }
  guidedForRelease("student").flat().forEach(step=>{add(step.id,"guided","title",step.title);add(step.id,"guided","instruction",step.instruction);add(step.id,"guided","feedback",step.feedback);add(step.id,"guided","solution",step.solution);step.options?.forEach((option,index)=>add(step.id,"guided",`option-${index+1}`,option.label));step.criteria?.forEach((text,index)=>add(step.id,"guided",`criterion-${index+1}`,text));});
  for(const card of knowledgeCards)for(const field of ["term","definition","recognition","pitfall","analysisHint"] as const)add(card.id,"card",field,card[field]);
  for(const chapter of curriculum){add(String(chapter.number),"chapter","title",chapter.title);chapter.goals.forEach((goal,index)=>add(String(chapter.number),"chapter",`goal-${index+1}`,goal));}
  const rows=fields.map(item=>{const words=item.text.match(/[\p{L}\p{N}]+/gu)??[],longSentences=sentences(item.text).filter(sentence=>(sentence.match(/[\p{L}\p{N}]+/gu)??[]).length>25);return {...item,warnings:{longSentences,averageWordLength:words.length>=6?Number((words.reduce((sum,word)=>sum+word.length,0)/words.length).toFixed(1)):0,nominal:item.field==="term"?[]:[...item.text.matchAll(nominal)].map(match=>match[0]),passive:[...item.text.matchAll(passive)].map(match=>match[0]),meta:[...item.text.matchAll(meta)].map(match=>match[0]),nested:(item.text.match(/\b(?:dass|weil|obwohl|während|indem|welche[rsnm]?|dessen|deren)\b/gi)??[]).length>2}}});
  const directory=new URL("../artifacts/",import.meta.url);mkdirSync(directory,{recursive:true});writeFileSync(new URL("lyrik-language-warnings.json",directory),JSON.stringify({fieldCount:rows.length,warningRows:rows.filter(row=>row.warnings.longSentences.length||row.warnings.averageWordLength>8||row.warnings.nominal.length>=2||row.warnings.passive.length||row.warnings.meta.length||row.warnings.nested)},null,2));
  expect(fields.length).toBeGreaterThan(1000);
 });
});
