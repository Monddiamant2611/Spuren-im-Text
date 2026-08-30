import records from "./primary-sources/romeo-juliette-wieland-chapter-03.json" with {type:"json"};
import type {PrimarySourceRecord} from "../../../core/content/types";

export const chapter03PrimarySources=records as PrimarySourceRecord[];
export const chapter03Source=(id:string)=>chapter03PrimarySources.find(item=>item.id===id)!;
export const practiceDialogue=[{speaker:"MARA",text:"Du gehst jetzt nicht."},{speaker:"LEON",text:"Ich habe dir nichts zu erklären."},{speaker:"MARA",text:"Dann sieh mich wenigstens an."},{speaker:"LEON",text:"Lass mich vorbei."}] as const;
export const practiceConversationModel=[
 {id:"model_utterance",label:"Äußerung",value:"Du gehst jetzt nicht."},
 {id:"model_act",label:"Sprachhandlung",value:"Mara fordert Leon auf, zu bleiben."},
 {id:"model_reaction",label:"Reaktion",value:"Leon weist die Gesprächseröffnung zurück."},
 {id:"model_change",label:"Veränderung",value:"Aus dem Versuch, ihn aufzuhalten, entsteht ein offener Widerspruch."},
] as const;
export const practiceActs=[
 {id:"practice_mara_stop",line:0,act:"auffordern",goal:"Leon am Gehen hindern",actOptions:["feststellen","auffordern","warnen"],goalOptions:["eine Entscheidung begründen","Informationen über Leons Plan erhalten","Leon am Gehen hindern"]},
 {id:"practice_leon_reject",line:1,act:"zurückweisen",goal:"eine Erklärung vermeiden",actOptions:["zurückweisen","sich rechtfertigen","nachfragen"],goalOptions:["eine Erklärung vermeiden","Mara von seiner Position überzeugen","das Gespräch vertiefen"]},
 {id:"practice_mara_look",line:2,act:"auffordern",goal:"Leons Aufmerksamkeit auf das Gespräch lenken",actOptions:["beschwichtigen","einen Vorwurf äußern","auffordern"],goalOptions:["Leon zum Fortgehen bewegen","Leons Aufmerksamkeit auf das Gespräch lenken","die Verspätung entschuldigen"]},
 {id:"practice_leon_leave",line:3,act:"auffordern",goal:"die Situation verlassen",actOptions:["zurückweisen","auffordern","beschwichtigen"],goalOptions:["Mara zu einer Erklärung bewegen","die Verspätung ausgleichen","die Situation verlassen"]},
] as const;
export const initiativeTasks=[
 {id:"initiative_departure",text:"Leon kündigt an, dass er geht.",target:"maintains",label:"hält die bestehende Gesprächsrichtung aufrecht"},
 {id:"initiative_attention",text:"Mara fordert Leon auf zu warten und verlangt eine Erklärung.",target:"impulse",label:"setzt einen neuen Impuls"},
 {id:"initiative_refusal",text:"Leon verweigert die Erklärung.",target:"reaction",label:"reagiert auf einen bestehenden Impuls"},
] as const;
export const initiativeTurning="initiative_attention";

export const neutralPhases=[
 {id:"neutral_start",label:"Ausgangslage",text:"Leon will gehen; Mara spricht ihn an."},
 {id:"neutral_initiative",label:"Initiative",text:"Mara fordert Leon auf, zu bleiben."},
 {id:"neutral_reaction",label:"Reaktion",text:"Leon verweigert eine Erklärung."},
 {id:"neutral_change",label:"Veränderung",text:"Mara fordert nun wenigstens seine Aufmerksamkeit."},
 {id:"neutral_result",label:"Ergebnis",text:"Leon hält an seinem Ziel fest, die Situation zu verlassen."},
] as const;
export const neutralBoundary={
 after:"neutral_reaction",
 reason:"Mara verändert nach Leons Zurückweisung ihre Strategie: Sie verlangt nicht mehr das Bleiben, sondern zunächst Aufmerksamkeit.",
 distractors:["Jede neue Äußerung bildet automatisch eine neue Phase.","Die Sprecherin wechselt nicht; deshalb gibt es keine Veränderung."]
} as const;
export const neutralLanguage=[
 {id:"neutral_language",finding:"Die Formulierung ‚Dann sieh mich wenigstens an.‘ enthält eine direkte Aufforderung und die Einschränkung ‚wenigstens‘.",effect:"Mara senkt ihr unmittelbares Ziel und erhöht zugleich den Druck, ihr Aufmerksamkeit zu geben.",function:"Die Äußerung markiert eine veränderte Strategie nach Leons Zurückweisung."}
] as const;

