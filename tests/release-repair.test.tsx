import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { DramatikErrorBoundary, DramatikErrorFallback } from "../src/shared/components/DramatikErrorBoundary";
import { dramatikSource, dramatikSourceLabel } from "../src/games/dramatik/data/sources";

describe("release repair safeguards",()=>{
  it("uses the productive Wieland source without a Wikisource claim",()=>{expect(dramatikSource).toMatchObject({work:"Romeo und Juliette",translation:"Christoph Martin Wieland"});expect(JSON.stringify(dramatikSource)).not.toMatch(/Schlegel|Wikisource/);expect(dramatikSourceLabel).toContain("Christoph Martin Wieland")});
  it("renders an accessible non-technical error recovery",()=>{const recover=vi.fn();const html=renderToStaticMarkup(<DramatikErrorFallback onRecover={recover}/>);expect(html).toContain('role="alert"');expect(html).toContain("Zurück zum Theater");expect(html).not.toMatch(/stack|TypeError|ErrorInfo/);const boundary=new DramatikErrorBoundary({children:"Inhalt",onRecover:recover});boundary.state={hasError:true};expect(boundary.render()).toBeTruthy()});
});
