"use client";

import { useState, useSyncExternalStore } from "react";
import { AppShell } from "@/src/features/literature-archive/components/AppShell";
import { Button } from "@/src/features/literature-archive/components/Button";
import { Card } from "@/src/features/literature-archive/components/Card";
import { Chapter01Path } from "./Chapter01Path";
import { Chapter02Path } from "./Chapter02Path";
import { Chapter03Path } from "./Chapter03Path";
import { Chapter04Path } from "./Chapter04Path";
import { Chapter05Path } from "./Chapter05Path";
import { Chapter06Path } from "./Chapter06Path";
import { Chapter07Path } from "./Chapter07Path";
import { Chapter08Path } from "./Chapter08Path";
import { Chapter09Path } from "./Chapter09Path";
import { FinalCasePath } from "./FinalCasePath";
import { LearningCards } from "./LearningCards";
import { EpikIntro } from "./EpikIntro";
import { LevelPreparationModal } from "./LevelPreparationModal";
import { epikAreas, epikDemoTexts } from "./data/game";
import { chapterLearningPreviews } from "./data/learning_content";
import { completeEpikChapter, markEpikIntroSeen, resetEpikProgress, useCompletedEpikChapterCount, useEpikIntroSeen } from "./epik-progress";

export function EpikWorkshop() {
  const [areaId, setAreaId] = useState(epikAreas[0].id);
  const completedChapterCount = useCompletedEpikChapterCount();
  const unlockedAreas = Math.min(10, completedChapterCount + 1);
  const [confirmReset, setConfirmReset] = useState(false);
  const [helpLevel, setHelpLevel] = useState(0);
  const [textId, setTextId] = useState(epikDemoTexts[0].id);
  const [perspectiveAnswer, setPerspectiveAnswer] = useState<string>();
  const [evidenceAnswer, setEvidenceAnswer] = useState<string>();
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewStep, setReviewStep] = useState(0);
  const [pendingChapter, setPendingChapter] = useState<number | undefined>(0);
  const [manualPreparation, setManualPreparation] = useState(false);
  const [learningCardCategory, setLearningCardCategory] = useState<number>();
  const [introOpen, setIntroOpen] = useState(false);
  const introSeen = useEpikIntroSeen();
  const reviewMode = useSyncExternalStore(() => () => undefined, () => process.env.NODE_ENV !== "production" && new URLSearchParams(window.location.search).get("__epik_test") === "1", () => false);
  const clientReady = useSyncExternalStore(() => () => undefined, () => true, () => false);
  const area = epikAreas.find((item) => item.id === areaId) ?? epikAreas[0];
  const isFinalCase = areaId === "final-case";
  const isLearningCards = areaId === "learning-cards";
  const demoText = epikDemoTexts.find((item) => item.id === textId) ?? epikDemoTexts[0];

  const activeIndex = epikAreas.findIndex((item) => item.id === area.id);
  function handleAreaCompletion(event: React.MouseEvent<HTMLElement>) {
    const button = (event.target as HTMLElement).closest("button");
    if (button?.textContent?.includes("Bereich abschließen") && activeIndex >= 0 && !reviewMode) completeEpikChapter(activeIndex + 1);
    const next = button?.dataset.epikNext;
    if (!next) return;
    if (!reviewMode && activeIndex >= 0) completeEpikChapter(activeIndex + 1);
    if (!reviewMode && next !== "workshop" && next !== "final-case") {
      setPendingChapter(Number(next) - 1);
      setManualPreparation(false);
    } else setAreaId(next === "workshop" ? epikAreas[0].id : next === "final-case" ? next : epikAreas[Number(next) - 1]?.id ?? epikAreas[0].id);
    setHelpLevel(0);
  }
  function reviewNavigate(id: string, step = 0) { setAreaId(id); setReviewStep(step); setHelpLevel(0); setReviewOpen(false); setPendingChapter(undefined); setManualPreparation(false); }
  function prepareChapter(index: number, manual = false) { setPendingChapter(index); setManualPreparation(manual); }
  function startPreparedChapter() { if (pendingChapter === undefined) return; setAreaId(epikAreas[pendingChapter].id); setPendingChapter(undefined); setManualPreparation(false); setHelpLevel(0); }
  function openPreparedCards(categoryIndex: number, term?: string) { setLearningCardCategory(categoryIndex); if (term) window.sessionStorage.setItem("epik.learningFocus", term); else window.sessionStorage.removeItem("epik.learningFocus"); setAreaId("learning-cards"); }

  if (!clientReady) return <AppShell><div className="epik-entry-loading" aria-hidden="true" /></AppShell>;
  if (!reviewMode && (introOpen || !introSeen)) return <AppShell><EpikIntro onEnter={() => { markEpikIntroSeen(); setIntroOpen(false); }}/></AppShell>;

  return <AppShell><section className="epik-workshop" aria-labelledby="epik-title">
    <header className="epik-header"><p className="archive-kicker">Digitale Lernwerkstatt</p><h1 id="epik-title">Analysewerkstatt Epik</h1><p>Erleben → Entdecken → Erkennen → Benennen → Belegen → Analysieren → Abwägen → Deuten → selbst formulieren</p></header>
    {reviewMode && <aside className="epik-review-tools"><Button variant="secondary" aria-expanded={reviewOpen} onClick={() => setReviewOpen((value) => !value)}>Prüfmodus · Bereich wechseln</Button>{reviewOpen && <Card><strong>Nur Navigation – der Lernfortschritt bleibt unverändert.</strong><div className="epik-review-menu"><button type="button" onClick={() => reviewNavigate("learning-cards")}>Lernkartei</button>{epikAreas.map((item, index) => <section key={item.id}><button type="button" onClick={() => reviewNavigate(item.id)}>Bereich {index + 1} · {item.title}</button><div className="epik-review-steps" aria-label={`Lernschritte Bereich ${index + 1}`}>{[0, 1, 2, 3, 4].map((step) => <button type="button" key={step} onClick={() => reviewNavigate(item.id, step)}>Schritt {step + 1}</button>)}</div></section>)}<button type="button" onClick={() => reviewNavigate("final-case")}>Abschlussfall</button></div></Card>}</aside>}

    <nav className="epik-area-nav" aria-label="Neun Analysebereiche">
      <button className={isLearningCards ? "is-active" : ""} aria-current={isLearningCards ? "page" : undefined} onClick={() => { setPendingChapter(undefined); setLearningCardCategory(undefined); setAreaId("learning-cards"); }}><span>↗</span>Lernkartei</button>
      {(reviewMode ? epikAreas : epikAreas.slice(0, unlockedAreas)).map((item, index) => <button key={item.id} className={!isFinalCase && !isLearningCards && item.id === area.id ? "is-active" : ""} aria-current={!isFinalCase && !isLearningCards && item.id === area.id ? "page" : undefined} onClick={() => { if (reviewMode) reviewNavigate(item.id); else prepareChapter(index); }}><span>{index + 1}</span>{item.title}</button>)}
      {(reviewMode || unlockedAreas > 9) && <button className={isFinalCase ? "is-active epik-final-nav" : "epik-final-nav"} aria-current={isFinalCase ? "page" : undefined} onClick={() => setAreaId("final-case")}><span>✓</span>Abschlussfall</button>}
    </nav>
    {!reviewMode && unlockedAreas <= 9 && <p className="epik-unlock-note">Weitere Analysebereiche werden nach und nach freigeschaltet.</p>}

    <div className="epik-toolbar"><Button variant="secondary" onClick={() => setIntroOpen(true)}>So funktioniert das Spiel</Button>{!isLearningCards && <><Button variant="secondary" onClick={() => { setPendingChapter(undefined); setLearningCardCategory(activeIndex >= 0 ? chapterLearningPreviews[activeIndex].categoryIndex : undefined); setAreaId("learning-cards"); }}>Zur Lernkartei</Button>{activeIndex >= 0 && <Button variant="secondary" onClick={() => prepareChapter(activeIndex, true)}>Begriffe wiederholen</Button>}<Button variant="secondary" onClick={() => setHelpLevel((value) => Math.min(2, value + 1))}>{helpLevel ? "Weiterer Tipp" : "Tipp"}</Button></>}</div>
    {helpLevel > 0 && !isLearningCards && <Card className="epik-help" role="status"><strong>Tipp {helpLevel}</strong><p>{helpLevel === 1 ? "Lesen Sie zuerst die Aufgabenstellung und suchen Sie dann das passende konkrete Textmerkmal." : "Trennen Sie sichere Beobachtung, Fachbegriff und mögliche Wirkung. Prüfen Sie anschließend, welche Antwort alle drei Ebenen verbindet."}</p><Button variant="secondary" onClick={() => setAreaId("learning-cards")}>In der Lernkartei nachsehen</Button></Card>}

    {isLearningCards ? <LearningCards key={learningCardCategory ?? "all"} initialCategory={learningCardCategory} returnLabel={pendingChapter === undefined ? "Zur Werkstatt" : `Zurück zu Bereich ${pendingChapter + 1}`} onReturn={() => { setAreaId(epikAreas[pendingChapter ?? 0].id); }}/> : <div onClick={handleAreaCompletion}>{isFinalCase ? <FinalCasePath onReturn={() => setAreaId(epikAreas[0].id)}/> : area.id === "erzaehlen" ? <Chapter01Path key={`${area.id}-${reviewStep}`} initialStep={reviewMode ? reviewStep : 0}/> : area.id === "perspektive" ? <Chapter02Path key={`${area.id}-${reviewStep}`} initialStep={reviewMode ? reviewStep : 0}/> : area.id === "naehe" ? <Chapter03Path key={`${area.id}-${reviewStep}`} initialStep={reviewMode ? reviewStep : 0}/> : area.id === "rede" ? <Chapter04Path key={`${area.id}-${reviewStep}`} initialStep={reviewMode ? reviewStep : 0}/> : area.id === "zeit" ? <Chapter05Path key={`${area.id}-${reviewStep}`} initialStep={reviewMode ? reviewStep : 0}/> : area.id === "figuren" ? <Chapter06Path key={`${area.id}-${reviewStep}`} initialStep={reviewMode ? reviewStep : 0}/> : area.id === "raum" ? <Chapter07Path key={`${area.id}-${reviewStep}`} initialStep={reviewMode ? reviewStep : 0}/> : area.id === "konflikt" ? <Chapter08Path key={`${area.id}-${reviewStep}`} initialStep={reviewMode ? reviewStep : 0}/> : area.id === "interpretation" ? <Chapter09Path key={`${area.id}-${reviewStep}`} initialStep={reviewMode ? reviewStep : 0}/> : <><div className="epik-layout">
      <Card className="epik-focus-card"><p className="learning-card__label">Bereich {epikAreas.indexOf(area) + 1} von 9</p><h2>{area.title}</h2><p className="epik-question">{area.question}</p><p>{area.focus}</p><div className="epik-terms" aria-label="Zentrale Fachbegriffe">{area.terms.map((term) => <span key={term}>{term}</span>)}</div></Card>
      <Card className="epik-text-card">
        <label htmlFor="demo-text">Übungstext auswählen</label>
        <select id="demo-text" value={textId} onChange={(event) => { setTextId(event.target.value); setPerspectiveAnswer(undefined); setEvidenceAnswer(undefined); }}>{epikDemoTexts.map((text) => <option key={text.id} value={text.id}>{text.title} · {text.setting}</option>)}</select>
        <h2>{demoText.title}</h2><blockquote>{demoText.text}</blockquote><p className="epik-focus-links">Demo-Fokus: {demoText.focusAreaIds.map((id) => epikAreas.find((item) => item.id === id)?.title).join(" · ")}</p>
      </Card>
    </div>

    <section className="epik-demo-tasks" aria-labelledby="demo-tasks-title"><h2 id="demo-tasks-title">Zwei technische Demo-Aufgaben</h2><div className="epik-layout">
      <Card><p className="learning-card__label">Demo 1 · Wahrnehmung erkennen</p><h3>Welche Aussage beschreibt die Fährenszene am genauesten?</h3>{["Die Kapitänin erklärt sicher, dass keine Gefahr besteht.", "Die Szene ist auf Leanders unsichere Wahrnehmung begrenzt.", "Der Erzähler kennt und erläutert alle Gedanken der Figuren."].map((answer) => <Button key={answer} variant="secondary" onClick={() => setPerspectiveAnswer(answer)}>{answer}</Button>)}{perspectiveAnswer && <p role="status" className={perspectiveAnswer.startsWith("Die Szene") ? "epik-feedback is-correct" : "epik-feedback is-incorrect"}>{perspectiveAnswer.startsWith("Die Szene") ? "Treffend: Die Frage und Leanders Vermutung zeigen die begrenzte, subjektive Wahrnehmung." : "Noch nicht: Der Text bestätigt weder Sicherheit noch vollständiges Erzählerwissen."}</p>}</Card>
      <Card><p className="learning-card__label">Demo 2 · Beleg auswählen</p><h3>Welcher Beleg stützt Leanders Unsicherheit am stärksten?</h3>{["„umklammerte Leander die nasse Reling“", "„Ein beruhigendes Zeichen?“", "„Am anderen Ende des Decks“"].map((answer) => <Button key={answer} variant="secondary" onClick={() => setEvidenceAnswer(answer)}>{answer}</Button>)}{evidenceAnswer && <p role="status" className={evidenceAnswer.includes("Zeichen") ? "epik-feedback is-correct" : "epik-feedback is-incorrect"}>{evidenceAnswer.includes("Zeichen") ? "Starker Beleg: Die Frageform macht die Unsicherheit seiner Deutung unmittelbar sichtbar." : "Plausible Beobachtung, aber kein ebenso genauer Beleg für die Unsicherheit der Deutung."}</p>}</Card>
    </div></section></>}</div>}
    {clientReady && pendingChapter !== undefined && !isLearningCards && (!reviewMode || manualPreparation) && <LevelPreparationModal chapterIndex={pendingChapter} onStart={startPreparedChapter} onClose={manualPreparation ? () => { setPendingChapter(undefined); setManualPreparation(false); } : undefined} onOpenCards={openPreparedCards}/>} 
    <aside className="epik-progress-reset" aria-label="Gespeicherter Lernfortschritt"><p>Der Lernfortschritt wird ausschließlich auf diesem Gerät im Browser gespeichert.</p>{!confirmReset ? <Button variant="secondary" onClick={() => setConfirmReset(true)}>Lernfortschritt zurücksetzen</Button> : <div role="alert"><p><strong>Möchten Sie den gespeicherten Lernfortschritt wirklich zurücksetzen?</strong></p><p>Alle Analysebereiche werden wieder gesperrt. Die Lernkartei bleibt verfügbar.</p><div className="epik-toolbar"><Button variant="secondary" onClick={() => setConfirmReset(false)}>Abbrechen</Button><Button onClick={() => { resetEpikProgress(); setAreaId(epikAreas[0].id); setPendingChapter(0); setConfirmReset(false); }}>Fortschritt zurücksetzen</Button></div></div>}</aside>
  </section></AppShell>;
}
