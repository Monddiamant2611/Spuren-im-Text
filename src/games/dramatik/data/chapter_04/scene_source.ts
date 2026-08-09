import source from "../primary-sources/romeo-juliet-act-5-scene-3-general-rehearsal.json";
export const generalRehearsalSource=source;
export const fixedStageDirections=source.filter((item)=>item.fragment_type==="stage_direction");
