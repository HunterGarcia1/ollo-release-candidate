# Ollo Terminal Sitewide Dark / Light Rulebook

Date: `2026-06-29`
Status: Final local design handoff candidate. No company repo code was edited or pushed.

## Purpose

This is the design source of truth for the Ollo trading terminal and terminal-adjacent website surfaces. It starts from the polished Currency exchange screen, then generalizes the same system to every product: currency exchange, perpetual futures, prediction markets, portfolio, account, swaps, settings, modals, drawers, dropdowns, and future widgets.

The rule is simple: product content may change; shared component design may not.

## Canonical Visual References

| Theme | File |
| --- | --- |
| Dark mode | `ollo-currency-exchange-dark-visual.png` |
| Light mode | `ollo-currency-exchange-light-visual.png` |
| Theme CSS handoff | `trading-terminal-theme.css` |
| Machine-readable tokens | `trading-terminal-tokens.json` |
| PDF handoff | `ollo-terminal-sitewide-dark-light-rulebook.pdf` |

## Artifact Manifest

The company handoff should include these files together:

| File | Audience | Purpose |
| --- | --- | --- |
| `trading-terminal-design-rulebook.md` | Entire company | Human-readable source of truth |
| `ollo-terminal-sitewide-dark-light-rulebook.pdf` | Entire company | Shareable review PDF |
| `trading-terminal-theme.css` | Front-end engineering | CSS variables, aliases, and component class contract |
| `trading-terminal-tokens.json` | Design systems / engineering | Machine-readable token source |
| `ollo-currency-exchange-dark-visual.png` | Design / engineering | Approved dark-mode visual reference |
| `ollo-currency-exchange-light-visual.png` | Design / engineering | Approved light-mode visual reference |

## Engineering Quick Start

Use the CSS file as the implementation reference.

```tsx
// App root
import './trading-terminal-theme.css';

export function AppShell() {
  return (
    <main className="ollo-terminal" data-ollo-theme="dark">
      {/* terminal app */}
    </main>
  );
}
```

Theme switching must set one of these attributes at the terminal root or document root:

```html
<html data-ollo-theme="dark">
<html data-ollo-theme="light">
```

Existing app aliases such as `--color-surface`, `--ollo-bg-widget`, `--ollo-text-1`, `--ollo-hairline`, `--ollo-sage`, and `--ollo-brick` are mapped in the CSS handoff so the team can migrate incrementally. New work should prefer the explicit semantic tokens.

## Non-Negotiables

1. Every widget uses the same shell, header, border, radius, typography, and state rules.
2. Middle widgets, left widgets, right widgets, and future widgets must not have different header colors or header heights.
3. Active widgets change only border/focus treatment. Active widgets do not get a different header fill.
4. Inputs, selected rows, metric tiles, neutral buttons, and widget headers are separate primitives.
5. Buy/Sell action colors are separate from positive/negative text and chart colors.
6. Orange `#ff6600` is Ollo brand/accent only. It is not loss, sell, ask, error, or warning.
7. No terminal component may use legacy market colors `#00E8B7`, `#EF446C`, `#ff604a`, `#ff0099`, `#EC4899`, or `#A855F7`.
8. All hardcoded market colors must become semantic tokens.
9. Modals, dropdowns, popovers, drawers, and menus use the same surface system as widgets.
10. Header and sidebar spacing remain Replit-derived: compact, dense, predictable, and scan-first.

## Theme Identity

Dark mode preserves the approved original theme:

| Role | Value |
| --- | --- |
| Brand accent | `#ff6600` |
| Dark surface | `#2d2d2b` |
| Dark ink | `#f9f9f7` |
| Info blue | `#0099ff` |

Light mode is the inverse of the same identity:

| Role | Value |
| --- | --- |
| Brand accent | `#ff6600` |
| Light surface | `#f9f9f7` |
| Light ink | `#2d2d2b` |
| Info blue | `#006bb8` |

## Sitewide Theme Tokens

These tokens create the surface ladder. Do not flatten them into one `bg-glass` value.

### Dark Mode

