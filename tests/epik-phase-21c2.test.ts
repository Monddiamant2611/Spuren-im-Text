import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { finalCases } from "../src/games/epik/data/final_case";

describe("Epik Phase 21C.2 – selbstständiger Abschlussfall", () => {
  const source = readFileSync("src/games/epik/FinalCasePath.tsx", "utf8");

  it("ordnet die sieben Phasen der geforderten Denkbewegung zu", () => {
    for (let phase = 0; phase < 7; phase += 1) expect(source).toContain(`phase===${phase}`);
    expect(source.indexOf("Zunächst nur verstehen")).toBeLessThan(source.indexOf("Auffällige Spuren sammeln"));
    expect(source.indexOf("Auffällige Spuren sammeln")).toBeLessThan(source.indexOf("Welche Analysebereiche sind hier ergiebig?"));
  });

  it("entkoppelt die Relevanzentscheidung vom geheimen Idealraster", () => {
    expect(source).toContain("disabled={!allWeights}");
    expect(source).not.toContain("weightsCorrect");
    expect(source).toContain("Gut begründbar");
    expect(source).toContain("Vertretbar");
    expect(source).toContain("Weniger ergiebig");
    expect(source).toContain("Für Ihre weitere Analyse besonders ergiebig:");
  });

  it("führt von Belegqualität über Vernetzung zu mehreren Deutungstypen", () => {
    for (const marker of ["Direkt tragfähig", "teilweise ausreichend", "thematisch passend", "bereichsübergreifend verknüpfen", "Mehrere Deutungen können tragfähig sein"]) expect(source).toContain(marker);
  });

  it("verlangt eigene Interpretation und Selbstcheck vor der Musteranalyse", () => {
    expect(source).toContain("Formulieren Sie nun eine kurze Interpretation");
    expect(source).toContain("rows={8}");
    expect(source).toContain("disabled={!ownInterpretation.trim()||!checks}");
    expect(source).toContain("Eine mögliche textnahe Interpretation");
    expect(source).toContain("Andere Deutungen können ebenfalls überzeugen");
    expect(source).not.toContain("semantisch");
  });

  it("hält vier fallspezifische Musterinterpretationen und Integrationsketten bereit", () => {
    expect(finalCases).toHaveLength(4);
    for (const item of finalCases) {
      expect(item.chains).toHaveLength(3);
      expect(item.interpretationVariants).toHaveLength(2);
      expect(item.interpretationVariants.every((variant) => variant.join(" ").length > 250)).toBe(true);
    }
  });

  it("verändert weder Lerntraining noch Kapitel oder allgemeine Feedbacklogik", () => {
    expect(source).not.toContain("LearningTraining");
    expect(source).not.toContain("Chapter0");
    expect(source).not.toContain("familyFeedback");
  });
});
