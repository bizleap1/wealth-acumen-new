import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './StatsSection.css';

const stats = [
  { prefix: "", num: 200, suffix: "+", label: "Happy & Satisfied Clients" },
  { prefix: "", num: 50, suffix: "+", label: "Financial Experts" },
  { prefix: "", num: 5, suffix: "+", label: "Years of Experience" },
  { prefix: "₹", num: 500, suffix: "Cr+", label: "Assets Under Management" }
];

const AnimatedCounter = ({ prefix, num, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const duration = 2000; // 2 seconds

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing out function for smooth deceleration
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.floor(easeOutQuart * num));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setDisplayValue(num);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, num]);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-header">
          <h2 className="section-title" style={{ color: '#fff' }}>Year-on-year, more investors are entering the market.</h2>
          <p className="stats-subtitle">Join thousands of others who have trusted Wealth Acumen to secure their financial future.</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="stat-value">
                <AnimatedCounter prefix={stat.prefix} num={stat.num} suffix={stat.suffix} />
              </h3>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
