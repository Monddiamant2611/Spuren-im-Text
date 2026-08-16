import type { RefObject } from "react";
import type { GlossaryEntry } from "../data/glossary";
import { Button } from "./Button";
import { Modal } from "./Modal";
export function GlossaryPopup({ entry, open, onClose, triggerRef }: { entry: GlossaryEntry; open: boolean; onClose: () => void; triggerRef: RefObject<HTMLElement | null> }) { const titleId = `glossary-${entry.id}-title`; return <Modal open={open} onClose={onClose} titleId={titleId} triggerRef={triggerRef}><Button variant="secondary" className="archive-modal__close" onClick={onClose} aria-label="Glossar schließen">×</Button><p className="archive-modal__eyebrow">Glossar</p><h2 id={titleId}>{entry.term}</h2><p className="archive-modal__definition">{entry.shortDefinition}</p><p>{entry.explanation}</p></Modal>; }
