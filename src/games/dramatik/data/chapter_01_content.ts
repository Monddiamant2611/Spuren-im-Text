import sourceRecords from "./primary-sources/romeo-juliette-wieland-chapter-01.json" with { type: "json" };
import type { PrimarySourceRecord } from "../../../core/content/types";

export type SignalKind = "speaker" | "stage_direction" | "speech";
export type Certainty = "explicit" | "inference" | "unsupported";
export type SituationField = "place" | "time" | "characters" | "history" | "conditions" | "unknown";
export type HistoryConditionField = "history" | "current_condition" | "other" | "unknown";

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

export interface PracticeScene {id:string;title:string;lines:readonly string[]}
export interface PracticeClassification {id:string;text:string;target:SituationField}
export interface CertaintyPracticeClaim {id:string;text:string;target:Certainty}

export const situationPracticeScenes:readonly PracticeScene[]=[
 {id:"waiting_exam",title:"Eine Begegnung",lines:["LENA: Du bist also doch gekommen.","MAX: Der Bus hatte Verspätung.","(Lena blickt auf die Uhr.)","LENA: Seit vierzig Minuten?","MAX: Können wir das später klären? Gleich beginnt die Prüfung."]},
 {id:"closed_rehearsal",title:"Eine kurze Szene",lines:["MIRA: Die Tür zum Probenraum ist schon abgeschlossen.","JONAS: Kein Wunder. Nach deinem Abgang gestern hat die Leitung die Schlüsselregel geändert.","MIRA: Dann müssen wir draußen entscheiden, ob wir morgen noch einmal antreten.","(Jonas legt die Mappe auf die Fensterbank.)"]},
 {id:"scholarship",title:"Ein Gespräch",lines:["AYLIN: Die Kommission wartet im dritten Stock.","NOAH: Seit der Absage im letzten Jahr war ich nicht mehr hier.","(Er glättet den zerknitterten Brief.)","AYLIN: Ohne Empfehlungsschreiben lassen sie dich heute nicht hinein."]},
 {id:"late_train",title:"Eine Verzögerung",lines:["SARA: Auf der Anzeige steht wieder zehn Minuten später.","LEON: Dann verpassen wir den Anschluss.","(Sara öffnet die Nachricht ihrer Schwester, antwortet aber nicht.)","LEON: Seit dem Streit gestern weichst du ihr aus."]},
 {id:"studio_review",title:"Ein Manuskript",lines:["NORA: Die Aufnahme beginnt in fünf Minuten.","DAVID: Seit der letzten Sendung darf nur noch die Redaktion Fragen freigeben.","(Nora schiebt einen handschriftlichen Zettel unter das Manuskript.)","DAVID: Ist das die Frage, die gestern gestrichen wurde?"]},
 {id:"committee_revision",title:"Eine Entscheidung",lines:["JANA: Die Sitzung beginnt in zehn Minuten.","EMIL: Seit unserem letzten Gespräch hat die Schulleitung nichts mehr geändert.","(Jana legt den unterschriebenen Antrag auf den Tisch.)","JANA: Ohne die Zustimmung der Eltern dürfen sie den Kurs trotzdem nicht streichen.","EMIL: Dann müssen wir unsere Gründe noch einmal ordnen.","(Im Flur wird eine Tür geöffnet.)"]},
];

export const categoryPractice:readonly PracticeClassification[]=[
 {id:"cat_place",text:"Das Gespräch findet vor dem Prüfungsraum statt.",target:"unknown"},
 {id:"cat_time",text:"Eine Prüfung beginnt in Kürze.",target:"time"},
 {id:"cat_characters",text:"Lena und Max führen das Gespräch.",target:"characters"},
 {id:"cat_history",text:"Lena wartet bereits seit längerer Zeit.",target:"history"},
 {id:"cat_conditions",text:"Max nennt eine verspätete Busfahrt als Grund seines Zuspätkommens.",target:"conditions"},
 {id:"cat_relation",text:"Lena und Max sind Geschwister.",target:"unknown"},
];

