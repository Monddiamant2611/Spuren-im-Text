import type { GameDefinition } from "../../../core/navigation/registry";

export const dramatikGame: GameDefinition = {
  id: "dramatik",
  title: "Die letzte Aufführung – Das verlorene Regiebuch",
  chapters: [
    { id: "chapter_01", title: "Das zerrissene Regiebuch", status: "ready" },
    { id: "chapter_02", title: "Das Ensemble erwacht", status: "ready" },
    { id: "chapter_03", title: "Die Stimmen auf der Bühne", status: "ready" },
    { id: "chapter_04", title: "Der Punkt ohne Rückkehr", status: "ready" },
    { id: "chapter_05", title: "Was bedeutet das?", status: "ready" },
    { id: "finale", title: "Das Finale – Die letzte Probe", status: "ready" },
  ],
};

export const dramatikChapterIds = dramatikGame.chapters.slice(0, 5).map((chapter) => chapter.id);
export const dramatikNavigationIds = dramatikGame.chapters.map((chapter) => chapter.id);
