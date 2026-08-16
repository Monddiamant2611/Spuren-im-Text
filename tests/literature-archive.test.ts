import { describe, expect, it } from "vitest";
import { glossaryById, glossaryEntries } from "../src/features/literature-archive/data/glossary";
import { getAsset, literatureArchiveAssetGroups } from "../src/core/assets/manifest";
describe("literature archive foundations", () => {
  it("keeps three didactic definitions separate from task solutions", () => { expect(glossaryEntries).toHaveLength(3); expect(glossaryById.ambiguitaet.shortDefinition).toBe("Fachbegriff für Mehrdeutigkeit."); expect(glossaryEntries.every((entry) => !entry.explanation.includes("typisch für"))).toBe(true); });
  it("groups only real manifest assets", () => { const ids = Object.values(literatureArchiveAssetGroups).flat(); expect(ids).toHaveLength(3); expect(ids.every((id) => getAsset(id))).toBe(true); });
});
