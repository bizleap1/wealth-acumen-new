import React, { useState } from 'react';
import { BookOpen, BarChart2, ShieldCheck, FileCheck, Download, Book, User, Mail, Phone, Lock, Shield } from 'lucide-react';
import './EBook.css';

const EBook = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ebook: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, ebook } = formData;
    if (!name || !email || !phone || !ebook) {
      alert("Please fill out all fields.");
      return;
    }
    const subject = `E-Book Request: ${ebook}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nRequested E-Book: ${ebook}`;
    window.location.href = `mailto:info@wealthacumen.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    alert("Thank you! Your email client will now open to send the request.");
    setFormData({ name: '', email: '', phone: '', ebook: '' });
  };

  return (
    <div className="ebook-page-v2">
      {/* Hero Section */}
      <section className="ebook-hero-v2">
        <div className="ebook-hero-content">
          <div className="ebook-hero-left">
            <div className="breadcrumb">HOME &gt; E-BOOK</div>
            
            <h1 className="hero-title">E-Book</h1>
            <p className="hero-description">
              Enhance your financial knowledge with our curated collection of educational e-books. From investment basics to advanced strategies, we have you covered.
            </p>
            
            <div className="features-row">
              <div className="feature-item">
                <div className="feature-icon"><BarChart2 size={24} color="#0f172a" /></div>
                <h4>Expert Insights</h4>
                <p>Learn from industry experts</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><ShieldCheck size={24} color="#0f172a" /></div>
                <h4>Practical Strategies</h4>
                <p>Actionable strategies for real growth</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><FileCheck size={24} color="#0f172a" /></div>
                <h4>Trusted Content</h4>
                <p>Reliable & well researched material</p>
              </div>
            </div>
          </div>
          
          <div className="ebook-hero-right">
            <div className="image-container-angled">
              <img src="/images/ebook-hero.png" alt="E-Book Reader" />
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="ebook-form-section-v2">
        <div className="ebook-form-card">
          <div className="form-left-panel">
            <h2>Submit form to <span>Get E-Book</span></h2>
            <hr className="gold-line" />
            <p>Fill in your details and get instant access to our exclusive e-book.</p>
            
            <div className="form-books-wrapper">
              <img src="/images/ebook-form-books.png" alt="Financial Freedom Books" className="form-books-img" />
            </div>
          </div>
          
          <div className="form-right-panel">
            <form className="ebook-download-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <User size={18} color="#64748b" className="input-icon" />
                  <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="input-group">
                  <Mail size={18} color="#64748b" className="input-icon" />
                  <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="input-group">
                  <Phone size={18} color="#64748b" className="input-icon" />
                  <input type="tel" placeholder="Mobile Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="input-group select-group">
                  <BookOpen size={18} color="#64748b" className="input-icon" />
                  <select value={formData.ebook} onChange={(e) => setFormData({...formData, ebook: e.target.value})}>
                    <option value="" disabled>Select E-Book</option>
                    <option value="Technical Analysis For Beginners">Technical Analysis For Beginners</option>
                    <option value="Fundamental Analysis For Beginners">Fundamental Analysis For Beginners</option>
                    <option value="Mutual Fund">Mutual Fund</option>
                    <option value="Insurance E-Book">Insurance E-Book</option>
                    <option value="Fixed Income E-Book">Fixed Income E-Book</option>
                    <option value="Stock Market BTS E-book">Stock Market BTS E-book</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="download-btn">
                SUBMIT
              </button>
              
              <div className="trust-markers">
                <p><Lock size={14} color="#64748b" /> We respect your privacy. Your information is safe with us.</p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EBook;
