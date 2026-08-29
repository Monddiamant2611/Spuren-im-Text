import sourceRecords from "./primary-sources/romeo-juliette-wieland-chapter-02.json" with { type: "json" };
import type { PrimarySourceRecord } from "../../../core/content/types";

export type Certainty = "explicit" | "inference" | "unsupported";
export type AnalysisKind = "goal" | "motive" | "interest" | "unknown";
export type MomentKind = "snapshot" | "pattern" | "cautious" | "overreach";
export type RelevanceKind = "high" | "supporting" | "low" | "unsupported";
export type SelfOtherKind = "self" | "other" | "finding" | "overreach";

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
  {id:"direct_late",text:"Mara sagt: „Auf dich kann man sich nie verlassen.“",target:"direct" as const},
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

export const momentPracticeLines=[
 {speaker:"NORA",text:"Ich brauche kurz Zeit, bevor ich antworte."},{speaker:"DAVID",text:"Beim letzten Treffen hast du ebenso um Bedenkzeit gebeten."},
 {speaker:"",text:"(Nora liest die Unterlagen erneut.)"},{speaker:"NORA",text:"Bei dieser Entscheidung möchte ich nichts überstürzen."},
] as const;
export const momentPractice=[
 {id:"mp_silence",text:"Nora schweigt nach Davids Einwand zunächst.",target:"snapshot" as const},
 {id:"mp_reads",text:"Nora liest in dieser Situation die Unterlagen erneut.",target:"snapshot" as const},
 {id:"mp_repeated",text:"Nora hat bei mindestens zwei Entscheidungen um Bedenkzeit gebeten.",target:"pattern" as const},
 {id:"mp_cautious",text:"Nora lässt sich auf Grundlage der wiederholten Beobachtungen vorsichtig als abwägend beschreiben.",target:"cautious" as const},
 {id:"mp_always",text:"Nora ist in jeder Lebenslage unentschlossen.",target:"overreach" as const},
 {id:"mp_coward",text:"Das erneute Lesen beweist, dass Nora feige ist.",target:"overreach" as const},
 {id:"mp_once",text:"Eine einzelne verzögerte Antwort wäre noch kein Beleg für eine dauerhafte Eigenschaft.",target:"cautious" as const},
 {id:"mp_pattern_limit",text:"Auch wiederholtes Verhalten erlaubt nur eine textgebundene, vorsichtige Charakterisierung.",target:"cautious" as const},
] as const;

export const relevancePracticeLines=[
 {speaker:"AYLIN",text:"Wenn du die Zahlen nicht sicher findest, übernehme ich diesen Teil der Präsentation."},
 {speaker:"BEN",text:"Nein. Ich habe die Berechnung vorbereitet und möchte sie selbst erklären."},
 {speaker:"CEM",text:"Wir beginnen in zwölf Minuten."},{speaker:"",text:"(Ben ordnet seine Notizen und bittet Aylin, die Folie gemeinsam zu prüfen.)"},
] as const;
export const relevancePractice=[
 {id:"rp_prepared",text:"Ben hat die Berechnung vorbereitet und will sie selbst erklären.",target:"high" as const},
 {id:"rp_review",text:"Ben bittet Aylin um eine gemeinsame Prüfung der Folie.",target:"high" as const},
 {id:"rp_offer",text:"Aylin bietet an, einen Teil zu übernehmen.",target:"supporting" as const},
 {id:"rp_notes",text:"Ben ordnet seine Notizen.",target:"supporting" as const},
 {id:"rp_time",text:"Die Präsentation beginnt in zwölf Minuten.",target:"low" as const},
 {id:"rp_room",text:"Der genaue Raum wird nicht genannt.",target:"low" as const},
 {id:"rp_arrogant",text:"Ben hält sich grundsätzlich für klüger als Aylin.",target:"unsupported" as const},
 {id:"rp_failure",text:"Ben wird bei der Präsentation sicher scheitern.",target:"unsupported" as const},
] as const;

