import React from 'react';
import './AmcPartnersSection.css';

const amcLogos = [
  { id: 1, name: 'HDFC Mutual Fund', short: 'HDFC', badgeColor: '#004c8f' },
  { id: 2, name: 'Kotak Mutual Fund', short: 'KOTAK', badgeColor: '#ed1c24' },
  { id: 3, name: 'SBI Mutual Fund', short: 'SBI', badgeColor: '#1d4ed8' },
  { id: 4, name: 'Groww Mutual Fund', short: 'GROWW', badgeColor: '#00d09c' },
  { id: 5, name: 'Angel One', short: 'ANGEL', badgeColor: '#f97316' },
  { id: 6, name: 'PPFAS Mutual Fund', short: 'PPFAS', badgeColor: '#831843' },
  { id: 7, name: 'Canara Robeco', short: 'CANARA', badgeColor: '#0284c7' },
  { id: 8, name: 'DSP Mutual Fund', short: 'DSP', badgeColor: '#334155' },
];

const AmcPartnersSection = () => {
  return (
    <section className="amc-section">
      <div className="amc-container">
        <h2 className="amc-title">Empaneled With Following AMC</h2>
        
        <div className="amc-carousel-container">
          <div className="amc-carousel-track">
            {/* Double the array for infinite scrolling effect */}
            {[...amcLogos, ...amcLogos].map((item, index) => (
              <div key={`${item.id}-${index}`} className="amc-logo-card">
                <div 
                  className="amc-badge-pill" 
                  style={{
                    backgroundColor: `${item.badgeColor}15`,
                    color: item.badgeColor,
                    borderColor: `${item.badgeColor}30`
                  }}
                >
                  {item.short}
                </div>
                <span className="amc-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmcPartnersSection;
