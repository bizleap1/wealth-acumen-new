import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Briefcase, RefreshCw, Layers, DollarSign, ShieldCheck, Phone } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './Equity.css';

const Equity = () => {
  return (
    <div className="equity-page">
      
      <PageHeader 
        titleFirst="Equity" 
        titleLast="Stocks." 
        subtitle="Build wealth through ownership in India's leading companies." 
      />

      {/* Hero Section */}
      <section className="service-hero">
        <div className="equity-container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="breadcrumb">Home &gt; <span className="active">Equity</span></span>
              <p className="hero-desc">
                We assist you in your equity investment journey by helping you access tools, research insights, and educational content. Whether you are just starting out or already investing, we're here to support your growth.
              </p>
              <Link to="/contact" className="btn-orange">
                Get Started <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero-image-wrapper">
              <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop" alt="Equity trading" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Growth Potential Section */}
      <section className="growth-section">
        <div className="equity-container">
          <div className="growth-grid">
            <div className="growth-content">
              <h2 className="growth-title">Unlock Growth Potential<br/>with Equity Investing</h2>
              <div className="growth-line"></div>
              <p>
                Equity investing offers a powerful way to build wealth by owning shares of publicly listed companies in India. We help you navigate the dynamic world of the Indian stock market with informed strategies, research-backed recommendations, and personalized guidance.
              </p>
              <p>
                Whether you're a first-time investor or looking to diversify your portfolio, our equity solutions are designed to match your financial goals and risk profile. With a focus on long-term value creation, we bring clarity and confidence to your equity investment journey.
              </p>
            </div>
            <div className="growth-image-wrapper">
              <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop" alt="Bombay Stock Exchange" />
              <div className="image-overlay-text">
                <h4>Institutional Wisdom</h4>
                <p>Partnering with India's growth story since inception.</p>
              </div>
              <div className="floating-green-icon">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="equity-container">
          <div className="features-header">
            <h2>Key Features of Equity</h2>
            <p>Superior returns through disciplined investing in India's most promising companies.</p>
          </div>
          
          <div className="features-grid">
            {/* Feature 1 */}
            <div className="equity-feature-card">
              <div className="feature-icon-wrapper">
                <TrendingUp size={22} />
              </div>
              <h4>High Growth</h4>
              <p>Potential for significant capital appreciation over the long term.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="equity-feature-card">
              <div className="feature-icon-wrapper">
                <Briefcase size={22} />
              </div>
              <h4>Ownership</h4>
              <p>Direct stake in top-tier companies listed on Indian exchanges.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="equity-feature-card">
              <div className="feature-icon-wrapper">
                <RefreshCw size={22} />
              </div>
              <h4>Liquidity</h4>
              <p>Easy entry and exit through seamless market trading platforms.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="equity-feature-card">
              <div className="feature-icon-wrapper">
                <Layers size={22} />
              </div>
              <h4>Diversification</h4>
              <p>Spread your risk across multiple sectors and industry leaders.</p>
            </div>
            
            {/* Feature 5 */}
            <div className="equity-feature-card">
              <div className="feature-icon-wrapper">
                <DollarSign size={22} />
              </div>
              <h4>Dividends</h4>
              <p>Earn a share of profits through regular company dividend payouts.</p>
            </div>
            
            {/* Feature 6 */}
            <div className="equity-feature-card">
              <div className="feature-icon-wrapper">
                <ShieldCheck size={22} />
              </div>
              <h4>Regulated</h4>
              <p>Transparent and secure investing under strict SEBI guidelines.</p>
            </div>
            
            {/* Big Dark Card */}
            <div className="long-term-card">
              <h3>Ideal for Long-Term Wealth</h3>
              <p>Perfect for investors seeking wealth creation over a 5-10 year horizon through the power of compounding.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="equity-container">
          <div className="cta-box">
            <h2>Ready to start your investment journey?</h2>
            <p>Our experts are ready to help you build a portfolio that stands the test of time.</p>
            
            <div className="cta-actions">
              <Link to="/contact" className="btn-dark">
                Contact an Expert <Phone size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Equity;
