import { describe, expect, it, vi } from "vitest";
import { GenericDragDropEngine } from "../src/core/interactions/drag_drop_engine";

describe("generic drag-drop engine", () => {
  it("supports feedback, completion, reset and input-independent assignments", () => { const feedback=vi.fn(); const complete=vi.fn(); const engine=new GenericDragDropEngine([{id:"a",targetId:"x"}],{onFeedback:feedback,onComplete:complete}); expect(engine.evaluate({item:{id:"a",targetId:"x"},targetId:"y"}).valid).toBe(false); expect(feedback).toHaveBeenCalled(); expect(engine.evaluate({item:{id:"a",targetId:"x"},targetId:"x"}).valid).toBe(true); expect(complete).toHaveBeenCalledWith({a:"x"}); engine.reset(); expect(engine.isComplete()).toBe(false); });
});
