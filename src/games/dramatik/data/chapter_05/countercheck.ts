export const escalationStructure=[
 {id:"level_perception",level:"perception",text:"Paris deutet Romeos Erscheinen als feindselige Handlung."},
 {id:"level_goal",level:"goal",text:"Paris will Romeo festnehmen."},
 {id:"level_reaction",level:"reaction",text:"Romeo versucht zunächst, Paris zum Fortgehen zu bewegen; Paris weist dies zurück."},
 {id:"level_consequence",level:"consequence",text:"Der Konflikt eskaliert schließlich zum Kampf."},
] as const;
export const oneSidedClaim="Paris allein verursacht die Eskalation.";
export const differentiatedClaim="Beide Figuren tragen auf unterschiedliche Weise zur Eskalation bei.";
export const countercheckOptions=[
 {id:"claim_one_sided",text:oneSidedClaim,correct:true,refine:true},
 {id:"claim_differentiated",text:differentiatedClaim,correct:false,refine:false},
] as const;
export const countercheckExplanation="Auch Romeo verwendet deutlich drohende und emotional zugespitzte Sprache und warnt Paris davor, ihn weiter zu reizen.";
export const countercheckWrongFeedback="Diese Aussage ist bereits differenziert. Gesucht ist die Aussage, die den Verlauf zu einseitig erklärt.";
