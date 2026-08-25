import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { learningCategories } from "../src/games/epik/data/learning_content";

describe("Epik Phase 19", () => {
  it("gibt allen Lernkarten eine begriffsspezifische Leitfrage und feste Layoutregeln", () => {
    const cards = readFileSync("src/games/epik/LearningCards.tsx", "utf8");
    const css = readFileSync("src/games/epik/epik.css", "utf8");
    expect(learningCategories.flatMap((category) => category.concepts)).toHaveLength(88);
    expect(cards).toContain("family.question");
    expect(cards).not.toContain("category.question}</span><small>");
    expect(css).toContain(".epik-family-card__body");
    expect(css).toContain("overflow-y:auto");
  });

  it("erweitert die Textklassifikation auf acht Aussagen", () => {
    const chapter = readFileSync("src/games/epik/Chapter01Path.tsx", "utf8");
    expect(chapter).toContain("[true, false, true, false, true, false, true, false]");
  });

  it("bietet alle neun Übergänge und deaktiviert den früheren Review-URL-Zugriff", () => {
    for (let chapter = 1; chapter <= 9; chapter += 1) {
      const source = readFileSync(`src/games/epik/Chapter${String(chapter).padStart(2, "0")}Path.tsx`, "utf8");
      expect(source).toContain(`ChapterCompletionActions chapter={${chapter}}`);
    }
    const workshop = readFileSync("src/games/epik/EpikWorkshop.tsx", "utf8");
    expect(workshop).not.toContain('get("review") === "1"');
    expect(workshop).toContain('process.env.NODE_ENV !== "production"');
    expect(workshop).toContain('get("__epik_test") === "1"');
    expect(workshop).toContain("if (!reviewMode && activeIndex >= 0) completeEpikChapter");
    expect(workshop).toContain('reviewNavigate("final-case")');
  });
});
