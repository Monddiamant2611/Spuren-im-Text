"use client";

import { useState } from "react";
import type { GameState } from "../../../core/state/types";
import { generalRehearsalSource, fixedStageDirections } from "../data/chapter_04/scene_source";
import { argumentBlocks } from "../data/chapter_05/argument_chain";
import { analysisResults } from "../data/chapter_05/evidence_selection";
import { performanceSequence, finaleTitle } from "../data/finale/performance";
import { chapterReview } from "../data/finale/regiebuch";
import { dramatikSource } from "../data/sources";
import { aggregateVisibleCompetencies, findDevelopmentArea, findDistinctStrength, visibleCompetencies } from "../mechanics/competency_aggregation";
import { resolveFinalStaging } from "../mechanics/finale_state";

type Mode = "title" | "performance" | "curtain" | "book";

export function Finale({ state, onStart, onComplete, onExit }: { state: GameState; onStart: () => void; onComplete: () => void; onExit: () => void }) {
  const [mode, setMode] = useState<Mode>(state.finaleCompleted ? "book" : state.performanceState === "PERFORMANCE_RUNNING" ? "performance" : "title");
  const [index, setIndex] = useState(0);
  const [replay, setReplay] = useState(false);
  const staging = resolveFinalStaging(state);
  const step = performanceSequence[index];
  const source = step ? generalRehearsalSource.find((item) => item.id === step.sourceId) : undefined;
  const begin = () => { if (!replay) onStart(); setIndex(0); setMode("performance"); };
  const next = () => index < performanceSequence.length - 1 ? setIndex(index + 1) : setMode("curtain");
  const openBook = () => { setMode("book"); if (!replay && !state.finaleCompleted) onComplete(); };
  const replayPerformance = () => { setReplay(true); setIndex(0); setMode("title"); };

  if (mode === "title") return <main className={`finale-title ${state.settings.reducedMotion ? "reduce-motion" : ""}`}><div className="auditorium" aria-hidden="true"/><div className="closed-curtain" aria-hidden="true"/><section><p>Finale</p><h1>{finaleTitle.title}</h1><h2>{finaleTitle.subtitle}</h2><button onClick={begin} aria-label={replay ? "Aufführung erneut beginnen" : "Aufführung beginnen"}>{replay ? "Erneut ansehen" : "Vorhang auf"}</button></section></main>;

  if (mode === "performance") return <main className={`performance-screen focus-${step.focus} ${state.settings.reducedMotion ? "reduce-motion" : ""}`}><header><span>Die letzte Aufführung</span><button onClick={onExit}>Aufführung verlassen</button></header><section className="performance-stage" aria-label="Theateraufführung"><div className="performance-light"/><figure className={`performance-figure paris ${staging.paris_position?.value.includes("hinter") ? "behind" : ""}`}><span>P</span><figcaption>Paris</figcaption></figure><figure className={`performance-figure romeo ${staging.figure_distance?.value.includes("groß") || staging.figure_distance?.value.includes("größer") ? "far" : ""}`}><span>R</span><figcaption>Romeo</figcaption></figure><div className="performance-tomb">Gruft · Kirchhof</div></section><article className={`performance-text ${source?.fragment_type === "stage_direction" ? "stage-direction" : "speech"}`} aria-live="polite"><small>{source?.fragment_type === "stage_direction" ? "Originaltext · Regieanweisung" : `Originaltext · ${source?.speaker}`}</small><p>{source?.text}</p></article><footer><span>Abschnitt {index + 1} von {performanceSequence.length}</span><button onClick={next}>{index === performanceSequence.length - 1 ? "Vorhang schließen" : "Weiter"}</button></footer></main>;

  if (mode === "curtain") return <main className="performance-curtain"><div className="closed-curtain"/><section><p>Die Aufführung endet mit dem freigegebenen Textabschnitt.</p><button onClick={openBook}>Restauriertes Regiebuch öffnen</button></section></main>;
  return <RestoredBook state={state} onReplay={replayPerformance} onExit={onExit}/>;
}

