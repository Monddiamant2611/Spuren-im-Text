export interface ProgressMilestone { id: string; chapterId: string; visibleChange: string; achieved: boolean; }

export function achieveMilestone(items: readonly ProgressMilestone[], id: string): ProgressMilestone[] {
  return items.map((item) => item.id === id ? { ...item, achieved: true } : { ...item });
}

import type { TheatreState } from "../state/types";

export function deriveTheatreState(completedChapters: readonly string[], finaleReady = false, performanceState?:"PERFORMANCE_RUNNING"|"PERFORMANCE_COMPLETE"): TheatreState {
  if (performanceState) return performanceState;
  if (finaleReady) return "FINALE_READY";
  const count = ["chapter_01", "chapter_02", "chapter_03", "chapter_04", "chapter_05"].filter((id) => completedChapters.includes(id)).length;
  return count === 0 ? "INITIAL" : `AFTER_CHAPTER_${Math.min(count, 5)}` as TheatreState;
}

export function isChapterUnlocked(chapterId: string, completedChapters: readonly string[]): boolean {
  const order = ["chapter_01", "chapter_02", "chapter_03", "chapter_04", "chapter_05", "finale"];
  const index = order.indexOf(chapterId);
  return index === 0 || (index > 0 && completedChapters.includes(order[index - 1]));
}
