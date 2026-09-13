import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = (chapter: string) =>
  readFileSync(new URL(`../src/games/dramatik/scenes/${chapter}.tsx`, import.meta.url), "utf8");

describe("Dramatik positive Teilrückmeldungen", () => {
  it("kennzeichnet Gesamtprüfungen in Kapitel 1 erst nach dem Prüfen elementgenau", () => {
    const chapter = source("Chapter01");
    expect(chapter).toContain('setChecked(true);onCheck()');
    expect(chapter).toContain('"✓ Richtig":"✗ Noch zu prüfen"');
    expect(chapter).toContain('assigned===item.target');
  });

  it("behält richtige Zuordnungen in Kapitel 2 sichtbar und unterscheidet den letzten Fehlversuch", () => {
    const chapter = source("Chapter02");
    expect(chapter).toContain('aria-label="Bereits richtige Zuordnungen"');
    expect(chapter).toContain('✓ Richtig ·');
    expect(chapter).toContain('✗ Noch zu prüfen ·');
  });

  it("zeigt gesicherte Teilantworten der Dialoganalyse in Kapitel 3", () => {
    const chapter = source("Chapter03");
    expect(chapter).toContain('aria-label="Bereits richtige Teilantworten"');
    expect(chapter).toContain('confirmed-answer-list');
    expect(chapter).toContain('✗ Noch zu prüfen ·');
    expect(chapter).toContain('setLastAttempt({id:x.id,value:v})');
  });

  it("verwendet in Kapitel 5 verständliche Sprache statt unnötiger Metasprache", () => {
    const chapter = source("Chapter05");
    expect(chapter).not.toMatch(/ökonomischer Druck|Willensdimension|rekursiv|Psychologisierung/);
    expect(chapter).toContain("finanzielle Not des Apothekers");
    expect(chapter).toContain("seine eigene Entscheidung");
  });

  it("beschriftet richtige und falsche Einzelzuordnungen in Kapitel 4 nicht nur farblich", () => {
    const chapter = source("Chapter04");
    expect(chapter).toContain('✓ Richtig ·');
    expect(chapter).toContain('✗ Noch zu prüfen ·');
  });

  it("zeigt in Kapitel 5 bestätigte Zuordnungen und Argumentbausteine weiter an", () => {
    const chapter = source("Chapter05");
    expect(chapter).toContain('aria-label="Bereits richtige Zuordnungen"');
    expect(chapter).toContain('className="answer-correct"');
    expect(chapter).toContain('Bausteine sind');
  });

  it("stellt positive und negative Zustände zusätzlich mit Text und Symbol dar", () => {
    const css = readFileSync(new URL("../src/shared/styles/base.css", import.meta.url), "utf8");
    expect(css).toContain(".answer-status");
    expect(css).toContain(".confirmed-answer-list");
    expect(css).toContain(".inline-answer-status");
    expect(css).toContain("--feedback-success-text:#f6fff8");
    expect(css).toContain(".answer-correct :is(span,small,strong,b,em,p,label,legend,div){color:inherit!important}");
    expect(css).toContain(".confirmed-answer-list li :is(span,small,strong,b,em,p,label,legend,div){color:inherit!important}");
    expect(css).toContain(".answer-correct::before,.answer-correct::after");
  });

  it("wiederholt die generische Einzelwahl-Anweisung in Kapitel 3 nicht pro Teilitem", () => {
    const chapter = source("Chapter03");
    expect(chapter).not.toContain("Wählen Sie genau eine Antwort. Entscheiden Sie anhand der genannten Gesprächsfunktion");
    expect(chapter).toContain("<TaskInstruction>{chapter03Tasks[session.round]}</TaskInstruction>");
  });
});