export const rolePracticeLines=[
 {speaker:"LEA",text:"Bleib noch hier, bis wir den Streit geklärt haben."},{speaker:"JONAS",text:"Ich weiß nicht, ob Reden noch etwas ändert."},
 {speaker:"LEA",text:"Wenn du jetzt gehst, bricht unser gemeinsames Projekt endgültig auseinander."},{speaker:"MIRA",text:"Die Projektleitung erwartet unsere Entscheidung heute."},
] as const;
export const rolePractice=[
 {id:"rpg_stay",text:"Lea möchte verhindern, dass Jonas das Gespräch verlässt.",target:"goal" as const},
 {id:"rpg_clarify",text:"Lea möchte den Streit noch in dieser Situation klären.",target:"goal" as const},
 {id:"rpg_break",text:"Sie befürchtet, dass das gemeinsame Projekt sonst auseinanderbricht.",target:"motive" as const},
 {id:"rpg_contact",text:"Der Erhalt der Zusammenarbeit ist Lea wichtig.",target:"interest" as const},
 {id:"rpg_deadline",text:"Mira möchte noch heute eine Entscheidung herbeiführen.",target:"goal" as const},
 {id:"rpg_project",text:"Mira orientiert sich an der Erwartung der Projektleitung.",target:"motive" as const},
 {id:"rpg_security",text:"Jonas braucht in dieser Situation Gewissheit, ob das Gespräch etwas ändern kann.",target:"interest" as const},
 {id:"rpg_silence",text:"Warum Jonas zuvor geschwiegen hat, ist nicht sicher feststellbar.",target:"unknown" as const},
 {id:"rpg_friendship",text:"Ob Lea und Jonas außerhalb des Projekts befreundet sind, ist nicht sicher feststellbar.",target:"unknown" as const},
 {id:"rpg_power",text:"Lea möchte Jonas dauerhaft kontrollieren.",target:"unknown" as const},
] as const;

export const relationshipPracticeLines=[
 {speaker:"AYLIN",text:"Ben, ich vertraue dir die Schlusspräsentation an."},{speaker:"BEN",text:"Dann brauche ich deine Rückmeldung, bevor ich entscheide."},
 {speaker:"CEM",text:"Aylin, du hast uns beide eingeteilt. Lass Ben wenigstens den Ablauf bestimmen."},{speaker:"AYLIN",text:"Den Zeitplan lege weiterhin ich fest."},
] as const;
export const relationshipPractice=[
 {id:"relp_ab",from:"Aylin",to:"Ben",signal:"Ich vertraue dir die Schlusspräsentation an.",options:["Aylin ordnet sich vollständig Bens Entscheidungen unter.","Aylin vertraut Ben Verantwortung an, behält aber einen Teil der Kontrolle.","Aylin versucht, Ben aus der Gruppe auszuschließen.","Über die Beziehung lässt sich nichts aussagen."],answer:1},
 {id:"relp_ba",from:"Ben",to:"Aylin",signal:"Dann brauche ich deine Rückmeldung, bevor ich entscheide.",options:["Ben lehnt jede Unterstützung Aylins ab.","Ben besitzt dauerhaft keine eigene Entscheidungsmacht.","Aylin ist vollständig von Ben abhängig.","Ben sucht Aylins Rückmeldung, bevor er entscheidet."],answer:3},
 {id:"relp_ac",from:"Aylin",to:"Cem",signal:"Den Zeitplan lege weiterhin ich fest.",options:["Aylin beansprucht gegenüber Cems Einwand die Entscheidung über den Zeitplan.","Aylin überlässt Cem ohne Einschränkung die Leitung.","Aylin und Cem verfügen in diesem Moment über völlig gleiche Entscheidungsbefugnisse.","Aylin weist Cem als Person vollständig zurück."],answer:0},
 {id:"relp_ca",from:"Cem",to:"Aylin",signal:"Lass Ben wenigstens den Ablauf bestimmen.",options:["Cem bestätigt Aylins Kontrolle ohne Einwand.","Cem verlangt, dass Aylin die Gruppe verlässt.","Cem widerspricht Aylins Kontrolle und unterstützt Bens Beteiligung.","Cem macht sich vollständig von Aylins Urteil abhängig."],answer:2},
] as const;

