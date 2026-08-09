export interface InteractionResult<T = unknown> { valid: boolean; value: T; feedbackKey?: string; }
export interface InteractionEngine<TInput, TOutput> { evaluate(input: TInput): InteractionResult<TOutput>; reset(): void; }
export interface FeedbackEngine { getMessage(key: string): string | undefined; }
export type DragDropEngine<T> = InteractionEngine<{ item: T; targetId: string }, T>;
export type EvidenceReasoningEngine = InteractionEngine<{ claimId: string; evidenceIds: string[] }, string[]>;
export type CausalChainEngine = InteractionEngine<{ orderedIds: string[] }, string[]>;
