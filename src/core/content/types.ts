export type ContentOrigin = "primary_source" | "didactic" | "didactic_summary" | "interpretation";

export interface PrimarySourceRecord {
  id: string;
  work: string;
  author: string;
  translation: string;
  act: string | number;
  scene: string | number;
  source: string;
  source_location: string;
  text: string;
  text_origin: "primary_source";
  editable: false;
  source_verified: boolean;
  fragment_type?: "scene_location" | "stage_direction" | "speaker" | "speech";
  speaker?: string;
}

export interface LearningContentRecord {
  id: string;
  text_origin: Exclude<ContentOrigin, "primary_source">;
  text: string;
}

export function isPrimarySource(value: { text_origin: ContentOrigin }): value is PrimarySourceRecord {
  return value.text_origin === "primary_source";
}
