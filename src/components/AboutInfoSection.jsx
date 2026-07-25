import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Headphones, Users, BarChart, ShieldCheck, PhoneCall, ArrowRight } from 'lucide-react';
import './AboutInfoSection.css';

const AboutInfoSection = () => {
  return (
    <section className="about-info-section">
      <div className="about-info-container">
        <div className="info-grid">
          
          {/* Left Column: Why Choose Us */}
          <motion.div 
            className="info-col why-choose-us"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="main-heading">
              Your <span className="highlight-gold">Goals.</span> Our Priority.
            </h2>
            <p className="subtitle-text">
              We combine expertise, technology, and a client-first approach to help you build lasting wealth.
            </p>
            
            <div className="feature-cards">
              {/* Card 1 */}
              <div className="feature-card border-blue">
                <div className="icon-circle icon-blue">
                  <Target size={28} />
                </div>
                <div className="card-content">
                  <h3>Personalized Strategies</h3>
                  <p>We don't believe in one-size-fits-all. Your goals, risk appetite, and time horizon shape your investment plan.</p>
                </div>
                <div className="card-dots"></div>
              </div>

              {/* Card 2 */}
              <div className="feature-card border-green">
                <div className="icon-circle icon-green">
                  <TrendingUp size={28} />
                </div>
                <div className="card-content">
                  <h3>Goal-Oriented &<br/>Disciplined Investing</h3>
                  <p>We focus on long-term wealth creation through disciplined, systematic investment approaches designed to generate consistent returns.</p>
                </div>
                <div className="card-dots"></div>
              </div>

              {/* Card 3 */}
              <div className="feature-card border-gold">
                <div className="icon-circle icon-gold">
                  <Headphones size={28} />
                </div>
                <div className="card-content">
                  <h3>Continuous Support<br/>& Guidance</h3>
                  <p>From onboarding to portfolio reviews—we're always available to support your investment journey, every step of the way.</p>
                </div>
                <div className="card-dots"></div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Our Mission */}
          <motion.div 
            className="info-col our-mission-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mission-dark-card">
              <div className="mission-bg-overlay"></div>
              <div className="bg-target-graphic">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
                <div className="arrow-line"></div>
              </div>
              <div className="mission-content-inner">
                <h2 className="main-heading white">
                  Guiding You Toward<br/>Purposeful <span className="highlight-gold">Wealth</span>
                </h2>
                
                <div className="mission-text">
                  <p>
                    Our mission is to guide clients toward purposeful wealth creation through personalized strategies, continuous support, and financial education. We strive to help every investor achieve their financial goals with clarity, confidence, and peace of mind.
                  </p>
                  <p>
                    By promoting disciplined and goal-oriented investing, we also aim to maximize returns for our clients over the long term—ensuring that wealth creation is not just a possibility, but a reality.
                  </p>
                </div>
              </div>

              {/* Floating Stats Panel */}
              <div className="floating-stats-panel">
                <div className="stat-item">
                  <div className="stat-icon-wrapper icon-blue">
                    <Users size={20} />
                  </div>
                  <h4>200+</h4>
                  <span className="stat-label">Happy Clients</span>
                  <span className="stat-sub">Trust us with their future</span>
                </div>
                
                <div className="stat-item border-sides">
                  <div className="stat-icon-wrapper icon-gold">
                    <BarChart size={20} />
                  </div>
                  <h4>5+</h4>
                  <span className="stat-label">Years of Experience</span>
                  <span className="stat-sub">Delivering expert financial solutions</span>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon-wrapper icon-blue">
                    <ShieldCheck size={20} />
                  </div>
                  <h4>100%</h4>
                  <span className="stat-label">Client Commitment</span>
                  <span className="stat-sub">Your success is our commitment</span>
                </div>
              </div>
            </div>

            {/* CTA below mission */}
            <div className="mission-cta">
              <div className="cta-icon-circle">
                <PhoneCall size={20} />
              </div>
              <div className="cta-text">
                <p>Let's build your financial future together.</p>
                <a href="#" className="cta-link">
                  Book a Free Consultation <ArrowRight size={16} />
                </a>
              </div>
            </div>

          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutInfoSection;
