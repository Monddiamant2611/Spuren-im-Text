import type { GameDefinition } from "../../../core/navigation/registry";

export const dramatikGame: GameDefinition = {
  id: "dramatik",
  title: "Die letzte Aufführung – Das verlorene Regiebuch",
  chapters: [
    { id: "chapter_01", title: "Das zerrissene Regiebuch", status: "ready" },
    { id: "chapter_02", title: "Das Ensemble erwacht", status: "ready" },
    { id: "chapter_03", title: "Der Brief, der nie ankam", status: "ready" },
    { id: "chapter_04", title: "Die Generalprobe", status: "ready" },
    { id: "chapter_05", title: "Die Deutungsprobe", status: "ready" },
    { id: "finale", title: "Die letzte Aufführung", status: "ready" },
  ],
};
