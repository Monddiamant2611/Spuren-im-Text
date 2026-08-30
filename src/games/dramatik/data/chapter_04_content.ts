import source from "./primary-sources/romeo-juliette-wieland-chapter-04.json" with {type:"json"};

export const chapter04Source=source;
export const sourceById=(id:string)=>chapter04Source.find(item=>item.id===id);
export const introFacts=[
 {id:"party",label:"Mara möchte zu einer Feier gehen.",relevant:true,origin:"didactic"},
 {id:"study",label:"Ihr Vater erwartet, dass sie zu Hause lernt.",relevant:true,origin:"didactic"},
 {id:"shoes",label:"Mara trägt neue Schuhe.",relevant:false,origin:"didactic"},
] as const;
export const generalGoalTasks=[
 {id:"goal_door",observation:"Mara stellt sich vor die einzige Tür und sagt: ‚Warte, bis Samira da ist.‘",options:["Mara will den Probenbeginn verzögern, bis Samira anwesend ist.","Mara erklärt, weshalb Samira fehlt.","Mara reagiert auf eine bereits beendete Probe.","Ein Ziel lässt sich nicht erkennen."],answer:0},
 {id:"goal_script",observation:"Leon schlägt das Manuskript auf und beginnt laut mit der ersten Szene.",options:["Leon möchte die Tür bewachen.","Leon will die Probe ohne weiteres Warten beginnen.","Leon kennt Samiras Aufenthaltsort.","Die Probe ist bereits beendet."],answer:1},
 {id:"goal_message",observation:"Samira schreibt: ‚Beginnt noch nicht; ich kläre gerade den Zutritt.‘",options:["Samira will verhindern, dass die Probe vor ihrer Klärung beginnt.","Samira begründet sicher, warum die Tür verschlossen ist.","Samira führt die erste Szene bereits aus.","Samira will die Besetzung verlassen."],answer:0},
 {id:"goal_list",observation:"Mara legt die Anwesenheitsliste neben das Pult und bittet Leon, noch nichts einzutragen.",options:["Mara will die Liste verstecken.","Mara will eine Eintragung vorerst verhindern.","Mara weiß, wer die Tür verschlossen hat.","Mara bewertet Leons Charakter."],answer:1},
] as const;
export const conflictTypes=[
 {id:"mara_father",label:"Mara will zur Feier; ihr Vater verlangt Lernen.",answer:"external"},
 {id:"mara_inner",label:"Mara möchte gehen, fürchtet aber die Folgen.",answer:"internal"},
 {id:"leon_team",label:"Leon will den Ball behalten; seine Mitspielerin fordert einen Pass.",answer:"external"},
 {id:"leon_inner",label:"Leon will widersprechen, möchte die Freundschaft aber nicht gefährden.",answer:"internal"},
 {id:"samira_rule",label:"Samira möchte auftreten; die Leitung verweigert ihr den Zugang zur Bühne.",answer:"external"},
 {id:"samira_inner",label:"Samira freut sich auf den Auftritt und zweifelt zugleich an ihrer Vorbereitung.",answer:"internal"},
] as const;
export const historyPractice=[
 {id:"history_denied",label:"Die Theaterleitung hatte Samira am Vortag bereits den Zugang verweigert.",target:"history"},
 {id:"history_waiting",label:"Mara und Leon stehen jetzt mit dem Manuskript im Probenraum.",target:"current"},
 {id:"history_notice",label:"Mara hat Samiras Nachricht über die Verzögerung gelesen.",target:"knowledge"},
 {id:"history_future",label:"Samira wird bei der nächsten Probe vermutlich früher kommen.",target:"future"},
 {id:"history_costume",label:"Leon besitzt zu Hause ein blaues Kostüm, das für den Streit keine Rolle spielt.",target:"irrelevant"},
 {id:"history_agreement",label:"Die Gruppe hatte vor Beginn vereinbart, nur vollständig zu proben.",target:"history"},
] as const;
export const causalIntro=[
 {id:"locked",label:"Mara schließt die einzige Tür ab. Leon kann den Raum nicht verlassen.",answer:"causes"},
 {id:"dark",label:"Das Licht fällt aus. Leon schaltet seine Taschenlampe ein.",answer:"causes"},
 {id:"warning",label:"Eine Nachricht warnt vor Glatteis. Samira nimmt einen sicheren Nebenweg.",answer:"causes"},
 {id:"rain",label:"Mara verlässt das Haus. Währenddessen setzt Regen ein.",answer:"only_later"},
 {id:"bell",label:"Die Schulglocke läutet. Im Nachbarraum wird ein Fenster geöffnet.",answer:"only_later"},
 {id:"bus",label:"Leon legt das Buch weg. Draußen fährt ein Bus vorbei.",answer:"only_later"},
 {id:"nervous",label:"Samira ist vor der Probe angespannt. Die unklare Rollenverteilung verschärft den Streit zusätzlich.",answer:"contributes"},
 {id:"late",label:"Die Probe beginnt verspätet. Der Zeitdruck macht eine ruhige Klärung schwieriger.",answer:"contributes"},
] as const;
export const generalEpistemicPractice=[
 {id:"epi_key",label:"Mara hat gesehen, dass Leon den einzigen Schlüssel eingesteckt hat.",target:"knowledge"},
 {id:"epi_start",label:"Leon schlägt das Manuskript auf und ruft die erste Szene auf.",target:"intention"},
 {id:"epi_silence",label:"Mara versteht Leons Schweigen als Ablehnung ihres Vorschlags.",target:"interpretation"},
 {id:"epi_reason",label:"Ob Leon die Tür aus Angst vor einer Störung geschlossen hat, lässt sich nicht erkennen.",target:"unsupported"},
 {id:"epi_message",label:"Samira hat die Nachricht gelesen, dass die Probe später beginnt.",target:"knowledge"},
 {id:"epi_list",label:"Samira trägt ihren Namen in die Besetzungsliste ein und legt den Stift bereit.",target:"intention"},
 {id:"epi_glance",label:"Leon hält Maras Blick für eine Aufforderung, das Manuskript wegzulegen.",target:"interpretation"},
 {id:"epi_future",label:"Ob Mara die Gruppe im nächsten Monat verlassen möchte, bleibt offen.",target:"unsupported"},
] as const;
export const generalEvidenceTasks=[
 {id:"evidence_stop",claim:"Mara versucht, Leon am Fortgehen zu hindern.",evidenceOptions:["Mara stellt sich vor die Tür und sagt: ‚Bleib, bis wir das geklärt haben.‘","Mara legt das Manuskript auf das Pult.","Leon blickt zur Uhr und nimmt seine Tasche."],evidenceAnswer:0,analysisOptions:["Die räumliche Handlung und die Aufforderung richten sich unmittelbar gegen Leons Fortgehen.","Der Satz beweist, dass Mara andere Menschen grundsätzlich kontrolliert.","Die Stelle zeigt nur Anwesenheit; ein situationsbezogenes Ziel ist nicht erkennbar."],analysisAnswer:0},
 {id:"evidence_begin",claim:"Leon will die Probe ohne Samira beginnen.",evidenceOptions:["Leon sagt: ‚Wir warten noch zwei Minuten.‘","Leon öffnet die erste Szene und verteilt die Rollen an die Anwesenden.","Samira sendet eine Nachricht an Mara."],evidenceAnswer:1,analysisOptions:["Das Öffnen der Szene und Verteilen der Rollen setzt einen Probenbeginn mit den Anwesenden praktisch um.","Der Beleg zeigt, dass Leon Samira grundsätzlich nicht leiden kann.","Die Handlung beweist nur, dass Leon lesen kann."],analysisAnswer:0},
] as const;
export const dramaticCurve=[
 {id:"curve_start",stage:"situation",label:"Mara wartet mit Leon auf Samira, bevor die Probe beginnt."},
 {id:"curve_tension",stage:"tension",label:"Leon will ohne Samira anfangen; Mara besteht darauf zu warten."},
 {id:"curve_escalation",stage:"escalation",label:"Leon nimmt bereits das Manuskript und ruft die erste Szene auf."},
 {id:"curve_turn",stage:"turning",label:"Samira erscheint und erklärt, dass die Leitung ihr den Zutritt verweigert hatte."},
 {id:"curve_result",stage:"consequence",label:"Die Probe wird unterbrochen; die drei müssen neu entscheiden, wie sie weiterarbeiten."},
] as const;
export const neutralActionChains=[
 {id:"neutral_door",impulse:"Leon schließt die Probentür.",reaction:"Mara fordert ihn auf, Samira hereinzulassen.",effect:"Der Gegensatz über das Warten wird offen ausgesprochen.",impulseOptions:["Leon beginnt die erste Szene zu lesen.","Leon schließt die Probentür.","Samira erklärt den verweigerten Zutritt."],reactionOptions:["Mara fordert ihn auf, Samira hereinzulassen.","Mara nimmt das Manuskript vom Pult.","Leon legt das Manuskript zurück."],effectOptions:["Die Probe kann in der bisherigen Form nicht fortgesetzt werden.","Der Gegensatz über das Warten wird offen ausgesprochen.","Die Gruppe bewertet den Zutrittsgrund neu."]},
 {id:"neutral_script",impulse:"Leon beginnt ohne Samira zu lesen.",reaction:"Mara nimmt das Manuskript vom Pult.",effect:"Die Probe kann in der bisherigen Form nicht fortgesetzt werden.",impulseOptions:["Samira erklärt den verweigerten Zutritt.","Leon schließt die Probentür.","Leon beginnt ohne Samira zu lesen."],reactionOptions:["Leon legt das Manuskript zurück.","Mara nimmt das Manuskript vom Pult.","Mara fordert ihn auf, die Tür zu öffnen."],effectOptions:["Der Gegensatz wird erstmals erwähnt.","Die Gruppe richtet ihre Aufmerksamkeit auf Samiras Nachricht.","Die Probe kann in der bisherigen Form nicht fortgesetzt werden."]},
 {id:"neutral_arrival",impulse:"Samira erklärt den verweigerten Zutritt.",reaction:"Leon legt das Manuskript zurück.",effect:"Die Gruppe richtet ihre Aufmerksamkeit auf das neue Problem.",impulseOptions:["Leon beginnt die erste Szene zu lesen.","Samira erklärt den verweigerten Zutritt.","Mara verschließt die Tür."],reactionOptions:["Mara nimmt das Manuskript an sich.","Leon legt das Manuskript zurück.","Samira verlässt wortlos den Raum."],effectOptions:["Die Gruppe richtet ihre Aufmerksamkeit auf das neue Problem.","Der Konflikt ist ohne weitere Klärung beendet.","Der Probenbeginn wird unmittelbar fortgesetzt."]},
] as const;
export const neutralTurningPoints=[
 {id:"neutral_start",label:"Leon kündigt an, ohne Samira zu beginnen.",before:"Die Gruppe wartet auf den Probenbeginn.",change:"Ein gegensätzliches Ziel wird sichtbar.",after:"Mara widerspricht.",judgement:"escalation"},
 {id:"neutral_script",label:"Leon nimmt das Manuskript und beginnt.",before:"Der Konflikt wird sprachlich ausgetragen.",change:"Leon setzt sein Ziel praktisch um.",after:"Mara greift ein und stoppt die Probe.",judgement:"turning"},
 {id:"neutral_arrival",label:"Samira erscheint.",before:"Mara und Leon streiten über das Warten.",change:"Neue Informationen über den verweigerten Zutritt werden bekannt.",after:"Die bisherige Streitfrage muss neu bewertet werden.",judgement:"turning"},
] as const;
export const situationCards=[
 {id:"meeting",label:"Romeo und Paris treffen an der Gruft aufeinander.",target:"situation"},
 {id:"paris_visit",label:"Paris besucht die Gruft, als Romeo dort eintrifft.",target:"situation"},
 {id:"prior",label:"Juliette gilt als tot; Romeo kehrt heimlich zurück.",target:"prior"},
 {id:"unknown",label:"Paris kennt Romeos tatsächliches Vorhaben.",target:"not_determinable"},
] as const;
export const knowledgeCards=[
 {id:"romeo_knows_arrest",label:"Romeo nimmt wahr, dass Paris ihn festnehmen will.",target:"romeo_knowledge",origin:"didactic_summary",evidence:"c04_tomb_paris_arrest"},
 {id:"romeo_intent",label:"Romeo verlangt von Balthasar Abstand und will sein Vorhaben ungestört fortsetzen.",target:"romeo_intention",origin:"didactic_summary",evidence:"c04_tomb_romeo_order"},
 {id:"paris_knows_presence",label:"Paris erkennt, dass Romeo an der Gruft anwesend ist.",target:"paris_knowledge",origin:"didactic_summary",evidence:"c04_tomb_paris_view"},
 {id:"paris_interprets",label:"Paris versteht Romeos Anwesenheit als Versuch, die Toten zu schänden.",target:"paris_interpretation",origin:"didactic_summary",evidence:"c04_tomb_paris_view"},
 {id:"paris_intent",label:"Paris will Romeo anhalten und festnehmen.",target:"paris_intention",origin:"didactic_summary",evidence:"c04_tomb_paris_arrest"},
 {id:"paris_unknown",label:"Paris kennt den tatsächlichen Zweck von Romeos Vorhaben in der Gruft.",target:"unsupported",origin:"didactic_summary",evidence:"c04_tomb_paris_view"},
] as const;
export const goals=[
 {id:"paris_goal",character:"Paris",goalOptions:["Romeo zum Verlassen der Gruft überreden","Romeo anhalten und festnehmen","Juliette vor Romeo schützen","Das Ziel ist nicht ausreichend feststellbar"],goalAnswer:1,evidence:"c04_tomb_paris_arrest",evidenceOptions:["c04_tomb_paris_view","c04_tomb_romeo_leave","c04_tomb_paris_arrest","c04_tomb_romeo_order"],analysis:"Paris erklärt seinen Zugriff auf Romeo und verlangt Gehorsam; daran wird die Festnahmeabsicht erkennbar.",analysisOptions:["Paris erklärt seinen Zugriff auf Romeo und verlangt Gehorsam; daran wird die Festnahmeabsicht erkennbar.","Paris beschreibt ausschließlich den Ort; ein Handlungsziel wird nicht erkennbar.","Die Stelle beweist eine dauerhaft herrische Charaktereigenschaft."]},
 {id:"romeo_goal",character:"Romeo",goalOptions:["Paris gezielt zum Kampf herausfordern","Ungestört sein Vorhaben in der Gruft fortsetzen","Balthasar zur Rückkehr nach Verona bewegen","Paris von Juliettes Zustand berichten"],goalAnswer:1,evidence:"c04_tomb_romeo_order",evidenceOptions:["c04_tomb_paris_arrest","c04_tomb_romeo_warning","c04_tomb_romeo_order","c04_tomb_paris_view"],analysis:"Romeo verlangt Abstand und ausdrücklich, sein Vorhaben nicht zu unterbrechen; daran wird sein Ziel ungestörten Handelns erkennbar.",analysisOptions:["Die Stelle beweist, dass Romeo grundsätzlich allein sein möchte.","Romeo verlangt Abstand und ausdrücklich, sein Vorhaben nicht zu unterbrechen; daran wird sein Ziel ungestörten Handelns erkennbar.","Der Beleg zeigt nur eine Ortsangabe, aber kein situationsbezogenes Ziel."]},
] as const;
export const chain=[
 {id:"paris_interprets",label:"Paris deutet Romeos Anwesenheit als feindselig."},
 {id:"paris_stops",label:"Paris tritt hervor und kündigt an, Romeo festzunehmen."},
 {id:"romeo_appeals",label:"Romeo fordert Paris zum Fortgehen auf."},
 {id:"paris_rejects",label:"Paris weist Romeos Aufforderung zurück."},
 {id:"fight",label:"Beide fechten; Paris fällt."},
] as const;
export const chainLinks=[
 {from:"paris_interprets",to:"paris_stops",type:"contributes"},
 {from:"paris_stops",to:"romeo_appeals",type:"causes"},
 {from:"romeo_appeals",to:"paris_rejects",type:"causes"},
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
 {id:"alone",label:"Juliette spricht ohne weitere Gesprächsfigur und nimmt die Phiole zur Hand.",kind:"situation",evidence:"c04_juliet_alone"},
 {id:"marriage",label:"Juliette weist die erzwungene Heirat zurück und bezieht die Phiole darauf.",kind:"supports_action",evidence:"c04_juliet_no_marriage"},
 {id:"poison",label:"Juliette formuliert die Möglichkeit, der Inhalt der Phiole sei Gift.",kind:"feared_possibility",evidence:"c04_juliet_poison_fear"},
 {id:"wake",label:"Juliette stellt sich ein Erwachen in der Gruft vor Romeos Ankunft vor.",kind:"feared_possibility",evidence:"c04_juliet_tomb_fear"},
 {id:"decision",label:"Juliette richtet ihre Worte an Romeo und kündigt das Trinken an.",kind:"decision",evidence:"c04_juliet_drinks"},
 {id:"execution",label:"Die Bühnenanweisung beschreibt das Austrinken der Phiole.",kind:"execution",evidence:"c04_juliet_execution"},
] as const;
export const julietSequence=[
 {id:"sequence_situation",label:"Ausgangslage: Juliette ist allein mit der Phiole."},
 {id:"sequence_forces",label:"Gegenkräfte: Ablehnung der Heirat und mehrere vorgestellte Gefahren stehen einander gegenüber."},
 {id:"sequence_weighing",label:"Abwägung: Juliette prüft mögliche Folgen, ohne dass diese bereits eingetreten sind."},
 {id:"sequence_decision",label:"Entscheidung: Sie kündigt das Trinken an."},
 {id:"sequence_execution",label:"Ausführung: Die Bühnenanweisung beschreibt das Austrinken."},
] as const;
export const internalPreparation=[
 {id:"prep_wish",label:"Samira sagt: ‚Die Hauptrolle würde ich gern übernehmen.‘",target:"wish"},
 {id:"prep_fear",label:"Vor der Zusage stellt Samira sich vor, bei der Premiere den Text zu verlieren.",target:"fear"},
 {id:"prep_weigh",label:"Samira hält die größere Gestaltungsmöglichkeit gegen das Risiko eines Scheiterns.",target:"weighing"},
 {id:"prep_decision",label:"Samira sagt nach kurzem Schweigen: ‚Ich mache es.‘",target:"decision"},
 {id:"prep_execution",label:"Samira trägt ihren Namen in das bereits geöffnete Besetzungsformular ein.",target:"execution"},
 {id:"prep_weigh_second",label:"Noah stellt der Sichtbarkeit seiner Arbeit die mögliche Überforderung gegenüber.",target:"weighing"},
] as const;
export const julietAlternatives=[
 {id:"alt_textual_marriage",label:"Juliette stellt die Möglichkeit einer erzwungenen Heirat der Wirkung der Phiole gegenüber.",target:"textual"},
 {id:"alt_textual_not_drink",label:"Die Frage nach möglichem Gift eröffnet im Monolog auch die Möglichkeit, die Phiole nicht zu verwenden.",target:"textual"},
 {id:"alt_plausible_talk",label:"Ein weiteres Gespräch mit einer vertrauten Person wäre in ihrer Lage grundsätzlich möglich.",target:"plausible"},
 {id:"alt_plausible_delay",label:"Sie könnte versuchen, vor einer endgültigen Handlung noch Zeit zu gewinnen.",target:"plausible"},
 {id:"alt_unsupported_letter",label:"Juliette hat den Capulets einen Abschiedsbrief mit allen Einzelheiten hinterlassen.",target:"unsupported"},
 {id:"alt_unsupported_nurse",label:"Juliette hat mit der Amme verabredet, dass diese sie später aus der Gruft holt.",target:"unsupported"},
] as const;
export const comparisonAspects=[
 {id:"compare_carriers_external",dimension:"Konfliktträger",label:"Zwei anwesende Figuren setzen gegensätzliche Ziele gegeneinander durch.",target:"external"},
 {id:"compare_goals_internal",dimension:"Ziele",label:"Das Verhindern einer Heirat steht gegen die Risiken des gewählten Mittels.",target:"internal"},
 {id:"compare_knowledge_external",dimension:"Wissensstand",label:"Eine falsche Situationsdeutung beeinflusst das Handeln einer Konfliktpartei.",target:"external"},
 {id:"compare_visibility_internal",dimension:"Darstellung",label:"Ein Monolog macht die Abwägung möglicher Folgen zugänglich.",target:"internal"},
 {id:"compare_turn_external",dimension:"Wendepunkt",label:"Der Übergang zum Fechten verändert den Verlauf unumkehrbar.",target:"external"},
 {id:"compare_turn_internal",dimension:"Entscheidung/Folge",label:"Ankündigung und anschließende Bühnenhandlung führen die Abwägung in einen Vollzug.",target:"internal"},
] as const;
export const comparisonSummary=[
 {aspect:"Konfliktträger",external:"Romeo und Paris",internal:"Juliette: Handlungswunsch und Gegenkräfte"},
 {aspect:"Gegensatz",external:"Ungestörtes Handeln und Festnahme",internal:"Heirat verhindern und Risiken der Phiole"},
 {aspect:"Darstellung",external:"Dialog und körperliche Handlung",internal:"Monolog und Bühnenhandlung"},
 {aspect:"Entwicklung",external:"Wechselseitige Handlungen und Reaktionen",internal:"Vorstellung möglicher Folgen und Abwägung"},
 {aspect:"Wendepunkt / Entscheidung",external:"Übergang zum Fechten",internal:"Entschluss zum Trinken"},
 {aspect:"Folge",external:"Paris fällt",internal:"Juliette trinkt die Phiole"},
] as const;
export const finalCurve=[
 {id:"final_situation",label:"Romeo und Paris begegnen sich an der Gruft.",stage:"situation"},
 {id:"final_conflict",label:"Ihre Deutungen und Ziele sind unvereinbar; Paris will Romeo festnehmen.",stage:"conflict_and_goals"},
 {id:"final_action",label:"Romeo fordert Paris zum Fortgehen auf.",stage:"action"},
 {id:"final_reaction",label:"Paris weist die Aufforderung zurück.",stage:"reaction"},
 {id:"final_escalation",label:"Warnung und Festnahmeabsicht verschärfen den Gegensatz.",stage:"escalation"},
 {id:"final_turn",label:"Der Wortkonflikt geht in das Fechten über.",stage:"turning"},
 {id:"final_consequence",label:"Paris fällt.",stage:"consequence"},
] as const;
export const finalConnections=[
 {id:"interpret_arrest",label:"Paris deutet Romeos Anwesenheit als feindselig → Paris kündigt die Festnahme an.",answer:"contributes"},
 {id:"arrest_appeal",label:"Paris kündigt die Festnahme an → Romeo fordert Paris zum Fortgehen auf.",answer:"causes"},
 {id:"reject_fight",label:"Paris weist Romeos Aufforderung zurück → die Figuren beginnen später zu fechten.",answer:"contributes"},
] as const;
export const finalMeaningOptions=[
 {id:"meaning_supported",label:"Paris deutet Romeos Anwesenheit als feindselig. Beide Figuren halten an unvereinbaren Zielen fest; die sprachliche Auseinandersetzung schlägt schließlich in körperliche Gewalt um.",valid:true},
 {id:"meaning_intentional",label:"Romeo hat Paris von Anfang an gezielt aufgesucht, um ihn im Kampf zu töten.",valid:false},
 {id:"meaning_inevitable",label:"Der Verlauf zeigt, dass jeder äußere Konflikt zwangsläufig gewaltsam endet.",valid:false},
 {id:"meaning_informed",label:"Paris kennt Romeos wirklichen Zweck vollständig und entscheidet sich trotzdem bewusst für den Kampf.",valid:false},
] as const;
export const finalEvidence={claim:"Der Übergang vom Wortkonflikt zum Fechten ist ein Wendepunkt des äußeren Konflikts.",evidence:"c04_tomb_fight",evidenceOptions:["c04_tomb_romeo_order","c04_tomb_paris_view","c04_tomb_romeo_leave","c04_tomb_fight"],analysisOptions:["Die Bühnenanweisung markiert den Wechsel vom sprachlichen zum körperlichen Konflikt und nennt mit Paris’ Fall eine nicht rücknehmbare Folge.","Die Stelle beweist, dass jeder Wortkonflikt zwangsläufig tödlich endet.","Die Stelle beschreibt nur eine spätere Handlung ohne Bedeutung für den Verlauf."],analysisAnswer:0} as const;
export const finalTransferOptions=[
 {id:"transfer_precise",label:"Beim äußeren Konflikt entsteht die Veränderung aus Handlungen zwischen Figuren; beim inneren Konflikt führt eine abgewogene Entscheidung zur Ausführung.",valid:true},
 {id:"transfer_partial",label:"Beide Verläufe enthalten Entscheidungen, aber nur der äußere Konflikt wird durch unterschiedliche Wissensstände und gegenseitige Reaktionen entwickelt.",valid:true},
 {id:"transfer_wrong",label:"Äußerer und innerer Konflikt unterscheiden sich nur dadurch, wie viele Figuren auf der Bühne sichtbar sind.",valid:false},
] as const;
