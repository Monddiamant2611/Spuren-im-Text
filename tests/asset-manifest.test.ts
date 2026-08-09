import { describe, expect, it } from "vitest";
import { assetManifest, validateAssetManifest } from "../src/core/assets/manifest";
describe("asset manifest", () => { it("has unique valid entries", () => expect(validateAssetManifest(assetManifest)).toEqual([])); });
