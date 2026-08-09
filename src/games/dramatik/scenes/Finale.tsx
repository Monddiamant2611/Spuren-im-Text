"use client";

import { useEffect, useState } from "react";
import type { GameState } from "../../../core/state/types";
import { AssetBackdrop, AssetImage } from "../../../shared/components/AssetImage";
import { generalRehearsalSource, fixedStageDirections } from "../data/chapter_04/scene_source";
import { argumentBlocks } from "../data/chapter_05/argument_chain";
import { analysisResults } from "../data/chapter_05/evidence_selection";
import { performanceSequence, finaleTitle } from "../data/finale/performance";
import { chapterReview } from "../data/finale/regiebuch";
import { dramatikSource } from "../data/sources";
import { stagingOptions } from "../data/chapter_04/staging_options";
import { aggregateVisibleCompetencies, findDevelopmentArea, findDistinctStrength, visibleCompetencies } from "../mechanics/competency_aggregation";
import { isActualStagingRevision, resolveFinalStaging } from "../mechanics/finale_state";

type Mode = "title" | "performance" | "curtain" | "book";

export function Finale({ state, onStart, onProgress, onComplete, onExit }: { state: GameState; onStart: () => void; onProgress: (moment: number) => void; onComplete: () => void; onExit: () => void }) {
  const [mode, setMode] = useState<Mode>(state.finaleCompleted ? "book" : state.performanceState === "PERFORMANCE_RUNNING" ? "performance" : "title");
  const [index, setIndex] = useState(Math.min(state.currentPerformanceMoment, performanceSequence.length - 1));
  const [replay, setReplay] = useState(false);
  const staging = resolveFinalStaging(state);
  const step = performanceSequence[index];
  const source = step ? generalRehearsalSource.find((item) => item.id === step.sourceId) : undefined;
  const begin = () => { if (!replay) onStart(); setIndex(0); setPauseReady(true); setMode("performance"); };
  const next = () => { if(index < performanceSequence.length - 1){const nextIndex=index+1;setIndex(nextIndex);setPauseReady(nextIndex!==performanceSequence.length-2||state.settings.reducedMotion||performancePauseMs(pause)===0);if(!replay)onProgress(nextIndex)}else setMode("curtain"); };
  const openBook = () => { setMode("book"); if (!replay && !state.finaleCompleted) onComplete(); };
  const replayPerformance = () => { setReplay(true); setIndex(0); setMode("title"); };
  const distance=valueClass(staging.figure_distance?.value,{"große Distanz":"distance-large","mittlere Distanz":"distance-medium","geringe Distanz":"distance-close"},"distance-large");
  const lighting=valueClass(staging.stage_lighting?.value,{"gleichmäßiges Bühnenlicht":"light-even","enger Fokus":"light-focus","schwaches düsteres Licht":"light-dim"},"light-even");
  const movement=valueClass(staging.figure_movement?.value,{"statisch":"movement-static","langsame Annäherung":"movement-slow","abrupte Bewegung":"movement-abrupt"},"movement-static");
  const facing=valueClass(staging.romeo_facing?.value,{"direkter Blickkontakt":"facing-paris","Blick zur Gruft":"facing-tomb","ausweichender Blick":"facing-away"},"facing-tomb");
  const attitude=staging.romeo_attitude?.value??"kontrolliert";
  const pause=staging.pre_fight_pause?.value??"unmittelbar sprechen";
  const [pauseReady, setPauseReady] = useState(()=>index!==performanceSequence.length-2||state.settings.reducedMotion||performancePauseMs(pause)===0);
  const movementActive=index>=2;
  const pauseApplies=index===performanceSequence.length-2;
  useEffect(()=>{if(mode!=="performance"||!pauseApplies||pauseReady)return;const timer=window.setTimeout(()=>setPauseReady(true),performancePauseMs(pause));return()=>window.clearTimeout(timer)},[mode,pause,pauseApplies,pauseReady]);
  const romeoAsset=index>=5||attitude==="aggressiv"?"character_romeo_angry":attitude==="angespannt"?"character_romeo_thoughtful":"character_romeo_calm";
  const parisAsset=index<2?"character_paris_thoughtful":index<4?"character_paris_calm":"character_paris_angry";

  if (mode === "title") return <main className={`finale-title ${state.settings.reducedMotion ? "reduce-motion" : ""}`}><AssetBackdrop id="bg_finale_restored"/><div className="auditorium" aria-hidden="true"/><div className="closed-curtain" aria-hidden="true"/><section><p>Finale</p><h1>{finaleTitle.title}</h1><h2>{finaleTitle.subtitle}</h2><button onClick={begin} aria-label={replay ? "Aufführung erneut beginnen" : "Aufführung beginnen"}>{replay ? "Erneut ansehen" : "Vorhang auf"}</button></section></main>;

  if (mode === "performance") return <main className={`performance-screen focus-${step.focus} ${state.settings.reducedMotion ? "reduce-motion" : ""}`} data-performance-moment={index}><header><span>Die letzte Aufführung · {step.moment}</span><button onClick={onExit}>Aufführung verlassen</button></header><section className={`performance-stage ${distance} ${lighting} ${movementActive?movement:""}`} aria-label="Theateraufführung" data-distance={staging.figure_distance?.value??"große Distanz"} data-lighting={staging.stage_lighting?.value??"gleichmäßiges Bühnenlicht"} data-movement={staging.figure_movement?.value??"statisch"}><AssetBackdrop id="bg_finale_restored"/><div className="performance-light"/><figure className="performance-figure paris"><AssetImage id={parisAsset} className="character-image" fallback={<span>P</span>}/><figcaption><strong>Paris</strong><small>{index<2?"beobachtend":index<4?"kontrolliert":"konfrontativ"}</small></figcaption></figure><figure className={`performance-figure romeo ${facing}`}><AssetImage id={romeoAsset} className="character-image" fallback={<span>R</span>}/><figcaption><strong>Romeo</strong><small>{attitude}</small><small>{staging.romeo_facing?.value??"Blick zur Gruft"}</small></figcaption></figure><div className="performance-tomb">Gruft · Kirchhof</div>{pauseApplies&&!pauseReady&&<div className="performance-pause" role="status">{pause}</div>}</section><article className={`performance-text ${source?.fragment_type === "stage_direction" ? "stage-direction" : "speech"}`} aria-live="polite"><small>{source?.fragment_type === "stage_direction" ? "Originaltext · Regieanweisung" : `Originaltext · ${source?.speaker}`}</small><p>{source?.text}</p></article><footer><span>Abschnitt {index + 1} von {performanceSequence.length}</span><button onClick={next} disabled={!pauseReady}>{!pauseReady?"Pause …":index === performanceSequence.length - 1 ? "Vorhang schließen" : "Weiter"}</button></footer></main>;

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
  return <main className="restored-book"><nav className="book-actions" aria-label="Regiebuch-Aktionen"><button onClick={onExit}>Zum Startbildschirm</button><button onClick={() => window.print()}>Regiebuch drucken</button><button onClick={onReplay} aria-label="Aufführung erneut ansehen">Aufführung erneut ansehen</button></nav><header><p>Das restaurierte Regiebuch</p><h1>Die letzte Aufführung</h1></header><section className="book-pages chapter-review"><h2>Kapitelübersicht</h2>{chapterReview.map((item, chapterIndex) => <article key={item.id}><small>Kapitel {chapterIndex + 1}</small><h3>{item.title}</h3><p>Schwerpunkt: {item.focus}</p></article>)}</section><section className="book-pages competency-review"><h2>Kompetenzübersicht</h2>{visibleCompetencies.map((definition) => { const result = results[definition.id]; return <article key={definition.id}><h3>{definition.label}</h3><strong>{levelLabels[result.level]}</strong><p>{result.feedback}</p>{strength === definition.id && <mark>Besondere Stärke</mark>}{development === definition.id && <small>Entwicklungshinweis: Nutzen Sie die Rückmeldung dieses Bereichs bei der nächsten Analyse.</small>}</article>; })}</section><section className="book-pages own-interpretation"><p className="book-origin interpretation">Ihre Deutung</p><h2>Deutungshypothese</h2><blockquote>{state.finalHypothesis}</blockquote><h3>Zentrale Analyseergebnisse</h3><ul>{relevant.map((item) => <li key={item.id}>{item.text}</li>)}</ul><h3>Argumentationsstruktur</h3><ol>{(chapter05?.argumentOrder ?? []).map((id) => <li key={id}>{argumentBlocks.find((block) => block.id === id)?.text}</li>)}</ol></section><section className="book-pages own-staging"><p className="book-origin staging">Ihre Inszenierung</p><h2>Endgültige Regieentscheidungen</h2><dl>{Object.values(staging).map((decision) => <div key={decision.id}><dt>{dimensionLabels[decision.dimension] ?? decision.dimension}</dt><dd>{decision.value}<small>{reasoningLabel(decision.id,decision.reasoningId)}</small></dd></div>)}</dl>{isActualStagingRevision(state) && <p>Eine Entscheidung wurde in der Deutungsprobe revidiert.</p>}<div className="fixed-source"><p className="book-origin original">Originaltext · feste Regieanweisungen</p>{fixedStageDirections.map((item) => <span key={item.id}>{item.text}</span>)}</div></section><footer className="book-source"><h2>Textgrundlage</h2><p>{dramatikSource.author}<br/><cite>„{dramatikSource.work}“</cite><br/>Übersetzung von {dramatikSource.translation}</p><p>Digitale Textgrundlage: <a href={dramatikSource.referenceUrl}>{dramatikSource.referenceLabel}</a></p></footer></main>;
}

export function performancePauseMs(value:string){return value.includes("längere")?1400:value.includes("kurze")?600:0}
function valueClass(value:string|undefined,values:Record<string,string>,fallback:string){return value?values[value]??fallback:fallback}
function reasoningLabel(decisionId:string,reasoningId:string){return stagingOptions.find(option=>option.id===decisionId)?.reasoning_options.find(reason=>reason.id===reasoningId)?.label??"Textgebundene Begründung"}

const levelLabels = { developing: "Noch unsicher", progressing: "Auf dem Weg", secure: "Sicher", advanced: "Sehr sicher" } as const;
const dimensionLabels: Record<string, string> = { character_position: "Bühnenposition", distance: "Distanz", facing: "Blickrichtung", movement: "Bewegung", lighting: "Licht", pause: "Pause", speech_attitude: "Sprechhaltung" };
