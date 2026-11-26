/**
 * Wealth Acumen - Portfolio & Rebalancing Calculations
 * Manages manual investments, category allocations, target rebalancing math, and persistence.
 */

export const ASSET_CATEGORIES = ['Equity', 'Debt', 'Hybrid', 'Gold', 'Other'];

export const ASSET_COLORS = {
  Equity: '#2563eb', // Blue
  Debt: '#10b981',   // Emerald
  Hybrid: '#8b5cf6', // Violet
  Gold: '#f59e0b',   // Amber / Gold
  Other: '#64748b',  // Slate
};

const STORAGE_KEY = 'wealth_acumen_my_portfolio_v1';
const TARGET_ALLOCATION_KEY = 'wealth_acumen_target_allocation_v1';

/**
 * Initial sample investments for a seamless first-time user experience
 */
export const DEFAULT_INVESTMENTS = [
  {
    id: 'inv-1',
    schemeName: 'HDFC Top 100 Fund - Direct Plan - Growth',
    schemeCode: 118989,
    fundHouse: 'HDFC Mutual Fund',
    fundCategory: 'Equity - Large Cap',
    assetCategory: 'Equity',
    investmentAmount: 150000,
    unitsHeld: 142.58,
    latestNav: 1250.40,
    currentMarketValue: 178282,
  },
  {
    id: 'inv-2',
    schemeName: 'ICICI Prudential Corporate Bond Fund - Direct - Growth',
    schemeCode: 120586,
    fundHouse: 'ICICI Prudential Mutual Fund',
    fundCategory: 'Debt - Corporate Bond',
    assetCategory: 'Debt',
    investmentAmount: 100000,
    unitsHeld: 3254.21,
    latestNav: 34.12,
    currentMarketValue: 111033,
  },
  {
    id: 'inv-3',
    schemeName: 'SBI Equity Hybrid Fund - Direct Plan - Growth',
    schemeCode: 119842,
    fundHouse: 'SBI Mutual Fund',
    fundCategory: 'Hybrid - Aggressive',
    assetCategory: 'Hybrid',
    investmentAmount: 80000,
    unitsHeld: 312.45,
    latestNav: 295.60,
    currentMarketValue: 92360,
  },
  {
    id: 'inv-4',
    schemeName: 'Nippon India ETF Gold BeES',
    schemeCode: 105758,
    fundHouse: 'Nippon India Mutual Fund',
    fundCategory: 'Commodities - Gold',
    assetCategory: 'Gold',
    investmentAmount: 50000,
    unitsHeld: 820.0,
    latestNav: 71.20,
    currentMarketValue: 58384,
  },
];

export const DEFAULT_TARGET_ALLOCATION = {
  Equity: 50,
  Debt: 25,
  Hybrid: 15,
  Gold: 10,
  Other: 0,
};

/**
 * Load saved investments from localStorage
 */
export function loadPortfolioInvestments() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Sanitize all items to ensure schemeName and fundHouse are always defined
        return parsed
          .filter(item => item && typeof item === 'object')
          .map(item => ({
            ...item,
            schemeName: item.schemeName || item.scheme_name || 'Mutual Fund Investment',
            fundHouse: item.fundHouse || item.fund_house || 'Fund House',
            assetCategory: ASSET_CATEGORIES.includes(item.assetCategory) ? item.assetCategory : 'Equity',
          }));
      }
    }
  } catch (e) {
    console.error('Error reading portfolio from localStorage:', e);
  }
  return DEFAULT_INVESTMENTS;
}

/**
 * Save investments to localStorage
 */
export function savePortfolioInvestments(investments) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(investments));
  } catch (e) {
    console.error('Error saving portfolio to localStorage:', e);
  }
}

/**
 * Load saved target allocation
 */
