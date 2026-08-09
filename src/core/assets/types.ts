import type { GameId } from "../state/types";
export type AssetCategory = "characters" | "theatre" | "renaissance_objects" | "analysis_symbols" | "ui" | "backgrounds" | "audio";
export interface AssetDefinition { id: string; category: AssetCategory; path: string; alt: string; game: GameId | "shared"; usage: string; }
