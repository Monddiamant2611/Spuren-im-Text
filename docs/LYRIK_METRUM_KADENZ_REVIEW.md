# Review: Metrum, Hebigkeit, Rhythmus und Kadenz

Stand: 6. September 2026

## Freigaberegel

Der frühere Status `verified: true` wurde für diesen Bereich vollständig verworfen. Das neue Feld `verificationStatus` kennt `unchecked`, `accepted`, `rejected` und `ambiguous`. In den produktiven Aufgabenpool gelangen ausschließlich Einträge mit `accepted`. „Akzeptiert“ bedeutet hier: redaktionell als eindeutig eingestuft. Es bezeichnet keine externe phonetische, sprachwissenschaftliche oder wissenschaftliche Zertifizierung.

Wortakzent und Versmetrum werden bewusst getrennt. Ein Einzelwort kann ein jambisches, trochäisches, daktylisches oder anapästisches Betonungsmuster veranschaulichen; erst ein vollständiger Vers erlaubt Aussagen über Grundmetrum und Hebigkeit. Rhythmus ist die konkrete sprachliche Realisierung eines Verses und daher nicht mit dem abstrakten metrischen Raster gleichzusetzen.

## Bilanz des zurückgesetzten Bestands

| Bereich | früherer Bestand | accepted | rejected | ambiguous | unchecked |
| --- | ---: | ---: | ---: | ---: | ---: |
| Metrik | 240 | 43 | 197 | 0 | 0 |
| Kadenz | 80 | 12 | 68 | 0 | 0 |

Die verworfenen Altbestände werden als Gruppen mit stabilen Ausschluss-IDs `legacy-…-rejected-*` bilanziert. Acht vollständige Verse wurden akzeptiert. „Der Wind zieht durch das stille Land.“ wurde bei der erneuten Sicherheitsprüfung entfernt, weil „zieht“ einen plausiblen natürlichen Eigenakzent trägt und die Hebung auf „durch“ für Level 1 erzwungen wirken kann. Ein klarer katalektischer Vers bleibt ausdrücklich als Abweichung markiert.

## Akzeptierte Wortakzente

- Jambus (8): Gefühl, Gesang, Gedicht, Gestalt, Verlust, Verweht, Erwacht, Allein.
- Trochäus (11): Sonne, Blüte, Wolke, Welle, Schatten, Träume, Liebe, Seele, Hoffnung, Stille, Ferne.
- Daktylus (8): Königin, Goldene, Silberne, Leuchtende, Flüsternde, Träumende, Schimmernde, Wogende.
- Anapäst (8): Melodie, Poesie, Harmonie, Fantasie, Symphonie, Elegie, Paradies, Horizont.

„Sehnsucht“ wurde trotz der früheren Startliste nicht übernommen: In standarddeutscher Aussprache ist es einsilbig und kann daher kein trochäisches Zweierschema belegen.

## Akzeptierte vollständige Verse

| ID | Vers | Silben / Betonung | Grundmetrum | Hebungen | Kadenz |
| --- | --- | --- | --- | ---: | --- |
| meter-jambus-verse-b | Im Hof erlischt das letzte Licht. | Im–HOF–er–LISCHT–das–LETZ–te–LICHT | Jambus | 4 | männlich |
| meter-jambus-verse-c | Am See beginnt der junge Tag. | Am–SEE–be–GINNT–der–JUN–ge–TAG | Jambus | 4 | männlich |
| meter-jambus-verse-d | Ein leiser Ruf durchdringt die Nacht. | Ein–LEI–ser–RUF–durch–DRINGT–die–NACHT | Jambus | 4 | männlich |
| meter-trochaeus-verse-a | Sonne leuchtet über Dächern. | SON–ne–LEUCH–tet–Ü–ber–DÄ–chern | Trochäus | 4 | weiblich |
| meter-trochaeus-verse-b | Winde tragen dunkle Wolken. | WIN–de–TRA–gen–DUNK–le–WOL–ken | Trochäus | 4 | weiblich |
| meter-trochaeus-verse-c | Vögel suchen ferne Inseln. | VÖ–gel–SU–chen–FER–ne–IN–seln | Trochäus | 4 | weiblich |
| meter-trochaeus-verse-d | Regen löscht die hellen Spuren. | RE–gen–LÖSCHT–die–HEL–len–SPU–ren | Trochäus | 4 | weiblich |
| meter-trochaeus-verse-e | Sonne leuchtet überm stillen Land. | SON–ne–LEUCH–tet–Ü–berm–STIL–len–LAND | Trochäus | 5 | männlich, katalektisch |

Für daktylische und anapästische Vollverse wurde nichts akzeptiert: Die geprüften Altzeilen waren zu künstlich oder erlaubten konkurrierende natürliche Betonungen. Qualität hat hier Vorrang vor symmetrischen Mengen.

## Akzeptierte Kadenzen

Die zwölf produktiven Kadenzbeispiele sind vollständige Verse: vier männliche, vier weibliche und vier reiche Schlüsse. Die männlichen und weiblichen Beispiele entsprechen den oben dokumentierten Vollversen. Reiche Kadenzen werden an „Am Horizont erscheint die Königin.“, „Auf den Dächern liegt etwas Goldenes.“, „Durch das Fenster fällt etwas Leuchtendes.“ und „Über dem Wasser zieht etwas Schimmerndes.“ gezeigt. Entscheidend sind null, eine oder zwei unbetonte Silben nach der letzten Hebung; eine behauptete Wirkung ist ohne Kontext keine Kadenzbestimmung.

## Fünf Ausschlüsse

| Beispiel | Status | Grund |
| --- | --- | --- |
| Sehnsucht als Trochäus | rejected | Einsilbig; das behauptete Zweierschema existiert nicht. |
| Isoliertes „Nacht“ als Kadenzaufgabe | rejected | Ein Endwort ersetzt keinen vollständigen Versschluss. |
| „Die letzte Zeile endet auf ‚Stille‘“ | rejected | Metasatz statt zu analysierendem Vers. |
| automatisch zusammengesetzter Daktylusvers | rejected | Wortgrenzen und natürlicher Satzakzent wurden nicht verlässlich berücksichtigt. |
| automatisch zusammengesetzter Anapästvers | rejected | Mehrere natürliche Lesarten; Grundmetrum und Hebigkeit nicht eindeutig. |

## Fünf Freigaben

| Beispiel | Status | Grund |
| --- | --- | --- |
| Gefühl: Ge–FÜHL | accepted | Eindeutiger Wortakzent; nur Einstieg, kein Versbeleg. |
| Sonne: SON–ne | accepted | Eindeutiger trochäischer Wortakzent. |
| Königin: KÖ–ni–gin | accepted | Eindeutiges dreisilbiges Akzentmuster in sorgfältiger Standardsprache. |
| Im Hof erlischt das letzte Licht. | accepted | Vier Hebungen und ein natürlicher Wechsel von Senkung und Hebung. |
| Sonne leuchtet über Dächern. | accepted | Durchgehender vierhebiger trochäischer Wechsel und weiblicher Schluss. |

## Technische Sicherungen

`data/meter-quality.ts` bilanziert akzeptierte und verworfene Einträge maschinenlesbar. Tests erzwingen ausschließlich `accepted` im Produktionspool, gleiche Längen von Silben- und Betonungsfolgen, positive Hebungszahlen, vollständige Verse für Kadenzen und global eindeutige IDs. `hasDeviation` und `deviationExplanation` markieren die Katalexe des fünfhebigen Trochäus ausdrücklich.
