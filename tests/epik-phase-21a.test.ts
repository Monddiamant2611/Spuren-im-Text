import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { chapter02PracticeTexts } from "../src/games/epik/data/chapter_02";
import { chapter03PracticeTexts } from "../src/games/epik/data/chapter_03";
import { chapter05PracticeTexts } from "../src/games/epik/data/chapter_05";
import { chapter06PracticeTexts } from "../src/games/epik/data/chapter_06";

const chapter = (number: number) => readFileSync(`src/games/epik/Chapter0${number}Path.tsx`, "utf8");
const data = (number: number) => readFileSync(`src/games/epik/data/chapter_0${number}.ts`, "utf8");

describe("Epik Phase 21A – didaktische Progression", () => {
  it("hält fünf Schritte und verschiedene Transfertexte in allen Bereichen vor", () => {
    for (let number = 1; number <= 9; number += 1) {
      expect(data(number)).toMatch(/Steps\s*=\s*\[[\s\S]*?\]\s*as const/);
      expect(chapter(number)).toContain("for (let index = 0; index < 5; index += 1)");
      expect(chapter(number)).toContain("picked.map((item) => item.id)");
    }
  });

  it("bietet keine Aufgabe mit nur einer anklickbaren Choice-Antwort an", () => {
    for (let number = 1; number <= 9; number += 1) {
      expect(chapter(number)).not.toMatch(/options=\{\["[^"]+"\]\}/);
    }
  });

  it("bewahrt die fachlichen Trennungen der Bereiche 2 bis 8", () => {
    expect(chapter(2)).toContain("Erzählform");
    expect(chapter(2)).toContain("Beteiligung");
    expect(chapter(2)).toContain("Erzählverhalten");
    expect(chapter(3)).toContain("Die Figur lügt eindeutig.");
    expect(chapter(3)).toContain("beweisen aber nicht automatisch eine Lüge");
    expect(data(4)).toContain('forms: ["Direkte Rede", "Indirekte Rede", "Erlebte Rede"]');
    expect(data(5)).toContain("OrderForm");
    expect(data(5)).toContain("TempoForm");
    expect(chapter(5)).toContain("Frequenz");
    expect(chapter(6)).toContain("Ziel – WAS");
    expect(chapter(6)).toContain("Motiv – WARUM");
    expect(chapter(6)).toContain("Wert – WELCHE");
    expect(chapter(7)).toContain("Raumfunktion");
    expect(chapter(7)).toContain("mögliche Bedeutung");
    expect(data(8)).toContain("Mehrere Konfliktebenen können gleichzeitig wirken.");
    expect(chapter(8)).toContain("Reaktion");
    expect(chapter(8)).toContain("Entscheidung");
    expect(chapter(8)).toContain("Folge");
  });

  it("verwendet ausreichend neue Texte und schützt zentrale Spezialfälle", () => {
    expect(chapter02PracticeTexts.length).toBeGreaterThanOrEqual(5);
    expect(chapter03PracticeTexts.length).toBeGreaterThanOrEqual(5);
    expect(chapter05PracticeTexts.length).toBeGreaterThanOrEqual(5);
    expect(chapter06PracticeTexts.length).toBeGreaterThanOrEqual(5);
    expect(chapter(5)).toContain('id === "nachtschicht"');
    expect(chapter(5)).toContain("iterative Routine und der singulativ erzählte Dienstag");
    expect(chapter(6)).not.toContain('text.id === "livestream"');
  });

  it("macht in Bereich 9 Textgrundlage und eigene Analyse verbindlich", () => {
    const path = chapter(9);
    expect(path).toContain("finding.title");
    expect(path).toContain("finding.text");
    expect(path).toContain("Eigene Analyse (3–5 Sätze)");
    expect(path).toContain("Eine mögliche Beispielanalyse anzeigen");
    for (const criterion of ["check-observation", "check-evidence", "check-term", "check-effect", "check-interpretation"]) expect(path).toContain(criterion);
    expect(data(9)).toContain('"ownAnalysis"');
    expect(data(9)).toContain('weakEvidence:');
    expect(data(9)).toContain('strongEvidence:');
  });
});
