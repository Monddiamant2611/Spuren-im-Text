import type { GameState } from "../../../core/state/types";
import { transferRefined, transferHypotheses } from "../data/chapter_05_content";
import { refinedHypothesis as legacyRefinedHypothesis } from "../data/chapter_05/hypothesis";
import { aggregateVisibleCompetencies } from "./competency_aggregation";
const required=["chapter_01","chapter_02","chapter_03","chapter_04","chapter_05"];
export function isFinaleAvailable(state:Pick<GameState,"completedChapters"|"theatreState">){return required.every(id=>state.completedChapters.includes(id))&&["AFTER_CHAPTER_5","FINALE_READY","PERFORMANCE_RUNNING","PERFORMANCE_COMPLETE"].includes(state.theatreState)}
export function resolveFinalHypothesis(state:Pick<GameState,"decisions">){const chapter=(state.decisions.chapter_05 as {transferRevision?:string;transferHypothesis?:string;hypothesisRefined?:boolean}|undefined);return chapter?.transferRevision??chapter?.transferHypothesis??(chapter?.hypothesisRefined?legacyRefinedHypothesis:undefined)??transferHypotheses.find(item=>item.quality==="supported")?.text??transferRefined}
export function createFinaleSnapshot(state:GameState){const competencies=aggregateVisibleCompetencies(state);return{finalHypothesis:resolveFinalHypothesis(state),visibleCompetencyResults:Object.fromEntries(Object.entries(competencies).map(([id,value])=>[id,{level:value.level,feedback:value.feedback}]))}}
