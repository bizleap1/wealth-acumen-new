import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const isFirstPartFilled = name.trim() !== '' && email.trim() !== '' && phone.trim() !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!name.trim() || !email.trim() || !phone.trim() || !subject.trim() || !message.trim()) {
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          subject: subject.trim(),
          message: message.trim()
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you for contacting us! Your enquiry has been submitted successfully. Our team will get back to you shortly.'
        });
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      } else {
        const errorMsg = data.error || (data.details && data.details[0]) || 'Unable to submit your enquiry at the moment. Please try again later.';
        setStatus({
          type: 'error',
          message: errorMsg
        });
      }
    } catch (err) {
      console.error('[ContactPage] Submission failed:', err);
      setStatus({
        type: 'error',
        message: 'Unable to submit your enquiry at the moment. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p>We are here to help you navigate your financial journey.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p className="contact-subtitle">Reach out to us for personalized wealth management strategies.</p>
            
            <div className="info-list">
              <div className="info-item">
                <div className="info-icon"><MapPin size={24} color="#d4af37" /></div>
                <div>
                  <h4>Our Office</h4>
                  <p>Ground Floor, Empress Mahal, Plot No. 170, near Dadar TT Circle,<br/>Dadar East, Mumbai, Maharashtra 400014</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><Phone size={24} color="#d4af37" /></div>
                <div>
                  <h4>Phone</h4>
                  <p><a href="https://wa.me/919325227357" style={{color: 'inherit', textDecoration: 'none'}}>+91 9325227357</a></p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><Mail size={24} color="#d4af37" /></div>
                <div>
                  <h4>Email</h4>
                  <p>info@wealthacumen.in</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><Clock size={24} color="#d4af37" /></div>
                <div>
                  <h4>Business Hours</h4>
                  <p>Mon - Fri: 10:00 AM - 6:00 PM<br/>Saturday & Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-wrapper">
            <h2>Send us a Message</h2>

            {status.message && (
              <div className={`contact-status-banner ${status.type}`}>
                {status.type === 'success' ? (
                  <CheckCircle2 size={20} className="status-icon" />
                ) : (
                  <AlertCircle size={20} className="status-icon" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-col">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div className={`form-col ${!isFirstPartFilled ? 'col-disabled' : ''}`}>
                  <div className="form-group">
                    <label>Subject *</label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      disabled={!isFirstPartFilled || isSubmitting}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea
                      rows="6"
                      placeholder="Write your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={!isFirstPartFilled || isSubmitting}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="primary-btn-gold"
                style={{
                  width: '100%',
                  opacity: (isFirstPartFilled && !isSubmitting) ? 1 : 0.6,
                  cursor: (isFirstPartFilled && !isSubmitting) ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                disabled={!isFirstPartFilled || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spinner-animate" />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
