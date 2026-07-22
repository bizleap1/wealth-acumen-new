import React, { useEffect } from 'react';
import { Search, ShieldCheck, Download, ExternalLink, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import './Downloads.css';

const kycStatusLinks = [
  { title: "CVLKRA", link: "#" },
  { title: "NSDL KRA", link: "#" },
  { title: "CAMS KRA", link: "#" },
  { title: "NSE KRA", link: "#" },
  { title: "KARVY KRA", link: "#" }
];

const kycValidateLinks = [
  { title: "CVLKRA", link: "#" },
  { title: "NSDL KRA", link: "#" },
  { title: "CAMS KRA", link: "#" },
  { title: "KARVY KRA", link: "#" }
];

const formLinks = [
  { title: "KYC Non-Individual", link: "#" },
  { title: "KYC Individual", link: "#" },
  { title: "FATCA Non-Individual", link: "#" },
  { title: "FATCA Individual", link: "#" }
];

const Downloads = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="downloads-page">
      {/* Minimal Hero Section */}
      <section className="downloads-hero-minimal">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Downloads <span>& KYC</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Access KYC portals, validate your status, and download essential forms.
        </motion.p>
      </section>

      {/* Main Content */}
      <section className="downloads-main-v2">
        <div className="downloads-container-v2">
          
          {/* Section 1: Check KYC Status */}
          <div className="dl-section">
            <div className="dl-section-header">
              <div className="dl-icon-square bg-yellow"><Search size={20} /></div>
              <div className="dl-section-header-text">
                <h2>Check your KYC Status</h2>
                <p>Verify your KYC registration status through any of the KRA portals below.</p>
              </div>
            </div>
            
            <div className="dl-card-grid">
              {kycStatusLinks.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <a href={item.link} className="dl-card" target="_blank" rel="noopener noreferrer">
                    <div className="dl-card-icon bg-yellow-light"><Search size={20} /></div>
                    <div className="dl-card-text">
                      <h3>{item.title}</h3>
                      <span>Check status</span>
                    </div>
                    <ExternalLink size={18} className="dl-action-icon" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 2: Validate your KYC */}
          <div className="dl-section">
            <div className="dl-section-header">
              <div className="dl-icon-square bg-blue"><ShieldCheck size={20} /></div>
              <div className="dl-section-header-text">
                <h2>Validate your KYC</h2>
                <p>Validate and update your KYC details through these portals.</p>
              </div>
            </div>
            
            <div className="dl-card-grid two-col">
              {kycValidateLinks.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <a href={item.link} className="dl-card" target="_blank" rel="noopener noreferrer">
                    <div className="dl-card-icon bg-blue-light"><ShieldCheck size={20} /></div>
                    <div className="dl-card-text">
                      <h3>{item.title}</h3>
                      <span>Validate KYC</span>
                    </div>
                    <ExternalLink size={18} className="dl-action-icon" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 3: Download Forms */}
          <div className="dl-section">
            <div className="dl-section-header">
              <div className="dl-icon-square bg-yellow"><Download size={20} /></div>
              <div className="dl-section-header-text">
                <h2>Download Forms</h2>
                <p>Download KYC and FATCA forms in PDF format.</p>
              </div>
            </div>
            
            <div className="dl-card-grid two-col">
              {formLinks.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <a href={item.link} className="dl-card" download>
                    <div className="dl-card-icon bg-yellow-light"><FileText size={20} /></div>
                    <div className="dl-card-text">
                      <h3>{item.title}</h3>
                      <span>PDF Document</span>
                    </div>
                    <Download size={18} className="dl-action-icon" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Downloads;
