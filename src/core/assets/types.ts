import type { GameId } from "../state/types";
export type AssetCategory = "characters" | "theatre" | "renaissance_objects" | "analysis_symbols" | "ui" | "backgrounds" | "audio" | "decoration" | "literature" | "methods" | "navigation" | "status" | "feedback";
export interface AssetDefinition { id: string; category: AssetCategory; path: string; alt: string; game: GameId | "shared"; usage: string; character?:string; state?:string; chapters?:readonly string[]; decorative?:boolean; }
