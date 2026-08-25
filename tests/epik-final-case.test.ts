import { describe, expect, it } from "vitest";
import { finalCasePhases, finalCases, finalEvidenceQuality, isFinalCaseComplete, isFinalHypothesisJudgedCorrect, isFinalWeightAccepted, selectFinalCase } from "../src/games/epik/data/final_case";

describe("Epik-Abschlussfall", () => {
  it("enthält genau vier eindeutige selbst verfasste Fälle", () => {
    expect(finalCases).toHaveLength(4);
    expect(new Set(finalCases.map(({ id }) => id)).size).toBe(4);
    expect(finalCases.every(({ sourceType }) => sourceType === "self-authored")).toBe(true);
  });

  it("enthält alle verbindlichen Transferdaten", () => {
    for (const item of finalCases) {
      expect(item.centralAnalysisAreas.length + item.supportingAnalysisAreas.length).toBeGreaterThanOrEqual(3);
      expect(item.findings.length).toBeGreaterThanOrEqual(8);
      expect(item.evidenceTasks).toHaveLength(3);
      expect(item.chains.length).toBeGreaterThanOrEqual(3);
      expect(item.hypotheses.some(({ kind }) => kind === "overreach")).toBe(true);
      expect(item.hypotheses.some(({ kind }) => kind === "narrow")).toBe(true);
      expect(item.hypotheses.some(({ kind }) => kind === "absolute")).toBe(true);
      expect(item.hypotheses.some(({ valid }) => valid)).toBe(true);
      expect(item.interpretationVariants).toHaveLength(2);
      expect(item.interpretationVariants.every((variant) => variant.length === 6)).toBe(true);
    }
    expect(finalCases.some((item) => item.hypotheses.filter(({ valid }) => valid).length > 1)).toBe(true);
  });

  it("akzeptiert fachliche Relevanzgrenzfälle und unterscheidet Belegqualität", () => {
    expect(isFinalWeightAccepted("central", "central")).toBe(true);
    expect(isFinalWeightAccepted("central", "supporting")).toBe(true);
    expect(isFinalWeightAccepted("minor", "supporting")).toBe(true);
    expect(isFinalWeightAccepted("minor", "central")).toBe(false);
    for (const item of finalCases) for (const task of item.evidenceTasks) {
      expect(finalEvidenceQuality(task, task.answer)).toBe("direct");
      expect(finalEvidenceQuality(task, task.options[1])).toBe("partial");
      expect(finalEvidenceQuality(task, task.options[2])).toBe("thematic");
    }
  });

  it("unterscheidet plausible, enge, absolute und überinterpretierende Hypothesen", () => {
    for (const item of finalCases) {
      expect(new Set(item.hypotheses.map(({ kind }) => kind))).toEqual(new Set(["narrow", "plausible", "absolute", "overreach"]));
      for (const hypothesis of item.hypotheses) expect(isFinalHypothesisJudgedCorrect(hypothesis, hypothesis.valid)).toBe(true);
      expect(item.hypotheses.filter(({ kind }) => kind === "plausible").every(({ valid }) => valid)).toBe(true);
      expect(item.hypotheses.filter(({ kind }) => kind !== "plausible").every(({ valid }) => !valid)).toBe(true);
    }
  });

  it("bildet sieben Phasen ab und rotiert ohne unmittelbare Wiederholung", () => {
    expect(finalCasePhases).toEqual(["ORIENTIEREN", "SPUREN SICHTEN", "RELEVANZ ENTSCHEIDEN", "BELEGE SICHERN", "ZUSAMMENHÄNGE HERSTELLEN", "DEUTUNG PRÜFEN", "INTERPRETATION ZUSAMMENSETZEN"]);
    const first = selectFinalCase(0);
    expect(selectFinalCase(1, first.id).id).not.toBe(first.id);
  });

  it("weist Überinterpretationen zurück und hält den Abschluss erreichbar", () => {
    expect(finalCases.every((item) => item.hypotheses.filter(({ kind }) => kind === "overreach").every(({ valid }) => !valid))).toBe(true);
    expect(isFinalCaseComplete({ situation: 1, figures: 1, change: 1, open: 1, weights: 1, findings: 1, evidence: 1, chains: 1, hypotheses: 1, interpretation: 1, quality: 1 })).toBe(true);
    expect(isFinalCaseComplete({ situation: 1 })).toBe(false);
  });
});
