export type PracticeText = { id: string; title: string; text: string; purpose: string; sourceType: "self-authored" };

export const chapter01Steps = [
  "Dasselbe Geschehen – andere Geschichte",
  "Wer erzählt hier eigentlich?",
  "Autor oder Erzähler?",
  "Was wird überhaupt erzählt?",
  "Spuren sichern",
] as const;

export const chapter01PracticeTexts: readonly PracticeText[] = [
  { id: "bus", title: "Der letzte Bus", text: "Kurz nach Mitternacht erreichte Rami die Haltestelle. Auf der Anzeige stand noch immer 00:17, obwohl es längst 00:24 Uhr war. Er trat an den Fahrbahnrand, sah die leere Straße hinunter und steckte das Handy wieder ein. Fünf Minuten später ging er zu Fuß weiter.", purpose: "Erzähler und Figur unterscheiden", sourceType: "self-authored" },
  { id: "fundus", title: "Im Fundus", text: "Am Nachmittag suchte Helen im Theaterfundus nach einem roten Mantel. Hinter zwei Kleiderständern entdeckte sie eine schmale Tür, die sie dort noch nie gesehen hatte. Sie drückte die Klinke hinunter. Die Tür war verschlossen.", purpose: "Figur und erzählte Welt identifizieren", sourceType: "self-authored" },
  { id: "nachricht", title: "Die Nachricht", text: "Als Kenan die Sprachnachricht zum dritten Mal abspielte, verstand er den letzten Satz noch immer nicht. Er setzte die Kopfhörer ab und blickte zum geöffneten Fenster. Auf dem Hof schob jemand ein Fahrrad durch den Regen.", purpose: "Auswahl des Erzählten untersuchen", sourceType: "self-authored" },
  { id: "dach", title: "Auf dem Dach", text: "Sofie stellte den Farbeimer neben den Schornstein. Unten begann der Verkehr dichter zu werden. Sie strich mit dem Pinsel über die letzte freie Stelle der Mauer und trat einige Schritte zurück. Von der Straße aus konnte niemand das fertige Bild sehen.", purpose: "Erzählte Welt und Figur erkennen", sourceType: "self-authored" },
  { id: "probe", title: "Die Probe", text: "Der Schlagzeuger hob die Stöcke. Drei Sekunden lang sagte niemand etwas. Dann begann die Bassistin allein zu spielen. Leon sah zu ihr hinüber, legte die Gitarre auf den Verstärker und verließ den Raum.", purpose: "Auswahl und Reihenfolge erkennen", sourceType: "self-authored" },
  { id: "museum", title: "Nach Feierabend", text: "Um achtzehn Uhr schloss Frau Levin den letzten Ausstellungsraum. Im Treppenhaus blieb sie stehen. Aus dem oberen Stockwerk war ein kurzes Klirren zu hören. Sie wartete einen Moment, nahm dann das Funkgerät vom Gürtel und ging die Stufen wieder hinauf.", purpose: "Ereignis und Darstellung unterscheiden", sourceType: "self-authored" },
  { id: "umschlag", title: "Der Umschlag", text: "Auf dem Küchentisch lag ein brauner Umschlag ohne Absender. Malik stellte die Einkaufstasche ab, drehte den Umschlag um und betrachtete die Rückseite. Schließlich schob er ihn unter einen Stapel alter Zeitungen.", purpose: "Beobachtung und Vermutung trennen", sourceType: "self-authored" },
  { id: "faehre", title: "Die Überfahrt", text: "Die Fähre hatte den Hafen kaum verlassen, als die Lautsprecher knackten. Ein Teil der Passagiere blickte zur Decke. Liv blieb am Fenster sitzen. Hinter dem Glas verschwand die Küste langsam im Nebel.", purpose: "Erzähltes Geschehen im Transfer untersuchen", sourceType: "self-authored" },
];

export function selectPracticeText(cursor: number, excludedIds: readonly string[] = []): PracticeText {
  const available = chapter01PracticeTexts.filter((text) => !excludedIds.includes(text.id));
  const pool = available.length ? available : chapter01PracticeTexts;
  return pool[((cursor % pool.length) + pool.length) % pool.length];
}

