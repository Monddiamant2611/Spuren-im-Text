export interface ProgressMilestone { id: string; chapterId: string; visibleChange: string; achieved: boolean; }

export function achieveMilestone(items: readonly ProgressMilestone[], id: string): ProgressMilestone[] {
  return items.map((item) => item.id === id ? { ...item, achieved: true } : { ...item });
}

import type { TheatreState } from "../state/types";
import { dramatikChapterIds, dramatikNavigationIds } from "../../games/dramatik/data/chapters";

export function deriveTheatreState(completedChapters: readonly string[], finaleReady = false, performanceState?:"PERFORMANCE_RUNNING"|"PERFORMANCE_COMPLETE"): TheatreState {
  if (performanceState) return performanceState;
  if (finaleReady) return "FINALE_READY";
  const count = dramatikChapterIds.filter((id) => completedChapters.includes(id)).length;
  return count === 0 ? "INITIAL" : `AFTER_CHAPTER_${Math.min(count, 5)}` as TheatreState;
}

export function isChapterUnlocked(chapterId: string, completedChapters: readonly string[]): boolean {
  const index = dramatikNavigationIds.indexOf(chapterId);
  return index === 0 || (index > 0 && dramatikNavigationIds.slice(0, index).every((id) => completedChapters.includes(id)));
}
