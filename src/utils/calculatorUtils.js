/**
 * Utility functions for SIP and Lumpsum calculations and Indian currency formatting.
 */

/**
 * Format a number as Indian Currency with the ₹ symbol and comma grouping.
 * @param {number} value
 * @returns {string} e.g. "₹13,44,000"
 */
export const formatIndianCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '₹0';
  const rounded = Math.round(value);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rounded);
};

/**
 * Format a number into compact Indian denomination words (Lakh / Crore).
 * @param {number} value
 * @returns {string} e.g. "13.44 Lakh", "1.25 Cr"
 */
export const formatCompactIndianWords = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '₹0';
  const val = Math.abs(value);
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  }
  if (val >= 1000) {
    return `₹${(val / 1000).toFixed(1)} K`;
  }
  return `₹${Math.round(val).toLocaleString('en-IN')}`;
};

/**
 * Calculate SIP Future Value.
 * 
 * Formula:
 * FV = P × [((1 + r)^n - 1) / r]
 * 
 * Where:
 * P = Monthly Investment
 * r = Annual Return / 12 / 100
 * n = Investment Years × 12
 * 
 * Timing:
 * - End of Month: standard formula
 * - Beginning of Month: standard formula × (1 + r)
 *
 * @param {number} monthlyInvestment P
 * @param {number} annualRate expected annual return %
 * @param {number} years duration in years
 * @param {'end' | 'beginning'} timing
 * @returns {{ investedAmount: number, estimatedReturns: number, totalValue: number }}
 */
export const calculateSip = (monthlyInvestment, annualRate, years, timing = 'end') => {
  const P = Math.max(0, isFinite(Number(monthlyInvestment)) ? Number(monthlyInvestment) : 0);
  const y = Math.max(0, isFinite(Number(years)) ? Number(years) : 0);
  const n = Math.round(y * 12);
  const ratePercent = Math.max(0, isFinite(Number(annualRate)) ? Number(annualRate) : 0);
  const r = ratePercent / 12 / 100;

  const totalInvested = Math.round(P * n);

  if (P === 0 || n === 0) {
    return {
      investedAmount: 0,
      estimatedReturns: 0,
      totalValue: 0,
    };
  }

  // Handle zero interest rate separately
  if (r === 0) {
    return {
      investedAmount: totalInvested,
      estimatedReturns: 0,
      totalValue: totalInvested,
    };
  }

  // Standard SIP future value formula: FV = P × [((1+r)^n - 1) / r]
  const growthFactor = (Math.pow(1 + r, n) - 1) / r;
  const standardFv = P * growthFactor;

  // Timing: Beginning of Month multiplies by (1+r); End of Month uses standard formula
  const fv = timing === 'beginning' ? standardFv * (1 + r) : standardFv;

  if (isNaN(fv) || !isFinite(fv)) {
    return {
      investedAmount: totalInvested,
      estimatedReturns: 0,
      totalValue: totalInvested,
    };
  }

  const totalValue = Math.round(fv);
  const estimatedReturns = Math.max(0, totalValue - totalInvested);

  return {
    investedAmount: totalInvested,
    estimatedReturns,
    totalValue,
  };
};

/**
 * Calculate Lumpsum (One-Time) Investment Future Value.
 * Formula: FV = P × (1 + r)^t
 *
 * @param {number} totalInvestment P
 * @param {number} annualRate expected annual return %
 * @param {number} years duration in years
 * @returns {{ investedAmount: number, estimatedReturns: number, totalValue: number }}
 */
export const calculateLumpsum = (totalInvestment, annualRate, years) => {
  const P = Math.max(0, Number(totalInvestment) || 0);
  const y = Math.max(0, Number(years) || 0);
  const r = (Number(annualRate) || 0) / 100;

  if (P === 0 || y === 0) {
    return {
      investedAmount: P,
      estimatedReturns: 0,
      totalValue: P,
    };
  }

  if (r === 0) {
    return {
      investedAmount: P,
      estimatedReturns: 0,
      totalValue: P,
    };
  }

  const fv = P * Math.pow(1 + r, y);
  const totalValue = Math.round(fv);
  const estimatedReturns = Math.max(0, totalValue - P);

  return {
    investedAmount: P,
    estimatedReturns,
    totalValue,
  };
};

/**
 * Generate year-by-year compounding progression for charts and tables.
 */
export const generateYearlyProgression = (type, investment, annualRate, totalYears, timing = 'end') => {
  const data = [];
  const yMax = Math.min(40, Math.max(1, Number(totalYears) || 1));

  for (let year = 1; year <= yMax; year++) {
    let result;
    if (type === 'lumpsum') {
      result = calculateLumpsum(investment, annualRate, year);
    } else {
      result = calculateSip(investment, annualRate, year, timing);
    }
    data.push({
      year,
      investedAmount: result.investedAmount,
      estimatedReturns: result.estimatedReturns,
      totalValue: result.totalValue,
    });
  }

  return data;
};
