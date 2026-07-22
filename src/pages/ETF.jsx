import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, TrendingUp, RefreshCw, BarChart3, PieChart, Wallet } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './ETF.css';

const ETF = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="etf-page-container">
      <PageHeader 
        titleFirst="Exchange Traded" 
        titleLast="Funds." 
        subtitle="Combine the flexibility of stock trading with the diversification of mutual funds." 
      />

      {/* Hero Section */}
      <section className="service-hero">
        <div className="etf-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="hero-grid">
            <div className="hero-content">
              <span className="breadcrumb"><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link> &gt; <span className="active">ETFs</span></span>
              <p className="hero-desc">
                Discover a sophisticated way to diversify your portfolio. We help you access the performance of top indices, sectors, and asset classes with the ease of buying a single stock.
              </p>
              <a href="#" className="btn-orange">
                Start Investing <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="hero-image-wrapper">
              <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop" alt="ETF trading" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="etf-info-section">
        <div className="etf-info-text-wrapper">
          <h2>Effortless Investing with ETFs – Diversify Smartly</h2>
          <p>
            Exchange Traded Funds (ETFs) are a smart choice for investors seeking low-cost, diversified exposure to a wide range of assets. We help you select the right ETFs that align with your investment goals—whether you're looking for growth, stability, or inflation protection.
          </p>
          <p>
            From <strong>equity-based ETFs</strong> that mirror indices like Nifty or Sensex, to <strong>debt ETFs</strong>, <strong>gold ETFs</strong>, and <strong>Bharat Bond ETFs</strong>, we guide you in building a portfolio that's transparent, cost-effective, and easy to manage.
          </p>
          <div className="amfi-badge">
            <CheckCircle2 size={20} color="#d4af37" />
            <span>AMFI Registered Mutual Fund Distributor</span>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="etf-features-section">
        <div className="section-header-centered">
          <h2>Key Features of ETF's</h2>
          <p>Why sophisticated investors are shifting their capital toward exchange traded funds.</p>
        </div>

        <div className="etf-features-grid">
          <div className="etf-feature-card">
            <div className="etf-icon-circle">
              <TrendingUp size={24} />
            </div>
            <h4>Low-Cost Investing</h4>
            <p>Benefit from minimal expense ratios compared to traditional active funds.</p>
          </div>
          
          <div className="etf-feature-card">
            <div className="etf-icon-circle">
              <BarChart3 size={24} />
            </div>
            <h4>Real-Time Trading</h4>
            <p>Buy and sell ETFs on major exchanges throughout the day, just like stocks.</p>
          </div>
          
          <div className="etf-feature-card">
            <div className="etf-icon-circle">
              <RefreshCw size={24} />
            </div>
            <h4>High Liquidity</h4>
            <p>Enjoy the flexibility of easy entry and exit with high trading volumes.</p>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="etf-highlights-section">
        <div className="etf-highlights-grid">
          {/* Dark Blue Box */}
          <div className="highlight-box dark-blue-box">
            <div className="highlight-content">
              <h3 style={{ color: '#ffffff' }}>Unprecedented Transparency</h3>
              <p>
                Know exactly what you own. ETFs provide daily disclosure of their holdings, ensuring you're never in the dark about your investment allocations.
              </p>
              <ul className="highlight-checklist">
                <li><CheckCircle2 size={16} /> Daily performance tracking</li>
                <li><CheckCircle2 size={16} /> Clear underlying asset exposure</li>
              </ul>
            </div>
            <div className="highlight-image-wrapper">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Data visualization dashboard" />
            </div>
          </div>

          {/* Orange Box */}
          <div className="highlight-box orange-box">
            <h3>Variety of Options</h3>
            <p>Choose from Equity, Debt, Gold, and Bharat Bond ETFs to fit your strategy.</p>
            
            <div className="inner-light-box">
              <h4>Ideal for Passive Investors</h4>
              <p>Focus on long term goals with minimal daily intervention.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="etf-cta-section">
        <div className="etf-cta-container">
          <h2>Ready to grow your wealth?</h2>
          <p>
            Start your ETF journey with Wealth Acumen today. Our experts will guide you through selecting the most efficient funds for your financial future.
          </p>
          <div className="etf-cta-buttons">
            <button className="primary-btn-gold">
              Contact an Advisor
            </button>
            <button className="whatsapp-btn-white">
              <div className="whatsapp-icon-green">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </div>
              Chat with us on WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ETF;
