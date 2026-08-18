import sourceRecords from "./primary-sources/romeo-juliette-wieland-chapter-01.json" with { type: "json" };
import type { PrimarySourceRecord } from "../../../core/content/types";

export type SignalKind = "speaker" | "stage_direction" | "speech";
export type Certainty = "explicit" | "inference" | "unsupported";
export type SituationField = "place" | "time" | "characters" | "history" | "conditions" | "unknown";

export const chapter01PrimarySources = sourceRecords as PrimarySourceRecord[];
export const primaryById = (id: string) => chapter01PrimarySources.find((record) => record.id === id)!;

export const practiceTextA = "Anna blieb vor der Tür stehen. Sie fürchtete sich vor dem, was sie dahinter erwartete. Trotzdem wusste sie, dass sie hineingehen musste.";
export const practiceSegments = [
  { id: "anna_speaker", text: "ANNA", kind: "speaker" as const },
  { id: "anna_direction_1", text: "(bleibt vor der Tür stehen. Ihre Hand liegt auf der Klinke.)", kind: "stage_direction" as const },
  { id: "anna_speech_1", text: "Noch könnte ich umkehren.", kind: "speech" as const },
  { id: "anna_direction_2", text: "(Sie atmet tief ein.)", kind: "stage_direction" as const },
  { id: "anna_speech_2", text: "Nein.", kind: "speech" as const },
  { id: "anna_direction_3", text: "(Sie öffnet die Tür.)", kind: "stage_direction" as const },
];

export const signalPrompts = [
  { kind: "speaker" as const, prompt: "Markieren Sie, woran erkennbar wird, welche Figur spricht.", feedback: "Die Sprecherangabe zeigt, welcher Figur die folgende Rede zugeordnet ist." },
  { kind: "stage_direction" as const, prompt: "Markieren Sie eine Information, die nicht gesprochen wird, sondern das Bühnengeschehen beschreibt.", feedback: "Das ist eine Regieanweisung. Sie beschreibt das Bühnengeschehen, etwa Bewegung, Gestik, Sprechweise, Auftritte oder Abgänge." },
  { kind: "speech" as const, prompt: "Markieren Sie Figurenrede.", feedback: "Diese Worte werden von der Figur gesprochen. Figurenrede kann Gedanken, Absichten und Gefühle sichtbar machen, ist aber nicht automatisch objektive Wahrheit." },
];

export const certaintyClaims = [
  { id: "claim_door", text: "Anna öffnet die Tür.", target: "explicit" as const },
  { id: "claim_return", text: "Anna erwägt, umzukehren.", target: "explicit" as const },
  { id: "claim_fear", text: "Anna hat große Angst.", target: "inference" as const },
  { id: "claim_person", text: "Hinter der Tür wartet eine gefährliche Person.", target: "unsupported" as const },
];

export const streetSituationCards = [
  { id: "street_place", text: "eine Strasse in Verona", target: "place" as const },
  { id: "street_time", text: "Es ist Nacht.", target: "unknown" as const },
  { id: "street_characters", text: "Sampson und Gregorio", target: "characters" as const },
  { id: "street_history", text: "Zwischen Montagues und Capulets besteht bereits vor Beginn der Szene eine Feindschaft.", target: "history" as const },
  { id: "street_conditions", text: "Sampson und Gregorio dienen der Familie Capulet.", target: "conditions" as const },
  { id: "street_romeo", text: "Romeo beobachtet die Begegnung.", target: "unknown" as const },
];

export const situationLabels: Record<SituationField, string> = {
  place: "Ort", time: "Zeit", characters: "Figuren", history: "Vorgeschichte", conditions: "Bedingungen", unknown: "Nicht feststellbar",
};

export const situationEvidence = {
  textId: "c01_street_provocation_1",
  observation: "Sampson will, dass die andere Seite den Streit offiziell beginnt.",
  situation: "Die Figuren achten darauf, wer den Streit nach außen hin beginnt.",
};

export const transferFields = [
  { id: "transfer_place", field: "place" as const, answer: "Nicht eindeutig angegeben", evidenceId: null },
  { id: "transfer_time", field: "time" as const, answer: "Nicht eindeutig angegeben", evidenceId: null },
  { id: "transfer_characters", field: "characters" as const, answer: "Capulet, Paris und ein Bedienter", evidenceId: "c01_transfer_direction" },
  { id: "transfer_history", field: "history" as const, answer: "Paris hat Capulet bereits zuvor um Julietta geworben.", evidenceId: "c01_transfer_capulet_age" },
  { id: "transfer_conditions", field: "conditions" as const, answer: "Julietta ist noch nicht vierzehn; Capulet hält eine Heirat derzeit für verfrüht.", evidenceId: "c01_transfer_capulet_age" },
];

export const transferOptions = [
  "Nicht eindeutig angegeben",
  "Capulet, Paris und ein Bedienter",
  "Paris hat Capulet bereits zuvor um Julietta geworben.",
  "Julietta ist noch nicht vierzehn; Capulet hält eine Heirat derzeit für verfrüht.",
  "Die Szene spielt nachts auf einer Straße.",
  "Romeo hört dem Gespräch heimlich zu.",
];
