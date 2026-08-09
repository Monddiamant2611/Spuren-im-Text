import { describe, expect, it } from "vitest";
import { initialGameState } from "../src/core/state/types";
import { createNewGameState, hasSavedGame, loadGameState, resetGameState, saveGameState, STORAGE_KEY } from "../src/core/state/store";
import { hydrateSession } from "../src/core/state/hydrateSession";
import { initialChapter01Session } from "../src/games/dramatik/mechanics/chapter_01_engine";

function memoryStorage() { const data = new Map<string, string>(); return { getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => void data.set(key, value), removeItem: (key: string) => void data.delete(key), data }; }

describe("game state", () => {
  it("starts a new game in chapter 1", () => { expect(createNewGameState()).toMatchObject({ currentGame: "dramatik", currentChapter: "chapter_01", theatreState: "INITIAL" }); });
  it("saves and restores progress across reloads", () => { const storage = memoryStorage(); const state = { ...structuredClone(initialGameState), currentGame: "dramatik" as const, completedChapters: ["chapter_01"] }; const saved = saveGameState(state, storage); expect(storage.data.has(STORAGE_KEY)).toBe(true); expect(loadGameState(storage)).toEqual(saved); expect(saved.lastSavedAt).not.toBeNull(); });
  it("shows continue only for an actual saved game", () => { const storage = memoryStorage(); expect(hasSavedGame(storage)).toBe(false); saveGameState(createNewGameState(), storage); expect(hasSavedGame(storage)).toBe(true); });
  it("persists option values", () => { const storage = memoryStorage(); saveGameState({ ...createNewGameState(), settings: { music: false, soundEffects: false, reducedMotion: true } }, storage); expect(loadGameState(storage).settings).toEqual({ music: false, soundEffects: false, reducedMotion: true }); });
  it("removes the saved game on reset", () => { const storage = memoryStorage(); saveGameState(createNewGameState(), storage); resetGameState(storage); expect(storage.data.has(STORAGE_KEY)).toBe(false); });
  it("falls back safely for corrupt data", () => { const storage = memoryStorage(); storage.setItem(STORAGE_KEY, "{"); expect(loadGameState(storage)).toEqual(initialGameState); });
  it("sanitizes malformed fields in a version-compatible save", () => { const storage = memoryStorage(); storage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, currentGame: "dramatik", completedChapters: "chapter_01", decisions: [], settings: { music: "yes" }, theatreState: "IMPOSSIBLE" })); expect(loadGameState(storage)).toMatchObject({ currentGame: "dramatik", completedChapters: [], decisions: {}, settings: initialGameState.settings, theatreState: "INITIAL" }); });
  it("repairs missing and malformed chapter-session fields", () => { const restored = hydrateSession({ round: 99, restoredIds: "broken", assignments: null }, initialChapter01Session, 5); expect(restored).toMatchObject({ round: 1, restoredIds: [], assignments: {} }); });
});