| Token | Value | Usage |
| --- | --- | --- |
| `terminal.canvas` | `#1f201d` | Root terminal work area |
| `terminal.shell` | `#20211f` | Top header, sidebar, footer shell |
| `terminal.shellBorder` | `#34352f` | Header/sidebar separators |
| `widget.bg` | `#2d2d2b` | Widget body |
| `widget.header.bg` | `#232421` | Every widget header |
| `widget.border` | `#3e4039` | Widget border |
| `widget.activeBorder` | `#55584e` | Focused/active widget border |
| `control.bg` | `#262723` | Neutral buttons and compact controls |
| `control.hoverBg` | `#2e302a` | Neutral hover |
| `control.activeBg` | `#383a34` | Pressed/selected control |
| `field.bg` | `#242520` | Inputs, search, amount fields |
| `field.hoverBg` | `#2a2b27` | Input hover |
| `field.focusBg` | `#30312d` | Input focus |
| `row.hoverBg` | `#343631` | Row hover |
| `row.selectedBg` | `#3b3d38` | Selected row/tab/nav |
| `metric.bg` | `#262723` | Bid/spread/ask and stat tiles |
| `border.subtle` | `#34352f` | Hairlines |
| `border.default` | `#3e4039` | Component borders |
| `border.strong` | `#55584e` | Focus/active borders |
| `text.primary` | `#f9f9f7` | Primary text |
| `text.secondary` | `#c9c9c2` | Secondary text |
| `text.tertiary` | `#8f8f87` | Labels, helper text, quiet icons |
| `text.disabled` | `#666660` | Disabled text |

### Light Mode

| Token | Value | Usage |
| --- | --- | --- |
| `terminal.canvas` | `#e9eae2` | Root terminal work area |
| `terminal.shell` | `#e3e4dc` | Top header, sidebar, footer shell |
| `terminal.shellBorder` | `#d3d5ca` | Header/sidebar separators |
| `widget.bg` | `#f9f9f7` | Widget body |
| `widget.header.bg` | `#f0f1eb` | Every widget header |
| `widget.border` | `#d4d6cb` | Widget border |
| `widget.activeBorder` | `#aeb2a4` | Focused/active widget border |
| `control.bg` | `#f3f4ee` | Neutral buttons and compact controls |
| `control.hoverBg` | `#ecede5` | Neutral hover |
| `control.activeBg` | `#e1e3d8` | Pressed/selected control |
| `field.bg` | `#ffffff` | Inputs, search, amount fields |
| `field.hoverBg` | `#f7f8f2` | Input hover |
| `field.focusBg` | `#f2f4ec` | Input focus |
| `row.hoverBg` | `#f0f1eb` | Row hover |
| `row.selectedBg` | `#e4e6dc` | Selected row/tab/nav |
| `metric.bg` | `#f3f4ee` | Bid/spread/ask and stat tiles |
| `border.subtle` | `#e1e3d8` | Hairlines |
| `border.default` | `#d4d6cb` | Component borders |
| `border.strong` | `#aeb2a4` | Focus/active borders |
| `text.primary` | `#2d2d2b` | Primary text |
| `text.secondary` | `#5c5d56` | Secondary text |
| `text.tertiary` | `#6f7168` | Labels, helper text, quiet icons |
| `text.disabled` | `#9a9c93` | Disabled text |

## Market Color System

Market colors are sitewide and semantic. Do not pick one-off greens or reds per page.

### Dark Market Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `positive.text` | `#30b364` | Positive values, P/L, bid text |
| `positive.chart` | `#30b364` | Positive chart lines and sparklines |
| `positive.action` | `#147a3f` | Filled Buy button, live price pill |
| `positive.actionHover` | `#15803d` | Buy hover |
| `positive.subtle` | `rgba(48, 179, 100, 0.12)` | Positive chip/chart fill |
| `positive.border` | `rgba(48, 179, 100, 0.42)` | Positive outlines |
| `negative.text` | `#ff5c5c` | Negative values, P/L, ask text |
| `negative.chart` | `#ff5c5c` | Negative chart lines and sparklines |
| `negative.action` | `#bd1f2d` | Filled Sell button |
| `negative.actionHover` | `#d62839` | Sell hover |
| `negative.subtle` | `rgba(189, 31, 45, 0.14)` | Negative chip/chart fill |
| `negative.border` | `rgba(189, 31, 45, 0.50)` | Negative outlines |

