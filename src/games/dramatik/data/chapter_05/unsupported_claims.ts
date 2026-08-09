export const interpretationClaims=[
 {id:"claim_supported",text:"Unvereinbare Ziele und Zurückweisungen verschärfen den Konflikt.",status:"supported"},
 {id:"claim_overreach",text:"Romeo sucht Paris gezielt auf, um ihn zu töten.",status:"unsupported"},
 {id:"claim_contradiction",text:"Romeo fordert Paris von Beginn an zum Kampf auf.",status:"contradicts"},
] as const;
export const overreachFeedback="Diese Aussage geht über den Text hinaus. Romeo kommt nicht mit dem erkennbaren Ziel, Paris aufzusuchen; im Gespräch fordert er ihn zunächst mehrfach zum Fortgehen auf.";
export const evidenceMaxim=["Plausibel klingt nicht automatisch textnah.","Eine Interpretation muss sich am Text überprüfen lassen."] as const;
