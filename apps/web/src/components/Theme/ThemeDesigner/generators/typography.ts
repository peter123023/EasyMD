import type { DesignerVariables } from "../types";

interface HeadingPreset {
  content: string;
  extra: string;
}

interface TypographyPresets {
  h1Preset: HeadingPreset;
  h2Preset: HeadingPreset;
  h3Preset: HeadingPreset;
  h4Preset: HeadingPreset;
}

export function generateTypography(
  v: DesignerVariables,
  safeFontFamily: string,
  presets: TypographyPresets,
): string {
  const { h1Preset, h2Preset, h3Preset, h4Preset } = presets;

  return `#easymd p {
  font-family: ${safeFontFamily};
  font-size: var(--easymd-font-size);
  line-height: var(--easymd-line-height);
  margin: var(--easymd-paragraph-margin) 0;
  padding: var(--easymd-paragraph-padding) 0;
  letter-spacing: var(--easymd-letter-spacing);
  ${v.textIndent ? "text-indent: 2em;" : ""}
  ${v.textJustify ? "text-align: justify;" : ""}
}

#easymd li {
  font-family: ${safeFontFamily};
  margin: var(--easymd-list-spacing) 0;
  line-height: var(--easymd-line-height);
  letter-spacing: var(--easymd-letter-spacing);
}

#easymd h1 .content {
  font-size: var(--easymd-h1-font-size);
  color: var(--easymd-h1-color);
  font-weight: ${v.h1.fontWeight || "bold"};
  letter-spacing: ${v.h1.letterSpacing || 0}px;
  ${h1Preset.content}
}
#easymd h1 { margin: var(--easymd-h1-margin-top) 0 var(--easymd-h1-margin-bottom); ${v.h1.centered ? "text-align: center;" : ""} }

#easymd h2 .content {
  font-size: var(--easymd-h2-font-size);
  color: var(--easymd-h2-color);
  font-weight: ${v.h2.fontWeight || "bold"};
  letter-spacing: ${v.h2.letterSpacing || 0}px;
  ${h2Preset.content}
}
#easymd h2 { margin: var(--easymd-h2-margin-top) 0 var(--easymd-h2-margin-bottom); ${v.h2.centered ? "text-align: center;" : ""} }

#easymd h3 .content {
  font-size: var(--easymd-h3-font-size);
  color: var(--easymd-h3-color);
  font-weight: ${v.h3.fontWeight || "bold"};
  letter-spacing: ${v.h3.letterSpacing || 0}px;
  ${h3Preset.content}
}
#easymd h3 { margin: var(--easymd-h3-margin-top) 0 var(--easymd-h3-margin-bottom); ${v.h3.centered ? "text-align: center;" : ""} }

#easymd h4 .content {
  font-size: var(--easymd-h4-font-size);
  color: var(--easymd-h4-color);
  font-weight: ${v.h4.fontWeight || "bold"};
  letter-spacing: ${v.h4.letterSpacing || 0}px;
  ${h4Preset.content}
}
#easymd h4 { margin: var(--easymd-h4-margin-top) 0 var(--easymd-h4-margin-bottom); ${v.h4.centered ? "text-align: center;" : ""} }

#easymd ul { list-style-type: ${v.ulStyle}; padding-left: 20px; margin: var(--easymd-paragraph-margin) 0; font-size: ${!v.ulFontSize || v.ulFontSize === "inherit" ? "var(--easymd-font-size)" : v.ulFontSize}; }
#easymd ul ul { list-style-type: ${v.ulStyleL2}; margin: 4px 0; }
#easymd ol { list-style-type: ${v.olStyle}; padding-left: 20px; margin: var(--easymd-paragraph-margin) 0; font-size: ${!v.olFontSize || v.olFontSize === "inherit" ? "var(--easymd-font-size)" : v.olFontSize}; }
#easymd ol ol { list-style-type: ${v.olStyleL2}; margin: 4px 0; }
/* 列表符号颜色 */
#easymd ul li::marker,
  #easymd ol li::marker {
  color: var(--easymd-list-marker-color);
}
#easymd ul ul li::marker,
  #easymd ol ol li::marker,
    #easymd ul ol li::marker,
      #easymd ol ul li::marker {
  color: var(--easymd-list-marker-color-l2);
}`;
}