### Light Market Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `positive.text` | `#15803d` | Positive values, P/L, bid text |
| `positive.chart` | `#30b364` | Positive chart lines and sparklines |
| `positive.action` | `#147a3f` | Filled Buy button, live price pill |
| `positive.actionHover` | `#15803d` | Buy hover |
| `positive.subtle` | `rgba(21, 128, 61, 0.10)` | Positive chip/chart fill |
| `positive.border` | `rgba(21, 128, 61, 0.36)` | Positive outlines |
| `negative.text` | `#c1121f` | Negative values, P/L, ask text |
| `negative.chart` | `#d62839` | Negative chart lines and sparklines |
| `negative.action` | `#bd1f2d` | Filled Sell button |
| `negative.actionHover` | `#d62839` | Sell hover |
| `negative.subtle` | `rgba(189, 31, 45, 0.10)` | Negative chip/chart fill |
| `negative.border` | `rgba(189, 31, 45, 0.38)` | Negative outlines |

## Shell And Navigation

The terminal shell follows the compact Replit-style density already approved.

| Element | Rule |
| --- | --- |
| Header height | `52px` |
| Footer height | `36px` |
| Sidebar expanded width | `264px` target for full terminal |
| Sidebar collapsed rail | `52px` |
| Logo cell | `52px` square |
| Header control height | `36px` |
| Sidebar row height | `32px` |
| Sidebar row padding | `0 12px` |
| Sidebar icon size | `16px` |
| Header/search radius | `10px` |
| Sidebar row radius | `6px` |
| Shell gap | `8px-12px` |

Header and sidebar must use `terminal.shell`, not `widget.bg`. The shell should frame the product, not compete with widgets.

## Surface And Container Ladder

Every visible container must map to this ladder.

| Container | Token | Border | Radius | Notes |
| --- | --- | --- | --- | --- |
| App root canvas | `terminal.canvas` | none | none | Behind all widgets |
| Header/sidebar/footer shell | `terminal.shell` | `terminal.shellBorder` | none | Replit-style app chrome |
| Widget | `widget.bg` | `widget.border` | `4px` | Primary terminal container |
| Widget header | `widget.header.bg` | `border.subtle` bottom | inherits widget | Same across all widgets |
| Neutral control | `control.bg` | `border.subtle` | `4px` | Buttons, token selectors, compact controls |
| Input/field | `field.bg` | `border.default` | `4px` | Search, amount, text input |
| Selected row | `row.selectedBg` | optional | `6px` row, `4px` tab | Sidebar, market rows, selected tabs |
| Metric tile | `metric.bg` | `border.subtle` | `4px` | Bid/spread/ask/stat cells |
| Modal panel | `modal.bg` | `widget.border` | `8px` | Modal, drawer, popover base |
| Tooltip | `modal.bg` | `widget.border` | `4px` | Small contextual overlays |

If a container does not fit this ladder, add a new semantic role only after design review.

## Widget Contract

BaseWidget owns widget chrome. Product widgets do not create their own shell.

| Property | Value |
| --- | --- |
| Radius | `4px` |
| Border | `1px solid widget.border` |
| Body background | `widget.bg` |
| Header height | `32px` |
| Header padding | `0 8px` |
| Header background | `widget.header.bg` |
| Header border | `1px solid border.subtle` |
| Header title | `11px / 14px`, `600`, `text.primary` |
| Close/more hit area | `24px` minimum |
| Active state | `widget.activeBorder` only |
| Drag/resize placeholder | Border/focus tokens only, no neon fill |

Forbidden: `widget.header.activeBg`, spot-only header fills, alternate middle-widget headers, and product-specific widget radii.

## Typography

Final brand font may change later. The type scale should not.

| Role | Size / line | Weight | Usage |
| --- | --- | --- | --- |
| Chrome label | `10px / 14px` | `500` | Clock labels, status labels |
| Sidebar row | `14px / 20px` | `400`, active `500` | Main nav |
| Sidebar section | `12px / 18px` | `500` | Layout groups |
| Widget header | `11px / 14px` | `600` | Widget titles |
| Widget body | `11px / 16px` | `400` | Dense widget text |
| Section label | `9px / 14px` | `600`, uppercase | Pair Performance, Assets |
| Data small | `10px / 14px` | `500` | Helper data |
| Data default | `12px / 16px` | `500-650` | Prices, percent changes |
| Chart price | `30px / 38px` | `500`, mono tabular | Main chart |
| Snapshot price | `22px / 30px` | `700`, mono tabular | Snapshot widget |
| Order value | `24px / 32px` | `500`, tabular | Amount fields |
| Account total | `24px / 32px` | `500`, tabular | Account total |

All market numbers, balances, quantities, rates, and P/L use tabular numerals.

## Buttons

Every button belongs to one variant.

