import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Epik Phase 20A", () => {
  it("verwendet in allen neun Kapiteln fünf sichtbare, stabil adressierte Lernschritte", () => {
    for (let chapter = 1; chapter <= 9; chapter += 1) {
      const source = readFileSync(`src/games/epik/Chapter${String(chapter).padStart(2, "0")}Path.tsx`, "utf8");
      for (let step = 0; step < 5; step += 1) expect(source).toContain(`step === ${step}`);
      expect(source).not.toMatch(/answers\[\s*\d+\s*\]/);
      expect(source).not.toMatch(/selected\[\s*\d+\s*\]/);
      expect(source).toContain(`ChapterCompletionActions chapter={${chapter}}`);
    }
  });

  it("vereinheitlicht Begriffsboxen und reguläre Typografie des Abschlussfalls", () => {
    const css = readFileSync("src/games/epik/epik.css", "utf8");
    expect(css).toContain(".epik-learning-cards>.archive-card,.epik-five-grid>.archive-card,.epik-chapter-glossary>details");
    expect(css).toContain("overflow-wrap:anywhere");
    expect(css).toContain("grid-template-columns:minmax(23rem,1.08fr) minmax(0,.92fr)");
    expect(css).toContain(".epik-final-case .epik-path-header,.epik-final-case .epik-text-card,.epik-final-case .epik-task{font-family:inherit;text-align:left}");
  });
});