export const compareVersionCases = [
  { id: "platz", versions: ["Als Nils den Platz erreichte, war die Bank leer. Er sah auf die Uhr. 18:23 Uhr. Die Verabredung war für sechs gewesen.", "Endlich tauchte Nils auf. Dreiundzwanzig Minuten zu spät. Die leere Bank hätte ihm eigentlich genug sagen müssen.", "Nils lief über den Platz und blieb vor der leeren Bank stehen. Niemand wartete dort. Er zog sein Handy aus der Tasche und öffnete den Chat."] },
  { id: "video", versions: ["Mara öffnete um 9:07 Uhr die Videokonferenz. Die übrigen Kamerafelder waren bereits gefüllt.", "Sieben Minuten ließ Mara das Team warten, bevor ihr Bild endlich auf dem Bildschirm erschien.", "Als Mara beitrat, verstummte das Gespräch. Sie prüfte ihr Mikrofon und sagte: ‚Entschuldigung.‘"] },
  { id: "ausstellung", versions: ["Tarek erreichte den Ausstellungsraum nach der vereinbarten Übergabe. Die Transportkiste war bereits abgeholt worden.", "Tarek kam zu spät; die verpasste Übergabe ließ sich nun nicht mehr rückgängig machen.", "Vor dem leeren Sockel blieb Tarek stehen. Neben der Tür lag nur noch der quittierte Abholschein."] },
  { id: "sport", versions: ["Als Juna vor der Sporthalle ankam, hatte der Kurs bereits begonnen.", "Juna verpasste wieder den Beginn. Durch die Glastür sah sie die anderen schon laufen.", "Die Hallenuhr zeigte 17:11 Uhr. Juna band vor der geschlossenen Tür noch einmal ihre Schuhe."] },
  { id: "konzert", versions: ["Ravi wartete vor dem Konzertsaal. Als Enno eintraf, hatte der Einlass bereits begonnen.", "Enno ließ Ravi bis zum Einlass allein warten und erschien erst, als die Türen geöffnet wurden.", "Die Warteschlange setzte sich in Bewegung. Ravi sah Enno vom anderen Ende des Platzes herüberlaufen."] },
  { id: "fuehrung", versions: ["Leonie erreichte den Museumshof, nachdem die Führung das Gebäude betreten hatte.", "Zu spät für den Beginn: Leonie sah nur noch, wie die Gruppe hinter der Sicherheitstür verschwand.", "Im Hof lag der ausgeklappte Lageplan. Leonie nahm ihn auf und suchte nach dem ersten Ausstellungsraum."] },
] as const;
export const compareVersions = compareVersionCases[0].versions;

export const compareObservations = [
  { id: "same", text: "Das Grundgeschehen bleibt ähnlich.", correct: true },
  { id: "details", text: "Nicht jede Fassung nennt dieselben Einzelheiten.", correct: true },
  { id: "effect", text: "Die Darstellung kann unterschiedlich wirken.", correct: true },
  { id: "selection", text: "Eine Fassung kann Informationen ergänzen, die eine andere auslässt.", correct: true },
  { id: "scope", text: "Ein vergleichbares Geschehen bedeutet nicht denselben Informationsumfang.", correct: true },
  { id: "identical", text: "Alle Fassungen vermitteln genau dieselben Informationen.", correct: false },
  { id: "wording-only", text: "Nur einzelne Wörter verändern sich; Auswahl und Wirkung bleiben gleich.", correct: false },
] as const;

export const authorNarratorStatements = [
  { id: "author-real", text: "Der Autor ist die reale Person, die einen Text verfasst.", correct: true },
  { id: "always-identical", text: "Der Erzähler ist immer mit dem Autor identisch.", correct: false },
  { id: "narrator-mediates", text: "Der Erzähler gehört zur Vermittlung der erzählten Geschichte.", correct: true },
  { id: "figure-world", text: "Eine Figur handelt innerhalb der erzählten Welt.", correct: true },
  { id: "ich-author", text: "In der Ich-Form berichtet automatisch der Autor über sein eigenes Leben.", correct: false },
  { id: "distinguish", text: "Autor und Erzähler müssen bei einer Analyse unterschieden werden.", correct: true },
  { id: "invented", text: "Ein erfundener Erzähler kann Dinge berichten, die der reale Autor nie erlebt hat.", correct: true },
] as const;

