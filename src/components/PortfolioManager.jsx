import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Save, 
  X, 
  AlertCircle,
  Filter
} from 'lucide-react';
import { 
  ASSET_CATEGORIES, 
  ASSET_COLORS, 
  calculatePortfolioSummary 
} from '../utils/portfolioCalculations';
import { formatINR } from '../utils/fundCalculations';
import MutualFundSearch from './MutualFundSearch';
import { getLatestNAV } from '../services/mutualFundApi';
import './PortfolioManager.css';

const PortfolioManager = ({ investments = [], onUpdateInvestments }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Form State
  const [formData, setFormData] = useState({
    schemeName: '',
    schemeCode: '',
    fundHouse: '',
    fundCategory: 'Equity - Large Cap',
    assetCategory: 'Equity',
    investmentAmount: '',
    unitsHeld: '',
    latestNav: '',
    currentMarketValue: '',
  });

  const [formError, setFormError] = useState('');

  // Calculations
  const summary = useMemo(() => {
    return calculatePortfolioSummary(investments);
  }, [investments]);

  // Filtered investments list
  const filteredInvestments = useMemo(() => {
    if (!Array.isArray(investments)) return [];
    const search = (searchFilter || '').trim().toLowerCase();

    return investments.filter(inv => {
      if (!inv) return false;
      const sName = (inv.schemeName || inv.scheme_name || '').toLowerCase();
      const fHouse = (inv.fundHouse || inv.fund_house || '').toLowerCase();
      const matchSearch = !search || sName.includes(search) || fHouse.includes(search);
      const matchCat = categoryFilter === 'ALL' || inv.assetCategory === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [investments, searchFilter, categoryFilter]);

  // Handle scheme selected from autocomplete in form
  const handleSchemeSelect = async (scheme) => {
    try {
      const latest = await getLatestNAV(scheme.schemeCode);
      setFormData(prev => ({
        ...prev,
        schemeName: latest.schemeName || scheme.schemeName,
        schemeCode: String(latest.schemeCode || scheme.schemeCode),
        fundHouse: latest.fundHouse || '',
        fundCategory: latest.schemeCategory || 'Equity',
        latestNav: latest.latestNav ? String(latest.latestNav) : '',
        currentMarketValue: prev.unitsHeld && latest.latestNav
          ? String(Math.round(Number(prev.unitsHeld) * latest.latestNav))
          : prev.currentMarketValue,
      }));
    } catch {
      setFormData(prev => ({
        ...prev,
        schemeName: scheme.schemeName,
        schemeCode: String(scheme.schemeCode),
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };

      // Auto-compute current value if units and latestNav exist
      if (name === 'unitsHeld' || name === 'latestNav') {
        const u = parseFloat(name === 'unitsHeld' ? value : prev.unitsHeld);
        const nav = parseFloat(name === 'latestNav' ? value : prev.latestNav);
        if (!isNaN(u) && !isNaN(nav) && u > 0 && nav > 0) {
          updated.currentMarketValue = String(Math.round(u * nav));
        }
      }
      return updated;
    });
  };

  const resetForm = () => {
    setFormData({
      schemeName: '',
      schemeCode: '',
      fundHouse: '',
      fundCategory: 'Equity - Large Cap',
      assetCategory: 'Equity',
      investmentAmount: '',
      unitsHeld: '',
      latestNav: '',
      currentMarketValue: '',
    });
    setFormError('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleOpenEdit = (inv) => {
    setFormData({
      schemeName: inv.schemeName,
      schemeCode: String(inv.schemeCode || ''),
      fundHouse: inv.fundHouse || '',
      fundCategory: inv.fundCategory || 'Equity',
      assetCategory: inv.assetCategory || 'Equity',
      investmentAmount: String(inv.investmentAmount),
      unitsHeld: String(inv.unitsHeld || ''),
      latestNav: String(inv.latestNav || ''),
      currentMarketValue: String(inv.currentMarketValue),
    });
    setEditingId(inv.id);
    setIsAdding(true);
  };

  const handleSaveInvestment = (e) => {
    e.preventDefault();
    if (!formData.schemeName.trim()) {
      setFormError('Please enter the scheme name or select from search.');
      return;
    }
    const invested = parseFloat(formData.investmentAmount);
    const marketVal = parseFloat(formData.currentMarketValue);

    if (isNaN(invested) || invested <= 0) {
      setFormError('Please enter a valid investment amount greater than zero.');
      return;
    }
    if (isNaN(marketVal) || marketVal < 0) {
      setFormError('Please enter a valid current market value or provide units & NAV.');
      return;
    }

    const payload = {
      id: editingId || `inv-${Date.now()}`,
      schemeName: formData.schemeName.trim(),
      schemeCode: formData.schemeCode ? Number(formData.schemeCode) : null,
      fundHouse: formData.fundHouse.trim(),
      fundCategory: formData.fundCategory,
      assetCategory: formData.assetCategory,
      investmentAmount: invested,
      unitsHeld: parseFloat(formData.unitsHeld) || 0,
      latestNav: parseFloat(formData.latestNav) || 0,
      currentMarketValue: marketVal,
    };

    if (editingId) {
      const updatedList = investments.map(i => (i.id === editingId ? payload : i));
      onUpdateInvestments(updatedList);
    } else {
      onUpdateInvestments([...investments, payload]);
    }

    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this investment from your portfolio?')) {
      const updated = investments.filter(i => i.id !== id);
      onUpdateInvestments(updated);
    }
  };

  // SVG Donut Chart Calculation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  const donutSlices = ASSET_CATEGORIES.map(category => {
    const pct = summary.categoryPercentages[category] || 0;
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

  return (
    <div className="portfolio-manager-section">
      {/* Top Metrics Banner */}
      <div className="portfolio-summary-banner">
        <div className="summary-metric-card">
          <span className="metric-title">Total Invested</span>
          <span className="metric-number">{formatINR(summary.totalInvested)}</span>
          <span className="metric-caption">{investments.length} Holdings</span>
        </div>

        <div className="summary-metric-card primary-card">
          <span className="metric-title">Current Portfolio Value</span>
          <span className="metric-number">{formatINR(summary.currentValue)}</span>
          <span className="metric-caption">Market Valuation</span>
        </div>

        <div className={`summary-metric-card ${summary.totalProfitLoss >= 0 ? 'profit-card' : 'loss-card'}`}>
          <span className="metric-title">Total Profit / Loss</span>
          <span className="metric-number">
            {summary.totalProfitLoss >= 0 ? '+' : ''}{formatINR(summary.totalProfitLoss)}
          </span>
          <span className="metric-caption">Unrealized P&amp;L</span>
        </div>

        <div className={`summary-metric-card ${summary.overallReturnPct >= 0 ? 'profit-card' : 'loss-card'}`}>
          <span className="metric-title">Overall Return (%)</span>
          <span className="metric-number">
            {summary.overallReturnPct >= 0 ? '+' : ''}{summary.overallReturnPct}%
          </span>
          <span className="metric-caption">Absolute Growth</span>
        </div>
      </div>

      {/* Two Column Layout: Allocation Donut & Holdings Table */}
      <div className="portfolio-main-grid">
        {/* Left Column: Asset Allocation Donut */}
        <div className="portfolio-chart-card">
          <div className="card-header-row">
            <h4 className="card-title">Portfolio Asset Allocation</h4>
          </div>

          <div className="donut-chart-box">
            <svg viewBox="0 0 160 160" className="allocation-donut-svg">
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke="#f1f5f9"
                strokeWidth="18"
              />
              {summary.currentValue > 0 && donutSlices.map(slice => {
                if (slice.pct <= 0) return null;
                return (
                  <circle
                    key={slice.category}
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth="18"
                    strokeDasharray={`${slice.strokeLength} ${circumference - slice.strokeLength}`}
                    strokeDashoffset={slice.offset}
                    transform="rotate(-90 80 80)"
                  />
                );
              })}
              <text x="80" y="76" textAnchor="middle" className="donut-center-total">
                {formatINR(summary.currentValue)}
              </text>
              <text x="80" y="94" textAnchor="middle" className="donut-center-label">
                Total Portfolio
              </text>
            </svg>
          </div>

          {/* Legend Table */}
          <div className="allocation-legend-list">
            {ASSET_CATEGORIES.map(category => {
              const val = summary.categoryValues[category] || 0;
              const pct = summary.categoryPercentages[category] || 0;
              return (
                <div key={category} className="legend-row-item">
                  <div className="legend-name-group">
                    <span className="legend-dot" style={{ backgroundColor: ASSET_COLORS[category] }} />
                    <span className="legend-name">{category}</span>
                  </div>
                  <div className="legend-val-group">
                    <span className="legend-val">{formatINR(val)}</span>
                    <span className="legend-pct">({pct}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Holdings Manager & Table */}
        <div className="portfolio-holdings-card">
          <div className="holdings-header-row">
            <div className="header-titles">
              <h4 className="card-title">My Investments</h4>
              <p className="card-subtitle">Manage mutual fund holdings and track valuations.</p>
            </div>

            <button
              type="button"
              className="btn-add-investment"
              onClick={handleOpenAdd}
            >
              <Plus size={16} />
              <span>Add Investment</span>
            </button>
          </div>

          {/* Add / Edit Form Drawer */}
          {isAdding && (
            <div className="investment-form-drawer">
              <div className="form-drawer-header">
                <h5>{editingId ? 'Edit Investment' : 'Add New Mutual Fund Investment'}</h5>
                <button type="button" className="drawer-close-btn" onClick={resetForm}>
                  <X size={16} />
                </button>
              </div>

              {/* Quick Search Helper for fast scheme lookup */}
              {!editingId && (
                <div className="form-search-helper">
                  <label className="helper-label">Quick Search Scheme:</label>
                  <MutualFundSearch onSelectScheme={handleSchemeSelect} />
                </div>
              )}

              <form onSubmit={handleSaveInvestment} className="investment-edit-form">
                {formError && (
                  <div className="form-error-banner">
                    <AlertCircle size={15} />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group flex-2">
                    <label>Scheme Name *</label>
                    <input
                      type="text"
                      name="schemeName"
                      value={formData.schemeName}
                      onChange={handleInputChange}
                      placeholder="e.g. HDFC Top 100 Fund - Growth"
                      required
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label>Scheme Code</label>
                    <input
                      type="text"
                      name="schemeCode"
                      value={formData.schemeCode}
                      onChange={handleInputChange}
                      placeholder="e.g. 118989"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label>Asset Category *</label>
                    <select
                      name="assetCategory"
                      value={formData.assetCategory}
                      onChange={handleInputChange}
                    >
                      {ASSET_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group flex-1">
                    <label>Fund House</label>
                    <input
                      type="text"
                      name="fundHouse"
                      value={formData.fundHouse}
                      onChange={handleInputChange}
                      placeholder="e.g. HDFC Mutual Fund"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label>Investment Amount (₹) *</label>
                    <input
                      type="number"
                      name="investmentAmount"
                      value={formData.investmentAmount}
                      onChange={handleInputChange}
                      placeholder="e.g. 100000"
                      min="1"
                      step="any"
                      required
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label>Units Held</label>
                    <input
                      type="number"
                      name="unitsHeld"
                      value={formData.unitsHeld}
                      onChange={handleInputChange}
                      placeholder="e.g. 125.4"
                      step="any"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label>Latest NAV (₹)</label>
                    <input
                      type="number"
                      name="latestNav"
                      value={formData.latestNav}
                      onChange={handleInputChange}
                      placeholder="e.g. 845.20"
                      step="any"
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label>Current Market Value (₹) *</label>
                    <input
                      type="number"
                      name="currentMarketValue"
                      value={formData.currentMarketValue}
                      onChange={handleInputChange}
                      placeholder="e.g. 112000"
                      min="0"
                      step="any"
                      required
                    />
                  </div>
                </div>

                <div className="form-actions-row">
                  <button type="button" className="btn-cancel" onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-save-investment">
                    <Save size={16} />
                    <span>{editingId ? 'Update Investment' : 'Save Investment'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search & Category Filter Toolbar */}
          <div className="holdings-toolbar">
            <div className="toolbar-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search holdings..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>

            <div className="toolbar-category-filter">
              <span className="filter-label"><Filter size={14} /> Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="ALL">All Categories</option>
                {ASSET_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Holdings Table */}
          <div className="holdings-table-container">
            <table className="holdings-table">
              <thead>
                <tr>
                  <th>Scheme &amp; Category</th>
                  <th>Invested</th>
                  <th>Current Value</th>
                  <th>Profit / Loss</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvestments.map(inv => {
                  const invested = Number(inv.investmentAmount) || 0;
                  const currentVal = Number(inv.currentMarketValue) || 0;
                  const pnl = currentVal - invested;
                  const pnlPct = invested > 0 ? ((pnl / invested) * 100).toFixed(1) : '0';
                  const isPositive = pnl >= 0;

                  return (
                    <tr key={inv.id}>
                      <td className="scheme-cell">
                        <div className="holding-scheme-name">{inv.schemeName}</div>
                        <div className="holding-tags-row">
                          <span
                            className="cat-badge"
                            style={{
                              backgroundColor: `${ASSET_COLORS[inv.assetCategory] || '#64748b'}18`,
                              color: ASSET_COLORS[inv.assetCategory] || '#64748b',
                            }}
                          >
                            {inv.assetCategory}
                          </span>
                          {inv.schemeCode && (
                            <span className="code-tag">Code: {inv.schemeCode}</span>
                          )}
                        </div>
                      </td>
                      <td className="val-cell">{formatINR(invested)}</td>
                      <td className="val-cell bold-val">{formatINR(currentVal)}</td>
                      <td className={`pnl-cell ${isPositive ? 'positive' : 'negative'}`}>
                        <span className="pnl-amount">{isPositive ? '+' : ''}{formatINR(pnl)}</span>
                        <span className="pnl-percent">({isPositive ? '+' : ''}{pnlPct}%)</span>
                      </td>
                      <td className="actions-cell">
                        <button
                          type="button"
                          className="action-icon-btn edit-btn"
                          onClick={() => handleOpenEdit(inv)}
                          title="Edit investment"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          type="button"
                          className="action-icon-btn delete-btn"
                          onClick={() => handleDelete(inv.id)}
                          title="Delete investment"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredInvestments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="no-holdings-cell">
                      No mutual fund investments found. Click &quot;Add Investment&quot; to add your first holding.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManager;
