export interface RelationshipEvidenceOption {
  id: string;
  text: string;
  correct: boolean;
  text_origin: "didactic_summary";
  source_verified: false;
}

const evidence = (id: string, correctText: string, distractorText: string): RelationshipEvidenceOption[] => [
  { id: `${id}_evidence`, text: correctText, correct: true, text_origin: "didactic_summary", source_verified: false },
  { id: `${id}_distractor`, text: distractorText, correct: false, text_origin: "didactic_summary", source_verified: false },
];

export const relationships = [
  { id: "rel_romeo_julia", a: "romeo", b: "julia", label: "romantische Beziehung / heimliche Verbindung", symbol: "♡", evidenceOptions: evidence("rel_romeo_julia", "Romeo und Julia sind heimlich miteinander verbunden.", "Julias Familie strebt eine Verbindung zwischen Julia und Paris an.") },
  { id: "rel_romeo_mercutio", a: "romeo", b: "mercutio", label: "Freundschaft", symbol: "◇", evidenceOptions: evidence("rel_romeo_mercutio", "Romeo und Mercutio sind freundschaftlich verbunden.", "Romeo vertraut Lorenzo als Helfer.") },
  { id: "rel_romeo_benvolio", a: "romeo", b: "benvolio", label: "Verwandtschaft und freundschaftliche Nähe", symbol: "⌁", evidenceOptions: evidence("rel_romeo_benvolio", "Romeo und Benvolio sind verwandt und einander freundschaftlich nah.", "Romeo und Tybalt gehören den verfeindeten Häusern an.") },
  { id: "rel_romeo_tybalt", a: "romeo", b: "tybalt", label: "Konflikt zwischen Angehörigen der verfeindeten Häuser; später unmittelbare persönliche Eskalation", symbol: "⚡", evidenceOptions: evidence("rel_romeo_tybalt", "Zwischen Romeo und Tybalt verschärft sich der Konflikt der verfeindeten Häuser persönlich.", "Romeo und Mercutio sind freundschaftlich verbunden.") },
  { id: "rel_julia_capulet", a: "julia", b: "capulet", label: "Vater-Tochter-Beziehung", symbol: "⌂", evidenceOptions: evidence("rel_julia_capulet", "Capulet ist Julias Vater.", "Die Amme ist Julias enge persönliche Vertraute.") },
  { id: "rel_julia_amme", a: "julia", b: "amme", label: "enge persönliche Vertrauensbeziehung", symbol: "◎", evidenceOptions: evidence("rel_julia_amme", "Julia und die Amme verbindet eine enge persönliche Vertrauensbeziehung.", "Capulet ist Julias Vater.") },
  { id: "rel_julia_paris", a: "julia", b: "paris", label: "von Julias Familie angestrebte Heiratsverbindung", symbol: "◆", evidenceOptions: evidence("rel_julia_paris", "Julias Familie strebt eine Heiratsverbindung zwischen Julia und Paris an.", "Romeo und Julia sind heimlich miteinander verbunden.") },
  { id: "rel_romeo_lorenzo", a: "romeo", b: "lorenzo", label: "Vertrauens- und Helferbeziehung", symbol: "✦", evidenceOptions: evidence("rel_romeo_lorenzo", "Romeo vertraut Lorenzo und ist auf seine Hilfe und Information angewiesen.", "Romeo und Benvolio sind verwandt.") },
].map((item) => ({ ...item, text_origin: "didactic_summary" as const }));
