import { cadenceExamples, rejectedCadenceIds } from "./cadence";
import { metricExamples, rejectedMeterIds } from "./meter";

const countBy=<T>(items:readonly T[],key:(item:T)=>string)=>Object.fromEntries([...new Set(items.map(key))].map(value=>[value,items.filter(item=>key(item)===value).length]));

export const meterQualityReport={
 generatedAt:"2026-09-06",
 scope:"Redaktionelle Eindeutigkeitsprüfung; keine externe phonetische oder wissenschaftliche Zertifizierung.",
 legacyMeterTotal:240,
 meter:{accepted:metricExamples.length,rejected:rejectedMeterIds.length,ambiguous:0,unchecked:0},
 acceptedMeterByKind:countBy(metricExamples,item=>item.kind),
 acceptedMeterByBaseMeter:countBy(metricExamples,item=>item.baseMeter),
 acceptedMeterIds:metricExamples.map(item=>item.id),
 rejectedMeterIds,
 correctedLegacyFeetItems:0,
 newAcceptedVerseItems:metricExamples.filter(item=>item.kind==="verse").length,
 acceptedDeviationItems:metricExamples.filter(item=>item.hasDeviation).length,
 legacyCadenceTotal:80,
 cadence:{accepted:cadenceExamples.length,rejected:rejectedCadenceIds.length,ambiguous:0,unchecked:0},
 acceptedCadenceByType:countBy(cadenceExamples,item=>item.cadence),
 acceptedCadenceIds:cadenceExamples.map(item=>item.id),
 rejectedCadenceIds,
 policy:{productionStatus:"accepted",wordAccentIsNotVerseMeter:true,cadenceRequiresFullVerse:true}
} as const;
