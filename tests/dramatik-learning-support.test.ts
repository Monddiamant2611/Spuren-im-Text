import { describe, expect, it } from "vitest";
import { advanceWithSupport, learningSupportMessage } from "../src/games/dramatik/components/LearningSupport";

describe("dramatik learning support", () => {
  it("escalates from a diagnostic first hint to a concrete second hint", () => {
    expect(learningSupportMessage(1, "Textbefund prüfen.", "Kategorie prüfen.")).toContain("Textbefund prüfen");
    expect(learningSupportMessage(2, "Textbefund prüfen.", "Kategorie prüfen.")).toContain("Kategorie prüfen");
  });

  it("allows supported progression without discarding existing partial state", () => {
    const session = { round: 4, completed: false, correctAssignments: { a: "place" } };
    expect(advanceWithSupport(session, 6)).toEqual({ round: 5, completed: false, correctAssignments: { a: "place" } });
  });

  it("marks the final round complete when support is needed", () => {
    expect(advanceWithSupport({ round: 6, completed: false }, 6)).toEqual({ round: 6, completed: true });
  });
});
