import { certaintyClaims, signalPrompts, streetSituationCards, transferFields, type Certainty, type SignalKind, type SituationField } from "../data/chapter_01_content";

export type Chapter01Round = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export interface CompetencyEvent { competency: "text_structure" | "stage_direction" | "speaker_assignment" | "scene_orientation" | "situation_analysis" | "evidence_reasoning"; success: boolean; round: Chapter01Round; }
export interface Chapter01Session {
  round: Chapter01Round;
  signalStep: number;
  signalAnswers: string[];
  certaintyAssignments: Record<string, Certainty>;
  situationAssignments: Record<string, SituationField>;
  situationDraft: Record<string, SituationField>;
  situationChecked: boolean;
  evidenceLinked: boolean;
  transferAssignments: Record<string, string>;
  transferEvidence: Record<string, string | null>;
  completed: boolean;
  failedAttempts: number;
  competencyEvents: CompetencyEvent[];
  seenGlossaryIntroductions: string[];
  transferSelections: Record<string,string[]>;
  transferConfirmed: string[];
}

export const initialChapter01Session: Chapter01Session = { round:1,signalStep:0,signalAnswers:[],certaintyAssignments:{},situationAssignments:{},situationDraft:{},situationChecked:false,evidenceLinked:false,transferAssignments:{},transferEvidence:{},completed:false,failedAttempts:0,competencyEvents:[],seenGlossaryIntroductions:[],transferSelections:{},transferConfirmed:[] };

function record(session:Chapter01Session, competency:CompetencyEvent["competency"], success:boolean):Chapter01Session {
  return {...session,failedAttempts:session.failedAttempts+(success?0:1),competencyEvents:[...session.competencyEvents,{competency,success,round:session.round}]};
}

export function advanceChapter01(session:Chapter01Session):Chapter01Session {
  if(session.round===1)return {...session,round:2};
  if(session.round===4)return {...session,round:5};
  return session;
}

export function identifySignal(session:Chapter01Session,segmentId:string,kind:SignalKind):{session:Chapter01Session;valid:boolean} {
  const expected=signalPrompts[session.signalStep]?.kind; const valid=expected===kind;
  let next=record(session,kind==="speaker"?"speaker_assignment":kind==="stage_direction"?"stage_direction":"text_structure",valid);
  if(valid){const step=session.signalStep+1;next={...next,signalStep:step,signalAnswers:[...session.signalAnswers,segmentId],round:step===signalPrompts.length?3:2};}
  return {session:next,valid};
}

export function classifyClaim(session:Chapter01Session,id:string,target:Certainty):{session:Chapter01Session;valid:boolean} {
  const claim=certaintyClaims.find(item=>item.id===id);const valid=claim?.target===target;
  let next=record({...session,certaintyAssignments:valid?{...session.certaintyAssignments,[id]:target}:session.certaintyAssignments},"evidence_reasoning",valid);
  if(certaintyClaims.every(item=>next.certaintyAssignments[item.id]===item.target))next={...next,round:4};
  return {session:next,valid};
}

export function placeSituation(session:Chapter01Session,id:string,target:SituationField):{session:Chapter01Session;valid:boolean} {
  const card=streetSituationCards.find(item=>item.id===id);const valid=card?.target===target;
  let next=record({...session,situationAssignments:valid?{...session.situationAssignments,[id]:target}:session.situationAssignments},target==="place"||target==="characters"?"scene_orientation":"situation_analysis",valid);
  if(streetSituationCards.every(item=>next.situationAssignments[item.id]===item.target))next={...next,round:6};
  return {session:next,valid};
}

export function draftSituation(session:Chapter01Session,id:string,target:SituationField):Chapter01Session {
  if(!streetSituationCards.some(item=>item.id===id))return session;
  return {...session,situationDraft:{...session.situationDraft,[id]:target},situationChecked:false};
}

export function checkStreetSituation(session:Chapter01Session):{session:Chapter01Session;valid:boolean;problemFields:SituationField[]} {
  const problemFields=[...new Set(streetSituationCards.filter(item=>session.situationDraft[item.id]!==item.target).map(item=>item.target))];
  const valid=problemFields.length===0&&Object.keys(session.situationDraft).length===streetSituationCards.length;
  let next=record({...session,situationChecked:true},"situation_analysis",valid);
  if(valid)next={...next,situationAssignments:{...session.situationDraft},round:6};
  return{session:next,valid,problemFields};
}

export function linkSituationEvidence(session:Chapter01Session,textId:string,observation:string,situation:string):{session:Chapter01Session;valid:boolean} {
  const valid=textId==="c01_street_provocation_1"&&observation.startsWith("Sampson will")&&situation.startsWith("Die Figuren achten");
  let next=record({...session,evidenceLinked:valid||session.evidenceLinked},"evidence_reasoning",valid);if(valid)next={...next,round:7};return {session:next,valid};
}

export function setTransferField(session:Chapter01Session,id:string,answer:string,evidenceId:string|null):{session:Chapter01Session;valid:boolean} {
  const field=transferFields.find(item=>item.id===id);const valid=field?.answer===answer&&field.evidenceId===evidenceId;
  let next=record({...session,transferAssignments:valid?{...session.transferAssignments,[id]:answer}:session.transferAssignments,transferEvidence:valid?{...session.transferEvidence,[id]:evidenceId}:session.transferEvidence},field?.field==="place"||field?.field==="time"||field?.field==="characters"?"scene_orientation":"situation_analysis",valid);
  if(transferFields.every(item=>next.transferAssignments[item.id]===item.answer)){next={...next,completed:true};}
  return {session:next,valid};
}

export function toggleTransferStatement(session:Chapter01Session,field:SituationField,id:string):Chapter01Session{
 const current=session.transferSelections[field]??[];const values=current.includes(id)?current.filter(value=>value!==id):[...current,id];
 return{...session,transferSelections:{...session.transferSelections,[field]:values},transferConfirmed:session.transferConfirmed.filter(value=>value!==field)};
}

export function checkTransferAnalysis(session:Chapter01Session,groups:readonly {field:SituationField;options:readonly {id:string;correct:boolean}[]}[]):{session:Chapter01Session;valid:boolean;fieldResults:Record<string,"complete"|"incomplete"|"contains_wrong">}{
 const fieldResults:Record<string,"complete"|"incomplete"|"contains_wrong">={};const confirmed:string[]=[];
 for(const group of groups){const chosen=session.transferSelections[group.field]??[];const expected=group.options.filter(option=>option.correct).map(option=>option.id);const wrong=chosen.some(id=>!expected.includes(id));const missing=expected.some(id=>!chosen.includes(id));fieldResults[group.field]=wrong?"contains_wrong":missing?"incomplete":"complete";if(!wrong&&!missing)confirmed.push(group.field)}
 const valid=confirmed.length===groups.length;let next=record({...session,transferConfirmed:confirmed},"situation_analysis",valid);if(valid)next={...next,completed:true};return{session:next,valid,fieldResults};
}