export const certaintyPractice:readonly CertaintyPracticeClaim[]=[
 {id:"certainty_locked",text:"Der Probenraum ist abgeschlossen.",target:"explicit"},
 {id:"certainty_yesterday",text:"Mira ist am Vortag gegangen.",target:"explicit"},
 {id:"certainty_rule",text:"Eine neue Schlüsselregel beeinflusst die gegenwärtige Situation.",target:"inference"},
 {id:"certainty_outside",text:"Die Entscheidung muss zunächst außerhalb des Probenraums getroffen werden.",target:"inference"},
 {id:"certainty_fired",text:"Mira wurde aus dem Ensemble entlassen.",target:"unsupported"},
 {id:"certainty_careless",text:"Mira handelt grundsätzlich unzuverlässig.",target:"unsupported"},
 {id:"certainty_map",text:"Jonas legt eine Mappe auf eine Fensterbank.",target:"explicit"},
 {id:"certainty_weather",text:"Draußen regnet es.",target:"unsupported"},
];

export const historyConditionLabels:Record<HistoryConditionField,string>={history:"Vorgeschichte",current_condition:"Gegenwärtige Bedingung",other:"Andere Situationsinformation",unknown:"Nicht feststellbar"};
export const historyConditionPractice:readonly {id:string;text:string;target:HistoryConditionField}[]=[
 {id:"hc_rejection",text:"Noah erhielt im vergangenen Jahr eine Absage.",target:"history"},
 {id:"hc_absence",text:"Noah war seit dieser Absage nicht mehr an diesem Ort.",target:"history"},
 {id:"hc_letter_rule",text:"Für den Zutritt ist heute ein Empfehlungsschreiben erforderlich.",target:"current_condition"},
 {id:"hc_committee",text:"Noah und Aylin befinden sich kurz vor einem Gespräch mit einer Kommission.",target:"other"},
 {id:"hc_floor",text:"Die Kommission wartet im dritten Stock.",target:"other"},
 {id:"hc_letter",text:"Noah hält einen zerknitterten Brief in der Hand.",target:"other"},
 {id:"hc_effect",text:"Die frühere Absage prägt Noahs Rückkehr an diesen Ort.",target:"other"},
 {id:"hc_admission",text:"Ohne das Schreiben wird Noah heute nicht eingelassen.",target:"current_condition"},
 {id:"hc_nervous",text:"Noah scheitert erneut, weil er nervös ist.",target:"unknown"},
 {id:"hc_result",text:"Die Kommission wird Noah dieses Mal aufnehmen.",target:"unknown"},
];

export const signalChainPractice={
 signals:["Auf der Anzeige steht wieder zehn Minuten später.","(Sara öffnet die Nachricht ihrer Schwester, antwortet aber nicht.)","Seit dem Streit gestern weichst du ihr aus."],
 findings:["Leon nennt einen Streit vom Vortag.","Eine weitere Verspätung wird angezeigt.","Sara liest eine Nachricht, sendet aber keine Antwort."],
 inferences:["Der frühere Streit belastet die gegenwärtige Kommunikation.","Der Streit vom Vortag gehört zur relevanten Vorgeschichte.","Die Weiterreise steht unter Zeitdruck."],
 links:[{signal:0,finding:1,inference:2},{signal:1,finding:2,inference:0},{signal:2,finding:0,inference:1}],
};

export type AnalysisErrorReason="observation"|"inference"|"addition"|"overreach"|"certainty"|"irrelevant";
export const analysisErrorPractice:readonly (CertaintyPracticeClaim&{reason:AnalysisErrorReason})[]=[
 {id:"err_start",text:"Die Aufnahme beginnt in fünf Minuten.",target:"explicit",reason:"observation"},
 {id:"err_control",text:"Die Redaktion kontrolliert, welche Fragen gestellt werden dürfen.",target:"inference",reason:"inference"},
 {id:"err_secret",text:"Nora will vermutlich eine nicht freigegebene Frage verwenden.",target:"inference",reason:"inference"},
 {id:"err_liar",text:"Nora missachtet grundsätzlich jede Regel.",target:"unsupported",reason:"overreach"},
 {id:"err_evening",text:"Die Szene spielt am späten Abend.",target:"unsupported",reason:"addition"},
 {id:"err_pen",text:"Der Zettel wurde mit blauer Tinte geschrieben.",target:"unsupported",reason:"addition"},
 {id:"err_certain",text:"Nora wird die gestrichene Frage sicher stellen.",target:"unsupported",reason:"certainty"},
 {id:"err_handwriting",text:"Der Zettel ist handschriftlich.",target:"unsupported",reason:"irrelevant"},
];

