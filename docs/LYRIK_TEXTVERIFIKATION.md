# Textverifikation und Freigabestand

Stand: 12. September 2026. Die 47 Einträge bleiben Nutzerfassungen, bis eine editionsbezogene Kollation abgeschlossen ist. `source-located` ist ausdrücklich keine Textfreigabe. Alle Gates arbeiten fail-closed.

## Bilanz

- Verifizierte Texte: 3 (`Die Stadt`, `Der Panther`, `Verfall`)
- Ungeklärte Texte: 42
- Rechtegesperrte Übersetzungen: 2 (Khalil Gibran)
- Verifizierte Strophenstrukturen: 5 (Werke 1, 5, 42, 43 und 47; bei 1 und 5 bleibt die Textvariante offen)
- Verifizierte Reimschemata: 3 (`Die Stadt`: `abba abba ccc ddd`; `Der Panther`: `abab cdcd efef`; `Verfall`: `abba cddc efefef`)
- Verifizierte Formangaben: 3 (`Die Stadt`: Sonett; `Der Panther`: Dinggedicht; `Verfall`: Sonett)
- Verifizierte Metrikangaben: 0
- Öffentlich freigegeben: 3

## Verifikationsphase 1

Geprüft wurden ausschließlich die 14 priorisierten Werke (Nummern 5, 14, 15, 34–37 und 39–45). Vollständig verified wurden `Die Stadt` und `Der Panther`. Die übrigen zwölf bleiben unresolved oder variant-unresolved: Eine lokalisierte Quelle genügt ohne vollständige Kollation und Editionsentscheidung nicht zur Freigabe. Metrum und Kadenz wurden für kein zusätzliches Werk behauptet.

Die werkbezogenen Aufgaben zu `Die Stadt` und `Der Panther` wurden nach Gate-Prüfung wieder freigegeben, soweit ihr Schwerpunkt inhaltlich beziehungsweise durch die verifizierten Formdaten gedeckt ist. Aufgaben der zwölf offenen Werke bleiben blockiert. Es wurden keine Aufgabeninhalte aufgrund von Sekundäranalysen verändert.

## Verifikationsphase 2: Editionsfestlegung

Jeder CorpusEntry besitzt nun eine explizite `baseEdition` und `editionPolicy`. `Willkommen und Abschied` ist als `user-requested-version` mit dem Versionslabel „spätere Fassung“ markiert; die frühe Iris-Fassung wird nicht an ihre Stelle gesetzt. Bei der Lorelei sind `canonicalDisplayTitle`, `baseEditionTitle` und `knownTitleVariants` getrennt.

Die zwölf erneut geprüften Werke wurden nicht allein wegen abweichender Orthografie blockiert. Eine Freigabe erfolgte dennoch nur bei vollständig kollationierbarer Basisfassung. In dieser Arbeitsstufe wurde kein weiteres Werk freigegeben: Die bereits dokumentierten historischen Quellen sind zwar als mögliche Basis festgelegt, aber die Produktionsfassungen der offenen Werke entsprechen ihnen noch nicht durchgehend exakt. Insbesondere bleiben `nur/nun` bei den Webern und die konkrete publizierte Grundlage der beiden offenen Rilke-Texte entscheidungsbedürftig. Der Stand bleibt daher 3 verified, 42 unresolved und 2 rights-blocked; 3 Werkaufgaben sind produktiv, 42 blockiert.

## Referenzeintrag

`Verfall` ist gegen Georg Trakls *Gedichte*, Kurt Wolff Verlag, Leipzig 1913, S. 51 abgeglichen. Text, 14 Verse, vier Strophen (4/4/3/3), Sonettform und Reimschema sind verifiziert. Eine metrische oder kadenzielle Behauptung wird nicht ergänzt.

## Quellen je Werk

Jeder CorpusEntry besitzt ein vollständiges `sourceVerification`-Objekt. Noch nicht geprüfte Werke tragen dort `unresolved` und leere Quellenfelder statt einer erfundenen Editionssicherheit. Priorisierte, bereits lokalisierte Quellen:

