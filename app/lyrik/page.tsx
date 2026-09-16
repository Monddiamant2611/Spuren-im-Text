import type { Metadata } from "next";
import { LyrikWorkshop } from "@/src/games/lyrik/LyrikWorkshop";

export const dynamic = "force-static";
export const metadata: Metadata = { title: "Lyrikwerkstatt", description: "Vom ersten Eindruck zur textnahen Deutung" };
export default function LyrikPage() { return <LyrikWorkshop />; }
