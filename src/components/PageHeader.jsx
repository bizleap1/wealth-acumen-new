import React from 'react';
import './PageHeader.css';

const PageHeader = ({ titleFirst, titleLast, subtitle }) => {
  return (
    <div className="page-header-container">
      <div className="page-header-content">
        <div className="ph-overline">
          <span className="ph-line"></span>
          <span className="ph-text">WEALTH ACUMEN</span>
          <span className="ph-line"></span>
        </div>
        
        <h1 className="ph-title">
          <span className="ph-title-dark">{titleFirst}</span> <span className="ph-title-gold">{titleLast}</span>
        </h1>
        
        <div className="ph-curve-container">
          <p className="ph-subtitle">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
