import { describe,expect,it } from "vitest";
import { coverageMatrix,curriculum } from "../src/games/lyrik/data/curriculum";
import { knowledgeCards,tasks } from "../src/games/lyrik/data/game";
import { styleDevices } from "../src/games/lyrik/data/knowledge/styleDevices";
import { classifyTask,formChallengeTasks,formTransferTask,isEligibleForTraining,styleTrainingCoverage } from "../src/games/lyrik/data/training";

describe("verzahntes Lyrik-Curriculum",()=>{
 it("definiert neun Kapitel und dokumentiert jedes Lernziel in der Coverage-Matrix",()=>{expect(curriculum).toHaveLength(9);expect(new Set(curriculum.map(x=>x.number))).toEqual(new Set([1,2,3,4,5,6,7,8,9]));expect(coverageMatrix).toHaveLength(curriculum.reduce((sum,x)=>sum+x.goals.length,0));for(const row of coverageMatrix){expect(row.knowledgeCard).toBe(true);expect(row.flashcard).toBe(true);expect(row.training).toBe(true);expect(row.mixedTraining).toBe(true);}});
 it("hält alle 52 Stilmittel in Wissen, Kartei und Training erreichbar",()=>{expect(styleDevices).toHaveLength(52);expect(Object.keys(styleTrainingCoverage)).toHaveLength(52);for(const card of styleDevices){expect(knowledgeCards).toContain(card);expect(styleTrainingCoverage[card.term].eligible).toBe(true);expect(styleTrainingCoverage[card.term].weight).toBeGreaterThan(0);expect(tasks.some(task=>task.styleAnswer===card.term||task.styleDistractors?.includes(card.term))).toBe(true);}});
 it("gewichtet 24 zentrale Figuren häufiger als 28 Erweiterungsfiguren",()=>{expect(Object.values(styleTrainingCoverage).filter(x=>x.weight===3)).toHaveLength(24);expect(Object.values(styleTrainingCoverage).filter(x=>x.weight===1)).toHaveLength(28);});
 it("klassifiziert produktive Aufgaben mit Kapitel, Kompetenz, Operation und Tags",()=>{for(const task of tasks){const meta=classifyTask(task);expect(meta.chapter).toBeTruthy();expect(meta.skill).toBeTruthy();expect(meta.operation).toBeTruthy();expect(meta.trainingTags.length).toBeGreaterThanOrEqual(3);}});
 it("hält Bewegungstraining in der verbindlichen Kapitel-Taxonomie",()=>{for(const task of tasks.filter(task=>isEligibleForTraining(task,"movement")))expect(["theme","senseSection","movement","turn","stasis","circularity","beginningEnding"]).toContain(classifyTask(task).skill);});
 it("lässt im Vernetzungstraining nur analysierende oder verbindende Operationen zu",()=>{for(const task of tasks.filter(task=>isEligibleForTraining(task,"integration")))expect(["connect","analyze","interpret"]).toContain(classifyTask(task).operation);});
 it("verwendet im Metrumtraining ausschließlich akzeptierte Metrum- und Kadenzregister",()=>{for(const task of tasks.filter(task=>isEligibleForTraining(task,"metre")))expect(task.id).toMatch(/^(exercise-meter-|exercise-cadence-|cadence-)/);});
 it("nutzt für Challenge und Transfer ausschließlich das redaktionelle Form-Set",()=>{expect(formChallengeTasks.map(x=>x.skill)).toEqual(["rhymeScheme","enjambment","formalRelevance"]);expect(formChallengeTasks.every(x=>x.approvedForGuidedLearning)).toBe(true);expect(formTransferTask.criteria).toContain("Vers- und Strophenzahl bestimmt");expect(formTransferTask.criteria).toContain("Reimlosigkeit korrekt beschrieben");});
});
