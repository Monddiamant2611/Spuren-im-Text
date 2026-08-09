import type { PrimarySourceRecord } from "./types";

const required = ["id", "work", "author", "translation", "source", "source_location", "text"] as const;

export function validatePrimarySource(record: PrimarySourceRecord): string[] {
  const errors = required.filter((key) => typeof record[key] !== "string").map((key) => `${key} must be a string`);
  if (!["string", "number"].includes(typeof record.act)) errors.push("act must be a string or number");
  if (!["string", "number"].includes(typeof record.scene)) errors.push("scene must be a string or number");
  if (record.text_origin !== "primary_source") errors.push("text_origin must be primary_source");
  if (record.editable !== false) errors.push("primary sources must not be editable");
  return errors;
}
