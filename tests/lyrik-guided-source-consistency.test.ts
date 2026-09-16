import {describe,expect,it} from "vitest";
import {guidedChapters} from "../src/games/lyrik/data/guidedAnalysis";
import {studentGuidedChapters} from "../src/games/lyrik/data/releasePolicy";
import {canonicalPoems} from "../src/games/lyrik/data/texts/canonicalPoems";

const normalize=(value:string)=>value
 .toLocaleLowerCase("de-DE")
 .normalize("NFKC")
 .replace(/[’‘`´]/g,"'")
 .replace(/[^\p{L}\p{N}]+/gu," ")
 .trim();

const excerptFor=(step:{material:{text:string;sourceVerseStart?:number;sourceVerseEnd?:number}})=>{
 const lines=step.material.text.split("\n").filter(Boolean);
 return lines.slice((step.material.sourceVerseStart??1)-1,step.material.sourceVerseEnd).join("\n");
};

describe("Gemeinsam: kanonische Textgrundlage und Aufgabenbezug",()=>{
 it("weist alle 38 Schritte einem expliziten kanonischen Ausschnitt zu",()=>{
  const steps=guidedChapters.flat();
  expect(steps).toHaveLength(38);
  for(const step of steps){
   const poem=canonicalPoems.find(item=>item.id===step.material.poemId);
   expect(poem,step.id).toBeDefined();
   expect(step.material.sourceVerseStart,step.id).toBeGreaterThanOrEqual(1);
   expect(step.material.sourceVerseEnd,step.id).toBeGreaterThanOrEqual(step.material.sourceVerseStart!);
   if(poem!.canonicalText)expect(normalize(String(poem!.canonicalText)),step.id).toContain(normalize(excerptFor(step)));
   else expect(studentGuidedChapters.flat().some(candidate=>candidate.id===step.id),step.id).toBe(false);
  }
 });

 it("enthält jedes als Direktzitat markierte Textsignal im gezeigten Ausschnitt",()=>{
  for(const step of studentGuidedChapters.flat()){
   const displayed=normalize(excerptFor(step));
   const content=[step.instruction,step.solution,step.feedback,...(step.options?.map(option=>option.label)??[])].join(" ");
   const quotes=[...content.matchAll(/„([^“]+)“/g)].flatMap(match=>match[1].split("/")).map(normalize).filter(Boolean);
   for(const quote of quotes)expect(displayed,`${step.id}: „${quote}“`).toContain(quote);
  }
 });

 it("sichert Verszahl, Reimpaare und Reimschema in Kapitel 3",()=>{
  const [count,pairs,scheme]=studentGuidedChapters[2];
  expect(excerptFor(count).split("\n")).toHaveLength(8);
  expect(pairs.correct?.map(id=>pairs.options?.find(option=>option.id===id)?.label)).toEqual(["Wolkenschein / klein","Untergang / entlang"]);
  expect(scheme.options?.find(option=>option.id===scheme.correct?.[0])?.label).toBe("abba");
 });
});
