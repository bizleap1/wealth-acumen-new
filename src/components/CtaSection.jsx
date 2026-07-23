import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, User, Activity } from 'lucide-react';
import './CtaSection.css';

const CtaSection = () => {
  const navigate = useNavigate();
  return (
    <section className="cta-section">
      <motion.div 
        className="cta-buttons"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <button className="btn-get-started" onClick={() => navigate('/services')}>
          Get Started <ArrowRight size={18} />
        </button>
        <button className="btn-try-demo" onClick={() => navigate('/contact')}>
          Try Demo
        </button>
      </motion.div>

      <div className="cta-visual-container">
        
        {/* Phone mockup removed as requested */}

        {/* Floating Card: Reviews */}
        <motion.div 
          className="floating-card card-reviews"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="avatars">
            <div className="avatar-circle"></div>
            <div className="avatar-circle"></div>
            <div className="avatar-circle"></div>
          </div>
          <div className="reviews-text">
            <strong>12 million+</strong>
            <span>users review</span>
          </div>
          <Star size={16} fill="#fbbf24" color="#fbbf24" style={{ marginLeft: '10px' }}/>
        </motion.div>

        {/* Floating Card: Balance */}
        <motion.div 
          className="floating-card card-balance"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="balance-text">
            <span>Balance</span>
            <strong>$32,300.00</strong>
          </div>
          <div className="balance-icon">$</div>
        </motion.div>

        {/* Floating Card: Targets */}
        <motion.div 
          className="floating-card card-targets"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="card-title">Targets met</div>
          
          <div className="target-row">
            <div className="target-icon orange">
              <Activity size={16} />
            </div>
            <div className="target-info">
              <strong>68%</strong>
              <span>In this year's hit rate</span>
            </div>
          </div>
          
          <div className="target-row">
            <div className="target-icon purple">
              <Activity size={16} />
            </div>
            <div className="target-info">
              <strong>48%</strong>
              <span>The best deals for this year</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Card: Transactions */}
        <motion.div 
          className="floating-card card-transactions"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="card-title">Transaction</div>
          
          <div className="tx-row">
            <div className="tx-icon light-purple"></div>
            <div className="tx-info">
              <strong>Donate to local</strong>
              <span>The best deals for this year</span>
            </div>
            <span className="tx-amount negative">-$14.00</span>
          </div>
          
          <div className="tx-row">
            <div className="tx-icon light-yellow"></div>
            <div className="tx-info">
              <strong>Half sleeve a t-shirt</strong>
              <span>The best deals for this year</span>
            </div>
            <span className="tx-amount positive">+$13.00</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CtaSection;
