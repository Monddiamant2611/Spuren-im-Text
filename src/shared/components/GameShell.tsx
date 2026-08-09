"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AudioManager } from "../../core/audio/AudioManager";
import { deriveTheatreState, isChapterUnlocked } from "../../core/progress/progress";
import { mergeMeasuredCompetencies } from "../../core/progress/competency";
import { createNewGameState, loadGameState, resetGameState, saveGameState } from "../../core/state/store";
import { initialGameState, type GameSettings, type GameState } from "../../core/state/types";
import { dramatikGame } from "../../games/dramatik/data/chapters";
import { dramatikSource } from "../../games/dramatik/data/sources";
import { progressMarks, theatreAreas } from "../../games/dramatik/data/theatre";
import { Chapter01 } from "../../games/dramatik/scenes/Chapter01";
import type { Chapter01Session } from "../../games/dramatik/mechanics/chapter_01_engine";
import { Chapter02 } from "../../games/dramatik/scenes/Chapter02";
import type { Chapter02Session } from "../../games/dramatik/mechanics/chapter_02_engine";
import { Chapter03 } from "../../games/dramatik/scenes/Chapter03";
import type { Chapter03Session } from "../../games/dramatik/mechanics/chapter_03_engine";
import { Chapter04 } from "../../games/dramatik/scenes/Chapter04";
import type { Chapter04Session } from "../../games/dramatik/mechanics/chapter_04_engine";
import { Chapter05 } from "../../games/dramatik/scenes/Chapter05";
import type { Chapter05Session } from "../../games/dramatik/mechanics/chapter_05_engine";
import { Finale } from "../../games/dramatik/scenes/Finale";
import { createFinaleSnapshot, isFinaleAvailable } from "../../games/dramatik/mechanics/finale_state";
import { AssetBackdrop } from "./AssetImage";

type Overlay = "options" | "sources" | "regiebuch" | "chapter" | null;

