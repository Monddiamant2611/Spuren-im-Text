export const theatreAreas = [
  { id: "desk", label: "Regiepult", title: "Das zerrissene Regiebuch", chapterId: "chapter_01", assetId: "theatre_access_chapter_01", symbol: "✦" },
  { id: "ensemble", label: "Ensemblewand", title: "Das Ensemble erwacht", chapterId: "chapter_02", assetId: "theatre_access_chapter_02", symbol: "◐" },
  { id: "archive", label: "Probenbühne", title: "Die Stimmen auf der Bühne", chapterId: "chapter_03", assetId: "theatre_access_chapter_03", symbol: "▤" },
  { id: "stage", label: "Bühne", title: "Der Punkt ohne Rückkehr", chapterId: "chapter_04", assetId: "theatre_access_chapter_04", symbol: "◇" },
  { id: "book", label: "Regiebuch", title: "Was bedeutet das?", chapterId: "chapter_05", assetId: "theatre_access_chapter_05", symbol: "▱" },
] as const;

export const progressMarks = ["Manuskript", "Ensemble", "Archiv", "Bühne", "Interpretation"] as const;
