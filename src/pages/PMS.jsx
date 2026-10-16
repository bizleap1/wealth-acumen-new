import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  TrendingUp, 
  Briefcase, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  PieChart, 
  FileText, 
  UserCheck, 
  ArrowRight
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import './PMS.css';

const PMS = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="pms-page-container">
      <PageHeader 
        titleFirst="Portfolio Management" 
        titleLast="Service (PMS)." 
        subtitle="Personalized, professional investment management designed for high-net-worth investors." 
      />

      {/* Hero Section */}
      <section className="pms-hero">
        <div className="pms-hero-container">
          <div className="pms-hero-grid">
            <div className="pms-hero-content">
              <span className="pms-breadcrumb">
                <Link to="/">Home</Link> &gt; <Link to="/services">Services</Link> &gt; <span className="active">PMS</span>
              </span>
              <p className="pms-hero-desc">
                <strong>Portfolio Management Services (PMS)</strong> is a specialized, SEBI-regulated investment solution tailored for high-net-worth investors who seek a more personalized wealth creation journey.
              </p>
              <p className="pms-hero-desc">
                Unlike mutual funds where capital is pooled with other investors, a PMS builds an <strong>individualized portfolio</strong> where the underlying securities—equities, debt instruments, and bonds—are held directly in your designated account.
              </p>
              <div className="pms-hero-cta">
                <Link to="/contact" className="pms-btn-primary">
                  Start Investing <TrendingUp size={18} />
                </Link>
                <Link to="/blogs?blog=9" className="pms-btn-secondary">
                  Read PMS Guide <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="pms-hero-image-wrapper">
              <img 
                src="/images/pms_blog.jpg" 
                alt="Portfolio Management Services Consultation" 
                className="pms-hero-image" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="pms-stats-ribbon">
        <div className="pms-stats-container">
          <div className="pms-stat-item">
            <div className="pms-stat-value">₹50 Lakh</div>
            <div className="pms-stat-label">Minimum Investment (SEBI)</div>
          </div>
          <div className="pms-stat-item">
            <div className="pms-stat-value">Direct</div>
            <div className="pms-stat-label">Securities Demat Ownership</div>
          </div>
          <div className="pms-stat-item">
            <div className="pms-stat-value">3 Types</div>
            <div className="pms-stat-label">Discretionary, Non-Discretionary, Advisory</div>
          </div>
          <div className="pms-stat-item">
            <div className="pms-stat-value">100%</div>
            <div className="pms-stat-label">SEBI Regulated Framework</div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="pms-features-section">
        <div className="pms-section-header">
          <h2>Why Choose Portfolio Management Services?</h2>
          <p>
            Experience institutional-grade investment management customized to your specific wealth objectives and risk appetite.
          </p>
        </div>

        <div className="pms-features-grid">
          <div className="pms-feature-card">
            <div className="pms-icon-box">
              <UserCheck size={26} />
            </div>
            <h3>Professional Management</h3>
            <p>
              Your portfolio is steered by an experienced research and fund management team with continuous active market monitoring.
            </p>
          </div>

          <div className="pms-feature-card">
            <div className="pms-icon-box">
              <Briefcase size={26} />
            </div>
            <h3>Direct Asset Ownership</h3>
            <p>
              Unlike mutual fund units, shares and debt instruments are directly credited and held in your designated demat account.
            </p>
          </div>

          <div className="pms-feature-card">
            <div className="pms-icon-box">
              <Layers size={26} />
            </div>
            <h3>Personalized Mandate</h3>
            <p>
              Investment strategies can be aligned with your agreed liquidity requirements, risk tolerance, and tax considerations.
            </p>
          </div>

          <div className="pms-feature-card">
            <div className="pms-icon-box">
              <FileText size={26} />
            </div>
            <h3>Complete Transparency</h3>
            <p>
              Gain granular visibility into every holding, dividend credit, and transaction executed in your portfolio in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Main Types of PMS Section */}
      <section className="pms-types-section">
        <div className="pms-section-header">
          <h2>The Three Main Types of PMS</h2>
          <p>
            Choose the level of involvement and control that best matches your investment style and schedule.
          </p>
        </div>

        <div className="pms-types-grid">
          {/* Discretionary */}
          <div className="pms-type-card">
            <span className="pms-type-badge badge-blue">Most Popular</span>
            <h3>1. Discretionary PMS</h3>
            <p className="pms-type-desc">
              The portfolio manager has full authority to make investment and rebalancing decisions on your behalf within the agreed strategy mandate.
            </p>
            <ul className="pms-type-highlights">
              <li><CheckCircle2 size={16} /> Zero hassle — no need to approve each trade</li>
              <li><CheckCircle2 size={16} /> Quick reaction to market opportunities</li>
              <li><CheckCircle2 size={16} /> Best suited for busy executives & business owners</li>
            </ul>
          </div>

          {/* Non-Discretionary */}
          <div className="pms-type-card">
            <span className="pms-type-badge badge-amber">Collaborative</span>
            <h3>2. Non-Discretionary PMS</h3>
            <p className="pms-type-desc">
              The portfolio manager suggests investment decisions and strategies, but transactions are carried out only after your explicit approval.
            </p>
            <ul className="pms-type-highlights">
              <li><CheckCircle2 size={16} /> You maintain final decision power for every trade</li>
              <li><CheckCircle2 size={16} /> Manager conducts research and timing analysis</li>
              <li><CheckCircle2 size={16} /> Ideal for investors who want hands-on control</li>
            </ul>
          </div>

          {/* Advisory */}
          <div className="pms-type-card">
            <span className="pms-type-badge badge-emerald">Consultative</span>
            <h3>3. Advisory PMS</h3>
            <p className="pms-type-desc">
              The portfolio manager acts purely as a consultant, delivering strategic advice and research while you handle all executions yourself.
            </p>
            <ul className="pms-type-highlights">
              <li><CheckCircle2 size={16} /> Expert research-backed recommendations</li>
              <li><CheckCircle2 size={16} /> Execution managed independently by the client</li>
              <li><CheckCircle2 size={16} /> Tailored for experienced market participants</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="pms-comparison-section">
        <div className="pms-section-header">
          <h2>Mutual Funds vs. PMS</h2>
          <p>
            Understanding key differences will help you decide which vehicle aligns with your capital and wealth goals.
          </p>
        </div>

        <div className="pms-table-wrapper">
          <table className="pms-compare-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Mutual Funds</th>
                <th>PMS (Portfolio Management Service)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Minimum Investment</td>
                <td>Often starts from ₹500 - ₹5,000</td>
                <td><strong>Generally ₹50 Lakh</strong> (SEBI Mandated)</td>
              </tr>
              <tr>
                <td>How Money is Managed</td>
                <td>Money from many investors is pooled together</td>
                <td><strong>Separate, individualized portfolio</strong> for each client</td>
              </tr>
              <tr>
                <td>Portfolio Ownership</td>
                <td>Investor holds mutual fund units</td>
                <td>Investor <strong>directly owns underlying securities</strong> in demat</td>
              </tr>
              <tr>
                <td>Degree of Personalization</td>
                <td>Standard scheme objective for all unit holders</td>
                <td><strong>Customizable strategy</strong> aligned to client preferences</td>
              </tr>
              <tr>
                <td>Transparency</td>
                <td>Monthly / periodic portfolio disclosure</td>
                <td><strong>Real-time, granular visibility</strong> of all transactions</td>
              </tr>
              <tr>
                <td>Fee Structure</td>
                <td>Standard Total Expense Ratio (TER)</td>
                <td>Management fee & agreed performance-linked fee structures</td>
              </tr>
              <tr>
                <td>Risk Profile</td>
                <td>Broadly diversified across the scheme category</td>
                <td>Can adopt <strong>high-conviction, focused strategies</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Suitability Section */}
      <section className="pms-suitability-section">
        <div className="pms-suitability-container">
          <div className="pms-suitability-quote">
            <h3>"Is Portfolio Management Service the right choice for your wealth?"</h3>
            <p>
              PMS is neither inherently better nor worse than mutual funds. It is a specialized wealth vehicle designed specifically for investors with substantial capital who demand higher personalization, direct ownership, and institutional active management.
            </p>
          </div>

          <div className="pms-suitability-content">
            <ul className="pms-criteria-list">
              <li className="pms-criteria-item">
                <div className="pms-criteria-check">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4>Substantial Investible Surplus</h4>
                  <p>You have at least ₹50 lakh available for investment without compromising short-term liquidity.</p>
                </div>
              </li>

              <li className="pms-criteria-item">
                <div className="pms-criteria-check">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4>Long-Term Wealth Horizon</h4>
                  <p>You possess a time horizon of 3–5+ years to allow high-conviction strategies to compound.</p>
                </div>
              </li>

              <li className="pms-criteria-item">
                <div className="pms-criteria-check">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4>Appreciation for Direct Ownership</h4>
                  <p>You prefer having stocks and bonds registered directly in your name rather than pooled fund units.</p>
                </div>
              </li>

              <li className="pms-criteria-item">
                <div className="pms-criteria-check">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4>Comfort with Market Volatility</h4>
                  <p>You understand that equity markets fluctuate and can navigate cycles without panic redemptions.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Risk Notice & SEBI Disclaimer */}
      <section className="pms-disclaimer-section">
        <div className="pms-disclaimer-box">
          <div className="pms-disclaimer-title">
            <AlertTriangle size={20} />
            <span>Important Risk Notice & Regulatory Disclaimer</span>
          </div>
          <p className="pms-disclaimer-text">
            Investments in securities are subject to market risks, including the potential loss of principal. Portfolio Management Services (PMS) do not guarantee returns or capital protection. Performance may vary significantly across managers and strategies. Investors should carefully review the Disclosure Document, fee schedules, and investment mandates before entering into a PMS agreement.
          </p>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="pms-cta-section">
        <div className="pms-cta-container">
          <h2>Ready to Build a Tailored Investment Portfolio?</h2>
          <p>
            Consult with Wealth Acumen's wealth advisors to review your financial goals and evaluate suitable PMS strategies tailored to your wealth creation journey.
          </p>
          <div className="pms-cta-buttons">
            <button className="btn-cta-gold" onClick={() => navigate('/contact')}>
              Book Consultation
            </button>
            <button 
              className="btn-cta-whatsapp" 
              onClick={() => window.open('https://wa.me/919325227357?text=Hello%20Wealth%20Acumen,%20I%20would%20like%20to%20know%20more%20about%20PMS%20(Portfolio%20Management%20Services).', '_blank')}
            >
              <FaWhatsapp size={20} /> WhatsApp Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PMS;
