import type { InteractionEngine, InteractionResult } from "../../../core/interactions/contracts";
import type { FixedStageDirection, StagingDecision, StagingOptionRule } from "../data/staging";
export type StagingEngine = InteractionEngine<StagingDecision, StagingDecision>;
export class BasicStagingEngine implements StagingEngine {
  private decisions:Record<string,StagingDecision>={};
  constructor(private readonly fixedDirections:readonly FixedStageDirection[]=[],private readonly rules:readonly StagingOptionRule[]=[]){ }
  evaluate(input: StagingDecision): InteractionResult<StagingDecision> { const rule=this.rules.find((item)=>item.id===input.id);const combination=rule?.combinations.find((item)=>item.value===input.value&&item.reasoningId===input.reasoningId);const structurallyValid=input.evidenceIds.length>0&&Boolean(input.reasoningId)&&input.kind==="optional_staging_choice";const valid=structurallyValid&&(!rule||Boolean(combination&&combination.quality!=="problematic"));if(valid)this.decisions[input.id]={...input,quality:combination?.quality==="qualified"?"qualified":"supported",evidenceIds:[...input.evidenceIds]};return { valid, value: input,feedbackKey:!structurallyValid?"staging_needs_evidence":combination?.quality==="problematic"?"staging_text_conflict":combination?.quality==="qualified"?"staging_qualified":"staging_supported" }; }
  getDecisions(){return structuredClone(this.decisions)}
  getFixedDirections(){return this.fixedDirections.map((item)=>({...item}))}
  restore(decisions:Readonly<Record<string,StagingDecision>>){this.decisions=structuredClone(decisions)}
  reset(): void { this.decisions={}; }
}
