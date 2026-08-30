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
 {id:"leon_team",label:"Leon will den Ball behalten; seine Mitspielerin fordert einen Pass.",answer:"external"},
 {id:"leon_inner",label:"Leon will widersprechen, möchte die Freundschaft aber nicht gefährden.",answer:"internal"},
 {id:"samira_rule",label:"Samira möchte auftreten; die Leitung verweigert ihr den Zugang zur Bühne.",answer:"external"},
 {id:"samira_inner",label:"Samira freut sich auf den Auftritt und zweifelt zugleich an ihrer Vorbereitung.",answer:"internal"},
] as const;
export const causalIntro=[
 {id:"rain",label:"Mara verlässt das Haus. Danach beginnt es zu regnen.",answer:"temporal"},
 {id:"return",label:"Mara kehrt zurück, weil sie keinen Schirm hat.",answer:"causal"},
 {id:"bell",label:"Die Schulglocke läutet. Kurz danach öffnet jemand ein Fenster.",answer:"temporal"},
 {id:"dark",label:"Weil das Licht ausfällt, schaltet Leon seine Taschenlampe ein.",answer:"causal"},
 {id:"book",label:"Mara legt das Buch weg. Danach fährt draußen ein Bus vorbei.",answer:"temporal"},
 {id:"message",label:"Die Nachricht warnt vor Glatteis; deshalb nimmt Samira einen anderen Weg.",answer:"causal"},
] as const;
export const dramaticCurve=[
 {id:"curve_start",stage:"situation",label:"Mara wartet mit Leon auf Samira, bevor die Probe beginnt."},
 {id:"curve_tension",stage:"tension",label:"Leon will ohne Samira anfangen; Mara besteht darauf zu warten."},
 {id:"curve_escalation",stage:"escalation",label:"Leon nimmt bereits das Manuskript und ruft die erste Szene auf."},
 {id:"curve_turn",stage:"turning",label:"Samira erscheint und erklärt, dass die Leitung ihr den Zutritt verweigert hatte."},
 {id:"curve_result",stage:"consequence",label:"Die Probe wird unterbrochen; die drei müssen neu entscheiden, wie sie weiterarbeiten."},
] as const;
export const neutralActionChains=[
 {id:"neutral_door",impulse:"Leon schließt die Probentür.",reaction:"Mara fordert ihn auf, Samira hereinzulassen.",effect:"Der Gegensatz wird offen ausgesprochen."},
 {id:"neutral_script",impulse:"Leon beginnt ohne Samira zu lesen.",reaction:"Mara nimmt das Manuskript vom Pult.",effect:"Die Probe kann in der bisherigen Form nicht fortgesetzt werden."},
 {id:"neutral_arrival",impulse:"Samira erklärt den verweigerten Zutritt.",reaction:"Leon legt das Manuskript zurück.",effect:"Die Gruppe richtet ihre Aufmerksamkeit auf das neue Problem."},
] as const;
export const neutralTurningPoints=[
 {id:"neutral_start",label:"Leon kündigt an, ohne Samira zu beginnen.",before:"Die Gruppe wartet auf den Probenbeginn.",change:"Ein gegensätzliches Ziel wird sichtbar.",after:"Mara widerspricht.",judgement:"escalation"},
 {id:"neutral_script",label:"Leon nimmt das Manuskript und beginnt.",before:"Der Konflikt wird sprachlich ausgetragen.",change:"Leon setzt sein Ziel praktisch um.",after:"Mara greift ein und stoppt die Probe.",judgement:"turning"},
 {id:"neutral_arrival",label:"Samira erscheint.",before:"Mara und Leon streiten über das Warten.",change:"Neue Informationen über den verweigerten Zutritt werden bekannt.",after:"Die bisherige Streitfrage muss neu bewertet werden.",judgement:"turning"},
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
 {id:"paris_goal",character:"Paris",label:"Romeo anhalten und festnehmen",evidence:"c04_tomb_paris_arrest",analysis:"Paris formuliert ausdrücklich seinen Zugriff auf Romeo und verlangt Gehorsam."},
 {id:"romeo_goal",character:"Romeo",label:"Ungestört in die Gruft gelangen",evidence:"c04_tomb_romeo_order",analysis:"Romeo verlangt von Balthasar Abstand und ausdrücklich, sein Vorhaben nicht zu unterbrechen."},
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
export const tombActionChains=[
 {id:"tomb_appeal",impulse:"Romeo fordert Paris zum Fortgehen auf.",reaction:"Paris weist das zurück und hält an der Festnahme fest.",effect:"Die gegensätzlichen Ziele bleiben unvereinbar; die Zuspitzung setzt sich fort."},
 {id:"tomb_arrest",impulse:"Paris erklärt, Romeo zu arrestieren.",reaction:"Romeo warnt ihn vor weiterer Reizung.",effect:"Die Sprache wird dringlicher, ohne den Konflikt zu lösen."},
 {id:"tomb_fight",impulse:"Die Figuren beginnen zu fechten.",reaction:"Paris fällt.",effect:"Der äußere Konflikt hat eine nicht rücknehmbare körperliche Folge."},
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
export const internalPreparation=[
 {id:"prep_wish",label:"Samira möchte bei der Aufführung die Hauptrolle übernehmen.",target:"wish"},
 {id:"prep_fear",label:"Sie fürchtet, bei der Premiere den Text zu vergessen.",target:"fear"},
 {id:"prep_weigh",label:"Sie vergleicht die Chance mit dem Risiko eines Scheiterns.",target:"weighing"},
 {id:"prep_decision",label:"Sie entscheidet sich, die Rolle anzunehmen.",target:"decision"},
 {id:"prep_execution",label:"Sie trägt ihren Namen in die Besetzungsliste ein.",target:"execution"},
] as const;
export const julietAlternatives=[
 {id:"alt_textual",label:"Juliette erwägt ausdrücklich, sich mit Gewalt an Paris verheiraten zu lassen, und verwirft dies.",target:"textual"},
 {id:"alt_plausible",label:"Juliette könnte aufgrund ihrer Lage erneut das Gespräch mit einer Vertrauensperson suchen.",target:"plausible"},
 {id:"alt_speculation",label:"Juliette plant heimlich, Verona allein mit einem Schiff zu verlassen.",target:"unsupported"},
] as const;
export const comparisonAspects=[
 {id:"compare_carriers_external",label:"Die Konfliktträger sind Romeo und Paris.",target:"external"},
 {id:"compare_carriers_internal",label:"Handlungswunsch und Befürchtungen liegen innerhalb Juliettes.",target:"internal"},
 {id:"compare_visibility_external",label:"Der Gegensatz wird in Rede und körperlichem Handeln zwischen Figuren sichtbar.",target:"external"},
 {id:"compare_visibility_internal",label:"Der Gegensatz wird im Monolog als Abwägung dargestellt.",target:"internal"},
 {id:"compare_turn_external",label:"Das Fechten verändert den äußeren Handlungsverlauf unumkehrbar.",target:"external"},
 {id:"compare_turn_internal",label:"Entschluss und Trinken führen Juliettes inneres Ringen in eine Ausführung.",target:"internal"},
] as const;
export const finalCurve=[
 {id:"final_situation",label:"Romeo und Paris begegnen sich an der Gruft.",stage:"situation"},
 {id:"final_conflict",label:"Ihre Deutungen und Ziele sind unvereinbar.",stage:"conflict"},
 {id:"final_goal",label:"Paris will Romeo festnehmen; Romeo will ungestört bleiben.",stage:"goals"},
 {id:"final_action",label:"Romeo fordert Paris zum Fortgehen auf.",stage:"action"},
 {id:"final_reaction",label:"Paris weist die Aufforderung zurück.",stage:"reaction"},
 {id:"final_escalation",label:"Warnung und Festnahmeabsicht verschärfen den Gegensatz.",stage:"escalation"},
 {id:"final_turn",label:"Der Wortkonflikt geht in das Fechten über.",stage:"turning"},
 {id:"final_consequence",label:"Paris fällt.",stage:"consequence"},
] as const;
export const finalConnections=[
 {id:"after",label:"Ein Ereignis geschieht später; ein Zusammenhang ist nicht belegt.",answer:"only_later"},
 {id:"cause",label:"Eine Handlung löst die folgende Reaktion unmittelbar aus.",answer:"causes"},
 {id:"part",label:"Eine Handlung wirkt mit weiteren Bedingungen zusammen.",answer:"contributes"},
] as const;
