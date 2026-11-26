import React, { useState, useMemo } from 'react';
import { 
  ASSET_CATEGORIES, 
  ASSET_COLORS, 
  calculateRebalancingPlan, 
  saveTargetAllocation, 
  DEFAULT_TARGET_ALLOCATION 
} from '../utils/portfolioCalculations';
import { formatINR } from '../utils/fundCalculations';
import { 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import './PortfolioRebalancer.css';

const PRESETS = [
  {
    name: 'Balanced (50/30/10/10)',
    targets: { Equity: 50, Debt: 30, Hybrid: 10, Gold: 10, Other: 0 },
  },
  {
    name: 'Growth / Aggressive (70/15/10/5)',
    targets: { Equity: 70, Debt: 15, Hybrid: 10, Gold: 5, Other: 0 },
  },
  {
    name: 'Conservative (30/50/10/10)',
    targets: { Equity: 30, Debt: 50, Hybrid: 10, Gold: 10, Other: 0 },
  },
];

const PortfolioRebalancer = ({ 
  investments = [], 
  targetAllocation = DEFAULT_TARGET_ALLOCATION, 
  onUpdateTargets 
}) => {
  const [localTargets, setLocalTargets] = useState(targetAllocation);

  const rebalancingPlan = useMemo(() => {
    return calculateRebalancingPlan(investments, localTargets);
  }, [investments, localTargets]);

  const handleTargetChange = (category, value) => {
    const num = Math.max(0, Math.min(100, parseFloat(value) || 0));
    const updated = {
      ...localTargets,
      [category]: num,
    };
    setLocalTargets(updated);
    saveTargetAllocation(updated);
    if (onUpdateTargets) onUpdateTargets(updated);
  };

  const applyPreset = (presetTargets) => {
    setLocalTargets(presetTargets);
    saveTargetAllocation(presetTargets);
    if (onUpdateTargets) onUpdateTargets(presetTargets);
  };

  const handleReset = () => {
    applyPreset(DEFAULT_TARGET_ALLOCATION);
  };

  // Helper for SVG Donut slices
  const buildDonutSlices = (percentageMap) => {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    let accumulatedOffset = 0;

    return ASSET_CATEGORIES.map(category => {
      const pct = Number(percentageMap[category]) || 0;
      const strokeLength = (pct / 100) * circumference;
      const offset = accumulatedOffset;
      accumulatedOffset -= strokeLength;

      return {
        category,
        color: ASSET_COLORS[category],
        pct,
        strokeLength,
        offset,
      };
    });
  };

  const currentPercentages = useMemo(() => {
    const map = {};
    rebalancingPlan.rows.forEach(r => {
      map[r.category] = r.currentPct;
    });
    return map;
  }, [rebalancingPlan]);

  const currentDonutSlices = useMemo(() => buildDonutSlices(currentPercentages), [currentPercentages]);
  const targetDonutSlices = useMemo(() => buildDonutSlices(localTargets), [localTargets]);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="portfolio-rebalancer-section">
      {/* Intro Header */}
      <div className="rebalancer-intro-card">
        <div className="intro-text-block">
          <div className="intro-badge">
            <Scale size={16} />
            <span>PORTFOLIO ASSET REBALANCING</span>
          </div>
          <h3 className="rebalancer-title">Asset Allocation Rebalancing Calculator</h3>
          <p className="rebalancer-subtitle">
            Compare your actual holdings against target allocations. Determine exact surplus or deficit amounts to restore portfolio discipline.
          </p>
        </div>

        <div className="intro-portfolio-stat">
          <span className="stat-label">Active Portfolio Value</span>
          <span className="stat-val">{formatINR(rebalancingPlan.totalValue)}</span>
          <span className="stat-sub">{investments.length} Holdings Analyzed</span>
        </div>
      </div>

      {/* Target Allocation Controls & Presets */}
      <div className="target-allocation-controls-card">
        <div className="controls-header">
          <div className="header-left">
            <h4>Step 1: Set Target Asset Allocation</h4>
            <p>Define your desired long-term asset mix. The total target percentage must equal exactly 100%.</p>
          </div>

          <div className="presets-row">
            <span className="presets-lbl"><Sparkles size={14} /> Presets:</span>
            {PRESETS.map(p => (
              <button
                key={p.name}
                type="button"
                className="preset-btn"
                onClick={() => applyPreset(p.targets)}
              >
                {p.name}
              </button>
            ))}
            <button type="button" className="preset-btn reset-btn" onClick={handleReset} title="Reset to default">
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Target Percentage Input Fields */}
        <div className="target-inputs-grid">
          {ASSET_CATEGORIES.map(category => (
            <div key={category} className="target-input-box">
              <div className="cat-label-row">
                <span className="cat-dot" style={{ backgroundColor: ASSET_COLORS[category] }} />
                <span className="cat-name">{category}</span>
              </div>
              <div className="input-with-addon">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={localTargets[category] !== undefined ? localTargets[category] : 0}
                  onChange={(e) => handleTargetChange(category, e.target.value)}
                  className="target-num-input"
                />
                <span className="addon">%</span>
              </div>
            </div>
          ))}

          {/* Total Validation Card */}
          <div className={`target-sum-box ${rebalancingPlan.isValid ? 'valid' : 'invalid'}`}>
            <span className="sum-label">Total Allocation</span>
            <span className="sum-val">{rebalancingPlan.targetTotal}%</span>
            <span className="sum-status">
              {rebalancingPlan.isValid ? (
                <span className="valid-text"><CheckCircle2 size={13} /> Balanced 100%</span>
              ) : (
                <span className="invalid-text"><AlertTriangle size={13} /> Must Equal 100%</span>
              )}
            </span>
          </div>
        </div>

        {!rebalancingPlan.isValid && (
          <div className="allocation-warning-alert">
            <AlertTriangle size={18} />
            <span>
              Target allocation currently totals <strong>{rebalancingPlan.targetTotal}%</strong>. Please adjust category percentages so the sum equals exactly 100% before executing rebalancing.
            </span>
          </div>
        )}
      </div>

      {/* Visual Allocation Comparisons: Current Donut vs Target Donut */}
      {rebalancingPlan.isValid && rebalancingPlan.hasInvestments && (
        <div className="rebalancing-visuals-grid">
          {/* Current Donut */}
          <div className="chart-box-card">
            <h5 className="box-card-title">Current Asset Allocation</h5>
            <div className="box-donut-container">
              <svg viewBox="0 0 160 160" className="rebalance-donut-svg">
                <circle cx="80" cy="80" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth="16" />
                {currentDonutSlices.map(slice => {
                  if (slice.pct <= 0) return null;
                  return (
                    <circle
                      key={slice.category}
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="transparent"
                      stroke={slice.color}
                      strokeWidth="16"
                      strokeDasharray={`${slice.strokeLength} ${circumference - slice.strokeLength}`}
                      strokeDashoffset={slice.offset}
                      transform="rotate(-90 80 80)"
                    />
                  );
                })}
                <text x="80" y="78" textAnchor="middle" className="donut-center-main">
                  Current
                </text>
                <text x="80" y="94" textAnchor="middle" className="donut-center-sub">
                  Portfolio
                </text>
              </svg>
            </div>
            <div className="donut-mini-legend">
              {ASSET_CATEGORIES.map(cat => (
                <div key={cat} className="mini-legend-item">
                  <span className="mini-dot" style={{ backgroundColor: ASSET_COLORS[cat] }} />
                  <span>{cat}: <strong>{rebalancingPlan.rows.find(r => r.category === cat)?.currentPct || 0}%</strong></span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Donut */}
          <div className="chart-box-card">
            <h5 className="box-card-title">Target Asset Allocation</h5>
            <div className="box-donut-container">
              <svg viewBox="0 0 160 160" className="rebalance-donut-svg">
                <circle cx="80" cy="80" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth="16" />
                {targetDonutSlices.map(slice => {
                  if (slice.pct <= 0) return null;
                  return (
                    <circle
                      key={slice.category}
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="transparent"
                      stroke={slice.color}
                      strokeWidth="16"
                      strokeDasharray={`${slice.strokeLength} ${circumference - slice.strokeLength}`}
                      strokeDashoffset={slice.offset}
                      transform="rotate(-90 80 80)"
                    />
                  );
                })}
                <text x="80" y="78" textAnchor="middle" className="donut-center-main">
                  Target
                </text>
                <text x="80" y="94" textAnchor="middle" className="donut-center-sub">
                  Mix
                </text>
              </svg>
            </div>
            <div className="donut-mini-legend">
              {ASSET_CATEGORIES.map(cat => (
                <div key={cat} className="mini-legend-item">
                  <span className="mini-dot" style={{ backgroundColor: ASSET_COLORS[cat] }} />
                  <span>{cat}: <strong>{localTargets[cat] || 0}%</strong></span>
                </div>
              ))}
            </div>
          </div>

          {/* Current vs Target Comparative Bar Chart */}
          <div className="chart-box-card comparative-bars-card">
            <h5 className="box-card-title">Current vs Target Distribution (%)</h5>
            <div className="category-bars-distribution">
              {rebalancingPlan.rows.map(row => (
                <div key={row.category} className="dist-row">
                  <div className="dist-label-col">
                    <span className="dist-dot" style={{ backgroundColor: row.color }} />
                    <span className="dist-name">{row.category}</span>
                  </div>
                  <div className="dist-bars-col">
                    {/* Current Bar */}
                    <div className="bar-track">
                      <div
                        className="bar-fill current-bar"
                        style={{
                          width: `${Math.min(row.currentPct, 100)}%`,
                          backgroundColor: row.color,
                        }}
                      />
                      <span className="bar-label-num">Cur: {row.currentPct}%</span>
                    </div>
                    {/* Target Bar */}
                    <div className="bar-track target-track">
                      <div
                        className="bar-fill target-bar"
                        style={{
                          width: `${Math.min(row.targetPct, 100)}%`,
                        }}
                      />
                      <span className="bar-label-num">Tgt: {row.targetPct}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Rebalancing Comparison Table */}
      {rebalancingPlan.isValid && (
        <div className="rebalancing-table-card">
          <div className="table-header-block">
            <h4 className="table-title">Step 2: Rebalancing Analysis & Adjustment Schedule</h4>
            <p className="table-desc">
              Positive adjustment values indicate underallocation (invest more). Negative values indicate overallocation (trim/switch).
            </p>
          </div>

          <div className="rebalance-table-wrapper">
            <table className="rebalance-table">
              <thead>
                <tr>
                  <th>Asset Category</th>
                  <th>Current Value</th>
                  <th>Current %</th>
                  <th>Target %</th>
                  <th>Target Value</th>
                  <th>Difference (Adjustment)</th>
                  <th>Rebalancing Action</th>
                </tr>
              </thead>
              <tbody>
                {rebalancingPlan.rows.map(row => {
                  const isPositive = row.adjustment > 1;
                  const isNegative = row.adjustment < -1;

                  return (
                    <tr key={row.category}>
                      <td className="category-cell">
                        <span className="row-color-indicator" style={{ backgroundColor: row.color }} />
                        <span className="cat-title-text">{row.category}</span>
                      </td>
                      <td className="val-text">{formatINR(row.currentValue)}</td>
                      <td className="pct-text">{row.currentPct}%</td>
                      <td className="pct-text bold-pct">{row.targetPct}%</td>
                      <td className="val-text bold-val">{formatINR(row.targetValue)}</td>
                      <td className={`adj-cell ${isPositive ? 'positive' : isNegative ? 'negative' : 'neutral'}`}>
                        {isPositive ? '+' : ''}{formatINR(row.adjustment)}
                      </td>
                      <td className="action-status-cell">
                        {isPositive && (
                          <span className="status-pill status-buy">
                            <ArrowUpRight size={13} />
                            <span>Increase ({formatINR(row.adjustment)})</span>
                          </span>
                        )}
                        {isNegative && (
                          <span className="status-pill status-sell">
                            <ArrowDownRight size={13} />
                            <span>Decrease ({formatINR(Math.abs(row.adjustment))})</span>
                          </span>
                        )}
                        {!isPositive && !isNegative && (
                          <span className="status-pill status-balanced">
                            <CheckCircle2 size={13} />
                            <span>Balanced</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Box & Financial Disclaimer */}
      {rebalancingPlan.isValid && rebalancingPlan.hasInvestments && (
        <div className="rebalancing-summary-card">
          <h4 className="summary-card-title">Rebalancing Summary & Action Plan</h4>

          <div className="summary-bullets-grid">
            <div className="bullet-col">
              <h5>Overallocated Assets (Trim/Switch Out):</h5>
              {rebalancingPlan.overallocatedCategories.length > 0 ? (
                <ul className="action-list">
                  {rebalancingPlan.overallocatedCategories.map(item => (
                    <li key={item.category}>
                      Trim <strong>{formatINR(Math.abs(item.adjustment))}</strong> from <strong>{item.category}</strong> ({item.currentPct}% down to {item.targetPct}% target).
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="clean-p">None. No category exceeds its target allocation.</p>
              )}
            </div>

            <div className="bullet-col">
              <h5>Underallocated Assets (Add/Deploy In):</h5>
              {rebalancingPlan.underallocatedCategories.length > 0 ? (
                <ul className="action-list">
                  {rebalancingPlan.underallocatedCategories.map(item => (
                    <li key={item.category}>
                      Deploy <strong>{formatINR(item.adjustment)}</strong> into <strong>{item.category}</strong> ({item.currentPct}% up to {item.targetPct}% target).
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="clean-p">None. No category is below its target allocation.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioRebalancer;
