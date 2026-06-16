import type { CSSProperties } from "react";

export type OlloThemeName = "dark" | "light";

export const OLLO_FONT_UI =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Helvetica, Arial, sans-serif';
export const OLLO_FONT_MONO =
  'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace';

export const olloCssVarNames = {
  bgSidebar: "--ollo-bg-sidebar",
  bgCanvas: "--ollo-bg-canvas",
  bgRaised: "--ollo-bg-raised",
  bgHover: "--ollo-bg-hover",
  bgActive: "--ollo-bg-active",
  hairline: "--ollo-hairline",
  border: "--ollo-border",
  text1: "--ollo-text-1",
  text2: "--ollo-text-2",
  text3: "--ollo-text-3",
  accent: "--ollo-accent",
  sage: "--ollo-sage",
  brick: "--ollo-brick",
  amber: "--ollo-amber",
} as const;

export type OlloCssVarName =
  (typeof olloCssVarNames)[keyof typeof olloCssVarNames];

export type OlloThemeVars = Record<OlloCssVarName, string>;

// Source of truth for the Waylay/Ollo light and dark palettes.
// Elevation reads by value step: chrome recedes, canvas sits in the middle,
// raised surfaces pop. Accent is reserved for primary actions and focus rings.
export const olloThemes: Record<OlloThemeName, OlloThemeVars> = {
  dark: {
    "--ollo-bg-sidebar": "#151515",
    "--ollo-bg-canvas": "#1b1b1b",
    "--ollo-bg-raised": "#232323",
    "--ollo-bg-hover": "rgba(255,255,255,0.055)",
    "--ollo-bg-active": "rgba(255,255,255,0.085)",
    "--ollo-hairline": "rgba(255,255,255,0.085)",
    "--ollo-border": "rgba(255,255,255,0.16)",
    "--ollo-text-1": "#ececec",
    "--ollo-text-2": "#9a9a9a",
    "--ollo-text-3": "#6d6d6d",
    "--ollo-accent": "#e8502e",
    "--ollo-sage": "#93b08a",
    "--ollo-brick": "#c9695a",
    "--ollo-amber": "#c9a35a",
  },
  light: {
    "--ollo-bg-sidebar": "#e2e2e2",
    "--ollo-bg-canvas": "#f5f5f5",
    "--ollo-bg-raised": "#ffffff",
    "--ollo-bg-hover": "rgba(0,0,0,0.045)",
    "--ollo-bg-active": "rgba(0,0,0,0.075)",
    "--ollo-hairline": "rgba(0,0,0,0.10)",
    "--ollo-border": "rgba(0,0,0,0.18)",
    "--ollo-text-1": "#1a1a1a",
    "--ollo-text-2": "#5f5f5f",
    "--ollo-text-3": "#8a8a8a",
    "--ollo-accent": "#e8502e",
    "--ollo-sage": "#4f7a45",
    "--ollo-brick": "#b0463a",
    "--ollo-amber": "#8f6f24",
  },
};

// Use these in React inline styles. The browser resolves the CSS variable
// against whichever theme is currently applied to the root element.
export const olloTokenRefs = {
  bgSidebar: "var(--ollo-bg-sidebar)",
  bgCanvas: "var(--ollo-bg-canvas)",
  bgRaised: "var(--ollo-bg-raised)",
  bgHover: "var(--ollo-bg-hover)",
  bgActive: "var(--ollo-bg-active)",
  hairline: "var(--ollo-hairline)",
  border: "var(--ollo-border)",
  text1: "var(--ollo-text-1)",
  text2: "var(--ollo-text-2)",
  text3: "var(--ollo-text-3)",
  accent: "var(--ollo-accent)",
  sage: "var(--ollo-sage)",
  brick: "var(--ollo-brick)",
  amber: "var(--ollo-amber)",
  fontUi: OLLO_FONT_UI,
  fontMono: OLLO_FONT_MONO,
} as const;

// Short alias used throughout the mockup.
export const T = olloTokenRefs;

