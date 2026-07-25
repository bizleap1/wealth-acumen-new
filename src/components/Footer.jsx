import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logoImage from '../assets/image copy 3.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Column 1: Logo & Registration */}
          <div className="footer-col logo-col">
            <Link to="/" className="footer-logo" style={{ textDecoration: 'none' }}>
              <img src={logoImage} alt="Wealth Acumen Logo" className="footer-logo-img" style={{ objectFit: 'contain', borderRadius: '4px' }} />
              <span className="logo-text-large" style={{ letterSpacing: '2px' }}>WEALTH ACUMEN</span>
            </Link>
            <div className="registration-info">
              <p>AMFI REGISTERED MUTUAL FUND DISTRIBUTOR</p>
              <p>AMFI REGISTRATION NO. 247468</p>
              <p>EUIN NO. - E459104</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col links-col">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/downloads">Downloads</Link></li>
              <li><Link to="/faqs">FAQs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="footer-col services-col">
            <h3>Our Services</h3>
            <ul>
              <li><Link to="/equity">Equity</Link></li>
              <li><Link to="/mutual-funds">Mutual Funds</Link></li>
              <li><Link to="/insurance">Insurance</Link></li>
              <li><Link to="/etfs">ETFs (Exchange Traded Funds)</Link></li>
              <li><Link to="/bonds">Bonds</Link></li>
              <li><Link to="/fixed-deposit">Fixed Deposit</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="footer-col contact-col">
            <h3>Contact Us</h3>
            <div className="contact-details">
              <p><a href="https://wa.me/919325227357" style={{color: 'inherit', textDecoration: 'none'}}>+91 9325227357</a></p>
              <p>info@wealthacumen.in</p>
              <p>Ground Floor, Empress Mahal, Plot No. 170,<br/>near Dadar TT Circle, Dadar East, Mumbai, Maharashtra 400014</p>
            </div>
            <div className="social-icons-bottom">
              <a href="https://www.instagram.com/wealthacumen31?igsh=MWIzcHpzbWt4ZDByMQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Instagram"><FaInstagram size={18} /></a>
              <a href="https://wa.me/919325227357" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="WhatsApp"><FaWhatsapp size={18} /></a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
