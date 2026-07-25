import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Layers, RefreshCcw, ShieldCheck, TrendingUp, Compass, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './MutualFunds.css';

const MutualFunds = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="mf-page-container">
      <PageHeader 
        titleFirst="Mutual" 
        titleLast="Funds." 
        subtitle="Tailored investment solutions backed by expert guidance." 
      />

      {/* Hero Section */}
      <section className="service-hero">
        <div className="mf-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="hero-grid">
            <div className="hero-content">
              <span className="breadcrumb"><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link> &gt; <span className="active">Mutual Funds</span></span>
              <p className="hero-desc">
                We help you navigate the complexities of wealth creation through disciplined, goal-based strategies, offering diversified exposure to different asset classes with the convenience of professional fund management.
              </p>
              <Link to="/contact" className="btn-orange">
                Start Investing <TrendingUp size={18} />
              </Link>
            </div>
            <div className="hero-image-wrapper">
              <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop" alt="Mutual Funds" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Smart Investing Section */}
      <section className="mf-smart-investing">
        <div className="mf-smart-text">
          <h2>Invest Smartly with Mutual Funds</h2>
          <p>
            Mutual funds are one of the most efficient and accessible ways to grow your wealth, offering diversified exposure to different asset classes with the convenience of professional fund management. At Wealth Acumen, we make mutual fund investing simple, transparent, and aligned with your personal financial goals.
          </p>
          <p>
            We offer end-to-end support throughout your investment journey—from understanding your risk appetite to selecting the right funds. Whether you're aiming for long-term capital growth, steady income, or tax-saving opportunities, we help you choose from a wide range of mutual funds, including equity, debt, hybrid, and ELSS.
          </p>
        </div>

        <div className="mf-stats-card">
          <div className="stat-block border-bottom">
            <h3>15.4%</h3>
            <span>AVG. ANNUALIZED RETURN (10Y PERIOD)</span>
          </div>
          <div className="stat-block">
            <h3>10k+</h3>
            <span>ACTIVE PORTFOLIOS MANAGED</span>
          </div>
          
          {/* Floating Green Circle */}
          <div className="floating-green-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mf-features-section">
        <div className="section-header-centered">
          <h2>Key Features of Mutual Funds</h2>
          <p>Why choosing the right fund structure matters for your future.</p>
        </div>

        <div className="mf-features-grid">
          {/* Feature 1 */}
          <div className="mf-feature-card">
            <div className="mf-icon-wrapper">
              <FileText size={22} />
            </div>
            <h4>Personalized Planning</h4>
            <p>Strategic portfolio planning based on your specific life goals and risk tolerance profile.</p>
          </div>

          {/* Feature 2 */}
          <div className="mf-feature-card">
            <div className="mf-icon-wrapper">
              <Layers size={22} />
            </div>
            <h4>Wide Fund Variety</h4>
            <p>Access to a comprehensive suite of Equity, Debt, Hybrid, and Tax-saving ELSS options.</p>
          </div>

          {/* Feature 3 */}
          <div className="mf-feature-card">
            <div className="mf-icon-wrapper">
              <RefreshCcw size={22} />
            </div>
            <h4>Flexible Modes</h4>
            <p>Choose between Systematic Investment Plans (SIPs) or lump sum investments as per your cash flow.</p>
          </div>

          {/* Feature 4 */}
          <div className="mf-feature-card">
            <div className="mf-icon-wrapper">
              <ShieldCheck size={22} />
            </div>
            <h4>Professional Management</h4>
            <p>Your investments are handled by top-tier AMCs with proven track records and institutional research.</p>
          </div>

          {/* Feature 5 */}
          <div className="mf-feature-card">
            <div className="mf-icon-wrapper">
              <Compass size={22} />
            </div>
            <h4>Transparency</h4>
            <p>Total transparency and regulation under SEBI guidelines for secure wealth management.</p>
          </div>

          {/* Feature 6 */}
          <div className="mf-feature-card">
            <div className="mf-icon-wrapper">
              <TrendingUp size={22} />
            </div>
            <h4>Wealth Creation</h4>
            <p>Focus on long-term compounding effects to ensure your financial independence and growth.</p>
          </div>
        </div>
      </section>

      {/* Expert Insights Section */}
      <section className="mf-insights-section">
        <div className="mf-insights-container">
          <div className="mf-insights-quote-card">
            <p>"Sustainable growth is a result of consistent nurturing and expert care."</p>
          </div>
          
          <div className="mf-insights-content">
            <span className="subtitle-gold">EXPERT INSIGHTS</span>
            <h2>Strategic Guidance for Modern Investors</h2>
            <p>
              Our recommendations are backed by in-depth research and data-driven insights. We understand that every investor's journey is unique, which is why we prioritize a consultative approach over a transactional one.
            </p>
            
            <ul className="insights-checklist">
              <li>
                <CheckCircle2 className="check-icon" size={24} />
                <div>
                  <h4>Data-Driven Selection</h4>
                  <p>We use quantitative filters to select funds that consistently outperform their benchmarks.</p>
                </div>
              </li>
              <li>
                <CheckCircle2 className="check-icon" size={24} />
                <div>
                  <h4>Continuous Monitoring</h4>
                  <p>We regularly review your portfolio to ensure it stays aligned with market dynamics and your goals.</p>
                </div>
              </li>
            </ul>
            
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="mf-cta-section">
        <div className="mf-cta-container">
          <h2 style={{ color: '#ffffff' }}>Ready to Start Your Journey?</h2>
          <p>
            Join thousands of investors who trust Wealth Acumen for their mutual fund investments. Expert advice is just a click away.
          </p>
          <div className="mf-cta-buttons">
            <button className="primary-btn-gold" onClick={() => navigate('/contact')}>
              Invest Now
            </button>
            <button className="secondary-btn-white" onClick={() => window.open('https://wa.me/919325227357', '_blank')}>
              Contact Advisor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MutualFunds;
