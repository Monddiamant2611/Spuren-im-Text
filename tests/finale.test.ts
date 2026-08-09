import { describe, expect, it } from "vitest";
import { initialGameState, type GameState } from "../src/core/state/types";
import { loadGameState, saveGameState } from "../src/core/state/store";
import { isChapterUnlocked } from "../src/core/progress/progress";
import { generalRehearsalSource, fixedStageDirections } from "../src/games/dramatik/data/chapter_04/scene_source";
import { refinedHypothesis } from "../src/games/dramatik/data/chapter_05/hypothesis";
import { performanceSequence } from "../src/games/dramatik/data/finale/performance";
import { aggregateVisibleCompetencies, visibleCompetencies } from "../src/games/dramatik/mechanics/competency_aggregation";
import { createFinaleSnapshot, isFinaleAvailable, resolveFinalStaging } from "../src/games/dramatik/mechanics/finale_state";

const completed = ["chapter_01", "chapter_02", "chapter_03", "chapter_04", "chapter_05"];
const baseDecision = { id: "figure_distance", dimension: "distance", characterId: "both", value: "große Distanz", evidenceIds: ["c04_romeo_warning"], reasoningId: "distance", kind: "optional_staging_choice" } as const;
const revision = { ...baseDecision, value: "mittlere Distanz" };
const ready = (): GameState => ({ ...structuredClone(initialGameState), currentGame: "dramatik", currentChapter: "finale", completedChapters: completed, theatreState: "AFTER_CHAPTER_5", decisions: { chapter_05: { hypothesisRefined: true } }, stagingDecisions: { chapter_04: { figure_distance: baseDecision }, chapter_05_revision: revision }, competencies: { evidence_reasoning: { value: 5, level: "secure" }, staging_reasoning: { value: 4, level: "secure" } } });

describe("finale", () => {
  it("remains locked until chapter 5 is complete", () => { expect(isChapterUnlocked("finale", completed.slice(0, -1))).toBe(false); expect(isFinaleAvailable({ completedChapters: completed.slice(0, -1), theatreState: "AFTER_CHAPTER_4" })).toBe(false); });
  it("unlocks after every chapter and AFTER_CHAPTER_5", () => expect(isFinaleAvailable(ready())).toBe(true));
  it("uses only references to existing protected source records", () => expect(performanceSequence.every((step) => generalRehearsalSource.some((source) => source.id === step.sourceId))).toBe(true));
  it("does not duplicate primary text in performance data", () => { expect(performanceSequence.every((step) => !("text" in step))).toBe(true); expect(JSON.stringify(performanceSequence)).not.toContain("primary_source"); });
  it("loads chapter-4 staging", () => expect(resolveFinalStaging(ready()).figure_distance).toBeDefined());
  it("gives the chapter-5 revision precedence", () => expect(resolveFinalStaging(ready()).figure_distance.value).toBe("mittlere Distanz"));
  it("keeps fixed stage directions immutable", () => expect(fixedStageDirections.every((item) => item.editable === false && item.source_verified === true)).toBe(true));
  it("does not mutate competency events while producing the performance snapshot", () => { const state = ready(); const before = structuredClone(state.competencies); createFinaleSnapshot(state); expect(state.competencies).toEqual(before); });
  it("aggregates competencies deterministically", () => { const state = ready(); expect(aggregateVisibleCompetencies(state)).toEqual(aggregateVisibleCompetencies(state)); });
  it("does not use failed attempts to permanently lower a later result", () => { const state = ready(); state.failedAttempts = { chapter_04: 99 }; expect(aggregateVisibleCompetencies(state).evidence.level).toBe("advanced"); });
  it("never exposes percentages", () => expect(JSON.stringify(aggregateVisibleCompetencies(ready()))).not.toContain("%"));
  it("bundles internal values into exactly seven visible areas", () => expect(visibleCompetencies).toHaveLength(7));
  it("stores the refined hypothesis in the final snapshot", () => expect(createFinaleSnapshot(ready()).finalHypothesis).toBe(refinedHypothesis));
  it("stores final staging in a readable snapshot", () => expect(createFinaleSnapshot(ready()).finalStaging.figure_distance.value).toBe("mittlere Distanz"));
  it("persists and restores completed finale state", () => { const memory = new Map<string, string>(); const storage = { getItem: (key: string) => memory.get(key) ?? null, setItem: (key: string, value: string) => memory.set(key, value) }; saveGameState({ ...ready(), finaleStarted: true, finaleCompleted: true, gameCompleted: true, performanceState: "PERFORMANCE_COMPLETE", theatreState: "PERFORMANCE_COMPLETE" }, storage); expect(loadGameState(storage)).toMatchObject({ finaleCompleted: true, gameCompleted: true, performanceState: "PERFORMANCE_COMPLETE" }); });
});
