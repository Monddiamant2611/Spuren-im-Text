import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { completeEpikChapter, EPIK_PROGRESS_KEY, markEpikIntroSeen, normalizeCompletedChapters, parseEpikProgress, readEpikProgress, resetEpikProgress } from "../src/games/epik/epik-progress";

function browserStub() {
  const values = new Map<string, string>();
  const events = new EventTarget();
  return {
    localStorage: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      removeItem: (key: string) => values.delete(key),
    },
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
    dispatchEvent: events.dispatchEvent.bind(events),
  };
}

describe("lokaler Epik-Lernfortschritt", () => {
  beforeEach(() => vi.stubGlobal("window", browserStub()));
  afterEach(() => vi.unstubAllGlobals());

  it("beginnt ohne gespeicherte Daten bei Bereich 1", () => expect(readEpikProgress().completedChapters).toEqual([]));
  it("beginnt ohne gespeicherte Daten mit ungesehener Einführung", () => expect(readEpikProgress().introSeen).toBe(false));
  it("verwendet den namespaceten v1-Schlüssel", () => expect(EPIK_PROGRESS_KEY).toBe("epik.learningProgress.v1"));
  it("speichert einen abgeschlossenen ersten Bereich", () => { completeEpikChapter(1); expect(readEpikProgress().completedChapters).toEqual([1]); });
  it("stellt mehrere abgeschlossene Bereiche wieder her", () => { window.localStorage.setItem(EPIK_PROGRESS_KEY, JSON.stringify({ version: 1, completedChapters: [1, 2, 3, 4] })); expect(readEpikProgress().completedChapters).toEqual([1, 2, 3, 4]); });
  it("schaltet den Abschlussfall erst nach Bereichen 1 bis 9 frei", () => expect(normalizeCompletedChapters([1, 2, 3, 4, 5, 6, 7, 8, 9])).toHaveLength(9));
  it("fällt bei ungültigem JSON sicher zurück", () => expect(parseEpikProgress("{kaputt").completedChapters).toEqual([]));
  it("ignoriert unbekannte Versionen", () => expect(parseEpikProgress(JSON.stringify({ version: 2, completedChapters: [1, 2] })).completedChapters).toEqual([]));
  it("normalisiert Lücken auf die zusammenhängende Sequenz", () => expect(normalizeCompletedChapters([1, 2, 5, 7])).toEqual([1, 2]));
  it("entfernt Duplikate und ignoriert unbekannte Kapitel", () => expect(normalizeCompletedChapters([1, 1, 2, 2, 12, -1])).toEqual([1, 2]));
  it("verhindert das Überspringen eines Bereichs", () => { completeEpikChapter(1); completeEpikChapter(5); expect(readEpikProgress().completedChapters).toEqual([1]); });
  it("speichert den Intro-Status im vorhandenen Fortschrittsobjekt", () => { markEpikIntroSeen(); expect(readEpikProgress()).toEqual({ version: 1, completedChapters: [], introSeen: true }); });
  it("speichert keine Diagnose-, Antwort- oder Zufallsdaten", () => { completeEpikChapter(1); expect(JSON.parse(window.localStorage.getItem(EPIK_PROGRESS_KEY)!)).toEqual({ version: 1, completedChapters: [1], introSeen: false }); });
  it("löscht den Fortschritt vollständig", () => { completeEpikChapter(1); resetEpikProgress(); expect(window.localStorage.getItem(EPIK_PROGRESS_KEY)).toBeNull(); });
});
