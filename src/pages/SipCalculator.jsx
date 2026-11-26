import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  RotateCcw, 
  TrendingUp, 
  Info, 
  ShieldAlert, 
  Calendar, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DoughnutChart from '../components/DoughnutChart';
import { 
  calculateSip, 
  formatIndianCurrency, 
  formatCompactIndianWords,
  generateYearlyProgression 
} from '../utils/calculatorUtils';
import './SipCalculator.css';

const SIP_DEFAULTS = {
  monthlyInvestment: 5000,
  expectedReturn: 12,
  timePeriod: 10,
  timing: 'end', // 'end' (end of month) | 'beginning'
};

const SipCalculator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form State
  const [monthlyInvestment, setMonthlyInvestment] = useState(SIP_DEFAULTS.monthlyInvestment);
  const [expectedReturn, setExpectedReturn] = useState(SIP_DEFAULTS.expectedReturn);
  const [timePeriod, setTimePeriod] = useState(SIP_DEFAULTS.timePeriod);
  const [timing, setTiming] = useState(SIP_DEFAULTS.timing);
  
  // UI toggles
  const [showYearlyTable, setShowYearlyTable] = useState(false);
  const [showFaq, setShowFaq] = useState(null);

  // Quick preset chips
  const sipAmountPresets = [1000, 5000, 10000, 25000, 50000];
  const returnPresets = [8, 10, 12, 15];
  const durationPresets = [5, 10, 15, 20];

  // Reset to defaults
  const handleReset = () => {
    setMonthlyInvestment(SIP_DEFAULTS.monthlyInvestment);
    setExpectedReturn(SIP_DEFAULTS.expectedReturn);
    setTimePeriod(SIP_DEFAULTS.timePeriod);
    setTiming(SIP_DEFAULTS.timing);
  };

  // Sanitized numeric values for calculations
  const safeMonthly = Math.max(0, isFinite(Number(monthlyInvestment)) ? Number(monthlyInvestment) : 5000);
  const safeReturn = Math.max(0, isFinite(Number(expectedReturn)) ? Number(expectedReturn) : 12);
  const safeDuration = Math.max(1, isFinite(Number(timePeriod)) ? Number(timePeriod) : 10);

  // Perform Calculation
  const results = useMemo(() => {
    return calculateSip(safeMonthly, safeReturn, safeDuration, timing);
  }, [safeMonthly, safeReturn, safeDuration, timing]);

  // Year-by-Year Growth Data
  const progressionData = useMemo(() => {
    return generateYearlyProgression('sip', safeMonthly, safeReturn, safeDuration, timing);
  }, [safeMonthly, safeReturn, safeDuration, timing]);

  // Returns on Invested Amount percentage
  const returnOnInvestmentPct = results.investedAmount > 0 
    ? ((results.estimatedReturns / results.investedAmount) * 100).toFixed(1) 
    : '0.0';

  const minInvestment = 500;
  const maxInvestment = 100000;
  const stepInvestment = 500;

  // Handlers for safe manual inputs & validation
  const handleInvestmentChange = (val) => {
    if (val === '') {
      setMonthlyInvestment('');
      return;
    }
    const num = Number(val);
    if (isNaN(num) || num < 0) return;
    setMonthlyInvestment(num);
  };

  const handleInvestmentBlur = () => {
    let num = Number(monthlyInvestment);
    if (isNaN(num) || num < 500) num = 500;
    else if (num > 100000) num = 100000;
    setMonthlyInvestment(num);
  };

  const handleReturnChange = (val) => {
    if (val === '') {
      setExpectedReturn('');
      return;
    }
    const num = Number(val);
    if (isNaN(num) || num < 0) return;
    setExpectedReturn(num);
  };

  const handleReturnBlur = () => {
    let num = Number(expectedReturn);
    if (isNaN(num) || num < 1) num = 1;
    else if (num > 30) num = 30;
    setExpectedReturn(num);
  };

  const handleDurationChange = (val) => {
    if (val === '') {
      setTimePeriod('');
      return;
    }
    const num = Number(val);
    if (isNaN(num) || num < 0) return;
    setTimePeriod(num);
  };

  const handleDurationBlur = () => {
    let num = Number(timePeriod);
    if (isNaN(num) || num < 1) num = 1;
    else if (num > 40) num = 40;
    setTimePeriod(num);
  };

  const toggleFaq = (index) => {
    setShowFaq(prev => prev === index ? null : index);
  };

  return (
    <div className="sip-page-container">
      {/* Brand Page Header */}
      <PageHeader 
        titleFirst="SIP" 
        titleLast="Calculator." 
        subtitle="Forecast your mutual fund wealth creation with precision and disciplined compounding." 
      />

      <div className="sip-main-content">
        <div className="sip-container">
          
          {/* Breadcrumb Navigation matching reference image */}
          <div className="sip-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">»</span>
            <span>Learning</span>
            <span className="breadcrumb-separator">»</span>
            <span className="active">SIP Calculator</span>
          </div>

          {/* Calculator Dashboard Card */}
          <div className="calculator-card">
            
            {/* Top Toolbar: Heading & Reset Button */}
            <div className="calc-header-toolbar">
              <div className="calc-card-title-group">
                <h2 className="calc-card-title">SIP Calculator</h2>
                <span className="calc-card-badge">Monthly Investment</span>
              </div>

              {/* Action Buttons: Reset & Timing Tooltip */}
              <div className="calc-top-actions">
                <div className="timing-toggle-box" title="End of Month (standard ordinary annuity) vs Beginning of Month">
                  <span className="timing-label">Timing:</span>
                  <select 
                    value={timing} 
                    onChange={(e) => setTiming(e.target.value)}
                    className="timing-select"
                    aria-label="Investment Timing"
                  >
                    <option value="end">End of Month</option>
                    <option value="beginning">Beginning of Month</option>
                  </select>
                </div>

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

            {/* Two-Column Responsive Layout */}
            <div className="calc-grid-layout">
              
              {/* LEFT SECTION: INPUTS */}
              <div className="calc-inputs-column">
                
                {/* 1. Monthly Investment */}
                <div className="input-group-item">
                  <div className="input-header-row">
                    <label className="input-label" htmlFor="investment-input">
                      Monthly Investment
                    </label>
                    <div className="input-badge-box">
                      <span className="input-currency-symbol">₹</span>
                      <input 
                        id="investment-input"
                        type="number"
                        className="custom-number-input"
                        value={monthlyInvestment}
                        onChange={(e) => handleInvestmentChange(e.target.value)}
                        onBlur={handleInvestmentBlur}
                        min={minInvestment}
                        max={maxInvestment}
                        step={stepInvestment}
                        aria-label="Investment Amount in Rupees"
                      />
                    </div>
                  </div>

                  <div className="slider-container">
                    <input 
                      type="range"
                      className="styled-range-slider"
                      min={minInvestment}
                      max={maxInvestment}
                      step={stepInvestment}
                      value={monthlyInvestment}
                      onChange={(e) => handleInvestmentChange(e.target.value)}
                      aria-label="Investment Range Slider"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${
                          ((monthlyInvestment - minInvestment) / (maxInvestment - minInvestment)) * 100
                        }%, #e2e8f0 ${
                          ((monthlyInvestment - minInvestment) / (maxInvestment - minInvestment)) * 100
                        }%, #e2e8f0 100%)`
                      }}
                    />
                  </div>

                  {/* Range limits and Quick Preset Pills */}
                  <div className="slider-limits-row">
                    <span>₹{minInvestment.toLocaleString('en-IN')}</span>
                    <div className="preset-chips-wrap">
                      {sipAmountPresets.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          className={`preset-chip ${monthlyInvestment === preset ? 'active' : ''}`}
                          onClick={() => handleInvestmentChange(preset)}
                        >
                          {preset >= 100000 ? `₹${preset / 100000}L` : `₹${preset / 1000}k`}
                        </button>
                      ))}
                    </div>
                    <span>₹1 Lakh</span>
                  </div>
                </div>

                {/* 2. Expected Annual Return */}
                <div className="input-group-item">
                  <div className="input-header-row">
                    <label className="input-label" htmlFor="return-input">
                      Expected Return Rate (p.a.)
                    </label>
                    <div className="input-badge-box">
                      <input 
                        id="return-input"
                        type="number"
                        className="custom-number-input input-narrow"
                        value={expectedReturn}
                        onChange={(e) => handleReturnChange(e.target.value)}
                        onBlur={handleReturnBlur}
                        min={1}
                        max={30}
                        step={0.5}
                        aria-label="Expected Annual Return Percentage"
                      />
                      <span className="input-unit-symbol">%</span>
                    </div>
                  </div>

                  <div className="slider-container">
                    <input 
                      type="range"
                      className="styled-range-slider"
                      min={1}
                      max={30}
                      step={0.5}
                      value={safeReturn}
                      onChange={(e) => handleReturnChange(e.target.value)}
                      aria-label="Expected Return Range Slider"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${
                          ((safeReturn - 1) / (30 - 1)) * 100
                        }%, #e2e8f0 ${
                          ((safeReturn - 1) / (30 - 1)) * 100
                        }%, #e2e8f0 100%)`
                      }}
                    />
                  </div>

                  <div className="slider-limits-row">
                    <span>1%</span>
                    <div className="preset-chips-wrap">
                      {returnPresets.map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          className={`preset-chip ${safeReturn === rate ? 'active' : ''}`}
                          onClick={() => handleReturnChange(rate)}
                        >
                          {rate}%
                        </button>
                      ))}
                    </div>
                    <span>30%</span>
                  </div>
                </div>

                {/* 3. Investment Duration */}
                <div className="input-group-item">
                  <div className="input-header-row">
                    <label className="input-label" htmlFor="duration-input">
                      Time Period
                    </label>
                    <div className="input-badge-box">
                      <input 
                        id="duration-input"
                        type="number"
                        className="custom-number-input input-narrow"
                        value={timePeriod}
                        onChange={(e) => handleDurationChange(e.target.value)}
                        onBlur={handleDurationBlur}
                        min={1}
                        max={40}
                        step={1}
                        aria-label="Investment Duration in Years"
                      />
                      <span className="input-unit-symbol">Yr</span>
                    </div>
                  </div>

                  <div className="slider-container">
                    <input 
                      type="range"
                      className="styled-range-slider"
                      min={1}
                      max={40}
                      step={1}
                      value={safeDuration}
                      onChange={(e) => handleDurationChange(e.target.value)}
                      aria-label="Time Period Range Slider"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${
                          ((safeDuration - 1) / (40 - 1)) * 100
                        }%, #e2e8f0 ${
                          ((safeDuration - 1) / (40 - 1)) * 100
                        }%, #e2e8f0 100%)`
                      }}
                    />
                  </div>

                  <div className="slider-limits-row">
                    <span>1 Yr</span>
                    <div className="preset-chips-wrap">
                      {durationPresets.map((yr) => (
                        <button
                          key={yr}
                          type="button"
                          className={`preset-chip ${safeDuration === yr ? 'active' : ''}`}
                          onClick={() => handleDurationChange(yr)}
                        >
                          {yr} Yr
                        </button>
                      ))}
                    </div>
                    <span>40 Yr</span>
                  </div>
                </div>

                {/* Interactive Insight summary */}
                <div className="quick-insight-banner">
                  <Info size={18} className="insight-icon" />
                  <p>
                    Investing <strong>{formatIndianCurrency(safeMonthly)}</strong> every month for <strong>{safeDuration} years</strong> at an estimated <strong>{safeReturn}%</strong> annual return can generate <strong>{formatIndianCurrency(results.estimatedReturns)}</strong> in capital gains ({returnOnInvestmentPct}% Returns on Invested Amount).
                  </p>
                </div>

              </div>

              {/* RIGHT SECTION: CALCULATION RESULTS & CHART */}
              <div className="calc-results-column">
                
                {/* Visual Donut Chart */}
                <div className="chart-wrapper-card">
                  <DoughnutChart 
                    investedAmount={results.investedAmount}
                    estimatedReturns={results.estimatedReturns}
                    investedColor="#5367ff"
                    returnsColor="#00d09c"
                  />
                </div>

                {/* Metric Summary Rows matching reference layout */}
                <div className="results-metrics-grid">
                  <div className="metric-box">
                    <span className="metric-title">Total Invested Amount</span>
                    <span className="metric-number text-slate">
                      {formatIndianCurrency(results.investedAmount)}
                    </span>
                    <span className="metric-words">{formatCompactIndianWords(results.investedAmount)}</span>
                  </div>

                  <div className="metric-box">
                    <span className="metric-title">Estimated Returns</span>
                    <span className="metric-number text-emerald">
                      {formatIndianCurrency(results.estimatedReturns)}
                    </span>
                    <span className="metric-words">{formatCompactIndianWords(results.estimatedReturns)}</span>
                  </div>
                </div>

                {/* Prominent Maturity Value Card */}
                <div className="total-value-highlight-card">
                  <div className="total-value-label">Total Estimated Maturity Value</div>
                  <div className="total-value-amount">
                    {formatIndianCurrency(results.totalValue)}
                  </div>
                  <div className="total-value-tag">
                    {formatCompactIndianWords(results.totalValue)} • Returns on Invested Amount: {returnOnInvestmentPct}%
                  </div>
                </div>

                {/* CTA Invest Now Button matching reference green styling */}
                <div className="calc-cta-section">
                  <Link to="/contact" className="btn-invest-now">
                    INVEST NOW <TrendingUp size={18} />
                  </Link>
                </div>

              </div>

            </div>

            {/* Toggleable Yearly Compounding Progression Table */}
            <div className="yearly-breakdown-section">
              <button 
                type="button" 
                className="btn-toggle-breakdown"
                onClick={() => setShowYearlyTable(!showYearlyTable)}
              >
                <span>{showYearlyTable ? 'Hide' : 'View'} Year-by-Year Growth Schedule</span>
                {showYearlyTable ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {showYearlyTable && (
                <div className="breakdown-table-wrapper animate-fade-in">
                  <table className="progression-table">
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th>Invested Capital</th>
                        <th>Estimated Gains</th>
                        <th>Portfolio Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {progressionData.map((row) => (
                        <tr key={row.year}>
                          <td><strong>Year {row.year}</strong></td>
                          <td>{formatIndianCurrency(row.investedAmount)}</td>
                          <td className="text-emerald">+{formatIndianCurrency(row.estimatedReturns)}</td>
                          <td className="text-navy"><strong>{formatIndianCurrency(row.totalValue)}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

          {/* Educational Information Section: How SIP Works */}
          <div className="sip-educational-section">
            
            <div className="edu-header">
              <h2>How SIP Wealth Creation Works</h2>
              <p>Harness the power of disciplined regular investing and compounding interest.</p>
            </div>

            <div className="edu-cards-grid">
              
              <div className="edu-card">
                <div className="edu-card-icon">
                  <TrendingUp size={24} />
                </div>
                <h3>Rupee Cost Averaging</h3>
                <p>
                  SIP eliminates the anxiety of market timing. When markets drop, your fixed monthly instalment buys more mutual fund units. When markets rise, you accumulate higher value.
                </p>
              </div>

              <div className="edu-card">
                <div className="edu-card-icon">
                  <Calculator size={24} />
                </div>
                <h3>Power of Compounding</h3>
                <p>
                  Returns generated on your initial capital begin earning their own returns. Over 10, 15, or 20 years, compounding generates wealth far exceeding your actual invested principal.
                </p>
              </div>

              <div className="edu-card">
                <div className="edu-card-icon">
                  <Calendar size={24} />
                </div>
                <h3>Financial Discipline</h3>
                <p>
                  Automating your monthly savings inculcates regular financial discipline, helping you reach life goals like child education, retirement, and home ownership without budget stress.
                </p>
              </div>

            </div>

            {/* Dynamic Formula Explanation Section */}
            <div className="formula-explanation-box">
              <div className="formula-box-header">
                <h3>The SIP Future Value Formula</h3>
                <span className="formula-timing-badge">
                  {timing === 'beginning' ? 'Beginning of Month (Annuity Due)' : 'End of Month (Ordinary Annuity)'}
                </span>
              </div>
              <p className="formula-intro">
                {timing === 'beginning'
                  ? 'For investments made at the Beginning of the Month, the future value multiplies the standard annuity formula by (1 + r) to reflect that contributions earn returns immediately throughout their first month:'
                  : 'For investments made at the End of the Month, our calculator applies the standard periodic future value formula without additional multiplier:'}
              </p>
              <div className="formula-code-badge">
                <code>
                  {timing === 'beginning' 
                    ? 'FV = P × [((1 + r)ⁿ - 1) / r] × (1 + r)' 
                    : 'FV = P × [((1 + r)ⁿ - 1) / r]'}
                </code>
              </div>
              <div className="formula-variables-grid">
                <div className="var-item">
                  <strong>FV</strong> = Total Estimated Maturity Value ({formatIndianCurrency(results.totalValue)})
                </div>
                <div className="var-item">
                  <strong>P</strong> = Monthly Investment Amount ({formatIndianCurrency(safeMonthly)})
                </div>
                <div className="var-item">
                  <strong>r</strong> = Monthly Rate of Return = (Annual Return ÷ 12 ÷ 100) = {safeReturn}% ÷ 1200 = {(safeReturn / 1200).toFixed(6)}
                </div>
                <div className="var-item">
                  <strong>n</strong> = Total Monthly Instalments = ({safeDuration} years × 12) = {safeDuration * 12} months
                </div>
                {timing === 'beginning' && (
                  <div className="var-item var-item-full">
                    <strong>(1 + r)</strong> = Beginning of Month multiplier ({ (1 + safeReturn / 1200).toFixed(4) }), accounting for immediate first-month compounding.
                  </div>
                )}
                {safeReturn === 0 && (
                  <div className="var-item var-item-full">
                    <strong>Zero Interest Rate</strong>: When r = 0, FV = P × n = {formatIndianCurrency(results.investedAmount)} (Total principal with zero interest gains).
                  </div>
                )}
              </div>
            </div>

            {/* SIP FAQs */}
            <div className="sip-faq-section">
              <h3>Frequently Asked Questions on SIP</h3>
              <div className="faq-accordion-list">
                
                <div className="faq-item">
                  <button className="faq-question-btn" onClick={() => toggleFaq(0)}>
                    <span>What is a Systematic Investment Plan (SIP)?</span>
                    {showFaq === 0 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {showFaq === 0 && (
                    <div className="faq-answer-content">
                      <p>
                        A Systematic Investment Plan (SIP) is a facility offered by Mutual Funds that allows an investor to invest a fixed sum of money at regular intervals (monthly, quarterly, or weekly) into a chosen mutual fund scheme instead of making a lump-sum investment.
                      </p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <button className="faq-question-btn" onClick={() => toggleFaq(1)}>
                    <span>Can I modify or pause my monthly SIP amount?</span>
                    {showFaq === 1 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {showFaq === 1 && (
                    <div className="faq-answer-content">
                      <p>
                        Yes. Mutual fund SIPs are completely flexible. You can increase your monthly investment anytime via Step-up SIP, pause your instalments temporarily during emergencies, or stop your SIP without any penalty.
                      </p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <button className="faq-question-btn" onClick={() => toggleFaq(2)}>
                    <span>What return rate should I assume for equity mutual funds?</span>
                    {showFaq === 2 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {showFaq === 2 && (
                    <div className="faq-answer-content">
                      <p>
                        Historically, diversified Indian equity mutual funds (large-cap, flexi-cap, and multi-cap) have delivered 12% to 15% annualized returns over holding horizons of 7 to 10+ years. However, past performance does not guarantee future results.
                      </p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <button className="faq-question-btn" onClick={() => toggleFaq(3)}>
                    <span>What is the difference between SIP and Lumpsum?</span>
                    {showFaq === 3 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {showFaq === 3 && (
                    <div className="faq-answer-content">
                      <p>
                        In SIP, you invest fixed amounts periodically from your monthly income, benefiting from Rupee Cost Averaging. In Lumpsum, you invest a single bulk amount upfront. Both approaches can be combined based on your current cash flows and market conditions.
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
                <span>Statutory & Financial Disclaimer</span>
              </div>
              <p>
                Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. The calculations and estimates provided by this SIP calculator are for illustrative and educational purposes only, based on the annual return rate assumed by the user. These calculations do not represent guaranteed returns or the performance of any specific mutual fund scheme. 
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default SipCalculator;
