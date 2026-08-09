export interface OriginalStageDirection { id: string; primarySourceId: string; exactText: string; kind: "original_stage_direction"; }
export type StagingDimension = "character_position" | "distance" | "facing" | "movement" | "lighting" | "pause" | "speech_attitude";
export type StagingQuality = "supported" | "qualified" | "problematic";
export interface StagingReasoningOption { id:string; label:string; }
export interface StagingCombination { value:string; reasoningId:string; quality:StagingQuality; feedback:string; }
export interface StagingOptionRule { id:string; type:StagingDimension; character_id:string; allowed_values:readonly string[]; fixed:false; source_reference:string; reasoning_options:readonly StagingReasoningOption[]; combinations:readonly StagingCombination[]; competencies:readonly string[]; feedback:string; }
export interface StagingDecision { id: string; dimension: StagingDimension; characterId:string; value: string; evidenceIds: string[]; reasoningId:string; quality?:Exclude<StagingQuality,"problematic">; kind: "optional_staging_choice"; }
export interface FixedStageDirection { id:string; exactText:string; fixed:true; kind:"fixed_stage_direction"; sourceReference:string; }
