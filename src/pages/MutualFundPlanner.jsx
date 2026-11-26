import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../components/PageHeader';
import MutualFundSearch from '../components/MutualFundSearch';
import NAVHistoryChart from '../components/NAVHistoryChart';
import FundComparison from '../components/FundComparison';
import PortfolioManager from '../components/PortfolioManager';
import PortfolioRebalancer from '../components/PortfolioRebalancer';
import { 
  getHistoricalNAV, 
  invalidateSchemeCache 
} from '../services/mutualFundApi';
import { 
  detectPlanType, 
  detectOptionType, 
  formatDisplayDate, 
  calculateHistoricalReturns
} from '../utils/fundCalculations';
import { 
  loadPortfolioInvestments, 
  savePortfolioInvestments,
  loadTargetAllocation,
  saveTargetAllocation
} from '../utils/portfolioCalculations';
import { 
  Compass, 
  Layers, 
  Briefcase, 
  Scale, 
  RotateCcw, 
  Plus, 
  Check, 
  AlertCircle
} from 'lucide-react';
import './MutualFundPlanner.css';

// Default scheme to display initially: HDFC Top 100 Fund - Growth
const DEFAULT_SCHEME_CODE = 100122;

const MutualFundPlanner = () => {
  const [activeTab, setActiveTab] = useState('EXPLORE'); // 'EXPLORE' | 'COMPARE' | 'PORTFOLIO' | 'REBALANCE'

  // Current scheme state for Explorer tab
  const [selectedSchemeCode, setSelectedSchemeCode] = useState(DEFAULT_SCHEME_CODE);
  const [schemeData, setSchemeData] = useState(null);
  const [isLoadingScheme, setIsLoadingScheme] = useState(true);
  const [schemeError, setSchemeError] = useState(null);
  const [isRefreshingNav, setIsRefreshingNav] = useState(false);

  // Comparison schemes list (up to 3)
  const [comparisonList, setComparisonList] = useState([
    { schemeCode: 100122, schemeName: 'HDFC Balanced Fund - Growth Option' },
  ]);

  // Portfolio investments and target allocations
  const [investments, setInvestments] = useState(loadPortfolioInvestments);
  const [targetAllocation, setTargetAllocation] = useState(loadTargetAllocation);

  // Load scheme data when selectedSchemeCode changes
  const loadSchemeData = useCallback(async (code, forceRefresh = false) => {
    if (!code) return;
    try {
      if (forceRefresh) {
        setIsRefreshingNav(true);
        invalidateSchemeCache(code);
      } else {
        setIsLoadingScheme(true);
      }
      setSchemeError(null);

      const history = await getHistoricalNAV(code);
      const returns = calculateHistoricalReturns(history.records);

      setSchemeData({
        ...history.meta,
        schemeName: history.meta.schemeName,
        scheme_name: history.meta.schemeName,
        fundHouse: history.meta.fundHouse,
        fund_house: history.meta.fundHouse,
        schemeCategory: history.meta.schemeCategory,
        scheme_category: history.meta.schemeCategory,
        schemeType: history.meta.schemeType,
        scheme_type: history.meta.schemeType,
        latestNav: history.latestNav,
        latestDate: history.latestDate,
        records: history.records,
        returns,
      });
    } catch (err) {
      console.error('Error loading mutual fund data:', err);
      setSchemeError('Unable to load fund records. Please verify the scheme code or try again.');
    } finally {
      setIsLoadingScheme(false);
      setIsRefreshingNav(false);
    }
  }, []);

  useEffect(() => {
    loadSchemeData(selectedSchemeCode);
  }, [selectedSchemeCode, loadSchemeData]);

  // Search selection handler
  const handleSelectFromSearch = (scheme) => {
    setSelectedSchemeCode(scheme.schemeCode);
  };

  // Add current scheme to comparison
  const handleAddToCompare = () => {
    if (!schemeData) return;
    if (comparisonList.some(s => s.schemeCode === schemeData.schemeCode)) return;
    if (comparisonList.length >= 3) {
      alert('You can compare a maximum of 3 schemes simultaneously. Please remove a scheme before adding another.');
      return;
    }
    const sName = schemeData.schemeName || schemeData.scheme_name || `Scheme ${schemeData.schemeCode}`;
    setComparisonList(prev => [...prev, {
      schemeCode: schemeData.schemeCode,
      schemeName: sName,
    }]);
    setActiveTab('COMPARE');
  };

  // Remove scheme from comparison
  const handleRemoveFromCompare = (code) => {
    setComparisonList(prev => prev.filter(s => s.schemeCode !== code));
  };

  // Add scheme directly to comparison from inside the Compare tab
  const handleAddSchemeToCompare = (scheme) => {
    if (comparisonList.length < 3 && !comparisonList.some(s => s.schemeCode === scheme.schemeCode)) {
      setComparisonList(prev => [...prev, {
        schemeCode: scheme.schemeCode,
        schemeName: scheme.schemeName || scheme.scheme_name || `Scheme ${scheme.schemeCode}`,
      }]);
    }
  };

  // Add current scheme to My Portfolio
  const handleAddToPortfolio = () => {
    if (!schemeData) return;
    const sName = schemeData.schemeName || schemeData.scheme_name || 'Mutual Fund Scheme';
    const fHouse = schemeData.fundHouse || schemeData.fund_house || 'Mutual Fund';
    const fCat = schemeData.schemeCategory || schemeData.scheme_category || 'Equity';

    const newHolding = {
      id: `inv-${Date.now()}`,
      schemeName: sName,
      schemeCode: schemeData.schemeCode,
      fundHouse: fHouse,
      fundCategory: fCat,
      assetCategory: 'Equity',
      investmentAmount: 50000,
      unitsHeld: schemeData.latestNav ? Number((50000 / schemeData.latestNav).toFixed(2)) : 0,
      latestNav: schemeData.latestNav || 0,
      currentMarketValue: 50000,
    };
    const updated = [...investments, newHolding];
    setInvestments(updated);
    savePortfolioInvestments(updated);
    setActiveTab('PORTFOLIO');
  };

  // Update investments from PortfolioManager
  const handleUpdateInvestments = (updatedList) => {
    setInvestments(updatedList);
    savePortfolioInvestments(updatedList);
  };

  // Update target allocation from PortfolioRebalancer
  const handleUpdateTargets = (updatedTargets) => {
    setTargetAllocation(updatedTargets);
    saveTargetAllocation(updatedTargets);
  };

  const isCurrentInComparison = schemeData && comparisonList.some(s => s.schemeCode === schemeData.schemeCode);

  return (
    <div className="mf-planner-page">
      <PageHeader
        titleFirst="Mutual Fund"
        titleLast="Portfolio Planner"
        subtitle="Compare mutual funds, analyse investment performance and optimise your investment portfolio."
      />

      <div className="mf-planner-container">
        {/* Navigation Tabs Bar */}
        <div className="planner-tabs-bar">
          <button
            type="button"
            className={`planner-tab-btn ${activeTab === 'EXPLORE' ? 'active' : ''}`}
            onClick={() => setActiveTab('EXPLORE')}
          >
            <Compass size={18} />
            <span>Explore Mutual Funds</span>
          </button>

          <button
            type="button"
            className={`planner-tab-btn ${activeTab === 'COMPARE' ? 'active' : ''}`}
            onClick={() => setActiveTab('COMPARE')}
          >
            <Layers size={18} />
            <span>Compare Funds</span>
            {comparisonList.length > 0 && (
              <span className="tab-counter-badge">{comparisonList.length}</span>
            )}
          </button>

          <button
            type="button"
            className={`planner-tab-btn ${activeTab === 'PORTFOLIO' ? 'active' : ''}`}
            onClick={() => setActiveTab('PORTFOLIO')}
          >
            <Briefcase size={18} />
            <span>My Portfolio</span>
            <span className="tab-counter-badge">{investments.length}</span>
          </button>

          <button
            type="button"
            className={`planner-tab-btn ${activeTab === 'REBALANCE' ? 'active' : ''}`}
            onClick={() => setActiveTab('REBALANCE')}
          >
            <Scale size={18} />
            <span>Rebalance Portfolio</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: EXPLORE MUTUAL FUNDS */}
        {/* ======================================================== */}
        {activeTab === 'EXPLORE' && (
          <div className="tab-content-view">
            {/* Search Bar Section */}
            <div className="explorer-search-card">
              <div className="search-card-header">
                <h3>Live Mutual Fund Search &amp; NAV Lookup</h3>
                <p>Search over 40,000+ Indian mutual fund schemes powered by official AMFI NAV disclosures.</p>
              </div>
              <MutualFundSearch onSelectScheme={handleSelectFromSearch} />
            </div>

            {/* Scheme Details Card */}
            {isLoadingScheme && (
              <div className="loading-state-card">
                <div className="loading-spinner-ring" />
                <p>Retrieving verified scheme data and historical NAV series...</p>
              </div>
            )}

            {schemeError && !isLoadingScheme && (
              <div className="error-state-card">
                <AlertCircle size={24} className="err-icon" />
                <h4>Unable to Load Scheme Details</h4>
                <p>{schemeError}</p>
                <button type="button" className="retry-btn" onClick={() => loadSchemeData(selectedSchemeCode)}>
                  Try Again
                </button>
              </div>
            )}

            {schemeData && !isLoadingScheme && (
              <div className="scheme-overview-card">
                <div className="scheme-overview-top">
                  <div className="scheme-title-col">
                    <div className="scheme-tags-row">
                      <span className="tag-fund-house">{schemeData.fund_house}</span>
                      <span className="tag-category">{schemeData.scheme_category}</span>
                      <span className="tag-type">{schemeData.scheme_type}</span>
                      <span className="tag-plan">{detectPlanType(schemeData.scheme_name)}</span>
                      <span className="tag-option">{detectOptionType(schemeData.scheme_name)}</span>
                    </div>
                    <h2 className="scheme-name-text">{schemeData.scheme_name}</h2>
                    <span className="scheme-code-text">AMFI Scheme Code: <strong>{schemeData.schemeCode}</strong></span>
                  </div>

                  <div className="scheme-nav-highlight-col">
                    <div className="nav-box">
                      <span className="nav-label">Latest Published NAV</span>
                      <div className="nav-val-row">
                        <span className="nav-big-val">₹{Number(schemeData.latestNav || 0).toFixed(4)}</span>
                        <button
                          type="button"
                          className={`btn-refresh-nav ${isRefreshingNav ? 'spinning' : ''}`}
                          onClick={() => loadSchemeData(selectedSchemeCode, true)}
                          title="Refresh Latest NAV"
                        >
                          <RotateCcw size={15} />
                        </button>
                      </div>
                      <span className="nav-date-text">
                        As of {formatDisplayDate(schemeData.latestDate)}
                      </span>
                    </div>

                    <div className="scheme-quick-actions">
                      <button
                        type="button"
                        className={`action-btn compare-btn ${isCurrentInComparison ? 'added' : ''}`}
                        onClick={handleAddToCompare}
                      >
                        {isCurrentInComparison ? (
                          <>
                            <Check size={15} />
                            <span>In Comparison</span>
                          </>
                        ) : (
                          <>
                            <Plus size={15} />
                            <span>Add to Compare</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        className="action-btn portfolio-btn"
                        onClick={handleAddToPortfolio}
                      >
                        <Plus size={15} />
                        <span>Add to Portfolio</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Key Returns Metric Strip */}
                <div className="scheme-returns-strip">
                  <div className="return-stat-box">
                    <span className="stat-label">1-Year Historical Return</span>
                    <span className={`stat-val ${schemeData.returns?.return1Y >= 0 ? 'pos' : 'neg'}`}>
                      {schemeData.returns?.has1Y ? `${schemeData.returns.return1Y}%` : 'N/A'}
                    </span>
                    <span className="stat-note">Point-to-Point</span>
                  </div>

                  <div className="return-stat-box">
                    <span className="stat-label">3-Year Historical CAGR</span>
                    <span className={`stat-val ${schemeData.returns?.return3Y >= 0 ? 'pos' : 'neg'}`}>
                      {schemeData.returns?.has3Y ? `${schemeData.returns.return3Y}% p.a.` : 'N/A'}
                    </span>
                    <span className="stat-note">Compounded Annual</span>
                  </div>

                  <div className="return-stat-box">
                    <span className="stat-label">5-Year Historical CAGR</span>
                    <span className={`stat-val ${schemeData.returns?.return5Y >= 0 ? 'pos' : 'neg'}`}>
                      {schemeData.returns?.has5Y ? `${schemeData.returns.return5Y}% p.a.` : 'N/A'}
                    </span>
                    <span className="stat-note">Compounded Annual</span>
                  </div>

                  <div className="return-stat-box">
                    <span className="stat-label">Data Range</span>
                    <span className="stat-val neutral-val">
                      {formatDisplayDate(schemeData.returns?.oldestDateStr)}
                    </span>
                    <span className="stat-note">Earliest Available Record</span>
                  </div>
                </div>

                {/* Historical NAV Line Chart */}
                <NAVHistoryChart
                  records={schemeData.records}
                  schemeName={schemeData.scheme_name}
                  latestNav={schemeData.latestNav}
                  latestDate={schemeData.latestDate}
                />
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: COMPARE FUNDS */}
        {/* ======================================================== */}
        {activeTab === 'COMPARE' && (
          <div className="tab-content-view">
            <FundComparison
              comparisonList={comparisonList}
              onRemoveScheme={handleRemoveFromCompare}
              onAddScheme={handleAddSchemeToCompare}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: MY PORTFOLIO */}
        {/* ======================================================== */}
        {activeTab === 'PORTFOLIO' && (
          <div className="tab-content-view">
            <PortfolioManager
              investments={investments}
              onUpdateInvestments={handleUpdateInvestments}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: REBALANCE PORTFOLIO */}
        {/* ======================================================== */}
        {activeTab === 'REBALANCE' && (
          <div className="tab-content-view">
            <PortfolioRebalancer
              investments={investments}
              targetAllocation={targetAllocation}
              onUpdateTargets={handleUpdateTargets}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MutualFundPlanner;
