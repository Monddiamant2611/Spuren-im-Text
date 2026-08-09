import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const directory = join(process.cwd(), "src/games/dramatik/data/primary-sources");
const manifest = JSON.parse(readFileSync(join(directory, "integrity-manifest.json"), "utf8")) as Record<string, string>;

describe("primary-source integrity", () => {
  it("contains exactly the editorially registered JSON files with matching SHA-256 hashes", () => {
    const files = readdirSync(directory).filter((file) => file.endsWith(".json") && file !== "integrity-manifest.json").sort();
    expect(files).toEqual(Object.keys(manifest).sort());
    for (const file of files) expect(createHash("sha256").update(readFileSync(join(directory, file))).digest("hex")).toBe(manifest[file]);
  });
  it("keeps every editorial fragment byte-exact at content level", () => {
    const records = JSON.parse(readFileSync(join(directory, "romeo-juliet-act-5-scene-1-fragments.json"), "utf8")) as Array<{ id: string; text: string }>;
    expect(records.map((item) => [item.id, item.text])).toEqual([
      ["fragment_a", "Mantua. Eine Straße."],
      ["fragment_b", "(Romeo tritt auf.)"],
      ["fragment_c", "Romeo."],
      ["fragment_d", "Darf ich dem holden Tod des Schlafes traun,"],
      ["fragment_e", "(Balthasar tritt auf.)"],
      ["fragment_f", "Bringst du vom Pater keine Briefe mit?"],
      ["fragment_g_speaker", "Balthasar."],
      ["fragment_g_speech", "Nein, bester Herr."],
      ["fragment_h", "(Balthasar ab.)"],
    ]);
    expect(records.some((item) => item.text.includes("trauen"))).toBe(false);
  });
  it("keeps the editorially released general-rehearsal passage exact", () => {
    const records = JSON.parse(readFileSync(join(directory, "romeo-juliet-act-5-scene-3-general-rehearsal.json"), "utf8")) as Array<{id:string;text:string;editable:boolean;source_verified:boolean}>;
    expect(records.find((item)=>item.id==="c04_paris_rejects")?.text).toBe("Ich kümmre mich um dein Beschwören nicht,\nUnd greife dich als Missethäter hier.");
    expect(records.find((item)=>item.id==="c04_stage_fight")?.text).toBe("(Sie fechten.)");
    expect(records.every((item)=>item.editable===false&&item.source_verified===true)).toBe(true);
  });
});
