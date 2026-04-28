import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { useEditorStore } from "../../store/editorStore";
import { useThemeStore } from "../../store/themeStore";
import { useHistoryStore } from "../../store/historyStore";
import { platformActions } from "../../lib/platformAdapter";
import "./Header.css";

const ThemePanel = lazy(() =>
  import("../Theme/ThemePanel").then((m) => ({ default: m.ThemePanel })),
);
const StorageModeSelector = lazy(() =>
  import("../StorageModeSelector/StorageModeSelector").then((m) => ({
    default: m.StorageModeSelector,
  })),
);
const ImageHostSettings = lazy(() =>
  import("../Settings/ImageHostSettings").then((m) => ({
    default: m.ImageHostSettings,
  })),
);
import {
  Layers,
  Palette,
  Send,
  ImageIcon,
  Sun,
  Moon,
  ChevronsUp,
  ChevronsDown,
  Sparkles,
} from "lucide-react";
import { useUITheme } from "../../hooks/useUITheme";
import { useWindowControls } from "../../hooks/useWindowControls";
import { Modal, FloatingToolbarButton } from "../common";

const DefaultLogoMark = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M40 30 H160 C171 30 180 39 180 50 V130 C180 141 171 150 160 150 H40 C29 150 20 141 20 130 V50 C20 39 29 30 40 30 Z"
      fill="#4A90E2"
    />
    <path
      d="M60 65 L60 115 H80 L80 95 L100 115 L120 95 L120 115 H140 L140 65 L120 65 L100 85 L80 65 Z"
      fill="#FFFFFF"
    />
    <circle cx="150" cy="50" r="8" fill="#F5A623" />
    <circle cx="165" cy="70" r="6" fill="#7ED321" />
    <circle cx="140" cy="80" r="4" fill="#BD10E0" />
  </svg>
);

const structuralismLogoSrc = `${import.meta.env.BASE_URL}favicon-light.svg`;

const StructuralismLogoMark = () => (
  <img
    src={structuralismLogoSrc}
    alt="EASYMD Logo"
    width={40}
    height={40}
    style={{ display: "block" }}
  />
);

const WindowControls = ({ fixed = false }: { fixed?: boolean }) => {
  const { minimize, maximize, close } = useWindowControls();

  return (
    <div className={fixed ? "window-controls-fixed" : "window-controls"}>
      <button
        className="win-btn win-minimize"
        onClick={() => minimize?.()}
        aria-label="最小化"
      >
        <svg width="10" height="1" viewBox="0 0 10 1">
          <rect width="10" height="1" fill="currentColor" />
        </svg>
      </button>
      <button
        className="win-btn win-maximize"
        onClick={() => maximize?.()}
        aria-label="最大化"
      >
        <svg width="10" height="10" viewBox="0 0 10 10">
          <rect
            width="9"
            height="9"
            x="0.5"
            y="0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </button>
      <button
        className="win-btn win-close"
        onClick={() => close?.()}
        aria-label="关闭"
      >
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path
            d="M0,0 L10,10 M10,0 L0,10"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </button>
    </div>
  );
};

