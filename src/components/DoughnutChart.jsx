import React, { useState } from 'react';
import { formatIndianCurrency } from '../utils/calculatorUtils';
import './DoughnutChart.css';

/**
 * Interactive SVG Doughnut Chart for SIP & Investment breakdown.
 * Zero external dependencies, ultra-fast and crisp on all devices.
 */
const DoughnutChart = ({
  investedAmount = 0,
  estimatedReturns = 0,
  investedColor = '#4f46e5', // Brand Blue / Indigo
  returnsColor = '#00d09c',  // Growth Green / Emerald (as in reference)
  size = 280,
  strokeWidth = 44,
}) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const total = investedAmount + estimatedReturns;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Safe percentages
  const investedPct = total > 0 ? (investedAmount / total) * 100 : 50;
  const returnsPct = total > 0 ? (estimatedReturns / total) * 100 : 50;

  const investedDash = (investedPct / 100) * circumference;
  const returnsDash = (returnsPct / 100) * circumference;
  const returnsOffset = -investedDash;

  return (
    <div className="doughnut-chart-wrapper">
      {/* Top Legend Bar matching reference */}
      <div className="chart-legend-top">
        <div 
          className={`legend-pill ${hoveredSegment === 'invested' ? 'active' : ''}`}
          onMouseEnter={() => setHoveredSegment('invested')}
          onMouseLeave={() => setHoveredSegment(null)}
        >
          <span className="legend-indicator" style={{ backgroundColor: investedColor }}></span>
          <span className="legend-name">Invested Amount</span>
        </div>
        <div 
          className={`legend-pill ${hoveredSegment === 'returns' ? 'active' : ''}`}
          onMouseEnter={() => setHoveredSegment('returns')}
          onMouseLeave={() => setHoveredSegment(null)}
        >
          <span className="legend-indicator" style={{ backgroundColor: returnsColor }}></span>
          <span className="legend-name">Est. Returns</span>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="chart-svg-container">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="doughnut-svg"
        >
          <defs>
            <filter id="subtle-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* Background Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />

          {/* Invested Amount Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={investedColor}
            strokeWidth={hoveredSegment === 'invested' ? strokeWidth + 4 : strokeWidth}
            strokeDasharray={`${investedDash} ${circumference}`}
            strokeDashoffset={0}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            className="chart-arc chart-arc-invested"
            onMouseEnter={() => setHoveredSegment('invested')}
            onMouseLeave={() => setHoveredSegment(null)}
            tabIndex={0}
            role="button"
            aria-label={`Invested Amount: ${formatIndianCurrency(investedAmount)} (${investedPct.toFixed(1)}%)`}
          />

          {/* Estimated Returns Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={returnsColor}
            strokeWidth={hoveredSegment === 'returns' ? strokeWidth + 4 : strokeWidth}
            strokeDasharray={`${returnsDash} ${circumference}`}
            strokeDashoffset={returnsOffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            className="chart-arc chart-arc-returns"
            onMouseEnter={() => setHoveredSegment('returns')}
            onMouseLeave={() => setHoveredSegment(null)}
            tabIndex={0}
            role="button"
            aria-label={`Estimated Returns: ${formatIndianCurrency(estimatedReturns)} (${returnsPct.toFixed(1)}%)`}
          />
        </svg>

        {/* Center Readout (Shows hovered detail or total value summary) */}
        <div className="chart-center-content">
          {hoveredSegment === 'invested' ? (
            <div className="center-detail animate-fade-in">
              <span className="center-tag" style={{ color: investedColor }}>Invested</span>
              <span className="center-percent">{investedPct.toFixed(1)}%</span>
              <span className="center-subtext">{formatIndianCurrency(investedAmount)}</span>
            </div>
          ) : hoveredSegment === 'returns' ? (
            <div className="center-detail animate-fade-in">
              <span className="center-tag" style={{ color: returnsColor }}>Est. Returns</span>
              <span className="center-percent">{returnsPct.toFixed(1)}%</span>
              <span className="center-subtext">{formatIndianCurrency(estimatedReturns)}</span>
            </div>
          ) : (
            <div className="center-detail">
              <span className="center-tag">Returns on Invested Amount</span>
              <span className="center-percent text-navy">
                {investedAmount > 0 ? `${((estimatedReturns / investedAmount) * 100).toFixed(1)}%` : '0%'}
              </span>
              <span className="center-subtext">Return Rate</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
