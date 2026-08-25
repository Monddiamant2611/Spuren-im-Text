export const finalCasePhases = ["ORIENTIEREN", "SPUREN SICHTEN", "RELEVANZ ENTSCHEIDEN", "BELEGE SICHERN", "ZUSAMMENHÄNGE HERSTELLEN", "DEUTUNG PRÜFEN", "INTERPRETATION ZUSAMMENSETZEN"] as const;

export type FinalAreaWeight = { area: string; weight: "central" | "supporting" | "minor" };
export type FinalFinding = { text: string; relevance: "central" | "supporting" | "unsupported" };
export type FinalEvidenceTask = { claim: string; options: readonly string[]; answer: string };
export type FinalChain = { observation: string; evidence: string; analysis: string; effect: string; interpretation: string };
export type FinalHypothesis = { text: string; valid: boolean; kind: "narrow" | "plausible" | "absolute" | "overreach" };
export type FinalCase = {
  id: string; title: string; text: string; sourceType: "self-authored";
  situation: string; figures: string; change: string; openInformation: string;
  centralAnalysisAreas: readonly string[]; supportingAnalysisAreas: readonly string[]; areaWeights: readonly FinalAreaWeight[];
  findings: readonly FinalFinding[]; evidenceTasks: readonly FinalEvidenceTask[]; chains: readonly FinalChain[];
  hypotheses: readonly FinalHypothesis[]; interpretationVariants: readonly [readonly string[], readonly string[]];
};

const areas = ["narrator", "perspective", "perception", "reliability", "thought", "speech", "time", "character", "space", "conflict"] as const;
function weights(central: readonly string[], supporting: readonly string[]): FinalAreaWeight[] { return areas.map((area) => ({ area, weight: central.includes(area) ? "central" : supporting.includes(area) ? "supporting" : "minor" })); }

