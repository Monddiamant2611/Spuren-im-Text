export type FamilyFeedback = { focus: string; distinction: string };

export const familyFeedback: Readonly<Record<string, FamilyFeedback>> = {
  erzaehlebenen: { focus: "Prüfen Sie, ob die genannte Instanz außerhalb des Textes, auf der Vermittlungsebene oder in der erzählten Welt liegt.", distinction: "Realer Autor und Erzählinstanz sind ebenso wenig identisch wie reale und implizite Leser." },
  erzaehlform: { focus: "Bestimmen Sie zunächst nur die grammatische Form des Erzählens.", distinction: "Beteiligung und Wissensorganisation werden auf anderen Achsen geprüft." },
  beteiligung: { focus: "Prüfen Sie, ob die Erzählinstanz selbst zur erzählten Welt gehört.", distinction: "Homodiegetisch bezeichnet Beteiligung; die Ich-Form bezeichnet grammatische Form." },
  erzaehlverhalten: { focus: "Vergleichen Sie Wissensumfang, Figurenbindung und kommentierende Vermittlung.", distinction: "Die grammatische Erzählform allein belegt kein personales oder auktoriales Verhalten." },
  "ich-erzaehler": { focus: "Bestimmen Sie Ich-Form und Beteiligung zunächst getrennt.", distinction: "Ich-Erzähler verbindet Ich-Form mit homodiegetischer Beteiligung." },
  "ich-zeiten": { focus: "Ordnen Sie damaliges Erleben und späteres Erzählen zeitlich zu.", distinction: "Zusätzliches Rückblickwissen gehört zum erzählenden, nicht zum erlebenden Ich." },
  erzaehlhaltung: { focus: "Suchen Sie eine konkrete Wertung, Ironie oder sprachliche Distanz.", distinction: "Eine Haltung muss am Wortlaut belegt werden und folgt nicht automatisch aus der Perspektive." },
  "innen-aussen": { focus: "Prüfen Sie, ob innere Vorgänge oder nur äußerlich Beobachtbares mitgeteilt werden.", distinction: "Innensicht ist Informationszugang; Figurennähe bezeichnet den Grad der Unmittelbarkeit." },
  "naehe-distanz": { focus: "Fragen Sie, wie unmittelbar Wahrnehmung und Erleben der Figur vermittelt werden.", distinction: "Nähe ist graduell und nicht mit Innensicht gleichzusetzen." },
  "subjektive-wahrnehmung": { focus: "Suchen Sie eine durch die Figur gefilterte Bewertung oder Sinneswahrnehmung der Welt.", distinction: "Ein mitgeteilter innerer Vorgang ist nicht automatisch eine subjektiv gefilterte Weltbeschreibung." },
  wahrnehmungslenkung: { focus: "Achten Sie auf Auswahl, Reihenfolge und Gewichtung der dargestellten Details.", distinction: "Der Fokus des Textes darf nicht durch unbelegte Ergänzungen erweitert werden." },
  grundformen: { focus: "Prüfen Sie, ob Erzählinstanz oder Figur die Äußerung vermittelt.", distinction: "Erzählerbericht und Figurenrede bezeichnen verschiedene Vermittlungsebenen." },
  "gesprochene-rede": { focus: "Achten Sie auf Wortlaut, Redeeinleitung und grammatische Einbettung.", distinction: "Eine Inquit-Formel kennzeichnet die Rede, ist aber keine eigene Darbietungsform." },
  gedanken: { focus: "Prüfen Sie Person, Tempus, Redeeinleitung und gedankliche Ordnung.", distinction: "Erlebte Rede bleibt in der dritten Person; innerer Monolog ist unmittelbare Gedankenrede; Bewusstseinsstrom ist stärker assoziativ aufgelöst." },
  zeitbegriffe: { focus: "Trennen Sie dargestellten Zeitraum und Umfang der Darstellung.", distinction: "Erzählte Zeit und Erzählzeit sind zwei verschiedene Maße." },
  ordnung: { focus: "Prüfen Sie die Reihenfolge der erzählten Ereignisse.", distinction: "Analepse und Prolepse betreffen Ordnung, nicht Erzähltempo." },
  dauer: { focus: "Vergleichen Sie Zeitraum des Geschehens und Darstellungsumfang.", distinction: "Deckung, Raffung und Dehnung bezeichnen Dauer, nicht Häufigkeit." },
  frequenz: { focus: "Fragen Sie, wie oft etwas geschieht und wie oft es erzählt wird.", distinction: "Frequenz ist von zeitlicher Reihenfolge und Erzähltempo zu trennen." },
  charakterisierung: { focus: "Prüfen Sie, ob eine Eigenschaft genannt oder aus Verhalten erschlossen wird.", distinction: "Eine einzelne Handlung erlaubt nur eine vorsichtige, situationsbezogene Charakterisierung." },
  antrieb: { focus: "Trennen Sie: Was will die Figur erreichen, warum handelt sie und welche allgemeinere Haltung zeigt sich?", distinction: "Ziel, Motiv und Wert beantworten drei verschiedene Fragen; ein Motiv kann im Text auch offenbleiben." },
  bilder: { focus: "Ordnen Sie die Aussage der Figur selbst oder einer anderen Instanz zu.", distinction: "Selbstbild und Fremdbild können voneinander abweichen, ohne dass eines automatisch wahr ist." },
  anlage: { focus: "Prüfen Sie Komplexität und Veränderung auf getrennten Achsen.", distinction: "Ein Widerspruch belegt noch keine Entwicklung; dynamisch ist eine Figur erst bei nachweisbarer Veränderung im Verlauf." },
  raumarten: { focus: "Bestimmen Sie zunächst, welche konkrete oder soziale Raumebene der Text gestaltet.", distinction: "Eine Raumart ist noch keine Aussage über Symbolik." },
  grenzen: { focus: "Achten Sie auf Lage, Zugang, Schwellen und räumliche Beziehungen.", distinction: "Eine Grenze kann Handlung und Beziehungen ordnen, ohne automatisch symbolisch zu sein." },
  raumfunktion: { focus: "Erklären Sie zuerst, was der Raum im konkreten Geschehen ermöglicht oder verhindert.", distinction: "Eine weiterführende Symboldeutung benötigt zusätzliche Textsignale." },
  konfliktachse: { focus: "Prüfen Sie, welche Ziele, Werte oder Pflichten tatsächlich kollidieren.", distinction: "Problem und Bedrohung sind nicht allein schon ein Konflikt; entscheidend ist die Kollision." },
  wendepunkt: { focus: "Suchen Sie eine Veränderung der Handlungsmöglichkeiten oder -richtung.", distinction: "Eine Reaktion ist nicht automatisch eine Entscheidung oder ein Wendepunkt." },
  textaufbau: { focus: "Prüfen Sie, wie Abschnitte und Informationen funktional angeordnet sind.", distinction: "Eine bloße Inhaltsfolge erklärt noch nicht den Textaufbau." },
  handlungsstraenge: { focus: "Verfolgen Sie getrennte Ereignislinien und ihre Verbindung.", distinction: "Parallelhandlung ist weder automatisch Perspektivwechsel noch Mehrschichtigkeit." },
  wortwahl: { focus: "Benennen Sie das konkrete Wortsignal und prüfen Sie seine Bedeutung im Zusammenhang.", distinction: "Wortwahl besitzt keine feste Wirkung außerhalb des Kontexts." },
  satzbau: { focus: "Untersuchen Sie Satzverknüpfung und Rhythmus im konkreten Ausschnitt.", distinction: "Kurze Sätze erzeugen nicht automatisch Spannung; die Wirkung muss hier begründet werden." },
  muster: { focus: "Prüfen Sie Wiederkehr, Variation und Funktion des Musters.", distinction: "Eine einzelne Wiederholung ist noch kein literarisches Motiv." },
  "mittel-wirkung": { focus: "Verbinden Sie sprachliches Signal und mögliche Wirkung im konkreten Zusammenhang.", distinction: "Das Benennen eines Mittels ist noch keine Analyse und seine Wirkung keine feste Regel." },
  analysekette: { focus: "Ordnen Sie den Schritt vom überprüfbaren Befund zur begründeten Bedeutung.", distinction: "Beobachtung, Analyse, Wirkung und Deutung dürfen nicht übersprungen oder gleichgesetzt werden." },
  vorbereiten: { focus: "Klären Sie Operator, Gegenstand und Schwerpunkt der Aufgabe.", distinction: "Nicht jeder bekannte Fachbegriff ist für den Schreibauftrag relevant." },
  aufbau: { focus: "Prüfen Sie die Funktion des Abschnitts innerhalb der Argumentation.", distinction: "Aufsatzteile werden nicht nur benannt, sondern erfüllen unterschiedliche Aufgaben." },
  belegen: { focus: "Verbinden Sie Behauptung, passenden Textbeleg und fachliche Erklärung.", distinction: "Ein thematisch passendes Zitat trägt eine Behauptung noch nicht automatisch." },
  ueberarbeiten: { focus: "Prüfen Sie Tempus, Belegqualität und argumentative Verknüpfung.", distinction: "Überarbeiten ist mehr als Rechtschreibkontrolle." },
};

