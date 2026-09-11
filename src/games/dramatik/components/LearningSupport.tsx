"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./LearningSupport.module.css";

export interface LearningSupportState {
  attempts: number;
  message: string;
  incorrectItems: string[];
  resolution: string[];
  registerFailure: (firstHint: string, secondHint?: string, details?: { incorrectItems?: string[]; resolution?: string[] }) => void;
  reset: () => void;
}

export function learningSupportMessage(attempts: number, firstHint: string, secondHint?: string) {
  return attempts === 1
    ? `Diese Lösung trägt noch nicht vollständig. ${firstHint}`
    : `Der entscheidende Hinweis: ${secondHint ?? firstHint}`;
}

export function useLearningSupport(taskKey: string): LearningSupportState {
  const empty = { key: taskKey, attempts: 0, message: "", incorrectItems: [] as string[], resolution: [] as string[] };
  const [state, setState] = useState(empty);
  const current = state.key === taskKey ? state : empty;
  return {
    attempts: current.attempts,
    message: current.message,
    incorrectItems: current.incorrectItems,
    resolution: current.resolution,
    registerFailure(firstHint, secondHint, details) {
      setState(previous => {
        const attempts = (previous.key === taskKey ? previous.attempts : 0) + 1;
        const active = typeof document === "undefined" ? null : document.activeElement;
        const attemptedItem = active instanceof HTMLElement ? active.dataset.feedbackItem : undefined;
        const attemptedResolution = active instanceof HTMLElement ? active.dataset.feedbackResolution : undefined;
        return {
          key: taskKey,
          attempts,
          message: learningSupportMessage(attempts, firstHint, secondHint),
          incorrectItems: details?.incorrectItems ?? (attemptedItem ? [attemptedItem] : previous.incorrectItems ?? []),
          resolution: details?.resolution ?? (attemptedResolution ? [attemptedResolution] : previous.resolution ?? []),
        };
      });
    },
    reset() { setState(empty); },
  };
}

export function LearningSupport({ state, onAssist }: { state: Pick<LearningSupportState, "attempts" | "message" | "incorrectItems" | "resolution">; onAssist: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealedAttempt, setRevealedAttempt] = useState(0);
  const revealed = state.attempts >= 2 && revealedAttempt === state.attempts;
  useEffect(() => {
    if (!state.attempts) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  }, [state.attempts]);
  if (!state.attempts) return null;
  return <div ref={ref} className={styles.panel} role="region" aria-label="Lösungshilfe" data-learning-support>
    <strong>{state.attempts === 1 ? "Hinweis zum ersten Versuch" : "Konkrete Lösungshilfe"}</strong>
    <span>{state.message}</span>
    {state.incorrectItems.length > 0 && <div><strong>Noch zu prüfen:</strong><ul>{state.incorrectItems.map(item => <li key={item}>{item}</li>)}</ul></div>}
    {state.attempts >= 2 && !revealed && <button type="button" onClick={() => setRevealedAttempt(state.attempts)}>Lösungshilfe anzeigen</button>}
    {revealed && <div data-support-resolution><strong>Fachliche Auflösung:</strong><ul>{(state.resolution.length ? state.resolution : [state.message]).map(item => <li key={item}>{item}</li>)}</ul><button type="button" onClick={onAssist}>Mit Unterstützung weiterarbeiten</button></div>}
  </div>;
}

export function advanceWithSupport<T extends { round: number; completed: boolean }>(session: T, finalRound: number): T {
  return {
    ...session,
    round: Math.min(finalRound, session.round + 1),
    completed: session.round >= finalRound,
  };
}
