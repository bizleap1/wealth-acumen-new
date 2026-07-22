import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, ShieldCheck, Briefcase, PieChart, ArrowRight, Umbrella, LineChart, Scroll, Landmark, ChevronLeft, ChevronRight } from 'lucide-react';
import './ServicesSection.css';

const services = [
  {
    title: "Mutual Funds",
    description: "Expertly curated mutual fund portfolios to match your risk profile and return expectations.",
    icon: PieChart
  },
  {
    title: "Portfolio Management",
    description: "Personalized management of your investments to maximize returns while mitigating risks.",
    icon: Briefcase
  },
  {
    title: "Retirement Planning",
    description: "Secure your future with our comprehensive and stress-free retirement planning strategies.",
    icon: ShieldCheck
  },
  {
    title: "Wealth Creation",
    description: "Long-term strategies designed to exponentially grow your wealth and achieve financial freedom.",
    icon: TrendingUp
  },
  {
    title: "Insurance",
    description: "Comprehensive insurance coverage tailored to protect you and your loved ones from life's uncertainties.",
    icon: Umbrella
  },
  {
    title: "ETFs (Exchange Traded Funds)",
    description: "Diversify your portfolio with low-cost, flexible, and tax-efficient Exchange Traded Funds.",
    icon: LineChart
  },
  {
    title: "Bonds",
    description: "Stable and secure fixed-income investments to provide a reliable stream of returns over time.",
    icon: Scroll
  },
  {
    title: "Fixed Deposit",
    description: "Guaranteed returns with zero market risk, offering a safe haven for your hard-earned savings.",
    icon: Landmark
  }
];

const ServicesSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  // For desktop, we paginate 4 at a time
  const itemsPerPage = 4;
  const totalPages = Math.ceil(services.length / itemsPerPage);
  const visibleServices = services.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section className="services-section-elegant">
      <div className="services-container">
        
        <div className="services-header-elegant">

          <h2 className="services-title-elegant">
            Solutions That Build <span className="gold-text">Wealth</span> & Secure Futures
          </h2>
          <div className="header-divider">
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>
          <p className="services-subtitle-elegant">
            Comprehensive financial solutions designed to help you<br/>
            navigate the complexities of wealth management.
          </p>
        </div>

        <div className="services-carousel-wrapper">
          <button className="carousel-nav-btn prev-btn" onClick={handlePrev} aria-label="Previous services">
            <ChevronLeft size={28} />
          </button>
          
          <div className="services-grid-elegant">
            {visibleServices.map((service, idx) => {
              const index = currentPage * itemsPerPage + idx;
              const Icon = service.icon;
              const isActive = hoveredCard === index;
              
              return (
                <motion.div 
                  key={index}
                  className={`service-card-elegant ${isActive ? 'active-card' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-top-row">
                    <div className="card-icon-wrapper" style={{ position: 'relative' }}>
                      <Icon size={24} color={isActive ? "#fca311" : "#475569"} strokeWidth={2.5} style={{ transition: 'color 0.3s' }} />
                    </div>
                  </div>
                  
                  <h3 className="card-title-elegant">{service.title}</h3>
                  <div className="title-underline" style={{ 
                    backgroundColor: isActive ? 'var(--color-secondary)' : '#e2e8f0',
                    transition: 'background-color 0.3s'
                  }}></div>
                  
                  {/* Information is now always visible */}
                  <div className="card-info-content">
                    <p className="card-desc" style={{ marginBottom: '25px', marginTop: '15px' }}>{service.description}</p>
                    <a href="#" className="card-link">Learn More &rarr;</a>
                  </div>
                  
                </motion.div>
              );
            })}
          </div>

          <button className="carousel-nav-btn next-btn" onClick={handleNext} aria-label="Next services">
            <ChevronRight size={28} />
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="carousel-dots-elegant">
          {Array.from({ length: totalPages }).map((_, pageIdx) => (
            <button
              key={pageIdx}
              className={`carousel-dot ${currentPage === pageIdx ? 'active-dot' : ''}`}
              onClick={() => setCurrentPage(pageIdx)}
              aria-label={`Go to page ${pageIdx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
