# Ollo User Portfolio (Handoff)

This repository contains the finalized HTML, CSS, and JavaScript for the **Ollo User Portfolio** experience. It has been structurally and visually refined for immediate integration into the primary front-end architecture.

## Repository Contents

*   **`portfolio.html`**: The complete markup for all 5 portfolio tabs (Overview, Perpetual Futures, Spot Exchange, Earn, Prediction Markets). The Information Architecture has been restructured to prioritize active risk (Open Positions/Orders) "above the fold."
*   **`portfolio.css`**: The isolated stylesheet for the portfolio. All custom UI components (such as the lightweight CSS tooltip system) and layout grids are defined here.
*   **`portfolio.js`**: Contains the initialization logic for the Lightweight Charts (v4) and the event listeners for tab switching and dual-pill chart timeframe selectors. 
*   **`Terminal Styling.ts`**: The core design system token file. All CSS strictly adheres to the colors, typography (`OLLO_FONT_UI`, `OLLO_FONT_MONO`), and spacing rules defined here.

## Implementation Notes for Engineering

1.  **Componentization**: The structural hierarchy across tabs is highly consistent (`Hero` -> `Metric Blocks` -> `Data Grids`). This should allow for rapid componentization into React/Vue (e.g., `<MetricBlock />`, `<DataGrid />`).
2.  **Chart Controls**: The chart overlays utilize a flexbox dual-pill layout. Event listeners in `portfolio.js` are currently scoped to independently manage the active state of each `.chart-controls-group`.
3.  **Earn Chart**: The Earn chart has been explicitly configured as an "up-only" white area chart to accurately reflect cumulative yield, replacing the previous PnL-style histogram.
4.  **Advanced Metrics**: A CSS-only tooltip system (`.tooltip-icon` and `data-tooltip`) is used to explain advanced metrics (Sharpe Ratio, Brier Score, etc.) without requiring heavy JavaScript dependencies.

## Setup

To view the static prototype locally:
1. Clone the repository.
2. Open `portfolio.html` in any modern web browser.
3. Ensure you have an active internet connection to load the Lightweight Charts CDN script.
