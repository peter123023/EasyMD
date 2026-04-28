import type { DesignerVariables } from "../types";

const toAlphaColor = (color: string, alpha: number): string => {
  const trimmed = color.trim();
  if (!trimmed) return color;

  if (trimmed.startsWith("#")) {
    const hex = trimmed.slice(1);
    const normalize = (value: string) =>
      value.length === 1 ? value + value : value;
    if (hex.length === 3 || hex.length === 4) {
      const r = parseInt(normalize(hex[0]), 16);
      const g = parseInt(normalize(hex[1]), 16);
      const b = parseInt(normalize(hex[2]), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    if (hex.length === 6 || hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }

  const rgbMatch =
    trimmed.match(/^rgb\s*\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*\)$/i) ||
    trimmed.match(
      /^rgba\s*\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*[^)]+\)$/i,
    );
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const hslMatch =
    trimmed.match(/^hsl\s*\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*\)$/i) ||
    trimmed.match(
      /^hsla\s*\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*[^)]+\)$/i,
    );
  if (hslMatch) {
    const [, h, s, l] = hslMatch;
    return `hsla(${h}, ${s}, ${l}, ${alpha})`;
  }

  return color;
};

export function generateVariables(
  v: DesignerVariables,
  safeFontFamily: string,
): string {
  const primaryColor20 = toAlphaColor(v.primaryColor, 0.12);
  const primaryColor30 = toAlphaColor(v.primaryColor, 0.18);
  const primaryColor50 = toAlphaColor(v.primaryColor, 0.5);
  const underlineStyle = v.underlineStyle || "solid";
  const underlineColor = v.underlineColor || "currentColor";
  return `#easymd {
  /* CSS 变量 - 可在 CSS 编辑模式下覆盖 */
  /* 全局 */
  --easymd-page-padding: ${v.pagePadding ?? 8}px;
  --easymd-font-size: ${v.fontSize};
  --easymd-line-height: ${v.lineHeight};
  --easymd-paragraph-margin: ${v.paragraphMargin}px;
  --easymd-paragraph-padding: ${v.paragraphPadding ?? 0}px;
  --easymd-text-color: ${v.paragraphColor};
  --easymd-primary-color: ${v.primaryColor};
  --easymd-primary-color-20: ${primaryColor20};
  --easymd-primary-color-30: ${primaryColor30};
  --easymd-primary-color-50: ${primaryColor50};
  --easymd-letter-spacing: ${v.baseLetterSpacing || 0}px;
  --easymd-underline-style: ${underlineStyle};
  --easymd-underline-color: ${underlineColor};
  
  /* 标题 */
  --easymd-h1-font-size: ${v.h1.fontSize}px;
  --easymd-h1-color: ${v.h1.color};
  --easymd-h1-margin-top: ${v.h1.marginTop}px;
  --easymd-h1-margin-bottom: ${v.h1.marginBottom}px;
  --easymd-h2-font-size: ${v.h2.fontSize}px;
  --easymd-h2-color: ${v.h2.color};
  --easymd-h2-margin-top: ${v.h2.marginTop}px;
  --easymd-h2-margin-bottom: ${v.h2.marginBottom}px;
  --easymd-h3-font-size: ${v.h3.fontSize}px;
  --easymd-h3-color: ${v.h3.color};
  --easymd-h3-margin-top: ${v.h3.marginTop}px;
  --easymd-h3-margin-bottom: ${v.h3.marginBottom}px;
  --easymd-h4-font-size: ${v.h4.fontSize}px;
  --easymd-h4-color: ${v.h4.color};
  --easymd-h4-margin-top: ${v.h4.marginTop}px;
  --easymd-h4-margin-bottom: ${v.h4.marginBottom}px;
  
  /* 代码 */
  --easymd-code-background: ${v.codeBackground};
  --easymd-code-font-size: ${v.codeFontSize}px;
  --easymd-inline-code-color: ${v.inlineCodeColor};
  --easymd-inline-code-background: ${v.inlineCodeBackground};
  
  /* 引用 */
  --easymd-quote-background: ${v.quoteBackground};
  --easymd-quote-border-color: ${v.quoteBorderColor};
  --easymd-quote-border-width: ${v.quoteBorderWidth}px;
  --easymd-quote-border-style: ${v.quoteBorderStyle};
  --easymd-quote-text-color: ${v.quoteTextColor};
  --easymd-quote-font-size: ${v.quoteFontSize}px;
  --easymd-quote-line-height: ${v.quoteLineHeight};
  --easymd-quote-padding-x: ${v.quotePaddingX}px;
  --easymd-quote-padding-y: ${v.quotePaddingY}px;
  
  /* 图片 */
  --easymd-image-margin: ${v.imageMargin}px;
  --easymd-image-border-radius: ${v.imageBorderRadius}px;
  --easymd-image-shadow: ${v.imageShadow ? "0 4px 12px rgba(0, 0, 0, 0.12)" : "none"};
  --easymd-image-caption-color: ${v.imageCaptionColor};
  --easymd-image-caption-font-size: ${v.imageCaptionFontSize}px;
  --easymd-image-caption-align: ${v.imageCaptionTextAlign};
  
  /* 链接与文本 */
  --easymd-link-color: ${v.linkColor || v.primaryColor};
  --easymd-italic-color: ${v.italicColor};
  --easymd-del-color: ${v.delColor};
  --easymd-mark-background: ${v.markBackground};
  --easymd-mark-color: ${v.markColor};
  
  /* 表格 */
  --easymd-table-header-background: ${v.tableHeaderBackground};
  --easymd-table-header-color: ${v.tableHeaderColor};
  --easymd-table-border-color: ${v.tableBorderColor};
  
  /* 分割线 */
  --easymd-hr-color: ${v.hrColor};
  --easymd-hr-height: ${v.hrHeight}px;
  --easymd-hr-margin: ${v.hrMargin}px;
  
  /* 列表 */
  --easymd-list-spacing: ${v.listSpacing}px;
  --easymd-list-marker-color: ${v.listMarkerColor};
  --easymd-list-marker-color-l2: ${v.listMarkerColorL2};

  font-family: ${safeFontFamily};
  padding: 0 var(--easymd-page-padding);
  color: var(--easymd-text-color);
  overflow-wrap: break-word;
}`;
}
