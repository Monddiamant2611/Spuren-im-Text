export type GameId = "dramatik" | "epik" | "lyrik";
export type CompetencyLevel = "developing" | "progressing" | "secure" | "advanced";
export type TheatreState = "INITIAL" | "AFTER_CHAPTER_1" | "AFTER_CHAPTER_2" | "AFTER_CHAPTER_3" | "AFTER_CHAPTER_4" | "AFTER_CHAPTER_5" | "FINALE_READY" | "PERFORMANCE_RUNNING" | "PERFORMANCE_COMPLETE";
export type PerformanceState = "NOT_STARTED" | "FINALE_READY" | "PERFORMANCE_RUNNING" | "PERFORMANCE_COMPLETE";
export interface GameSettings { music: boolean; soundEffects: boolean; reducedMotion: boolean; }

export const DRAMATIK_COMPETENCIES = [
  "text_structure", "stage_direction", "speaker_assignment", "scene_orientation",
  "character_relationships", "direct_characterization", "indirect_characterization",
  "motivation", "conflict_analysis", "character_development", "situation_analysis",
  "cause_effect", "dialogue_analysis", "speech_acts", "language_analysis", "interpretation",
  "evidence_reasoning", "staging_reasoning", "information_state", "knowledge_state_analysis",
  "context_analysis", "causal_reasoning", "relevance_selection", "unsupported_claim_detection",
  "conversation_goals", "conversation_development", "nonverbal_analysis", "perspective_analysis",
  "hypothesis_testing", "claim_validation", "argument_structure", "critical_revision",
] as const;

export interface GameState {
  version: 1;
  currentGame: GameId | null;
  currentChapter: string | null;
  completedChapters: string[];
  decisions: Record<string, unknown>;
  competencies: Record<string, { value: number; level: CompetencyLevel }>;
  failedAttempts: Record<string, number>;
  stagingDecisions: Record<string, unknown>;
  selectedEvidence: string[];
  progress: Record<string, boolean>;
  theatreState: TheatreState;
  settings: GameSettings;
  lastSavedAt: string | null;
  finaleStarted: boolean;
  finaleCompleted: boolean;
  gameCompleted: boolean;
  performanceState: PerformanceState;
  currentPerformanceMoment: number;
  finalStaging: Record<string, unknown>;
  finalHypothesis: string | null;
  visibleCompetencyResults: Record<string, { level: CompetencyLevel; feedback: string }>;
}

export const initialGameState: GameState = {
  version: 1, currentGame: null, currentChapter: null, completedChapters: [], decisions: {},
  competencies: {}, failedAttempts: {}, stagingDecisions: {}, selectedEvidence: [], progress: {},
  theatreState: "INITIAL", settings: { music: true, soundEffects: true, reducedMotion: false }, lastSavedAt: null,
  finaleStarted:false,finaleCompleted:false,gameCompleted:false,performanceState:"NOT_STARTED",currentPerformanceMoment:0,finalStaging:{},finalHypothesis:null,visibleCompetencyResults:{},
};
