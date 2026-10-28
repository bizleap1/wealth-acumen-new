import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WhatsAppWidget from './components/WhatsAppWidget';
import RouteSEOListener from './components/SEO';
import './index.css';

// Lazy load secondary routes for optimal initial load time
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Proprietor = lazy(() => import('./pages/Proprietor'));
const FAQs = lazy(() => import('./pages/FAQs'));
const DIY = lazy(() => import('./pages/DIY'));
const Equity = lazy(() => import('./pages/Equity'));
const ETF = lazy(() => import('./pages/ETF'));
const MutualFunds = lazy(() => import('./pages/MutualFunds'));
const Insurance = lazy(() => import('./pages/Insurance'));
const Bonds = lazy(() => import('./pages/Bonds'));
const FixedDeposit = lazy(() => import('./pages/FixedDeposit'));
const SIF = lazy(() => import('./pages/SIF'));
const PMS = lazy(() => import('./pages/PMS'));
const Contact = lazy(() => import('./pages/Contact'));
const Blogs = lazy(() => import('./pages/Blogs'));
const Downloads = lazy(() => import('./pages/Downloads'));
const EBook = lazy(() => import('./pages/EBook'));
const Services = lazy(() => import('./pages/Services'));

const PageLoader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(252, 163, 17, 0.2)',
      borderTopColor: '#fca311',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <RouteSEOListener />
      <div className="app-container">
        <Navbar />
        
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/proprietor" element={<Proprietor />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/diy" element={<DIY />} />
            <Route path="/services" element={<Services />} />
            <Route path="/equity" element={<Equity />} />
            <Route path="/etfs" element={<ETF />} />
            <Route path="/mutual-funds" element={<MutualFunds />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/bonds" element={<Bonds />} />
            <Route path="/fixed-deposit" element={<FixedDeposit />} />
            <Route path="/sif" element={<SIF />} />
            <Route path="/pms" element={<PMS />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/e-book" element={<EBook />} />
            <Route path="*" element={<div style={{ padding: '100px', textAlign: 'center', fontSize: '2rem' }}>404 - Page Not Found. Current URL doesn't match any routes.</div>} />
          </Routes>
        </Suspense>
        
        <Footer />
        <WhatsAppWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;