export const selfOtherPracticeLines=[
 {speaker:"MIRA",text:"Ich bleibe auch unter Druck sachlich."},{speaker:"NOAH",text:"Gerade hast du meine Frage zweimal unterbrochen."},
 {speaker:"",text:"(Mira wartet, bis Noah ausgesprochen hat.)"},{speaker:"MIRA",text:"Dann versuche ich es noch einmal."},
] as const;
export const selfOtherPractice=[
 {id:"sop_self",text:"Mira versteht sich selbst als sachlich.",target:"self" as const},
 {id:"sop_self_retry",text:"Mira sagt: „Dann versuche ich es noch einmal.“",target:"finding" as const},
 {id:"sop_other",text:"Noah nimmt Mira in diesem Moment als unterbrechend wahr.",target:"other" as const},
 {id:"sop_wait",text:"Mira wartet anschließend, bis Noah ausgesprochen hat.",target:"finding" as const},
 {id:"sop_truth",text:"Miras Selbsteinschätzung beweist objektiv, dass sie immer sachlich handelt.",target:"overreach" as const},
 {id:"sop_noah_truth",text:"Noahs Vorwurf beweist, dass Mira grundsätzlich rücksichtslos ist.",target:"overreach" as const},
 {id:"sop_change",text:"Noah sagt: „Gerade hast du meine Frage zweimal unterbrochen.“",target:"finding" as const},
 {id:"sop_friend",text:"Noah hält Mira für eine schlechte Freundin.",target:"overreach" as const},
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
  {id:"moment_obedient",text:"Juliettes Antwort kann in diesem Gespräch als Orientierung am Willen ihrer Mutter verstanden werden.",target:"uncertain" as const},
  {id:"moment_loves",text:"Juliette ist bereits in Paris verliebt.",target:"unsupported" as const},
  {id:"moment_considers",text:"Juliette erklärt sich bereit, Paris auf dem Fest zu betrachten.",target:"supported" as const},
  {id:"moment_decided",text:"Juliette hat sich in dieser frühen Situation bereits für eine Heirat entschieden.",target:"unsupported" as const},
  {id:"moment_pattern",text:"Der Ausschnitt allein reicht nicht aus, um Juliettes Verhalten in jeder familiären Auseinandersetzung vorherzusagen.",target:"supported" as const},
] as const;

export const roleTasks=[
  {id:"role_goal",sourceId:"c02_main_juliette_answer",observation:"Juliette möchte Paris zunächst genauer betrachten, bevor sie sich festlegt.",target:"goal" as const},
  {id:"role_interest",sourceId:"c02_main_juliette_answer",observation:"Juliette orientiert ihre Antwort am Willen ihrer Mutter.",target:"motive" as const},
 {id:"role_motive_loyalty",sourceId:"c02_transfer_juliette_nurse_plea",observation:"Juliette verweist auf ihren lebenden Gemahl und auf die Treue, die sie ihm schuldet. Das begründet, warum sie die geplante Verbindung mit Paris nicht annehmen will.",target:"motive" as const},
 {id:"role_motive_unknown",sourceId:"c02_main_juliette_honor",observation:"Warum Juliette bisher nicht an Heirat denkt, erklärt der Ausschnitt nicht.",target:"unknown" as const},
 {id:"role_lady_goal",sourceId:"c02_main_lady_request",observation:"Lady Capulet fordert Juliette auf, Paris auf dem Fest zu betrachten.",target:"goal" as const},
 {id:"role_capulet_goal",sourceId:"c02_transfer_capulet_threat",observation:"Capulet will Juliettes Zustimmung zur geplanten Hochzeit erzwingen.",target:"goal" as const},
 {id:"role_juliette_interest",sourceId:"c02_transfer_juliette_nurse_plea",observation:"Die Bindung an ihren lebenden Gemahl ist für Juliette grundlegend wichtig.",target:"interest" as const},
 {id:"role_lady_motive_unknown",sourceId:"c02_main_lady_request",observation:"Warum Lady Capulet gerade in diesem Moment selbst das Gespräch führt, ist nicht sicher feststellbar.",target:"unknown" as const},
] as const;