export function loadTargetAllocation() {
  try {
    const saved = localStorage.getItem(TARGET_ALLOCATION_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch (e) {
    console.error('Error reading target allocation from localStorage:', e);
  }
  return DEFAULT_TARGET_ALLOCATION;
}

/**
 * Save target allocation to localStorage
 */
export function saveTargetAllocation(targets) {
  try {
    localStorage.setItem(TARGET_ALLOCATION_KEY, JSON.stringify(targets));
  } catch (e) {
    console.error('Error saving target allocation to localStorage:', e);
  }
}

/**
 * Compute portfolio aggregate summaries and category breakdowns
 */
export function calculatePortfolioSummary(investments) {
  if (!investments || investments.length === 0) {
    return {
      totalInvested: 0,
      currentValue: 0,
      totalProfitLoss: 0,
      overallReturnPct: 0,
      categoryValues: { Equity: 0, Debt: 0, Hybrid: 0, Gold: 0, Other: 0 },
      categoryPercentages: { Equity: 0, Debt: 0, Hybrid: 0, Gold: 0, Other: 0 },
    };
  }

  let totalInvested = 0;
  let currentValue = 0;
  const categoryValues = {
    Equity: 0,
    Debt: 0,
    Hybrid: 0,
    Gold: 0,
    Other: 0,
  };

  investments.forEach(inv => {
    const invested = Number(inv.investmentAmount) || 0;
    const marketVal = Number(inv.currentMarketValue) || (Number(inv.unitsHeld) * Number(inv.latestNav)) || 0;
    const cat = ASSET_CATEGORIES.includes(inv.assetCategory) ? inv.assetCategory : 'Other';

    totalInvested += invested;
    currentValue += marketVal;
    categoryValues[cat] += marketVal;
  });

  const totalProfitLoss = currentValue - totalInvested;
  const overallReturnPct = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;

  const categoryPercentages = {};
  ASSET_CATEGORIES.forEach(cat => {
    categoryPercentages[cat] = currentValue > 0
      ? Number(((categoryValues[cat] / currentValue) * 100).toFixed(1))
      : 0;
  });

  return {
    totalInvested,
    currentValue,
    totalProfitLoss,
    overallReturnPct: Number(overallReturnPct.toFixed(2)),
    categoryValues,
    categoryPercentages,
  };
}

/**
 * Compute Portfolio Rebalancing Analysis
 */
export function calculateRebalancingPlan(investments, targetPercentages) {
  const summary = calculatePortfolioSummary(investments);
  const totalValue = summary.currentValue;

  // Validate target sum
  const targetTotal = Object.values(targetPercentages).reduce((acc, val) => acc + (Number(val) || 0), 0);
  const isValid = Math.round(targetTotal) === 100;

  let totalAboveTarget = 0;
  let totalBelowTarget = 0;

  const rows = ASSET_CATEGORIES.map(category => {
    const curVal = summary.categoryValues[category] || 0;
    const curPct = summary.categoryPercentages[category] || 0;
    const tgtPct = Number(targetPercentages[category]) || 0;

    const targetVal = totalValue > 0 ? (totalValue * tgtPct) / 100 : 0;
    const adjustment = targetVal - curVal;

    let status = 'Balanced';
    if (adjustment > 1) {
      status = 'Increase'; // Underallocated
      totalBelowTarget += adjustment;
    } else if (adjustment < -1) {
      status = 'Decrease'; // Overallocated
      totalAboveTarget += Math.abs(adjustment);
    }

    return {
      category,
      color: ASSET_COLORS[category],
      currentValue: curVal,
      currentPct: curPct,
      targetPct: tgtPct,
      targetValue: targetVal,
      adjustment, // Positive: need to invest more; Negative: need to trim
      status,
    };
  });

  const overallocatedCategories = rows.filter(r => r.status === 'Decrease');
  const underallocatedCategories = rows.filter(r => r.status === 'Increase');

  return {
    totalValue,
    targetTotal,
    isValid,
    rows,
    overallocatedCategories,
    underallocatedCategories,
    totalAboveTarget,
    totalBelowTarget,
    hasInvestments: investments.length > 0,
  };
}
