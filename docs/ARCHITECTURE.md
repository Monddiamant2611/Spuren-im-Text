# Architektur

## Ausgangslage und Übernahme

Das Repository war leer. Als schlanke Webgrundlage wurde der vorhandene Next-/React-kompatible Sites-Starter verwendet und um nicht benötigte Datenbank- und Demo-Bestandteile reduziert. Es gab keine bestehenden Projektmodule oder Assets zu übernehmen.

## Schichten

- `src/core`: gattungsunabhängiger Zustand, lokale Persistenz, Navigation, Fortschritt, Audio, Content-Typen, Asset-Manifest und Mechanik-Verträge.
- `src/games`: eigenständige Module für Dramatik, Epik und Lyrik. Nur Dramatik besitzt in Phase 0 Kapitelplatzhalter und den gattungsspezifischen `staging_engine`.
- `src/shared`: wiederverwendbare UI- und Designgrundlagen.
- `public/assets`: Laufzeit-Assets, nach `shared`, `dramatik`, `epik` und `lyrik` gegliedert.
- `tests`: fachliche und technische Sicherungstests.

Der Game-State ist versioniert und wird lokal unter `lernwerkstatt-games:state:v1` gespeichert. Es gibt keine Accounts, keinen Server und kein Backend. Fachinhalte werden als Daten geladen und nicht in UI-Komponenten eingebettet.

## Phase-1-Game-Shell

`GameShell` ist der einzige Orchestrator für Startbildschirm, Theaterfläche, Fortschrittsanzeige, Kapitel-, Optionen-, Quellen- und Regiebuchoverlay sowie den Feedbackbereich. Kapitelzugang und Theaterzustand werden durch reine Funktionen im bestehenden Progress-Modul bestimmt. Einstellungen werden im bestehenden Game-State gespeichert; Musik und Soundeffekte steuern den zentralen `AudioManager` getrennt.

Die Theaterdarstellung verwendet ausschließlich CSS-Layer. Da im Repository keine Medien vorhanden waren, wurden weder Bild- noch Audioassets ergänzt. Für Überschriften wird die vorhandene freie Systemkombination Georgia/Times New Roman verwendet, für Fließtext Segoe UI/Arial. Es werden keine Fontdateien geladen oder eingebettet.

## Kapitel 1

Kapitel 1 wird von `Chapter01` dargestellt und speichert seinen serialisierbaren Sitzungszustand unter `GameState.decisions.chapter_01`. Die fachliche Zustandslogik liegt in `chapter_01_engine.ts`; dadurch sind UI, Persistenz und Auswertung getrennt. Die generische `GenericDragDropEngine` im Core kennt weder Werk noch Gattung. Ihre Zuordnungen können durch Zeiger, Touch oder die Klick-/Tastaturalternative ausgelöst werden.

Nach dem finalen Regiecheck markiert die Game-Shell `chapter_01` als abgeschlossen, leitet `AFTER_CHAPTER_1` ab und schaltet Kapitel 2 frei. Frühe Fehlversuche werden als Ereignisse gespeichert; der erfolgreiche Abschluss erhält bei der internen Kompetenzaggregation höheres Gewicht.

## Primärtextintegrität

Freigegebene JSON-Dateien liegen ausschließlich in `src/games/dramatik/data/primary-sources`. `integrity-manifest.json` ordnet jeder freigegebenen Datei ihren SHA-256-Hash zu. Der Integritätstest scheitert bei geänderten, fehlenden oder unangemeldet hinzugefügten JSON-Dateien. Der Status `source_verified: true` wird niemals von Anwendungscode gesetzt; er ist eine redaktionelle Aussage in einer freigegebenen Inhaltsdatei.

Neue Primärtexte werden nicht automatisch beschafft. Nach redaktioneller Freigabe muss der Hash bewusst berechnet, geprüft und ins Manifest eingetragen werden.

## Kapitel 2

`Chapter02` nutzt dieselbe Game-Shell und persistiert einen rein serialisierbaren Sitzungszustand unter `GameState.decisions.chapter_02`. Die fachliche Ablaufsteuerung liegt in `chapter_02_engine.ts`. Das generische `RelationshipGraph` rendert ausschließlich übergebene Figuren und Beziehungen; Auswahl und Verbindung sind über native Buttons auch per Tastatur und Touch bedienbar. Der bestehende Feedback- und Evidence-Reasoning-Core wurde generisch vervollständigt, ohne Werk- oder Figurenwissen in den Core zu verlagern.

Konflikt, Figurenentwicklung und Beziehungsbelege in Kapitel 2 sind als didaktische Zusammenfassungen beziehungsweise Interpretationen mit `source_verified: false` modelliert. Sie werden nicht als Primärtext ausgegeben. Kapitel 2 fügt dem Primärtextverzeichnis keine Datei hinzu und verändert dessen Integritätsmanifest nicht.

## Kapitel 3

Kapitel 3 wird als serialisierbarer Ermittlungszustand unter `GameState.decisions.chapter_03` gespeichert. Die Archivszene trennt Nachrichtenwege, Wissensstände, gefundene Hinweise, Ereignisreihenfolge, Kausalverbindungen, relationale Rollen, Belegprüfung und Relevanzauswahl.

