import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = (chapter: number) => readFileSync(`src/games/epik/Chapter0${chapter}Path.tsx`, "utf8");
const transferRenderCount = (value: string) => value.split("{step === 4 &&").length - 1;

describe("Epik Phase 21A.4 – letzte Transferbereinigung", () => {
  it("B1 verwendet vollständige Vermittlungsaussagen, konkrete Weltelemente und vier gleichartige Analysen", () => {
    const value = source(1);
    expect(value).not.toContain('"Erzählinstanz", ["Erzählinstanz", "Figur", "Autor"');
    expect(value).toContain('"Hausflur", "Briefmarke", "Mobiltelefon", "Küchenfenster"');
    expect(value.match(/Eine unbeteiligte Erzählinstanz|Der reale Autor beschreibt|Die Erzählinstanz nennt/g)?.length).toBeGreaterThanOrEqual(4);
  });

  it("B2 besitzt nur einen Kajak-Transfer mit sechs einmaligen Achsen", () => {
    const value = source(2);
    expect(transferRenderCount(value)).toBe(1);
    for (const label of ["Erzählform", "beteiligt", "Erzählverhalten", "Information bleibt", "Textbefund", "Gesamtanalyse"]) expect(value).toContain(label);
    expect(value).not.toContain("Form, Beteiligung und Wissen getrennt prüfen");
  });

  it("B6 besitzt nur Idas Entwicklungskette und trennt Ziel, Motiv und Haltung", () => {
    const value = source(6);
    expect(transferRenderCount(value)).toBe(1);
    expect(value).not.toMatch(/Ziel oder Motiv|Motiv oder Wert|Ziel\/Motiv\/Wert/);
    expect(value).toContain("Anfang: Ida wartet auf Anleitung → Ereignis: Der Ausbilder fällt aus → Veränderung:");
    for (const label of ["konkrete Ziel", "Aussage zum Motiv", "Welche Haltung"]) expect(value).toContain(label);
  });

  it("B7 zeigt nur Folgeaufgaben der gewählten Schwerpunkte und erzwingt keine Symbolik", () => {
    const value = source(7);
    expect(transferRenderCount(value)).toBe(1);
    expect(value).toContain('answers["weight-atmosphere"] === true &&');
    expect(value).toContain('answers["weight-function"] === true &&');
    expect(value).toContain("Eine symbolische Deutung ist für diesen Ausschnitt nicht notwendig.");
    expect(value).not.toContain('label="Bedeutsame Raumrelation"');
  });

  it("B8 enthält den Konfliktmotor einmal und lässt Entscheidung sowie Wendepunkt fehlen", () => {
    const value = source(8);
    expect(transferRenderCount(value)).toBe(1);
    expect(value.match(/motor-figure/g)?.length).toBe(2);
    expect(value).toContain('"noch nicht vorhanden"');
    expect(value).toContain("Kein eindeutiger Wendepunkt im Ausschnitt");
    for (const id of ['set("axis"', 'set("outer-form"', 'set("content"']) expect(value).toContain(id);
    expect(value).not.toContain('label="Konflikttragende Figur"');
  });
});
