"use client";

import { useSyncExternalStore } from "react";

export const EPIK_PROGRESS_KEY = "epik.learningProgress.v1";
export type EpikLearningProgress = { version: 1; completedChapters: number[] };
const emptyProgress: EpikLearningProgress = { version: 1, completedChapters: [] };
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
    const candidate = JSON.parse(raw) as { version?: unknown; completedChapters?: unknown };
    if (candidate?.version !== 1) return emptyProgress;
    return { version: 1, completedChapters: normalizeCompletedChapters(candidate.completedChapters) };
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
  const current = readEpikProgress().completedChapters;
  const completedChapters = chapter === current.length + 1 ? [...current, chapter] : current;
  const progress: EpikLearningProgress = { version: 1, completedChapters };
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
