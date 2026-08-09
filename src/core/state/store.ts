import { initialGameState, type GameState } from "./types";

export const STORAGE_KEY = "lernwerkstatt-games:state:v1";

export function saveGameState(state: GameState, storage: Pick<Storage, "setItem"> = localStorage): GameState {
  const saved = { ...state, lastSavedAt: new Date().toISOString() };
  storage.setItem(STORAGE_KEY, JSON.stringify(saved));
  return saved;
}

export function hasSavedGame(storage: Pick<Storage, "getItem"> = localStorage): boolean {
  return loadGameState(storage).currentGame !== null;
}

export function resetGameState(storage: Pick<Storage, "removeItem"> = localStorage): void {
  storage.removeItem(STORAGE_KEY);
}

export function createNewGameState(): GameState {
  return { ...structuredClone(initialGameState), currentGame: "dramatik", currentChapter: "chapter_01" };
}

export function loadGameState(storage: Pick<Storage, "getItem"> = localStorage): GameState {
  const raw = storage.getItem(STORAGE_KEY);
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
    return {
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
      settings,
    };
  } catch {
    return structuredClone(initialGameState);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
function stringArray(value: unknown): string[] { return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []; }
function validTheatreState(value: unknown): value is GameState["theatreState"] { return ["INITIAL","AFTER_CHAPTER_1","AFTER_CHAPTER_2","AFTER_CHAPTER_3","AFTER_CHAPTER_4","AFTER_CHAPTER_5","FINALE_READY","PERFORMANCE_RUNNING","PERFORMANCE_COMPLETE"].includes(value as string); }
function validPerformanceState(value: unknown): value is GameState["performanceState"] { return ["NOT_STARTED","FINALE_READY","PERFORMANCE_RUNNING","PERFORMANCE_COMPLETE"].includes(value as string); }
