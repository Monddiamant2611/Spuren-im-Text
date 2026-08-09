import { GenericDragDropEngine } from "../../../core/interactions/drag_drop_engine";
import { chapter01Fragments, directionChecks, informationCards, type FragmentType } from "../data/chapter_01_content";

export type Chapter01Round = 1 | 2 | 3 | 4 | 5;
export interface CompetencyEvent { competency: "text_structure" | "stage_direction" | "speaker_assignment" | "scene_orientation" | "information_state"; success: boolean; round: Chapter01Round; }
export interface Chapter01Session { round: Chapter01Round; restoredIds: string[]; assignments: Record<string, string>; informationAssignments: Record<string, string>; balthasarVisible: boolean; checkIndex: number; completed: boolean; failedAttempts: number; competencyEvents: CompetencyEvent[]; }

export const initialChapter01Session: Chapter01Session = { round: 1, restoredIds: [], assignments: {}, informationAssignments: {}, balthasarVisible: false, checkIndex: 0, completed: false, failedAttempts: 0, competencyEvents: [] };

function event(session: Chapter01Session, competency: CompetencyEvent["competency"], success: boolean): Chapter01Session { return { ...session, failedAttempts: session.failedAttempts + (success ? 0 : 1), competencyEvents: [...session.competencyEvents, { competency, success, round: session.round }] }; }

export function placeRound1(session: Chapter01Session, fragmentId: string, targetId: FragmentType): { session: Chapter01Session; valid: boolean } {
  const fragment = chapter01Fragments.find((item) => item.id === fragmentId);
  if (!fragment?.fragment_type) return { session, valid: false };
  const items = chapter01Fragments.filter((item) => ["fragment_a","fragment_b","fragment_c","fragment_d"].includes(item.id)).map((item) => ({ id: item.id, targetId: item.fragment_type! }));
  const engine = new GenericDragDropEngine(items); engine.restore(session.assignments);
  const result = engine.evaluate({ item: { id: fragment.id, targetId: fragment.fragment_type }, targetId });
  let next = event({ ...session, assignments: engine.getAssignments(), restoredIds: result.valid ? [...new Set([...session.restoredIds, fragment.id])] : session.restoredIds }, targetId === "scene_location" ? "scene_orientation" : targetId === "speaker" ? "speaker_assignment" : targetId === "stage_direction" ? "stage_direction" : "text_structure", result.valid);
  if (engine.isComplete()) next = { ...next, round: 2 };
  return { session: next, valid: result.valid };
}

export function placeStageDirection(session: Chapter01Session, fragmentId: string): { session: Chapter01Session; valid: boolean } {
  const expected = session.round === 2 ? "fragment_e" : "fragment_h"; const valid = fragmentId === expected;
  let next = event(session, "stage_direction", valid);
  if (valid && session.round === 2) next = { ...next, round: 3, balthasarVisible: true, restoredIds: [...new Set([...next.restoredIds, fragmentId])] };
  if (valid && session.round === 3) next = { ...next, round: 4, balthasarVisible: false, restoredIds: [...new Set([...next.restoredIds, fragmentId])] };
  return { session: next, valid };
}

export function placeInformationCard(session: Chapter01Session, cardId: string, targetId: string): { session: Chapter01Session; valid: boolean } {
  const card = informationCards.find((item) => item.id === cardId); const valid = card?.target === targetId;
  let next = event({ ...session, informationAssignments: valid ? { ...session.informationAssignments, [cardId]: targetId } : session.informationAssignments }, "information_state", valid);
  if (informationCards.every((item) => next.informationAssignments[item.id] === item.target)) next = { ...next, round: 5 };
  return { session: next, valid };
}

export function checkManuscriptElement(session: Chapter01Session, fragmentType: FragmentType): { session: Chapter01Session; valid: boolean } {
  const valid = directionChecks[session.checkIndex]?.type === fragmentType;
  let next = event(session, fragmentType === "scene_location" ? "scene_orientation" : fragmentType === "speaker" ? "speaker_assignment" : fragmentType === "stage_direction" ? "stage_direction" : "text_structure", valid);
  if (valid) next = { ...next, checkIndex: session.checkIndex + 1, completed: session.checkIndex === directionChecks.length - 1 };
  return { session: next, valid };
}
