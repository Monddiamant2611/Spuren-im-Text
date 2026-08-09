export const perspectives=[
 {id:"perspective_observation",text:"Romeo befindet sich am Familienbegräbnis der Capulets.",target:"observation",text_origin:"didactic_summary"},
 {id:"perspective_interpretation",text:"Paris vermutet, Romeo wolle den Toten beziehungsweise dem Grab Schimpf antun.",target:"interpretation",text_origin:"didactic_summary"},
] as const;
export const conversationGoals=[
 {id:"goal_paris",character_id:"paris",goal:"Romeo aufhalten und festnehmen.",evidence:["c04_paris_arrest"],text_origin:"didactic_summary"},
 {id:"goal_romeo",character_id:"romeo",goal:"Romeo versucht zunächst, Paris zum Fortgehen zu bewegen und den Konflikt zu vermeiden.",evidence:["c04_romeo_warning"],rejected:"Romeo will Paris von Beginn an angreifen.",text_origin:"didactic_summary"},
] as const;
export const speechActs=[
 {id:"act_arrest",text:"Paris kündigt an, Romeo festzunehmen.",source_reference:"c04_paris_arrest",character_id:"paris",target:"festnehmen / auffordern",text_origin:"didactic_summary"},
 {id:"act_warn",text:"Romeo fordert Paris zum Fortgehen auf.",source_reference:"c04_romeo_warning",character_id:"romeo",target:"warnen",text_origin:"didactic_summary"},
 {id:"act_reject",text:"Paris weist Romeos Beschwörung zurück.",source_reference:"c04_paris_rejects",character_id:"paris",target:"zurückweisen",text_origin:"didactic_summary"},
] as const;
export const dialoguePhases=["Paris beobachtet","Paris tritt hervor","Paris beschuldigt und will festnehmen","Romeo fordert zum Gehen auf","Paris weist dies zurück","Romeo reagiert schärfer","Kampf"] as const;
export const escalationPoints=[
 {id:"escalation_arrest",label:"Paris kündigt die Festnahme an.",level:"konfrontativ"},
 {id:"escalation_rejection",label:"Paris weist Romeos Beschwörung zurück.",level:"konfrontativ"},
 {id:"escalation_fight",label:"Die Figuren fechten.",level:"eskaliert"},
] as const;
export const languageObservations=[
 {id:"language_repetition",observation:"Romeo fordert Paris wiederholt zum Fortgehen auf.",effect:"Sein anfänglicher Versuch, Distanz herzustellen, wird hervorgehoben."},
 {id:"language_criminalization",observation:"Paris verwendet abwertende und kriminalisierende Sprache.",effect:"Die Konfrontation wird verschärft."},
 {id:"language_emotion",observation:"Romeo beschreibt sich emotionalisiert als Verzweifelnden und Rasenden.",effect:"Seine bedrängte und gefährliche Lage wird hörbar."},
] as const;