export const relationshipTasks=[
  {id:"rel_juliette_lady",from:"Juliette",to:"Lady Capulet",sourceId:"c02_main_juliette_answer",options:["Juliette weist jede Erwartung ihrer Mutter offen zurück.","Juliette orientiert ihre Antwort am Willen ihrer Mutter und setzt zugleich eine Grenze.","Juliette entscheidet vollständig über Lady Capulets Handeln.","Die Äußerung beweist Juliettes dauerhafte Unterordnung."],answer:1},
  {id:"rel_lady_juliette",from:"Lady Capulet",to:"Juliette",sourceId:"c02_main_lady_request",options:["Lady Capulet überlässt Juliette das Gespräch ohne eigene Erwartung.","Lady Capulet behandelt Juliette als gleichrangige Entscheiderin über die Familie.","Lady Capulet setzt die Gesprächsrichtung und erwartet eine Positionierung zu Paris.","Lady Capulet lehnt ihre Tochter vollständig ab."],answer:2},
] as const;

export const selfOtherTasks=[
  {id:"self_juliette",sourceId:"c02_main_juliette_honor",target:"self" as const,text:"Juliette zeigt selbst, dass Heirat bisher nicht zu ihren eigenen Vorstellungen gehört."},
  {id:"other_lady",sourceId:"c02_main_lady_paris",target:"other" as const,text:"Lady Capulet behandelt Juliette als alt genug, über eine Heirat mit Paris nachzudenken."},
  {id:"self_juliette_limit",sourceId:"c02_main_juliette_answer",target:"self" as const,text:"Juliette beschreibt, wie weit sie beim Betrachten von Paris gehen will."},
  {id:"other_capulet",sourceId:"c02_transfer_capulet_threat",target:"other" as const,text:"Capulet behandelt Juliettes Widerspruch als Ungehorsam, den er nicht dulden will."},
  {id:"self_juliette_break",sourceId:"c02_transfer_juliette_break",target:"other" as const,text:"Juliette formuliert eine neue Einschätzung der Amme."},
  {id:"other_lady_expectation",sourceId:"c02_main_lady_request",target:"other" as const,text:"Lady Capulet begegnet Juliette als Tochter, von der sie eine Antwort auf die Heiratsaussicht erwartet."},
  {id:"self_refusal",sourceId:"c02_transfer_juliette_refusal",target:"finding" as const,text:"Juliette lehnt die Hochzeit mit Paris ausdrücklich ab."},
  {id:"self_finding",sourceId:"c02_main_juliette_answer",target:"finding" as const,text:"Juliette erklärt, wie weit sie beim Betrachten von Paris gehen will."},
  {id:"self_overreach",sourceId:"c02_main_juliette_answer",target:"unsupported" as const,text:"Lady Capulets Erwartung beweist objektiv, dass Juliette grundsätzlich gehorsam ist."},
] as const;

