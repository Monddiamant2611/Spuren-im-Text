import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { initialUnlockedEpikAreas, unlockNextEpikArea } from "../src/games/epik/data/game";
import { compareVersionCases } from "../src/games/epik/data/chapter_01";
import { shuffleChoiceOptions } from "../src/games/epik/choice-options";

describe("Epik didaktische UX", () => {
  it("startet mit Bereich 1 und schaltet jeweils den nächsten Bereich frei", () => {
    expect(initialUnlockedEpikAreas).toBe(1);
    expect(unlockNextEpikArea(1, 0)).toBe(2);
    expect(unlockNextEpikArea(9, 8)).toBe(10);
  });

  it("bietet die Lernkartei mit elf Kategorien und Familienkarten", () => {
    const source = readFileSync("src/games/epik/LearningCards.tsx", "utf8");
    const content = readFileSync("src/games/epik/data/learning_content.ts", "utf8");
    expect(["Grundlagen des Erzählens", "Erzählsituation", "Wahrnehmung & Nähe", "Darbietungsformen", "Zeitgestaltung", "Figurenanalyse", "Raumanalyse", "Handlung, Konflikt & Textaufbau", "Sprache & Stil", "Interpretation", "Analyse schreiben"].every((title) => content.includes(title))).toBe(true);
    expect(source).toContain("epik-family-card__summary");
    expect(source).toContain("epik-family-card__body");
    expect(source).toContain("Zur Werkstatt");
  });

  it("entfernt redaktionelle Labels und bietet Zurück- sowie Tippzugang", () => {
    const workshop = readFileSync("src/games/epik/EpikWorkshop.tsx", "utf8");
    const screens = [workshop, ...Array.from({ length: 9 }, (_, index) => readFileSync(`src/games/epik/Chapter${String(index + 1).padStart(2, "0")}Path.tsx`, "utf8"))].join("\n");
    expect(screens).not.toContain("Selbst verfasster Übungstext");
    expect(workshop).toContain("Zur Lernkartei");
    expect(workshop).toContain("Tipp");
  });

  it("mischt Optionen und enthält den anspruchsvolleren Bereich-1-Transfer", () => {
    const transfer = readFileSync("src/games/epik/Chapter01Path.tsx", "utf8");
    expect(transfer).toContain("Welche vier konkreten Bestandteile kommen in der erzählten Situation vor?");
    expect(transfer).toContain("Hausflur");
    expect(transfer).toContain("orderOptions");
    expect(readFileSync("src/games/epik/choice-options.ts", "utf8")).toContain("Math.random");
  });

  it("verteilt richtige Antworten deterministisch auf mehrere Positionen", () => {
    const options = ["richtig", "nah-1", "nah-2", "plausibel-1", "plausibel-2", "weiter"];
    const positions = new Set(Array.from({ length: 20 }, (_, seed) => shuffleChoiceOptions(options, seed + 1, "beispiel").indexOf("richtig")));
    expect(positions.size).toBeGreaterThanOrEqual(4);
    expect(shuffleChoiceOptions(options, 17, "beispiel")).toEqual(shuffleChoiceOptions(options, 17, "beispiel"));
  });

  it("besitzt sechs Vergleichsfälle und eine aktive Lernkartei 2.0", () => {
    expect(compareVersionCases).toHaveLength(6);
    const cards = readFileSync("src/games/epik/LearningCards.tsx", "utf8");
    expect(cards).toContain("Wissen testen");
    expect(cards).toContain("Noch üben");
    expect(cards.indexOf("Kurzdefinition:")).toBeLessThan(cards.indexOf("Beispiel:"));
    expect(cards).not.toContain("Wie entsteht das?");
    expect(cards).toContain("So erkennen Sie es:");
    expect(cards).toContain("Nicht verwechseln mit:");
  });
});
