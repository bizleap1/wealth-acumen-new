import React from 'react';
import './AmcPartnersSection.css';

const amcLogos = [
  { id: 1, name: 'HDFC Mutual Fund' },
  { id: 2, name: 'Kotak Mutual Fund' },
  { id: 3, name: 'SBI Mutual Fund' },
  { id: 4, name: 'Groww Mutual Fund' },
  { id: 5, name: 'Angel One' },
  { id: 6, name: 'PPFAS Mutual Fund' },
  { id: 7, name: 'Canara Robeco' },
  { id: 8, name: 'DSP Mutual Fund' },
];

const AmcPartnersSection = () => {
  return (
    <section className="amc-section">
      <div className="amc-container">
        <h2 className="amc-title">Empaneled With Following AMC</h2>
        
        <div className="amc-carousel-container">
          <div className="amc-carousel-track">
            {/* Double the array for infinite scrolling effect */}
            {[...amcLogos, ...amcLogos].map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="amc-logo-card">
                <span className="amc-name">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmcPartnersSection;