| Variant | Background | Border | Text | Height | Usage |
| --- | --- | --- | --- | --- | --- |
| Secondary | `control.bg` | `border.subtle` | `text.primary` | `32px` | Deposit, Withdraw, neutral actions |
| Secondary hover | `control.hoverBg` | `border.default` | `text.primary` | `32px` | Neutral hover |
| Secondary active | `control.activeBg` | `border.strong` | `text.primary` | `32px` | Pressed neutral |
| Segmented off | `control.bg` | `border.subtle` | `text.secondary` | `24px` | Time range, Market/Limit, tabs |
| Segmented selected | `row.selectedBg` | `border.default` | `text.primary` | `24px` | Active tab |
| Text action | transparent | none | `text.tertiary` | content | Flip Pair, Details |
| Text action hover | transparent | none | `text.primary` | content | Hover text action |
| Icon button | transparent or `control.bg` | optional | `text.tertiary` | `24px-36px` | Close, toolbar, more |
| Icon hover | `control.hoverBg` | optional | `text.primary` | same | Hover icon |
| Buy | `positive.action` | none | `action.ink` | `32px` | Buy action |
| Sell | `negative.action` | none | `action.ink` | `32px` | Sell action |
| Disabled | theme disabled surface | none/border | `text.disabled` | same | Disabled action |

Deposit/Withdraw are secondary buttons. Buy/Sell are action buttons. Never style Deposit like Buy, and never style Withdraw like Sell.

## Interaction State Matrix

Every primitive needs all states defined before release.

| Primitive | Default | Hover | Active/Selected | Focus | Disabled | Error |
| --- | --- | --- | --- | --- | --- | --- |
| Widget | `widget.bg`, `widget.border` | no fill change | `widget.activeBorder` only | `widget.activeBorder` | reduced opacity only if unavailable | n/a |
| Widget header | `widget.header.bg` | no fill change | no alternate active header | n/a | n/a | n/a |
| Secondary button | `control.bg` | `control.hoverBg` | `control.activeBg` | `border.strong` outline | opacity `0.52`, `text.disabled` | n/a |
| Segmented button | `control.bg` | `control.hoverBg` | `row.selectedBg` | `border.strong` outline | `text.disabled` | n/a |
| Text action | transparent | `text.primary` | n/a | underline or focus outline | `text.disabled` | n/a |
| Icon button | transparent | `control.hoverBg` | `control.activeBg` | `border.strong` outline | `text.disabled` | n/a |
| Field | `field.bg` | `field.hoverBg` | n/a | `field.focusBg`, `border.strong` | `control.bg`, `text.disabled` | `negative.border`, `negative.text` |
| Row | transparent | `row.hoverBg` | `row.selectedBg` | `border.strong` outline | `text.disabled` | n/a |
| Chip | semantic subtle | semantic subtle | no darker selected state | focus outline if interactive | `text.disabled` | semantic negative |

## Inputs And Fields

| State | Background | Border | Text |
| --- | --- | --- | --- |
| Default | `field.bg` | `border.default` | `text.primary` |
| Hover | `field.hoverBg` | `border.default` | `text.primary` |
| Focus | `field.focusBg` | `border.strong` | `text.primary` |
| Placeholder | `field.bg` | `border.default` | `text.tertiary` |
| Disabled | `control.bg` | `border.subtle` | `text.disabled` |
| Error | `field.bg` | `negative.border` | `negative.text` |

Order amount fields:

| Property | Value |
| --- | --- |
| Height | `76px` |
| Padding | `8px` |
| Radius | `4px` |
| Token selector height | `32px` |
| Token selector width | `80px` in compact order layout |
| Label | `10px / 14px`, `text.tertiary` |
| Value | `24px / 32px`, tabular |

Fields must not use selected-row colors. Selected rows must not use field colors.

## Form Validation And Empty States

| State | Rule |
| --- | --- |
| Empty input | Placeholder uses `text.tertiary`; value area remains `field.bg` |
| Loading field | Use skeleton/tint inside `field.bg`, not a new container |
| Validation error | Border `negative.border`; message `negative.text`; no orange |
| Warning | Use a separate warning token only after design approval; do not reuse brand orange automatically |
| Empty widget | Center or top-align quiet `text.secondary`; no decorative cards inside widgets |
| Loading widget | Skeleton rows on `widget.bg`; header remains visible and unchanged |

## Rows, Lists, Tables, And Tabs