function RestoredBook({ state, onReplay, onExit }: { state: GameState; onReplay: () => void; onExit: () => void }) {
  const results = aggregateVisibleCompetencies(state);
  const strength = findDistinctStrength(results);
  const development = findDevelopmentArea(results);
  const staging = resolveFinalStaging(state);
  const chapter05 = state.decisions.chapter_05 as { relevanceAssignments?: Record<string, string>; argumentOrder?: string[] } | undefined;
  const relevant = analysisResults.filter((item) => chapter05?.relevanceAssignments?.[item.id] === "high_relevance").slice(0, 3);
  return <main className="restored-book"><nav className="book-actions" aria-label="Regiebuch-Aktionen"><button onClick={onExit}>Zum Startbildschirm</button><button onClick={() => window.print()}>Regiebuch drucken</button><button onClick={onReplay} aria-label="Aufführung erneut ansehen">Aufführung erneut ansehen</button></nav><header><p>Das restaurierte Regiebuch</p><h1>Die letzte Aufführung</h1></header><section className="book-pages chapter-review"><h2>Kapitelübersicht</h2>{chapterReview.map((item, chapterIndex) => <article key={item.id}><small>Kapitel {chapterIndex + 1}</small><h3>{item.title}</h3><p>Schwerpunkt: {item.focus}</p></article>)}</section><section className="book-pages competency-review"><h2>Kompetenzübersicht</h2>{visibleCompetencies.map((definition) => { const result = results[definition.id]; return <article key={definition.id}><h3>{definition.label}</h3><strong>{levelLabels[result.level]}</strong><p>{result.feedback}</p>{strength === definition.id && <mark>Besondere Stärke</mark>}{development === definition.id && <small>Entwicklungshinweis: Nutzen Sie die Rückmeldung dieses Bereichs bei der nächsten Analyse.</small>}</article>; })}</section><section className="book-pages own-interpretation"><p className="book-origin interpretation">Ihre Deutung</p><h2>Deutungshypothese</h2><blockquote>{state.finalHypothesis}</blockquote><h3>Zentrale Analyseergebnisse</h3><ul>{relevant.map((item) => <li key={item.id}>{item.text}</li>)}</ul><h3>Argumentationsstruktur</h3><ol>{(chapter05?.argumentOrder ?? []).map((id) => <li key={id}>{argumentBlocks.find((block) => block.id === id)?.text}</li>)}</ol></section><section className="book-pages own-staging"><p className="book-origin staging">Ihre Inszenierung</p><h2>Endgültige Regieentscheidungen</h2><dl>{Object.values(staging).map((decision) => <div key={decision.id}><dt>{dimensionLabels[decision.dimension] ?? decision.dimension}</dt><dd>{decision.value}<small>{decision.reasoningId}</small></dd></div>)}</dl>{Boolean(state.stagingDecisions.chapter_05_revision) && <p>Eine Entscheidung wurde in der Deutungsprobe revidiert.</p>}<div className="fixed-source"><p className="book-origin original">Originaltext · feste Regieanweisungen</p>{fixedStageDirections.map((item) => <span key={item.id}>{item.text}</span>)}</div></section><footer className="book-source"><h2>Textgrundlage</h2><p>{dramatikSource.author}<br/><cite>„{dramatikSource.work}“</cite><br/>Übersetzung von {dramatikSource.translation}</p><p>Digitale Textgrundlage: <a href={dramatikSource.referenceUrl}>{dramatikSource.referenceLabel}</a></p></footer></main>;
}

const levelLabels = { developing: "Noch unsicher", progressing: "Auf dem Weg", secure: "Sicher", advanced: "Sehr sicher" } as const;
const dimensionLabels: Record<string, string> = { character_position: "Bühnenposition", distance: "Distanz", facing: "Blickrichtung", movement: "Bewegung", lighting: "Licht", pause: "Pause", speech_attitude: "Sprechhaltung" };
