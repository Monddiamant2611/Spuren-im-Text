"use client";

import { useState } from "react";
import { Card } from "@/src/features/literature-archive/components/Card";

export function PracticeText({ title, text, className = "" }: { title: string; text: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return <Card className={`epik-text-card epik-sticky-text${open ? " is-text-open" : ""}${className ? ` ${className}` : ""}`} data-testid="practice-text">
    <button type="button" className="epik-text-toggle" aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? "Text schließen" : "Text anzeigen"}</button>
    <div className="epik-text-body"><h3>{title}</h3><blockquote>{text}</blockquote></div>
  </Card>;
}
