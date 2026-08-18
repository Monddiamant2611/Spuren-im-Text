import source from "./primary-sources/romeo-juliette-wieland-chapter-04.json" with {type:"json"};

export const chapter04Source=source;
export const sourceById=(id:string)=>chapter04Source.find(item=>item.id===id);
export const introFacts=[
 {id:"party",label:"Mara möchte zu einer Feier gehen.",relevant:true,origin:"didactic"},
 {id:"study",label:"Ihr Vater erwartet, dass sie zu Hause lernt.",relevant:true,origin:"didactic"},
 {id:"shoes",label:"Mara trägt neue Schuhe.",relevant:false,origin:"didactic"},
] as const;
export const conflictTypes=[
 {id:"mara_father",label:"Mara will zur Feier; ihr Vater verlangt Lernen.",answer:"external"},
 {id:"mara_inner",label:"Mara möchte gehen, fürchtet aber die Folgen.",answer:"internal"},
] as const;
export const causalIntro=[
 {id:"rain",label:"Mara verlässt das Haus. Danach beginnt es zu regnen.",answer:"temporal"},
 {id:"return",label:"Mara kehrt zurück, weil sie keinen Schirm hat.",answer:"causal"},
] as const;
export const situationCards=[
 {id:"place",label:"Gruft der Capulets",target:"situation"},
 {id:"figures",label:"Romeo, Balthasar und Paris sind am Ort.",target:"situation"},
 {id:"prior",label:"Juliette gilt als tot; Romeo kehrt heimlich zurück.",target:"prior"},
 {id:"unknown",label:"Paris kennt Romeos tatsächliches Vorhaben.",target:"not_determinable"},
] as const;
export const knowledgeCards=[
 {id:"paris_assumes",label:"Paris deutet Romeos Kommen als Schändungsabsicht.",target:"paris",origin:"didactic_summary",evidence:"c04_tomb_paris_view"},
 {id:"romeo_goal",label:"Romeo will in die Gruft und verlangt, nicht gestört zu werden.",target:"romeo",origin:"didactic_summary",evidence:"c04_tomb_romeo_order"},
 {id:"paris_reason",label:"Romeo fordert Paris zunächst zum Fortgehen auf.",target:"romeo",origin:"didactic_summary",evidence:"c04_tomb_romeo_leave"},
 {id:"paris_unknown",label:"Paris kennt Romeos wirklichen Grund nicht.",target:"paris",origin:"didactic_summary",evidence:"c04_tomb_paris_view"},
] as const;
export const goals=[
 {id:"paris_goal",character:"Paris",label:"Romeo anhalten und festnehmen",evidence:"c04_tomb_paris_arrest"},
 {id:"romeo_goal",character:"Romeo",label:"Ungestört in die Gruft gelangen",evidence:"c04_tomb_romeo_order"},
] as const;
export const chain=[
 {id:"paris_interprets",label:"Paris deutet Romeos Anwesenheit als feindselig."},
 {id:"paris_stops",label:"Paris hält Romeo an."},
 {id:"romeo_appeals",label:"Romeo fordert Paris zum Fortgehen auf."},
 {id:"paris_rejects",label:"Paris weist Romeo zurück und arrestiert ihn."},
 {id:"fight",label:"Beide fechten; Paris fällt."},
] as const;
export const chainLinks=[
 {from:"paris_interprets",to:"paris_stops",type:"causes"},
 {from:"paris_stops",to:"romeo_appeals",type:"causes"},
 {from:"romeo_appeals",to:"paris_rejects",type:"contributes"},
 {from:"paris_rejects",to:"fight",type:"contributes"},
] as const;
export const escalationCards=[
 {id:"warning",label:"Romeo warnt Paris und fordert ihn zum Gehen auf.",level:"tension",evidence:"c04_tomb_romeo_warning"},
 {id:"reject",label:"Paris weist Romeo zurück und will ihn festnehmen.",level:"escalation",evidence:"c04_tomb_paris_reject"},
 {id:"fight",label:"Der Wortkonflikt geht in körperliches Handeln über.",level:"turning",evidence:"c04_tomb_fight"},
] as const;
export const julietCards=[
 {id:"alone",label:"Juliette stellt sich der Situation allein.",kind:"situation",evidence:"c04_juliet_alone"},
 {id:"marriage",label:"Sie will die Heirat mit Paris verhindern.",kind:"supports_action",evidence:"c04_juliet_no_marriage"},
 {id:"poison",label:"Sie fürchtet, die Tinktur könnte Gift sein.",kind:"feared_possibility",evidence:"c04_juliet_poison_fear"},
 {id:"wake",label:"Sie fürchtet, vor Romeos Ankunft zu erwachen.",kind:"feared_possibility",evidence:"c04_juliet_tomb_fear"},
 {id:"decision",label:"Sie fasst den Entschluss zu trinken.",kind:"decision",evidence:"c04_juliet_drinks"},
 {id:"execution",label:"Sie trinkt die Phiole aus.",kind:"execution",evidence:"c04_juliet_execution"},
] as const;
export const finalConnections=[
 {id:"after",label:"Ein Ereignis geschieht später; ein Zusammenhang ist nicht belegt.",answer:"only_later"},
 {id:"cause",label:"Eine Handlung löst die folgende Reaktion unmittelbar aus.",answer:"causes"},
 {id:"part",label:"Eine Handlung wirkt mit weiteren Bedingungen zusammen.",answer:"contributes"},
] as const;
