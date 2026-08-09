import type { InteractionEngine, InteractionResult } from "../../../core/interactions/contracts";
import type { FixedStageDirection, StagingDecision } from "../data/staging";
export type StagingEngine = InteractionEngine<StagingDecision, StagingDecision>;
export class BasicStagingEngine implements StagingEngine {
  private decisions:Record<string,StagingDecision>={};
  constructor(private readonly fixedDirections:readonly FixedStageDirection[]=[]){ }
  evaluate(input: StagingDecision): InteractionResult<StagingDecision> { const valid=input.evidenceIds.length>0&&Boolean(input.reasoningId)&&input.kind==="optional_staging_choice";if(valid)this.decisions[input.id]={...input,evidenceIds:[...input.evidenceIds]};return { valid, value: input,feedbackKey:valid?"staging_supported":"staging_needs_evidence" }; }
  getDecisions(){return structuredClone(this.decisions)}
  getFixedDirections(){return this.fixedDirections.map((item)=>({...item}))}
  restore(decisions:Readonly<Record<string,StagingDecision>>){this.decisions=structuredClone(decisions)}
  reset(): void { this.decisions={}; }
}
