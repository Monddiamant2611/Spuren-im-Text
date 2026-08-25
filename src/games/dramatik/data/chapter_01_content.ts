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
  { id: "claim_handle", text: "Annas Hand liegt auf der Türklinke.", target: "explicit" as const },
  { id: "claim_resolve", text: "Annas tiefes Einatmen und ihr „Nein“ können als Versuch verstanden werden, sich zum Öffnen zu entschließen.", target: "inference" as const },
  { id: "claim_room", text: "Hinter der Tür befindet sich ein dunkler Raum.", target: "unsupported" as const },
  { id: "claim_hesitation", text: "Anna zögert vor dem Öffnen der Tür.", target: "inference" as const },
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
export const evidenceRoundOptions={
 textIds:["c01_street_provocation_2","c01_street_provocation_1","c01_street_provocation_3"],
 observations:["Sampson versucht, Gregorio zu beruhigen.","Sampson kennt den Ausgang des Streits.","Sampson beschreibt nur einen früheren Streit.",situationEvidence.observation,"Sampson bittet die Gegenseite um Hilfe."],
 situations:["Romeo lenkt die Begegnung.","Sampson wird den Streit sicher gewinnen.",situationEvidence.situation,"Die Figuren kennen den Ausgang bereits.","Die Begegnung ist von Anfang an friedlich geregelt."],
} as const;

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

export interface SituationOption {id:string;text:string;correct:boolean;evidenceId:string|null;evidenceKind:"primary"|"context"|"none"}
export interface SituationGroup {field:SituationField;options:readonly SituationOption[]}
export const transferSituationGroups:readonly SituationGroup[]=[
 {field:"place",options:[
  {id:"place_unspecified",text:"Der genaue Ort ist im Ausschnitt nicht eindeutig angegeben.",correct:true,evidenceId:null,evidenceKind:"none"},
  {id:"place_street",text:"Die Szene spielt auf einer Straße.",correct:false,evidenceId:null,evidenceKind:"none"},
  {id:"place_mantua",text:"Die Szene spielt in Mantua.",correct:false,evidenceId:null,evidenceKind:"none"},
 ]},
 {field:"time",options:[
  {id:"time_unspecified",text:"Der genaue Zeitpunkt ist nicht eindeutig angegeben.",correct:true,evidenceId:null,evidenceKind:"none"},
  {id:"time_night",text:"Das Gespräch findet nachweislich in der Nacht statt.",correct:false,evidenceId:null,evidenceKind:"none"},
  {id:"time_morning",text:"Das Gespräch findet nachweislich am Morgen statt.",correct:false,evidenceId:null,evidenceKind:"none"},
 ]},
 {field:"characters",options:[
  {id:"char_capulet",text:"Capulet tritt auf.",correct:true,evidenceId:"c01_transfer_direction",evidenceKind:"primary"},
  {id:"char_paris",text:"Paris tritt auf.",correct:true,evidenceId:"c01_transfer_direction",evidenceKind:"primary"},
  {id:"char_servant",text:"Ein Bedienter tritt auf.",correct:true,evidenceId:"c01_transfer_direction",evidenceKind:"primary"},
  {id:"char_romeo",text:"Romeo tritt in diesem Ausschnitt auf.",correct:false,evidenceId:null,evidenceKind:"none"},
  {id:"char_juliette",text:"Julietta tritt in diesem Ausschnitt auf.",correct:false,evidenceId:null,evidenceKind:"none"},
  {id:"char_lady",text:"Lady Capulet tritt in diesem Ausschnitt auf.",correct:false,evidenceId:null,evidenceKind:"none"},
 ]},
 {field:"history",options:[
  {id:"history_previous_request",text:"Paris hat bereits zuvor um Julietta geworben.",correct:true,evidenceId:"c01_transfer_capulet_age",evidenceKind:"primary"},
  {id:"history_feud",text:"Capulet und Montague leben seit längerer Zeit in Mißhelligkeit.",correct:false,evidenceId:"c01_transfer_capulet_peace",evidenceKind:"primary"},
  {id:"history_secret_listener",text:"Romeo hat das Gespräch heimlich belauscht.",correct:false,evidenceId:null,evidenceKind:"none"},
  {id:"history_married",text:"Julietta ist bereits verheiratet.",correct:false,evidenceId:null,evidenceKind:"none"},
 ]},
 {field:"conditions",options:[
  {id:"condition_age",text:"Julietta hat noch nicht vierzehn Jahre gesehen.",correct:true,evidenceId:"c01_transfer_capulet_age",evidenceKind:"primary"},
  {id:"condition_delay",text:"Capulet hält eine Heirat zu diesem Zeitpunkt für verfrüht.",correct:true,evidenceId:"c01_transfer_capulet_age",evidenceKind:"primary"},
  {id:"condition_sanction",text:"Capulet und Montague müssen wegen ihres Streits dieselbe Strafe befürchten.",correct:false,evidenceId:"c01_transfer_capulet_peace",evidenceKind:"primary"},
  {id:"condition_juliette_choice",text:"Julietta entscheidet in diesem Ausschnitt selbst über die Heirat.",correct:false,evidenceId:null,evidenceKind:"none"},
 ]},
] as const;