export function GameShell() {
  const [screen, setScreen] = useState<"start" | "theatre" | "chapter_01" | "chapter_02" | "chapter_03" | "chapter_04" | "chapter_05" | "finale">("start");
  const [state, setState] = useState<GameState>(initialGameState);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [focusArea, setFocusArea] = useState("desk");
  const [hydrated, setHydrated] = useState(false);
  const audio = useRef<AudioManager | null>(null);

  useEffect(() => {
    audio.current = new AudioManager();
    const timer = window.setTimeout(() => { setState(loadGameState()); setHydrated(true); }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const persist = (next: GameState) => {
    const performanceState = next.performanceState === "PERFORMANCE_RUNNING" || next.performanceState === "PERFORMANCE_COMPLETE" ? next.performanceState : undefined;
    const withTheatre = { ...next, theatreState: deriveTheatreState(next.completedChapters, next.performanceState === "FINALE_READY" || next.progress.finale_ready, performanceState) };
    const stored = saveGameState(withTheatre); setState(stored);
  };

  const begin = () => { if (state.currentGame && !window.confirm("Soll ein neues Spiel begonnen und der vorhandene Spielstand ersetzt werden?")) return; persist(createNewGameState()); setScreen("theatre"); };
  const resume = () => {
    const loaded = loadGameState(); setState(loaded);
    if (loaded.currentChapter === "chapter_01" && !loaded.completedChapters.includes("chapter_01")) setScreen("chapter_01");
    else if (loaded.currentChapter === "chapter_02" && !loaded.completedChapters.includes("chapter_02")) setScreen("chapter_02");
    else if (loaded.currentChapter === "chapter_03" && !loaded.completedChapters.includes("chapter_03")) setScreen("chapter_03");
    else if (loaded.currentChapter === "chapter_04" && !loaded.completedChapters.includes("chapter_04")) setScreen("chapter_04");
    else if (loaded.currentChapter === "chapter_05" && !loaded.completedChapters.includes("chapter_05")) setScreen("chapter_05");
    else if (loaded.currentChapter === "finale" && isFinaleAvailable(loaded)) setScreen("finale");
    else setScreen("theatre");
  };
  const openChapter = (chapterId: string) => {
    if (!isChapterUnlocked(chapterId, state.completedChapters)) return;
    if (chapterId === "chapter_01") { persist({ ...state, currentChapter: chapterId }); setScreen("chapter_01"); return; }
    if (chapterId === "chapter_02") { persist({ ...state, currentChapter: chapterId }); setScreen("chapter_02"); return; }
    if (chapterId === "chapter_03") { persist({ ...state, currentChapter: chapterId }); setScreen("chapter_03"); return; }
    if (chapterId === "chapter_04") { persist({ ...state, currentChapter: chapterId }); setScreen("chapter_04"); return; }
    if (chapterId === "chapter_05") { persist({ ...state, currentChapter: chapterId }); setScreen("chapter_05"); return; }
    if (chapterId === "finale" && isFinaleAvailable(state)) { persist({ ...state, currentChapter: chapterId }); setScreen("finale"); return; }
    setSelectedChapter(chapterId); setOverlay("chapter"); persist({ ...state, currentChapter: chapterId });
  };
  const updateSettings = (patch: Partial<GameSettings>) => {
    const settings = { ...state.settings, ...patch };
    audio.current?.setMusicEnabled(settings.music); audio.current?.setEffectsEnabled(settings.soundEffects);
    persist({ ...state, settings });
  };
  const reset = () => {
    if (!window.confirm("Soll der lokale Spielstand wirklich zurückgesetzt werden?")) return;
    resetGameState(); setState(structuredClone(initialGameState)); setOverlay(null); setScreen("start");
  };
  const chapter = useMemo(() => dramatikGame.chapters.find((item) => item.id === selectedChapter), [selectedChapter]);

  const saveChapter01 = (session: Chapter01Session) => persist({ ...state, currentChapter: "chapter_01", decisions: { ...state.decisions, chapter_01: session }, failedAttempts: { ...state.failedAttempts, chapter_01: session.failedAttempts } });
  const completeChapter01 = (session: Chapter01Session) => {
    const competencies = mergeMeasuredCompetencies(state.competencies, session.competencyEvents, ["text_structure", "stage_direction", "speaker_assignment", "scene_orientation", "information_state"]);
    persist({ ...state, currentChapter: "chapter_02", completedChapters: [...new Set([...state.completedChapters, "chapter_01"])], decisions: { ...state.decisions, chapter_01: session }, failedAttempts: { ...state.failedAttempts, chapter_01: session.failedAttempts }, competencies, theatreState: "AFTER_CHAPTER_1" });
  };
  const saveChapter02 = (session: Chapter02Session) => persist({ ...state, currentChapter: "chapter_02", decisions: { ...state.decisions, chapter_02: session }, failedAttempts: { ...state.failedAttempts, chapter_02: session.failedAttempts } });
  const completeChapter02 = (session: Chapter02Session) => {
    const competencies = mergeMeasuredCompetencies(state.competencies, session.competencyEvents, ["character_relationships", "direct_characterization", "indirect_characterization", "motivation", "conflict_analysis", "character_development", "knowledge_state_analysis", "evidence_reasoning"]);
    persist({ ...state, currentChapter: "chapter_03", completedChapters: [...new Set([...state.completedChapters, "chapter_02"])], decisions: { ...state.decisions, chapter_02: session }, failedAttempts: { ...state.failedAttempts, chapter_02: session.failedAttempts }, competencies });
  };
  const saveChapter03 = (session: Chapter03Session) => persist({ ...state, currentChapter: "chapter_03", decisions: { ...state.decisions, chapter_03: session }, failedAttempts: { ...state.failedAttempts, chapter_03: session.failedAttempts } });
  const completeChapter03 = (session: Chapter03Session) => {
    const competencies = mergeMeasuredCompetencies(state.competencies, session.competencyEvents, ["situation_analysis", "context_analysis", "cause_effect", "causal_reasoning", "knowledge_state_analysis", "evidence_reasoning", "relevance_selection", "unsupported_claim_detection"]);
    persist({ ...state, currentChapter: "chapter_04", completedChapters: [...new Set([...state.completedChapters, "chapter_03"])], decisions: { ...state.decisions, chapter_03: session }, failedAttempts: { ...state.failedAttempts, chapter_03: session.failedAttempts }, competencies });
  };
  const saveChapter04 = (session: Chapter04Session) => persist({ ...state, currentChapter: "chapter_04", decisions: { ...state.decisions, chapter_04: session }, stagingDecisions: { ...state.stagingDecisions, chapter_04: session.stagingDecisions }, failedAttempts: { ...state.failedAttempts, chapter_04: session.failedAttempts } });
  const completeChapter04 = (session: Chapter04Session) => {
    const competencies = mergeMeasuredCompetencies(state.competencies, session.competencyEvents, ["dialogue_analysis","conversation_goals","speech_acts","conversation_development","conflict_analysis","language_analysis","nonverbal_analysis","staging_reasoning","evidence_reasoning","perspective_analysis"]);
    persist({ ...state, currentChapter: "chapter_05", completedChapters: [...new Set([...state.completedChapters, "chapter_04"])], decisions: { ...state.decisions, chapter_04: session }, stagingDecisions: { ...state.stagingDecisions, chapter_04: session.stagingDecisions }, failedAttempts: { ...state.failedAttempts, chapter_04: session.failedAttempts }, competencies });
  };
  const saveChapter05 = (session: Chapter05Session) => persist({ ...state, currentChapter: "chapter_05", decisions: { ...state.decisions, chapter_05: session }, failedAttempts: { ...state.failedAttempts, chapter_05: session.failedAttempts } });
  const completeChapter05 = (session: Chapter05Session) => {
    const competencies = mergeMeasuredCompetencies(state.competencies, session.competencyEvents, ["relevance_selection","interpretation","evidence_reasoning","hypothesis_testing","claim_validation","argument_structure","critical_revision","staging_reasoning"]);
    const stagingDecisions = session.stagingRevision ? { ...state.stagingDecisions, chapter_05_revision: session.stagingRevision } : state.stagingDecisions;
    persist({ ...state, currentChapter: "finale", completedChapters: [...new Set([...state.completedChapters, "chapter_05"])], decisions: { ...state.decisions, chapter_05: session }, failedAttempts: { ...state.failedAttempts, chapter_05: session.failedAttempts }, competencies, stagingDecisions });
  };
  const startFinale = () => {
    const snapshot = createFinaleSnapshot(state);
    persist({ ...state, ...snapshot, currentChapter: "finale", finaleStarted: true, performanceState: "PERFORMANCE_RUNNING", currentPerformanceMoment: 0, progress: { ...state.progress, finale_ready: true } });
  };
  const savePerformanceMoment = (currentPerformanceMoment: number) => persist({ ...state, currentChapter: "finale", finaleStarted: true, performanceState: "PERFORMANCE_RUNNING", currentPerformanceMoment });
  const completeFinale = () => {
    const snapshot = createFinaleSnapshot(state);
    persist({ ...state, ...snapshot, currentChapter: "finale", finaleStarted: true, finaleCompleted: true, gameCompleted: true, performanceState: "PERFORMANCE_COMPLETE", progress: { ...state.progress, finale_ready: true, finale_completed: true, game_completed: true } });
  };

  if (!hydrated) return <main className="loading-screen" aria-label="Spiel wird geladen"><span>Das Theater öffnet …</span></main>;
  if (screen === "chapter_01") return <Chapter01 gameState={state} onSave={saveChapter01} onExit={() => setScreen("theatre")} onComplete={completeChapter01} />;
  if (screen === "chapter_02") return <Chapter02 gameState={state} onSave={saveChapter02} onExit={() => setScreen("theatre")} onComplete={completeChapter02} />;
  if (screen === "chapter_03") return <Chapter03 gameState={state} onSave={saveChapter03} onExit={() => setScreen("theatre")} onComplete={completeChapter03} />;
  if (screen === "chapter_04") return <Chapter04 gameState={state} onSave={saveChapter04} onExit={() => setScreen("theatre")} onComplete={completeChapter04} />;
  if (screen === "chapter_05") return <Chapter05 gameState={state} onSave={saveChapter05} onExit={() => setScreen("theatre")} onComplete={completeChapter05} />;
  if (screen === "finale") return <Finale state={state} onStart={startFinale} onProgress={savePerformanceMoment} onComplete={completeFinale} onExit={() => setScreen("start")} />;
  if (screen === "start") return <StartScreen saved={state.currentGame !== null} onBegin={begin} onResume={resume} onBook={() => setScreen("finale")} onOverlay={setOverlay} overlay={overlay} state={state} onSettings={updateSettings} onReset={reset} />;

  return (
    <main className={`game-shell theatre-${state.theatreState.toLowerCase()} ${state.settings.reducedMotion ? "reduce-motion" : ""}`}>
      <header className="game-header">
        <button className="brand-button" onClick={() => setScreen("start")} aria-label="Spiel unterbrechen und zum Startbildschirm zurückkehren"><span>Die letzte Aufführung</span><small>Das verlorene Regiebuch</small></button>
        <ProgressIndicator completed={state.completedChapters} />
        <nav className="utility-nav" aria-label="Spielmenü">
          <button onClick={() => setOverlay("regiebuch")}>Regiebuch</button>
          <button onClick={() => setOverlay("sources")}>Quellen</button>
          <button onClick={() => setOverlay("options")}>Optionen</button>
        </nav>
      </header>
      <section className="theatre-wrap" aria-label="Interaktive Theaterübersicht">
        <div className="theatre-scene" data-state={state.theatreState}>
          <AssetBackdrop id="bg_theatre_entrance"/>
          <div className="proscenium" aria-hidden="true"><span className="arch arch-left"/><span className="arch arch-right"/></div>
          <div className="curtain curtain-left" aria-hidden="true"/><div className="curtain curtain-right" aria-hidden="true"/>
          <div className="stage-light" aria-hidden="true"/><div className="stage-floor" aria-hidden="true"/>
          {theatreAreas.map((area) => {
            const unlocked = isChapterUnlocked(area.chapterId, state.completedChapters);
            const completed = state.completedChapters.includes(area.chapterId);
            return <button key={area.id} className={`hotspot hotspot-${area.id} ${focusArea === area.id ? "focused-area" : ""}`} disabled={!unlocked} onFocus={() => setFocusArea(area.id)} onMouseEnter={() => setFocusArea(area.id)} onClick={() => openChapter(area.chapterId)} aria-label={`${area.label}: ${completed ? "abgeschlossen" : unlocked ? "verfügbar" : "gesperrt"}`}><span className="hotspot-symbol" aria-hidden="true">{area.symbol}</span><strong>{area.label}</strong><small>{completed ? "Abgeschlossen" : unlocked ? "Betreten" : "Gesperrt"}</small></button>;
          })}
          {isFinaleAvailable(state) && <button className="finale-entry" onClick={() => openChapter("finale")} aria-label="Finale: Die letzte Aufführung betreten"><span aria-hidden="true">◆</span><strong>Die letzte Aufführung</strong><small>Vorhang öffnen</small></button>}
          <div className="scene-caption" aria-live="polite"><span>Im Fokus</span><strong>{theatreAreas.find((area) => area.id === focusArea)?.label}</strong></div>
        </div>
        <nav className="mobile-theatre-nav" aria-label="Theaterbereiche">
          {theatreAreas.map((area) => {
            const unlocked = isChapterUnlocked(area.chapterId, state.completedChapters);
            const completed = state.completedChapters.includes(area.chapterId);
            return <button key={area.id} disabled={!unlocked} aria-current={focusArea === area.id ? "location" : undefined} onFocus={() => setFocusArea(area.id)} onClick={() => { setFocusArea(area.id); openChapter(area.chapterId); }}><span aria-hidden="true">{area.symbol}</span><strong>{area.label}</strong><small>{completed ? "Abgeschlossen" : unlocked ? "Betreten" : "Gesperrt"}</small></button>;
          })}
          {isFinaleAvailable(state) && <button className="mobile-finale-entry" onClick={() => openChapter("finale")}><span aria-hidden="true">◆</span><strong>Die letzte Aufführung</strong><small>Vorhang öffnen</small></button>}
        </nav>
      </section>
      <div className="feedback-bar" role="status"><span aria-hidden="true">◆</span> Das Theater befindet sich im Zustand <strong>{state.theatreState.replaceAll("_", " ")}</strong>.</div>
      {overlay && <OverlayPanel type={overlay} chapter={chapter} state={state} onClose={() => setOverlay(null)} onSettings={updateSettings} onReset={reset} />}
    </main>
  );
}

function StartScreen({ saved, onBegin, onResume, onBook, onOverlay, overlay, state, onSettings, onReset }: { saved: boolean; onBegin: () => void; onResume: () => void; onBook: () => void; onOverlay: (value: Overlay) => void; overlay: Overlay; state: GameState; onSettings: (value: Partial<GameSettings>) => void; onReset: () => void }) {
  return <main className={`start-screen ${state.settings.reducedMotion ? "reduce-motion" : ""}`}><div className="start-frame"><div className="start-ornament" aria-hidden="true">◆</div><p className="eyebrow">Lernwerkstatt · Dramatik</p><h1>DIE LETZTE<br/>AUFFÜHRUNG</h1><p className="subtitle">Das verlorene Regiebuch</p><p className="intro">Die Vorstellung steht kurz bevor.<br/>Doch das Regiebuch ist beschädigt, das Ensemble ungeordnet und die Bühne noch nicht bereit.<br/>Bringen Sie das Theater wieder zum Leben.</p><div className="start-actions"><button className="primary-action" onClick={onBegin}>Spiel beginnen</button>{saved && <button onClick={onResume}>Fortsetzen</button>}{state.gameCompleted && <button onClick={onBook}>Regiebuch ansehen</button>}<button onClick={() => onOverlay("options")}>Optionen</button><button onClick={() => onOverlay("sources")}>Textgrundlage &amp; Quellen</button></div></div>{overlay && <OverlayPanel type={overlay} state={state} onClose={() => onOverlay(null)} onSettings={onSettings} onReset={onReset} />}</main>;
}

function ProgressIndicator({ completed }: { completed: string[] }) {
  return <ol className="progress-indicator" aria-label="Spielfortschritt">{progressMarks.map((label, index) => { const id = `chapter_0${index + 1}`; const status = completed.includes(id) ? "completed" : isChapterUnlocked(id, completed) ? "available" : "locked"; return <li key={label} className={status} aria-label={`${label}: ${status === "completed" ? "abgeschlossen" : status === "available" ? "verfügbar" : "gesperrt"}`}><span aria-hidden="true">{status === "completed" ? "◆" : status === "available" ? "◇" : "·"}</span><small>{label}</small></li>; })}</ol>;
}

function OverlayPanel({ type, chapter, state, onClose, onSettings, onReset }: { type: Exclude<Overlay, null>; chapter?: { id: string; title: string }; state: GameState; onClose: () => void; onSettings: (value: Partial<GameSettings>) => void; onReset: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(typeof document === "undefined" ? null : document.activeElement instanceof HTMLElement ? document.activeElement : null);
  useEffect(() => {
    const returnTarget = returnFocusRef.current;
    closeRef.current?.focus();
    return () => returnTarget?.focus();
  }, []);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
    if (event.key !== "Tab") return;
    const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
    if (focusable.length === 0) { event.preventDefault(); return; }
    const first = focusable[0]; const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  return <div className="overlay-backdrop" role="presentation" onKeyDown={handleKeyDown} onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section ref={panelRef} className="overlay-panel" role="dialog" aria-modal="true" aria-labelledby="overlay-title"><button ref={closeRef} className="close-button" onClick={onClose} aria-label="Fenster schließen">×</button>{type === "chapter" && <><p className="overlay-kicker">Kapitel</p><h2 id="overlay-title">{chapter?.id === "finale" ? "Finale" : `Kapitel ${Number(chapter?.id.slice(-2))}`} – {chapter?.title}</h2></>}{type === "sources" && <><p className="overlay-kicker">Textgrundlage &amp; Quellen</p><h2 id="overlay-title">{dramatikSource.author}<br/><cite>„{dramatikSource.work}“</cite></h2><dl><dt>Deutsche Textgrundlage</dt><dd>Übersetzung von {dramatikSource.translation}</dd><dt>Verbindliche digitale Referenz</dt><dd><a href={dramatikSource.referenceUrl} target="_blank" rel="noreferrer">{dramatikSource.referenceLabel}</a></dd></dl><p>Literarische Primärtexte werden in diesem Spiel wortgetreu aus der festgelegten Textgrundlage übernommen. Didaktische Erläuterungen und Interpretationen werden davon deutlich getrennt.</p></>}{type === "options" && <><p className="overlay-kicker">Einstellungen</p><h2 id="overlay-title">Optionen</h2><div className="settings"><Toggle label="Musik" checked={state.settings.music} onChange={(music) => onSettings({ music })}/><Toggle label="Soundeffekte" checked={state.settings.soundEffects} onChange={(soundEffects) => onSettings({ soundEffects })}/><Toggle label="Bewegungen reduzieren" checked={state.settings.reducedMotion} onChange={(reducedMotion) => onSettings({ reducedMotion })}/></div><button className="danger-button" onClick={onReset}>Spielstand zurücksetzen</button></>}{type === "regiebuch" && <><p className="overlay-kicker">Zentrales Regiebuch</p><h2 id="overlay-title">Das verlorene Regiebuch</h2><div className="book-grid"><section><h3>Kapitelübersicht</h3><ol>{dramatikGame.chapters.slice(0,5).map((item) => <li key={item.id}>{item.title}<span>{state.completedChapters.includes(item.id) ? "Abgeschlossen" : "Noch ohne Eintrag"}</span></li>)}</ol></section><section><h3>Lernweg</h3><p className="placeholder-note">Das vollständige Regiebuch mit Kompetenzübersicht, Deutung und Inszenierung öffnet sich nach der letzten Aufführung.</p></section></div></>}</section></div>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) { return <label className="toggle"><span>{label}</span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)}/><span className="switch" aria-hidden="true"/></label>; }
