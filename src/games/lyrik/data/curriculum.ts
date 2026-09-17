import type { AnalysisAreaId } from "./game";

export type CurriculumChapter={id:AnalysisAreaId;number:number;title:string;goals:readonly string[];authenticApplication?:string};
export const curriculum:readonly CurriculumChapter[]=[
 {id:"lyric",number:1,title:"Lyrik erkennen",goals:["Gedichte und Prosatexte unterscheiden","sprachliche Verdichtung, Klang, Rhythmus und Bilder erkennen","wissen, dass ein Gedicht nicht immer Reim und Metrum braucht"]},
 {id:"interpretation",number:2,title:"Beobachten und belegen",goals:["Eindruck, Befund, Analyse und Deutung unterscheiden","Belegqualität prüfen","sicher, plausibel und nicht belegbar unterscheiden"]},
 {id:"form",number:3,title:"Form und Aufbau",goals:["Verse, Strophen und Verslängen untersuchen","Reim, Reimschema, Enjambement und Endstopp erkennen","Muster und Abweichungen erkennen und erklären"]},
 {id:"speaker",number:4,title:"Sprechsituation und lyrisches Ich",goals:["Autor und Sprecher trennen","Adressat und Sprechsituation bestimmen","prüfen, was die Sprecherstimme weiß"],authenticApplication:"Joseph von Eichendorff: Sehnsucht (1834) – Sprecher- und Sehnsuchtssituation"},
 {id:"movement",number:5,title:"Inhalt und innere Bewegung",goals:["Thema und Sinnabschnitte bestimmen","Entwicklung, Wendung, Stillstand und Kreisen unterscheiden","Anfang und Ende vergleichen"],authenticApplication:"Joseph von Eichendorff: Sehnsucht (1834) – innere Bewegung"},
 {id:"metre",number:6,title:"Metrum, Rhythmus und Kadenz",goals:["Versfüße und Hebigkeit bestimmen","Grundmetrum und Sprachrhythmus vergleichen","Kadenzen und Abweichungen am konkreten Vers prüfen"]},
 {id:"language",number:7,title:"Sprache und sprachliche Gestaltung",goals:["Wortwahl, Wortfelder, Satzbau und Klang untersuchen","52 Stilmittel erkennen und unterscheiden","erklären, was ein Stilmittel an der Textstelle bewirkt"]},
 {id:"mood",number:8,title:"Stimmung, Haltung und Perspektive",goals:["die drei Begriffe unterscheiden","Stimmung mit mehreren Textstellen belegen","Haltung und Perspektivwechsel am Text prüfen"],authenticApplication:"Joseph von Eichendorff: Sehnsucht (1834) – Stimmung und Perspektive"},
 {id:"integration",number:9,title:"Analyseergebnisse verknüpfen und deuten",goals:["Befunde gewichten und verbinden","Analysesätze und Deutungshypothesen schreiben","Alternativen und Gegenbelege berücksichtigen"],authenticApplication:"Joseph von Eichendorff: Sehnsucht (1834) – abschließende Vernetzung; Originaltext nur nach Quellenprüfung"}
];

export const coverageMatrix=curriculum.flatMap(chapter=>chapter.goals.map(goal=>({chapter:chapter.number,chapterTitle:chapter.title,goal,knowledgeCard:true,flashcard:true,introduction:chapter.number===3,sharedAnalysis:chapter.number===3,practice:true,challenge:chapter.number===3,transfer:chapter.number===3,training:true,mixedTraining:true,masterRound:chapter.number>=2})));
