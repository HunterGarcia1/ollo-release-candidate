# Trading Terminal Design Rulebook

Version: `0.1`
Date: `2026-06-26`
Status: Draft source of truth for engineering implementation

## Purpose

This rulebook defines the visual system every trading-terminal and website page should inherit. The dark theme supplied by product is canonical. The light theme is adjusted to preserve the same hue intent while remaining usable on a light surface.

Fonts are intentionally provisional. Use `Inter` for now until the final UI and code fonts are approved. Text sizing is included now because it affects header/sidebar density and should not be left to per-page judgment.

## Theme Contract

Use semantic roles in product code. Do not hard-code raw hex values in components.

### Core Brand Colors

| Role | Dark | Light | Usage |
| --- | --- | --- | --- |
| `surface` | `#2d2d2b` | `#f9f9f7` | App background and main page canvas |
| `ink` | `#f9f9f7` | `#2d2d2b` | Primary text and icons |
| `accent` | `#ff6600` | `#ff6600` | Brand accent, primary actions, active focus |
| `accentText` | `#ff8a33` | `#b84700` | Small accent text on the theme surface |

### Trading Semantic Colors

| Role | Dark | Light | Meaning |
| --- | --- | --- | --- |
| `positive` | `#00ff66` | `#007a33` | Up moves, profit, bids, successful fills |
| `negative` | `#ff0099` | `#c20073` | Down moves, loss, asks, destructive market states |
| `info` | `#0099ff` | `#006bb8` | Neutral data highlights, links, selected chart overlays |

The dark semantic colors stay exactly as supplied. The light values are darker siblings of the same hue families so they can be used for small labels and dense tabular UI on `#f9f9f7`.

### Surface Stack

| Role | Dark | Light | Usage |
| --- | --- | --- | --- |
| `surface` | `#2d2d2b` | `#f9f9f7` | Root background |
| `surfaceRaised` | `#363632` | `#ffffff` | Header, sidebar, panels |
| `surfaceSunken` | `#232321` | `#efefea` | Inputs, wells, chart gutters |
| `surfaceHover` | `#40403c` | `#eeeeea` | Hover state on neutral controls |
| `surfaceActive` | `#4a4a45` | `#e5e5de` | Selected rows, pressed controls |
| `borderSubtle` | `#3a3a36` | `#e3e3dc` | Hairline dividers |
| `border` | `#4a4a45` | `#d4d4cb` | Default control and panel borders |

### Text Stack

| Role | Dark | Light | Usage |
| --- | --- | --- | --- |
| `ink` | `#f9f9f7` | `#2d2d2b` | Primary text |
| `inkMuted` | `#c9c9c2` | `#676761` | Secondary text |
| `inkSubtle` | `#8f8f87` | `#8a8a82` | Tertiary text, placeholders |
| `inkDisabled` | `#666660` | `#b6b6ad` | Disabled labels and icons |

## Spacing System

Adopt Replit's observed spacing scale:

`1, 2, 4, 6, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 96, 128, 256`

Default spacing unit: `8px`.

Use the scale strictly. Avoid one-off values unless matching market data grids, chart canvases, or exchange-provided dimensions.

## Radius System

Adopt Replit's observed radius scale:

`1, 2, 4, 6, 8, 12, 16`

Default radius: `6px`.

Use `6px` for controls and rows, `8px` for panels/cards, `12px` for menus/popovers, and `16px` only for dialogs or prominent pills.

## Typography System

Use Replit's observed type scale as the provisional terminal scale. The font family may change later, but sizes, line heights, and weights should stay stable unless the approved font requires optical adjustment.

### Type Scale

| Token | Size | Line height | Usage |
| --- | --- | --- | --- |
| `type.small` | `12px` | `1.5` | Metadata, badges, timestamps, subtle labels |
| `type.default` | `14px` | `1.6` | Default UI text, sidebar rows, menu items, table chrome |
| `type.subhead` | `16px` | `1.375` | Panel titles, compact section headings |
| `type.subheadLarge` | `20px` | `1.4` | Dense page headings, modal titles |
| `type.header` | `24px` | `1.333` | Major screen headings |
| `type.headerLarge` | `32px` | `1.25` | Rare marketing or overview headings |

### Font Weights

| Token | Weight | Usage |
| --- | --- | --- |
| `weight.regular` | `400` | Normal labels and body text |
| `weight.medium` | `500` | Active nav, headers, important labels |
| `weight.bold` | `600` | Strong emphasis and major headings |

### Header And Sidebar Text

| Area | Size | Line height | Weight | Rule |
| --- | --- | --- | --- | --- |
| Header label | `14px` | `1.6` | `500` | Workspace name, selected account, primary nav trigger |
| Header secondary text | `12px` | `1.5` | `400` | Status, metadata, secondary pill text |
| Sidebar row label | `14px` | `1.6` | `400` | Default navigation row |
| Sidebar active row label | `14px` | `1.6` | `500` | Current page or selected workspace |
| Sidebar section label | `12px` | `1.5` | `500` | Optional compact section headers |
| Sidebar badge | `12px` | `1.5` | `500` | Counts, states, short tags |

Do not reduce sidebar or header labels below `14px` just to fit more text. Truncate labels instead. Use `12px` only for metadata, badges, and secondary context.

