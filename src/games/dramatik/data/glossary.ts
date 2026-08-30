export type GlossaryChapter = "chapter_01" | "chapter_02" | "chapter_03" | "chapter_04" | "chapter_05";

export interface GlossaryEntry { id:string; term:string; definition:string; chapter:GlossaryChapter }

export const dramaGlossary:readonly GlossaryEntry[]=[
 {id:"situation_analysis",term:"Situationsanalyse",definition:"Die Situationsanalyse klärt die Ausgangslage einer Szene.",chapter:"chapter_01"},
 {id:"location",term:"Ort",definition:"Wo findet die Szene statt? Dabei können ein größerer Handlungsraum und ein konkreter Schauplatz zugleich wichtig sein.",chapter:"chapter_01"},
 {id:"time",term:"Zeit",definition:"Wann findet die Szene statt? Hinweise können die Tageszeit oder die Einordnung im Verhältnis zu anderen Ereignissen betreffen.",chapter:"chapter_01"},
 {id:"characters",term:"Figuren",definition:"Welche Personen treten im untersuchten Ausschnitt tatsächlich auf? Entscheidend ist die konkrete Szene, nicht die gesamte Figurenliste des Dramas.",chapter:"chapter_01"},
 {id:"previous_events",term:"Vorgeschichte",definition:"Welche bereits geschehenen Ereignisse müssen bekannt sein, damit die aktuelle Situation verständlich wird?",chapter:"chapter_01"},
 {id:"conditions",term:"Bedingungen",definition:"Welche äußeren Umstände beeinflussen die Situation, etwa Regeln, Erwartungen, Machtverhältnisse oder bestehende Konflikte?",chapter:"chapter_01"},
 {id:"text_finding",term:"Textbefund",definition:"Eine Information, die sich unmittelbar am vorliegenden Text nachweisen lässt.",chapter:"chapter_01"},
 {id:"inference",term:"Erschließung",definition:"Eine nachvollziehbare Schlussfolgerung aus Textsignalen. Sie ist nicht dasselbe wie eine freie Vermutung.",chapter:"chapter_01"},
 {id:"not_determinable",term:"Nicht feststellbar",definition:"Ausschnitt und Kontext reichen nicht aus, um eine Aussage zuverlässig zu treffen.",chapter:"chapter_01"},
 {id:"direct_characterization",term:"Direkte Charakterisierung",definition:"Eine Eigenschaft oder Einschätzung wird ausdrücklich über eine Figur formuliert.",chapter:"chapter_02"},
 {id:"indirect_characterization",term:"Indirekte Charakterisierung",definition:"Eine mögliche Eigenschaft wird aus Rede, Verhalten, Entscheidungen oder Reaktionen erschlossen.",chapter:"chapter_02"},
 {id:"goal",term:"Ziel",definition:"Was möchte eine Figur in der konkreten Situation erreichen? Ein Ziel kann sich im Verlauf einer Szene verändern.",chapter:"chapter_02"},
 {id:"motive",term:"Motiv",definition:"Warum handelt eine Figur so? Ein Motiv ist ein möglicher innerer Beweggrund und braucht eine Textgrundlage.",chapter:"chapter_02"},
 {id:"interest",term:"Interesse / Bedürfnis",definition:"Was ist einer Figur grundsätzlich wichtig oder was braucht sie in der konkreten Situation?",chapter:"chapter_02"},
 {id:"self_image",term:"Selbstbild",definition:"Wie beschreibt, bewertet oder versteht eine Figur sich selbst? Ein Selbstbild ist perspektivisch und nicht automatisch eine objektive Charaktereigenschaft.",chapter:"chapter_02"},
 {id:"other_image",term:"Fremdbild",definition:"Wie wird eine Figur von einer anderen Figur wahrgenommen, bewertet oder behandelt? Ein Fremdbild ist perspektivisch und nicht automatisch eine objektive Charaktereigenschaft.",chapter:"chapter_02"},
 {id:"relationship",term:"Figurenkonstellation",definition:"Das Geflecht aus Beziehungen, Erwartungen, Nähe, Distanz und Macht zwischen Figuren.",chapter:"chapter_02"},
 {id:"speech_act",term:"Sprachhandlung",definition:"Was tut eine Figur, indem sie etwas sagt, zum Beispiel fragen, auffordern, widersprechen oder beschwichtigen?",chapter:"chapter_03"},
 {id:"conversation_goal",term:"Gesprächsziel",definition:"Was möchte eine Figur mit einer Äußerung oder im Verlauf des Gesprächs erreichen?",chapter:"chapter_03"},
 {id:"reaction",term:"Reaktion",definition:"Wie antwortet oder handelt das Gegenüber auf eine Äußerung? Erst die Reaktion zeigt, wie das Gespräch weitergeht.",chapter:"chapter_03"},
 {id:"initiative",term:"Gesprächsinitiative",definition:"Wer setzt einen neuen Impuls, bestimmt vorübergehend Richtung oder Thema des Gesprächs oder reagiert nur darauf?",chapter:"chapter_03"},
 {id:"conversation_phase",term:"Gesprächsphase",definition:"Ein Abschnitt mit einer erkennbaren Gesprächsrichtung. Eine neue Phase entsteht durch eine relevante Veränderung, nicht automatisch mit jeder Äußerung.",chapter:"chapter_03"},
 {id:"effect_function",term:"Wirkung und Funktion",definition:"Wirkung beschreibt, wie eine Gestaltung die Äußerung prägt. Funktion bezeichnet ihre Aufgabe im Gespräch oder in der Szene.",chapter:"chapter_03"},
 {id:"turning_point",term:"Wendepunkt",definition:"Ein Moment, durch den sich Verlauf, Richtung oder Konflikt einer Szene funktional verändert.",chapter:"chapter_03"},
 {id:"external_conflict",term:"Äußerer Konflikt",definition:"Ein Konflikt zwischen unvereinbaren Zielen verschiedener Figuren oder zwischen einer Figur und einer äußeren Ordnung.",chapter:"chapter_04"},
 {id:"internal_conflict",term:"Innerer Konflikt",definition:"Ein Konflikt innerhalb derselben Figur, etwa zwischen unterschiedlichen Wünschen, Zielen, Werten oder Befürchtungen.",chapter:"chapter_04"},
 {id:"causality",term:"Kausalität",definition:"Ein ursächlicher Zusammenhang zwischen Ereignissen. Nicht alles, was später geschieht, wurde durch das Vorherige verursacht.",chapter:"chapter_04"},
 {id:"contributing_condition",term:"Beitragende Bedingung",definition:"Ein Umstand, der gemeinsam mit weiteren Faktoren zu einer Entwicklung beiträgt, ohne sie allein zu verursachen.",chapter:"chapter_04"},
 {id:"tension",term:"Anspannung",definition:"Der Konflikt besteht und wird im Handlungsverlauf spürbar.",chapter:"chapter_04"},
 {id:"escalation",term:"Zuspitzung",definition:"Der Konflikt verschärft sich; Handlungsmöglichkeiten verengen sich oder Gegensätze werden stärker.",chapter:"chapter_04"},
 {id:"turning_point",term:"Wendepunkt",definition:"Ein Ereignis oder eine Entscheidung verändert den weiteren Handlungsverlauf entscheidend. Nicht jede Zuspitzung ist automatisch ein Wendepunkt.",chapter:"chapter_04"},
 {id:"interpretation",term:"Interpretation",definition:"Eine begründete, am Text überprüfbare Aussage darüber, welche Bedeutung ein Befund im Zusammenhang haben kann.",chapter:"chapter_05"},
 {id:"hypothesis",term:"Deutungshypothese",definition:"Eine vorläufige, konkrete und am Text überprüfbare Aussage über eine mögliche Bedeutung.",chapter:"chapter_05"},
 {id:"reasoning_chain",term:"Begründungskette",definition:"Textbeleg, Beobachtung, Analyse und Bedeutung werden nachvollziehbar zur Deutung zurückgebunden.",chapter:"chapter_05"},
 {id:"counterevidence",term:"Gegenbeleg",definition:"Ein Textbefund, der eine Deutung einschränkt, relativiert oder ihr widerspricht, ohne sie automatisch vollständig zu widerlegen.",chapter:"chapter_05"},
];

export const glossaryFor=(chapter:GlossaryChapter)=>dramaGlossary.filter(entry=>entry.chapter===chapter);
