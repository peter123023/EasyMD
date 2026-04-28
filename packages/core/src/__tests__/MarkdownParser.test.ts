import { describe, expect, it } from "vitest";
import { createMarkdownParser } from "../MarkdownParser";

describe("MarkdownParser code block", () => {
  it("默认不输出 mac-sign 结构", () => {
    const parser = createMarkdownParser();
    const html = parser.render("```ts\nconst a = 1;\n```");

    expect(html).toContain('<pre class="custom">');
    expect(html).not.toContain('<span class="mac-sign"');
    expect(html).not.toContain("<svg");
  });

  it("显式开启后输出 md 风格的 mac-sign 结构", () => {
    const parser = createMarkdownParser({ showMacBar: true });
    const html = parser.render("```ts\nconst a = 1;\n```");

    expect(html).toContain('<pre class="custom">');
    expect(html).toContain('<span class="mac-sign"');
    expect(html).toContain("<svg");
    expect(html).toMatch(/<pre[^>]*>\s*<span[^>]*>[\s\S]*<\/span>\s*<code/i);
    expect(html).not.toMatch(/<code[^>]*>[\s\S]*<svg/i);
  });
});
