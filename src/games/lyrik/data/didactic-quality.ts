import type { CognitiveOperation,LyrikTask } from "./game";
import { poolExercises } from "./exercises/pools";
import { masterRoundTasks } from "./exercises/masterRound";
import { transferCases } from "./texts/transferCases";

const countBy=<T>(items:readonly T[],key:(item:T)=>string)=>Object.fromEntries([...new Set(items.map(key))].sort().map(value=>[value,items.filter(item=>key(item)===value).length]));
const share=(items:readonly {cognitiveOperation:CognitiveOperation}[],operations:readonly CognitiveOperation[])=>Number((items.filter(item=>operations.includes(item.cognitiveOperation)).length/Math.max(1,items.length)).toFixed(4));
const level3=poolExercises.filter(item=>item.level===3);
const level3Class=(task:{cognitiveOperation:CognitiveOperation;transferCaseId?:string})=>task.transferCaseId||["transfer","hypothesize","interpret"].includes(task.cognitiveOperation)?"A-echter-Transfer":["evidence","analyze","explainFunction","connect","evaluate"].includes(task.cognitiveOperation)?"B-Analyse-Vernetzung":["recognize","describe","compare"].includes(task.cognitiveOperation)?"C-erschwerte-Erkennung":"D-didaktisch-schwach";
const openTasks=poolExercises.filter(item=>item.mechanic==="free");

export const didacticQualityReport={
 generatedAt:"2026-09-06",
 scope:"Struktur- und Redaktionsaudit; Tests belegen Datenverträge, nicht automatisch didaktische Qualität.",
 totalTasks:poolExercises.length,
 byLevel:countBy(poolExercises,item=>String(item.level)),
 byCognitiveOperation:countBy(poolExercises,item=>item.cognitiveOperation),
 byDomain:countBy(poolExercises,item=>item.domain),
 operationsByLevel:Object.fromEntries([1,2,3].map(level=>[level,countBy(poolExercises.filter(item=>item.level===level),item=>item.cognitiveOperation)])),
 operationsByDomain:Object.fromEntries([...new Set(poolExercises.map(item=>item.domain))].map(domain=>[domain,countBy(poolExercises.filter(item=>item.domain===domain),item=>item.cognitiveOperation)])),
 level3Operations:countBy(level3,item=>item.cognitiveOperation),
 level3Audit:countBy(level3,level3Class),
 recognitionShare:share(poolExercises,["recognize"]),
 evidenceShare:share(poolExercises,["evidence"]),
 analysisShare:share(poolExercises,["analyze","explainFunction"]),
 connectionShare:share(poolExercises,["connect"]),
 evaluationShare:share(poolExercises,["evaluate"]),
 interpretationShare:share(poolExercises,["hypothesize","interpret"]),
 transferShare:share(poolExercises,["transfer"]),
 level3Shares:{recognition:share(level3,["recognize"]),evidence:share(level3,["evidence"]),analysis:share(level3,["analyze","explainFunction"]),connection:share(level3,["connect"]),evaluation:share(level3,["evaluate"]),interpretation:share(level3,["hypothesize","interpret"]),transfer:share(level3,["transfer"])},
 level3ContentChanges:level3.length,
 recognitionOnlyRemovedFromLevel3:level3.filter(item=>item.cognitiveOperation==="recognize").length===0?poolExercises.filter(item=>item.level===3&&!item.id.startsWith("style-analyze-")&&!item.transferCaseId).length:0,
 evidenceTasks:poolExercises.filter(item=>item.cognitiveOperation==="evidence").length,
 findingToFunctionTasks:poolExercises.filter(item=>["analyze","explainFunction","connect","interpret","transfer"].includes(item.cognitiveOperation)).length,
 connectionTasks:poolExercises.filter(item=>item.cognitiveOperation==="connect").length,
 hypothesisTasks:poolExercises.filter(item=>item.cognitiveOperation==="hypothesize").length,
 transferTasks:poolExercises.filter(item=>item.cognitiveOperation==="transfer").length,
 openResponse:{count:openTasks.length,allUseCriteria:openTasks.every(item=>(item.criteria?.length??0)>0),exactStringScoring:false},
 masterRoundStructure:{taskCount:masterRoundTasks.length,textCount:new Set(masterRoundTasks.map(item=>item.text)).size,cognitivePhases:countBy(masterRoundTasks,item=>item.cognitivePhase!),styleRecognitionTasks:masterRoundTasks.filter(item=>item.styleAnswer&&item.cognitiveOperation==="recognize").length},
 transferCaseStructure:{caseCount:transferCases.length,stepsPerCase:Object.fromEntries(transferCases.map(item=>[item.id,item.steps.length])),allStepsRelated:transferCases.every(item=>item.steps.every(step=>item.relevant.includes(step.area))),distinctFocuses:new Set(transferCases.map(item=>item.focus)).size},
} as const;

export function validateDidacticQuality(tasks:readonly LyrikTask[]=poolExercises.map(item=>({...item,kind:item.mechanic==="free"?"free":item.mechanic==="multi"?"multi":"choice"}))):string[]{
 const errors:string[]=[];
 for(const task of tasks){if(!task.cognitiveOperation)errors.push(`${task.id}: Denkoperation fehlt`);if(!task.level)errors.push(`${task.id}: Level fehlt`);if(!task.domain)errors.push(`${task.id}: Domain fehlt`);if(!task.feedback.trim())errors.push(`${task.id}: Feedback fehlt`);if(task.kind==="free"&&((task.criteria?.length??0)<3||!task.openResponse))errors.push(`${task.id}: offener Freitext ohne Kriteriencheck`);}
 if(level3.every(task=>task.cognitiveOperation==="recognize"))errors.push("Level 3 besteht ausschließlich aus Erkennung");
 if(masterRoundTasks.length!==12)errors.push("Meisterrunde hat nicht 12 Aufgaben");
 for(const phase of ["observe","analyze","evidence","connect","interpret","transfer"])if(!masterRoundTasks.some(task=>task.cognitivePhase===phase))errors.push(`Meisterrunde ohne Phase ${phase}`);
 if(masterRoundTasks.filter(task=>task.styleAnswer&&task.cognitiveOperation==="recognize").length>2)errors.push("Meisterrunde enthält zu viele reine Stilmittelabfragen");
 return errors;
}
