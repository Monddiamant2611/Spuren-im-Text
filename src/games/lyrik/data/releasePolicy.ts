import type {LyrikTask} from "./game";
import {guidedChapters,type GuidedStep} from "./guidedAnalysis";
import {canonicalPoems,type CanonicalPoem} from "./texts/canonicalPoems";
import {auditTaskSource} from "./taskSourceValidation";

export type ReleaseMode="editorial"|"student";
export type ReleaseGuidedStep=GuidedStep&{sourceWorkIds:readonly string[];requiresTextVerified:boolean;requiresFormalVerified:boolean};
export const releaseMode:ReleaseMode="student";
const canonical=(poem:CanonicalPoem)=>typeof poem.canonicalText==="string"?poem.canonicalText:null;

export function isStudentContentAllowed(content:CanonicalPoem|LyrikTask|ReleaseGuidedStep):boolean{
 if("textVerificationStatus" in content)return content.textVerificationStatus==="verified"&&content.contentTaskAllowed===true&&content.publicReleaseAllowed===true&&!!canonical(content);
 if("requiresFormalVerified" in content)return content.sourceWorkIds.every(id=>{const poem=canonicalPoems.find(item=>item.id===id);return !!poem&&isStudentContentAllowed(poem)&&(!content.requiresFormalVerified||poem.formalTaskAllowed===true);});
 return content.verificationStatus!=="blockedPendingVerification"&&content.approvedForTraining!==false&&(content.sourceType!=="authentic"||auditTaskSource(content).status==="valid");
}

export const studentReleasePoems=canonicalPoems.filter(isStudentContentAllowed);
export const studentGuidedChapters:readonly (readonly ReleaseGuidedStep[])[]=guidedChapters.map((steps,chapterIndex)=>steps
 .map(step=>({...step,sourceWorkIds:[step.material.poemId],requiresTextVerified:true,requiresFormalVerified:chapterIndex===2||chapterIndex===5}))
 .filter(isStudentContentAllowed));
export const tasksForRelease=(tasks:readonly LyrikTask[],mode:ReleaseMode):readonly LyrikTask[]=>mode==="editorial"?tasks:tasks.filter(isStudentContentAllowed);
export const poemsForRelease=(mode:ReleaseMode):readonly CanonicalPoem[]=>mode==="editorial"?canonicalPoems:studentReleasePoems;
export const guidedForRelease=(mode:ReleaseMode):readonly (readonly ReleaseGuidedStep[])[]=>mode==="editorial"?guidedChapters.map(chapter=>chapter.map(step=>({...step,sourceWorkIds:[step.material.poemId],requiresTextVerified:true,requiresFormalVerified:false}))):studentGuidedChapters;
