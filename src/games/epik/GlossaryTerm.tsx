"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/src/features/literature-archive/components/Button";
import { learningCategories } from "./data/learning_content";

export function GlossaryTerm({ term, onOpenCards }: { term: string; onOpenCards?: (categoryIndex: number, term?: string) => void }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const categoryIndex = learningCategories.findIndex((category) => category.concepts.some((concept) => concept.term === term));
  const concept = categoryIndex < 0 ? undefined : learningCategories[categoryIndex].concepts.find((entry) => entry.term === term);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); triggerRef.current?.focus(); } else if (event.key === "Tab") { const controls = [...(panelRef.current?.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])') ?? [])]; if (!controls.length) return; const first = controls[0]; const last = controls.at(-1)!; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);
  if (!concept) return <strong>{term}</strong>;
  const close = () => { setOpen(false); requestAnimationFrame(() => triggerRef.current?.focus()); };
  return <><button type="button" className="epik-glossary-term" ref={triggerRef} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>{term}</button>{open && <div className="epik-term-popover" role="dialog" aria-modal="true" aria-labelledby={`term-${categoryIndex}`}><div className="epik-term-popover__panel" ref={panelRef}><button type="button" className="epik-term-popover__close" ref={closeRef} aria-label="Begriffshilfe schließen" onClick={close}>×</button><p className="learning-card__label">Fachbegriff</p><h3 id={`term-${categoryIndex}`}>{term}</h3><p><b>Kurzdefinition:</b> {concept.shortDefinition}</p><p><b>Beispiel:</b> {concept.examples[0]}</p>{concept.confusion && <p><b>Nicht verwechseln mit:</b> {concept.confusion}</p>}{onOpenCards && <Button onClick={() => { close(); onOpenCards(categoryIndex, term); }}>In der Lernkartei ansehen</Button>}</div></div>}</>;
}
