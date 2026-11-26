// Comprehensive Automated Test Suite for Wealth Acumen Mutual Fund Planner & Portfolio Rebalancer
import { searchMutualFunds, getLatestNAV, getHistoricalNAV } from '../src/services/mutualFundApi.js';
import { 
  calculatePortfolioSummary, 
  calculateRebalancingPlan, 
  loadPortfolioInvestments, 
  DEFAULT_INVESTMENTS, 
  DEFAULT_TARGET_ALLOCATION 
} from '../src/utils/portfolioCalculations.js';
import { 
  calculatePointToPointReturn, 
  calculateCAGR, 
  calculateHistoricalReturns, 
  filterRecordsByRange, 
  formatINR, 
  detectPlanType, 
  detectOptionType 
} from '../src/utils/fundCalculations.js';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${message}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${message}`);
  }
}

async function runTests() {
  console.log('====================================================');
  console.log('WEALTH ACUMEN: MUTUAL FUND & REBALANCING TEST SUITE');
  console.log('====================================================\n');

  // TEST 1: Live Dev Server HTTP Health Check
  console.log('TEST GROUP 1: Live Dev Server Health Check');
  try {
    const res = await fetch('http://localhost:5173/mutual-fund-planner');
    assert(res.status === 200, `Dev server returned HTTP ${res.status} for /mutual-fund-planner`);
    const html = await res.text();
    assert(html.includes('<div id="root">'), 'HTML contains root div anchor');
    assert(html.includes('src/main.jsx'), 'HTML includes entry point main.jsx');
  } catch (err) {
    assert(false, `Dev server connection failed: ${err.message}`);
  }

  // TEST 2: MFAPI.in Live API Integration
  console.log('\nTEST GROUP 2: MFAPI.in Live Search & NAV Endpoints');
  try {
    // 2.1 Search API
    const searchResults = await searchMutualFunds('HDFC Top 100');
    assert(Array.isArray(searchResults), 'Search returned an array');
    assert(searchResults.length > 0, `Search found ${searchResults.length} schemes for "HDFC Top 100"`);
    const sample = searchResults[0];
    assert(sample && typeof sample.schemeCode === 'number', `Scheme code is valid number: ${sample?.schemeCode}`);
    assert(sample && typeof sample.schemeName === 'string', `Scheme name is string: "${sample?.schemeName}"`);

    // 2.2 Latest NAV API
    const testCode = sample.schemeCode || 118989;
    const latestData = await getLatestNAV(testCode);
    assert(latestData.schemeCode === testCode, `Latest NAV returned for scheme code ${testCode}`);
    assert(typeof latestData.latestNav === 'number' && latestData.latestNav > 0, `Latest NAV is positive number: ₹${latestData.latestNav}`);
    assert(Boolean(latestData.navDate), `NAV date is present: ${latestData.navDate}`);
    assert(Boolean(latestData.fundHouse), `Fund house is present: ${latestData.fundHouse}`);

    // 2.3 Historical NAV Series API
    const historyData = await getHistoricalNAV(testCode);
    assert(Array.isArray(historyData.records), 'Historical records is an array');
    assert(historyData.records.length > 50, `Historical records count is substantial: ${historyData.records.length} days`);
    assert(historyData.records[0].nav > 0, `First historical NAV record is valid: ₹${historyData.records[0].nav} on ${historyData.records[0].dateStr}`);
  } catch (err) {
    assert(false, `MFAPI.in live call failed: ${err.message}`);
  }

  // TEST 3: Financial Returns Calculation Formulas
  console.log('\nTEST GROUP 3: Financial Return Formulas (Point-to-Point & CAGR)');
  {
    // Point-to-Point
    const p2pGain = calculatePointToPointReturn(100, 115);
    assert(p2pGain === 15.0, `Point-to-Point gain (100 -> 115) is 15.0%: actual ${p2pGain}%`);

    const p2pLoss = calculatePointToPointReturn(100, 90);
    assert(p2pLoss === -10.0, `Point-to-Point loss (100 -> 90) is -10.0%: actual ${p2pLoss}%`);

    // CAGR (100 to 200 in 3 years = ~25.99%)
    const cagr3Y = calculateCAGR(100, 200, 3);
    assert(cagr3Y === 25.99, `CAGR 100 -> 200 in 3 years is 25.99%: actual ${cagr3Y}%`);

    // CAGR 100 to 121 in 2 years = 10%
    const cagr2Y = calculateCAGR(100, 121, 2);
    assert(cagr2Y === 10.0, `CAGR 100 -> 121 in 2 years is 10.0%: actual ${cagr2Y}%`);

    // Edge cases
    assert(calculateCAGR(0, 100, 3) === null, 'CAGR safely returns null for beginningNav <= 0');
    assert(calculatePointToPointReturn(null, 100) === null, 'P2P safely returns null for invalid input');
  }

  // TEST 4: Historical Return Processing on Real Records
  console.log('\nTEST GROUP 4: Historical Return Periods from NAV Series');
  {
    // Mock 5 years of historical data
    const mockRecords = [];
    const baseDate = new Date();
    for (let i = 0; i <= 1850; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() - i);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      // Price doubles over 5 years (linear for mock)
      const nav = 100 + (1850 - i) * (100 / 1850);
      mockRecords.push({ dateStr: `${dd}-${mm}-${yyyy}`, nav });
    }

    const returns = calculateHistoricalReturns(mockRecords);
    assert(returns.has1Y === true, '1-Year return flag is true');
    assert(returns.has3Y === true, '3-Year return flag is true');
    assert(returns.has5Y === true, '5-Year return flag is true');
    assert(typeof returns.return1Y === 'number', `1Y return calculated: ${returns.return1Y}%`);
    assert(typeof returns.return3Y === 'number', `3Y CAGR calculated: ${returns.return3Y}%`);
    assert(typeof returns.return5Y === 'number', `5Y CAGR calculated: ${returns.return5Y}%`);

    // Range filtering
    const range1M = filterRecordsByRange(mockRecords, '1M');
    assert(range1M.length > 20 && range1M.length < 40, `1M filter returns ~30 daily records: actual ${range1M.length}`);
    const range1Y = filterRecordsByRange(mockRecords, '1Y');
    assert(range1Y.length > 350 && range1Y.length < 375, `1Y filter returns ~365 records: actual ${range1Y.length}`);
    // Check chronological order (oldest first)
    assert(range1M[0].nav <= range1M[range1M.length - 1].nav, 'Range filter output is sorted chronologically');
  }

  // TEST 5: Metadata Helpers & Formatting
  console.log('\nTEST GROUP 5: Metadata Helpers & Currency Formatting');
  {
    assert(detectPlanType('HDFC Top 100 Fund - Direct Plan - Growth') === 'Direct Plan', 'Detects Direct Plan');
    assert(detectPlanType('SBI Regular Savings Fund - Regular Plan') === 'Regular Plan', 'Detects Regular Plan');
    assert(detectOptionType('Axis Bluechip Fund - Direct Plan - Growth Option') === 'Growth Option', 'Detects Growth Option');
    assert(detectOptionType('ICICI Pru Dividend Reinvestment') === 'IDCW / Dividend', 'Detects IDCW / Dividend');
    assert(formatINR(1250000) === '₹12,50,000', `Formats Indian Rupees correctly: ${formatINR(1250000)}`);
  }

  // TEST 6: Portfolio Summary Aggregation
  console.log('\nTEST GROUP 6: Portfolio Summary Calculations');
  {
    const summary = calculatePortfolioSummary(DEFAULT_INVESTMENTS);
    assert(summary.totalInvested === 380000, `Total Invested matches ₹3,80,000 (actual: ₹${summary.totalInvested})`);
    assert(summary.currentValue === 440059, `Current Value matches ₹4,40,059 (actual: ₹${summary.currentValue})`);
    assert(summary.totalProfitLoss === 60059, `Total P&L is ₹60,059 (actual: ₹${summary.totalProfitLoss})`);
    assert(summary.overallReturnPct === 15.8, `Overall Return % is 15.8% (actual: ${summary.overallReturnPct}%)`);
    assert(summary.categoryPercentages.Equity > 0, `Equity % is ${summary.categoryPercentages.Equity}%`);
    assert(summary.categoryPercentages.Debt > 0, `Debt % is ${summary.categoryPercentages.Debt}%`);

    // Empty portfolio test
    const emptySummary = calculatePortfolioSummary([]);
    assert(emptySummary.totalInvested === 0, 'Empty portfolio invested value is 0');
    assert(emptySummary.currentValue === 0, 'Empty portfolio market value is 0');
    assert(emptySummary.overallReturnPct === 0, 'Empty portfolio return is 0%');
  }

  // TEST 7: Auto-Healing & localStorage Robustness
  console.log('\nTEST GROUP 7: Data Sanitization & LocalStorage Auto-Healing');
  {
    // Simulate corrupted/incomplete data in localStorage
    const originalLocalStorage = globalThis.localStorage;
    const mockStorage = {
      wealth_acumen_my_portfolio_v1: JSON.stringify([
        { schemeCode: 12345, investmentAmount: 50000, unitsHeld: 100, latestNav: 600 }, // missing schemeName & fundHouse!
        { schemeName: undefined, fundHouse: null, assetCategory: 'InvalidCategory' },
      ])
    };
    globalThis.localStorage = {
      getItem: (key) => mockStorage[key] || null,
      setItem: (key, val) => { mockStorage[key] = val; }
    };

    const healed = loadPortfolioInvestments();
    assert(Array.isArray(healed) && healed.length === 2, 'Loaded 2 items from corrupted storage');
    assert(typeof healed[0].schemeName === 'string' && healed[0].schemeName.length > 0, `Healed schemeName is defined: "${healed[0].schemeName}"`);
    assert(typeof healed[0].fundHouse === 'string' && healed[0].fundHouse.length > 0, `Healed fundHouse is defined: "${healed[0].fundHouse}"`);
    assert(healed[1].assetCategory === 'Equity', `Invalid assetCategory defaulted safely to 'Equity': "${healed[1].assetCategory}"`);

    // Restore localStorage
    globalThis.localStorage = originalLocalStorage;
  }

  // TEST 8: Portfolio Rebalancing Engine
  console.log('\nTEST GROUP 8: Portfolio Rebalancing Engine & Action Recommendations');
  {
    // Target: 50% Equity, 25% Debt, 15% Hybrid, 10% Gold
    const plan = calculateRebalancingPlan(DEFAULT_INVESTMENTS, DEFAULT_TARGET_ALLOCATION);
    assert(plan.isValid === true, 'Target allocation totals 100% (isValid = true)');
    assert(plan.hasInvestments === true, 'Portfolio has active investments');
    assert(plan.rows.length === 5, 'Rebalancing rows generated for all 5 asset categories');

    // Verify mathematical conservation of rebalancing adjustments
    // When target sum is 100%, total Buy adjustments (increases) must equal total Sell adjustments (decreases)
    const totalIncreases = plan.rows
      .filter(r => r.adjustment > 0)
      .reduce((acc, r) => acc + r.adjustment, 0);
    const totalDecreases = plan.rows
      .filter(r => r.adjustment < 0)
      .reduce((acc, r) => acc + Math.abs(r.adjustment), 0);
    
    const diff = Math.abs(totalIncreases - totalDecreases);
    assert(diff < 2.0, `Mathematical conservation: Buy (₹${totalIncreases.toFixed(2)}) equals Sell (₹${totalDecreases.toFixed(2)}) within ₹2 precision (diff = ${diff.toFixed(2)})`);

    // Verify invalid target total detection
    const invalidPlan = calculateRebalancingPlan(DEFAULT_INVESTMENTS, { Equity: 60, Debt: 60, Hybrid: 0, Gold: 0, Other: 0 });
    assert(invalidPlan.isValid === false, 'Detects invalid target allocation (120% total)');
    assert(invalidPlan.targetTotal === 120, 'Identifies exact target total: 120%');

    // Test aggressive growth target (70/15/10/5)
    const growthTargets = { Equity: 70, Debt: 15, Hybrid: 10, Gold: 5, Other: 0 };
    const growthPlan = calculateRebalancingPlan(DEFAULT_INVESTMENTS, growthTargets);
    assert(growthPlan.isValid === true, 'Growth preset is valid (100%)');
    const equityRow = growthPlan.rows.find(r => r.category === 'Equity');
    assert(equityRow.targetPct === 70, `Equity target is 70%: actual ${equityRow.targetPct}%`);
    assert(equityRow.targetValue === (DEFAULT_INVESTMENTS.reduce((a, b) => a + b.currentMarketValue, 0) * 0.7), 'Equity target value matches 70% of total portfolio value');
  }

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED out of ${totalTests} total tests`);
  console.log('====================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
