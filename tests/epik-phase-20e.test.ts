import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { allLearningExercises } from "../src/games/epik/data/learning_exercises";

describe("Epik Phase 20E", () => {
  it("ordnet alle 150 Lernübungen einer expliziten Analyseachse zu", () => {
    expect(allLearningExercises).toHaveLength(150);
    expect(allLearningExercises.every(({ analysisAxis }) => Boolean(analysisAxis))).toBe(true);
  });

  it("ergänzt kleine Choice-Mengen nicht mehr blind bis fünf", () => {
    const choices = readFileSync("src/games/epik/choice-options.ts", "utf8");
    expect(choices).not.toContain("5 - existing.length");
    expect(choices).toContain("distractorPools[analysisAxis]");
    expect(choices).toContain("minimum = options.length");
  });

  it("trennt in Bereich 2 Erzählform, Beteiligung und Erzählverhalten", () => {
    const chapter = readFileSync("src/games/epik/Chapter02Path.tsx", "utf8");
    expect(chapter).toContain("Weiß das erzählende Ich sicher, warum sein Vater damals nicht widersprochen hat?");
    expect(chapter).not.toContain("Ist die zentrale Information der Figur sicher bekannt?");
    expect(chapter).toContain("In welcher Erzählform wird erzählt?");
    expect(chapter).toContain("Ist die Erzählinstanz selbst Teil der erzählten Welt?");
    expect(chapter).toContain('["Auktorial", "Personal", "Neutral"]');
    expect(chapter).not.toContain('["Auktorial", "Personal", "Ich-Erzähler"]');
  });

  it("hält Zeitgestaltung und Abschlussfall frei von fachfremden Fülldistraktoren", () => {
    const time = readFileSync("src/games/epik/Chapter05Path.tsx", "utf8");
    const finalCase = readFileSync("src/games/epik/FinalCasePath.tsx", "utf8");
    expect(time).not.toContain("Heterodiegetisch");
    expect(time).toContain('id === "nachtschicht"');
    expect(finalCase).not.toContain("Nur eine allwissende Erzählinstanz");
    expect(finalCase).toContain("Wer ist unmittelbar beteiligt oder relevant?");
  });

  it("kennzeichnet Abschlusstestbereiche und schützt lange Glossarbegriffe", () => {
    const training = readFileSync("src/games/epik/LearningTraining.tsx", "utf8");
    const css = readFileSync("src/games/epik/epik.css", "utf8");
    expect(training).toContain("<strong>Bereich:</strong>");
    expect(training).toContain("Vernetzung ausdrücklich gekennzeichneter Befunde");
    expect(css).toContain("min(14rem,100%)");
    expect(css).toContain("overflow-wrap:normal!important");
  });
});
