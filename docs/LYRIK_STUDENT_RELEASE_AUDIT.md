# Lyrik Student Release Audit

## Release- und Kapitel-6-Nachweis

Der Student-Datenpfad ist fail-closed und verwendet sechs freigegebene Werke: `Mondnacht`, `Die schlesischen Weber`, `Der Gott der Stadt`, `Die Stadt`, `Der Panther` und `Verfall`. Authentische Materialien stammen ausschließlich aus `canonicalText`.

Kapitel 6 enthält keine Metrum-, Hebigkeits- oder Kadenzbehauptung über authentische Verse aus `Der Panther`: Dessen Textfreigabe wird nicht als metrische Freigabe ausgelegt. Produktiv verwendet werden 35 verifizierte Einzelwort-Akzentbeispiele, acht selbst verfasste und redaktionell geprüfte Vollverse sowie zwölf redaktionell geprüfte Kadenz-Vollverse. Die acht Metrum-Vollverse besitzen in `studentMetricAnnotations` jeweils `sourceWorkId`, Versnummer, Text, Silben, Betonungsmuster, Grundmetrum, Hebigkeitszahl, Kadenz, Abweichung und `verificationStatus: "verified"`.

Im Student Release trainierbar sind Wortakzent und Versfuß (Jambus, Trochäus, Daktylus, Anapäst), regelmäßiger jambischer und trochäischer Vollvers, vier- und fünfhebige Übungsverse, männliche, weibliche und reiche Kadenz sowie eine explizit annotierte trochäische Katalexe. Einzelwortbeispiele werden ausdrücklich nicht als Nachweis eines Versmetrums behandelt.

| Kapitel | Einführung | Gemeinsam | Üben | Challenge | Transfer |
|---:|:---:|:---:|:---:|:---:|:---:|
| 1 | PASS | 4/4 | 2/2 | 3/3 | 2/2 |
| 2 | PASS | 4/4 | 2/2 | 3/3 | 2/2 |
| 3 | PASS | 4/4 | 2/2 | 3/3 | 2/2 |
| 4 | PASS | 4/4 | 2/2 | 3/3 | 2/2 |
| 5 | PASS | 4/4 | 2/2 | 3/3 | 2/2 |
| 6 | PASS | 4/4 | 2/2 | 3/3 | 2/2 |
| 7 | PASS | 4/4 | 2/2 | 3/3 | 2/2 |
| 8 | PASS | 4/4 | 2/2 | 3/3 | 2/2 |
| 9 | PASS | 6/6 | 2/2 | 3/3 | 2/2 |

## Production-Browseraudit

Der Detailbericht liegt unter `artifacts/lyrik-student-browser-audit.json`. Chromium bearbeitete gegen den Production Build alle Phasen der neun Kapitel und 20 Aufgaben in jedem der zehn Trainings. Jede Aufgabe wurde beantwortet, geprüft und auf sichtbares Feedback kontrolliert.

| Training | erledigt | eindeutige Aufgaben | eindeutige Werke | sofort Aufgabe/Werk | innerhalb 5 Aufgabe/Werk |
|---|---:|---:|---:|---:|---:|
| Lyrik erkennen | 20/20 | 1 | 1 (`Mondnacht`) | 19/19 | 19/19 |
| Form und Aufbau | 20/20 | 1 | 1 (`Die Stadt`) | 19/19 | 19/19 |
| Sprechsituation und lyrisches Ich | 20/20 | 1 | 1 (`Die schlesischen Weber`) | 19/19 | 19/19 |
| Inhalt und innere Bewegung | 20/20 | 20 | 0 | 0/0 | 0/0 |
| Metrum, Rhythmus und Kadenz | 20/20 | 20 | 0 | 0/0 | 0/0 |
| Sprache und sprachliche Gestaltung | 20/20 | 1 | 1 (`Der Gott der Stadt`) | 19/19 | 19/19 |
| Stimmung, Haltung und Perspektive | 20/20 | 20 | 0 | 0/0 | 0/0 |
| Analyseergebnisse verknüpfen und deuten | 20/20 | 1 | 1 (`Verfall`) | 19/19 | 19/19 |
| Beobachten und belegen | 20/20 | 1 | 1 (`Der Panther`) | 19/19 | 19/19 |
| Gemischtes Training | 20/20 | 7 | 6 (alle Release-Werke) | 0/0 | 0/0 |

Die gemessenen Wiederholungen werden transparent protokolliert; gemäß Auftrag wurde keine Rotationslogik ergänzt. Insgesamt wurden 202 authentische Renderings auf Werkfreigabe und `canonicalText` geprüft. 2.630 gerenderte Verszeilen wurden in ihrer kanonischen Reihenfolge nachgewiesen.

## Finaler Status

- Kapitel: 9/9 vollständig
- Trainingsaufgaben: 200/200 mit sichtbarem Feedback
- Interaktionsfehler: 0
- unresolvedLeaks: 0
- rightsBlockedLeaks: 0
- blockedTaskLeaks: 0
- userTextLeaks / userTextRenderCount: 0
- consoleErrors: 0
- requestErrors: 0
- Typecheck: PASS
- Lint: PASS
- Tests: PASS, 69 Dateien / 501 Tests
- Production Build: PASS
- Browseraudit: PASS