export const olloDesignTokens = {
  typography: {
    fontUi: OLLO_FONT_UI,
    fontMono: OLLO_FONT_MONO,
    price: {
      fontSize: 30,
      fontWeight: 550,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    input: { fontSize: 14.5, fontWeight: 400, lineHeight: 1.55 },
    body: { fontSize: 14, fontWeight: 400, lineHeight: 1.55 },
    label: { fontSize: 13, fontWeight: 500, lineHeight: 1.5 },
    table: { fontSize: 12.5, fontWeight: 400, lineHeight: 1.5 },
    meta: { fontSize: 11.5, fontWeight: 400, lineHeight: 1.5 },
    section: {
      fontSize: 11,
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: "0.02em",
    },
    micro: { fontSize: 10, fontWeight: 500, lineHeight: 1 },
    clock: { fontSize: 22, lineHeight: 1 },
    canvasPlaceholder: {
      fontSize: 30,
      letterSpacing: "0.1em",
      opacity: 0.3,
    },
  },
  spacing: {
    unit: 4,
    cardPadding: 16,
    composerPadding: 12,
    canvasGutter: 20,
    sidebarGutter: 12,
    inlineGap: 8,
    iconGap: 10,
    headerPaddingX: 12,
    footerPaddingX: 16,
    headerClusterGap: 8,
    sectionGap: 2,
    hairlineInsetY: "25%",
    hairlineInsetHeight: "50%",
  },
  radii: {
    pill: 999,
    composer: 18,
    card: 14,
    control: 10,
    headerControl: 9,
    hover: 7,
    code: 5,
    circle: "50%",
  },
  layout: {
    headerHeight: 52,
    footerHeight: 36,
    chromeCellWidth: 52,
    headerCenterColumnWidth: 448,
    sidebarWidth: 264,
    collapsedSidebarWidth: 52,
    rightRailWidth: 248,
    contentMaxWidth: 780,
    collapseRailBelow: 980,
    collapseSidebarBelow: 680,
  },
  size: {
    headerWindowHeight: 36,
    headerIconWindow: 36,
    headerSearchActionWidth: 42,
    footerIconButton: 28,
    avatar: 32,
    logo: 31,
    notificationDot: 6,
    sidebarRailItem: 36,
    sidebarIcon: 16,
    headerIcon: 18,
    smallIcon: 14,
    utilityPanelTextareaHeight: "7rem",
    utilityPanelButtonHeight: 28,
  },
  shadow: {
    floatingComposer: "0 8px 32px rgba(0,0,0,0.35)",
  },
  motion: {
    fast: "100ms ease",
    normal: "150ms ease",
    properties: ["background", "color", "transform", "filter"],
  },
} as const;

export const olloComponentRecipes = {
  ghostButton: {
    rest: { background: "transparent", color: T.text2 },
    hover: { background: T.bgHover, color: T.text1 },
    active: { background: T.bgActive, color: T.text1 },
    size: 30,
    radius: olloDesignTokens.radii.hover,
  },
  card: {
    background: T.bgRaised,
    borderRadius: olloDesignTokens.radii.card,
    padding: olloDesignTokens.spacing.cardPadding,
    border: "none",
    boxShadow: "none",
  },
  headerWindow: {
    background: T.bgRaised,
    borderRadius: olloDesignTokens.radii.control,
    height: olloDesignTokens.size.headerWindowHeight,
    border: "none",
    boxShadow: "none",
  },
  chromeFrame: {
    background: T.bgSidebar,
    borderColor: T.border,
  },
  sidebarRailItem: {
    width: olloDesignTokens.size.sidebarRailItem,
    height: olloDesignTokens.size.sidebarRailItem,
    borderRadius: olloDesignTokens.radii.control,
  },
  avatar: {
    width: olloDesignTokens.size.avatar,
    height: olloDesignTokens.size.avatar,
    borderRadius: olloDesignTokens.radii.circle,
    background: T.bgActive,
    color: T.text2,
    fontSize: 12,
    fontWeight: 550,
  },
  badge: {
    background: T.bgActive,
    borderRadius: olloDesignTokens.radii.pill,
    fontSize: 10.5,
    fontWeight: 550,
  },
  utilityPanel: {
    textarea: {
      height: olloDesignTokens.size.utilityPanelTextareaHeight,
      background: T.bgRaised,
      color: T.text3,
      border: "none",
      outline: "none",
    },
    action: {
      height: olloDesignTokens.size.utilityPanelButtonHeight,
      background: T.bgRaised,
      color: T.text1,
      fontWeight: 500,
      borderTop: `1px solid ${T.hairline}`,
    },
  },
  focusVisible: {
    outline: `2px solid ${T.accent}`,
    outlineOffset: 2,
  },
} as const;

// Every figure a user might compare or watch change should use this.
// Size belongs at the call site so mono figures do not shrink unexpectedly.
export const numStyle: CSSProperties = {
  fontFamily: T.fontMono,
  fontVariantNumeric: "tabular-nums",
  letterSpacing: "-0.01em",
};

export function olloRootStyle(theme: OlloThemeName): CSSProperties {
  return {
    ...olloThemes[theme],
    background: T.bgCanvas,
    color: T.text1,
    fontFamily: T.fontUi,
  } as CSSProperties;
}

export function applyOlloTheme(
  element: HTMLElement,
  theme: OlloThemeName,
): void {
  for (const [name, value] of Object.entries(olloThemes[theme])) {
    element.style.setProperty(name, value);
  }
  element.style.background = T.bgCanvas;
  element.style.color = T.text1;
  element.style.fontFamily = T.fontUi;
}

export const olloThemeRules = [
  "Separate surfaces by value, not borders.",
  "Use accent only for primary actions and focus rings.",
  "Use sage, brick, and amber only for semantic data states.",
  "Keep type hierarchy in weight and color, not large size jumps.",
  "Use mono tabular numerals for all comparable figures.",
  "Keep spacing on a 4px base grid, preferring 8px rhythm.",
  "Use pill geometry for standalone actions and chips.",
  "Avoid pure black, pure white, uppercase labels, and 600+ font weights.",
] as const;

// Backwards-compatible names for the existing dashboard mockup.
export type ThemeName = OlloThemeName;
export const THEMES = olloThemes;
