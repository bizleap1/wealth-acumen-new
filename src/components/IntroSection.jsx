import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import chooseUsImg from '../assets/choose us .png';
import './IntroSection.css';

const IntroSection = () => {
  return (
    <section className="intro-section">
      <div className="intro-container">
        
        {/* Left Column: Text & List */}
        <motion.div 
          className="intro-left-column"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
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
          
          <button className="btn-know-more">
            Learn More About Us
            <ArrowRight size={18} className="btn-arrow" />
          </button>
        </motion.div>

        {/* Middle Column: Images/Visuals */}
        <motion.div 
          className="intro-middle-column"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="visual-wrapper">
            <div className="visual-frame"></div>
            <img 
              src={chooseUsImg} 
              alt="Consulting Illustration" 
              className="visual-image polaroid-effect"
            />
          </div>
        </motion.div>

        {/* Right Column: Testimonial Card */}
        <motion.div 
          className="intro-right-column"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="cards-wrapper">
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
                Empowering clients with personalized strategies and education for disciplined, goal-driven investing that builds lasting wealth and confidence.
              </p>
            </div>
            
            <div className="premium-card">
              <div className="card-icon-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                </svg>
              </div>
              <h4 className="card-heading">Our Vision</h4>
              <p className="card-text">
                To be a trusted partner in every investor's journey, enabling financial freedom through smart, sustainable, and informed wealth-building strategies.
              </p>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default IntroSection;
