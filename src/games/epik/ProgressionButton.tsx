"use client";

import { useState, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { Button } from "@/src/features/literature-archive/components/Button";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: "primary" | "secondary" };

const hints: Record<string, string> = {
  "Erzählen verstehen": "Prüfen Sie, welche Beobachtungen tatsächlich im Text stehen und welche erst eine Deutung sind.",
  "Erzählinstanz": "Trennen Sie Erzählform, Beteiligung und Wissensumfang und prüfen Sie den konkreten Textbeleg.",
  "Nähe": "Unterscheiden Sie Informationszugang, subjektive Wahrnehmung und den Grad der Figurennähe.",
  "Rede- und Gedankenformen": "Die Form passt noch nicht zu jedem sprachlichen Signal. Prüfen Sie Person, Redeeinleitung und Vermittlungsgrad.",
  "Zeitgestaltung": "Prüfen Sie, ob hier die Reihenfolge, die Dauer oder die Häufigkeit des Erzählens untersucht wird.",
  "Figurenanalyse": "Unterscheiden Sie Beobachtung, Ziel, Motiv und Wert.",
  "Raumanalyse": "Der Textbefund allein beweist noch keine symbolische Bedeutung.",
  "Handlung und Konflikt": "Trennen Sie Bedrohung, Reaktion, Entscheidung und sichere Folge.",
  "Interpretation": "Prüfen Sie zuerst den konkreten Textbeleg und anschließend die daraus ableitbare Wirkung.",
  "Abschlussfall": "Prüfen Sie jede Entscheidung an den konkreten Textbefunden; offene Deutungen bleiben möglich.",
};

let continuingDespiteErrors = false;
export function isContinuingDespiteErrors() { return continuingDespiteErrors; }

export function ProgressionButton({ disabled: blocked, onClick, children, variant, ...props }: Props) {
  const [review, setReview] = useState<{ missing: boolean; details: string[]; hint: string }>();
  const label = String(children);
  const isProgression = blocked !== undefined && variant !== "secondary";
  if (!isProgression) return <Button disabled={blocked} onClick={onClick} variant={variant} {...props}>{children}</Button>;

  function inspect(event: MouseEvent<HTMLButtonElement>) {
    const path = event.currentTarget.closest(".epik-path");
    const scope = event.currentTarget.closest(".epik-task") ?? path;
    const choices = Array.from(scope?.querySelectorAll(".epik-choice") ?? []);
    const binaryRows = Array.from(scope?.querySelectorAll("div") ?? []).filter((row) => row.querySelectorAll(':scope > button[aria-pressed]').length === 2);
    const missing = choices.some((choice) => !choice.querySelector(".is-selected")) || binaryRows.some((row) => !row.querySelector(':scope > button[aria-pressed="true"]'));
    const details = choices.flatMap((choice) => {
      const selected = choice.querySelector(".is-selected");
      const feedback = choice.querySelector("small")?.textContent?.trim();
      return selected && feedback && !/^(Richtig|✓)/.test(feedback) ? [`${choice.querySelector("legend")?.textContent?.trim() ?? "Teilaufgabe"}: ${feedback}`] : [];
    }).concat(binaryRows.flatMap((row) => {
      const feedback = row.querySelector("small")?.textContent?.trim();
      return row.querySelector(':scope > button[aria-pressed="true"]') && feedback && !/^(Richtig|✓|Fachlich differenziert)/.test(feedback) ? [`${row.querySelector("p")?.textContent?.trim() ?? "Aussage"}: ${feedback}`] : [];
    }));
    const chapter = path?.querySelector(".learning-card__label")?.textContent ?? "";
    const hint = Object.entries(hints).find(([name]) => chapter.includes(name))?.[1] ?? "Prüfen Sie die markierten Teilaufgaben anhand des Textes.";
    setReview({ missing, details, hint });
  }

  function continueAnyway(event: MouseEvent<HTMLButtonElement>) {
    continuingDespiteErrors = true;
    try { onClick?.(event); } finally { continuingDespiteErrors = false; }
  }

  return <div className="epik-progression-check">
    <Button {...props} onClick={blocked ? inspect : onClick} variant={variant}>{children}</Button>
    {review && blocked && <div className="epik-feedback is-incorrect" role="status">
      <p>{review.missing ? "Noch nicht alle Teilaufgaben wurden beantwortet." : "Einige Antworten passen noch nicht vollständig."} {review.hint}</p>
      {review.details.length > 0 && <ul>{review.details.map((detail, index) => <li key={`${index}-${detail}`}>{detail}</li>)}</ul>}
      <div className="epik-toolbar"><Button variant="secondary" onClick={() => setReview(undefined)}>{review.details.length > 0 ? "Antworten überarbeiten" : review.missing ? "Antworten ergänzen" : "Antworten überarbeiten"}</Button><Button variant="secondary" onClick={continueAnyway}>{label.includes("Bereich abschließen") ? "Bereich trotzdem abschließen" : label.includes("Fall abschließen") ? "Fall trotzdem abschließen" : "Trotzdem weiter"}</Button></div>
    </div>}
  </div>;
}
