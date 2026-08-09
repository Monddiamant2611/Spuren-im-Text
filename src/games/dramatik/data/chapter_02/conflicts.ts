export const conflictChain = [
  { id: "conflict_relation", stage: "relationship", text: "Angehörige der Häuser Montague und Capulet stehen in einer Konfliktbeziehung.", text_origin: "didactic_summary", source_verified: false, editorial_status: "approved_didactic" },
  { id: "conflict_interest", stage: "motivation", text: "Tybalt hält an seiner feindseligen Haltung gegenüber den Montagues fest.", text_origin: "interpretation", source_verified: false, editorial_status: "approved_didactic" },
  { id: "conflict_action", stage: "action", text: "Tybalt weist Benvolios Friedensversuch zurück und setzt den Kampf fort.", text_origin: "didactic_summary", source_verified: false, editorial_status: "approved_didactic" },
  { id: "conflict_reaction", stage: "reaction", text: "Benvolios Versuch zu vermitteln beendet den Konflikt nicht.", text_origin: "didactic_summary", source_verified: false, editorial_status: "approved_didactic" },
  { id: "conflict_escalation", stage: "escalation", text: "Der Konflikt der Häuser verschärft sich später zwischen Romeo und Tybalt zu einer unmittelbaren persönlichen Eskalation.", text_origin: "didactic_summary", source_verified: false, editorial_status: "approved_didactic" },
] as const;

export const conflictDisplayOrder = ["conflict_action", "conflict_relation", "conflict_escalation", "conflict_interest", "conflict_reaction"] as const;