export const transferSourceIds=["c02_transfer_lady_announcement","c02_transfer_juliette_refusal","c02_transfer_juliette_distinction","c02_transfer_juliette_plea","c02_transfer_capulet_threat","c02_transfer_nurse_defends","c02_transfer_lady_withdraws","c02_transfer_juliette_nurse_plea","c02_transfer_nurse_advice","c02_transfer_juliette_break"] as const;
export const transferTasks=[
  {id:"transfer_goal",sourceId:"c02_transfer_juliette_refusal",category:"Ziel",options:["Juliette möchte die Hochzeit mit Paris verhindern oder hinauszögern.","Juliette möchte Paris persönlich kennenlernen.","Juliette möchte Lady Capulet zur Heirat überreden.","Das Ziel ist nicht sicher feststellbar."],answer:0},
  {id:"transfer_power",sourceId:"c02_transfer_capulet_threat",category:"Machtverhältnis",options:["Beide verfügen über vollständig gleiche Handlungsmöglichkeiten.","Juliette entscheidet in dieser Szene allein über Capulets Handeln.","Capulet setzt familiäre und materielle Macht gegen Juliettes Widerspruch ein.","Das Machtverhältnis kehrt sich sofort um."],answer:2},
  {id:"transfer_relationship",sourceId:"c02_transfer_lady_withdraws",category:"Beziehung",options:["Lady Capulet unterstützt Juliettes Widerspruch offen.","In diesem Moment vergrößert sich die Distanz zwischen Mutter und Tochter.","Die Äußerung beweist dauerhafte Feindschaft.","Die Beziehung bleibt von der Reaktion unberührt."],answer:1},
  {id:"transfer_trust",sourceId:"c02_transfer_juliette_break",category:"Selbst-/Fremdbild",options:["Die Amme beschreibt sich selbst als unzuverlässig.","Juliette vertraut der Amme nun stärker als zuvor.","Der Text beweist, dass beide einander nie vertraut haben.","Juliettes Bild der Amme verändert sich; die frühere Vertrautheit trägt hier nicht mehr."],answer:3},
] as const;

export const comparisonCards=[
  {id:"compare_early",target:"early" as const,text:"Juliette antwortet vorsichtig, will Paris erst betrachten und bezieht den Willen ihrer Mutter ein."},
  {id:"compare_early_open",target:"early" as const,text:"Die frühere Situation lässt noch offen, wie Juliette sich nach der Begegnung mit Paris entscheiden würde."},
  {id:"compare_late",target:"late" as const,text:"Juliette lehnt die geplante Hochzeit ausdrücklich ab und bittet zugleich um Gehör und Aufschub."},
  {id:"compare_late_pressure",target:"late" as const,text:"In der späteren Situation reagiert Juliette unter unmittelbarem familiärem Druck."},
  {id:"compare_context",target:"conclusion" as const,text:"Die Ausschnitte zeigen unterschiedliches situatives Verhalten; sie belegen keine einfache Entwicklung von „gehorsam“ zu „rebellisch“."},
  {id:"compare_cautious",target:"conclusion" as const,text:"Der Vergleich erlaubt eine vorsichtige Aussage über veränderte Situationen, aber keine sichere Behauptung über Juliettes Verhalten in jeder Lage."},
  {id:"compare_unsupported_rebel",target:"unsupported" as const,text:"Juliette entwickelt sich von einer vollständig gehorsamen zu einer grundsätzlich rebellischen Figur."},
  {id:"compare_unsupported_love",target:"unsupported" as const,text:"Der Vergleich beweist, dass Juliette Paris in der früheren Situation heimlich liebt."},
] as const;

export const ensembleLinks=[
  {id:"ensemble_lady",from:"Juliette",to:"Lady Capulet",sourceId:"c02_transfer_lady_withdraws",label:"Erwartung, Macht und wachsende Distanz"},
  {id:"ensemble_capulet",from:"Juliette",to:"Capulet",sourceId:"c02_transfer_capulet_threat",label:"familiäre Macht und offener Konflikt"},
  {id:"ensemble_nurse",from:"Juliette",to:"Amme",sourceId:"c02_transfer_juliette_break",label:"Vertrauen wird in der späteren Situation aufgekündigt"},
] as const;
