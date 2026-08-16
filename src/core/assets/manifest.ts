import type { AssetCategory, AssetDefinition } from "./types";

const root="/assets/dramatik/";
const asset=(id:string,category:AssetCategory,folder:string,file:string,alt:string,usage:string,extra:Partial<AssetDefinition>={}):AssetDefinition=>({id,category,path:`${root}${folder}/${file}`,alt,game:"dramatik",usage,...extra});

const backgrounds=[
 asset("bg_theatre_main","backgrounds","backgrounds","Theater_neutral_Hauptansicht.png","","Neutrale Theater-Hauptansicht",{decorative:true}),
 asset("bg_tomb_stage","backgrounds","backgrounds","Bühne mit Gruftkulisse.png","","Generalprobe und Aufführung",{chapters:["chapter_04","finale"],decorative:true}),
 asset("bg_finale_restored","backgrounds","backgrounds","Finale helle, vollständig restaurierte Theaterfassung.png","","Restauriertes Theater im Finale",{chapters:["finale"],decorative:true}),
 asset("bg_verona_neutral","backgrounds","backgrounds","Neutrale Verona-Kulisse.png","","Kontextdarstellung Verona",{decorative:true}),
 asset("bg_relationship_room","backgrounds","backgrounds","Theaterraum mit Figurenkonstellation.png","","Figurenbeziehungsnetz",{chapters:["chapter_02"],decorative:true}),
 asset("bg_portrait_room","backgrounds","backgrounds","Theaterraum mit Figurenporträts an der Wand.png","","Ensemblewand",{chapters:["chapter_02"],decorative:true}),
 asset("bg_analysis_room","backgrounds","backgrounds","Weitere Theaterkulisse  Analysebereich.png","","Analyse- und Archivbereich",{chapters:["chapter_03","chapter_05"],decorative:true}),
];

const characterFiles=[
 ["amme","Amme(1).png","Amme","neutral"],["balthasar_urgent","Balthasar, aufgeregt  mit dringender Nachricht(1).png","Balthasar","urgent"],["balthasar_calm","Balthasar, ruhig(1).png","Balthasar","calm"],
 ["lorenzo_blessing","Bruder Lorenzo beim Erteilen des Segens(1).png","Bruder Lorenzo","blessing"],["lorenzo_letter","Bruder Lorenzo mit Brief(1).png","Bruder Lorenzo","letter"],["marcus","Bruder Markus(1).png","Bruder Markus","neutral"],
 ["julia_thoughtful","Julia, nachdenklich(1).png","Julia","thoughtful"],["julia_calm","Julia, ruhig(1).png","Julia","calm"],["julia_sad","Julia, traurig(1).png","Julia","sad"],["julia_loving","Julia, verliebt(1).png","Julia","loving"],
 ["lady_capulet","Lady Capulet(1).png","Lady Capulet","neutral"],["capulet","Lord Capulet(1).png","Capulet","neutral"],
 ["mercutio_thoughtful","Mercutio, nachdenklich(1).png","Mercutio","thoughtful"],["mercutio_teasing","Mercutio, neckend(1).png","Mercutio","teasing"],["mercutio_calm","Mercutio, ruhig(1).png","Mercutio","calm"],["mercutio_angry","Mercutio, wütend(1).png","Mercutio","angry"],
 ["paris_page","Page des Paris(1).png","Page des Paris","neutral"],["paris_thoughtful","Paris, nachdenklich(1).png","Paris","thoughtful"],["paris_calm","Paris, ruhig(1).png","Paris","calm"],["paris_loving","Paris, verliebt.png","Paris","loving"],["paris_angry","Paris, wütend.png","Paris","angry"],
 ["escalus","Prinz Escalus.png","Prinz Escalus","neutral"],["romeo_thoughtful","Romeo, nachdenklich.png","Romeo","thoughtful"],["romeo_calm","Romeo, ruhig.png","Romeo","calm"],["romeo_loving","Romeo, verliebt.png","Romeo","loving"],["romeo_angry","Romeo, wütend.png","Romeo","angry"],
 ["tybalt_thoughtful","Tybalt nachdenklich.png","Tybalt","thoughtful"],["tybalt_angry","Tybalt wütend.png","Tybalt","angry"],["tybalt_grumpy","Tybalt, grummelig.png","Tybalt","grumpy"],["tybalt_arrogant","Tybalt, überheblich.png","Tybalt","arrogant"],
 ["guard_alarm","Wächter alarmiert.png","Wächter","alarm"],["guard_normal","Wächter normal(1).png","Wächter","normal"],
] as const;
const characters=characterFiles.map(([id,file,character,state])=>asset(`character_${id}`,state==="neutral"?"characters":"characters","characters",file,character,`${character}: ${state}`,{character,state}));

