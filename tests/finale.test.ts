import { describe, expect, it } from "vitest";
import { initialGameState, type GameState } from "../src/core/state/types";
import { loadGameState, saveGameState } from "../src/core/state/store";
import { isChapterUnlocked } from "../src/core/progress/progress";
import { generalRehearsalSource, fixedStageDirections } from "../src/games/dramatik/data/chapter_04/scene_source";
import { refinedHypothesis } from "../src/games/dramatik/data/chapter_05/hypothesis";
import { performanceSequence } from "../src/games/dramatik/data/finale/performance";
import { aggregateVisibleCompetencies, visibleCompetencies } from "../src/games/dramatik/mechanics/competency_aggregation";
import { createFinaleSnapshot, isActualStagingRevision, isFinaleAvailable, resolveFinalStaging } from "../src/games/dramatik/mechanics/finale_state";
import { performancePauseMs } from "../src/games/dramatik/scenes/Finale";

const completed = ["chapter_01", "chapter_02", "chapter_03", "chapter_04", "chapter_05"];
const baseDecision = { id: "figure_distance", dimension: "distance", characterId: "both", value: "große Distanz", evidenceIds: ["c04_romeo_warning"], reasoningId: "distance_avoidance", kind: "optional_staging_choice" } as const;
const revision = { ...baseDecision, value: "mittlere Distanz", reasoningId: "distance_pressure" };
const ready = (): GameState => ({ ...structuredClone(initialGameState), currentGame: "dramatik", currentChapter: "finale", completedChapters: completed, theatreState: "AFTER_CHAPTER_5", decisions: { chapter_05: { hypothesisRefined: true } }, stagingDecisions: { chapter_04: { figure_distance: baseDecision }, chapter_05_revision: revision }, competencies: { evidence_reasoning: { value: 5, level: "secure" }, staging_reasoning: { value: 4, level: "secure" } } });

describe("finale", () => {
  it("remains locked until chapter 5 is complete", () => { expect(isChapterUnlocked("finale", completed.slice(0, -1))).toBe(false); expect(isFinaleAvailable({ completedChapters: completed.slice(0, -1), theatreState: "AFTER_CHAPTER_4" })).toBe(false); });
  it("unlocks after every chapter and AFTER_CHAPTER_5", () => expect(isFinaleAvailable(ready())).toBe(true));
  it("uses only references to existing protected source records", () => expect(performanceSequence.every((step) => generalRehearsalSource.some((source) => source.id === step.sourceId))).toBe(true));
  it("does not duplicate primary text in performance data", () => { expect(performanceSequence.every((step) => !("text" in step))).toBe(true); expect(JSON.stringify(performanceSequence)).not.toContain("primary_source"); });
  it("loads chapter-4 staging", () => expect(resolveFinalStaging(ready()).figure_distance).toBeDefined());
  it("gives the chapter-5 revision precedence", () => expect(resolveFinalStaging(ready()).figure_distance.value).toBe("mittlere Distanz"));
  it("ignores an unchanged chapter-5 value in the finale and book revision status", () => { const state=ready();state.stagingDecisions.chapter_05_revision={...baseDecision};expect(isActualStagingRevision(state)).toBe(false);expect(resolveFinalStaging(state).figure_distance.value).toBe("große Distanz"); });
  it("keeps fixed stage directions immutable", () => expect(fixedStageDirections.every((item) => item.editable === false && item.source_verified === true)).toBe(true));
  it("does not mutate competency events while producing the performance snapshot", () => { const state = ready(); const before = structuredClone(state.competencies); createFinaleSnapshot(state); expect(state.competencies).toEqual(before); });
  it("aggregates competencies deterministically", () => { const state = ready(); expect(aggregateVisibleCompetencies(state)).toEqual(aggregateVisibleCompetencies(state)); });
  it("normalizes micro-event counts instead of rewarding unlimited raw task volume", () => { const ordinary=ready();ordinary.competencies.evidence_reasoning={value:5,level:"advanced"};const repeated=ready();repeated.competencies.evidence_reasoning={value:500,level:"advanced"};expect(aggregateVisibleCompetencies(repeated).evidence).toEqual(aggregateVisibleCompetencies(ordinary).evidence); });
  it("does not use failed attempts to permanently lower a later result", () => { const state = ready(); state.failedAttempts = { chapter_04: 99 }; expect(aggregateVisibleCompetencies(state).evidence.level).toBe("advanced"); });
  it("never exposes percentages", () => expect(JSON.stringify(aggregateVisibleCompetencies(ready()))).not.toContain("%"));
  it("bundles internal values into exactly seven visible areas", () => expect(visibleCompetencies).toHaveLength(7));
  it("stores the refined hypothesis in the final snapshot", () => expect(createFinaleSnapshot(ready()).finalHypothesis).toBe(refinedHypothesis));
  it("stores final staging in a readable snapshot", () => expect(createFinaleSnapshot(ready()).finalStaging.figure_distance.value).toBe("mittlere Distanz"));
  it("persists and restores completed finale state", () => { const memory = new Map<string, string>(); const storage = { getItem: (key: string) => memory.get(key) ?? null, setItem: (key: string, value: string) => memory.set(key, value) }; saveGameState({ ...ready(), finaleStarted: true, finaleCompleted: true, gameCompleted: true, performanceState: "PERFORMANCE_COMPLETE", theatreState: "PERFORMANCE_COMPLETE" }, storage); expect(loadGameState(storage)).toMatchObject({ finaleCompleted: true, gameCompleted: true, performanceState: "PERFORMANCE_COMPLETE" }); });
  it("persists the current performance moment and safely defaults older saves", () => { const memory=new Map<string,string>();const storage={getItem:(key:string)=>memory.get(key)??null,setItem:(key:string,value:string)=>memory.set(key,value)};saveGameState({...ready(),currentPerformanceMoment:4},storage);expect(loadGameState(storage).currentPerformanceMoment).toBe(4);const old={...ready()} as Partial<GameState>;delete old.currentPerformanceMoment;memory.set("lernwerkstatt-games:state:v1",JSON.stringify(old));expect(loadGameState(storage).currentPerformanceMoment).toBe(0); });
  it("maps staging pauses to distinct deterministic delays",()=>{expect(performancePauseMs("unmittelbar sprechen")).toBe(0);expect(performancePauseMs("kurze Pause")).toBeGreaterThan(0);expect(performancePauseMs("längere spannungssteigernde Pause")).toBeGreaterThan(performancePauseMs("kurze Pause"));});
});
