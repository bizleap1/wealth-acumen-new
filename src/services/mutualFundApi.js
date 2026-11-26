/**
 * Wealth Acumen - Mutual Fund API Service Layer
 * Documentation: https://www.mfapi.in/docs/
 * Base URL: https://api.mfapi.in
 */

const BASE_URL = 'https://api.mfapi.in';

// In-memory cache for ultra-fast tab switches and deduplication
const memoryCache = {
  search: new Map(),
  latest: new Map(),
  history: new Map(),
};

/**
 * Helper to fetch with exponential backoff retry
 */
async function fetchWithRetry(url, retries = 2, delay = 400) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
    }
  }
}

/**
 * Search mutual fund schemes by name
 * Endpoint: GET /mf/search?q={searchQuery}
 */
export async function searchMutualFunds(query) {
  const trimmed = (query || '').trim();
  if (!trimmed || trimmed.length < 2) return [];

  const cacheKey = trimmed.toLowerCase();
  if (memoryCache.search.has(cacheKey)) {
    return memoryCache.search.get(cacheKey);
  }

  try {
    const url = `${BASE_URL}/mf/search?q=${encodeURIComponent(trimmed)}`;
    let results = await fetchWithRetry(url);

    // Fallback if multi-word query returned 0 matches due to strict MFAPI substring matching
    if ((!Array.isArray(results) || results.length === 0) && trimmed.includes(' ')) {
      const words = trimmed.split(/\s+/).filter(Boolean);
      if (words.length > 2) {
        const subQuery = words.slice(0, 2).join(' ');
        results = await fetchWithRetry(`${BASE_URL}/mf/search?q=${encodeURIComponent(subQuery)}`);
      }
      if (!Array.isArray(results) || results.length === 0) {
        results = await fetchWithRetry(`${BASE_URL}/mf/search?q=${encodeURIComponent(words[0])}`);
      }
    }

    if (Array.isArray(results)) {
      // Sort alphabetically, Direct growth first if matching
      const cleaned = results.map(item => ({
        schemeCode: Number(item.schemeCode),
        schemeName: item.schemeName,
      }));
      memoryCache.search.set(cacheKey, cleaned);
      return cleaned;
    }
    return [];
  } catch (error) {
    console.error('Failed to search mutual funds:', error);
    throw new Error('Unable to connect to Mutual Fund Search API. Please check your network connection.');
  }
}

/**
 * Fetch latest NAV for a specific scheme code
 * Endpoint: GET /mf/{scheme_code}/latest
 */
export async function getLatestNAV(schemeCode) {
  const code = Number(schemeCode);
  if (!code || isNaN(code)) throw new Error('Invalid scheme code provided.');

  const cacheKey = String(code);
  if (memoryCache.latest.has(cacheKey)) {
    return memoryCache.latest.get(cacheKey);
  }

  try {
    const url = `${BASE_URL}/mf/${code}/latest`;
    const res = await fetchWithRetry(url);

    if (res && res.status === 'SUCCESS' && res.meta) {
      const latestData = Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : null;
      const formatted = {
        schemeCode: Number(res.meta.scheme_code || code),
        schemeName: res.meta.scheme_name,
        fundHouse: res.meta.fund_house || 'Not Specified',
        schemeType: res.meta.scheme_type || 'Open Ended Schemes',
        schemeCategory: res.meta.scheme_category || 'Equity/Growth',
        latestNav: latestData ? parseFloat(latestData.nav) : null,
        navDate: latestData ? latestData.date : 'N/A',
        isinGrowth: res.meta.isin_growth || null,
        isinDiv: res.meta.isin_div_reinvestment || null,
        raw: res,
      };

      memoryCache.latest.set(cacheKey, formatted);
      return formatted;
    }
    throw new Error('Scheme latest NAV not found.');
  } catch (error) {
    console.error(`Error fetching latest NAV for ${code}:`, error);
    throw error;
  }
}

/**
 * Fetch full historical NAV series for a specific scheme code
 * Endpoint: GET /mf/{scheme_code}
 */
export async function getHistoricalNAV(schemeCode) {
  const code = Number(schemeCode);
  if (!code || isNaN(code)) throw new Error('Invalid scheme code provided.');

  const cacheKey = String(code);
  if (memoryCache.history.has(cacheKey)) {
    return memoryCache.history.get(cacheKey);
  }

  try {
    const url = `${BASE_URL}/mf/${code}`;
    const res = await fetchWithRetry(url);

    if (res && res.status === 'SUCCESS' && res.meta && Array.isArray(res.data)) {
      // res.data is reverse-chronological (most recent first)
      // Parse NAV numbers safely and filter out invalid rows
      const validRecords = res.data
        .map(row => ({
          dateStr: row.date, // DD-MM-YYYY
          nav: parseFloat(row.nav),
        }))
        .filter(row => !isNaN(row.nav) && row.nav > 0);

      const result = {
        meta: {
          schemeCode: Number(res.meta.scheme_code || code),
          schemeName: res.meta.scheme_name,
          fundHouse: res.meta.fund_house || 'Not Specified',
          schemeType: res.meta.scheme_type || 'Open Ended Schemes',
          schemeCategory: res.meta.scheme_category || 'Equity/Growth',
        },
        records: validRecords, // reverse chronological (most recent at [0])
        latestNav: validRecords.length > 0 ? validRecords[0].nav : null,
        latestDate: validRecords.length > 0 ? validRecords[0].dateStr : null,
      };

      memoryCache.history.set(cacheKey, result);
      return result;
    }
    throw new Error('No historical NAV records returned for this scheme.');
  } catch (error) {
    console.error(`Error fetching history for ${code}:`, error);
    throw error;
  }
}

/**
 * Invalidate cached entry to force a fresh fetch
 */
export function invalidateSchemeCache(schemeCode) {
  const key = String(schemeCode);
  memoryCache.latest.delete(key);
  memoryCache.history.delete(key);
}
