import { describe, expect, it } from "vitest";
import { expandCSSVariables } from "../../services/cssVariableExpander";

describe("expandCSSVariables", () => {
  it("expands simple var() references", () => {
    const css = `
      #easymd { --easymd-font-size: 14px; --easymd-text-color: #333; }
      #easymd p { font-size: var(--easymd-font-size); color: var(--easymd-text-color); }
    `;
    const result = expandCSSVariables(css);

    expect(result).toContain("font-size: 14px");
    expect(result).toContain("color: #333");
    expect(result).not.toContain("var(--easymd-font-size)");
    expect(result).not.toContain("var(--easymd-text-color)");
  });

  it("removes custom property declarations", () => {
    const css = `
      #easymd { --easymd-font-size: 14px; font-family: serif; }
      #easymd p { font-size: var(--easymd-font-size); }
    `;
    const result = expandCSSVariables(css);

    expect(result).not.toMatch(/--easymd-font-size\s*:/);
    expect(result).toContain("font-family: serif");
    expect(result).toContain("font-size: 14px");
  });

  it("removes empty rule blocks after stripping declarations", () => {
    const css = `
      #easymd { --easymd-font-size: 14px; }
      #easymd p { font-size: var(--easymd-font-size); }
    `;
    const result = expandCSSVariables(css);

    // 只含变量声明的规则块应被移除
    expect(result).not.toMatch(/#easymd\s*\{\s*\}/);
    expect(result).toContain("font-size: 14px");
  });

  it("handles var() with fallback", () => {
    const css = `
      #easymd p { color: var(--undefined-var, #999); }
    `;
    const result = expandCSSVariables(css);

    expect(result).toContain("color: #999");
    expect(result).not.toContain("var(");
  });

  it("resolves chained variable references", () => {
    const css = `
      #easymd { --a: 16px; --b: var(--a); }
      #easymd p { font-size: var(--b); }
    `;
    const result = expandCSSVariables(css);

    expect(result).toContain("font-size: 16px");
    expect(result).not.toContain("var(");
  });

  it("falls back on circular variable references", () => {
    const css = `
      #easymd { --a: var(--b); --b: var(--a); }
      #easymd p { color: var(--a, #fallback); }
    `;
    const result = expandCSSVariables(css);

    expect(result).toContain("color: #fallback");
    expect(result).not.toContain("var(--a");
    expect(result).not.toContain("var(--b");
  });

  it("returns css unchanged when no var() present", () => {
    const css = "#easymd p { font-size: 14px; color: #333; }";
    expect(expandCSSVariables(css)).toBe(css);
  });

  it("returns empty string for empty input", () => {
    expect(expandCSSVariables("")).toBe("");
  });

  it("handles rgba and complex values", () => {
    const css = `
      #easymd { --easymd-primary: #1677ff; --easymd-primary-20: rgba(22, 119, 255, 0.12); }
      #easymd strong { background: var(--easymd-primary-20); color: var(--easymd-primary); }
    `;
    const result = expandCSSVariables(css);

    expect(result).toContain("background: rgba(22, 119, 255, 0.12)");
    expect(result).toContain("color: #1677ff");
    expect(result).not.toContain("var(");
  });

  it("handles nested var() in fallback", () => {
    const css = `
      #easymd { --easymd-primary: blue; }
      #easymd a { color: var(--missing, var(--easymd-primary)); }
    `;
    const result = expandCSSVariables(css);

    expect(result).toContain("color: blue");
    expect(result).not.toContain("var(");
  });

  it("preserves non-variable properties in mixed rule blocks", () => {
    const css = `
      #easymd { --easymd-font-size: 14px; padding: 0 8px; color: #333; overflow-wrap: break-word; }
    `;
    const result = expandCSSVariables(css);

    expect(result).toContain("padding: 0 8px");
    expect(result).toContain("color: #333");
    expect(result).toContain("overflow-wrap: break-word");
    expect(result).not.toMatch(/--easymd-font-size\s*:/);
  });
});
