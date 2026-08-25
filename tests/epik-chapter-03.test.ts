import { describe, expect, it } from "vitest";
import { chapter03PracticeTexts, chapter03Steps, evaluatePerceptionStatement, isPerceptionTransferComplete, perceptionComparisons, selectPerceptionText } from "../src/games/epik/data/chapter_03";
describe("Epik Bereich 3", () => {
  it("besitzt fünf Schritte und zehn unterschiedliche Texte", () => { expect(chapter03Steps).toHaveLength(5); expect(chapter03PracticeTexts).toHaveLength(10); expect(new Set(chapter03PracticeTexts.map((text) => text.id)).size).toBe(10); });
  it("deckt Außensicht, Figurensicht, Innensicht und unsichere Wahrnehmung ab", () => { const modes = chapter03PracticeTexts.flatMap((text) => text.modes); expect(modes).toContain("Außensicht"); expect(modes).toContain("subjektive Figurensicht"); expect(modes).toContain("Innensicht"); expect(chapter03PracticeTexts.some((text) => text.uncertain.length > 0)).toBe(true); });
  it("enthält drei Vergleiche und rotiert ohne direkte Wiederholung", () => { expect(perceptionComparisons).toHaveLength(3); const first = selectPerceptionText(0); expect(selectPerceptionText(0, [first.id]).id).not.toBe(first.id); });
  it("bewertet zentrale Fehlvorstellungen korrekt", () => { expect(evaluatePerceptionStatement("same", false)).toBe(true); expect(evaluatePerceptionStatement("ich", false)).toBe(true); expect(evaluatePerceptionStatement("objective", false)).toBe(true); expect(evaluatePerceptionStatement("lie", false)).toBe(true); });
  it("erkennt einen vollständigen Transfer", () => { const complete = { observable: 1, internal: 1, mode: 1, proximity: 1, reason: 1, certainty: 1, effect: 1, analysis: 1 }; expect(isPerceptionTransferComplete(complete)).toBe(true); expect(isPerceptionTransferComplete({ mode: 1 })).toBe(false); });
});
