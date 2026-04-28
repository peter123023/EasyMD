import { describe, expect, it } from "vitest";
import { defaultVariables } from "../../components/Theme/ThemeDesigner/defaults";
import { generateVariables } from "../../components/Theme/ThemeDesigner/generators/variables";

describe("theme designer variables generator", () => {
  it("keeps page padding on #easymd root for live preview", () => {
    const css = generateVariables(defaultVariables, "PingFang SC, sans-serif");

    expect(css).toContain("--easymd-page-padding: 8px;");
    expect(css).toContain("padding: 0 var(--easymd-page-padding);");
    expect(css).not.toContain("#easymd > *");
  });
});
