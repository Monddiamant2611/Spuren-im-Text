export const dramatikSource = {
  author: "William Shakespeare",
  work: "Romeo und Juliette",
  translation: "Christoph Martin Wieland",
  primaryTextBasis: "im Projekt hinterlegte Wieland-EPUB",
  repositorySource: "docs/sources/william-shakespeare-romeo-und-juliette.epub",
} as const;

export const dramatikSourceLabel = `${dramatikSource.author}: ${dramatikSource.work} · Übersetzung: ${dramatikSource.translation}`;
