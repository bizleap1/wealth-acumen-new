import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, PieChart, Umbrella, LineChart, Scroll, Landmark } from 'lucide-react';
import './Services.css';

const servicesList = [
  {
    title: "Equity",
    path: "/equity",
    description: "Build wealth through ownership in India's leading companies. High growth potential with expert market research.",
    icon: TrendingUp
  },
  {
    title: "Mutual Funds",
    path: "/mutual-funds",
    description: "Expertly curated mutual fund portfolios to match your risk profile and return expectations.",
    icon: PieChart
  },
  {
    title: "Insurance",
    path: "/insurance",
    description: "Comprehensive insurance coverage tailored to protect you and your loved ones from life's uncertainties.",
    icon: Umbrella
  },
  {
    title: "ETFs",
    path: "/etfs",
    description: "Diversify your portfolio with low-cost, flexible, and tax-efficient Exchange Traded Funds.",
    icon: LineChart
  },
  {
    title: "Bonds",
    path: "/bonds",
    description: "Stable and secure fixed-income investments to provide a reliable stream of returns over time.",
    icon: Scroll
  },
  {
    title: "Fixed Deposit",
    path: "/fixed-deposit",
    description: "Guaranteed returns with zero market risk, offering a safe haven for your hard-earned savings.",
    icon: Landmark
  }
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="services-page-container">
      {/* Hero Banner Section */}
      <section className="services-hero">
        <div className="services-hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Comprehensive financial solutions tailored for your wealth creation journey. 
            Explore our specialized offerings below.
          </motion.p>
        </div>
      </section>

      <section className="services-page-content">
        <div className="sp-container">
          <div className="sp-grid">
            {servicesList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  key={idx}
                >
                  <Link to={service.path} className="sp-card">
                    {/* Watermark Icon */}
                    <div className="sp-watermark">
                      <Icon size={300} strokeWidth={1} />
                    </div>
                    
                    <div className="sp-card-inner">
                      <div className="sp-icon-wrapper">
                        <Icon size={28} />
                      </div>
                      <div className="sp-card-content">
                        <h3>{service.title}</h3>
                        <p>{service.description} <span className="sp-click-text">Click to explore more.</span></p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
