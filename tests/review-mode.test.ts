import {describe,expect,it} from "vitest";
import {reviewGroups,reviewTargetById,reviewTargets} from "../src/games/dramatik/review/reviewRegistry";

describe("interner Dramatik-Prüfmodus",()=>{
 it("registriert die tatsächlichen Kapitelrunden und eigene Abschlussansichten",()=>{
  const counts=[1,2,3,4,5].map(index=>reviewGroups.find(group=>group.id===`chapter_0${index}`)!.targets.length);
  expect(counts).toEqual([14,18,17,23,19]);
  for(const group of reviewGroups.filter(group=>group.id.startsWith("chapter_")))expect(group.targets.at(-1)).toMatchObject({completion:true});
 });
 it("registriert sechs Theaterzustände und alle vorhandenen Finalemodi",()=>{
  expect(reviewTargets.filter(target=>target.kind==="theatre")).toHaveLength(6);
  expect(reviewTargets.filter(target=>target.kind==="finale").map(target=>target.kind==="finale"&&target.mode)).toEqual(["welcome","review","synthesis","book","closing","complete"]);
 });
 it("fällt bei ungültigen Deep-Links kontrolliert auf die initiale Bühne zurück",()=>expect(reviewTargetById("nicht-vorhanden").id).toBe("theatre-initial"));
});
