import { describe, expect, it } from "vitest";
import { dramatikGame } from "../src/games/dramatik/data/chapters";
import { findChapter, isValidNavigation } from "../src/core/navigation/registry";
describe("chapter registration and navigation", () => {
  it("registers all implemented chapters and the finale", () => { expect(dramatikGame.chapters.map((item) => item.id)).toEqual(["chapter_01", "chapter_02", "chapter_03", "chapter_04", "chapter_05", "finale"]); expect(dramatikGame.chapters.map((item) => item.status)).toEqual(["ready", "ready", "ready", "ready", "ready", "ready"]); });
  it("accepts registered destinations only", () => { expect(isValidNavigation(dramatikGame, "chapter_01")).toBe(true); expect(findChapter(dramatikGame, "invented")).toBeUndefined(); });
});
