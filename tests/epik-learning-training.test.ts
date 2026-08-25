import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { allLearningExercises, categoryLearningExercises, evaluateFreeText, integrationLearningExercises, learningCategoryIds, selectCategoryTrainingRound, selectLearningFinalTest } from "../src/games/epik/data/learning_exercises";

describe("Epik Lerntraining Phase 16", () => {
  it("stellt 132 Kategorie- und 18 Integrationsaufgaben eindeutig bereit", () => {
    expect(categoryLearningExercises).toHaveLength(132);
    expect(integrationLearningExercises).toHaveLength(18);
    expect(allLearningExercises).toHaveLength(150);
    expect(new Set(allLearningExercises.map(({ id }) => id)).size).toBe(150);
  });

  it("enthält je Kategorie zwölf Aufgaben, fünf Formate und entfernt Text aus reinen Basiskontrollen", () => {
    for (const category of learningCategoryIds) {
      const exercises = categoryLearningExercises.filter((item) => item.category === category);
      expect(exercises).toHaveLength(12);
      expect(new Set(exercises.map(({ type }) => type)).size).toBeGreaterThanOrEqual(5);
      expect(exercises.some(({ type }) => type === "freeText")).toBe(true);
      expect(exercises.filter(({ exampleText }) => exampleText.trim().length > 0).length / exercises.length).toBeGreaterThanOrEqual(.7);
      expect(exercises.filter(({ requiresText }) => requiresText === false).every(({ exampleText }) => exampleText === "")).toBe(true);
    }
  });

  it("normalisiert Freitext nur hinsichtlich Großschreibung und Leerraum", () => {
    const exercise = categoryLearningExercises.find(({ type }) => type === "freeText")!;
    const answer = exercise.acceptedAnswers![0];
    expect(evaluateFreeText(exercise, `  ${answer.toLocaleUpperCase("de-DE")}  `)).toBe(true);
    expect(evaluateFreeText(exercise, `${answer}x`)).toBe(false);
  });

  it("bildet wechselnde Sechserrunden mit mindestens vier Aufgabentypen", () => {
    for (const category of learningCategoryIds) {
      const first = selectCategoryTrainingRound(category, 101);
      const second = selectCategoryTrainingRound(category, 202, first.map(({ id }) => id));
      expect(first).toHaveLength(6);
      expect(new Set(first.map(({ type }) => type)).size).toBeGreaterThanOrEqual(4);
      expect(second).toHaveLength(6);
      expect(second.some(({ id }) => !first.some((item) => item.id === id))).toBe(true);
    }
  });

  it("stellt einen eindeutigen 30er-Abschlusstest aus 2 Aufgaben je Kategorie plus 8 Transferaufgaben zusammen", () => {
    const test = selectLearningFinalTest(77);
    expect(test).toHaveLength(30);
    expect(new Set(test.map(({ id }) => id)).size).toBe(30);
    for (const category of learningCategoryIds) expect(test.filter((item) => item.category === category)).toHaveLength(2);
    expect(test.filter(({ category }) => category === "integration")).toHaveLength(8);
    expect(new Set(test.map(({ type }) => type)).size).toBeGreaterThanOrEqual(6);
  });

  it("hält Matching-Ziele stabil und bedienbar", () => {
    for (const exercise of allLearningExercises.filter(({ type }) => type === "matching")) {
      expect(Object.keys(exercise.mapping ?? {})).toEqual([...exercise.terms]);
      expect(Object.values(exercise.mapping ?? {}).every((target) => exercise.options.includes(target))).toBe(true);
    }
  });

  it("verwendet Buttons für Matching und Sortierung sowie die mobile Textalternative", () => {
    const interaction = readFileSync("src/games/epik/LearningTraining.tsx", "utf8");
    const practiceText = readFileSync("src/games/epik/PracticeText.tsx", "utf8");
    expect(interaction).toContain('className="epik-matching"');
    expect(interaction).toContain('className="epik-sort"');
    expect(interaction.match(/<button type="button"/g)?.length).toBeGreaterThanOrEqual(5);
    expect(practiceText).toContain("Text anzeigen");
    expect(practiceText).toContain("aria-expanded");
  });

  it("besitzt Lösungen, stabile Choice-IDs und nachvollziehbare Distraktoren", () => {
    for (const exercise of allLearningExercises) {
      expect(exercise.prompt.trim().length).toBeGreaterThan(20);
      if (exercise.requiresText === false) expect(exercise.exampleText).toBe("");
      else expect(exercise.exampleText.trim()).not.toBe("");
      expect(exercise.solution.trim()).not.toBe("");
      expect(exercise.explanation.trim()).not.toBe("");
      expect(new Set(exercise.choices.map(({ id }) => id)).size).toBe(exercise.choices.length);
      if (!["freeText", "matching", "sorting"].includes(exercise.type)) expect(exercise.choices.some(({ distractorReason }) => distractorReason)).toBe(true);
    }
  });

  it("enthält keine verbotenen generischen Fragetemplates", () => {
    const prompts = allLearningExercises.map(({ prompt }) => prompt).join("\n");
    expect(prompts).not.toContain("Welche zwei Begriffe helfen bei der Analyse dieses Beispiels?");
    expect(prompts).not.toContain("Welche Bestimmung passt zum ersten Beispiel genauer als zur naheliegenden Alternative?");
    expect(prompts).not.toContain("Welcher Fachbegriff beschreibt die markierte Gestaltung am präzisesten?");
  });

  it("bindet Grundlagen und Erzählsituation an Leitfragen statt an isolierte Begriffe", () => {
    const grundlagen = categoryLearningExercises.filter(({ category }) => category === "grundlagen");
    const erzaehlsituation = categoryLearningExercises.filter(({ category }) => category === "erzaehlsituation");
    expect(grundlagen.every(({ familyId }) => familyId === "erzaehlebenen")).toBe(true);
    expect(erzaehlsituation.some(({ familyId }) => familyId === "erzaehlform")).toBe(true);
    expect(erzaehlsituation.some(({ familyId }) => familyId === "erzaehlverhalten")).toBe(true);
    expect([...grundlagen, ...erzaehlsituation].every(({ analysisQuestion }) => analysisQuestion.length > 15)).toBe(true);
  });

  it("zeigt keine englischen Enum-Namen in der Schüleransicht", () => {
    const source = readFileSync("src/games/epik/LearningTraining.tsx", "utf8");
    expect(source).not.toContain("{exercise.type}");
    for (const label of ["Begriff eintragen", "Mehrfachauswahl", "Zuordnung", "Reihenfolge", "Textvergleich", "Belegwahl", "Fehlerdetektiv"]) expect(source).toContain(label);
  });
});