export const consolidationGroups:readonly SituationGroup[]=[
 {field:"place",options:[
  {id:"con_place_room",text:"Die Figuren befinden sich nachweislich in einem Sitzungsraum.",correct:false,evidenceId:null,evidenceKind:"none",targetField:"place"},
  {id:"con_place_unspecified",text:"Der genaue Aufenthaltsort von Jana und Emil ist nicht eindeutig angegeben.",correct:true,evidenceId:null,evidenceKind:"none",targetField:"place"},
 ]},
 {field:"time",options:[
  {id:"con_time_session",text:"Die Sitzung beginnt in zehn Minuten.",correct:true,evidenceId:null,evidenceKind:"context",targetField:"time",reasoningKind:"finding"},
  {id:"con_time_morning",text:"Die Szene spielt am Morgen.",correct:false,evidenceId:null,evidenceKind:"none",targetField:"time"},
 ]},
 {field:"characters",options:[
  {id:"con_char_jana",text:"Jana ist anwesend.",correct:true,evidenceId:null,evidenceKind:"context",targetField:"characters",reasoningKind:"finding"},
  {id:"con_char_emil",text:"Emil ist anwesend.",correct:true,evidenceId:null,evidenceKind:"context",targetField:"characters",reasoningKind:"finding"},
  {id:"con_char_leadership",text:"Ein Mitglied der Schulleitung ist anwesend.",correct:false,evidenceId:null,evidenceKind:"none",targetField:"characters"},
 ]},
 {field:"history",options:[
  {id:"con_history_talk",text:"Jana und Emil haben bereits zuvor miteinander gesprochen.",correct:true,evidenceId:null,evidenceKind:"context",targetField:"history",reasoningKind:"finding"},
  {id:"con_history_signature",text:"Der Antrag wurde vor Beginn der Szene unterschrieben.",correct:true,evidenceId:null,evidenceKind:"context",targetField:"history",reasoningKind:"inference"},
 ]},
 {field:"conditions",options:[
  {id:"con_condition_consent",text:"Für die Streichung des Kurses ist die Zustimmung der Eltern erforderlich.",correct:true,evidenceId:null,evidenceKind:"context",targetField:"conditions",reasoningKind:"finding"},
  {id:"con_condition_pressure",text:"Für weitere Vorbereitung bleibt nur wenig Zeit.",correct:true,evidenceId:null,evidenceKind:"context",targetField:"conditions",reasoningKind:"inference"},
  {id:"con_condition_unchanged",text:"Die Schulleitung hat seit dem früheren Gespräch nichts geändert.",correct:true,evidenceId:null,evidenceKind:"context",targetField:"conditions",reasoningKind:"finding"},
  {id:"con_condition_cancelled",text:"Der Kurs ist bereits endgültig gestrichen.",correct:false,evidenceId:null,evidenceKind:"none",targetField:"conditions"},
 ]},
 {field:"unknown",options:[
  {id:"con_unknown_room",text:"In welchem Raum Jana und Emil stehen, ist nicht feststellbar.",correct:true,evidenceId:null,evidenceKind:"none",targetField:"unknown",reasoningKind:"not_determinable"},
  {id:"con_unknown_result",text:"Wie die Sitzung ausgehen wird, ist nicht feststellbar.",correct:true,evidenceId:null,evidenceKind:"none",targetField:"unknown",reasoningKind:"not_determinable"},
  {id:"con_unknown_parents",text:"Die Eltern haben ihre Zustimmung bereits verweigert.",correct:false,evidenceId:null,evidenceKind:"none",targetField:"unknown"},
 ]},
];

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

