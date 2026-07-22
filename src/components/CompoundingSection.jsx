import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, ArrowRight, BarChart2, Coins } from 'lucide-react';
import './CompoundingSection.css';

const chartData = [
  { year: '2014', value: 3.9, color: '#fde047' },
  { year: '2015', value: 4.5, color: '#ef4444' },
  { year: '2016', value: 5.2, color: '#3b82f6' },
  { year: '2017', value: 6.5, color: '#22c55e' },
  { year: '2018', value: 8.0, color: '#eab308' },
  { year: '2019', value: 9.5, color: '#f97316' },
  { year: '2020', value: 11.0, color: '#f472b6' },
  { year: '2021', value: 13.0, color: '#f06292' }, // Red-orange
  { year: '2022', value: 15.5, color: '#67e8f9' },
  { year: '2023', value: 18.0, color: '#bef264' },
  { year: '2024', value: 22.5, color: '#fde047' },
];

const yAxisLabels = [55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0];
const MAX_VALUE = 55;

const CompoundingSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="compounding-section">
      <div className="compounding-bg-pattern"></div>
      <div className="compounding-header">
        <h2 className="compounding-title">
          The Power of Compounding: Start Early, Grow Steadily
        </h2>
      </div>

      <div className="compounding-container">
        
        {/* Left Content */}
        <motion.div 
          className="compounding-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >

          <p className="compounding-desc">
            This chart shows how a consistent investment—say through SIPs—
            can grow exponentially over time. With just ₹2.2 lakhs in the early
            years, your wealth can potentially grow to over ₹18.5 lakhs in 15 years!
          </p>

          <div className="feature-box border-left-gold">
            <div className="compounding-icon-circle">
              <BarChart2 size={24} />
            </div>
            <div className="feature-text">
              <h4>Compounding rewards patience.</h4>
              <p>The longer you stay invested, the greater your returns.</p>
            </div>
          </div>

          <div className="feature-box">
            <div className="compounding-icon-circle light-bg">
              <Shield size={24} />
            </div>
            <div className="feature-text">
              <p>
                At <strong>Wealth Acumen</strong>, we help you harness this power through
                disciplined, goal-based investing. Whether you're planning for
                retirement, your child's education, or financial independence—
                starting today makes all the difference.
              </p>
            </div>
          </div>

          <button className="contact-btn">
            <div className="btn-icon">
              <TrendingUp size={16} />
            </div>
            CONTACT US
            <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Right Chart Card */}
        <motion.div 
          className="compounding-chart-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="chart-card">
            
            <div className="chart-header">
              <div className="chart-icon-box">
                <TrendingUp size={28} />
              </div>
              <div className="chart-title-box">
                <h3>TOTAL FOLIOS OVER THE YEAR</h3>
                <span>IN CRORES</span>
              </div>
            </div>

            <div className="chart-area">
              <div className="y-axis">
                {yAxisLabels.map(label => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              
              <div className="chart-bars">
                {chartData.map((data, index) => (
                  <div key={data.year} className="bar-group-line">
                    <div className="axis-labels-bottom">
                      <span className="value-label">{data.value}</span>
                      <span className="year-label">{data.year}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Curved Arrow overlay using SVG */}
              <svg className="arrow-overlay" viewBox="0 0 500 250" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="blueGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                    <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
                    <stop offset="100%" stopColor="rgba(59, 130, 246, 1)" />
                  </linearGradient>
                </defs>
                  <motion.path 
                    className="arrow-path"
                    d="M 10 230 Q 250 200, 480 30"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                {/* Arrowhead */}
                  <motion.polygon 
                    points="465,25 485,25 480,45" 
                    className="arrow-head"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 2, duration: 0.3 }}
                  />
              </svg>

            </div>

            {/* Floating Badge */}
            <motion.div 
              className="floating-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5, type: "spring" }}
              viewport={{ once: true }}
            >
              <div className="badge-icon">
                <Coins size={32} color="#eab308" />
              </div>
              <div className="badge-text">
                <span>Potential Growth<br/>in 15 Years</span>
                <strong>₹18.5+<br/>Lakhs</strong>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CompoundingSection;
