import { poolExercises } from "./exercises/pools";
import { styleDevices } from "./knowledge/styleDevices";
import { microTexts } from "./texts/microTexts";

const normalize=(value:string)=>value.toLocaleLowerCase("de-DE").replace(/[„“‚‘'".,!?;:()—–-]/g," ").replace(/\d+/g,"#").replace(/\s+/g," ").trim();
const skeleton=(value:string)=>normalize(value).replace(/\b(?:der|die|das|ein|eine|einer|einem|einen|und|oder|im|in|am|an|auf|zu|mit|von|für|durch|aus|den|dem|des)\b/g,"_").replace(/\s+/g," ");
const frequencies=(values:readonly string[])=>Object.entries(values.reduce<Record<string,number>>((all,value)=>({...all,[value]:(all[value]??0)+1}),{})).sort((a,b)=>b[1]-a[1]);
const pairs=(values:readonly {id:string;value:string}[])=>{const groups=new Map<string,string[]>();for(const item of values){const key=skeleton(item.value);groups.set(key,[...(groups.get(key)??[]),item.id]);}return [...groups.entries()].filter(([,ids])=>ids.length>1).map(([signature,ids])=>({signature,ids}));};
const motifTerms=["Nacht","Stern","Wind","Herz","Sehnsucht","Ferne","Stille","Arbeit","Technik","Stadt","Kind","Krieg","Sprache","Umwelt","Alter","Alltag"];
export const contentQualityReport={
 reviewedExercises:poolExercises.length,
 exactDuplicateTaskBodies:frequencies(poolExercises.map(item=>`${item.title}|${item.prompt}|${item.text}|${item.correct?.join("|")??item.sample??""}`)).filter(([,count])=>count>1),
 strongPromptSimilarities:pairs(poolExercises.map(item=>({id:item.id,value:item.prompt}))),
 frequentPromptStarts:frequencies(poolExercises.map(item=>normalize(item.prompt).split(" ").slice(0,4).join(" "))).slice(0,12),
 frequentSolutions:frequencies(poolExercises.flatMap(item=>item.correct??[]).map(normalize)).slice(0,12),
 frequentDistractors:frequencies(poolExercises.flatMap(item=>(item.options??[]).filter(option=>!item.correct?.includes(option))).map(normalize)).slice(0,12),
 themes:frequencies(microTexts.flatMap(item=>item.tags.slice(0,1))),
 motifs:Object.fromEntries(motifTerms.map(term=>[term,microTexts.filter(item=>item.text.toLocaleLowerCase("de-DE").includes(term.toLocaleLowerCase("de-DE"))).length])),
 levelDistribution:frequencies(poolExercises.map(item=>String(item.level))),
 mechanicDistribution:frequencies(poolExercises.map(item=>item.mechanic)),
 areaDistribution:frequencies(poolExercises.map(item=>item.area)),
 identicalAnalysisHints:frequencies(styleDevices.map(item=>normalize(item.analysisHint))).filter(([,count])=>count>1),
 possibleMultiAnswerItems:poolExercises.filter(item=>item.mechanic!=="free"&&(item.correct?.length??0)>1).map(item=>item.id),
 editoriallyRewrittenTexts:microTexts.filter(item=>item.tags.includes("redaktionell geprüft")).length,
};
