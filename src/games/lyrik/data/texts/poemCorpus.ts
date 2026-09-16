export type RhymeType="pair"|"cross"|"enclosed"|"heap"|"tail"|"interlaced"|"unrhymed";
export type ExercisePoem={id:string;title:string;text:string;sourceType:"selfWrittenExercise";rhymeType:RhymeType;rhymeScheme:string;stanzaCount:number;verseCount:number;meterStatus:"notReviewed";hasEnjambment:boolean;themes:readonly string[];suitableChapters:readonly number[];verified:true};
const p=(id:string,title:string,text:string,rhymeType:RhymeType,rhymeScheme:string,stanzaCount:number,hasEnjambment=false,themes=["Wahrnehmung"]):ExercisePoem=>({id,title,text,sourceType:"selfWrittenExercise",rhymeType,rhymeScheme,stanzaCount,verseCount:text.split("\n").filter(Boolean).length,meterStatus:"notReviewed",hasEnjambment,themes,suitableChapters:[1,3,5,7,8,9],verified:true});
export const poemCorpus:readonly ExercisePoem[]=[
p("p01","Gartenwache","Abend legt sich auf die Nacht,\nüberm stillen Garten wacht\nein Licht, das durch die Zweige rinnt,\nbis leise neuer Morgen beginnt.","pair","aabb",1),
p("p02","Abendland","Der Abend sinkt ins stille Land,\nein letzter Vogel zieht dahin,\nder Wind streicht kühl über den Sand,\ndie ersten Sterne glühen hin.","cross","abab",1),
p("p03","Fenstertraum","Am Fenster wächst ein kleiner Traum,\ndie Straße schweigt im späten Licht,\nnur eine ferne Stimme spricht,\nund Nacht legt Schatten um den Raum.","enclosed","abba",1),
p("p04","Regenhof","Im Hof klingt sacht der Regen nach,\ner schreibt sein Lied auf jedes Dach,\ndie Rinne spricht, der Brunnen spricht,\nbis Morgen durch die Wolken bricht.","pair","aabb",1),
p("p05","Ufer","Das Schilf bewegt sich sacht im Wind,\nwo müde Schritte leiser sind,\nder Fluss bewahrt das Abendrot,\nund trägt es fort ins blaue Lot.","pair","aabb",1),
p("p06","Stadtmorgen","Die Bahn erwacht im ersten Licht,\nein Fenster glänzt, ein Rad beginnt,\nauf nassem Pflaster wächst Gesicht,\nals ob die Stadt sich neu besinnt.","cross","abab",1),
p("p07","Brief","Ein alter Brief liegt auf dem Tisch,\ndas Blau der Tinte bleibt noch frisch,\ndoch zwischen Gruß und letztem Wort\nträgt jede Falte Jahre fort.","pair","aabb",1),
p("p08","Schneekreis","Der Schnee fällt leis, der Hof wird weiß,\ndie Dächer schweigen still und leis,\nder Weg verliert sich leis im Kreis,\nund jede Spur erzählt ganz leis.","heap","aaaa",1),
p("p09","Nach dem Zug","Der Bahnsteig hält den letzten Klang,\nder Wind streicht an den Schienen lang,\nwo eben noch dein Lachen blieb,\nsteht nun die Uhr im Abendrot,\nund zählt den Takt der leeren Not,\nbis Dunkel durch die Hallen trieb.","tail","aabccb",1),
p("p10","Zwei Ufer","Am einen Ufer schläft das Haus,\nder Fluss trägt fremde Lichter fort,\nein Vogel ruft die Ferne aus,\nam andern Ufer wächst ein Wort,\ndas zieht die alten Stimmen raus\nund findet keinen festen Ort.","interlaced","abcabc",1),
p("p11","Erinnerung","Im Schrank bewahrt ein Kleid den Duft,\ndie Jahre ziehen durch die Luft,\nmein Blick bleibt an den Knöpfen stehn,\nals könnten sie den Sommer sehn.","pair","aabb",1),
p("p12","Hoffnung","Noch liegt der Platz im grauen Licht,\ndoch hinter Wolken wächst ein Schein,\nein Kind hebt Kreide, zeichnet schlicht\nein offnes Tor auf kalten Stein.","cross","abab",1),
p("p13","Morgenruf","Der Regen zieht\nüber die Dächer und trägt\nden Ruf einer Bahn\nweit in den Morgen.","unrhymed","-",1,true),
p("p14","Schlüssel","Der kleinste Schlüssel\nöffnet keine Tür mehr.\nIch trage ihn weiter,\ndamit etwas Gewicht behält.","unrhymed","-",1,true),
p("p15","Drei Bilder","Ein Fenster.\nDarunter die Straße.\nIn der Pfütze schwimmt der Himmel.","unrhymed","-",1,false),
p("p16","Rückkehr","Wir kommen spät.\n\nDas Haus steht offen,\ndoch niemand ruft.\n\nIm Flur\nder Geruch von Äpfeln.","unrhymed","-",3,true)
];
