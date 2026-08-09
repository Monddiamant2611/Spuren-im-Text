export interface OriginalStageDirection { id: string; primarySourceId: string; exactText: string; kind: "original_stage_direction"; }
export type StagingDimension = "character_position" | "distance" | "facing" | "movement" | "lighting" | "pause" | "speech_attitude";
export interface StagingDecision { id: string; dimension: StagingDimension; characterId:string; value: string; evidenceIds: string[]; reasoningId:string; kind: "optional_staging_choice"; }
export interface FixedStageDirection { id:string; exactText:string; fixed:true; kind:"fixed_stage_direction"; sourceReference:string; }
