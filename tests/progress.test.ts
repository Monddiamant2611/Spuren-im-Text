import { describe, expect, it } from "vitest";
import { deriveTheatreState, isChapterUnlocked } from "../src/core/progress/progress";

describe("linear progression", () => {
  it("unlocks chapter 1 and locks chapters 2–5 initially", () => { expect(isChapterUnlocked("chapter_01", [])).toBe(true); for (const id of ["chapter_02", "chapter_03", "chapter_04", "chapter_05", "finale"]) expect(isChapterUnlocked(id, [])).toBe(false); });
  it("unlocks only the next chapter", () => { expect(isChapterUnlocked("chapter_02", ["chapter_01"])).toBe(true); expect(isChapterUnlocked("chapter_03", ["chapter_01"])).toBe(false); });
  it("derives every visual theatre state from progress", () => { expect(deriveTheatreState([])).toBe("INITIAL"); expect(deriveTheatreState(["chapter_01"])).toBe("AFTER_CHAPTER_1"); expect(deriveTheatreState(["chapter_01","chapter_02","chapter_03","chapter_04","chapter_05"])).toBe("AFTER_CHAPTER_5"); expect(deriveTheatreState([], true)).toBe("FINALE_READY"); });
});
