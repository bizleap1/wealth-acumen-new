import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, HeartPulse, FileHeart, Grid, Phone, CheckCircle2, UserCheck, Star, Activity, Briefcase } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './Insurance.css';

const Insurance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="insurance-page-container">
      <PageHeader 
        titleFirst="Wealth" 
        titleLast="Protection." 
        subtitle="Safeguards your legacy and protects your wealth." 
      />

      {/* Hero Section */}
      <section className="service-hero">
        <div className="ins-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="hero-grid">
            <div className="hero-content">
              <span className="breadcrumb"><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link> &gt; <span className="active">Insurance</span></span>
              <p className="hero-desc">
                Protecting your wealth is as important as growing it. Our tailored insurance strategies ensure that you and your loved ones are covered against life's uncertainties.
              </p>
              <Link to="/contact" className="btn-orange">
                Get a Free Quote <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero-image-wrapper">
              <img src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Family reviewing insurance plans" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="ins-security-section">
        <div className="section-header-centered">
          <h2>Secure Your Future Today</h2>
          <p>
            Insurance is a critical pillar of financial planning—offering security and stability in life's unpredictable moments. We guide you in selecting solutions that align with your life stage and financial goals.
          </p>
        </div>

        <div className="ins-large-cards-grid">
          {/* Term Life Card */}
          <div className="ins-large-card">
            <div className="ins-large-icon">
              <FileHeart size={28} />
            </div>
            <h3>Term Life Insurance</h3>
            <p className="card-desc">
              Ensure your family's financial independence even in your absence. High coverage at affordable premiums to provide a safety net for your dependents' future needs and aspirations.
            </p>
            <ul className="ins-card-features">
              <li><CheckCircle2 size={16} /> Income Replacement for Family</li>
              <li><CheckCircle2 size={16} /> Liability & Debt Coverage</li>
            </ul>
            <a href="#" className="ins-card-link">Explore Term Plans &rarr;</a>
          </div>

          {/* Health Card */}
          <div className="ins-large-card">
            <div className="ins-large-icon">
              <HeartPulse size={28} />
            </div>
            <h3>Health Insurance</h3>
            <p className="card-desc">
              Don't let medical emergencies drain your savings. Our health plans cover hospitalization, critical illnesses, and wellness checks, ensuring access to quality healthcare without financial stress.
            </p>
            <ul className="ins-card-features">
              <li><CheckCircle2 size={16} /> Cashless Hospitalization</li>
              <li><CheckCircle2 size={16} /> Critical Illness Riders</li>
            </ul>
            <a href="#" className="ins-card-link">View Health Options &rarr;</a>
            
            <div className="floating-green-icon">
              <Shield size={20} color="white" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="ins-features-section">
        <div className="ins-features-header">
          <h2>Key Features of Our Insurance</h2>
        </div>

        <div className="ins-features-grid">
          {/* Dark Blue Card */}
          <div className="ins-feat-card dark-blue-bg">
            <div className="ins-feat-icon">
              <Briefcase size={20} />
            </div>
            <h4>Personalized Planning</h4>
            <p>Strategies based on your unique life stage and long-term financial objectives.</p>
            {/* Background icon watermark */}
            <UserCheck className="watermark-icon" size={120} />
          </div>

          {/* Regular Card */}
          <div className="ins-feat-card">
            <div className="ins-feat-icon orange-icon">
              <Star size={20} />
            </div>
            <h4>Trusted Providers</h4>
            <p>Collaborating with top-rated insurers for absolute reliability.</p>
          </div>

          {/* Regular Card */}
          <div className="ins-feat-card">
            <div className="ins-feat-icon">
              <Phone size={20} />
            </div>
            <h4>Claim Assistance</h4>
            <p>Dedicated support to handle paperwork and ensure smooth claim settlements.</p>
          </div>

          {/* Regular Card */}
          <div className="ins-feat-card">
            <div className="ins-feat-icon brown-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h4>Value Pricing</h4>
            <p>Maximum coverage value at the most competitive market premiums.</p>
          </div>

          {/* Orange Box Card */}
          <div className="ins-feat-card orange-bg">
            <div className="flex-header">
              <h4>Easy Comparison</h4>
              <ArrowRight size={24} color="#b45309" />
            </div>
            <p>Contrast different policies side-by-side to find the perfect fit effortlessly.</p>
          </div>

          {/* Regular Card */}
          <div className="ins-feat-card">
            <div className="ins-feat-icon">
              <Grid size={20} />
            </div>
            <h4>Full Suite</h4>
            <p>From Term to Health, we cover all facets of your insurance needs.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="ins-cta-section">
        <div className="ins-cta-card">
          <h2 style={{ color: 'white' }}>Ready to secure your peace of mind?</h2>
          <p>
            Speak with our insurance specialists today for a personalized assessment of your protection needs.
          </p>
          
          <div className="ins-cta-bottom">
            <button className="primary-btn-gold" onClick={() => navigate('/contact')}>
              <Phone size={18} /> Schedule Consultation
            </button>
            <span className="cta-quote">
              "The best time to insure was yesterday, the next best time is now."
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insurance;