export const mainSections=[
 {id:"main_a",label:"Abschnitt A",sourceIds:["c03_main_tybalt_open","c03_main_mercutio_provoke"],summary:"Tybalt eröffnet das Gespräch; Mercutio reagiert mit einer Zuspitzung."},
 {id:"main_b",label:"Abschnitt B",sourceIds:["c03_main_benvolio_public","c03_main_mercutio_refuse"],summary:"Benvolio schlägt eine Verlagerung oder ruhige Klärung vor; Mercutio weist das zurück."},
 {id:"main_c",label:"Abschnitt C",sourceIds:["c03_main_romeo_enters","c03_main_tybalt_insult","c03_main_romeo_answer","c03_main_tybalt_challenge","c03_main_romeo_reassure"],summary:"Tybalt richtet den Konflikt an Romeo; Romeo antwortet und versucht, ihn zu beruhigen."},
 {id:"main_d",label:"Abschnitt D",sourceIds:["c03_main_mercutio_challenge","c03_main_tybalt_draws","c03_main_romeo_stop","c03_main_fight","c03_main_romeo_intervenes"],summary:"Mercutio fordert Tybalt heraus; aus der verbalen Auseinandersetzung wird ein Kampf."},
] as const;
export const goalTasks=[
 {id:"goal_benvolio",sectionId:"main_b",sourceId:"c03_main_benvolio_public",goal:"die öffentliche Auseinandersetzung beenden oder verlagern"},
 {id:"goal_tybalt",sectionId:"main_c",sourceId:"c03_main_tybalt_challenge",goal:"Romeo zur bewaffneten Auseinandersetzung herausfordern"},
 {id:"goal_romeo",sectionId:"main_c",sourceId:"c03_main_romeo_reassure",goal:"Tybalt beruhigen und den Konflikt vermeiden"},
] as const;
export const mainEvidenceLabels:Record<string,string>={
 c03_main_benvolio_public:"Beleg A · Benvolio schlägt eine ruhige Klärung oder Verlagerung vor.",
 c03_main_mercutio_refuse:"Beleg B · Mercutio weist Benvolios Vorschlag zurück.",
 c03_main_tybalt_insult:"Beleg C · Tybalt richtet den Konflikt auf Romeo.",
 c03_main_tybalt_challenge:"Beleg D · Tybalt fordert Romeo zur bewaffneten Auseinandersetzung heraus.",
 c03_main_romeo_reassure:"Beleg E · Romeo versucht, Tybalt zu beruhigen.",
};
export const goalChange={id:"romeo_goal_change",first:"c03_main_romeo_reassure",second:"c03_main_romeo_intervenes",answer:"verändert_sich",explanation:"Romeo versucht zunächst, Tybalt sprachlich zu beruhigen; später greift er in den bereits begonnenen Kampf ein und will die Degen trennen."} as const;
export const speechTasks=[
 {id:"act_mercutio",sourceId:"c03_main_mercutio_provoke",act:"provozieren",reactionId:"c03_main_benvolio_public",effect:"Benvolio versucht, die Auseinandersetzung aus der Öffentlichkeit zu verlagern.",options:[
  {act:"auffordern",reactionId:"c03_main_benvolio_public",label:"auffordern → Benvolio schlägt eine Verlagerung vor"},
  {act:"provozieren",reactionId:"c03_main_benvolio_public",label:"provozieren → Benvolio schlägt eine Verlagerung vor"},
  {act:"provozieren",reactionId:"c03_main_mercutio_refuse",label:"provozieren → Mercutio weist Benvolios Vorschlag zurück"},
 ]},
 {id:"act_benvolio",sourceId:"c03_main_benvolio_public",act:"beschwichtigen",reactionId:"c03_main_mercutio_refuse",effect:"Mercutio weist den Vorschlag zurück.",options:[
  {act:"beschwichtigen",reactionId:"c03_main_mercutio_refuse",label:"beschwichtigen → Mercutio weist die Verlagerung zurück"},
  {act:"warnen",reactionId:"c03_main_mercutio_refuse",label:"warnen → Mercutio weist die Verlagerung zurück"},
  {act:"beschwichtigen",reactionId:"c03_main_tybalt_challenge",label:"beschwichtigen → Tybalt fordert Romeo heraus"},
 ]},
 {id:"act_tybalt",sourceId:"c03_main_tybalt_challenge",act:"herausfordern",reactionId:"c03_main_romeo_reassure",effect:"Romeo weist die Beleidigung zurück und versucht erneut zu beruhigen.",options:[
  {act:"beschuldigen",reactionId:"c03_main_romeo_reassure",label:"beschuldigen → Romeo versucht zu beruhigen"},
  {act:"herausfordern",reactionId:"c03_main_mercutio_challenge",label:"herausfordern → Mercutio fordert Tybalt heraus"},
  {act:"herausfordern",reactionId:"c03_main_romeo_reassure",label:"herausfordern → Romeo versucht zu beruhigen"},
 ]},
 {id:"act_romeo_reassure",sourceId:"c03_main_romeo_reassure",act:"beschwichtigen",reactionId:"c03_main_mercutio_challenge",effect:"Mercutio übernimmt die Konfrontation und fordert Tybalt heraus.",options:[
  {act:"beschwichtigen",reactionId:"c03_main_tybalt_draws",label:"beschwichtigen → Tybalt zieht unmittelbar den Degen"},
  {act:"rechtfertigen",reactionId:"c03_main_mercutio_challenge",label:"sich rechtfertigen → Mercutio übernimmt die Konfrontation"},
  {act:"beschwichtigen",reactionId:"c03_main_mercutio_challenge",label:"beschwichtigen → Mercutio übernimmt die Konfrontation"},
 ]},
 {id:"act_mercutio_challenge",sourceId:"c03_main_mercutio_challenge",act:"herausfordern",reactionId:"c03_main_tybalt_draws",effect:"Tybalt zieht den Degen.",options:[
  {act:"drohen",reactionId:"c03_main_tybalt_draws",label:"drohen → Tybalt zieht den Degen"},
  {act:"herausfordern",reactionId:"c03_main_tybalt_draws",label:"herausfordern → Tybalt zieht den Degen"},
  {act:"herausfordern",reactionId:"c03_main_romeo_stop",label:"herausfordern → Romeo fordert Mercutio zum Einstecken auf"},
 ]},
 {id:"act_romeo",sourceId:"c03_main_romeo_stop",act:"auffordern",reactionId:"c03_main_fight",effect:"Die Aufforderung stoppt die körperliche Auseinandersetzung nicht.",options:[
  {act:"auffordern",reactionId:"c03_main_fight",label:"auffordern → Mercutio und Tybalt fechten weiter"},
  {act:"warnen",reactionId:"c03_main_fight",label:"warnen → Mercutio und Tybalt fechten weiter"},
  {act:"auffordern",reactionId:"c03_main_romeo_intervenes",label:"auffordern → Romeo ruft Benvolio zur Hilfe"},
 ]},
] as const;
export const phaseOrder=["main_a","main_b","main_c","main_d"] as const;
export const phaseBoundary={after:"main_c",reason:"Mercutio übernimmt nach Romeos Beschwichtigungsversuch die Initiative und fordert Tybalt zum Kampf heraus."} as const;
export const turningPoints=[
 {id:"turn_romeo",sourceId:"c03_main_romeo_reassure",before:"Tybalt fordert Romeo heraus.",after:"Mercutio übernimmt die Konfrontation.",change:"Romeos Beschwichtigungsversuch verändert Tybalts Ziel nicht; die Initiative wechselt jedoch anschließend zu Mercutio.",strength:"plausible"},
 {id:"turn_draw",sourceId:"c03_main_tybalt_draws",before:"Mercutio fordert Tybalt sprachlich heraus.",after:"Tybalt zieht den Degen.",change:"Die sprachliche Herausforderung erhält ein ausdrücklich vorgegebenes körperliches Handlungssignal.",strength:"strong"},
 {id:"turn_fight",sourceId:"c03_main_fight",before:"Romeo fordert Mercutio auf, den Degen einzustecken.",after:"Mercutio und Tybalt fechten.",change:"Der Konflikt wechselt ausdrücklich zur körperlichen Auseinandersetzung.",strength:"strong"}
] as const;
export const languageTasks=[
 {id:"language_imperative",sourceId:"c03_main_tybalt_challenge",feature:"Aufforderung und imperativische Zuspitzung",effect:"Die Wortwahl drängt Romeo zu einer unmittelbaren Reaktion.",function:"Tybalt verschärft seine Herausforderung."},
 {id:"language_appeal",sourceId:"c03_main_romeo_intervenes",feature:"wiederholte Anreden und Aufforderungen",effect:"Romeos Eingreifen wirkt dringlich.",function:"Er versucht, die körperliche Auseinandersetzung zu unterbrechen."},
] as const;
export const findingTasks=[
 {id:"finding_draw",text:"Tybalt zieht seinen Degen.",target:"text",sourceId:"c03_main_tybalt_draws"},
 {id:"finding_slow",text:"Tybalt zieht den Degen langsam und geht bedrohlich vor.",target:"staging",sourceId:"c03_main_tybalt_draws"},
 {id:"finding_fight",text:"Mercutio und Tybalt beginnen zu fechten.",target:"text",sourceId:"c03_main_fight"},
 {id:"finding_inner",text:"Tybalt ist innerlich vollkommen außer Kontrolle.",target:"unsupported",sourceId:"c03_main_tybalt_challenge"},
] as const;
export const stageEffectTask={sourceId:"c03_main_fight",effect:"Die ausdrücklich vorgegebene Bühnenhandlung zeigt, dass sprachliche Beschwichtigung den Umschlag in körperliche Gewalt nicht verhindert.",wrong:"Die Angabe legt fest, dass beide Figuren dabei wütend blicken."} as const;
export const miniAnalysis=[
 {id:"mini_claim",kind:"claim",text:"Mercutios Eingreifen verschärft die Konfrontation."},
 {id:"mini_evidence",kind:"evidence",sourceId:"c03_main_mercutio_challenge",text:"Mercutio fordert Tybalt auf, den Degen zu ziehen."},
 {id:"mini_analysis",kind:"analysis",text:"Die Herausforderung übernimmt die Gesprächsinitiative und beantwortet Romeos Beschwichtigung mit neuer Konfrontation."},
 {id:"mini_function",kind:"function",text:"Dadurch bewegt sich der Dialog vom Deeskalationsversuch zum Umschlag in körperliche Handlung."},
] as const;
export const miniAnalysisOptions=[
 {kind:"claim",options:[miniAnalysis[0],{id:"mini_claim_distractor",kind:"claim",text:"Mercutio ist grundsätzlich für jeden Streit verantwortlich."}]},
 {kind:"evidence",options:[miniAnalysis[1],{id:"mini_evidence_distractor",kind:"evidence",sourceId:"c03_main_romeo_reassure",text:"Romeo versucht, Tybalt zu beruhigen."}]},
 {kind:"analysis",options:[miniAnalysis[2],{id:"mini_analysis_distractor",kind:"analysis",text:"Mercutio spricht länger als Romeo und gewinnt deshalb das Gespräch."}]},
 {kind:"function",options:[miniAnalysis[3],{id:"mini_function_distractor",kind:"function",text:"Die Äußerung beweist eine unveränderliche Eigenschaft Mercutios."}]},
] as const;
export const transferSections=[
 {id:"transfer_a",sourceIds:["c03_transfer_juliette_name","c03_transfer_romeo_listens"],summary:"Juliette spricht zunächst, ohne zu wissen, dass Romeo zuhört."},
 {id:"transfer_b",sourceIds:["c03_transfer_romeo_answer","c03_transfer_juliette_question","c03_transfer_romeo_identity","c03_transfer_juliette_recognizes"],summary:"Romeo antwortet; Juliette fragt nach seiner Identität und erkennt seine Stimme."},
 {id:"transfer_c",sourceIds:["c03_transfer_juliette_danger","c03_transfer_romeo_love","c03_transfer_juliette_concern"],summary:"Juliette benennt die Gefahr; Romeo antwortet, und Juliette zeigt Sorge um seine Entdeckung."},
] as const;
export const transferTasks=[
 {id:"transfer_start",sourceId:"c03_transfer_romeo_listens",claim:"Romeo muss entscheiden, ob er aus dem Zuhören in ein gemeinsames Gespräch wechselt."},
 {id:"transfer_goal",sourceId:"c03_transfer_juliette_question",claim:"Juliette versucht nach Romeos Antwort zu klären, wer sie belauscht hat."},
 {id:"transfer_reaction",sourceId:"c03_transfer_romeo_identity",claim:"Romeo reagiert auf Juliettes Frage, ohne sich zunächst einfach mit seinem Namen vorzustellen."},
 {id:"transfer_change",sourceId:"c03_transfer_juliette_concern",claim:"Im späteren Gesprächsstand richtet Juliette ihre Aufmerksamkeit auf die Gefahr für Romeo."},
] as const;
export const comparisonTasks=[{id:"compare_main",target:"main",text:"Die Reaktionen verschärfen den Konflikt bis zur körperlichen Handlung."},{id:"compare_transfer",target:"transfer",text:"Fragen und Antworten entwickeln das heimlich begonnene Sprechen zu einem gemeinsamen Gespräch."},{id:"compare_method",target:"both",text:"Gesprächsziel, Sprachhandlung, Reaktion und Veränderung lassen sich in beiden Dialogtypen untersuchen."}] as const;
export const finalTask={goalSource:"c03_transfer_juliette_danger",actSource:"c03_transfer_romeo_love",reactionSource:"c03_transfer_juliette_concern",effect:"Juliettes Warnung führt zu Romeos Antwort; ihre spätere Sorge zeigt, dass das Gespräch die Gefahr nicht beendet, aber das Verhältnis sichtbar verändert."} as const;
