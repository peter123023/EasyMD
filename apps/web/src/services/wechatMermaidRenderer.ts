/**
 * 微信复制 Mermaid 图表渲染
 * 将 Mermaid 代码块渲染为 PNG 图片，确保微信公众号兼容
 */

import mermaid from "mermaid";
import { useThemeStore } from "../store/themeStore";
import {
  getMermaidConfig,
  getThemedMermaidDiagram,
} from "../utils/mermaidConfig";

let mermaidInitialized = false;

const ensureMermaidInitialized = () => {
  if (mermaidInitialized) return;
  try {
    mermaid.initialize({ startOnLoad: false });
    mermaidInitialized = true;
  } catch (e) {
    console.error("Mermaid initialization failed in copy service:", e);
  }
};

const getThemeInfo = () => {
  const state = useThemeStore.getState();
  const themeId = state.themeId;
  const currentTheme =
    state.customThemes.find((t) => t.id === themeId) ||
    state.getAllThemes().find((t) => t.id === themeId);
  return currentTheme?.designerVariables;
};

const getSvgDimensions = (svgElement: SVGElement) => {
  const parseSize = (value: string | null): number | null => {
    if (!value) return null;
    const trimmed = value.trim();
    if (trimmed.endsWith("%")) return null;
    const parsed = Number.parseFloat(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const width = parseSize(svgElement.getAttribute("width"));
  const height = parseSize(svgElement.getAttribute("height"));

  if (width && height) {
    return { width, height };
  }

  const viewBox = svgElement.getAttribute("viewBox");
  if (viewBox) {
    const parts = viewBox
      .trim()
      .split(/[\s,]+/)
      .map(Number);
    if (parts.length === 4 && parts.every(Number.isFinite)) {
      return { width: parts[2], height: parts[3] };
    }
  }

  return { width: 400, height: 300 };
};

/**
 * 将 SVG 转换为 PNG Data URL
 * 使用 Canvas 渲染，确保微信完全兼容
 */
const svgMarkupToPng = async (svgMarkup: string): Promise<string> => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgMarkup, "image/svg+xml");
  const svgElement = doc.documentElement as unknown as SVGElement;
  const { width, height } = getSvgDimensions(svgElement);

  svgElement.setAttribute("width", String(width));
  svgElement.setAttribute("height", String(height));
  if (!svgElement.getAttribute("xmlns")) {
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  }

  // 序列化 SVG
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;

  // 加载图片
  const img = new Image();
  img.src = svgDataUrl;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (e) => reject(e);
  });

  // 使用 3x 分辨率渲染到 Canvas（高清）
  const scale = 3;
  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  // 1. 填充白色背景（防止深色模式下透明背景看不清文字）
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // 2. 绘制 SVG 图片
  ctx.drawImage(img, 0, 0);

  // 导出为 PNG
  return canvas.toDataURL("image/png");
};

export const renderMermaidBlocks = async (
  container: HTMLElement,
): Promise<void> => {
  const mermaidBlocks = Array.from(container.querySelectorAll("pre.mermaid"));
  if (mermaidBlocks.length === 0) return;

  ensureMermaidInitialized();
  const designerVariables = getThemeInfo();
  const renderIdBase = `easymd-mermaid-${Date.now()}`;

  // 构建 Mermaid 配置
  const initConfig = getMermaidConfig(designerVariables);

  for (const [index, block] of mermaidBlocks.entries()) {
    const diagram = block.textContent ?? "";
    if (!diagram.trim()) continue;

    try {
      const themedDiagram = getThemedMermaidDiagram(diagram, initConfig);
      const { svg } = await mermaid.render(
        `${renderIdBase}-${index}`,
        themedDiagram,
      );
      const pngDataUrl = await svgMarkupToPng(svg);
      const figure = document.createElement("div");
      figure.style.margin = "1em 0";
      figure.style.textAlign = "center";

      const img = document.createElement("img");
      img.src = pngDataUrl;
      img.style.width = "100%";
      img.style.display = "block";
      img.style.margin = "0 auto";
      img.style.maxWidth = "100%";
      img.style.height = "auto";

      figure.appendChild(img);
      block.parentNode?.replaceChild(figure, block);
    } catch (error) {
      console.error("[easymd] Mermaid render failed:", error);
    }
  }
};
