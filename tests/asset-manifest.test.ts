import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { assetManifest, getAsset, resolveCharacterAsset, validateAssetManifest } from "../src/core/assets/manifest";
describe("asset manifest", () => {
 it("registers every supplied image with a unique valid entry",()=>{expect(assetManifest).toHaveLength(67);expect(validateAssetManifest(assetManifest)).toEqual([]);expect(assetManifest.every(item=>existsSync(resolve("public",decodeURI(item.path.replace("/assets/","assets/")))))).toBe(true)});
 it("resolves production backgrounds and character states",()=>{expect(getAsset("bg_tomb_stage")?.path).toContain("Bühne mit Gruftkulisse.png");expect(getAsset("bg_finale_restored")?.path).toContain("Finale helle");expect(resolveCharacterAsset("Balthasar","calm")?.id).toBe("character_balthasar_calm");expect(resolveCharacterAsset("Balthasar","urgent")?.id).toBe("character_balthasar_urgent")});
});
