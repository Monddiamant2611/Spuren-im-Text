import { describe, expect, it, vi } from "vitest";
import { GenericCausalChainEngine } from "../src/core/interactions/causal_chain_engine";
const events=[{id:"a",predecessors:[],successors:["b"]},{id:"b",predecessors:["a"],successors:["c"]},{id:"c",predecessors:["b"],successors:[]}];
describe("generic causal chain engine",()=>{
 it("accepts the configured order",()=>expect(new GenericCausalChainEngine(events).validateOrder(["a","b","c"]).valid).toBe(true));
 it("rejects and then permits correction of a wrong link",()=>{const engine=new GenericCausalChainEngine(events);expect(engine.evaluate({from:"a",to:"c"}).valid).toBe(false);expect(engine.evaluate({from:"a",to:"b"}).valid).toBe(true)});
 it("recognizes a combined cause/effect role",()=>{const engine=new GenericCausalChainEngine(events);engine.evaluate({from:"a",to:"b"});engine.evaluate({from:"b",to:"c"});expect(engine.getRole("b")).toBe("cause_and_effect")});
 it("supports feedback, completion and reset callbacks",()=>{const feedback=vi.fn(),complete=vi.fn();const engine=new GenericCausalChainEngine(events,{onFeedback:feedback,onComplete:complete});engine.evaluate({from:"a",to:"b"});engine.evaluate({from:"b",to:"c"});expect(feedback).toHaveBeenCalledTimes(2);expect(complete).toHaveBeenCalledOnce();engine.reset();expect(engine.getConnections()).toEqual([])});
});
