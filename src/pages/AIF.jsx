import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, TrendingUp, CheckCircle2, AlertTriangle, Layers, Award, Briefcase } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './MutualFunds.css';

const AIF = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="mf-page-container">
      <PageHeader 
        titleFirst="Alternative Investment" 
        titleLast="Fund (AIF)." 
        subtitle="Sophisticated pooled investment strategies for High Net Worth & Institutional Investors." 
      />

      {/* Hero Section */}
      <section className="service-hero">
        <div className="mf-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="hero-grid">
            <div className="hero-content">
              <span className="breadcrumb">
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link> &gt;{' '}
                <Link to="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link> &gt;{' '}
                <span className="active">AIF</span>
              </span>
              <p className="hero-desc">
                <strong>Alternative Investment Fund (AIF)</strong> is a privately pooled investment vehicle established in India and regulated under <strong>SEBI (AIF) Regulations, 2012</strong>. AIFs collect funds from sophisticated domestic and global investors to invest in high-potential non-traditional assets, including <strong>startups, private equity, private credit, real estate, and long-short hedge strategies</strong>.
              </p>
              <Link to="/contact" className="btn-orange">
                Schedule Consultation <TrendingUp size={18} />
              </Link>
            </div>
            <div className="hero-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                alt="Alternative Investment Fund Architecture" 
                className="hero-image" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="mf-features-section">
        <div className="section-header-centered">
          <h2>Key Features of AIF</h2>
          <p>Why sophisticated investors allocate capital to Alternative Investment Funds.</p>
        </div>

        <div className="mf-features-grid">
          <div className="mf-feature-card">
            <div className="mf-icon-wrapper">
              <ShieldCheck size={22} />
            </div>
            <h4>SEBI Regulated</h4>
            <p>Governed by strict SEBI (Alternative Investment Funds) Regulations, 2012 for investor transparency and governance.</p>
          </div>

          <div className="mf-feature-card">
            <div className="mf-icon-wrapper">
              <Award size={22} />
            </div>
            <h4>₹1 Crore Minimum Ticket</h4>
            <p>Designed for HNIs, family offices, and institutional investors with minimum statutory commitment of ₹1 Crore.</p>
          </div>

          <div className="mf-feature-card">
            <div className="mf-icon-wrapper">
              <Layers size={22} />
            </div>
            <h4>Uncorrelated Alpha</h4>
            <p>Access high-growth private markets, pre-IPO opportunities, and specialized strategies with low public market correlation.</p>
          </div>
          
          <div className="mf-feature-card">
            <div className="mf-icon-wrapper">
              <Briefcase size={22} />
            </div>
            <h4>Institutional Management</h4>
            <p>Led by seasoned fund managers with specialized sector focus, operational expertise, and hands-on portfolio stewardship.</p>
          </div>
        </div>
      </section>

      {/* SEBI Categories Section */}
      <section className="mf-features-section" style={{ backgroundColor: '#ffffff', paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="section-header-centered">
          <h2>SEBI AIF Classification</h2>
          <p>Understanding the three distinct categories of Alternative Investment Funds.</p>
        </div>

        <div className="mf-features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="mf-feature-card" style={{ textAlign: 'left' }}>
            <div className="mf-icon-wrapper" style={{ background: '#fef3c7', color: '#b45309' }}>
              <TrendingUp size={22} />
            </div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Category I AIF</h4>
            <p style={{ fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>Positive Economic Spillover</p>
            <p>Invests in startups, early-stage enterprises, social ventures, SMEs, and infrastructure that the government considers economically beneficial. Includes <strong>Venture Capital Funds (VCF)</strong>, <strong>Angel Funds</strong>, and <strong>Infrastructure Funds</strong>.</p>
          </div>

          <div className="mf-feature-card" style={{ textAlign: 'left' }}>
            <div className="mf-icon-wrapper" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
              <Layers size={22} />
            </div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Category II AIF</h4>
            <p style={{ fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>Growth & Private Debt</p>
            <p>Funds that do not undertake leverage other than for meeting day-to-day operational requirements. Primarily includes <strong>Private Equity (PE) Funds</strong>, <strong>Private Debt / Credit Funds</strong>, and <strong>Real Estate Funds</strong>.</p>
          </div>

          <div className="mf-feature-card" style={{ textAlign: 'left' }}>
            <div className="mf-icon-wrapper" style={{ background: '#f3e8ff', color: '#7e22ce' }}>
              <CheckCircle2 size={22} />
            </div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Category III AIF</h4>
            <p style={{ fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>Hedge & Complex Trading</p>
            <p>Funds that deploy diverse, complex trading strategies and may employ leverage (including listed/unlisted derivatives) to generate short-term or long-term alpha. Includes <strong>Hedge Funds</strong> and <strong>PIPE Funds</strong>.</p>
          </div>
        </div>
      </section>

      {/* Expert Insights Section */}
      <section className="mf-insights-section">
        <div className="mf-insights-container">
          <div className="mf-insights-quote-card">
            <p>"Who Should Consider AIF?"</p>
          </div>
          
          <div className="mf-insights-content">
            <h2>Tailored for Accredited & HNI Investors</h2>
            <p>
              AIFs are suitable for experienced investors seeking portfolio diversification beyond traditional listed securities and fixed income. They provide access to growth stories in private equity, pre-IPO financing, venture capital, and structured private debt.
            </p>
            
            <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid #ef4444', borderRadius: '6px' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', margin: '0 0 6px', fontSize: '1rem', fontWeight: 700 }}>
                <AlertTriangle size={20} /> Regulatory & Risk Notice
              </h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#4b5563', lineHeight: '1.6' }}>
                AIF investments are subject to market risks, illiquidity, and commitment lock-in periods. <strong>Returns are not guaranteed.</strong> Investors should carefully read the Private Placement Memorandum (PPM) and consult certified wealth advisors before committing capital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="mf-cta-section">
        <div className="mf-cta-container">
          <h2 style={{ color: '#ffffff' }}>Explore AIF Opportunities with Wealth Acumen</h2>
          <p>
            Connect with our advisory desk to review curated Category I, II, and III AIF strategies aligned with your wealth goals.
          </p>
          <div className="mf-cta-buttons">
            <button className="primary-btn-gold" onClick={() => navigate('/contact')}>
              Contact Advisor
            </button>
            <button className="secondary-btn-white" onClick={() => window.open('https://wa.me/919325227357', '_blank')}>
              WhatsApp Us (+91 9325227357)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIF;
