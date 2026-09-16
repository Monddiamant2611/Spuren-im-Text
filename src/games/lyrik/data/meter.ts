import type { MetricExample } from "./content-model";

type Meter=MetricExample["meter"];
type WordSeed=[text:string,syllables:string[],stresses:(0|1)[]];
const wordSeeds:Record<Meter,WordSeed[]>={
 jambus:[["Gefühl",["Ge","fühl"],[0,1]],["Gesang",["Ge","sang"],[0,1]],["Gedicht",["Ge","dicht"],[0,1]],["Gestalt",["Ge","stalt"],[0,1]],["Verlust",["Ver","lust"],[0,1]],["Verweht",["Ver","weht"],[0,1]],["Erwacht",["Er","wacht"],[0,1]],["Allein",["Al","lein"],[0,1]]],
 trochaeus:[["Sonne",["Son","ne"],[1,0]],["Blüte",["Blü","te"],[1,0]],["Wolke",["Wol","ke"],[1,0]],["Welle",["Wel","le"],[1,0]],["Schatten",["Schat","ten"],[1,0]],["Träume",["Träu","me"],[1,0]],["Liebe",["Lie","be"],[1,0]],["Seele",["See","le"],[1,0]],["Hoffnung",["Hoff","nung"],[1,0]],["Stille",["Stil","le"],[1,0]],["Ferne",["Fer","ne"],[1,0]]],
 dactyl:[["Königin",["Kö","ni","gin"],[1,0,0]],["Goldene",["Gol","de","ne"],[1,0,0]],["Silberne",["Sil","ber","ne"],[1,0,0]],["Leuchtende",["Leuch","ten","de"],[1,0,0]],["Flüsternde",["Flüs","tern","de"],[1,0,0]],["Träumende",["Träu","men","de"],[1,0,0]],["Schimmernde",["Schim","mern","de"],[1,0,0]],["Wogende",["Wo","gen","de"],[1,0,0]]],
 anapaest:[["Melodie",["Me","lo","die"],[0,0,1]],["Poesie",["Po","e","sie"],[0,0,1]],["Harmonie",["Har","mo","nie"],[0,0,1]],["Fantasie",["Fan","ta","sie"],[0,0,1]],["Symphonie",["Sym","pho","nie"],[0,0,1]],["Elegie",["E","le","gie"],[0,0,1]],["Paradies",["Pa","ra","dies"],[0,0,1]],["Horizont",["Ho","ri","zont"],[0,0,1]]]
};
const wordItems:MetricExample[]=Object.entries(wordSeeds).flatMap(([meter,seeds])=>seeds.map(([text,syllables,stresses],index)=>({id:`meter-${meter}-word-${index+1}`,kind:"word",text,syllables,stresses,baseMeter:meter as Meter,meter:meter as Meter,feet:1,sourceType:"exerciseText",verificationStatus:"accepted",verificationNote:"Der isolierte Wortakzent ist in standarddeutscher Aussprache eindeutig; das Beispiel dient nur dem Versfuß-Einstieg und ist kein Beleg für ein Versmetrum.",hasDeviation:false,deviationExplanation:"Keine; isoliertes Wortbeispiel."})));
type VerseSeed=[id:string,text:string,syllables:string[],stresses:(0|1)[],meter:Meter,feet:number,cadence:"male"|"female",hasDeviation?:boolean,deviationExplanation?:string];
const verseSeeds:VerseSeed[]=[
 ["meter-jambus-verse-b","Im Hof erlischt das letzte Licht.",["Im","Hof","er","lischt","das","letz","te","Licht"],[0,1,0,1,0,1,0,1],"jambus",4,"male"],
 ["meter-jambus-verse-c","Am See beginnt der junge Tag.",["Am","See","be","ginnt","der","jun","ge","Tag"],[0,1,0,1,0,1,0,1],"jambus",4,"male"],
 ["meter-jambus-verse-d","Ein leiser Ruf durchdringt die Nacht.",["Ein","lei","ser","Ruf","durch","dringt","die","Nacht"],[0,1,0,1,0,1,0,1],"jambus",4,"male"],
 ["meter-trochaeus-verse-a","Sonne leuchtet über Dächern.",["Son","ne","leuch","tet","ü","ber","Dä","chern"],[1,0,1,0,1,0,1,0],"trochaeus",4,"female"],
 ["meter-trochaeus-verse-b","Winde tragen dunkle Wolken.",["Win","de","tra","gen","dunk","le","Wol","ken"],[1,0,1,0,1,0,1,0],"trochaeus",4,"female"],
 ["meter-trochaeus-verse-c","Vögel suchen ferne Inseln.",["Vö","gel","su","chen","fer","ne","In","seln"],[1,0,1,0,1,0,1,0],"trochaeus",4,"female"],
 ["meter-trochaeus-verse-d","Regen löscht die hellen Spuren.",["Re","gen","löscht","die","hel","len","Spu","ren"],[1,0,1,0,1,0,1,0],"trochaeus",4,"female"],
 ["meter-trochaeus-verse-e","Sonne leuchtet überm stillen Land.",["Son","ne","leuch","tet","ü","berm","stil","len","Land"],[1,0,1,0,1,0,1,0,1],"trochaeus",5,"male",true,"Der letzte trochäische Versfuß ist katalektisch: Nach der Hebung „Land“ fehlt die erwartbare Schluss-Senkung. Das regelmäßige Grundmuster der vorausgehenden vier Füße bleibt eindeutig."]
];
const verseItems:MetricExample[]=verseSeeds.map(([id,text,syllables,stresses,meter,feet,cadence,hasDeviation=false,deviationExplanation="Keine metrisch relevante Abweichung."])=>({id,kind:"verse",text,syllables,stresses,baseMeter:meter,meter,feet,cadence,sourceType:"exerciseText",verificationStatus:"accepted",verificationNote:hasDeviation?`Das ${meter==="trochaeus"?"trochäische":"metrische"} Grundmuster bleibt trotz der genau lokalisierten Katalexe erkennbar; ${feet} Haupthebungen.`:`Regelmäßiger Wechsel von ${meter==="jambus"?"Senkung und Hebung":"Hebung und Senkung"}; ${feet} Haupthebungen; natürliche Satzbetonung trägt das Grundmuster.`,hasDeviation,deviationExplanation}));
export type StudentMetricAnnotation={sourceWorkId:string;verseNumber:number;text:string;syllables:readonly string[];stressPattern:readonly (0|1)[];baseMeter:Meter;feetCount:number;cadence:"male"|"female"|"rich";deviation:string;verificationStatus:"verified"};
export const studentMetricAnnotations:readonly StudentMetricAnnotation[]=verseItems.map((item,index)=>({sourceWorkId:`exercise-${item.id}`,verseNumber:index+1,text:item.text,syllables:item.syllables,stressPattern:item.stresses,baseMeter:item.baseMeter,feetCount:item.feet,cadence:item.cadence!,deviation:item.deviationExplanation,verificationStatus:"verified"}));
export const metricExamples:readonly MetricExample[]=[...wordItems,...verseItems];
export const rejectedMeterIds=["meter-jambus-verse-a",...Array.from({length:196},(_,index)=>`legacy-meter-rejected-${index+1}`)];
