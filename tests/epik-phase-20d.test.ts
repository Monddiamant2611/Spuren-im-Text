import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { allLearningConcepts, chapterLearningPreviews, learningCategories } from "../src/games/epik/data/learning_content";

describe("Epik Phase 20D", () => {
  it("liefert für alle erreichbaren Begriffe die vierteilige, zentrale Inhaltsstruktur", () => {
    expect(allLearningConcepts).toHaveLength(88);
    expect(allLearningConcepts.every((concept) => concept.shortDefinition.trim().length > 10)).toBe(true);
    expect(allLearningConcepts.every((concept) => concept.recognition.trim().length > 10)).toBe(true);
    expect(allLearningConcepts.every((concept) => concept.exampleSegments.length === 2)).toBe(true);
    expect(allLearningConcepts.every((concept) => concept.exampleSegments.every((example) => example.some((segment) => segment.emphasis) && example.some((segment) => !segment.emphasis)))).toBe(true);
  });

  it("ordnet jedem der neun Kapitel eine passende bestehende Lernkartenkategorie zu", () => {
    expect(chapterLearningPreviews).toHaveLength(9);
    expect(chapterLearningPreviews.every((preview, index) => preview.chapter === index + 1 && learningCategories[preview.categoryIndex].id === preview.categoryId)).toBe(true);
    expect(chapterLearningPreviews.every((preview) => preview.termIds.length >= 4)).toBe(true);
  });

  it("begrenzt die Kartenrückseite auf die verlangten Überschriften", () => {
    const cards = readFileSync("src/games/epik/LearningCards.tsx", "utf8");
    for (const heading of ["Kurzdefinition:", "So erkennen Sie es:", "Beispiel:", "Nicht verwechseln mit:"]) expect(cards).toContain(heading);
    for (const removed of ["Merkmale:", "Darauf sollten Sie achten:", "Abgrenzung:"]) expect(cards).not.toContain(removed);
  });

  it("hält Begriffshilfe und Level-Vorbereitung datengetrieben und getrennt von Antwortoptionen", () => {
    const glossary = readFileSync("src/games/epik/GlossaryTerm.tsx", "utf8");
    const preparation = readFileSync("src/games/epik/LevelPreparationModal.tsx", "utf8");
    const workshop = readFileSync("src/games/epik/EpikWorkshop.tsx", "utf8");
    expect(glossary).toContain("learningCategories");
    expect(glossary).toContain('event.key === "Escape"');
    expect(preparation).toContain("chapterLearningPreviews");
    expect(workshop).toContain("!reviewMode || manualPreparation");
    expect(readFileSync("src/games/epik/choice-options.ts", "utf8")).not.toContain("GlossaryTerm");
  });
});
