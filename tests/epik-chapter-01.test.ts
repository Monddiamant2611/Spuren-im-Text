import { describe, expect, it } from "vitest";
import { chapter01PracticeTexts, chapter01Steps, evaluateAuthorNarrator, isTransferComplete, selectPracticeText } from "../src/games/epik/data/chapter_01";

describe("Epik Bereich 1", () => {
  it("besitzt fünf Lernschritte und acht kompatible selbst verfasste Texte", () => {
    expect(chapter01Steps).toHaveLength(5);
    expect(chapter01PracticeTexts).toHaveLength(8);
    expect(chapter01PracticeTexts.every((text) => text.sourceType === "self-authored")).toBe(true);
  });

  it("wählt Alternativen und vermeidet ausgeschlossene Texte", () => {
    const first = selectPracticeText(0);
    const alternative = selectPracticeText(0, [first.id]);
    expect(alternative.id).not.toBe(first.id);
  });

  it("bewertet die zentrale Autor-Erzähler-Unterscheidung", () => {
    expect(evaluateAuthorNarrator("author-real", true)).toBe(true);
    expect(evaluateAuthorNarrator("always-identical", false)).toBe(true);
    expect(evaluateAuthorNarrator("ich-author", true)).toBe(false);
  });

  it("erkennt einen vollständig bearbeiteten Transfer", () => {
    expect(isTransferComplete({ actors: 1, setting: 1, mediator: 1, observation: 1, beyond: 1, sentence: 1 })).toBe(true);
    expect(isTransferComplete({ actors: 1 })).toBe(false);
  });
});
