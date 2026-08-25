import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { chapterChoiceFeedback, familyFeedback } from "../src/games/epik/data/formative_feedback";

describe("Epik Phase 21C.1 – formatives Feedback", () => {
  it("A/B: trennt Erzählform, Beteiligung und Erzählverhalten", () => {
    expect(familyFeedback.erzaehlform.distinction).toContain("Beteiligung");
    expect(familyFeedback.beteiligung.distinction).toContain("Ich-Form");
    expect(familyFeedback.erzaehlverhalten.distinction).toContain("grammatische Erzählform");
  });

  it("C–I: enthält diagnostische Abgrenzungen für zentrale Familien", () => {
    expect(familyFeedback["innen-aussen"].distinction).toContain("Figurennähe");
    expect(familyFeedback.ordnung.distinction).toContain("nicht Erzähltempo");
    expect(familyFeedback.antrieb.distinction).toContain("drei verschiedene Fragen");
    expect(familyFeedback.anlage.distinction).toContain("Widerspruch");
    expect(familyFeedback.raumfunktion.distinction).toContain("Symboldeutung");
    expect(familyFeedback.konfliktachse.distinction).toContain("Bedrohung");
    expect(familyFeedback.analysekette.distinction).toContain("Wirkung");
  });

  it("liefert richtige und falsche Bereichsrückmeldungen mit Warum und nächstem Prüfschritt", () => {
    const right = chapterChoiceFeedback("Welche Ordnung liegt vor?", "Analepse", "Analepse");
    const wrong = chapterChoiceFeedback("Welche Ordnung liegt vor?", "Zeitraffung", "Analepse");
    expect(right).toContain("Richtig");
    expect(right).toContain("Textsignal");
    expect(wrong).toContain("Prüfen");
    expect(wrong).toContain("anderen Achsen");
  });

  it("J–N: differenziert Formatfeedback und lässt Freitext beim Selbstcheck", () => {
    const source = readFileSync("src/games/epik/LearningTraining.tsx", "utf8");
    expect(source).toContain("Falsch gewählt:");
    expect(source).toContain("Noch nicht gewählt:");
    expect(source).toContain("passt nicht; entscheidend ist");
    expect(source).toContain("erste unstimmige Übergang");
    expect(source).toContain("für diese Behauptung nicht direkt tragfähig");
    expect(source).toContain("Selbstcheck:");
    expect(source).toContain("Beispielantwort:");
    expect(source).toContain("aria-live=\"polite\"");
  });

  it("verschiebt ausführliche Abschlusstest-Auflösung in das Review", () => {
    const source = readFileSync("src/games/epik/LearningTraining.tsx", "utf8");
    expect(source).toContain("Die fachliche Auflösung folgt nach Aufgabe 30");
    expect(source).toContain("epik-test-review");
    expect(source).toContain("Ihre Antwort:");
    expect(source).toContain("Richtige Antwort:");
  });

  it("zeigt in allen neun Bereichen konkrete Abschlusskompetenzen", () => {
    const source = readFileSync("src/games/epik/ChapterCompletionActions.tsx", "utf8");
    expect(source).toContain("Das können Sie jetzt");
    for (let chapter = 1; chapter <= 9; chapter += 1) expect(source).toContain(`${chapter}: [`);
  });

  it("O: kein aktiver Epik-E2E erwartet die obsolete Flashcard-Struktur", () => {
    const sources = readdirSync("tests/e2e").filter((name) => name.startsWith("epik-") && name.endsWith(".spec.ts")).map((name) => readFileSync(`tests/e2e/${name}`, "utf8")).join("\n");
    expect(sources).not.toContain(".epik-flashcard");
    expect(sources).not.toContain("epik-flashcard-toggle");
  });
});
