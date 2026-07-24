import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import logoImage from '../assets/image copy 3.png';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (e, name) => {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      setOpenDropdown(prev => prev === name ? null : name);
    }
  };
  
  const darkHeaderPaths = ['/', '/contact', '/services'];
  const isDarkHeader = darkHeaderPaths.includes(location.pathname) && !scrolled;
  const isHome = location.pathname === '/';

  const headerClass = isDarkHeader ? 'transparent-dark' : 'solid-light';
  const navClass = isDarkHeader ? 'dark-theme' : 'light-theme';
  const logoClass = isDarkHeader ? 'dark-logo' : 'light-logo';
  const positionClass = 'fixed-header';

  return (
    <header className={`site-header ${headerClass} ${positionClass} ${scrolled ? 'scrolled' : ''}`}>
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
            <li className={`nav-item has-dropdown ${openDropdown === 'about' ? 'open' : ''}`}>
              <Link to="/about" onClick={(e) => toggleDropdown(e, 'about')}>About Us <span className="dropdown-icon"><ChevronDown size={14}/></span></Link>
              <div className="dropdown-menu">
                <Link to="/about">About Us</Link>
                <Link to="/faqs">FAQs</Link>
                <Link to="/diy">DIY (Do It Yourself)</Link>
              </div>
            </li>
            <li className={`nav-item has-dropdown ${openDropdown === 'services' ? 'open' : ''}`}>
              <Link to="/services" onClick={(e) => toggleDropdown(e, 'services')}>Services <span className="dropdown-icon"><ChevronDown size={14}/></span></Link>
              <div className="dropdown-menu">
                <Link to="/equity">Equity</Link>
                <Link to="/mutual-funds">Mutual Funds</Link>
                <Link to="/insurance">Insurance</Link>
                <Link to="/etfs">ETFs (Exchange Traded Funds)</Link>
                <Link to="/bonds">Bonds</Link>
                <Link to="/fixed-deposit">Fixed Deposit</Link>
              </div>
            </li>
            <li className={`nav-item has-dropdown ${openDropdown === 'learning' ? 'open' : ''}`}>
              <a href="#" onClick={(e) => toggleDropdown(e, 'learning')}>Learning <span className="dropdown-icon"><ChevronDown size={14}/></span></a>
              <div className="dropdown-menu">
                <Link to="/e-book">E-Book</Link>
              </div>
            </li>
            <li className={`nav-item has-dropdown ${openDropdown === 'downloads' ? 'open' : ''}`}>
              <Link to="/downloads" onClick={(e) => toggleDropdown(e, 'downloads')}>Downloads <span className="dropdown-icon"><ChevronDown size={14}/></span></Link>
              <div className="dropdown-menu">
                <a href="https://www.amfiindia.com/online-center/download-factsheets" target="_blank" rel="noopener noreferrer">MF FACTSHEET</a>
                <a href="https://www.amfiindia.com/investor/knowledge-center-info?zoneName=TaxRegimeForMutualFunds" target="_blank" rel="noopener noreferrer">MUTUAL FUND TAXATION</a>
              </div>
            </li>
            <li className="nav-item"><Link to="/blogs">Blogs</Link></li>
            <li className="nav-item"><Link to="/contact">Contact Us</Link></li>
            <li className={`nav-item has-dropdown ${openDropdown === 'login' ? 'open' : ''}`}>
              <a href="#" onClick={(e) => toggleDropdown(e, 'login')}>Login/Register <span className="dropdown-icon"><ChevronDown size={14}/></span></a>
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
