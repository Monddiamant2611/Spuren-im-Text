import { useCallback, useMemo, useState, useSyncExternalStore, type Dispatch, type SetStateAction } from "react";

export function createRunSeed(): number {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) return crypto.getRandomValues(new Uint32Array(1))[0];
  return Math.floor(Math.random() * 0xffffffff);
}

const clientRunSeed = typeof window === "undefined" ? 0 : createRunSeed();
const subscribeToStaticSeed = () => () => undefined;
export function useRunSeed(): [number, Dispatch<SetStateAction<number>>] {
  const hydratedSeed = useSyncExternalStore(subscribeToStaticSeed, () => clientRunSeed, () => 0);
  const [override, setOverride] = useState<number>();
  const setSeed = useCallback<Dispatch<SetStateAction<number>>>((next) => setOverride((current) => typeof next === "function" ? next(current ?? hydratedSeed) : next), [hydratedSeed]);
  return [override ?? hydratedSeed, setSeed];
}

function hashSeed(seed: number, questionId: string): number {
  let hash = seed >>> 0;
  for (const character of questionId) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
  return hash || 1;
}

export function shuffleChoiceOptions<T>(options: readonly T[], runSeed: number, questionId: string, getId: (option: T) => string = String): T[] {
  let state = hashSeed(runSeed, `${questionId}|${options.map(getId).join("|")}`);
  const shuffled = [...options];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    state ^= state << 13; state ^= state >>> 17; state ^= state << 5;
    const target = (state >>> 0) % (index + 1);
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}

export function useShuffledOptions(options: readonly string[], questionId: string): readonly string[] {
  const [runSeed] = useRunSeed();
  return useMemo(() => shuffleChoiceOptions([...new Set(options)], runSeed, questionId), [options, questionId, runSeed]);
}

const distractorPools = {
  narrator: ["Personal, weil die Passage in der dritten Person formuliert ist.", "Auktorial, weil ein Gedanke erwähnt wird.", "Neutral, weil die Erzählinstanz nicht als Figur auftritt.", "Ich-Form, weil eine Figur ihre Wahrnehmung besitzt.", "Heterodiegetisch, weil der reale Autor nicht im Text genannt wird.", "Nicht bestimmbar, weil kurze Ausschnitte grundsätzlich keine Erzählanalyse erlauben."],
  perception: ["Außensicht, weil die Passage in der dritten Person erzählt wird.", "Innensicht, weil eine Figur äußerlich reagiert.", "Subjektive Figurensicht, weil der Text einen Ort beschreibt.", "Vollständige Gewissheit, weil die Wahrnehmung der Figur glaubwürdig klingt.", "Starke Figurennähe, weil die Figur namentlich genannt wird.", "Neutrale Wahrnehmung, weil keine Ich-Form verwendet wird."],
  speech: ["Direkte Rede, weil eine Figurenstimme thematisch erkennbar ist.", "Indirekte Rede, weil der Satz im Präteritum steht.", "Erlebte Rede, weil eine Figur in der dritten Person genannt wird.", "Innerer Monolog, weil überhaupt ein Gedanke vorkommt.", "Bewusstseinsstrom, weil der Satz kurz formuliert ist.", "Erzählerbericht, weil allein keine Anführungszeichen sichtbar sind."],
  time: ["Zeitraffung, weil der Satz kurz ist.", "Zeitdehnung, weil mehrere Wörter verwendet werden.", "Zeitdeckung, weil eine Handlung vollständig genannt wird.", "Analepse, weil im Präteritum erzählt wird.", "Prolepse, weil eine Figur eine Erwartung äußert.", "Iteratives Erzählen, weil ein Ereignis besonders wichtig wirkt."],
  character: ["Die Figur besitzt diese Eigenschaft dauerhaft, weil sie einmal entsprechend handelt.", "Die Selbstaussage der Figur ist objektiv richtig.", "Das Fremdbild einer anderen Figur gilt als sichere Charakterisierung.", "Ein Widerspruch beweist automatisch eine Entwicklung.", "Das Ziel der Figur erklärt zugleich vollständig ihr Motiv.", "Die beobachtete Handlung erlaubt keine Aussage über die Figur."],
  space: ["Der Raum ist symbolisch, weil er ausführlich beschrieben wird.", "Die Atmosphäre beweist eine feste Bedeutung des Ortes.", "Eine Tür stellt in jedem Text einen Wendepunkt dar.", "Die räumliche Position ist ohne Figurenverhalten bereits eine Machtordnung.", "Der Handlungsraum ist mit dem Vorstellungsraum identisch.", "Ein dunkler Raum erzeugt unabhängig vom Kontext dieselbe Wirkung."],
  conflict: ["Ein Konflikt liegt vor, sobald etwas Unangenehmes geschieht.", "Das Ziel der Figur ist mit ihrem Motiv identisch.", "Eine Bedrohung beweist bereits einen Wendepunkt.", "Die Reaktion der Figur löst den Konflikt automatisch.", "Ein offener Ausgang bedeutet, dass keine Entwicklung stattfindet.", "Der äußere Konflikt erklärt ohne Textbeleg zugleich den inneren Konflikt."],
  interpretation: ["Der Fachbegriff allein erklärt bereits die Wirkung.", "Eine plausible Idee benötigt keinen konkreten Textbeleg.", "Jede mögliche Deutung ist gleich stark.", "Die auffälligste Einzelstelle bestimmt allein die Gesamtdeutung.", "Eine Inhaltsangabe ersetzt die Analyse der Gestaltung.", "Die vermutete Autorenabsicht gilt als sicherer Interpretationsbeleg."],
  evidence: ["Die Überschrift genügt unabhängig von der Behauptung als stärkster Beleg.", "Die längste Textstelle ist automatisch der beste Beleg.", "Ein thematisch ähnlicher Satz trägt jede Analysebehauptung.", "Eine Wirkungsaussage ersetzt das konkrete Textsignal.", "Die grammatische Person belegt allein jede Form des Erzählverhaltens.", "Eine nicht erzählte Autorenabsicht stützt die Einordnung."],
} as const;
export type AnalysisAxis = keyof typeof distractorPools;

/** Ergänzt ausschließlich aus einem ausdrücklich gewählten fachgleichen Achsenpool. */
export function useDemandingOptions(options: readonly string[], correct: readonly string[], questionId: string, analysisAxis: AnalysisAxis, minimum = options.length): readonly string[] {
  const [runSeed] = useRunSeed();
  return useMemo(() => {
    const existing = [...new Set(options)];
    const needed = Math.max(0, minimum - existing.length);
    const pool = shuffleChoiceOptions(distractorPools[analysisAxis].filter((item) => !existing.includes(item) && !correct.includes(item)), runSeed, `${questionId}-pool`);
    return shuffleChoiceOptions([...existing, ...pool.slice(0, needed)], runSeed, questionId);
  }, [options, correct, questionId, analysisAxis, minimum, runSeed]);
}
