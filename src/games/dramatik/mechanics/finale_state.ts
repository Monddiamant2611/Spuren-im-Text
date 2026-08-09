import type { GameState } from "../../../core/state/types";
import type { StagingDecision } from "../data/staging";
import { refinedHypothesis, interpretationHypothesis } from "../data/chapter_05/hypothesis";
import { aggregateVisibleCompetencies } from "./competency_aggregation";
const required=["chapter_01","chapter_02","chapter_03","chapter_04","chapter_05"];
export function isFinaleAvailable(state:Pick<GameState,"completedChapters"|"theatreState">){return required.every(id=>state.completedChapters.includes(id))&&["AFTER_CHAPTER_5","FINALE_READY","PERFORMANCE_RUNNING","PERFORMANCE_COMPLETE"].includes(state.theatreState)}
export function resolveFinalStaging(state:Pick<GameState,"stagingDecisions">){const base={...((state.stagingDecisions.chapter_04??{}) as Record<string,StagingDecision>)};const revision=state.stagingDecisions.chapter_05_revision as StagingDecision|undefined;if(revision)base[revision.id]={...revision};return base}
export function resolveFinalHypothesis(state:Pick<GameState,"decisions">){return (state.decisions.chapter_05 as {hypothesisRefined?:boolean}|undefined)?.hypothesisRefined?refinedHypothesis:interpretationHypothesis.text}
export function createFinaleSnapshot(state:GameState){const competencies=aggregateVisibleCompetencies(state);return{finalStaging:resolveFinalStaging(state),finalHypothesis:resolveFinalHypothesis(state),visibleCompetencyResults:Object.fromEntries(Object.entries(competencies).map(([id,value])=>[id,{level:value.level,feedback:value.feedback}]))}}