| Component | Default | Hover | Selected |
| --- | --- | --- | --- |
| Sidebar row | transparent | `row.hoverBg` | `row.selectedBg` |
| Market row | transparent | `row.hoverBg` | `row.selectedBg` |
| Modal token row | transparent | `row.hoverBg` | `row.selectedBg` |
| Dropdown row | transparent | `row.hoverBg` | `row.selectedBg` |
| Table row | transparent | `row.hoverBg` | optional `row.selectedBg` |
| Segmented tab | `control.bg` | `control.hoverBg` | `row.selectedBg` |

Rows may contain controls, but the row background remains the row primitive.

## Chips, Badges, And Market Labels

| State | Background | Border | Text |
| --- | --- | --- | --- |
| Positive | `positive.subtle` | `positive.border` | `positive.text` |
| Negative | `negative.subtle` | `negative.border` | `negative.text` |
| Neutral | `control.bg` | `border.subtle` | `text.secondary` |
| Disabled/unavailable | `control.bg` | `border.subtle` | `text.disabled` |

Coin/token icons may keep asset-specific fills. Their border must adapt by theme so circular overlaps remain visible.

## Charts

| Element | Rule |
| --- | --- |
| Positive line | `positive.chart` |
| Negative line | `negative.chart` |
| Neutral/info line | `info` |
| Grid | `chart.grid` |
| Fill | matching `positive.subtle` or `negative.subtle`, lower opacity for large areas |
| Axis labels | `text.tertiary`, never clipped |
| Price marker | `positive.action` only for live/action-like marker |
| Chart background | `widget.bg` |

Sparklines, TradingView charts, mini charts, portfolio charts, seasonals, and future prediction charts read from the same chart tokens.

## Tables And Data Grids

| Element | Rule |
| --- | --- |
| Table background | `widget.bg` |
| Header text | `sectionLabel` type, `text.tertiary` |
| Cell text | `widgetBody` or `dataDefault` type |
| Numeric cells | Mono/tabular numerals |
| Row divider | `border.subtle` |
| Row hover | `row.hoverBg` |
| Row selected | `row.selectedBg` |
| Positive/negative cells | `positive.text` / `negative.text` |
| Empty table | Same empty widget state |

## 24H Range Slider

Use the market range gradient:

```css
background: linear-gradient(
  90deg,
  var(--ollo-range-low),
  var(--ollo-range-mid) 50%,
  var(--ollo-range-high)
);
```

Do not use pink/purple/blue decorative gradients for market range.

## Modals, Drawers, Dropdowns, And Popovers

| Component | Rule |
| --- | --- |
| Overlay | `modal.overlay` |
| Panel | `modal.bg` |
| Border | `widget.border` |
| Radius | `8px` modal, `4px-8px` dropdown |
| Padding | `20px-24px`, compact where dense |
| Search | Field contract |
| Rows | Row contract |
| Buttons | Button matrix |
| Confirmation actions | Buy/Sell/destructive by semantic action |

`BaseModal`, `SelectTokenModal`, `SpotMarketSelectorModal`, `QuoteDetailsModal`, settings, deposit, withdraw, leverage, slippage, and confirmation flows must share this modal system.

## Website And Non-Terminal Surfaces

The public website can have more breathing room than the terminal, but it must share the same brand identity and semantic tokens.

| Area | Rule |
| --- | --- |
| Website background | Use `brand.surface` / `brand.ink` pair for the active theme |
| Website header | Use shell/header spacing tokens where applicable; avoid unrelated nav density |
| Website buttons | Use the same secondary/action button variants |
| Website forms | Use the same field contract |
| Website modals | Use the same modal contract |
| Website data cards | Use widget/card surface ladder, but may increase padding |
| Marketing illustrations | May be expressive; must not redefine market green/red |

Terminal density is not required on marketing pages. Token semantics are required everywhere.

## Component-Specific Rules

### BaseWidget

BaseWidget owns all widget shell and header styling. Product widgets pass title/actions/content only.

Required:

1. One header style across spot, perps, account, charts, and future widgets.
2. One body surface.
3. One border/radius.
4. One active/focused border state.
5. No product-specific header tints.

### Market Selector

Search uses field contract. Rows use row contract. Selected market row uses `row.selectedBg`. Sparklines use chart tokens. Empty state uses `text.secondary` and never clips.

### Chart Widget

Time range controls use segmented buttons. Main price uses chart price type. Chart line/fill/grid/axis labels use chart contract. Loading and empty states are centered text, not decorative panels.

### Snapshot Widget

