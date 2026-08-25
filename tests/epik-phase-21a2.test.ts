import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { conflictHierarchy } from "../src/games/epik/data/chapter_08";

const path = (chapter: number) => readFileSync(`src/games/epik/Chapter0${chapter}Path.tsx`, "utf8");

describe("Epik Phase 21A.2 – Transferqualität", () => {
  it("hält B1 frei von fachfremder Ein-Antwort-Pseudoauswahl", () => {
    expect(path(1)).not.toContain('options={["Erzählinstanz", "Schauplatz", "Leser", "Handlung", "Figur"]}');
  });

  it("trennt im Kajak-Transfer Form, Beteiligung, Wissen und Beleg", () => {
    const source = path(2);
    expect(source).toContain('id === "kajak"');
    expect(source).toContain('set("form"');
    expect(source).toContain('set("participation"');
    expect(source).toContain('set("certainty"');
    expect(source).toContain('set("proof"');
  });

  it("verwendet in B3 kein isoliertes Kombinationslabel", () => {
    expect(path(3)).not.toContain('answer="Kombination"');
  });

  it("prüft in B4 mehrere Formen und ordnet drei konkrete Belege zu", () => {
    const source = path(4);
    expect(source).toContain('id === "abgabe"');
    expect(source).toContain("Welche Kombination beschreibt die tatsächlich vorkommenden Formen?");
    expect(source).toContain("Welcher Textausschnitt zeigt Levents unmittelbare Selbstanweisung?");
    expect(source).not.toContain("Die Überschrift des Textes");
  });

  it("verbindet in B5 iterative Routine und singulative Ausnahme", () => {
    const source = path(5);
    expect(source).toContain('id === "nachtschicht"');
    expect(source).toContain("routine");
    expect(source).toContain("exception");
    expect(source).toContain("interplay");
  });

  it("rekonstruiert in B6 Anfang, Ereignis und Veränderung getrennt", () => {
    const source = path(6);
    for (const id of ["start", "trigger", "after", "development", "figureType", "motive", "value"]) expect(source).toContain(id);
  });

  it("verlangt in B7 eine Gewichtung von zwei Raumfunktionen", () => {
    expect(path(7)).toContain("Analyseschwerpunkte gewichten");
    expect(path(7)).toContain("weight-atmosphere");
    expect(path(7)).toContain("weight-function");
  });

  it("ordnet in B8 konkrete Konfliktmotor-Bausteine zu", () => {
    const source = path(8);
    expect(source).toContain('id === "evakuierung"');
    expect(source).toContain("Konfliktmotor von Block C rekonstruieren");
    expect(source).toContain("motor-situation");
    expect(source).toContain("noch nicht vorhanden");
    expect(conflictHierarchy.at(-1)?.items[0]).toContain("keine eigene gleichrangige Konfliktart");
  });
});
