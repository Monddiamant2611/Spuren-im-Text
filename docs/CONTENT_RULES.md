# Verbindliche Inhaltsregeln

Literarische Primärtexte dürfen nicht erfunden, ergänzt, modernisiert oder ungekennzeichnet verändert werden. Orthografie, Zeichensetzung, Sprecherangaben und Regieanweisungen bleiben exakt erhalten. Stille Kürzungen und automatische Korrekturen sind unzulässig. Redaktionell vorbereitete Kürzungen müssen ausdrücklich gekennzeichnet sein.

Für den produktiven Lernpfad gilt ausschließlich William Shakespeares „Romeo und Juliette“ in der Übersetzung von Christoph Martin Wieland. Verbindliche Primärtextgrundlage ist `docs/sources/william-shakespeare-romeo-und-juliette.epub`. Die verwendeten Ausschnitte werden direkt gegen die XHTML-Inhalte dieser lokalen EPUB geprüft.

## Herkunftstypen

- `primary_source`: unveränderlicher literarischer Primärtext
- `didactic`: didaktischer Arbeitsinhalt
- `didactic_summary`: ausdrücklich bezeichnete Zusammenfassung
- `interpretation`: Deutung oder Inszenierungsentscheidung

Didaktische Zusammenfassungen und Interpretationen müssen technisch und visuell von Primärtexten unterscheidbar bleiben. Eine Paraphrase darf niemals als Originaltext gekennzeichnet werden.

`source_verified: true` darf ausschließlich in redaktionell freigegebenen Inhaltsdateien gesetzt werden. Die Anwendung darf diesen Status niemals selbst erzeugen. Primärtextdatensätze sind immer `editable: false`.

Die für Kapitel 1–5 verwendeten Wieland-Ausschnitte liegen in geschützten JSON-Dateien. Das SHA-256-Manifest und der exakte EPUB-Inhaltsvergleich sichern den historischen Wortlaut gegen scheinbar harmlose Modernisierung.

Alte Schlegel-/Wikisource-Dateien bleiben ausschließlich als nicht produktiv importierter Legacy-Bestand erhalten. Sie dürfen weder im sichtbaren Quellenbereich noch im aktuellen Lernpfad als verwendete Textgrundlage ausgegeben werden.

Produktionsinhalte dürfen keine redaktionellen Platzhalter enthalten. Nicht verifizierte didaktische Zusammenfassungen bleiben `source_verified: false`, werden ausdrücklich als didaktische Inhalte geführt und dürfen nicht als Primärtext ausgegeben werden. Die Beziehungsbelege, Konfliktstruktur und Figurenentwicklung in Kapitel 2 verwenden ausschließlich solche gekennzeichneten didaktischen Aussagen.
