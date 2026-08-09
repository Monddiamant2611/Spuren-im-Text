import type { InteractionResult } from "./contracts";

export type CausalRole = "cause" | "effect" | "cause_and_effect";
export interface CausalEvent { id:string; predecessors:readonly string[]; successors:readonly string[]; }
export interface CausalConnection { from:string; to:string; }
export interface CausalChainCallbacks { onFeedback?:(result:InteractionResult<CausalConnection>)=>void; onComplete?:(connections:readonly CausalConnection[])=>void; }

export class GenericCausalChainEngine<T extends CausalEvent> {
  private connections:CausalConnection[]=[];
  constructor(private readonly events:readonly T[],private readonly callbacks:CausalChainCallbacks={}){}
  evaluate(input:CausalConnection):InteractionResult<CausalConnection>{
    const from=this.events.find((item)=>item.id===input.from);const to=this.events.find((item)=>item.id===input.to);
    const valid=Boolean(from&&to&&from.successors.includes(to.id)&&to.predecessors.includes(from.id));
    if(valid&&!this.connections.some((item)=>item.from===input.from&&item.to===input.to))this.connections=[...this.connections,input];
    const result={valid,value:input,feedbackKey:valid?"correct":"causal_connection_wrong"};this.callbacks.onFeedback?.(result);if(this.isComplete())this.callbacks.onComplete?.(this.getConnections());return result;
  }
  validateOrder(orderedIds:readonly string[]){const valid=orderedIds.length===this.events.length&&orderedIds.every((id,index)=>this.events[index]?.id===id);return{valid,value:[...orderedIds],feedbackKey:valid?"correct":"causal_order_wrong"};}
  getRole(eventId:string):CausalRole{const hasBefore=this.connections.some((item)=>item.to===eventId);const hasAfter=this.connections.some((item)=>item.from===eventId);return hasBefore&&hasAfter?"cause_and_effect":hasAfter?"cause":"effect";}
  restore(connections:readonly CausalConnection[]){this.connections=[...connections];}
  getConnections(){return this.connections.map((item)=>({...item}));}
  isComplete(){return this.events.slice(0,-1).every((item)=>this.connections.some((connection)=>connection.from===item.id&&item.successors.includes(connection.to)));}
  reset(){this.connections=[];}
}