export function evaluateAuthorNarrator(id: string, answer: boolean): boolean {
  return authorNarratorStatements.find((item) => item.id === id)?.correct === answer;
}

export const transferAnswerIds = ["actors", "setting", "mediator", "observation", "beyond", "sentence"] as const;
export function isTransferComplete(answers: Record<string, unknown>): boolean {
  return transferAnswerIds.every((id) => Boolean(answers[id]));
}

export const practiceChecks: Record<string, { contained: string; notContained: string; actors: string; setting: string; observation: string; beyond: string }> = {
  bus: { contained: "Rami geht schließlich zu Fuß weiter.", notContained: "Der Bus fällt wegen eines Defekts aus.", actors: "Rami", setting: "Eine Haltestelle kurz nach Mitternacht", observation: "Die Anzeige zeigt 00:17 Uhr.", beyond: "Rami ist wütend auf den Busfahrer." },
  fundus: { contained: "Helen findet eine verschlossene Tür.", notContained: "Hinter der Tür lagern Kostüme.", actors: "Helen", setting: "Ein Theaterfundus am Nachmittag", observation: "Die Tür ist verschlossen.", beyond: "Helen fürchtet sich vor der Tür." },
  nachricht: { contained: "Kenan spielt eine Nachricht mehrfach ab.", notContained: "Die Nachricht stammt von seiner Schwester.", actors: "Kenan und eine weitere, nicht näher bezeichnete Figur auf dem Hof", setting: "Ein Ort mit Blick durch ein geöffnetes Fenster auf einen Hof", observation: "Kenan versteht den letzten Satz nicht.", beyond: "Kenan erhält eine schlechte Nachricht." },
  dach: { contained: "Sofie arbeitet an einem Bild auf einer Mauer.", notContained: "Sofie malt im Auftrag der Stadt.", actors: "Sofie", setting: "Ein Dach bei dichter werdendem Verkehr", observation: "Von der Straße ist das fertige Bild nicht sichtbar.", beyond: "Sofie will das Bild geheim halten." },
  probe: { contained: "Leon verlässt den Raum.", notContained: "Die Band löst sich nach der Probe auf.", actors: "Ein Schlagzeuger, eine Bassistin und Leon", setting: "Ein Probenraum", observation: "Die Bassistin beginnt allein zu spielen.", beyond: "Leon ist eifersüchtig auf die Bassistin." },
  museum: { contained: "Frau Levin hört ein Klirren.", notContained: "Ein Ausstellungsstück wurde zerstört.", actors: "Frau Levin", setting: "Ein Museum nach Schließung des letzten Ausstellungsraums", observation: "Frau Levin geht die Stufen wieder hinauf.", beyond: "Frau Levin weiß, dass ein Einbrecher im Haus ist." },
  umschlag: { contained: "Malik schiebt den Umschlag unter Zeitungen.", notContained: "Der Umschlag enthält eine Rechnung.", actors: "Malik", setting: "Eine Küche mit einem Tisch", observation: "Der Umschlag trägt keinen Absender.", beyond: "Malik hat Angst vor dem Inhalt." },
  faehre: { contained: "Die Küste verschwindet langsam im Nebel.", notContained: "Die Lautsprecher kündigen einen Sturm an.", actors: "Liv und weitere Passagiere", setting: "Eine Fähre kurz nach dem Verlassen des Hafens", observation: "Ein Teil der Passagiere blickt zur Decke.", beyond: "Liv ignoriert absichtlich eine Warnung." },
};

export const chapter01Glossary = [
  { id: "autor", term: "Autor", short: "Reale Person, die den literarischen Text verfasst hat." },
  { id: "erzaehler", term: "Erzähler / Erzählinstanz", short: "Die Instanz, durch die ein epischer Text seine Geschichte vermittelt.", note: "Der Erzähler darf nicht automatisch mit dem Autor gleichgesetzt werden." },
  { id: "welt", term: "Erzählte Welt", short: "Die im Text dargestellte Welt aus Figuren, Orten, Ereignissen und Zusammenhängen." },
  { id: "figur", term: "Figur", short: "Eine handelnde oder dargestellte Person innerhalb der erzählten Welt." },
  { id: "leser", term: "Leser", short: "Die Person, die den Text beziehungsweise die vermittelte Geschichte wahrnimmt." },
] as const;
