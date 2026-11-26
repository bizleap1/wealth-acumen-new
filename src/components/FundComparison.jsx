import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Info, 
  BarChart3 
} from 'lucide-react';
import MutualFundSearch from './MutualFundSearch';
import { 
  detectPlanType, 
  detectOptionType, 
  formatDisplayDate, 
  calculateHistoricalReturns 
} from '../utils/fundCalculations';
import { getHistoricalNAV } from '../services/mutualFundApi';
import './FundComparison.css';

const FundComparison = ({ comparisonList = [], onRemoveScheme, onAddScheme }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [schemeDetails, setSchemeDetails] = useState({});

  // Load detailed historical returns for schemes in comparison list if not loaded
  React.useEffect(() => {
    comparisonList.forEach(async (scheme) => {
      const code = scheme.schemeCode;
      if (!schemeDetails[code]) {
        try {
          const history = await getHistoricalNAV(code);
          const returns = calculateHistoricalReturns(history.records);
          setSchemeDetails(prev => ({
            ...prev,
            [code]: {
              ...history.meta,
              schemeName: history.meta.schemeName,
              scheme_name: history.meta.schemeName,
              fundHouse: history.meta.fundHouse,
              fund_house: history.meta.fundHouse,
              schemeCategory: history.meta.schemeCategory,
              scheme_category: history.meta.schemeCategory,
              latestNav: history.latestNav,
              latestDate: history.latestDate,
              records: history.records,
              returns,
            },
          }));
        } catch (err) {
          console.error(`Error loading comparison data for ${code}:`, err);
        }
      }
    });
  }, [comparisonList, schemeDetails]);

  const handleSelectSchemeToAdd = async (scheme) => {
    if (comparisonList.length >= 3) return;
    if (comparisonList.some(s => s.schemeCode === scheme.schemeCode)) return;

    onAddScheme(scheme);
    setIsAdding(false);
  };

  const getMetricRow = (label, getter, isHighlight = false) => {
    return (
      <tr className={`comparison-tr ${isHighlight ? 'highlight-row' : ''}`}>
        <td className="param-label-cell">{label}</td>
        {comparisonList.map(scheme => {
          const details = schemeDetails[scheme.schemeCode];
          const val = details ? getter(details, scheme) : 'Loading...';
          return (
            <td key={scheme.schemeCode} className="param-value-cell">
              {val}
            </td>
          );
        })}
        {/* Placeholder cells if fewer than 3 funds selected */}
        {comparisonList.length < 3 && (
          <td className="param-value-cell placeholder-cell" colSpan={3 - comparisonList.length}>
            —
          </td>
        )}
      </tr>
    );
  };

  return (
    <div className="fund-comparison-section">
      {/* Header and Add Fund Bar */}
      <div className="comparison-controls-card">
        <div className="controls-left">
          <h3 className="section-title">Mutual Fund Side-by-Side Comparison</h3>
          <p className="section-subtitle">
            Compare up to three mutual fund schemes across NAV, plan type, option, and 1Y / 3Y / 5Y historical CAGR.
          </p>
        </div>

        <div className="controls-right">
          {comparisonList.length < 3 && !isAdding && (
            <button
              type="button"
              className="btn-add-comparison"
              onClick={() => setIsAdding(true)}
            >
              <Plus size={16} />
              <span>Add Scheme ({comparisonList.length}/3)</span>
            </button>
          )}
        </div>
      </div>

      {/* Add Scheme Search Drawer */}
      {isAdding && (
        <div className="add-scheme-inline-box">
          <div className="box-header">
            <h4>Search and Add Scheme to Comparison (Slot {comparisonList.length + 1} of 3)</h4>
            <button type="button" className="close-inline-btn" onClick={() => setIsAdding(false)}>
              <X size={16} />
            </button>
          </div>
          <MutualFundSearch
            onSelectScheme={handleSelectSchemeToAdd}
            placeholder="Type fund name (e.g., SBI Bluechip, Axis Small Cap, Parag Parikh)..."
          />
        </div>
      )}

      {/* Selected Schemes Pills */}
      <div className="selected-schemes-chips-row">
        {comparisonList.map((scheme, idx) => (
          <div key={scheme.schemeCode} className="comparison-scheme-chip">
            <span className="chip-slot-num">{idx + 1}</span>
            <span className="chip-name">{scheme.schemeName}</span>
            <button
              type="button"
              className="chip-remove-btn"
              onClick={() => onRemoveScheme(scheme.schemeCode)}
              title="Remove from comparison"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {comparisonList.length === 0 && (
          <div className="no-schemes-notice">
            <Info size={16} />
            <span>No funds selected for comparison yet. Click &quot;Add Scheme&quot; or select &quot;Add to Compare&quot; from the Explore tab.</span>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      {comparisonList.length > 0 && (
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="table-header-param">Parameters</th>
                {comparisonList.map((scheme, idx) => (
                  <th key={scheme.schemeCode} className="table-header-fund">
                    <div className="fund-header-content">
                      <span className="fund-slot-badge">Fund #{idx + 1}</span>
                      <h4 className="fund-th-title">{scheme.schemeName}</h4>
                      <button
                        type="button"
                        className="th-remove-btn"
                        onClick={() => onRemoveScheme(scheme.schemeCode)}
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
                {comparisonList.length < 3 && (
                  <th className="table-header-empty" colSpan={3 - comparisonList.length}>
                    <div className="empty-slot-content">
                      <button
                        type="button"
                        className="empty-slot-add-btn"
                        onClick={() => setIsAdding(true)}
                      >
                        <Plus size={20} />
                        <span>Add Fund to Compare</span>
                      </button>
                    </div>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {/* Core Scheme Identifiers */}
              <tr className="section-divider-row">
                <td colSpan={4}>FUND CLASSIFICATION & DETAILS</td>
              </tr>

              {getMetricRow('Fund House', (d) => d.fundHouse || d.fund_house || 'Not Specified')}
              {getMetricRow('Scheme Category', (d) => d.schemeCategory || d.scheme_category || 'Equity / Growth')}
              {getMetricRow('Plan Type', (d, s) => detectPlanType(s.schemeName || s.scheme_name))}
              {getMetricRow('Investment Option', (d, s) => detectOptionType(s.schemeName || s.scheme_name))}
              {getMetricRow('Scheme Code', (_, s) => s.schemeCode)}

              {/* NAV & Valuation */}
              <tr className="section-divider-row">
                <td colSpan={4}>LATEST NAV & VALUATION</td>
              </tr>

              {getMetricRow(
                'Latest NAV',
                (d) => (d.latestNav ? `₹${Number(d.latestNav).toFixed(4)}` : 'N/A'),
                true
              )}
              {getMetricRow('NAV Date', (d) => (d.latestDate ? formatDisplayDate(d.latestDate) : 'N/A'))}

              {/* Historical Performance */}
              <tr className="section-divider-row">
                <td colSpan={4}>HISTORICAL PERFORMANCE & CAGR</td>
              </tr>

              {getMetricRow(
                '1-Year Return',
                (d) => {
                  const ret = d.returns?.return1Y;
                  if (ret === null || ret === undefined) return 'Data Not Available';
                  return (
                    <span className={`perf-badge ${ret >= 0 ? 'positive' : 'negative'}`}>
                      {ret >= 0 ? `+${ret}%` : `${ret}%`}
                    </span>
                  );
                },
                true
              )}

              {getMetricRow(
                '3-Year CAGR',
                (d) => {
                  const ret = d.returns?.return3Y;
                  if (ret === null || ret === undefined) return 'Data Not Available';
                  return (
                    <span className={`perf-badge ${ret >= 0 ? 'positive' : 'negative'}`}>
                      {ret >= 0 ? `+${ret}% p.a.` : `${ret}% p.a.`}
                    </span>
                  );
                },
                true
              )}

              {getMetricRow(
                '5-Year CAGR',
                (d) => {
                  const ret = d.returns?.return5Y;
                  if (ret === null || ret === undefined) return 'Data Not Available';
                  return (
                    <span className={`perf-badge ${ret >= 0 ? 'positive' : 'negative'}`}>
                      {ret >= 0 ? `+${ret}% p.a.` : `${ret}% p.a.`}
                    </span>
                  );
                },
                true
              )}

              {/* Extended Metrics Notice */}
              <tr className="section-divider-row">
                <td colSpan={4}>SUPPLEMENTARY AMC METRICS</td>
              </tr>

              {getMetricRow('Expense Ratio (TER)', () => 'Data Not Available')}
              {getMetricRow('AUM (Assets Under Management)', () => 'Data Not Available')}
              {getMetricRow('SEBI Riskometer', () => 'Data Not Available')}
              {getMetricRow('Benchmark Index', () => 'Data Not Available')}
              {getMetricRow('Fund Manager', () => 'Data Not Available')}
            </tbody>
          </table>
        </div>
      )}

      {/* Comparative Visual Return Bars */}
      {comparisonList.length >= 2 && (
        <div className="comparison-chart-card">
          <div className="chart-card-header">
            <BarChart3 size={18} className="chart-header-icon" />
            <div className="chart-header-text">
              <h4>Historical Returns Comparison</h4>
              <p>Comparative performance side by side based on actual historical NAV computations.</p>
            </div>
          </div>

          <div className="comparative-bars-container">
            {['1Y', '3Y', '5Y'].map(period => (
              <div key={period} className="period-comparison-group">
                <div className="period-label-badge">{period} Return</div>
                <div className="fund-bars-row">
                  {comparisonList.map((scheme, idx) => {
                    const details = schemeDetails[scheme.schemeCode];
                    const ret = period === '1Y' 
                      ? details?.returns?.return1Y 
                      : period === '3Y' 
                      ? details?.returns?.return3Y 
                      : details?.returns?.return5Y;

                    const colorList = ['#2563eb', '#10b981', '#f59e0b'];
                    const barColor = colorList[idx % colorList.length];

                    const displayVal = ret !== null && ret !== undefined ? `${ret}%` : 'N/A';
                    const barHeight = ret ? Math.min(Math.max(Math.abs(ret) * 3, 20), 160) : 10;

                    return (
                      <div key={scheme.schemeCode} className="fund-bar-col">
                        <div className="bar-value-label">{displayVal}</div>
                        <div 
                          className="bar-pillar"
                          style={{
                            height: `${barHeight}px`,
                            backgroundColor: barColor,
                          }}
                        />
                        <div className="bar-fund-code">#{idx + 1}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="comparison-disclaimer-note">
            <Info size={14} />
            <span>
              Returns computed from actual daily NAV records published by AMCs via MFAPI. Historical performance is not indicative of future returns.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundComparison;
