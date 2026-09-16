import { ambiguousStyleExampleIds,centralStyleTerms,rejectedStyleExampleIds,styleDevices,styleExampleReviews } from "./knowledge/styleDevices";
import { rejectedNewStyleCandidates,styleAdditionalExamples } from "./knowledge/styleAdditionalExamples";

export const styleDeviceQualityReport={
 generatedAt:"2026-09-06",
 scope:"Redaktionelle Eindeutigkeitsprüfung; keine fachwissenschaftliche Zertifizierung.",
  originalExamples:584,
  acceptedExamplesBeforeExpansion:52,
  acceptedExamples:styleExampleReviews.length,
  legacyRejectedExamples:rejectedStyleExampleIds.length,
  newCandidates:styleAdditionalExamples.length+rejectedNewStyleCandidates.length,
  acceptedNewCandidates:styleAdditionalExamples.length,
  rejectedNewCandidates:rejectedNewStyleCandidates.length,
  rejectedExamples:rejectedStyleExampleIds.length+rejectedNewStyleCandidates.length,
  ambiguousExamples:ambiguousStyleExampleIds.length,
  byDevice:Object.fromEntries(styleDevices.map(card=>[card.term,{accepted:styleExampleReviews.filter(example=>example.device===card.term).length,legacyRejected:centralStyleTerms.has(card.term)?14:7,newRejected:rejectedNewStyleCandidates.filter(example=>example.device===card.term).length,ambiguous:0}])),
 acceptedExampleIds:styleExampleReviews.map(example=>example.id),
  rejectedExampleIds:rejectedStyleExampleIds,
  rejectedNewCandidateIds:rejectedNewStyleCandidates.map(example=>example.id),
 ambiguousExampleIds:ambiguousStyleExampleIds,
  pseudoVariantsRemoved:532,
  examplesWithMultipleFigures:styleExampleReviews.filter(example=>example.coexistingDevices.length>0).map(example=>example.id),
 tasksChangedForMultipleSolutions:styleExampleReviews.filter(example=>example.coexistingDevices.length>0).length,
  singleChoiceConvertedToMultipleChoice:styleExampleReviews.filter(example=>example.coexistingDevices.length>0).length,
  correctedDistractorGroups:styleExampleReviews.length,
  individualizedFeedbackTexts:styleExampleReviews.length*2,
  styleTasksByLevel:{level1:styleExampleReviews.filter(example=>example.coexistingDevices.length===0).length,level2:styleExampleReviews.filter(example=>example.coexistingDevices.length>0).length,level3:styleExampleReviews.length},
  distinctFunctionProfiles:new Set(styleExampleReviews.map(example=>example.functionProfile)).size,
  distinctRegisters:new Set(styleExampleReviews.map(example=>example.register)).size,
 reviewedKnowledgeCards:52,
 editoriallyChangedKnowledgeCards:52,
 editoriallyChangedAnalysisHints:0,
 policy:{productionStatus:"accepted",automaticEffectsForbidden:true,exerciseAttribution:"exerciseText"}
} as const;
