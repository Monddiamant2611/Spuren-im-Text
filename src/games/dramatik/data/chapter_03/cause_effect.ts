export const relationalRoles=[
 {id:"role_blocked_missing",focus:"event_missing",relativeTo:"event_blocked",role:"effect",label:"Folge der verhinderten Zustellung"},
 {id:"role_missing_action",focus:"event_missing",relativeTo:"event_action",role:"cause",label:"Ursache beziehungsweise Voraussetzung des Handelns ohne Lorenzos Information"},
] as const;
export const missingInformation={id:"missing_plan",text:"Lorenzos Plan und Julias tatsächlicher Zustand",text_origin:"didactic_summary",feedback:"Diese Information hätte Romeos Wissensstand grundlegend verändert. Wie sich die Handlung danach entwickelt hätte, lässt sich aus dem Drama nicht sicher ableiten."} as const;
