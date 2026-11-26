import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PieChart, 
  RotateCcw, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  Scale,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Sliders
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import AssetAllocationChart from '../components/AssetAllocationChart';
import { 
  MODEL_PRESETS, 
  calculateAssetAllocation, 
  normalizeAllocations, 
  formatIndianCurrency, 
  formatCompactIndianWords 
} from '../utils/assetAllocationUtils';
import './AssetAllocationCalculator.css';

const DEFAULT_INVESTMENT = 1000000; // ₹10,00,000 (10 Lakh)
const DEFAULT_ALLOCATIONS = {
  equity: 50,
  debt: 30,
  gold: 10,
  other: 10,
};

const AssetAllocationCalculator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form State
  const [totalInvestment, setTotalInvestment] = useState(DEFAULT_INVESTMENT);
  const [allocations, setAllocations] = useState(DEFAULT_ALLOCATIONS);
  const [selectedPreset, setSelectedPreset] = useState('moderate');
  const [showFaq, setShowFaq] = useState(null);

  // Quick preset chips for total investment
  const investmentPresets = [200000, 500000, 1000000, 2500000, 5000000, 10000000];

  // Calculate allocation results dynamically
  const safeInvestment = Math.max(0, isFinite(Number(totalInvestment)) ? Number(totalInvestment) : DEFAULT_INVESTMENT);
  const allocationResult = useMemo(() => {
    return calculateAssetAllocation(safeInvestment, allocations);
  }, [safeInvestment, allocations]);

  // Apply a model preset
  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset.id);
    setAllocations({ ...preset.allocations });
  };

  // Adjust an individual category percentage
  const handleAllocationChange = (catId, val) => {
    setSelectedPreset('custom');
    if (val === '') {
      setAllocations((prev) => ({ ...prev, [catId]: '' }));
      return;
    }
    const num = Number(val);
    if (isNaN(num) || num < 0) return;
    const clamped = Math.min(100, num);
    setAllocations((prev) => ({ ...prev, [catId]: clamped }));
  };

  const handleAllocationBlur = (catId) => {
    const raw = allocations[catId];
    let num = Number(raw);
    if (isNaN(num) || num < 0) num = 0;
    else if (num > 100) num = 100;
    setAllocations((prev) => ({ ...prev, [catId]: num }));
  };

  // Auto balance allocations to sum to exactly 100%
  const handleAutoBalance = () => {
    const normalized = normalizeAllocations(allocations);
    setAllocations(normalized);
  };

  // Reset to default
  const handleReset = () => {
    setTotalInvestment(DEFAULT_INVESTMENT);
    setAllocations({ ...DEFAULT_ALLOCATIONS });
    setSelectedPreset('moderate');
  };

  // Investment amount input handlers
  const handleInvestmentChange = (val) => {
    if (val === '') {
      setTotalInvestment('');
      return;
    }
    const num = Number(val);
    if (isNaN(num) || num < 0) return;
    setTotalInvestment(num);
  };

  const handleInvestmentBlur = () => {
    let num = Number(totalInvestment);
    if (isNaN(num) || num < 10000) num = 10000;
    else if (num > 500000000) num = 500000000;
    setTotalInvestment(num);
  };

  const toggleFaq = (index) => {
    setShowFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div className="asset-page-container">
      {/* Brand Page Header */}
      <PageHeader
        titleFirst="Asset"
        titleLast="Allocation."
        subtitle="Diversify your capital across growth, income, and safe-haven assets for optimal risk-adjusted returns."
      />

      <div className="asset-main-content">
        <div className="asset-container">
          
          {/* Breadcrumb Navigation */}
          <div className="asset-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">»</span>
            <span>Learning</span>
            <span className="breadcrumb-separator">»</span>
            <span className="active">Asset Allocation Calculator</span>
          </div>

          {/* Calculator Dashboard Card */}
          <div className="calculator-card">
            
            {/* Top Toolbar */}
            <div className="calc-header-toolbar">
              <div className="calc-card-title-group">
                <h2 className="calc-card-title">Asset Allocation Calculator</h2>
                <span className="calc-card-badge">Portfolio Strategy</span>
              </div>

              <div className="calc-top-actions">
                <button
                  className="btn-reset"
                  onClick={handleReset}
                  title="Reset calculator to defaults"
                  type="button"
                >
                  <RotateCcw size={15} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Model Portfolio Presets Selector */}
            <div className="portfolio-presets-bar">
              <span className="presets-label">
                <Sparkles size={16} className="text-gold" /> Model Strategies:
              </span>
              <div className="presets-pills-list">
                {MODEL_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`preset-strategy-pill ${selectedPreset === preset.id ? 'active' : ''}`}
                    onClick={() => handlePresetSelect(preset)}
                  >
                    <span className="preset-pill-title">{preset.name}</span>
                  </button>
                ))}
                {selectedPreset === 'custom' && (
                  <span className="preset-strategy-pill active custom-pill">
                    Custom Mix
                  </span>
                )}
              </div>
            </div>

            {/* Two-Column Responsive Layout */}
            <div className="calc-grid-layout">
              
              {/* LEFT COLUMN: TOTAL AMOUNT & CATEGORY ALLOCATION SLIDERS */}
              <div className="calc-inputs-column">
                
                {/* 1. Total Investment Amount */}
                <div className="input-group-item">
                  <div className="input-header-row">
                    <label className="input-label" htmlFor="total-investment-input">
                      Total Investment Portfolio
                    </label>
                    <div className="input-badge-box">
                      <span className="input-currency-symbol">₹</span>
                      <input
                        id="total-investment-input"
                        type="number"
                        className="custom-number-input"
                        value={totalInvestment}
                        onChange={(e) => handleInvestmentChange(e.target.value)}
                        onBlur={handleInvestmentBlur}
                        min={10000}
                        max={100000000}
                        step={50000}
                        aria-label="Total Investment Amount in Rupees"
                      />
                    </div>
                  </div>

                  <div className="slider-container">
                    <input
                      type="range"
                      className="styled-range-slider"
                      min={50000}
                      max={20000000}
                      step={50000}
                      value={safeInvestment}
                      onChange={(e) => handleInvestmentChange(e.target.value)}
                      aria-label="Total Investment Range Slider"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${
                          ((safeInvestment - 50000) / (20000000 - 50000)) * 100
                        }%, #e2e8f0 ${
                          ((safeInvestment - 50000) / (20000000 - 50000)) * 100
                        }%, #e2e8f0 100%)`
                      }}
                    />
                  </div>

                  {/* Preset chips for quick amounts */}
                  <div className="slider-limits-row">
                    <span>₹50,000</span>
                    <div className="preset-chips-wrap">
                      {investmentPresets.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          className={`preset-chip ${safeInvestment === preset ? 'active' : ''}`}
                          onClick={() => handleInvestmentChange(preset)}
                        >
                          {preset >= 10000000 ? `₹${preset / 10000000} Cr` : `₹${preset / 100000}L`}
                        </button>
                      ))}
                    </div>
                    <span>₹2 Cr</span>
                  </div>
                </div>

                {/* 2. Category Sliders */}
                <div className="allocation-sliders-block">
                  <div className="allocation-section-header">
                    <span className="section-subtitle-text">
                      <Sliders size={16} /> Asset Class Breakdown (%)
                    </span>
                    
                    {/* Real-time sum indicator badge */}
                    <div className={`allocation-status-badge ${allocationResult.isValid ? 'valid' : 'invalid'}`}>
                      {allocationResult.isValid ? (
                        <>
                          <CheckCircle2 size={15} /> Total: 100%
                        </>
                      ) : (
                        <>
                          <AlertTriangle size={15} /> Total: {allocationResult.totalPercentage}%
                          {allocationResult.difference > 0 ? ` (${allocationResult.difference}% remaining)` : ` (${Math.abs(allocationResult.difference)}% excess)`}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Allocation percentage bar */}
                  <div className="stacked-allocation-bar">
                    {allocationResult.breakdown.map((item) => (
                      <div
                        key={item.id}
                        className="bar-segment"
                        style={{
                          width: `${Math.min(100, item.percentage)}%`,
                          backgroundColor: item.color,
                        }}
                        title={`${item.name}: ${item.percentage}%`}
                      ></div>
                    ))}
                  </div>

                  {/* Category Slider List */}
                  <div className="category-slider-list">
                    {allocationResult.breakdown.map((cat) => {
                      const currentVal = allocations[cat.id] === '' ? '' : allocations[cat.id];
                      const safeVal = Number(currentVal) || 0;

                      return (
                        <div key={cat.id} className="category-slider-card">
                          <div className="cat-card-header">
                            <div className="cat-title-wrap">
                              <span className="cat-color-dot" style={{ backgroundColor: cat.color }}></span>
                              <div>
                                <span className="cat-name">{cat.name}</span>
                                <span className="cat-desc">{cat.description}</span>
                              </div>
                            </div>
                            
                            <div className="cat-input-badge">
                              <input
                                type="number"
                                className="cat-number-input"
                                value={currentVal}
                                onChange={(e) => handleAllocationChange(cat.id, e.target.value)}
                                onBlur={() => handleAllocationBlur(cat.id)}
                                min={0}
                                max={100}
                                step={1}
                                aria-label={`${cat.name} percentage`}
                              />
                              <span className="cat-unit">%</span>
                            </div>
                          </div>

                          <div className="slider-container">
                            <input
                              type="range"
                              className="styled-range-slider"
                              min={0}
                              max={100}
                              step={1}
                              value={safeVal}
                              onChange={(e) => handleAllocationChange(cat.id, e.target.value)}
                              aria-label={`${cat.name} range slider`}
                              style={{
                                background: `linear-gradient(to right, ${cat.color} 0%, ${cat.color} ${safeVal}%, #e2e8f0 ${safeVal}%, #e2e8f0 100%)`
                              }}
                            />
                          </div>

                          <div className="cat-card-footer">
                            <span className="cat-role">{cat.role}</span>
                            <span className="cat-calculated-amount">
                              {formatIndianCurrency(cat.amount)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Auto Balance Action Prompt when != 100% */}
                  {!allocationResult.isValid && (
                    <div className="autobalance-prompt-box">
                      <div className="autobalance-text">
                        <AlertTriangle size={18} className="text-amber" />
                        <span>
                          Allocations total <strong>{allocationResult.totalPercentage}%</strong>. For an accurate strategy, percentages must equal 100%.
                        </span>
                      </div>
                      <button
                        type="button"
                        className="btn-autobalance"
                        onClick={handleAutoBalance}
                      >
                        <Scale size={16} /> Auto-Balance to 100%
                      </button>
                    </div>
                  )}

                </div>

              </div>

              {/* RIGHT SECTION: DOUGHNUT CHART & PORTFOLIO BREAKDOWN */}
              <div className="calc-results-column">
                
                {/* Interactive Multi-Segment Doughnut Chart */}
                <div className="chart-wrapper-card">
                  <AssetAllocationChart
                    breakdown={allocationResult.breakdown}
                    totalInvestment={safeInvestment}
                  />
                </div>

                {/* Total Portfolio Value Summary Card */}
                <div className="total-value-highlight-card">
                  <div className="total-value-label">Total Portfolio Allocation</div>
                  <div className="total-value-amount">
                    {formatIndianCurrency(safeInvestment)}
                  </div>
                  <div className="total-value-tag">
                    {formatCompactIndianWords(safeInvestment)} • {allocationResult.isValid ? '100% Fully Allocated' : `${allocationResult.totalPercentage}% Current Sum`}
                  </div>
                </div>

                {/* Category Summary Cards */}
                <div className="category-results-grid">
                  {allocationResult.breakdown.map((item) => (
                    <div key={item.id} className="cat-result-box" style={{ borderLeftColor: item.color }}>
                      <div className="cat-result-top">
                        <span className="cat-result-title">{item.name}</span>
                        <span className="cat-result-pct" style={{ color: item.color }}>
                          {item.percentage}%
                        </span>
                      </div>
                      <div className="cat-result-val">
                        {formatIndianCurrency(item.amount)}
                      </div>
                      <div className="cat-result-words">
                        {formatCompactIndianWords(item.amount)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Consult Advisor Button */}
                <div className="calc-cta-section">
                  <Link to="/contact" className="btn-invest-now">
                    OPTIMIZE MY PORTFOLIO <TrendingUp size={18} />
                  </Link>
                </div>

              </div>

            </div>

          </div>

          {/* Educational Information Section */}
          <div className="sip-educational-section">
            
            <div className="edu-header">
              <h2>Why Asset Allocation Drives 90%+ of Portfolio Returns</h2>
              <p>Academic research proves that strategic asset allocation is the single most critical factor in long-term wealth creation.</p>
            </div>

            <div className="edu-cards-grid">
              
              <div className="edu-card">
                <div className="edu-card-icon">
                  <TrendingUp size={24} />
                </div>
                <h3>Risk-Return Optimization</h3>
                <p>
                  No single asset class outperforms every year. Equities create long-term wealth, debt provides income stability, and gold shields against inflation and rupee depreciation.
                </p>
              </div>

              <div className="edu-card">
                <div className="edu-card-icon">
                  <Scale size={24} />
                </div>
                <h3>Disciplined Rebalancing</h3>
                <p>
                  As market movements cause certain assets to appreciate faster than others, periodic rebalancing forces you to "buy low and sell high" in a disciplined, unemotional manner.
                </p>
              </div>

              <div className="edu-card">
                <div className="edu-card-icon">
                  <PieChart size={24} />
                </div>
                <h3>Goal-Aligned Timelines</h3>
                <p>
                  Short-term goals (1-3 yrs) require high debt allocations to avoid volatility, while long-term retirement and legacy goals (7+ yrs) benefit from higher equity exposure.
                </p>
              </div>

            </div>

            {/* Asset Class Reference Matrix */}
            <div className="formula-explanation-box">
              <h3>Core Asset Classes Comparison</h3>
              <p className="formula-intro">
                Each asset category serves a distinct strategic purpose in a resilient wealth creation plan:
              </p>
              
              <div className="asset-matrix-table-wrap">
                <table className="asset-matrix-table">
                  <thead>
                    <tr>
                      <th>Asset Class</th>
                      <th>Primary Role</th>
                      <th>Risk Profile</th>
                      <th>Recommended Horizon</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong style={{ color: '#4f46e5' }}>Equity</strong></td>
                      <td>Wealth Creation & Inflation Beating</td>
                      <td>Moderate to High</td>
                      <td>5+ Years</td>
                    </tr>
                    <tr>
                      <td><strong style={{ color: '#00d09c' }}>Debt & Fixed Income</strong></td>
                      <td>Capital Preservation & Regular Income</td>
                      <td>Low to Moderate</td>
                      <td>1 - 3+ Years</td>
                    </tr>
                    <tr>
                      <td><strong style={{ color: '#f59e0b' }}>Gold</strong></td>
                      <td>Hedge against Geopolitical Shocks & Inflation</td>
                      <td>Moderate</td>
                      <td>5+ Years</td>
                    </tr>
                    <tr>
                      <td><strong style={{ color: '#8b5cf6' }}>Other Assets / Liquid</strong></td>
                      <td>Liquidity, Contingencies & Real Estate</td>
                      <td>Low to High</td>
                      <td>Immediate to 7+ Years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQs */}
            <div className="sip-faq-section">
              <h3>Frequently Asked Questions on Asset Allocation</h3>
              <div className="faq-accordion-list">
                
                <div className="faq-item">
                  <button className="faq-question-btn" onClick={() => toggleFaq(0)}>
                    <span>How often should I rebalance my asset allocation?</span>
                    {showFaq === 0 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {showFaq === 0 && (
                    <div className="faq-answer-content">
                      <p>
                        Most financial advisors recommend reviewing your portfolio at least once every 6 to 12 months, or whenever an asset class deviates by more than 5% to 10% from your strategic target.
                      </p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <button className="faq-question-btn" onClick={() => toggleFaq(1)}>
                    <span>What is the "100 minus age" rule for equity allocation?</span>
                    {showFaq === 1 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {showFaq === 1 && (
                    <div className="faq-answer-content">
                      <p>
                        The "100 minus age" rule suggests subtracting your age from 100 to determine your equity percentage (e.g., a 30-year-old allocates 70% to equity, and 30% to debt/gold). However, individual risk appetite, dependents, and goals should always be factored in.
                      </p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <button className="faq-question-btn" onClick={() => toggleFaq(2)}>
                    <span>Why should I hold Gold in my portfolio?</span>
                    {showFaq === 2 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {showFaq === 2 && (
                    <div className="faq-answer-content">
                      <p>
                        Gold historically shares an inverse or low correlation with equity markets. During equity downturns, currency devaluations, or geopolitical crises, gold acts as a stabilizer for overall portfolio volatility.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Financial Disclaimer */}
            <div className="sip-disclaimer-box">
              <div className="disclaimer-title">
                <ShieldAlert size={18} />
                <span>Financial & Portfolio Disclaimer</span>
              </div>
              <p>
                The asset allocation models and figures displayed in this calculator are for illustrative and educational purposes only. Asset allocation does not guarantee a profit or protect against loss in declining markets. Mutual fund investments are subject to market risks. Please consult an AMFI-registered mutual fund distributor before making investment decisions.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AssetAllocationCalculator;
