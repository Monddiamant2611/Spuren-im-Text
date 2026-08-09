import { describe, expect, it } from "vitest";
import { validatePrimarySource } from "../src/core/content/validation";
import type { PrimarySourceRecord } from "../src/core/content/types";

describe("content schema", () => {
  it("accepts the protected primary-source shape", () => {
    const record: PrimarySourceRecord = { id: "editorial-fixture", work: "", author: "", translation: "", act: "", scene: "", source: "", source_location: "", text: "", text_origin: "primary_source", editable: false, source_verified: false };
    expect(validatePrimarySource(record)).toEqual([]);
  });
  it("rejects editable primary sources", () => {
    const record = { id: "x", work: "", author: "", translation: "", act: "", scene: "", source: "", source_location: "", text: "", text_origin: "primary_source", editable: true, source_verified: false } as unknown as PrimarySourceRecord;
    expect(validatePrimarySource(record)).toContain("primary sources must not be editable");
  });
});
