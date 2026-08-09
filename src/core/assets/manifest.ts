import type { AssetDefinition } from "./types";

// Phase 0 inventory: no image or audio assets were present in the repository.
export const assetManifest: readonly AssetDefinition[] = [];

export function validateAssetManifest(items: readonly AssetDefinition[]): string[] {
  const ids = new Set<string>(); const errors: string[] = [];
  for (const item of items) {
    if (ids.has(item.id)) errors.push(`duplicate asset id: ${item.id}`);
    ids.add(item.id);
    if (!item.path.startsWith("/assets/")) errors.push(`asset path must start with /assets/: ${item.id}`);
    if (!item.alt.trim()) errors.push(`asset alt text is required: ${item.id}`);
  }
  return errors;
}
