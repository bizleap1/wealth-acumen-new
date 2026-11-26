import React, { useState } from 'react';
import { formatIndianCurrency, formatCompactIndianWords } from '../utils/assetAllocationUtils';
import './AssetAllocationChart.css';

/**
 * Interactive SVG Doughnut Chart for Multi-Asset Allocation.
 */
const AssetAllocationChart = ({
  breakdown = [],
  totalInvestment = 0,
  size = 280,
  strokeWidth = 44,
}) => {
  const [hoveredId, setHoveredId] = useState(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate cumulative offsets
  let accumulatedPct = 0;
  const segmentsWithOffsets = breakdown.map((item) => {
    const pct = item.percentage || 0;
    const dashLength = (pct / 100) * circumference;
    const offset = -((accumulatedPct / 100) * circumference);
    accumulatedPct += pct;

    return {
      ...item,
      dashLength,
      offset,
    };
  });

  const activeItem = breakdown.find((item) => item.id === hoveredId);
  const totalPct = breakdown.reduce((sum, item) => sum + (item.percentage || 0), 0);

  return (
    <div className="asset-chart-container">
      
      {/* SVG Multi-Segment Doughnut */}
      <div className="asset-svg-wrapper">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="asset-doughnut-svg"
        >
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />

          {/* Slices for each asset class */}
          {segmentsWithOffsets.map((segment) => {
            if (segment.percentage <= 0) return null;
            const isHovered = hoveredId === segment.id;

            return (
              <circle
                key={segment.id}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={segment.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${segment.dashLength} ${circumference}`}
                strokeDashoffset={segment.offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                className={`asset-arc ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredId(segment.id)}
                onMouseLeave={() => setHoveredId(null)}
                tabIndex={0}
                role="button"
                aria-label={`${segment.name}: ${segment.percentage}% (${formatIndianCurrency(segment.amount)})`}
              />
            );
          })}
        </svg>

        {/* Center Dynamic Readout */}
        <div className="asset-chart-center">
          {activeItem ? (
            <div className="center-detail animate-fade-in">
              <span className="center-tag" style={{ color: activeItem.color }}>
                {activeItem.name}
              </span>
              <span className="center-percent" style={{ color: activeItem.color }}>
                {activeItem.percentage}%
              </span>
              <span className="center-subtext">
                {formatIndianCurrency(activeItem.amount)}
              </span>
            </div>
          ) : (
            <div className="center-detail">
              <span className="center-tag">Total Portfolio</span>
              <span className="center-percent text-navy">
                {formatCompactIndianWords(totalInvestment)}
              </span>
              <span className="center-subtext">
                {Math.round(totalPct)}% Allocated
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Legend Grid */}
      <div className="asset-legend-grid">
        {breakdown.map((item) => (
          <div
            key={item.id}
            className={`asset-legend-card ${hoveredId === item.id ? 'active' : ''}`}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="legend-header-row">
              <span
                className="legend-color-dot"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="legend-cat-title">{item.name}</span>
              <span className="legend-cat-pct" style={{ color: item.color }}>
                {item.percentage}%
              </span>
            </div>
            <div className="legend-amount-row">
              <span className="legend-amount-value">
                {formatIndianCurrency(item.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AssetAllocationChart;
