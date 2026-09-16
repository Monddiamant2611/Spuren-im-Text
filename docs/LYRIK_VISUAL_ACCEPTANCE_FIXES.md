# Lyrikwerkstatt – visuelle Abnahme 3B

Stand: 16.09.2026. Geprüft im Student Mode des Production Builds. Der maschinenlesbare Browsernachweis liegt in `artifacts/lyrik-student-browser-audit.json`.

## Transfer (Befunde 1–5)

Vorher erhöhte der zentrale Kapitel-Handler nach Transferaufgabe 2 den Index und lud wegen Modulo erneut Aufgabe 1. Jetzt wird nach der letzten Aufgabe „Transfer abschließen“ angeboten. Der Klick speichert `completedTransferChapters` und `completedChapters`; der Tab zeigt ✓ Transfer und die Kapitelansicht den Abschluss. Der gespeicherte Abschluss bleibt nach Reload erhalten. Browserprüfung: 9/9 Kapitel, `transferWraparoundCount = 0`.

Die Transferauswahl schließt alle `sourceWorkIds` aus Gemeinsam, Üben und Challenge sowie identische Üben-/Challenge-Texte aus. Sie wählt unveränderte, freigegebene Task-Bundles. Wo keine zwei geeigneten authentischen Bundles vorhanden sind, kommen freigegebene ExerciseText-Bundles zum Einsatz. Ein zuvor bekanntes Werk wird nicht als „unbekannter Text“ ausgegeben. Kapitel 3 verwendet nicht mehr Heyms „Die Stadt“ im Transfer.

| Kapitel | Transfer-Bundles nach Korrektur | Quelle | Abschluss/Reload |
| --- | --- | --- | --- |
| 1 | `lyric-015`, `lyric-021` | ExerciseText, neu | PASS/PASS |
| 2 | `interpretation-015`, `interpretation-021` | ExerciseText, neu | PASS/PASS |
| 3 | `form-003`, `form-009` | ExerciseText, neu | PASS/PASS |
| 4 | `speaker-015`, `speaker-021` | ExerciseText, neu | PASS/PASS |
| 5 | `movement-003`, `movement-009` | ExerciseText, neu | PASS/PASS |
| 6 | `exercise-meter-trochaeus-verse-b`, `exercise-cadence-male-3` | ExerciseText, neu | PASS/PASS |
| 7 | `language-003`, `language-009` | ExerciseText, neu | PASS/PASS |
| 8 | `mood-015`, `mood-021` | ExerciseText, neu | PASS/PASS |
| 9 | `integration-045`, `integration-069` | ExerciseText, neu | PASS/PASS |

Für die einzelnen Zeilen enthält der Browser-Audit `transferSourceAudit` mit `chapter`, `transferTaskId`, `transferSourceWorkId`, `sourcesUsedBeforeTransfer`, `isPreviouslySeen`, `isAuthentic` und `isExerciseText`. Bei ExerciseText ist `transferSourceWorkId` bewusst `null`; zusätzlich wird Textgleichheit im Regressionstest ausgeschlossen. `transferSourcesUnseen` ist für 9/9 Kapitel wahr. Der gezielte Regressionstest vergleicht Guided-/Practice-/Challenge-Quellen und Texte mit den gewählten Transfer-Bundles.

## Mehrfachauswahl (Befunde 6–10)

TaskRenderer und GuidedRenderer zeigen bei Mehrfachaufgaben die verlangte Anzahl und den Live-Zähler „x von y gewählt“. Die Prüftaste ist bis zur vollständigen Auswahl deaktiviert. Nach Prüfung sind richtige Optionen grün und falsch gewählte rot markiert; fehlende richtige Antworten werden bei Übungsaufgaben ausdrücklich genannt. Die Bewertung verwendet weiterhin stabile Options-IDs und funktioniert nach dem bestehenden Shuffle. Single Choice bleibt eine Auswahl. Der Production-Browserlauf enthält 6 gezielte Teil-Auswahl-Prüfungen mit 0 Fehlern; der Regressionstest prüft zusätzlich Reihenfolge und ID-basierte Lösung.

