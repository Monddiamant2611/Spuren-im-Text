"use client";

import { useSyncExternalStore } from "react";

export const EPIK_PROGRESS_KEY = "epik.learningProgress.v1";
export type EpikLearningProgress = { version: 1; completedChapters: number[]; introSeen: boolean };
const emptyProgress: EpikLearningProgress = { version: 1, completedChapters: [], introSeen: false };
const changeEvent = "epik-learning-progress-change";

export function normalizeCompletedChapters(value: unknown): number[] {
  if (!Array.isArray(value)) return [];
  const chapters = new Set(value.filter((item): item is number => Number.isInteger(item) && item >= 1 && item <= 9));
  const normalized: number[] = [];
  for (let chapter = 1; chapter <= 9 && chapters.has(chapter); chapter += 1) normalized.push(chapter);
  return normalized;
}

export function parseEpikProgress(raw: string | null): EpikLearningProgress {
  if (!raw) return emptyProgress;
  try {
    const candidate = JSON.parse(raw) as { version?: unknown; completedChapters?: unknown; introSeen?: unknown };
    if (candidate?.version !== 1) return emptyProgress;
    const completedChapters = normalizeCompletedChapters(candidate.completedChapters);
    return { version: 1, completedChapters, introSeen: candidate.introSeen === true || completedChapters.length > 0 };
  } catch {
    return emptyProgress;
  }
}

export function readEpikProgress(): EpikLearningProgress {
  if (typeof window === "undefined") return emptyProgress;
  return parseEpikProgress(window.localStorage.getItem(EPIK_PROGRESS_KEY));
}

function announceProgressChange() {
  window.dispatchEvent(new Event(changeEvent));
}

export function completeEpikChapter(chapter: number): EpikLearningProgress {
  const currentProgress = readEpikProgress();
  const current = currentProgress.completedChapters;
  const completedChapters = chapter === current.length + 1 ? [...current, chapter] : current;
  const progress: EpikLearningProgress = { ...currentProgress, completedChapters };
  window.localStorage.setItem(EPIK_PROGRESS_KEY, JSON.stringify(progress));
  announceProgressChange();
  return progress;
}

export function markEpikIntroSeen(): EpikLearningProgress {
  const progress = { ...readEpikProgress(), introSeen: true };
  window.localStorage.setItem(EPIK_PROGRESS_KEY, JSON.stringify(progress));
  announceProgressChange();
  return progress;
}

export function resetEpikProgress() {
  window.localStorage.removeItem(EPIK_PROGRESS_KEY);
  announceProgressChange();
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(changeEvent, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(changeEvent, callback); };
}

export function useCompletedEpikChapterCount(): number {
  return useSyncExternalStore(subscribe, () => readEpikProgress().completedChapters.length, () => 0);
}

export function useEpikIntroSeen(): boolean {
  return useSyncExternalStore(subscribe, () => readEpikProgress().introSeen, () => false);
}