export function chapterChoiceFeedback(label: string, selected: string, answer: string): string {
  const correct = selected === answer;
  const text = `${label} ${selected} ${answer}`.toLocaleLowerCase("de-DE");
  if (/ordnung|analepse|prolepse/.test(text)) return correct ? "Richtig – das Textsignal verändert die Reihenfolge der Ereignisse. Damit ist die Ordnung bestimmt, nicht Dauer oder Frequenz." : "Prüfen Sie den zeitlichen Sprung: Ordnung fragt nach früher oder später; Darstellungsumfang und Häufigkeit gehören zu anderen Achsen.";
  if (/frequenz|singulativ|repetitiv|iterativ/.test(text)) return correct ? "Richtig – Ereignishäufigkeit und Erzählhäufigkeit wurden am konkreten Signal unterschieden." : "Fragen Sie getrennt: Wie oft geschieht das Ereignis, und wie oft wird es erzählt? Reihenfolge und Tempo entscheiden diese Frage nicht.";
  if (/ziel|motiv|wert|haltung/.test(text)) return correct ? "Richtig – Ziel, Handlungsgrund und allgemeinere Haltung wurden textnah getrennt." : "Prüfen Sie: Beschreibt die Antwort, was erreicht werden soll, warum die Figur handelt oder welche allgemeinere Haltung sich hier zeigen kann?";
  if (/entwicklung|dynamisch|statisch|komplex|einfach/.test(text)) return correct ? "Richtig – die Einordnung stützt sich auf belegbare Veränderung im Verlauf." : "Ein Widerspruch oder mehrere Eigenschaften beweisen noch keine Entwicklung. Vergleichen Sie Verhalten am Anfang und am Ende; Komplexität ist eine eigene Achse.";
  if (/raum|symbol|schwelle|zugang/.test(text)) return correct ? "Richtig – die konkrete Raumfunktion ist am Zugang oder an der Handlung belegt; eine Symboldeutung wäre ein weiterer Schritt." : "Erklären Sie zuerst, was der Raum hier ermöglicht, verhindert oder ordnet. Symbolik darf erst mit zusätzlichen Textsignalen begründet werden.";
  if (/konflikt|reaktion|entscheidung|bedrohung|wendepunkt/.test(text)) return correct ? "Richtig – Bedrohung, Reaktion, Entscheidung und Folge wurden im Konfliktverlauf getrennt." : "Eine Bedrohung erzeugt eine Entscheidungslage; eine Reaktion ist aber noch keine Entscheidung. Prüfen Sie, was im Text tatsächlich vollzogen und welche Folge sicher ist.";
  if (/wirkung|deutung|beobachtung|analyse|beleg/.test(text)) return correct ? "Richtig – die Aussage steht auf der passenden Stufe zwischen Befund, Erklärung, Wirkung und Deutung." : "Fragen Sie, ob die Aussage unmittelbar überprüfbar ist, ein Merkmal erklärt, eine mögliche Wirkung beschreibt oder bereits mehrere Befunde deutet.";
  if (/rede|monolog|gedanke|bewusstsein|inquit/.test(text)) return correct ? "Richtig – Wortlaut, grammatische Einbettung und Vermittlungsgrad tragen die Bestimmung." : "Prüfen Sie Person, Tempus, Redeeinleitung und gedankliche Ordnung. Eine Inquit-Formel ist nur ein Begleitsignal, keine eigene Redeform.";
  if (/innen|außen|wahrnehm|nähe|distanz/.test(text)) return correct ? "Richtig – Informationszugang und Grad der Nähe wurden am Textsignal begründet." : "Prüfen Sie zuerst, ob innere Vorgänge zugänglich sind. Subjektiver Wahrnehmungsfilter und Figurennähe sind anschließend getrennte Fragen.";
  if (/erzähler|autor|form|personal|auktorial|homodiegetisch/.test(text)) return correct ? "Richtig – die Antwort bleibt auf der gefragten Erzählebene und wird durch das konkrete Signal getragen." : "Bestimmen Sie zuerst die gefragte Achse: reale Person, grammatische Form, Beteiligung und Erzählverhalten sind nicht dasselbe.";
  return correct ? `Richtig – „${answer}“ wird durch den sichtbaren Befund getragen.` : `Noch nicht: Vergleichen Sie Ihre Auswahl mit dem entscheidenden Textsignal. Gesucht ist „${answer}“, nicht nur eine thematisch passende Aussage.`;
}
