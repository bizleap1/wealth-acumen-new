import React, { useState } from 'react';
import { 
  BarChart2, 
  ShieldCheck, 
  FileCheck, 
  Download, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Briefcase, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';
import './EBook.css';
const EBOOK_FILES = {
  'Insurance E-Book': {
    url: '/ebooks/INSURANCE_EBOOK.pdf',
    fileName: 'Insurance_EBook.pdf'
  },
  'Technical Analysis For Beginners': {
    url: '/ebooks/TECHNICAL_ANALYSIS.pdf',
    fileName: 'Technical_Analysis.pdf'
  },
  'Fundamental Analysis For Beginners': {
    url: '/ebooks/FUNDAMENTAL_ANALYSIS.pdf',
    fileName: 'Fundamental_Analysis.pdf'
  },
  'Mutual Fund': {
    url: '/ebooks/MUTUAL_FUND_EBOOK.pdf',
    fileName: 'Mutual_Fund_EBook.pdf'
  },
  'Fixed Income E-Book': {
    url: '/ebooks/FIXED_INCOME.pdf',
    fileName: 'Fixed_Income.pdf'
  },
  'Stock Market BTS E-book': {
    url: '/ebooks/STOCK_MARKET_BEHIND_THE_SCENE.pdf',
    fileName: 'Stock_Market_Behind_The_Scene.pdf'
  }
};

const EBook = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    ebook: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const { name, email, phone, company, ebook } = formData;
    
    // Strict Client Validation
    if (!name || name.trim().length < 2) {
      setStatusMessage({ type: 'error', text: 'Please enter your full name (minimum 2 characters).' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
    if (cleanPhone.length < 8) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid mobile number (minimum 8 digits).' });
      return;
    }
    if (!ebook || !EBOOK_FILES[ebook]) {
      setStatusMessage({ type: 'error', text: 'Please select an e-book from the dropdown list.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const ebookConfig = EBOOK_FILES[ebook];
    let downloadInitiated = false;

    try {
      const response = await fetch('/api/download-ebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          ebook: ebook
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Trigger the file download
        const downloadUrl = data.downloadUrl || ebookConfig?.url;
        const fileName = data.fileName || ebookConfig?.fileName || 'ebook.pdf';

        if (downloadUrl) {
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          downloadInitiated = true;
        }

        setStatusMessage({
          type: 'success',
          text: `Thank you, ${name.trim()}! Your e-book "${ebook}" download has started. Our advisory desk has been notified.`
        });

        // Reset the form on successful submission
        setFormData({ name: '', email: '', phone: '', company: '', ebook: '' });
      } else {
        throw new Error(data.error || 'Server was unable to process the request.');
      }
    } catch (err) {
      console.warn('[EBook] Backend submission warning, using client fallback:', err.message);

      // Graceful Fallback: Ensure download happens even if email service has a temporary glitch
      if (!downloadInitiated && ebookConfig) {
        const link = document.createElement('a');
        link.href = ebookConfig.url;
        link.download = ebookConfig.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setStatusMessage({
          type: 'success',
          text: `Thank you, ${name.trim()}! Your e-book "${ebook}" download has started.`
        });
        setFormData({ name: '', email: '', phone: '', company: '', ebook: '' });
      } else {
        setStatusMessage({
          type: 'error',
          text: err.message || 'Unable to initiate download. Please check your details and try again.'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
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
                  <input 
                    type="text" 
                    placeholder="Full Name *" 
                    required
                    value={formData.name} 
                    onChange={(e) => {
                      setFormData({...formData, name: e.target.value});
                      if (statusMessage) setStatusMessage(null);
                    }} 
                  />
                </div>
                <div className="input-group">
                  <Mail size={18} color="#64748b" className="input-icon" />
                  <input 
                    type="email" 
                    placeholder="Email Address *" 
                    required
                    value={formData.email} 
                    onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                      if (statusMessage) setStatusMessage(null);
                    }} 
                  />
                </div>
                <div className="input-group">
                  <Phone size={18} color="#64748b" className="input-icon" />
                  <input 
                    type="tel" 
                    placeholder="Mobile Number *" 
                    required
                    value={formData.phone} 
                    onChange={(e) => {
                      setFormData({...formData, phone: e.target.value});
                      if (statusMessage) setStatusMessage(null);
                    }} 
                  />
                </div>
                <div className="input-group">
                  <Briefcase size={18} color="#64748b" className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="Company Name (Optional)" 
                    value={formData.company} 
                    onChange={(e) => {
                      setFormData({...formData, company: e.target.value});
                      if (statusMessage) setStatusMessage(null);
                    }} 
                  />
                </div>
                <div className="input-group select-group full-width">
                  <BookOpen size={18} color="#64748b" className="input-icon" />
                  <select 
                    value={formData.ebook} 
                    required
                    onChange={(e) => {
                      setFormData({...formData, ebook: e.target.value});
                      if (statusMessage) setStatusMessage(null);
                    }}
                  >
                    <option value="" disabled>Select E-Book *</option>
                    <option value="Technical Analysis For Beginners">Technical Analysis For Beginners</option>
                    <option value="Fundamental Analysis For Beginners">Fundamental Analysis For Beginners</option>
                    <option value="Mutual Fund">Mutual Fund E-Book</option>
                    <option value="Insurance E-Book">Insurance E-Book</option>
                    <option value="Fixed Income E-Book">Fixed Income E-Book</option>
                    <option value="Stock Market BTS E-book">Stock Market BTS E-book</option>
                  </select>
                </div>
              </div>

              {statusMessage && (
                <div className={`form-status-alert ${statusMessage.type}`}>
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 size={18} className="status-icon" />
                  ) : (
                    <AlertCircle size={18} className="status-icon" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}
              
              <button type="submit" className="download-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="spin-icon" />
                    <span>Processing Download...</span>
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    <span>Download E-Book</span>
                  </>
                )}
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
