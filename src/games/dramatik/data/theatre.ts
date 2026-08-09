export const theatreAreas = [
  { id: "desk", label: "Regiepult", chapterId: "chapter_01", symbol: "✦" },
  { id: "ensemble", label: "Ensemblewand", chapterId: "chapter_02", symbol: "◐" },
  { id: "archive", label: "Theaterarchiv", chapterId: "chapter_03", symbol: "▤" },
  { id: "stage", label: "Bühne", chapterId: "chapter_04", symbol: "◇" },
  { id: "book", label: "Regiebuch", chapterId: "chapter_05", symbol: "▱" },
] as const;

export const progressMarks = ["Manuskript", "Ensemble", "Archiv", "Bühne", "Interpretation"] as const;
