import type { PrimarySourceRecord } from "../../core/content/types";

type PrimarySourceKind = NonNullable<PrimarySourceRecord["fragment_type"]>;

interface PrimarySourceTextProps {
  record: Pick<PrimarySourceRecord, "text" | "fragment_type"> & { speaker?: string };
  kind?: PrimarySourceKind;
  className?: string;
}

function embeddedSpeaker(text: string) {
  const separator = text.indexOf(".");
  if (separator < 1 || separator > 28) return null;
  const label = text.slice(0, separator + 1);
  if (!/^[\p{L}][\p{L}\s-]*\.$/u.test(label)) return null;
  return { label, speech: text.slice(separator + 1) };
}

export function PrimarySourceText({ record, kind = record.fragment_type ?? "speech", className = "" }: PrimarySourceTextProps) {
  if (kind === "stage_direction") return <span className={`primary-stage-direction ${className}`.trim()}>{record.text}</span>;
  if (kind === "speaker") return <strong className={`primary-speaker ${className}`.trim()}>{record.text}</strong>;
  const parts = record.speaker ? { label: record.speaker, speech: record.text } : embeddedSpeaker(record.text);
  return <span className={`primary-speech ${className}`.trim()}>{parts && <strong className="primary-speaker">{parts.label}</strong>}{parts?.speech ?? record.text}</span>;
}
