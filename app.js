// Initialize Chart
const chartContainer = document.getElementById('tvchart');

const chart = LightweightCharts.createChart(chartContainer, {
  layout: {
    background: { type: 'solid', color: 'transparent' },
    textColor: '#8A919E',
  },
  grid: {
    vertLines: { visible: false },
    horzLines: { color: 'rgba(255, 255, 255, 0.05)', style: 3 },
  },
  crosshair: {
    mode: LightweightCharts.CrosshairMode.Normal,
  },
  rightPriceScale: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  timeScale: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    timeVisible: true,
  },
});

// Since the screenshot shows a red area chart
const areaSeries = chart.addAreaSeries({
  topColor: 'rgba(246, 70, 93, 0.4)',
  bottomColor: 'rgba(246, 70, 93, 0.0)',
  lineColor: 'transparent',
  lineWidth: 0,
});

// Natively curved line on top
const lineSeries = chart.addLineSeries({
  color: '#F6465D',
  lineWidth: 2,
  lineType: 2, // 2 = Curved
  crosshairMarkerVisible: false,
  lastValueVisible: false,
  priceLineVisible: false,
});

const generateData = () => {
  const data = [];
  let basePrice = 1.1551;
  let time = Math.floor(Date.now() / 1000) - 86400 * 30; // 30 days ago
  
  for(let i=0; i<100; i++) {
    const volatility = 0.0050;
    const close = basePrice + (Math.random() - 0.5) * volatility;
    
    data.push({ time: time, value: close });
    
    basePrice = close;
    time += 86400 / 4; // 6h increments
  }
  return data;
};

const areaData = generateData();
areaSeries.setData(areaData);
lineSeries.setData(areaData);

// Remove dummy line that may have crashed the chart

// Handle resizing
new ResizeObserver(entries => {
  if (entries.length === 0 || entries[0].target !== chartContainer) { return; }
  const newRect = entries[0].contentRect;
  chart.applyOptions({ height: newRect.height, width: newRect.width });
}).observe(chartContainer);

// Generate wavy sparklines
function createSparkline(el, isUp, isLarge = false) {
  const points = [];
  let val = 50;
  for(let i=0; i<30; i++) {
    val += (Math.random() - 0.5) * 10;
    points.push(val);
  }
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = (max - min) || 1;
  
  const w = el.clientWidth || (isLarge ? 200 : 80);
  const h = el.clientHeight || (isLarge ? 40 : 12);
  
  const coords = points.map((p, i) => {
    const x = (i / 29) * w;
    const y = h - ((p - min) / range) * h;
    return {x, y};
  });

  // Build a smooth cubic bezier spline
  let d = `M ${coords[0].x},${coords[0].y}`;
  for(let i=0; i<coords.length - 1; i++) {
    const curr = coords[i];
    const next = coords[i+1];
    const ctrlX = (curr.x + next.x) / 2;
    d += ` C ${ctrlX},${curr.y} ${ctrlX},${next.y} ${next.x},${next.y}`;
  }

  const color = isUp ? '#0ECB81' : '#F6465D';
  const svg = `
    <svg width="100%" height="100%" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <path d="${d}" fill="none" stroke="${color}" stroke-width="${isLarge ? 2 : 1.5}" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  el.innerHTML = svg;
  el.style.borderBottom = 'none';
}

document.querySelectorAll('.sparkline-placeholder').forEach(el => {
  const isUp = el.classList.contains('up');
  createSparkline(el, isUp, false);
});

const seasonals = document.getElementById('seasonals-chart');
if (seasonals) {
  createSparkline(seasonals, false, true);
}

// Interactive Order Tabs
const orderTabs = document.querySelectorAll('.order-tabs span');
orderTabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    orderTabs.forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
  });
});

// Sidebar interactions
const collapsibles = document.querySelectorAll('.collapsible');
collapsibles.forEach(col => {
  col.addEventListener('click', () => {
    // just a visual mock toggle
    const arrow = col.querySelector('.arrow');
    if (arrow.textContent === '▾') {
      arrow.textContent = '›';
    } else {
      arrow.textContent = '▾';
    }
  });
});

// Sidebar toggle
const menuToggleBtn = document.querySelector('.menu-toggle');
if (menuToggleBtn) {
  menuToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-hidden');
  });
}
