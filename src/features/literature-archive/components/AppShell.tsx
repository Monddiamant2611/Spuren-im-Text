import type { ReactNode } from "react";
import { DecorativeLayer, type Decoration } from "./DecorativeLayer";
export function AppShell({ children, decorations = [] }: { children: ReactNode; decorations?: readonly Decoration[] }) { return <main className="archive-shell"><DecorativeLayer decorations={decorations} /><div className="archive-shell__content">{children}</div></main>; }
