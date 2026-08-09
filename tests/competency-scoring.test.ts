import { describe, expect, it } from "vitest";
import { mergeMeasuredCompetencies, scoreCompetencyEvents } from "../src/core/progress/competency";
import { initialGameState } from "../src/core/state/types";
import { aggregateVisibleCompetencies } from "../src/games/dramatik/mechanics/competency_aggregation";

describe("measured competency scoring", () => {
  it("does not award an unmeasured competency", () => {
    const result = mergeMeasuredCompetencies({}, [{ competency:"text_structure",success:true }], ["text_structure","motivation"]);
    expect(result.text_structure).toBeDefined();
    expect(result.motivation).toBeUndefined();
  });

  it("does not reward task count when learning quality is equivalent", () => {
    expect(scoreCompetencyEvents([{competency:"x",success:true}])).toBe(scoreCompetencyEvents(Array.from({length:12},()=>({competency:"x",success:true}))));
  });

  it("lets a later successful correction outweigh an early failure", () => {
    const corrected=scoreCompetencyEvents([{competency:"x",success:false},{competency:"x",success:true}])!;
    const unresolved=scoreCompetencyEvents([{competency:"x",success:true},{competency:"x",success:false}])!;
    expect(corrected).toBeGreaterThan(unresolved);
    expect(corrected).toBeGreaterThanOrEqual(3.5);
  });

  it("is deterministic and keeps the visible book free of percentages", () => {
    const competencies=mergeMeasuredCompetencies({},[{competency:"evidence_reasoning",success:false},{competency:"evidence_reasoning",success:true}],["evidence_reasoning"]);
    const state={...initialGameState,competencies};
    expect(aggregateVisibleCompetencies(state)).toEqual(aggregateVisibleCompetencies(state));
    expect(JSON.stringify(aggregateVisibleCompetencies(state))).not.toContain("%");
  });
});
