import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ExternalLink, 
  CheckCircle2, 
  X, 
  Info, 
  Clock, 
  TrendingUp, 
  Smartphone, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { QUICK_INVEST_FUNDS, SCHEME_CATEGORIES } from '../data/quickInvestFunds';
import { getLatestNAV, getHistoricalNAV } from '../services/mutualFundApi';
import { calculateHistoricalReturns, formatINR } from '../utils/fundCalculations';
import PageHeader from '../components/PageHeader';
import './QuickInvest.css';

const QuickInvest = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All Schemes');
  const [activeFundForDetails, setActiveFundForDetails] = useState(null);
  const [activeFundForInvest, setActiveFundForInvest] = useState(null);
  
  // Real-time scheme data state for modal
  const [modalSchemeData, setModalSchemeData] = useState(null);
  const [isLoadingSchemeData, setIsLoadingSchemeData] = useState(false);

  // Demo investment flow state
  const [investmentMode, setInvestmentMode] = useState('SIP'); // 'SIP' | 'LUMPSUM'
  const [investAmount, setInvestAmount] = useState(2500);
  const [sipDate, setSipDate] = useState(10);
  const [isDemoSubmitted, setIsDemoSubmitted] = useState(false);

  // Filter funds
  const filteredFunds = QUICK_INVEST_FUNDS.filter(fund => {
    if (selectedCategory === 'All Schemes') return true;
    return fund.categoryGroup === selectedCategory;
  });

  // Handle open View Details
  const handleOpenDetails = async (fund) => {
    setActiveFundForDetails(fund);
    setIsLoadingSchemeData(true);
    setModalSchemeData({
      nav: fund.defaultNav,
      navDate: fund.defaultNavDate,
      returns: fund.defaultReturns,
      fundHouse: fund.fundHouse,
    });

    try {
      if (fund.schemeCode) {
        const [latestRes, historyRes] = await Promise.allSettled([
          getLatestNAV(fund.schemeCode),
          getHistoricalNAV(fund.schemeCode)
        ]);

        let liveNav = fund.defaultNav;
        let liveDate = fund.defaultNavDate;
        let liveReturns = fund.defaultReturns;
        let liveHouse = fund.fundHouse;

        if (latestRes.status === 'fulfilled' && latestRes.value) {
          liveNav = latestRes.value.latestNav || liveNav;
          liveDate = latestRes.value.navDate || liveDate;
          liveHouse = latestRes.value.fundHouse || liveHouse;
        }

        if (historyRes.status === 'fulfilled' && historyRes.value && historyRes.value.records) {
          const calcReturns = calculateHistoricalReturns(historyRes.value.records);
          liveReturns = {
            return1Y: calcReturns.return1Y ?? fund.defaultReturns.return1Y,
            return3Y: calcReturns.return3Y ?? fund.defaultReturns.return3Y,
            return5Y: calcReturns.return5Y ?? fund.defaultReturns.return5Y,
          };
        }

        setModalSchemeData({
          nav: liveNav,
          navDate: liveDate,
          returns: liveReturns,
          fundHouse: liveHouse,
        });
      }
    } catch {
      // Fallback already set
    } finally {
      setIsLoadingSchemeData(false);
    }
  };

  // Handle open Invest Now
  const handleOpenInvest = (fund) => {
    setActiveFundForInvest(fund);
    setInvestAmount(fund.minSip || 2500);
    setInvestmentMode('SIP');
    setIsDemoSubmitted(false);
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setIsDemoSubmitted(true);
  };

  return (
    <div className="quick-invest-page">
      <PageHeader 
        titleFirst="Quick" 
        titleLast="Invest." 
        subtitle="Explore curated schemes across different investment categories." 
      />

      <div className="quick-invest-main-wrapper">
        
        {/* Breadcrumb Navigation */}
        <div className="qi-breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span className="active">Quick Invest</span>
        </div>

        {/* Top Header Section inspired by Screenshot 2 */}
        <div className="qi-header-block">
          <h2 className="qi-main-title">Our Selected Mutual Funds</h2>
          <p className="qi-subtitle">Explore schemes across different investment categories.</p>
        </div>

        {/* Category Filters */}
        <div className="qi-filters-bar">
          {SCHEME_CATEGORIES.map(category => (
            <button
              key={category}
              type="button"
              className={`qi-filter-pill ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Horizontal Mutual Fund Cards List */}
        <div className="qi-cards-container">
          {filteredFunds.map((fund) => (
            <div key={fund.id} className="qi-fund-card">
              
              {/* Card Top Row: Fund Title, Category & Risk Level */}
              <div className="qi-card-top-row">
                <div className="qi-fund-info">
                  <h3 className="qi-fund-name">{fund.name}</h3>
                  <div className="qi-fund-meta-row">
                    <span className="qi-category-tag">{fund.category}</span>
                    <span className="qi-dot-separator">•</span>
                    <span className="qi-fund-house-text">{fund.fundHouse}</span>
                  </div>
                </div>

                <div className="qi-risk-col">
                  <span className={`qi-risk-badge risk-${fund.riskClass}`}>
                    {fund.riskLevel}
                  </span>
                </div>
              </div>

              {/* Card Bottom Row: View Details & Invest Now */}
              <div className="qi-card-bottom-row">
                <button
                  type="button"
                  className="btn-qi-details"
                  onClick={() => handleOpenDetails(fund)}
                >
                  <span>View Details</span>
                  <ChevronRight size={16} />
                </button>

                <button
                  type="button"
                  className="btn-qi-invest"
                  onClick={() => handleOpenInvest(fund)}
                >
                  <span>Invest Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* ======================================================== */}
      {/* 1. VIEW DETAILS MODAL */}
      {/* ======================================================== */}
      {activeFundForDetails && (
        <div className="qi-modal-backdrop" onClick={() => setActiveFundForDetails(null)}>
          <div className="qi-modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="qi-modal-header">
              <div>
                <span className={`qi-risk-badge risk-${activeFundForDetails.riskClass}`}>
                  {activeFundForDetails.riskLevel}
                </span>
                <h3 className="qi-modal-title">{activeFundForDetails.name}</h3>
                <span className="qi-modal-category">{activeFundForDetails.category}</span>
              </div>
              <button 
                type="button" 
                className="qi-modal-close-btn" 
                onClick={() => setActiveFundForDetails(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="qi-modal-body">
              {/* NAV Highlight Grid */}
              <div className="qi-nav-highlight-grid">
                <div className="qi-stat-box">
                  <span className="stat-label">Latest Published NAV</span>
                  <div className="stat-value">
                    {isLoadingSchemeData ? (
                      <span className="loading-dots">Fetching...</span>
                    ) : (
                      `₹${Number(modalSchemeData?.nav || activeFundForDetails.defaultNav).toFixed(2)}`
                    )}
                  </div>
                  <span className="stat-date">Date: {modalSchemeData?.navDate || activeFundForDetails.defaultNavDate}</span>
                </div>

                <div className="qi-stat-box">
                  <span className="stat-label">1-Year CAGR Return</span>
                  <div className="stat-value text-emerald">
                    +{modalSchemeData?.returns?.return1Y || activeFundForDetails.defaultReturns.return1Y}%
                  </div>
                  <span className="stat-date">Historical Growth</span>
                </div>

                <div className="qi-stat-box">
                  <span className="stat-label">3-Year CAGR Return</span>
                  <div className="stat-value text-emerald">
                    +{modalSchemeData?.returns?.return3Y || activeFundForDetails.defaultReturns.return3Y}%
                  </div>
                  <span className="stat-date">Compounded Annual</span>
                </div>

                <div className="qi-stat-box">
                  <span className="stat-label">5-Year CAGR Return</span>
                  <div className="stat-value text-emerald">
                    +{modalSchemeData?.returns?.return5Y || activeFundForDetails.defaultReturns.return5Y}%
                  </div>
                  <span className="stat-date">Long-term Compounding</span>
                </div>
              </div>

              {/* Scheme Description */}
              <div className="qi-info-section">
                <h4 className="section-heading">Scheme Strategy &amp; Objective</h4>
                <p className="qi-desc-text">{activeFundForDetails.description}</p>
              </div>

              {/* Specification Table */}
              <div className="qi-info-section">
                <h4 className="section-heading">Fund Specifications</h4>
                <div className="qi-spec-table">
                  <div className="qi-spec-row">
                    <span className="spec-name">Fund House</span>
                    <span className="spec-val">{modalSchemeData?.fundHouse || activeFundForDetails.fundHouse}</span>
                  </div>
                  <div className="qi-spec-row">
                    <span className="spec-name">Benchmark</span>
                    <span className="spec-val">{activeFundForDetails.benchmark}</span>
                  </div>
                  <div className="qi-spec-row">
                    <span className="spec-name">Minimum Monthly SIP</span>
                    <span className="spec-val">{formatINR(activeFundForDetails.minSip)}</span>
                  </div>
                  <div className="qi-spec-row">
                    <span className="spec-name">Minimum Lumpsum</span>
                    <span className="spec-val">{formatINR(activeFundForDetails.minLumpsum)}</span>
                  </div>
                  <div className="qi-spec-row">
                    <span className="spec-name">Exit Load</span>
                    <span className="spec-val">{activeFundForDetails.exitLoad}</span>
                  </div>
                </div>
              </div>

              <div className="qi-disclaimer-note">
                <Info size={16} className="note-icon" />
                <span>Figures displayed are derived from official AMFI NAV disclosures and historical records. Data is for illustrative education and not an investment solicitation.</span>
              </div>
            </div>

            <div className="qi-modal-footer">
              <button
                type="button"
                className="btn-qi-modal-cancel"
                onClick={() => setActiveFundForDetails(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn-qi-invest"
                onClick={() => {
                  const f = activeFundForDetails;
                  setActiveFundForDetails(null);
                  handleOpenInvest(f);
                }}
              >
                Proceed to Invest <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. INVEST NOW MODAL (Official Partner & Demo Flow) */}
      {/* ======================================================== */}
      {activeFundForInvest && (
        <div className="qi-modal-backdrop" onClick={() => setActiveFundForInvest(null)}>
          <div className="qi-modal-content invest-modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="qi-modal-header">
              <div>
                <span className="qi-demo-pill">Investment Portal Gateway</span>
                <h3 className="qi-modal-title">Invest in {activeFundForInvest.shortName || activeFundForInvest.name}</h3>
                <span className="qi-modal-category">{activeFundForInvest.category}</span>
              </div>
              <button 
                type="button" 
                className="qi-modal-close-btn" 
                onClick={() => setActiveFundForInvest(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="qi-modal-body">
              
              {/* Option 1: Official Verified Execution Partner */}
              <div className="qi-partner-gateway-box">
                <div className="gateway-header">
                  <div className="gateway-title-row">
                    <span className="gateway-badge">Official Verified Gateway</span>
                    <h4>Execute Direct Investment via Angel One</h4>
                  </div>
                  <p>Wealth Acumen is an official AMFI Registered Distributor and Channel Partner with Angel One. Invest seamlessly with zero account opening fee.</p>
                </div>

                <div className="gateway-action-buttons">
                  <a
                    href="https://angel-one.onelink.me/Wjgr/h9fay40r"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gateway-primary"
                  >
                    <Smartphone size={18} />
                    <span>Open Angel One Trading / Demat Login</span>
                    <ExternalLink size={16} />
                  </a>

                  <a
                    href="https://angel-one.onelink.me/Wjgr/wcqvcyi6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gateway-secondary"
                  >
                    <Layers size={18} />
                    <span>Access Demat-Free Mutual Fund Portal</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Divider */}
              <div className="qi-modal-divider">
                <span>OR PLAN AN ORDER WITH ADVISORY DESK</span>
              </div>

              {/* Option 2: Interactive Mandate Demo / Request Callback Flow */}
              {!isDemoSubmitted ? (
                <form className="qi-demo-form" onSubmit={handleDemoSubmit}>
                  <div className="demo-notice-badge">
                    <Info size={15} />
                    <span>Demonstration Mandate Flow — Plan order details for assisted onboarding.</span>
                  </div>

                  {/* Mode Selector */}
                  <div className="form-group-item">
                    <label className="form-label">Select Investment Frequency</label>
                    <div className="mode-toggle-group">
                      <button
                        type="button"
                        className={`mode-btn ${investmentMode === 'SIP' ? 'active' : ''}`}
                        onClick={() => setInvestmentMode('SIP')}
                      >
                        <Clock size={16} />
                        <span>Monthly Systematic Investment Plan (SIP)</span>
                      </button>
                      <button
                        type="button"
                        className={`mode-btn ${investmentMode === 'LUMPSUM' ? 'active' : ''}`}
                        onClick={() => setInvestmentMode('LUMPSUM')}
                      >
                        <TrendingUp size={16} />
                        <span>One-Time Lumpsum Investment</span>
                      </button>
                    </div>
                  </div>

                  {/* Investment Amount Input */}
                  <div className="form-group-item">
                    <div className="label-with-limits">
                      <label className="form-label">Investment Amount (₹)</label>
                      <span className="limit-hint">
                        Min: {formatINR(investmentMode === 'SIP' ? activeFundForInvest.minSip : activeFundForInvest.minLumpsum)}
                      </span>
                    </div>

                    <div className="amount-input-wrap">
                      <span className="currency-prefix">₹</span>
                      <input
                        type="number"
                        className="amount-input-box"
                        value={investAmount}
                        onChange={(e) => setInvestAmount(Math.max(100, Number(e.target.value) || 0))}
                        min={investmentMode === 'SIP' ? activeFundForInvest.minSip : activeFundForInvest.minLumpsum}
                        step={500}
                        required
                      />
                    </div>

                    {/* Quick amount chips */}
                    <div className="quick-amount-chips">
                      {[1000, 2500, 5000, 10000, 25000].map(amt => (
                        <button
                          key={amt}
                          type="button"
                          className={`chip-btn ${investAmount === amt ? 'active' : ''}`}
                          onClick={() => setInvestAmount(amt)}
                        >
                          ₹{amt.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SIP Deduction Date (if SIP) */}
                  {investmentMode === 'SIP' && (
                    <div className="form-group-item">
                      <label className="form-label">Preferred Monthly Deduction Date</label>
                      <div className="dates-pill-group">
                        {[5, 10, 15, 20, 25].map(d => (
                          <button
                            key={d}
                            type="button"
                            className={`date-chip ${sipDate === d ? 'active' : ''}`}
                            onClick={() => setSipDate(d)}
                          >
                            {d}th of month
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button type="submit" className="btn-generate-mandate">
                    Review Order Plan &amp; Request Assisted Onboarding
                  </button>
                </form>
              ) : (
                <div className="qi-demo-success-box">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={42} className="text-emerald" />
                  </div>
                  <h4>Investment Plan Summary Generated</h4>
                  <p className="success-scheme-name">{activeFundForInvest.name}</p>

                  <div className="summary-details-card">
                    <div className="summary-row">
                      <span>Investment Type:</span>
                      <strong>{investmentMode === 'SIP' ? 'Monthly Systematic Investment (SIP)' : 'One-Time Lumpsum'}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Planned Amount:</span>
                      <strong>{formatINR(investAmount)}</strong>
                    </div>
                    {investmentMode === 'SIP' && (
                      <div className="summary-row">
                        <span>SIP Auto-Debit Date:</span>
                        <strong>{sipDate}th of each month</strong>
                      </div>
                    )}
                    <div className="summary-row">
                      <span>Category:</span>
                      <strong>{activeFundForInvest.category}</strong>
                    </div>
                  </div>

                  <div className="advisory-assist-banner">
                    <p>
                      Our advisory desk has captured your planned allocation. An AMFI-registered representative will contact you to assist with KYC verification and paperless mandate setup.
                    </p>
                    <div className="assist-buttons">
                      <a href="https://wa.me/919325227357" target="_blank" rel="noopener noreferrer" className="btn-wa-confirm">
                        Chat on WhatsApp (+91 9325227357)
                      </a>
                      <Link to="/contact" className="btn-advisory-contact" onClick={() => setActiveFundForInvest(null)}>
                        Book Scheduled Consultation
                      </Link>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="qi-modal-footer">
              <button
                type="button"
                className="btn-qi-modal-cancel"
                onClick={() => setActiveFundForInvest(null)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default QuickInvest;
