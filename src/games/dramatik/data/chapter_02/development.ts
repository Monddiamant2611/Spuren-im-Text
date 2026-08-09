export const developmentCards = [
  { id: "dev_earlier", stage: "earlier", text: "Romeo handelt zunächst auf Grundlage der Nachricht von Julias vermeintlichem Tod und ohne Lorenzos Information.", text_origin: "didactic_summary", source_verified: false },
  { id: "dev_event", stage: "event", text: "Am Begräbnis trifft Romeo auf Paris und versucht zunächst, ihn zum Fortgehen zu bewegen.", text_origin: "didactic_summary", source_verified: false },
  { id: "dev_later", stage: "later", text: "Nachdem Paris dies zurückweist, reagiert Romeo schärfer; die Begegnung eskaliert zum Kampf.", text_origin: "didactic_summary", source_verified: false },
] as const;

export const developmentDisplayOrder = ["dev_event", "dev_later", "dev_earlier"] as const;
