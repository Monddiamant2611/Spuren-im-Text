export function hydrateSession<T extends { round: number }>(value: unknown, initial: T, maxRound: number): T {
  if (!isRecord(value)) return structuredClone(initial);
  const hydrated = { ...structuredClone(initial), ...value } as T;
  const mutable = hydrated as Record<string, unknown>;
  for (const [key, fallback] of Object.entries(initial)) {
    const current = mutable[key];
    if (Array.isArray(fallback) && !Array.isArray(current)) mutable[key] = structuredClone(fallback);
    else if (isRecord(fallback) && !isRecord(current)) mutable[key] = structuredClone(fallback);
    else if (!Array.isArray(fallback) && !isRecord(fallback) && typeof current !== typeof fallback) mutable[key] = fallback;
  }
  const round = hydrated.round;
  if (typeof round !== "number" || !Number.isInteger(round) || round < 1 || round > maxRound) hydrated.round = initial.round;
  return hydrated;
}

function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
