import { describe, expect, it } from "vitest";
import { allLearningExercises, categoryLearningExercises, integrationLearningExercises, learningCategoryIds, selectLearningFinalTest } from "../src/games/epik/data/learning_exercises";
import { familyForTerm, learningFamilies } from "../src/games/epik/data/learning_content";

const normal = categoryLearningExercises;
const byFamily = (id: string) => normal.filter(({ familyId }) => familyId === id);

describe("Epik Phase 21B.2 – familiengebundenes Wissen testen", () => {
  it("A/P: versieht jede Aufgabe mit Familie, Leitfrage und Achse; Integration ist explizit", () => {
    for (const exercise of allLearningExercises) {
      expect(exercise.familyId).not.toBe("");
      expect(exercise.analysisQuestion.length).toBeGreaterThan(15);
      expect(exercise.analysisAxis).not.toBeUndefined();
    }
    expect(normal.every(({ terms, familyId }) => terms.every((term) => familyForTerm(term)?.id === familyId))).toBe(true);
    expect(integrationLearningExercises.every(({ integration, category, analysisAxis }) => integration === true && category === "integration" && analysisAxis === "integration")).toBe(true);
  });

  it("B: trennt Erzählform, Beteiligung und Erzählverhalten", () => {
    expect(byFamily("erzaehlform").every(({ terms }) => terms.join("|") === "Ich-Form|Er-/Sie-Form")).toBe(true);
    expect(byFamily("beteiligung").every(({ terms }) => terms.join("|") === "homodiegetisch|heterodiegetisch")).toBe(true);
    expect(byFamily("erzaehlverhalten").every(({ terms }) => terms.includes("personal") && !terms.includes("Ich-Form") && !terms.includes("homodiegetisch"))).toBe(true);
  });

  it("C: unterscheidet Informationszugang, Wahrnehmungsfilter und Nähe", () => {
    expect(new Set(byFamily("innen-aussen").map(({ analysisAxis }) => analysisAxis))).toEqual(new Set(["information-access"]));
    expect(new Set(byFamily("subjektive-wahrnehmung").map(({ analysisAxis }) => analysisAxis))).toEqual(new Set(["perception-filter"]));
    expect(new Set(byFamily("naehe-distanz").map(({ analysisAxis }) => analysisAxis))).toEqual(new Set(["proximity"]));
  });

  it("D/E: behandelt Inquit als Sonderfall und hält Zeitachsen getrennt", () => {
    expect(byFamily("gesprochene-rede").filter(({ type }) => type === "singleChoice").every(({ solution }) => solution !== "Inquit-Formel")).toBe(true);
    expect(new Set(byFamily("ordnung").map(({ analysisAxis }) => analysisAxis))).toEqual(new Set(["time-order"]));
    expect(new Set(byFamily("dauer").map(({ analysisAxis }) => analysisAxis))).toEqual(new Set(["time-duration"]));
    expect(new Set(byFamily("frequenz").map(({ analysisAxis }) => analysisAxis))).toEqual(new Set(["time-frequency"]));
  });

  it("F/G: prüft Ziel, Motiv, Wert und trennt Figurenkomplexität von Entwicklung", () => {
    expect(new Set(byFamily("antrieb").flatMap(({ terms }) => terms))).toEqual(new Set(["Ziel", "Motiv (Handlungsgrund)", "Wert"]));
    expect(new Set(byFamily("anlage").map(({ analysisAxis }) => analysisAxis))).toEqual(new Set(["figure-complexity", "figure-development"]));
  });

  it("H/I: grenzt Raumfunktion von Symbolik und Mehrschichtigkeit von Konfliktart ab", () => {
    expect(learningFamilies.find(({ id }) => id === "raumfunktion")?.distinction).toContain("keine automatische Raumsymbolik");
    expect(byFamily("raumfunktion").every(({ terms }) => !terms.some((term) => term.toLocaleLowerCase("de-DE").includes("symbol")))).toBe(true);
    expect(byFamily("konfliktachse").every(({ terms }) => !terms.includes("Mehrschichtigkeit"))).toBe(true);
  });

  it("J: konkretisiert Interpretationssortierungen als vollständige Analysekette", () => {
    const chains = byFamily("analysekette").filter(({ type }) => type === "sorting");
    expect(chains.length).toBeGreaterThan(0);
    expect(chains.every(({ correctOrder }) => ["Beobachtung:", "Textbeleg:", "Analyse:", "Wirkung:", "Deutung:"].every((step, index) => correctOrder?.[index].startsWith(step)))).toBe(true);
  });

  it("K/L: kennzeichnet Mehrfachlösungen und zeigt bei Matching keinen unabhängigen Beispieltext", () => {
    expect(allLearningExercises.filter(({ type }) => type === "multipleChoice").every(({ correctIds }) => correctIds.length >= 2)).toBe(true);
    expect(allLearningExercises.filter(({ type }) => type === "matching").every(({ requiresText, exampleText, mapping }) => requiresText === false && exampleText === "" && Object.keys(mapping ?? {}).length >= 2)).toBe(true);
  });

  it("M–O: variiert den Abschlusstest, hält Definitionen in der Minderheit und alle Kategorien im Pool", () => {
    const rotations = [selectLearningFinalTest(77), selectLearningFinalTest(2026)];
    expect(rotations[0].map(({ id }) => id)).not.toEqual(rotations[1].map(({ id }) => id));
    expect(rotations[0].map(({ exampleText }) => exampleText)).not.toEqual(rotations[1].map(({ exampleText }) => exampleText));
    for (const final of rotations) {
      expect(final).toHaveLength(30);
      expect(new Set(final.map(({ type }) => type)).size).toBeGreaterThanOrEqual(6);
      expect(final.filter(({ operation }) => operation === "definition").length).toBeLessThan(final.length / 4);
      for (const category of learningCategoryIds) expect(final.some((item) => item.category === category)).toBe(true);
    }
  });

  it("deckt beim Kategorienaudit Basiskontrolle, Abgrenzung und Textanwendung ab", () => {
    for (const category of learningCategoryIds) {
      const exercises = normal.filter((item) => item.category === category);
      expect(exercises.some(({ operation }) => operation === "definition")).toBe(true);
      expect(exercises.some(({ operation }) => operation === "distinction")).toBe(true);
      expect(exercises.some(({ operation, exampleText }) => operation === "application" && exampleText.length > 0)).toBe(true);
    }
  });
});
