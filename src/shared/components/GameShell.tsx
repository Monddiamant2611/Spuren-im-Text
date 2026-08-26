"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AudioManager } from "../../core/audio/AudioManager";
import { deriveTheatreState, isChapterUnlocked } from "../../core/progress/progress";
import { mergeMeasuredCompetencies, mergeReplayCompetencies } from "../../core/progress/competency";
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
import { AssetImage } from "./AssetImage";
import { ChapterCompletion } from "./ChapterCompletion";
import { ReviewWorkspace } from "../../games/dramatik/review/ReviewWorkspace";
import { reviewTargetById } from "../../games/dramatik/review/reviewRegistry";

type Overlay = "options" | "sources" | "regiebuch" | "chapter" | null;

export function GameShell() {
  const [screen, setScreen] = useState<"start" | "theatre" | "chapter_01" | "chapter_02" | "chapter_03" | "chapter_04" | "chapter_05" | "finale">("start");
  const [state, setState] = useState<GameState>(initialGameState);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [focusArea, setFocusArea] = useState("desk");
  const [hydrated, setHydrated] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const [reviewTargetId,setReviewTargetId]=useState<string|null>(null);
  const audio = useRef<AudioManager | null>(null);

  useEffect(() => {
    audio.current = new AudioManager();
    const timer = window.setTimeout(() => { const params=new URLSearchParams(window.location.search);if(params.get("review")==="1"){const direct=params.get("step");const chapter=params.get("chapter");const round=params.get("round");const legacy=chapter&&round?`chapter_0${Number(chapter)}-round-${Number(round)}`:null;setReviewTargetId(reviewTargetById(direct??legacy??"theatre-initial").id)}setState(loadGameState()); setHydrated(true); }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => { const warn = () => setStorageWarning(true); window.addEventListener("lernwerkstatt:storage-error", warn); return () => window.removeEventListener("lernwerkstatt:storage-error", warn); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [screen]);

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
    const competencies = mergeChapterCompetencies(state, "chapter_01", session.competencyEvents, ["text_structure", "stage_direction", "speaker_assignment", "scene_orientation", "information_state"]);
    persist({ ...state, currentChapter: "chapter_02", completedChapters: [...new Set([...state.completedChapters, "chapter_01"])], decisions: { ...state.decisions, chapter_01: session }, failedAttempts: { ...state.failedAttempts, chapter_01: session.failedAttempts }, competencies, theatreState: "AFTER_CHAPTER_1" });
  };
  const saveChapter02 = (session: Chapter02Session) => persist({ ...state, currentChapter: "chapter_02", decisions: { ...state.decisions, chapter_02: session }, failedAttempts: { ...state.failedAttempts, chapter_02: session.failedAttempts } });
  const completeChapter02 = (session: Chapter02Session) => {
    const competencies = mergeChapterCompetencies(state, "chapter_02", session.competencyEvents, ["character_relationships", "direct_characterization", "indirect_characterization", "motivation", "conflict_analysis", "character_development", "knowledge_state_analysis", "evidence_reasoning"]);
    persist({ ...state, currentChapter: "chapter_03", completedChapters: [...new Set([...state.completedChapters, "chapter_02"])], decisions: { ...state.decisions, chapter_02: session }, failedAttempts: { ...state.failedAttempts, chapter_02: session.failedAttempts }, competencies });
  };
  const saveChapter03 = (session: Chapter03Session) => persist({ ...state, currentChapter: "chapter_03", decisions: { ...state.decisions, chapter_03: session }, failedAttempts: { ...state.failedAttempts, chapter_03: session.failedAttempts } });
  const completeChapter03 = (session: Chapter03Session) => {
    const competencies = mergeChapterCompetencies(state, "chapter_03", session.competencyEvents, ["situation_analysis", "context_analysis", "cause_effect", "causal_reasoning", "knowledge_state_analysis", "evidence_reasoning", "relevance_selection", "unsupported_claim_detection"]);
    persist({ ...state, currentChapter: "chapter_04", completedChapters: [...new Set([...state.completedChapters, "chapter_03"])], decisions: { ...state.decisions, chapter_03: session }, failedAttempts: { ...state.failedAttempts, chapter_03: session.failedAttempts }, competencies });
  };
  const saveChapter04 = (session: Chapter04Session) => persist({ ...state, currentChapter: "chapter_04", decisions: { ...state.decisions, chapter_04: session }, stagingDecisions: { ...state.stagingDecisions, chapter_04: session.stagingDecisions }, failedAttempts: { ...state.failedAttempts, chapter_04: session.failedAttempts } });
  const completeChapter04 = (session: Chapter04Session) => {
    const competencies = mergeChapterCompetencies(state, "chapter_04", session.competencyEvents, ["conflict_analysis","causal_reasoning","action_analysis","turning_point","evidence_reasoning","internal_conflict","transfer_analysis"]);
    persist({ ...state, currentChapter: "chapter_05", completedChapters: [...new Set([...state.completedChapters, "chapter_04"])], decisions: { ...state.decisions, chapter_04: session }, stagingDecisions: { ...state.stagingDecisions, chapter_04: session.stagingDecisions }, failedAttempts: { ...state.failedAttempts, chapter_04: session.failedAttempts }, competencies });
  };
  const saveChapter05 = (session: Chapter05Session) => persist({ ...state, currentChapter: "chapter_05", decisions: { ...state.decisions, chapter_05: session }, failedAttempts: { ...state.failedAttempts, chapter_05: session.failedAttempts } });
  const completeChapter05 = (session: Chapter05Session) => {
    const competencies = mergeChapterCompetencies(state, "chapter_05", session.competencyEvents, ["interpretation_reasoning","hypothesis_building","evidence_reasoning","relevance_reasoning","counterevidence","argumentation","transfer_analysis"]);
    persist({ ...state, currentChapter: "finale", completedChapters: [...new Set([...state.completedChapters, "chapter_05"])], decisions: { ...state.decisions, chapter_05: session }, failedAttempts: { ...state.failedAttempts, chapter_05: session.failedAttempts }, competencies });
  };
  const updateFinale = (patch: Partial<GameState>) => {
    const snapshot = createFinaleSnapshot(state);
    const completed = patch.finaleCompleted === true;
    persist({ ...state, ...snapshot, ...patch, currentChapter: "finale", progress: { ...state.progress, finale_ready: true, ...(completed ? { finale_completed: true, game_completed: true } : {}) } });
  };
  const renderWithStatus = (content: ReactNode) => <>{storageWarning && <div className="storage-warning" role="status">Der Spielstand kann momentan nicht dauerhaft gespeichert werden. Sie können in dieser Sitzung weiterarbeiten.</div>}{content}{screen.startsWith("chapter_")&&state.completedChapters.includes(screen)&&<ChapterCompletion chapterId={screen} onExit={()=>setScreen("theatre")}/>}</>;

  if (!hydrated) return renderWithStatus(<main className="loading-screen" aria-label="Spiel wird geladen"><span>Das Theater öffnet …</span></main>);
  if(reviewTargetId)return <ReviewWorkspace initialTargetId={reviewTargetId} onDisable={()=>{const url=new URL(window.location.href);url.search="";window.history.replaceState({},"",url);setReviewTargetId(null);setScreen("theatre")}}/>;
  if (screen === "chapter_01") return renderWithStatus(<Chapter01 gameState={state} onSave={saveChapter01} onExit={() => setScreen("theatre")} onComplete={completeChapter01} />);
  if (screen === "chapter_02") return renderWithStatus(<Chapter02 gameState={state} onSave={saveChapter02} onExit={() => setScreen("theatre")} onComplete={completeChapter02} />);
  if (screen === "chapter_03") return renderWithStatus(<Chapter03 gameState={state} onSave={saveChapter03} onExit={() => setScreen("theatre")} onComplete={completeChapter03} />);
  if (screen === "chapter_04") return renderWithStatus(<Chapter04 gameState={state} onSave={saveChapter04} onExit={() => setScreen("theatre")} onComplete={completeChapter04} />);
  if (screen === "chapter_05") return renderWithStatus(<Chapter05 gameState={state} onSave={saveChapter05} onExit={() => setScreen("theatre")} onComplete={completeChapter05} />);
  if (screen === "finale") return renderWithStatus(<Finale state={state} onUpdate={updateFinale} onExit={() => setScreen("theatre")} />);
  if (screen === "start") return renderWithStatus(<StartScreen saved={state.currentGame !== null} onBegin={begin} onResume={resume} onBook={() => setScreen("finale")} onOverlay={setOverlay} overlay={overlay} state={state} onSettings={updateSettings} onReset={reset} />);

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
          <AssetImage id="bg_theatre_main" className="asset-backdrop theatre-main-background" loading="eager" decorative/>
          {theatreAreas.map((area) => {
            const unlocked = isChapterUnlocked(area.chapterId, state.completedChapters);
            const completed = state.completedChapters.includes(area.chapterId);
            if (!unlocked) return null;
            const status = completed ? "abgeschlossen" : "verfügbar";
            return <button key={area.id} className={`theatre-access theatre-access-${area.id} ${focusArea === area.id ? "focused-area" : ""} ${completed ? "completed" : "current"}`} data-status={status} onFocus={() => setFocusArea(area.id)} onMouseEnter={() => setFocusArea(area.id)} onClick={() => openChapter(area.chapterId)} aria-label={`Kapitel ${Number(area.chapterId.slice(-2))} öffnen: ${area.title} · ${area.label}: ${status}`}><AssetImage id={area.assetId} className="theatre-access-image" decorative fallback={<span className="theatre-access-fallback">{area.label}</span>}/><span className="theatre-access-label"><small>Kapitel {Number(area.chapterId.slice(-2))}</small><strong>{area.title}</strong><em>{completed ? "Abgeschlossen" : "Jetzt betreten"}</em></span></button>;
          })}
          {isFinaleAvailable(state) && <button className="finale-entry" onClick={() => openChapter("finale")} aria-label="Finale: Die letzte Probe betreten"><span aria-hidden="true">◆</span><strong>Das Finale</strong><small>Die letzte Probe</small></button>}
        </div>
        <nav className="mobile-theatre-nav" aria-label="Theaterbereiche">
          {theatreAreas.map((area) => {
            const unlocked = isChapterUnlocked(area.chapterId, state.completedChapters);
            const completed = state.completedChapters.includes(area.chapterId);
            return <button key={area.id} disabled={!unlocked} aria-current={focusArea === area.id ? "location" : undefined} onFocus={() => setFocusArea(area.id)} onClick={() => { setFocusArea(area.id); openChapter(area.chapterId); }}><span aria-hidden="true">{area.symbol}</span><strong>{area.label}</strong><small>{completed ? "Abgeschlossen" : unlocked ? "Betreten" : "Gesperrt"}</small></button>;
          })}
          {isFinaleAvailable(state) && <button className="mobile-finale-entry" onClick={() => openChapter("finale")}><span aria-hidden="true">◆</span><strong>Das Finale</strong><small>Die letzte Probe</small></button>}
        </nav>
      </section>
      <div className="feedback-bar" role="status"><span aria-hidden="true">◆</span> Das Theater befindet sich im Zustand <strong>{state.theatreState.replaceAll("_", " ")}</strong>.</div>
      {storageWarning && <div className="storage-warning" role="status">Der Spielstand kann momentan nicht dauerhaft gespeichert werden. Sie können in dieser Sitzung weiterarbeiten.</div>}
      {overlay && <OverlayPanel type={overlay} chapter={chapter} state={state} onClose={() => setOverlay(null)} onSettings={updateSettings} onReset={reset} />}
    </main>
  );
}

function StartScreen({ saved, onBegin, onResume, onBook, onOverlay, overlay, state, onSettings, onReset }: { saved: boolean; onBegin: () => void; onResume: () => void; onBook: () => void; onOverlay: (value: Overlay) => void; overlay: Overlay; state: GameState; onSettings: (value: Partial<GameSettings>) => void; onReset: () => void }) {
  return <main className={`start-screen ${state.settings.reducedMotion ? "reduce-motion" : ""}`}><AssetImage id="bg_theatre_main" className="start-background" loading="eager" decorative/><div className="start-shade" aria-hidden="true"/><div className="start-frame"><div className="start-ornament" aria-hidden="true">◆</div><p className="eyebrow">Lernwerkstatt · Dramatik</p><h1>DIE LETZTE<br/>AUFFÜHRUNG</h1><p className="subtitle">Das verlorene Regiebuch</p><p className="intro">Die Vorstellung steht kurz bevor.<br/>Doch das Regiebuch ist beschädigt, das Ensemble ungeordnet und die Bühne noch nicht bereit.<br/>Bringen Sie das Theater wieder zum Leben.</p><div className="start-actions"><button className="primary-action" onClick={onBegin}>Spiel beginnen</button>{saved && <button onClick={onResume}>Fortsetzen</button>}{state.gameCompleted && <button onClick={onBook}>Regiebuch ansehen</button>}<button onClick={() => onOverlay("options")}>Optionen</button><button onClick={() => onOverlay("sources")}>Textgrundlage &amp; Quellen</button></div></div>{overlay && <OverlayPanel type={overlay} state={state} onClose={() => onOverlay(null)} onSettings={onSettings} onReset={onReset} />}</main>;
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
    panelRef.current?.scrollTo({ top: 0, behavior: "auto" });
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
  return <div className="overlay-backdrop" role="presentation" onKeyDown={handleKeyDown} onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section ref={panelRef} className="overlay-panel" role="dialog" aria-modal="true" aria-labelledby="overlay-title"><button ref={closeRef} className="close-button" onClick={onClose} aria-label="Fenster schließen">×</button>{type === "chapter" && <><p className="overlay-kicker">Kapitel</p><h2 id="overlay-title">{chapter?.id === "finale" ? "Finale" : `Kapitel ${Number(chapter?.id.slice(-2))}`} – {chapter?.title}</h2></>}{type === "sources" && <><p className="overlay-kicker">Textgrundlage &amp; Quellen</p><h2 id="overlay-title">{dramatikSource.author}<br/><cite>„{dramatikSource.work}“</cite></h2><dl><dt>Deutsche Textgrundlage</dt><dd>Übersetzung von {dramatikSource.translation}</dd><dt>Primärtextgrundlage</dt><dd>{dramatikSource.primaryTextBasis}</dd></dl><p>Literarische Primärtexte werden in diesem Spiel wortgetreu aus der im Projekt hinterlegten Wieland-Ausgabe übernommen. Didaktische Erläuterungen und Interpretationen werden davon deutlich getrennt.</p></>}{type === "options" && <><p className="overlay-kicker">Einstellungen</p><h2 id="overlay-title">Optionen</h2><div className="settings"><Toggle label="Musik" checked={state.settings.music} onChange={(music) => onSettings({ music })}/><Toggle label="Soundeffekte" checked={state.settings.soundEffects} onChange={(soundEffects) => onSettings({ soundEffects })}/><Toggle label="Bewegungen reduzieren" checked={state.settings.reducedMotion} onChange={(reducedMotion) => onSettings({ reducedMotion })}/></div><button className="danger-button" onClick={onReset}>Spielstand zurücksetzen</button></>}{type === "regiebuch" && <><p className="overlay-kicker">Zentrales Regiebuch</p><h2 id="overlay-title">Das verlorene Regiebuch</h2><div className="book-grid"><section><h3>Kapitelübersicht</h3><ol>{dramatikGame.chapters.slice(0,5).map((item) => <li key={item.id}>{item.title}<span>{state.completedChapters.includes(item.id) ? "Abgeschlossen" : "Noch ohne Eintrag"}</span></li>)}</ol></section><section><h3>Lernweg</h3><p className="placeholder-note">Das vollständige Regiebuch mit Kompetenzübersicht und Deutung öffnet sich nach der letzten Probe.</p></section></div></>}</section></div>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) { return <label className="toggle"><span>{label}</span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)}/><span className="switch" aria-hidden="true"/></label>; }

function mergeChapterCompetencies(state: GameState, chapterId: string, events: readonly { competency: string; success: boolean }[], competencyIds: readonly string[]) {
  return state.completedChapters.includes(chapterId)
    ? mergeReplayCompetencies(state.competencies, events, competencyIds)
    : mergeMeasuredCompetencies(state.competencies, events, competencyIds);
}
