import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  Smartphone, 
  Layers, 
  FileText, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './InvestmentResources.css';

const INVESTMENT_RESOURCES = [
  {
    category: 'Angel One Portals',
    subtitle: 'Official Trading & Investment Gateways via Wealth Acumen Channel Partnership',
    items: [
      {
        id: 'angel-app-login',
        title: 'Angel One App Login',
        badge: 'Official Trading App',
        badgeColor: 'blue',
        description: 'Access your integrated Angel One trading and demat account. Trade equities, F&O, commodities, ETFs, and track your active portfolio in real-time.',
        url: 'https://angel-one.onelink.me/Wjgr/h9fay40r',
        buttonText: 'Open Angel One App Login',
        buttonStyle: 'primary-angel',
        icon: Smartphone,
        features: [
          'Direct Demat & Trading Login',
          'Real-time Market Watch & Charts',
          'Instant Order Placement & Execution',
          'Multi-Asset Portfolio Tracking'
        ]
      },
      {
        id: 'angel-mf-login',
        title: 'Demat-Free MF Investment Login',
        badge: 'Mutual Fund Gateway',
        badgeColor: 'emerald',
        description: 'Convenient mutual fund investment portal without requiring an active demat account. Invest in SIPs, lumpsum, and switch funds with seamless bank integration.',
        url: 'https://angel-one.onelink.me/Wjgr/wcqvcyi6',
        buttonText: 'Access Demat-Free MF Login',
        buttonStyle: 'primary-emerald',
        icon: Layers,
        features: [
          'No Demat Maintenance Required',
          'Quick SIP & Lumpsum Transactions',
          'Paperless Online Mandates',
          'Backed by Angel One Infrastructure'
        ]
      }
    ]
  },
  {
    category: 'Mutual Fund Regulatory & Educational Resources',
    subtitle: 'Verified Official Industry Resources from AMFI India',
    items: [
      {
        id: 'amfi-factsheet',
        title: 'AMFI Mutual Fund Factsheets',
        badge: 'Official Industry Data',
        badgeColor: 'amber',
        description: 'Download verified monthly mutual fund factsheets, scheme portfolio compositions, fund manager track records, and historical asset allocations across all AMCs.',
        url: 'https://www.amfiindia.com/online-center/download-factsheets',
        buttonText: 'View AMFI Factsheets',
        buttonStyle: 'primary-amber',
        icon: FileText,
        features: [
          'Monthly AMC Portfolio Disclosures',
          'Sectoral & Stock Holdings Breakdown',
          'Scheme Riskometers & Benchmarks',
          'Standardized AMFI Reporting'
        ]
      },
      {
        id: 'amfi-taxation',
        title: 'Mutual Fund Taxation Guide',
        badge: 'Statutory Tax Regime',
        badgeColor: 'purple',
        description: 'Official tax rules, capital gains taxation regimes (STCG and LTCG), holding periods, and indexation updates published by the Association of Mutual Funds in India.',
        url: 'https://www.amfiindia.com/investor/knowledge-center-info?zoneName=TaxRegimeForMutualFunds',
        buttonText: 'Read MF Taxation Guide',
        buttonStyle: 'primary-purple',
        icon: ShieldCheck,
        features: [
          'Equity vs Debt Capital Gains Rules',
          'Tax Slabs & Holding Periods',
          'TDS & Investor Compliance Guidelines',
          'Updated Budget & Finance Act Rules'
        ]
      }
    ]
  }
];

const InvestmentResources = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="resources-page-container">
      {/* Brand Page Header */}
      <PageHeader 
        titleFirst="Investment" 
        titleLast="Resources." 
        subtitle="Direct access to client investment portals, trading platforms, and official mutual fund regulatory resources." 
      />

      <div className="resources-main-content">
        <div className="resources-container">
          
          {/* Breadcrumb Navigation */}
          <div className="resources-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">»</span>
            <Link to="/services">Services</Link>
            <span className="breadcrumb-separator">»</span>
            <span className="active">Investment Resources</span>
          </div>

          {/* Resource Sections */}
          {INVESTMENT_RESOURCES.map((section, sIdx) => (
            <section key={sIdx} className="resource-group-section">
              <div className="section-title-wrap">
                <h3 className="resource-group-title">{section.category}</h3>
                <p className="resource-group-subtitle">{section.subtitle}</p>
              </div>

              <div className="resources-cards-grid">
                {section.items.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.id} className="resource-card">
                      
                      <div className="card-top-bar">
                        <div className={`card-icon-bubble bg-${item.badgeColor}`}>
                          <IconComponent size={22} />
                        </div>
                        <span className={`card-status-badge badge-${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>

                      <div className="card-body">
                        <h4 className="card-title">{item.title}</h4>
                        <p className="card-description">{item.description}</p>
                        
                        <div className="card-feature-list">
                          {item.features.map((feat, fIdx) => (
                            <div key={fIdx} className="feature-bullet">
                              <CheckCircle2 size={15} className="bullet-check" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="card-action-footer">
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`btn-resource-action ${item.buttonStyle}`}
                          aria-label={`Open ${item.title} in a new tab`}
                        >
                          <span>{item.buttonText}</span>
                          <ExternalLink size={16} />
                        </a>
                      </div>

                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {/* Security & Safe Browsing Guidelines */}
          <div className="security-guidance-card">
            <div className="security-icon-circle">
              <Lock size={26} />
            </div>
            <div className="security-text-wrap">
              <h3>Secure Access & Security Advisory</h3>
              <p>
                All external links provided above open directly on official, HTTPS-encrypted platforms (Angel One and AMFI India). Wealth Acumen will never request your login passwords, OTPs, or trading PINs over phone, email, or message. Always verify the domain name in your browser address bar before entering credentials.
              </p>
            </div>
          </div>

          {/* Need Assistance Prompt */}
          <div className="resource-help-banner">
            <div className="help-icon-wrap">
              <HelpCircle size={24} />
            </div>
            <div className="help-text">
              <h4>Need help accessing your investment portal or opening an account?</h4>
              <p>Our advisory desk is available to assist you with registration, KYC validation, and portfolio access.</p>
            </div>
            <Link to="/contact" className="btn-contact-help">
              Contact Advisory Desk <TrendingUp size={16} />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InvestmentResources;