export interface SituationOption {id:string;text:string;correct:boolean;evidenceId:string|null;evidenceKind:"primary"|"context"|"none";relevance?:"context_only";targetField?:SituationField;reasoningKind?:"finding"|"inference"|"not_determinable"}
export interface SituationGroup {field:SituationField;options:readonly SituationOption[]}
export const transferSituationGroups:readonly SituationGroup[]=[
 {field:"place",options:[
  {id:"place_street",text:"Die Szene spielt auf einer Straße.",correct:false,evidenceId:null,evidenceKind:"none"},
  {id:"place_unspecified",text:"Der genaue Ort ist im Ausschnitt nicht eindeutig angegeben.",correct:true,evidenceId:null,evidenceKind:"none"},
  {id:"place_mantua",text:"Die Szene spielt in Mantua.",correct:false,evidenceId:null,evidenceKind:"none"},
 ]},
 {field:"time",options:[
  {id:"time_night",text:"Das Gespräch findet nachweislich in der Nacht statt.",correct:false,evidenceId:null,evidenceKind:"none"},
  {id:"time_morning",text:"Das Gespräch findet nachweislich am Morgen statt.",correct:false,evidenceId:null,evidenceKind:"none"},
  {id:"time_unspecified",text:"Der genaue Zeitpunkt ist nicht eindeutig angegeben.",correct:true,evidenceId:null,evidenceKind:"none"},
 ]},
 {field:"characters",options:[
  {id:"char_capulet",text:"Capulet tritt auf.",correct:true,evidenceId:"c01_transfer_direction",evidenceKind:"primary"},
  {id:"char_romeo",text:"Romeo tritt in diesem Ausschnitt auf.",correct:false,evidenceId:null,evidenceKind:"none"},
  {id:"char_paris",text:"Paris tritt auf.",correct:true,evidenceId:"c01_transfer_direction",evidenceKind:"primary"},
  {id:"char_juliette",text:"Julietta tritt in diesem Ausschnitt auf.",correct:false,evidenceId:null,evidenceKind:"none"},
  {id:"char_servant",text:"Ein Bedienter tritt auf.",correct:true,evidenceId:"c01_transfer_direction",evidenceKind:"primary"},
  {id:"char_lady",text:"Lady Capulet tritt in diesem Ausschnitt auf.",correct:false,evidenceId:null,evidenceKind:"none"},
 ]},
 {field:"history",options:[
  {id:"history_feud",text:"Capulet und Montague leben seit längerer Zeit in Mißhelligkeit.",correct:false,evidenceId:"c01_transfer_capulet_peace",evidenceKind:"primary",relevance:"context_only"},
  {id:"history_secret_listener",text:"Romeo hat das Gespräch heimlich belauscht.",correct:false,evidenceId:null,evidenceKind:"none"},
  {id:"history_previous_request",text:"Paris hat bereits zuvor um Julietta geworben.",correct:true,evidenceId:"c01_transfer_capulet_age",evidenceKind:"primary"},
  {id:"history_married",text:"Julietta ist bereits verheiratet.",correct:false,evidenceId:null,evidenceKind:"none"},
 ]},
 {field:"conditions",options:[
  {id:"condition_sanction",text:"Capulet und Montague müssen wegen ihres Streits dieselbe Strafe befürchten.",correct:false,evidenceId:"c01_transfer_capulet_peace",evidenceKind:"primary",relevance:"context_only"},
  {id:"condition_age",text:"Julietta hat noch nicht vierzehn Jahre gesehen.",correct:true,evidenceId:"c01_transfer_capulet_age",evidenceKind:"primary"},
  {id:"condition_juliette_choice",text:"Julietta entscheidet in diesem Ausschnitt selbst über die Heirat.",correct:false,evidenceId:null,evidenceKind:"none"},
  {id:"condition_delay",text:"Capulet hält eine Heirat zu diesem Zeitpunkt für verfrüht.",correct:true,evidenceId:"c01_transfer_capulet_age",evidenceKind:"primary"},
 ]},
] as const;
