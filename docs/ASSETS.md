# Asset-System

Alle Laufzeit-Assets werden zentral in `src/core/assets/manifest.ts` registriert und über eine stabile ID referenziert. Direkte, verstreute Pfade im UI-Code sind nicht vorgesehen.

Ein Eintrag enthält `id`, `category`, `path`, `alt`, `game` und `usage`. Unterstützte Kategorien sind `characters`, `theatre`, `renaissance_objects`, `analysis_symbols`, `ui`, `backgrounds` und `audio`.

Dateien liegen unter `public/assets/{shared|dramatik|epik|lyrik}`. Vor dem Umbenennen oder Verschieben eines vorhandenen Assets müssen Manifest und Verwendungen geprüft werden. Relevante Bilder benötigen aussagekräftige Alt-Texte; dekorative Verwendung wird im Feld `usage` kenntlich gemacht.

## Inventar Phase 0

Im Ausgangsrepository und zu Beginn von Phase 1 waren keine Bild- oder Audiodateien vorhanden. Es wurden keine neuen Medien erzeugt oder aus dem Internet geladen. Die Theaterumgebung besteht aus CSS-Flächen; das Manifest ist daher absichtlich leer.

## Fehlender Bedarf aus Kapitel 1

Für Romeo und Balthasar liegen weiterhin keine freigegebenen Figurenassets vor. Kapitel 1 verwendet deshalb neutrale, mit Initialen versehene und ausdrücklich als Entwicklungsplatzhalter bezeichnete Figuren-Slots. Sie werden ersetzt, sobald redaktionell freigegebene Assets über das Manifest registriert sind.

## Fehlender Bedarf aus Kapitel 2

Das Manifest enthält weiterhin keine Bildmedien. Für Romeo, Julia, Tybalt, Mercutio, Benvolio, Lorenzo, Amme, Capulet und Paris fehlen freigegebene Porträts. Die Ensemblewand verwendet deshalb gut lesbare, neutrale Initialen-Slots und CSS-Flächen; es wurden keine Ersatzbilder erzeugt, geladen oder dupliziert.

## Fehlender Bedarf aus Kapitel 3

Für Romeo, Lorenzo, Balthasar, Marcus, Brief, Karte, Sanduhr, Lupe, Kompass, Bücher und Archivdekoration liegen weiterhin keine freigegebenen Bildassets vor. Die Archivszene verwendet deshalb beschriftete CSS-Objekte und neutrale Symbole. Marcus und Balthasar bleiben ausdrücklich dokumentierter Assetbedarf; es wurden keine externen Bilder beschafft.

## Fehlender Bedarf aus Kapitel 4

Für Romeo, Paris, Gruft-/Kirchhofkulisse, Vorhang, Scheinwerfer, Lupe, Konfliktsymbol, Sprechblasen, Manuskript und Fackel liegen keine registrierten Bildassets vor. Die Generalprobe verwendet deshalb eine atmosphärische CSS-Bühne und neutrale Figuren-Slots. Es wurden keine Medien geladen oder erzeugt.

## Finale

Das Finale verwendet weiterhin die vorhandenen CSS-Bühnen-, Vorhang-, Licht-, Regiebuch- und Figuren-Slots. Das zentrale Manifest bleibt leer; es wurden weder Bild- noch Audioassets erzeugt, heruntergeladen oder dupliziert. Freigegebene Romeo-/Paris-Porträts, eine Bühnenkulisse und dezente Vorhang-/Seiten-Audios bleiben optionaler späterer Assetbedarf, sind für die vollständige Bedienbarkeit aber nicht erforderlich.

## Audit Phase 8

Manifest und Laufzeitverwendungen wurden erneut inventarisiert. Es existieren weiterhin keine Bild- oder Audiodateien und damit keine 404-Pfade, Duplikate oder verzerrten Rastermedien. Sämtliche sichtbaren Figuren, Objekte, Vorhänge und Lichtflächen sind CSS- beziehungsweise Text-Slots. Balthasar, Marcus und die neun Ensemblefiguren bleiben als fehlender redaktionell freizugebender Assetbestand dokumentiert; die neutralen Slots sind kein behaupteter finaler Bildbestand.

## Produktive Bildintegration

Unter `public/assets/dramatik` liegen nun 67 redaktionell bereitgestellte Bilddateien: sieben Hintergründe, 32 Figurenvarianten, elf Gegenstände und 17 Symbole. Alle Dateien sind mit ihrem unveränderten Dateinamen im zentralen Manifest registriert. Die Gesamtgröße beträgt 42.013.943 Byte.

Produktiv verwendet werden insbesondere der Theater-Eingangsbereich, der Raum der Figurenkonstellation, die Gruftbühne, die restaurierte Finalfassung, verfügbare Ensembleporträts, Balthasars ruhiger und dringlicher Zustand, Romeo- und Paris-Zustände, der versiegelte Brief, Sanduhr, Marcus, Lorenzo mit Brief, Schlüssel und Laterne. Nicht passende oder kontextuell nicht benötigte Varianten bleiben registriert, werden aber nicht willkürlich angezeigt. `Schreinwerfer.jpg` bleibt wegen der unklaren Abgrenzung zum eindeutig benannten `Scheinwerfersymbol.jpg` ungenutzt.

Bildkomponenten laden kapitelbezogen mit nativem Lazy Loading. Beim Ladefehler bleibt der vorherige Initialen- beziehungsweise CSS-Fallback sichtbar; ein fehlendes Bild blockiert keine Aufgabe. Dekorative Bilder besitzen leere Alternativtexte, Figuren und inhaltliche Objekte knappe zugängliche Bezeichnungen.
