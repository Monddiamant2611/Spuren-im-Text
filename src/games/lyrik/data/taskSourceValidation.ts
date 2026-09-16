import type {LyrikTask} from "./game";
import {canonicalPoems} from "./texts/canonicalPoems";

const normalize=(value:string)=>value.toLocaleLowerCase("de-DE").normalize("NFKC").replace(/[’‘`´]/g,"'").replace(/[^\p{L}\p{N}]+/gu," ").trim();

export type TaskSourceAudit={taskId:string;sourceWorkId:string|null;renderedWorkId:string|null;sourceMatch:boolean;promptMatch:boolean;evidenceMatch:boolean;solutionMatch:boolean;feedbackMatch:boolean;status:"valid"|"invalidSourceMismatch"|"pendingEditorialReview"};

export function auditTaskSource(task:LyrikTask):TaskSourceAudit{
 if(task.sourceType!=="authentic")return{taskId:task.id,sourceWorkId:null,renderedWorkId:null,sourceMatch:true,promptMatch:true,evidenceMatch:true,solutionMatch:true,feedbackMatch:true,status:"valid"};
 if(!task.source||task.sourceWorkIds?.length)return{taskId:task.id,sourceWorkId:task.source?.workId??null,renderedWorkId:null,sourceMatch:false,promptMatch:false,evidenceMatch:false,solutionMatch:false,feedbackMatch:false,status:task.taskValidationStatus??"pendingEditorialReview"};
 const poem=canonicalPoems.find(item=>item.id===task.source!.workId);
 const lines=String(poem?.canonicalText??"").split("\n").filter(Boolean);
 const canonicalExcerpt=lines.slice(task.source.verseStart-1,task.source.verseEnd).join("\n");
 const sourceMatch=!!poem&&task.source.versionId===`${poem.id}:canonical`&&normalize(task.source.canonicalExcerpt)===normalize(canonicalExcerpt)&&normalize(task.text??"").includes(normalize(canonicalExcerpt));
 const renderedWorkId=canonicalPoems.find(item=>normalize(task.text??"").startsWith(normalize(`${item.title} ${item.author}`)))?.id??null;
 const foreignWorks=canonicalPoems.filter(item=>item.id!==poem?.id&&[item.title,item.author].some(name=>name.length>5&&normalize(task.prompt).includes(normalize(name))));
 const promptMatch=sourceMatch&&foreignWorks.length===0;
 const evidenceMatch=(task.options??[]).every((option,index)=>task.optionTypes?.[index]!=="textEvidence"||[...option.matchAll(/„([^“]+)“/g)].every(match=>normalize(canonicalExcerpt).includes(normalize(match[1]))));
 const solutionMatch=sourceMatch&&foreignWorks.length===0;
 const feedbackMatch=sourceMatch&&foreignWorks.length===0;
 const valid=task.taskValidationStatus==="valid"&&sourceMatch&&renderedWorkId===task.source.workId&&promptMatch&&evidenceMatch&&solutionMatch&&feedbackMatch;
 return{taskId:task.id,sourceWorkId:task.source.workId,renderedWorkId,sourceMatch:sourceMatch&&renderedWorkId===task.source.workId,promptMatch,evidenceMatch,solutionMatch,feedbackMatch,status:valid?"valid":task.taskValidationStatus==="pendingEditorialReview"?"pendingEditorialReview":"invalidSourceMismatch"};
}
