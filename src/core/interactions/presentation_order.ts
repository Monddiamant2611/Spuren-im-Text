type Identifiable = { id: string };

const hash = (value: string) => {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
};

/** Stable display order; correctness remains tied to semantic ids. */
export function stablePresentationOrder<T extends Identifiable>(items: readonly T[], taskKey: string): T[] {
  if (items.length < 2) return [...items];
  const ordered = items
    .map((item) => ({ item, score: hash(`${taskKey}:${item.id}`) }))
    .sort((left, right) => left.score - right.score || left.item.id.localeCompare(right.item.id))
    .map(({ item }) => item);
  if (ordered.every((item, index) => item.id === items[index].id)) ordered.push(ordered.shift()!);
  return ordered;
}

export function stablePresentationOrderBy<T>(
  items: readonly T[],
  taskKey: string,
  identify: (item: T) => string,
): T[] {
  return stablePresentationOrder(
    items.map((item) => ({ id: identify(item), item })),
    taskKey,
  ).map(({ item }) => item);
}
