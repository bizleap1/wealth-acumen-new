import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, Target, BookOpen, ShieldCheck, LifeBuoy } from 'lucide-react';
import './BenefitsSection.css';

const benefitsData = [
  {
    title: "Personalized Strategies",
    desc: "We don't believe in one-size-fits-all. Your goals, risk appetite, and time horizon shape your investment plan.",
    MainIcon: Rocket,
    color: "#fca311" // Orange
  },
  {
    title: "Goal-Oriented & Disciplined Investing",
    desc: "We focus on long-term wealth creation through disciplined, systematic investment approaches designed to generate consistent returns.",
    MainIcon: Target,
    color: "#8a61ff" // Purple
  },
  {
    title: "Education-First Approach",
    desc: "We empower our clients with financial literacy—because an informed investor is a confident investor.",
    MainIcon: BookOpen,
    color: "#2563eb" // Blue
  },
  {
    title: "Ethical & Transparent Advisory",
    desc: "Trust is the foundation of our relationship. No hidden charges, no misleading promises—just honest, transparent guidance.",
    MainIcon: ShieldCheck,
    color: "#10b981" // Green
  },
  {
    title: "Continuous Support & Guidance",
    desc: "From onboarding to portfolio reviews—we're always available to support your investment journey, every step of the way.",
    MainIcon: LifeBuoy,
    color: "#f43f5e" // Rose
  }
];

const BenefitsSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="benefits-section">
      <div className="benefits-container">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

          <h2 className="section-title-dark">We bring the best things</h2>
        </motion.div>

        <div className="timeline-wrapper" ref={timelineRef}>
          {/* Vertical Lines */}
          <div className="timeline-bg-line"></div>
          <motion.div className="timeline-progress-line" style={{ height: lineHeight }}></motion.div>

          <div className="benefits-grid">
            {/* Feature Cards */}
            {benefitsData.map((item, index) => {
              const Icon = item.MainIcon;
              return (
                <motion.div 
                  key={index}
                  className="benefit-card"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                  viewport={{ once: false, amount: 0.3 }}
                  whileHover={{ y: -5, boxShadow: "0 15px 40px rgba(0,0,0,0.06)" }}
                >
                  <motion.div 
                    className="timeline-dot"
                    style={{ border: `4px solid ${item.color}` }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
                    viewport={{ once: false, amount: 0.8 }}
                  ></motion.div>

                  <div className="benefit-icon-wrapper">
                    <div className="icon-graphic">
                      <motion.div 
                        className="icon-bg-shape" 
                        style={{ backgroundColor: item.color }}
                        animate={hoveredCard === index ? { rotate: [0, 15, -15, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                      ></motion.div>
                      <Icon size={36} color={item.color} className="icon-main" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  <div className="benefit-content">
                    <h3 className="benefit-card-title">{item.title}</h3>
                    <p className="benefit-card-text">{item.desc}</p>
                  </div>
                  
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
