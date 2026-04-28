import { describe, expect, it } from "vitest";
import { processHtml } from "@easymd/core";
import {
  applyLightRootVars,
  resolveInlineStyleVariablesForCopy,
} from "../../services/inlineStyleVarResolver";
import { normalizeCopyContainer } from "../../services/wechatCopyService";
import { defaultVariables } from "../../components/Theme/ThemeDesigner/defaults";
import { generateCSS } from "../../components/Theme/ThemeDesigner/generateCSS";

describe("wechat copy css integration", () => {
  it("resolves inline var() values with scope-aware computed values", () => {
    const html = "<p>段落</p>";
    const css = `
      #easymd {
        --easymd-font-size: 14px;
        --easymd-text-color: #123456;
        --easymd-paragraph-margin: 18px;
      }
      #easymd p {
        font-size: var(--easymd-font-size);
        color: var(--easymd-text-color);
        margin: var(--easymd-paragraph-margin) 0;
      }
    `;

    const output = resolveInlineStyleVariablesForCopy(
      processHtml(html, css, true, true),
    );

    const container = document.createElement("div");
    container.innerHTML = output;
    const paragraph = container.querySelector("p");

    expect(paragraph).toBeTruthy();
    expect(paragraph!.style.fontSize).toBe("14px");
    expect(paragraph!.style.color).toBe("rgb(18, 52, 86)");
    expect(paragraph!.style.marginTop).toBe("18px");
    expect(paragraph!.style.marginBottom).toBe("18px");
    expect(output).toContain("margin-top: 18px;");
    expect(output).toContain("margin-bottom: 18px;");
    expect(output).not.toContain("var(--easymd-font-size)");
    expect(output).not.toContain("var(--easymd-text-color)");
    expect(output).not.toContain("var(--easymd-paragraph-margin)");
  });

  it("keeps literal var() text inside quoted string values", () => {
    const html = "<p>段落</p>";
    const css = `
      #easymd p {
        font-family: "var(--fake-family)";
        color: var(--easymd-text-color, #222222);
      }
    `;

    const output = resolveInlineStyleVariablesForCopy(
      processHtml(html, css, true, true),
    );
    const container = document.createElement("div");
    container.innerHTML = output;
    const paragraph = container.querySelector("p");

    expect(paragraph).toBeTruthy();
    expect(paragraph!.style.fontFamily).toContain("var(--fake-family)");
    expect(paragraph!.style.color).toBe("rgb(34, 34, 34)");
  });

  it("resolves same custom property name based on local scope", () => {
    const html = `<p>root</p><blockquote><p>quote</p></blockquote>`;
    const css = `
      #easymd {
        --text-color: #111111;
      }
      #easymd p {
        color: var(--text-color);
      }
      #easymd blockquote {
        --text-color: #222222;
      }
    `;

    const output = resolveInlineStyleVariablesForCopy(
      processHtml(html, css, true, true),
    );
    const container = document.createElement("div");
    container.innerHTML = output;
    const paragraphs = container.querySelectorAll("p");

    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0].style.color).toBe("rgb(17, 17, 17)");
    expect(paragraphs[1].style.color).toBe("rgb(34, 34, 34)");
    expect(output).not.toContain("var(--text-color)");
  });

  it("falls back when circular custom properties cannot be resolved", () => {
    const html = "<p>段落</p>";
    const css = `
      #easymd {
        --a: var(--b);
        --b: var(--a);
      }
      #easymd p {
        color: var(--a, #334455);
        background-color: var(--missing-bg, #fafafa);
      }
    `;

    const output = resolveInlineStyleVariablesForCopy(
      processHtml(html, css, true, true),
    );
    const container = document.createElement("div");
    container.innerHTML = output;
    const paragraph = container.querySelector("p");

    expect(paragraph).toBeTruthy();
    expect(paragraph!.style.color).toBe("rgb(51, 68, 85)");
    expect(paragraph!.style.backgroundColor).toBe("rgb(250, 250, 250)");
    expect(output).not.toContain("var(--a");
    expect(output).not.toContain("var(--b");
    expect(output).not.toMatch(/--(?:a|b)\s*:/);
  });

  it("does not read runtime global css variables outside copy content", () => {
    document.documentElement.style.setProperty(
      "--external-text-color",
      "#d4d4d4",
    );
    try {
      const html = "<p>段落</p>";
      const css = `
        #easymd p {
          color: var(--external-text-color, #111111);
        }
      `;

      const output = resolveInlineStyleVariablesForCopy(
        processHtml(html, css, true, true),
      );
      const container = document.createElement("div");
      container.innerHTML = output;
      const paragraph = container.querySelector("p");

      expect(paragraph).toBeTruthy();
      expect(paragraph!.style.color).toBe("rgb(17, 17, 17)");
      expect(paragraph!.style.color).not.toBe("rgb(212, 212, 212)");
    } finally {
      document.documentElement.style.removeProperty("--external-text-color");
    }
  });

  it("injects light ui token baseline into copy host", () => {
    const host = document.createElement("div");
    applyLightRootVars(host);

    expect(host.style.getPropertyValue("--text-primary").trim()).toBe(
      "#0f172a",
    );
    expect(host.style.getPropertyValue("--border-light").trim()).toBe(
      "#e2e8f0",
    );
    expect(host.style.getPropertyValue("--bg-primary").trim()).toBe("#ffffff");
  });

  it("materializes visual theme styles without remaining css variables", () => {
    const html = `
      <h2><span class="content">标题</span></h2>
      <p>正文段落</p>
      <blockquote><p>引用内容</p></blockquote>
      <ul><li>列表项</li></ul>
    `;
    const css = generateCSS(defaultVariables);

    const output = resolveInlineStyleVariablesForCopy(
      processHtml(html, css, true, true),
    );
    const container = document.createElement("div");
    container.innerHTML = output;
    const paragraph = container.querySelector("p");
    const heading = container.querySelector("h2 .content");

    expect(paragraph).toBeTruthy();
    expect(heading).toBeTruthy();
    expect(paragraph!.style.fontSize).toBeTruthy();
    expect(paragraph!.style.lineHeight).toBeTruthy();
    expect(heading!.getAttribute("style")).toContain("font-size");
    expect(output).not.toContain("var(--easymd-");
    expect(output).not.toMatch(/--easymd-[\w-]+\s*:/);
  });

  it("relocates horizontal page padding in full pipeline", () => {
    const html = "<p>段落</p><h2><span class='content'>标题</span></h2>";
    const css = generateCSS({
      ...defaultVariables,
      pagePadding: 48,
    });

    const resolved = resolveInlineStyleVariablesForCopy(
      processHtml(html, css, true, true),
    );
    const container = document.createElement("div");
    container.innerHTML = resolved;

    normalizeCopyContainer(container);

    const paragraph = container.querySelector("p") as HTMLElement | null;
    const heading = container.querySelector("h2") as HTMLElement | null;
    expect(paragraph).toBeTruthy();
    expect(heading).toBeTruthy();
    expect(paragraph!.style.paddingLeft).toBe("48px");
    expect(paragraph!.style.paddingRight).toBe("48px");
    expect(heading!.style.marginLeft).toBe("48px");
    expect(heading!.style.marginRight).toBe("48px");
    expect(heading!.style.paddingLeft).not.toBe("48px");
    expect(heading!.style.paddingRight).not.toBe("48px");
  });

  it("relocates horizontal page padding to hr in full pipeline", () => {
    const html = "<p>段落</p><hr />";
    const css = generateCSS({
      ...defaultVariables,
      pagePadding: 48,
    });

    const resolved = resolveInlineStyleVariablesForCopy(
      processHtml(html, css, true, true),
    );
    const container = document.createElement("div");
    container.innerHTML = resolved;

    normalizeCopyContainer(container);

    const hr = container.querySelector("hr") as HTMLElement | null;
    expect(hr).toBeTruthy();
    expect(hr!.style.marginLeft).toBe("48px");
    expect(hr!.style.marginRight).toBe("48px");
    expect(hr!.style.paddingLeft).not.toBe("48px");
    expect(hr!.style.paddingRight).not.toBe("48px");
  });

  it("propagates #easymd background-color to child blocks after normalization (#52)", () => {
    const html = "<p>段落</p><blockquote><p>引用</p></blockquote>";
    const css = `
      #easymd {
        background-color: #f5f3ef;
      }
      #easymd p {
        color: #333;
      }
    `;

    const resolved = resolveInlineStyleVariablesForCopy(
      processHtml(html, css, true, true),
    );
    const container = document.createElement("div");
    container.innerHTML = resolved;

    // juice 正确内联到根元素
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.backgroundColor).toBe("rgb(245, 243, 239)");

    // normalizeCopyContainer 将背景色下沉到子块
    normalizeCopyContainer(container);

    const paragraph = container.querySelector("p") as HTMLElement;
    expect(paragraph.style.backgroundColor).toBe("rgb(245, 243, 239)");

    // 根元素背景已清除（微信会清洗最外层样式）
    const newRoot = container.firstElementChild as HTMLElement;
    expect(newRoot.style.backgroundColor).toBeFalsy();
  });

  it("materializes inherited text color to avoid ui theme leakage", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <section id="easymd" style="color: var(--text-primary);">
        <div class="callout">
          <p class="callout-title">需要注意的问题</p>
        </div>
      </section>
    `;

    normalizeCopyContainer(container);

    const calloutTitle = container.querySelector(
      ".callout-title",
    ) as HTMLElement;
    expect(calloutTitle).toBeTruthy();
    expect(calloutTitle.style.color).toBe("rgb(26, 26, 26)");
  });

  it("keeps mac bar svg outside code in copy pipeline", () => {
    const html =
      '<pre class="custom"><span class="mac-sign" style="padding: 10px 14px 0;"><svg xmlns="http://www.w3.org/2000/svg" width="45" height="13" viewBox="0 0 450 130"></svg></span><code class="hljs language-ts">  const a = 1;\n    console.log(a);</code></pre>';
    const css = `
      #easymd pre.custom > .mac-sign {
        display: block;
      }
    `;

    const output = resolveInlineStyleVariablesForCopy(
      processHtml(html, css, true, true),
    );

    const container = document.createElement("div");
    container.innerHTML = output;
    normalizeCopyContainer(container);

    const pre = container.querySelector("pre") as HTMLElement | null;
    const svg = container.querySelector("pre > span > svg");
    const code = container.querySelector("pre > code");

    expect(pre).toBeTruthy();
    expect(svg).toBeTruthy();
    expect(code).toBeTruthy();
    expect(code!.querySelector("svg")).toBeNull();

    const preChildren = Array.from(pre!.children).map((el) => el.tagName);
    expect(preChildren[0]).toBe("SPAN");
    expect(preChildren[1]).toBe("CODE");
  });

  it("does not add extra top padding to code when mac bar is enabled", () => {
    const html =
      "<pre class='custom'><code class='hljs language-ts'>const a = 1;</code></pre>";
    const css = generateCSS({
      ...defaultVariables,
      showMacBar: true,
    });

    const output = resolveInlineStyleVariablesForCopy(
      processHtml(html, css, true, true),
    );

    const container = document.createElement("div");
    container.innerHTML = output;
    normalizeCopyContainer(container);

    const code = container.querySelector("pre > code") as HTMLElement | null;
    expect(code).toBeTruthy();
    expect(code!.style.paddingTop).toBe("16px");
    expect(code!.style.paddingRight).toBe("16px");
    expect(code!.style.paddingBottom).toBe("16px");
    expect(code!.style.paddingLeft).toBe("16px");
  });

  it("uses pre background instead of code background for mac bar layout", () => {
    const html =
      "<pre class='custom'><code class='hljs language-ts'>const a = 1;</code></pre>";
    const css = generateCSS({
      ...defaultVariables,
      showMacBar: true,
      codeBackground: "#f5f5f5",
    });

    const output = resolveInlineStyleVariablesForCopy(
      processHtml(html, css, true, true),
    );

    const container = document.createElement("div");
    container.innerHTML = output;
    normalizeCopyContainer(container);

    const pre = container.querySelector("pre.custom") as HTMLElement | null;
    const code = container.querySelector("pre > code") as HTMLElement | null;
    expect(pre).toBeTruthy();
    expect(code).toBeTruthy();
    expect(pre!.style.background).toBe("rgb(245, 245, 245)");
    expect(pre!.style.borderRadius).toBe("8px");
    expect(code!.style.background).toBe("transparent");
    expect(code!.style.borderRadius).toBe("0");
  });
});
