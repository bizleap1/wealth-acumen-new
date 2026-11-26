/**
 * Wealth Acumen - Mutual Fund Financial Calculations
 * Implements Point-to-Point Returns, CAGR, Date Parsing, and Period Slicing.
 */

/**
 * Parse date in DD-MM-YYYY format to JavaScript Date object
 */
export function parseMFDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return new Date();
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date(dateStr);
}

/**
 * Format a DD-MM-YYYY date string into readable format like "14 Nov 2024"
 */
export function formatDisplayDate(dateStr) {
  if (!dateStr) return 'N/A';
  const d = parseMFDate(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Calculate Point-to-Point Return (%)
 * Formula: ((Ending NAV - Beginning NAV) / Beginning NAV) * 100
 */
export function calculatePointToPointReturn(beginningNav, endingNav) {
  if (!beginningNav || !endingNav || beginningNav <= 0) return null;
  return Number((((endingNav - beginningNav) / beginningNav) * 100).toFixed(2));
}

/**
 * Calculate CAGR (%)
 * Formula: (((Ending NAV / Beginning NAV) ^ (1 / Years)) - 1) * 100
 */
export function calculateCAGR(beginningNav, endingNav, years) {
  if (!beginningNav || !endingNav || beginningNav <= 0 || !years || years <= 0) return null;
  const cagr = (Math.pow(endingNav / beginningNav, 1 / years) - 1) * 100;
  return isFinite(cagr) ? Number(cagr.toFixed(2)) : null;
}

/**
 * Find the nearest valid historical NAV record on or before a given target date
 * Records should be sorted chronologically or in reverse chronological.
 */
export function findNearestPriorRecord(records, targetDate) {
  if (!records || records.length === 0) return null;
  const targetTime = targetDate.getTime();

  // Records in MFAPI are reverse chronological (newest first).
  // Find the first record with timestamp <= targetTime
  for (let i = 0; i < records.length; i++) {
    const recordTime = parseMFDate(records[i].dateStr).getTime();
    if (recordTime <= targetTime) {
      return records[i];
    }
  }

  // If none found <= targetTime, fallback to the oldest available record
  return records[records.length - 1];
}

/**
 * Compute key historical returns (1Y, 3Y, 5Y) using actual historical NAVs
 */
export function calculateHistoricalReturns(records) {
  if (!records || records.length < 2) {
    return {
      return1Y: null,
      return3Y: null,
      return5Y: null,
      has1Y: false,
      has3Y: false,
      has5Y: false,
    };
  }

  const latestRecord = records[0];
  const latestDate = parseMFDate(latestRecord.dateStr);
  const endingNav = latestRecord.nav;

  // 1 Year Target
  const target1Y = new Date(latestDate);
  target1Y.setFullYear(latestDate.getFullYear() - 1);
  const record1Y = findNearestPriorRecord(records, target1Y);

  // 3 Year Target
  const target3Y = new Date(latestDate);
  target3Y.setFullYear(latestDate.getFullYear() - 3);
  const record3Y = findNearestPriorRecord(records, target3Y);

  // 5 Year Target
  const target5Y = new Date(latestDate);
  target5Y.setFullYear(latestDate.getFullYear() - 5);
  const record5Y = findNearestPriorRecord(records, target5Y);

  const oldestRecord = records[records.length - 1];
  const oldestDate = parseMFDate(oldestRecord.dateStr);
  const totalYearsAvailable = (latestDate.getTime() - oldestDate.getTime()) / (365.25 * 24 * 3600 * 1000);

  // 1-Year is Point-to-Point / 1Y CAGR
  const return1Y = (totalYearsAvailable >= 0.95 && record1Y)
    ? calculatePointToPointReturn(record1Y.nav, endingNav)
    : null;

  // 3-Year CAGR
  const return3Y = (totalYearsAvailable >= 2.9 && record3Y)
    ? calculateCAGR(record3Y.nav, endingNav, 3)
    : null;

  // 5-Year CAGR
  const return5Y = (totalYearsAvailable >= 4.9 && record5Y)
    ? calculateCAGR(record5Y.nav, endingNav, 5)
    : null;

  return {
    return1Y,
    return3Y,
    return5Y,
    has1Y: return1Y !== null,
    has3Y: return3Y !== null,
    has5Y: return5Y !== null,
    oldestDateStr: oldestRecord.dateStr,
    latestDateStr: latestRecord.dateStr,
  };
}

/**
 * Filter historical records by selected range preset:
 * '1M', '3M', '6M', '1Y', '3Y', '5Y', 'ALL'
 * Returns chronologically sorted records (oldest to newest) suitable for graphing.
 */
export function filterRecordsByRange(records, rangeKey = '1Y') {
  if (!records || records.length === 0) return [];

  // Clone records
  const latestDate = parseMFDate(records[0].dateStr);
  let cutoffDate = new Date(latestDate);

  switch (rangeKey) {
    case '1M':
      cutoffDate.setMonth(latestDate.getMonth() - 1);
      break;
    case '3M':
      cutoffDate.setMonth(latestDate.getMonth() - 3);
      break;
    case '6M':
      cutoffDate.setMonth(latestDate.getMonth() - 6);
      break;
    case '1Y':
      cutoffDate.setFullYear(latestDate.getFullYear() - 1);
      break;
    case '3Y':
      cutoffDate.setFullYear(latestDate.getFullYear() - 3);
      break;
    case '5Y':
      cutoffDate.setFullYear(latestDate.getFullYear() - 5);
      break;
    case 'ALL':
    default:
      cutoffDate = new Date(1990, 0, 1);
      break;
  }

  const cutoffTime = cutoffDate.getTime();
  const filtered = records.filter(row => parseMFDate(row.dateStr).getTime() >= cutoffTime);

  // Sort chronologically (oldest first for line chart)
  return [...filtered].reverse();
}

/**
 * Identify Plan Type (Direct vs Regular) from scheme name
 */
export function detectPlanType(schemeName) {
  if (!schemeName) return 'Regular Plan';
  const upper = schemeName.toUpperCase();
  if (upper.includes('DIRECT')) return 'Direct Plan';
  return 'Regular Plan';
}

/**
 * Identify Option (Growth vs IDCW / Dividend) from scheme name
 */
export function detectOptionType(schemeName) {
  if (!schemeName) return 'Growth';
  const upper = schemeName.toUpperCase();
  if (upper.includes('IDCW') || upper.includes('DIVIDEND') || upper.includes('DIV')) {
    return 'IDCW / Dividend';
  }
  return 'Growth Option';
}

/**
 * Format Indian Currency (₹)
 */
export function formatINR(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  return '₹' + Number(amount).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
}
