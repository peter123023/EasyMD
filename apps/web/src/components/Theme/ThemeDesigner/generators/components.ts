import type { DesignerVariables } from "../types";
import { getCodeThemeCSS } from "./codeTheme";

interface ComponentPresets {
  quotePreset: { base: string; extra: string };
}

export function generateComponents(
  v: DesignerVariables,
  presets: ComponentPresets,
): string {
  const { quotePreset } = presets;
  const underlineStyle = "var(--easymd-underline-style)";
  const underlineColor = "var(--easymd-underline-color)";
  const hrColor = "var(--easymd-hr-color)";
  const hrHeight = "var(--easymd-hr-height)";

  return `#easymd blockquote, 
#easymd .multiquote-1, 
#easymd .multiquote-2, 
#easymd .multiquote-3 {
  margin: var(--easymd-paragraph-margin) 0 !important;
  padding: var(--easymd-quote-padding-y) var(--easymd-quote-padding-x);
  ${quotePreset.base}
}
#easymd blockquote p,
#easymd .multiquote-1 p,
#easymd .multiquote-2 p,
#easymd .multiquote-3 p { 
  color: var(--easymd-quote-text-color); 
  margin: 0 !important;
  font-size: var(--easymd-quote-font-size);
  line-height: var(--easymd-quote-line-height);
  ${v.quoteTextCentered ? "text-align: center !important;" : ""}
}

#easymd pre {
  margin: var(--easymd-paragraph-margin) 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

#easymd pre code {
  display: block;
  background: transparent;
  font-size: var(--easymd-code-font-size);
  padding: 16px;
  margin: 0;
  overflow-x: auto;
  white-space: pre;
  border-radius: 0;
  word-wrap: normal;
  word-break: keep-all;
  text-align: left;
  letter-spacing: 0;
  word-spacing: 0;
  min-width: max-content;
}

#easymd pre.custom {
  position: relative;
  margin: var(--easymd-paragraph-margin) 0;
  background: var(--easymd-code-background);
  border-radius: 8px;
  overflow: hidden;
}

#easymd pre.custom > .mac-sign {
  display: ${v.showMacBar ? "block" : "none"};
  line-height: 0;
}

${getCodeThemeCSS(v.codeTheme)}

#easymd code {
  color: var(--easymd-inline-code-color);
  background: var(--easymd-inline-code-background);
  padding: 2px 4px;
  border-radius: ${v.inlineCodeStyle === "rounded" ? "12px" : v.inlineCodeStyle === "github" ? "4px" : "2px"};
  font-size: 0.9em;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  white-space: normal;
  letter-spacing: 0;
  ${v.inlineCodeStyle === "github" ? "border: 1px solid rgba(0,0,0,0.06);" : ""}
  ${v.inlineCodeStyle === "color-text" ? `background: transparent; font-weight: bold; border-bottom: 2px solid var(--easymd-primary-color-50);` : ""}
}

/* 代码块样式需要更高优先级覆盖行内代码样式 */
#easymd pre code,
#easymd pre code.hljs {
  white-space: pre;
  text-align: left;
  letter-spacing: 0;
  word-spacing: 0;
}

#easymd a {
  color: var(--easymd-link-color);
  text-decoration: none;
  border-bottom: ${v.linkUnderline ? `1px solid var(--easymd-link-color)` : "none"};
  word-break: break-all;
}

#easymd em {
  font-style: italic;
  color: var(--easymd-italic-color);
}

#easymd del {
  text-decoration: line-through;
  color: var(--easymd-del-color);
}

#easymd u {
  text-decoration-line: underline;
  text-decoration-style: ${underlineStyle};
  text-underline-offset: 0.18em;
  text-decoration-thickness: 1px;
  text-decoration-color: ${underlineColor};
}

#easymd mark {
  background: var(--easymd-mark-background);
  color: var(--easymd-mark-color);
  padding: 0 2px;
  border-radius: 2px;
}

#easymd hr {
  margin: var(--easymd-hr-margin) 0;
  border: 0;
  ${(() => {
    const style = v.hrStyle || "solid";
    const color = hrColor;
    const height = hrHeight;

    if (style === "pill") {
      return `
    height: ${height};
    background: ${color};
    width: 20%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
      `;
    }

    return `
    border-top: ${height} ${style} ${color};
    `;
  })()}
}
#easymd table {
  width: 100%;
  border-collapse: collapse;
  margin: var(--easymd-paragraph-margin) 0;
}

#easymd th {
  background: var(--easymd-table-header-background);
  color: var(--easymd-table-header-color);
  font-weight: bold;
}

#easymd th, #easymd td {
  border: 1px solid var(--easymd-table-border-color);
  padding: 8px 12px;
  text-align: left;
}

${
  v.tableZebra
    ? `
#easymd tr:nth-child(even) {
  background: #fcfcfc;
}`
    : ""
}

#easymd img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: var(--easymd-image-margin) auto;
  border-radius: var(--easymd-image-border-radius);
  box-shadow: var(--easymd-image-shadow);
}`;
}
