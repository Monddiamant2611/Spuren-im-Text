# Lyrikwerkstatt – Audit von Üben, Challenge und Antwortdesign

Stand: 14. September 2026

## Ergebnis

Die kapitelgebundene Auswahl arbeitet mit verbindlichen Skill-Allow-Lists. Jedes Kapitel liefert genau sechs Übungsaufgaben und drei disjunkte Challenge-Aufgaben. Der zentrale Phasencontroller beendet Üben nach 6/6 und Challenge nach 3/3, speichert beide Abschlüsse und öffnet die Folgephase. Der Produktions-Browserlauf ist für alle neun Kapitel und alle zehn Trainingsbereiche erfolgreich.

## Messwerte

| Prüfung | Vorher | Nachher |
|---|---:|---:|
| beobachtete Skill-Mismatches | vorhanden, historisch nicht vollständig quantifiziert | 0/81 gerenderte Üben-/Challenge-Aufgaben |
| universelle Standarddistraktor-Vorlagen im aktiven Generator | 7 | 0 |
| geschlossene Aufgaben im Verteilungsaudit | – | 150 |
| richtige Position 1/2/3/4 | stark auf Position 1 geprägt | 39 / 39 / 36 / 36 |
| größte Positionsquote | – | 26,0 % |
| gleiche richtige Position unmittelbar hintereinander | – | maximal 1 |
| `correctIsLongestRate` | 73,3 % in der ersten Messung | 0,0 % |
| mittlere Längendifferenz richtig minus falsche Optionen | – | −42,46 Zeichen |

Die Optionsreihenfolge wird vor dem Rendern deterministisch aus der Task-ID gemischt. Stabile Options-IDs erhalten die Lösungszuordnung unabhängig von der sichtbaren Position. Falls die korrekte Antwort allein die längste wäre, wird ein bereits vorhandener, textspezifischer Distraktor zu einer vergleichbar vollständigen Analyseaussage ergänzt.

## Kompetenzabdeckung

- Kapitel 3: Verse, Strophen, Reimschema/Reimwörter, Enjambement und formale Relevanz beziehungsweise Abweichung.
- Kapitel 5: Thema/Ausgangspunkt, Sinnabschnitte, Wendung, Stillstand beziehungsweise Entwicklung und Anfang–Ende-Bezug.
- Kapitel 6: Wortakzent, Versfuß, Hebigkeit, Grundmetrum, Kadenz und metrische Abweichung. Die sechs Aufgaben verteilen sich auf Jambus (2), Trochäus (3) und Daktylus (1), statt eine reine Jambus-Wortserie zu bilden. Verwendet werden ausschließlich vorhandene verifizierte Metrikdaten.
- Kapitel 7: Wortwahl, Wortfeld, Bildsprache beziehungsweise Syntax, Stilmittelerkennung und kontextbezogene Funktion.

Die Kapitel-6-Challenge nutzt drei andere IDs als Üben: zwei vollständige verifizierte Verse und eine redaktionell geprüfte Kadenzanalyse. In allen neun Kapiteln sind Üben- und Challenge-IDs disjunkt.

## Browsernachweis

Produktions-Build unter `http://127.0.0.1:4173`:

- Kapitel 1–9: jeweils genau 6 Übungsaufgaben – PASS
- nach Aufgabe 6: `Üben abschließen`, kein Wrap-around – PASS 9/9
- `✓ Üben`, Challenge geöffnet – PASS 9/9
- Kapitel 1–9: jeweils genau 3 Challenge-Aufgaben – PASS
- nach Aufgabe 3: `Challenge abschließen`, kein Wrap-around – PASS 9/9
- `✓ Challenge`, Transfer geöffnet – PASS 9/9
- Üben- und Challenge-Abschluss nach Reload erhalten – PASS 9/9
- Training: 200/200 Aufgaben interaktiv bearbeitet – PASS
- unmittelbare Task-ID-Wiederholungen – 0
- unmittelbare identische Textquelle – 1 im Sprechertraining bei zwei unterschiedlichen Aufgaben; keine Task-ID-Wiederholung
- Interaktionsfehler – 0
- Browser-Konsolenfehler – 0
- Request-Fehler – 0

Der maschinenlesbare Nachweis liegt in `artifacts/lyrik-student-browser-audit.json`.

## Technische Prüfungen

- Typecheck: PASS
- Lint: PASS
- Tests: PASS – 73 Dateien / 515 Tests
- Production Build: PASS
- Release-Leak-Test: PASS
  - unresolved: 0
  - rightsBlocked: 0
  - blockedTask: 0
  - userText: 0
  - Source-/Evidence-/Solution-/Feedback-Mismatches: jeweils 0

Nicht verändert wurden Release-Policy, `canonicalText`/`userText`, Corpus-Gates, Primärtexte, Source-Bundles und UI-Struktur.
