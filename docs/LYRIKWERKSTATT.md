# Lyrikwerkstatt – Daten- und Coverage-Architektur

Die Route `/lyrik` behält die vorhandene React-/TypeScript-Oberfläche und die gemeinsamen `AppShell`-, `Card`-, `Button`- und `Modal`-Bausteine. Fachinhalte sind nun in `data/knowledge`, `data/exercises` und `data/texts` gegliedert. Metrum, Kadenz und Coverage besitzen eigene Module.

## Kognitive Progression

Alle 1.070 produktiven Aufgaben tragen eine auswertbare Denkoperation. Die Levelpools sind strikt getrennt: Level 1 trainiert Erkennen, Beschreiben und einfache Belegwahl; Level 2 Vergleich, Analyse, Funktion, Beleg, Vernetzung und Bewertung; Level 3 enthält keine isolierte Erkennungsaufgabe mehr. Offene Analysen werden durch Kriteriencheck und mögliche Musteranalyse begleitet, nicht durch exakten Stringvergleich.

Die Meisterrunde umfasst zwölf Aufgaben, drei zusammenhängende Texte und die Phasen Beobachten → Analysieren → Belegen → Verknüpfen → Deuten → Transfer. Die 15 Transferfälle besitzen jeweils fünf aufeinander bezogene Schritte und unterschiedliche fachliche Schwerpunkte. Die menschliche Stichprobe steht in `docs/LYRIK_DIDAKTIK_REVIEW.md`, der maschinenlesbare Bericht in `src/games/lyrik/data/didactic-quality.ts`.

## Bestand

- 1.070 Aufgabenobjekte
- Analysebereiche: Lyrik erkennen 70, Form 100, Sprechsituation 100, innere Bewegung 90, Metrum/Rhythmus/Kadenz 55, Sprache 300, Stimmung/Haltung 100, Verknüpfen 90, Interpretation 90
- Level und Mechaniken werden aus dem aktuellen Aufgabenregister in `coverage.ts` gezählt; die Tests sichern alle drei Level und sämtliche vorgesehenen Mechaniken ab.
- 52 vollständige Stilmittelkarten mit 100 akzeptierten Beispielen: je 3 für 24 Kernbegriffe und je 1 für 28 spezialisierte Begriffe; 532 frühere Pseudovarianten sowie 4 neue Kandidaten verworfen
- 43 akzeptierte Metrikdatensätze: 35 Wortakzente und 8 vollständige Verse; 197 alte Einträge verworfen
- 12 akzeptierte Kadenzdatensätze an vollständigen Versen: je 4 männlich, weiblich und reich; 68 alte Einträge verworfen
- 50 selbst verfasste, als `exerciseText` gekennzeichnete Mini-Texte
- 15 Transferfälle mit insgesamt 75 Schritten

`coverage.ts` erstellt den Coverage-Bericht; `meter-quality.ts` dokumentiert den zurückgesetzten Metrum- und Kadenzbestand maschinenlesbar. Tests lassen nicht akzeptierte Produktionsdaten sowie unterschrittene Domain-, Stilmittel-, Text- oder Transfermengen fehlschlagen. Stilmittel werden sowohl als richtige Lösung als auch als Distraktor geführt. Die Engine hält korrekte Antworten beim Kürzen auf 4/6/8 Optionen im Satz und kann kürzlich verwendete IDs über vier Runden ausschließen.

Interpretative Freitexte werden weiterhin nicht scheingenau automatisch bewertet, sondern über Kriterien und Musteranalyse reflektiert. Sämtliche Texte sind Übungstexte; es werden keine fingierten Originalzitate oder Autorennamen verwendet.
