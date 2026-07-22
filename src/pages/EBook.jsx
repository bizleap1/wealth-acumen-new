import React from 'react';
import { BookOpen, BarChart2, ShieldCheck, FileCheck, Download, Book, User, Mail, Phone, Lock, Shield } from 'lucide-react';
import './EBook.css';

const EBook = () => {
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
            <h2>Submit form to <span>download E-Book</span></h2>
            <hr className="gold-line" />
            <p>Fill in your details and get instant access to our exclusive e-book.</p>
            
            <div className="form-books-wrapper">
              <img src="/images/ebook-form-books.png" alt="Financial Freedom Books" className="form-books-img" />
            </div>
          </div>
          
          <div className="form-right-panel">
            <form className="ebook-download-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-grid">
                <div className="input-group">
                  <User size={18} color="#64748b" className="input-icon" />
                  <input type="text" placeholder="Name" />
                </div>
                <div className="input-group">
                  <Mail size={18} color="#64748b" className="input-icon" />
                  <input type="email" placeholder="Email" />
                </div>
                <div className="input-group">
                  <Phone size={18} color="#64748b" className="input-icon" />
                  <input type="tel" placeholder="Mobile Number" />
                </div>
                <div className="input-group select-group">
                  <BookOpen size={18} color="#64748b" className="input-icon" />
                  <select defaultValue="">
                    <option value="" disabled>Select E-Book</option>
                    <option value="basics">Investment Basics</option>
                    <option value="mutual-funds">Mutual Funds Guide</option>
                    <option value="taxation">Taxation Handbook</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="download-btn">
                SUBMIT
              </button>
              
              <div className="trust-markers">
                <p><Lock size={14} color="#64748b" /> We respect your privacy. Your information is safe with us.</p>
                <div className="spam-badge">
                  <Shield size={14} color="#64748b" /> No spam. Unsubscribe anytime.
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EBook;
