import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, RefreshCw, Calendar, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './FixedDeposit.css';

const FixedDeposit = () => {
  const navigate = useNavigate();
  return (
    <div className="fd-page">
      {/* Hero Section */}
      <PageHeader 
        titleFirst="Fixed" 
        titleLast="Deposit." 
        subtitle="Experience true peace of mind with guaranteed returns and capital protection. A secure investment path designed for steady growth and financial discipline." 
      />
      {/* Secure Future Section */}
      <section className="fd-secure-section">
        <div className="fd-section-badge">WHY CHOOSE FD?</div>
        
        <div className="fd-secure-container">
          <div className="fd-secure-image">
            <img src="/images/fd-jar.png" alt="Coin Jar" className="fd-jar-img" />
          </div>
          <div className="fd-secure-text">
            <h2>Secure Your Financial Future with Predictable Returns</h2>
            <p>
              A Fixed Deposit (FD) remains one of the most reliable and secure investment avenues available. By depositing a lump sum for a predetermined period, you lock in a guaranteed interest rate, shielding your hard-earned savings from market volatility.
            </p>
            <p>
              Whether you are planning for short-term milestones or building a long-term safety net, FDs offer the flexibility and stability required for a balanced wealth strategy. It is the perfect choice for risk-averse investors seeking capital protection and steady income.
            </p>
            
            <div className="fd-benefits-row">
              <div className="fd-benefit-item">
                <CheckCircle2 size={24} color="#b45309" className="fd-benefit-icon" />
                <div>
                  <h4>100% Capital Safety</h4>
                  <span>Regulated and protected growth.</span>
                </div>
              </div>
              <div className="fd-benefit-item">
                <BanknoteIcon />
                <div>
                  <h4>Guaranteed Income</h4>
                  <span>Predetermined interest rates.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="fd-features-section">
        <div className="fd-section-header">
          <h2>Key Features of Our Fixed Deposits</h2>
          <p>Tailored investment solutions designed to provide liquidity, higher returns,<br/>and total flexibility.</p>
        </div>

        <div className="fd-features-grid">
          {/* Top Row */}
          <div className="fd-feature-card white-bg">
            <div className="fd-icon-circle-sm">
              <TrendingUpIcon />
            </div>
            <h3>Superior Interest Rates</h3>
            <p>Earn a fixed rate of interest throughout the tenure, unaffected by market fluctuations. Individuals above 60 years enjoy special higher interest rates, typically 0.25% to 0.75% extra, ensuring a comfortable retirement life.</p>
            <a href="#" className="fd-link">View Rate Charts <ArrowRight size={14} /></a>
          </div>

          <div className="fd-feature-card dark-bg tall-card">
            <Calendar size={24} color="#fca5a5" className="fd-icon-mb" />
            <h3>Flexible Tenure</h3>
            <p>Choose a duration that perfectly suits your financial goals — from as short as 7 days up to 10 years.</p>

          </div>

          {/* Bottom Row */}
          <div className="fd-feature-card white-bg">
            <div className="fd-icon-circle-sm">
              <WalletIcon />
            </div>
            <h3>Instant Liquidity</h3>
            <p>Need funds urgently? Avail up to 90% of your FD amount as a loan or overdraft facility without breaking the deposit entirely.</p>
          </div>


        </div>
      </section>

      {/* Bottom CTA */}
      <section className="fd-cta-section">
        <div className="fd-cta-box">
          <div className="fd-cta-content">
            <h2>Ready to Lock in Your Prosperity?</h2>
            <p>Join thousands of investors who trust Wealth Acumen for their secure growth. Start your Fixed Deposit journey today and watch your wealth grow with confidence.</p>
            <div className="fd-cta-actions">
              <button className="primary-btn-gold" onClick={() => navigate('/contact')}>Invest Now</button>
              <button className="secondary-btn-outline-white" onClick={() => window.open('https://wa.me/919325227357', '_blank')}>Talk to an Expert</button>
            </div>
          </div>
          <div className="fd-cta-icon-wrapper">
             <div className="giant-shield">
               <ShieldCheck size={80} color="#fef3c7" strokeWidth={1} />
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Simple icon helpers for the FD page
const BanknoteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fd-benefit-icon"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
);
const TrendingUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
const WalletIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
);

export default FixedDeposit;
