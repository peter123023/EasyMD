/**
 * 获取代码主题 CSS
 */
export function getCodeThemeCSS(themeId: string): string {
  const themes: Record<string, string> = {
    github: `
            #easymd .hljs-comment, #easymd .hljs-quote { color: #998; font-style: italic; }
            #easymd .hljs-keyword, #easymd .hljs-selector-tag, #easymd .hljs-subst { color: #333; font-weight: bold; }
            #easymd .hljs-string, #easymd .hljs-doctag { color: #d14; }
            #easymd .hljs-title, #easymd .hljs-section, #easymd .hljs-selector-id { color: #900; font-weight: bold; }
            #easymd .hljs-type, #easymd .hljs-class .hljs-title { color: #458; font-weight: bold; }
            #easymd .hljs-variable, #easymd .hljs-template-variable { color: #008080; }
            #easymd .hljs-attr { color: #000080; }
        `,
    monokai: `
            #easymd .hljs { color: #f8f8f2; }
            #easymd .hljs-comment, #easymd .hljs-quote { color: #75715e; }
            #easymd .hljs-keyword, #easymd .hljs-selector-tag, #easymd .hljs-literal { color: #f92672; }
            #easymd .hljs-string, #easymd .hljs-attr { color: #e6db74; }
            #easymd .hljs-title, #easymd .hljs-section { color: #a6e22e; }
            #easymd .hljs-type, #easymd .hljs-class .hljs-title { color: #66d9ef; font-style: italic; }
            #easymd .hljs-built_in, #easymd .hljs-selector-attr { color: #ae81ff; }
        `,
    vscode: `
            #easymd .hljs { color: #d4d4d4; }
            #easymd .hljs-comment { color: #6a9955; }
            #easymd .hljs-keyword { color: #569cd6; }
            #easymd .hljs-string { color: #ce9178; }
            #easymd .hljs-literal { color: #569cd6; }
            #easymd .hljs-number { color: #b5cea8; }
            #easymd .hljs-function { color: #dcdcaa; }
            #easymd .hljs-class { color: #4ec9b0; }
            #easymd .hljs-attr { color: #9cdcfe; }
        `,
    "night-owl": `
            #easymd .hljs { color: #d6deeb; }
            #easymd .hljs-comment { color: #637777; font-style: italic; }
            #easymd .hljs-keyword { color: #c792ea; }
            #easymd .hljs-selector-tag { color: #ff5874; }
            #easymd .hljs-string { color: #ecc48d; }
            #easymd .hljs-variable { color: #addb67; }
            #easymd .hljs-number { color: #f78c6c; }
            #easymd .hljs-function { color: #82aaff; }
            #easymd .hljs-attr { color: #7fdbca; }
        `,
    dracula: `
            #easymd .hljs { color: #f8f8f2; }
            #easymd .hljs-comment { color: #6272a4; }
            #easymd .hljs-keyword { color: #ff79c6; }
            #easymd .hljs-selector-tag { color: #ff79c6; }
            #easymd .hljs-literal { color: #bd93f9; }
            #easymd .hljs-string { color: #f1fa8c; }
            #easymd .hljs-variable { color: #50fa7b; }
            #easymd .hljs-number { color: #bd93f9; }
            #easymd .hljs-function { color: #50fa7b; }
            #easymd .hljs-class { color: #8be9fd; }
            #easymd .hljs-attr { color: #50fa7b; }
        `,
    "solarized-dark": `
            #easymd .hljs { color: #839496; }
            #easymd .hljs-comment { color: #586e75; font-style: italic; }
            #easymd .hljs-keyword { color: #859900; }
            #easymd .hljs-selector-tag { color: #859900; }
            #easymd .hljs-string { color: #2aa198; }
            #easymd .hljs-variable { color: #b58900; }
            #easymd .hljs-number { color: #d33682; }
            #easymd .hljs-function { color: #268bd2; }
            #easymd .hljs-attr { color: #b58900; }
        `,
    "solarized-light": `
            #easymd .hljs { color: #657b83; }
            #easymd .hljs-comment { color: #93a1a1; font-style: italic; }
            #easymd .hljs-keyword { color: #859900; }
            #easymd .hljs-selector-tag { color: #859900; }
            #easymd .hljs-string { color: #2aa198; }
            #easymd .hljs-variable { color: #b58900; }
            #easymd .hljs-number { color: #d33682; }
            #easymd .hljs-function { color: #268bd2; }
            #easymd .hljs-attr { color: #b58900; }
        `,
    xcode: `
            #easymd .hljs { color: #000000; }
            #easymd .hljs-comment { color: #007400; }
            #easymd .hljs-quote { color: #007400; }
            #easymd .hljs-keyword { color: #aa0d91; }
            #easymd .hljs-selector-tag { color: #aa0d91; }
            #easymd .hljs-literal { color: #aa0d91; }
            #easymd .hljs-string { color: #c41a16; }
            #easymd .hljs-attr { color: #836C28; }
            #easymd .hljs-title { color: #1c00cf; }
            #easymd .hljs-section { color: #1c00cf; }
            #easymd .hljs-type { color: #5c2699; }
            #easymd .hljs-class .hljs-title { color: #5c2699; }
            #easymd .hljs-variable { color: #3f6e74; }
            #easymd .hljs-built_in { color: #5c2699; }
            #easymd .hljs-number { color: #1c00cf; }
        `,
    "atom-one-light": `
            #easymd .hljs { color: #383a42; }
            #easymd .hljs-comment { color: #a0a1a7; font-style: italic; }
            #easymd .hljs-keyword { color: #a626a4; }
            #easymd .hljs-selector-tag { color: #e45649; }
            #easymd .hljs-string { color: #50a14f; }
            #easymd .hljs-variable { color: #986801; }
            #easymd .hljs-number { color: #986801; }
            #easymd .hljs-function { color: #4078f2; }
            #easymd .hljs-attr { color: #986801; }
            #easymd .hljs-class .hljs-title { color: #c18401; }
            #easymd .hljs-type { color: #986801; }
            #easymd .hljs-built_in { color: #c18401; }
        `,
  };
  return themes[themeId] || "";
}
