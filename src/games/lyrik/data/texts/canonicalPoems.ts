export type SourceVerification={status:"unresolved"|"source-located"|"variant-unresolved"|"verified";sourceTitle:string|null;sourceInstitution:string|null;sourceUrl:string|null;editionYear:number|null;editionDetails:string|null;checkedAt:string;notes:string;[key:string]:unknown};
export type TextVariant={userReading:string;verifiedReading:string;location:string;source:string;decision:string;reason:string;[key:string]:unknown};
export type CanonicalPoem={
  id:string;title:string;author:string;year:number|null;userText:string;productionText:string|null;text:string;stanzas:readonly string[];verseCount:number;stanzaCount:number;stanzaVerification:"verified"|"uncertain";stanzaStructureStatus:"verified"|"unresolved";sourceType:"authentic";textVerificationStatus:"verified"|"needs-manual-review"|"rights-blocked";sourceVerification:SourceVerification;variants:readonly TextVariant[];previewAllowed:boolean;contentTaskAllowed:boolean;formalTaskAllowed:boolean;publicReleaseAllowed:boolean;verificationNote:string;rightsStatus:"public-domain-original-review"|"translation-review-required"|"cleared";themes:readonly string[];genre:"lyric"|"ballad"|"sonnet"|"prosePoem"|"songLike";rhymeStatus:"pending"|"verified";rhymeScheme:string|null;poemFormStatus:"pending"|"verified";poemForm:string|null;meterStatus:"pending"|"accepted"|"ambiguous";meter:string|null;cadenceStatus:"pending"|"accepted"|"ambiguous";notableFormFeatures:readonly string[];notableFeatures:readonly string[];suitableChapters:readonly number[];suitableSkills:readonly string[];difficultyPotential:"mixed"|"advanced";needsManualSeparation:boolean;approvedForProductiveUse:boolean;publicReleaseStatus:"editorial-preview"|"rights-blocked";[key:string]:unknown;
};

