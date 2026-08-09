export interface ChapterDefinition { id: string; title: string; status: "placeholder" | "ready"; }
export interface GameDefinition { id: string; title: string; chapters: readonly ChapterDefinition[]; }

export function findChapter(game: GameDefinition, chapterId: string) {
  return game.chapters.find((chapter) => chapter.id === chapterId);
}

export function isValidNavigation(game: GameDefinition, chapterId: string): boolean {
  return Boolean(findChapter(game, chapterId));
}
