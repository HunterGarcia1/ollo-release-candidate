document.addEventListener('DOMContentLoaded', () => {
  // ── Tab Switching ──
  const tabs = document.querySelectorAll('.portfolio-tabs .tab');
  const panes = document.querySelectorAll('.tab-pane');
  const chartResizers = [];

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      
      tab.classList.add('active');
      const pane = document.getElementById(`pane-${tab.dataset.tab}`);
      if (pane) {
        pane.classList.add('active');
        // Trigger resize on all charts so newly-visible ones render correctly
        setTimeout(() => chartResizers.forEach(fn => fn()), 50);
      }
    });
  });

  // ── Sidebar toggle (matches trading terminal) ──
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-hidden');
      setTimeout(() => chartResizers.forEach(fn => fn()), 350);
    });
  }

  // ── Lightweight Charts (v4 API) ──
  if (!window.LightweightCharts) {
    console.error('LightweightCharts not loaded.');
    return;
  }

  const chartTheme = {
    layout: {
      background: { type: 'solid', color: 'transparent' },
      textColor: 'rgba(255,255,255,0.45)',
    },
    grid: {
      vertLines: { color: 'rgba(255,255,255,0.02)' },
      horzLines: { color: 'rgba(255,255,255,0.02)' },
    },
    rightPriceScale: { borderVisible: false },
    timeScale: { borderVisible: false },
    crosshair: {
      mode: LightweightCharts.CrosshairMode.Magnet,
    },
  };

  function createAreaChart(containerId, lineColor) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const chart = LightweightCharts.createChart(container, chartTheme);

    const series = chart.addAreaSeries({
      topColor: `${lineColor}66`,
      bottomColor: `${lineColor}00`,
      lineColor: lineColor,
      lineWidth: 2,
    });

    // Generate realistic mock equity curve data
    const data = [];
    let val = 1000000 + Math.random() * 500000;
    const now = Math.floor(Date.now() / 1000);
    const day = 24 * 60 * 60;

    for (let i = 90; i >= 0; i--) {
      data.push({ time: now - (i * day), value: val });
      // Slight upward bias with realistic volatility
      val += (Math.random() - 0.47) * (val * 0.008);
    }
    series.setData(data);

    // Resize logic
    const resize = () => {
      if (container.clientWidth > 0 && container.clientHeight > 0) {
        chart.applyOptions({ width: container.clientWidth, height: container.clientHeight });
        chart.timeScale().fitContent();
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    chartResizers.push(resize);

    // Initial fit
    setTimeout(resize, 0);
    return chart;
  }


  // Initialize all charts — all white to match Overview
  createAreaChart('chart-overview', '#ffffff');
  createAreaChart('chart-perps', '#ffffff');
  createAreaChart('chart-spot', '#ffffff');
  createAreaChart('chart-earn', '#ffffff');
  createAreaChart('chart-predictions', '#ffffff');

  // Trigger initial resize for the active tab's chart
  setTimeout(() => chartResizers.forEach(fn => fn()), 100);

  // ── Chart control group toggle (scoped per group) ──
  document.querySelectorAll('.chart-controls-group').forEach(group => {
    group.querySelectorAll('span').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('span').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });
});
