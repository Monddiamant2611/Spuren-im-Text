export type GlossaryEntry = { id: "ambiguitaet" | "leerstelle" | "poetizitaet"; term: string; shortDefinition: string; explanation: string; example?: string; relatedTerms?: readonly string[] };

export const glossaryEntries: readonly GlossaryEntry[] = [
  { id: "ambiguitaet", term: "Ambiguität", shortDefinition: "Fachbegriff für Mehrdeutigkeit.", explanation: "Ein literarischer Text kann mehrere unterschiedliche, aber begründbare Deutungen ermöglichen." },
  { id: "leerstelle", term: "Leerstelle", shortDefinition: "Eine bewusst offene Stelle innerhalb eines Textes.", explanation: "Nicht alle Informationen werden ausdrücklich genannt. Leserinnen und Leser ergänzen solche offenen Stellen mithilfe von Vorwissen, Fantasie oder Schlussfolgerungen." },
  { id: "poetizitaet", term: "Poetizität", shortDefinition: "Die besondere sprachlich-künstlerische Gestaltung eines literarischen Textes.", explanation: "Poetizität kann beispielsweise durch sprachliche Bilder, Rhythmus, Klang, ungewöhnliche Formulierungen oder bewusste Mehrdeutigkeit entstehen." },
];
export const glossaryById = Object.fromEntries(glossaryEntries.map((entry) => [entry.id, entry])) as Record<GlossaryEntry["id"], GlossaryEntry>;
