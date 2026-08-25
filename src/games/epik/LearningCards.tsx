"use client";

import { useMemo, useState } from "react";
import { Button } from "@/src/features/literature-archive/components/Button";
import { CategoryTraining, LearningFinalTest } from "./LearningTraining";
import { GlossaryTerm } from "./GlossaryTerm";
import { familiesByCategory, familyForTerm, learningCategories, type LearningFamily } from "./data/learning_content";

const roleLabel = { core: "Kern", contrast: "Vergleich", advanced: "Vertiefung", "special-case": "Spezialfall", bridge: "Brückenbegriff" } as const;
const allConcepts = learningCategories.flatMap(({ concepts }) => concepts);
const storedFocus = () => typeof window === "undefined" ? undefined : window.sessionStorage.getItem("epik.learningFocus") ?? undefined;

function FamilyCard({ family, focusedTerm, review, onMark }: { family: LearningFamily; focusedTerm?: string; review: string[]; onMark: (term: string, knew: boolean) => void }) {
  const containsFocus = family.terms.some(({ term }) => term === focusedTerm);
  const [open, setOpen] = useState(containsFocus);
  const [advancedOpen, setAdvancedOpen] = useState(containsFocus && family.terms.some(({ term, role }) => term === focusedTerm && !["core", "contrast"].includes(role)));
  const core = family.terms.filter(({ role }) => role === "core" || role === "contrast");
  const deeper = family.terms.filter(({ role }) => role !== "core" && role !== "contrast");
  return <article className={`epik-family-card${open ? " is-open" : ""}`} data-family-id={family.id}>
    <button type="button" className="epik-family-card__summary" aria-expanded={open} onClick={() => setOpen((value) => !value)}><span className="learning-card__label">Analysefrage</span><strong>{family.question}</strong><span>{family.summary}</span><small>{open ? "Lernseite schließen" : "Vergleich und Beispiele öffnen"}</small></button>
    {open && <div className="epik-family-card__body"><section><h4>Kernbegriffe im Vergleich</h4><div className="epik-family-terms">{core.map(({ term, role }) => { const concept = allConcepts.find((item) => item.term === term); return <div className={focusedTerm === term ? "is-focused" : ""} key={term}><span>{roleLabel[role]}</span><GlossaryTerm term={term}/><p><b>Kurzdefinition:</b> {concept?.shortDefinition}</p><p><b>So erkennen Sie es:</b> {concept?.recognition}</p><p><b>Beispiel:</b> {concept?.examples[0]}</p>{concept?.confusion && <p><b>Nicht verwechseln mit:</b> {concept.confusion}</p>}<div className="epik-family-rating"><Button variant="secondary" onClick={() => onMark(term, true)}>Konnte ich</Button><Button variant="secondary" onClick={() => onMark(term, false)}>{review.includes(term) ? "Weiter üben" : "Noch üben"}</Button></div></div>; })}</div></section>{family.example && <p className="epik-card-example"><b>Gemeinsames Beispiel:</b> {family.example}</p>}{family.distinction && <p><b>Nicht verwechseln:</b> {family.distinction}</p>}{deeper.length > 0 && <section className="epik-family-advanced"><Button variant="secondary" onClick={() => setAdvancedOpen((value) => !value)}>{advancedOpen ? "Vertiefung schließen" : `Vertiefung anzeigen (${deeper.length})`}</Button>{advancedOpen && <div className="epik-family-terms">{deeper.map(({ term, role }) => { const concept = allConcepts.find((item) => item.term === term); return <div className={focusedTerm === term ? "is-focused" : ""} key={term}><span>{roleLabel[role]}</span><GlossaryTerm term={term}/><p><b>Kurzdefinition:</b> {concept?.shortDefinition}</p><p><b>So erkennen Sie es:</b> {concept?.recognition}</p><p><b>Beispiel:</b> {concept?.examples[0]}</p>{concept?.confusion && <p><b>Nicht verwechseln mit:</b> {concept.confusion}</p>}</div>; })}</div>}</section>}</div>}
  </article>;
}

export function LearningCards({ initialCategory, initialTerm, onReturn, returnLabel = "Zur Werkstatt" }: { initialCategory?: number; initialTerm?: string; onReturn: () => void; returnLabel?: string }) {
  const focusTerm = initialTerm ?? storedFocus(); const initialFamily = focusTerm ? familyForTerm(focusTerm) : undefined;
  const [categoryIndex, setCategoryIndex] = useState(initialFamily ? learningCategories.findIndex(({ id }) => id === initialFamily.categoryId) : initialCategory ?? 0); const [mode, setMode] = useState<"learn" | "test" | "final">("learn"); const [focusedTerm, setFocusedTerm] = useState(focusTerm); const [review, setReview] = useState<string[]>([]);
  const category = learningCategories[categoryIndex]; const families = useMemo(() => familiesByCategory(category.id), [category.id]);
  const mark = (term: string, knew: boolean) => setReview((old) => knew ? old.filter((item) => item !== term) : [...old.filter((item) => item !== term), term]);
  return <section className="epik-learning-index" aria-labelledby="learning-index-title"><div className="epik-toolbar"><Button variant="secondary" onClick={onReturn}>{returnLabel}</Button></div><header><p className="learning-card__label">Von Anfang an verfügbar</p><h2 id="learning-index-title">Lernkartei</h2><p>{mode === "final" ? "Alle Analysebereiche gemischt" : "Von Analysefragen zu Begriffsfamilien – Kernbegriffe vergleichen und Vertiefungen gezielt öffnen"}</p></header>
    <nav className="epik-card-categories" aria-label="Kategorien der Lernkartei">{learningCategories.map(({ title }, index) => <button type="button" key={title} className={index === categoryIndex ? "is-active" : ""} onClick={() => { setCategoryIndex(index); setFocusedTerm(undefined); if (mode === "final") setMode("learn"); }}>{title}</button>)}</nav>
    <div className="epik-toolbar"><Button variant={mode === "learn" ? "primary" : "secondary"} onClick={() => setMode("learn")}>Karten lernen</Button><Button variant={mode === "test" ? "primary" : "secondary"} onClick={() => setMode("test")}>Wissen testen</Button><Button variant={mode === "final" ? "primary" : "secondary"} onClick={() => setMode("final")}>Abschlusstest</Button></div>
    {mode === "learn" ? <><p className="epik-family-count"><strong>{families.length} Begriffsfamilien</strong> statt {category.concepts.length} gleichrangiger Einzelkarten</p><div className="epik-family-grid">{families.map((item) => <FamilyCard key={item.id} family={item} focusedTerm={focusedTerm} review={review} onMark={mark}/>)}</div>{review.length > 0 && <p className="epik-help"><strong>Noch einmal ansehen:</strong> {review.join(" · ")}</p>}</> : mode === "test" ? <CategoryTraining key={categoryIndex} category={category.id} onOpenCards={() => setMode("learn")}/> : <LearningFinalTest onOpenCards={(index) => { setCategoryIndex(index); setMode("learn"); }}/>}
  </section>;
}

export const learningCardCategoryTitles = learningCategories.map(({ title }) => title);
