import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const isFirstPartFilled = name.trim() !== '' && email.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      alert("Please fill out all fields before sending.");
      return;
    }
    const mailSubject = `Contact Form: ${subject}`;
    const mailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:info@wealthacumen.in?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    alert("Thank you! Your email client will now open so you can send your message.");
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
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
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-col">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                
                <div className={`form-col ${!isFirstPartFilled ? 'col-disabled' : ''}`}>
                  <div className="form-group">
                    <label>Subject</label>
                    <input type="text" placeholder="How can we help?" value={subject} onChange={(e) => setSubject(e.target.value)} disabled={!isFirstPartFilled} required />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea rows="4" placeholder="Write your message here..." value={message} onChange={(e) => setMessage(e.target.value)} disabled={!isFirstPartFilled} required></textarea>
                  </div>
                </div>
              </div>
              <button type="submit" className="primary-btn-gold" style={{width: '100%', opacity: isFirstPartFilled ? 1 : 0.5}} disabled={!isFirstPartFilled}>Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
