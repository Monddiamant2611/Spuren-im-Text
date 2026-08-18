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
  it("protects the Wieland EPUB and every chapter-1 excerpt", () => {
    const epub = readFileSync(join(process.cwd(), "docs/sources/william-shakespeare-romeo-und-juliette.epub"));
    expect(createHash("sha256").update(epub).digest("hex")).toBe("7296626b9fd0b75694dea9384bd2477ab6cc06715d0764fed9f9f988a5b475e0");
    const records = JSON.parse(readFileSync(join(directory, "romeo-juliette-wieland-chapter-01.json"), "utf8")) as Array<{text:string;source:string;translation:string;editable:boolean;source_verified:boolean}>;
    expect(records.map(item=>item.text)).toEqual([
      "Eine Strasse in Verona.",
      "Sampson und Gregorio, zween Bediente der Capulets, treten mit Schwerdtern und Schilden bewaffnet auf, und ermuntern einander sich tapfer gegen die Montägues zu halten; ihre ganze Unterredung ist ein Gewebe von Wortspielen, Doppelsinn und Zoten.",
      "Sampson. Sey ohne Sorge, ich will stehen wie eine Mauer; aber es ist doch das Sicherste, wenn wir das Gesez auf unsrer Seite haben; wir wollen sie anfangen lassen.",
      "Gregorio. Ich will die Nase rümpfen, indem ich bey ihnen vorbeygehe; sie mögen's dann aufnehmen, wie sie es verstehen.",
      "Sampson. Oder wie sie das Herz dazu haben. Ich will meinen Daumen gegen sie beissen, welches eine Beschimpfung für sie ist, wenn sie's leiden.",
      "Capulet, Paris, und ein Bedienter treten auf.",
      "Capulet. Montague ist so gut gebunden als ich; er hat die nemliche Straffe zu befürchten; und für alte Leute wie wir sind, sollt' es nicht schwer seyn, Frieden zu halten.",
      "Paris. Ihr seyd beyde rechtschaffne Männer, und es ist recht zu bedauren, daß ihr so lang in Mißhelligkeit gelebt habt – – Aber nun, gnädiger Herr, was sagt ihr zu meiner Anwerbung?",
      "Capulet. Ich kann euch nichts anders sagen, als was ich schon gesagt habe: Mein Kind ist noch ein neu angekommener Fremdling in der Welt, sie hat noch nicht vierzehn Jahre gesehen; laßt wenigstens noch zween Sommer verblühen, eh wir denken können, daß sie zum Braut-Stande reif sey.",
      "Paris. Jüngere als sie, sind schon glükliche Mütter geworden.",
    ]);
    expect(records.every(item=>item.source==="docs/sources/william-shakespeare-romeo-und-juliette.epub"&&item.translation==="Christoph Martin Wieland"&&item.editable===false&&item.source_verified===true)).toBe(true);
  });
  it("protects every chapter-2 excerpt and its EPUB provenance", () => {
    const records = JSON.parse(readFileSync(join(directory, "romeo-juliette-wieland-chapter-02.json"), "utf8")) as Array<{id:string;text:string;source:string;source_location:string;translation:string;editable:boolean;source_verified:boolean}>;
    expect(records).toHaveLength(15);
    expect(records.find(item=>item.id==="c02_main_juliette_answer")?.text).toBe("Juliette. Ich will ihn erst genauer betrachten; alles was ich izt sagen kan, ist, daß meine Augen allezeit durch euern Willen geleitet werden sollen.");
    expect(records.find(item=>item.id==="c02_transfer_juliette_distinction")?.text).toBe("Juliette. Nicht stolz darauf, daß ihr es gethan habt, aber doch dankbar; stolz kan ich nicht seyn auf etwas das ich hasse, aber dankbar, selbst für etwas Böses das eure Liebe gut gemeynt hat.");
    expect(records.every(item=>item.source==="docs/sources/william-shakespeare-romeo-und-juliette.epub"&&/^OEBPS\/chapter-(0005|0021)\.xhtml/.test(item.source_location)&&item.translation==="Christoph Martin Wieland"&&item.editable===false&&item.source_verified===true)).toBe(true);
  });
  it("protects every chapter-3 dialogue excerpt and its EPUB provenance", () => {
    const records = JSON.parse(readFileSync(join(directory, "romeo-juliette-wieland-chapter-03.json"), "utf8")) as Array<{id:string;text:string;source:string;source_location:string;translation:string;editable:boolean;source_verified:boolean}>;
    expect(records).toHaveLength(23);
    expect(records.find(item=>item.id==="c03_main_fight")?.text).toBe("(Mercutio und Tybalt fechten.)");
    expect(records.find(item=>item.id==="c03_transfer_juliette_question")?.text).toBe("Juliette. Wer bist du, der hier, in Nacht gehüllt, mein einsames Selbstgespräche belauscht?");
    expect(records.every(item=>item.source==="docs/sources/william-shakespeare-romeo-und-juliette.epub"&&/^OEBPS\/chapter-(0009|0014)\.xhtml/.test(item.source_location)&&item.translation==="Christoph Martin Wieland"&&item.editable===false&&item.source_verified===true)).toBe(true);
  });
  it("protects every chapter-4 conflict excerpt and its EPUB provenance", () => {
    const records = JSON.parse(readFileSync(join(directory, "romeo-juliette-wieland-chapter-04.json"), "utf8")) as Array<{id:string;text:string;source:string;source_location:string;translation:string;editable:boolean;source_verified:boolean}>;
    expect(records).toHaveLength(14);
    expect(records.find(item=>item.id==="c04_tomb_fight")?.text).toBe("(Sie fechten. Paris fällt.)");
    expect(records.find(item=>item.id==="c04_juliet_execution")?.text).toBe("(Sie trinkt die Phiole aus, und wirft sich auf ihr Bette.)");
    expect(records.every(item=>item.source==="docs/sources/william-shakespeare-romeo-und-juliette.epub"&&/^OEBPS\/chapter-(0024|0030)\.xhtml/.test(item.source_location)&&item.translation==="Christoph Martin Wieland"&&item.editable===false&&item.source_verified===true)).toBe(true);
  });
  it("protects every chapter-5 transfer excerpt and its exact XHTML provenance", () => {
    const records = JSON.parse(readFileSync(join(directory, "romeo-juliette-wieland-chapter-05.json"), "utf8")) as Array<{id:string;text:string;source:string;source_location:string;translation:string;editable:boolean;source_verified:boolean}>;
    expect(records).toHaveLength(8);
    expect(records.find(item=>item.id==="c05_transfer_apothecary_decision")?.text).toBe("Apotheker. Meine Dürftigkeit williget ein, nicht mein Wille.");
    expect(records.find(item=>item.id==="c05_transfer_gold_poison")?.text).toContain("Ich habe dir Gift verkauft, nicht du mir");
    expect(records.every(item=>item.source==="docs/sources/william-shakespeare-romeo-und-juliette.epub"&&item.source_location==="OEBPS/chapter-0027.xhtml, Erste Scene"&&item.translation==="Christoph Martin Wieland"&&item.editable===false&&item.source_verified===true)).toBe(true);
  });
});
