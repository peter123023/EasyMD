interface HeadingPresetCss {
  content: string;
  extra?: string;
}

interface QuotePresetCss {
  base: string;
  extra?: string;
}

const headingPresetTemplates: Record<
  string,
  (tag: string) => HeadingPresetCss
> = {
  simple: () => ({ content: "" }),
  "left-border": () => ({
    content: `
            border-left: 4px solid var(--easymd-primary-color);
            padding-left: 10px;
        `,
  }),
  "bottom-border": () => ({
    content: `
            border-bottom: 2px solid var(--easymd-primary-color);
            padding-bottom: 8px;
        `,
  }),
  "double-line": () => ({
    content: `
            border-top: 2px solid var(--easymd-primary-color);
            border-bottom: 2px solid var(--easymd-primary-color);
            padding: 8px 0;
        `,
  }),
  boxed: () => ({
    content: `
            background: var(--easymd-primary-color-20);
            border-left: 4px solid var(--easymd-primary-color);
            padding: 8px 12px;
            border-radius: 4px;
        `,
  }),
  "bottom-highlight": () => ({
    content: `
            display: inline-block;
            background: linear-gradient(to bottom, transparent 60%, var(--easymd-primary-color-30) 60%);
            padding: 0 4px;
        `,
  }),
  pill: () => ({
    content: `
            background: var(--easymd-primary-color);
            color: #fff;
            padding: 4px 16px;
            border-radius: 20px;
            display: inline-block;
        `,
  }),
  bracket: (tag) => ({
    content: `
            display: inline-block;
            position: relative;
            padding: 0 10px;
        `,
    extra: `
        #easymd ${tag} .content::before {
            content: '[';
            margin-right: 5px;
            color: var(--easymd-primary-color);
            font-weight: bold;
        }
        #easymd ${tag} .content::after {
            content: ']';
            margin-left: 5px;
            color: var(--easymd-primary-color);
            font-weight: bold;
        }
        `,
  }),
};

const quotePresetTemplates: Record<string, () => QuotePresetCss> = {
  "left-border": () => ({
    base: `
            background: var(--easymd-quote-background);
            border-left-style: var(--easymd-quote-border-style);
            border-left-width: var(--easymd-quote-border-width);
            border-left-color: var(--easymd-quote-border-color);
        `,
  }),
  "top-bottom-border": () => ({
    base: `
            border-top: var(--easymd-quote-border-width) var(--easymd-quote-border-style) var(--easymd-quote-border-color);
            border-bottom: var(--easymd-quote-border-width) var(--easymd-quote-border-style) var(--easymd-quote-border-color);
            border-left: none;
            background: var(--easymd-quote-background);
            text-align: center;
        `,
    extra: `
        #easymd blockquote p { text-align: center; }
        `,
  }),
  "quotation-marks": () => ({
    base: `
            background: var(--easymd-quote-background);
            border-left: none;
            border-radius: 4px;
            padding-left: calc(var(--easymd-quote-padding-x) + 40px);
        `,
    extra: `
        #easymd blockquote::before {
            content: "“";
            display: block;
            height: 0;
            font-size: 60px;
            color: var(--easymd-quote-border-color);
            font-family: Georgia, serif;
            line-height: 1;
            margin-left: -40px;
            margin-top: -6px;
            opacity: 0.3;
            pointer-events: none;
        }
        #easymd blockquote p {
            position: relative;
            z-index: 1;
        }
        `,
  }),
  boxed: () => ({
    base: `
            border: var(--easymd-quote-border-width) var(--easymd-quote-border-style) var(--easymd-quote-border-color);
            background: var(--easymd-quote-background);
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        `,
  }),
  "center-accent": () => ({
    base: `
            background: transparent;
            border-left: none;
            text-align: center;
            position: relative;
        `,
    extra: `
        #easymd blockquote p { text-align: center; }
        #easymd blockquote::before {
            content: "";
            display: block;
            width: 40px;
            height: var(--easymd-quote-border-width);
            background: var(--easymd-quote-border-color);
            margin: 0 auto 15px;
            opacity: 0.8;
        }
        #easymd blockquote::after {
            content: "";
            display: block;
            width: 40px;
            height: var(--easymd-quote-border-width);
            background: var(--easymd-quote-border-color);
            margin: 15px auto 0;
            opacity: 0.8;
        }
        `,
  }),
  "corner-frame": () => ({
    base: `
            background: var(--easymd-quote-background);
            border-left: none;
            position: relative;
        `,
    extra: `
        #easymd blockquote::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            border-top: var(--easymd-quote-border-width) var(--easymd-quote-border-style) var(--easymd-quote-border-color);
            border-left: var(--easymd-quote-border-width) var(--easymd-quote-border-style) var(--easymd-quote-border-color);
        }
        #easymd blockquote::after {
            content: "";
            position: absolute;
            bottom: 0;
            right: 0;
            width: 20px;
            height: 20px;
            border-bottom: var(--easymd-quote-border-width) var(--easymd-quote-border-style) var(--easymd-quote-border-color);
            border-right: var(--easymd-quote-border-width) var(--easymd-quote-border-style) var(--easymd-quote-border-color);
        }
        `,
  }),
};

/**
 * 获取标题预设 CSS 模板
 */
export function getHeadingPresetCSS(
  presetId: string,
  _color: string,
  tag: string,
): { content: string; extra: string } {
  const template =
    headingPresetTemplates[presetId] || headingPresetTemplates.simple;
  const css = template(tag);
  return { content: css.content || "", extra: css.extra || "" };
}

/**
 * 获取引用预设 CSS
 */
export function getQuotePresetCSS(
  presetId: string,
  _color: string,
  _bgColor: string,
  _textColor: string,
  _borderWidth: number,
  _borderStyle: string,
  _padding: number,
  _centered?: boolean,
): { base: string; extra: string } {
  const template =
    quotePresetTemplates[presetId] || quotePresetTemplates["left-border"];
  const css = template();
  return { base: css.base || "", extra: css.extra || "" };
}
