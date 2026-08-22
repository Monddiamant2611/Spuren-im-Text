import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PrimarySourceText } from "../src/shared/components/PrimarySourceText";

describe("primary-source presentation", () => {
  it("marks stage directions semantically without changing their text", () => {
    const text = "(Sie fechten. Paris fällt.)";
    const html = renderToStaticMarkup(<PrimarySourceText record={{ text, fragment_type: "stage_direction" }} />);
    expect(html).toContain('class="primary-stage-direction"');
    expect(html).toContain(text);
  });

  it("emphasizes only the embedded historical speaker label", () => {
    const text = "Romeo. Liebster Mercutio, stek dein Rapier ein.";
    const html = renderToStaticMarkup(<PrimarySourceText record={{ text, fragment_type: "speech" }} />);
    expect(html).toContain('<strong class="primary-speaker">Romeo.</strong>');
    expect(html).toContain(" Liebster Mercutio, stek dein Rapier ein.");
    expect(html.replace(/<[^>]+>/g, "")).toBe(text);
  });

  it("uses structured speaker metadata when it exists", () => {
    const html = renderToStaticMarkup(<PrimarySourceText record={{ text: "Willst du mich zwingen?", fragment_type: "speech", speaker: "Romeo" }} />);
    expect(html).toContain('<strong class="primary-speaker">Romeo</strong>');
    expect(html).toContain("Willst du mich zwingen?");
  });
});
