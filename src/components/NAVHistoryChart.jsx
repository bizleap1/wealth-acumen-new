import React, { useState, useMemo, useRef } from 'react';
import { filterRecordsByRange, formatDisplayDate } from '../utils/fundCalculations';
import { AlertCircle } from 'lucide-react';
import './NAVHistoryChart.css';

const RANGES = [
  { key: '1M', label: '1M' },
  { key: '3M', label: '3M' },
  { key: '6M', label: '6M' },
  { key: '1Y', label: '1Y' },
  { key: '3Y', label: '3Y' },
  { key: '5Y', label: '5Y' },
  { key: 'ALL', label: 'All History' },
];

const NAVHistoryChart = ({ records = [], _schemeName = '', latestNav, latestDate }) => {
  const [selectedRange, setSelectedRange] = useState('1Y');
  const [hoverIndex, setHoverIndex] = useState(null);
  const containerRef = useRef(null);

  // Chronologically sorted records for the selected range
  const chartData = useMemo(() => {
    return filterRecordsByRange(records, selectedRange);
  }, [records, selectedRange]);

  // Chart dimensions & coordinates
  const width = 800;
  const height = 340;
  const padding = { top: 24, right: 30, bottom: 40, left: 65 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const { minNav, maxNav, points, pathString, areaPathString } = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return { minNav: 0, maxNav: 0, points: [], pathString: '', areaPathString: '' };
    }

    let min = Infinity;
    let max = -Infinity;

    chartData.forEach(d => {
      if (d.nav < min) min = d.nav;
      if (d.nav > max) max = d.nav;
    });

    if (min === max) {
      min = min * 0.95;
      max = max * 1.05;
    } else {
      const buffer = (max - min) * 0.08;
      min = Math.max(0, min - buffer);
      max = max + buffer;
    }

    const n = chartData.length;
    const pts = chartData.map((d, i) => {
      const x = padding.left + (n > 1 ? (i / (n - 1)) * plotWidth : plotWidth / 2);
      const y = padding.top + plotHeight - ((d.nav - min) / (max - min)) * plotHeight;
      return { x, y, nav: d.nav, dateStr: d.dateStr };
    });

    // Generate SVG path commands
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      path += ` L ${pts[i].x} ${pts[i].y}`;
    }

    // Generate closed area path for subtle gradient fill
    const areaPath = `${path} L ${pts[pts.length - 1].x} ${padding.top + plotHeight} L ${pts[0].x} ${padding.top + plotHeight} Z`;

    return { minNav: min, maxNav: max, points: pts, pathString: path, areaPathString: areaPath };
  }, [chartData, plotWidth, plotHeight, padding.left, padding.top]);

  // Point-to-point change in selected range
  const rangeStats = useMemo(() => {
    if (chartData.length < 2) return null;
    const startNav = chartData[0].nav;
    const endNav = chartData[chartData.length - 1].nav;
    const change = endNav - startNav;
    const pctChange = (change / startNav) * 100;

    return {
      startNav,
      endNav,
      startDate: chartData[0].dateStr,
      endDate: chartData[chartData.length - 1].dateStr,
      change,
      pctChange: pctChange.toFixed(2),
      isPositive: change >= 0,
    };
  }, [chartData]);

  // Mouse move handler for crosshair & tooltip
  const handleMouseMove = (e) => {
    if (!points.length || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const svgX = (mouseX / rect.width) * width;

    // Find nearest point
    let nearestIdx = 0;
    let minDiff = Infinity;
    points.forEach((pt, idx) => {
      const diff = Math.abs(pt.x - svgX);
      if (diff < minDiff) {
        minDiff = diff;
        nearestIdx = idx;
      }
    });

    setHoverIndex(nearestIdx);
  };

  const activePoint = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : null;

  // Y-axis tick marks
  const yTicks = useMemo(() => {
    if (minNav === maxNav) return [minNav];
    const steps = 4;
    const ticks = [];
    for (let i = 0; i <= steps; i++) {
      const val = minNav + (i / steps) * (maxNav - minNav);
      const y = padding.top + plotHeight - (i / steps) * plotHeight;
      ticks.push({ val: val.toFixed(2), y });
    }
    return ticks;
  }, [minNav, maxNav, plotHeight, padding.top]);

  // X-axis date labels (start, mid, end)
  const xLabels = useMemo(() => {
    if (!chartData || chartData.length < 2) return [];
    const len = chartData.length;
    return [
      { text: formatDisplayDate(chartData[0].dateStr), x: padding.left, align: 'start' },
      { text: formatDisplayDate(chartData[Math.floor(len / 2)].dateStr), x: padding.left + plotWidth / 2, align: 'middle' },
      { text: formatDisplayDate(chartData[len - 1].dateStr), x: padding.left + plotWidth, align: 'end' },
    ];
  }, [chartData, padding.left, plotWidth]);

  if (!records || records.length === 0) {
    return (
      <div className="nav-chart-empty">
        <AlertCircle size={28} className="empty-chart-icon" />
        <p>No historical NAV data available for plotting.</p>
      </div>
    );
  }

  return (
    <div className="nav-history-chart-card">
      {/* Chart Header */}
      <div className="chart-header-row">
        <div className="chart-title-block">
          <span className="chart-overline">HISTORICAL PERFORMANCE</span>
          <div className="chart-nav-display">
            <span className="current-nav-val">
              {activePoint ? `₹${activePoint.nav.toFixed(4)}` : `₹${Number(latestNav || 0).toFixed(4)}`}
            </span>
            {rangeStats && (
              <span className={`range-perf-tag ${rangeStats.isPositive ? 'positive' : 'negative'}`}>
                {rangeStats.isPositive ? '▲ +' : '▼ '}
                {rangeStats.pctChange}% ({selectedRange})
              </span>
            )}
          </div>
          <span className="chart-date-label">
            {activePoint
              ? `NAV Date: ${formatDisplayDate(activePoint.dateStr)}`
              : `Latest NAV as of ${formatDisplayDate(latestDate)}`}
          </span>
        </div>

        {/* Range Selector Pill Buttons */}
        <div className="range-selector-strip">
          {RANGES.map(r => (
            <button
              key={r.key}
              type="button"
              className={`range-btn ${selectedRange === r.key ? 'active' : ''}`}
              onClick={() => {
                setSelectedRange(r.key);
                setHoverIndex(null);
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Interactive Chart Canvas */}
      <div
        className="svg-chart-container"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="nav-chart-svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {yTicks.map((tick, idx) => (
            <g key={idx} className="grid-group">
              <line
                x1={padding.left}
                y1={tick.y}
                x2={width - padding.right}
                y2={tick.y}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={padding.left - 10}
                y={tick.y + 4}
                textAnchor="end"
                className="axis-tick-text"
              >
                ₹{tick.val}
              </text>
            </g>
          ))}

          {/* X Axis Labels */}
          {xLabels.map((lbl, idx) => (
            <text
              key={idx}
              x={lbl.x}
              y={height - 12}
              textAnchor={lbl.align}
              className="axis-tick-text date-label"
            >
              {lbl.text}
            </text>
          ))}

          {/* Area Fill */}
          {areaPathString && (
            <path d={areaPathString} fill="url(#navGradient)" />
          )}

          {/* Line Path */}
          {pathString && (
            <path
              d={pathString}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Active Hover Crosshair & Dot */}
          {activePoint && (
            <g className="hover-elements">
              {/* Vertical Crosshair Line */}
              <line
                x1={activePoint.x}
                y1={padding.top}
                x2={activePoint.x}
                y2={padding.top + plotHeight}
                stroke="#0f172a"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              {/* Outer Glow Ring */}
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="7"
                fill="#2563eb"
                fillOpacity="0.25"
              />
              {/* Inner Dot */}
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="4"
                fill="#2563eb"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>

        {/* Floating Tooltip HTML Overlay */}
        {activePoint && (
          <div
            className="chart-floating-tooltip"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${(activePoint.y / height) * 100}%`,
            }}
          >
            <div className="tooltip-date">{formatDisplayDate(activePoint.dateStr)}</div>
            <div className="tooltip-nav">NAV: ₹{activePoint.nav.toFixed(4)}</div>
          </div>
        )}
      </div>

      {/* Chart Footer Stats */}
      {rangeStats && (
        <div className="chart-footer-metrics">
          <div className="metric-chip">
            <span className="chip-lbl">Period Start ({formatDisplayDate(rangeStats.startDate)}):</span>
            <span className="chip-val">₹{rangeStats.startNav.toFixed(4)}</span>
          </div>
          <div className="metric-chip">
            <span className="chip-lbl">Period End ({formatDisplayDate(rangeStats.endDate)}):</span>
            <span className="chip-val">₹{rangeStats.endNav.toFixed(4)}</span>
          </div>
          <div className="metric-chip">
            <span className="chip-lbl">Total Records Analyzed:</span>
            <span className="chip-val">{chartData.length} Business Days</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NAVHistoryChart;
