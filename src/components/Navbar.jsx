import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import logoImage from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const darkHeaderPaths = ['/', '/contact', '/downloads'];
  const isDarkHeader = darkHeaderPaths.includes(location.pathname);
  
  const headerClass = isDarkHeader ? 'transparent-dark' : 'solid-light';
  const navClass = isDarkHeader ? 'dark-theme' : 'light-theme';
  const logoClass = isDarkHeader ? 'dark-logo' : 'light-logo';

  return (
    <header className={`site-header ${headerClass}`}>
      <nav className={`main-nav ${navClass}`}>
        <div className="nav-container">
          <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
            <img src={logoImage} alt="Wealth Acumen Logo" style={{ height: '65px', objectFit: 'contain', borderRadius: '4px', marginRight: '-20px' }} />
            <div className={`logo-text ${logoClass}-text`}>WEALTH ACUMEN</div>
          </Link>
          
          <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} color={isDarkHeader ? '#ffffff' : '#111827'} /> : <Menu size={28} color={isDarkHeader ? '#ffffff' : '#111827'} />}
          </button>
          
          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li className="nav-item active"><Link to="/">Home</Link></li>
            <li className="nav-item has-dropdown">
              <Link to="/about">About Us <ChevronDown size={14}/></Link>
              <div className="dropdown-menu">
                <Link to="/about">About Us</Link>
                <Link to="/faqs">FAQs</Link>
                <Link to="/diy">DIY (Do It Yourself)</Link>
              </div>
            </li>
            <li className="nav-item has-dropdown">
              <a href="#">Services <ChevronDown size={14}/></a>
              <div className="dropdown-menu">
                <Link to="/equity">Equity</Link>
                <Link to="/mutual-funds">Mutual Funds</Link>
                <Link to="/insurance">Insurance</Link>
                <Link to="/etfs">ETFs (Exchange Traded Funds)</Link>
                <Link to="/bonds">Bonds</Link>
                <Link to="/fixed-deposit">Fixed Deposit</Link>
              </div>
            </li>
            <li className="nav-item has-dropdown">
              <a href="#">Learning <ChevronDown size={14}/></a>
              <div className="dropdown-menu">
                <Link to="/e-book">E-Book</Link>
              </div>
            </li>
            <li className="nav-item has-dropdown">
              <a href="#">Downloads <ChevronDown size={14}/></a>
              <div className="dropdown-menu">
                <Link to="/downloads">KYC/FATCA FORMS</Link>
                <a href="https://www.amfiindia.com/online-center/download-factsheets" target="_blank" rel="noopener noreferrer">MF FACTSHEET</a>
                <a href="https://www.amfiindia.com/investor/knowledge-center-info?zoneName=TaxRegimeForMutualFunds" target="_blank" rel="noopener noreferrer">MUTUAL FUND TAXATION</a>
              </div>
            </li>
            <li className="nav-item"><Link to="/blogs">Blogs</Link></li>
            <li className="nav-item"><Link to="/contact">Contact Us</Link></li>
            <li className="nav-item has-dropdown">
              <a href="#">Login/Register <ChevronDown size={14}/></a>
              <div className="dropdown-menu">
                <a href="https://angel-one.onelink.me/Wjgr/h9fay40r" target="_blank" rel="noopener noreferrer">App Login</a>
                <a href="https://angel-one.onelink.me/Wjgr/wcqvcyi6" target="_blank" rel="noopener noreferrer">Demat-Free MF Investment Login</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
