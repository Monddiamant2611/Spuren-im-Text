import { GameShell } from "@/src/shared/components/GameShell";
import { DramatikErrorBoundary } from "@/src/shared/components/DramatikErrorBoundary";

export const dynamic = "force-static";

export default function DramatikPage() {
  return <div className="dramatik-typography"><DramatikErrorBoundary><GameShell /></DramatikErrorBoundary></div>;
}
