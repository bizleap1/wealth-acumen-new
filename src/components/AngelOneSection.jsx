import React from 'react';
import { motion } from 'framer-motion';
import { MonitorSmartphone, Lightbulb, UserCheck, ShieldCheck } from 'lucide-react';
import angelOneImg from '../assets/image.png';
import './AngelOneSection.css';

const AngelOneSection = () => {
  return (
    <section className="angel-one-section">
      <div className="angel-one-container">
        
        {/* Header */}
        <div className="angel-one-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Channel Partner of Angel One
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Through this partnership, I offer seamless access to Angel One's robust trading platforms, expert research, and a wide range of financial products including stocks, mutual funds, IPOs, ETFs, and more.
          </motion.p>
          <motion.div 
            className="collab-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            By collaborating with Angel One, I ensure that my clients receive:
          </motion.div>
        </div>

        {/* Central Layout */}
        <div className="angel-layout">
          
          {/* Left Features */}
          <div className="angel-features-left">
            <motion.div 
              className="angel-feature feature-align-right"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="feature-text">
                <h3>Cutting-Edge Technology</h3>
                <p>For seamless trading and advanced investments.</p>
              </div>
              <div className="feature-icon">
                <MonitorSmartphone size={24} />
              </div>
            </motion.div>

            <motion.div 
              className="angel-feature feature-align-right"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="feature-text">
                <h3>Research-Backed Insights</h3>
                <p>To make deeply informed financial decisions.</p>
              </div>
              <div className="feature-icon">
                <Lightbulb size={24} />
              </div>
            </motion.div>
          </div>

          {/* Center Circle */}
          <motion.div 
            className="angel-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="angel-circle">
              <img 
                src={angelOneImg} 
                alt="Angel One Logo" 
                className="angel-logo-img"
              />
            </div>
          </motion.div>

          {/* Right Features */}
          <div className="angel-features-right">
            <motion.div 
              className="angel-feature feature-align-left"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">
                <UserCheck size={24} />
              </div>
              <div className="feature-text">
                <h3>Personalized Support</h3>
                <p>Assistance throughout your entire investment journey.</p>
              </div>
            </motion.div>

            <motion.div 
              className="angel-feature feature-align-left"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">
                <ShieldCheck size={24} />
              </div>
              <div className="feature-text">
                <h3>Trusted & Compliant</h3>
                <p>A transparent and secure investment environment.</p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Conclusion */}
        <motion.div 
          className="angel-conclusion"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          This partnership strengthens my mission to empower investors with the tools, knowledge, and resources they need to build wealth securely and efficiently.
        </motion.div>

      </div>
    </section>
  );
};

export default AngelOneSection;