Die gemeinsame `GenericCausalChainEngine` kennt nur Ereignis-IDs, erlaubte Vorgänger und Nachfolger. Sie validiert Reihenfolge und Verbindungen, kann kombinierte Ursache-/Folge-Rollen bestimmen, Zustand wiederherstellen und Feedback-/Completion-Callbacks auslösen. Das Rendering bleibt davon getrennt und bietet Drag-and-drop sowie eine Button-/Tastaturalternative.

Kapitel 3 enthält ausschließlich didaktische Zusammenfassungen mit `source_verified: false`. Das geschützte Primärtextverzeichnis und sein Integritätsmanifest werden nicht verändert.

## Kapitel 4

Kapitel 4 nutzt die bestehende Game-Shell und speichert Analyse, Eskalationspunkte, Sprachhandlungen und Inszenierung unter `decisions.chapter_04`; die reinen Inszenierungsdaten werden zusätzlich im vorgesehenen `stagingDecisions`-Bereich gespiegelt. Die vorhandene Dramatik-`BasicStagingEngine` trennt feste Primärtext-Regieanweisungen von optionalen Inszenierungsentscheidungen sowie deren Belegen und Begründungen.

Die freigegebene Passage aus dem 5. Aufzug, 3. Szene liegt als geschützte JSON-Datei im Primärtextverzeichnis und ist im Hashmanifest registriert. Die Bühnenwiedergabe liest den Originaltext nur; Position, Distanz, Haltung und Pause werden ausschließlich aus separaten Inszenierungsdaten abgeleitet.

## Kapitel 5

Kapitel 5 speichert Relevanzurteile, Interpretationslinks, Claim-Prüfung, Hypothesenpräzisierung, Argumentationskette und Inszenierungsrevision unter `GameState.decisions.chapter_05`. Die bestehende `GenericEvidenceReasoningEngine` unterstützt zusätzlich die vierteilige Kette Beobachtung, Primärtextreferenz, Erklärung und Hypothesenrelation.

Kapitel 5 enthält keine Primärtextkopien. `evidence_reference` verweist ausschließlich auf IDs der geschützten Kapitel-4-Datei; der sichtbare Wortlaut wird zur Laufzeit aus dieser einen Quelle geladen. Analyseergebnisse bleiben didaktische Daten, die Deutungshypothese bleibt ausdrücklich `interpretation`.

## Text und Inszenierung

`OriginalStageDirection` verweist auf exakten Primärtext und trägt den Typ `original_stage_direction`. Freie `StagingDecision`-Daten tragen den separaten Typ `staging_decision`, eine Dimension und Textbelege. Dadurch kann eine originale Regieanweisung nicht versehentlich als Spielentscheidung behandelt werden.

## Finale

Das Finale ist eine zusätzliche Ansicht der bestehenden `GameShell`, keine eigene State-Machine. `GameState` führt die Zustände `FINALE_READY`, `PERFORMANCE_RUNNING` und `PERFORMANCE_COMPLETE` sowie einen reproduzierbaren Snapshot aus finaler Regie, Deutung und sichtbarer Kompetenzaggregation. Die Aufführung referenziert ausschließlich IDs der geschützten Kapitel-4-Quelle; die Revision aus Kapitel 5 überschreibt beim Zusammenführen genau die gleichnamige Entscheidung aus Kapitel 4.

Die Kompetenzaggregation ist eine reine, deterministische Funktion. Sie bündelt vorhandene interne Werte in sieben sichtbare Bereiche und wertet weder Replay noch Aufführung als neue Lernereignisse. Das restaurierte Regiebuch nutzt denselben Snapshot für Bildschirm, Reload und Browserdruck.

## Phase-8-Härtung und Wiederverwendung

Der Save-Loader akzeptiert ausschließlich Version 1 und normalisiert fehlende oder typfalsche Felder kontrolliert auf sichere Defaults. Kapitelsitzungen werden mit `hydrateSession` gegen ihre jeweilige Maximalrunde und die erwarteten Containerformen normalisiert. Ein beschädigter, aber parsebarer Spielstand führt dadurch weder zu einem Renderfehler noch zu einer unmöglichen Kapitelrunde.

Overlays werden weiterhin zentral durch die Game-Shell bereitgestellt, erhalten initialen Fokus und schließen per Escape. Das Starten eines neuen Spiels bei vorhandenem Spielstand erfordert eine Bestätigung. Primärtextbelege und feste Regieanweisungen in Kapitel 4 werden ausschließlich über IDs aus der geschützten Quelle aufgelöst; Analyse- und Staging-Konfigurationen enthalten keine Wortlautkopien.

Für spätere Lernwerkstatt-Spiele sind Game-Shell, Fortschritt, Feedback, Drag-and-drop, Evidence Reasoning, Causal Chain, Content-Schema, Asset-Manifest, Audio, Persistenz und Accessibility-Grundlagen wiederverwendbar. Die Staging-Engine bleibt bewusst im Dramatik-Modul. Dies implementiert oder plant keine Inhalte für Epik oder Lyrik.