const objectFiles=[["letter","Brief.png","Brief"],["book","Buch.png","Buch"],["dagger","Dolch.png","Dolch"],["lantern","Fackel  Laterne.png","Laterne"],["poison","Giftfläschchen.png","Giftfläschchen"],["candlestick","Kerzenständer.png","Kerzenständer"],["key","Schlüssel.png","Schlüssel"],["scroll","Schriftrolle.png","Schriftrolle"],["seal","Siegel.png","Siegel"],["script","Skript.png","Regieskript"]] as const;
const objects=objectFiles.map(([id,file,alt])=>asset(`object_${id}`,"renaissance_objects","objects",file,alt,`Spielobjekt: ${alt}`));

const symbolFiles=[["quote_open","Anführungszeichen oben.png"],["quote_close","Anführungszeichen unten.png"],["book","Buchsymbol.png"],["dialogue","Dialogzeichensymbol.png"],["relationships","Figurenkonstellationssymbol.png"],["question","Fragezeichensymbol.png"],["thought","Gedankenblase.png"],["idea","Glühbirnensymbol.png"],["conflict","Konfliktsymbol.png"],["costume","Kostümesymbol.png"],["magnifier","Lupensymbol.png"],["hourglass","Sanduhrsymbol.png"],["spotlight","Scheinwerfersymbol.png"],["spotlight_variant","Schreinwerfer.png"],["masks","Theatermaskensymbol.png"],["chest","Truhensymbol.png"],["scales","Waagensymbol.png"]] as const;
const symbols=symbolFiles.map(([id,file])=>asset(`symbol_${id}`,"analysis_symbols","symbols",file,"",`Dekoratives Funktionssymbol: ${id}`,{decorative:true}));

const literatureArchiveAssets:readonly AssetDefinition[]=[
 {id:"archive_book_symbol",category:"literature",path:"/assets/dramatik/symbols/Buchsymbol.png",alt:"Buchsymbol",game:"shared",usage:"Kleines Literaturmotiv"},
 {id:"archive_scroll",category:"decoration",path:"/assets/dramatik/objects/Schriftrolle.png",alt:"",game:"shared",usage:"Dekorative Schriftrolle",decorative:true},
 {id:"archive_seal",category:"status",path:"/assets/dramatik/objects/Siegel.png",alt:"",game:"shared",usage:"Dekoratives Siegel der Abschlussansicht",decorative:true},
];

const theatreAccessAssets:readonly AssetDefinition[]=[
 asset("theatre_access_chapter_01","ui","ui","Kapitelzugang_1_Regiebuch.png","","Kapitelzugang: Das zerrissene Regiebuch",{chapters:["chapter_01"],decorative:true}),
 asset("theatre_access_chapter_02","ui","ui","Kapitelzugang_2_Ensemblewand.png","","Kapitelzugang: Das Ensemble erwacht",{chapters:["chapter_02"],decorative:true}),
 asset("theatre_access_chapter_03","ui","ui","Kapitelzugang_3_Archivtruhe.png","","Kapitelzugang: Der Brief, der nie ankam",{chapters:["chapter_03"],decorative:true}),
 asset("theatre_access_chapter_04","ui","ui","Kapitelzugang_4_Regiestuhl.png","","Kapitelzugang: Die Generalprobe",{chapters:["chapter_04"],decorative:true}),
 asset("theatre_access_chapter_05","ui","ui","Kapitelzugang_5_Analysepult.png","","Kapitelzugang: Die Deutungsprobe",{chapters:["chapter_05"],decorative:true}),
];

export const literatureArchiveAssetGroups={decoration:["archive_scroll"],literature:["archive_book_symbol"],epik:[],lyrik:[],dramatik:[],methods:[],navigation:[],status:["archive_seal"],feedback:[]} as const;

export const assetManifest:readonly AssetDefinition[]=[...backgrounds,...characters,...objects,...symbols,...theatreAccessAssets,...literatureArchiveAssets];
export function getAsset(id:string){return assetManifest.find((item)=>item.id===id)}
export function resolveCharacterAsset(character:string,state="calm"){return assetManifest.find((item)=>item.character===character&&item.state===state)??assetManifest.find((item)=>item.character===character&&["calm","neutral"].includes(item.state??""))}
export function validateAssetManifest(items:readonly AssetDefinition[]):string[]{const ids=new Set<string>();const errors:string[]=[];for(const item of items){if(ids.has(item.id))errors.push(`duplicate asset id: ${item.id}`);ids.add(item.id);if(!item.path.startsWith("/assets/"))errors.push(`asset path must start with /assets/: ${item.id}`);if(!item.decorative&&!item.alt.trim())errors.push(`asset alt text is required: ${item.id}`)}return errors}
