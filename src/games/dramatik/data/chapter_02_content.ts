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
  {id:"direct_explicit",text:"Mara sagt ausdrücklich, Leon sei drei Stunden zu spät.",target:"direct" as const},
  {id:"indirect_gaze",text:"Aus Leons Blick zur Tür und seiner Frage wird ein mögliches Ausweichen erschlossen.",target:"indirect" as const},
  {id:"direct_claim",text:"Eine Figur nennt eine andere ausdrücklich unzuverlässig.",target:"direct" as const},
  {id:"indirect_action",text:"Eine Haltung wird aus Rede, Verhalten und Reaktion abgeleitet.",target:"indirect" as const},
] as const;

export const shakespeareCharacterizationCards=[
 {id:"sh_juliette_self",text:"Juliette sagt selbst, Heirat sei eine Ehre, an die sie noch nie gedacht habe.",sourceId:"c02_main_juliette_honor",target:"direct" as const},
 {id:"sh_lady_paris",text:"Lady Capulet beschreibt Paris ausdrücklich in einem ausführlichen Vergleich.",sourceId:"c02_main_lady_paris",target:"direct" as const},
 {id:"sh_juliette_intention",text:"Juliette kündigt an, Paris anzusehen und den Willen ihrer Mutter zu berücksichtigen.",sourceId:"c02_main_juliette_answer",target:"direct" as const},
 {id:"sh_lady_leads",text:"Aus Lady Capulets Fragen und Aufforderungen wird erschlossen, dass sie das Gespräch lenkt.",sourceId:"c02_main_lady_request",target:"indirect" as const},
 {id:"sh_juliette_refusal",text:"Juliette spricht ihre Ablehnung der geplanten Hochzeit ausdrücklich aus.",sourceId:"c02_transfer_juliette_refusal",target:"direct" as const},
 {id:"sh_capulet_power",text:"Aus Capulets Drohung wird ein starkes familiäres Machtgefälle erschlossen.",sourceId:"c02_transfer_capulet_threat",target:"indirect" as const},
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
  {id:"compare_late",target:"late" as const,text:"Juliette lehnt die geplante Hochzeit ausdrücklich ab und bittet zugleich um Gehör und Aufschub."},
  {id:"compare_context",target:"conclusion" as const,text:"Die Ausschnitte zeigen unterschiedliches situatives Verhalten; sie belegen keine einfache Entwicklung von „gehorsam“ zu „rebellisch“."},
] as const;

export const ensembleLinks=[
  {id:"ensemble_lady",from:"Juliette",to:"Lady Capulet",sourceId:"c02_transfer_lady_withdraws",label:"Erwartung, Macht und wachsende Distanz"},
  {id:"ensemble_capulet",from:"Juliette",to:"Capulet",sourceId:"c02_transfer_capulet_threat",label:"familiäre Macht und offener Konflikt"},
  {id:"ensemble_nurse",from:"Juliette",to:"Amme",sourceId:"c02_transfer_juliette_break",label:"Vertrauen wird in der späteren Situation aufgekündigt"},
] as const;
