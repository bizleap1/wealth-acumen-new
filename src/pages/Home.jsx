import React from 'react';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import ServicesSection from '../components/ServicesSection';
import BenefitsSection from '../components/BenefitsSection';
import CompoundingSection from '../components/CompoundingSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import InsightsSection from '../components/InsightsSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <>
      <div className="hero-sticky-wrapper">
        <Hero />
      </div>

      <div className="content-scroll-over">
        <ServicesSection />
        <IntroSection />
        <CompoundingSection />
        <BenefitsSection />
        <StatsSection />
        <InsightsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </>
  );
}

export default Home;
