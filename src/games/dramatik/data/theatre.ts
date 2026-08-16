export const theatreAreas = [
  { id: "desk", label: "Regiepult", title: "Das zerrissene Regiebuch", chapterId: "chapter_01", assetId: "theatre_access_chapter_01", symbol: "✦" },
  { id: "ensemble", label: "Ensemblewand", title: "Das Ensemble erwacht", chapterId: "chapter_02", assetId: "theatre_access_chapter_02", symbol: "◐" },
  { id: "archive", label: "Theaterarchiv", title: "Der Brief, der nie ankam", chapterId: "chapter_03", assetId: "theatre_access_chapter_03", symbol: "▤" },
  { id: "stage", label: "Bühne", title: "Die Generalprobe", chapterId: "chapter_04", assetId: "theatre_access_chapter_04", symbol: "◇" },
  { id: "book", label: "Regiebuch", title: "Die Deutungsprobe", chapterId: "chapter_05", assetId: "theatre_access_chapter_05", symbol: "▱" },
] as const;

export const progressMarks = ["Manuskript", "Ensemble", "Archiv", "Bühne", "Interpretation"] as const;
