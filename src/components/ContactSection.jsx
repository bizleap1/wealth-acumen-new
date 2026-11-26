import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, AlignLeft, MessageSquare, Send, Clock, HeadphonesIcon, ShieldCheck, Share2, MapPin, Users, Star, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill out all fields before sending.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim()
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you for contacting us! Your enquiry has been submitted successfully. Our team will get back to you shortly.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        const errorMsg = data.error || (data.details && data.details[0]) || 'Unable to submit your enquiry at the moment. Please try again later.';
        setStatus({
          type: 'error',
          message: errorMsg
        });
      }
    } catch (err) {
      console.error('[ContactSection] Submit failed:', err);
      setStatus({
        type: 'error',
        message: 'Unable to submit your enquiry at the moment. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="contact-section">
      <div className="cs-container">
        
        <div className="contact-main-grid">
          
          {/* Left Column */}
          <motion.div className="contact-left-col" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="contact-title">
              Reach Out<br/>
              Let's Build<br/>
              <span className="highlight-gold">Your Wealth</span><br/>
              <span className="highlight-gold">Together</span>
            </h2>
            <p className="contact-desc">
              Have questions or need expert advice? We're here to help you plan a better financial future. Get in touch and our team will get back to you soon.
            </p>
            
            <div className="stats-card-dark">
              <div className="stat-item">
                <Users size={24} color="#f59e0b" />
                <h4>200+</h4>
                <p>Happy Clients</p>
              </div>
              <div className="stat-item">
                <ShieldCheck size={24} color="#f59e0b" />
                <h4>98%</h4>
                <p>Satisfaction</p>
              </div>
              <div className="stat-item">
                <Star size={24} color="#f59e0b" />
                <h4>5+</h4>
                <p>Years of Trust</p>
              </div>
            </div>
          </motion.div>

          {/* Center Column: Form */}
          <motion.div className="contact-center-col" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
            <div className="contact-form-card">
              
              <div className="form-card-header">
                <div className="send-icon-wrapper"><Send size={20} color="#ffffff" /></div>
                <div>
                  <h3>Send Us a Message</h3>
                  <p>We'll get back to you as soon as possible.</p>
                </div>
              </div>

              {status.message && (
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: status.type === 'success' ? '#ecfdf5' : '#fef2f2',
                    color: status.type === 'success' ? '#065f46' : '#991b1b',
                    border: `1px solid ${status.type === 'success' ? '#a7f3d0' : '#fecaca'}`
                  }}
                >
                  {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>{status.message}</span>
                </div>
              )}

              <form className="cs-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="input-group">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name*"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email*"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="input-group">
                    <Phone size={18} className="input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Number*"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <AlignLeft size={18} className="input-icon" />
                    <input
                      type="text"
                      name="subject"
                      placeholder="Your Subject*"
                      className="form-input"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>

                <div className="input-group align-top full-width">
                  <MessageSquare size={18} className="input-icon" />
                  <textarea
                    name="message"
                    placeholder="Enter your message..."
                    className="form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="submit-btn-gold"
                  disabled={isSubmitting}
                  style={{
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="spinner-animate" />
                      SUBMITTING...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      SEND MESSAGE
                    </>
                  )}
                </button>

                <div className="safe-info-center">
                  <ShieldCheck size={16} color="#475569" />
                  <span>Your information is <span className="highlight-gold-text">safe and secure</span> with us.</span>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Right Column: Info Cards */}
          <motion.div className="contact-right-col" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}>
            
            <div className="info-cards-stack">
              <div className="info-card-glass">
                <div className="info-icon-circle blue"><Clock size={20} /></div>
                <div className="info-content-glass">
                  <h5>Quick Response</h5>
                  <p>We reply within 24 hrs</p>
                </div>
              </div>

              <div className="info-card-glass">
                <div className="info-icon-circle gold"><HeadphonesIcon size={20} /></div>
                <div className="info-content-glass">
                  <h5>Expert Support</h5>
                  <p>Talk to our specialists</p>
                </div>
              </div>

              <div className="info-card-glass">
                <div className="info-icon-circle blue-dark"><ShieldCheck size={20} /></div>
                <div className="info-content-glass">
                  <h5>Secure & Private</h5>
                  <p>Your data is protected</p>
                </div>
              </div>
            </div>

            <div className="office-card-glass">
              <div className="map-pin-badge"><MapPin size={24} color="#f59e0b" /></div>
              <h4>Visit Our Office</h4>
              <p>Ground Floor, Empress Mahal, Plot No. 170, near Dadar TT Circle, Dadar East, Mumbai, Maharashtra 400014</p>
              <div className="office-actions">
                <div className="action-btn-glass" style={{cursor: 'pointer'}} onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Wealth Acumen Office Location',
                      text: 'Ground Floor, Empress Mahal, Plot No. 170, near Dadar TT Circle, Dadar East, Mumbai, Maharashtra 400014',
                      url: 'https://www.google.com/maps/place/Empress+Mahal,+Plot+No.+170,+Dadar+East,+Mumbai,+Maharashtra+400014'
                    }).catch(console.error);
                  } else {
                    navigator.clipboard.writeText('Ground Floor, Empress Mahal, Plot No. 170, near Dadar TT Circle, Dadar East, Mumbai, Maharashtra 400014');
                    alert('Address copied to clipboard!');
                  }
                }}>
                  <Share2 size={16} />
                  <span>Share Location</span>
                </div>
                <div className="action-btn-glass" style={{cursor: 'pointer'}} onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Empress+Mahal,+Plot+No.+170,+Dadar+East,+Mumbai,+Maharashtra+400014', '_blank')}>
                  <Send size={16} />
                  <span>Get Directions</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Bottom Banner */}
        <motion.div className="contact-bottom-banner" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} viewport={{ once: true }}>
          <div className="banner-item">
            <div className="banner-icon"><Mail size={24} color="#f59e0b" /></div>
            <div className="banner-text">
              <h5>Prefer email?</h5>
              <p>Write to us at <span className="highlight-gold-text">info@wealthacumen.in</span></p>
            </div>
          </div>
          <div className="banner-item">
            <div className="banner-icon"><Phone size={24} color="#f59e0b" /></div>
            <div className="banner-text">
              <h5>Call us</h5>
              <p className="highlight-gold-text">+91 9325227357</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
