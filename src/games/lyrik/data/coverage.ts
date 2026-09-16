import { cadenceExamples } from "./cadence";
import { poolExercises } from "./exercises/pools";
import { styleDevices } from "./knowledge/styleDevices";
import { metricExamples } from "./meter";
import { microTexts } from "./texts/microTexts";
import { transferCases } from "./texts/transferCases";

const countBy=<T>(items:readonly T[],key:(item:T)=>string)=>Object.fromEntries([...new Set(items.map(key))].map(value=>[value,items.filter(item=>key(item)===value).length]));
export const coverageReport={
 totalExercises:poolExercises.length,
 byArea:countBy(poolExercises,item=>item.area),
 byLevel:countBy(poolExercises,item=>String(item.level)),
 byMechanic:countBy(poolExercises,item=>item.mechanic),
 styleExamples:Object.fromEntries(styleDevices.map(card=>[card.term,card.examples.length])),
 styleCorrect:countBy(poolExercises.filter(item=>item.styleAnswer),item=>item.styleAnswer!),
 styleDistractors:Object.fromEntries(styleDevices.map(card=>[card.term,poolExercises.filter(item=>item.styleDistractors?.includes(card.term)).length])),
 texts:microTexts.length,
 transferCases:transferCases.length,
 meter:countBy(metricExamples,item=>item.meter),
 meterWords:countBy(metricExamples.filter(item=>item.kind==="word"),item=>item.baseMeter),
 meterLines:countBy(metricExamples.filter(item=>item.kind==="verse"),item=>item.baseMeter),
 cadence:countBy(cadenceExamples,item=>item.cadence),
};
export function validateCoverage():string[]{const errors:string[]=[];const required:Record<string,number>={lyric:70,form:100,speaker:100,movement:90,metre:50,language:100,mood:100,integration:90,interpretation:90};for(const [area,min] of Object.entries(required))if((coverageReport.byArea[area]??0)<min)errors.push(`${area}: ${coverageReport.byArea[area]??0}/${min}`);for(const card of styleDevices){if(card.examples.length<1)errors.push(`${card.term}: kein akzeptiertes Beispiel`);if(!coverageReport.styleCorrect[card.term])errors.push(`${card.term}: nie richtige Lösung`);}if(microTexts.length<50)errors.push("Übungstexte unter 50");if(transferCases.length<15)errors.push("Transferfälle unter 15");return errors;}
