import React from 'react';
import './AmcPartnersSection.css';

const amcLogos = [
  { id: 1, name: 'HDFC Mutual Fund', imgUrl: 'https://logo.clearbit.com/hdfcfund.com' },
  { id: 2, name: 'Kotak Mutual Fund', imgUrl: 'https://logo.clearbit.com/kotakmf.com' },
  { id: 3, name: 'SBI Mutual Fund', imgUrl: 'https://logo.clearbit.com/sbimf.com' },
  { id: 4, name: 'Groww Mutual Fund', imgUrl: 'https://logo.clearbit.com/groww.in' },
  { id: 5, name: 'Angel One', imgUrl: 'https://logo.clearbit.com/angelone.in' },
  { id: 6, name: 'PPFAS Mutual Fund', imgUrl: 'https://logo.clearbit.com/amc.ppfas.com' },
  { id: 7, name: 'Canara Robeco', imgUrl: 'https://logo.clearbit.com/canararobeco.com' },
  { id: 8, name: 'DSP Mutual Fund', imgUrl: 'https://logo.clearbit.com/dspim.com' },
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
                <img 
                  src={logo.imgUrl} 
                  alt={logo.name} 
                  className="amc-logo-img" 
                  onError={(e) => { 
                    e.target.style.display = 'none'; 
                    e.target.nextSibling.style.display = 'block'; 
                  }} 
                />
                <span className="amc-name" style={{ display: 'none' }}>{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmcPartnersSection;