## Fachliche Einzelkorrekturen (Befunde 11–15)

- Kapitel 6, Wortakzent: „Zu welchem Versfuß passt seine Betonung?“ ersetzt die Formulierung, die einem einzelnen Wort ein Versmetrum nahelegte. Das Feedback trennt Wortakzent vom Grundmetrum eines ganzen Verses.
- Kapitel 6, Gemeinsam 4: Die Musterlösung nennt die tatsächlich gezeigten Wörter „Blick“, „Stäbe“ und die unterschiedlichen Versschlüsse „Stäbe“/„hält“. Für Rilkes gezeigte Verse liegt in `studentMetricAnnotations` keine verifizierte Versannotation vor; deshalb werden Grundmetrum und genaue Kadenz ausdrücklich nicht behauptet.

## Sprache, Stilmittel und Distraktoren (Befunde 16–29)

- Kapitel 7, Gemeinsam 1: Der Auftrag fragt nach zwei sprachlichen Signalen. „großen Städte“ ersetzt das isolierte „Städte“ und ist im angezeigten Ausschnitt belegt.
- Kapitel 7, Challenge 1: „Noch wartet das Haus. Noch schweigt die Uhr.“ lässt Anapher und Parallelismus als richtige Antworten zu; das Feedback erklärt beide konkreten Signale.
- Kapitel 7, Challenge 2: Die drei Sätze mit „wir … für morgen“ behalten Anapher, Epipher und Parallelismus als Mehrfachanalyse. Die Frage ist sprachlich vereinfacht.
- „Der Wind flüstert …“ fragt nach der **genaueren** Bezeichnung Personifikation. Metapher wird nicht als unmöglich behauptet oder als falsche Antwort angeboten.
- Die 100 produktiven geschlossenen Stilmittelaufgaben stehen einzeln in `artifacts/lyrik-style-overlap-audit.json` mit Task-ID, Text, Fragefokus, richtigen Figuren, redaktionell erfassten Überlappungen, Auswahlart und Sicherheitsbefund. Ergebnis: 0 laut Metadaten unsicher behandelte Überlappungen. Die 52-Begriffe-Konventionen für Repetitio, Geminatio, Epizeuxis, Synekdoche, Akkumulation und Enumeratio bleiben unverändert.
- Kapitel 3, Gemeinsam 4: Die fachfremde „Biografie des Autors“ und das pauschale „Jeder … wirkt gleich“ sind durch konkrete, aber falsche Form- beziehungsweise Funktionsaussagen ersetzt.

Die bestehenden Üben-/Challenge-Progressionen der Kapitel 3, 5, 6 und 7 blieben bestehen. Es wurden für 3B keine neuen Aufgaben angelegt; geändert wurden Auswahl, Abschluss, Interaktion und die benannten Formulierungen.

## Prüfstand (Befunde 30–40)

| Prüfung | Ergebnis |
| --- | --- |
| Typecheck | PASS |
| Lint | PASS |
| Tests | 78 Dateien / 532 Tests PASS |
| Production Build | PASS |
| Release-Leaks | 0 unresolved, 0 rights-blocked, 0 blocked tasks, 0 userText |
| Source-Consistency | 0 Source-, Evidence-, Solution- und Feedback-Mismatches |
| Skill-Pool | PASS im vollständigen Testlauf |
| Answer-Bias | PASS im vollständigen Testlauf |
| Progression | PASS im vollständigen Testlauf; 6 Üben- und 3 Challenge-Aufgaben je Kapitel |
| Production-Browser | 9/9 Kapitel, 200/200 Training, 0 Interaktions-, Konsolen- und Requestfehler |

Das Browserprotokoll ist die Quelle für die 9/9-Angaben; Unit-Tests allein werden nicht als Browserbeweis gewertet.
