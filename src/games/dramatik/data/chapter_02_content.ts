import sourceRecords from "./primary-sources/romeo-juliette-wieland-chapter-02.json" with { type: "json" };
import type { PrimarySourceRecord } from "../../../core/content/types";

export type Certainty = "explicit" | "inference" | "unsupported";
export type AnalysisKind = "goal" | "motive" | "interest" | "unknown";

export const chapter02PrimarySources = sourceRecords as PrimarySourceRecord[];
export const chapter02PrimaryById = (id:string) => chapter02PrimarySources.find(record=>record.id===id)!;

export const practiceLines = [
  {speaker:"MARA",text:"Du bist also doch gekommen."},{speaker:"LEON",text:"Ich habe gesagt, dass ich komme."},
  {speaker:"MARA",text:"Drei Stunden zu spät."},{speaker:"",text:"(Leon sieht zur Tür.)"},
  {speaker:"LEON",text:"Müssen wir das jetzt besprechen?"},{speaker:"MARA",text:"Du siehst mich nicht einmal an."},
  {speaker:"LEON",text:"Ich bin hier. Das muss reichen."},
] as const;

export const practiceClaims = [
  {id:"leon_late",text:"Leon ist drei Stunden zu spät.",target:"explicit" as const},
  {id:"leon_avoid",text:"Leon möchte das Gespräch offenbar vermeiden.",target:"inference" as const},
  {id:"leon_hate",text:"Leon hasst Mara.",target:"unsupported" as const},
  {id:"leon_tension",text:"Zwischen Mara und Leon besteht in diesem Moment eine Spannung.",target:"inference" as const},
] as const;

export const characterizationCards = [
  {id:"direct_late",text:"Mara nennt Leon unzuverlässig.",target:"direct" as const},
  {id:"indirect_gaze",text:"Leon blickt wiederholt zur Tür und beantwortet Maras Frage nur knapp.",target:"indirect" as const},
  {id:"unsupported_hate",text:"Leon wird Mara künftig nie wieder treffen wollen.",target:"unsupported" as const},
  {id:"direct_self",text:"Leon bezeichnet sich selbst als geduldig.",target:"direct" as const},
  {id:"indirect_help",text:"Eine Figur unterbricht ihre Arbeit, um einer anderen beim Tragen zu helfen.",target:"indirect" as const},
  {id:"direct_other",text:"Mara nennt Leon einen verlässlichen Freund.",target:"direct" as const},
  {id:"unsupported_single",text:"Ein einmaliges Schweigen beweist, dass eine Figur grundsätzlich feige ist.",target:"unsupported" as const},
  {id:"indirect_decision",text:"Eine Figur gibt den eigenen Platz auf, obwohl ihr daraus ein Nachteil entsteht.",target:"indirect" as const},
  {id:"direct_reputation",text:"Mehrere Figuren beschreiben Leon als besonnen.",target:"direct" as const},
  {id:"indirect_reaction",text:"Auf eine Beschuldigung hin weicht eine Figur zurück und sucht nach Worten.",target:"indirect" as const},
] as const;

export const shakespeareCharacterizationCards=[
 {id:"sh_juliette_self",text:"Juliette stellt Heirat als eine Ehre dar, an die sie noch nie gedacht habe.",sourceId:"c02_main_juliette_honor",target:"direct" as const},
 {id:"sh_lady_paris",text:"Lady Capulet zeichnet ein ausgesprochen positives Bild von Paris.",sourceId:"c02_main_lady_paris",target:"direct" as const},
 {id:"sh_juliette_intention",text:"Juliette erscheint in ihrer Antwort vorsichtig und an der Erwartung ihrer Mutter orientiert.",sourceId:"c02_main_juliette_answer",target:"indirect" as const},
 {id:"sh_lady_leads",text:"Lady Capulet lenkt das Gespräch und fordert von Juliette eine Positionierung.",sourceId:"c02_main_lady_request",target:"indirect" as const},
 {id:"sh_juliette_refusal",text:"Juliette lehnt die geplante Verbindung mit Paris ab.",sourceId:"c02_transfer_juliette_refusal",target:"direct" as const},
 {id:"sh_capulet_power",text:"Capulets Reaktion zeigt ein starkes familiäres Machtgefälle.",sourceId:"c02_transfer_capulet_threat",target:"indirect" as const},
 {id:"sh_nurse_defends",text:"Die Amme tritt Juliette in der Auseinandersetzung schützend zur Seite.",sourceId:"c02_transfer_nurse_defends",target:"indirect" as const},
 {id:"sh_lady_distance",text:"Lady Capulet vergrößert in diesem Moment die Distanz zu ihrer Tochter.",sourceId:"c02_transfer_lady_withdraws",target:"indirect" as const},
 {id:"sh_absolute_trait",text:"Der Ausschnitt beweist, dass Juliette in jeder Situation gehorsam ist.",sourceId:"c02_main_juliette_answer",target:"unsupported" as const},
] as const;

