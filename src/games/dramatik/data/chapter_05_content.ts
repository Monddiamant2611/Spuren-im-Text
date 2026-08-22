import transferRecords from "./primary-sources/romeo-juliette-wieland-chapter-05.json" with { type: "json" };
import type { PrimarySourceRecord } from "../../../core/content/types";
import { chapter02PrimarySources } from "./chapter_02_content";

export const chapter05TransferSources=transferRecords as PrimarySourceRecord[];
export const chapter05SourceById=(id:string)=>[...chapter02PrimarySources,...chapter05TransferSources].find(item=>item.id===id)!;
export const modernScene=[{speaker:"MARA",text:"Geh ruhig."},{speaker:"",text:"(Leon wendet sich zur Tür.)"},{speaker:"MARA",text:"Das kannst du ja besonders gut."}] as const;
export const classificationCards=[
 {id:"class_request",text:"Mara verwendet zunächst eine Aufforderung.",target:"observation"},
 {id:"class_turn",text:"Leon wendet sich zur Tür.",target:"observation"},
 {id:"class_analysis",text:"Maras zweite Äußerung stellt die Eindeutigkeit ihrer ersten Aufforderung infrage.",target:"analysis"},
 {id:"class_interpretation",text:"Die widersprüchlichen Äußerungen können zeigen, dass Maras tatsächliches Gesprächsziel komplexer ist als der reine Wortlaut.",target:"interpretation"},
 {id:"class_unsupported",text:"Mara hält Leon grundsätzlich für einen schlechten Menschen.",target:"unsupported"}
] as const;
export const generalChain=[
 {id:"general_evidence",kind:"evidence",text:"„Geh ruhig.“ / „Das kannst du ja besonders gut.“"},
 {id:"general_observation",kind:"observation",text:"Auf die Aufforderung folgt nach Leons Reaktion eine widersprechend wirkende Bemerkung."},
 {id:"general_analysis",kind:"analysis",text:"Der zweite Satz verändert rückwirkend die Wirkung des ersten."},
 {id:"general_meaning",kind:"meaning",text:"Maras Gesprächsziel lässt sich nicht allein aus dem Wortlaut der ersten Äußerung bestimmen."}
] as const;
export const hypothesisOptions=[
 {id:"hyp_description",text:"Mara sagt Leon, er solle gehen.",quality:"description"},
 {id:"hyp_supported",text:"Die widersprüchlichen Äußerungen lassen vermuten, dass Mara Leons Fortgehen zugleich ermöglicht und emotional problematisiert.",quality:"supported"},
 {id:"hyp_overreach",text:"Mara will Leon für immer aus ihrem Leben verbannen.",quality:"overreach"}
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
 {id:"arg_interpretation",kind:"interpretation",text:"Damit wird ihr Handlungsspielraum als begrenzt, nicht jedoch als vollständig aufgehoben erkennbar."}
] as const;
export const commonErrors=[
 {id:"error_list",text:"Belege werden nur aufgezählt, ohne ihre Funktion zu erklären.",target:"evidence_without_analysis"},
 {id:"error_claim",text:"Eine weitreichende Deutung wird ohne Textbeleg behauptet.",target:"unsupported_claim"},
 {id:"error_summary",text:"Der Handlungsinhalt wird nacherzählt, ohne zur Hypothese zurückzuführen.",target:"summary_only"}
] as const;
export const interpretationStructure=["Einleitung und Deutungshypothese","relevante Textbeobachtung","Textbeleg","Analyse von Wirkung oder Funktion","Bedeutung für die Hypothese","differenzierter Schluss"] as const;
export const transferContext="Romeo befindet sich außerhalb Veronas. Balthasar berichtet ihm, Juliette sei tot. Romeo kennt Lorenzos Plan nicht. Nachdem Balthasar gegangen ist, sucht Romeo einen verarmten Apotheker auf; der Verkauf tödlichen Gifts ist gesetzlich verboten.";
export const transferEvidence=[
 {id:"te_reaction",sourceId:"c05_transfer_romeo_reaction",text:"Romeo widersetzt sich den Sternen und ordnet seine sofortige Abreise an.",relevance:"direct"},
 {id:"te_law",sourceId:"c05_transfer_apothecary_law",text:"Der Apotheker nennt das gesetzliche Todesrisiko des Verkaufs.",relevance:"supplement"},
 {id:"te_argument",sourceId:"c05_transfer_romeo_argument",text:"Romeo stellt Armut und gesellschaftliches Gesetz gegeneinander.",relevance:"direct"},
 {id:"te_decision",sourceId:"c05_transfer_apothecary_decision",text:"Der Apotheker unterscheidet ausdrücklich zwischen Dürftigkeit und Willen.",relevance:"direct"},
 {id:"te_gold",sourceId:"c05_transfer_gold_poison",text:"Romeo deutet das Gold als das gefährlichere Gift.",relevance:"direct"},
 {id:"te_letter",sourceId:"c05_transfer_balthasar_no",text:"Balthasar besitzt keinen Brief für Romeo.",relevance:"little"}
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
export const transferArgument=[
 {id:"ta_claim",kind:"claim",text:transferRefined},
 {id:"ta_evidence",kind:"evidence",text:"Der Apotheker sagt: „Meine Dürftigkeit williget ein, nicht mein Wille.“"},
 {id:"ta_analysis",kind:"analysis",text:"Die Gegenüberstellung von Dürftigkeit und Wille markiert einen Konflikt zwischen äußerem Druck und innerer Ablehnung."},
 {id:"ta_interpretation",kind:"interpretation",text:"So differenziert der Text die Verantwortung: Der Verkauf geschieht, doch die wirtschaftliche Not prägt die Entscheidung entscheidend."}
] as const;
