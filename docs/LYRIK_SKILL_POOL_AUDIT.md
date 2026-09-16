# Lyrikwerkstatt – Skill-Pool-Audit

Stand: 14. September 2026

## Ergebnis

Die Üben- und Challenge-Pools verwenden jetzt ausschließlich die verbindliche Skill-Taxonomie des jeweiligen Kapitels. Die Auswahl ist fail-closed: Es gibt keinen globalen oder fachfremden Fallback. Reicht eine Teilkompetenz im vorhandenen Material nicht aus, bleibt sie als Coverage-Lücke dokumentiert.

## Gesamtzahlen

- freigegebene Tasks insgesamt: 1.076
- produktiv und fachlich zulässig: 1.001
- durch bestehende Freigabe- oder Eignungsgates ausgeschlossen: 75
- explizit fachfremde Tasks im produktiven Pool: 0
- Skill-Mismatches vorher: in Kapitel 3, 5 und 7 browserseitig reproduziert; der frühere Stand wurde nicht als vollständiger maschinenlesbarer Zähler konserviert
- Skill-Mismatches nachher: 0
- universelle Standarddistraktoren vorher: 7 wiederverwendete Vorlagen im aktiven Generator
- universelle Standarddistraktoren nachher: 0

## Valide Tasks je Kapitel

| Kapitel | Bereich | Valide Tasks |
|---:|---|---:|
| 1 | Lyrik erkennen | 71 |
| 2 | Beobachten und belegen | 106 |
| 3 | Form und Aufbau | 105 |
| 4 | Sprechsituation und lyrisches Ich | 107 |
| 5 | Inhalt und innere Bewegung | 98 |
| 6 | Metrum, Rhythmus und Kadenz | 55 |
| 7 | Sprache und sprachliche Gestaltung | 319 |
| 8 | Stimmung, Haltung und Perspektive | 112 |
| 9 | Analyse verknüpfen und deuten | 28 |

## Valide Tasks je Datenphase

| Phase | Valide Tasks |
|---|---:|
| discover | 204 |
| understand | 131 |
| remember | 130 |
| apply | 139 |
| connect | 163 |
| transfer | 234 |

Die Kapitelsteuerung ordnet daraus jeweils sechs fachlich zulässige Übungsaufgaben und drei davon verschiedene Challenge-Aufgaben zu. Sind nicht sechs unterschiedliche Zielskills vorhanden, werden weitere Tasks ausschließlich aus demselben Kapitel und dessen Allow-List ergänzt.

## Verbindliche Prüfung

Für jeden produktiven Task werden folgende Beziehungen geprüft:

- `chapter` entspricht dem Aufgabenbereich.
- `skill` steht in der Allow-List dieses Kapitels.
- `trainingTags` enthalten Kapitel und aufgelösten Skill.
- `phase` ist eine gültige Lernphase.
- Üben und Challenge erhalten nur lokale Tasks desselben Kapitels.
- Die sechs verbotenen universellen Fülldistraktoren kommen in keiner freigegebenen Option mehr vor.

Der automatische Nachweis befindet sich in `tests/lyrik-skill-pool-audit.test.ts`.

## Offene Coverage-Lücken im bestehenden Rohpool

Die folgenden Zielskills besitzen noch keine eigenständig klassifizierte Rohpool-Aufgabe. Sie werden nicht durch fachfremde Tasks ersetzt:

- Kapitel 1: `lyricVsProse`, `firstImpression`, `nonMandatoryRhyme`, `nonMandatoryMeter`
- Kapitel 2: `observation`, `finding`
- Kapitel 3: `verse`, `stanza`, `rhyme`, `rhymeScheme`, `enjambment`, `endStoppedLine`, `formalDeviation`
- Kapitel 4: `lyricalI`, `speechSituation`, `speakerRelation`
- Kapitel 5: `senseSection`, `stasis`, `circularity`
- Kapitel 6: `foot`, `meter`, `hebigkeit`, `rhythm`; die kuratierte Kapitel-Auswahl versieht vorhandene verifizierte Metrikaufgaben bereits mit `foot`, `hebigkeit` und `meter`
- Kapitel 7: `wordField`, `connotation`, `sound`
- Kapitel 8: `attitude`, `perspective`, `moodEvidence`, `perspectiveShift`
- Kapitel 9: `formContent`, `speakerLanguage`, `moodPerspective`, `rhythmSyntax`, `beginningEnding`, `evidenceFunctionMeaning`, `interpretiveHypothesis`, `alternativeReading`, `counterEvidence`, `overinterpretation`, `analysisWriting`

Diese Liste ist ausdrücklich ein Coverage-Bericht und kein Auftrag zur Erzeugung neuer Massentasks.

## Unveränderte Bereiche

Nicht verändert wurden UI, `releasePolicy`, `canonicalText`/`userText`, Corpus-Gates, Primärtexte oder Source-Bundles.
