import type { AssetCategory, AssetDefinition } from "./types";

const root="/assets/dramatik/";
const asset=(id:string,category:AssetCategory,folder:string,file:string,alt:string,usage:string,extra:Partial<AssetDefinition>={}):AssetDefinition=>({id,category,path:`${root}${folder}/${file}`,alt,game:"dramatik",usage,...extra});

const backgrounds=[
 asset("bg_tomb_stage","backgrounds","backgrounds","Bühne mit Gruftkulisse.png","","Generalprobe und Aufführung",{chapters:["chapter_04","finale"],decorative:true}),
 asset("bg_finale_restored","backgrounds","backgrounds","Finale helle, vollständig restaurierte Theaterfassung.png","","Restauriertes Theater im Finale",{chapters:["finale"],decorative:true}),
 asset("bg_verona_neutral","backgrounds","backgrounds","Neutrale Verona-Kulisse.png","","Kontextdarstellung Verona",{decorative:true}),
 asset("bg_theatre_entrance","backgrounds","backgrounds","Theater  Eingangsbereich.png","","Start und Theaterübersicht",{decorative:true}),
 asset("bg_relationship_room","backgrounds","backgrounds","Theaterraum mit Figurenkonstellation.png","","Figurenbeziehungsnetz",{chapters:["chapter_02"],decorative:true}),
 asset("bg_portrait_room","backgrounds","backgrounds","Theaterraum mit Figurenporträts an der Wand.png","","Ensemblewand",{chapters:["chapter_02"],decorative:true}),
 asset("bg_analysis_room","backgrounds","backgrounds","Weitere Theaterkulisse  Analysebereich.png","","Analyse- und Archivbereich",{chapters:["chapter_03","chapter_05"],decorative:true}),
];

const characterFiles=[
 ["amme","Amme.jpg","Amme","neutral"],["balthasar_urgent","Balthasar, aufgeregt  mit dringender Nachricht.jpg","Balthasar","urgent"],["balthasar_calm","Balthasar, ruhig.jpg","Balthasar","calm"],
 ["lorenzo_blessing","Bruder Lorenzo beim Erteilen des Segens.jpg","Bruder Lorenzo","blessing"],["lorenzo_letter","Bruder Lorenzo mit Brief.jpg","Bruder Lorenzo","letter"],["marcus","Bruder Markus.png","Bruder Markus","neutral"],
 ["julia_thoughtful","Julia, nachdenklich.jpg","Julia","thoughtful"],["julia_calm","Julia, ruhig.jpg","Julia","calm"],["julia_sad","Julia, traurig.jpg","Julia","sad"],["julia_loving","Julia, verliebt.jpg","Julia","loving"],
 ["lady_capulet","Lady Capulet.jpg","Lady Capulet","neutral"],["capulet","Lord Capulet.jpg","Capulet","neutral"],
 ["mercutio_thoughtful","Mercutio, nachdenklich.jpg","Mercutio","thoughtful"],["mercutio_teasing","Mercutio, neckend.jpg","Mercutio","teasing"],["mercutio_calm","Mercutio, ruhig.jpg","Mercutio","calm"],["mercutio_angry","Mercutio, wütend.jpg","Mercutio","angry"],
 ["paris_page","Page des Paris.jpg","Page des Paris","neutral"],["paris_thoughtful","Paris, nachdenklich.jpg","Paris","thoughtful"],["paris_calm","Paris, ruhig.jpg","Paris","calm"],["paris_loving","Paris, verliebt.jpg","Paris","loving"],["paris_angry","Paris, wütend.jpg","Paris","angry"],
 ["escalus","Prinz Escalus.jpg","Prinz Escalus","neutral"],["romeo_thoughtful","Romeo, nachdenklich.jpg","Romeo","thoughtful"],["romeo_calm","Romeo, ruhig.jpg","Romeo","calm"],["romeo_loving","Romeo, verliebt.jpg","Romeo","loving"],["romeo_angry","Romeo, wütend.jpg","Romeo","angry"],
 ["tybalt_thoughtful","Tybalt nachdenklich.jpg","Tybalt","thoughtful"],["tybalt_angry","Tybalt wütend.jpg","Tybalt","angry"],["tybalt_grumpy","Tybalt, grummelig.jpg","Tybalt","grumpy"],["tybalt_arrogant","Tybalt, überheblich.jpg","Tybalt","arrogant"],
 ["guard_alarm","Wächter alarmiert.jpg","Wächter","alarm"],["guard_normal","Wächter normal.jpg","Wächter","normal"],
] as const;
const characters=characterFiles.map(([id,file,character,state])=>asset(`character_${id}`,state==="neutral"?"characters":"characters","characters",file,character,`${character}: ${state}`,{character,state}));

const objectFiles=[["letter","Brief.jpg","Brief"],["book","Buch.jpg","Buch"],["dagger","Dolch.jpg","Dolch"],["lantern","Fackel  Laterne.jpg","Laterne"],["poison","Giftfläschchen.jpg","Giftfläschchen"],["candlestick","Kerzenständer.jpg","Kerzenständer"],["key","Schlüssel.jpg","Schlüssel"],["scroll","Schriftrolle.jpg","Schriftrolle"],["seal","Siegel.jpg","Siegel"],["script","Skript.jpg","Regieskript"],["sealed_letter","Versiegelter Brief.jpg","Versiegelter Brief"]] as const;
const objects=objectFiles.map(([id,file,alt])=>asset(`object_${id}`,"renaissance_objects","objects",file,alt,`Spielobjekt: ${alt}`));

const symbolFiles=[["quote_open","Anführungszeichen oben.jpg"],["quote_close","Anführungszeichen unten.jpg"],["book","Buchsymbol.jpg"],["dialogue","Dialogzeichensymbol.jpg"],["relationships","Figurenkonstellationssymbol.jpg"],["question","Fragezeichensymbol.jpg"],["thought","Gedankenblase.jpg"],["idea","Glühbirnensymbol.jpg"],["conflict","Konfliktsymbol.jpg"],["costume","Kostümesymbol.jpg"],["magnifier","Lupensymbol.jpg"],["hourglass","Sanduhrsymbol.jpg"],["spotlight","Scheinwerfersymbol.jpg"],["spotlight_variant","Schreinwerfer.jpg"],["masks","Theatermaskensymbol.jpg"],["chest","Truhensymbol.jpg"],["scales","Waagensymbol.jpg"]] as const;
const symbols=symbolFiles.map(([id,file])=>asset(`symbol_${id}`,"analysis_symbols","symbols",file,"",`Dekoratives Funktionssymbol: ${id}`,{decorative:true}));

export const assetManifest:readonly AssetDefinition[]=[...backgrounds,...characters,...objects,...symbols];
export function getAsset(id:string){return assetManifest.find((item)=>item.id===id)}
export function resolveCharacterAsset(character:string,state="calm"){return assetManifest.find((item)=>item.character===character&&item.state===state)??assetManifest.find((item)=>item.character===character&&["calm","neutral"].includes(item.state??""))}
export function validateAssetManifest(items:readonly AssetDefinition[]):string[]{const ids=new Set<string>();const errors:string[]=[];for(const item of items){if(ids.has(item.id))errors.push(`duplicate asset id: ${item.id}`);ids.add(item.id);if(!item.path.startsWith("/assets/"))errors.push(`asset path must start with /assets/: ${item.id}`);if(!item.decorative&&!item.alt.trim())errors.push(`asset alt text is required: ${item.id}`)}return errors}
