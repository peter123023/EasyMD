/**
 * 微信复制表格样式强化
 * 覆盖表格布局参数（字号、行高、内边距），确保微信公众号中样式严格可控
 *
 * 设计原则：
 * - 布局参数独立优化（13px/1.4/紧凑 padding），不绑定主题字号
 * - 色彩（边框、背景、斑马纹）跟主题走，保持视觉统一
 * - 宽表格保持 nowrap + 外层 overflow-x:auto，微信手机端可左右滑动
 */

/** 表格专用布局参数（独立于主题字号，针对手机可读性优化） */
const TABLE_LAYOUT_STYLES = {
  fontSize: "13px",
  lineHeight: "1.4",
  cellPadding: "6px 8px",
} as const;

/**
 * 覆盖表格布局参数，保留主题色彩
 * 只改 font-size / line-height / padding，不碰 color / background / border-color
 */
const applyTableLayoutStyles = (table: HTMLTableElement): void => {
  table.style.borderCollapse = "collapse";
  table.style.tableLayout = "auto";
  table.style.width = "auto";
  table.style.minWidth = "100%";
  table.style.whiteSpace = "nowrap";

  const cells = table.querySelectorAll("th, td");
  for (const cell of cells) {
    const el = cell as HTMLElement;
    el.style.fontSize = TABLE_LAYOUT_STYLES.fontSize;
    el.style.lineHeight = TABLE_LAYOUT_STYLES.lineHeight;
    el.style.padding = TABLE_LAYOUT_STYLES.cellPadding;
    el.style.whiteSpace = "nowrap";
    el.style.textAlign = "center";
  }
};

/**
 * 确保 .table-container 有 overflow-x:auto（自定义主题可能缺失此规则）
 * 直接写 inline style，不依赖主题 CSS 被 juice 内联
 */
const ensureContainerScroll = (tableContainer: HTMLElement): void => {
  tableContainer.style.overflowX = "auto";
  tableContainer.style.setProperty("-webkit-overflow-scrolling", "touch");
};

/**
 * 复制流程入口：强制覆盖所有表格的布局参数
 * 在 wechatCopyService 中于 renderMermaidBlocks 之后、normalizeCopyContainer 之前调用
 */
export const renderTableBlocks = async (
  container: HTMLElement,
): Promise<void> => {
  const tableContainers =
    container.querySelectorAll<HTMLElement>(".table-container");
  for (const tc of tableContainers) {
    ensureContainerScroll(tc);
    const table = tc.querySelector("table");
    if (table) applyTableLayoutStyles(table);
  }
};

/**
 * 预览面板入口：强制覆盖表格布局参数，让用户看到与手机一致的效果
 */
export const renderTableBlocksForPreview = async (
  container: HTMLElement,
): Promise<void> => {
  const tables = container.querySelectorAll<HTMLTableElement>(
    ".table-container table",
  );
  for (const table of tables) {
    applyTableLayoutStyles(table);
  }
};