export const finalCases: readonly FinalCase[] = [
  {
    id: "vorhang", title: "Vor dem Vorhang", sourceType: "self-authored",
    text: `Als die Saaltüren geschlossen wurden, blieb Ilyas noch einen Moment hinter dem schwarzen Vorhang stehen.

Jenseits des Stoffes sprach die Moderatorin bereits über das Projekt. Seine Folien waren auf der großen Leinwand zu sehen, obwohl er selbst sie von hier aus nur spiegelverkehrt auf einem kleinen Kontrollmonitor erkennen konnte.

„Und nun begrüßen wir den Leiter des Projekts.“

Leiter.

Ilyas strich über die Kante seiner Karteikarte.

Vor elf Monaten hatte im ersten Konzept noch ein anderer Name über seinem gestanden: Helena Voss. Damals hatte sie die Versuchsreihe entwickelt, die später den Durchbruch brachte. Drei Wochen vor der Veröffentlichung war sie aus dem Team ausgeschieden.

„Du bist dran“, sagte der Techniker.

Ilyas nickte. Auf der ersten Folie stand: PROJEKTLEITUNG: ILYAS MERCAN. Er hatte die Präsentation am Morgen selbst noch einmal kontrolliert.

Der Vorhang öffnete sich einen Spalt. Licht fiel auf den Boden vor seinen Schuhen. Nur hinausgehen. Zwei Schritte. Aus dem Saal kam Applaus.

Ilyas steckte die Karteikarte in die Tasche. „Eine Sekunde noch.“ Der Techniker sah auf die Uhr.

Ilyas öffnete die Präsentation auf dem Kontrollrechner, klickte zurück zur Titelfolie und setzte den Cursor hinter seinen Namen. Dann blieb seine Hand über der Tastatur liegen.`,
    situation: "Ilyas soll als Projektleiter auf die Bühne treten und hält unmittelbar davor inne.", figures: "Ilyas, Helena Voss, der Techniker und die Moderatorin", change: "Ilyas beginnt, die bereits kontrollierte Titelfolie kurz vor seinem Auftritt zu bearbeiten.", openInformation: "Was Ilyas eintragen wird und ob er den Vortrag hält.",
    centralAnalysisAreas: ["perspective", "thought", "time", "character", "conflict"], supportingAnalysisAreas: ["space"], areaWeights: weights(["perspective", "thought", "time", "character", "conflict"], ["space"]),
    findings: [
      { text: "Der Vorhang bildet eine Schwelle zwischen Backstagebereich und öffentlicher Bühne.", relevance: "central" }, { text: "Die Sekunden vor dem Auftritt werden stark ausgedehnt.", relevance: "central" }, { text: "Die Analepse informiert über Helenas frühere Rolle.", relevance: "central" }, { text: "Die Gedankenfragmente führen unmittelbar an Ilyas’ Wahrnehmung heran.", relevance: "central" }, { text: "Der Applaus kommt aus dem Saal.", relevance: "supporting" }, { text: "Der Kontrollmonitor zeigt die Folien spiegelverkehrt.", relevance: "supporting" }, { text: "Ilyas wird Helena sicher als Projektleiterin einsetzen.", relevance: "unsupported" }, { text: "Der Vorhang beweist, dass Ilyas sein Leben als Lüge erkennt.", relevance: "unsupported" },
    ],
    evidenceTasks: [
      { claim: "Unmittelbare Innennähe", options: ["Leiter. / Nur hinausgehen. Zwei Schritte.", "Der Techniker sah auf die Uhr.", "Die Saaltüren wurden geschlossen."], answer: "Leiter. / Nur hinausgehen. Zwei Schritte." },
      { claim: "Helenas früherer Beitrag", options: ["Sie hatte die Versuchsreihe entwickelt.", "Aus dem Saal kam Applaus.", "Ilyas nickte."], answer: "Sie hatte die Versuchsreihe entwickelt." },
      { claim: "Offene moralische Entscheidung", options: ["Seine Hand blieb über der Tastatur liegen.", "Licht fiel auf den Boden.", "Die Folien waren groß."], answer: "Seine Hand blieb über der Tastatur liegen." },
    ],
    chains: [
      { observation: "Ilyas steht vor dem Vorhang.", evidence: "Der Vorhang öffnet sich einen Spalt.", analysis: "Schwellenraum", effect: "Der Auftritt erscheint als Grenzüberschreitung.", interpretation: "Öffentliches Auftreten wird zur moralischen Entscheidung." },
      { observation: "Helenas Beitrag wird nachgetragen.", evidence: "Vor elf Monaten stand ihr Name über seinem.", analysis: "Analepse", effect: "Die öffentliche Titelfolie wird relativiert.", interpretation: "Anerkennung und Beitragsverantwortung geraten in Spannung." },
      { observation: "Wenige Sekunden werden ausführlich erzählt.", evidence: "Karte, Vorhang, zwei Schritte, Cursor und Hand werden einzeln gezeigt.", analysis: "Zeitdehnung", effect: "Das Zögern wird hervorgehoben.", interpretation: "Der ungelöste innere Konflikt bildet das Zentrum." },
    ],
    hypotheses: [
      { text: "Die Passage zeigt ausschließlich Ilyas’ Nervosität vor einem Vortrag.", valid: false, kind: "narrow" }, { text: "Räumliche Schwelle, gedehnte Zeit und Rückblick machen den Auftritt zu einer moralischen Entscheidungssituation.", valid: true, kind: "plausible" }, { text: "Institutionelle Anerkennung und persönliche Verantwortungswahrnehmung können auseinanderfallen.", valid: true, kind: "plausible" }, { text: "Ilyas wird Helena auf jeden Fall öffentlich als alleinige Projektleiterin einsetzen.", valid: false, kind: "absolute" }, { text: "Der Vorhang beweist, dass Ilyas sein gesamtes Leben als Lüge erkennt.", valid: false, kind: "overreach" },
    ],
    interpretationVariants: [["Ilyas steht vor einer moralischen Entscheidung über öffentliche Anerkennung.", "Die Analepse erinnert an Helenas entscheidenden Beitrag.", "Dadurch wird die Titelfolie mit seinem alleinigen Namen fragwürdig.", "Zugleich dehnen Vorhang, Schritte und Cursor die letzten Sekunden.", "Die Schwelle zur Bühne verbindet Raum und inneren Konflikt.", "So wird der Auftritt zur Entscheidung über Verantwortung."], ["Der Auftritt ist für Ilyas mehr als eine Präsentation.", "Hinter dem Vorhang zögert er an einer räumlichen Schwelle.", "Die Zeitdehnung rückt dieses Zögern in den Mittelpunkt.", "Der Rückblick auf Helena widerspricht der öffentlichen Zuschreibung.", "Beide Befunde lassen Anerkennung und Selbstbild auseinanderfallen.", "Die offene Bearbeitung der Folie hält seine moralische Entscheidung bewusst offen."]],
  },
  {
    id: "pegel", title: "Der Pegel", sourceType: "self-authored",
    text: `Um 22:16 Uhr stand das Wasser noch sieben Zentimeter unter der Markierung. Meral schrieb den Wert in die Tabelle. Auf der anderen Seite des mobilen Schutzwalls standen drei Anwohner. „Wie lange bleibt das noch so?“, rief einer.

Hinter ihr leuchteten die Fenster der Turnhalle, in der Feldbetten aufgebaut wurden. Die Einsatzleitung hatte um 21:40 Uhr entschieden, die Straße vorerst nicht zu sperren. Der aktuelle Pegel rechtfertige eine vollständige Evakuierung noch nicht.

Meral sah wieder auf den Messstab. Sieben Zentimeter. Beim Hochwasser vor sechs Jahren waren es zwölf gewesen, als das Wasser innerhalb von zwanzig Minuten über die Mauer gestiegen war. Damals hatte sie noch auf der anderen Seite gestanden. Als Anwohnerin.

„Es fällt doch schon wieder, oder?“, fragte der Mann. Für einige Sekunden schien sich nichts zu verändern. Dann berührte das Wasser die nächste weiße Linie. Ihr Funkgerät knackte. „Messpunkt drei, Status?“

Die offizielle Markierung war noch nicht erreicht. Hinter dem Wall trug jemand einen Koffer zum Auto. „Messpunkt drei?“ Meral drückte die Sprechtaste.`,
    situation: "Meral muss bei steigendem Wasser einen offiziellen Status melden.", figures: "Meral, Anwohner und Einsatzleitung", change: "Das Wasser erreicht die nächste Linie, während Meral zur Meldung aufgefordert wird.", openInformation: "Welche Meldung Meral abgibt und ob eine Evakuierung folgt.",
    centralAnalysisAreas: ["time", "character", "space", "conflict"], supportingAnalysisAreas: ["perspective"], areaWeights: weights(["time", "character", "space", "conflict"], ["perspective"]),
    findings: [
      { text: "Messwerte strukturieren die Szene.", relevance: "central" }, { text: "Die Sekunden vor Merals Meldung werden ausführlich dargestellt.", relevance: "central" }, { text: "Die Analepse verbindet Beruf und frühere Erfahrung.", relevance: "central" }, { text: "Der Schutzwall trennt Meral von den Betroffenen.", relevance: "central" }, { text: "In der Turnhalle stehen Feldbetten.", relevance: "supporting" }, { text: "Ein Anwohner trägt einen Koffer.", relevance: "supporting" }, { text: "Die Einsatzleitung hat nachweislich falsch entschieden.", relevance: "unsupported" }, { text: "Meral wird lügen und das Viertel retten.", relevance: "unsupported" },
    ],
    evidenceTasks: [
      { claim: "Persönliche Hochwassererfahrung", options: ["Damals hatte sie auf der anderen Seite gestanden. Als Anwohnerin.", "Sie zog den Reißverschluss höher.", "Drei Menschen beobachteten sie."], answer: "Damals hatte sie auf der anderen Seite gestanden. Als Anwohnerin." },
      { claim: "Offizielle Schwelle noch nicht erreicht", options: ["Das Wasser stand sieben Zentimeter unter der Markierung.", "Die Turnhalle leuchtete.", "Das Funkgerät knackte."], answer: "Das Wasser stand sieben Zentimeter unter der Markierung." },
      { claim: "Entscheidungsdruck", options: ["‚Messpunkt drei, Status?‘", "Meral trug eine Jacke.", "Es war 22:16 Uhr."], answer: "‚Messpunkt drei, Status?‘" },
    ],
    chains: [
      { observation: "Messgrenze und Erfahrung widersprechen sich.", evidence: "Sieben Zentimeter / früher zwölf Zentimeter vor schnellem Anstieg", analysis: "Analepse und Figurenwissen", effect: "Die Sachmeldung erhält persönliche Dringlichkeit.", interpretation: "Kriterien und Erfahrungsverantwortung geraten in Konflikt." },
      { observation: "Meral steht zwischen Wall und Turnhalle.", evidence: "Anwohner jenseits des Walls, Feldbetten hinter ihr", analysis: "Raumordnung", effect: "Ihre Zwischenposition wird sichtbar.", interpretation: "Sie steht zwischen Institution und Betroffenen." },
      { observation: "Die Meldung wird hinausgezögert.", evidence: "Linie, Funkrufe und Sprechtaste werden einzeln erzählt.", analysis: "Zeitdehnung", effect: "Der Entscheidungsmoment gewinnt Gewicht.", interpretation: "Die scheinbar sachliche Meldung ist eine Verantwortungsentscheidung." },
    ],
    hypotheses: [{ text: "Die Passage handelt ausschließlich von einer Pegelmessung.", valid: false, kind: "narrow" }, { text: "Institutionelle Kriterien und persönliche Erfahrungsverantwortung geraten in Konflikt.", valid: true, kind: "plausible" }, { text: "Der Schutzwall kann Merals Position zwischen Institution und Betroffenen sichtbar machen.", valid: true, kind: "plausible" }, { text: "Meral wird die offizielle Vorgabe sicher missachten.", valid: false, kind: "absolute" }, { text: "Meral wird bewusst lügen und dadurch das Viertel retten.", valid: false, kind: "overreach" }],
    interpretationVariants: [["Meral muss eine sachlich wirkende Pegelmeldung abgeben.", "Der Rückblick bindet daran ihre Erfahrung als Anwohnerin.", "Dadurch gewinnt der Messwert persönliche Dringlichkeit.", "Der Schutzwall positioniert sie zugleich zwischen Institution und Betroffenen.", "Die gedehnten Sekunden steigern den Entscheidungsdruck.", "So kollidieren festgelegte Kriterien mit Erfahrungsverantwortung."], ["Die Szene verbindet Messung und Verantwortung.", "Obwohl die offizielle Grenze nicht erreicht ist, erinnert Meral den früheren Anstieg.", "Die Analepse erklärt ihre abweichende Risikowahrnehmung.", "Räumlich trennt der Wall sie von den gefährdeten Menschen.", "Die Zeitdehnung hebt ihre noch offene Meldung hervor.", "Damit erscheint institutionelles Handeln als schwierige Abwägung."]],
  },
  {
    id: "rueckgabe", title: "Die Rückgabe", sourceType: "self-authored",
    text: `Ich habe später oft erzählt, dass ich den Umschlag sofort zurückgeben wollte. So erinnere ich mich jedenfalls gern daran. An diesem Nachmittag lag er fast zwei Stunden auf meinem Schreibtisch. Der Name auf der Vorderseite war nicht meiner.

Dann sah ich das Logo des Auswahlkomitees. Seit drei Monaten warteten wir auf die Entscheidung. Vier Bewerbungen aus unserer Abteilung. Eine Stelle. Der Umschlag war nicht verschlossen. Zumindest nicht richtig. Ich schob ihn an den Rand des Tisches. Dann wieder zurück.

Kurz vor fünf kam Dalia herein. „Hast du zufällig meine Unterlagen gesehen?“ „Welche?“ Sie beschrieb den Umschlag. Ich sah direkt auf ihn. Dalia folgte meinem Blick. Es dauerte vielleicht zwei Sekunden. Damals kamen sie mir länger vor.

„Ach“, sagte ich. „Der lag zwischen meinen Sachen.“ Dalia nahm ihn. „Hast du reingesehen?“ Ich lachte. Nicht besonders überzeugend, nehme ich an. „Natürlich nicht.“ Noch heute weiß ich nicht, warum sie danach so lange schwieg.`,
    situation: "Ein fremder Umschlag liegt fast zwei Stunden auf dem Schreibtisch, bevor Dalia ihn zurückerhält.", figures: "Das erzählende Ich und Dalia", change: "Dalia entdeckt den Umschlag und fragt, ob das Ich hineingesehen hat.", openInformation: "Ob der Umschlag geöffnet wurde und wie Dalia das Verhalten deutet.",
    centralAnalysisAreas: ["narrator", "reliability", "time", "character"], supportingAnalysisAreas: ["speech", "conflict"], areaWeights: weights(["narrator", "time", "character"], ["speech", "conflict", "perspective"]),
    findings: [
      { text: "Der Erzähler kommentiert seine eigene Erinnerung.", relevance: "central" }, { text: "Der Umschlag liegt fast zwei Stunden auf seinem Tisch.", relevance: "central" }, { text: "Die zwei Sekunden vor der Rückgabe erscheinen gedehnt.", relevance: "central" }, { text: "Das wenig überzeugende Lachen relativiert seine Selbstdarstellung.", relevance: "central" }, { text: "Vier Figuren konkurrieren um eine Stelle.", relevance: "supporting" }, { text: "Dalia schweigt am Ende.", relevance: "supporting" }, { text: "Der Erzähler hat den Umschlag sicher geöffnet.", relevance: "unsupported" }, { text: "Dalias Schweigen beweist seine Schuld.", relevance: "unsupported" },
    ],
    evidenceTasks: [
      { claim: "Relativierte Selbstdarstellung", options: ["So erinnere ich mich jedenfalls gern daran.", "Kurz vor fünf kam Dalia.", "Der Name war nicht meiner."], answer: "So erinnere ich mich jedenfalls gern daran." },
      { claim: "Verzögerte Rückgabe", options: ["Fast zwei Stunden lag er auf meinem Schreibtisch.", "Vier Bewerbungen. Eine Stelle.", "Dalia kam herein."], answer: "Fast zwei Stunden lag er auf meinem Schreibtisch." },
      { claim: "Unsichere Wirkung auf Dalia", options: ["Nicht besonders überzeugend, nehme ich an.", "Der Umschlag war nicht richtig verschlossen.", "Sie nahm ihn."], answer: "Nicht besonders überzeugend, nehme ich an." },
    ],
    chains: [
      { observation: "Der Erzähler korrigiert seine eigene Erinnerung.", evidence: "So erinnere ich mich jedenfalls gern daran.", analysis: "rückblickendes Ich-Erzählen", effect: "Die klare Selbstbehauptung wird unsicher.", interpretation: "Erinnerung und Selbstbild konkurrieren." },
      { observation: "Die Rückgabe erfolgt erst nach zwei Stunden.", evidence: "Umschlag am Rand und wieder zurück", analysis: "Figurenverhalten", effect: "Zögern und mögliches Interesse werden sichtbar.", interpretation: "Eindeutige Unschuld lässt sich nicht aus seiner Darstellung ableiten." },
      { observation: "Zwei Sekunden werden rückblickend gedehnt.", evidence: "Damals kamen sie mir länger vor.", analysis: "Zeitdehnung", effect: "Dalias Blick erhält besonderes Gewicht.", interpretation: "Die Beziehung bleibt von unausgesprochener Unsicherheit geprägt." },
    ],
    hypotheses: [{ text: "Die Passage berichtet ausschließlich von der Rückgabe eines Umschlags.", valid: false, kind: "narrow" }, { text: "Die Ich-Erzählung zeigt Unsicherheit gegenüber der eigenen Vergangenheit und ein konkurrierendes Selbstbild.", valid: true, kind: "plausible" }, { text: "Die ausführliche Rechtfertigung kann Misstrauen erzeugen, beweist aber kein Öffnen.", valid: true, kind: "plausible" }, { text: "Der Erzähler hat den Umschlag zweifellos gelesen und belügt Dalia bewusst.", valid: false, kind: "absolute" }, { text: "Dalias Schweigen beweist, dass der Erzähler den Umschlag geöffnet hat.", valid: false, kind: "overreach" }],
    interpretationVariants: [["Der Erzähler stellt seine eigene Vergangenheit nur scheinbar eindeutig dar.", "Sein Erinnerungskommentar relativiert den behaupteten Rückgabewillen.", "Auch die zweistündige Verzögerung widerspricht der klaren Selbstentlastung.", "Die gedehnten Sekunden vor Dalias Blick verstärken das Misstrauen.", "Dennoch beweist kein Beleg, dass er den Umschlag geöffnet hat.", "So konkurrieren Erinnerung, Verhalten und gewünschtes Selbstbild."], ["Nicht eine sichere Schuld, sondern unsichere Selbsterinnerung prägt die Szene.", "Der Ich-Erzähler räumt ein, sich gern auf bestimmte Weise zu erinnern.", "Sein Zögern und das wenig überzeugende Lachen schwächen diese Version.", "Die Zeitdehnung hebt Dalias Reaktion hervor.", "Ihr Schweigen bleibt jedoch offen und darf nicht als Beweis gelten.", "Gerade diese Lücke macht die Vergangenheit für den Erzähler uneindeutig." ]],
  },
  {
    id: "nachtschicht", title: "Die Nachtschicht", sourceType: "self-authored",
    text: `Als Kaja um 03:12 Uhr durch den Seitentrakt ging, brannte hinter der Glastür noch Licht. Eigentlich sollte dort niemand mehr sein. Auf dem Schild stand: AUFNAHMEBEREICH – ZUTRITT NUR MIT FREIGABE.

Durch das Glas erkannte sie Herrn Narvik aus der Verwaltung an einem Tisch. Vor ihm lag eine geöffnete Transportbox. Er hatte am Nachmittag erklärt, die fehlenden Objekte seien wahrscheinlich falsch inventarisiert worden. Jetzt hielt er etwas gegen die Schreibtischlampe.

Kaja trat näher. Nur ein Formularfehler. Bestimmt. Narvik griff nach seinem Telefon. Kaja konnte nicht verstehen, was er sagte. Sie zog ihr Diensthandy heraus. Die Sicherheitsnummer stand ganz oben.

Vor zwei Wochen hatte ihre Kollegin wegen eines falschen Alarms eine schriftliche Abmahnung bekommen. Kaja sah wieder durch die Scheibe. Narvik hatte sich zur Tür gedreht. Für einen Augenblick glaubte sie, er sehe direkt zu ihr. Sie ging einen Schritt zurück. Das Licht im Raum erlosch.`,
    situation: "Kaja beobachtet nachts einen Verwaltungsmitarbeiter in einem zugangsbeschränkten Bereich.", figures: "Kaja und Herr Narvik", change: "Narvik wendet sich zur Tür und anschließend erlischt das Licht.", openInformation: "Was Narvik tut, ob er Kaja sieht und ob sie Alarm auslöst.",
    centralAnalysisAreas: ["perspective", "perception", "space", "conflict"], supportingAnalysisAreas: ["time", "thought"], areaWeights: weights(["perspective", "perception", "space", "conflict"], ["time", "thought"]),
    findings: [
      { text: "Die Wahrnehmung ist eng an Kaja gebunden.", relevance: "central" }, { text: "Die Glastür erlaubt Sicht, aber keinen vollständigen Informationszugang.", relevance: "central" }, { text: "Die Analepse zur Abmahnung erklärt Kajas Zögern.", relevance: "central" }, { text: "Die letzten Augenblicke werden schrittweise erzählt.", relevance: "central" }, { text: "Narvik telefoniert.", relevance: "supporting" }, { text: "Die Sicherheitsnummer steht oben in Kajas Liste.", relevance: "supporting" }, { text: "Narvik sieht Kaja zweifelsfrei.", relevance: "unsupported" }, { text: "Narvik stiehlt die verschwundenen Objekte.", relevance: "unsupported" },
    ],
    evidenceTasks: [
      { claim: "Begrenzte Information", options: ["Kaja konnte nicht verstehen, was er sagte.", "Es war 03:12 Uhr.", "Narvik saß am Tisch."], answer: "Kaja konnte nicht verstehen, was er sagte." },
      { claim: "Selbstberuhigende Figurensicht", options: ["Nur ein Formularfehler. Bestimmt.", "Das Licht brannte.", "Sie zog ihr Handy heraus."], answer: "Nur ein Formularfehler. Bestimmt." },
      { claim: "Institutionell begründetes Zögern", options: ["Die Kollegin hatte wegen eines falschen Alarms eine Abmahnung erhalten.", "Die Box war geöffnet.", "Das Licht erlosch."], answer: "Die Kollegin hatte wegen eines falschen Alarms eine Abmahnung erhalten." },
    ],
    chains: [
      { observation: "Kaja sieht Narvik, hört sein Gespräch aber nicht.", evidence: "Glastür und unverständliches Telefongespräch", analysis: "räumlich und perspektivisch begrenzte Informationslage", effect: "Unsicherheit", interpretation: "Ihre Entscheidung muss auf unvollständigen Informationen beruhen." },
      { observation: "Kaja erinnert sich an die Abmahnung.", evidence: "Vor zwei Wochen wurde die Kollegin sanktioniert.", analysis: "Analepse", effect: "Frühere institutionelle Erfahrung wirkt in die Gegenwart.", interpretation: "Ihr Zögern erhält eine nachvollziehbare Vorgeschichte." },
      { observation: "Die letzten Augenblicke werden schrittweise erzählt.", evidence: "Blick, Drehung, Schritt und Erlöschen folgen einzeln.", analysis: "Zeitdehnung", effect: "Die mögliche Entscheidung wird hervorgehoben.", interpretation: "Der ungelöste Konflikt bildet das Zentrum." },
    ],
    hypotheses: [{ text: "Die Passage zeigt ausschließlich eine nächtliche Beobachtung.", valid: false, kind: "narrow" }, { text: "Begrenzte Information und institutionelle Erfahrung erzeugen einen Konflikt zwischen Sicherheitsverantwortung und Angst vor einer falschen Reaktion.", valid: true, kind: "plausible" }, { text: "Die Glastür verstärkt als konkrete Grenze Kajas unvollständigen Zugang zur Situation.", valid: true, kind: "plausible" }, { text: "Kaja wird nach dem Erlöschen des Lichts sicher Alarm auslösen.", valid: false, kind: "absolute" }, { text: "Narvik stiehlt die verschwundenen Objekte.", valid: false, kind: "overreach" }],
    interpretationVariants: [["Kajas Entscheidung beruht auf einer konsequent begrenzten Informationslage.", "Durch die Glastür sieht sie Narvik, versteht sein Gespräch aber nicht.", "Die räumliche Grenze erzeugt deshalb Unsicherheit statt Gewissheit.", "Zudem erinnert die Analepse an die Sanktion nach einem Fehlalarm.", "Diese Erfahrung erklärt ihr Zögern vor dem Anruf.", "So kollidieren Sicherheitsverantwortung und Angst vor einer falschen Reaktion."], ["Die Szene macht institutionell geprägte Wahrnehmungsunsicherheit sichtbar.", "Kaja deutet auffällige Beobachtungen, kann sie jedoch nicht überprüfen.", "Glas und Zugangssperre begrenzen ihren Informationsstand.", "Der Rückblick auf die Kollegin hemmt zugleich ihre Handlungsbereitschaft.", "Die gedehnten letzten Augenblicke verschärfen den offenen Konflikt.", "Ob Narvik tatsächlich etwas Verbotenes tut, bleibt bewusst ungeklärt."]],
  },
] as const;

export function selectFinalCase(cursor: number, previousId?: string): FinalCase { const available = previousId ? finalCases.filter((item) => item.id !== previousId) : finalCases; return available[((cursor % available.length) + available.length) % available.length]; }
export function isFinalWeightAccepted(ideal: FinalAreaWeight["weight"], chosen: FinalAreaWeight["weight"]): boolean { return ideal === chosen || ideal === "central" && chosen === "supporting" || ideal === "supporting" && chosen === "central" || ideal === "minor" && chosen === "supporting"; }
export function finalEvidenceQuality(task: FinalEvidenceTask, chosen: string): "direct" | "partial" | "thematic" { if (chosen === task.answer) return "direct"; return task.options.indexOf(chosen) === 1 ? "partial" : "thematic"; }
export function isFinalHypothesisJudgedCorrect(hypothesis: FinalHypothesis, chosen: boolean): boolean { return hypothesis.valid === chosen; }
export function isFinalCaseComplete(answers: Record<string, unknown>): boolean { return ["situation", "figures", "change", "open", "weights", "findings", "evidence", "chains", "hypotheses", "interpretation", "quality"].every((id) => Boolean(answers[id])); }
