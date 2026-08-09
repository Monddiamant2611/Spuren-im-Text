# Lernwerkstatt Games

Modulare lokale Lernspielbasis für Dramatik, Epik und Lyrik. Implementiert ist das Dramatik-Spiel „Die letzte Aufführung – Das verlorene Regiebuch“ mit Game-Shell, fünf Kapiteln, Aufführungsfinale und restauriertem Regiebuch. Epik und Lyrik enthalten ausschließlich strukturelle Registrierungen.

## Entwicklung

- `npm run dev` – lokale Entwicklungsansicht
- `npm test` – Unit-, Schema-, Integritäts- und State-Tests
- `npm run test:e2e` – Chromium-End-to-End-Tests
- `npm run lint` – statische Prüfung
- `npm run typecheck` – TypeScript-Prüfung
- `npm run build` – Produktionsbuild
- `npm run start` – gebaute Anwendung lokal starten; unter OneDrive wird der unveränderte Build dafür temporär außerhalb des Reparse-Dateisystems bereitgestellt

## Architektur und Inhalte

Der wiederverwendbare Core enthält lokale Persistenz, Fortschritt, Feedback, Audio, Content-Schema, Asset-Manifest sowie Drag-and-drop-, Evidence-Reasoning- und Kausalkettenlogik. Dramatik-spezifisch bleibt die Staging-Engine. Details stehen in [ARCHITECTURE.md](./docs/ARCHITECTURE.md), die verbindlichen Textregeln in [CONTENT_RULES.md](./docs/CONTENT_RULES.md), das Medieninventar in [ASSETS.md](./docs/ASSETS.md) und der vollständige Spielüberblick in [DRAMATIK_GAME.md](./docs/DRAMATIK_GAME.md).

## Produktionsstatus

Die technische Hauptstrecke und Wiederherstellung sind automatisiert geprüft. Der redaktionelle Produktionsstatus bleibt **NOT_PRODUCTION_READY**, solange die ausdrücklich markierten Beleg-, Konflikt- und Entwicklungsplatzhalter in Kapitel 2 nicht durch freigegebene Inhalte ersetzt wurden. Diese Inhalte werden bewusst nicht automatisch ergänzt.
