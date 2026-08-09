# Verbindliche Inhaltsregeln

Literarische Primärtexte dürfen nicht erfunden, ergänzt, modernisiert oder ungekennzeichnet verändert werden. Orthografie, Zeichensetzung, Sprecherangaben und Regieanweisungen bleiben exakt erhalten. Stille Kürzungen und automatische Korrekturen sind unzulässig. Redaktionell vorbereitete Kürzungen müssen ausdrücklich gekennzeichnet sein.

Für „Romeo und Julia“ gilt ausschließlich August Wilhelm Schlegels Übersetzung in der auf Wikisource bereitgestellten Fassung. Codex beschafft oder ergänzt in Phase 0 keine fehlenden Originaltexte.

## Herkunftstypen

- `primary_source`: unveränderlicher literarischer Primärtext
- `didactic`: didaktischer Arbeitsinhalt
- `didactic_summary`: ausdrücklich bezeichnete Zusammenfassung
- `interpretation`: Deutung oder Inszenierungsentscheidung

Didaktische Zusammenfassungen und Interpretationen müssen technisch und visuell von Primärtexten unterscheidbar bleiben. Eine Paraphrase darf niemals als Originaltext gekennzeichnet werden.

`source_verified: true` darf ausschließlich in redaktionell freigegebenen Inhaltsdateien gesetzt werden. Die Anwendung darf diesen Status niemals selbst erzeugen. Primärtextdatensätze sind immer `editable: false`.

Die für Kapitel 1 freigegebenen Fragmente aus dem 5. Aufzug, 1. Szene liegen in einer geschützten JSON-Datei. Das SHA-256-Manifest und ein zusätzlicher exakter Inhaltsvergleich sichern auch Schreibweisen wie „traun“ gegen scheinbar harmlose Modernisierung.

Die in Kapitel 4, Kapitel 5 und Finale verwendete Passage aus dem 5. Aufzug, 3. Szene besitzt genau eine geschützte Datenquelle. Nachgelagerte Analyse-, Inszenierungs- und Aufführungsdaten referenzieren deren IDs; sie dürfen den Wortlaut nicht duplizieren. Feste Regieanweisungen werden ebenfalls aus diesen IDs geladen und können durch Spielerentscheidungen nicht verändert werden.

Produktionsinhalte dürfen keine redaktionellen Platzhalter enthalten. Bis zur Freigabe bleiben solche Datensätze eindeutig `placeholder: true` und `source_verified: false`; sie sind kein Primärtext und dürfen nicht als fertiger Beleg ausgegeben werden. Gegenwärtig betrifft dies Teile der Beziehungsbelege, Konfliktstruktur und Figurenentwicklung in Kapitel 2.
