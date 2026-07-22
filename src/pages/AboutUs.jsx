import React from 'react';
import FounderSection from '../components/FounderSection';
import AboutInfoSection from '../components/AboutInfoSection';
import AmcPartnersSection from '../components/AmcPartnersSection';
import AngelOneSection from '../components/AngelOneSection';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      {/* Elegant Banner */}
      <div className="about-banner">
        <div className="banner-content">
          <div className="banner-top-text">
            <div className="line"></div>
            <span>Wealth Acumen</span>
            <div className="line"></div>
          </div>
          <h1 className="banner-main-title">
            <span className="title-dark">About</span> <span className="title-gold">Us.</span>
          </h1>
          <p className="banner-subtitle">
            Helping families and businesses build lasting financial confidence.
          </p>
        </div>
      </div>

      <FounderSection />
      <AboutInfoSection />
      <AmcPartnersSection />
      <AngelOneSection />
    </div>
  );
};

export default AboutUs;
