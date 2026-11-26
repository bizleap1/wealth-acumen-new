/**
 * Wealth Acumen - Quick Invest Curated Schemes Data
 * Includes the requested illustrative funds matching reference design.
 */

export const QUICK_INVEST_FUNDS = [
  {
    id: 'icici-pru-balanced-advantage',
    name: 'ICICI Prudential Balanced Advantage Fund',
    shortName: 'ICICI Pru Balanced Advantage',
    category: 'Hybrid Fund',
    categoryGroup: 'Hybrid',
    riskLevel: 'Very High Risk',
    riskClass: 'very-high',
    schemeCode: 120377,
    fundHouse: 'ICICI Prudential Mutual Fund',
    description: 'An open-ended dynamic asset allocation fund that dynamically manages allocation between equity and debt instruments based on proprietary In-House valuation models (PB, PE, and dividend yield).',
    benchmark: 'NIFTY 50 Hybrid Composite Debt 50:50 Index',
    minSip: 500,
    minLumpsum: 5000,
    exitLoad: '1% if redeemed/switched within 1 year. Nil after 1 year.',
    defaultNav: 91.92,
    defaultNavDate: '25-Nov-2026',
    defaultReturns: {
      return1Y: 18.4,
      return3Y: 14.2,
      return5Y: 13.8,
    },
    investmentObjective: 'Aims to generate long-term capital appreciation and regular income from a dynamically rebalanced portfolio of equity and debt.'
  },
  {
    id: 'kotak-focused-equity',
    name: 'Kotak Focused Equity Fund',
    shortName: 'Kotak Focused Equity',
    category: 'Equity – Focused Fund',
    categoryGroup: 'Equity',
    riskLevel: 'Very High Risk',
    riskClass: 'very-high',
    schemeCode: 147473,
    fundHouse: 'Kotak Mahindra Mutual Fund',
    description: 'An open-ended equity scheme investing in maximum 30 stocks across market capitalizations (large cap, mid cap, and small cap) with high conviction bets.',
    benchmark: 'Nifty 500 TRI',
    minSip: 500,
    minLumpsum: 1000,
    exitLoad: '1% for redemptions within 365 days. Nil thereafter.',
    defaultNav: 32.27,
    defaultNavDate: '25-Nov-2026',
    defaultReturns: {
      return1Y: 26.5,
      return3Y: 18.1,
      return5Y: 17.6,
    },
    investmentObjective: 'Aims to generate long-term capital appreciation through a focused portfolio of up to 30 high-potential businesses.'
  },
  {
    id: 'mirae-asset-aggressive-hybrid',
    name: 'Mirae Asset Aggressive Hybrid Fund',
    shortName: 'Mirae Asset Aggressive Hybrid',
    category: 'Aggressive Hybrid',
    categoryGroup: 'Hybrid',
    riskLevel: 'Very High Risk',
    riskClass: 'very-high',
    schemeCode: 134815,
    fundHouse: 'Mirae Asset Mutual Fund',
    description: 'An open-ended hybrid scheme investing predominantly in equity and equity-related instruments (65-80%) with a conservative debt allocation (20-35%) for stability.',
    benchmark: 'CRISIL Hybrid 35+65 - Aggressive Index',
    minSip: 500,
    minLumpsum: 5000,
    exitLoad: '1% for redemptions in excess of 10% within 1 year.',
    defaultNav: 34.97,
    defaultNavDate: '25-Nov-2026',
    defaultReturns: {
      return1Y: 22.8,
      return3Y: 16.4,
      return5Y: 15.2,
    },
    investmentObjective: 'Aims to generate capital appreciation along with current income from a dual-asset blend of growth equities and high-grade debt.'
  },
  {
    id: 'hdfc-flexi-cap',
    name: 'HDFC Flexi Cap Fund',
    shortName: 'HDFC Flexi Cap',
    category: 'Equity – Flexi Cap',
    categoryGroup: 'Equity',
    riskLevel: 'Very High Risk',
    riskClass: 'very-high',
    schemeCode: 100122,
    fundHouse: 'HDFC Mutual Fund',
    description: 'A dynamic multi-cap equity fund with unconstrained flexibility to invest across large, mid, and small-cap opportunities based on economic cycles.',
    benchmark: 'Nifty 500 TRI',
    minSip: 500,
    minLumpsum: 1000,
    exitLoad: '1% if redeemed within 1 year.',
    defaultNav: 1845.30,
    defaultNavDate: '25-Nov-2026',
    defaultReturns: {
      return1Y: 28.2,
      return3Y: 21.5,
      return5Y: 19.8,
    },
    investmentObjective: 'Aims to generate long-term capital growth through a diversified equity portfolio managed across all market capitalizations.'
  },
  {
    id: 'icici-corporate-bond',
    name: 'ICICI Prudential Corporate Bond Fund',
    shortName: 'ICICI Pru Corporate Bond',
    category: 'Debt – Corporate Bond',
    categoryGroup: 'Debt',
    riskLevel: 'Moderate Risk',
    riskClass: 'moderate',
    schemeCode: 120586,
    fundHouse: 'ICICI Prudential Mutual Fund',
    description: 'An open-ended debt scheme predominantly investing in highest-rated AA+ and AAA corporate bonds for capital preservation and stable periodic yield.',
    benchmark: 'NIFTY Corporate Bond Index B-III',
    minSip: 1000,
    minLumpsum: 5000,
    exitLoad: 'Nil. High liquidity with no exit penalty.',
    defaultNav: 34.12,
    defaultNavDate: '25-Nov-2026',
    defaultReturns: {
      return1Y: 7.8,
      return3Y: 6.9,
      return5Y: 7.4,
    },
    investmentObjective: 'Aims to generate regular income and capital appreciation by investing in corporate bonds rated AA+ and above.'
  }
];

export const SCHEME_CATEGORIES = [
  'All Schemes',
  'Hybrid',
  'Equity',
  'Debt'
];
