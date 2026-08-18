import { initialGameState, type GameState } from "./types";
import { deriveTheatreState } from "../progress/progress";
import { dramatikChapterIds, dramatikNavigationIds } from "../../games/dramatik/data/chapters";
import { synthesisAreas } from "../../games/dramatik/data/finale/synthesis";

export const STORAGE_KEY = "lernwerkstatt-games:state:v1";

export function saveGameState(state: GameState, storage: Pick<Storage, "setItem"> = localStorage): GameState {
  const saved = { ...state, lastSavedAt: new Date().toISOString() };
  try { storage.setItem(STORAGE_KEY, JSON.stringify(saved)); }
  catch { notifyStorageFailure(); }
  return saved;
}

export function hasSavedGame(storage: Pick<Storage, "getItem"> = localStorage): boolean {
  return loadGameState(storage).currentGame !== null;
}

export function resetGameState(storage: Pick<Storage, "removeItem"> = localStorage): void {
  try { storage.removeItem(STORAGE_KEY); }
  catch { notifyStorageFailure(); }
}

export function createNewGameState(): GameState {
  return { ...structuredClone(initialGameState), currentGame: "dramatik", currentChapter: "chapter_01" };
}

export function loadGameState(storage: Pick<Storage, "getItem"> = localStorage): GameState {
  let raw: string | null = null;
  try { raw = storage.getItem(STORAGE_KEY); }
  catch { notifyStorageFailure(); return structuredClone(initialGameState); }
  if (!raw) return structuredClone(initialGameState);
  try {
    const parsed = JSON.parse(raw) as Partial<GameState>;
    if (parsed.version !== 1 || !isRecord(parsed)) return structuredClone(initialGameState);
    const defaults = structuredClone(initialGameState);
    const settings = isRecord(parsed.settings) ? {
      music: typeof parsed.settings.music === "boolean" ? parsed.settings.music : defaults.settings.music,
      soundEffects: typeof parsed.settings.soundEffects === "boolean" ? parsed.settings.soundEffects : defaults.settings.soundEffects,
      reducedMotion: typeof parsed.settings.reducedMotion === "boolean" ? parsed.settings.reducedMotion : defaults.settings.reducedMotion,
    } : defaults.settings;
    const hydrated: GameState = {
      ...defaults, ...parsed,
      currentGame: parsed.currentGame === "dramatik" || parsed.currentGame === "epik" || parsed.currentGame === "lyrik" ? parsed.currentGame : null,
      currentChapter: typeof parsed.currentChapter === "string" ? parsed.currentChapter : null,
      completedChapters: stringArray(parsed.completedChapters),
      decisions: isRecord(parsed.decisions) ? parsed.decisions : {},
      competencies: isRecord(parsed.competencies) ? parsed.competencies as GameState["competencies"] : {},
      failedAttempts: isRecord(parsed.failedAttempts) ? parsed.failedAttempts as GameState["failedAttempts"] : {},
      stagingDecisions: isRecord(parsed.stagingDecisions) ? parsed.stagingDecisions : {},
      selectedEvidence: stringArray(parsed.selectedEvidence),
      progress: isRecord(parsed.progress) ? parsed.progress as GameState["progress"] : {},
      theatreState: validTheatreState(parsed.theatreState) ? parsed.theatreState : defaults.theatreState,
      performanceState: validPerformanceState(parsed.performanceState) ? parsed.performanceState : defaults.performanceState,
      currentPerformanceMoment: typeof parsed.currentPerformanceMoment === "number" && Number.isInteger(parsed.currentPerformanceMoment) && parsed.currentPerformanceMoment >= 0 ? parsed.currentPerformanceMoment : 0,
      finalStaging: isRecord(parsed.finalStaging) ? parsed.finalStaging : {},
      visibleCompetencyResults: isRecord(parsed.visibleCompetencyResults) ? parsed.visibleCompetencyResults as GameState["visibleCompetencyResults"] : {},
      finaleVisitedAreas: stringArray(parsed.finaleVisitedAreas),
      finaleSynthesisCompleted: typeof parsed.finaleSynthesisCompleted === "boolean" ? parsed.finaleSynthesisCompleted : false,
      finaleBookOpened: typeof parsed.finaleBookOpened === "boolean" ? parsed.finaleBookOpened : false,
      finaleClosingSeen: typeof parsed.finaleClosingSeen === "boolean" ? parsed.finaleClosingSeen : false,
      settings,
    };
    return normalizeDramatikState(hydrated);
  } catch {
    return structuredClone(initialGameState);
  }
}

export function normalizeCompletedChapters(value: readonly string[]): string[] {
  const completed: string[] = [];
  for (const chapterId of dramatikChapterIds) {
    if (!value.includes(chapterId)) break;
    completed.push(chapterId);
  }
  return completed;
}

export function normalizeDramatikState(state: GameState): GameState {
  if (state.currentGame !== "dramatik") return state;
  const completedChapters = normalizeCompletedChapters(state.completedChapters);
  const allChaptersComplete = completedChapters.length === dramatikChapterIds.length;
  const nextChapter = dramatikNavigationIds[Math.min(completedChapters.length, dramatikNavigationIds.length - 1)];
  const allowedCurrent = new Set([...completedChapters, nextChapter]);
  const currentChapter = state.currentChapter && allowedCurrent.has(state.currentChapter) ? state.currentChapter : nextChapter;
  const finaleVisitedAreas = allChaptersComplete ? state.finaleVisitedAreas.filter((id) => synthesisAreas.some((area) => area.id === id)) : [];
  const finaleSynthesisCompleted = allChaptersComplete && finaleVisitedAreas.length > 0 && state.finaleSynthesisCompleted;
  const finaleCompleted = allChaptersComplete && state.finaleCompleted;
  const finaleStarted = allChaptersComplete && state.finaleStarted;
  const performanceState = !allChaptersComplete ? "NOT_STARTED" : finaleCompleted ? "PERFORMANCE_COMPLETE" : finaleStarted ? "FINALE_READY" : "NOT_STARTED";
  const progress = { ...state.progress, finale_ready: allChaptersComplete, finale_completed: finaleCompleted, game_completed: finaleCompleted };
  return {
    ...state,
    completedChapters,
    currentChapter,
    finaleStarted,
    finaleCompleted,
    gameCompleted: finaleCompleted,
    finaleVisitedAreas,
    finaleSynthesisCompleted,
    finaleBookOpened: allChaptersComplete && state.finaleBookOpened,
    finaleClosingSeen: finaleCompleted && state.finaleClosingSeen,
    performanceState,
    progress,
    theatreState: deriveTheatreState(completedChapters, allChaptersComplete && (finaleStarted || state.progress.finale_ready), performanceState === "PERFORMANCE_COMPLETE" ? performanceState : undefined),
  };
}

function notifyStorageFailure() {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("lernwerkstatt:storage-error"));
}

function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
function stringArray(value: unknown): string[] { return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []; }
function validTheatreState(value: unknown): value is GameState["theatreState"] { return ["INITIAL","AFTER_CHAPTER_1","AFTER_CHAPTER_2","AFTER_CHAPTER_3","AFTER_CHAPTER_4","AFTER_CHAPTER_5","FINALE_READY","PERFORMANCE_RUNNING","PERFORMANCE_COMPLETE"].includes(value as string); }
function validPerformanceState(value: unknown): value is GameState["performanceState"] { return ["NOT_STARTED","FINALE_READY","PERFORMANCE_RUNNING","PERFORMANCE_COMPLETE"].includes(value as string); }
