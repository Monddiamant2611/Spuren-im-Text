# Lyrikwerkstatt – sprachliche Endredaktion

Stand: 17. September 2026. Gegenstand ist ausschließlich die Sprache der Schüleroberfläche. Primärtexte, kanonische Fassungen, Lösungen, Task-IDs, Skills, Release-Gates, Metrik- und Stilmittelklassifikationen, Progression, Auswahl und Phasenlogik wurden nicht redaktionell verändert.

## Redaktion und Warnliste

1. **Geprüfte Texte:** Der automatische Warnlauf erfasste 10.303 Felder aus freigegebenen Aufgaben, Gemeinsam-Schritten, Wissenskarten und Kapitelzielen. Navigation, Kartei, Wissensarchiv und Training wurden ergänzend im Production Browser geprüft. Die Warnliste steht in `artifacts/lyrik-language-warnings.json`.
2. **Überarbeitete Texte:** Geändert wurden einzelne Schülerformulierungen in `canonicalTasks.ts`, `curriculum.ts`, `exercises/pools.ts`, `game.ts`, `guidedAnalysis.ts`, `knowledge/styleDevices.ts` und `texts/transferCases.ts`. Die Änderungen betreffen Aufträge, Antwortformulierungen, Rückmeldungen, Musterantworten, Karten und Kapitelziele.
3. **Fachbegriffe:** Vers, Strophe, Sonett, Enjambement, Befund, Beleg, Funktion, Deutung, Metrum, Versfuß, Hebung und die Stilmittelnamen bleiben erhalten. Fachliche Unterschiede wurden nicht durch pauschale Ersetzungen eingeebnet.
4. **Satzlänge:** Mehrteilige Aufträge wurden in kurze Handlungen getrennt, z. B. „Nenne eine Beobachtung. Belege sie am Ausschnitt. Erkläre dann, was die Stelle zeigt.“ Lange Sätze über 25 Wörter sanken im Warnlauf von 523 auf 84.
5. **Metasprache:** Die 1.659 anfänglichen Felder mit den gesuchten abstrakten Meta-Ausdrücken sanken auf 0. Das ist ein Suchbefund für die im Audit definierten Ausdrücke, keine Behauptung, jeder Schülertext sei mühelos verständlich.
6. **Arbeitsaufträge:** In Kapitel 3 wird direkt nach Gliederung und Verszahl gefragt, in Kapitel 5 nach Anfang und Verlauf, in Kapitel 6 nach hörbarer Betonung und Hebungen, in Kapitel 7 nach Wörtern und erkennbaren Stilmitteln. Mehrere Schritte stehen als getrennte Sätze.
7. **Feedback:** Überarbeitete Rückmeldungen erklären die Beobachtung oder den nächsten Prüfschritt konkreter. Abstrakte Wendungen wie „Deutungsrichtung“ wurden entfernt; bloßes Richtig/Falsch ist nicht das redaktionelle Ziel.
8. **Modelllösungen:** Betroffene Musterantworten wurden als lesbare Schülerantworten formuliert. Fachliche Aussage, Belegbezug und Lösungskriterien blieben bestehen.
9. **Nominalstil:** Die Heuristik markiert noch 1.599 Felder mit mindestens zwei Wörtern auf `-ung`, `-keit`, `-heit`, `-tion` oder `-isierung`. Darunter sind notwendige Fachwörter wie „Personifikation“, „Beobachtung“ und „Deutung“. Die Liste ist ausdrücklich eine Prüfliste, kein automatischer Fehlerzähler.
10. **Passiv:** 163 Felder enthalten nach der einfachen Suchregel eine mögliche Passivform. Ein Teil steht in Antwortoptionen, deren vergleichbare Länge für die Antwort-Balance wichtig ist. Keine pauschale Umschreibung.
11. **Verbleibende Warnstellen:** 84 Felder mit Sätzen über 25 Wörter und 2 mit mehr als zwei erkannten Nebensatzmarkern; insgesamt 1.665 Warnlisten-Zeilen mit mindestens einem Warnmerkmal (Kategorien überlappen). Unter diesen Zeilen haben 277 eine durchschnittliche Wortlänge über 6,5 Zeichen. Die längeren Stellen liegen überwiegend in vergleichenden Antwortoptionen mit Textzitaten. Zudem bleibt „Meine antworten Dach.“ als mögliche Auffälligkeit in zitiertem Übungstext unangetastet: Primär-/Übungstexte dürfen in dieser Runde nicht still korrigiert werden.
12. **Orthografie:** Der Arbeitsauftrag zu „Der Panther“ lautet nun grammatisch „Untersuche im Gedicht …“ statt „Untersuche in Der Panther …“. Die Orthografie des Gedichts selbst blieb unverändert.

## Sichtprüfung im Production Browser

13. **Kapitelstichprobe:** Kapitel 1, 3, 5, 6, 7 und 9: Einführung, Wissen, Gemeinsam, Üben, Challenge und Transfer wurden auf sichtbare klare Aufträge geprüft (`artifacts/lyrik-language-browser-sample.json`). Der vollständige Browserlauf bearbeitete in allen neun Kapiteln Gemeinsam, sechs Üben-Aufgaben, Challenge und Transfer (`artifacts/lyrik-student-browser-audit.json`). Die gelesenen Stichproben machen die geforderte Handlung beim ersten Lesen erkennbar; Fachbegriffe bleiben sichtbar. Das ist eine redaktionelle Stichprobe, keine individuelle Leseprobe mit Schülerinnen und Schülern.
14. **Kartei:** Vorder- und Rückseite einer Karte im Production Browser geöffnet; verständliche Kurzerklärung sichtbar.
15. **Wissensarchiv:** Index und Detailansicht im Production Browser geöffnet; Abschnittsstruktur und Text sichtbar.
16. **Training:** Einstieg und Aufgabe sichtbar; der vollständige Browserlauf bearbeitete 200/200 Trainingsaufgaben.

## Technische Sicherung

17. **Typecheck:** PASS (`pnpm typecheck`).
18. **Lint:** PASS (`pnpm lint`).
19. **Tests:** PASS, 79 Dateien / 533 Tests (`pnpm test`).
20. **Production Build:** PASS (`pnpm build`).
21. **Release Leak Test:** PASS; `unresolved`, `rightsBlocked`, `blockedTask` und `userText` jeweils 0 im vollständigen Production-Browserlauf.
22. **Source Consistency:** PASS; Source-, Evidence-, Solution- und Feedback-Mismatches jeweils 0. Die einschlägigen Integritätstests sind grün.
23. **Skill Pool:** PASS (`lyrik-skill-pool-audit`, `lyrik-task-quality-system`).
24. **Answer Bias:** PASS (`lyrik-answer-bias`); eine zu starke Kürzung von Distraktoren wurde verworfen, weil sie die Längenbalance verschob.
25. **Progression:** PASS (`lyrik-didactic-quality`, `lyrik-content-coverage`, vollständiger Production-Browserlauf).
26. **Visual Acceptance:** PASS (`lyrik-visual-acceptance` und Production-Browserstichprobe). Browser: 0 Konsolenfehler, 0 Request-Fehler, 0 Interaktionsfehler.

Die Warnliste nimmt keine automatische Textänderung vor. Weitere Einzelfallentscheidungen zu langen Antwortoptionen oder Fachwörtern brauchen eine erneute redaktionelle Prüfung unter Beachtung der Antwort-Balance und der unveränderlichen Textgrundlage.
