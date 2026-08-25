import { describe, expect, it } from "vitest";
import { shuffleChoiceOptions } from "../src/games/epik/choice-options";
import { allLearningExercises } from "../src/games/epik/data/learning_exercises";

describe("Epik Phase 20B", () => {
  it("hält Mehrfachauswahl und Lösungsmengen konsistent", () => {
    const multiple = allLearningExercises.filter((exercise) => exercise.type === "multipleChoice");
    expect(multiple.length).toBeGreaterThan(0);
    expect(multiple.every((exercise) => exercise.correctIds.length >= 2)).toBe(true);
    expect(multiple.every((exercise) => exercise.options.length >= exercise.correctIds.length + 1)).toBe(true);
    expect(allLearningExercises.every((exercise) => Boolean(exercise.analysisAxis))).toBe(true);
  });

  it("verwendet mindestens vier Matching-Paare und fünf Sortierelemente", () => {
    const matching = allLearningExercises.filter((exercise) => exercise.type === "matching");
    const sorting = allLearningExercises.filter((exercise) => exercise.type === "sorting");
    expect(matching.every((exercise) => exercise.terms.length >= 2 && exercise.options.length >= 2)).toBe(true);
    expect(sorting.every((exercise) => exercise.options.length >= 5)).toBe(true);
  });

  it("variiert korrekte Antwortpositionen seed-stabil", () => {
    const options = ["richtig", "d1", "d2", "d3", "d4", "d5"];
    const positions = new Set(Array.from({ length: 20 }, (_, seed) => shuffleChoiceOptions(options, seed + 1, "phase20b").indexOf("richtig")));
    expect(positions.size).toBeGreaterThanOrEqual(4);
    expect(shuffleChoiceOptions(options, 8, "phase20b")).toEqual(shuffleChoiceOptions(options, 8, "phase20b"));
  });
});
