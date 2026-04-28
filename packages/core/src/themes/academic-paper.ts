export const academicPaperTheme = `/* 学术论文风格 */
#easymd {
    padding: 5px 20px;
    max-width: 677px;
    margin: 0 auto;
    /* 混合字体栈：西文Times + 中文宋体 */
    font-family: "Times New Roman", "Songti SC", "SimSun", serif;
    color: #000;
    background-color: transparent;
    /* 透明背景，兼容微信深色模式 */
    word-break: break-word;
}

/* 正文 - 移除首行缩进，改用段间距适应移动端 */
#easymd p {
    margin: 16px 0;
    line-height: 1.7;
    text-align: justify;
    text-indent: 0;
    color: #1a1a1a;
    font-size: 16px;
}

/* 一级标题 - 居中论文题 */
#easymd h1 {
    margin: 40px 0 30px;
    text-align: center;
    line-height: 1.4;
}

#easymd h1 .content {
    font-size: 22px;
    font-weight: bold;
    color: #000;
}

#easymd h1 .prefix,
#easymd h1 .suffix {
    display: none;
}

/* 二级标题 - 章节 Section */
#easymd h2 {
    margin: 30px 0 15px;
    text-align: left;
    border-bottom: 2px solid #000;
    /* 加粗底线 */
    padding-bottom: 8px;
}

#easymd h2 .content {
    font-size: 18px;
    font-weight: bold;
    color: #000;
}

#easymd h2 .prefix,
#easymd h2 .suffix {
    display: none;
}

/* 三级标题 - Subsection */
#easymd h3 {
    margin: 20px 0 10px;
}

#easymd h3 .content {
    font-size: 16px;
    font-weight: bold;
    color: #800000;
    /* 栗色，区分层级 */
}

#easymd h3 .prefix,
#easymd h3 .suffix {
    display: none;
}

/* 四级标题 */
#easymd h4 {
    margin: 15px 0 5px;
}

#easymd h4 .content {
    font-size: 16px;
    font-weight: bold;
    font-style: italic;
    /* 斜体标题 */
    color: #333;
}

#easymd h4 .prefix,
#easymd h4 .suffix {
    display: none;
}

/* 引用 - 简洁边框 */
#easymd .multiquote-1 {
    margin: 20px 0;
    padding: 16px 20px;
    background: #fafafa;
    border: 1px solid #ddd;
    border-left: 4px solid #666;
}

#easymd .multiquote-1 p {
    color: #555;
    font-size: 15px;
    margin: 0;
    line-height: 1.6;
    text-indent: 0;
}

#easymd .multiquote-2 {
    margin: 18px 0 18px 20px;
    padding: 14px 18px;
    background: #fafafa;
    border: 1px solid #ddd;
}

#easymd .multiquote-2 p {
    color: #555;
    font-size: 15px;
    margin: 0;
}

#easymd .multiquote-3 {
    margin: 16px 0 16px 20px;
    padding: 12px 16px;
    background: #fcfcfc;
    border: 1px solid #e0e0e0;
}

#easymd .multiquote-3 p {
    color: #555;
    font-size: 15px;
    margin: 0;
}

/* 列表 */
#easymd ul {
    list-style: disc;
    padding-left: 20px;
    margin: 16px 0;
}

#easymd ul ul {
    list-style-type: square;
    margin-top: 5px;
}

#easymd ol {
    list-style: decimal;
    padding-left: 20px;
    margin: 16px 0;
}

#easymd ol ol {
    list-style-type: lower-alpha;
}

#easymd li section {
    color: #333;
    line-height: 1.6;
}

/* 链接 - 经典深蓝 */
#easymd a {
    color: #000080;
    text-decoration: underline;
}

/* 加粗 */
#easymd strong {
    color: #000;
    font-weight: bold;
}

/* 斜体 */
#easymd em {
    font-style: italic;
    color: #000;
}

/* 加粗斜体 */
#easymd em strong {
    font-weight: bold;
    font-style: italic;
    color: #000;
}

/* 高亮 - 学术标记风格 */
#easymd mark {
    background: #fff3cd;
    color: #000;
    padding: 0 2px;
}

/* 删除线 */
#easymd del {
    text-decoration: line-through;
    color: #666;
    opacity: 0.7;
}

/* 图片 - 简洁无装饰 */
#easymd img {
    display: block;
    margin: 30px auto;
    width: 100%;
    border: 1px solid #ddd;
}

#easymd figcaption {
    margin-top: 8px;
    text-align: center;
    color: #666;
    font-size: 14px;
    font-style: italic;
}

/* 
 * 行内代码 - LaTeX \texttt 风格 (修复重点)
 * 纯黑文字 + 极淡灰底 + 等宽字体
 */
#easymd p code,
#easymd li code {
    color: #000;
    /* 纯黑 */
    background: #f4f4f4;
    /* 极淡灰 */
    border: 1px solid #eee;
    /* 极细边框 */
    padding: 1px 4px;
    margin: 0 2px;
    border-radius: 2px;
    font-size: 14px;
    font-family: "Courier New", Courier, monospace;
    /* 强制等宽 */
}

/* 代码块 - 简单的学术风格 */
/* 注意：不要设置 color，让语法高亮主题控制文字颜色 */
#easymd pre code.hljs {
    background: #f9f9f9;
    border: 1px solid #ccc;
    /* color 由 .hljs 语法高亮主题控制 */
    font-family: "Courier New", monospace;
    font-size: 13px;
    padding: 12px;
    border-radius: 0;
    /* 直角 */
    overflow-x: auto;
    white-space: pre;
  min-width: max-content;
}

/* 如果没有语法高亮，设置默认颜色 */
#easymd pre code:not(.hljs) {
    color: #333;
}

/* 表格 - 经典三线表 */
#easymd table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 14px;
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
}

#easymd table tr th {
    border-bottom: 1px solid #000;
    padding: 10px 5px;
    font-weight: bold;
    text-align: center;
    background: #fff;
}

#easymd table tr td {
    padding: 10px 5px;
    border: none;
    text-align: center;
    color: #333;
}

/* 隔行微底色 */
#easymd table tr:nth-child(even) td {
    background-color: #fafafa;
}

/* 脚注 */
#easymd .footnote-word,
#easymd .footnote-ref {
    color: #000080;
}

#easymd .footnotes-sep {
    border-top: 1px solid #ccc;
    padding-top: 10px;
    margin-top: 40px;
    width: 20%;
    /* 短线 */
}

#easymd .footnote-num {
    font-weight: bold;
    color: #000;
    margin-right: 4px;
    vertical-align: super;
    font-size: 10px;
}

#easymd .footnote-item p {
    color: #666;
    font-size: 12px;
    margin: 4px 0;
}

/* 公式 */
#easymd .block-equation svg {
    max-width: 100% !important;
}

#easymd .inline-equation svg {
    max-width: 100%;
    vertical-align: middle;
}

/* 提示块 - 学术风格 */
#easymd .callout {
    margin: 20px 0;
    padding: 16px 20px;
    border: 1px solid #ddd;
    border-radius: 0;
    background: #fafafa;
}

#easymd .callout-title {
    font-weight: bold;
    margin-bottom: 8px;
    font-size: 14px;
    text-transform: uppercase;
    color: #000;
}

#easymd .callout-icon { margin-right: 8px;
    margin-right: 6px;
}

#easymd .callout-note { 
    border-left: 4px solid #666; 
    background: #f5f5f5;
}

#easymd .callout-tip { 
    border-left: 4px solid #555; 
    background: #f5f5f5;
}

#easymd .callout-important { 
    border-left: 4px solid #888; 
    background: #f5f5f5;
}

#easymd .callout-warning { 
    border-left: 4px solid #999; 
    background: #f5f5f5;
}

#easymd .callout-caution { 
    border-left: 4px solid #000; 
    background: #f5f5f5;
}

/* Imageflow CSS */
#easymd .imageflow-layer1 {
  margin-top: 1em;
  margin-bottom: 0.5em;
  /* white-space: normal; */
  border: 0px none;
  padding: 0px;
  overflow: hidden;
}

#easymd .imageflow-layer2 {
  white-space: nowrap;
  width: 100%;
  overflow-x: scroll;
}

#easymd .imageflow-layer3 {
  display: inline-block;
  word-wrap: break-word;
  white-space: normal;
  vertical-align: top;
  width: 80%;
  margin-right: 10px;
  flex-shrink: 0;
}

#easymd .imageflow-img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  border-radius: 4px;
}

#easymd .imageflow-caption {
  text-align: center;
  margin-top: 0px;
  padding-top: 0px;
  color: #888;
}
`;
