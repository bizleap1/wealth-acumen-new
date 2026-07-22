import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, AlignLeft, MessageSquare, Send, Lock, Clock, HeadphonesIcon, ShieldCheck, Share2, MapPin, Users, CheckCircle, Star } from 'lucide-react';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section className="contact-section">
      <div className="cs-container">
        
        <div className="contact-main-grid">
          
          {/* Left Column */}
          <motion.div className="contact-left-col" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="contact-title">
              Reach Out<br/>
              Let's Build<br/>
              <span className="highlight-gold">Your Wealth</span><br/>
              <span className="highlight-gold">Together</span>
            </h2>
            <p className="contact-desc">
              Have questions or need expert advice? We're here to help you plan a better financial future. Get in touch and our team will get back to you soon.
            </p>
            
            <div className="stats-card-dark">
              <div className="stat-item">
                <Users size={24} color="#f59e0b" />
                <h4>10K+</h4>
                <p>Happy Clients</p>
              </div>
              <div className="stat-item">
                <ShieldCheck size={24} color="#f59e0b" />
                <h4>98%</h4>
                <p>Satisfaction</p>
              </div>
              <div className="stat-item">
                <Star size={24} color="#f59e0b" />
                <h4>15+</h4>
                <p>Years of Trust</p>
              </div>
            </div>
          </motion.div>

          {/* Center Column: Form */}
          <motion.div className="contact-center-col" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
            <div className="contact-form-card">
              
              <div className="form-card-header">
                <div className="send-icon-wrapper"><Send size={20} color="#ffffff" /></div>
                <div>
                  <h3>Send Us a Message</h3>
                  <p>We'll get back to you as soon as possible.</p>
                </div>
              </div>

              <form className="cs-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="input-group">
                    <User size={18} className="input-icon" />
                    <input type="text" placeholder="Your Name*" className="form-input" required />
                  </div>
                  <div className="input-group">
                    <Mail size={18} className="input-icon" />
                    <input type="email" placeholder="Your Email*" className="form-input" required />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="input-group">
                    <Phone size={18} className="input-icon" />
                    <input type="tel" placeholder="Your Number*" className="form-input" required />
                  </div>
                  <div className="input-group">
                    <AlignLeft size={18} className="input-icon" />
                    <input type="text" placeholder="Your Subject*" className="form-input" required />
                  </div>
                </div>

                <div className="input-group align-top full-width">
                  <MessageSquare size={18} className="input-icon" />
                  <textarea placeholder="Enter your message..." className="form-textarea" required></textarea>
                </div>

                <button type="submit" className="submit-btn-gold">
                  <Send size={16} />
                  SEND MESSAGE
                </button>

                <div className="safe-info-center">
                  <ShieldCheck size={16} color="#475569" />
                  <span>Your information is <span className="highlight-gold-text">safe and secure</span> with us.</span>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Right Column: Info Cards */}
          <motion.div className="contact-right-col" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}>
            
            <div className="info-cards-stack">
              <div className="info-card-glass">
                <div className="info-icon-circle blue"><Clock size={20} /></div>
                <div className="info-content-glass">
                  <h5>Quick Response</h5>
                  <p>We reply within 24 hrs</p>
                </div>
              </div>

              <div className="info-card-glass">
                <div className="info-icon-circle gold"><HeadphonesIcon size={20} /></div>
                <div className="info-content-glass">
                  <h5>Expert Support</h5>
                  <p>Talk to our specialists</p>
                </div>
              </div>

              <div className="info-card-glass">
                <div className="info-icon-circle blue-dark"><ShieldCheck size={20} /></div>
                <div className="info-content-glass">
                  <h5>Secure & Private</h5>
                  <p>Your data is protected</p>
                </div>
              </div>
            </div>

            <div className="office-card-glass">
              <div className="map-pin-badge"><MapPin size={24} color="#f59e0b" /></div>
              <h4>Visit Our Office</h4>
              <p>4th Floor Ground, Plot-170, Empress Mahal, Dr. Babasaheb Ambedkar Road, Tilak Rd, Dadar East, Mumbai, Maharashtra 400014</p>
              <div className="office-actions">
                <div className="action-btn-glass">
                  <Share2 size={16} />
                  <span>Share Location</span>
                </div>
                <div className="action-btn-glass">
                  <Send size={16} />
                  <span>Get Directions</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Bottom Banner */}
        <motion.div className="contact-bottom-banner" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} viewport={{ once: true }}>
          <div className="banner-item">
            <div className="banner-icon"><Mail size={24} color="#f59e0b" /></div>
            <div className="banner-text">
              <h5>Prefer email?</h5>
              <p>Write to us at <span className="highlight-gold-text">support@wealthacumen.com</span></p>
            </div>
          </div>
          <div className="banner-item">
            <div className="banner-icon"><Phone size={24} color="#f59e0b" /></div>
            <div className="banner-text">
              <h5>Call us</h5>
              <p className="highlight-gold-text">+91 98765 43210</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