## App Shell

These rules are based on observed Replit public markup/CSS, adapted for a dense trading terminal.

### Header

| Token | Value | Rule |
| --- | --- | --- |
| `shell.header.height` | `48px` | Default app header height |
| `shell.header.controlHeight` | `32px` | Dense header buttons, menus, and segmented controls |
| `shell.header.titlePillHeight` | `40px` | Workspace/account/title pill |
| `shell.header.paddingX` | `12px` | Product app header padding |
| `shell.header.websitePaddingX` | `24px` | Public website or marketing header padding |
| `shell.header.gap` | `8px` | Gap between header clusters |
| `shell.header.groupGap` | `12px` | Gap inside nav/control groups |
| `shell.header.brandGap` | `24px` | Gap between brand/workspace block and nav |

Header controls must visually align to the 32px row height. Use 16px icons. Primary actions may use 40px height only when they are not competing with dense market data.

Header text uses `14px / 1.6` at `500` weight for primary labels and `12px / 1.5` at `400` weight for secondary metadata.

### Left Sidebar

| Token | Value | Rule |
| --- | --- | --- |
| `shell.sidebar.width` | `240px` | Expanded product sidebar |
| `shell.sidebar.collapsedWidth` | `32px` | Collapsed rail |
| `shell.sidebar.paddingX` | `8px` | List horizontal padding |
| `shell.sidebar.paddingY` | `4px` | List vertical padding |
| `shell.sidebar.rowHeight` | `32px` | Default nav row |
| `shell.sidebar.rowPaddingX` | `8px` | Row horizontal padding |
| `shell.sidebar.rowGap` | `8px` | Icon-to-label and row content gap |
| `shell.sidebar.rowRadius` | `6px` | Nav row radius |
| `shell.sidebar.iconSize` | `16px` | Sidebar icon size |
| `shell.sidebar.searchHeight` | `28px` | Compact sidebar search field |

Sidebar rows should stay 32px tall even when active, hovered, or showing trailing actions. Labels truncate; rows do not grow.

Sidebar row text uses `14px / 1.6`. Default rows use `400` weight; active rows use `500`. Section labels and badges use `12px / 1.5` at `500` weight.

### Menus And Popovers

| Token | Value | Rule |
| --- | --- | --- |
| `menu.itemHeight` | `32px` | Default menu item height |
| `menu.itemPaddingX` | `6px` or `8px` | Use `6px` for very compact menus, `8px` for readable terminal menus |
| `menu.itemGap` | `6px` or `8px` | Match item padding |
| `menu.padding` | `4px` or `8px` | `4px` for command menus, `8px` for dropdowns |
| `menu.megaPaddingX` | `24px` | Large dropdown horizontal padding |
| `menu.megaPaddingY` | `16px` | Large dropdown vertical padding |
| `menu.megaGap` | `32px` | Separation between large dropdown sections |

## Component Rules

Use `1px` borders for normal density. On high-density dividers, `0.5px` is allowed on high-resolution displays.

Use `32px` as the default control height for dense terminal UI. Use `28px` for compact search/filter inputs inside sidebars. Use `40px` for primary toolbar pills or non-dense actions.

Icons are `16px` by default. Use `20px` only for large menu cards or empty states. Keep icon buttons square when possible.

Tables and watchlists should use the semantic colors only through roles:

| Market concept | Token |
| --- | --- |
| Price up, profit, bid | `color.semantic.positive` |
| Price down, loss, ask | `color.semantic.negative` |
| Selection, link, neutral annotation | `color.semantic.info` |
| Primary brand action | `color.accent` |

## Implementation Rules

1. Components consume semantic tokens, not raw palette values.
2. Page layouts use the spacing scale only.
3. App shell measurements are fixed tokens, not per-page choices.
4. Dark mode is canonical for hue selection.
5. Light mode may adjust value/contrast, but not semantic meaning.
6. Font tokens are placeholders until leadership approves the final font.

## Replit Research Notes

Replit does not appear to publish a standalone public spacing guide for the header/sidebar. These values were derived from Replit's current public site and CSS inspected on `2026-06-26`.

Observed source patterns:

| Area | Observed value |
| --- | --- |
| Root spacing scale | `1, 2, 4, 6, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 96, 128, 256` |
| Root radius scale | `1, 2, 4, 6, 8, 12, 16` |
| Root font sizes | `12, 14, 16, 20, 24, 32` |
| Root line heights | `1.5, 1.6, 1.375, 1.4, 1.333, 1.25` |
| Root font weights | `400, 500, 600` |
| Marketing header horizontal padding | `24px` |
| Marketing brand/menu gap | `24px` |
| Marketing menu item gap | `12px` |
| App nav menu item height | `32px` |
| App nav menu compact padding | `0 6px` |
| Tools sidebar width | `240px` |
| Collapsed sidebar rail | `32px` |
| Sidebar list padding | `4px 8px` |
| Sidebar search height | `28px` |
| Sidebar row radius | `6px` |
| Sidebar icon size | `16px` |

Sources: [Replit homepage](https://replit.com/) and current public CSS chunks loaded from `https://cdn.replit.com/_next/static/chunks/`.
