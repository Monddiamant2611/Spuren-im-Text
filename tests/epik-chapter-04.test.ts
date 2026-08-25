import { describe, expect, it } from "vitest";
import { chapter04PracticeTexts, chapter04Steps, evaluateSpeechStatement, isSpeechTransferComplete, selectSpeechText, speechComparisons, speechFormOrder } from "../src/games/epik/data/chapter_04";
describe("Epik Bereich 4", () => {
  it("besitzt fünf Schritte und elf unterschiedliche Texte", () => { expect(chapter04Steps).toHaveLength(5); expect(chapter04PracticeTexts).toHaveLength(11); expect(new Set(chapter04PracticeTexts.map((text) => text.id)).size).toBe(11); });
  it("deckt alle fünf Rede- und Gedankenformen ab", () => { const forms = new Set(chapter04PracticeTexts.flatMap((text) => text.forms)); expect(forms).toEqual(new Set(speechFormOrder)); });
  it("enthält drei Vergleiche und rotiert ohne direkte Wiederholung", () => { expect(speechComparisons).toHaveLength(3); const first = selectSpeechText(0); expect(selectSpeechText(0, [first.id]).id).not.toBe(first.id); });
  it("bewertet zentrale Fehlvorstellungen korrekt", () => { expect(evaluateSpeechStatement("ich", false)).toBe(true); expect(evaluateSpeechStatement("konj", false)).toBe(true); expect(evaluateSpeechStatement("inside", false)).toBe(true); expect(evaluateSpeechStatement("thought", false)).toBe(true); expect(evaluateSpeechStatement("emotion", false)).toBe(true); });
  it("erkennt den vollständigen Transfer", () => { const complete = { forms: 1, evidence: 1, direct: 1, thought: 1, mediated: 1, effect: 1, analysis: 1, reason: 1 }; expect(isSpeechTransferComplete(complete)).toBe(true); expect(isSpeechTransferComplete({ forms: 1 })).toBe(false); });
});