Hero price uses snapshot price type. Metric tiles use `metric.bg`. Pair performance uses chip contract. Assets use row/text-action contract. Seasonals chart uses chart tokens.

### Order Entry Widget

Market/Limit uses segmented buttons. Amount/Total fields use order field contract. Token selectors are compact secondary controls. Sliders use `positive.action` and `negative.action`. Bid/spread/ask use metric/stat cells. Buy/Sell use action buttons.

### Account Overview

Total balance uses account total type. Deposit/Withdraw use secondary buttons. Empty holdings use plain text on widget surface. More menu uses icon button.

### Portfolio, Perps, Prediction Markets, Swaps

Use the same widget, table, row, field, button, chip, chart, modal, and market color primitives. Product-specific content is allowed; product-specific chrome is not.

## Implementation Rules For Engineering

1. Theme root should be `data-ollo-theme='dark'` or `data-ollo-theme='light'`.
2. Import the token layer once near the app root.
3. Replace `bg-glass` usage with primitive names: widget, field, control, row, metric, modal.
4. Replace all hardcoded chart/action colors with semantic tokens.
5. Make BaseWidget the single owner of widget shell/header.
6. Do not derive component color from arbitrary alpha overlays.
7. Do not use the same class for fields, selected rows, controls, and metric tiles.
8. Keep the existing Replit-derived header/sidebar spacing.
9. Use `color-scheme` per theme so form controls and browser primitives match.
10. Run contrast checks for every text token on its intended background.
11. Keep token names stable; add aliases rather than renaming tokens during migration.
12. All new components must document which primitive they map to.
13. Component tests should include dark and light snapshots where visual regression tooling exists.

## Current Code Risks To Clean Up

| Area | Risk | Required correction |
| --- | --- | --- |
| `bg-glass` | Too many primitives share one generic class | Split into field/control/metric/modal/row/widget primitives |
| `BaseWidget` | Spot-specific or tinted header paths create inconsistent widget headers | One shared widget header contract |
| Chart colors | Legacy teal/pink literals still appear in chart and sparkline paths | Use semantic chart tokens |
| Order sliders | Hardcoded green/pink paths | Use positive/negative action tokens |
| Range slider | Decorative gradient | Use range low/mid/high tokens |
| Modal surfaces | Generic glass panels | Use modal system |
| Deposit/Withdraw | Local button recipes | Use secondary button variant |
| Token selectors | Same background as fields | Use compact secondary control |

## Visual QA Checklist

1. Compare all widget headers side by side in dark and light: every header must match.
2. Compare widget body, header, field, selected row, metric tile, and neutral button: each must be visibly distinct.
3. Hover/focus every input and verify no glow bloom or layout shift.
4. Hover/press every button variant.
5. Verify Buy/Sell labels remain white in both themes.
6. Verify positive/negative small text passes contrast in both themes.
7. Verify chart axes never clip at desktop, laptop, and mobile widths.
8. Open every modal and dropdown in both themes.
9. Verify selected sidebar row, selected market row, and selected segmented tab share the row-selected family.
10. Verify Deposit/Withdraw match secondary buttons, not market actions.
11. Search for forbidden colors: `#00E8B7`, `#EF446C`, `#ff604a`, `#ff0099`, `#EC4899`, `#A855F7`.
12. Resize widgets and verify headers, fields, token selectors, buttons, and chips do not clip.
13. Compare desktop and mobile screenshots before release.

## Accessibility And Contrast Baseline

The final approved market colors were contrast checked on their intended surfaces:

| Check | Contrast |
| --- | --- |
| Dark positive text on widget | `5.10:1` |
| Dark negative text on widget | `4.56:1` |
| Dark Buy label | `5.13:1` |
| Dark Sell label | `5.86:1` |
| Light tertiary text on widget | `4.70:1` |
| Light positive text on widget | `4.76:1` |
| Light negative text on widget | `5.90:1` |
| Light Buy label | `5.13:1` |
| Light Sell label | `5.86:1` |

Disabled text may fall below normal text contrast because it is intentionally unavailable. Do not use disabled text color for helper copy or labels.

## Release Decision

The design is ready to implement only when both themes satisfy:

1. One BaseWidget shell.
2. One widget header.
3. One field primitive.
4. One row primitive.
5. One metric tile primitive.
6. One button matrix.
7. One modal surface system.
8. One market color system with separate action/text/chart roles.
9. One Replit-derived shell spacing system.

This rulebook is the source of truth. Any component that does not map to these primitives should be treated as design debt and corrected before release.
