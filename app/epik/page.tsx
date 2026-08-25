import type { Metadata } from "next";
import { EpikWorkshop } from "@/src/games/epik/EpikWorkshop";

export const dynamic = "force-static";

export const metadata: Metadata = { title: "Analysewerkstatt Epik", description: "Grundstruktur für die Analyse und Interpretation epischer Literatur" };
export default function EpikPage() { return <EpikWorkshop />; }
