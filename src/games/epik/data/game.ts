export type EpikArea = { id: string; title: string; question: string; focus: string; terms: readonly string[] };
export type EpikDemoText = { id: string; title: string; setting: string; text: string; focusAreaIds: readonly string[] };

export const epikAreas: readonly EpikArea[] = [
  { id: "erzaehlen", title: "Erzählen verstehen", question: "Wie wird aus Geschehen eine erzählte Geschichte?", focus: "Vermittlung durch eine Erzählinstanz erkennen und Autor, Erzähler, Figuren und erzählte Welt unterscheiden.", terms: ["Autor", "Erzählinstanz", "erzählte Welt"] },
  { id: "perspektive", title: "Erzählinstanz und Perspektive", question: "Wer weiß was – und was bleibt begrenzt?", focus: "Informationsvorsprung, Informationsbegrenzung, Kommentare, Wertungen und Zuverlässigkeit auf ihre Wirkung beziehen.", terms: ["auktorial", "personal", "Ich-Erzähler"] },
  { id: "naehe", title: "Nähe, Distanz und Wahrnehmung", question: "Wessen Wahrnehmung prägt die Szene?", focus: "Außensicht und subjektive Figurensicht unterscheiden und von Wahrnehmung über Wirkung zu Bedeutung gelangen.", terms: ["Innensicht", "Wahrnehmungslenkung", "Figurennähe"] },
  { id: "rede", title: "Rede- und Gedankenformen", question: "Wie werden Stimme und Gedanken vermittelt?", focus: "Darstellungsformen erkennen, sprachlich unterscheiden und ihre unterschiedliche Wirkung analysieren.", terms: ["direkte Rede", "indirekte Rede", "innerer Monolog", "erlebte Rede", "Erzählerbericht"] },
  { id: "zeit", title: "Zeitgestaltung", question: "Wie ordnet und gewichtet der Text Zeit?", focus: "Ordnung, Erzählgeschwindigkeit und Frequenz bestimmen und ihre Funktion erklären.", terms: ["Analepse", "Prolepse", "Zeitraffung", "Zeitdeckung", "Zeitdehnung"] },
  { id: "figuren", title: "Figurenanalyse", question: "Was lässt sich begründet über eine Figur sagen?", focus: "Aus Verhalten, Sprache, Gedanken und Beziehungen plausible, textnahe Schlüsse ziehen.", terms: ["direkte Charakterisierung", "indirekte Charakterisierung", "Selbstbild", "Fremdbild"] },
  { id: "raum", title: "Raumanalyse", question: "Welche Bedeutung kann Raum tragen?", focus: "Raumbeobachtungen von Deutungen trennen und Atmosphäre, Macht, Handlungsspielraum und Symbolik textnah untersuchen.", terms: ["Schwelle", "sozialer Raum", "symbolische Bedeutung"] },
  { id: "konflikt", title: "Handlung und Konflikt", question: "Was steht für die Figur auf dem Spiel?", focus: "Figur, Gut, Bedrohung, Reaktion und Ausgang zu einer kausalen Konfliktanalyse verbinden.", terms: ["Gut", "innerer Konflikt", "Wendepunkt"] },
  { id: "interpretation", title: "Von der Analyse zur Interpretation", question: "Wie wird aus Befunden eine begründete Deutung?", focus: "Beobachtung, Textbeleg, Analyse, Wirkung und Deutung logisch verbinden.", terms: ["Textbeleg", "Wirkung", "Deutung"] },
];

export const epikDemoTexts: readonly EpikDemoText[] = [
  { id: "faehre", title: "Die letzte Überfahrt", setting: "Fähre im Nebel", focusAreaIds: ["perspektive", "naehe"], text: "Als das Horn ein zweites Mal durch den Nebel drang, umklammerte Leander die nasse Reling. Am anderen Ende des Decks hob die Kapitänin kurz die Hand. Ein beruhigendes Zeichen? Bestimmt hatte sie die dunkle Kontur längst gesehen. Leander sagte nichts." },
  { id: "kino", title: "Nach der Vorstellung", setting: "Verlassenes Kino", focusAreaIds: ["raum", "figuren"], text: "Samira schob die Tür zum Saal auf. Staub tanzte im Licht der Notleuchte; in der letzten Reihe stand noch der rote Sitz, den ihr Vater nie hatte austauschen lassen. ‚Morgen fangen wir vorne an‘, sagte ihr Bruder. Samira strich über die abgewetzte Lehne und antwortete nicht." },
  { id: "nachtzug", title: "Abteil sieben", setting: "Nachtzug", focusAreaIds: ["zeit", "konflikt"], text: "Jeden Donnerstag hatte Nils den Brief im Abteil sieben gelesen und wieder eingesteckt. Heute blieb der Zug vor dem Tunnel stehen. Eine Minute lang bewegte sich nichts. Dann riss Nils den Umschlag auf, obwohl er die Antwort längst kannte." },
];

export const epikGlossary = [
  { id: "erzaehlinstanz", term: "Erzählinstanz", short: "Die vermittelnde Stimme eines erzählenden Textes.", explanation: "Sie ist vom realen Autor zu unterscheiden und bestimmt, wie das Geschehen für Leserinnen und Leser zugänglich wird.", example: "Im Fährentext vermittelt die Erzählinstanz Leanders Wahrnehmung und Unsicherheit." },
  { id: "personal", term: "Personale Perspektivierung", short: "Die Darstellung ist an Wahrnehmung und Wissen einer Figur gebunden.", explanation: "Andere Figuren bleiben nur so weit zugänglich, wie die Wahrnehmungsfigur sie beobachten oder erschließen kann.", example: "Ob die Kapitänin tatsächlich Gefahr erkannt hat, bleibt Leander und den Lesenden unsicher." },
  { id: "textbeleg", term: "Textbeleg", short: "Eine konkrete Textstelle, die eine Analysebehauptung stützt.", explanation: "Ein geeigneter Beleg muss zur Behauptung passen; zusätzlich ist zu erklären, weshalb er sie trägt.", example: "‚Ein beruhigendes Zeichen?‘ belegt Leanders unsichere Deutung der Geste." },
  { id: "deutung", term: "Deutung", short: "Eine aus Textbeobachtungen entwickelte Bedeutungshypothese.", explanation: "Sie verbindet mehrere Befunde logisch und darf nicht weiter reichen, als der Text trägt.", example: "Die begrenzte Wahrnehmung kann Leanders Kontrollverlust hervorheben." },
] as const;

export const epikGame = { id: "epik", title: "Analysewerkstatt Epik", chapters: epikAreas.map(({ id, title }) => ({ id, title, status: "ready" as const })) } as const;

export const initialUnlockedEpikAreas = 1;
export function unlockNextEpikArea(current: number, completedIndex: number): number { return Math.min(epikAreas.length + 1, Math.max(current, completedIndex + 2)); }
