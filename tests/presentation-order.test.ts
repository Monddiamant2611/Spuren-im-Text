import { describe, expect, it } from "vitest";
import { stablePresentationOrder, stablePresentationOrderBy } from "../src/core/interactions/presentation_order";

const cards = [
  { id: "card-a", target: "zone-a" },
  { id: "card-b", target: "zone-b" },
  { id: "card-c", target: "zone-c" },
  { id: "card-d", target: "zone-d" },
];

describe("stable presentation order", () => {
  it("separates visible order from semantic source order", () => {
    const presented = stablePresentationOrder(cards, "matching-example");
    expect(presented.map((card) => card.id)).not.toEqual(cards.map((card) => card.id));
    expect(new Set(presented.map((card) => card.id))).toEqual(new Set(cards.map((card) => card.id)));
  });

  it("stays stable across rerenders and feedback updates", () => {
    const first = stablePresentationOrder(cards, "stable-attempt");
    const rerender = stablePresentationOrder(cards, "stable-attempt");
    expect(rerender).toEqual(first);
  });

  it("can create another order for a new attempt key", () => {
    const knownOrders = new Set(
      Array.from({ length: 12 }, (_, attempt) =>
        stablePresentationOrder(cards, `attempt-${attempt}`).map((card) => card.id).join(","),
      ),
    );
    expect(knownOrders.size).toBeGreaterThan(1);
  });

  it("keeps correctness attached to ids rather than indices", () => {
    const presented = stablePresentationOrder(cards, "semantic-matching");
    const assignments = Object.fromEntries(presented.map((card) => [card.id, card.target]));
    expect(cards.every((card) => assignments[card.id] === card.target)).toBe(true);
  });

  it("supports option types whose semantic id uses another field", () => {
    const options = [
      { value: "observation", label: "Beobachtung" },
      { value: "analysis", label: "Analyse" },
      { value: "effect", label: "Wirkung" },
    ];
    const presented = stablePresentationOrderBy(options, "choice-example", (option) => option.value);
    expect(presented.map((option) => option.value)).not.toEqual(options.map((option) => option.value));
  });
});
