import {describe,expect,it} from "vitest";
import {dramaGlossary} from "../src/games/dramatik/data/glossary";

const requiredTerms=["Situationsanalyse","Ort","Zeit","Figuren","Vorgeschichte","Bedingungen","Textbefund","Erschließung","direkte Charakterisierung","indirekte Charakterisierung","Selbstbild","Fremdbild","Ziel","Motiv","Interesse / Bedürfnis","Figurenkonstellation","Sprachhandlung","Gesprächsziel","Gesprächsinitiative","Reaktion","Gesprächsphase","Wirkung","Funktion","Wendepunkt","äußerer Konflikt","innerer Konflikt","Ursache","Folge","Wissensstand","Deutungshypothese","Textbeleg","Gegenbeleg","Interpretation","Argumentation","Rückbindung"];

describe("freiwillige Begriffskarten",()=>{
 it("decken alle verbindlichen Fachbegriffe ab",()=>{
  const terms=new Set(dramaGlossary.map(entry=>entry.term.toLocaleLowerCase("de")));
  for(const term of requiredTerms)expect(terms.has(term.toLocaleLowerCase("de")),term).toBe(true);
 });

 it("enthalten für jeden Begriff eine verständliche Definition",()=>{
  for(const entry of dramaGlossary){
   expect(entry.term.trim().length).toBeGreaterThan(2);
   expect(entry.definition.trim().length).toBeGreaterThan(15);
  }
 });
});
