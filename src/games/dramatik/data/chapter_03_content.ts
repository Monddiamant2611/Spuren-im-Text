import records from "./primary-sources/romeo-juliette-wieland-chapter-03.json" with {type:"json"};
import type {PrimarySourceRecord} from "../../../core/content/types";

export const chapter03PrimarySources=records as PrimarySourceRecord[];
export const chapter03Source=(id:string)=>chapter03PrimarySources.find(item=>item.id===id)!;
export const practiceDialogue=[{speaker:"MARA",text:"Du gehst jetzt nicht."},{speaker:"LEON",text:"Ich habe dir nichts zu erklären."},{speaker:"MARA",text:"Dann sieh mich wenigstens an."},{speaker:"LEON",text:"Lass mich vorbei."}] as const;
export const practiceActs=[
 {id:"practice_mara_stop",line:0,act:"auffordern",goal:"Leon am Gehen hindern",actOptions:["feststellen","auffordern","warnen"],goalOptions:["eine Entscheidung begründen","Informationen über Leons Plan erhalten","Leon am Gehen hindern"]},
 {id:"practice_leon_reject",line:1,act:"zurückweisen",goal:"eine Erklärung vermeiden",actOptions:["zurückweisen","sich rechtfertigen","nachfragen"],goalOptions:["eine Erklärung vermeiden","Mara von seiner Position überzeugen","das Gespräch vertiefen"]},
 {id:"practice_mara_look",line:2,act:"auffordern",goal:"Leons Aufmerksamkeit auf das Gespräch lenken",actOptions:["beschwichtigen","einen Vorwurf äußern","auffordern"],goalOptions:["Leon zum Fortgehen bewegen","Leons Aufmerksamkeit auf das Gespräch lenken","die Verspätung entschuldigen"]},
 {id:"practice_leon_leave",line:3,act:"auffordern",goal:"die Situation verlassen",actOptions:["zurückweisen","auffordern","beschwichtigen"],goalOptions:["Mara zu einer Erklärung bewegen","die Verspätung ausgleichen","die Situation verlassen"]},
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
export const turningPoints=[{id:"turn_draw",sourceId:"c03_main_tybalt_draws",change:"Die zuvor sprachliche Herausforderung erhält ein körperliches Handlungssignal."},{id:"turn_fight",sourceId:"c03_main_fight",change:"Der Konflikt wechselt ausdrücklich zur körperlichen Auseinandersetzung."}] as const;
export const languageTasks=[
 {id:"language_imperative",sourceId:"c03_main_tybalt_challenge",feature:"Aufforderung und imperativische Zuspitzung",effect:"Die Wortwahl drängt Romeo zu einer unmittelbaren Reaktion.",function:"Tybalt verschärft seine Herausforderung."},
 {id:"language_appeal",sourceId:"c03_main_romeo_intervenes",feature:"wiederholte Anreden und Aufforderungen",effect:"Romeos Eingreifen wirkt dringlich.",function:"Er versucht, die körperliche Auseinandersetzung zu unterbrechen."},
] as const;
export const findingTasks=[
 {id:"finding_draw",text:"Tybalt zieht seinen Degen.",target:"text",sourceId:"c03_main_tybalt_draws"},
 {id:"finding_look",text:"Romeo und Tybalt halten durchgehend Blickkontakt.",target:"staging",sourceId:"c03_main_romeo_answer"},
 {id:"finding_smile",text:"Mercutio lächelt während seiner Herausforderung freundlich.",target:"unsupported",sourceId:"c03_main_mercutio_challenge"},
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