export const mainSourceIds=["c02_main_lady_marriage_question","c02_main_juliette_honor","c02_main_lady_paris","c02_main_lady_request","c02_main_juliette_answer"] as const;
export const highlightTasks=[
  {id:"main_honor",sourceId:"c02_main_juliette_honor",observation:"Juliette sagt, dass sie bisher nicht an Heirat denkt.",characterization:"Ihre Antwort wirkt in dieser Situation zurückhaltend; eine dauerhafte Eigenschaft ist damit noch nicht bewiesen."},
  {id:"main_answer",sourceId:"c02_main_juliette_answer",observation:"Juliette will Paris erst betrachten und bezieht den Willen ihrer Mutter ein.",characterization:"Sie formuliert vorsichtig und lässt die Entscheidung in dieser Situation offen."},
  {id:"later_refusal",sourceId:"c02_transfer_juliette_refusal",observation:"Juliette lehnt die beschleunigte Heirat später ausdrücklich ab.",characterization:"Ihre Haltung ist in dieser späteren Situation deutlich ablehnend; der veränderte Kontext muss mitbedacht werden."},
  {id:"later_distinction",sourceId:"c02_transfer_juliette_distinction",observation:"Juliette trennt Dankbarkeit von Zustimmung zur Heirat.",characterization:"Sie widerspricht, ohne die gute Absicht ihrer Familie pauschal zu bestreiten."},
] as const;
export const highlightCandidateIds=[
  "c02_main_lady_marriage_question","c02_main_juliette_honor","c02_main_juliette_answer",
  "c02_transfer_lady_announcement","c02_transfer_juliette_refusal","c02_transfer_juliette_distinction",
  "c02_transfer_juliette_plea","c02_transfer_juliette_nurse_plea","c02_transfer_juliette_break",
] as const;
export const highlightReasoning=[
  {id:"situational_change",text:"Die frühen Antworten sind zurückhaltend; in der späteren Zwangslage widerspricht Juliette ausdrücklich und trennt Dankbarkeit von Zustimmung.",valid:true},
  {id:"speaker_identity",text:"Die Stellen sind aussagekräftig, weil sie alle von Juliette gesprochen werden.",valid:false},
  {id:"fixed_trait",text:"Alle Stellen beweisen, dass Juliette grundsätzlich und in jeder Situation ungehorsam ist.",valid:false},
] as const;

export const momentClaims=[
  {id:"moment_cautious",text:"Juliette antwortet in dieser Situation vorsichtig und legt sich noch nicht fest.",target:"supported" as const},
  {id:"moment_obedient",text:"Juliette ist grundsätzlich und in jeder Lage gehorsam.",target:"uncertain" as const},
  {id:"moment_loves",text:"Juliette ist bereits in Paris verliebt.",target:"unsupported" as const},
] as const;

export const roleTasks=[
  {id:"role_goal",sourceId:"c02_main_juliette_answer",observation:"Juliette möchte Paris zunächst genauer betrachten, bevor sie sich festlegt.",target:"goal" as const},
  {id:"role_interest",sourceId:"c02_main_juliette_answer",observation:"Die Erwartungen ihrer Mutter sind für Juliettes Antwort in dieser Situation bedeutsam.",target:"interest" as const},
 {id:"role_motive_loyalty",sourceId:"c02_transfer_juliette_nurse_plea",observation:"Juliette verweist auf ihren lebenden Gemahl und auf die Treue, die sie ihm schuldet. Das begründet, warum sie die geplante Verbindung mit Paris nicht annehmen will.",target:"motive" as const},
 {id:"role_motive_unknown",sourceId:"c02_main_juliette_honor",observation:"Warum Juliette bisher nicht an Heirat denkt, erklärt der Ausschnitt nicht.",target:"unknown" as const},
 {id:"role_lady_goal",sourceId:"c02_main_lady_request",observation:"Lady Capulet fordert Juliette auf, Paris auf dem Fest zu betrachten.",target:"goal" as const},
 {id:"role_capulet_goal",sourceId:"c02_transfer_capulet_threat",observation:"Capulet will Juliettes Zustimmung zur geplanten Hochzeit erzwingen.",target:"goal" as const},
] as const;

export const relationshipTasks=[
  {id:"rel_juliette_lady",from:"Juliette",to:"Lady Capulet",sourceId:"c02_main_juliette_answer",observation:"Juliette richtet ihre Antwort am Willen ihrer Mutter aus.",statement:"Lady Capulet besitzt in diesem Gespräch mehr Entscheidungsmacht; Juliette antwortet ihr gegenüber zurückhaltend.",axis:"Macht / Unterordnung"},
  {id:"rel_lady_juliette",from:"Lady Capulet",to:"Juliette",sourceId:"c02_main_lady_request",observation:"Lady Capulet lenkt das Gespräch und fordert eine Antwort zu Paris.",statement:"Lady Capulet setzt die Erwartungen und verlangt von Juliette eine Positionierung.",axis:"Macht / Erwartung"},
] as const;

