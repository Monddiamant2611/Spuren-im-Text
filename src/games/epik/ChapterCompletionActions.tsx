"use client";

import { Button } from "@/src/features/literature-archive/components/Button";

const competencies: Readonly<Record<number, readonly string[]>> = {
  1: ["Varianten eines Geschehens vergleichen.", "Autor, Erzählinstanz und Figur auf getrennten Ebenen bestimmen."],
  2: ["Erzählform, Beteiligung und Erzählverhalten getrennt bestimmen.", "Informationsbegrenzung mit einem Textbeleg nachweisen."],
  3: ["Innen- und Außensicht unterscheiden.", "Subjektive Wahrnehmung und Figurennähe getrennt begründen."],
  4: ["Rede- und Gedankenformen an sprachlichen Signalen erkennen.", "Erlebte Rede und inneren Monolog unterscheiden."],
  5: ["Ordnung, Dauer und Frequenz getrennt untersuchen.", "Zeitgestaltung mit einem konkreten Signal belegen."],
  6: ["Ziel, Motiv und Wert unterscheiden.", "Figurenentwicklung über einen Verlauf belegen."],
  7: ["Raumfunktion aus Zugang, Handlung und Beziehung erklären.", "Eine mögliche Symbolik vorsichtig weiterführend prüfen."],
  8: ["Problem, Bedrohung und Konflikt unterscheiden.", "Reaktion, Entscheidung und sichere Konsequenz trennen."],
  9: ["Beobachtung, Beleg, Analyse, Wirkung und Deutung verbinden.", "Überinterpretationen an fehlenden Textstützen erkennen."],
};

export function ChapterCompletionActions({ chapter, onRepeat }: { chapter: number; onRepeat: () => void }) {
  const final = chapter === 9;
  return <><section className="epik-competencies" aria-labelledby={`epik-competencies-${chapter}`}><h3 id={`epik-competencies-${chapter}`}>Das können Sie jetzt</h3><ul>{competencies[chapter].map((item) => <li key={item}>{item}</li>)}</ul></section><div className="epik-completion-actions">
    <Button data-epik-next={final ? "final-case" : String(chapter + 1)}>{final ? "Zum Abschlussfall" : `Weiter zu Bereich ${chapter + 1}`}</Button>
    <Button variant="secondary" onClick={onRepeat}>Mit anderen Texten wiederholen</Button>
    <Button variant="secondary" data-epik-next="workshop">Zur Werkstatt</Button>
  </div></>;
}
