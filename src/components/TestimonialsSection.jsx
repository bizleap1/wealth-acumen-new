import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import './TestimonialsSection.css';

const testimonials = [
  {
    id: 1,
    name: "Nandita Tamhane",
    text: '"Mr. Atharva is a trustworthy advisor who provides investment guidance based on individual needs. He also helped me recover an old frozen demat account with another broker, where I had lost hope of getting my money back. I\'m truly happy with his support and work."',
    product: "INVESTMENT GUIDANCE"
  },
  {
    id: 2,
    name: "Shekhar Jogwar",
    text: '"It is very nice experience and journey of investment and trading with you since last 2 years. Learned a lot with basics in trading and then via systematic investment plan with SIP. Your knowhow and experience worked for all of us in our family."',
    product: "TRADING & SIP"
  },
  {
    id: 3,
    name: "Manisha Kahate",
    text: '"My sincere thanks to Mr. Atharva for providing the knowledge of stock market in very simple but clear ways. Your knowledge and clear explanations have significantly enhanced my understanding. I would recommend Wealth Accumen to anyone who wants to learn trading."',
    product: "TRADING COURSE"
  },
  {
    id: 4,
    name: "Rupesh Gupta",
    text: '"Wealth Acumen helped me understand how knowledge and psychology play a key role in investing. I applied what I learned and have already started seeing positive results. Truly an eye-opening experience."',
    product: "PORTFOLIO MANAGEMENT"
  }
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // Auto rotate every 5 seconds
    return () => clearInterval(timer);
  }, [handleNext]);
  
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        
        <div className="testimonials-header-centered">
          <div className="header-text">
            <h2 className="section-title-dark">Our Happy & Satisfied Clients</h2>
          </div>
          
          <div className="testimonials-arrows-side">
            <button className="carousel-arrow" onClick={handlePrev}><ArrowLeft size={20} strokeWidth={2.5} /></button>
            <button className="carousel-arrow" onClick={handleNext}><ArrowRight size={20} strokeWidth={2.5} /></button>
          </div>
        </div>

        <div className="testimonials-slider-wrapper">
          <motion.div 
            className="testimonials-slider-3col"
            animate={{ x: `-${currentIndex * (window.innerWidth < 768 ? 100 : window.innerWidth < 992 ? 50 : 33.333)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Duplicating the array so the slider doesn't look empty when scrolling near the end */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="testimonial-card">
                <h4 className="author-name">{testimonial.name}</h4>
                
                <div className="testimonial-content">
                  <p>{testimonial.text}</p>
                </div>

                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#fbbc04" color="#fbbc04" />
                  ))}
                  <span className="google-icon-wrapper"><GoogleIcon /></span>
                </div>

                <div className="card-divider"></div>

                <div className="product-footer">
                  <span className="product-name">{testimonial.product}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
