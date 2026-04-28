export const codeGithubTheme = `/*
github.com style (c) Vasily Polovnyov <vast@whiteants.net>
*/

/* 代码块样式 - 需要添加 #easymd 前缀以匹配包装后的 HTML */
#easymd .hljs {
  display: block;
  overflow-x: auto;
  padding: 16px;
  color: #333;
  background: #f8f8f8;
}

#easymd .hljs-comment,
#easymd .hljs-quote {
  color: #998;
  font-style: italic;
}

#easymd .hljs-keyword,
#easymd .hljs-selector-tag,
#easymd .hljs-subst {
  color: #333;
  font-weight: bold;
}

#easymd .hljs-number,
#easymd .hljs-literal,
#easymd .hljs-variable,
#easymd .hljs-template-variable,
#easymd .hljs-tag .hljs-attr {
  color: #008080;
}

#easymd .hljs-string,
#easymd .hljs-doctag {
  color: #d14;
}

#easymd .hljs-title,
#easymd .hljs-section,
#easymd .hljs-selector-id {
  color: #900;
  font-weight: bold;
}

#easymd .hljs-subst {
  font-weight: normal;
}

#easymd .hljs-type,
#easymd .hljs-class .hljs-title {
  color: #458;
  font-weight: bold;
}

#easymd .hljs-tag,
#easymd .hljs-name,
#easymd .hljs-attribute {
  color: #000080;
  font-weight: normal;
}

#easymd .hljs-regexp,
#easymd .hljs-link {
  color: #009926;
}

#easymd .hljs-symbol,
#easymd .hljs-bullet {
  color: #990073;
}

#easymd .hljs-built_in,
#easymd .hljs-builtin-name {
  color: #0086b3;
}

#easymd .hljs-meta {
  color: #999;
  font-weight: bold;
}

#easymd .hljs-deletion {
  background: #fdd;
}

#easymd .hljs-addition {
  background: #dfd;
}

#easymd .hljs-emphasis {
  font-style: italic;
}

#easymd .hljs-strong {
  font-weight: bold;
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
