import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import chooseUsImg from '../assets/choose us .png';
import './IntroSection.css';

const IntroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="intro-section">
      <div className="intro-container">
        
        {/* Left Column: Sticky Photo */}
        <div className="intro-left-column">
          <motion.div 
            className="modern-photo-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="modern-photo-border"></div>
            <div className="modern-photo-container">
              <img 
                src={chooseUsImg} 
                alt="Financial Consulting" 
                className="modern-photo-image"
              />
            </div>

            {/* Top Left Floating Card */}
            <motion.div 
              className="floating-card-top"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="floating-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fca311" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                  <path d="M21 5h-6v6" />
                </svg>
              </div>
              <div className="floating-card-content">
                <h5>Strategic Guidance.<br/>Lasting Impact.</h5>
                <div className="floating-card-divider"></div>
                <p>We help you make smarter<br/>decisions for a richer tomorrow.</p>
              </div>
            </motion.div>

            {/* Bottom Floating Stats Card */}
            <motion.div 
              className="floating-card-bottom"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="stat-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fca311" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <h6>500+</h6>
                <span>Happy Clients</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fca311" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                <h6>15+</h6>
                <span>Years of Experience</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fca311" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                <h6>98%</h6>
                <span>Client Satisfaction</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fca311" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                <h6>100%</h6>
                <span className="text-gold">Goal Focused</span>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Right Column: Scrolling Information */}
        <div className="intro-right-column">
          
          {/* Block 1: Why Choose Us */}
          <motion.div 
            className="info-block"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
          >
            <div className="premium-card">
              <h2 className="intro-title">Why Choose<br/>Wealth Acumen?</h2>
              <div className="intro-title-underline"></div>
              
              <div className="intro-text-block">
                <ul className="intro-bullet-list">
                  <li>Personalized strategies.</li>
                  <li>Trusted insights.</li>
                  <li>Ethical guidance.</li>
                  <li>Long-term wealth growth.</li>
                </ul>
                <p className="intro-text-summary">
                  Choose Wealth Acumen <br/>
                  to prioritize your financial <br/>
                  well-being with tailored <br/>
                  solutions that fit your unique goals.
                </p>
              </div>
              
              <button className="btn-know-more" onClick={() => navigate('/about')}>
                Learn More About Us
                <ArrowRight size={18} className="btn-arrow" />
              </button>
            </div>
          </motion.div>

          {/* Block 2: Mission */}
          <motion.div 
            className="info-block"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
          >
            <div className="premium-card">
              <div className="card-icon-gold">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fca311" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <h4 className="card-heading">Our Mission</h4>
              <p className="card-text">
                Our mission is to empower clients with personalized strategies and actionable financial education. We focus on disciplined, goal-driven investing that builds lasting wealth and unshakeable confidence in your financial future.
                <br/><br/>
                We bridge the gap between complex financial markets and your personal aspirations, ensuring every decision is transparent, ethical, and perfectly tailored to your needs.
              </p>
            </div>
          </motion.div>
          
          {/* Block 3: Vision */}
          <motion.div 
            className="info-block"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
          >
            <div className="premium-card">
              <div className="card-icon-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                </svg>
              </div>
              <h4 className="card-heading">Our Vision</h4>
              <p className="card-text">
                To be the most trusted partner in every investor's journey, enabling true financial freedom through smart, sustainable, and informed wealth-building strategies.
                <br/><br/>
                We envision a world where anyone can achieve financial independence with the right guidance, turning uncertainty into opportunity, and lifelong dreams into tangible realities.
              </p>
            </div>
          </motion.div>

        </div>
        
      </div>
    </section>
  );
};

export default IntroSection;
