export type ReviewChapterId="chapter_01"|"chapter_02"|"chapter_03"|"chapter_04"|"chapter_05";
export type ReviewTarget=
 |{kind:"theatre";id:string;label:string;completedChapters:string[]}
 |{kind:"chapter";id:string;label:string;chapterId:ReviewChapterId;round:number;completion?:boolean}
 |{kind:"finale";id:string;label:string;mode:"welcome"|"review"|"synthesis"|"book"|"closing"|"complete"};

const chapter=(chapterId:ReviewChapterId,labels:readonly string[]):ReviewTarget[]=>labels.map((label,index)=>{
 const completion=index===labels.length-1&&/Kapitelabschluss|Abschlussdialog/.test(label);
 return{kind:"chapter",id:`${chapterId}-${completion?"completion":`round-${index+1}`}`,label,chapterId,round:completion?index:index+1,completion};
});

export const reviewTargets:ReviewTarget[]=[
 {kind:"theatre",id:"theatre-initial",label:"Große Bühne · nur Kapitel 1",completedChapters:[]},
 {kind:"theatre",id:"theatre-after-1",label:"Große Bühne · Kapitel 2 verfügbar",completedChapters:["chapter_01"]},
 {kind:"theatre",id:"theatre-after-2",label:"Große Bühne · Kapitel 3 verfügbar",completedChapters:["chapter_01","chapter_02"]},
 {kind:"theatre",id:"theatre-after-3",label:"Große Bühne · Kapitel 4 verfügbar",completedChapters:["chapter_01","chapter_02","chapter_03"]},
 {kind:"theatre",id:"theatre-after-4",label:"Große Bühne · Kapitel 5 verfügbar",completedChapters:["chapter_01","chapter_02","chapter_03","chapter_04"]},
 {kind:"theatre",id:"theatre-finale",label:"Große Bühne · Finale verfügbar",completedChapters:["chapter_01","chapter_02","chapter_03","chapter_04","chapter_05"]},
 ...chapter("chapter_01",["Einstieg","Textsignale lesen","Textbefund und Erschließung","Shakespeare-Regiebuch öffnen","Situationsanalyse","Textbeleg verknüpfen","Transfer","Kapitelabschluss"]),
 ...chapter("chapter_02",["Einführung","Befund oder Deutung","Direkte und indirekte Charakterisierung","Juliette im Text","Situatives Verhalten","Ziel, Motiv und Interesse","Beziehungen","Selbst- und Fremdbild","Transfer","Situationen vergleichen","Ensemble rekonstruieren","Kapitelabschluss"]),
 ...chapter("chapter_03",["Einführung","Sprachhandlungen üben","Gesprächsziele üben","Gesprächsziele am Text","Zielveränderung","Sprachhandlung und Reaktion","Gesprächsphasen","Wendepunkt","Sprache und Wirkung","Text oder Inszenierung","Transferdialog","Abschlussprobe","Kapitelabschluss"]),
 ...chapter("chapter_04",["Konfliktinformationen","Äußerer und innerer Konflikt","Zeitliche und kausale Folge","Ausgangslage","Wissensstände","Ziele und Belege","Handlungskette","Handlung und Reaktion","Eskalation und Wendepunkt","Juliettes Situation","Innerer Konflikt","Entscheidung und Ausführung","Handlungsalternative","Konflikte vergleichen","Abschlussrekonstruktion","Kapitelabschluss"]),
 ...chapter("chapter_05",["Beobachtung, Analyse, Interpretation","Argumentationskette","Deutungshypothese","Hypothese revidieren","Juliette: Relevanz","Belege rückwärts prüfen","Gegencheck","Hypothese präzisieren","Argumentation bauen","Fehler erkennen","Interpretationsstruktur","Transfer: Belege auswählen","Transferkette","Transferhypothese","Transfer-Gegencheck","Transfer präzisieren","Transferargument","Synthese","Kapitelabschluss","Abschlussdialog"]),
 {kind:"finale",id:"finale-welcome",label:"Finale · Einstieg",mode:"welcome"},
 {kind:"finale",id:"finale-review",label:"Finale · fünf Werkzeuge",mode:"review"},
 {kind:"finale",id:"finale-synthesis",label:"Finale · Synthese",mode:"synthesis"},
 {kind:"finale",id:"finale-book",label:"Finale · Regiebuch",mode:"book"},
 {kind:"finale",id:"finale-closing",label:"Finale · Schlusswort",mode:"closing"},
 {kind:"finale",id:"finale-complete",label:"Finale · Abschluss",mode:"complete"},
];

export const reviewTargetById=(id:string)=>reviewTargets.find(target=>target.id===id)??reviewTargets[0];
export const reviewGroups=[
 {id:"theatre",label:"Große Bühne",targets:reviewTargets.filter(target=>target.kind==="theatre")},
 ...(["chapter_01","chapter_02","chapter_03","chapter_04","chapter_05"] as const).map((id,index)=>({id,label:`Kapitel ${index+1}`,targets:reviewTargets.filter(target=>target.kind==="chapter"&&target.chapterId===id)})),
 {id:"finale",label:"Finale",targets:reviewTargets.filter(target=>target.kind==="finale")},
];
