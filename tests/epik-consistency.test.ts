import { describe, expect, it } from "vitest";
import { chapter01PracticeTexts } from "../src/games/epik/data/chapter_01";
import { chapter02Glossary, chapter02PracticeTexts } from "../src/games/epik/data/chapter_02";
import { chapter03Glossary, chapter03PracticeTexts } from "../src/games/epik/data/chapter_03";
import { chapter04Glossary, chapter04PracticeTexts } from "../src/games/epik/data/chapter_04";
import { chapter05Glossary, chapter05PracticeTexts } from "../src/games/epik/data/chapter_05";
import { chapter06Glossary, chapter06PracticeTexts } from "../src/games/epik/data/chapter_06";
import { chapter07Glossary, chapter07PracticeTexts } from "../src/games/epik/data/chapter_07";
import { chapter08Glossary, chapter08PracticeTexts } from "../src/games/epik/data/chapter_08";
import { chapter09Glossary, chapter09PracticeTexts } from "../src/games/epik/data/chapter_09";
import { epikAreas } from "../src/games/epik/data/game";

const practicePools = [chapter01PracticeTexts, chapter02PracticeTexts, chapter03PracticeTexts, chapter04PracticeTexts, chapter05PracticeTexts, chapter06PracticeTexts, chapter07PracticeTexts, chapter08PracticeTexts, chapter09PracticeTexts];
const glossaries = [chapter02Glossary, chapter03Glossary, chapter04Glossary, chapter05Glossary, chapter06Glossary, chapter07Glossary, chapter08Glossary, chapter09Glossary];

describe("Epik-Gesamtkonsistenz", () => {
  it("bindet die neun Bereiche in verbindlicher Reihenfolge ein", () => {
    expect(epikAreas.map(({ title }) => title)).toEqual(["Erzählen verstehen", "Erzählinstanz und Perspektive", "Nähe, Distanz und Wahrnehmung", "Rede- und Gedankenformen", "Zeitgestaltung", "Figurenanalyse", "Raumanalyse", "Handlung und Konflikt", "Von der Analyse zur Interpretation"]);
  });

  it("verwendet kapitelübergreifend eindeutige PracticeText-IDs", () => {
    const ids = practicePools.flatMap((pool) => pool.map(({ id }) => id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("verweist im Kapitelglossar nur auf vorhandene Begriffe", () => {
    const entries = glossaries.flatMap((glossary) => [...glossary]);
    const terms = new Set<string>(entries.map(({ term }) => term));
    for (const entry of entries) {
      for (const related of "relatedTerms" in entry ? entry.relatedTerms : []) expect(terms.has(related), `Glossarbegriff fehlt: ${related}`).toBe(true);
    }
  });
});
