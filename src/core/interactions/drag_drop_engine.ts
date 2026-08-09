import type { InteractionResult } from "./contracts";

export interface DragDropItem { id: string; targetId: string; }
export interface DragDropCallbacks<T extends DragDropItem> { onFeedback?: (result: InteractionResult<T>) => void; onComplete?: (assignments: Readonly<Record<string, string>>) => void; }

export class GenericDragDropEngine<T extends DragDropItem> {
  private assignments: Record<string, string> = {};
  constructor(private readonly items: readonly T[], private readonly callbacks: DragDropCallbacks<T> = {}) {}
  evaluate(input: { item: T; targetId: string }): InteractionResult<T> {
    const valid = input.item.targetId === input.targetId;
    const result = { valid, value: input.item, feedbackKey: valid ? "correct" : input.targetId };
    if (valid) this.assignments[input.item.id] = input.targetId;
    this.callbacks.onFeedback?.(result);
    if (this.isComplete()) this.callbacks.onComplete?.({ ...this.assignments });
    return result;
  }
  restore(assignments: Readonly<Record<string, string>>) { this.assignments = { ...assignments }; }
  getAssignments() { return { ...this.assignments }; }
  isComplete() { return this.items.every((item) => this.assignments[item.id] === item.targetId); }
  reset() { this.assignments = {}; }
}
