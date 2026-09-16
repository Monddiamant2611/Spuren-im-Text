# Lyrikwerkstatt – Audit zu Antwortpositionen und Antwortdesign

Stand: 14. September 2026

## Gesamtergebnis

Alle produktiven geschlossenen Aufgaben werden über stabile Options-IDs ausgewertet. Die sichtbare Reihenfolge hängt von Session-Seed, Task-ID und Position in der Aufgabenserie ab. Chronologische Sortierungen und feste Zuordnungsgruppen bleiben von der Mischung ausgeschlossen.

## Vollständiger Datenaudit

| Kennzahl | Ergebnis |
|---|---:|
| produktive geschlossene Tasks | 801 |
| Single-Choice-Tasks | 778 |
| auswertbare Vierer-Sets | 322 |
| richtige Position 1 / 2 / 3 / 4 | 81 / 81 / 80 / 80 |
| `correctIsLongestRate` | 33,68 % |
| `correctIsShortestRate` | 9,38 % |
| `correctNearMedianLengthRate` | 35,73 % |
| durchschnittliche Länge richtiger Antworten | 136,29 Zeichen |
| durchschnittliche Länge falscher Antworten | 134,65 Zeichen |
| maximale Serie derselben richtigen Position | 2 |
| Tasks mit redaktioneller Längen-/Dichtewarnung | 154 |
| Tasks mit Signalwort-Bias | 0 |
| Tasks mit universellem Fülldistraktor | 0 |

Die richtige Antwort ist weder systematisch die längste noch systematisch die kürzeste. Der Unterschied der durchschnittlichen Antwortlängen beträgt 1,64 Zeichen.

## Stabile Lösungszuordnung

- Jede Option besitzt eine von der sichtbaren Position unabhängige ID aus Task-ID und ursprünglichem Optionsindex.
- Richtige Antworten werden ausschließlich über diese IDs geprüft, nicht über sichtbaren Text oder Position.
- Single- und Multiple-Choice behalten nach dem Shuffle exakt ihre richtigen Options-IDs.
- Ein neuer Session-Seed kann eine andere Reihenfolge erzeugen; innerhalb einer Session bleibt dieselbe Aufgabe stabil.
- In Blöcken gleich großer Antwortsets werden Positionen permutiert. Dadurch bleibt die Verteilung ausgeglichen und eine Serie gleicher Positionen endet spätestens nach zwei Aufgaben.

## Distraktoren und sprachliche Dichte

Die sechs verbotenen universellen Standarddistraktoren kommen in keiner produktiven Option vor. Der Audit prüft zusätzlich Signalwörter wie `immer`, `nie`, `automatisch`, `ausschließlich`, `angeblich`, `beweist` und `zwingend`. Es wurde keine Aufgabe gefunden, bei der diese Wörter systematisch nur die falschen Antworten markieren.

Die 154 redaktionellen Warnungen sind keine automatischen Fehlerurteile. Sie markieren vor allem große Längenspannen sowie auffällige Unterschiede bei Fachbegriffen, Nebensätzen oder erklärenden Konnektoren. Beispiele aus der Warnliste sind `lyric-002`, `lyric-005`, `form-005` und `form-006`. Sämtliche Detailzeilen mit Task-ID, Kapitel, Skill, Positionen, Zeichen- und Wortlängen sowie Flags stehen in `artifacts/lyrik-answer-bias-audit.json`.

## Kapitelbezogene Ergebnisse

| Kapitel | Geschlossene Tasks im Gesamtaudit | Dichtewarnungen | Signalwort-Bias | universelle Distraktoren |
|---:|---:|---:|---:|---:|
| 3 – Form und Aufbau | 92 | 20 | 0 | 0 |
| 5 – Inhalt und innere Bewegung | 88 | 18 | 0 | 0 |
| 6 – Metrum, Rhythmus und Kadenz | 55 | 0 | 0 | 0 |
| 7 – Sprache und sprachliche Gestaltung | 206 | 23 | 0 | 0 |

Formaufgaben verwenden formale Alternativen; Bewegungsaufgaben unterscheiden Verlauf, Stillstand, Wendung und Rückkehr; Metrikaufgaben verwenden gleichrangige Versfuß-, Hebigkeits- und Kadenzkategorien; Stilmittelaufgaben verwenden benachbarte sprachliche Figuren.

## Produktions-Browserrotation

Der Produktionslauf protokollierte:

- Kapitel 3: 6 Üben + 3 Challenge – PASS
- Kapitel 5: 6 Üben + 3 Challenge – PASS
- Kapitel 6: 6 Üben + 3 Challenge – PASS
- Kapitel 7: 6 Üben + 3 Challenge – PASS
- alle Kapitel: 9/9 vollständig – PASS
- Training: 200/200 Interaktionen; gefordert waren mindestens 120 – PASS
- sichtbare geschlossene Browseraufgaben mit protokollierter Reihenfolge und Länge: 254
- davon Training: 178
- Interaktionsfehler: 0
- Konsolenfehler: 0
- Request-Fehler: 0
- unmittelbare Task-ID-Wiederholungen: 0

Das Browserartefakt `artifacts/lyrik-student-browser-audit.json` enthält für jede sichtbare geschlossene Aufgabe Task-ID, Kapitel beziehungsweise Training, Skill, Options-IDs in sichtbarer Reihenfolge, richtige Positionen sowie Zeichen- und Wortlängen.

## Automatische Tests

- `solutionByIdSurvivesShuffle`: PASS
- `noSystematicFirstOptionBias`: PASS
- `noLongCorrectPositionRun`: PASS
- `noSystematicLengthBias`: PASS
- `noUniversalSignalWordDistractors`: PASS
- `noImmediateIdenticalOptionOrderForRepeatedTaskAcrossNewSession`: PASS

## Release-Prüfungen

- Typecheck: PASS
- Lint: PASS
- Tests: PASS – 76 Dateien / 525 Tests
- Production Build: PASS
- Release-Leaks: 0
- Source-, Evidence-, Solution- und Feedback-Mismatches: jeweils 0

Nicht verändert wurden UI-Struktur, `releasePolicy`, Corpus-Gates, `canonicalText`/`userText`, Kapitel-Skill-Allow-Lists und Primärtextquellen.