export const canonicalPoems:readonly CanonicalPoem[]=[
  {
    "id": "canonical-01-liebes-lied",
    "title": "Liebes-Lied",
    "author": "Rainer Maria Rilke",
    "year": 1907,
    "userText": "Wie soll ich meine Seele halten, daß\nsie nicht an deine rührt? Wie soll ich sie\nhinheben über dich zu andern Dingen?\nAch gerne möcht ich sie bei irgendwas\nVerlorenem im Dunkel unterbringen\nan einer fremden stillen Stelle, die\nnicht weiterschwingt, wenn deine Tiefen schwingen.\nDoch alles, was uns anrührt, dich und mich,\nnimmt uns zusammen wie ein Bogenstrich,\nder aus zwei Saiten eine Stimme zieht.\nAuf welches Instrument sind wir gespannt?\nUnd welcher Geiger hat uns in der Hand?\nO süßes Lied.",
    "canonicalText": null,
    "userStanzas": [
      "Wie soll ich meine Seele halten, daß\nsie nicht an deine rührt? Wie soll ich sie\nhinheben über dich zu andern Dingen?\nAch gerne möcht ich sie bei irgendwas\nVerlorenem im Dunkel unterbringen\nan einer fremden stillen Stelle, die\nnicht weiterschwingt, wenn deine Tiefen schwingen.\nDoch alles, was uns anrührt, dich und mich,\nnimmt uns zusammen wie ein Bogenstrich,\nder aus zwei Saiten eine Stimme zieht.\nAuf welches Instrument sind wir gespannt?\nUnd welcher Geiger hat uns in der Hand?\nO süßes Lied."
    ],
    "canonicalStanzas": [],
    "collationStatus": "unresolved",
    "productionText": null,
    "text": "Wie soll ich meine Seele halten, daß\nsie nicht an deine rührt? Wie soll ich sie\nhinheben über dich zu andern Dingen?\nAch gerne möcht ich sie bei irgendwas\nVerlorenem im Dunkel unterbringen\nan einer fremden stillen Stelle, die\nnicht weiterschwingt, wenn deine Tiefen schwingen.\nDoch alles, was uns anrührt, dich und mich,\nnimmt uns zusammen wie ein Bogenstrich,\nder aus zwei Saiten eine Stimme zieht.\nAuf welches Instrument sind wir gespannt?\nUnd welcher Geiger hat uns in der Hand?\nO süßes Lied.",
    "stanzas": [
      "Wie soll ich meine Seele halten, daß\nsie nicht an deine rührt? Wie soll ich sie\nhinheben über dich zu andern Dingen?\nAch gerne möcht ich sie bei irgendwas\nVerlorenem im Dunkel unterbringen\nan einer fremden stillen Stelle, die\nnicht weiterschwingt, wenn deine Tiefen schwingen.\nDoch alles, was uns anrührt, dich und mich,\nnimmt uns zusammen wie ein Bogenstrich,\nder aus zwei Saiten eine Stimme zieht.\nAuf welches Instrument sind wir gespannt?\nUnd welcher Geiger hat uns in der Hand?\nO süßes Lied."
    ],
    "verseCount": 13,
    "stanzaCount": 1,
    "stanzaVerification": "verified",
    "stanzaStructureStatus": "verified",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "variant-unresolved",
      "sourceTitle": "Liebes-Lied",
      "sourceInstitution": "Wikisource / Digitalisat der Erstausgabe",
      "sourceUrl": "https://de.wikisource.org/wiki/Liebes-Lied",
      "editionYear": 1907,
      "editionDetails": "Neue Gedichte, Insel-Verlag, Erstausgabe, S. 51; zweifach korrekturgelesen",
      "checkedAt": "2026-09-12",
      "notes": "Geiger/Spieler und Interpunktion weichen ab.",
      "baseEdition": {
        "title": "Liebes-Lied",
        "editorOrPublisher": "Wikisource / Digitalisat der Erstausgabe",
        "publicationYear": 1907,
        "place": null,
        "volume": null,
        "pages": "Neue Gedichte, Insel-Verlag, Erstausgabe, S. 51; zweifach korrekturgelesen",
        "digitalSource": "Wikisource / Digitalisat der Erstausgabe",
        "sourceUrl": "https://de.wikisource.org/wiki/Liebes-Lied",
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [
      {
        "userReading": "Geiger",
        "verifiedReading": "Spieler",
        "location": "Vers 12",
        "source": "Neue Gedichte, Insel 1907, S. 51",
        "decision": "unresolved",
        "reason": "Keine stillschweigende Ersetzung.",
        "canonicalReading": "Spieler",
        "differenceType": "orthography",
        "explanation": "Keine stillschweigende Ersetzung."
      }
    ],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": false,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Liebes-Lied",
    "baseEditionTitle": "Liebes-Lied",
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-02-ich-habe-dich-so-lieb",
    "title": "Ich habe dich so lieb",
    "author": "Joachim Ringelnatz",
    "year": 1912,
    "userText": "Ich habe dich so lieb!\nIch würde dir ohne Bedenken\nEine Kachel aus meinem Ofen\nSchenken.\nIch habe dir nichts getan.\nNun ist mir traurig zu Mut.\nAn den Hängen der Eisenbahn\nLeuchtet der Ginster so gut.\nVorbei - verjährt -\nDoch nimmer vergessen.\nIch reise.\nAlles, was lange währt,\nIst leise.\nDie Zeit entstellt\nAlle Lebewesen.\nEin Hund bellt.\nEr kann nicht lesen.\nEr kann nicht schreiben.\nWir können nicht bleiben.\nIch lache.\nDie Löcher sind die Hauptsache\nAn einem Sieb.\nIch habe dich so lieb.",
    "canonicalText": null,
    "userStanzas": [
      "Ich habe dich so lieb!\nIch würde dir ohne Bedenken\nEine Kachel aus meinem Ofen\nSchenken.\nIch habe dir nichts getan.\nNun ist mir traurig zu Mut.\nAn den Hängen der Eisenbahn\nLeuchtet der Ginster so gut.\nVorbei - verjährt -\nDoch nimmer vergessen.\nIch reise.\nAlles, was lange währt,\nIst leise.\nDie Zeit entstellt\nAlle Lebewesen.\nEin Hund bellt.\nEr kann nicht lesen.\nEr kann nicht schreiben.\nWir können nicht bleiben.\nIch lache.\nDie Löcher sind die Hauptsache\nAn einem Sieb.\nIch habe dich so lieb."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Ich habe dich so lieb!\nIch würde dir ohne Bedenken\nEine Kachel aus meinem Ofen\nSchenken.\nIch habe dir nichts getan.\nNun ist mir traurig zu Mut.\nAn den Hängen der Eisenbahn\nLeuchtet der Ginster so gut.\nVorbei - verjährt -\nDoch nimmer vergessen.\nIch reise.\nAlles, was lange währt,\nIst leise.\nDie Zeit entstellt\nAlle Lebewesen.\nEin Hund bellt.\nEr kann nicht lesen.\nEr kann nicht schreiben.\nWir können nicht bleiben.\nIch lache.\nDie Löcher sind die Hauptsache\nAn einem Sieb.\nIch habe dich so lieb.",
    "stanzas": [
      "Ich habe dich so lieb!\nIch würde dir ohne Bedenken\nEine Kachel aus meinem Ofen\nSchenken.\nIch habe dir nichts getan.\nNun ist mir traurig zu Mut.\nAn den Hängen der Eisenbahn\nLeuchtet der Ginster so gut.\nVorbei - verjährt -\nDoch nimmer vergessen.\nIch reise.\nAlles, was lange währt,\nIst leise.\nDie Zeit entstellt\nAlle Lebewesen.\nEin Hund bellt.\nEr kann nicht lesen.\nEr kann nicht schreiben.\nWir können nicht bleiben.\nIch lache.\nDie Löcher sind die Hauptsache\nAn einem Sieb.\nIch habe dich so lieb."
    ],
    "verseCount": 23,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "songLike",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Ich habe dich so lieb",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-03-ich-denke-dein",
    "title": "Ich denke dein",
    "author": "Friederike Brun",
    "year": null,
    "userText": "[II.]\n\nIch denke dein, wenn sich im Blütenregen\nDer Frühling malt;\nUnd wenn des Sommers mild gereifter Segen\nIn Ähren strahlt.\n\nIch denke dein, wenn sich das Weltmeer tönend\nGen Himmel hebt,\nUnd vor der Wogen Wut das Ufer stöhnend\nZurückebebt.\n\nDein denk' ich, wenn der junge Tag sich golden\nDer See enthebt,\nAn neugebornen zarten Blumendolden\nDer Frühtau schwebt.\n\nIch denke dein, wenn sich der Abend rötend\nIm Hain verliert,\nUnd Philomelens Klage leise flötend\nDie Seele rührt.\n\nDein denk' ich, wenn im bunten Blätterkranze\nDer Herbst uns grüsst;\nDein, wenn, in seines Schneegewandes Glanze,\nDas Jahr sich schliesst.\n\nAm Hainquell, ach! im leichten Erlenschatten\nWinkt mir dein Bild!\nSchnell ist der Wald, schnell sind die Blumenmatten\nMit Glanz erfüllt.\n\nBeim trüben Lampenschein, in bittern Leiden,\nGedacht' ich dein!\nDie bange Seele flehte nah' am Scheiden:\n»Gedenke mein!«\n\nIch denke dein, bis wehende Zypressen\nMein Grab umziehn;\nUnd selbst in Lethe's Strom soll unvergessen\nDein Name blühn!\n\n[I.]\n\nIch denke dein, wenn über Roms Ruinen\nDie Sonne sinkt!\nVom Abendrot durch Eichengrün beschienen\nDie heil'ge Tiber blinkt!\n\nDein denk' ich, wenn der grauen Vorwelt Schauer\nDer Hall' entschwebt!\nDes Eppichs Netz an hoher Riesenmauer\nIm Mondstrahl silbern bebt!\n\nWenn in der Pinie ernstem Säulentempel\nMein Aug' erquickt,\nBetrachtung, Tiefsinn, euren hehren Stempel\nRings um sich her erblickt!\n\nDort an des Grabes ew'ger Pyramide\nWarst du mir nah!\nMir nah als ich Orest der Eumenide\nGeweiht, voll Wehmut sah!\n\nElectra's hoher Sinn, und Weibesmilde\nMich tief durchdrang!\nDes Griechen Geist mir aus dem Marmorbilde\nWie Saitenton erklang!\n\nIm Lorbeerwald, wo die Zypresse dunkelt,\nIm Myrtenhain\nWenn über mir des Himmels Bogen funkelt\nDenkt meine Seele Dein!\n\nAch dein, wenn über Tod, und Grab, und Erde,\nMein Geist sich schwingt!\nDes Schöpfers zweiter Allmachtsruf es werde\nAuch meine Gruft durchdringt.\n\nWenn Nemesis, was strenge du gefordert\nIst abgebüßt -\nUnd Psyche, der nicht mehr die Fackel lodert,\nVergelterin dich grüßt!",
    "canonicalText": null,
    "userStanzas": [
      "[II.]",
      "Ich denke dein, wenn sich im Blütenregen\nDer Frühling malt;\nUnd wenn des Sommers mild gereifter Segen\nIn Ähren strahlt.",
      "Ich denke dein, wenn sich das Weltmeer tönend\nGen Himmel hebt,\nUnd vor der Wogen Wut das Ufer stöhnend\nZurückebebt.",
      "Dein denk' ich, wenn der junge Tag sich golden\nDer See enthebt,\nAn neugebornen zarten Blumendolden\nDer Frühtau schwebt.",
      "Ich denke dein, wenn sich der Abend rötend\nIm Hain verliert,\nUnd Philomelens Klage leise flötend\nDie Seele rührt.",
      "Dein denk' ich, wenn im bunten Blätterkranze\nDer Herbst uns grüsst;\nDein, wenn, in seines Schneegewandes Glanze,\nDas Jahr sich schliesst.",
      "Am Hainquell, ach! im leichten Erlenschatten\nWinkt mir dein Bild!\nSchnell ist der Wald, schnell sind die Blumenmatten\nMit Glanz erfüllt.",
      "Beim trüben Lampenschein, in bittern Leiden,\nGedacht' ich dein!\nDie bange Seele flehte nah' am Scheiden:\n»Gedenke mein!«",
      "Ich denke dein, bis wehende Zypressen\nMein Grab umziehn;\nUnd selbst in Lethe's Strom soll unvergessen\nDein Name blühn!",
      "[I.]",
      "Ich denke dein, wenn über Roms Ruinen\nDie Sonne sinkt!\nVom Abendrot durch Eichengrün beschienen\nDie heil'ge Tiber blinkt!",
      "Dein denk' ich, wenn der grauen Vorwelt Schauer\nDer Hall' entschwebt!\nDes Eppichs Netz an hoher Riesenmauer\nIm Mondstrahl silbern bebt!",
      "Wenn in der Pinie ernstem Säulentempel\nMein Aug' erquickt,\nBetrachtung, Tiefsinn, euren hehren Stempel\nRings um sich her erblickt!",
      "Dort an des Grabes ew'ger Pyramide\nWarst du mir nah!\nMir nah als ich Orest der Eumenide\nGeweiht, voll Wehmut sah!",
      "Electra's hoher Sinn, und Weibesmilde\nMich tief durchdrang!\nDes Griechen Geist mir aus dem Marmorbilde\nWie Saitenton erklang!",
      "Im Lorbeerwald, wo die Zypresse dunkelt,\nIm Myrtenhain\nWenn über mir des Himmels Bogen funkelt\nDenkt meine Seele Dein!",
      "Ach dein, wenn über Tod, und Grab, und Erde,\nMein Geist sich schwingt!\nDes Schöpfers zweiter Allmachtsruf es werde\nAuch meine Gruft durchdringt.",
      "Wenn Nemesis, was strenge du gefordert\nIst abgebüßt -\nUnd Psyche, der nicht mehr die Fackel lodert,\nVergelterin dich grüßt!"
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "[II.]\n\nIch denke dein, wenn sich im Blütenregen\nDer Frühling malt;\nUnd wenn des Sommers mild gereifter Segen\nIn Ähren strahlt.\n\nIch denke dein, wenn sich das Weltmeer tönend\nGen Himmel hebt,\nUnd vor der Wogen Wut das Ufer stöhnend\nZurückebebt.\n\nDein denk' ich, wenn der junge Tag sich golden\nDer See enthebt,\nAn neugebornen zarten Blumendolden\nDer Frühtau schwebt.\n\nIch denke dein, wenn sich der Abend rötend\nIm Hain verliert,\nUnd Philomelens Klage leise flötend\nDie Seele rührt.\n\nDein denk' ich, wenn im bunten Blätterkranze\nDer Herbst uns grüsst;\nDein, wenn, in seines Schneegewandes Glanze,\nDas Jahr sich schliesst.\n\nAm Hainquell, ach! im leichten Erlenschatten\nWinkt mir dein Bild!\nSchnell ist der Wald, schnell sind die Blumenmatten\nMit Glanz erfüllt.\n\nBeim trüben Lampenschein, in bittern Leiden,\nGedacht' ich dein!\nDie bange Seele flehte nah' am Scheiden:\n»Gedenke mein!«\n\nIch denke dein, bis wehende Zypressen\nMein Grab umziehn;\nUnd selbst in Lethe's Strom soll unvergessen\nDein Name blühn!\n\n[I.]\n\nIch denke dein, wenn über Roms Ruinen\nDie Sonne sinkt!\nVom Abendrot durch Eichengrün beschienen\nDie heil'ge Tiber blinkt!\n\nDein denk' ich, wenn der grauen Vorwelt Schauer\nDer Hall' entschwebt!\nDes Eppichs Netz an hoher Riesenmauer\nIm Mondstrahl silbern bebt!\n\nWenn in der Pinie ernstem Säulentempel\nMein Aug' erquickt,\nBetrachtung, Tiefsinn, euren hehren Stempel\nRings um sich her erblickt!\n\nDort an des Grabes ew'ger Pyramide\nWarst du mir nah!\nMir nah als ich Orest der Eumenide\nGeweiht, voll Wehmut sah!\n\nElectra's hoher Sinn, und Weibesmilde\nMich tief durchdrang!\nDes Griechen Geist mir aus dem Marmorbilde\nWie Saitenton erklang!\n\nIm Lorbeerwald, wo die Zypresse dunkelt,\nIm Myrtenhain\nWenn über mir des Himmels Bogen funkelt\nDenkt meine Seele Dein!\n\nAch dein, wenn über Tod, und Grab, und Erde,\nMein Geist sich schwingt!\nDes Schöpfers zweiter Allmachtsruf es werde\nAuch meine Gruft durchdringt.\n\nWenn Nemesis, was strenge du gefordert\nIst abgebüßt -\nUnd Psyche, der nicht mehr die Fackel lodert,\nVergelterin dich grüßt!",
    "stanzas": [
      "[II.]",
      "Ich denke dein, wenn sich im Blütenregen\nDer Frühling malt;\nUnd wenn des Sommers mild gereifter Segen\nIn Ähren strahlt.",
      "Ich denke dein, wenn sich das Weltmeer tönend\nGen Himmel hebt,\nUnd vor der Wogen Wut das Ufer stöhnend\nZurückebebt.",
      "Dein denk' ich, wenn der junge Tag sich golden\nDer See enthebt,\nAn neugebornen zarten Blumendolden\nDer Frühtau schwebt.",
      "Ich denke dein, wenn sich der Abend rötend\nIm Hain verliert,\nUnd Philomelens Klage leise flötend\nDie Seele rührt.",
      "Dein denk' ich, wenn im bunten Blätterkranze\nDer Herbst uns grüsst;\nDein, wenn, in seines Schneegewandes Glanze,\nDas Jahr sich schliesst.",
      "Am Hainquell, ach! im leichten Erlenschatten\nWinkt mir dein Bild!\nSchnell ist der Wald, schnell sind die Blumenmatten\nMit Glanz erfüllt.",
      "Beim trüben Lampenschein, in bittern Leiden,\nGedacht' ich dein!\nDie bange Seele flehte nah' am Scheiden:\n»Gedenke mein!«",
      "Ich denke dein, bis wehende Zypressen\nMein Grab umziehn;\nUnd selbst in Lethe's Strom soll unvergessen\nDein Name blühn!",
      "[I.]",
      "Ich denke dein, wenn über Roms Ruinen\nDie Sonne sinkt!\nVom Abendrot durch Eichengrün beschienen\nDie heil'ge Tiber blinkt!",
      "Dein denk' ich, wenn der grauen Vorwelt Schauer\nDer Hall' entschwebt!\nDes Eppichs Netz an hoher Riesenmauer\nIm Mondstrahl silbern bebt!",
      "Wenn in der Pinie ernstem Säulentempel\nMein Aug' erquickt,\nBetrachtung, Tiefsinn, euren hehren Stempel\nRings um sich her erblickt!",
      "Dort an des Grabes ew'ger Pyramide\nWarst du mir nah!\nMir nah als ich Orest der Eumenide\nGeweiht, voll Wehmut sah!",
      "Electra's hoher Sinn, und Weibesmilde\nMich tief durchdrang!\nDes Griechen Geist mir aus dem Marmorbilde\nWie Saitenton erklang!",
      "Im Lorbeerwald, wo die Zypresse dunkelt,\nIm Myrtenhain\nWenn über mir des Himmels Bogen funkelt\nDenkt meine Seele Dein!",
      "Ach dein, wenn über Tod, und Grab, und Erde,\nMein Geist sich schwingt!\nDes Schöpfers zweiter Allmachtsruf es werde\nAuch meine Gruft durchdringt.",
      "Wenn Nemesis, was strenge du gefordert\nIst abgebüßt -\nUnd Psyche, der nicht mehr die Fackel lodert,\nVergelterin dich grüßt!"
    ],
    "verseCount": 66,
    "stanzaCount": 18,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Ich denke dein",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-04-liebeslied",
    "title": "Liebeslied",
    "author": "Christian Morgenstern",
    "year": 1905,
    "userText": "Ich bin eine Harfe\nMit goldenen Saiten,\nAuf einsamem Gipfel\nÜber die Fluren\nErhöht.\nDu lass die Finger leise\nUnd sanft darübergleiten,\nUnd Melodien werden\nAufraunen und aufrauschen,\nWie nie noch Menschen hörten.\nDas wird ein heilig Klingen\nÜber den Landen sein.\nIch bin eine Harfe\nMit goldenen Saiten,\nAuf einsamem Gipfel\nÜber die Fluren\nErhöht,\nUnd harre Deiner,\nOh Priesterin!\nDass meine Geheimnisse\nAus mir brechen\nUnd meine Tiefen\nZu reden beginnen\nUnd wie ein Mantel\nMeine Töne\nUm Dich fallen -\nEin Purpurmantel\nDer Unsterblichkeit.",
    "canonicalText": null,
    "userStanzas": [
      "Ich bin eine Harfe\nMit goldenen Saiten,\nAuf einsamem Gipfel\nÜber die Fluren\nErhöht.\nDu lass die Finger leise\nUnd sanft darübergleiten,\nUnd Melodien werden\nAufraunen und aufrauschen,\nWie nie noch Menschen hörten.\nDas wird ein heilig Klingen\nÜber den Landen sein.\nIch bin eine Harfe\nMit goldenen Saiten,\nAuf einsamem Gipfel\nÜber die Fluren\nErhöht,\nUnd harre Deiner,\nOh Priesterin!\nDass meine Geheimnisse\nAus mir brechen\nUnd meine Tiefen\nZu reden beginnen\nUnd wie ein Mantel\nMeine Töne\nUm Dich fallen -\nEin Purpurmantel\nDer Unsterblichkeit."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Ich bin eine Harfe\nMit goldenen Saiten,\nAuf einsamem Gipfel\nÜber die Fluren\nErhöht.\nDu lass die Finger leise\nUnd sanft darübergleiten,\nUnd Melodien werden\nAufraunen und aufrauschen,\nWie nie noch Menschen hörten.\nDas wird ein heilig Klingen\nÜber den Landen sein.\nIch bin eine Harfe\nMit goldenen Saiten,\nAuf einsamem Gipfel\nÜber die Fluren\nErhöht,\nUnd harre Deiner,\nOh Priesterin!\nDass meine Geheimnisse\nAus mir brechen\nUnd meine Tiefen\nZu reden beginnen\nUnd wie ein Mantel\nMeine Töne\nUm Dich fallen -\nEin Purpurmantel\nDer Unsterblichkeit.",
    "stanzas": [
      "Ich bin eine Harfe\nMit goldenen Saiten,\nAuf einsamem Gipfel\nÜber die Fluren\nErhöht.\nDu lass die Finger leise\nUnd sanft darübergleiten,\nUnd Melodien werden\nAufraunen und aufrauschen,\nWie nie noch Menschen hörten.\nDas wird ein heilig Klingen\nÜber den Landen sein.\nIch bin eine Harfe\nMit goldenen Saiten,\nAuf einsamem Gipfel\nÜber die Fluren\nErhöht,\nUnd harre Deiner,\nOh Priesterin!\nDass meine Geheimnisse\nAus mir brechen\nUnd meine Tiefen\nZu reden beginnen\nUnd wie ein Mantel\nMeine Töne\nUm Dich fallen -\nEin Purpurmantel\nDer Unsterblichkeit."
    ],
    "verseCount": 28,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Liebeslied",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-05-nahe-des-geliebten",
    "title": "Nähe des Geliebten",
    "author": "Johann Wolfgang von Goethe",
    "year": 1795,
    "userText": "Ich denke dein, wenn mir der Sonne Schimmer\nVom Meere strahlt;\nIch denke dein, wenn sich des Mondes Flimmer\nIn Quellen malt.\n\nIch sehe dich, wenn auf dem fernen Wege\nDer Staub sich hebt;\nIn tiefer Nacht, wenn auf dem schmalen Stege\nDer Wandrer bebt.\n\nIch höre dich, wenn dort mit dumpfem Rauschen\nDie Welle steigt.\nIm stillen Hain da geh ich oft zu lauschen,\nWenn alles schweigt.\n\nIch bin bei dir, du seist auch noch so ferne.\nDu bist mir nah!\nDie Sonne sinkt, bald leuchten mir die Sterne.\nO wärst du da!",
    "canonicalText": null,
    "userStanzas": [
      "Ich denke dein, wenn mir der Sonne Schimmer\nVom Meere strahlt;\nIch denke dein, wenn sich des Mondes Flimmer\nIn Quellen malt.",
      "Ich sehe dich, wenn auf dem fernen Wege\nDer Staub sich hebt;\nIn tiefer Nacht, wenn auf dem schmalen Stege\nDer Wandrer bebt.",
      "Ich höre dich, wenn dort mit dumpfem Rauschen\nDie Welle steigt.\nIm stillen Hain da geh ich oft zu lauschen,\nWenn alles schweigt.",
      "Ich bin bei dir, du seist auch noch so ferne.\nDu bist mir nah!\nDie Sonne sinkt, bald leuchten mir die Sterne.\nO wärst du da!"
    ],
    "canonicalStanzas": [],
    "collationStatus": "unresolved",
    "productionText": null,
    "text": "Ich denke dein, wenn mir der Sonne Schimmer\nVom Meere strahlt;\nIch denke dein, wenn sich des Mondes Flimmer\nIn Quellen malt.\n\nIch sehe dich, wenn auf dem fernen Wege\nDer Staub sich hebt;\nIn tiefer Nacht, wenn auf dem schmalen Stege\nDer Wandrer bebt.\n\nIch höre dich, wenn dort mit dumpfem Rauschen\nDie Welle steigt.\nIm stillen Hain da geh ich oft zu lauschen,\nWenn alles schweigt.\n\nIch bin bei dir, du seist auch noch so ferne.\nDu bist mir nah!\nDie Sonne sinkt, bald leuchten mir die Sterne.\nO wärst du da!",
    "stanzas": [
      "Ich denke dein, wenn mir der Sonne Schimmer\nVom Meere strahlt;\nIch denke dein, wenn sich des Mondes Flimmer\nIn Quellen malt.",
      "Ich sehe dich, wenn auf dem fernen Wege\nDer Staub sich hebt;\nIn tiefer Nacht, wenn auf dem schmalen Stege\nDer Wandrer bebt.",
      "Ich höre dich, wenn dort mit dumpfem Rauschen\nDie Welle steigt.\nIm stillen Hain da geh ich oft zu lauschen,\nWenn alles schweigt.",
      "Ich bin bei dir, du seist auch noch so ferne.\nDu bist mir nah!\nDie Sonne sinkt, bald leuchten mir die Sterne.\nO wärst du da!"
    ],
    "verseCount": 16,
    "stanzaCount": 4,
    "stanzaVerification": "verified",
    "stanzaStructureStatus": "verified",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "variant-unresolved",
      "sourceTitle": "Nähe des Geliebten (1827)",
      "sourceInstitution": "Wikisource / Cotta-Digitalisat",
      "sourceUrl": "https://de.wikisource.org/wiki/N%C3%A4he_des_Geliebten_%281827%29",
      "editionYear": 1827,
      "editionDetails": "Goethe's Werke. Vollständige Ausgabe letzter Hand, Cotta",
      "checkedAt": "2026-09-12",
      "notes": "Abweichungen bei mahlt/malt, Haine/Hain und seyst/seist.",
      "baseEdition": {
        "title": "Nähe des Geliebten (1827)",
        "editorOrPublisher": "Wikisource / Cotta-Digitalisat",
        "publicationYear": 1827,
        "place": null,
        "volume": null,
        "pages": "Goethe's Werke. Vollständige Ausgabe letzter Hand, Cotta",
        "digitalSource": "Wikisource / Cotta-Digitalisat",
        "sourceUrl": "https://de.wikisource.org/wiki/N%C3%A4he_des_Geliebten_%281827%29",
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [
      {
        "userReading": "malt / Hain / seist",
        "verifiedReading": "mahlt / Haine / seyst",
        "location": "Verse 2, 10 und 15",
        "source": "Goethe-Ausgabe letzter Hand, 1827",
        "decision": "unresolved",
        "reason": "Historische Editionslesarten weichen ab.",
        "canonicalReading": "mahlt / Haine / seyst",
        "differenceType": "orthography",
        "explanation": "Historische Editionslesarten weichen ab."
      }
    ],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "songLike",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": false,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Nähe des Geliebten",
    "baseEditionTitle": "Nähe des Geliebten (1827)",
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-06-von-der-liebe",
    "title": "Von der Liebe",
    "author": "Khalil Gibran",
    "year": 1923,
    "userText": "Wenn die Liebe dir winkt, folge ihr, sind ihre Wege auch schwer und steil.\nUnd wenn ihre Flügel dich umhüllen, gib dich ihr hin,\nAuch wenn das unterm Gefieder versteckte Schwert dich verwunden kann.\nUnd wenn sie zu dir spricht, glaube an sie,\nauch wenn ihre Stimme deine Träume zerschmettertn kann\nwie der Nordwind den Garten verwüstetet.\nDenn so, wie die Liebe dich krönt, kreuzigt sie dich.\nSo wie sie dich wachsen lässt, beschneidet sie dich.\nSo wie sie emporsteigt zu deinen Höhen\nund die zartesten Zweige liebkost, die in der Sonne zittern,\nsteigt sie hinab zu deinen Wurzeln\nund erschüttert sie in Ihrer Erdgebundenheit.\nWie Korngarben sammelt sie dich um sich.\nSie drischt dich, um dich nackt zu machen.\nSie siebt dich, um dich von deiner Spreu zu befreien.\nSie mahlt dich, bis du weiß bist.\nSie knetet dich, bis du geschmeidig bist;\nUnd dann weiht sie dich ihrem heiligem Feuer,\ndamit du heiliges Brot wirst für Gottes heiliges Mahl.\nAll dies wird die Liebe mit dir machen,\ndamit du die Geheimnisse deines Herzens kennenlernst\nund in diesem Wissen ein Teil vom Herzen des Lebens wirst.\nAber wenn du in deiner Angst nur die Ruhe und die Lust der Liebe suchst,\ndann ist es besser für dich, deine Nacktheit zu bedecken\nund vom Dreschboden der Liebe zu gehen.\nIn die Welt ohne Jahreszeiten,\nwo du lachen wirst, aber nicht dein ganzes Lachen,\nund weinen, aber nicht all deine Tränen.\nLiebe gibt nichts als sich selbst und nimmt nichts als von sich selbst.\nLiebe besitzt nicht, noch läßt sie sich besitzen;\nDenn die Liebe genügt der Liebe.\nUnd glaube nicht, du kannst den Lauf der Liebe lenken,\ndenn die Liebe, wenn sie dich für würdig hält, lenkt deinen Lauf.\nLiebe hat keinen anderen Wunsch, als sich zu erfüllen.\nAber wenn du liebst und Wünsche haben mußt, sollst du dir dies wünschen:\nZu schmelzen und wie ein plätschernder Bach zu sein,\nder seine Melodie der Nacht singt.\nDen Schmerz allzu vieler Zärtlichkeit zu kennen.\nVom eigenen Verstehen der Liebe verwundet zu sein;\nUnd willig und freudig zu bluten.\nBei der Morgenröte\nmit beflügeltem Herzen zu erwachen\nund für einen weiteren Tag des Liebens dankzusagen;\nZur Mittagszeit zu ruhen\nund über die Verzückung der Liebe nachzusinnen;\nAm Abend mit Dankbarkeit heimzukehren;\nUnd dann einzuschlafen\nmit einem Gebet für den Geliebten im Herzen\nund einem Lobgesang auf den Lippen.",
    "canonicalText": null,
    "userStanzas": [
      "Wenn die Liebe dir winkt, folge ihr, sind ihre Wege auch schwer und steil.\nUnd wenn ihre Flügel dich umhüllen, gib dich ihr hin,\nAuch wenn das unterm Gefieder versteckte Schwert dich verwunden kann.\nUnd wenn sie zu dir spricht, glaube an sie,\nauch wenn ihre Stimme deine Träume zerschmettertn kann\nwie der Nordwind den Garten verwüstetet.\nDenn so, wie die Liebe dich krönt, kreuzigt sie dich.\nSo wie sie dich wachsen lässt, beschneidet sie dich.\nSo wie sie emporsteigt zu deinen Höhen\nund die zartesten Zweige liebkost, die in der Sonne zittern,\nsteigt sie hinab zu deinen Wurzeln\nund erschüttert sie in Ihrer Erdgebundenheit.\nWie Korngarben sammelt sie dich um sich.\nSie drischt dich, um dich nackt zu machen.\nSie siebt dich, um dich von deiner Spreu zu befreien.\nSie mahlt dich, bis du weiß bist.\nSie knetet dich, bis du geschmeidig bist;\nUnd dann weiht sie dich ihrem heiligem Feuer,\ndamit du heiliges Brot wirst für Gottes heiliges Mahl.\nAll dies wird die Liebe mit dir machen,\ndamit du die Geheimnisse deines Herzens kennenlernst\nund in diesem Wissen ein Teil vom Herzen des Lebens wirst.\nAber wenn du in deiner Angst nur die Ruhe und die Lust der Liebe suchst,\ndann ist es besser für dich, deine Nacktheit zu bedecken\nund vom Dreschboden der Liebe zu gehen.\nIn die Welt ohne Jahreszeiten,\nwo du lachen wirst, aber nicht dein ganzes Lachen,\nund weinen, aber nicht all deine Tränen.\nLiebe gibt nichts als sich selbst und nimmt nichts als von sich selbst.\nLiebe besitzt nicht, noch läßt sie sich besitzen;\nDenn die Liebe genügt der Liebe.\nUnd glaube nicht, du kannst den Lauf der Liebe lenken,\ndenn die Liebe, wenn sie dich für würdig hält, lenkt deinen Lauf.\nLiebe hat keinen anderen Wunsch, als sich zu erfüllen.\nAber wenn du liebst und Wünsche haben mußt, sollst du dir dies wünschen:\nZu schmelzen und wie ein plätschernder Bach zu sein,\nder seine Melodie der Nacht singt.\nDen Schmerz allzu vieler Zärtlichkeit zu kennen.\nVom eigenen Verstehen der Liebe verwundet zu sein;\nUnd willig und freudig zu bluten.\nBei der Morgenröte\nmit beflügeltem Herzen zu erwachen\nund für einen weiteren Tag des Liebens dankzusagen;\nZur Mittagszeit zu ruhen\nund über die Verzückung der Liebe nachzusinnen;\nAm Abend mit Dankbarkeit heimzukehren;\nUnd dann einzuschlafen\nmit einem Gebet für den Geliebten im Herzen\nund einem Lobgesang auf den Lippen."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Wenn die Liebe dir winkt, folge ihr, sind ihre Wege auch schwer und steil.\nUnd wenn ihre Flügel dich umhüllen, gib dich ihr hin,\nAuch wenn das unterm Gefieder versteckte Schwert dich verwunden kann.\nUnd wenn sie zu dir spricht, glaube an sie,\nauch wenn ihre Stimme deine Träume zerschmettertn kann\nwie der Nordwind den Garten verwüstetet.\nDenn so, wie die Liebe dich krönt, kreuzigt sie dich.\nSo wie sie dich wachsen lässt, beschneidet sie dich.\nSo wie sie emporsteigt zu deinen Höhen\nund die zartesten Zweige liebkost, die in der Sonne zittern,\nsteigt sie hinab zu deinen Wurzeln\nund erschüttert sie in Ihrer Erdgebundenheit.\nWie Korngarben sammelt sie dich um sich.\nSie drischt dich, um dich nackt zu machen.\nSie siebt dich, um dich von deiner Spreu zu befreien.\nSie mahlt dich, bis du weiß bist.\nSie knetet dich, bis du geschmeidig bist;\nUnd dann weiht sie dich ihrem heiligem Feuer,\ndamit du heiliges Brot wirst für Gottes heiliges Mahl.\nAll dies wird die Liebe mit dir machen,\ndamit du die Geheimnisse deines Herzens kennenlernst\nund in diesem Wissen ein Teil vom Herzen des Lebens wirst.\nAber wenn du in deiner Angst nur die Ruhe und die Lust der Liebe suchst,\ndann ist es besser für dich, deine Nacktheit zu bedecken\nund vom Dreschboden der Liebe zu gehen.\nIn die Welt ohne Jahreszeiten,\nwo du lachen wirst, aber nicht dein ganzes Lachen,\nund weinen, aber nicht all deine Tränen.\nLiebe gibt nichts als sich selbst und nimmt nichts als von sich selbst.\nLiebe besitzt nicht, noch läßt sie sich besitzen;\nDenn die Liebe genügt der Liebe.\nUnd glaube nicht, du kannst den Lauf der Liebe lenken,\ndenn die Liebe, wenn sie dich für würdig hält, lenkt deinen Lauf.\nLiebe hat keinen anderen Wunsch, als sich zu erfüllen.\nAber wenn du liebst und Wünsche haben mußt, sollst du dir dies wünschen:\nZu schmelzen und wie ein plätschernder Bach zu sein,\nder seine Melodie der Nacht singt.\nDen Schmerz allzu vieler Zärtlichkeit zu kennen.\nVom eigenen Verstehen der Liebe verwundet zu sein;\nUnd willig und freudig zu bluten.\nBei der Morgenröte\nmit beflügeltem Herzen zu erwachen\nund für einen weiteren Tag des Liebens dankzusagen;\nZur Mittagszeit zu ruhen\nund über die Verzückung der Liebe nachzusinnen;\nAm Abend mit Dankbarkeit heimzukehren;\nUnd dann einzuschlafen\nmit einem Gebet für den Geliebten im Herzen\nund einem Lobgesang auf den Lippen.",
    "stanzas": [
      "Wenn die Liebe dir winkt, folge ihr, sind ihre Wege auch schwer und steil.\nUnd wenn ihre Flügel dich umhüllen, gib dich ihr hin,\nAuch wenn das unterm Gefieder versteckte Schwert dich verwunden kann.\nUnd wenn sie zu dir spricht, glaube an sie,\nauch wenn ihre Stimme deine Träume zerschmettertn kann\nwie der Nordwind den Garten verwüstetet.\nDenn so, wie die Liebe dich krönt, kreuzigt sie dich.\nSo wie sie dich wachsen lässt, beschneidet sie dich.\nSo wie sie emporsteigt zu deinen Höhen\nund die zartesten Zweige liebkost, die in der Sonne zittern,\nsteigt sie hinab zu deinen Wurzeln\nund erschüttert sie in Ihrer Erdgebundenheit.\nWie Korngarben sammelt sie dich um sich.\nSie drischt dich, um dich nackt zu machen.\nSie siebt dich, um dich von deiner Spreu zu befreien.\nSie mahlt dich, bis du weiß bist.\nSie knetet dich, bis du geschmeidig bist;\nUnd dann weiht sie dich ihrem heiligem Feuer,\ndamit du heiliges Brot wirst für Gottes heiliges Mahl.\nAll dies wird die Liebe mit dir machen,\ndamit du die Geheimnisse deines Herzens kennenlernst\nund in diesem Wissen ein Teil vom Herzen des Lebens wirst.\nAber wenn du in deiner Angst nur die Ruhe und die Lust der Liebe suchst,\ndann ist es besser für dich, deine Nacktheit zu bedecken\nund vom Dreschboden der Liebe zu gehen.\nIn die Welt ohne Jahreszeiten,\nwo du lachen wirst, aber nicht dein ganzes Lachen,\nund weinen, aber nicht all deine Tränen.\nLiebe gibt nichts als sich selbst und nimmt nichts als von sich selbst.\nLiebe besitzt nicht, noch läßt sie sich besitzen;\nDenn die Liebe genügt der Liebe.\nUnd glaube nicht, du kannst den Lauf der Liebe lenken,\ndenn die Liebe, wenn sie dich für würdig hält, lenkt deinen Lauf.\nLiebe hat keinen anderen Wunsch, als sich zu erfüllen.\nAber wenn du liebst und Wünsche haben mußt, sollst du dir dies wünschen:\nZu schmelzen und wie ein plätschernder Bach zu sein,\nder seine Melodie der Nacht singt.\nDen Schmerz allzu vieler Zärtlichkeit zu kennen.\nVom eigenen Verstehen der Liebe verwundet zu sein;\nUnd willig und freudig zu bluten.\nBei der Morgenröte\nmit beflügeltem Herzen zu erwachen\nund für einen weiteren Tag des Liebens dankzusagen;\nZur Mittagszeit zu ruhen\nund über die Verzückung der Liebe nachzusinnen;\nAm Abend mit Dankbarkeit heimzukehren;\nUnd dann einzuschlafen\nmit einem Gebet für den Geliebten im Herzen\nund einem Lobgesang auf den Lippen."
    ],
    "verseCount": 49,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "rights-blocked",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Deutsche Übersetzung und Textfassung vor Nutzung rechtlich prüfen.",
    "rightsStatus": "translation-review-required",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "rights-blocked",
    "canonicalDisplayTitle": "Von der Liebe",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-07-ich-liebe-dich",
    "title": "Ich liebe dich",
    "author": "Else Lasker-Schüler",
    "year": 1910,
    "userText": "Ich liebe dich\nUnd finde dich\nWenn auch der Tag ganz dunkel wird.\n\nMein Lebelang\nUnd immer noch\nBin suchend ich umhergeirrt.\n\nIch liebe dich!\nIch liebe dich!\nIch liebe dich!\n\nEs öffnen deine Lippen sich …\nDie Welt ist taub,\nDie Welt ist blind\n\nUnd auch die Wolke\nUnd das Laub -\n- Nur wir, der goldene Staub\nAus dem wir zwei bereitet:\n\n- Sind!",
    "canonicalText": null,
    "userStanzas": [
      "Ich liebe dich\nUnd finde dich\nWenn auch der Tag ganz dunkel wird.",
      "Mein Lebelang\nUnd immer noch\nBin suchend ich umhergeirrt.",
      "Ich liebe dich!\nIch liebe dich!\nIch liebe dich!",
      "Es öffnen deine Lippen sich …\nDie Welt ist taub,\nDie Welt ist blind",
      "Und auch die Wolke\nUnd das Laub -\n- Nur wir, der goldene Staub\nAus dem wir zwei bereitet:",
      "- Sind!"
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Ich liebe dich\nUnd finde dich\nWenn auch der Tag ganz dunkel wird.\n\nMein Lebelang\nUnd immer noch\nBin suchend ich umhergeirrt.\n\nIch liebe dich!\nIch liebe dich!\nIch liebe dich!\n\nEs öffnen deine Lippen sich …\nDie Welt ist taub,\nDie Welt ist blind\n\nUnd auch die Wolke\nUnd das Laub -\n- Nur wir, der goldene Staub\nAus dem wir zwei bereitet:\n\n- Sind!",
    "stanzas": [
      "Ich liebe dich\nUnd finde dich\nWenn auch der Tag ganz dunkel wird.",
      "Mein Lebelang\nUnd immer noch\nBin suchend ich umhergeirrt.",
      "Ich liebe dich!\nIch liebe dich!\nIch liebe dich!",
      "Es öffnen deine Lippen sich …\nDie Welt ist taub,\nDie Welt ist blind",
      "Und auch die Wolke\nUnd das Laub -\n- Nur wir, der goldene Staub\nAus dem wir zwei bereitet:",
      "- Sind!"
    ],
    "verseCount": 17,
    "stanzaCount": 6,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Ich liebe dich",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-08-liebe",
    "title": "Liebe",
    "author": "Karoline von Günderrode",
    "year": 1806,
    "userText": "O reiche Armuth! Gebend, seliges Empfangen!\nIn Zagheit Muth! in Freiheit doch gefangen.\nIn Stummheit Sprache,\nSchüchtern bei Tage,\nSiegend mit zaghaftem Bangen.\nLebendiger Tod, im Einen sel′ges Leben\nSchwelgend in Noth, im Widerstand ergeben,\nGenießend schmachten,\nNie satt betrachten\nLeben im Traum und doppelt Leben.",
    "canonicalText": null,
    "userStanzas": [
      "O reiche Armuth! Gebend, seliges Empfangen!\nIn Zagheit Muth! in Freiheit doch gefangen.\nIn Stummheit Sprache,\nSchüchtern bei Tage,\nSiegend mit zaghaftem Bangen.\nLebendiger Tod, im Einen sel′ges Leben\nSchwelgend in Noth, im Widerstand ergeben,\nGenießend schmachten,\nNie satt betrachten\nLeben im Traum und doppelt Leben."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "O reiche Armuth! Gebend, seliges Empfangen!\nIn Zagheit Muth! in Freiheit doch gefangen.\nIn Stummheit Sprache,\nSchüchtern bei Tage,\nSiegend mit zaghaftem Bangen.\nLebendiger Tod, im Einen sel′ges Leben\nSchwelgend in Noth, im Widerstand ergeben,\nGenießend schmachten,\nNie satt betrachten\nLeben im Traum und doppelt Leben.",
    "stanzas": [
      "O reiche Armuth! Gebend, seliges Empfangen!\nIn Zagheit Muth! in Freiheit doch gefangen.\nIn Stummheit Sprache,\nSchüchtern bei Tage,\nSiegend mit zaghaftem Bangen.\nLebendiger Tod, im Einen sel′ges Leben\nSchwelgend in Noth, im Widerstand ergeben,\nGenießend schmachten,\nNie satt betrachten\nLeben im Traum und doppelt Leben."
    ],
    "verseCount": 10,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Liebe",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-09-getrennte-liebe",
    "title": "Getrennte Liebe",
    "author": "Achim von Arnim",
    "year": 1803,
    "userText": "Zwei schöne, liebe Kinder,\nDie hatten sich so lieb,\nDaß eines dem andern im Winter\nMit Singen die Zeit vertrieb,\nDiesseit und jenseit am Wasserfall\nHöret ihr immer den Doppelschall.\nDer Winter bauet Brücken,\nSie beide hat vereint,\nUnd jedes mit frohem Entzücken\nDie Brücke nun ewig meint;\nDiesseit und jenseit am Wasserfall\nWohnen die Eltern getrennt im Tal.\nDer Frühling ist gekommen,\nDas Eis will nun aufgehn,\nDa werden sie beide beklommen,\nDie laulichen Winde wehn;\nDiesseit und jenseit am Wasserfall\nStürzen die Bäche mit wildem Schall.\nWas hilft der helle Bogen,\nWomit der Fall entzückt,\nVon ihnen so liebreich erzogen,\nZum erstenmal bunt geschmückt?\nDiesseit und jenseit am Wasserfall\nHöret sie klagen getrennt im Tal.\nDie Vögel über fliegen,\nDie Kinder traurig stehn\nUnd müssen sich einsam begnügen\nEinander von fern zu sehn;\nDiesseit und jenseit am Wasserfall\nKreuzen die Schwalben mit lautem Schall.\nSie möchten zusammen mit Singen\nSo wie der Vögel Brut\nDen himmlischen Frühling verbringen,\nDas Scheiden so wehe tut;\nDiesseit und jenseit am Wasserfall\nSehn sie sich endlich zum letztenmal.\nDer Knabe kriegt zur Freude\nEin Röckchen wie ein Mann,\nDas Mädchen ein Kleidchen von Seide,\nNun gehet die Schule an;\nDiesseit und jenseit am Wasserfall\nGehn sie zum Kloster bei Glockenschall.\nSie sahn sich lang nicht wieder,\nSie kannten sich nicht mehr,\nDas Mädchen mit vollem Mieder,\nDer Knabe ein Mönch schon wär′;\nDiesseit und jenseit am Wasserfall\nKamen und riefen sie sich im Tal.\nDas Mädchen ruft so helle.\nDer Knabe singt so tief;\nVerstehen sich endlich doch schnelle,\nAls alles im Hause schlief;\nDiesseit und jenseit am Wasserfall\nSpringen im Mondschein die Fische all′.\nFroh in der nächt′gen Frische\nSie kühlen sich im Fluß,\nSie können nicht schwimmen wie Fische\nUnd suchen sich doch zum Kuß;\nDiesseit und jenseit am Wasserfall\nReißen die Strudel sie fort mit Schall.\nDie Eltern hören singen\nUnd schaun aus hohem Haus,\nZwei Schwäne im Steinenschein ringen\nZum Dampfe des Falls hinaus;\nDiesseit und jenseit am Wasserfall\nHören sie Echo mit lautem Schall.\nDie Schwäne herrlich sangen\nIhr letztes schönstes Lied,\nUnd leuchtende Wölkchen hangen,\nManch Engelein niedersieht;\nDiesseit und jenseit am Wasserfall\nSchwebet wie Blüte ein süßer Schall.\nDer Mond sieht aus dem Bette\nDes glatten Falls empor,\nDie Nacht mit der Blumenkette\nErhebet zu sich dies Chor;\nDiesseit und jenseit am Wasserfall\nGrünt es von Tränen nun Überall.",
    "canonicalText": null,
    "userStanzas": [
      "Zwei schöne, liebe Kinder,\nDie hatten sich so lieb,\nDaß eines dem andern im Winter\nMit Singen die Zeit vertrieb,\nDiesseit und jenseit am Wasserfall\nHöret ihr immer den Doppelschall.\nDer Winter bauet Brücken,\nSie beide hat vereint,\nUnd jedes mit frohem Entzücken\nDie Brücke nun ewig meint;\nDiesseit und jenseit am Wasserfall\nWohnen die Eltern getrennt im Tal.\nDer Frühling ist gekommen,\nDas Eis will nun aufgehn,\nDa werden sie beide beklommen,\nDie laulichen Winde wehn;\nDiesseit und jenseit am Wasserfall\nStürzen die Bäche mit wildem Schall.\nWas hilft der helle Bogen,\nWomit der Fall entzückt,\nVon ihnen so liebreich erzogen,\nZum erstenmal bunt geschmückt?\nDiesseit und jenseit am Wasserfall\nHöret sie klagen getrennt im Tal.\nDie Vögel über fliegen,\nDie Kinder traurig stehn\nUnd müssen sich einsam begnügen\nEinander von fern zu sehn;\nDiesseit und jenseit am Wasserfall\nKreuzen die Schwalben mit lautem Schall.\nSie möchten zusammen mit Singen\nSo wie der Vögel Brut\nDen himmlischen Frühling verbringen,\nDas Scheiden so wehe tut;\nDiesseit und jenseit am Wasserfall\nSehn sie sich endlich zum letztenmal.\nDer Knabe kriegt zur Freude\nEin Röckchen wie ein Mann,\nDas Mädchen ein Kleidchen von Seide,\nNun gehet die Schule an;\nDiesseit und jenseit am Wasserfall\nGehn sie zum Kloster bei Glockenschall.\nSie sahn sich lang nicht wieder,\nSie kannten sich nicht mehr,\nDas Mädchen mit vollem Mieder,\nDer Knabe ein Mönch schon wär′;\nDiesseit und jenseit am Wasserfall\nKamen und riefen sie sich im Tal.\nDas Mädchen ruft so helle.\nDer Knabe singt so tief;\nVerstehen sich endlich doch schnelle,\nAls alles im Hause schlief;\nDiesseit und jenseit am Wasserfall\nSpringen im Mondschein die Fische all′.\nFroh in der nächt′gen Frische\nSie kühlen sich im Fluß,\nSie können nicht schwimmen wie Fische\nUnd suchen sich doch zum Kuß;\nDiesseit und jenseit am Wasserfall\nReißen die Strudel sie fort mit Schall.\nDie Eltern hören singen\nUnd schaun aus hohem Haus,\nZwei Schwäne im Steinenschein ringen\nZum Dampfe des Falls hinaus;\nDiesseit und jenseit am Wasserfall\nHören sie Echo mit lautem Schall.\nDie Schwäne herrlich sangen\nIhr letztes schönstes Lied,\nUnd leuchtende Wölkchen hangen,\nManch Engelein niedersieht;\nDiesseit und jenseit am Wasserfall\nSchwebet wie Blüte ein süßer Schall.\nDer Mond sieht aus dem Bette\nDes glatten Falls empor,\nDie Nacht mit der Blumenkette\nErhebet zu sich dies Chor;\nDiesseit und jenseit am Wasserfall\nGrünt es von Tränen nun Überall."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Zwei schöne, liebe Kinder,\nDie hatten sich so lieb,\nDaß eines dem andern im Winter\nMit Singen die Zeit vertrieb,\nDiesseit und jenseit am Wasserfall\nHöret ihr immer den Doppelschall.\nDer Winter bauet Brücken,\nSie beide hat vereint,\nUnd jedes mit frohem Entzücken\nDie Brücke nun ewig meint;\nDiesseit und jenseit am Wasserfall\nWohnen die Eltern getrennt im Tal.\nDer Frühling ist gekommen,\nDas Eis will nun aufgehn,\nDa werden sie beide beklommen,\nDie laulichen Winde wehn;\nDiesseit und jenseit am Wasserfall\nStürzen die Bäche mit wildem Schall.\nWas hilft der helle Bogen,\nWomit der Fall entzückt,\nVon ihnen so liebreich erzogen,\nZum erstenmal bunt geschmückt?\nDiesseit und jenseit am Wasserfall\nHöret sie klagen getrennt im Tal.\nDie Vögel über fliegen,\nDie Kinder traurig stehn\nUnd müssen sich einsam begnügen\nEinander von fern zu sehn;\nDiesseit und jenseit am Wasserfall\nKreuzen die Schwalben mit lautem Schall.\nSie möchten zusammen mit Singen\nSo wie der Vögel Brut\nDen himmlischen Frühling verbringen,\nDas Scheiden so wehe tut;\nDiesseit und jenseit am Wasserfall\nSehn sie sich endlich zum letztenmal.\nDer Knabe kriegt zur Freude\nEin Röckchen wie ein Mann,\nDas Mädchen ein Kleidchen von Seide,\nNun gehet die Schule an;\nDiesseit und jenseit am Wasserfall\nGehn sie zum Kloster bei Glockenschall.\nSie sahn sich lang nicht wieder,\nSie kannten sich nicht mehr,\nDas Mädchen mit vollem Mieder,\nDer Knabe ein Mönch schon wär′;\nDiesseit und jenseit am Wasserfall\nKamen und riefen sie sich im Tal.\nDas Mädchen ruft so helle.\nDer Knabe singt so tief;\nVerstehen sich endlich doch schnelle,\nAls alles im Hause schlief;\nDiesseit und jenseit am Wasserfall\nSpringen im Mondschein die Fische all′.\nFroh in der nächt′gen Frische\nSie kühlen sich im Fluß,\nSie können nicht schwimmen wie Fische\nUnd suchen sich doch zum Kuß;\nDiesseit und jenseit am Wasserfall\nReißen die Strudel sie fort mit Schall.\nDie Eltern hören singen\nUnd schaun aus hohem Haus,\nZwei Schwäne im Steinenschein ringen\nZum Dampfe des Falls hinaus;\nDiesseit und jenseit am Wasserfall\nHören sie Echo mit lautem Schall.\nDie Schwäne herrlich sangen\nIhr letztes schönstes Lied,\nUnd leuchtende Wölkchen hangen,\nManch Engelein niedersieht;\nDiesseit und jenseit am Wasserfall\nSchwebet wie Blüte ein süßer Schall.\nDer Mond sieht aus dem Bette\nDes glatten Falls empor,\nDie Nacht mit der Blumenkette\nErhebet zu sich dies Chor;\nDiesseit und jenseit am Wasserfall\nGrünt es von Tränen nun Überall.",
    "stanzas": [
      "Zwei schöne, liebe Kinder,\nDie hatten sich so lieb,\nDaß eines dem andern im Winter\nMit Singen die Zeit vertrieb,\nDiesseit und jenseit am Wasserfall\nHöret ihr immer den Doppelschall.\nDer Winter bauet Brücken,\nSie beide hat vereint,\nUnd jedes mit frohem Entzücken\nDie Brücke nun ewig meint;\nDiesseit und jenseit am Wasserfall\nWohnen die Eltern getrennt im Tal.\nDer Frühling ist gekommen,\nDas Eis will nun aufgehn,\nDa werden sie beide beklommen,\nDie laulichen Winde wehn;\nDiesseit und jenseit am Wasserfall\nStürzen die Bäche mit wildem Schall.\nWas hilft der helle Bogen,\nWomit der Fall entzückt,\nVon ihnen so liebreich erzogen,\nZum erstenmal bunt geschmückt?\nDiesseit und jenseit am Wasserfall\nHöret sie klagen getrennt im Tal.\nDie Vögel über fliegen,\nDie Kinder traurig stehn\nUnd müssen sich einsam begnügen\nEinander von fern zu sehn;\nDiesseit und jenseit am Wasserfall\nKreuzen die Schwalben mit lautem Schall.\nSie möchten zusammen mit Singen\nSo wie der Vögel Brut\nDen himmlischen Frühling verbringen,\nDas Scheiden so wehe tut;\nDiesseit und jenseit am Wasserfall\nSehn sie sich endlich zum letztenmal.\nDer Knabe kriegt zur Freude\nEin Röckchen wie ein Mann,\nDas Mädchen ein Kleidchen von Seide,\nNun gehet die Schule an;\nDiesseit und jenseit am Wasserfall\nGehn sie zum Kloster bei Glockenschall.\nSie sahn sich lang nicht wieder,\nSie kannten sich nicht mehr,\nDas Mädchen mit vollem Mieder,\nDer Knabe ein Mönch schon wär′;\nDiesseit und jenseit am Wasserfall\nKamen und riefen sie sich im Tal.\nDas Mädchen ruft so helle.\nDer Knabe singt so tief;\nVerstehen sich endlich doch schnelle,\nAls alles im Hause schlief;\nDiesseit und jenseit am Wasserfall\nSpringen im Mondschein die Fische all′.\nFroh in der nächt′gen Frische\nSie kühlen sich im Fluß,\nSie können nicht schwimmen wie Fische\nUnd suchen sich doch zum Kuß;\nDiesseit und jenseit am Wasserfall\nReißen die Strudel sie fort mit Schall.\nDie Eltern hören singen\nUnd schaun aus hohem Haus,\nZwei Schwäne im Steinenschein ringen\nZum Dampfe des Falls hinaus;\nDiesseit und jenseit am Wasserfall\nHören sie Echo mit lautem Schall.\nDie Schwäne herrlich sangen\nIhr letztes schönstes Lied,\nUnd leuchtende Wölkchen hangen,\nManch Engelein niedersieht;\nDiesseit und jenseit am Wasserfall\nSchwebet wie Blüte ein süßer Schall.\nDer Mond sieht aus dem Bette\nDes glatten Falls empor,\nDie Nacht mit der Blumenkette\nErhebet zu sich dies Chor;\nDiesseit und jenseit am Wasserfall\nGrünt es von Tränen nun Überall."
    ],
    "verseCount": 78,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "songLike",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Getrennte Liebe",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-10-zorn-und-liebe",
    "title": "Zorn und Liebe",
    "author": "Clemens Brentano",
    "year": 1801,
    "userText": "O Zorn! du Abgrund des Verderben,\nDu unbarmherziger Tyrann,\nDu frißt und tötest ohne Sterben\nUnd brennest stets von Neuem an;\nWer da gerät in deine Haft\nGewinnt der Hölle Eigenschaft.\nWo ist, o Liebe, deine Tiefe,\nDer Abgrund deiner Wunderkraft?\nOh, wer an deiner Quell entschliefe,\nDer hätte Gottes Eigenschaft;\nO wer, o Lieb, in deinem Meer\nGleich einem Tropfen sich verlör!",
    "canonicalText": null,
    "userStanzas": [
      "O Zorn! du Abgrund des Verderben,\nDu unbarmherziger Tyrann,\nDu frißt und tötest ohne Sterben\nUnd brennest stets von Neuem an;\nWer da gerät in deine Haft\nGewinnt der Hölle Eigenschaft.\nWo ist, o Liebe, deine Tiefe,\nDer Abgrund deiner Wunderkraft?\nOh, wer an deiner Quell entschliefe,\nDer hätte Gottes Eigenschaft;\nO wer, o Lieb, in deinem Meer\nGleich einem Tropfen sich verlör!"
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "O Zorn! du Abgrund des Verderben,\nDu unbarmherziger Tyrann,\nDu frißt und tötest ohne Sterben\nUnd brennest stets von Neuem an;\nWer da gerät in deine Haft\nGewinnt der Hölle Eigenschaft.\nWo ist, o Liebe, deine Tiefe,\nDer Abgrund deiner Wunderkraft?\nOh, wer an deiner Quell entschliefe,\nDer hätte Gottes Eigenschaft;\nO wer, o Lieb, in deinem Meer\nGleich einem Tropfen sich verlör!",
    "stanzas": [
      "O Zorn! du Abgrund des Verderben,\nDu unbarmherziger Tyrann,\nDu frißt und tötest ohne Sterben\nUnd brennest stets von Neuem an;\nWer da gerät in deine Haft\nGewinnt der Hölle Eigenschaft.\nWo ist, o Liebe, deine Tiefe,\nDer Abgrund deiner Wunderkraft?\nOh, wer an deiner Quell entschliefe,\nDer hätte Gottes Eigenschaft;\nO wer, o Lieb, in deinem Meer\nGleich einem Tropfen sich verlör!"
    ],
    "verseCount": 12,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "songLike",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Zorn und Liebe",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-11-die-liebe",
    "title": "Die Liebe",
    "author": "Gotthold Ephraim Lessing",
    "year": 1771,
    "userText": "Ohne Liebe\nLebe, wer da kann.\nWenn er auch ein Mensch schon bliebe,\nBleibt er doch kein Mann.\nSüße Liebe,\nMach′ mein Leben süß!\nStille nie die regen Triebe\nSonder Hindernis.\nSchmachten lassen\nSei der Schönen Pflicht!\nNur uns ewig schmachten lassen,\nDieses sei sie nicht.",
    "canonicalText": null,
    "userStanzas": [
      "Ohne Liebe\nLebe, wer da kann.\nWenn er auch ein Mensch schon bliebe,\nBleibt er doch kein Mann.\nSüße Liebe,\nMach′ mein Leben süß!\nStille nie die regen Triebe\nSonder Hindernis.\nSchmachten lassen\nSei der Schönen Pflicht!\nNur uns ewig schmachten lassen,\nDieses sei sie nicht."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Ohne Liebe\nLebe, wer da kann.\nWenn er auch ein Mensch schon bliebe,\nBleibt er doch kein Mann.\nSüße Liebe,\nMach′ mein Leben süß!\nStille nie die regen Triebe\nSonder Hindernis.\nSchmachten lassen\nSei der Schönen Pflicht!\nNur uns ewig schmachten lassen,\nDieses sei sie nicht.",
    "stanzas": [
      "Ohne Liebe\nLebe, wer da kann.\nWenn er auch ein Mensch schon bliebe,\nBleibt er doch kein Mann.\nSüße Liebe,\nMach′ mein Leben süß!\nStille nie die regen Triebe\nSonder Hindernis.\nSchmachten lassen\nSei der Schönen Pflicht!\nNur uns ewig schmachten lassen,\nDieses sei sie nicht."
    ],
    "verseCount": 12,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Die Liebe",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-12-lass-mich-deine-augen-fragen",
    "title": "Laß mich deine Augen fragen",
    "author": "Peter Cornelius",
    "year": null,
    "userText": "Laß mich deine Augen fragen\nOb mein Mund auch dürfte nimmer\nLiebesworte zu dir sagen,\nDürft' ich nur der Blicke Schimmer,\nDürft' ich deine Augen fragen.\n\nDir in Augen möchte ich lesen,\nForschen, wie in heil'gen Sagen,\nOb auf Sternen du gewesen\nEh' die Erde dich getragen?\n\nAch, ein Wort schafft hohe Wonne\nUnd ein Wort kann Wunden schlagen;\nLaß aus deiner Augen Sonne\nNicht die Lippe mich verjagen.\n\nNie wird Eden leuchtend helle,\nNie mich deine Seele tragen;\nLaß mich lauschen an der Schwelle,\nLaß mich deine Augen fragen!",
    "canonicalText": null,
    "userStanzas": [
      "Laß mich deine Augen fragen\nOb mein Mund auch dürfte nimmer\nLiebesworte zu dir sagen,\nDürft' ich nur der Blicke Schimmer,\nDürft' ich deine Augen fragen.",
      "Dir in Augen möchte ich lesen,\nForschen, wie in heil'gen Sagen,\nOb auf Sternen du gewesen\nEh' die Erde dich getragen?",
      "Ach, ein Wort schafft hohe Wonne\nUnd ein Wort kann Wunden schlagen;\nLaß aus deiner Augen Sonne\nNicht die Lippe mich verjagen.",
      "Nie wird Eden leuchtend helle,\nNie mich deine Seele tragen;\nLaß mich lauschen an der Schwelle,\nLaß mich deine Augen fragen!"
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Laß mich deine Augen fragen\nOb mein Mund auch dürfte nimmer\nLiebesworte zu dir sagen,\nDürft' ich nur der Blicke Schimmer,\nDürft' ich deine Augen fragen.\n\nDir in Augen möchte ich lesen,\nForschen, wie in heil'gen Sagen,\nOb auf Sternen du gewesen\nEh' die Erde dich getragen?\n\nAch, ein Wort schafft hohe Wonne\nUnd ein Wort kann Wunden schlagen;\nLaß aus deiner Augen Sonne\nNicht die Lippe mich verjagen.\n\nNie wird Eden leuchtend helle,\nNie mich deine Seele tragen;\nLaß mich lauschen an der Schwelle,\nLaß mich deine Augen fragen!",
    "stanzas": [
      "Laß mich deine Augen fragen\nOb mein Mund auch dürfte nimmer\nLiebesworte zu dir sagen,\nDürft' ich nur der Blicke Schimmer,\nDürft' ich deine Augen fragen.",
      "Dir in Augen möchte ich lesen,\nForschen, wie in heil'gen Sagen,\nOb auf Sternen du gewesen\nEh' die Erde dich getragen?",
      "Ach, ein Wort schafft hohe Wonne\nUnd ein Wort kann Wunden schlagen;\nLaß aus deiner Augen Sonne\nNicht die Lippe mich verjagen.",
      "Nie wird Eden leuchtend helle,\nNie mich deine Seele tragen;\nLaß mich lauschen an der Schwelle,\nLaß mich deine Augen fragen!"
    ],
    "verseCount": 17,
    "stanzaCount": 4,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "songLike",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Laß mich deine Augen fragen",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-13-ich-liebe-dich-weil-ich-dich-lieben-muss",
    "title": "Ich liebe dich, weil ich dich lieben muß",
    "author": "Friedrich Rückert",
    "year": 1823,
    "userText": "Ich liebe dich, weil ich dich lieben muß;\nIch liebe dich, weil ich nichts anders kann;\nIch liebe dich nach einem Himmelschluß;\nIch liebe dich durch einen Zauberbann.\nDich lieb′ ich, wie die Rose ihren Strauch;\nDich lieb′ ich, wie die Sonne ihren Schein;\nDich lieb′ ich, weil du bist mein Lebenshauch;\nDich lieb′ ich, weil dich lieben ist mein Sein.",
    "canonicalText": null,
    "userStanzas": [
      "Ich liebe dich, weil ich dich lieben muß;\nIch liebe dich, weil ich nichts anders kann;\nIch liebe dich nach einem Himmelschluß;\nIch liebe dich durch einen Zauberbann.\nDich lieb′ ich, wie die Rose ihren Strauch;\nDich lieb′ ich, wie die Sonne ihren Schein;\nDich lieb′ ich, weil du bist mein Lebenshauch;\nDich lieb′ ich, weil dich lieben ist mein Sein."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Ich liebe dich, weil ich dich lieben muß;\nIch liebe dich, weil ich nichts anders kann;\nIch liebe dich nach einem Himmelschluß;\nIch liebe dich durch einen Zauberbann.\nDich lieb′ ich, wie die Rose ihren Strauch;\nDich lieb′ ich, wie die Sonne ihren Schein;\nDich lieb′ ich, weil du bist mein Lebenshauch;\nDich lieb′ ich, weil dich lieben ist mein Sein.",
    "stanzas": [
      "Ich liebe dich, weil ich dich lieben muß;\nIch liebe dich, weil ich nichts anders kann;\nIch liebe dich nach einem Himmelschluß;\nIch liebe dich durch einen Zauberbann.\nDich lieb′ ich, wie die Rose ihren Strauch;\nDich lieb′ ich, wie die Sonne ihren Schein;\nDich lieb′ ich, weil du bist mein Lebenshauch;\nDich lieb′ ich, weil dich lieben ist mein Sein."
    ],
    "verseCount": 8,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "songLike",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Ich liebe dich, weil ich dich lieben muß",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-14-willkommen-und-abschied",
    "title": "Willkommen und Abschied",
    "author": "Johann Wolfgang von Goethe",
    "year": 1775,
    "userText": "Es schlug mein Herz, geschwind, zu Pferde!\nEs war getan fast eh gedacht.\nDer Abend wiegte schon die Erde,\nUnd an den Bergen hing die Nacht;\nSchon stand im Nebelkleid die Eiche\nEin aufgetürmter Riese, da,\nWo Finsternis aus dem Gesträuche\nMit hundert schwarzen Augen sah.\nDer Mond von einem Wolkenhügel\nSah kläglich aus dem Duft hervor,\nDie Winde schwangen leise Flügel,\nUmsausten schauerlich mein Ohr;\nDie Nacht schuf tausend Ungeheuer,\nDoch frisch und fröhlich war mein Mut:\nIn meinen Adern welches Feuer!\nIn meinem Herzen welche Glut!\nDich sah ich, und die milde Freude\nFloß von dem süßen Blick auf mich;\nGanz war mein Herz an deiner Seite\nUnd jeder Atemzug für dich.\nEin rosenfarbnes Frühlingswetter\nUmgab das liebliche Gesicht,\nUnd Zärtlichkeit für mich - ihr Götter!\nIch hofft es, ich verdient es nicht!\nDoch ach, schon mit der Morgensonne\nVerengt der Abschied mir das Herz:\nIn deinen Küssen welche Wonne!\nIn deinem Auge welcher Schmerz!\nIch ging, du standst und sahst zur Erden\nUnd sahst mir nach mit nassem Blick:\nUnd doch, welch Glück, geliebt zu werden!\nUnd lieben, Götter, welch ein Glück",
    "canonicalText": null,
    "userStanzas": [
      "Es schlug mein Herz, geschwind, zu Pferde!\nEs war getan fast eh gedacht.\nDer Abend wiegte schon die Erde,\nUnd an den Bergen hing die Nacht;\nSchon stand im Nebelkleid die Eiche\nEin aufgetürmter Riese, da,\nWo Finsternis aus dem Gesträuche\nMit hundert schwarzen Augen sah.\nDer Mond von einem Wolkenhügel\nSah kläglich aus dem Duft hervor,\nDie Winde schwangen leise Flügel,\nUmsausten schauerlich mein Ohr;\nDie Nacht schuf tausend Ungeheuer,\nDoch frisch und fröhlich war mein Mut:\nIn meinen Adern welches Feuer!\nIn meinem Herzen welche Glut!\nDich sah ich, und die milde Freude\nFloß von dem süßen Blick auf mich;\nGanz war mein Herz an deiner Seite\nUnd jeder Atemzug für dich.\nEin rosenfarbnes Frühlingswetter\nUmgab das liebliche Gesicht,\nUnd Zärtlichkeit für mich - ihr Götter!\nIch hofft es, ich verdient es nicht!\nDoch ach, schon mit der Morgensonne\nVerengt der Abschied mir das Herz:\nIn deinen Küssen welche Wonne!\nIn deinem Auge welcher Schmerz!\nIch ging, du standst und sahst zur Erden\nUnd sahst mir nach mit nassem Blick:\nUnd doch, welch Glück, geliebt zu werden!\nUnd lieben, Götter, welch ein Glück"
    ],
    "canonicalStanzas": [],
    "collationStatus": "unresolved",
    "productionText": null,
    "text": "Es schlug mein Herz, geschwind, zu Pferde!\nEs war getan fast eh gedacht.\nDer Abend wiegte schon die Erde,\nUnd an den Bergen hing die Nacht;\nSchon stand im Nebelkleid die Eiche\nEin aufgetürmter Riese, da,\nWo Finsternis aus dem Gesträuche\nMit hundert schwarzen Augen sah.\nDer Mond von einem Wolkenhügel\nSah kläglich aus dem Duft hervor,\nDie Winde schwangen leise Flügel,\nUmsausten schauerlich mein Ohr;\nDie Nacht schuf tausend Ungeheuer,\nDoch frisch und fröhlich war mein Mut:\nIn meinen Adern welches Feuer!\nIn meinem Herzen welche Glut!\nDich sah ich, und die milde Freude\nFloß von dem süßen Blick auf mich;\nGanz war mein Herz an deiner Seite\nUnd jeder Atemzug für dich.\nEin rosenfarbnes Frühlingswetter\nUmgab das liebliche Gesicht,\nUnd Zärtlichkeit für mich - ihr Götter!\nIch hofft es, ich verdient es nicht!\nDoch ach, schon mit der Morgensonne\nVerengt der Abschied mir das Herz:\nIn deinen Küssen welche Wonne!\nIn deinem Auge welcher Schmerz!\nIch ging, du standst und sahst zur Erden\nUnd sahst mir nach mit nassem Blick:\nUnd doch, welch Glück, geliebt zu werden!\nUnd lieben, Götter, welch ein Glück",
    "stanzas": [
      "Es schlug mein Herz, geschwind, zu Pferde!\nEs war getan fast eh gedacht.\nDer Abend wiegte schon die Erde,\nUnd an den Bergen hing die Nacht;\nSchon stand im Nebelkleid die Eiche\nEin aufgetürmter Riese, da,\nWo Finsternis aus dem Gesträuche\nMit hundert schwarzen Augen sah.\nDer Mond von einem Wolkenhügel\nSah kläglich aus dem Duft hervor,\nDie Winde schwangen leise Flügel,\nUmsausten schauerlich mein Ohr;\nDie Nacht schuf tausend Ungeheuer,\nDoch frisch und fröhlich war mein Mut:\nIn meinen Adern welches Feuer!\nIn meinem Herzen welche Glut!\nDich sah ich, und die milde Freude\nFloß von dem süßen Blick auf mich;\nGanz war mein Herz an deiner Seite\nUnd jeder Atemzug für dich.\nEin rosenfarbnes Frühlingswetter\nUmgab das liebliche Gesicht,\nUnd Zärtlichkeit für mich - ihr Götter!\nIch hofft es, ich verdient es nicht!\nDoch ach, schon mit der Morgensonne\nVerengt der Abschied mir das Herz:\nIn deinen Küssen welche Wonne!\nIn deinem Auge welcher Schmerz!\nIch ging, du standst und sahst zur Erden\nUnd sahst mir nach mit nassem Blick:\nUnd doch, welch Glück, geliebt zu werden!\nUnd lieben, Götter, welch ein Glück"
    ],
    "verseCount": 32,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "variant-unresolved",
      "sourceTitle": "Willkommen und Abschied (1827)",
      "sourceInstitution": "Wikisource / Cotta-Digitalisat",
      "sourceUrl": "https://de.wikisource.org/wiki/Willkommen_und_Abschied_%281827%29",
      "editionYear": 1827,
      "editionDetails": "Goethe's Werke. Vollständige Ausgabe letzter Hand",
      "checkedAt": "2026-09-12",
      "notes": "Nutzerfassung folgt weitgehend der späteren Fassung, modernisiert aber Schreibweise und Zeichensetzung; Kollationsentscheid offen.",
      "baseEdition": {
        "title": "Willkommen und Abschied (1827)",
        "editorOrPublisher": "Wikisource / Cotta-Digitalisat",
        "publicationYear": 1827,
        "place": null,
        "volume": null,
        "pages": "Goethe's Werke. Vollständige Ausgabe letzter Hand",
        "digitalSource": "Wikisource / Cotta-Digitalisat",
        "sourceUrl": "https://de.wikisource.org/wiki/Willkommen_und_Abschied_%281827%29",
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "user-requested-version"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "songLike",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Willkommen und Abschied",
    "baseEditionTitle": "Willkommen und Abschied (1827)",
    "knownTitleVariants": [],
    "versionLabel": "spätere Fassung"
  },
  {
    "id": "canonical-15-mit-deinen-blauen-augen",
    "title": "Mit deinen blauen Augen",
    "author": "Heinrich Heine",
    "year": 1844,
    "userText": "Mit deinen blauen Augen\nSiehst du mich lieblich an,\nDa wird mir so träumend zu Sinne,\nDaß ich nicht sprechen kann.\n\nAn deine blauen Augen\nGedenk ich allerwärts; -\nEin Meer von blauen Gedanken\nErgießt sich über mein Herz.",
    "canonicalText": null,
    "userStanzas": [
      "Mit deinen blauen Augen\nSiehst du mich lieblich an,\nDa wird mir so träumend zu Sinne,\nDaß ich nicht sprechen kann.",
      "An deine blauen Augen\nGedenk ich allerwärts; -\nEin Meer von blauen Gedanken\nErgießt sich über mein Herz."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Mit deinen blauen Augen\nSiehst du mich lieblich an,\nDa wird mir so träumend zu Sinne,\nDaß ich nicht sprechen kann.\n\nAn deine blauen Augen\nGedenk ich allerwärts; -\nEin Meer von blauen Gedanken\nErgießt sich über mein Herz.",
    "stanzas": [
      "Mit deinen blauen Augen\nSiehst du mich lieblich an,\nDa wird mir so träumend zu Sinne,\nDaß ich nicht sprechen kann.",
      "An deine blauen Augen\nGedenk ich allerwärts; -\nEin Meer von blauen Gedanken\nErgießt sich über mein Herz."
    ],
    "verseCount": 8,
    "stanzaCount": 2,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": "Mit deinen blauen Augen",
      "sourceInstitution": "Wikisource-Suche / Heine-Werkverzeichnis",
      "sourceUrl": "https://de.wikisource.org/wiki/Heinrich_Heine",
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Keine hinreichend ausgewiesene digitale Editionsseite für die vollständige Kollation lokalisiert.",
      "baseEdition": {
        "title": "Mit deinen blauen Augen",
        "editorOrPublisher": "Wikisource-Suche / Heine-Werkverzeichnis",
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": "Wikisource-Suche / Heine-Werkverzeichnis",
        "sourceUrl": "https://de.wikisource.org/wiki/Heinrich_Heine",
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "songLike",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Mit deinen blauen Augen",
    "baseEditionTitle": "Mit deinen blauen Augen",
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-16-die-liebe",
    "title": "Die Liebe",
    "author": "Matthias Claudius",
    "year": 1775,
    "userText": "Die Liebe hemmet nichts; sie kennt nicht Tür noch Riegel,\nUnd dringt durch alles sich;\nSie ist ohn Anbeginn, schlug ewig ihre Flügel,\nUnd schlägt sie ewiglich.",
    "canonicalText": null,
    "userStanzas": [
      "Die Liebe hemmet nichts; sie kennt nicht Tür noch Riegel,\nUnd dringt durch alles sich;\nSie ist ohn Anbeginn, schlug ewig ihre Flügel,\nUnd schlägt sie ewiglich."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Die Liebe hemmet nichts; sie kennt nicht Tür noch Riegel,\nUnd dringt durch alles sich;\nSie ist ohn Anbeginn, schlug ewig ihre Flügel,\nUnd schlägt sie ewiglich.",
    "stanzas": [
      "Die Liebe hemmet nichts; sie kennt nicht Tür noch Riegel,\nUnd dringt durch alles sich;\nSie ist ohn Anbeginn, schlug ewig ihre Flügel,\nUnd schlägt sie ewiglich."
    ],
    "verseCount": 4,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Liebe",
      "Nähe",
      "Trennung"
    ],
    "genre": "songLike",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      1,
      4,
      7,
      8
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Die Liebe",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-17-von-der-freundschaft",
    "title": "Von der Freundschaft",
    "author": "Khalil Gibran",
    "year": 1923,
    "userText": "Euer Freund ist die Antwort auf eure Nöte\nEr ist das Feld, das ihr mit Liebe besät\nund mit Dankbarkeit erntet.\nUnd er ist euer Tisch und euer Herd\nDenn ihr kommt zu ihm mit eurem Hunger,\nund ihr sucht euren Frieden bei ihm.\nWenn euer Freund frei heraus spricht,\nfürchtet ihr weder das \"Nein\" in euren Gedanken,\nnoch haltet ihr mit dem \"Ja\" zurück.\nUnd wenn er schweigt,\nhört euer Herz nicht auf,\ndem seinen zu lauschen;\nDenn in der Freundschaft werden\nalle Gedanken, alle Wünsche, alle Erwartungen\nohne Worte geboren und geteilt,\nmit Freude, die keinen Beifall braucht.\nWenn ihr von eurem Freund weggeht, trauert ihr nicht:\nDenn was ihr am meisten an ihm liebt,\nist vielleicht in seiner Abwesenheit klarer,\nwie der Berg dem Bergsteiger von der Ebene aus klarer erscheint.\nUnd die Freundschaft soll kein anderen Zweck haben,\nals den Geist zu vertiefen.\nUnd laßt euer Bestes für euren Freund sein.\nWenn er die Ebbe eurer Gezeiten kennen muß,\nlaßt ihn auch das Hochwasser kennen.\nDenn was ist ein Freund, wenn ihr ihn nur aufsucht,\num die Stunden todzuschlagen?\nSucht ihn auf, um die Stunden mit ihm zu erleben.\nDenn er ist da, eure Bedürfnisse zu befriedigen\nnicht aber eure Leere auszufüllen.\nUnd in der Süße des Freundschaft laßt Lachen sein\nund geteilte Freude.\nDenn im Tau kleiner Dinge\nfindet das Herz seinen Morgen und wird erfrischt.",
    "canonicalText": null,
    "userStanzas": [
      "Euer Freund ist die Antwort auf eure Nöte\nEr ist das Feld, das ihr mit Liebe besät\nund mit Dankbarkeit erntet.\nUnd er ist euer Tisch und euer Herd\nDenn ihr kommt zu ihm mit eurem Hunger,\nund ihr sucht euren Frieden bei ihm.\nWenn euer Freund frei heraus spricht,\nfürchtet ihr weder das \"Nein\" in euren Gedanken,\nnoch haltet ihr mit dem \"Ja\" zurück.\nUnd wenn er schweigt,\nhört euer Herz nicht auf,\ndem seinen zu lauschen;\nDenn in der Freundschaft werden\nalle Gedanken, alle Wünsche, alle Erwartungen\nohne Worte geboren und geteilt,\nmit Freude, die keinen Beifall braucht.\nWenn ihr von eurem Freund weggeht, trauert ihr nicht:\nDenn was ihr am meisten an ihm liebt,\nist vielleicht in seiner Abwesenheit klarer,\nwie der Berg dem Bergsteiger von der Ebene aus klarer erscheint.\nUnd die Freundschaft soll kein anderen Zweck haben,\nals den Geist zu vertiefen.\nUnd laßt euer Bestes für euren Freund sein.\nWenn er die Ebbe eurer Gezeiten kennen muß,\nlaßt ihn auch das Hochwasser kennen.\nDenn was ist ein Freund, wenn ihr ihn nur aufsucht,\num die Stunden todzuschlagen?\nSucht ihn auf, um die Stunden mit ihm zu erleben.\nDenn er ist da, eure Bedürfnisse zu befriedigen\nnicht aber eure Leere auszufüllen.\nUnd in der Süße des Freundschaft laßt Lachen sein\nund geteilte Freude.\nDenn im Tau kleiner Dinge\nfindet das Herz seinen Morgen und wird erfrischt."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Euer Freund ist die Antwort auf eure Nöte\nEr ist das Feld, das ihr mit Liebe besät\nund mit Dankbarkeit erntet.\nUnd er ist euer Tisch und euer Herd\nDenn ihr kommt zu ihm mit eurem Hunger,\nund ihr sucht euren Frieden bei ihm.\nWenn euer Freund frei heraus spricht,\nfürchtet ihr weder das \"Nein\" in euren Gedanken,\nnoch haltet ihr mit dem \"Ja\" zurück.\nUnd wenn er schweigt,\nhört euer Herz nicht auf,\ndem seinen zu lauschen;\nDenn in der Freundschaft werden\nalle Gedanken, alle Wünsche, alle Erwartungen\nohne Worte geboren und geteilt,\nmit Freude, die keinen Beifall braucht.\nWenn ihr von eurem Freund weggeht, trauert ihr nicht:\nDenn was ihr am meisten an ihm liebt,\nist vielleicht in seiner Abwesenheit klarer,\nwie der Berg dem Bergsteiger von der Ebene aus klarer erscheint.\nUnd die Freundschaft soll kein anderen Zweck haben,\nals den Geist zu vertiefen.\nUnd laßt euer Bestes für euren Freund sein.\nWenn er die Ebbe eurer Gezeiten kennen muß,\nlaßt ihn auch das Hochwasser kennen.\nDenn was ist ein Freund, wenn ihr ihn nur aufsucht,\num die Stunden todzuschlagen?\nSucht ihn auf, um die Stunden mit ihm zu erleben.\nDenn er ist da, eure Bedürfnisse zu befriedigen\nnicht aber eure Leere auszufüllen.\nUnd in der Süße des Freundschaft laßt Lachen sein\nund geteilte Freude.\nDenn im Tau kleiner Dinge\nfindet das Herz seinen Morgen und wird erfrischt.",
    "stanzas": [
      "Euer Freund ist die Antwort auf eure Nöte\nEr ist das Feld, das ihr mit Liebe besät\nund mit Dankbarkeit erntet.\nUnd er ist euer Tisch und euer Herd\nDenn ihr kommt zu ihm mit eurem Hunger,\nund ihr sucht euren Frieden bei ihm.\nWenn euer Freund frei heraus spricht,\nfürchtet ihr weder das \"Nein\" in euren Gedanken,\nnoch haltet ihr mit dem \"Ja\" zurück.\nUnd wenn er schweigt,\nhört euer Herz nicht auf,\ndem seinen zu lauschen;\nDenn in der Freundschaft werden\nalle Gedanken, alle Wünsche, alle Erwartungen\nohne Worte geboren und geteilt,\nmit Freude, die keinen Beifall braucht.\nWenn ihr von eurem Freund weggeht, trauert ihr nicht:\nDenn was ihr am meisten an ihm liebt,\nist vielleicht in seiner Abwesenheit klarer,\nwie der Berg dem Bergsteiger von der Ebene aus klarer erscheint.\nUnd die Freundschaft soll kein anderen Zweck haben,\nals den Geist zu vertiefen.\nUnd laßt euer Bestes für euren Freund sein.\nWenn er die Ebbe eurer Gezeiten kennen muß,\nlaßt ihn auch das Hochwasser kennen.\nDenn was ist ein Freund, wenn ihr ihn nur aufsucht,\num die Stunden todzuschlagen?\nSucht ihn auf, um die Stunden mit ihm zu erleben.\nDenn er ist da, eure Bedürfnisse zu befriedigen\nnicht aber eure Leere auszufüllen.\nUnd in der Süße des Freundschaft laßt Lachen sein\nund geteilte Freude.\nDenn im Tau kleiner Dinge\nfindet das Herz seinen Morgen und wird erfrischt."
    ],
    "verseCount": 34,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "rights-blocked",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Deutsche Übersetzung und Textfassung vor Nutzung rechtlich prüfen.",
    "rightsStatus": "translation-review-required",
    "themes": [
      "Freundschaft",
      "Gemeinschaft"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      2,
      4,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "rights-blocked",
    "canonicalDisplayTitle": "Von der Freundschaft",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-18-lied-der-freundschaft",
    "title": "Lied der Freundschaft",
    "author": "Simon Dach",
    "year": 1648,
    "userText": "Der Mensch hat nichts so eigen,\nso wohl steht ihm nichts an,\nals dass er Treu′ erzeigen\nund Freundschaft halten kann;\nwann er mit seinesgleichen\nsoll treten in ein Band,\nverspricht sich, nicht zu weichen\nmit Herzen, Mund und Hand.\nDie Red′ ist uns gegeben,\ndamit wir nicht allein\nfür uns nur sollen leben\nund fern von Leuten sein;\nwir sollen uns befragen\nund sehn auf guten Rat,\ndas Leid einander klagen,\nso uns betreten hat.\nWas kann die Freude machen,\ndie Einsamkeit verhehlt?\nDas gibt ein doppelt Lachen,\nwas Freunden wird erzählt;\nder kann sein Leid vergessen,\nder es von Herzen sagt;\nder muss sich selbst auffressen,\nder in geheim sich nagt.\nGott stehet mir vor allen,\ndie meine Seele liebt;\ndann soll mir auch gefallen,\nder mir sich herzlich gibt.\nMit diesem Bunds-Gesellen\nverlach′ ich Pein und Not,\ngeh′ auf den Grund der Höllen\nund breche durch den Tod.\nIch hab′, ich habe Herzen,\nso treue wie gebührt,\ndie Heuchelei und Scherzen\nnie wissentlich berührt;\nich bin auch ihnen wieder\nvon Grund der Seelen hold;\nich lieb euch mehr, ihr Brüder,\nals aller Erden Gold.",
    "canonicalText": null,
    "userStanzas": [
      "Der Mensch hat nichts so eigen,\nso wohl steht ihm nichts an,\nals dass er Treu′ erzeigen\nund Freundschaft halten kann;\nwann er mit seinesgleichen\nsoll treten in ein Band,\nverspricht sich, nicht zu weichen\nmit Herzen, Mund und Hand.\nDie Red′ ist uns gegeben,\ndamit wir nicht allein\nfür uns nur sollen leben\nund fern von Leuten sein;\nwir sollen uns befragen\nund sehn auf guten Rat,\ndas Leid einander klagen,\nso uns betreten hat.\nWas kann die Freude machen,\ndie Einsamkeit verhehlt?\nDas gibt ein doppelt Lachen,\nwas Freunden wird erzählt;\nder kann sein Leid vergessen,\nder es von Herzen sagt;\nder muss sich selbst auffressen,\nder in geheim sich nagt.\nGott stehet mir vor allen,\ndie meine Seele liebt;\ndann soll mir auch gefallen,\nder mir sich herzlich gibt.\nMit diesem Bunds-Gesellen\nverlach′ ich Pein und Not,\ngeh′ auf den Grund der Höllen\nund breche durch den Tod.\nIch hab′, ich habe Herzen,\nso treue wie gebührt,\ndie Heuchelei und Scherzen\nnie wissentlich berührt;\nich bin auch ihnen wieder\nvon Grund der Seelen hold;\nich lieb euch mehr, ihr Brüder,\nals aller Erden Gold."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Der Mensch hat nichts so eigen,\nso wohl steht ihm nichts an,\nals dass er Treu′ erzeigen\nund Freundschaft halten kann;\nwann er mit seinesgleichen\nsoll treten in ein Band,\nverspricht sich, nicht zu weichen\nmit Herzen, Mund und Hand.\nDie Red′ ist uns gegeben,\ndamit wir nicht allein\nfür uns nur sollen leben\nund fern von Leuten sein;\nwir sollen uns befragen\nund sehn auf guten Rat,\ndas Leid einander klagen,\nso uns betreten hat.\nWas kann die Freude machen,\ndie Einsamkeit verhehlt?\nDas gibt ein doppelt Lachen,\nwas Freunden wird erzählt;\nder kann sein Leid vergessen,\nder es von Herzen sagt;\nder muss sich selbst auffressen,\nder in geheim sich nagt.\nGott stehet mir vor allen,\ndie meine Seele liebt;\ndann soll mir auch gefallen,\nder mir sich herzlich gibt.\nMit diesem Bunds-Gesellen\nverlach′ ich Pein und Not,\ngeh′ auf den Grund der Höllen\nund breche durch den Tod.\nIch hab′, ich habe Herzen,\nso treue wie gebührt,\ndie Heuchelei und Scherzen\nnie wissentlich berührt;\nich bin auch ihnen wieder\nvon Grund der Seelen hold;\nich lieb euch mehr, ihr Brüder,\nals aller Erden Gold.",
    "stanzas": [
      "Der Mensch hat nichts so eigen,\nso wohl steht ihm nichts an,\nals dass er Treu′ erzeigen\nund Freundschaft halten kann;\nwann er mit seinesgleichen\nsoll treten in ein Band,\nverspricht sich, nicht zu weichen\nmit Herzen, Mund und Hand.\nDie Red′ ist uns gegeben,\ndamit wir nicht allein\nfür uns nur sollen leben\nund fern von Leuten sein;\nwir sollen uns befragen\nund sehn auf guten Rat,\ndas Leid einander klagen,\nso uns betreten hat.\nWas kann die Freude machen,\ndie Einsamkeit verhehlt?\nDas gibt ein doppelt Lachen,\nwas Freunden wird erzählt;\nder kann sein Leid vergessen,\nder es von Herzen sagt;\nder muss sich selbst auffressen,\nder in geheim sich nagt.\nGott stehet mir vor allen,\ndie meine Seele liebt;\ndann soll mir auch gefallen,\nder mir sich herzlich gibt.\nMit diesem Bunds-Gesellen\nverlach′ ich Pein und Not,\ngeh′ auf den Grund der Höllen\nund breche durch den Tod.\nIch hab′, ich habe Herzen,\nso treue wie gebührt,\ndie Heuchelei und Scherzen\nnie wissentlich berührt;\nich bin auch ihnen wieder\nvon Grund der Seelen hold;\nich lieb euch mehr, ihr Brüder,\nals aller Erden Gold."
    ],
    "verseCount": 40,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Freundschaft",
      "Gemeinschaft"
    ],
    "genre": "songLike",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      2,
      4,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Lied der Freundschaft",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-19-der-freund",
    "title": "Der Freund",
    "author": "Joseph von Eichendorff",
    "year": null,
    "userText": "Wer auf den Wogen schliefe,\nEin sanft gewiegtes Kind,\nKennt nicht des Lebens Tiefe,\nVor süßem Träumen blind.\nDoch wen die Stürme fassen\nZu wildem Tanz und Fest,\nWen hoch auf dunklen Straßen\nDie falsche Welt verläßt:\nDer lernt sich wacker rühren,\nDurch Nacht und Klippen hin\nLernt der das Steuer führen\nMit sichrem, ernstem Sinn.\nDer ist vom echten Kerne,\nErprobt zu Lust und Pein,\nDer glaubt an Gott und Sterne,\nDer soll mein Schiffmann sein!",
    "canonicalText": null,
    "userStanzas": [
      "Wer auf den Wogen schliefe,\nEin sanft gewiegtes Kind,\nKennt nicht des Lebens Tiefe,\nVor süßem Träumen blind.\nDoch wen die Stürme fassen\nZu wildem Tanz und Fest,\nWen hoch auf dunklen Straßen\nDie falsche Welt verläßt:\nDer lernt sich wacker rühren,\nDurch Nacht und Klippen hin\nLernt der das Steuer führen\nMit sichrem, ernstem Sinn.\nDer ist vom echten Kerne,\nErprobt zu Lust und Pein,\nDer glaubt an Gott und Sterne,\nDer soll mein Schiffmann sein!"
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Wer auf den Wogen schliefe,\nEin sanft gewiegtes Kind,\nKennt nicht des Lebens Tiefe,\nVor süßem Träumen blind.\nDoch wen die Stürme fassen\nZu wildem Tanz und Fest,\nWen hoch auf dunklen Straßen\nDie falsche Welt verläßt:\nDer lernt sich wacker rühren,\nDurch Nacht und Klippen hin\nLernt der das Steuer führen\nMit sichrem, ernstem Sinn.\nDer ist vom echten Kerne,\nErprobt zu Lust und Pein,\nDer glaubt an Gott und Sterne,\nDer soll mein Schiffmann sein!",
    "stanzas": [
      "Wer auf den Wogen schliefe,\nEin sanft gewiegtes Kind,\nKennt nicht des Lebens Tiefe,\nVor süßem Träumen blind.\nDoch wen die Stürme fassen\nZu wildem Tanz und Fest,\nWen hoch auf dunklen Straßen\nDie falsche Welt verläßt:\nDer lernt sich wacker rühren,\nDurch Nacht und Klippen hin\nLernt der das Steuer führen\nMit sichrem, ernstem Sinn.\nDer ist vom echten Kerne,\nErprobt zu Lust und Pein,\nDer glaubt an Gott und Sterne,\nDer soll mein Schiffmann sein!"
    ],
    "verseCount": 16,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Freundschaft",
      "Gemeinschaft"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      2,
      4,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Der Freund",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-20-liebe-und-freundschaft",
    "title": "Liebe und Freundschaft",
    "author": "Johann Wilhelm Ludwig Gleim",
    "year": 1745,
    "userText": "Liebe, weg! Du zankst dich nur,\nBist nur immer eifersüchtig!\nSiehst nur immer nach der Uhr,\nBist, wie ihre Stunden, flüchtig!\nFreundschaft, bleib’! Du zankst dich nicht,\nBist nicht immer eifersüchtig!\nSiehst in’s helle Sonnenlicht,\nBist nicht unstät, bist nicht flüchtig!\nKomm’ und sitz’ auf meinem Schooß,\nHerrsch’ in meinem kleinen Staate! –\nWie werd’ ich die Liebe los?\nRathe, liebe Freundschaft, rathe!",
    "canonicalText": null,
    "userStanzas": [
      "Liebe, weg! Du zankst dich nur,\nBist nur immer eifersüchtig!\nSiehst nur immer nach der Uhr,\nBist, wie ihre Stunden, flüchtig!\nFreundschaft, bleib’! Du zankst dich nicht,\nBist nicht immer eifersüchtig!\nSiehst in’s helle Sonnenlicht,\nBist nicht unstät, bist nicht flüchtig!\nKomm’ und sitz’ auf meinem Schooß,\nHerrsch’ in meinem kleinen Staate! –\nWie werd’ ich die Liebe los?\nRathe, liebe Freundschaft, rathe!"
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Liebe, weg! Du zankst dich nur,\nBist nur immer eifersüchtig!\nSiehst nur immer nach der Uhr,\nBist, wie ihre Stunden, flüchtig!\nFreundschaft, bleib’! Du zankst dich nicht,\nBist nicht immer eifersüchtig!\nSiehst in’s helle Sonnenlicht,\nBist nicht unstät, bist nicht flüchtig!\nKomm’ und sitz’ auf meinem Schooß,\nHerrsch’ in meinem kleinen Staate! –\nWie werd’ ich die Liebe los?\nRathe, liebe Freundschaft, rathe!",
    "stanzas": [
      "Liebe, weg! Du zankst dich nur,\nBist nur immer eifersüchtig!\nSiehst nur immer nach der Uhr,\nBist, wie ihre Stunden, flüchtig!\nFreundschaft, bleib’! Du zankst dich nicht,\nBist nicht immer eifersüchtig!\nSiehst in’s helle Sonnenlicht,\nBist nicht unstät, bist nicht flüchtig!\nKomm’ und sitz’ auf meinem Schooß,\nHerrsch’ in meinem kleinen Staate! –\nWie werd’ ich die Liebe los?\nRathe, liebe Freundschaft, rathe!"
    ],
    "verseCount": 12,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Freundschaft",
      "Gemeinschaft"
    ],
    "genre": "songLike",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      2,
      4,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Liebe und Freundschaft",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-21-freundschaft",
    "title": "Freundschaft",
    "author": "Friedrich Hölderlin",
    "year": 1790,
    "userText": "Wenn Menschen sich aus innrem Werte kennen,\nSo können sie sich freudig Freunde nennen,\nDas Leben ist den Menschen so bekannter,\nSie finden es im Geist interessanter.\nDer hohe Geist ist nicht der Freundschaft ferne,\nDie Menschen sind den Harmonien gerne\nUnd der Vertrautheit hold, daß sie der Bildung leben,\nAuch dieses ist der Menschheit so gegeben.",
    "canonicalText": null,
    "userStanzas": [
      "Wenn Menschen sich aus innrem Werte kennen,\nSo können sie sich freudig Freunde nennen,\nDas Leben ist den Menschen so bekannter,\nSie finden es im Geist interessanter.\nDer hohe Geist ist nicht der Freundschaft ferne,\nDie Menschen sind den Harmonien gerne\nUnd der Vertrautheit hold, daß sie der Bildung leben,\nAuch dieses ist der Menschheit so gegeben."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Wenn Menschen sich aus innrem Werte kennen,\nSo können sie sich freudig Freunde nennen,\nDas Leben ist den Menschen so bekannter,\nSie finden es im Geist interessanter.\nDer hohe Geist ist nicht der Freundschaft ferne,\nDie Menschen sind den Harmonien gerne\nUnd der Vertrautheit hold, daß sie der Bildung leben,\nAuch dieses ist der Menschheit so gegeben.",
    "stanzas": [
      "Wenn Menschen sich aus innrem Werte kennen,\nSo können sie sich freudig Freunde nennen,\nDas Leben ist den Menschen so bekannter,\nSie finden es im Geist interessanter.\nDer hohe Geist ist nicht der Freundschaft ferne,\nDie Menschen sind den Harmonien gerne\nUnd der Vertrautheit hold, daß sie der Bildung leben,\nAuch dieses ist der Menschheit so gegeben."
    ],
    "verseCount": 8,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Freundschaft",
      "Gemeinschaft"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      2,
      4,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Freundschaft",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-22-an-die-freunde",
    "title": "An die Freunde",
    "author": "Friedrich Schiller",
    "year": 1802,
    "userText": "Lieben Freunde, es gab schönre Zeiten,\nAls die unsern, das ist nicht zu streiten!\nUnd ein edler Volk hat einst gelebt.\nKönnte die Geschichte davon schweigen,\nTausend Steine würden redend zeugen,\nDie man aus dem Schoß der Erde gräbt.\nDoch es ist dahin, es ist verschwunden\nDieses hoch begünstigte Geschlecht.\nWir, wir leben! Unser sind die Stunden,\nUnd der Lebende hat Recht.\nFreunde, es gibt glücklichere Zonen,\nAls das Land, worin wir leidlich wohnen,\nWie der weit gereiste Wandrer spricht.\nAber hat Natur uns viel entzogen,\nWar die Kunst uns freundlich doch gewogen,\nUnser Herz erwarmt an ihrem Licht.\nWill der Lorbeer hier sich nicht gewöhnen,\nWird die Myrte unsers Winters Raub:\nGrünet doch, die Schläfe zu bekrönen,\nUns der Rebe muntres Laub.\nWohl von größerm Leben mag es rauschen,\nWo vier Welten ihre Schätze tauschen,\nAn der Themse, auf dem Markt der Welt.\nTausend Schiffe landen an und gehen;\nDa ist jedes Köstliche zu sehen,\nUnd es herrscht der Erde Gott, das Geld.\nAber nicht im trüben Schlamm der Bäche,\nDer von wilden Regengüssen schwillt,\nAuf des stillen Baches ebner Fläche\nSpiegelt sich das Sonnenbild.\nPrächtiger, als wir in unserm Norden,\nWohnt der Bettler an der Engelspforten,\nDenn er sieht das ewig einz′ge Rom!\nIhn umgibt der Schönheit Glanzgewimmel,\nUnd ein zweiter Himmel in dem Himmel\nSteigt Sankt Peters wunderbarer Dom.\nAber Rom in allem seinem Glanze\nIst ein Grab nur der Vergangenheit;\nLeben duftet nur die frische Pflanze,\nDie die grüne Stunde streut.\nGrößres mag sich anderswo begeben,\nAls bei uns in unserm kleinen Leben;\nNeues - hat die Sonne nie gesehn.\nSehn wir doch das Große aller Zeiten\nAuf den Brettern, die die Welt bedeuten,\nSinnvoll still an uns vorüber gehn.\nAlles wiederholt sich nur im Leben,\nEwig jung ist nur die Phantasie.\nWas sich nie und nirgends hat begeben,\nDas allein veraltet nie!",
    "canonicalText": null,
    "userStanzas": [
      "Lieben Freunde, es gab schönre Zeiten,\nAls die unsern, das ist nicht zu streiten!\nUnd ein edler Volk hat einst gelebt.\nKönnte die Geschichte davon schweigen,\nTausend Steine würden redend zeugen,\nDie man aus dem Schoß der Erde gräbt.\nDoch es ist dahin, es ist verschwunden\nDieses hoch begünstigte Geschlecht.\nWir, wir leben! Unser sind die Stunden,\nUnd der Lebende hat Recht.\nFreunde, es gibt glücklichere Zonen,\nAls das Land, worin wir leidlich wohnen,\nWie der weit gereiste Wandrer spricht.\nAber hat Natur uns viel entzogen,\nWar die Kunst uns freundlich doch gewogen,\nUnser Herz erwarmt an ihrem Licht.\nWill der Lorbeer hier sich nicht gewöhnen,\nWird die Myrte unsers Winters Raub:\nGrünet doch, die Schläfe zu bekrönen,\nUns der Rebe muntres Laub.\nWohl von größerm Leben mag es rauschen,\nWo vier Welten ihre Schätze tauschen,\nAn der Themse, auf dem Markt der Welt.\nTausend Schiffe landen an und gehen;\nDa ist jedes Köstliche zu sehen,\nUnd es herrscht der Erde Gott, das Geld.\nAber nicht im trüben Schlamm der Bäche,\nDer von wilden Regengüssen schwillt,\nAuf des stillen Baches ebner Fläche\nSpiegelt sich das Sonnenbild.\nPrächtiger, als wir in unserm Norden,\nWohnt der Bettler an der Engelspforten,\nDenn er sieht das ewig einz′ge Rom!\nIhn umgibt der Schönheit Glanzgewimmel,\nUnd ein zweiter Himmel in dem Himmel\nSteigt Sankt Peters wunderbarer Dom.\nAber Rom in allem seinem Glanze\nIst ein Grab nur der Vergangenheit;\nLeben duftet nur die frische Pflanze,\nDie die grüne Stunde streut.\nGrößres mag sich anderswo begeben,\nAls bei uns in unserm kleinen Leben;\nNeues - hat die Sonne nie gesehn.\nSehn wir doch das Große aller Zeiten\nAuf den Brettern, die die Welt bedeuten,\nSinnvoll still an uns vorüber gehn.\nAlles wiederholt sich nur im Leben,\nEwig jung ist nur die Phantasie.\nWas sich nie und nirgends hat begeben,\nDas allein veraltet nie!"
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Lieben Freunde, es gab schönre Zeiten,\nAls die unsern, das ist nicht zu streiten!\nUnd ein edler Volk hat einst gelebt.\nKönnte die Geschichte davon schweigen,\nTausend Steine würden redend zeugen,\nDie man aus dem Schoß der Erde gräbt.\nDoch es ist dahin, es ist verschwunden\nDieses hoch begünstigte Geschlecht.\nWir, wir leben! Unser sind die Stunden,\nUnd der Lebende hat Recht.\nFreunde, es gibt glücklichere Zonen,\nAls das Land, worin wir leidlich wohnen,\nWie der weit gereiste Wandrer spricht.\nAber hat Natur uns viel entzogen,\nWar die Kunst uns freundlich doch gewogen,\nUnser Herz erwarmt an ihrem Licht.\nWill der Lorbeer hier sich nicht gewöhnen,\nWird die Myrte unsers Winters Raub:\nGrünet doch, die Schläfe zu bekrönen,\nUns der Rebe muntres Laub.\nWohl von größerm Leben mag es rauschen,\nWo vier Welten ihre Schätze tauschen,\nAn der Themse, auf dem Markt der Welt.\nTausend Schiffe landen an und gehen;\nDa ist jedes Köstliche zu sehen,\nUnd es herrscht der Erde Gott, das Geld.\nAber nicht im trüben Schlamm der Bäche,\nDer von wilden Regengüssen schwillt,\nAuf des stillen Baches ebner Fläche\nSpiegelt sich das Sonnenbild.\nPrächtiger, als wir in unserm Norden,\nWohnt der Bettler an der Engelspforten,\nDenn er sieht das ewig einz′ge Rom!\nIhn umgibt der Schönheit Glanzgewimmel,\nUnd ein zweiter Himmel in dem Himmel\nSteigt Sankt Peters wunderbarer Dom.\nAber Rom in allem seinem Glanze\nIst ein Grab nur der Vergangenheit;\nLeben duftet nur die frische Pflanze,\nDie die grüne Stunde streut.\nGrößres mag sich anderswo begeben,\nAls bei uns in unserm kleinen Leben;\nNeues - hat die Sonne nie gesehn.\nSehn wir doch das Große aller Zeiten\nAuf den Brettern, die die Welt bedeuten,\nSinnvoll still an uns vorüber gehn.\nAlles wiederholt sich nur im Leben,\nEwig jung ist nur die Phantasie.\nWas sich nie und nirgends hat begeben,\nDas allein veraltet nie!",
    "stanzas": [
      "Lieben Freunde, es gab schönre Zeiten,\nAls die unsern, das ist nicht zu streiten!\nUnd ein edler Volk hat einst gelebt.\nKönnte die Geschichte davon schweigen,\nTausend Steine würden redend zeugen,\nDie man aus dem Schoß der Erde gräbt.\nDoch es ist dahin, es ist verschwunden\nDieses hoch begünstigte Geschlecht.\nWir, wir leben! Unser sind die Stunden,\nUnd der Lebende hat Recht.\nFreunde, es gibt glücklichere Zonen,\nAls das Land, worin wir leidlich wohnen,\nWie der weit gereiste Wandrer spricht.\nAber hat Natur uns viel entzogen,\nWar die Kunst uns freundlich doch gewogen,\nUnser Herz erwarmt an ihrem Licht.\nWill der Lorbeer hier sich nicht gewöhnen,\nWird die Myrte unsers Winters Raub:\nGrünet doch, die Schläfe zu bekrönen,\nUns der Rebe muntres Laub.\nWohl von größerm Leben mag es rauschen,\nWo vier Welten ihre Schätze tauschen,\nAn der Themse, auf dem Markt der Welt.\nTausend Schiffe landen an und gehen;\nDa ist jedes Köstliche zu sehen,\nUnd es herrscht der Erde Gott, das Geld.\nAber nicht im trüben Schlamm der Bäche,\nDer von wilden Regengüssen schwillt,\nAuf des stillen Baches ebner Fläche\nSpiegelt sich das Sonnenbild.\nPrächtiger, als wir in unserm Norden,\nWohnt der Bettler an der Engelspforten,\nDenn er sieht das ewig einz′ge Rom!\nIhn umgibt der Schönheit Glanzgewimmel,\nUnd ein zweiter Himmel in dem Himmel\nSteigt Sankt Peters wunderbarer Dom.\nAber Rom in allem seinem Glanze\nIst ein Grab nur der Vergangenheit;\nLeben duftet nur die frische Pflanze,\nDie die grüne Stunde streut.\nGrößres mag sich anderswo begeben,\nAls bei uns in unserm kleinen Leben;\nNeues - hat die Sonne nie gesehn.\nSehn wir doch das Große aller Zeiten\nAuf den Brettern, die die Welt bedeuten,\nSinnvoll still an uns vorüber gehn.\nAlles wiederholt sich nur im Leben,\nEwig jung ist nur die Phantasie.\nWas sich nie und nirgends hat begeben,\nDas allein veraltet nie!"
    ],
    "verseCount": 50,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Freundschaft",
      "Gemeinschaft"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      2,
      4,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "An die Freunde",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-23-der-freundschaft-immergrun",
    "title": "Der Freundschaft Immergrün",
    "author": "Hoffmann von Fallersleben",
    "year": 1825,
    "userText": "Glücklich, was in Lieb und Treue\nsich hienieden einst verband\nund sich immerfort aufs Neue\nnoch wie weiland wiederfand!\nSchön wie eine liebe Sage\nklinget die Erinnerung\nund im Zauber schöner Tage\nfühlt das Herz sich wieder jung.\nSo nur gibt′s für uns kein Altern,\nkein Verwelken, kein Verblühn,\nwenn wir treu verbunden halten\nfest der Freundschaft Immergrün.",
    "canonicalText": null,
    "userStanzas": [
      "Glücklich, was in Lieb und Treue\nsich hienieden einst verband\nund sich immerfort aufs Neue\nnoch wie weiland wiederfand!\nSchön wie eine liebe Sage\nklinget die Erinnerung\nund im Zauber schöner Tage\nfühlt das Herz sich wieder jung.\nSo nur gibt′s für uns kein Altern,\nkein Verwelken, kein Verblühn,\nwenn wir treu verbunden halten\nfest der Freundschaft Immergrün."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Glücklich, was in Lieb und Treue\nsich hienieden einst verband\nund sich immerfort aufs Neue\nnoch wie weiland wiederfand!\nSchön wie eine liebe Sage\nklinget die Erinnerung\nund im Zauber schöner Tage\nfühlt das Herz sich wieder jung.\nSo nur gibt′s für uns kein Altern,\nkein Verwelken, kein Verblühn,\nwenn wir treu verbunden halten\nfest der Freundschaft Immergrün.",
    "stanzas": [
      "Glücklich, was in Lieb und Treue\nsich hienieden einst verband\nund sich immerfort aufs Neue\nnoch wie weiland wiederfand!\nSchön wie eine liebe Sage\nklinget die Erinnerung\nund im Zauber schöner Tage\nfühlt das Herz sich wieder jung.\nSo nur gibt′s für uns kein Altern,\nkein Verwelken, kein Verblühn,\nwenn wir treu verbunden halten\nfest der Freundschaft Immergrün."
    ],
    "verseCount": 12,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Freundschaft",
      "Gemeinschaft"
    ],
    "genre": "songLike",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      2,
      4,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Der Freundschaft Immergrün",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-24-freunde",
    "title": "Freunde",
    "author": "Wilhelm Busch",
    "year": 1890,
    "userText": "Man erwirbt keine Freunde,\nman erkennt sie.",
    "canonicalText": null,
    "userStanzas": [
      "Man erwirbt keine Freunde,\nman erkennt sie."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Man erwirbt keine Freunde,\nman erkennt sie.",
    "stanzas": [
      "Man erwirbt keine Freunde,\nman erkennt sie."
    ],
    "verseCount": 2,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Freundschaft",
      "Gemeinschaft"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      2,
      4,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Freunde",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-25-an-einen-freund",
    "title": "An einen Freund",
    "author": "Friedrich Hebbel",
    "year": 1840,
    "userText": "Was dir Schlimmes oder Gutes\nAuch das Leben bringen kann,\nNimmst du stets gelaßnen Mutes\nUnd zufriednen Sinnes an.\nNur das Ganze macht dir Sorgen,\nNur, was nie ein Mensch ermißt,\nOb ein Rätsel drin verborgen,\nUnd ob dies zu lösen ist.\nKann der Buchstab′ denn ergründen,\nWas das Wort bedeuten soll?\nWenn sich alle treu verbunden,\nWird es ja von selber voll.\nNimm die Traube, wie die Beere,\nNimm das Leben, wie den Tag!\nWas es auch zuletzt beschere,\nImmer bleibt′s ein Lustgelag!",
    "canonicalText": null,
    "userStanzas": [
      "Was dir Schlimmes oder Gutes\nAuch das Leben bringen kann,\nNimmst du stets gelaßnen Mutes\nUnd zufriednen Sinnes an.\nNur das Ganze macht dir Sorgen,\nNur, was nie ein Mensch ermißt,\nOb ein Rätsel drin verborgen,\nUnd ob dies zu lösen ist.\nKann der Buchstab′ denn ergründen,\nWas das Wort bedeuten soll?\nWenn sich alle treu verbunden,\nWird es ja von selber voll.\nNimm die Traube, wie die Beere,\nNimm das Leben, wie den Tag!\nWas es auch zuletzt beschere,\nImmer bleibt′s ein Lustgelag!"
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Was dir Schlimmes oder Gutes\nAuch das Leben bringen kann,\nNimmst du stets gelaßnen Mutes\nUnd zufriednen Sinnes an.\nNur das Ganze macht dir Sorgen,\nNur, was nie ein Mensch ermißt,\nOb ein Rätsel drin verborgen,\nUnd ob dies zu lösen ist.\nKann der Buchstab′ denn ergründen,\nWas das Wort bedeuten soll?\nWenn sich alle treu verbunden,\nWird es ja von selber voll.\nNimm die Traube, wie die Beere,\nNimm das Leben, wie den Tag!\nWas es auch zuletzt beschere,\nImmer bleibt′s ein Lustgelag!",
    "stanzas": [
      "Was dir Schlimmes oder Gutes\nAuch das Leben bringen kann,\nNimmst du stets gelaßnen Mutes\nUnd zufriednen Sinnes an.\nNur das Ganze macht dir Sorgen,\nNur, was nie ein Mensch ermißt,\nOb ein Rätsel drin verborgen,\nUnd ob dies zu lösen ist.\nKann der Buchstab′ denn ergründen,\nWas das Wort bedeuten soll?\nWenn sich alle treu verbunden,\nWird es ja von selber voll.\nNimm die Traube, wie die Beere,\nNimm das Leben, wie den Tag!\nWas es auch zuletzt beschere,\nImmer bleibt′s ein Lustgelag!"
    ],
    "verseCount": 16,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Freundschaft",
      "Gemeinschaft"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      2,
      4,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "An einen Freund",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-26-an-meine-freunde",
    "title": "An meine Freunde",
    "author": "Novalis",
    "year": 1800,
    "userText": "Sind wir denn hier das Spiel des Glückes\nDas sich bald hier bald dorthin neigt,\nUnd liegen auf der Waage des Geschickes,\nDie vorhin sank, nun steigt?\nUnd sollen immer denn Tyrannen\nBeherrschen unser Wohl und Leid\nErhöhen, wenn sie Redliche verbannen\nDie Niederträchtigkeit!\nUnd stolze Priester uns gebieten\nWas unsre Seele glauben soll,\nMit Feuer und Schwert verkündigen den Frieden\nDes heiligen Wahnsinns voll!\nUnd Kriege ganze Nationen\nIns Unglück stürzen um den Ruhm\nDaß Einem untertan mehr Regionen\nAls Waffeneigentum?\nUnd soll uns dann in Fesseln zwingen\nDie nachgeahmte Häßlichkeit\nUm Weihrauch einem Mächtigen zu bringen\nNur groß durch Schändlichkeit?\nNein! Freunde kommt, laßt uns entfliehen\nDen Fesseln, die Europa beut,\nZu Unverdorbnen nach Taiti ziehen\nZu ihrer Redlichkeit.\nUnd laßt uns da das Volk belehren\nWie Orpheus einstens tat;\nDas Saitenspiel soll ihrer Wildheit wehren\nErrichten einen Staat,\nWo nur Natur den Szepter führet,\nDurch weise Künste unterstützt,\nUnd jeder in dem Stand, der ihm gebühret,\nDem Vaterlande nützt.\nUnd wo nicht blutige Trophäen\nAuf offnem Platze aufgestellt,\nUnd nicht dem Gott zu dem wir innig flehen\nEin blutig Opfer fällt.",
    "canonicalText": null,
    "userStanzas": [
      "Sind wir denn hier das Spiel des Glückes\nDas sich bald hier bald dorthin neigt,\nUnd liegen auf der Waage des Geschickes,\nDie vorhin sank, nun steigt?\nUnd sollen immer denn Tyrannen\nBeherrschen unser Wohl und Leid\nErhöhen, wenn sie Redliche verbannen\nDie Niederträchtigkeit!\nUnd stolze Priester uns gebieten\nWas unsre Seele glauben soll,\nMit Feuer und Schwert verkündigen den Frieden\nDes heiligen Wahnsinns voll!\nUnd Kriege ganze Nationen\nIns Unglück stürzen um den Ruhm\nDaß Einem untertan mehr Regionen\nAls Waffeneigentum?\nUnd soll uns dann in Fesseln zwingen\nDie nachgeahmte Häßlichkeit\nUm Weihrauch einem Mächtigen zu bringen\nNur groß durch Schändlichkeit?\nNein! Freunde kommt, laßt uns entfliehen\nDen Fesseln, die Europa beut,\nZu Unverdorbnen nach Taiti ziehen\nZu ihrer Redlichkeit.\nUnd laßt uns da das Volk belehren\nWie Orpheus einstens tat;\nDas Saitenspiel soll ihrer Wildheit wehren\nErrichten einen Staat,\nWo nur Natur den Szepter führet,\nDurch weise Künste unterstützt,\nUnd jeder in dem Stand, der ihm gebühret,\nDem Vaterlande nützt.\nUnd wo nicht blutige Trophäen\nAuf offnem Platze aufgestellt,\nUnd nicht dem Gott zu dem wir innig flehen\nEin blutig Opfer fällt."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Sind wir denn hier das Spiel des Glückes\nDas sich bald hier bald dorthin neigt,\nUnd liegen auf der Waage des Geschickes,\nDie vorhin sank, nun steigt?\nUnd sollen immer denn Tyrannen\nBeherrschen unser Wohl und Leid\nErhöhen, wenn sie Redliche verbannen\nDie Niederträchtigkeit!\nUnd stolze Priester uns gebieten\nWas unsre Seele glauben soll,\nMit Feuer und Schwert verkündigen den Frieden\nDes heiligen Wahnsinns voll!\nUnd Kriege ganze Nationen\nIns Unglück stürzen um den Ruhm\nDaß Einem untertan mehr Regionen\nAls Waffeneigentum?\nUnd soll uns dann in Fesseln zwingen\nDie nachgeahmte Häßlichkeit\nUm Weihrauch einem Mächtigen zu bringen\nNur groß durch Schändlichkeit?\nNein! Freunde kommt, laßt uns entfliehen\nDen Fesseln, die Europa beut,\nZu Unverdorbnen nach Taiti ziehen\nZu ihrer Redlichkeit.\nUnd laßt uns da das Volk belehren\nWie Orpheus einstens tat;\nDas Saitenspiel soll ihrer Wildheit wehren\nErrichten einen Staat,\nWo nur Natur den Szepter führet,\nDurch weise Künste unterstützt,\nUnd jeder in dem Stand, der ihm gebühret,\nDem Vaterlande nützt.\nUnd wo nicht blutige Trophäen\nAuf offnem Platze aufgestellt,\nUnd nicht dem Gott zu dem wir innig flehen\nEin blutig Opfer fällt.",
    "stanzas": [
      "Sind wir denn hier das Spiel des Glückes\nDas sich bald hier bald dorthin neigt,\nUnd liegen auf der Waage des Geschickes,\nDie vorhin sank, nun steigt?\nUnd sollen immer denn Tyrannen\nBeherrschen unser Wohl und Leid\nErhöhen, wenn sie Redliche verbannen\nDie Niederträchtigkeit!\nUnd stolze Priester uns gebieten\nWas unsre Seele glauben soll,\nMit Feuer und Schwert verkündigen den Frieden\nDes heiligen Wahnsinns voll!\nUnd Kriege ganze Nationen\nIns Unglück stürzen um den Ruhm\nDaß Einem untertan mehr Regionen\nAls Waffeneigentum?\nUnd soll uns dann in Fesseln zwingen\nDie nachgeahmte Häßlichkeit\nUm Weihrauch einem Mächtigen zu bringen\nNur groß durch Schändlichkeit?\nNein! Freunde kommt, laßt uns entfliehen\nDen Fesseln, die Europa beut,\nZu Unverdorbnen nach Taiti ziehen\nZu ihrer Redlichkeit.\nUnd laßt uns da das Volk belehren\nWie Orpheus einstens tat;\nDas Saitenspiel soll ihrer Wildheit wehren\nErrichten einen Staat,\nWo nur Natur den Szepter führet,\nDurch weise Künste unterstützt,\nUnd jeder in dem Stand, der ihm gebühret,\nDem Vaterlande nützt.\nUnd wo nicht blutige Trophäen\nAuf offnem Platze aufgestellt,\nUnd nicht dem Gott zu dem wir innig flehen\nEin blutig Opfer fällt."
    ],
    "verseCount": 36,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Freundschaft",
      "Gemeinschaft"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      2,
      4,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "An meine Freunde",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-27-die-burgschaft",
    "title": "Die Bürgschaft",
    "author": "Friedrich Schiller",
    "year": 1798,
    "userText": "Zu Dionys, dem Tyrannen, schlich\nDamon, den Dolch im Gewande;\nIhn schlugen die Häscher in Bande.\n\"Was wolltest du mit dem Dolche, sprich!\"\nEntgegnet ihm finster der Wüterich.\n\"Die Stadt vom Tyrannen befreien!\"\n\"Das sollst du am Kreuze bereuen.\"\n\"Ich bin\", spricht jener, \"zu sterben bereit\nUnd bitte nicht um mein Leben;\nDoch willst du Gnade mir geben,\nIch flehe dich um drei Tage Zeit,\nBis ich die Schwester dem Gatten gefreit;\nIch lasse den Freund dir als Bürgen -\nIhn magst du, entrinn ich, erwürgen.\"\nDa lächelt der König mit arger List\nUnd spricht nach kurzem Bedenken:\n\"Drei Tage will ich dir schenken.\nDoch wisse, wenn sie verstrichen, die Frist,\nEh du zurück mir gegeben bist,\nSo muß er statt deiner erblassen,\nDoch dir ist die Strafe erlassen.\"\nUnd er kommt zum Freunde: \"Der König gebeut,\nDaß ich am Kreuz mit dem Leben\nBezahle das frevelnde Streben;\nDoch will er mir gönnen drei Tage Zeit,\nBis ich die Schwester dem Gatten gefreit.\nSo bleib du dem König zum Pfande,\nBis ich komme, zu lösen die Bande.\"\nUnd schweigend umarmt ihn der treue Freund\nUnd liefert sich aus dem Tyrannen,\nDer andere ziehet von dannen.\nUnd ehe das dritte Morgenrot scheint,\nHat er schnell dem Gatten die Schwester vereint,\nEilt heim mit sorgender Seele,\nDamit er die Frist nicht verfehle.\nDa gießt unendlicher Regen herab,\nVon den Bergen stürzen die Quellen,\nUnd die Bäche, die Ströme schwellen.\nUnd er kommt ans Ufer mit wanderndem Stab -\nDa reißet die Brücke der Strudel hinab,\nUnd donnernd sprengen die Wogen\nDes Gewölbes krachenden Bogen.\nUnd trostlos irrt er an Ufers Rand;\nWie weit er auch spähet und blicket\nUnd die Stimme, die rufende, schicket -\nDa stößet kein Nachen vom sichern Strand,\nDer ihn setze an das gewünschte Land,\nKein Schiffer lenket die Fähre,\nUnd der wilde Strom wird zum Meere.\nDa sinkt er ans Ufer und weint und fleht,\nDie Hände zum Zeus erhoben:\n\"O hemme des Stromes Toben!\nEs eilen die Stunden, im Mittag steht\nDie Sonne, und wenn sie niedergeht\nUnd ich kann die Stadt nicht erreichen,\nSo muß der Freund mir erbleichen.\"\nDoch wachsend erneut sich des Stromes Wut,\nUnd Welle auf Welle zerrinnet,\nUnd Stund an Stunde entrinnet.\nDa treibt ihn die Angst, da faßt er sich Mut\nUnd wirft sich hinein in die brausende Flut,′\nUnd teilt mit gewaltigen Armen\nDen Strom, und ein Gott hat Erbarmen.\nUnd gewinnt das Ufer und eilet fort\nUnd danket dem rettenden Gotte;\nDa stürzet die raubende Rotte\nHervor aus des Waldes nächtlichem Ort,\nDen Pfad ihm sperrend, und schnaubend Mord\nUnd hemmet des Wanderers Eile\nMit drohend geschwungener Keule.\n\"Was wollt ihr?\" ruft er, vor Schrecken bleich,\n\"Ich habe nichts als mein Leben,\nDas muß ich dem Könige geben!\"\nUnd entreißet die Keule dem nächsten gleich:\n\"Um des Freundes willen erbarmet euch!\"\nUnd drei mit gewaltigem Streichen\nErlegt er, die andern entweichen.\nUnd die Sonne versendet glühenden Brand,\nUnd vor der unendlichen Mühe\nErmattet sinken die Kniee:\n\"O hast du mich gnädig aus Räuberhand,\nAus dem Strom mich gerettet ans heilige Land,\nUnd soll hier verschmachtend verderben,\nUnd der Freund mir, der liebende, sterben!\"\nUnd horch! da sprudelt es silberhell\nGanz nahe, wie rieselndes Rauschen,\nUnd stille hält er, zu lauschen;\nUnd sieh, aus dem Felsen, geschwätzig, schnell,\nSpringt murmelnd hervor ein lebendiger Quell,\nUnd freudig bückt er sich nieder\nUnd erfrischet die brennenden Glieder.\nUnd die Sonne blickt durch der Zweige Grün\nUnd malt auf den glänzenden Matten\nDer Bäume gigantische Schatten;\nUnd zwei Wanderer sieht er die Straße ziehn,\nWill eilenden Laufes vorüber fliehn,\nDa hört er die Worte sie sagen:\n\"Jetzt wird er ans Kreuz geschlagen.\"\nUnd die Angst beflügelt den eilenden Fuß,\nIhn jagen der Sorge Qualen;\nDa schimmern in Abendrots Strahlen\nVon ferne die Zinnen von Syrakus,\nUnd entgegen kommt ihm Philostratus,\nDes Hauses redlicher Hüter,\nDer erkennet entsetzt den Gebieter:\n\"Zurück! du rettest den Freund nicht mehr,\nSo rette das eigene Leben!\nDen Tod erleidet er eben.\nVon Stunde zu Stunde gewartet' er\nMit hoffender Seele der Wiederkehr,\nIhm konnte den mutigen Glauben\nDer Hohn des Tyrannen nicht rauben.\" -\n\"Und ist es zu spät, und kann ich ihm nicht,\nEin Retter, willkommen erscheinen,\nSo soll mich der Tod ihm vereinen.\nDes rühme der blutge Tyrann sich nicht,\nDaß der Freund dem Freunde gebrochen die Pflicht,\nEr schlachte der Opfer zweie\nUnd glaube an Liebe und Treue!\"\nUnd die Sonne geht unter, da steht er am Tor\nUnd sieht das Kreuz schon erhöhet,\nDas sie Menge gaffend umstehet;\nAn dem Seile schon zieht man den Freund empor,\nDa zertrennt er gewaltig den dichten Chor:\n\"Mich, Henker!\" ruft er, \"erwürget!\nDa bin ich, für den er gebürget!\"\nUnd Erstaunen ergreift das Volk umher,\nIn den Armen liegen sich beide\nUnd weinen vor Schmerzen und Freude.\nDa sieht man kein Auge tränenleer,\nUnd zum König bringt man die Wundermär;\nDer fühlt ein menschliches Rühren,\nLäßt schnell vor den Thron sie führen.\nUnd blicket sie lange verwundert an;\nDrauf spricht er: \"Es ist euch gelungen,\nIhr habt das Herz mir bezwungen,\nUnd die Treue, sie ist doch kein kein leerer Wahn -\nSo nehmet auch mich zum Genossen an.\nIch sei, Gewährt mir die Bitte,\nIn eurem Bunde der Dritte.",
    "canonicalText": null,
    "userStanzas": [
      "Zu Dionys, dem Tyrannen, schlich\nDamon, den Dolch im Gewande;\nIhn schlugen die Häscher in Bande.\n\"Was wolltest du mit dem Dolche, sprich!\"\nEntgegnet ihm finster der Wüterich.\n\"Die Stadt vom Tyrannen befreien!\"\n\"Das sollst du am Kreuze bereuen.\"\n\"Ich bin\", spricht jener, \"zu sterben bereit\nUnd bitte nicht um mein Leben;\nDoch willst du Gnade mir geben,\nIch flehe dich um drei Tage Zeit,\nBis ich die Schwester dem Gatten gefreit;\nIch lasse den Freund dir als Bürgen -\nIhn magst du, entrinn ich, erwürgen.\"\nDa lächelt der König mit arger List\nUnd spricht nach kurzem Bedenken:\n\"Drei Tage will ich dir schenken.\nDoch wisse, wenn sie verstrichen, die Frist,\nEh du zurück mir gegeben bist,\nSo muß er statt deiner erblassen,\nDoch dir ist die Strafe erlassen.\"\nUnd er kommt zum Freunde: \"Der König gebeut,\nDaß ich am Kreuz mit dem Leben\nBezahle das frevelnde Streben;\nDoch will er mir gönnen drei Tage Zeit,\nBis ich die Schwester dem Gatten gefreit.\nSo bleib du dem König zum Pfande,\nBis ich komme, zu lösen die Bande.\"\nUnd schweigend umarmt ihn der treue Freund\nUnd liefert sich aus dem Tyrannen,\nDer andere ziehet von dannen.\nUnd ehe das dritte Morgenrot scheint,\nHat er schnell dem Gatten die Schwester vereint,\nEilt heim mit sorgender Seele,\nDamit er die Frist nicht verfehle.\nDa gießt unendlicher Regen herab,\nVon den Bergen stürzen die Quellen,\nUnd die Bäche, die Ströme schwellen.\nUnd er kommt ans Ufer mit wanderndem Stab -\nDa reißet die Brücke der Strudel hinab,\nUnd donnernd sprengen die Wogen\nDes Gewölbes krachenden Bogen.\nUnd trostlos irrt er an Ufers Rand;\nWie weit er auch spähet und blicket\nUnd die Stimme, die rufende, schicket -\nDa stößet kein Nachen vom sichern Strand,\nDer ihn setze an das gewünschte Land,\nKein Schiffer lenket die Fähre,\nUnd der wilde Strom wird zum Meere.\nDa sinkt er ans Ufer und weint und fleht,\nDie Hände zum Zeus erhoben:\n\"O hemme des Stromes Toben!\nEs eilen die Stunden, im Mittag steht\nDie Sonne, und wenn sie niedergeht\nUnd ich kann die Stadt nicht erreichen,\nSo muß der Freund mir erbleichen.\"\nDoch wachsend erneut sich des Stromes Wut,\nUnd Welle auf Welle zerrinnet,\nUnd Stund an Stunde entrinnet.\nDa treibt ihn die Angst, da faßt er sich Mut\nUnd wirft sich hinein in die brausende Flut,′\nUnd teilt mit gewaltigen Armen\nDen Strom, und ein Gott hat Erbarmen.\nUnd gewinnt das Ufer und eilet fort\nUnd danket dem rettenden Gotte;\nDa stürzet die raubende Rotte\nHervor aus des Waldes nächtlichem Ort,\nDen Pfad ihm sperrend, und schnaubend Mord\nUnd hemmet des Wanderers Eile\nMit drohend geschwungener Keule.\n\"Was wollt ihr?\" ruft er, vor Schrecken bleich,\n\"Ich habe nichts als mein Leben,\nDas muß ich dem Könige geben!\"\nUnd entreißet die Keule dem nächsten gleich:\n\"Um des Freundes willen erbarmet euch!\"\nUnd drei mit gewaltigem Streichen\nErlegt er, die andern entweichen.\nUnd die Sonne versendet glühenden Brand,\nUnd vor der unendlichen Mühe\nErmattet sinken die Kniee:\n\"O hast du mich gnädig aus Räuberhand,\nAus dem Strom mich gerettet ans heilige Land,\nUnd soll hier verschmachtend verderben,\nUnd der Freund mir, der liebende, sterben!\"\nUnd horch! da sprudelt es silberhell\nGanz nahe, wie rieselndes Rauschen,\nUnd stille hält er, zu lauschen;\nUnd sieh, aus dem Felsen, geschwätzig, schnell,\nSpringt murmelnd hervor ein lebendiger Quell,\nUnd freudig bückt er sich nieder\nUnd erfrischet die brennenden Glieder.\nUnd die Sonne blickt durch der Zweige Grün\nUnd malt auf den glänzenden Matten\nDer Bäume gigantische Schatten;\nUnd zwei Wanderer sieht er die Straße ziehn,\nWill eilenden Laufes vorüber fliehn,\nDa hört er die Worte sie sagen:\n\"Jetzt wird er ans Kreuz geschlagen.\"\nUnd die Angst beflügelt den eilenden Fuß,\nIhn jagen der Sorge Qualen;\nDa schimmern in Abendrots Strahlen\nVon ferne die Zinnen von Syrakus,\nUnd entgegen kommt ihm Philostratus,\nDes Hauses redlicher Hüter,\nDer erkennet entsetzt den Gebieter:\n\"Zurück! du rettest den Freund nicht mehr,\nSo rette das eigene Leben!\nDen Tod erleidet er eben.\nVon Stunde zu Stunde gewartet' er\nMit hoffender Seele der Wiederkehr,\nIhm konnte den mutigen Glauben\nDer Hohn des Tyrannen nicht rauben.\" -\n\"Und ist es zu spät, und kann ich ihm nicht,\nEin Retter, willkommen erscheinen,\nSo soll mich der Tod ihm vereinen.\nDes rühme der blutge Tyrann sich nicht,\nDaß der Freund dem Freunde gebrochen die Pflicht,\nEr schlachte der Opfer zweie\nUnd glaube an Liebe und Treue!\"\nUnd die Sonne geht unter, da steht er am Tor\nUnd sieht das Kreuz schon erhöhet,\nDas sie Menge gaffend umstehet;\nAn dem Seile schon zieht man den Freund empor,\nDa zertrennt er gewaltig den dichten Chor:\n\"Mich, Henker!\" ruft er, \"erwürget!\nDa bin ich, für den er gebürget!\"\nUnd Erstaunen ergreift das Volk umher,\nIn den Armen liegen sich beide\nUnd weinen vor Schmerzen und Freude.\nDa sieht man kein Auge tränenleer,\nUnd zum König bringt man die Wundermär;\nDer fühlt ein menschliches Rühren,\nLäßt schnell vor den Thron sie führen.\nUnd blicket sie lange verwundert an;\nDrauf spricht er: \"Es ist euch gelungen,\nIhr habt das Herz mir bezwungen,\nUnd die Treue, sie ist doch kein kein leerer Wahn -\nSo nehmet auch mich zum Genossen an.\nIch sei, Gewährt mir die Bitte,\nIn eurem Bunde der Dritte."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Zu Dionys, dem Tyrannen, schlich\nDamon, den Dolch im Gewande;\nIhn schlugen die Häscher in Bande.\n\"Was wolltest du mit dem Dolche, sprich!\"\nEntgegnet ihm finster der Wüterich.\n\"Die Stadt vom Tyrannen befreien!\"\n\"Das sollst du am Kreuze bereuen.\"\n\"Ich bin\", spricht jener, \"zu sterben bereit\nUnd bitte nicht um mein Leben;\nDoch willst du Gnade mir geben,\nIch flehe dich um drei Tage Zeit,\nBis ich die Schwester dem Gatten gefreit;\nIch lasse den Freund dir als Bürgen -\nIhn magst du, entrinn ich, erwürgen.\"\nDa lächelt der König mit arger List\nUnd spricht nach kurzem Bedenken:\n\"Drei Tage will ich dir schenken.\nDoch wisse, wenn sie verstrichen, die Frist,\nEh du zurück mir gegeben bist,\nSo muß er statt deiner erblassen,\nDoch dir ist die Strafe erlassen.\"\nUnd er kommt zum Freunde: \"Der König gebeut,\nDaß ich am Kreuz mit dem Leben\nBezahle das frevelnde Streben;\nDoch will er mir gönnen drei Tage Zeit,\nBis ich die Schwester dem Gatten gefreit.\nSo bleib du dem König zum Pfande,\nBis ich komme, zu lösen die Bande.\"\nUnd schweigend umarmt ihn der treue Freund\nUnd liefert sich aus dem Tyrannen,\nDer andere ziehet von dannen.\nUnd ehe das dritte Morgenrot scheint,\nHat er schnell dem Gatten die Schwester vereint,\nEilt heim mit sorgender Seele,\nDamit er die Frist nicht verfehle.\nDa gießt unendlicher Regen herab,\nVon den Bergen stürzen die Quellen,\nUnd die Bäche, die Ströme schwellen.\nUnd er kommt ans Ufer mit wanderndem Stab -\nDa reißet die Brücke der Strudel hinab,\nUnd donnernd sprengen die Wogen\nDes Gewölbes krachenden Bogen.\nUnd trostlos irrt er an Ufers Rand;\nWie weit er auch spähet und blicket\nUnd die Stimme, die rufende, schicket -\nDa stößet kein Nachen vom sichern Strand,\nDer ihn setze an das gewünschte Land,\nKein Schiffer lenket die Fähre,\nUnd der wilde Strom wird zum Meere.\nDa sinkt er ans Ufer und weint und fleht,\nDie Hände zum Zeus erhoben:\n\"O hemme des Stromes Toben!\nEs eilen die Stunden, im Mittag steht\nDie Sonne, und wenn sie niedergeht\nUnd ich kann die Stadt nicht erreichen,\nSo muß der Freund mir erbleichen.\"\nDoch wachsend erneut sich des Stromes Wut,\nUnd Welle auf Welle zerrinnet,\nUnd Stund an Stunde entrinnet.\nDa treibt ihn die Angst, da faßt er sich Mut\nUnd wirft sich hinein in die brausende Flut,′\nUnd teilt mit gewaltigen Armen\nDen Strom, und ein Gott hat Erbarmen.\nUnd gewinnt das Ufer und eilet fort\nUnd danket dem rettenden Gotte;\nDa stürzet die raubende Rotte\nHervor aus des Waldes nächtlichem Ort,\nDen Pfad ihm sperrend, und schnaubend Mord\nUnd hemmet des Wanderers Eile\nMit drohend geschwungener Keule.\n\"Was wollt ihr?\" ruft er, vor Schrecken bleich,\n\"Ich habe nichts als mein Leben,\nDas muß ich dem Könige geben!\"\nUnd entreißet die Keule dem nächsten gleich:\n\"Um des Freundes willen erbarmet euch!\"\nUnd drei mit gewaltigem Streichen\nErlegt er, die andern entweichen.\nUnd die Sonne versendet glühenden Brand,\nUnd vor der unendlichen Mühe\nErmattet sinken die Kniee:\n\"O hast du mich gnädig aus Räuberhand,\nAus dem Strom mich gerettet ans heilige Land,\nUnd soll hier verschmachtend verderben,\nUnd der Freund mir, der liebende, sterben!\"\nUnd horch! da sprudelt es silberhell\nGanz nahe, wie rieselndes Rauschen,\nUnd stille hält er, zu lauschen;\nUnd sieh, aus dem Felsen, geschwätzig, schnell,\nSpringt murmelnd hervor ein lebendiger Quell,\nUnd freudig bückt er sich nieder\nUnd erfrischet die brennenden Glieder.\nUnd die Sonne blickt durch der Zweige Grün\nUnd malt auf den glänzenden Matten\nDer Bäume gigantische Schatten;\nUnd zwei Wanderer sieht er die Straße ziehn,\nWill eilenden Laufes vorüber fliehn,\nDa hört er die Worte sie sagen:\n\"Jetzt wird er ans Kreuz geschlagen.\"\nUnd die Angst beflügelt den eilenden Fuß,\nIhn jagen der Sorge Qualen;\nDa schimmern in Abendrots Strahlen\nVon ferne die Zinnen von Syrakus,\nUnd entgegen kommt ihm Philostratus,\nDes Hauses redlicher Hüter,\nDer erkennet entsetzt den Gebieter:\n\"Zurück! du rettest den Freund nicht mehr,\nSo rette das eigene Leben!\nDen Tod erleidet er eben.\nVon Stunde zu Stunde gewartet' er\nMit hoffender Seele der Wiederkehr,\nIhm konnte den mutigen Glauben\nDer Hohn des Tyrannen nicht rauben.\" -\n\"Und ist es zu spät, und kann ich ihm nicht,\nEin Retter, willkommen erscheinen,\nSo soll mich der Tod ihm vereinen.\nDes rühme der blutge Tyrann sich nicht,\nDaß der Freund dem Freunde gebrochen die Pflicht,\nEr schlachte der Opfer zweie\nUnd glaube an Liebe und Treue!\"\nUnd die Sonne geht unter, da steht er am Tor\nUnd sieht das Kreuz schon erhöhet,\nDas sie Menge gaffend umstehet;\nAn dem Seile schon zieht man den Freund empor,\nDa zertrennt er gewaltig den dichten Chor:\n\"Mich, Henker!\" ruft er, \"erwürget!\nDa bin ich, für den er gebürget!\"\nUnd Erstaunen ergreift das Volk umher,\nIn den Armen liegen sich beide\nUnd weinen vor Schmerzen und Freude.\nDa sieht man kein Auge tränenleer,\nUnd zum König bringt man die Wundermär;\nDer fühlt ein menschliches Rühren,\nLäßt schnell vor den Thron sie führen.\nUnd blicket sie lange verwundert an;\nDrauf spricht er: \"Es ist euch gelungen,\nIhr habt das Herz mir bezwungen,\nUnd die Treue, sie ist doch kein kein leerer Wahn -\nSo nehmet auch mich zum Genossen an.\nIch sei, Gewährt mir die Bitte,\nIn eurem Bunde der Dritte.",
    "stanzas": [
      "Zu Dionys, dem Tyrannen, schlich\nDamon, den Dolch im Gewande;\nIhn schlugen die Häscher in Bande.\n\"Was wolltest du mit dem Dolche, sprich!\"\nEntgegnet ihm finster der Wüterich.\n\"Die Stadt vom Tyrannen befreien!\"\n\"Das sollst du am Kreuze bereuen.\"\n\"Ich bin\", spricht jener, \"zu sterben bereit\nUnd bitte nicht um mein Leben;\nDoch willst du Gnade mir geben,\nIch flehe dich um drei Tage Zeit,\nBis ich die Schwester dem Gatten gefreit;\nIch lasse den Freund dir als Bürgen -\nIhn magst du, entrinn ich, erwürgen.\"\nDa lächelt der König mit arger List\nUnd spricht nach kurzem Bedenken:\n\"Drei Tage will ich dir schenken.\nDoch wisse, wenn sie verstrichen, die Frist,\nEh du zurück mir gegeben bist,\nSo muß er statt deiner erblassen,\nDoch dir ist die Strafe erlassen.\"\nUnd er kommt zum Freunde: \"Der König gebeut,\nDaß ich am Kreuz mit dem Leben\nBezahle das frevelnde Streben;\nDoch will er mir gönnen drei Tage Zeit,\nBis ich die Schwester dem Gatten gefreit.\nSo bleib du dem König zum Pfande,\nBis ich komme, zu lösen die Bande.\"\nUnd schweigend umarmt ihn der treue Freund\nUnd liefert sich aus dem Tyrannen,\nDer andere ziehet von dannen.\nUnd ehe das dritte Morgenrot scheint,\nHat er schnell dem Gatten die Schwester vereint,\nEilt heim mit sorgender Seele,\nDamit er die Frist nicht verfehle.\nDa gießt unendlicher Regen herab,\nVon den Bergen stürzen die Quellen,\nUnd die Bäche, die Ströme schwellen.\nUnd er kommt ans Ufer mit wanderndem Stab -\nDa reißet die Brücke der Strudel hinab,\nUnd donnernd sprengen die Wogen\nDes Gewölbes krachenden Bogen.\nUnd trostlos irrt er an Ufers Rand;\nWie weit er auch spähet und blicket\nUnd die Stimme, die rufende, schicket -\nDa stößet kein Nachen vom sichern Strand,\nDer ihn setze an das gewünschte Land,\nKein Schiffer lenket die Fähre,\nUnd der wilde Strom wird zum Meere.\nDa sinkt er ans Ufer und weint und fleht,\nDie Hände zum Zeus erhoben:\n\"O hemme des Stromes Toben!\nEs eilen die Stunden, im Mittag steht\nDie Sonne, und wenn sie niedergeht\nUnd ich kann die Stadt nicht erreichen,\nSo muß der Freund mir erbleichen.\"\nDoch wachsend erneut sich des Stromes Wut,\nUnd Welle auf Welle zerrinnet,\nUnd Stund an Stunde entrinnet.\nDa treibt ihn die Angst, da faßt er sich Mut\nUnd wirft sich hinein in die brausende Flut,′\nUnd teilt mit gewaltigen Armen\nDen Strom, und ein Gott hat Erbarmen.\nUnd gewinnt das Ufer und eilet fort\nUnd danket dem rettenden Gotte;\nDa stürzet die raubende Rotte\nHervor aus des Waldes nächtlichem Ort,\nDen Pfad ihm sperrend, und schnaubend Mord\nUnd hemmet des Wanderers Eile\nMit drohend geschwungener Keule.\n\"Was wollt ihr?\" ruft er, vor Schrecken bleich,\n\"Ich habe nichts als mein Leben,\nDas muß ich dem Könige geben!\"\nUnd entreißet die Keule dem nächsten gleich:\n\"Um des Freundes willen erbarmet euch!\"\nUnd drei mit gewaltigem Streichen\nErlegt er, die andern entweichen.\nUnd die Sonne versendet glühenden Brand,\nUnd vor der unendlichen Mühe\nErmattet sinken die Kniee:\n\"O hast du mich gnädig aus Räuberhand,\nAus dem Strom mich gerettet ans heilige Land,\nUnd soll hier verschmachtend verderben,\nUnd der Freund mir, der liebende, sterben!\"\nUnd horch! da sprudelt es silberhell\nGanz nahe, wie rieselndes Rauschen,\nUnd stille hält er, zu lauschen;\nUnd sieh, aus dem Felsen, geschwätzig, schnell,\nSpringt murmelnd hervor ein lebendiger Quell,\nUnd freudig bückt er sich nieder\nUnd erfrischet die brennenden Glieder.\nUnd die Sonne blickt durch der Zweige Grün\nUnd malt auf den glänzenden Matten\nDer Bäume gigantische Schatten;\nUnd zwei Wanderer sieht er die Straße ziehn,\nWill eilenden Laufes vorüber fliehn,\nDa hört er die Worte sie sagen:\n\"Jetzt wird er ans Kreuz geschlagen.\"\nUnd die Angst beflügelt den eilenden Fuß,\nIhn jagen der Sorge Qualen;\nDa schimmern in Abendrots Strahlen\nVon ferne die Zinnen von Syrakus,\nUnd entgegen kommt ihm Philostratus,\nDes Hauses redlicher Hüter,\nDer erkennet entsetzt den Gebieter:\n\"Zurück! du rettest den Freund nicht mehr,\nSo rette das eigene Leben!\nDen Tod erleidet er eben.\nVon Stunde zu Stunde gewartet' er\nMit hoffender Seele der Wiederkehr,\nIhm konnte den mutigen Glauben\nDer Hohn des Tyrannen nicht rauben.\" -\n\"Und ist es zu spät, und kann ich ihm nicht,\nEin Retter, willkommen erscheinen,\nSo soll mich der Tod ihm vereinen.\nDes rühme der blutge Tyrann sich nicht,\nDaß der Freund dem Freunde gebrochen die Pflicht,\nEr schlachte der Opfer zweie\nUnd glaube an Liebe und Treue!\"\nUnd die Sonne geht unter, da steht er am Tor\nUnd sieht das Kreuz schon erhöhet,\nDas sie Menge gaffend umstehet;\nAn dem Seile schon zieht man den Freund empor,\nDa zertrennt er gewaltig den dichten Chor:\n\"Mich, Henker!\" ruft er, \"erwürget!\nDa bin ich, für den er gebürget!\"\nUnd Erstaunen ergreift das Volk umher,\nIn den Armen liegen sich beide\nUnd weinen vor Schmerzen und Freude.\nDa sieht man kein Auge tränenleer,\nUnd zum König bringt man die Wundermär;\nDer fühlt ein menschliches Rühren,\nLäßt schnell vor den Thron sie führen.\nUnd blicket sie lange verwundert an;\nDrauf spricht er: \"Es ist euch gelungen,\nIhr habt das Herz mir bezwungen,\nUnd die Treue, sie ist doch kein kein leerer Wahn -\nSo nehmet auch mich zum Genossen an.\nIch sei, Gewährt mir die Bitte,\nIn eurem Bunde der Dritte."
    ],
    "verseCount": 140,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Abschied",
      "Trennung"
    ],
    "genre": "ballad",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "narrative Langform",
      "für Aufgaben ausschnittsweise verwenden"
    ],
    "notableFeatures": [
      "narrative Langform",
      "für Aufgaben ausschnittsweise verwenden"
    ],
    "suitableChapters": [
      3,
      5,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "advanced",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Die Bürgschaft",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-28-abschied",
    "title": "Abschied",
    "author": "Johann Wolfgang von Goethe",
    "year": 1788,
    "userText": "Zu lieblich ist′s, ein Wort zu brechen,\nZu schwer die wohlerkannte Pflicht,\nUnd leider kann man nichts versprechen,\nWas unserm Herzen widerspricht.\nDu übst die alten Zauberlieder,\nDu lockst ihn, der kaum ruhig war,\nZum Schaukelkahn der süßen Torheit wieder,\nErneust, verdoppelst die Gefahr.\nWas suchst du mir dich zu verstecken!\nSei offen, flieh′ nicht meinen Blick!\nFrüh oder spät mußt′ ich′s entdecken,\nUnd hier hast du dein Wort zurück.\nWas ich gesollt, hab′ ich vollendet;\nDurch mich sei dir von nun an nichts verwehrt;\nAllein verzeih′ dem Freund, der sich nun von dir wendet\nUnd still in sich zurückgekehrt.",
    "canonicalText": null,
    "userStanzas": [
      "Zu lieblich ist′s, ein Wort zu brechen,\nZu schwer die wohlerkannte Pflicht,\nUnd leider kann man nichts versprechen,\nWas unserm Herzen widerspricht.\nDu übst die alten Zauberlieder,\nDu lockst ihn, der kaum ruhig war,\nZum Schaukelkahn der süßen Torheit wieder,\nErneust, verdoppelst die Gefahr.\nWas suchst du mir dich zu verstecken!\nSei offen, flieh′ nicht meinen Blick!\nFrüh oder spät mußt′ ich′s entdecken,\nUnd hier hast du dein Wort zurück.\nWas ich gesollt, hab′ ich vollendet;\nDurch mich sei dir von nun an nichts verwehrt;\nAllein verzeih′ dem Freund, der sich nun von dir wendet\nUnd still in sich zurückgekehrt."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Zu lieblich ist′s, ein Wort zu brechen,\nZu schwer die wohlerkannte Pflicht,\nUnd leider kann man nichts versprechen,\nWas unserm Herzen widerspricht.\nDu übst die alten Zauberlieder,\nDu lockst ihn, der kaum ruhig war,\nZum Schaukelkahn der süßen Torheit wieder,\nErneust, verdoppelst die Gefahr.\nWas suchst du mir dich zu verstecken!\nSei offen, flieh′ nicht meinen Blick!\nFrüh oder spät mußt′ ich′s entdecken,\nUnd hier hast du dein Wort zurück.\nWas ich gesollt, hab′ ich vollendet;\nDurch mich sei dir von nun an nichts verwehrt;\nAllein verzeih′ dem Freund, der sich nun von dir wendet\nUnd still in sich zurückgekehrt.",
    "stanzas": [
      "Zu lieblich ist′s, ein Wort zu brechen,\nZu schwer die wohlerkannte Pflicht,\nUnd leider kann man nichts versprechen,\nWas unserm Herzen widerspricht.\nDu übst die alten Zauberlieder,\nDu lockst ihn, der kaum ruhig war,\nZum Schaukelkahn der süßen Torheit wieder,\nErneust, verdoppelst die Gefahr.\nWas suchst du mir dich zu verstecken!\nSei offen, flieh′ nicht meinen Blick!\nFrüh oder spät mußt′ ich′s entdecken,\nUnd hier hast du dein Wort zurück.\nWas ich gesollt, hab′ ich vollendet;\nDurch mich sei dir von nun an nichts verwehrt;\nAllein verzeih′ dem Freund, der sich nun von dir wendet\nUnd still in sich zurückgekehrt."
    ],
    "verseCount": 16,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Abschied",
      "Trennung"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      3,
      5,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Abschied",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-29-abschied",
    "title": "Abschied",
    "author": "Joseph von Eichendorff",
    "year": 1810,
    "userText": "O Täler weit, o Höhen,\nO schöner, grüner Wald,\nDu meiner Lust und Wehen\nAndächt′ger Aufenthalt!\nDa draußen, stets betrogen,\nSaust die geschäft′ge Welt,\nSchlag noch einmal die Bogen\nUm mich, du grünes Zelt!\nWenn es beginnt zu tagen,\nDie Erde dampft und blinkt,\nDie Vögel lustig schlagen,\nDaß dir dein Herz erklingt:\nDa mag vergehn, verwehen\nDas trübe Erdenleid,\nDa sollst du auferstehen\nIn junger Herrlichkeit!\nDa steht im Wald geschrieben,\nEin stilles, ernstes Wort\nVon rechtem Tun und Lieben,\nUnd was des Menschen Hort.\nIch habe treu gelesen\nDie Worte, schlicht und wahr,\nUnd durch mein ganzes Wesen\nWard′s unaussprechlich klar.\nBald werd ich dich verlassen,\nFremd in der Fremde gehn,\nAuf buntbewegten Gassen\nDes Lebens Schauspiel sehn;\nUnd mitten in dem Leben\nWird deines Ernsts Gewalt\nMich Einsamen erheben,\nSo wird mein Herz nicht alt.",
    "canonicalText": null,
    "userStanzas": [
      "O Täler weit, o Höhen,\nO schöner, grüner Wald,\nDu meiner Lust und Wehen\nAndächt′ger Aufenthalt!\nDa draußen, stets betrogen,\nSaust die geschäft′ge Welt,\nSchlag noch einmal die Bogen\nUm mich, du grünes Zelt!\nWenn es beginnt zu tagen,\nDie Erde dampft und blinkt,\nDie Vögel lustig schlagen,\nDaß dir dein Herz erklingt:\nDa mag vergehn, verwehen\nDas trübe Erdenleid,\nDa sollst du auferstehen\nIn junger Herrlichkeit!\nDa steht im Wald geschrieben,\nEin stilles, ernstes Wort\nVon rechtem Tun und Lieben,\nUnd was des Menschen Hort.\nIch habe treu gelesen\nDie Worte, schlicht und wahr,\nUnd durch mein ganzes Wesen\nWard′s unaussprechlich klar.\nBald werd ich dich verlassen,\nFremd in der Fremde gehn,\nAuf buntbewegten Gassen\nDes Lebens Schauspiel sehn;\nUnd mitten in dem Leben\nWird deines Ernsts Gewalt\nMich Einsamen erheben,\nSo wird mein Herz nicht alt."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "O Täler weit, o Höhen,\nO schöner, grüner Wald,\nDu meiner Lust und Wehen\nAndächt′ger Aufenthalt!\nDa draußen, stets betrogen,\nSaust die geschäft′ge Welt,\nSchlag noch einmal die Bogen\nUm mich, du grünes Zelt!\nWenn es beginnt zu tagen,\nDie Erde dampft und blinkt,\nDie Vögel lustig schlagen,\nDaß dir dein Herz erklingt:\nDa mag vergehn, verwehen\nDas trübe Erdenleid,\nDa sollst du auferstehen\nIn junger Herrlichkeit!\nDa steht im Wald geschrieben,\nEin stilles, ernstes Wort\nVon rechtem Tun und Lieben,\nUnd was des Menschen Hort.\nIch habe treu gelesen\nDie Worte, schlicht und wahr,\nUnd durch mein ganzes Wesen\nWard′s unaussprechlich klar.\nBald werd ich dich verlassen,\nFremd in der Fremde gehn,\nAuf buntbewegten Gassen\nDes Lebens Schauspiel sehn;\nUnd mitten in dem Leben\nWird deines Ernsts Gewalt\nMich Einsamen erheben,\nSo wird mein Herz nicht alt.",
    "stanzas": [
      "O Täler weit, o Höhen,\nO schöner, grüner Wald,\nDu meiner Lust und Wehen\nAndächt′ger Aufenthalt!\nDa draußen, stets betrogen,\nSaust die geschäft′ge Welt,\nSchlag noch einmal die Bogen\nUm mich, du grünes Zelt!\nWenn es beginnt zu tagen,\nDie Erde dampft und blinkt,\nDie Vögel lustig schlagen,\nDaß dir dein Herz erklingt:\nDa mag vergehn, verwehen\nDas trübe Erdenleid,\nDa sollst du auferstehen\nIn junger Herrlichkeit!\nDa steht im Wald geschrieben,\nEin stilles, ernstes Wort\nVon rechtem Tun und Lieben,\nUnd was des Menschen Hort.\nIch habe treu gelesen\nDie Worte, schlicht und wahr,\nUnd durch mein ganzes Wesen\nWard′s unaussprechlich klar.\nBald werd ich dich verlassen,\nFremd in der Fremde gehn,\nAuf buntbewegten Gassen\nDes Lebens Schauspiel sehn;\nUnd mitten in dem Leben\nWird deines Ernsts Gewalt\nMich Einsamen erheben,\nSo wird mein Herz nicht alt."
    ],
    "verseCount": 32,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Abschied",
      "Trennung"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      3,
      5,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Abschied",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-30-abschied",
    "title": "Abschied",
    "author": "Theodor Storm",
    "year": 1851,
    "userText": "Kein Wort, auch nicht das kleinste, kann ich sagen,\nWozu das Herz den vollen Schlag verwehrt;\nDie Stunde drängt, gerüstet steht der Wagen,\nEs ist die Fahrt der Heimat abgekehrt.\nGeht immerhin - denn eure Tat ist euer -\nUnd widerruft, was einst das Herz gebot;\nUnd kauft, wenn dieser Preis euch nicht zu teuer,\nDafür euch in der Heimat euer Brot!\nIch aber kann des Landes nicht, des eignen,\nIn Schmerz verstummte Klagen mißverstehn;\nIch kann die stillen Gräber nicht verleugnen,\nWie tief sie jetzt in Unkraut auch vergehn. -\nDu, deren zarte Augen mich befragen, -\nDer dich mir gab, gesegnet sei der Tag!\nLaß nur dein Herz an meinem Herzen schlagen,\nUnd zage nicht! Es ist derselbe Schlag.\nEs strömt die Luft - die Knaben stehn und lauschen,\nVom Strand herüber dringt ein Möwenschrei;\nDas ist die Flut! Das ist des Meeres Rauschen!\nIhr kennt es wohl; wir waren oft dabei.\nVon meinem Arm in dieser letzten Stunde\nBlickt einmal noch in′s weite Land hinaus,\nUnd merkt es wohl, es steht auf diesem Grunde,\nWo wir auch weilen, unser Vaterhaus.\nWir scheiden jetzt, bis dieser Zeit Beschwerde\nEin andrer Tag, ein besserer, gesühnt;\nDenn Raum ist auf der heimatlichen Erde\nFür Fremde nur und was den Fremden dient.\nDoch ist′s das flehendste von den Gebeten,\nIhr mögt dereinst, wenn mir es nicht vergönnt,\nMit festem Fuß auf diese Scholle treten,\nVon der sich jetzt mein heißes Auge trennt! -\nUnd du, mein Kind, mein jüngstes, dessen Wiege\nAuch noch auf diesem teuren Boden stand,\nHör mich! - denn alles andere ist Lüge -\nKein Mann gedeihet ohne Vaterland!\nKannst du den Sinn, den diese Worte führen,\nMit deiner Kinderseele nicht verstehn,\nSo soll es wie ein Schauer dich berühren\nUnd wie ein Pulsschlag in dein Leben gehn!",
    "canonicalText": null,
    "userStanzas": [
      "Kein Wort, auch nicht das kleinste, kann ich sagen,\nWozu das Herz den vollen Schlag verwehrt;\nDie Stunde drängt, gerüstet steht der Wagen,\nEs ist die Fahrt der Heimat abgekehrt.\nGeht immerhin - denn eure Tat ist euer -\nUnd widerruft, was einst das Herz gebot;\nUnd kauft, wenn dieser Preis euch nicht zu teuer,\nDafür euch in der Heimat euer Brot!\nIch aber kann des Landes nicht, des eignen,\nIn Schmerz verstummte Klagen mißverstehn;\nIch kann die stillen Gräber nicht verleugnen,\nWie tief sie jetzt in Unkraut auch vergehn. -\nDu, deren zarte Augen mich befragen, -\nDer dich mir gab, gesegnet sei der Tag!\nLaß nur dein Herz an meinem Herzen schlagen,\nUnd zage nicht! Es ist derselbe Schlag.\nEs strömt die Luft - die Knaben stehn und lauschen,\nVom Strand herüber dringt ein Möwenschrei;\nDas ist die Flut! Das ist des Meeres Rauschen!\nIhr kennt es wohl; wir waren oft dabei.\nVon meinem Arm in dieser letzten Stunde\nBlickt einmal noch in′s weite Land hinaus,\nUnd merkt es wohl, es steht auf diesem Grunde,\nWo wir auch weilen, unser Vaterhaus.\nWir scheiden jetzt, bis dieser Zeit Beschwerde\nEin andrer Tag, ein besserer, gesühnt;\nDenn Raum ist auf der heimatlichen Erde\nFür Fremde nur und was den Fremden dient.\nDoch ist′s das flehendste von den Gebeten,\nIhr mögt dereinst, wenn mir es nicht vergönnt,\nMit festem Fuß auf diese Scholle treten,\nVon der sich jetzt mein heißes Auge trennt! -\nUnd du, mein Kind, mein jüngstes, dessen Wiege\nAuch noch auf diesem teuren Boden stand,\nHör mich! - denn alles andere ist Lüge -\nKein Mann gedeihet ohne Vaterland!\nKannst du den Sinn, den diese Worte führen,\nMit deiner Kinderseele nicht verstehn,\nSo soll es wie ein Schauer dich berühren\nUnd wie ein Pulsschlag in dein Leben gehn!"
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Kein Wort, auch nicht das kleinste, kann ich sagen,\nWozu das Herz den vollen Schlag verwehrt;\nDie Stunde drängt, gerüstet steht der Wagen,\nEs ist die Fahrt der Heimat abgekehrt.\nGeht immerhin - denn eure Tat ist euer -\nUnd widerruft, was einst das Herz gebot;\nUnd kauft, wenn dieser Preis euch nicht zu teuer,\nDafür euch in der Heimat euer Brot!\nIch aber kann des Landes nicht, des eignen,\nIn Schmerz verstummte Klagen mißverstehn;\nIch kann die stillen Gräber nicht verleugnen,\nWie tief sie jetzt in Unkraut auch vergehn. -\nDu, deren zarte Augen mich befragen, -\nDer dich mir gab, gesegnet sei der Tag!\nLaß nur dein Herz an meinem Herzen schlagen,\nUnd zage nicht! Es ist derselbe Schlag.\nEs strömt die Luft - die Knaben stehn und lauschen,\nVom Strand herüber dringt ein Möwenschrei;\nDas ist die Flut! Das ist des Meeres Rauschen!\nIhr kennt es wohl; wir waren oft dabei.\nVon meinem Arm in dieser letzten Stunde\nBlickt einmal noch in′s weite Land hinaus,\nUnd merkt es wohl, es steht auf diesem Grunde,\nWo wir auch weilen, unser Vaterhaus.\nWir scheiden jetzt, bis dieser Zeit Beschwerde\nEin andrer Tag, ein besserer, gesühnt;\nDenn Raum ist auf der heimatlichen Erde\nFür Fremde nur und was den Fremden dient.\nDoch ist′s das flehendste von den Gebeten,\nIhr mögt dereinst, wenn mir es nicht vergönnt,\nMit festem Fuß auf diese Scholle treten,\nVon der sich jetzt mein heißes Auge trennt! -\nUnd du, mein Kind, mein jüngstes, dessen Wiege\nAuch noch auf diesem teuren Boden stand,\nHör mich! - denn alles andere ist Lüge -\nKein Mann gedeihet ohne Vaterland!\nKannst du den Sinn, den diese Worte führen,\nMit deiner Kinderseele nicht verstehn,\nSo soll es wie ein Schauer dich berühren\nUnd wie ein Pulsschlag in dein Leben gehn!",
    "stanzas": [
      "Kein Wort, auch nicht das kleinste, kann ich sagen,\nWozu das Herz den vollen Schlag verwehrt;\nDie Stunde drängt, gerüstet steht der Wagen,\nEs ist die Fahrt der Heimat abgekehrt.\nGeht immerhin - denn eure Tat ist euer -\nUnd widerruft, was einst das Herz gebot;\nUnd kauft, wenn dieser Preis euch nicht zu teuer,\nDafür euch in der Heimat euer Brot!\nIch aber kann des Landes nicht, des eignen,\nIn Schmerz verstummte Klagen mißverstehn;\nIch kann die stillen Gräber nicht verleugnen,\nWie tief sie jetzt in Unkraut auch vergehn. -\nDu, deren zarte Augen mich befragen, -\nDer dich mir gab, gesegnet sei der Tag!\nLaß nur dein Herz an meinem Herzen schlagen,\nUnd zage nicht! Es ist derselbe Schlag.\nEs strömt die Luft - die Knaben stehn und lauschen,\nVom Strand herüber dringt ein Möwenschrei;\nDas ist die Flut! Das ist des Meeres Rauschen!\nIhr kennt es wohl; wir waren oft dabei.\nVon meinem Arm in dieser letzten Stunde\nBlickt einmal noch in′s weite Land hinaus,\nUnd merkt es wohl, es steht auf diesem Grunde,\nWo wir auch weilen, unser Vaterhaus.\nWir scheiden jetzt, bis dieser Zeit Beschwerde\nEin andrer Tag, ein besserer, gesühnt;\nDenn Raum ist auf der heimatlichen Erde\nFür Fremde nur und was den Fremden dient.\nDoch ist′s das flehendste von den Gebeten,\nIhr mögt dereinst, wenn mir es nicht vergönnt,\nMit festem Fuß auf diese Scholle treten,\nVon der sich jetzt mein heißes Auge trennt! -\nUnd du, mein Kind, mein jüngstes, dessen Wiege\nAuch noch auf diesem teuren Boden stand,\nHör mich! - denn alles andere ist Lüge -\nKein Mann gedeihet ohne Vaterland!\nKannst du den Sinn, den diese Worte führen,\nMit deiner Kinderseele nicht verstehn,\nSo soll es wie ein Schauer dich berühren\nUnd wie ein Pulsschlag in dein Leben gehn!"
    ],
    "verseCount": 40,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Abschied",
      "Trennung"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      3,
      5,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Abschied",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-31-abschied",
    "title": "Abschied",
    "author": "Rainer Maria Rilke",
    "year": 1902,
    "userText": "Wie hab ich das gefühlt was Abschied heißt.\nWie weiß ichs noch: ein dunkles unverwundnes\ngrausames Etwas, das ein Schönverbundnes\nnoch einmal zeigt und hinhält und zerreißt.\nWie war ich ohne Wehr, dem zuzuschauen,\ndas, da es mich, mich rufend, gehen ließ.\nZurückblieb, so als wärens alle Frauen\nund dennoch klein und weiß und nichts als dies:\nEin Winken, schon nicht mehr auf mich bezogen,\nein leise Weiterwinkendes -, schon kaum\nerklärbar mehr: vielleicht ein Pflaumenbaum,\nvon dem ein Kuckuck hastig abgeflogen.",
    "canonicalText": null,
    "userStanzas": [
      "Wie hab ich das gefühlt was Abschied heißt.\nWie weiß ichs noch: ein dunkles unverwundnes\ngrausames Etwas, das ein Schönverbundnes\nnoch einmal zeigt und hinhält und zerreißt.\nWie war ich ohne Wehr, dem zuzuschauen,\ndas, da es mich, mich rufend, gehen ließ.\nZurückblieb, so als wärens alle Frauen\nund dennoch klein und weiß und nichts als dies:\nEin Winken, schon nicht mehr auf mich bezogen,\nein leise Weiterwinkendes -, schon kaum\nerklärbar mehr: vielleicht ein Pflaumenbaum,\nvon dem ein Kuckuck hastig abgeflogen."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Wie hab ich das gefühlt was Abschied heißt.\nWie weiß ichs noch: ein dunkles unverwundnes\ngrausames Etwas, das ein Schönverbundnes\nnoch einmal zeigt und hinhält und zerreißt.\nWie war ich ohne Wehr, dem zuzuschauen,\ndas, da es mich, mich rufend, gehen ließ.\nZurückblieb, so als wärens alle Frauen\nund dennoch klein und weiß und nichts als dies:\nEin Winken, schon nicht mehr auf mich bezogen,\nein leise Weiterwinkendes -, schon kaum\nerklärbar mehr: vielleicht ein Pflaumenbaum,\nvon dem ein Kuckuck hastig abgeflogen.",
    "stanzas": [
      "Wie hab ich das gefühlt was Abschied heißt.\nWie weiß ichs noch: ein dunkles unverwundnes\ngrausames Etwas, das ein Schönverbundnes\nnoch einmal zeigt und hinhält und zerreißt.\nWie war ich ohne Wehr, dem zuzuschauen,\ndas, da es mich, mich rufend, gehen ließ.\nZurückblieb, so als wärens alle Frauen\nund dennoch klein und weiß und nichts als dies:\nEin Winken, schon nicht mehr auf mich bezogen,\nein leise Weiterwinkendes -, schon kaum\nerklärbar mehr: vielleicht ein Pflaumenbaum,\nvon dem ein Kuckuck hastig abgeflogen."
    ],
    "verseCount": 12,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Abschied",
      "Trennung"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      3,
      5,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Abschied",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-32-abschied",
    "title": "Abschied",
    "author": "Wilhelm Busch",
    "year": 1890,
    "userText": "Die Bäume hören auf zu blühn,\nMein Schatz will in die Fremde ziehn;\nMein Schatz, der sprach ein bittres Wort:\nDu bleibst nun hier, aber ich muß fort.\nLeb wohl, mein Schatz, ich bleib dir treu,\nWo du auch bist, wo ich auch sei.\nBei Regen und bei Sonnenschein,\nSolang ich lebe, gedenk ich dein.\nSolang ich lebe, lieb ich dich,\nUnd wenn ich sterbe, bet für mich,\nUnd wenn du kommst zu meinem Grab,\nSo denk, daß ich dich geliebet hab.",
    "canonicalText": null,
    "userStanzas": [
      "Die Bäume hören auf zu blühn,\nMein Schatz will in die Fremde ziehn;\nMein Schatz, der sprach ein bittres Wort:\nDu bleibst nun hier, aber ich muß fort.\nLeb wohl, mein Schatz, ich bleib dir treu,\nWo du auch bist, wo ich auch sei.\nBei Regen und bei Sonnenschein,\nSolang ich lebe, gedenk ich dein.\nSolang ich lebe, lieb ich dich,\nUnd wenn ich sterbe, bet für mich,\nUnd wenn du kommst zu meinem Grab,\nSo denk, daß ich dich geliebet hab."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Die Bäume hören auf zu blühn,\nMein Schatz will in die Fremde ziehn;\nMein Schatz, der sprach ein bittres Wort:\nDu bleibst nun hier, aber ich muß fort.\nLeb wohl, mein Schatz, ich bleib dir treu,\nWo du auch bist, wo ich auch sei.\nBei Regen und bei Sonnenschein,\nSolang ich lebe, gedenk ich dein.\nSolang ich lebe, lieb ich dich,\nUnd wenn ich sterbe, bet für mich,\nUnd wenn du kommst zu meinem Grab,\nSo denk, daß ich dich geliebet hab.",
    "stanzas": [
      "Die Bäume hören auf zu blühn,\nMein Schatz will in die Fremde ziehn;\nMein Schatz, der sprach ein bittres Wort:\nDu bleibst nun hier, aber ich muß fort.\nLeb wohl, mein Schatz, ich bleib dir treu,\nWo du auch bist, wo ich auch sei.\nBei Regen und bei Sonnenschein,\nSolang ich lebe, gedenk ich dein.\nSolang ich lebe, lieb ich dich,\nUnd wenn ich sterbe, bet für mich,\nUnd wenn du kommst zu meinem Grab,\nSo denk, daß ich dich geliebet hab."
    ],
    "verseCount": 12,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Abschied",
      "Trennung"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      3,
      5,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Abschied",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-33-john-maynard",
    "title": "John Maynard",
    "author": "Theodor Fontane",
    "year": 1886,
    "userText": "John Maynard!\n\"Wer ist Maynard?\"\n\"John Maynard war unser Steuermann,\nAushielt er, bis er das Ufer gewann,\nEr hat uns gerettet, er trägt die Kron′,\nEr starb für uns, unsre Liebe sein Lohn.\nJohn Maynard.\"\nDie \"Schwalbe\" fliegt über den Eriesee,\nGischt schäumt um den Bug wie Flocken von Schnee,\nVon Detroit fliegt sie nach Buffalo -\nDie Herzen aber sind frei und froh,\nUnd die Passagiere mit Kindern und Fraun\nIm Dämmerlicht schon das Ufer schaun,\nUnd plaudernd an John Maynard heran\nTritt alles: \"Wie weit noch, Steuermann;\"\nDer schaut nach vorn und schaut in die Rund′:\n\"Noch dreißig Minuten... Halbe Stund′.\"\nAlle Herzen sind froh, alle Herzen sind frei -\nDa klingt′s aus dem Schiffsraum her wie Schrei,\n\"Feuer!\" war es, was da klang,\nEin Qualm aus Kajüt′ und Luke drang,\nEin Qualm, dann Flammen lichterloh,\nUnd noch zwanzig Minuten bis Buffalo.\nUnd die Passagiere, buntgemengt,\nAm Bugspriet stehn sie zusammengedrängt,\nAm Bugspriet vorn ist noch Luft und Licht,\nAm Steuer aber lagert sich′s dicht,\nUnd ein Jammern wird laut: \"Wo sind wir? wo?\"\nUnd noch fünfzehn Minuten bis Buffalo. -\nDer Zugwind wächst, doch die Qualmwolke steht,\nDer Kapitän nach dem Steuer späht,\nEr sieht nicht mehr seinen Steuermann,\nAber durchs Sprachrohr fragt er an:\n\"Noch da, John Maynard?\"\n\"Ja, Herr. Ich bin.\"\n\"Auf den Strand! In die Brandung!\"\n\"Ich halte drauf hin.\"\nUnd das Schiffsvolk jubelt: \"Halt aus! Hallo!\"\nUnd noch zehn Minuten bis Buffalo. -\n\"Noch da, John Maynard?\" Und Antwort schallt′s\nMit ersterbender Stimme: \"Ja, Herr ich halt′s!\"\nUnd in die Brandung, was Klippe, was Stein,\nJagt er die \"Schwalbe\" mitten hinein.\nSoll Rettung kommen, so kommt sie nur so.\nRettung: der Strand von Buffalo!\nDas Schiff geborsten. Das Feuer verschwelt.\nGerettet alle. Nur einer fehlt!\nAlle Glocken gehn; ihre Töne schwell′n\nHimmelan aus Kirchen und Kapell′n,\nEin Klingen und Läuten, sonst schweigt die Stadt,\nEin Dienst nur, den sie heute hat:\nZehntausend folgen oder mehr,\nUnd kein Aug′ im Zuge, das tränenleer.\nSie lassen den Sarg in Blumen hinab,\nMit Blumen schließen sie das Grab,\nUnd mit goldner Schrift in den Marmorstein\nSchreibt die Stadt ihren Dankspruch ein:\n\"Hier ruht John Maynard! In Qualm und Brand\nHielt er das Steuer fest in der Hand,\nEr hat uns gerettet, er trägt die Kron′,\nEr starb für uns, unsre Liebe sein Lohn.\nJohn Maynard.\"",
    "canonicalText": null,
    "userStanzas": [
      "John Maynard!\n\"Wer ist Maynard?\"\n\"John Maynard war unser Steuermann,\nAushielt er, bis er das Ufer gewann,\nEr hat uns gerettet, er trägt die Kron′,\nEr starb für uns, unsre Liebe sein Lohn.\nJohn Maynard.\"\nDie \"Schwalbe\" fliegt über den Eriesee,\nGischt schäumt um den Bug wie Flocken von Schnee,\nVon Detroit fliegt sie nach Buffalo -\nDie Herzen aber sind frei und froh,\nUnd die Passagiere mit Kindern und Fraun\nIm Dämmerlicht schon das Ufer schaun,\nUnd plaudernd an John Maynard heran\nTritt alles: \"Wie weit noch, Steuermann;\"\nDer schaut nach vorn und schaut in die Rund′:\n\"Noch dreißig Minuten... Halbe Stund′.\"\nAlle Herzen sind froh, alle Herzen sind frei -\nDa klingt′s aus dem Schiffsraum her wie Schrei,\n\"Feuer!\" war es, was da klang,\nEin Qualm aus Kajüt′ und Luke drang,\nEin Qualm, dann Flammen lichterloh,\nUnd noch zwanzig Minuten bis Buffalo.\nUnd die Passagiere, buntgemengt,\nAm Bugspriet stehn sie zusammengedrängt,\nAm Bugspriet vorn ist noch Luft und Licht,\nAm Steuer aber lagert sich′s dicht,\nUnd ein Jammern wird laut: \"Wo sind wir? wo?\"\nUnd noch fünfzehn Minuten bis Buffalo. -\nDer Zugwind wächst, doch die Qualmwolke steht,\nDer Kapitän nach dem Steuer späht,\nEr sieht nicht mehr seinen Steuermann,\nAber durchs Sprachrohr fragt er an:\n\"Noch da, John Maynard?\"\n\"Ja, Herr. Ich bin.\"\n\"Auf den Strand! In die Brandung!\"\n\"Ich halte drauf hin.\"\nUnd das Schiffsvolk jubelt: \"Halt aus! Hallo!\"\nUnd noch zehn Minuten bis Buffalo. -\n\"Noch da, John Maynard?\" Und Antwort schallt′s\nMit ersterbender Stimme: \"Ja, Herr ich halt′s!\"\nUnd in die Brandung, was Klippe, was Stein,\nJagt er die \"Schwalbe\" mitten hinein.\nSoll Rettung kommen, so kommt sie nur so.\nRettung: der Strand von Buffalo!\nDas Schiff geborsten. Das Feuer verschwelt.\nGerettet alle. Nur einer fehlt!\nAlle Glocken gehn; ihre Töne schwell′n\nHimmelan aus Kirchen und Kapell′n,\nEin Klingen und Läuten, sonst schweigt die Stadt,\nEin Dienst nur, den sie heute hat:\nZehntausend folgen oder mehr,\nUnd kein Aug′ im Zuge, das tränenleer.\nSie lassen den Sarg in Blumen hinab,\nMit Blumen schließen sie das Grab,\nUnd mit goldner Schrift in den Marmorstein\nSchreibt die Stadt ihren Dankspruch ein:\n\"Hier ruht John Maynard! In Qualm und Brand\nHielt er das Steuer fest in der Hand,\nEr hat uns gerettet, er trägt die Kron′,\nEr starb für uns, unsre Liebe sein Lohn.\nJohn Maynard.\""
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "John Maynard!\n\"Wer ist Maynard?\"\n\"John Maynard war unser Steuermann,\nAushielt er, bis er das Ufer gewann,\nEr hat uns gerettet, er trägt die Kron′,\nEr starb für uns, unsre Liebe sein Lohn.\nJohn Maynard.\"\nDie \"Schwalbe\" fliegt über den Eriesee,\nGischt schäumt um den Bug wie Flocken von Schnee,\nVon Detroit fliegt sie nach Buffalo -\nDie Herzen aber sind frei und froh,\nUnd die Passagiere mit Kindern und Fraun\nIm Dämmerlicht schon das Ufer schaun,\nUnd plaudernd an John Maynard heran\nTritt alles: \"Wie weit noch, Steuermann;\"\nDer schaut nach vorn und schaut in die Rund′:\n\"Noch dreißig Minuten... Halbe Stund′.\"\nAlle Herzen sind froh, alle Herzen sind frei -\nDa klingt′s aus dem Schiffsraum her wie Schrei,\n\"Feuer!\" war es, was da klang,\nEin Qualm aus Kajüt′ und Luke drang,\nEin Qualm, dann Flammen lichterloh,\nUnd noch zwanzig Minuten bis Buffalo.\nUnd die Passagiere, buntgemengt,\nAm Bugspriet stehn sie zusammengedrängt,\nAm Bugspriet vorn ist noch Luft und Licht,\nAm Steuer aber lagert sich′s dicht,\nUnd ein Jammern wird laut: \"Wo sind wir? wo?\"\nUnd noch fünfzehn Minuten bis Buffalo. -\nDer Zugwind wächst, doch die Qualmwolke steht,\nDer Kapitän nach dem Steuer späht,\nEr sieht nicht mehr seinen Steuermann,\nAber durchs Sprachrohr fragt er an:\n\"Noch da, John Maynard?\"\n\"Ja, Herr. Ich bin.\"\n\"Auf den Strand! In die Brandung!\"\n\"Ich halte drauf hin.\"\nUnd das Schiffsvolk jubelt: \"Halt aus! Hallo!\"\nUnd noch zehn Minuten bis Buffalo. -\n\"Noch da, John Maynard?\" Und Antwort schallt′s\nMit ersterbender Stimme: \"Ja, Herr ich halt′s!\"\nUnd in die Brandung, was Klippe, was Stein,\nJagt er die \"Schwalbe\" mitten hinein.\nSoll Rettung kommen, so kommt sie nur so.\nRettung: der Strand von Buffalo!\nDas Schiff geborsten. Das Feuer verschwelt.\nGerettet alle. Nur einer fehlt!\nAlle Glocken gehn; ihre Töne schwell′n\nHimmelan aus Kirchen und Kapell′n,\nEin Klingen und Läuten, sonst schweigt die Stadt,\nEin Dienst nur, den sie heute hat:\nZehntausend folgen oder mehr,\nUnd kein Aug′ im Zuge, das tränenleer.\nSie lassen den Sarg in Blumen hinab,\nMit Blumen schließen sie das Grab,\nUnd mit goldner Schrift in den Marmorstein\nSchreibt die Stadt ihren Dankspruch ein:\n\"Hier ruht John Maynard! In Qualm und Brand\nHielt er das Steuer fest in der Hand,\nEr hat uns gerettet, er trägt die Kron′,\nEr starb für uns, unsre Liebe sein Lohn.\nJohn Maynard.\"",
    "stanzas": [
      "John Maynard!\n\"Wer ist Maynard?\"\n\"John Maynard war unser Steuermann,\nAushielt er, bis er das Ufer gewann,\nEr hat uns gerettet, er trägt die Kron′,\nEr starb für uns, unsre Liebe sein Lohn.\nJohn Maynard.\"\nDie \"Schwalbe\" fliegt über den Eriesee,\nGischt schäumt um den Bug wie Flocken von Schnee,\nVon Detroit fliegt sie nach Buffalo -\nDie Herzen aber sind frei und froh,\nUnd die Passagiere mit Kindern und Fraun\nIm Dämmerlicht schon das Ufer schaun,\nUnd plaudernd an John Maynard heran\nTritt alles: \"Wie weit noch, Steuermann;\"\nDer schaut nach vorn und schaut in die Rund′:\n\"Noch dreißig Minuten... Halbe Stund′.\"\nAlle Herzen sind froh, alle Herzen sind frei -\nDa klingt′s aus dem Schiffsraum her wie Schrei,\n\"Feuer!\" war es, was da klang,\nEin Qualm aus Kajüt′ und Luke drang,\nEin Qualm, dann Flammen lichterloh,\nUnd noch zwanzig Minuten bis Buffalo.\nUnd die Passagiere, buntgemengt,\nAm Bugspriet stehn sie zusammengedrängt,\nAm Bugspriet vorn ist noch Luft und Licht,\nAm Steuer aber lagert sich′s dicht,\nUnd ein Jammern wird laut: \"Wo sind wir? wo?\"\nUnd noch fünfzehn Minuten bis Buffalo. -\nDer Zugwind wächst, doch die Qualmwolke steht,\nDer Kapitän nach dem Steuer späht,\nEr sieht nicht mehr seinen Steuermann,\nAber durchs Sprachrohr fragt er an:\n\"Noch da, John Maynard?\"\n\"Ja, Herr. Ich bin.\"\n\"Auf den Strand! In die Brandung!\"\n\"Ich halte drauf hin.\"\nUnd das Schiffsvolk jubelt: \"Halt aus! Hallo!\"\nUnd noch zehn Minuten bis Buffalo. -\n\"Noch da, John Maynard?\" Und Antwort schallt′s\nMit ersterbender Stimme: \"Ja, Herr ich halt′s!\"\nUnd in die Brandung, was Klippe, was Stein,\nJagt er die \"Schwalbe\" mitten hinein.\nSoll Rettung kommen, so kommt sie nur so.\nRettung: der Strand von Buffalo!\nDas Schiff geborsten. Das Feuer verschwelt.\nGerettet alle. Nur einer fehlt!\nAlle Glocken gehn; ihre Töne schwell′n\nHimmelan aus Kirchen und Kapell′n,\nEin Klingen und Läuten, sonst schweigt die Stadt,\nEin Dienst nur, den sie heute hat:\nZehntausend folgen oder mehr,\nUnd kein Aug′ im Zuge, das tränenleer.\nSie lassen den Sarg in Blumen hinab,\nMit Blumen schließen sie das Grab,\nUnd mit goldner Schrift in den Marmorstein\nSchreibt die Stadt ihren Dankspruch ein:\n\"Hier ruht John Maynard! In Qualm und Brand\nHielt er das Steuer fest in der Hand,\nEr hat uns gerettet, er trägt die Kron′,\nEr starb für uns, unsre Liebe sein Lohn.\nJohn Maynard.\""
    ],
    "verseCount": 62,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Ballade",
      "Konflikt",
      "Bewegung"
    ],
    "genre": "ballad",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "narrative Langform",
      "für Aufgaben ausschnittsweise verwenden"
    ],
    "notableFeatures": [
      "narrative Langform",
      "für Aufgaben ausschnittsweise verwenden"
    ],
    "suitableChapters": [
      3,
      5,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "advanced",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "John Maynard",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-34-die-lorelei",
    "title": "Die Lorelei",
    "author": "Heinrich Heine",
    "year": 1824,
    "userText": "Ich weiß nicht, was soll es bedeuten,\nDas ich so traurig bin;\nEin Märchen aus alten Zeiten,\nDas kommt mir nicht aus dem Sinn.\nDie Luft ist kühl und es dunkelt,\nUnd ruhig fließt der Rhein;\nDer Gipfel des Berges funkelt\nIm Abendsonnenschein.\nDie schönste Jungfrau sitzet\nDort oben wunderbar,\nIhr goldnes Geschmeide blitzet,\nSie kämmt ihr goldenes Haar.\nSie kämmt es mit goldenem Kamme,\nUnd singt ein Lied dabei;\nDas hat eine wundersame,\nGewaltige Melodei.\nDen Schiffer im kleinen Schiffe\nErgreift es mit wildem Weh;\nEr schaut nicht die Felsenriffe\nEr schaut nur hinauf in die Höh′.\nIch glaube, die Wellen verschlingen\nAm Ende Schiffer und Kahn\nUnd das hat mit ihrem Singen\nDie Lorelei getan.",
    "canonicalText": null,
    "userStanzas": [
      "Ich weiß nicht, was soll es bedeuten,\nDas ich so traurig bin;\nEin Märchen aus alten Zeiten,\nDas kommt mir nicht aus dem Sinn.\nDie Luft ist kühl und es dunkelt,\nUnd ruhig fließt der Rhein;\nDer Gipfel des Berges funkelt\nIm Abendsonnenschein.\nDie schönste Jungfrau sitzet\nDort oben wunderbar,\nIhr goldnes Geschmeide blitzet,\nSie kämmt ihr goldenes Haar.\nSie kämmt es mit goldenem Kamme,\nUnd singt ein Lied dabei;\nDas hat eine wundersame,\nGewaltige Melodei.\nDen Schiffer im kleinen Schiffe\nErgreift es mit wildem Weh;\nEr schaut nicht die Felsenriffe\nEr schaut nur hinauf in die Höh′.\nIch glaube, die Wellen verschlingen\nAm Ende Schiffer und Kahn\nUnd das hat mit ihrem Singen\nDie Lorelei getan."
    ],
    "canonicalStanzas": [],
    "collationStatus": "unresolved",
    "productionText": null,
    "text": "Ich weiß nicht, was soll es bedeuten,\nDas ich so traurig bin;\nEin Märchen aus alten Zeiten,\nDas kommt mir nicht aus dem Sinn.\nDie Luft ist kühl und es dunkelt,\nUnd ruhig fließt der Rhein;\nDer Gipfel des Berges funkelt\nIm Abendsonnenschein.\nDie schönste Jungfrau sitzet\nDort oben wunderbar,\nIhr goldnes Geschmeide blitzet,\nSie kämmt ihr goldenes Haar.\nSie kämmt es mit goldenem Kamme,\nUnd singt ein Lied dabei;\nDas hat eine wundersame,\nGewaltige Melodei.\nDen Schiffer im kleinen Schiffe\nErgreift es mit wildem Weh;\nEr schaut nicht die Felsenriffe\nEr schaut nur hinauf in die Höh′.\nIch glaube, die Wellen verschlingen\nAm Ende Schiffer und Kahn\nUnd das hat mit ihrem Singen\nDie Lorelei getan.",
    "stanzas": [
      "Ich weiß nicht, was soll es bedeuten,\nDas ich so traurig bin;\nEin Märchen aus alten Zeiten,\nDas kommt mir nicht aus dem Sinn.\nDie Luft ist kühl und es dunkelt,\nUnd ruhig fließt der Rhein;\nDer Gipfel des Berges funkelt\nIm Abendsonnenschein.\nDie schönste Jungfrau sitzet\nDort oben wunderbar,\nIhr goldnes Geschmeide blitzet,\nSie kämmt ihr goldenes Haar.\nSie kämmt es mit goldenem Kamme,\nUnd singt ein Lied dabei;\nDas hat eine wundersame,\nGewaltige Melodei.\nDen Schiffer im kleinen Schiffe\nErgreift es mit wildem Weh;\nEr schaut nicht die Felsenriffe\nEr schaut nur hinauf in die Höh′.\nIch glaube, die Wellen verschlingen\nAm Ende Schiffer und Kahn\nUnd das hat mit ihrem Singen\nDie Lorelei getan."
    ],
    "verseCount": 24,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "variant-unresolved",
      "sourceTitle": "Drei und dreißig Gedichte von Heinrich Heine",
      "sourceInstitution": "Wikisource / historisches Digitalisat",
      "sourceUrl": "https://de.wikisource.org/wiki/Drei_und_drei%C3%9Fig_Gedichte_von_Heinrich_Heine",
      "editionYear": 1824,
      "editionDetails": "Früher Druck mit Lore-Ley-Fassung",
      "checkedAt": "2026-09-12",
      "notes": "Nutzerfassung modernisiert Orthografie und enthält Zeichensetzungsabweichungen; Editionsentscheidung offen.",
      "baseEdition": {
        "title": "Drei und dreißig Gedichte von Heinrich Heine",
        "editorOrPublisher": "Wikisource / historisches Digitalisat",
        "publicationYear": 1824,
        "place": null,
        "volume": null,
        "pages": "Früher Druck mit Lore-Ley-Fassung",
        "digitalSource": "Wikisource / historisches Digitalisat",
        "sourceUrl": "https://de.wikisource.org/wiki/Drei_und_drei%C3%9Fig_Gedichte_von_Heinrich_Heine",
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [
      {
        "userReading": "Lorelei / getan",
        "verifiedReading": "Lore-Ley / gethan",
        "location": "Titelbezug und Vers 24",
        "source": "Drei und dreißig Gedichte, 1824",
        "decision": "unresolved",
        "reason": "Editions- und Orthografieentscheidung offen.",
        "canonicalReading": "Lore-Ley / gethan",
        "differenceType": "orthography",
        "explanation": "Editions- und Orthografieentscheidung offen."
      }
    ],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Ballade",
      "Konflikt",
      "Bewegung"
    ],
    "genre": "ballad",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "narrative Langform",
      "für Aufgaben ausschnittsweise verwenden"
    ],
    "notableFeatures": [
      "narrative Langform",
      "für Aufgaben ausschnittsweise verwenden"
    ],
    "suitableChapters": [
      3,
      5,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "advanced",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Die Lorelei",
    "baseEditionTitle": "Drei und dreißig Gedichte von Heinrich Heine",
    "knownTitleVariants": [
      "Die Lorelei",
      "Lore-Ley"
    ],
    "versionLabel": null
  },
  {
    "id": "canonical-35-die-schlesischen-weber",
    "title": "Die schlesischen Weber",
    "author": "Heinrich Heine",
    "year": 1844,
    "userText": "Im düstern Auge keine Träne,\nSie sitzen am Webstuhl und fletschen die Zähne:\nDeutschland, wir weben dein Leichentuch,\nWir weben hinein den dreifachen Fluch -\nWir weben, wir weben!\nEin Fluch dem Gotte, zu dem wir gebeten\nIn Winterskälte und Hungersnöten;\nWir haben vergebens gehofft und geharrt -\nEr hat uns geäfft und gefoppt und genarrt -\nWir weben, wir weben!\nEin Fluch dem König, dem König der Reichen,\nDen unser Elend nicht konnte erweichen,\nDer den letzten Groschen von uns erpreßt\nUnd uns wie die Hunde erschießen läßt -\nWir weben, wir weben!\nEin Fluch dem falschen Vaterlande,\nWo nun gedeihen Schmach und Schande,\nWo jede Blume früh geknickt,\nWo Fäulnis und Moder den Wurm erquickt -\nWir weben, wir weben!\nDas Schiffchen fliegt, der Webstuhl kracht,\nWir weben emsig Tag und Nacht -\nAltdeutschland, wir weben dein Leichentuch,\nWir weben hinein den dreifachen Fluch,\nWir weben, wir weben!",
    "canonicalText": "Im düstern Auge keine Thräne,\nSie sitzen am Webstuhl und fletschen die Zähne:\nDeutschland, wir weben Dein Leichentuch,\nWir weben hinein den dreifachen Fluch –\nWir weben, wir weben!\n\nEin Fluch dem Gotte, zu dem wir gebeten\nIn Winterskälte und Hungersnöthen;\nWir haben vergebens gehofft und geharrt,\nEr hat uns geäfft und gefoppt und genarrt –\nWir weben, wir weben!\n\nEin Fluch dem König, dem König der Reichen,\nDen unser Elend nicht konnte erweichen,\nDer den letzten Groschen von uns erpreßt,\nUnd uns wie Hunde erschießen läßt –\nWir weben, wir weben!\n\nEin Fluch dem falschen Vaterlande,\nWo nur gedeihen Schmach und Schande,\nWo jede Blume früh geknickt,\nWo Fäulniß und Moder den Wurm erquickt –\nWir weben, wir weben!\n\nDas Schiffchen fliegt, der Webstuhl kracht,\nWir weben emsig Tag und Nacht –\nAltdeutschland, wir weben Dein Leichentuch,\nWir weben hinein den dreifachen Fluch,\nWir weben, wir weben!",
    "userStanzas": [
      "Im düstern Auge keine Träne,\nSie sitzen am Webstuhl und fletschen die Zähne:\nDeutschland, wir weben dein Leichentuch,\nWir weben hinein den dreifachen Fluch -\nWir weben, wir weben!\nEin Fluch dem Gotte, zu dem wir gebeten\nIn Winterskälte und Hungersnöten;\nWir haben vergebens gehofft und geharrt -\nEr hat uns geäfft und gefoppt und genarrt -\nWir weben, wir weben!\nEin Fluch dem König, dem König der Reichen,\nDen unser Elend nicht konnte erweichen,\nDer den letzten Groschen von uns erpreßt\nUnd uns wie die Hunde erschießen läßt -\nWir weben, wir weben!\nEin Fluch dem falschen Vaterlande,\nWo nun gedeihen Schmach und Schande,\nWo jede Blume früh geknickt,\nWo Fäulnis und Moder den Wurm erquickt -\nWir weben, wir weben!\nDas Schiffchen fliegt, der Webstuhl kracht,\nWir weben emsig Tag und Nacht -\nAltdeutschland, wir weben dein Leichentuch,\nWir weben hinein den dreifachen Fluch,\nWir weben, wir weben!"
    ],
    "canonicalStanzas": [
      "Im düstern Auge keine Thräne,\nSie sitzen am Webstuhl und fletschen die Zähne:\nDeutschland, wir weben Dein Leichentuch,\nWir weben hinein den dreifachen Fluch –\nWir weben, wir weben!",
      "Ein Fluch dem Gotte, zu dem wir gebeten\nIn Winterskälte und Hungersnöthen;\nWir haben vergebens gehofft und geharrt,\nEr hat uns geäfft und gefoppt und genarrt –\nWir weben, wir weben!",
      "Ein Fluch dem König, dem König der Reichen,\nDen unser Elend nicht konnte erweichen,\nDer den letzten Groschen von uns erpreßt,\nUnd uns wie Hunde erschießen läßt –\nWir weben, wir weben!",
      "Ein Fluch dem falschen Vaterlande,\nWo nur gedeihen Schmach und Schande,\nWo jede Blume früh geknickt,\nWo Fäulniß und Moder den Wurm erquickt –\nWir weben, wir weben!",
      "Das Schiffchen fliegt, der Webstuhl kracht,\nWir weben emsig Tag und Nacht –\nAltdeutschland, wir weben Dein Leichentuch,\nWir weben hinein den dreifachen Fluch,\nWir weben, wir weben!"
    ],
    "collationStatus": "collated",
    "productionText": "Im düstern Auge keine Thräne,\nSie sitzen am Webstuhl und fletschen die Zähne:\nDeutschland, wir weben Dein Leichentuch,\nWir weben hinein den dreifachen Fluch –\nWir weben, wir weben!\n\nEin Fluch dem Gotte, zu dem wir gebeten\nIn Winterskälte und Hungersnöthen;\nWir haben vergebens gehofft und geharrt,\nEr hat uns geäfft und gefoppt und genarrt –\nWir weben, wir weben!\n\nEin Fluch dem König, dem König der Reichen,\nDen unser Elend nicht konnte erweichen,\nDer den letzten Groschen von uns erpreßt,\nUnd uns wie Hunde erschießen läßt –\nWir weben, wir weben!\n\nEin Fluch dem falschen Vaterlande,\nWo nur gedeihen Schmach und Schande,\nWo jede Blume früh geknickt,\nWo Fäulniß und Moder den Wurm erquickt –\nWir weben, wir weben!\n\nDas Schiffchen fliegt, der Webstuhl kracht,\nWir weben emsig Tag und Nacht –\nAltdeutschland, wir weben Dein Leichentuch,\nWir weben hinein den dreifachen Fluch,\nWir weben, wir weben!",
    "text": "Im düstern Auge keine Thräne,\nSie sitzen am Webstuhl und fletschen die Zähne:\nDeutschland, wir weben Dein Leichentuch,\nWir weben hinein den dreifachen Fluch –\nWir weben, wir weben!\n\nEin Fluch dem Gotte, zu dem wir gebeten\nIn Winterskälte und Hungersnöthen;\nWir haben vergebens gehofft und geharrt,\nEr hat uns geäfft und gefoppt und genarrt –\nWir weben, wir weben!\n\nEin Fluch dem König, dem König der Reichen,\nDen unser Elend nicht konnte erweichen,\nDer den letzten Groschen von uns erpreßt,\nUnd uns wie Hunde erschießen läßt –\nWir weben, wir weben!\n\nEin Fluch dem falschen Vaterlande,\nWo nur gedeihen Schmach und Schande,\nWo jede Blume früh geknickt,\nWo Fäulniß und Moder den Wurm erquickt –\nWir weben, wir weben!\n\nDas Schiffchen fliegt, der Webstuhl kracht,\nWir weben emsig Tag und Nacht –\nAltdeutschland, wir weben Dein Leichentuch,\nWir weben hinein den dreifachen Fluch,\nWir weben, wir weben!",
    "stanzas": [
      "Im düstern Auge keine Thräne,\nSie sitzen am Webstuhl und fletschen die Zähne:\nDeutschland, wir weben Dein Leichentuch,\nWir weben hinein den dreifachen Fluch –\nWir weben, wir weben!",
      "Ein Fluch dem Gotte, zu dem wir gebeten\nIn Winterskälte und Hungersnöthen;\nWir haben vergebens gehofft und geharrt,\nEr hat uns geäfft und gefoppt und genarrt –\nWir weben, wir weben!",
      "Ein Fluch dem König, dem König der Reichen,\nDen unser Elend nicht konnte erweichen,\nDer den letzten Groschen von uns erpreßt,\nUnd uns wie Hunde erschießen läßt –\nWir weben, wir weben!",
      "Ein Fluch dem falschen Vaterlande,\nWo nur gedeihen Schmach und Schande,\nWo jede Blume früh geknickt,\nWo Fäulniß und Moder den Wurm erquickt –\nWir weben, wir weben!",
      "Das Schiffchen fliegt, der Webstuhl kracht,\nWir weben emsig Tag und Nacht –\nAltdeutschland, wir weben Dein Leichentuch,\nWir weben hinein den dreifachen Fluch,\nWir weben, wir weben!"
    ],
    "verseCount": 25,
    "stanzaCount": 5,
    "stanzaVerification": "verified",
    "stanzaStructureStatus": "verified",
    "sourceType": "authentic",
    "textVerificationStatus": "verified",
    "sourceVerification": {
      "status": "verified",
      "sourceTitle": "Die Schlesischen Weber",
      "sourceInstitution": "Wikisource / HH-Portal / Scan",
      "sourceUrl": "https://de.wikisource.org/wiki/Die_schlesischen_Weber",
      "editionYear": 1847,
      "editionDetails": "Album. Originalpoesien, S. 145–146; vom Dichter revidirt",
      "checkedAt": "2026-09-12",
      "notes": "Revidierte Druckfassung vollständig kollationiert; Lesart 'nur' übernommen.",
      "baseEdition": {
        "title": "Die Schlesischen Weber",
        "editorOrPublisher": "Wikisource / HH-Portal / Scan",
        "publicationYear": 1847,
        "place": null,
        "volume": null,
        "pages": "Album. Originalpoesien, S. 145–146; vom Dichter revidirt",
        "digitalSource": "Wikisource / HH-Portal / Scan",
        "sourceUrl": "https://de.wikisource.org/wiki/Die_schlesischen_Weber",
        "rationale": "Konkret benannte und vollständig kollationierte Basisfassung."
      },
      "editionPolicy": "first-authorised"
    },
    "variants": [
      {
        "userReading": "Wo nun gedeihen",
        "verifiedReading": "Wo nur gedeihen",
        "location": "Vers 17",
        "source": "Album. Originalpoesien, 1847, S. 145",
        "decision": "unresolved",
        "reason": "Substantive Lesart; Aufgabe bleibt gesperrt.",
        "canonicalReading": "Wo nur gedeihen",
        "differenceType": "wording",
        "explanation": "Substantive Lesart; Aufgabe bleibt gesperrt."
      }
    ],
    "previewAllowed": true,
    "contentTaskAllowed": true,
    "formalTaskAllowed": true,
    "publicReleaseAllowed": true,
    "verificationNote": "Mit der ausgewiesenen Quelle vollständig abgeglichen.",
    "rightsStatus": "cleared",
    "themes": [
      "Ballade",
      "Konflikt",
      "Bewegung"
    ],
    "genre": "lyric",
    "rhymeStatus": "verified",
    "rhymeScheme": "aabbx ccddx eeffx gghhx iijjx",
    "poemFormStatus": "verified",
    "poemForm": "politisches Liedgedicht",
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "politisches Liedgedicht",
      "5 verifizierte Strophen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      3,
      5,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": false,
    "approvedForProductiveUse": true,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Die schlesischen Weber",
    "baseEditionTitle": "Die Schlesischen Weber",
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-36-der-zauberlehrling",
    "title": "Der Zauberlehrling",
    "author": "Johann Wolfgang von Goethe",
    "year": 1797,
    "userText": "Hat der alte Hexenmeister\nSich doch einmal wegbegeben!\nUnd nun sollen seine Geister\nAuch nach meinem Willen leben.\nSeine Wort und Werke\nMerkt ich und den Brauch,\nUnd mit Geistesstärke\nTu ich Wunder auch.\nWalle! Walle!\nManche Strecke,\nDaß, zum Zwecke,\nWasser fließe\nUnd mit reichem, vollem Schwalle\nZu dem Bade sich ergieße.\nUnd nun komm, du alter Besen,\nNimm die schlechten Lumpenhüllen!\nBist schon lange Knecht gewesen:\nNun erfülle meinen Willen!\nAuf zwei Beinen stehe,\nOben sei ein Kopf,\nEile nun und gehe\nMit dem Wassertopf!\nWalle! Walle!\nManche Strecke,\nDaß, zum Zwecke,\nWasser fließe\nUnd mit reichem, vollem Schwalle\nZu dem Bade sich ergieße.\nSeht, er läuft zum Ufer nieder!\nWahrlich! ist schon an dem Flusse,\nUnd mit Blitzesschnelle wieder\nIst er hier mit raschem Gusse.\nSchon zum zweiten Male!\nWie das Becken schwillt!\nWie sich jede Schale\nVoll mit Wasser füllt!\nStehe! stehe!\nDenn wir haben\nDeiner Gaben\nVollgemessen!\nAch, ich merk es! Wehe! wehe!\nHab ich doch das Wort vergessen!\nAch, das Wort, worauf am Ende\nEr das wird, was er gewesen!\nAch, er läuft und bringt behende!\nWärst du doch der alte Besen!\nImmer neue Güsse\nBringt er schnell herein,\nAch, und hundert Flüsse\nStürzen auf mich ein!\nNein, nicht länger\nKann ichs lassen:\nWill ihn fassen!\nDas ist Tücke!\nAch, nun wird mir immer bänger!\nWelche Miene! welche Blicke!\nO, du Ausgeburt der Hölle!\nSoll das ganze Haus ersaufen?\nSeh ich über jede Schwelle\nDoch schon Wasserströme laufen.\nEin verruchter Besen,\nDer nicht hören will!\nStock, der du gewesen,\nSteh doch wieder still!\nWillst am Ende\nGar nicht lassen?\nWill dich fassen,\nWill dich halten\nUnd das alte Holz behende\nMit dem scharfen Beile spalten!\nSeht, da kommt er schleppend wieder!\nWie ich mich nur auf dich werfe,\nGleich, o Kobold, liegst du nieder;\nKrachend trifft die glatte Schärfe.\nWahrlich! brav getroffen!\nSeht, er ist entzwei!\nUnd nun kann ich hoffen,\nUnd ich atme frei!\nWehe! wehe!\nBeide Teile\nStehn in Eile\nSchon als Knechte\nVöllig fertig in die Höhe!\nHelft mir, ach! Ihr hohen Mächte!\nUnd sie laufen! Naß und nässer\nWirds im Saal und auf den Stufen:\nWelch entsetzliches Gewässer!\nHerr und Meister, hör mich rufen!\nAch, da kommt der Meister!\nHerr, die Not ist groß!\nDie ich rief, die Geister,\nWerd ich nun nicht los.\n\"In die Ecke,\nBesen! Besen!\nSeids gewesen!\nDenn als Geister\nRuft euch nur, zu seinem Zwecke,\nErst hervor der alte Meister.\"",
    "canonicalText": null,
    "userStanzas": [
      "Hat der alte Hexenmeister\nSich doch einmal wegbegeben!\nUnd nun sollen seine Geister\nAuch nach meinem Willen leben.\nSeine Wort und Werke\nMerkt ich und den Brauch,\nUnd mit Geistesstärke\nTu ich Wunder auch.\nWalle! Walle!\nManche Strecke,\nDaß, zum Zwecke,\nWasser fließe\nUnd mit reichem, vollem Schwalle\nZu dem Bade sich ergieße.\nUnd nun komm, du alter Besen,\nNimm die schlechten Lumpenhüllen!\nBist schon lange Knecht gewesen:\nNun erfülle meinen Willen!\nAuf zwei Beinen stehe,\nOben sei ein Kopf,\nEile nun und gehe\nMit dem Wassertopf!\nWalle! Walle!\nManche Strecke,\nDaß, zum Zwecke,\nWasser fließe\nUnd mit reichem, vollem Schwalle\nZu dem Bade sich ergieße.\nSeht, er läuft zum Ufer nieder!\nWahrlich! ist schon an dem Flusse,\nUnd mit Blitzesschnelle wieder\nIst er hier mit raschem Gusse.\nSchon zum zweiten Male!\nWie das Becken schwillt!\nWie sich jede Schale\nVoll mit Wasser füllt!\nStehe! stehe!\nDenn wir haben\nDeiner Gaben\nVollgemessen!\nAch, ich merk es! Wehe! wehe!\nHab ich doch das Wort vergessen!\nAch, das Wort, worauf am Ende\nEr das wird, was er gewesen!\nAch, er läuft und bringt behende!\nWärst du doch der alte Besen!\nImmer neue Güsse\nBringt er schnell herein,\nAch, und hundert Flüsse\nStürzen auf mich ein!\nNein, nicht länger\nKann ichs lassen:\nWill ihn fassen!\nDas ist Tücke!\nAch, nun wird mir immer bänger!\nWelche Miene! welche Blicke!\nO, du Ausgeburt der Hölle!\nSoll das ganze Haus ersaufen?\nSeh ich über jede Schwelle\nDoch schon Wasserströme laufen.\nEin verruchter Besen,\nDer nicht hören will!\nStock, der du gewesen,\nSteh doch wieder still!\nWillst am Ende\nGar nicht lassen?\nWill dich fassen,\nWill dich halten\nUnd das alte Holz behende\nMit dem scharfen Beile spalten!\nSeht, da kommt er schleppend wieder!\nWie ich mich nur auf dich werfe,\nGleich, o Kobold, liegst du nieder;\nKrachend trifft die glatte Schärfe.\nWahrlich! brav getroffen!\nSeht, er ist entzwei!\nUnd nun kann ich hoffen,\nUnd ich atme frei!\nWehe! wehe!\nBeide Teile\nStehn in Eile\nSchon als Knechte\nVöllig fertig in die Höhe!\nHelft mir, ach! Ihr hohen Mächte!\nUnd sie laufen! Naß und nässer\nWirds im Saal und auf den Stufen:\nWelch entsetzliches Gewässer!\nHerr und Meister, hör mich rufen!\nAch, da kommt der Meister!\nHerr, die Not ist groß!\nDie ich rief, die Geister,\nWerd ich nun nicht los.\n\"In die Ecke,\nBesen! Besen!\nSeids gewesen!\nDenn als Geister\nRuft euch nur, zu seinem Zwecke,\nErst hervor der alte Meister.\""
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Hat der alte Hexenmeister\nSich doch einmal wegbegeben!\nUnd nun sollen seine Geister\nAuch nach meinem Willen leben.\nSeine Wort und Werke\nMerkt ich und den Brauch,\nUnd mit Geistesstärke\nTu ich Wunder auch.\nWalle! Walle!\nManche Strecke,\nDaß, zum Zwecke,\nWasser fließe\nUnd mit reichem, vollem Schwalle\nZu dem Bade sich ergieße.\nUnd nun komm, du alter Besen,\nNimm die schlechten Lumpenhüllen!\nBist schon lange Knecht gewesen:\nNun erfülle meinen Willen!\nAuf zwei Beinen stehe,\nOben sei ein Kopf,\nEile nun und gehe\nMit dem Wassertopf!\nWalle! Walle!\nManche Strecke,\nDaß, zum Zwecke,\nWasser fließe\nUnd mit reichem, vollem Schwalle\nZu dem Bade sich ergieße.\nSeht, er läuft zum Ufer nieder!\nWahrlich! ist schon an dem Flusse,\nUnd mit Blitzesschnelle wieder\nIst er hier mit raschem Gusse.\nSchon zum zweiten Male!\nWie das Becken schwillt!\nWie sich jede Schale\nVoll mit Wasser füllt!\nStehe! stehe!\nDenn wir haben\nDeiner Gaben\nVollgemessen!\nAch, ich merk es! Wehe! wehe!\nHab ich doch das Wort vergessen!\nAch, das Wort, worauf am Ende\nEr das wird, was er gewesen!\nAch, er läuft und bringt behende!\nWärst du doch der alte Besen!\nImmer neue Güsse\nBringt er schnell herein,\nAch, und hundert Flüsse\nStürzen auf mich ein!\nNein, nicht länger\nKann ichs lassen:\nWill ihn fassen!\nDas ist Tücke!\nAch, nun wird mir immer bänger!\nWelche Miene! welche Blicke!\nO, du Ausgeburt der Hölle!\nSoll das ganze Haus ersaufen?\nSeh ich über jede Schwelle\nDoch schon Wasserströme laufen.\nEin verruchter Besen,\nDer nicht hören will!\nStock, der du gewesen,\nSteh doch wieder still!\nWillst am Ende\nGar nicht lassen?\nWill dich fassen,\nWill dich halten\nUnd das alte Holz behende\nMit dem scharfen Beile spalten!\nSeht, da kommt er schleppend wieder!\nWie ich mich nur auf dich werfe,\nGleich, o Kobold, liegst du nieder;\nKrachend trifft die glatte Schärfe.\nWahrlich! brav getroffen!\nSeht, er ist entzwei!\nUnd nun kann ich hoffen,\nUnd ich atme frei!\nWehe! wehe!\nBeide Teile\nStehn in Eile\nSchon als Knechte\nVöllig fertig in die Höhe!\nHelft mir, ach! Ihr hohen Mächte!\nUnd sie laufen! Naß und nässer\nWirds im Saal und auf den Stufen:\nWelch entsetzliches Gewässer!\nHerr und Meister, hör mich rufen!\nAch, da kommt der Meister!\nHerr, die Not ist groß!\nDie ich rief, die Geister,\nWerd ich nun nicht los.\n\"In die Ecke,\nBesen! Besen!\nSeids gewesen!\nDenn als Geister\nRuft euch nur, zu seinem Zwecke,\nErst hervor der alte Meister.\"",
    "stanzas": [
      "Hat der alte Hexenmeister\nSich doch einmal wegbegeben!\nUnd nun sollen seine Geister\nAuch nach meinem Willen leben.\nSeine Wort und Werke\nMerkt ich und den Brauch,\nUnd mit Geistesstärke\nTu ich Wunder auch.\nWalle! Walle!\nManche Strecke,\nDaß, zum Zwecke,\nWasser fließe\nUnd mit reichem, vollem Schwalle\nZu dem Bade sich ergieße.\nUnd nun komm, du alter Besen,\nNimm die schlechten Lumpenhüllen!\nBist schon lange Knecht gewesen:\nNun erfülle meinen Willen!\nAuf zwei Beinen stehe,\nOben sei ein Kopf,\nEile nun und gehe\nMit dem Wassertopf!\nWalle! Walle!\nManche Strecke,\nDaß, zum Zwecke,\nWasser fließe\nUnd mit reichem, vollem Schwalle\nZu dem Bade sich ergieße.\nSeht, er läuft zum Ufer nieder!\nWahrlich! ist schon an dem Flusse,\nUnd mit Blitzesschnelle wieder\nIst er hier mit raschem Gusse.\nSchon zum zweiten Male!\nWie das Becken schwillt!\nWie sich jede Schale\nVoll mit Wasser füllt!\nStehe! stehe!\nDenn wir haben\nDeiner Gaben\nVollgemessen!\nAch, ich merk es! Wehe! wehe!\nHab ich doch das Wort vergessen!\nAch, das Wort, worauf am Ende\nEr das wird, was er gewesen!\nAch, er läuft und bringt behende!\nWärst du doch der alte Besen!\nImmer neue Güsse\nBringt er schnell herein,\nAch, und hundert Flüsse\nStürzen auf mich ein!\nNein, nicht länger\nKann ichs lassen:\nWill ihn fassen!\nDas ist Tücke!\nAch, nun wird mir immer bänger!\nWelche Miene! welche Blicke!\nO, du Ausgeburt der Hölle!\nSoll das ganze Haus ersaufen?\nSeh ich über jede Schwelle\nDoch schon Wasserströme laufen.\nEin verruchter Besen,\nDer nicht hören will!\nStock, der du gewesen,\nSteh doch wieder still!\nWillst am Ende\nGar nicht lassen?\nWill dich fassen,\nWill dich halten\nUnd das alte Holz behende\nMit dem scharfen Beile spalten!\nSeht, da kommt er schleppend wieder!\nWie ich mich nur auf dich werfe,\nGleich, o Kobold, liegst du nieder;\nKrachend trifft die glatte Schärfe.\nWahrlich! brav getroffen!\nSeht, er ist entzwei!\nUnd nun kann ich hoffen,\nUnd ich atme frei!\nWehe! wehe!\nBeide Teile\nStehn in Eile\nSchon als Knechte\nVöllig fertig in die Höhe!\nHelft mir, ach! Ihr hohen Mächte!\nUnd sie laufen! Naß und nässer\nWirds im Saal und auf den Stufen:\nWelch entsetzliches Gewässer!\nHerr und Meister, hör mich rufen!\nAch, da kommt der Meister!\nHerr, die Not ist groß!\nDie ich rief, die Geister,\nWerd ich nun nicht los.\n\"In die Ecke,\nBesen! Besen!\nSeids gewesen!\nDenn als Geister\nRuft euch nur, zu seinem Zwecke,\nErst hervor der alte Meister.\""
    ],
    "verseCount": 98,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "source-located",
      "sourceTitle": "Der Zauberlehrling (1827)",
      "sourceInstitution": "Wikisource / Cotta-Digitalisat",
      "sourceUrl": "https://de.wikisource.org/wiki/Der_Zauberlehrling_%281827%29",
      "editionYear": 1827,
      "editionDetails": "Ausgabe letzter Hand, Bd. 1, S. 217–220",
      "checkedAt": "2026-09-12",
      "notes": "Vollständige Kollation ausstehend.",
      "baseEdition": {
        "title": "Der Zauberlehrling (1827)",
        "editorOrPublisher": "Wikisource / Cotta-Digitalisat",
        "publicationYear": 1827,
        "place": null,
        "volume": null,
        "pages": "Ausgabe letzter Hand, Bd. 1, S. 217–220",
        "digitalSource": "Wikisource / Cotta-Digitalisat",
        "sourceUrl": "https://de.wikisource.org/wiki/Der_Zauberlehrling_%281827%29",
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Ballade",
      "Konflikt",
      "Bewegung"
    ],
    "genre": "ballad",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "narrative Langform",
      "für Aufgaben ausschnittsweise verwenden"
    ],
    "notableFeatures": [
      "narrative Langform",
      "für Aufgaben ausschnittsweise verwenden"
    ],
    "suitableChapters": [
      3,
      5,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "advanced",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Der Zauberlehrling",
    "baseEditionTitle": "Der Zauberlehrling (1827)",
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-37-erlkonig",
    "title": "Erlkönig",
    "author": "Johann Wolfgang von Goethe",
    "year": 1782,
    "userText": "Wer reitet so spät durch Nacht und Wind?\nEs ist der Vater mit seinem Kind;\nEr hat den Knaben wohl in dem Arm,\nEr faßt ihn sicher, er hält ihn warm.\nMein Sohn, was birgst du so bang dein Gesicht?\nSiehst Vater, du den Erlkönig nicht?\nDen Erlenkönig mit Kron und Schweif?\nMein Sohn, es ist ein Nebelstreif.\n»Du liebes Kind, komm, geh mit mir!\nGar schöne Spiele spiel ich mit dir;\nManch bunte Blumen sind an dem Strand,\nMeine Mutter hat manch gülden Gewand.«\nMein Vater, mein Vater, und hörest du nicht,\nWas Erlenkönig mir leise verspricht?\nSei ruhig, bleibe ruhig, mein Kind;\nIn dürren Blättern säuselt der Wind.\n»Willst, feiner Knabe, du mit mir gehn?\nMeine Töchter sollen dich warten schön;\nMeine Töchter führen den nächtlichen Reihn\nUnd wiegen und tanzen und singen dich ein.«\nMein Vater, mein Vater, und siehst du nicht dort\nErlkönigs Töchter am düstern Ort?\nMein Sohn, mein Sohn, ich seh es genau:\nEs scheinen die alten Weiden so grau.\n»Ich liebe dich, mich reizt deine schöne Gestalt;\nUnd bist du nicht willig, so brauch ich Gewalt.«\nMein Vater, mein Vater, jetzt faßt er mich an!\nErlkönig hat mir ein Leids getan!\nDem Vater grauset′s, er reitet geschwind,\nEr hält in den Armen das ächzende Kind,\nErreicht den Hof mit Mühe und Not;\nIn seinen Armen das Kind war tot.",
    "canonicalText": null,
    "userStanzas": [
      "Wer reitet so spät durch Nacht und Wind?\nEs ist der Vater mit seinem Kind;\nEr hat den Knaben wohl in dem Arm,\nEr faßt ihn sicher, er hält ihn warm.\nMein Sohn, was birgst du so bang dein Gesicht?\nSiehst Vater, du den Erlkönig nicht?\nDen Erlenkönig mit Kron und Schweif?\nMein Sohn, es ist ein Nebelstreif.\n»Du liebes Kind, komm, geh mit mir!\nGar schöne Spiele spiel ich mit dir;\nManch bunte Blumen sind an dem Strand,\nMeine Mutter hat manch gülden Gewand.«\nMein Vater, mein Vater, und hörest du nicht,\nWas Erlenkönig mir leise verspricht?\nSei ruhig, bleibe ruhig, mein Kind;\nIn dürren Blättern säuselt der Wind.\n»Willst, feiner Knabe, du mit mir gehn?\nMeine Töchter sollen dich warten schön;\nMeine Töchter führen den nächtlichen Reihn\nUnd wiegen und tanzen und singen dich ein.«\nMein Vater, mein Vater, und siehst du nicht dort\nErlkönigs Töchter am düstern Ort?\nMein Sohn, mein Sohn, ich seh es genau:\nEs scheinen die alten Weiden so grau.\n»Ich liebe dich, mich reizt deine schöne Gestalt;\nUnd bist du nicht willig, so brauch ich Gewalt.«\nMein Vater, mein Vater, jetzt faßt er mich an!\nErlkönig hat mir ein Leids getan!\nDem Vater grauset′s, er reitet geschwind,\nEr hält in den Armen das ächzende Kind,\nErreicht den Hof mit Mühe und Not;\nIn seinen Armen das Kind war tot."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Wer reitet so spät durch Nacht und Wind?\nEs ist der Vater mit seinem Kind;\nEr hat den Knaben wohl in dem Arm,\nEr faßt ihn sicher, er hält ihn warm.\nMein Sohn, was birgst du so bang dein Gesicht?\nSiehst Vater, du den Erlkönig nicht?\nDen Erlenkönig mit Kron und Schweif?\nMein Sohn, es ist ein Nebelstreif.\n»Du liebes Kind, komm, geh mit mir!\nGar schöne Spiele spiel ich mit dir;\nManch bunte Blumen sind an dem Strand,\nMeine Mutter hat manch gülden Gewand.«\nMein Vater, mein Vater, und hörest du nicht,\nWas Erlenkönig mir leise verspricht?\nSei ruhig, bleibe ruhig, mein Kind;\nIn dürren Blättern säuselt der Wind.\n»Willst, feiner Knabe, du mit mir gehn?\nMeine Töchter sollen dich warten schön;\nMeine Töchter führen den nächtlichen Reihn\nUnd wiegen und tanzen und singen dich ein.«\nMein Vater, mein Vater, und siehst du nicht dort\nErlkönigs Töchter am düstern Ort?\nMein Sohn, mein Sohn, ich seh es genau:\nEs scheinen die alten Weiden so grau.\n»Ich liebe dich, mich reizt deine schöne Gestalt;\nUnd bist du nicht willig, so brauch ich Gewalt.«\nMein Vater, mein Vater, jetzt faßt er mich an!\nErlkönig hat mir ein Leids getan!\nDem Vater grauset′s, er reitet geschwind,\nEr hält in den Armen das ächzende Kind,\nErreicht den Hof mit Mühe und Not;\nIn seinen Armen das Kind war tot.",
    "stanzas": [
      "Wer reitet so spät durch Nacht und Wind?\nEs ist der Vater mit seinem Kind;\nEr hat den Knaben wohl in dem Arm,\nEr faßt ihn sicher, er hält ihn warm.\nMein Sohn, was birgst du so bang dein Gesicht?\nSiehst Vater, du den Erlkönig nicht?\nDen Erlenkönig mit Kron und Schweif?\nMein Sohn, es ist ein Nebelstreif.\n»Du liebes Kind, komm, geh mit mir!\nGar schöne Spiele spiel ich mit dir;\nManch bunte Blumen sind an dem Strand,\nMeine Mutter hat manch gülden Gewand.«\nMein Vater, mein Vater, und hörest du nicht,\nWas Erlenkönig mir leise verspricht?\nSei ruhig, bleibe ruhig, mein Kind;\nIn dürren Blättern säuselt der Wind.\n»Willst, feiner Knabe, du mit mir gehn?\nMeine Töchter sollen dich warten schön;\nMeine Töchter führen den nächtlichen Reihn\nUnd wiegen und tanzen und singen dich ein.«\nMein Vater, mein Vater, und siehst du nicht dort\nErlkönigs Töchter am düstern Ort?\nMein Sohn, mein Sohn, ich seh es genau:\nEs scheinen die alten Weiden so grau.\n»Ich liebe dich, mich reizt deine schöne Gestalt;\nUnd bist du nicht willig, so brauch ich Gewalt.«\nMein Vater, mein Vater, jetzt faßt er mich an!\nErlkönig hat mir ein Leids getan!\nDem Vater grauset′s, er reitet geschwind,\nEr hält in den Armen das ächzende Kind,\nErreicht den Hof mit Mühe und Not;\nIn seinen Armen das Kind war tot."
    ],
    "verseCount": 32,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "source-located",
      "sourceTitle": "Erlkönig",
      "sourceInstitution": "Wikisource / Cotta-Digitalisat",
      "sourceUrl": "https://de.wikisource.org/wiki/Erlk%C3%B6nig",
      "editionYear": 1815,
      "editionDetails": "Goethe, Gedichte, Cotta 1815",
      "checkedAt": "2026-09-12",
      "notes": "Vollständige Kollation ausstehend.",
      "baseEdition": {
        "title": "Erlkönig",
        "editorOrPublisher": "Wikisource / Cotta-Digitalisat",
        "publicationYear": 1815,
        "place": null,
        "volume": null,
        "pages": "Goethe, Gedichte, Cotta 1815",
        "digitalSource": "Wikisource / Cotta-Digitalisat",
        "sourceUrl": "https://de.wikisource.org/wiki/Erlk%C3%B6nig",
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Ballade",
      "Konflikt",
      "Bewegung"
    ],
    "genre": "ballad",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "narrative Langform",
      "für Aufgaben ausschnittsweise verwenden"
    ],
    "notableFeatures": [
      "narrative Langform",
      "für Aufgaben ausschnittsweise verwenden"
    ],
    "suitableChapters": [
      3,
      5,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "advanced",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Erlkönig",
    "baseEditionTitle": "Erlkönig",
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-38-der-knabe-im-moor",
    "title": "Der Knabe im Moor",
    "author": "Annette von Droste-Hülshoff",
    "year": 1842,
    "userText": "Was raschelt drüben am Hage?\nDas ist der gespenstige Gräberknecht,\nDer dem Meister die besten Torfe verzecht;\nHu, hu, es bricht wie ein irres Rind!\nHinducket das Knäblein zage.\nVom Ufer starret Gestumpf hervor,\nUnheimlich nicket die Föhre,\nDer Knabe rennt, gespannt das Ohr,\nDurch Riesenhalme wie Speere;\nUnd wie es rieselt und knittert darin!\nDas ist die unselige Spinnerin,\nDas ist die gebannte Spinnlenor′,\nDie den Haspel dreht im Geröhre!\nVoran, voran, nur immer im Lauf,\nVoran als woll′ es ihn holen!\nVor seinem Fuße brodelt es auf,\nEs pfeift ihm unter den Sohlen\nWie eine gespenstige Melodei;\nDas ist der Geigemann ungetreu,\nDas ist der diebische Fiedler Knauf,\nDer den Hochzeitheller gestohlen!\nDa birst das Moor, ein Seufzer geht\nHervor aus der klaffenden Höhle;\nWeh, weh, da ruft die verdammte Margret:\n»Ho, ho, meine arme Seele!«\nDer Knabe springt wie ein wundes Reh;\nWär′ nicht Schutzengel in seiner Näh′,\nSeine bleichenden Knöchelchen fände spät\nEin Gräber im Moorgeschwele.\nDa mählich gründet der Boden sich,\nUnd drüben, neben der Weide,\nDie Lampe flimmert so heimatlich,\nDer Knabe steht an der Scheide.\nTief atmet er auf, zum Moor zurück\nNoch immer wirft er den scheuen Blick:\nJa, im Geröhre war′s fürchterlich,\nO schaurig war′s in der Heide!",
    "canonicalText": null,
    "userStanzas": [
      "Was raschelt drüben am Hage?\nDas ist der gespenstige Gräberknecht,\nDer dem Meister die besten Torfe verzecht;\nHu, hu, es bricht wie ein irres Rind!\nHinducket das Knäblein zage.\nVom Ufer starret Gestumpf hervor,\nUnheimlich nicket die Föhre,\nDer Knabe rennt, gespannt das Ohr,\nDurch Riesenhalme wie Speere;\nUnd wie es rieselt und knittert darin!\nDas ist die unselige Spinnerin,\nDas ist die gebannte Spinnlenor′,\nDie den Haspel dreht im Geröhre!\nVoran, voran, nur immer im Lauf,\nVoran als woll′ es ihn holen!\nVor seinem Fuße brodelt es auf,\nEs pfeift ihm unter den Sohlen\nWie eine gespenstige Melodei;\nDas ist der Geigemann ungetreu,\nDas ist der diebische Fiedler Knauf,\nDer den Hochzeitheller gestohlen!\nDa birst das Moor, ein Seufzer geht\nHervor aus der klaffenden Höhle;\nWeh, weh, da ruft die verdammte Margret:\n»Ho, ho, meine arme Seele!«\nDer Knabe springt wie ein wundes Reh;\nWär′ nicht Schutzengel in seiner Näh′,\nSeine bleichenden Knöchelchen fände spät\nEin Gräber im Moorgeschwele.\nDa mählich gründet der Boden sich,\nUnd drüben, neben der Weide,\nDie Lampe flimmert so heimatlich,\nDer Knabe steht an der Scheide.\nTief atmet er auf, zum Moor zurück\nNoch immer wirft er den scheuen Blick:\nJa, im Geröhre war′s fürchterlich,\nO schaurig war′s in der Heide!"
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Was raschelt drüben am Hage?\nDas ist der gespenstige Gräberknecht,\nDer dem Meister die besten Torfe verzecht;\nHu, hu, es bricht wie ein irres Rind!\nHinducket das Knäblein zage.\nVom Ufer starret Gestumpf hervor,\nUnheimlich nicket die Föhre,\nDer Knabe rennt, gespannt das Ohr,\nDurch Riesenhalme wie Speere;\nUnd wie es rieselt und knittert darin!\nDas ist die unselige Spinnerin,\nDas ist die gebannte Spinnlenor′,\nDie den Haspel dreht im Geröhre!\nVoran, voran, nur immer im Lauf,\nVoran als woll′ es ihn holen!\nVor seinem Fuße brodelt es auf,\nEs pfeift ihm unter den Sohlen\nWie eine gespenstige Melodei;\nDas ist der Geigemann ungetreu,\nDas ist der diebische Fiedler Knauf,\nDer den Hochzeitheller gestohlen!\nDa birst das Moor, ein Seufzer geht\nHervor aus der klaffenden Höhle;\nWeh, weh, da ruft die verdammte Margret:\n»Ho, ho, meine arme Seele!«\nDer Knabe springt wie ein wundes Reh;\nWär′ nicht Schutzengel in seiner Näh′,\nSeine bleichenden Knöchelchen fände spät\nEin Gräber im Moorgeschwele.\nDa mählich gründet der Boden sich,\nUnd drüben, neben der Weide,\nDie Lampe flimmert so heimatlich,\nDer Knabe steht an der Scheide.\nTief atmet er auf, zum Moor zurück\nNoch immer wirft er den scheuen Blick:\nJa, im Geröhre war′s fürchterlich,\nO schaurig war′s in der Heide!",
    "stanzas": [
      "Was raschelt drüben am Hage?\nDas ist der gespenstige Gräberknecht,\nDer dem Meister die besten Torfe verzecht;\nHu, hu, es bricht wie ein irres Rind!\nHinducket das Knäblein zage.\nVom Ufer starret Gestumpf hervor,\nUnheimlich nicket die Föhre,\nDer Knabe rennt, gespannt das Ohr,\nDurch Riesenhalme wie Speere;\nUnd wie es rieselt und knittert darin!\nDas ist die unselige Spinnerin,\nDas ist die gebannte Spinnlenor′,\nDie den Haspel dreht im Geröhre!\nVoran, voran, nur immer im Lauf,\nVoran als woll′ es ihn holen!\nVor seinem Fuße brodelt es auf,\nEs pfeift ihm unter den Sohlen\nWie eine gespenstige Melodei;\nDas ist der Geigemann ungetreu,\nDas ist der diebische Fiedler Knauf,\nDer den Hochzeitheller gestohlen!\nDa birst das Moor, ein Seufzer geht\nHervor aus der klaffenden Höhle;\nWeh, weh, da ruft die verdammte Margret:\n»Ho, ho, meine arme Seele!«\nDer Knabe springt wie ein wundes Reh;\nWär′ nicht Schutzengel in seiner Näh′,\nSeine bleichenden Knöchelchen fände spät\nEin Gräber im Moorgeschwele.\nDa mählich gründet der Boden sich,\nUnd drüben, neben der Weide,\nDie Lampe flimmert so heimatlich,\nDer Knabe steht an der Scheide.\nTief atmet er auf, zum Moor zurück\nNoch immer wirft er den scheuen Blick:\nJa, im Geröhre war′s fürchterlich,\nO schaurig war′s in der Heide!"
    ],
    "verseCount": 37,
    "stanzaCount": 1,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Ballade",
      "Konflikt",
      "Bewegung"
    ],
    "genre": "ballad",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "narrative Langform",
      "für Aufgaben ausschnittsweise verwenden"
    ],
    "notableFeatures": [
      "narrative Langform",
      "für Aufgaben ausschnittsweise verwenden"
    ],
    "suitableChapters": [
      3,
      5,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "advanced",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Der Knabe im Moor",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-39-das-zerbrochene-ringlein",
    "title": "Das zerbrochene Ringlein",
    "author": "Joseph von Eichendorff",
    "year": 1813,
    "userText": "In einem kühlen Grunde\nDa geht ein Mühlenrad,\nMeine Liebste ist verschwunden,\nDie dort gewohnet hat.\n\nSie hat mir Treu versprochen,\nGab mir ein′ n Ring dabei,\nSie hat die Treu gebrochen,\nMein Ringlein sprang entzwei.\n\nIch möcht als Spielmann reisen\nWeit in die Welt hinaus,\nUnd singen meine Weisen,\nUnd gehn von Haus zu Haus.\n\nIch möcht als Reiter fliegen\nWohl in die blutge Schlacht,\nUm stille Feuer liegen\nIm Feld bei dunkler Nacht.\n\nHör ich das Mühlrad gehen:\nIch weiß nicht, was ich will -\nIch möcht am liebsten sterben,\nDa wärs auf einmal still!",
    "canonicalText": null,
    "userStanzas": [
      "In einem kühlen Grunde\nDa geht ein Mühlenrad,\nMeine Liebste ist verschwunden,\nDie dort gewohnet hat.",
      "Sie hat mir Treu versprochen,\nGab mir ein′ n Ring dabei,\nSie hat die Treu gebrochen,\nMein Ringlein sprang entzwei.",
      "Ich möcht als Spielmann reisen\nWeit in die Welt hinaus,\nUnd singen meine Weisen,\nUnd gehn von Haus zu Haus.",
      "Ich möcht als Reiter fliegen\nWohl in die blutge Schlacht,\nUm stille Feuer liegen\nIm Feld bei dunkler Nacht.",
      "Hör ich das Mühlrad gehen:\nIch weiß nicht, was ich will -\nIch möcht am liebsten sterben,\nDa wärs auf einmal still!"
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "In einem kühlen Grunde\nDa geht ein Mühlenrad,\nMeine Liebste ist verschwunden,\nDie dort gewohnet hat.\n\nSie hat mir Treu versprochen,\nGab mir ein′ n Ring dabei,\nSie hat die Treu gebrochen,\nMein Ringlein sprang entzwei.\n\nIch möcht als Spielmann reisen\nWeit in die Welt hinaus,\nUnd singen meine Weisen,\nUnd gehn von Haus zu Haus.\n\nIch möcht als Reiter fliegen\nWohl in die blutge Schlacht,\nUm stille Feuer liegen\nIm Feld bei dunkler Nacht.\n\nHör ich das Mühlrad gehen:\nIch weiß nicht, was ich will -\nIch möcht am liebsten sterben,\nDa wärs auf einmal still!",
    "stanzas": [
      "In einem kühlen Grunde\nDa geht ein Mühlenrad,\nMeine Liebste ist verschwunden,\nDie dort gewohnet hat.",
      "Sie hat mir Treu versprochen,\nGab mir ein′ n Ring dabei,\nSie hat die Treu gebrochen,\nMein Ringlein sprang entzwei.",
      "Ich möcht als Spielmann reisen\nWeit in die Welt hinaus,\nUnd singen meine Weisen,\nUnd gehn von Haus zu Haus.",
      "Ich möcht als Reiter fliegen\nWohl in die blutge Schlacht,\nUm stille Feuer liegen\nIm Feld bei dunkler Nacht.",
      "Hör ich das Mühlrad gehen:\nIch weiß nicht, was ich will -\nIch möcht am liebsten sterben,\nDa wärs auf einmal still!"
    ],
    "verseCount": 20,
    "stanzaCount": 5,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "source-located",
      "sourceTitle": "Das zerbrochene Ringlein",
      "sourceInstitution": "Wikisource / Universitätsbibliothek Greifswald",
      "sourceUrl": "https://de.wikisource.org/wiki/Seite%3AAus_dem_Leben_eines_Taugenichts_und_das_Marmorbild.djvu/231",
      "editionYear": 1826,
      "editionDetails": "Aus dem Leben eines Taugenichts und das Marmorbild, Vereinsbuchhandlung, S. 227 ff.",
      "checkedAt": "2026-09-12",
      "notes": "Historische Schreibweisen weichen von der Nutzerfassung ab; vollständige Seitenkollation noch offen.",
      "baseEdition": {
        "title": "Das zerbrochene Ringlein",
        "editorOrPublisher": "Wikisource / Universitätsbibliothek Greifswald",
        "publicationYear": 1826,
        "place": null,
        "volume": null,
        "pages": "Aus dem Leben eines Taugenichts und das Marmorbild, Vereinsbuchhandlung, S. 227 ff.",
        "digitalSource": "Wikisource / Universitätsbibliothek Greifswald",
        "sourceUrl": "https://de.wikisource.org/wiki/Seite%3AAus_dem_Leben_eines_Taugenichts_und_das_Marmorbild.djvu/231",
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Ballade",
      "Konflikt",
      "Bewegung"
    ],
    "genre": "songLike",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      3,
      5,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Das zerbrochene Ringlein",
    "baseEditionTitle": "Das zerbrochene Ringlein",
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-40-mondnacht",
    "title": "Mondnacht",
    "author": "Joseph von Eichendorff",
    "year": 1837,
    "userText": "Es war, als hätt der Himmel\ndie Erde still geküsst,\ndass sie im Blütenschimmer\nvon ihm nun träumen müsst.\n\nDie Luft ging durch die Felder,\ndie Ähren wogten sacht,\nes rauschten leis die Wälder,\nso sternklar war die Nacht.\n\nUnd meine Seele spannte\nweit ihre Flügel aus,\nflog durch die stillen Lande,\nals flöge sie nach Haus.",
    "canonicalText": "Es war, als hätt’ der Himmel\nDie Erde still geküßt,\nDaß sie im Blütenschimmer\nVon ihm nun träumen müßt’.\n\nDie Luft ging durch die Felder,\nDie Aehren wogten sacht,\nEs rauschten leis die Wälder,\nSo sternklar war die Nacht.\n\nUnd meine Seele spannte\nWeit ihre Flügel aus,\nFlog durch die stillen Lande,\nAls flöge sie nach Haus.",
    "userStanzas": [
      "Es war, als hätt der Himmel\ndie Erde still geküsst,\ndass sie im Blütenschimmer\nvon ihm nun träumen müsst.",
      "Die Luft ging durch die Felder,\ndie Ähren wogten sacht,\nes rauschten leis die Wälder,\nso sternklar war die Nacht.",
      "Und meine Seele spannte\nweit ihre Flügel aus,\nflog durch die stillen Lande,\nals flöge sie nach Haus."
    ],
    "canonicalStanzas": [
      "Es war, als hätt’ der Himmel\nDie Erde still geküßt,\nDaß sie im Blütenschimmer\nVon ihm nun träumen müßt’.",
      "Die Luft ging durch die Felder,\nDie Aehren wogten sacht,\nEs rauschten leis die Wälder,\nSo sternklar war die Nacht.",
      "Und meine Seele spannte\nWeit ihre Flügel aus,\nFlog durch die stillen Lande,\nAls flöge sie nach Haus."
    ],
    "collationStatus": "collated",
    "productionText": "Es war, als hätt’ der Himmel\nDie Erde still geküßt,\nDaß sie im Blütenschimmer\nVon ihm nun träumen müßt’.\n\nDie Luft ging durch die Felder,\nDie Aehren wogten sacht,\nEs rauschten leis die Wälder,\nSo sternklar war die Nacht.\n\nUnd meine Seele spannte\nWeit ihre Flügel aus,\nFlog durch die stillen Lande,\nAls flöge sie nach Haus.",
    "text": "Es war, als hätt’ der Himmel\nDie Erde still geküßt,\nDaß sie im Blütenschimmer\nVon ihm nun träumen müßt’.\n\nDie Luft ging durch die Felder,\nDie Aehren wogten sacht,\nEs rauschten leis die Wälder,\nSo sternklar war die Nacht.\n\nUnd meine Seele spannte\nWeit ihre Flügel aus,\nFlog durch die stillen Lande,\nAls flöge sie nach Haus.",
    "stanzas": [
      "Es war, als hätt’ der Himmel\nDie Erde still geküßt,\nDaß sie im Blütenschimmer\nVon ihm nun träumen müßt’.",
      "Die Luft ging durch die Felder,\nDie Aehren wogten sacht,\nEs rauschten leis die Wälder,\nSo sternklar war die Nacht.",
      "Und meine Seele spannte\nWeit ihre Flügel aus,\nFlog durch die stillen Lande,\nAls flöge sie nach Haus."
    ],
    "verseCount": 12,
    "stanzaCount": 3,
    "stanzaVerification": "verified",
    "stanzaStructureStatus": "verified",
    "sourceType": "authentic",
    "textVerificationStatus": "verified",
    "sourceVerification": {
      "status": "verified",
      "sourceTitle": "Mondnacht",
      "sourceInstitution": "Wikisource / Scan auf Commons",
      "sourceUrl": "https://de.wikisource.org/wiki/Mondnacht",
      "editionYear": 1864,
      "editionDetails": "Eichendorff's sämmtliche Werke, 2. Auflage, S. 604; zweifach korrekturgelesen",
      "checkedAt": "2026-09-12",
      "notes": "Basisfassung vollständig kollationiert; historische Orthografie beibehalten.",
      "baseEdition": {
        "title": "Mondnacht",
        "editorOrPublisher": "Wikisource / Scan auf Commons",
        "publicationYear": 1864,
        "place": null,
        "volume": null,
        "pages": "Eichendorff's sämmtliche Werke, 2. Auflage, S. 604; zweifach korrekturgelesen",
        "digitalSource": "Wikisource / Scan auf Commons",
        "sourceUrl": "https://de.wikisource.org/wiki/Mondnacht",
        "rationale": "Konkret benannte und vollständig kollationierte Basisfassung."
      },
      "editionPolicy": "first-authorised"
    },
    "variants": [
      {
        "userReading": "geküsst / dass / Ähren",
        "verifiedReading": "geküßt / Daß / Aehren",
        "location": "Verse 2, 3 und 6",
        "source": "Sämmtliche Werke, 1864, S. 604",
        "decision": "unresolved",
        "reason": "Modernisierung nicht stillschweigend übernehmen.",
        "canonicalReading": "geküßt / Daß / Aehren",
        "differenceType": "orthography",
        "explanation": "Modernisierung nicht stillschweigend übernehmen."
      }
    ],
    "previewAllowed": true,
    "contentTaskAllowed": true,
    "formalTaskAllowed": true,
    "publicReleaseAllowed": true,
    "verificationNote": "Mit der ausgewiesenen Quelle vollständig abgeglichen.",
    "rightsStatus": "cleared",
    "themes": [
      "Natur",
      "Stadt",
      "Wahrnehmung"
    ],
    "genre": "songLike",
    "rhymeStatus": "verified",
    "rhymeScheme": "abab cdcd efef",
    "poemFormStatus": "verified",
    "poemForm": "Liedgedicht",
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Liedgedicht",
      "3 verifizierte Strophen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      2,
      3,
      5,
      6,
      7,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": false,
    "approvedForProductiveUse": true,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Mondnacht",
    "baseEditionTitle": "Mondnacht",
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-41-der-gott-der-stadt",
    "title": "Der Gott der Stadt",
    "author": "Georg Heym",
    "year": 1910,
    "userText": "Auf einem Häuserblocke sitzt er breit.\nDie Winde lagern schwarz um seine Stirn.\nEr schaut voll Wut, wo fern in Einsamkeit\nDie letzten Häuser in das Land verirrn.\n\nVom Abend glänzt der rote Bauch dem Baal,\nDie großen Städte knieen um ihn her.\nDer Kirchenglocken ungeheure Zahl\nWogt auf zu ihm aus schwarzer Türme Meer.\n\nWie Korybanten-Tanz dröhnt die Musik\nDer Millionen durch die Straßen laut.\nDer Schlote Rauch, die Wolken der Fabrik\nZiehn auf zu ihm, wie Duft von Weihrauch blaut.\n\nDas Wetter schwelt in seinen Augenbrauen.\nDer dunkle Abend wird in Nacht betäubt.\nDie Stürme flattern, die wie Geier schauen\nVon seinem Haupthaar, das im Zorne sträubt.\n\nEr streckt ins Dunkel seine Fleischerfaust.\nEr schüttelt sie. Ein Meer von Feuer jagt\nDurch eine Straße. Und der Glutqualm braust\nUnd frisst sie auf, bis spät der Morgen tagt.",
    "canonicalText": "Auf einem Häuserblocke sitzt er breit.\nDie Winde lagern schwarz um seine Stirn.\nEr schaut voll Wut, wo fern in Einsamkeit\nDie letzten Häuser in das Land verirrn.\n\nVom Abend glänzt der rote Bauch dem Baal,\nDie großen Städte knieen um ihn her.\nDer Kirchenglocken ungeheure Zahl\nWogt auf zu ihm aus schwarzer Türme Meer.\n\nWie Korybanten-Tanz dröhnt die Musik\nDer Millionen durch die Straßen laut.\nDer Schlote Rauch, die Wolken der Fabrik\nZiehn auf zu ihm, wie Duft von Weihrauch blaut.\n\nDas Wetter schwält in seinen Augenbrauen.\nDer dunkle Abend wird in Nacht betäubt.\nDie Stürme flattern, die wie Geier schauen\nVon seinem Haupthaar, das im Zorne sträubt.\n\nEr streckt ins Dunkel seine Fleischerfaust.\nEr schüttelt sie. Ein Meer von Feuer jagt\nDurch eine Straße. Und der Glutqualm braust\nUnd frißt sie auf, bis spät der Morgen tagt.",
    "userStanzas": [
      "Auf einem Häuserblocke sitzt er breit.\nDie Winde lagern schwarz um seine Stirn.\nEr schaut voll Wut, wo fern in Einsamkeit\nDie letzten Häuser in das Land verirrn.",
      "Vom Abend glänzt der rote Bauch dem Baal,\nDie großen Städte knieen um ihn her.\nDer Kirchenglocken ungeheure Zahl\nWogt auf zu ihm aus schwarzer Türme Meer.",
      "Wie Korybanten-Tanz dröhnt die Musik\nDer Millionen durch die Straßen laut.\nDer Schlote Rauch, die Wolken der Fabrik\nZiehn auf zu ihm, wie Duft von Weihrauch blaut.",
      "Das Wetter schwelt in seinen Augenbrauen.\nDer dunkle Abend wird in Nacht betäubt.\nDie Stürme flattern, die wie Geier schauen\nVon seinem Haupthaar, das im Zorne sträubt.",
      "Er streckt ins Dunkel seine Fleischerfaust.\nEr schüttelt sie. Ein Meer von Feuer jagt\nDurch eine Straße. Und der Glutqualm braust\nUnd frisst sie auf, bis spät der Morgen tagt."
    ],
    "canonicalStanzas": [
      "Auf einem Häuserblocke sitzt er breit.\nDie Winde lagern schwarz um seine Stirn.\nEr schaut voll Wut, wo fern in Einsamkeit\nDie letzten Häuser in das Land verirrn.",
      "Vom Abend glänzt der rote Bauch dem Baal,\nDie großen Städte knieen um ihn her.\nDer Kirchenglocken ungeheure Zahl\nWogt auf zu ihm aus schwarzer Türme Meer.",
      "Wie Korybanten-Tanz dröhnt die Musik\nDer Millionen durch die Straßen laut.\nDer Schlote Rauch, die Wolken der Fabrik\nZiehn auf zu ihm, wie Duft von Weihrauch blaut.",
      "Das Wetter schwält in seinen Augenbrauen.\nDer dunkle Abend wird in Nacht betäubt.\nDie Stürme flattern, die wie Geier schauen\nVon seinem Haupthaar, das im Zorne sträubt.",
      "Er streckt ins Dunkel seine Fleischerfaust.\nEr schüttelt sie. Ein Meer von Feuer jagt\nDurch eine Straße. Und der Glutqualm braust\nUnd frißt sie auf, bis spät der Morgen tagt."
    ],
    "collationStatus": "collated",
    "productionText": "Auf einem Häuserblocke sitzt er breit.\nDie Winde lagern schwarz um seine Stirn.\nEr schaut voll Wut, wo fern in Einsamkeit\nDie letzten Häuser in das Land verirrn.\n\nVom Abend glänzt der rote Bauch dem Baal,\nDie großen Städte knieen um ihn her.\nDer Kirchenglocken ungeheure Zahl\nWogt auf zu ihm aus schwarzer Türme Meer.\n\nWie Korybanten-Tanz dröhnt die Musik\nDer Millionen durch die Straßen laut.\nDer Schlote Rauch, die Wolken der Fabrik\nZiehn auf zu ihm, wie Duft von Weihrauch blaut.\n\nDas Wetter schwält in seinen Augenbrauen.\nDer dunkle Abend wird in Nacht betäubt.\nDie Stürme flattern, die wie Geier schauen\nVon seinem Haupthaar, das im Zorne sträubt.\n\nEr streckt ins Dunkel seine Fleischerfaust.\nEr schüttelt sie. Ein Meer von Feuer jagt\nDurch eine Straße. Und der Glutqualm braust\nUnd frißt sie auf, bis spät der Morgen tagt.",
    "text": "Auf einem Häuserblocke sitzt er breit.\nDie Winde lagern schwarz um seine Stirn.\nEr schaut voll Wut, wo fern in Einsamkeit\nDie letzten Häuser in das Land verirrn.\n\nVom Abend glänzt der rote Bauch dem Baal,\nDie großen Städte knieen um ihn her.\nDer Kirchenglocken ungeheure Zahl\nWogt auf zu ihm aus schwarzer Türme Meer.\n\nWie Korybanten-Tanz dröhnt die Musik\nDer Millionen durch die Straßen laut.\nDer Schlote Rauch, die Wolken der Fabrik\nZiehn auf zu ihm, wie Duft von Weihrauch blaut.\n\nDas Wetter schwält in seinen Augenbrauen.\nDer dunkle Abend wird in Nacht betäubt.\nDie Stürme flattern, die wie Geier schauen\nVon seinem Haupthaar, das im Zorne sträubt.\n\nEr streckt ins Dunkel seine Fleischerfaust.\nEr schüttelt sie. Ein Meer von Feuer jagt\nDurch eine Straße. Und der Glutqualm braust\nUnd frißt sie auf, bis spät der Morgen tagt.",
    "stanzas": [
      "Auf einem Häuserblocke sitzt er breit.\nDie Winde lagern schwarz um seine Stirn.\nEr schaut voll Wut, wo fern in Einsamkeit\nDie letzten Häuser in das Land verirrn.",
      "Vom Abend glänzt der rote Bauch dem Baal,\nDie großen Städte knieen um ihn her.\nDer Kirchenglocken ungeheure Zahl\nWogt auf zu ihm aus schwarzer Türme Meer.",
      "Wie Korybanten-Tanz dröhnt die Musik\nDer Millionen durch die Straßen laut.\nDer Schlote Rauch, die Wolken der Fabrik\nZiehn auf zu ihm, wie Duft von Weihrauch blaut.",
      "Das Wetter schwält in seinen Augenbrauen.\nDer dunkle Abend wird in Nacht betäubt.\nDie Stürme flattern, die wie Geier schauen\nVon seinem Haupthaar, das im Zorne sträubt.",
      "Er streckt ins Dunkel seine Fleischerfaust.\nEr schüttelt sie. Ein Meer von Feuer jagt\nDurch eine Straße. Und der Glutqualm braust\nUnd frißt sie auf, bis spät der Morgen tagt."
    ],
    "verseCount": 20,
    "stanzaCount": 5,
    "stanzaVerification": "verified",
    "stanzaStructureStatus": "verified",
    "sourceType": "authentic",
    "textVerificationStatus": "verified",
    "sourceVerification": {
      "status": "verified",
      "sourceTitle": "Der Gott der Stadt",
      "sourceInstitution": "Wikisource / ULB Düsseldorf",
      "sourceUrl": "https://de.wikisource.org/wiki/Der_Gott_der_Stadt",
      "editionYear": 1911,
      "editionDetails": "Der ewige Tag, Rowohlt, Erstausgabe, S. 13",
      "checkedAt": "2026-09-12",
      "notes": "Erstausgabe vollständig kollationiert; schwält und frißt übernommen.",
      "baseEdition": {
        "title": "Der Gott der Stadt",
        "editorOrPublisher": "Wikisource / ULB Düsseldorf",
        "publicationYear": 1911,
        "place": null,
        "volume": null,
        "pages": "Der ewige Tag, Rowohlt, Erstausgabe, S. 13",
        "digitalSource": "Wikisource / ULB Düsseldorf",
        "sourceUrl": "https://de.wikisource.org/wiki/Der_Gott_der_Stadt",
        "rationale": "Konkret benannte und vollständig kollationierte Basisfassung."
      },
      "editionPolicy": "first-authorised"
    },
    "variants": [
      {
        "userReading": "schwelt / frisst",
        "verifiedReading": "schwält / frißt",
        "location": "Verse 13 und 20",
        "source": "Der ewige Tag, 1911, S. 13",
        "decision": "unresolved",
        "reason": "Erstausgabenlesart weicht ab.",
        "canonicalReading": "schwält / frißt",
        "differenceType": "wording",
        "explanation": "Erstausgabenlesart weicht ab."
      }
    ],
    "previewAllowed": true,
    "contentTaskAllowed": true,
    "formalTaskAllowed": true,
    "publicReleaseAllowed": true,
    "verificationNote": "Mit der ausgewiesenen Quelle vollständig abgeglichen.",
    "rightsStatus": "cleared",
    "themes": [
      "Natur",
      "Stadt",
      "Wahrnehmung"
    ],
    "genre": "lyric",
    "rhymeStatus": "verified",
    "rhymeScheme": "abab cdcd efef ghgh ijij",
    "poemFormStatus": "verified",
    "poemForm": "sonstige Form",
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "sonstige Form",
      "5 verifizierte Strophen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      2,
      3,
      5,
      6,
      7,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": false,
    "approvedForProductiveUse": true,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Der Gott der Stadt",
    "baseEditionTitle": "Der Gott der Stadt",
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-42-die-stadt",
    "title": "Die Stadt",
    "author": "Georg Heym",
    "year": 1911,
    "userText": "Sehr weit ist diese Nacht. Und Wolkenschein\nZerreißet vor des Mondes Untergang.\nUnd tausend Fenster stehn die Nacht entlang\nUnd blinzeln mit den Lidern, rot und klein.\n\nWie Aderwerk gehn Straßen durch die Stadt,\nUnzählig Menschen schwemmen aus und ein.\nUnd ewig stumpfer Ton von stumpfem Sein\nEintönig kommt heraus in Stille matt.\n\nGebären, Tod, gewirktes Einerlei,\nLallen der Wehen, langer Sterbeschrei,\nIm blinden Wechsel geht es dumpf vorbei.\n\nUnd Schein und Feuer, Fackeln rot und Brand,\nDie drohn im Weiten mit gezückter Hand\nUnd scheinen hoch von dunkler Wolkenwand.",
    "canonicalText": "Sehr weit ist diese Nacht. Und Wolkenschein\nZerreißet vor des Mondes Untergang.\nUnd tausend Fenster stehn die Nacht entlang\nUnd blinzeln mit den Lidern, rot und klein.\n\nWie Aderwerk gehn Straßen durch die Stadt,\nUnzählig Menschen schwemmen aus und ein.\nUnd ewig stumpfer Ton von stumpfem Sein\nEintönig kommt heraus in Stille matt.\n\nGebären, Tod, gewirktes Einerlei,\nLallen der Wehen, langer Sterbeschrei,\nIm blinden Wechsel geht es dumpf vorbei.\n\nUnd Schein und Feuer, Fackeln rot und Brand,\nDie drohn im Weiten mit gezückter Hand\nUnd scheinen hoch von dunkler Wolkenwand.",
    "userStanzas": [
      "Sehr weit ist diese Nacht. Und Wolkenschein\nZerreißet vor des Mondes Untergang.\nUnd tausend Fenster stehn die Nacht entlang\nUnd blinzeln mit den Lidern, rot und klein.",
      "Wie Aderwerk gehn Straßen durch die Stadt,\nUnzählig Menschen schwemmen aus und ein.\nUnd ewig stumpfer Ton von stumpfem Sein\nEintönig kommt heraus in Stille matt.",
      "Gebären, Tod, gewirktes Einerlei,\nLallen der Wehen, langer Sterbeschrei,\nIm blinden Wechsel geht es dumpf vorbei.",
      "Und Schein und Feuer, Fackeln rot und Brand,\nDie drohn im Weiten mit gezückter Hand\nUnd scheinen hoch von dunkler Wolkenwand."
    ],
    "canonicalStanzas": [
      "Sehr weit ist diese Nacht. Und Wolkenschein\nZerreißet vor des Mondes Untergang.\nUnd tausend Fenster stehn die Nacht entlang\nUnd blinzeln mit den Lidern, rot und klein.",
      "Wie Aderwerk gehn Straßen durch die Stadt,\nUnzählig Menschen schwemmen aus und ein.\nUnd ewig stumpfer Ton von stumpfem Sein\nEintönig kommt heraus in Stille matt.",
      "Gebären, Tod, gewirktes Einerlei,\nLallen der Wehen, langer Sterbeschrei,\nIm blinden Wechsel geht es dumpf vorbei.",
      "Und Schein und Feuer, Fackeln rot und Brand,\nDie drohn im Weiten mit gezückter Hand\nUnd scheinen hoch von dunkler Wolkenwand."
    ],
    "collationStatus": "collated",
    "productionText": "Sehr weit ist diese Nacht. Und Wolkenschein\nZerreißet vor des Mondes Untergang.\nUnd tausend Fenster stehn die Nacht entlang\nUnd blinzeln mit den Lidern, rot und klein.\n\nWie Aderwerk gehn Straßen durch die Stadt,\nUnzählig Menschen schwemmen aus und ein.\nUnd ewig stumpfer Ton von stumpfem Sein\nEintönig kommt heraus in Stille matt.\n\nGebären, Tod, gewirktes Einerlei,\nLallen der Wehen, langer Sterbeschrei,\nIm blinden Wechsel geht es dumpf vorbei.\n\nUnd Schein und Feuer, Fackeln rot und Brand,\nDie drohn im Weiten mit gezückter Hand\nUnd scheinen hoch von dunkler Wolkenwand.",
    "text": "Sehr weit ist diese Nacht. Und Wolkenschein\nZerreißet vor des Mondes Untergang.\nUnd tausend Fenster stehn die Nacht entlang\nUnd blinzeln mit den Lidern, rot und klein.\n\nWie Aderwerk gehn Straßen durch die Stadt,\nUnzählig Menschen schwemmen aus und ein.\nUnd ewig stumpfer Ton von stumpfem Sein\nEintönig kommt heraus in Stille matt.\n\nGebären, Tod, gewirktes Einerlei,\nLallen der Wehen, langer Sterbeschrei,\nIm blinden Wechsel geht es dumpf vorbei.\n\nUnd Schein und Feuer, Fackeln rot und Brand,\nDie drohn im Weiten mit gezückter Hand\nUnd scheinen hoch von dunkler Wolkenwand.",
    "stanzas": [
      "Sehr weit ist diese Nacht. Und Wolkenschein\nZerreißet vor des Mondes Untergang.\nUnd tausend Fenster stehn die Nacht entlang\nUnd blinzeln mit den Lidern, rot und klein.",
      "Wie Aderwerk gehn Straßen durch die Stadt,\nUnzählig Menschen schwemmen aus und ein.\nUnd ewig stumpfer Ton von stumpfem Sein\nEintönig kommt heraus in Stille matt.",
      "Gebären, Tod, gewirktes Einerlei,\nLallen der Wehen, langer Sterbeschrei,\nIm blinden Wechsel geht es dumpf vorbei.",
      "Und Schein und Feuer, Fackeln rot und Brand,\nDie drohn im Weiten mit gezückter Hand\nUnd scheinen hoch von dunkler Wolkenwand."
    ],
    "verseCount": 14,
    "stanzaCount": 4,
    "stanzaVerification": "verified",
    "stanzaStructureStatus": "verified",
    "sourceType": "authentic",
    "textVerificationStatus": "verified",
    "sourceVerification": {
      "status": "verified",
      "sourceTitle": "Die Stadt",
      "sourceInstitution": "Wikisource / wissenschaftliche Gesamtausgabe",
      "sourceUrl": "https://de.wikisource.org/wiki/Die_Stadt_%28Heym%29",
      "editionYear": 1964,
      "editionDetails": "Dichtungen und Schriften, Bd. 1: Lyrik, hg. Ludwig Schneider, S. 452; zweifach kollationiert",
      "checkedAt": "2026-09-12",
      "notes": "Nutzerfassung stimmt in Wortlaut, Versen, Strophen und Interpunktion mit dem Quellentext überein.",
      "baseEdition": {
        "title": "Die Stadt",
        "editorOrPublisher": "Wikisource / wissenschaftliche Gesamtausgabe",
        "publicationYear": 1964,
        "place": null,
        "volume": null,
        "pages": "Dichtungen und Schriften, Bd. 1: Lyrik, hg. Ludwig Schneider, S. 452; zweifach kollationiert",
        "digitalSource": "Wikisource / wissenschaftliche Gesamtausgabe",
        "sourceUrl": "https://de.wikisource.org/wiki/Die_Stadt_%28Heym%29",
        "rationale": "Konkret benannte und vollständig kollationierte Basisfassung."
      },
      "editionPolicy": "critical-edition"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": true,
    "formalTaskAllowed": true,
    "publicReleaseAllowed": true,
    "verificationNote": "Mit der ausgewiesenen Quelle vollständig abgeglichen.",
    "rightsStatus": "cleared",
    "themes": [
      "Natur",
      "Stadt",
      "Wahrnehmung"
    ],
    "genre": "sonnet",
    "rhymeStatus": "verified",
    "rhymeScheme": "abba abba ccc ddd",
    "poemFormStatus": "verified",
    "poemForm": "Sonett",
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Sonett",
      "4 verifizierte Strophen"
    ],
    "notableFeatures": [
      "Sonettform",
      "Formdetails vor Einsatz prüfen"
    ],
    "suitableChapters": [
      2,
      3,
      5,
      6,
      7,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": false,
    "approvedForProductiveUse": true,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Die Stadt",
    "baseEditionTitle": "Die Stadt",
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-43-der-panther",
    "title": "Der Panther",
    "author": "Rainer Maria Rilke",
    "year": 1902,
    "userText": "(Im Jardin des Plantes, Paris)\nSein Blick ist vom Vorübergehn der Stäbe\nso müd geworden, daß er nichts mehr hält.\nIhm ist, als ob es tausend Stäbe gäbe\n\nund hinter tausend Stäben keine Welt.\nDer weiche Gang geschmeidig starker Schritte,\nder sich im allerkleinsten Kreise dreht,\nist wie ein Tanz von Kraft um eine Mitte,\n\nin der betäubt ein großer Wille steht.\nNur manchmal schiebt der Vorhang der Pupille\nsich lautlos auf –. Dann geht ein Bild hinein,\ngeht durch der Glieder angespannte Stille –",
    "canonicalText": "(Im Jardin des Plantes, Paris)\nSein Blick ist vom Vorübergehn der Stäbe\nso müd geworden, daß er nichts mehr hält.\nIhm ist, als ob es tausend Stäbe gäbe\n\nund hinter tausend Stäben keine Welt.\nDer weiche Gang geschmeidig starker Schritte,\nder sich im allerkleinsten Kreise dreht,\nist wie ein Tanz von Kraft um eine Mitte,\n\nin der betäubt ein großer Wille steht.\nNur manchmal schiebt der Vorhang der Pupille\nsich lautlos auf –. Dann geht ein Bild hinein,\ngeht durch der Glieder angespannte Stille –",
    "userStanzas": [
      "(Im Jardin des Plantes, Paris)\nSein Blick ist vom Vorübergehn der Stäbe\nso müd geworden, daß er nichts mehr hält.\nIhm ist, als ob es tausend Stäbe gäbe",
      "und hinter tausend Stäben keine Welt.\nDer weiche Gang geschmeidig starker Schritte,\nder sich im allerkleinsten Kreise dreht,\nist wie ein Tanz von Kraft um eine Mitte,",
      "in der betäubt ein großer Wille steht.\nNur manchmal schiebt der Vorhang der Pupille\nsich lautlos auf –. Dann geht ein Bild hinein,\ngeht durch der Glieder angespannte Stille –"
    ],
    "canonicalStanzas": [
      "(Im Jardin des Plantes, Paris)\nSein Blick ist vom Vorübergehn der Stäbe\nso müd geworden, daß er nichts mehr hält.\nIhm ist, als ob es tausend Stäbe gäbe",
      "und hinter tausend Stäben keine Welt.\nDer weiche Gang geschmeidig starker Schritte,\nder sich im allerkleinsten Kreise dreht,\nist wie ein Tanz von Kraft um eine Mitte,",
      "in der betäubt ein großer Wille steht.\nNur manchmal schiebt der Vorhang der Pupille\nsich lautlos auf –. Dann geht ein Bild hinein,\ngeht durch der Glieder angespannte Stille –"
    ],
    "collationStatus": "collated",
    "productionText": "(Im Jardin des Plantes, Paris)\nSein Blick ist vom Vorübergehn der Stäbe\nso müd geworden, daß er nichts mehr hält.\nIhm ist, als ob es tausend Stäbe gäbe\n\nund hinter tausend Stäben keine Welt.\nDer weiche Gang geschmeidig starker Schritte,\nder sich im allerkleinsten Kreise dreht,\nist wie ein Tanz von Kraft um eine Mitte,\n\nin der betäubt ein großer Wille steht.\nNur manchmal schiebt der Vorhang der Pupille\nsich lautlos auf –. Dann geht ein Bild hinein,\ngeht durch der Glieder angespannte Stille –",
    "text": "(Im Jardin des Plantes, Paris)\nSein Blick ist vom Vorübergehn der Stäbe\nso müd geworden, daß er nichts mehr hält.\nIhm ist, als ob es tausend Stäbe gäbe\n\nund hinter tausend Stäben keine Welt.\nDer weiche Gang geschmeidig starker Schritte,\nder sich im allerkleinsten Kreise dreht,\nist wie ein Tanz von Kraft um eine Mitte,\n\nin der betäubt ein großer Wille steht.\nNur manchmal schiebt der Vorhang der Pupille\nsich lautlos auf –. Dann geht ein Bild hinein,\ngeht durch der Glieder angespannte Stille –",
    "stanzas": [
      "(Im Jardin des Plantes, Paris)\nSein Blick ist vom Vorübergehn der Stäbe\nso müd geworden, daß er nichts mehr hält.\nIhm ist, als ob es tausend Stäbe gäbe",
      "und hinter tausend Stäben keine Welt.\nDer weiche Gang geschmeidig starker Schritte,\nder sich im allerkleinsten Kreise dreht,\nist wie ein Tanz von Kraft um eine Mitte,",
      "in der betäubt ein großer Wille steht.\nNur manchmal schiebt der Vorhang der Pupille\nsich lautlos auf –. Dann geht ein Bild hinein,\ngeht durch der Glieder angespannte Stille –"
    ],
    "verseCount": 12,
    "stanzaCount": 3,
    "stanzaVerification": "verified",
    "stanzaStructureStatus": "verified",
    "sourceType": "authentic",
    "textVerificationStatus": "verified",
    "sourceVerification": {
      "status": "verified",
      "sourceTitle": "Der Panther",
      "sourceInstitution": "Wikisource / Digitalisat der Erstausgabe",
      "sourceUrl": "https://de.wikisource.org/wiki/Der_Panther",
      "editionYear": 1907,
      "editionDetails": "Neue Gedichte, Insel-Verlag, Erstausgabe, S. 37; zweifach korrekturgelesen",
      "checkedAt": "2026-09-12",
      "notes": "Wortlaut, Versfolge, Interpunktion und drei Vierzeiler kollationiert; Untertitel dokumentiert.",
      "baseEdition": {
        "title": "Der Panther",
        "editorOrPublisher": "Wikisource / Digitalisat der Erstausgabe",
        "publicationYear": 1907,
        "place": null,
        "volume": null,
        "pages": "Neue Gedichte, Insel-Verlag, Erstausgabe, S. 37; zweifach korrekturgelesen",
        "digitalSource": "Wikisource / Digitalisat der Erstausgabe",
        "sourceUrl": "https://de.wikisource.org/wiki/Der_Panther",
        "rationale": "Konkret benannte und vollständig kollationierte Basisfassung."
      },
      "editionPolicy": "first-authorised"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": true,
    "formalTaskAllowed": true,
    "publicReleaseAllowed": true,
    "verificationNote": "Mit der ausgewiesenen Quelle vollständig abgeglichen.",
    "rightsStatus": "cleared",
    "themes": [
      "Natur",
      "Stadt",
      "Wahrnehmung"
    ],
    "genre": "lyric",
    "rhymeStatus": "verified",
    "rhymeScheme": "abab cdcd efef",
    "poemFormStatus": "verified",
    "poemForm": "Dinggedicht",
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Dinggedicht",
      "3 verifizierte Strophen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      2,
      3,
      5,
      6,
      7,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": false,
    "approvedForProductiveUse": true,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Der Panther",
    "baseEditionTitle": "Der Panther",
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-44-ich-lebe-mein-leben-in-wachsenden-ringen",
    "title": "Ich lebe mein Leben in wachsenden Ringen",
    "author": "Rainer Maria Rilke",
    "year": 1899,
    "userText": "Ich lebe mein Leben in wachsenden Ringen,\ndie sich über die Dinge ziehn.\nIch werde den letzten vielleicht nicht vollbringen,\naber versuchen will ich ihn.\n\nIch kreise um Gott, um den uralten Turm,\nund ich kreise jahrtausendelang;\nund ich weiß noch nicht: bin ich ein Falke, ein Sturm\noder ein großer Gesang.",
    "canonicalText": null,
    "userStanzas": [
      "Ich lebe mein Leben in wachsenden Ringen,\ndie sich über die Dinge ziehn.\nIch werde den letzten vielleicht nicht vollbringen,\naber versuchen will ich ihn.",
      "Ich kreise um Gott, um den uralten Turm,\nund ich kreise jahrtausendelang;\nund ich weiß noch nicht: bin ich ein Falke, ein Sturm\noder ein großer Gesang."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Ich lebe mein Leben in wachsenden Ringen,\ndie sich über die Dinge ziehn.\nIch werde den letzten vielleicht nicht vollbringen,\naber versuchen will ich ihn.\n\nIch kreise um Gott, um den uralten Turm,\nund ich kreise jahrtausendelang;\nund ich weiß noch nicht: bin ich ein Falke, ein Sturm\noder ein großer Gesang.",
    "stanzas": [
      "Ich lebe mein Leben in wachsenden Ringen,\ndie sich über die Dinge ziehn.\nIch werde den letzten vielleicht nicht vollbringen,\naber versuchen will ich ihn.",
      "Ich kreise um Gott, um den uralten Turm,\nund ich kreise jahrtausendelang;\nund ich weiß noch nicht: bin ich ein Falke, ein Sturm\noder ein großer Gesang."
    ],
    "verseCount": 8,
    "stanzaCount": 2,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "source-located",
      "sourceTitle": "Das Stunden-Buch",
      "sourceInstitution": "Wikisource / Insel-Digitalisat",
      "sourceUrl": "https://de.wikisource.org/wiki/Seite%3ADas_Stundenbuch_%28Rilke%29_103.jpg",
      "editionYear": 1918,
      "editionDetails": "Insel-Verlag, Inhaltsverzeichnis mit Versanfang und Seitenverweis",
      "checkedAt": "2026-09-12",
      "notes": "Werkstelle lokalisiert; Volltextseite noch nicht vollständig kollationiert.",
      "baseEdition": {
        "title": "Das Stunden-Buch",
        "editorOrPublisher": "Wikisource / Insel-Digitalisat",
        "publicationYear": 1918,
        "place": null,
        "volume": null,
        "pages": "Insel-Verlag, Inhaltsverzeichnis mit Versanfang und Seitenverweis",
        "digitalSource": "Wikisource / Insel-Digitalisat",
        "sourceUrl": "https://de.wikisource.org/wiki/Seite%3ADas_Stundenbuch_%28Rilke%29_103.jpg",
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Natur",
      "Stadt",
      "Wahrnehmung"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      2,
      3,
      5,
      6,
      7,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Ich lebe mein Leben in wachsenden Ringen",
    "baseEditionTitle": "Das Stunden-Buch",
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-45-du-musst-das-leben-nicht-verstehen",
    "title": "Du musst das Leben nicht verstehen",
    "author": "Rainer Maria Rilke",
    "year": 1899,
    "userText": "Du musst das Leben nicht verstehen,\ndann wird es werden wie ein Fest.\nUnd lass dir jeden Tag geschehen\nso wie ein Kind im Weitergehen von jedem Wehen\nsich viele Blüten schenken lässt.\n\nSie aufzusammeln und zu sparen,\ndas kommt dem Kind nicht in den Sinn.\nEs löst sie leise aus den Haaren,\ndrin sie so gern gefangen waren,\nund hält den lieben jungen Jahren\nnach neuen seine Hände hin.",
    "canonicalText": null,
    "userStanzas": [
      "Du musst das Leben nicht verstehen,\ndann wird es werden wie ein Fest.\nUnd lass dir jeden Tag geschehen\nso wie ein Kind im Weitergehen von jedem Wehen\nsich viele Blüten schenken lässt.",
      "Sie aufzusammeln und zu sparen,\ndas kommt dem Kind nicht in den Sinn.\nEs löst sie leise aus den Haaren,\ndrin sie so gern gefangen waren,\nund hält den lieben jungen Jahren\nnach neuen seine Hände hin."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Du musst das Leben nicht verstehen,\ndann wird es werden wie ein Fest.\nUnd lass dir jeden Tag geschehen\nso wie ein Kind im Weitergehen von jedem Wehen\nsich viele Blüten schenken lässt.\n\nSie aufzusammeln und zu sparen,\ndas kommt dem Kind nicht in den Sinn.\nEs löst sie leise aus den Haaren,\ndrin sie so gern gefangen waren,\nund hält den lieben jungen Jahren\nnach neuen seine Hände hin.",
    "stanzas": [
      "Du musst das Leben nicht verstehen,\ndann wird es werden wie ein Fest.\nUnd lass dir jeden Tag geschehen\nso wie ein Kind im Weitergehen von jedem Wehen\nsich viele Blüten schenken lässt.",
      "Sie aufzusammeln und zu sparen,\ndas kommt dem Kind nicht in den Sinn.\nEs löst sie leise aus den Haaren,\ndrin sie so gern gefangen waren,\nund hält den lieben jungen Jahren\nnach neuen seine Hände hin."
    ],
    "verseCount": 11,
    "stanzaCount": 2,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": "Du mußt das Leben nicht verstehen",
      "sourceInstitution": "keine hinreichende Quelle lokalisiert",
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Vollständige editionsbezogene Digitalquelle in Phase 1 nicht sicher lokalisiert.",
      "baseEdition": {
        "title": "Du mußt das Leben nicht verstehen",
        "editorOrPublisher": "keine hinreichende Quelle lokalisiert",
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": "keine hinreichende Quelle lokalisiert",
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Natur",
      "Stadt",
      "Wahrnehmung"
    ],
    "genre": "lyric",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "notableFeatures": [
      "Nutzerfassung",
      "Textgestalt vor Freigabe prüfen"
    ],
    "suitableChapters": [
      2,
      3,
      5,
      6,
      7,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Du musst das Leben nicht verstehen",
    "baseEditionTitle": "Du mußt das Leben nicht verstehen",
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-46-das-susseste-leben",
    "title": "Das süßeste Leben",
    "author": "Novalis",
    "year": 1800,
    "userText": "Lieblich murmelt meines Lebensquelle\nZwischen Rosenbüschen schmeichelnd hin,\nWenn ich eines Fürsten Liebling bin,\nUnbeneidet auf der hohen Stelle;\n\nUnd von meiner stolzen Marmorschwelle\nGüte nicht, die Herzenszauberin\nUnd die Liebe, aller Siegerin\nFlieht zu einer Hütte oder Zelle;\n\nSüßer aber schleicht sie sich davon\nWenn ich unter trauernden Ruinen\nEfeugleich geschmiegt an Karolinen\n\nWehmutlächelnd les im Oberon\nOder bei der milchgefüllten Schale\nBürgers Lieder sing im engen Tale.",
    "canonicalText": null,
    "userStanzas": [
      "Lieblich murmelt meines Lebensquelle\nZwischen Rosenbüschen schmeichelnd hin,\nWenn ich eines Fürsten Liebling bin,\nUnbeneidet auf der hohen Stelle;",
      "Und von meiner stolzen Marmorschwelle\nGüte nicht, die Herzenszauberin\nUnd die Liebe, aller Siegerin\nFlieht zu einer Hütte oder Zelle;",
      "Süßer aber schleicht sie sich davon\nWenn ich unter trauernden Ruinen\nEfeugleich geschmiegt an Karolinen",
      "Wehmutlächelnd les im Oberon\nOder bei der milchgefüllten Schale\nBürgers Lieder sing im engen Tale."
    ],
    "canonicalStanzas": [],
    "collationStatus": "notStarted",
    "productionText": null,
    "text": "Lieblich murmelt meines Lebensquelle\nZwischen Rosenbüschen schmeichelnd hin,\nWenn ich eines Fürsten Liebling bin,\nUnbeneidet auf der hohen Stelle;\n\nUnd von meiner stolzen Marmorschwelle\nGüte nicht, die Herzenszauberin\nUnd die Liebe, aller Siegerin\nFlieht zu einer Hütte oder Zelle;\n\nSüßer aber schleicht sie sich davon\nWenn ich unter trauernden Ruinen\nEfeugleich geschmiegt an Karolinen\n\nWehmutlächelnd les im Oberon\nOder bei der milchgefüllten Schale\nBürgers Lieder sing im engen Tale.",
    "stanzas": [
      "Lieblich murmelt meines Lebensquelle\nZwischen Rosenbüschen schmeichelnd hin,\nWenn ich eines Fürsten Liebling bin,\nUnbeneidet auf der hohen Stelle;",
      "Und von meiner stolzen Marmorschwelle\nGüte nicht, die Herzenszauberin\nUnd die Liebe, aller Siegerin\nFlieht zu einer Hütte oder Zelle;",
      "Süßer aber schleicht sie sich davon\nWenn ich unter trauernden Ruinen\nEfeugleich geschmiegt an Karolinen",
      "Wehmutlächelnd les im Oberon\nOder bei der milchgefüllten Schale\nBürgers Lieder sing im engen Tale."
    ],
    "verseCount": 14,
    "stanzaCount": 4,
    "stanzaVerification": "uncertain",
    "stanzaStructureStatus": "unresolved",
    "sourceType": "authentic",
    "textVerificationStatus": "needs-manual-review",
    "sourceVerification": {
      "status": "unresolved",
      "sourceTitle": null,
      "sourceInstitution": null,
      "sourceUrl": null,
      "editionYear": null,
      "editionDetails": null,
      "checkedAt": "2026-09-12",
      "notes": "Quellen- und Editionsabgleich ausstehend.",
      "baseEdition": {
        "title": null,
        "editorOrPublisher": null,
        "publicationYear": null,
        "place": null,
        "volume": null,
        "pages": null,
        "digitalSource": null,
        "sourceUrl": null,
        "rationale": "Editionsentscheidung oder Kollation noch offen."
      },
      "editionPolicy": "other-documented"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": false,
    "formalTaskAllowed": false,
    "publicReleaseAllowed": false,
    "verificationNote": "Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",
    "rightsStatus": "public-domain-original-review",
    "themes": [
      "Natur",
      "Stadt",
      "Wahrnehmung"
    ],
    "genre": "sonnet",
    "rhymeStatus": "pending",
    "rhymeScheme": null,
    "poemFormStatus": "pending",
    "poemForm": null,
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Sonettform",
      "Formdetails vor Einsatz prüfen"
    ],
    "notableFeatures": [
      "Sonettform",
      "Formdetails vor Einsatz prüfen"
    ],
    "suitableChapters": [
      2,
      3,
      5,
      6,
      7,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": true,
    "approvedForProductiveUse": false,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Das süßeste Leben",
    "baseEditionTitle": null,
    "knownTitleVariants": [],
    "versionLabel": null
  },
  {
    "id": "canonical-47-verfall",
    "title": "Verfall",
    "author": "Georg Trakl",
    "year": 1905,
    "userText": "Am Abend, wenn die Glocken Frieden läuten,\nFolg ich der Vögel wundervollen Flügen,\nDie lang geschart, gleich frommen Pilgerzügen,\nEntschwinden in den herbstlich klaren Weiten.\n\nHinwandelnd durch den dämmervollen Garten\nTräum ich nach ihren helleren Geschicken\nUnd fühl der Stunden Weiser kaum mehr rücken.\nSo folg ich über Wolken ihren Fahrten.\n\nDa macht ein Hauch mich von Verfall erzittern.\nDie Amsel klagt in den entlaubten Zweigen.\nEs schwankt der rote Wein an rostigen Gittern,\n\nIndes wie blasser Kinder Todesreigen\nUm dunkle Brunnenränder, die verwittern,\nIm Wind sich fröstelnd blaue Astern neigen.",
    "canonicalText": "Am Abend, wenn die Glocken Frieden läuten,\nFolg ich der Vögel wundervollen Flügen,\nDie lang geschart, gleich frommen Pilgerzügen,\nEntschwinden in den herbstlich klaren Weiten.\n\nHinwandelnd durch den dämmervollen Garten\nTräum ich nach ihren helleren Geschicken\nUnd fühl der Stunden Weiser kaum mehr rücken.\nSo folg ich über Wolken ihren Fahrten.\n\nDa macht ein Hauch mich von Verfall erzittern.\nDie Amsel klagt in den entlaubten Zweigen.\nEs schwankt der rote Wein an rostigen Gittern,\n\nIndes wie blasser Kinder Todesreigen\nUm dunkle Brunnenränder, die verwittern,\nIm Wind sich fröstelnd blaue Astern neigen.",
    "userStanzas": [
      "Am Abend, wenn die Glocken Frieden läuten,\nFolg ich der Vögel wundervollen Flügen,\nDie lang geschart, gleich frommen Pilgerzügen,\nEntschwinden in den herbstlich klaren Weiten.",
      "Hinwandelnd durch den dämmervollen Garten\nTräum ich nach ihren helleren Geschicken\nUnd fühl der Stunden Weiser kaum mehr rücken.\nSo folg ich über Wolken ihren Fahrten.",
      "Da macht ein Hauch mich von Verfall erzittern.\nDie Amsel klagt in den entlaubten Zweigen.\nEs schwankt der rote Wein an rostigen Gittern,",
      "Indes wie blasser Kinder Todesreigen\nUm dunkle Brunnenränder, die verwittern,\nIm Wind sich fröstelnd blaue Astern neigen."
    ],
    "canonicalStanzas": [
      "Am Abend, wenn die Glocken Frieden läuten,\nFolg ich der Vögel wundervollen Flügen,\nDie lang geschart, gleich frommen Pilgerzügen,\nEntschwinden in den herbstlich klaren Weiten.",
      "Hinwandelnd durch den dämmervollen Garten\nTräum ich nach ihren helleren Geschicken\nUnd fühl der Stunden Weiser kaum mehr rücken.\nSo folg ich über Wolken ihren Fahrten.",
      "Da macht ein Hauch mich von Verfall erzittern.\nDie Amsel klagt in den entlaubten Zweigen.\nEs schwankt der rote Wein an rostigen Gittern,",
      "Indes wie blasser Kinder Todesreigen\nUm dunkle Brunnenränder, die verwittern,\nIm Wind sich fröstelnd blaue Astern neigen."
    ],
    "collationStatus": "collated",
    "productionText": "Am Abend, wenn die Glocken Frieden läuten,\nFolg ich der Vögel wundervollen Flügen,\nDie lang geschart, gleich frommen Pilgerzügen,\nEntschwinden in den herbstlich klaren Weiten.\n\nHinwandelnd durch den dämmervollen Garten\nTräum ich nach ihren helleren Geschicken\nUnd fühl der Stunden Weiser kaum mehr rücken.\nSo folg ich über Wolken ihren Fahrten.\n\nDa macht ein Hauch mich von Verfall erzittern.\nDie Amsel klagt in den entlaubten Zweigen.\nEs schwankt der rote Wein an rostigen Gittern,\n\nIndes wie blasser Kinder Todesreigen\nUm dunkle Brunnenränder, die verwittern,\nIm Wind sich fröstelnd blaue Astern neigen.",
    "text": "Am Abend, wenn die Glocken Frieden läuten,\nFolg ich der Vögel wundervollen Flügen,\nDie lang geschart, gleich frommen Pilgerzügen,\nEntschwinden in den herbstlich klaren Weiten.\n\nHinwandelnd durch den dämmervollen Garten\nTräum ich nach ihren helleren Geschicken\nUnd fühl der Stunden Weiser kaum mehr rücken.\nSo folg ich über Wolken ihren Fahrten.\n\nDa macht ein Hauch mich von Verfall erzittern.\nDie Amsel klagt in den entlaubten Zweigen.\nEs schwankt der rote Wein an rostigen Gittern,\n\nIndes wie blasser Kinder Todesreigen\nUm dunkle Brunnenränder, die verwittern,\nIm Wind sich fröstelnd blaue Astern neigen.",
    "stanzas": [
      "Am Abend, wenn die Glocken Frieden läuten,\nFolg ich der Vögel wundervollen Flügen,\nDie lang geschart, gleich frommen Pilgerzügen,\nEntschwinden in den herbstlich klaren Weiten.",
      "Hinwandelnd durch den dämmervollen Garten\nTräum ich nach ihren helleren Geschicken\nUnd fühl der Stunden Weiser kaum mehr rücken.\nSo folg ich über Wolken ihren Fahrten.",
      "Da macht ein Hauch mich von Verfall erzittern.\nDie Amsel klagt in den entlaubten Zweigen.\nEs schwankt der rote Wein an rostigen Gittern,",
      "Indes wie blasser Kinder Todesreigen\nUm dunkle Brunnenränder, die verwittern,\nIm Wind sich fröstelnd blaue Astern neigen."
    ],
    "verseCount": 14,
    "stanzaCount": 4,
    "stanzaVerification": "verified",
    "stanzaStructureStatus": "verified",
    "sourceType": "authentic",
    "textVerificationStatus": "verified",
    "sourceVerification": {
      "status": "verified",
      "sourceTitle": "Verfall",
      "sourceInstitution": "Wikisource / Digitalisat der Erstausgabe",
      "sourceUrl": "https://de.wikisource.org/wiki/Verfall",
      "editionYear": 1913,
      "editionDetails": "Georg Trakl: Gedichte, Kurt Wolff, 1913, S. 51",
      "checkedAt": "2026-09-12",
      "notes": "Text sowie Vers- und Strophengrenzen abgeglichen.",
      "baseEdition": {
        "title": "Verfall",
        "editorOrPublisher": "Wikisource / Digitalisat der Erstausgabe",
        "publicationYear": 1913,
        "place": null,
        "volume": null,
        "pages": "Georg Trakl: Gedichte, Kurt Wolff, 1913, S. 51",
        "digitalSource": "Wikisource / Digitalisat der Erstausgabe",
        "sourceUrl": "https://de.wikisource.org/wiki/Verfall",
        "rationale": "Konkret benannte und vollständig kollationierte Basisfassung."
      },
      "editionPolicy": "first-authorised"
    },
    "variants": [],
    "previewAllowed": true,
    "contentTaskAllowed": true,
    "formalTaskAllowed": true,
    "publicReleaseAllowed": true,
    "verificationNote": "Mit der ausgewiesenen Quelle vollständig abgeglichen.",
    "rightsStatus": "cleared",
    "themes": [
      "Natur",
      "Stadt",
      "Wahrnehmung"
    ],
    "genre": "sonnet",
    "rhymeStatus": "verified",
    "rhymeScheme": "abba cddc efefef",
    "poemFormStatus": "verified",
    "poemForm": "Sonett",
    "meterStatus": "pending",
    "meter": null,
    "cadenceStatus": "pending",
    "notableFormFeatures": [
      "Sonett",
      "4 verifizierte Strophen"
    ],
    "notableFeatures": [
      "Sonettform",
      "Formdetails vor Einsatz prüfen"
    ],
    "suitableChapters": [
      2,
      3,
      5,
      6,
      7,
      8,
      9
    ],
    "suitableSkills": [
      "closeReading",
      "evidence",
      "comparison"
    ],
    "difficultyPotential": "mixed",
    "needsManualSeparation": false,
    "approvedForProductiveUse": true,
    "publicReleaseStatus": "editorial-preview",
    "canonicalDisplayTitle": "Verfall",
    "baseEditionTitle": "Verfall",
    "knownTitleVariants": [],
    "versionLabel": null
  }
] as const;
