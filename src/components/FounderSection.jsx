import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Phone, Mail, MapPin, Crown, Award, TrendingUp, ShieldCheck } from 'lucide-react';
import atharvaImg from '../assets/image copy.png';
import './FounderSection.css';

const FounderSection = () => {
  return (
    <section className="founder-section" id="proprietor">
      <div className="founder-container">
        
        <div className="founder-content">
          
          {/* Image Column */}
          <motion.div 
            className="founder-image-col"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="image-composition">
              
              <div className="image-wrapper">
                <img 
                  src={atharvaImg} 
                  alt="Atharva Wadekar" 
                />
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div 
            className="founder-text-col"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            
            <h2 className="founder-name">
              Atharva <span className="highlight-italic">Wadekar</span>
            </h2>
            
            <div className="founder-bio">
              <p>
                AMFI-Registered Mutual Fund Distributor with additional certifications
                in Equity Derivatives and NISM-Certified Research Analyst.
                With over 5 years of hands-on experience in the stock market. As a
                Channel Partner of Angel One, I provide clients with access to a wide
                range of investment products and trading platforms.
              </p>
              <p>
                My focus is on delivering insightful, research-backed guidance to help
                investors make informed decisions and build long-term wealth.
              </p>
            </div>

            <div className="founder-title-banner">
              <div className="banner-left">
                <div className="crown-icon"><Crown size={22} color="#f59e0b" /></div>
                <h3>Founder & CEO</h3>
              </div>
              <div className="banner-divider"></div>
              <div className="banner-right">
                <span className="signature">Atharva Wadekar</span>
              </div>
            </div>

            <div className="founder-info-grid">
              <div className="info-card">
                <div className="info-icon"><Calendar size={18} /></div>
                <div className="info-content">
                  <h5>Experience</h5>
                  <p>5 Years</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon"><Phone size={18} /></div>
                <div className="info-content">
                  <h5>Phone</h5>
                  <p><a href="https://wa.me/919325227357" style={{color: 'inherit', textDecoration: 'none'}}>+91 9325227357</a></p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon"><Mail size={18} /></div>
                <div className="info-content">
                  <h5>Mail</h5>
                  <p>info@wealthacumen.in</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon"><MapPin size={18} /></div>
                <div className="info-content">
                  <h5>Based In</h5>
                  <p>Ground Floor, Empress Mahal, Plot No. 170, near Dadar TT Circle, Dadar East, Mumbai, Maharashtra 400014</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
