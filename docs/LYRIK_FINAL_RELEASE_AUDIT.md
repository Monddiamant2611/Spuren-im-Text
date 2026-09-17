# Finale Release-Abnahme der Lyrikwerkstatt

Stand: 17. September 2026 · Student Mode · Production Build · `/lyrik` (auch der Root-Aufruf öffnet die Lyrikwerkstatt).

**Ergebnis: Release-ready für den aktuellen freigegebenen Datenstand.** Der abschließende Browserlauf bearbeitete alle neun Kapitel und 500 Trainingsaufgaben. Die maschinenlesbaren Zahlen stehen in `artifacts/lyrik-final-release-audit.json`; Einzelbelege in `artifacts/lyrik-student-browser-audit.json`, `artifacts/lyrik-release-surfaces.json` und den Screenshots unter `artifacts/lyrik-final-screenshots/`.

## Kapitel und Fortschritt

| Prüfung | Ergebnis |
| --- | ---: |
| Kapitel 1–9 vollständig abgeschlossen | 9/9 PASS |
| Einführung, Wissen, Gemeinsam | je 9/9 ✓ |
| Üben | 9/9 × exakt 6/6, danach „Üben abschließen“ |
| Challenge | 9/9 × exakt 3/3, danach „Challenge abschließen“ |
| Transfer | 9/9 abgeschlossen, kein Wrap-around |
| Kapitelabschluss nach letzter Transferaufgabe | 9/9 |
| Reload: Einführung/Wissen, Üben, Challenge, Transfer | je 9/9 erhalten |
| Reload direkt nach Gemeinsam | Kapitel 6 PASS |
| Zuvor im Kapitel verwendete Transferquelle | 0 |
| Direktes Überspringen zu Transfer | gesperrt; keine falschen Haken |

Einführung und Wissen besitzen nun auch vor Gemeinsam einen gespeicherten Abschlussstatus. Im Negativtest erzeugt der Rückweg von Wissen zu Einführung keinen Wissen-Haken. Ältere gültige v1-Fortschritte und beschädigte/partielle Speicherdaten laden ohne Absturz. Ein Kapitel wird nur nach abgeschlossenem Transfer als abgeschlossen geführt; die nicht freigeschalteten Phasen sind nicht anwählbar.

## Inhalt, Freigabe und Aufgaben

- **Source-Bundles:** 63 authentische Browserprüfungen, 63 kanonische Textprüfungen und 574 Verszeilenprüfungen. Source-, Evidence-, Solution- und Feedback-Mismatches: jeweils **0**. Prompts, Optionen, Lösungen und Rückmeldungen wurden im automatisierten Aufgabenlauf auf ihre sichtbare Textgrundlage geprüft; dies ist keine erneute menschliche Einzelinterpretation jedes Gedichts.
- **Kanonische Texte:** Aktuell sechs Werke im Student Release; historische Schreibung blieb unverändert. Ein konkreter Darstellungsfehler wurde behoben: Leerzeilen der kanonischen Strophengliederung bleiben in Einführung und kanonischen Aufgabenausschnitten erhalten. Weder `canonicalText` noch `userText` wurde geändert.
- **Release-Gates:** `unresolvedLeaks`, `rightsBlockedLeaks`, `blockedTaskLeaks` und `userTextLeaks` jeweils **0**. Die zwei Gibran-Übersetzungen bleiben wegen Übersetzungsrechten gesperrt. Source-/Rechte-/Verifikationsregressionstests bestanden.
- **Skills und Progression:** `skillMismatchCount = 0`; Skill-Pool-, Kapitelprogressions- und Source-Consistency-Tests bestanden. Kapitel 3, 5, 6 und 7 behielten ihre spezifischen Kompetenzfolgen; Üben und Challenge blieben getrennt. Metrikaufgaben nutzen weiterhin geprüfte Register. Die Stilmittelüberlappungen um Personifikation, Anapher, Epipher und Parallelismus bestehen die Regressionstests.
- **Multi-Select:** 6 produktive Browserprüfungen, 0 Fehler. Stabile Option-IDs, Mehrfachauswahl und Auswahlzahl werden zusätzlich in Tests geprüft.
- **Leerer Pool:** Die Auswahl liefert bei vollständiger Sperrung keine Phantom-Aufgabe; die Oberfläche zeigt nun einen verständlichen Hinweis statt einer leeren Fläche. Die aktuellen produktiven Kapitelpools waren im Browser nicht leer. Eine künstlich leer geschaltete Production-Sitzung wurde nicht erzeugt.