export function Header() {
  const { copyToWechat } = useEditorStore();
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [showStorageModal, setShowStorageModal] = useState(false);
  const [showImageHostModal, setShowImageHostModal] = useState(false);
  const [showThemeSelect, setShowThemeSelect] = useState(false);
  const themeSelectRef = useRef<HTMLDivElement>(null);
  const uiTheme = useUITheme((state) => state.theme);
  const setTheme = useUITheme((state) => state.setTheme);
  const isStructuralismUI = uiTheme === "dark";

  const { isElectron, isWindows, platform } = useWindowControls();
  
  const selectTheme = useThemeStore((state) => state.selectTheme);
  const getAllThemes = useThemeStore((state) => state.getAllThemes);
  const currentThemeId = useThemeStore((state) => state.themeId);
  const persistActiveSnapshot = useHistoryStore((state) => state.persistActiveSnapshot);

  // 自动隐藏标题栏状态（默认浮动模式）
  const [autoHide, setAutoHide] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const saved = window.localStorage.getItem("easymd-header-autohide");
      // 首次启动默认使用浮动工具栏模式
      if (saved === null) return true;
      return saved === "true";
    } catch {
      return true;
    }
  });

  // 保存状态到 localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("easymd-header-autohide", String(autoHide));
    } catch {
      // 忽略存储不可用的场景（如隐私模式）
    }
  }, [autoHide]);

  // 处理点击外部关闭主题选择下拉面板
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 检查是否点击了浮动工具栏的主题选择下拉面板
      const floatingThemeSelect = document.querySelector(".floating-theme-select-dropdown");
      if (floatingThemeSelect && floatingThemeSelect.contains(event.target as Node)) {
        return;
      }
      
      // 检查是否点击了顶部菜单栏的主题选择下拉面板
      if (themeSelectRef.current && themeSelectRef.current.contains(event.target as Node)) {
        return;
      }
      
      // 点击了外部，关闭下拉面板
      setShowThemeSelect(false);
    };

    if (showThemeSelect) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showThemeSelect]);

  // 处理主题选择
  const handleThemeSelect = (themeId: string) => {
    // 先选择主题
    selectTheme(themeId);
    
    // 保存状态到历史记录
    const theme = getAllThemes().find((t) => t.id === themeId);
    if (theme && platformActions.shouldPersistHistory()) {
      const state = useEditorStore.getState();
      persistActiveSnapshot({
        markdown: state.markdown,
        theme: themeId,
        customCSS: "",
        themeName: theme.name || "默认主题",
      });
    }
    
    // 最后关闭下拉面板
    setTimeout(() => {
      setShowThemeSelect(false);
    }, 100);
  };

  // 切换标题栏显示/隐藏
  const handleHideHeader = () => {
    setAutoHide(true);
  };

  // Mac 平台使用内联样式强制避让
  const headerStyle =
    platform === "darwin" ? { paddingLeft: "80px" } : undefined;

  return (
    <>
      {/* 隐藏状态下的持久化窗口控制 (Windows only) */}
      {autoHide && isWindows && <WindowControls fixed />}

      {/* 隐藏状态下的浮动工具栏 */}
      {autoHide && (
        <div
          className={`floating-toolbar ${isWindows ? "floating-toolbar-win" : ""}`}
        >
          <FloatingToolbarButton
            icon={<ChevronsUp size={18} strokeWidth={2} />}
            label="显示标题栏"
            onClick={() => setAutoHide(false)}
            highlight
          />
          <FloatingToolbarButton
            icon={
              uiTheme === "dark" ? (
                <Sun size={18} strokeWidth={2} />
              ) : (
                <Moon size={18} strokeWidth={2} />
              )
            }
            label={uiTheme === "dark" ? "亮色模式" : "暗色模式"}
            onClick={() => setTheme(uiTheme === "dark" ? "default" : "dark")}
          />
          {!isElectron && (
            <FloatingToolbarButton
              icon={<Layers size={18} strokeWidth={2} />}
              label="存储模式"
              onClick={() => setShowStorageModal(true)}
            />
          )}
          <FloatingToolbarButton
            icon={<ImageIcon size={18} strokeWidth={2} />}
            label="图床设置"
            onClick={() => setShowImageHostModal(true)}
          />
          <FloatingToolbarButton
            icon={<Sparkles size={18} strokeWidth={2} />}
            label="选择主题"
            onClick={() => setShowThemeSelect(!showThemeSelect)}
          />
          <FloatingToolbarButton
            icon={<Palette size={18} strokeWidth={2} />}
            label="主题管理"
            onClick={() => setShowThemePanel(true)}
          />
          <FloatingToolbarButton
            icon={<Send size={18} strokeWidth={2} />}
            label="复制到公众号"
            onClick={copyToWechat}
            primary
          />
        </div>
      )}

      {/* 浮动工具栏的主题选择下拉面板 */}
      {autoHide && showThemeSelect && (
        <div className="floating-theme-select-dropdown">
          <div className="theme-select-header">
            <h4>选择主题</h4>
          </div>
          <div className="theme-select-list">
            {getAllThemes().map((theme) => (
              <button
                key={theme.id}
                className={`theme-select-item ${currentThemeId === theme.id ? 'active' : ''}`}
                onClick={() => handleThemeSelect(theme.id)}
              >
                <span className="theme-name">{theme.name}</span>
                {theme.isBuiltIn && <span className="theme-badge">内置</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      <header
        className={`app-header ${autoHide ? "header-auto-hide" : ""}`}
        style={headerStyle}
      >
        <div className="header-left">
          <div className="logo">
            {isStructuralismUI ? (
              <StructuralismLogoMark />
            ) : (
              <DefaultLogoMark />
            )}
            <div className="logo-info">
              <span className="logo-text">EASYMD</span>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <div className="header-right">
            <button
              className="btn-icon-only"
              onClick={() => setTheme(uiTheme === "dark" ? "default" : "dark")}
              aria-label={
                uiTheme === "dark" ? "切换到亮色模式" : "切换到暗色模式"
              }
              title={uiTheme === "dark" ? "切换到亮色模式" : "切换到暗色模式"}
            >
              {uiTheme === "dark" ? (
                <Sun size={18} strokeWidth={2} />
              ) : (
                <Moon size={18} strokeWidth={2} />
              )}
            </button>
            {!isElectron && (
              <button
                className="btn-secondary"
                onClick={() => setShowStorageModal(true)}
              >
                <Layers size={18} strokeWidth={2} />
                <span>存储模式</span>
              </button>
            )}
            <button
              className="btn-secondary"
              onClick={() => setShowImageHostModal(true)}
            >
              <ImageIcon size={18} strokeWidth={2} />
              <span>图床设置</span>
            </button>
            <div className="theme-select-container" ref={themeSelectRef}>
              <button
                className="btn-secondary"
                onClick={() => setShowThemeSelect(!showThemeSelect)}
              >
                <Sparkles size={18} strokeWidth={2} />
                <span>选择主题</span>
              </button>
              {showThemeSelect && (
                <div className="theme-select-dropdown">
                  <div className="theme-select-header">
                    <h4>选择主题</h4>
                  </div>
                  <div className="theme-select-list">
                    {getAllThemes().map((theme) => (
                      <button
                        key={theme.id}
                        className={`theme-select-item ${currentThemeId === theme.id ? 'active' : ''}`}
                        onClick={() => handleThemeSelect(theme.id)}
                      >
                        <span className="theme-name">{theme.name}</span>
                        {theme.isBuiltIn && <span className="theme-badge">内置</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              className="btn-secondary"
              onClick={() => setShowThemePanel(true)}
            >
              <Palette size={18} strokeWidth={2} />
              <span>主题管理</span>
            </button>

            <button className="btn-primary" onClick={copyToWechat}>
              <Send size={18} strokeWidth={2} />
              <span>复制到公众号</span>
            </button>

            <button
              className="btn-ghost"
              onClick={handleHideHeader}
              aria-label="隐藏标题栏"
              title="隐藏标题栏"
            >
              <ChevronsDown size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Windows 自定义标题栏按钮 */}
          {isWindows && <WindowControls />}
        </div>
      </header>

      <Suspense fallback={null}>
        <ThemePanel
          open={showThemePanel}
          onClose={() => setShowThemePanel(false)}
        />
      </Suspense>

      <Modal
        open={showStorageModal}
        onClose={() => setShowStorageModal(false)}
        title="选择存储模式"
      >
        <Suspense
          fallback={
            <div style={{ padding: "20px", textAlign: "center" }}>
              loading...
            </div>
          }
        >
          <StorageModeSelector />
        </Suspense>
      </Modal>

      <Modal
        open={showImageHostModal}
        onClose={() => setShowImageHostModal(false)}
        title="图床设置"
        className="modal-narrow"
      >
        <Suspense
          fallback={
            <div style={{ padding: "20px", textAlign: "center" }}>
              loading...
            </div>
          }
        >
          <ImageHostSettings />
        </Suspense>
      </Modal>
    </>
  );
}
