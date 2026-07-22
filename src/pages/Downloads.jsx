import React from 'react';
import { Search, ShieldCheck, Download, ExternalLink, FileText } from 'lucide-react';
import './Downloads.css';

const Downloads = () => {
  return (
    <div className="downloads-page">
      {/* Hero Section */}
      <section className="downloads-hero">
        <div className="downloads-hero-content">
          <h1>Downloads & Forms</h1>
          <p>Access all essential forms, factsheets, and documentation required for your investments.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="downloads-main-v2">
        <div className="downloads-container-v2">
          
          {/* Section 1: Check KYC Status */}
          <div className="dl-section">
            <div className="dl-section-header">
              <div className="dl-icon-circle bg-yellow"><Search size={20} color="#d97706" /></div>
              <div>
                <h2>Check your KYC Status</h2>
                <p>Verify your KYC registration status through any of the KRA portals below.</p>
              </div>
            </div>
            
            <div className="dl-card-grid">
              <a href="#" className="dl-card" target="_blank" rel="noopener noreferrer">
                <div className="dl-card-icon bg-yellow-light"><Search size={18} color="#d97706" /></div>
                <div className="dl-card-text">
                  <h3>CVLKRA</h3>
                  <span>Check status</span>
                </div>
                <ExternalLink size={18} className="dl-action-icon" />
              </a>
              <a href="#" className="dl-card" target="_blank" rel="noopener noreferrer">
                <div className="dl-card-icon bg-yellow-light"><Search size={18} color="#d97706" /></div>
                <div className="dl-card-text">
                  <h3>NSDL KRA</h3>
                  <span>Check status</span>
                </div>
                <ExternalLink size={18} className="dl-action-icon" />
              </a>
              <a href="#" className="dl-card" target="_blank" rel="noopener noreferrer">
                <div className="dl-card-icon bg-yellow-light"><Search size={18} color="#d97706" /></div>
                <div className="dl-card-text">
                  <h3>CAMS KRA</h3>
                  <span>Check status</span>
                </div>
                <ExternalLink size={18} className="dl-action-icon" />
              </a>
              <a href="#" className="dl-card" target="_blank" rel="noopener noreferrer">
                <div className="dl-card-icon bg-yellow-light"><Search size={18} color="#d97706" /></div>
                <div className="dl-card-text">
                  <h3>NSE KRA</h3>
                  <span>Check status</span>
                </div>
                <ExternalLink size={18} className="dl-action-icon" />
              </a>
              <a href="#" className="dl-card" target="_blank" rel="noopener noreferrer">
                <div className="dl-card-icon bg-yellow-light"><Search size={18} color="#d97706" /></div>
                <div className="dl-card-text">
                  <h3>KARVY KRA</h3>
                  <span>Check status</span>
                </div>
                <ExternalLink size={18} className="dl-action-icon" />
              </a>
            </div>
          </div>

          {/* Section 2: Validate your KYC */}
          <div className="dl-section">
            <div className="dl-section-header">
              <div className="dl-icon-circle bg-blue"><ShieldCheck size={20} color="#0369a1" /></div>
              <div>
                <h2>Validate your KYC</h2>
                <p>Validate and update your KYC details through these portals.</p>
              </div>
            </div>
            
            <div className="dl-card-grid two-col">
              <a href="#" className="dl-card" target="_blank" rel="noopener noreferrer">
                <div className="dl-card-icon bg-blue-light"><ShieldCheck size={18} color="#0369a1" /></div>
                <div className="dl-card-text">
                  <h3>CVLKRA</h3>
                  <span>Validate KYC</span>
                </div>
                <ExternalLink size={18} className="dl-action-icon" />
              </a>
              <a href="#" className="dl-card" target="_blank" rel="noopener noreferrer">
                <div className="dl-card-icon bg-blue-light"><ShieldCheck size={18} color="#0369a1" /></div>
                <div className="dl-card-text">
                  <h3>NSDL KRA</h3>
                  <span>Validate KYC</span>
                </div>
                <ExternalLink size={18} className="dl-action-icon" />
              </a>
              <a href="#" className="dl-card" target="_blank" rel="noopener noreferrer">
                <div className="dl-card-icon bg-blue-light"><ShieldCheck size={18} color="#0369a1" /></div>
                <div className="dl-card-text">
                  <h3>CAMS KRA</h3>
                  <span>Validate KYC</span>
                </div>
                <ExternalLink size={18} className="dl-action-icon" />
              </a>
              <a href="#" className="dl-card" target="_blank" rel="noopener noreferrer">
                <div className="dl-card-icon bg-blue-light"><ShieldCheck size={18} color="#0369a1" /></div>
                <div className="dl-card-text">
                  <h3>KARVY KRA</h3>
                  <span>Validate KYC</span>
                </div>
                <ExternalLink size={18} className="dl-action-icon" />
              </a>
            </div>
          </div>

          {/* Section 3: Download Forms */}
          <div className="dl-section">
            <div className="dl-section-header">
              <div className="dl-icon-circle bg-yellow"><Download size={20} color="#d97706" /></div>
              <div>
                <h2>Download Forms</h2>
                <p>Download KYC and FATCA forms in PDF format.</p>
              </div>
            </div>
            
            <div className="dl-card-grid two-col">
              <a href="#" className="dl-card" download>
                <div className="dl-card-icon bg-yellow-light"><FileText size={18} color="#d97706" /></div>
                <div className="dl-card-text">
                  <h3>KYC Non-Individual</h3>
                  <span>PDF Document</span>
                </div>
                <Download size={18} className="dl-action-icon" />
              </a>
              <a href="#" className="dl-card" download>
                <div className="dl-card-icon bg-yellow-light"><FileText size={18} color="#d97706" /></div>
                <div className="dl-card-text">
                  <h3>KYC Individual</h3>
                  <span>PDF Document</span>
                </div>
                <Download size={18} className="dl-action-icon" />
              </a>
              <a href="#" className="dl-card" download>
                <div className="dl-card-icon bg-yellow-light"><FileText size={18} color="#d97706" /></div>
                <div className="dl-card-text">
                  <h3>FATCA Non-Individual</h3>
                  <span>PDF Document</span>
                </div>
                <Download size={18} className="dl-action-icon" />
              </a>
              <a href="#" className="dl-card" download>
                <div className="dl-card-icon bg-yellow-light"><FileText size={18} color="#d97706" /></div>
                <div className="dl-card-text">
                  <h3>FATCA Individual</h3>
                  <span>PDF Document</span>
                </div>
                <Download size={18} className="dl-action-icon" />
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Downloads;
