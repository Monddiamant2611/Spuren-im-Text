# Lyrikwerkstatt – Task-Source-Audit

Stand: 14. September 2026 · Student Release

## Ergebnis

Die Release-Policy arbeitet jetzt als Filter. Sie ersetzt weder `workId` noch Text, Versbereich oder Ausschnitt eines bestehenden Aufgabenpakets. Ein nicht freigegebenes Paket wird vollständig ausgeschlossen.

Geprüft wurden 86 literarische Task-Datensätze im zentralen Aufgabenpool sowie alle 38 redaktionellen „Gemeinsam“-Schritte. Im Aufgabenpool besitzen 41 Datensätze ein intern konsistentes Source-Bundle, 40 Datensätze sind wegen fehlender freigegebener kanonischer Grundlage `invalidSourceMismatch`, fünf echte Vergleichsaufgaben bleiben `pendingEditorialReview`. Alle 45 nicht freigabefähigen Datensätze sind im Student Mode blockiert. Von den 41 source-validen Pool-Datensätzen bleiben 35 aus der Guided-Ableitung weiterhin für das Training gesperrt; produktiv erreichbar sind dort nur die sechs bereits freigegebenen Korpusaufgaben.

Bei „Gemeinsam“ sind 37 von 38 Schritten produktiv. Schritt `1-3` bleibt unverändert an sein ursprüngliches, noch nicht freigegebenes Werk gebunden und wird deshalb gefiltert. Es findet kein Texttausch statt.

## Ursache

`studentGuidedChapters` setzte früher für jedes Kapitel ein vorgegebenes Ersatzgedicht in sämtliche Schritte ein. Prompt, Optionen, Lösung und Feedback blieben unverändert. Dadurch entstand beispielsweise die Kombination „Der Gott der Stadt“ mit Panther-Auftrag und Panther-Optionen. Derselbe Mechanismus verursachte die weiteren beobachteten Mismatches.

## Unveränderliches Source-Bundle

Single-Source-Aufgaben führen jetzt `source.workId`, `versionId`, `verseStart`, `verseEnd` und `canonicalExcerpt`. Literarische Antwortoptionen werden zusätzlich als `textEvidence` oder `analysisStatement` typisiert. Echte Vergleiche verwenden ausschließlich das explizite Feld `sourceWorkIds`. `taskValidationStatus` kennt `valid`, `invalidSourceMismatch` und `pendingEditorialReview`; nur `valid` kann den Student-Filter passieren.

## Verbleibende valide literarische Pakete je Kapitel

| Kapitel | Gemeinsam | freigegebene Korpusaufgaben | Summe |
|---:|---:|---:|---:|
| 1 | 3 | 1 | 4 |
| 2 | 4 | 1 | 5 |
| 3 | 4 | 1 | 5 |
| 4 | 4 | 1 | 5 |
| 5 | 4 | 0 | 4 |
| 6 | 4 | 0 | 4 |
| 7 | 4 | 1 | 5 |
| 8 | 4 | 0 | 4 |
| 9 | 6 | 1 | 7 |

## Verbleibende valide literarische Pakete je Training

| Training | Literarische Pakete |
|---|---:|
| Lyrik erkennen | 1 |
| Beobachten und belegen | 1 |
| Form und Aufbau | 1 |
| Sprechsituation und lyrisches Ich | 1 |
| Inhalt und innere Bewegung | 0 |
| Metrum, Rhythmus und Kadenz | 0 |
| Sprache und sprachliche Gestaltung | 1 |
| Stimmung, Haltung und Perspektive | 0 |
| Analyseergebnisse verknüpfen und deuten | 1 |
| Gemischtes Training | 6 |

In Bereichen ohne literarisches Paket bleiben nur die bereits vorhandenen redaktionellen `exerciseText`-Aufgaben erreichbar. Es wurden keine Ersatzgedichte und keine neuen Massentasks erzeugt.

## Prüfmatrix

Der automatisierte Audit erzeugt für jede im Browser angetroffene literarische Aufgabe einen Datensatz mit `taskId`, `chapter`, `phase`, `training`, `sourceWorkId`, `renderedWorkId`, `sourceMatch`, `promptMatch`, `evidenceMatch`, `solutionMatch`, `feedbackMatch` und `status`. Die vollständigen Laufdaten stehen in `artifacts/lyrik-student-browser-audit.json`.

| Prüfung | Sollwert |
|---|---:|
| sourceMismatchCount | 0 |
| evidenceMismatchCount | 0 |
| solutionMismatchCount | 0 |
| feedbackMismatchCount | 0 |
| unresolvedLeaks | 0 |
| rightsBlockedLeaks | 0 |
| blockedTaskLeaks | 0 |
| userTextLeaks | 0 |

## Redaktionelle Prüfliste

Für jedes als `valid` markierte literarische Paket wurden Aufgabenstellung, richtige Lösung beziehungsweise Musterlösung und Feedback gegen dasselbe `canonicalExcerpt` geprüft. Direktzitate und als `textEvidence` markierte Optionen müssen im Ausschnitt vorkommen. Werk-, Autoren- und Titelverweise dürfen keinem fremden `workId` zugeordnet sein. Form-, Reim- und Stilmittelbehauptungen bleiben zusätzlich von den bestehenden fachlichen Freigaben abhängig.

## Geänderte beziehungsweise blockierte Bestände

- Repariert wurde der zentrale Release-Pfad: keine Source-Mutation mehr.
- 41 vorhandene literarische Pool-Datensätze erhielten beziehungsweise bestätigten ein festes Source-Bundle; ihre Inhalte wurden nicht auf andere Werke umgeschrieben.
- 40 nicht kanonisch freigabefähige Single-Source-Datensätze und fünf Vergleichsaufgaben sind fail-closed blockiert.
- Von 38 Guided-Schritten verbleiben 37; der ungeprüfte Schritt `1-3` ist blockiert.
- Die sechs freigegebenen Werkpakete bleiben werkrein: Mondnacht, Verfall, Der Panther, Die Stadt, Der Gott der Stadt und Die schlesischen Weber.

## Technischer Abschlussnachweis

- Browser-Audit: 9/9 Kapitel und 200/200 Trainingsinteraktionen; 300 browserseitig angetroffene Task-Instanzen mit vollständigem Auditdatensatz (100 Kapitel, 200 Training).
- `sourceMismatchCount`: 0
- `evidenceMismatchCount`: 0
- `solutionMismatchCount`: 0
- `feedbackMismatchCount`: 0
- Release-Leaks: 0 unresolved, 0 rights-blocked, 0 blocked tasks, 0 userText.
- Browserfehler: 0 Interaktionsfehler, 0 Konsolenfehler, 0 Request-Fehler.
- Typecheck: PASS
- Lint: PASS
- Tests: PASS – 72 Dateien / 512 Tests
- Production Build: PASS
