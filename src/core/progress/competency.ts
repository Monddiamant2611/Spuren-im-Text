import type { CompetencyLevel, GameState } from "../state/types";

export interface CompetencyEventLike { competency: string; success: boolean }

export function competencyLevelFor(value: number): CompetencyLevel {
  return value >= 4.5 ? "advanced" : value >= 3.5 ? "secure" : value >= 2 ? "progressing" : "developing";
}

export function scoreCompetencyEvents(events: readonly CompetencyEventLike[]): number | undefined {
  if (events.length === 0) return undefined;
  const successRate = events.filter((event) => event.success).length / events.length;
  const finalSuccess = events.at(-1)?.success === true;
  return Math.min(5, Math.max(0, successRate * 2 + (finalSuccess ? 3 : 0)));
}

export function mergeMeasuredCompetencies(
  current: GameState["competencies"],
  events: readonly CompetencyEventLike[],
  competencyIds: readonly string[],
): GameState["competencies"] {
  const next = { ...current };
  for (const competencyId of competencyIds) {
    const score = scoreCompetencyEvents(events.filter((event) => event.competency === competencyId));
    if (score === undefined) continue;
    const previous = current[competencyId]?.value;
    const value = previous === undefined ? score : previous * 0.35 + score * 0.65;
    next[competencyId] = { value, level: competencyLevelFor(value) };
  }
  return next;
}

export function mergeReplayCompetencies(
  current: GameState["competencies"],
  events: readonly CompetencyEventLike[],
  competencyIds: readonly string[],
): GameState["competencies"] {
  const next = { ...current };
  for (const competencyId of competencyIds) {
    const measured = scoreCompetencyEvents(events.filter((event) => event.competency === competencyId));
    if (measured === undefined) continue;
    const previous = current[competencyId]?.value;
    if (previous === undefined || measured > previous) {
      next[competencyId] = { value: measured, level: competencyLevelFor(measured) };
    }
  }
  return next;
}