## Antwortdesign und Training

819 geschlossene Aufgaben im Answer-Bias-Audit, darunter 337 Aufgaben mit vier Optionen. Die Positionen der richtigen Antwort lagen bei **85 / 84 / 84 / 84**; längste richtige Antwort: **20,68 %**, kürzeste: **8,70 %**, längste Serie derselben richtigen Position: **2**. Generische Distraktoren und Signalwort-Bias: jeweils **0**. 81 einzelne Längenwarnungen bleiben Prüfhinweise, kein nachgewiesener systematischer Bias; der Regressionstest ist grün.

Der Production Browser absolvierte **10 Trainingsbereiche × 50 Aufgaben = 500/500 Interaktionen**. Unmittelbare Task-ID-Wiederholungen: **0**. Gemischtes Training, Optionen, offene Aufgaben, Feedback und Release-Gates funktionierten. Im Metrumtraining waren unter 50 Aufgaben Jambus (**11**), Trochäus (**16**), Daktylus (**8**) und Anapäst (**8**) erreichbar; weitere Aufgaben betrafen andere Metrik-/Kadenzoperationen. In Kapitel 7 bleiben alle **52 Stilmittel** erreichbar; die Gewichtung der **24 zentralen** und **28 weiteren** Figuren besteht den Test.

Drei frische Sessions zeigten verschiedene Optionsreihenfolgen bei stabilen IDs innerhalb der jeweiligen Session. Die richtige Antwort blieb an die Option-ID gebunden; der Answer-Bias-Test blieb grün.

## Oberfläche und Browser

- **Kartei:** alle 10 Kategorien erreichbar; 52 Stilmittel in sechs Untergruppen; Karten umgedreht, keine leeren Rückseiten.
- **Wissensarchiv:** alle 12 Bereiche und 113 Artikel geöffnet; Accordion und Rücknavigation funktionieren, keine leeren Artikel oder HTTP-Fehler.
- **Responsive:** 1440 px, 900 px und 390 px geprüft; mobil zusätzlich Lernpfad, Kartei, Archiv und Training. Ein realer Überlauf im Kapitelbildschirm wurde mit `min-width: 0` am Werkstatt-Container behoben. Keine unbenutzbar abgeschnittenen Aufgaben/Buttons; die mobile Phasenleiste ist bewusst horizontal scrollbar.
- **Tastatur/Basiszugänglichkeit:** Buttons und Optionen fokussierbar; Freitext beschriftet; Kartei- und Archivsuche haben zugängliche Namen. Dies ersetzt kein vollständiges Accessibility-Audit.
- **Visuelle Stichprobe:** Production-Screenshots von Kapitel 1, 3, 5, 6, 7, 9 sowie Kartei, Wissensarchiv und Training geprüft.
- **Konsole/Netzwerk:** 0 Konsolenfehler, 0 Browserwarnungen, 0 Requestfehler, 0 HTTP-Fehler und 0 beobachtete Hydrationfehler.

## Korrekturen dieser Abnahme

1. Die Anzeige kanonischer Ausschnitte bewahrt Strophen-Leerzeilen; Originaltexte und Quellenmetadaten blieben unverändert.
2. Frühe Phasen speichern ihren Status; zukünftige Phasen lassen sich nicht mehr direkt überspringen, und bloßes Zurückgehen erzeugt keinen falschen Haken.
3. Kartei-/Archivsuche wurden zugänglich beschriftet.
4. Der mobile Kapitelüberlauf wurde mit einer einzelnen Containerregel beseitigt.
5. Ein leer gefilterter Aufgabenpool hat einen sicheren, verständlichen Fallback.

Keine neuen Aufgaben, Pools, Taxonomien, Primärtextfassungen oder Release-Regeln wurden eingeführt.

## Technische Abschlussprüfungen

Typecheck **PASS** · Lint **PASS** · vollständige Testsuite **PASS (79 Dateien / 536 Tests)** · Production Build **PASS**. Release Leak, Source Consistency, Skill Pool, Answer Bias, Progression, Visual Acceptance und Language Audit Regression: **PASS**. Der Build meldet nur den bekannten Hinweis auf große JavaScript-Chunks; er ist kein Laufzeit- oder Hydrationfehler.
