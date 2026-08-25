import { describe, expect, it } from "vitest";
import { chapter02PracticeTexts, chapter02Steps, evaluatePerspectiveStatement, isPerspectiveTransferComplete, selectPerspectiveText } from "../src/games/epik/data/chapter_02";

describe("Epik Bereich 2", () => {
  it("besitzt fünf Schritte und zehn unterschiedliche selbst verfasste Fälle", () => { expect(chapter02Steps).toHaveLength(5); expect(chapter02PracticeTexts).toHaveLength(10); expect(new Set(chapter02PracticeTexts.map((text) => text.id)).size).toBe(10); expect(chapter02PracticeTexts.every((text) => text.sourceType === "self-authored")).toBe(true); });
  it("enthält alle drei Perspektivformen", () => { expect(new Set(chapter02PracticeTexts.map((text) => text.perspective))).toEqual(new Set(["auktorial", "personal", "ich"])); });
  it("vermeidet bei der Rotation ausgeschlossene Wiederholungen", () => { const first = selectPerspectiveText(0); expect(selectPerspectiveText(0, [first.id]).id).not.toBe(first.id); });
  it("bewertet zentrale Fehlvorstellungen korrekt", () => { expect(evaluatePerspectiveStatement("author", false)).toBe(true); expect(evaluatePerspectiveStatement("thoughts", false)).toBe(false); expect(evaluatePerspectiveStatement("third", false)).toBe(true); });
  it("erkennt den erreichbaren Transferabschluss", () => { const complete = { form: 1, participation: 1, behavior: 1, certainty: 1, proof: 1, analysis: 1 }; expect(isPerspectiveTransferComplete(complete)).toBe(true); expect(isPerspectiveTransferComplete({ form: 1 })).toBe(false); });
});
