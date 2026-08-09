export const relationships=[
 {id:"rel_romeo_julia",a:"romeo",b:"julia",label:"romantische Beziehung / heimliche Verbindung",symbol:"♡"},
 {id:"rel_romeo_mercutio",a:"romeo",b:"mercutio",label:"Freundschaft",symbol:"◇"},
 {id:"rel_romeo_benvolio",a:"romeo",b:"benvolio",label:"Verwandtschaft und freundschaftliche Nähe",symbol:"⌁"},
 {id:"rel_romeo_tybalt",a:"romeo",b:"tybalt",label:"Konflikt zwischen Angehörigen der verfeindeten Häuser; später unmittelbare persönliche Eskalation",symbol:"⚡"},
 {id:"rel_julia_capulet",a:"julia",b:"capulet",label:"Vater-Tochter-Beziehung",symbol:"⌂"},
 {id:"rel_julia_amme",a:"julia",b:"amme",label:"enge persönliche Vertrauensbeziehung",symbol:"◎"},
 {id:"rel_julia_paris",a:"julia",b:"paris",label:"von Julias Familie angestrebte Heiratsverbindung",symbol:"◈"},
 {id:"rel_romeo_lorenzo",a:"romeo",b:"lorenzo",label:"Vertrauens- und Helferbeziehung",symbol:"✦"},
].map((item)=>({...item,text_origin:"didactic_summary" as const,evidence:{text:"Redaktioneller Primärtextbeleg steht noch aus.",placeholder:true,source_verified:false,source_location:null}}));
