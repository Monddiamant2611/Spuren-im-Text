import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { allLearningConcepts, familyForTerm, learningCategories, learningFamilies } from "../src/games/epik/data/learning_content";

const terms = (id: string) => learningFamilies.find((family) => family.id === id)!.terms;
const role = (familyId: string, term: string) => terms(familyId).find((item) => item.term === term)?.role;

describe("Epik Phase 21B.1 – Begriffssystem", () => {
  it("ordnet jeden erreichbaren Fachbegriff genau einer Familie zu", () => {
    const assigned = learningFamilies.flatMap(({ terms: entries }) => entries.map(({ term }) => term));
    expect(new Set(assigned)).toEqual(new Set(allLearningConcepts.map(({ term }) => term)));
    expect(assigned).toHaveLength(allLearningConcepts.length);
    for (const concept of allLearningConcepts) expect(familyForTerm(concept.term)).toBeTruthy();
  });

  it("reduziert 88 erreichbare Begriffe auf deutlich weniger sichtbare Familien", () => {
    expect(allLearningConcepts).toHaveLength(88);
    expect(learningFamilies).toHaveLength(38);
    expect(learningFamilies.length).toBeLessThan(allLearningConcepts.length / 2);
  });

  it("trennt Erzählform, Beteiligung und Erzählverhalten", () => {
    expect(terms("erzaehlform").map(({ term }) => term)).toEqual(["Ich-Form", "Er-/Sie-Form"]);
    expect(terms("beteiligung").map(({ term }) => term)).toEqual(["homodiegetisch", "heterodiegetisch"]);
    expect(terms("erzaehlverhalten").slice(0, 3).map(({ term }) => term)).toEqual(["auktorial", "personal", "neutral"]);
    expect(role("erzaehlverhalten", "personale Multiperspektive")).toBe("advanced");
    expect(role("ich-erzaehler", "Ich-Erzähler")).toBe("bridge");
    expect(learningFamilies.find(({ id }) => id === "ich-erzaehler")?.summary).toContain("Ich-Form + homodiegetische");
  });

  it("ordnet Ich-Zeiten, Sicht, Nähe und Wahrnehmungsvertiefungen korrekt", () => {
    expect(terms("ich-zeiten").map(({ term }) => term)).toEqual(["Erlebendes Ich", "Erzählendes Ich"]);
    expect(terms("innen-aussen").map(({ term }) => term)).toEqual(["Außensicht", "Innensicht"]);
    expect(terms("naehe-distanz").map(({ term }) => term)).toEqual(["Figurennähe", "Distanz"]);
    expect(role("subjektive-wahrnehmung", "Subjektive Wahrnehmung")).toBe("advanced");
    expect(terms("wahrnehmungslenkung").map(({ term }) => term)).toEqual(["Wahrnehmungslenkung"]);
  });

  it("hierarchisiert Darbietung, Zeit und Figurenbegriffe", () => {
    expect(role("gesprochene-rede", "Inquit-Formel")).toBe("special-case");
    expect(["ordnung", "dauer", "frequenz"].every((id) => learningFamilies.some((family) => family.id === id))).toBe(true);
    expect(terms("antrieb").map(({ term }) => term)).toEqual(["Ziel", "Motiv (Handlungsgrund)", "Wert"]);
    expect(terms("anlage").map(({ term }) => term)).toEqual(["Einfache Figur", "Komplexe Figur", "Statische Figur", "Dynamische Figur"]);
  });

  it("hält Raumfunktion, Konfliktmehrschichtigkeit und Interpretation fachlich geordnet", () => {
    expect(terms("raumfunktion").map(({ term }) => term)).toEqual(["Raumfunktion"]);
    expect(learningFamilies.find(({ id }) => id === "raumfunktion")?.distinction).toContain("keine automatische Raumsymbolik");
    expect(learningFamilies.some(({ summary }) => summary.includes("Mehrschichtigkeit") && terms("konfliktachse").some(({ term }) => term === summary))).toBe(false);
    expect(terms("analysekette").map(({ term }) => term)).toEqual(["Beobachtung", "Textbeleg", "Analyse", "Wirkung", "Deutung", "Deutungshypothese"]);
  });

  it("belässt Wissen testen und Abschlusstest unangetastet und hält Einzelbegriffe anklickbar", () => {
    const cards = readFileSync("src/games/epik/LearningCards.tsx", "utf8");
    const glossary = readFileSync("src/games/epik/GlossaryTerm.tsx", "utf8");
    expect(cards).toContain("<CategoryTraining");
    expect(cards).toContain("<LearningFinalTest");
    expect(cards).toContain("<GlossaryTerm term={term}/>");
    expect(glossary).toContain("onOpenCards(categoryIndex, term)");
    expect(cards).toContain('sessionStorage.getItem("epik.learningFocus")');
    expect(learningCategories).toHaveLength(11);
  });
});
