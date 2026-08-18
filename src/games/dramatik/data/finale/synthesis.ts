export type SynthesisAreaId = "situation" | "figures" | "dialogue" | "conflict" | "interpretation";

export const synthesisAreas = [
  { id: "situation", title: "Regiebuch", subtitle: "Situation und Textsignale", assetId: "theatre_access_chapter_01", reminder: "Eine Szene beginnt nicht mit ihrem ersten gesprochenen Satz. Ort, Zeit, Figuren, Vorgeschichte und Bedingungen bestimmen mit, wie das Geschehen verstanden werden kann. Fehlende Informationen dürfen nicht erfunden werden." },
  { id: "figures", title: "Ensemble", subtitle: "Figuren und Beziehungen", assetId: "theatre_access_chapter_02", reminder: "Figurenanalyse entsteht aus Rede, Verhalten, Entscheidungen und Beziehungen. Eine Eigenschaft ist keine bloße Behauptung, sondern eine begründete Erschließung aus dem Text." },
  { id: "dialogue", title: "Probenbühne", subtitle: "Dialog, Sprache und Verhalten", assetId: "theatre_access_chapter_03", reminder: "Im Drama ist Sprechen Handeln. Gesprächsziele, Sprachhandlungen, Reaktionen sowie sprachliche und bühnenbezogene Gestaltung erzeugen Gesprächsentwicklung." },
  { id: "conflict", title: "Handlungsbuch", subtitle: "Konflikt und Entwicklung", assetId: "theatre_access_chapter_04", reminder: "Handlung bedeutet mehr als Reihenfolge. Konflikte entstehen aus konkurrierenden Zielen und entwickeln sich durch Entscheidungen, Reaktionen und Folgen. Nicht alles, was danach geschieht, geschieht deshalb." },
  { id: "interpretation", title: "Analysepult", subtitle: "Deutung und Interpretation", assetId: "theatre_access_chapter_05", reminder: "Interpretation verbindet Befunde zu einer überprüfbaren Aussage über die Bedeutung einer Szene. Eine Deutung muss sich zum Text zurückverfolgen lassen." },
] as const;

export const synthesisFindings = [
  { id: "situation", area: "Situation", text: "Romeo kennt Lorenzos Plan nicht und handelt nach Balthasars Nachricht auf der Grundlage unvollständigen Wissens." },
  { id: "figures", area: "Figur und Ziel", text: "Romeo entscheidet sich zum sofortigen Handeln und sucht den verarmten Apotheker gezielt auf." },
  { id: "dialogue", area: "Sprache und Dialog", text: "Der Apotheker trennt sprachlich seine wirtschaftliche Not von seinem persönlichen Willen." },
  { id: "conflict", area: "Konflikt und Handlung", text: "Das gesetzliche Verbot und die materielle Not des Apothekers geraten in einen handlungswirksamen Konflikt." },
  { id: "interpretation", area: "Deutung", text: "Die Szene zeigt, wie unvollständiges Wissen und materielle Not eine folgenschwere Entscheidung ermöglichen, ohne Verantwortung zu vereinfachen." },
] as const;

export const synthesisConnections = [
  { a: "situation", b: "figures", explanation: "Romeos Wissensstand erklärt, warum sein Ziel und sein unmittelbares Handeln so dringlich werden." },
  { a: "figures", b: "conflict", explanation: "Romeos Ziel trifft auf das Verbot und die Notlage des Apothekers." },
  { a: "dialogue", b: "conflict", explanation: "Die sprachliche Gegenüberstellung von Dürftigkeit und Wille macht den Konflikt innerhalb der Entscheidung sichtbar." },
  { a: "dialogue", b: "interpretation", explanation: "Der sprachliche Befund begrenzt eine vereinfachende Deutung als freiwillige Zustimmung." },
  { a: "conflict", b: "interpretation", explanation: "Die Konfliktlage trägt unmittelbar zur Deutung der folgenschweren Entscheidung bei." },
] as const;

export const synthesisSourceReferences = ["c05_transfer_romeo_reaction", "c05_transfer_apothecary_law", "c05_transfer_apothecary_decision"] as const;

export const analysisMethodGroups = [
  { title: "Situationen erschließen", items: ["Ort, Zeit, Figuren und Vorgeschichte einordnen", "Textbefund und begründete Erschließung unterscheiden", "fehlende Informationen kenntlich machen"] },
  { title: "Figuren und Beziehungen untersuchen", items: ["Rede, Verhalten und Entscheidungen auswerten", "Beziehungen, Ziele und Motive unterscheiden", "Charakterisierungen am Text begründen"] },
  { title: "Dialog und Bühne analysieren", items: ["Gesprächsziele und Sprachhandlungen erkennen", "Sprache funktional untersuchen", "Regie- und Bühnensignale berücksichtigen"] },
  { title: "Konflikt und Handlung verstehen", items: ["äußere und innere Konflikte analysieren", "Kausalität von bloßer Reihenfolge unterscheiden", "Wendepunkte aus Entscheidungen und Folgen begründen"] },
  { title: "Interpretationen entwickeln", items: ["Deutungshypothesen am Text prüfen", "Gegenbelege berücksichtigen und Hypothesen präzisieren", "Interpretationsargumente mit funktionalen Textbelegen aufbauen"] },
] as const;

export const examCheck = [
  "Habe ich behauptet oder belegt?",
  "Habe ich sprachliche Mittel nur benannt oder ihre Funktion erklärt?",
  "Habe ich nur beschrieben, was Figuren tun, oder erklärt, warum es bedeutsam ist?",
  "Passt mein Textbeleg wirklich zu meiner Aussage?",
  "Ignoriere ich einen Befund, der meiner Deutung widerspricht?",
  "Behaupte ich Gedanken oder Gefühle, die der Text nicht trägt?",
  "Ist meine Deutungshypothese am Ende noch tragfähig?",
] as const;
