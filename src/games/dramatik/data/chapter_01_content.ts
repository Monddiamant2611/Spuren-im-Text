import primaryFragments from "./primary-sources/romeo-juliet-act-5-scene-1-fragments.json";
import type { PrimarySourceRecord } from "../../../core/content/types";

export type FragmentType = "scene_location" | "stage_direction" | "speaker" | "speech";
export const chapter01Fragments = primaryFragments as PrimarySourceRecord[];

export const round1Targets = [
  { id: "scene_location", label: "Ort / Szenenangabe", feedback: "Diese Information legt fest, wo die Szene spielt." },
  { id: "stage_direction", label: "Regieanweisung", feedback: "Diese Angabe wird nicht gesprochen. Sie beschreibt das Bühnengeschehen." },
  { id: "speaker", label: "Sprecherangabe", feedback: "Diese Angabe zeigt, welcher Figur die folgende Rede zugeordnet ist." },
  { id: "speech", label: "Figurenrede", feedback: "Dieser Text wird von einer Figur gesprochen." },
] as const;

export const informationCards = [
  { id: "info_1", text: "Balthasar berichtet Romeo von Julias vermeintlichem Tod.", target: "knows", text_origin: "didactic_summary" },
  { id: "info_2", text: "Romeo erwartet beziehungsweise erfragt eine Nachricht des Paters.", target: "knows", text_origin: "didactic_summary" },
  { id: "info_3", text: "Romeo hat zu diesem Zeitpunkt keinen Brief des Paters erhalten.", target: "knows", text_origin: "didactic_summary" },
  { id: "info_4", text: "Romeo kennt den vollständigen Plan des Paters.", target: "does_not_know", text_origin: "didactic_summary" },
] as const;

export const directionChecks = [
  { statement: "Figurenrede wird von einer Figur gesprochen.", type: "speech" },
  { statement: "Regieanweisungen beschreiben beziehungsweise steuern Aspekte des Bühnengeschehens.", type: "stage_direction" },
  { statement: "Sprecherangaben zeigen, welcher Figur eine Rede zugeordnet ist.", type: "speaker" },
  { statement: "Orts- und Szenenangaben helfen, die Bühnensituation einzuordnen.", type: "scene_location" },
] as const;

export function fragmentById(id: string) { return chapter01Fragments.find((item) => item.id === id); }
