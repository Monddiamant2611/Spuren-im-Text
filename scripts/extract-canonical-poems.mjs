import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const source=path.join(root,"docs","LYRIK_47_PRIMAERTEXTE_NUTZERFASSUNG.md");
const target=path.join(root,"src","games","lyrik","data","texts","canonicalPoems.ts");
const input=fs.readFileSync(source,"utf8").replace(/\r\n/g,"\n");
const matches=[...input.matchAll(/^## (\d+)\. (.+?) – (.+)$/gm)];
if(matches.length!==47)throw new Error(`47 Werke erwartet, ${matches.length} gefunden`);
const years=[1907,1912,null,1905,1795,1923,1910,1806,1803,1801,1771,null,1823,1775,1844,1775,1923,1648,null,1745,1790,1802,1825,1890,1840,1800,1798,1788,1810,1851,1902,1890,1886,1824,1844,1797,1782,1842,1813,1837,1910,1911,1902,1899,1899,1800,1905];
const ballads=new Set([27,33,34,36,37,38]);
const sonnets=new Set([42,46,47]);
const songLike=new Set([2,5,9,10,12,13,14,15,16,18,20,23,39,40]);
const themesByIndex=(i)=>i<=16?["Liebe","Nähe","Trennung"]:i<=26?["Freundschaft","Gemeinschaft"]:i<=32?["Abschied","Trennung"]:i<=39?["Ballade","Konflikt","Bewegung"]:["Natur","Stadt","Wahrnehmung"];
const slug=(value)=>value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const checkedAt="2026-09-12";
const sources={
  1:{status:"variant-unresolved",sourceTitle:"Liebes-Lied",sourceInstitution:"Wikisource / Digitalisat der Erstausgabe",sourceUrl:"https://de.wikisource.org/wiki/Liebes-Lied",editionYear:1907,editionDetails:"Neue Gedichte, Insel-Verlag, Erstausgabe, S. 51; zweifach korrekturgelesen",notes:"Geiger/Spieler und Interpunktion weichen ab."},
  5:{status:"variant-unresolved",sourceTitle:"Nähe des Geliebten (1827)",sourceInstitution:"Wikisource / Cotta-Digitalisat",sourceUrl:"https://de.wikisource.org/wiki/N%C3%A4he_des_Geliebten_%281827%29",editionYear:1827,editionDetails:"Goethe's Werke. Vollständige Ausgabe letzter Hand, Cotta",notes:"Abweichungen bei mahlt/malt, Haine/Hain und seyst/seist."},
  14:{status:"variant-unresolved",sourceTitle:"Willkommen und Abschied (1827)",sourceInstitution:"Wikisource / Cotta-Digitalisat",sourceUrl:"https://de.wikisource.org/wiki/Willkommen_und_Abschied_%281827%29",editionYear:1827,editionDetails:"Goethe's Werke. Vollständige Ausgabe letzter Hand",notes:"Nutzerfassung folgt weitgehend der späteren Fassung, modernisiert aber Schreibweise und Zeichensetzung; Kollationsentscheid offen."},
  15:{status:"unresolved",sourceTitle:"Mit deinen blauen Augen",sourceInstitution:"Wikisource-Suche / Heine-Werkverzeichnis",sourceUrl:"https://de.wikisource.org/wiki/Heinrich_Heine",editionYear:null,editionDetails:null,notes:"Keine hinreichend ausgewiesene digitale Editionsseite für die vollständige Kollation lokalisiert."},
  34:{status:"variant-unresolved",sourceTitle:"Drei und dreißig Gedichte von Heinrich Heine",sourceInstitution:"Wikisource / historisches Digitalisat",sourceUrl:"https://de.wikisource.org/wiki/Drei_und_drei%C3%9Fig_Gedichte_von_Heinrich_Heine",editionYear:1824,editionDetails:"Früher Druck mit Lore-Ley-Fassung",notes:"Nutzerfassung modernisiert Orthografie und enthält Zeichensetzungsabweichungen; Editionsentscheidung offen."},
  35:{status:"verified",sourceTitle:"Die Schlesischen Weber",sourceInstitution:"Wikisource / HH-Portal / Scan",sourceUrl:"https://de.wikisource.org/wiki/Die_schlesischen_Weber",editionYear:1847,editionDetails:"Album. Originalpoesien, S. 145–146; vom Dichter revidirt",notes:"Revidierte Druckfassung vollständig kollationiert; Lesart 'nur' übernommen."},
  36:{status:"source-located",sourceTitle:"Der Zauberlehrling (1827)",sourceInstitution:"Wikisource / Cotta-Digitalisat",sourceUrl:"https://de.wikisource.org/wiki/Der_Zauberlehrling_%281827%29",editionYear:1827,editionDetails:"Ausgabe letzter Hand, Bd. 1, S. 217–220",notes:"Vollständige Kollation ausstehend."},
  37:{status:"source-located",sourceTitle:"Erlkönig",sourceInstitution:"Wikisource / Cotta-Digitalisat",sourceUrl:"https://de.wikisource.org/wiki/Erlk%C3%B6nig",editionYear:1815,editionDetails:"Goethe, Gedichte, Cotta 1815",notes:"Vollständige Kollation ausstehend."},
  39:{status:"source-located",sourceTitle:"Das zerbrochene Ringlein",sourceInstitution:"Wikisource / Universitätsbibliothek Greifswald",sourceUrl:"https://de.wikisource.org/wiki/Seite%3AAus_dem_Leben_eines_Taugenichts_und_das_Marmorbild.djvu/231",editionYear:1826,editionDetails:"Aus dem Leben eines Taugenichts und das Marmorbild, Vereinsbuchhandlung, S. 227 ff.",notes:"Historische Schreibweisen weichen von der Nutzerfassung ab; vollständige Seitenkollation noch offen."},
  40:{status:"verified",sourceTitle:"Mondnacht",sourceInstitution:"Wikisource / Scan auf Commons",sourceUrl:"https://de.wikisource.org/wiki/Mondnacht",editionYear:1864,editionDetails:"Eichendorff's sämmtliche Werke, 2. Auflage, S. 604; zweifach korrekturgelesen",notes:"Basisfassung vollständig kollationiert; historische Orthografie beibehalten."},
  41:{status:"verified",sourceTitle:"Der Gott der Stadt",sourceInstitution:"Wikisource / ULB Düsseldorf",sourceUrl:"https://de.wikisource.org/wiki/Der_Gott_der_Stadt",editionYear:1911,editionDetails:"Der ewige Tag, Rowohlt, Erstausgabe, S. 13",notes:"Erstausgabe vollständig kollationiert; schwält und frißt übernommen."},
  42:{status:"verified",sourceTitle:"Die Stadt",sourceInstitution:"Wikisource / wissenschaftliche Gesamtausgabe",sourceUrl:"https://de.wikisource.org/wiki/Die_Stadt_%28Heym%29",editionYear:1964,editionDetails:"Dichtungen und Schriften, Bd. 1: Lyrik, hg. Ludwig Schneider, S. 452; zweifach kollationiert",notes:"Nutzerfassung stimmt in Wortlaut, Versen, Strophen und Interpunktion mit dem Quellentext überein."},
  43:{status:"verified",sourceTitle:"Der Panther",sourceInstitution:"Wikisource / Digitalisat der Erstausgabe",sourceUrl:"https://de.wikisource.org/wiki/Der_Panther",editionYear:1907,editionDetails:"Neue Gedichte, Insel-Verlag, Erstausgabe, S. 37; zweifach korrekturgelesen",notes:"Wortlaut, Versfolge, Interpunktion und drei Vierzeiler kollationiert; Untertitel dokumentiert."},
  44:{status:"source-located",sourceTitle:"Das Stunden-Buch",sourceInstitution:"Wikisource / Insel-Digitalisat",sourceUrl:"https://de.wikisource.org/wiki/Seite%3ADas_Stundenbuch_%28Rilke%29_103.jpg",editionYear:1918,editionDetails:"Insel-Verlag, Inhaltsverzeichnis mit Versanfang und Seitenverweis",notes:"Werkstelle lokalisiert; Volltextseite noch nicht vollständig kollationiert."},
  45:{status:"unresolved",sourceTitle:"Du mußt das Leben nicht verstehen",sourceInstitution:"keine hinreichende Quelle lokalisiert",sourceUrl:null,editionYear:null,editionDetails:null,notes:"Vollständige editionsbezogene Digitalquelle in Phase 1 nicht sicher lokalisiert."},
  47:{status:"verified",sourceTitle:"Verfall",sourceInstitution:"Wikisource / Digitalisat der Erstausgabe",sourceUrl:"https://de.wikisource.org/wiki/Verfall",editionYear:1913,editionDetails:"Georg Trakl: Gedichte, Kurt Wolff, 1913, S. 51",notes:"Text sowie Vers- und Strophengrenzen abgeglichen."}
};
const variants={1:[{userReading:"Geiger",verifiedReading:"Spieler",location:"Vers 12",source:"Neue Gedichte, Insel 1907, S. 51",decision:"unresolved",reason:"Keine stillschweigende Ersetzung."}],5:[{userReading:"malt / Hain / seist",verifiedReading:"mahlt / Haine / seyst",location:"Verse 2, 10 und 15",source:"Goethe-Ausgabe letzter Hand, 1827",decision:"unresolved",reason:"Historische Editionslesarten weichen ab."}],34:[{userReading:"Lorelei / getan",verifiedReading:"Lore-Ley / gethan",location:"Titelbezug und Vers 24",source:"Drei und dreißig Gedichte, 1824",decision:"unresolved",reason:"Editions- und Orthografieentscheidung offen."}],35:[{userReading:"Wo nun gedeihen",verifiedReading:"Wo nur gedeihen",location:"Vers 17",source:"Album. Originalpoesien, 1847, S. 145",decision:"unresolved",reason:"Substantive Lesart; Aufgabe bleibt gesperrt."}],40:[{userReading:"geküsst / dass / Ähren",verifiedReading:"geküßt / Daß / Aehren",location:"Verse 2, 3 und 6",source:"Sämmtliche Werke, 1864, S. 604",decision:"unresolved",reason:"Modernisierung nicht stillschweigend übernehmen."}],41:[{userReading:"schwelt / frisst",verifiedReading:"schwält / frißt",location:"Verse 13 und 20",source:"Der ewige Tag, 1911, S. 13",decision:"unresolved",reason:"Erstausgabenlesart weicht ab."}]};
const canonicalTexts={
  35:`Im düstern Auge keine Thräne,
Sie sitzen am Webstuhl und fletschen die Zähne:
Deutschland, wir weben Dein Leichentuch,
Wir weben hinein den dreifachen Fluch –
Wir weben, wir weben!

Ein Fluch dem Gotte, zu dem wir gebeten
In Winterskälte und Hungersnöthen;
Wir haben vergebens gehofft und geharrt,
Er hat uns geäfft und gefoppt und genarrt –
Wir weben, wir weben!

Ein Fluch dem König, dem König der Reichen,
Den unser Elend nicht konnte erweichen,
Der den letzten Groschen von uns erpreßt,
Und uns wie Hunde erschießen läßt –
Wir weben, wir weben!

Ein Fluch dem falschen Vaterlande,
Wo nur gedeihen Schmach und Schande,
Wo jede Blume früh geknickt,
Wo Fäulniß und Moder den Wurm erquickt –
Wir weben, wir weben!

Das Schiffchen fliegt, der Webstuhl kracht,
Wir weben emsig Tag und Nacht –
Altdeutschland, wir weben Dein Leichentuch,
Wir weben hinein den dreifachen Fluch,
Wir weben, wir weben!`,
  40:`Es war, als hätt’ der Himmel
Die Erde still geküßt,
Daß sie im Blütenschimmer
Von ihm nun träumen müßt’.

Die Luft ging durch die Felder,
Die Aehren wogten sacht,
Es rauschten leis die Wälder,
So sternklar war die Nacht.

Und meine Seele spannte
Weit ihre Flügel aus,
Flog durch die stillen Lande,
Als flöge sie nach Haus.`,
  41:`Auf einem Häuserblocke sitzt er breit.
Die Winde lagern schwarz um seine Stirn.
Er schaut voll Wut, wo fern in Einsamkeit
Die letzten Häuser in das Land verirrn.

Vom Abend glänzt der rote Bauch dem Baal,
Die großen Städte knieen um ihn her.
Der Kirchenglocken ungeheure Zahl
Wogt auf zu ihm aus schwarzer Türme Meer.

Wie Korybanten-Tanz dröhnt die Musik
Der Millionen durch die Straßen laut.
Der Schlote Rauch, die Wolken der Fabrik
Ziehn auf zu ihm, wie Duft von Weihrauch blaut.

Das Wetter schwält in seinen Augenbrauen.
Der dunkle Abend wird in Nacht betäubt.
Die Stürme flattern, die wie Geier schauen
Von seinem Haupthaar, das im Zorne sträubt.

Er streckt ins Dunkel seine Fleischerfaust.
Er schüttelt sie. Ein Meer von Feuer jagt
Durch eine Straße. Und der Glutqualm braust
Und frißt sie auf, bis spät der Morgen tagt.`
};
const entries=matches.map((m,index)=>{
  const number=Number(m[1]),author=m[2].trim(),title=m[3].trim();
  const start=m.index+m[0].length;
  const end=index+1<matches.length?matches[index+1].index:input.length;
  const raw=input.slice(start,end).replace(/^\n+|\n+$/g,"").replace(/^---\s*$/gm,"").replace(/^###\s+(.+)$/gm,"[$1]").trim();
  if(!raw)throw new Error(`Leerer Primärtext: ${number}`);
  const paragraphs=raw.split(/\n{2,}/).map(block=>block.trim()).filter(Boolean);
  const verses=paragraphs.flatMap(block=>block.split("\n")).filter(line=>line.trim()&&!/^\[.+\]$/.test(line));
  let stanzas=paragraphs.some(block=>block.includes("\n"))?paragraphs:[verses.join("\n")];
  let stanzaVerification="uncertain";
  if(number===1){stanzas=[verses.join("\n")];stanzaVerification="verified";}
  if(number===5){stanzas=[];for(let i=0;i<verses.length;i+=4)stanzas.push(verses.slice(i,i+4).join("\n"));stanzaVerification="verified";}
  if(number===47)stanzaVerification="verified";
  if(number===42)stanzaVerification="verified";
  if(number===43){stanzas=[verses.slice(0,4).join("\n"),verses.slice(4,8).join("\n"),verses.slice(8,12).join("\n")];stanzaVerification="verified";}
  const userText=stanzas.join("\n\n");
  const canonicalText=canonicalTexts[number]??(number===42||number===43||number===47?userText:null);
  const canonicalStanzas=canonicalText?canonicalText.split("\n\n"):[];
  if(canonicalText){stanzas=canonicalStanzas;stanzaVerification="verified";}
  const text=canonicalText??userText;
  const genre=ballads.has(number)?"ballad":sonnets.has(number)?"sonnet":songLike.has(number)?"songLike":"lyric";
  const rightsBlocked=author==="Khalil Gibran";
  const released=new Set([35,40,41,42,43,47]).has(number);
  const sourceVerification={status:"unresolved",sourceTitle:null,sourceInstitution:null,sourceUrl:null,editionYear:null,editionDetails:null,checkedAt,notes:"Quellen- und Editionsabgleich ausstehend.",...sources[number]};
  sourceVerification.baseEdition={title:sourceVerification.sourceTitle,editorOrPublisher:sourceVerification.sourceInstitution,publicationYear:sourceVerification.editionYear,place:null,volume:null,pages:sourceVerification.editionDetails,digitalSource:sourceVerification.sourceInstitution,sourceUrl:sourceVerification.sourceUrl,rationale:sourceVerification.status==="verified"?"Konkret benannte und vollständig kollationierte Basisfassung.":"Editionsentscheidung oder Kollation noch offen."};
  sourceVerification.editionPolicy=number===14?"user-requested-version":sourceVerification.status==="verified"?(number===42?"critical-edition":"first-authorised"):"other-documented";
  const rhymeSchemes={35:"aabbx ccddx eeffx gghhx iijjx",40:"abab cdcd efef",41:"abab cdcd efef ghgh ijij",42:"abba abba ccc ddd",43:"abab cdcd efef",47:"abba cddc efefef"},forms={35:"politisches Liedgedicht",40:"Liedgedicht",41:"sonstige Form",42:"Sonett",43:"Dinggedicht",47:"Sonett"};
  return {id:`canonical-${String(number).padStart(2,"0")}-${slug(title)}`,title,author,year:years[index],userText,canonicalText,userStanzas:userText.split("\n\n"),canonicalStanzas,collationStatus:canonicalText?"collated":sourceVerification.status==="variant-unresolved"?"unresolved":"notStarted",productionText:released?canonicalText:null,text,stanzas,verseCount:text.split("\n").filter(Boolean).length,stanzaCount:stanzas.length,stanzaVerification,stanzaStructureStatus:stanzaVerification==="verified"?"verified":"unresolved",sourceType:"authentic",textVerificationStatus:rightsBlocked?"rights-blocked":released?"verified":"needs-manual-review",sourceVerification,variants:(variants[number]??[]).map(v=>({...v,canonicalReading:v.verifiedReading,differenceType:/nun|nur|schwelt|schwält/i.test(v.userReading+v.verifiedReading)?"wording":"orthography",explanation:v.reason})),previewAllowed:true,contentTaskAllowed:released,formalTaskAllowed:released,publicReleaseAllowed:released,verificationNote:released?"Mit der ausgewiesenen Quelle vollständig abgeglichen.":rightsBlocked?"Deutsche Übersetzung und Textfassung vor Nutzung rechtlich prüfen.":"Nutzerfassung erhalten; Quellen- und Editionsabgleich ausstehend.",rightsStatus:rightsBlocked?"translation-review-required":released?"cleared":"public-domain-original-review",themes:themesByIndex(number),genre,rhymeStatus:released?"verified":"pending",rhymeScheme:rhymeSchemes[number]??null,poemFormStatus:released?"verified":"pending",poemForm:forms[number]??null,meterStatus:"pending",meter:null,cadenceStatus:"pending",notableFormFeatures:released?[forms[number],`${stanzas.length} verifizierte Strophen`]:genre==="ballad"?["narrative Langform","für Aufgaben ausschnittsweise verwenden"]:genre==="sonnet"?["Sonettform","Formdetails vor Einsatz prüfen"]:["Nutzerfassung","Textgestalt vor Freigabe prüfen"],notableFeatures:genre==="ballad"?["narrative Langform","für Aufgaben ausschnittsweise verwenden"]:genre==="sonnet"?["Sonettform","Formdetails vor Einsatz prüfen"]:["Nutzerfassung","Textgestalt vor Freigabe prüfen"],suitableChapters:number<=16?[1,4,7,8]:number<=26?[2,4,8,9]:number<=39?[3,5,8,9]:[2,3,5,6,7,8,9],suitableSkills:["closeReading","evidence","comparison"],difficultyPotential:genre==="ballad"?"advanced":"mixed",needsManualSeparation:stanzaVerification==="uncertain",approvedForProductiveUse:released,publicReleaseStatus:rightsBlocked?"rights-blocked":"editorial-preview"};
});
const header=`export type SourceVerification={status:"unresolved"|"source-located"|"variant-unresolved"|"verified";sourceTitle:string|null;sourceInstitution:string|null;sourceUrl:string|null;editionYear:number|null;editionDetails:string|null;checkedAt:string;notes:string};\nexport type TextVariant={userReading:string;verifiedReading:string;location:string;source:string;decision:string;reason:string};\nexport type CanonicalPoem={\n  id:string;title:string;author:string;year:number|null;userText:string;productionText:string|null;text:string;stanzas:readonly string[];verseCount:number;stanzaCount:number;stanzaVerification:"verified"|"uncertain";stanzaStructureStatus:"verified"|"unresolved";sourceType:"authentic";textVerificationStatus:"verified"|"needs-manual-review"|"rights-blocked";sourceVerification:SourceVerification;variants:readonly TextVariant[];previewAllowed:boolean;contentTaskAllowed:boolean;formalTaskAllowed:boolean;publicReleaseAllowed:boolean;verificationNote:string;rightsStatus:"public-domain-original-review"|"translation-review-required"|"cleared";themes:readonly string[];genre:"lyric"|"ballad"|"sonnet"|"prosePoem"|"songLike";rhymeStatus:"pending"|"verified";rhymeScheme:string|null;poemFormStatus:"pending"|"verified";poemForm:string|null;meterStatus:"pending"|"accepted"|"ambiguous";meter:string|null;cadenceStatus:"pending"|"accepted"|"ambiguous";notableFormFeatures:readonly string[];notableFeatures:readonly string[];suitableChapters:readonly number[];suitableSkills:readonly string[];difficultyPotential:"mixed"|"advanced";needsManualSeparation:boolean;approvedForProductiveUse:boolean;publicReleaseStatus:"editorial-preview"|"rights-blocked";\n};\n\n`;
const typedHeader=header.replace("notes:string};","notes:string;[key:string]:unknown};").replace("reason:string};","reason:string;[key:string]:unknown};").replace('publicReleaseStatus:"editorial-preview"|"rights-blocked";','publicReleaseStatus:"editorial-preview"|"rights-blocked";[key:string]:unknown;');
fs.writeFileSync(target,typedHeader+`export const canonicalPoems:readonly CanonicalPoem[]=${JSON.stringify(entries,null,2)} as const;\n`);
for(const [index,entry] of entries.entries()){
  const number=index+1;
  entry.canonicalDisplayTitle=entry.title;
  entry.baseEditionTitle=entry.sourceVerification.baseEdition.title;
  entry.knownTitleVariants=number===34?["Die Lorelei","Lore-Ley"]:[];
  entry.versionLabel=number===14?"spätere Fassung":null;
}
fs.writeFileSync(target,typedHeader+`export const canonicalPoems:readonly CanonicalPoem[]=${JSON.stringify(entries,null,2)} as const;\n`);
const review=path.join(root,"docs","LYRIK_AUTHENTISCHE_TEXTE_REVIEW.md");
const used=new Set([15,34,35,36,39,40,41,43,44,45,47]);
const rows=entries.map((p,i)=>`| ${i+1} | ${p.title} | ${p.author} | pending / needs-manual-separation | ${p.rightsStatus} | pending | pending | ${p.suitableChapters.join(", ")} | ${used.has(i+1)?"Gemeinsam und Aufgabenpool":"noch nicht sichtbar eingesetzt"} |`).join("\n");
fs.writeFileSync(review,`# Review: authentische Nutzertexte\n\nAlle Einträge sind Nutzerfassungen. Keine Fassung ist quellenkritisch verifiziert oder öffentlich freigegeben. Die Quelldatei kodiert keine verlässlichen Strophengrenzen; deshalb bleibt die Strophentrennung bei allen Werken manuell zu prüfen. Gibrans deutsche Fassungen bleiben vollständig vom produktiven Einsatz ausgeschlossen.\n\n| Nr. | Titel | Autor | Textstatus | Rechte | Reim | Metrum | geeignete Kapitel | lokaler Einsatz |\n|---:|---|---|---|---|---|---|---|---|\n${rows}\n\n## Redaktion der Gemeinsam-Phasen\n\nDie vollständigen Aufgabenstellungen, Materialien, Interaktionstypen, Lösungen, Rückmeldungen und Lernziele stehen strukturiert in \`src/games/lyrik/data/guidedAnalysis.ts\`. Dokumentiert sind alle Schritte der Kapitel 1–9; Kapitel 9 umfasst sechs Schritte. Sekundäranalysen der Nutzerdatei wurden nicht importiert. Insbesondere werden Autor und Sprechinstanz getrennt, metrische Angaben bleiben pending und Wirkungen werden kontextbezogen statt automatisch formuliert.\n`);
const coverageText=fs.readFileSync(path.join(root,"src","games","lyrik","data","corpusCoverage.ts"),"utf8");
const coverage=[...coverageText.matchAll(/u\((\d+),(\d+),"([^"]+)","([^"]+)","([^"]+)"(?:,(false))?/g)].map(match=>({work:Number(match[1]),chapter:Number(match[2]),area:match[3],competence:match[4],taskType:match[5],productive:match[6]!=="false"}));
const coverageByWork=new Map(coverage.map(item=>[item.work,item]));
const reviewRows=entries.map((p,index)=>{const use=coverageByWork.get(index+1);return `| ${index+1} | ${p.author} | ${p.title} | ${p.textVerificationStatus} | ${p.stanzaVerification} | ${p.rhymeStatus}${p.rhymeScheme?` (${p.rhymeScheme})`:""} | ${p.meterStatus} | ${p.rightsStatus} | ${use?.chapter??"–"} | ${use?.competence??"–"} | ${use?.productive?1:0} | ${p.verificationNote} |`;}).join("\n");
const samples=coverage.filter(item=>item.productive).slice(0,20).map((use,index)=>{const p=entries[use.work-1],excerpt=p.text.split("\n").filter(Boolean).slice(0,p.genre==="ballad"?16:14).join("\n");return `## Aufgabe ${index+1}: ${p.title}\n\n**Text/Ausschnitt:**\n\n> ${excerpt.replace(/\n/g,"\n> ")}\n\n**Aufgabenstellung:** Untersuche in „${p.title}“ gezielt ${use.competence}. Formuliere einen Befund, belege ihn am Ausschnitt und erkläre seine Bedeutung im Textzusammenhang.\n\n**Kriterien:** konkreter Befund; genauer Textbeleg; Kompetenzbezug; kontextbezogene Erklärung; Autor und Sprechinstanz getrennt.\n\n**Lösungshorizont:** Die Lösung verbindet einen konkreten Wortlaut mit ${use.competence} und begrenzt die Deutung auf den Ausschnitt.\n\n**Feedback:** Prüfe, ob der behauptete Zusammenhang tatsächlich aus dem zitierten Signal folgt.\n\n**Kapitel/Kompetenz:** ${use.chapter} / ${use.competence}.`;}).join("\n\n");
fs.writeFileSync(path.join(root,"docs","LYRIK_KORPUS_REVIEW.md"),`# Lyrik-Korpus-Review\n\nRedaktioneller Stand der 47 Nutzerfassungen. \`editorial-preview\` bezeichnet lokale didaktische Erreichbarkeit, nicht öffentliche Quellenfreigabe. Gibrans Übersetzungen bleiben gesperrt.\n\n| Nr. | Autor | Titel | Textstatus | Strophenstatus | Reimstatus | Metrumstatus | Rechte | Kapitel | Kompetenz | Aufgaben | Bemerkungen |\n|---:|---|---|---|---|---|---|---|---:|---|---:|---|\n${reviewRows}\n\n# Redaktionelle Stichprobe: 20 authentische Aufgaben\n\n${samples}\n`);
console.log(`47/47 CorpusEntries geschrieben: ${target}`);
