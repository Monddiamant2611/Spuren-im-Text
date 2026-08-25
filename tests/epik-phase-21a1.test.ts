import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { compareObservations } from "../src/games/epik/data/chapter_01";
import { chapter04Glossary, speechFormOrder } from "../src/games/epik/data/chapter_04";
import { characterDrives, chapter06PracticeTexts } from "../src/games/epik/data/chapter_06";
import { conflictClassificationCases, conflictHierarchy } from "../src/games/epik/data/chapter_08";

const path = (number: number) => readFileSync(`src/games/epik/Chapter0${number}Path.tsx`, "utf8");

describe("Epik Phase 21A.1 – manuelle didaktische Korrekturen", () => {
  it("macht B1 und B2 zu echten Vergleichsaufgaben", () => {
    expect(compareObservations.filter(({ correct }) => correct).length).toBeGreaterThanOrEqual(5);
    expect(path(2)).toContain("Welche Aussagen lassen sich aus dem Vergleich belegen?");
    expect(path(2)).toContain("voice-a");
    expect(path(2)).toContain("third-auktorial");
  });

  it("trennt in B3 Außenbeobachtung, Innenzugang, Unsicherheit und Übergriff", () => {
    expect(path(3)).toContain("Was ist äußerlich beobachtbar?");
    expect(path(3)).toContain("Welchen inneren Vorgang");
    expect(path(3)).toContain("Welche Information bleibt unbekannt?");
    expect(path(3)).toContain("Welche Schlussfolgerung wäre deshalb nicht belegt?");
  });

  it("führt Bewusstseinsstrom und Inquit-Formel fachlich ein und wendet alle Formen an", () => {
    expect(speechFormOrder).toContain("Bewusstseinsstrom");
    expect(chapter04Glossary.some(({ term }) => term === "Inquit-Formel")).toBe(true);
    expect(path(4)).toContain("speechFormOrder.map");
    expect(path(4)).not.toContain("Allein die Textlänge");
  });

  it("trennt Ziel, Motiv und Wert und verwendet einen neuen Entwicklungstransfer", () => {
    expect(path(6)).toContain("Ziel – WAS");
    expect(path(6)).toContain("Motiv – WARUM");
    expect(path(6)).toContain("Wert – WELCHE");
    expect(characterDrives.kollegin.motive).not.toBe(characterDrives.kollegin.value);
    const transfer = chapter06PracticeTexts.find(({ id }) => id === "werkstattwechsel");
    expect(transfer?.text).toContain("Zu Beginn");
    expect(transfer?.text).toContain("Am Nachmittag");
    expect(path(6)).toContain('id === "werkstattwechsel"');
  });

  it("ordnet B8 hierarchisch und klassifiziert vier Situationen einzeln", () => {
    expect(conflictClassificationCases).toHaveLength(4);
    expect(conflictHierarchy.at(-1)?.items[0]).toContain("keine eigene gleichrangige Konfliktart");
    expect(path(8)).toContain("conflictClassificationCases.map");
    expect(path(8)).toContain("Konflikthierarchie");
  });
});
