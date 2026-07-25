import React from 'react';
import { QrCode } from 'lucide-react'; // kept in case it's used elsewhere, otherwise we can remove it
import './DIY.css';

const DIY = () => {
  return (
    <div className="diy-page">
        <div className="diy-container">
          <div className="diy-content">
            
            {/* Left Column: Scanner */}
            <div className="diy-scanner-col">
              <div className="scanner-card">
                <h3 className="scanner-title">
                  <span className="angel-accent">Angel</span><span className="angel-blue">One</span>
                </h3>
                <div className="qr-box">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://play.google.com/store/apps/details?id=com.msf.angelmobile" alt="Angel One App QR Code" width={140} height={140} style={{ display: 'block' }} />
                </div>
                <p className="scanner-footer">Scan here to open Demat Account</p>
              </div>
            </div>

            {/* Right Column: Text */}
            <div className="diy-text-col">
              <h1 className="diy-title">Do It Yourself</h1>
              
              <div className="diy-text-blocks">
                <p>We understand that many people today prefer not to receive frequent sales calls or investment pitches. That's why we offer a Do It Yourself option for your convenience.</p>
                
                <p>Simply scan the QR code below and download the Angel One app — your one-stop platform for all types of investment products, including stocks, mutual funds, ETFs, IPOs, and more.</p>
                
                <p>Whether you're a beginner or an experienced investor, Wealth Acumen is here to support and guide you throughout your investment journey.</p>
                
                <p>Start investing on your own terms — anytime, anywhere.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
};

export default DIY;
