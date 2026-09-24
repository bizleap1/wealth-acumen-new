import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, TrendingUp, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './MutualFunds.css';

const SIF = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="mf-page-container">
      <PageHeader 
        titleFirst="Specialized Investment" 
        titleLast="Fund." 
        subtitle="Advanced Investment Strategies for Experienced Investors." 
      />

      {/* Hero Section */}
      <section className="service-hero">
        <div className="mf-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="hero-grid">
            <div className="hero-content">
              <span className="breadcrumb"><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link> &gt; <span className="active">SIF</span></span>
              <p className="hero-desc">
                <strong>Specialized Investment Fund (SIF)</strong> is a SEBI-regulated investment category that offers investors access to more specialized investment strategies than traditional mutual funds. SIFs may use strategies involving <strong>equity, debt, derivatives and long-short positions</strong>, depending on the investment strategy.
              </p>
              <Link to="/contact" className="btn-orange">
                Start Investing <TrendingUp size={18} />
              </Link>
            </div>
            <div className="hero-image-wrapper">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="SIF Investments" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mf-features-section">
        <div className="section-header-centered">
          <h2>Key Features</h2>
          <p>Why consider Specialized Investment Funds for your portfolio.</p>
        </div>

        <div className="mf-features-grid">
          <div className="mf-feature-card">
            <div className="mf-icon-wrapper">
              <ShieldCheck size={22} />
            </div>
            <h4>Regulated</h4>
            <p>SEBI-regulated investment product ensuring regulatory compliance.</p>
          </div>

          <div className="mf-feature-card">
            <div className="mf-icon-wrapper">
              <TrendingUp size={22} />
            </div>
            <h4>Minimum Investment</h4>
            <p>Minimum investment of generally ₹10 lakh.</p>
          </div>

          <div className="mf-feature-card">
            <div className="mf-icon-wrapper">
              <Layers size={22} />
            </div>
            <h4>Advanced Strategies</h4>
            <p>Access to specialized investment strategies including derivatives and long-short positions.</p>
          </div>
          
          <div className="mf-feature-card">
            <div className="mf-icon-wrapper">
              <CheckCircle2 size={22} />
            </div>
            <h4>Expert Management</h4>
            <p>Professionally managed by experienced fund managers for optimized performance.</p>
          </div>
        </div>
      </section>

      {/* Expert Insights Section */}
      <section className="mf-insights-section">
        <div className="mf-insights-container">
          <div className="mf-insights-quote-card">
            <p>"Who can consider SIF?"</p>
          </div>
          
          <div className="mf-insights-content">

            <h2>Designed for Experienced Investors</h2>
            <p>
              SIF may be suitable for investors who have a higher risk appetite, understand market fluctuations and are comfortable with more complex investment strategies.
            </p>
            
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(255,0,0,0.05)', borderLeft: '4px solid #ef4444', borderRadius: '4px' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444' }}><AlertTriangle size={20} /> Important</h4>
              <p style={{ marginTop: '10px', fontSize: '14px', color: '#4b5563' }}>SIF investments carry market and strategy-related risks. <strong>Returns are not guaranteed.</strong> Please read all scheme-related documents carefully before investing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="mf-cta-section">
        <div className="mf-cta-container">
          <h2 style={{ color: '#ffffff' }}>Want to know more about SIF?</h2>
          <p>
            Connect with Wealth Acumen to understand available strategies and their suitability for your investment objectives.
          </p>
          <div className="mf-cta-buttons">
            <button className="primary-btn-gold" onClick={() => navigate('/contact')}>
              Contact Advisor
            </button>
            <button className="secondary-btn-white" onClick={() => window.open('https://wa.me/919325227357', '_blank')}>
              WhatsApp Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SIF;