| Werk | Status | Editionsgrundlage |
|---|---|---|
| Rilke: Liebes-Lied | variant-unresolved | *Neue Gedichte*, Insel 1907, S. 51; Wikisource mit Digitalisat |
| Goethe: Nähe des Geliebten | variant-unresolved | Ausgabe letzter Hand, Cotta 1827; Wikisource mit Digitalisat |
| Goethe: Der Zauberlehrling | source-located | Ausgabe letzter Hand, Bd. 1, 1827, S. 217–220 |
| Goethe: Erlkönig | source-located | *Gedichte*, Cotta 1815 |
| Rilke: Der Panther | source-located | *Neue Gedichte*, Insel 1907, S. 37 |
| Trakl: Verfall | verified | *Gedichte*, Kurt Wolff 1913, S. 51 |

Die übrigen 41 Werke bleiben `unresolved`; die konkrete Quellenprüfung ist pro Eintrag sichtbar ausstehend.

## Varianten

- Rilke, `Liebes-Lied`, Vers 12: Nutzerfassung „Geiger“, belegte Erstausgabe „Spieler“. Zusätzlich abweichende Interpunktion in Vers 5 und 7. Entscheidung: offen; keine Korrektur am Nutzertext.
- Goethe, `Nähe des Geliebten`, Verse 2, 10 und 15: „malt/Hain/seist“ gegenüber „mahlt/Haine/seyst“ in der Ausgabe letzter Hand. Entscheidung: offen; keine Modernisierung.

## Gates und Aufgaben

`previewAllowed` ist für die lokale redaktionelle Sichtung gesetzt. `contentTaskAllowed`, `formalTaskAllowed` und `publicReleaseAllowed` sind für `Die Stadt`, `Der Panther` und `Verfall` gesetzt. Alle 45 werkbezogenen Korpusaufgaben bleiben im Datenbestand: 42 sind blockiert, drei bleiben produktiv. Noch nicht eindeutig einem verifizierten CorpusEntry zugeordnete authentische Gemeinsam- und Vergleichsaufgaben sind ebenfalls fail-closed blockiert. `isEligibleForTraining` schließt `blockedPendingVerification` aus. Formaufgaben verlangen das formale Gate; alle übrigen textabhängigen Aufgaben verlangen das Inhaltsgate. Selbst verfasste Übungstexte sind davon unberührt.

Die Korrektur „Sehn-sucht“ (zwei Silben, Wortakzent `X x`) bleibt bestehen; daraus wird kein Versmetrum abgeleitet.

## KOLLATIONSPHASE 3

`userText` und `canonicalText` sind getrennt; ebenso `userStanzas` und `canonicalStanzas`. Die produktive Textreferenz eines kollatierten Werks entspricht `canonicalText`. `collationStatus` unterscheidet `notStarted`, `collated` und `unresolved`.

Neu vollständig kollatiert wurden `Mondnacht` (Ausgabe 1864), `Die schlesischen Weber` (revidierter Druck 1847) und `Der Gott der Stadt` (Erstausgabe 1911). Die ursprünglichen Nutzerfassungen bleiben unverändert. Historische Orthografie und die relevante Weber-Lesart `nur` stehen in den kanonischen Fassungen und sind als Varianten gegenüber `userText` dokumentiert.

Gesamtstand: 3 verified vorher, 6 verified danach, 39 unresolved und 2 rights-blocked. Sechs werkbezogene Korpusaufgaben sind produktiv, 39 bleiben blockiert. Verifizierte Werkabdeckung: Kapitel 1 (`Mondnacht`), Kapitel 2 (`Der Panther`), Kapitel 3 (`Die Stadt`), Kapitel 4 (`Die schlesischen Weber`), Kapitel 7 (`Der Gott der Stadt`) und Kapitel 9 (`Verfall`). Kapitel 5, 6 und 8 bleiben ohne freigegebenen werkbezogenen Korpuseintrag. Keine Aufgabe wurde neu erzeugt oder dupliziert.
