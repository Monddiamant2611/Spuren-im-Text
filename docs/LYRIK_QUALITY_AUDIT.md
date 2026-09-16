# Redaktioneller Qualitätsaudit

## Gesicherter Stand

Alle 50 Übungstexte wurden einzeln neu geschrieben. Der frühere Bestand bestand aus zehn Strophenschablonen mit fünf angehängten Zeitvarianten; diese 40 Pseudovarianten wurden entfernt. Die neue Themenverteilung umfasst 38 ausdrücklich benannte Themen. Romantische Standardmotive dominieren nicht.

Der maschinenlesbare Report in `data/quality.ts` erfasst vollständige Duplikate, starke Promptähnlichkeiten, häufige Satzanfänge, Lösungen und Distraktoren, Motive, Themen, Level, Mechaniken, Analysebereiche, identische Analysehinweise und mögliche Mehrfachlösungen.

## Noch nicht als fachlich abgeschlossen zu bewerten

Der Stilmittelbestand wurde fail closed bereinigt und anschließend kontrolliert erweitert: Zu den 52 Kernbeispielen kamen 48 einzeln annotierte Beispiele für die 24 Kernbegriffe hinzu. Der produktive Bestand umfasst 100 Beispiele; 532 alte Pseudovarianten und vier neue, ungeeignete Kandidaten bleiben ausgeschlossen. Definitionsmerkmale steuern präzise Single-Choice-Fragen; tatsächlich überlappende Figuren werden als Mehrfachauswahl behandelt. Das vollständige Einzelreview steht in `LYRIK_STILMITTEL_REVIEW.md`.

Für Metrum und Kadenz gilt inzwischen ein eigener, enger Freigabeprozess: Der alte Status `verified: true` ist ungültig; nur `verificationStatus: "accepted"` gelangt in die Produktion. Von 240 früheren Metrikeinträgen sind 43, von 80 früheren Kadenzeinträgen 12 redaktionell als eindeutig eingestuft. Details und Ausschlüsse stehen in `LYRIK_METRUM_KADENZ_REVIEW.md`. Diese Einstufung ist keine externe phonetische oder wissenschaftliche Zertifizierung.

Der Audit ist bewusst ehrlich: TypeScript- und Coverage-Tests können Datenform, Mengen und Referenzen prüfen, nicht natürliche Aussprache oder literarische Qualität garantieren.
