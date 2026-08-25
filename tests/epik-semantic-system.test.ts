import { describe, expect, it } from "vitest";
import { allLearningConcepts, learningCategories } from "../src/games/epik/data/learning_content";

describe("fachliches System der Epik-Lernkartei", () => {
  it("besitzt elf fachlich benannte Kategorien", () => {
    expect(learningCategories.map(({ title }) => title)).toEqual(["Grundlagen des Erzählens", "Erzählsituation", "Wahrnehmung & Nähe", "Darbietungsformen", "Zeitgestaltung", "Figurenanalyse", "Raumanalyse", "Handlung, Konflikt & Textaufbau", "Sprache & Stil", "Interpretation", "Analyse schreiben"]);
  });

  it("enthält alle verbindlichen Fachbegriffe mit zwei Beispielen und Abgrenzung", () => {
    const required = ["Realer Autor", "Realer Leser", "Impliziter Leser", "Erzählinstanz", "Figur", "Erzählte Welt", "Ich-Erzähler", "Erlebendes Ich", "Erzählendes Ich", "homodiegetisch", "heterodiegetisch", "auktorial", "personal", "neutral", "Erzählhaltung", "Innensicht", "Außensicht", "Erzählerbericht", "Figurenrede", "Direkte Rede", "Indirekte Rede", "Erlebte Rede", "Innerer Monolog", "Bewusstseinsstrom", "Inquit-Formel", "Erzählzeit", "Erzählte Zeit", "Zeitdeckung", "Zeitraffung", "Zeitdehnung", "Analepse", "Prolepse", "singulativ", "repetitiv", "iterativ", "Einfache Figur", "Komplexe Figur", "Statische Figur", "Dynamische Figur", "Textaufbau", "Handlungsstrang", "Wendepunkt", "Wortwahl", "Sprachregister", "Sprachliches Mittel", "Deutungshypothese", "Textbeleg", "Analyse", "Wirkung", "Deutung"];
    const terms = allLearningConcepts.map(({ term }) => term.toLocaleLowerCase("de-DE"));
    for (const term of required) expect(terms).toContain(term.toLocaleLowerCase("de-DE"));
    expect(allLearningConcepts.every(({ examples, definition, signal, confusion, relatedTerms }) => examples.length === 2 && examples.every(Boolean) && definition && signal && confusion && relatedTerms.length > 0)).toBe(true);
  });

  it("trennt zentrale Erzählachsen und vermeidet falsche Gleichsetzungen", () => {
    const content = allLearningConcepts.map(({ definition, confusion }) => `${definition} ${confusion}`).join(" ");
    expect(content).toContain("Personal bedeutet nicht homodiegetisch");
    expect(content).toContain("Er-/Sie-Form beweist kein auktoriales Erzählverhalten");
    expect(content).toContain("Neutrale Darstellung garantiert keine objektive Wahrheit");
    expect(content).toContain("Direkte Rede kann Unmittelbarkeit schaffen, ist aber nicht stets exakt zeitdeckend");
  });
});
