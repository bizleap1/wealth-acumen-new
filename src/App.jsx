import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Proprietor from './pages/Proprietor';
import FAQs from './pages/FAQs';
import DIY from './pages/DIY';
import Equity from './pages/Equity';
import ETF from './pages/ETF';
import MutualFunds from './pages/MutualFunds';
import Insurance from './pages/Insurance';
import Bonds from './pages/Bonds';
import FixedDeposit from './pages/FixedDeposit';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import Downloads from './pages/Downloads';
import EBook from './pages/EBook';
import WhatsAppWidget from './components/WhatsAppWidget';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/proprietor" element={<Proprietor />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/diy" element={<DIY />} />
          <Route path="/equity" element={<Equity />} />
          <Route path="/etfs" element={<ETF />} />
          <Route path="/mutual-funds" element={<MutualFunds />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/bonds" element={<Bonds />} />
          <Route path="/fixed-deposit" element={<FixedDeposit />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/e-book" element={<EBook />} />
        </Routes>
        
        <Footer />
        <WhatsAppWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;
