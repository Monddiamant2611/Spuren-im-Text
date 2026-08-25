"use client";

import { useState } from "react";
import { Button } from "@/src/features/literature-archive/components/Button";
import { GlossaryTerm } from "./GlossaryTerm";
import { chapterLearningPreviews, learningCategories } from "./data/learning_content";

export function LevelPreparationModal({ chapterIndex, onStart, onClose, onOpenCards }: { chapterIndex: number; onStart: () => void; onClose?: () => void; onOpenCards: (categoryIndex: number, term?: string) => void }) {
  const [repeat, setRepeat] = useState(false);
  const preview = chapterLearningPreviews[chapterIndex];
  if (!preview) return null;
  const category = learningCategories[preview.categoryIndex];
  return <div className="epik-preparation-backdrop" role="dialog" aria-modal="true" aria-labelledby="epik-preparation-title"><section className="epik-preparation-modal">{onClose && <button type="button" className="epik-term-popover__close" aria-label="Vorbereitung schließen" onClick={onClose}>×</button>}<p className="learning-card__label">Bereich {chapterIndex + 1} · {preview.chapterTitle}</p><h2 id="epik-preparation-title">Begriffe kurz wiederholen</h2><p>{repeat ? "Wählen Sie einen Begriff, um Definition, Beispiel und Abgrenzung anzusehen." : `Diese Kernbegriffe aus „${category.title}“ helfen Ihnen beim nächsten Lernweg.`}</p><div className="epik-preparation-terms">{preview.termIds.map((term) => repeat ? <GlossaryTerm key={term} term={term} onOpenCards={onOpenCards}/> : <span key={term}>{term}</span>)}</div><div className="epik-preparation-actions">{!repeat && <Button variant="secondary" onClick={() => setRepeat(true)}>Begriffe wiederholen</Button>}<Button autoFocus onClick={onStart}>Direkt starten</Button><Button variant="secondary" onClick={() => onOpenCards(preview.categoryIndex)}>Zur passenden Lernkartei</Button></div></section></div>;
}
