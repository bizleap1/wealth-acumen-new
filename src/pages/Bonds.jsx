import React from 'react';
import { ArrowRight, CheckCircle2, FileText, Target, Building2, Landmark, Banknote, ShieldCheck, LineChart, Calendar } from 'lucide-react';
import './Bonds.css';

const Bonds = () => {
  return (
    <div className="bonds-page">
      {/* Hero Section */}
      <section className="bonds-hero">
        <div className="bonds-hero-content">
          <div className="bonds-hero-text">
            <h1>Bonds: Secure Your <span className="highlight-gold">Financial Legacy</span></h1>
            <p>
              For conservative investors seeking stability, we offer expert guidance on government, corporate, and Bharat bonds. Achieve a balanced risk-return profile through strategic fixed-income positioning.
            </p>
            <div className="bonds-hero-actions">
              <button className="primary-btn-gold">
                Schedule Consultation <ArrowRight size={16} style={{marginLeft: '8px'}}/>
              </button>
              <button className="secondary-btn-outline">
                View Yield Rates
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Stable Returns Section */}
      <section className="bonds-stable-section">
        <div className="bonds-stable-container">
          <div className="bonds-grid-left">
            <div className="bond-type-card">
              <div className="bond-icon-circle"><Landmark size={20} color="#334155" /></div>
              <h4>Government</h4>
              <p>Sovereign-backed securities with near-zero default risk.</p>
            </div>
            <div className="bond-type-card">
              <div className="bond-icon-circle blue"><Building2 size={20} color="#2563eb" /></div>
              <h4>PSU Bonds</h4>
              <p>Public sector undertakings offering stable capital growth.</p>
            </div>
            <div className="bond-type-card">
              <div className="bond-icon-circle gold"><Target size={20} color="#d4af37" /></div>
              <h4>Corporate</h4>
              <p>High-yield opportunities from top-rated blue chip firms.</p>
            </div>
            <div className="bond-type-card">
              <div className="bond-icon-circle"><Banknote size={20} color="#334155" /></div>
              <h4>Tax-Free</h4>
              <p>Optimized portfolios to maximize net interest income.</p>
            </div>
          </div>
          <div className="bonds-text-right">
            <h2>Stable Returns, Lower Risk -<br/>Build a Secure Base</h2>
            <p className="lead-text">
              Bonds are a reliable choice for conservative investors seeking steady returns with lower risk. At Wealth Acumen, we guide you in building a fixed-income portfolio through carefully selected <strong>government bonds, corporate bonds, and Bharat Bonds</strong> that align with your financial goals.
            </p>
            <p>
              Whether your objective is regular interest income, capital preservation, or diversifying beyond equities, our bond advisory services are tailored to provide stability and security.
            </p>
            <ul className="bonds-checklist">
              <li><CheckCircle2 size={18} color="#d4af37" /> Institutional grade credit analysis for every bond.</li>
              <li><CheckCircle2 size={18} color="#d4af37" /> Maturity laddering strategies for liquidity management.</li>
            </ul>
          </div>
        </div>
        <div className="whatsapp-floating-bubble">
           <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
        </div>
      </section>

      {/* Institutional Features Section */}
      <section className="bonds-features-section">
        <div className="bonds-section-header">
          <h2>Institutional-Grade Bond Features</h2>
          <p>Our selection process prioritizes safety, liquidity, and tax efficiency to<br/>ensure your portfolio performs across all market cycles.</p>
        </div>

        <div className="bonds-features-grid">
          {/* Top Row */}
          <div className="bonds-feature-wide">
            <div className="bf-wide-content">
              <h3>Low-Risk Investment<br/>Infrastructure</h3>
              <p>Ideal for conservative investors, our bond selections focus on high-rated instruments (AAA/AA+) that prioritize capital safety above all else.</p>
              <a href="#" className="bf-link">Explore Safety Ratings <ArrowRight size={14} /></a>
            </div>
            <div className="bf-wide-image">
               <img src="/images/bonds-chart.png" alt="Financial Dashboard" />
            </div>
          </div>

          <div className="bonds-feature-card dark-bg">
            <Calendar size={24} color="#d4af37" className="bf-icon" />
            <h3>Regular Interest Income</h3>
            <p>Generate a predictable stream of passive income through quarterly and annual coupon payments.</p>
            <div className="bf-footer-text">Next Coupon Distribution: 15 Oct</div>
          </div>

          {/* Bottom Row */}
          <div className="bonds-feature-card orange-bg">
            <ShieldCheck size={24} color="#111827" className="bf-icon" />
            <h3>Capital Preservation</h3>
            <p>Reduced market volatility ensures your principal remains intact even during equity market downturns.</p>
          </div>

          <div className="bonds-feature-card light-bg">
            <FileText size={24} color="#111827" className="bf-icon" />
            <h3>Credit-Rating Selection</h3>
            <p>We perform deep-dive analysis into issuer balance sheets to ensure creditworthiness beyond mere ratings.</p>
          </div>

          <div className="bonds-feature-card light-bg">
            <LineChart size={24} color="#111827" className="bf-icon" />
            <h3>Tax-Efficient Choices</h3>
            <p>Strategically selected government-backed bonds that offer tax advantages for high-net-worth individuals.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bonds-cta-section">
        <div className="bonds-cta-box">
          <h2>Ready to Stabilize Your Portfolio?</h2>
          <p>Our bond experts are ready to design a custom fixed-income<br/>strategy that protects your wealth and yields consistent returns.</p>
          <div className="bonds-cta-actions">
            <button className="primary-btn-gold">Book a Strategy Call</button>
            <button className="secondary-btn-outline-white">Download Bond Brochure</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bonds;
