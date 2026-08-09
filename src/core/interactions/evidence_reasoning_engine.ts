export interface ReasoningStep { observationId: string; evidenceId: string; interpretationId: string; }
export interface ReasoningRule extends ReasoningStep { id: string; }
export type HypothesisRelation = "supports" | "qualifies" | "contradicts" | "irrelevant";
export interface InterpretationReasoningStep { observationId:string; evidenceId:string; explanationId:string; hypothesisRelation:HypothesisRelation; }
export interface InterpretationReasoningRule extends InterpretationReasoningStep { id:string; }

export class GenericEvidenceReasoningEngine {
  constructor(private readonly rules: readonly ReasoningRule[],private readonly interpretationRules:readonly InterpretationReasoningRule[]=[]) {}
  evaluate(input: ReasoningStep) { const rule=this.rules.find((item)=>item.observationId===input.observationId); const valid=Boolean(rule&&rule.evidenceId===input.evidenceId&&rule.interpretationId===input.interpretationId); return {valid,value:input,feedbackKey:valid?"correct":"reasoning_incomplete"}; }
  evaluateInterpretation(input:InterpretationReasoningStep){const rule=this.interpretationRules.find(item=>item.observationId===input.observationId);const valid=Boolean(rule&&rule.evidenceId===input.evidenceId&&rule.explanationId===input.explanationId&&rule.hypothesisRelation===input.hypothesisRelation);return{valid,value:input,feedbackKey:valid?"interpretation_supported":"interpretation_incomplete"}}
  reset() { return; }
}
