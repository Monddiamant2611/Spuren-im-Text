export interface SceneCharacter {name:string;assetId?:string;position:"left"|"center-left"|"center"|"center-right"|"right";emphasis?:"primary"|"supporting";mentor?:boolean}
export const sceneCharacters:Record<string,readonly SceneCharacter[]>={
 "chapter_01.street":[{name:"Sampson",position:"center-left",emphasis:"primary"},{name:"Gregorio",position:"center-right",emphasis:"primary"}],
 "chapter_01.capulet_paris":[{name:"Capulet",assetId:"character_capulet",position:"center-left",emphasis:"primary"},{name:"Paris",assetId:"character_paris_calm",position:"center-right",emphasis:"primary"},{name:"Bedienter",position:"right",emphasis:"supporting"}],
 "chapter_02.main":[{name:"Juliette",assetId:"character_julia_thoughtful",position:"left",emphasis:"primary"},{name:"Lady Capulet",assetId:"character_lady_capulet",position:"center",emphasis:"primary"},{name:"Amme",assetId:"character_amme",position:"right",emphasis:"primary"}],
 "chapter_02.transfer":[{name:"Juliette",assetId:"character_julia_calm",position:"left",emphasis:"primary"},{name:"Lady Capulet",assetId:"character_lady_capulet",position:"center-left"},{name:"Capulet",assetId:"character_capulet",position:"center-right",emphasis:"primary"},{name:"Amme",assetId:"character_amme",position:"right"}],
 "chapter_03.conflict":[{name:"Benvolio",assetId:"character_benvolio_calm",position:"left"},{name:"Mercutio",assetId:"character_mercutio_teasing",position:"center-left",emphasis:"primary"},{name:"Tybalt",assetId:"character_tybalt_angry",position:"center-right",emphasis:"primary"},{name:"Romeo",assetId:"character_romeo_calm",position:"right"}],
 "chapter_03.garden":[{name:"Romeo",assetId:"character_romeo_loving",position:"center-left",emphasis:"primary"},{name:"Juliette",assetId:"character_julia_loving",position:"center-right",emphasis:"primary"}],
 "chapter_04.tomb":[{name:"Romeo",assetId:"character_romeo_thoughtful",position:"center-left",emphasis:"primary"},{name:"Paris",assetId:"character_paris_calm",position:"center-right",emphasis:"primary"}],
 "chapter_04.juliet":[{name:"Juliette",assetId:"character_julia_thoughtful",position:"center",emphasis:"primary"}],
 "chapter_05.juliet":[{name:"Juliette",assetId:"character_julia_calm",position:"center-left",emphasis:"primary"},{name:"Capulet",assetId:"character_capulet",position:"center-right",emphasis:"primary"}],
 "chapter_05.apothecary":[{name:"Romeo",assetId:"character_romeo_thoughtful",position:"center-left",emphasis:"primary"},{name:"Apotheker",position:"center-right",emphasis:"primary"}],
};
export const getSceneCharacters=(sceneId:string)=>sceneCharacters[sceneId]??[];
