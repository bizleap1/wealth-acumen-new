import { formatIndianCurrency, formatCompactIndianWords } from './calculatorUtils.js';

export { formatIndianCurrency, formatCompactIndianWords };

export const ASSET_CATEGORIES = [
  {
    id: 'equity',
    name: 'Equity',
    description: 'Stocks, Equity Mutual Funds, ETFs',
    role: 'Capital Growth & Wealth Appreciation',
    color: '#4f46e5', // Brand Indigo / Blue
    lightColor: 'rgba(79, 70, 229, 0.1)',
  },
  {
    id: 'debt',
    name: 'Debt & Fixed Income',
    description: 'Bonds, Corporate Debt, FDs, Debt Funds',
    role: 'Capital Preservation & Steady Income',
    color: '#00d09c', // Growth Green / Emerald
    lightColor: 'rgba(0, 208, 156, 0.1)',
  },
  {
    id: 'gold',
    name: 'Gold',
    description: 'Sovereign Gold Bonds (SGB), Gold ETFs',
    role: 'Inflation Hedge & Crisis Protection',
    color: '#f59e0b', // Gold / Amber
    lightColor: 'rgba(245, 158, 11, 0.1)',
  },
  {
    id: 'other',
    name: 'Other Assets',
    description: 'Liquid Funds, Real Estate, Alternatives',
    role: 'Liquidity, Real Assets & Diversification',
    color: '#8b5cf6', // Violet
    lightColor: 'rgba(139, 92, 246, 0.1)',
  },
];

export const MODEL_PRESETS = [
  {
    id: 'conservative',
    name: 'Conservative',
    tagline: 'Focus on Capital Preservation',
    allocations: { equity: 25, debt: 55, gold: 10, other: 10 },
  },
  {
    id: 'moderate',
    name: 'Balanced (Moderate)',
    tagline: 'Balanced Growth & Stability',
    allocations: { equity: 50, debt: 30, gold: 10, other: 10 },
  },
  {
    id: 'aggressive',
    name: 'Aggressive Growth',
    tagline: 'Maximized Long-Term Wealth',
    allocations: { equity: 70, debt: 15, gold: 10, other: 5 },
  },
  {
    id: 'allweather',
    name: 'All-Weather',
    tagline: 'Resilient Across All Cycles',
    allocations: { equity: 30, debt: 40, gold: 15, other: 15 },
  },
];

/**
 * Calculate amount breakdown for each category based on total investment and percentages.
 */
export const calculateAssetAllocation = (totalAmount, allocations) => {
  const principal = Math.max(0, isFinite(Number(totalAmount)) ? Number(totalAmount) : 0);

  const breakdown = ASSET_CATEGORIES.map((cat) => {
    const rawPct = Number(allocations[cat.id]) || 0;
    const safePct = Math.max(0, Math.min(100, isFinite(rawPct) ? rawPct : 0));
    const amount = Math.round((principal * safePct) / 100);

    return {
      ...cat,
      percentage: safePct,
      amount,
    };
  });

  const totalPercentage = breakdown.reduce((sum, item) => sum + item.percentage, 0);
  const totalAllocated = breakdown.reduce((sum, item) => sum + item.amount, 0);

  return {
    totalInvestment: principal,
    totalPercentage: Math.round(totalPercentage * 10) / 10,
    isValid: Math.round(totalPercentage) === 100,
    difference: Math.round((100 - totalPercentage) * 10) / 10,
    breakdown,
    totalAllocated,
  };
};

/**
 * Proportionally normalize allocations so their sum equals exactly 100%.
 */
export const normalizeAllocations = (allocations) => {
  const keys = ASSET_CATEGORIES.map((c) => c.id);
  const currentSum = keys.reduce((sum, k) => sum + (Number(allocations[k]) || 0), 0);

  if (currentSum === 0) {
    return { equity: 50, debt: 30, gold: 10, other: 10 };
  }

  const normalized = {};
  let accumulated = 0;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      // Assign remainder to last category to guarantee exact 100
      normalized[key] = Math.max(0, 100 - accumulated);
    } else {
      const val = Math.round(((Number(allocations[key]) || 0) / currentSum) * 100);
      normalized[key] = val;
      accumulated += val;
    }
  });

  return normalized;
};
