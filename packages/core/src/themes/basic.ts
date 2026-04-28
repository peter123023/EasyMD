export const basicTheme = `/* 默认样式，最佳实践 */

/* 全局属性 */
#easymd {
  font-size: 16px;
  color: #000000;
  padding: 0 8px;
  line-height: 1.6;
  word-spacing: 0px;
  letter-spacing: 0px;
  word-break: break-word;
  word-wrap: break-word;
  text-align: left;
  font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', 'Microsoft YaHei', '微软雅黑', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

/* 段落 */
#easymd p {
  font-size: 16px;
  margin: 0;
  line-height: 26px;
  color: #000000;
}

/* 标题 */
#easymd h1,
#easymd h2,
#easymd h3,
#easymd h4,
#easymd h5,
#easymd h6 {
  margin-top: 30px;
  margin-bottom: 15px;
  padding: 0px;
  font-weight: bold;
  color: #000000;
}
#easymd h1 {
  font-size: 24px;
}
#easymd h2 {
  font-size: 22px;
}
#easymd h3 {
  font-size: 20px;
}
#easymd h4 {
  font-size: 18px;
}
#easymd h5 {
  font-size: 16px;
}
#easymd h6 {
  font-size: 16px;
}

#easymd h1 .prefix,
#easymd h2 .prefix,
#easymd h3 .prefix,
#easymd h4 .prefix,
#easymd h5 .prefix,
#easymd h6 .prefix {
  display: none;
}

#easymd h1 .suffix,
#easymd h2 .suffix,
#easymd h3 .suffix,
#easymd h4 .suffix,
#easymd h5 .suffix,
#easymd h6 .suffix {
  display: none;
}

/* 列表 */
#easymd ul,
#easymd ol {
  margin-top: 8px;
  margin-bottom: 8px;
  padding-left: 25px;
  color: #000000;
}
#easymd ul {
  list-style-type: disc;
}
#easymd ul ul {
  list-style-type: square;
}

#easymd ol {
  list-style-type: decimal;
}

#easymd li section {
  margin-top: 5px;
  margin-bottom: 5px;
  line-height: 26px;
  text-align: left;
  color: #010101; /* 使用接近黑色的 HEX，避免微信吞掉纯黑色 */
  font-weight: 500;
}

/* 引用 */
#easymd blockquote {
  border: none;
}

#easymd .multiquote-1 {
  display: block;
  font-size: 0.9em;
  overflow: auto;
  overflow-scrolling: touch;
  border-left: 3px solid rgba(0, 0, 0, 0.4);
  background: rgba(0, 0, 0, 0.05);
  color: #6a737d;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
}

#easymd .multiquote-1 p {
  margin: 0px;
  color: #000000;
  line-height: 26px;
}

#easymd .multiquote-2 {
  box-shadow: 1px 1px 10px rgba(0,0,0,0.2);
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
}

#easymd .multiquote-3 {
  box-shadow: 1px 1px 10px rgba(0,0,0,0.2);
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
}

#easymd .multiquote-3 p {
  text-align: center;
}

#easymd .multiquote-3 h3 {
  text-align: center;
}

#easymd .table-of-contents a {
  border: none;
  color: #000000;
  font-weight: normal;
}

/* 链接 */
#easymd a {
  text-decoration: none;
  color: #1e6bb8;
  word-wrap: break-word;
  font-weight: bold;
  border-bottom: 1px solid #1e6bb8;
}

/* 加粗 */
#easymd strong {
  font-weight: bold;
  color: #000000;
}

/* 斜体 */
#easymd em {
  font-style: italic;
  color: #000000;
}

/* 加粗斜体 */
#easymd em strong {
  font-weight: bold;
  color: #000000;
}

/* 删除线 */
#easymd del {
  font-style: italic;
  color: #000000;
}

/* 下划线 */
#easymd u {
  text-decoration: underline;
  text-underline-offset: 0.18em;
  text-decoration-thickness: 1px;
}

/* 分隔线 */
#easymd hr {
  height: 1px;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-top: 1px solid black;
}

/* 代码块容器 */
#easymd pre {
  margin-top: 10px;
  margin-bottom: 10px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

#easymd pre.custom {
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
  overflow-x: auto;
}

#easymd pre code {
  display: block;
  font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
  border-radius: 0px;
  font-size: 12px;
  white-space: pre;
  min-width: max-content;
  -webkit-overflow-scrolling: touch;
}

#easymd pre code span {
  line-height: 26px;
}

/* 行内代码 */
#easymd p code,
#easymd li code {
  font-size: 14px;
  word-wrap: break-word;
  padding: 2px 4px;
  border-radius: 4px;
  margin: 0 2px;
  color: #1e6bb8;
  background-color: rgba(27,31,35,.05);
  font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
  word-break: break-all;
}

/* 图片 */
#easymd img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}

/* 图片 */
#easymd figure {
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
}

/* 图片描述文字 */
#easymd figcaption {
  margin-top: 5px;
  text-align: center;
  color: #888;
  font-size: 14px;
}


/* 表格容器 */
#easymd .table-container{
  overflow-x: auto;
}

/* 表格 */
#easymd table {
  display: table;
  text-align: left;
}
#easymd tbody {
  border: 0;
}

#easymd table tr {
  border: 0;
  border-top: 1px solid #ccc;
  background-color: #ffffff;
}

#easymd table tr:nth-child(2n) {
  background-color: #F8F8F8;
}

#easymd table tr th,
#easymd table tr td {
  font-size: 16px;
  border: 1px solid #ccc;
  padding: 5px 10px;
  text-align: left;
}

#easymd table tr th {
  font-weight: bold;
  background-color: #f0f0f0;
}

/* 表格最小列宽4个汉字 */
#easymd table tr th:nth-of-type(n),
#easymd table tr td:nth-of-type(n){
  min-width:85px;
}

#easymd .footnote-word {
  color: #1e6bb8;
  font-weight: bold;
}

#easymd .footnote-ref {
  color: #1e6bb8;
  font-weight: bold;
}

#easymd .footnote-item {
  display: flex;
}

#easymd .footnote-num {
  display: inline;
  width: 10%; /*神奇，50px就不可以*/
  background: none;
  font-size: 80%;
  opacity: 0.6;
  line-height: 26px;
  font-family: ptima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

#easymd .footnote-item p {
  display: inline;
  font-size: 14px;
  width: 90%;
  padding: 0px;
  margin: 0;
  line-height: 26px;
  color: #000000;
  word-break:break-all;
  width: calc(100%-50)
}

#easymd sub, sup {
  line-height: 0;
}

#easymd .footnotes-sep:before {
  content: "参考资料";
  display: block;
}

/* 解决公式问题 */
#easymd .block-equation {
  display:block;
  text-align: center;
  overflow: auto;
  display: block;
  -webkit-overflow-scrolling: touch;
}

#easymd .block-equation svg {
  max-width: 300% !important;
  -webkit-overflow-scrolling: touch;
}

#easymd .inline-equation {
}

#easymd .inline-equation svg {
}

#easymd .imageflow-layer1 {
  margin-top: 1em;
  margin-bottom: 0.5em;
  white-space: normal;
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

#easymd .nice-suffix-juejin-container {
  margin-top: 20px !important;
}

#easymd figure a {
  border: none;
}

#easymd figure a img {
  margin: 0px;
}

#easymd figure {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 图片链接嵌套 */
#easymd figure a {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 图片链接嵌套，图片解释 */
#easymd figure a + figcaption {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: -35px;
  background: rgba(0,0,0,0.7);
  color: #ffffff;
  line-height: 35px;
  z-index: 20;
}

#easymd .callout {
  margin: 24px 0;
  padding: 18px 20px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  box-shadow: 0 12px 25px rgba(15, 23, 42, 0.08);
}

#easymd .callout-title {
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 0;
  letter-spacing: 0.05em;
}

#easymd .callout-icon { margin-right: 8px;
  font-size: 18px;
}

#easymd .callout-note { border-left: 4px solid #6366f1; background: #f5f5ff; }
#easymd .callout-tip { border-left: 4px solid #10b981; background: #ecfdf5; }
#easymd .callout-important { border-left: 4px solid #8b5cf6; background: #f5f3ff; }
#easymd .callout-warning { border-left: 4px solid #f59e0b; background: #fffbeb; }
#easymd .callout-caution { border-left: 4px solid #ef4444; background: #fff5f5; }


#easymd .task-list-item {
  list-style: none;
  margin-left: -1.2em;
  margin-bottom: 6px;
  display: flex;
  gap: 0;
  align-items: flex-start;
}

#easymd .task-list-item input[type='checkbox'] {
  margin-top: 4px;
  pointer-events: none;
}
`;
