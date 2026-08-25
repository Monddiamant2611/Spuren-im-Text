import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { allLearningExercises } from "../src/games/epik/data/learning_exercises";

describe("Epik Phase 20C", () => {
  it("trennt reine Definitionsmatchings von Textanalyseaufgaben", () => {
    const matching = allLearningExercises.filter((exercise) => exercise.type === "matching");
    expect(matching).toHaveLength(24);
    expect(matching.every((exercise) => exercise.requiresText === false && exercise.exampleText === "")).toBe(true);
    expect(matching.every((exercise) => exercise.terms.length >= 2)).toBe(true);
    expect(allLearningExercises.filter((exercise) => exercise.requiresText !== false).every((exercise) => exercise.exampleText.trim().length > 0)).toBe(true);
  });

  it("verwendet konkrete Aussagen in allen Sortierketten", () => {
    const sorting = allLearningExercises.filter((exercise) => exercise.type === "sorting");
    expect(sorting.every((exercise) => exercise.correctOrder?.length === 5)).toBe(true);
    expect(sorting.every((exercise) => exercise.correctOrder?.some((item) => item.startsWith("Textbeleg: „")))).toBe(true);
    expect(sorting.every((exercise) => exercise.correctOrder?.every((item) => item.includes(":")))).toBe(true);
  });

  it("entfernt ungenutzten Raya-Text und die alte abstrakte Vergleichsfrage", () => {
    const chapter = readFileSync("src/games/epik/Chapter03Path.tsx", "utf8");
    const exercises = readFileSync("src/games/epik/data/learning_exercises.ts", "utf8");
    expect(chapter).not.toContain("Raya las die letzte Zeile");
    expect(exercises).not.toContain("Welche Vergleichsaussage benennt");
  });

  it("klassifiziert ergänzte Distraktoren nach Analyseachsen und markiert Beispiele selektiv", () => {
    const choices = readFileSync("src/games/epik/choice-options.ts", "utf8");
    const cards = readFileSync("src/games/epik/LearningCards.tsx", "utf8");
    for (const axis of ["narrator", "perception", "speech", "time", "character", "space", "conflict", "interpretation", "evidence"]) expect(choices).toContain(`${axis}:`);
    expect(cards).toContain("concept?.examples[0]");
  });
});
