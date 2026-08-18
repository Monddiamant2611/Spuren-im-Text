import { GameShell } from "@/src/shared/components/GameShell";
import { DramatikErrorBoundary } from "@/src/shared/components/DramatikErrorBoundary";

export default function DramatikPage() {
  return <DramatikErrorBoundary><GameShell /></DramatikErrorBoundary>;
}