export const selfOtherTasks=[
  {id:"self_juliette",sourceId:"c02_main_juliette_honor",target:"self" as const,text:"Juliette zeigt selbst, dass Heirat bisher nicht zu ihren eigenen Vorstellungen gehört."},
  {id:"other_lady",sourceId:"c02_main_lady_paris",target:"other" as const,text:"Lady Capulet behandelt Juliette als alt genug, über eine Heirat mit Paris nachzudenken."},
  {id:"self_juliette_limit",sourceId:"c02_main_juliette_answer",target:"self" as const,text:"Juliette beschreibt, wie weit sie beim Betrachten von Paris gehen will."},
  {id:"other_capulet",sourceId:"c02_transfer_capulet_threat",target:"other" as const,text:"Capulet behandelt Juliettes Widerspruch als Ungehorsam, den er nicht dulden will."},
  {id:"self_juliette_break",sourceId:"c02_transfer_juliette_break",target:"self" as const,text:"Juliette formuliert für sich eine neue Einschätzung ihrer Vertrauten."},
] as const;

export const transferSourceIds=["c02_transfer_lady_announcement","c02_transfer_juliette_refusal","c02_transfer_juliette_distinction","c02_transfer_juliette_plea","c02_transfer_capulet_threat","c02_transfer_nurse_defends","c02_transfer_lady_withdraws","c02_transfer_juliette_nurse_plea","c02_transfer_nurse_advice","c02_transfer_juliette_break"] as const;
export const transferTasks=[
  {id:"transfer_goal",sourceId:"c02_transfer_juliette_refusal",category:"Ziel",observation:"Juliette erklärt ausdrücklich, dass sie Paris nicht heiraten will.",conclusion:"Sie will die geplante Hochzeit verhindern oder zumindest aufschieben."},
  {id:"transfer_power",sourceId:"c02_transfer_capulet_threat",category:"Machtverhältnis",observation:"Capulet droht mit Ausschluss und verweigert eine Antwort.",conclusion:"Capulet setzt seine familiäre und materielle Macht gegen Juliettes Widerspruch ein."},
  {id:"transfer_relationship",sourceId:"c02_transfer_lady_withdraws",category:"Beziehung",observation:"Lady Capulet beendet das Gespräch und verweigert weitere Unterstützung.",conclusion:"In diesem Moment vergrößert sich die Distanz zwischen Mutter und Tochter."},
  {id:"transfer_trust",sourceId:"c02_transfer_juliette_break",category:"Selbst-/Fremdbild",observation:"Nach dem Rat der Amme beschließt Juliette, ihr nicht mehr zu vertrauen.",conclusion:"Die frühere Vertrautheit trägt in dieser Situation nicht mehr; Juliettes Bild der Amme verändert sich."},
] as const;

export const comparisonCards=[
  {id:"compare_early",target:"early" as const,text:"Juliette antwortet vorsichtig, will Paris erst betrachten und bezieht den Willen ihrer Mutter ein."},
  {id:"compare_early_open",target:"early" as const,text:"Die frühere Situation lässt noch offen, wie Juliette sich nach der Begegnung mit Paris entscheiden würde."},
  {id:"compare_late",target:"late" as const,text:"Juliette lehnt die geplante Hochzeit ausdrücklich ab und bittet zugleich um Gehör und Aufschub."},
  {id:"compare_late_pressure",target:"late" as const,text:"In der späteren Situation reagiert Juliette unter unmittelbarem familiärem Druck."},
  {id:"compare_context",target:"conclusion" as const,text:"Die Ausschnitte zeigen unterschiedliches situatives Verhalten; sie belegen keine einfache Entwicklung von „gehorsam“ zu „rebellisch“."},
  {id:"compare_cautious",target:"conclusion" as const,text:"Der Vergleich erlaubt eine vorsichtige Aussage über veränderte Situationen, aber keine sichere Behauptung über Juliettes Verhalten in jeder Lage."},
] as const;

export const ensembleLinks=[
  {id:"ensemble_lady",from:"Juliette",to:"Lady Capulet",sourceId:"c02_transfer_lady_withdraws",label:"Erwartung, Macht und wachsende Distanz"},
  {id:"ensemble_capulet",from:"Juliette",to:"Capulet",sourceId:"c02_transfer_capulet_threat",label:"familiäre Macht und offener Konflikt"},
  {id:"ensemble_nurse",from:"Juliette",to:"Amme",sourceId:"c02_transfer_juliette_break",label:"Vertrauen wird in der späteren Situation aufgekündigt"},
] as const;
