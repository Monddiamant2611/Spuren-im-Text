import transferRecords from "./primary-sources/romeo-juliette-wieland-chapter-05.json" with { type: "json" };
import type { PrimarySourceRecord } from "../../../core/content/types";
import { chapter02PrimarySources } from "./chapter_02_content";

export const chapter05TransferSources=transferRecords as PrimarySourceRecord[];
export const chapter05SourceById=(id:string)=>[...chapter02PrimarySources,...chapter05TransferSources].find(item=>item.id===id)!;
export const modernScene=[{speaker:"MARA",text:"Geh ruhig."},{speaker:"",text:"(Leon wendet sich zur Tür.)"},{speaker:"MARA",text:"Das kannst du ja besonders gut."}] as const;
export const classificationCards=[
 {id:"class_request",text:"Mara fordert Leon zunächst zum Gehen auf.",target:"observation"},
 {id:"class_turn",text:"Leon wendet sich daraufhin zur Tür.",target:"observation"},
 {id:"class_intention",text:"Mara möchte Leon eigentlich nicht gehen lassen.",target:"beyond"},
 {id:"class_psychology",text:"Mara hält Leon grundsätzlich für einen schlechten Menschen.",target:"beyond"}
] as const;
export const generalChain=[
 {id:"general_evidence",kind:"evidence",text:"„Geh ruhig.“ / „Das kannst du ja besonders gut.“"},
 {id:"general_observation",kind:"observation",text:"Auf die Aufforderung folgt nach Leons Reaktion eine widersprechend wirkende Bemerkung."},
 {id:"general_analysis",kind:"analysis",text:"Der zweite Satz verändert rückwirkend die Wirkung des ersten."},
 {id:"general_effect",kind:"effect",text:"Zwischen wörtlicher Aufforderung und Gesprächswirkung entsteht eine Spannung."},
 {id:"general_meaning",kind:"meaning",text:"Maras Gesprächsziel lässt sich nicht allein aus dem Wortlaut der ersten Äußerung bestimmen."}
] as const;
export const hypothesisOptions=[
 {id:"hyp_description",text:"Mara sagt Leon, er solle gehen.",quality:"description"},
 {id:"hyp_supported",text:"Die widersprüchlichen Äußerungen lassen vermuten, dass Mara Leons Fortgehen zugleich ermöglicht und emotional problematisiert.",quality:"supported"},
 {id:"hyp_general",text:"In Gesprächen sagen Menschen häufig nicht, was sie meinen.",quality:"general"},
 {id:"hyp_overreach",text:"Mara hält Leon grundsätzlich für einen schlechten Menschen.",quality:"overreach"}
] as const;
export const generalCountercheckOptions=[
 {id:"general_confirm",text:"Die neue Beobachtung bestätigt die Hypothese vollständig.",relation:"confirms",action:"keep"},
 {id:"general_refine",text:"Die neue Beobachtung begrenzt ihre Reichweite; die widersprüchliche Kommunikation muss berücksichtigt werden.",relation:"limits",action:"refine"},
 {id:"general_contradict",text:"Die neue Beobachtung widerspricht der Hypothese vollständig.",relation:"contradicts",action:"reject"},
 {id:"general_open",text:"Die neue Beobachtung reicht für eine Entscheidung nicht aus.",relation:"insufficient",action:"keep"},
] as const;
export const processHelp=[
 {id:"evidence",label:"Textbefund",definition:"Was ist im Text tatsächlich wahrnehmbar? Zunächst beobachten und belegen – noch nicht deuten."},
 {id:"analysis",label:"Analyse",definition:"Wie funktioniert der Befund im Zusammenhang?"},
 {id:"effect",label:"Wirkung / Funktion",definition:"Was bewirkt der Befund innerhalb der Szene?"},
 {id:"meaning",label:"Bedeutung",definition:"Was lässt sich daraus für Figuren, Beziehungen, Konflikt oder Situation erschließen?"},
 {id:"hypothesis",label:"Deutungshypothese",definition:"Eine vorläufige, am Text überprüfbare Aussage über die Bedeutung der Szene."},
 {id:"argument",label:"Argumentation",definition:"Eine begründete Verbindung aus Behauptung, Textbeleg, Analyse und Rückbindung."},
] as const;
export const additionalHelp=[
 {id:"counterevidence",label:"Gegenbefund",definition:"Ein Textbefund, der eine bisherige Deutung einschränkt, relativiert oder widerlegt."},
 {id:"linkback",label:"Rückbindung",definition:"Die Analyse wird wieder mit der Deutungshypothese verbunden."},
] as const;
export const julietHypothesis="Juliettes Handlungsspielraum ist innerhalb der familiären Ordnung stark begrenzt; zugleich versucht sie, ihren eigenen Willen sprachlich zu behaupten.";
export const julietFindings=[
 {id:"juliet_refusal",sourceId:"c02_transfer_juliette_refusal",text:"Juliette lehnt die geplante Hochzeit ausdrücklich ab.",accepted:["direct"]},
 {id:"juliet_plea",sourceId:"c02_transfer_juliette_plea",text:"Juliette bittet ihren Vater kniend darum, angehört zu werden.",accepted:["direct","supplement"]},
 {id:"capulet_threat",sourceId:"c02_transfer_capulet_threat",text:"Capulet droht ihr mit Ausschluss und verweigert Widerspruch.",accepted:["direct"]},
 {id:"lady_withdraws",sourceId:"c02_transfer_lady_withdraws",text:"Lady Capulet verweigert Juliette weitere Unterstützung.",accepted:["supplement"]},
 {id:"nurse_break",sourceId:"c02_transfer_juliette_break",text:"Juliette kündigt nach dem Rat der Amme ihr Vertrauen auf.",accepted:["supplement"]},
 {id:"marriage_early",sourceId:"c02_main_juliette_answer",text:"Juliette wollte Paris in einer früheren Szene zunächst betrachten.",accepted:["little"]}
] as const;
export const julietEvidenceMarkers=[
 {id:"B1",label:"Juliettes ausdrückliche Ablehnung",sourceId:"c02_transfer_juliette_refusal"},
 {id:"B2",label:"Bitte um Gehör",sourceId:"c02_transfer_juliette_plea"},
 {id:"B3",label:"Capulets Drohung",sourceId:"c02_transfer_capulet_threat"},
 {id:"B4",label:"weitere Handlungsplanung",sourceId:"c02_transfer_juliette_break"},
] as const;
export const julietReverseChain=[
 {id:"j_claim",kind:"claim",text:julietHypothesis},
 {id:"j_meaning",kind:"meaning",text:"Familiäre Macht begrenzt ihre Entscheidung, ohne ihren sprachlichen Widerstand vollständig aufzuheben."},
 {id:"j_analysis",kind:"analysis",text:"Drohung und verweigertes Gehör stehen Juliettes ausdrücklicher Ablehnung und Bitte gegenüber."},
 {id:"j_evidence",kind:"evidence",text:"Capulets Drohung sowie Juliettes Ablehnung und Bitte bilden die entscheidenden Belege."}
] as const;
export const julietCountercheckOptions=[
 {id:"juliet_no_voice",text:"Juliettes Bitte zeigt, dass das familiäre Machtgefälle für die Hypothese keine entscheidende Rolle spielt."},
 {id:"juliet_has_agency",text:"Juliette widerspricht ausdrücklich und bittet um Gehör; das schränkt die absolute Aussage ein."},
 {id:"juliet_controls_all",text:"Weil Juliette ihren Willen ausspricht, besitzt sie in der familiären Ordnung letztlich die Entscheidungsmacht."},
] as const;
export const argumentBlocks=[
 {id:"arg_claim",kind:"claim",text:julietHypothesis},
 {id:"arg_evidence",kind:"evidence",text:"Capulet droht Juliette mit Ausschluss, während sie ausdrücklich widerspricht und um Gehör bittet."},
 {id:"arg_analysis",kind:"analysis",text:"Die Gesprächsführung zeigt das Machtgefälle, aber auch Juliettes sprachlichen Widerstand."},
 {id:"arg_effect",kind:"effect",text:"Drohung und Widerspruch lassen Begrenzung und Selbstbehauptung unmittelbar aufeinandertreffen."},
 {id:"arg_interpretation",kind:"interpretation",text:"Damit wird ihr Handlungsspielraum als begrenzt, nicht jedoch als vollständig aufgehoben erkennbar."}
] as const;
export const commonErrors=[
 {id:"error_list",text:"Belege werden nur aufgezählt, ohne ihre Funktion zu erklären.",target:"evidence_without_analysis"},
 {id:"error_claim",text:"Eine weitreichende Deutung wird ohne Textbeleg behauptet.",target:"unsupported_claim"},
 {id:"error_summary",text:"Der Handlungsinhalt wird nacherzählt, ohne zur Hypothese zurückzuführen.",target:"summary_only"},
 {id:"error_psychology",text:"Aus einer einzelnen Äußerung wird ein innerer Zustand der Figur als sicher behauptet.",target:"overinterpretation"},
 {id:"error_link",text:"Der Befund wird analysiert, aber seine Bedeutung für die Deutungshypothese bleibt offen.",target:"missing_link"}
] as const;
export const errorRepairs=[
 {id:"error_list",target:"explain_function",text:"Nach dem Beleg seine Funktion erklären und zur Deutung zurückführen."},
 {id:"error_claim",target:"add_evidence",text:"Die Behauptung durch einen konkreten Befund belegen und ihre Reichweite prüfen."},
 {id:"error_summary",target:"add_meaning",text:"Vom Handlungsinhalt zur Bedeutung für die Deutungshypothese übergehen."},
 {id:"error_psychology",target:"qualify_claim",text:"Die psychologische Aussage als vorsichtige, textgebundene Vermutung formulieren."},
 {id:"error_link",target:"link_hypothesis",text:"Explizit erklären, wie das Analyseergebnis die Hypothese stützt oder begrenzt."},
] as const;
export const interpretationStructure=["Einleitung und Deutungshypothese","relevante Textbeobachtung","Textbeleg","Analyse von Wirkung oder Funktion","Bedeutung für die Hypothese","differenzierter Schluss"] as const;
export const microArgumentStructure=["Behauptung / Teilthese","Textbeleg","Analyse","Wirkung / Funktion","Bedeutung","Rückbindung an die Deutungshypothese"] as const;
export const transferContext="Romeo befindet sich außerhalb Veronas. Balthasar berichtet ihm, Juliette sei tot. Romeo kennt Lorenzos Plan nicht. Nachdem Balthasar gegangen ist, sucht Romeo einen verarmten Apotheker auf; der Verkauf tödlichen Gifts ist gesetzlich verboten.";
export const transferEvidence=[
 {id:"te_reaction",sourceId:"c05_transfer_romeo_reaction",text:"Romeo widersetzt sich den Sternen und ordnet seine sofortige Abreise an.",relevance:"direct"},
 {id:"te_law",sourceId:"c05_transfer_apothecary_law",text:"Der Apotheker nennt das gesetzliche Todesrisiko des Verkaufs.",relevance:"supplement"},
 {id:"te_argument",sourceId:"c05_transfer_romeo_argument",text:"Romeo stellt Armut und gesellschaftliches Gesetz gegeneinander.",relevance:"direct"},
 {id:"te_decision",sourceId:"c05_transfer_apothecary_decision",text:"Der Apotheker unterscheidet ausdrücklich zwischen Dürftigkeit und Willen.",relevance:"direct"},
 {id:"te_gold",sourceId:"c05_transfer_gold_poison",text:"Romeo deutet das Gold als das gefährlichere Gift.",relevance:"direct"},
 {id:"te_letter",sourceId:"c05_transfer_balthasar_no",text:"Balthasar besitzt keinen Brief für Romeo.",relevance:"little"}
] as const;
export const transferEvidenceMarkers=[
 {id:"T1",label:"Romeos Argument mit Armut und Gesetz",sourceId:"c05_transfer_romeo_argument"},
 {id:"T2",label:"Dürftigkeit und Wille",sourceId:"c05_transfer_apothecary_decision"},
] as const;
export const transferChain=[
 {id:"t_evidence",kind:"evidence",text:"„Meine Dürftigkeit williget ein, nicht mein Wille.“"},
 {id:"t_observation",kind:"observation",text:"Der Apotheker trennt seine wirtschaftliche Not von seiner persönlichen Zustimmung."},
 {id:"t_effect",kind:"effect",text:"Die knappe Gegenüberstellung macht den äußeren Zwang besonders sichtbar."},
 {id:"t_meaning",kind:"meaning",text:"Die Szene zeigt, wie materielle Not eine moralisch und rechtlich problematische Entscheidung ermöglicht."}
] as const;
export const transferHypotheses=[
 {id:"th_weighted",text:"Die Apothekerszene zeigt, wie Romeo die wirtschaftliche Not eines anderen nutzt und Geld als zerstörerische Macht deutet.",quality:"supported"},
 {id:"th_simple",text:"Der Apotheker verkauft Gift.",quality:"description"},
 {id:"th_absolute",text:"Der Apotheker handelt ausschließlich aus Bosheit.",quality:"contradicted"}
] as const;
export const transferCountercheckOptions=[
 {id:"law_irrelevant",text:"Der Verweis auf das Gesetz zeigt, dass der Apotheker die Entscheidung vollständig ablehnt und deshalb keine Verantwortung trägt."},
 {id:"apothecary_eager",text:"Romeos Geldangebot reicht als Beleg dafür, dass der Apotheker dem Verkauf innerlich zustimmt."},
 {id:"apothecary_resists",text:"Der Apotheker verweist auf das Gesetz und trennt Dürftigkeit von Wille; das schränkt die Annahme freiwilliger Zustimmung ein."},
] as const;
export const transferRefined="Die Apothekerszene zeigt, wie Romeo die wirtschaftliche Not des Apothekers gezielt nutzt; zugleich macht dessen Widerstand sichtbar, dass die Entscheidung nicht als freiwillige Zustimmung vereinfacht werden darf.";
export const julietRefinementParts=[
 {id:"jr_context",text:"Juliettes Handlungsspielraum ist innerhalb der familiären Ordnung stark begrenzt;"},
 {id:"jr_concession",text:"zugleich versucht sie,"},
 {id:"jr_agency",text:"ihren eigenen Willen sprachlich zu behaupten."},
] as const;
export const transferRefinementParts=[
 {id:"tr_pressure",text:"Die Apothekerszene zeigt, wie Romeo die wirtschaftliche Not des Apothekers gezielt nutzt."},
 {id:"tr_counter",text:"Zugleich macht dessen Trennung von Dürftigkeit und Wille sichtbar,"},
 {id:"tr_limit",text:"dass die Entscheidung nicht als freiwillige Zustimmung vereinfacht werden darf."},
] as const;
export const transferArgument=[
 {id:"ta_claim",kind:"claim",text:transferRefined},
 {id:"ta_evidence",kind:"evidence",text:"Der Apotheker sagt: „Meine Dürftigkeit williget ein, nicht mein Wille.“"},
 {id:"ta_analysis",kind:"analysis",text:"Die Gegenüberstellung von Dürftigkeit und Wille markiert einen Konflikt zwischen äußerem Druck und innerer Ablehnung."},
 {id:"ta_effect",kind:"effect",text:"Die knappe Gegenüberstellung rückt den wirtschaftlichen Druck hervor, ohne die vollzogene Entscheidung auszulöschen."},
 {id:"ta_interpretation",kind:"interpretation",text:"So differenziert der Text die Verantwortung: Der Verkauf geschieht, doch die wirtschaftliche Not prägt die Entscheidung entscheidend."}
] as const;
export const synthesisSteps=[
 {id:"s_text",text:"Textbefund"},{id:"s_analysis",text:"Analyse"},{id:"s_effect",text:"Wirkung / Funktion"},{id:"s_meaning",text:"Bedeutung"},{id:"s_hypothesis",text:"Deutungshypothese"},{id:"s_test",text:"textuelle Prüfung"},{id:"s_countercheck",text:"Gegencheck"},{id:"s_refinement",text:"Präzisierung der Deutungshypothese"},{id:"s_argument",text:"Argumentation"}
] as const;
