import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowLeft, Mail } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './Careers.css';

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="careers-page">
      <PageHeader
        titleFirst="Career"
        titleLast="Opportunities."
        subtitle="Explore career pathways and join our growing wealth management advisory team."
      />

      <div className="careers-container">
        <div className="careers-empty-card">
          <div className="careers-icon-bubble">
            <Briefcase size={36} className="careers-briefcase-icon" />
          </div>

          <h2 className="careers-empty-title">No Opportunities Available Currently</h2>
          
          <p className="careers-empty-desc">
            We currently do not have any open vacancies. Please check back at a later date or share your profile with us for upcoming openings.
          </p>

          <div className="careers-contact-box">
            <Mail size={16} className="careers-mail-icon" />
            <span>Interested in future roles? Write to us at <a href="mailto:info@wealthacumen.in">info@wealthacumen.in</a></span>
          </div>

          <div className="careers-actions">
            <Link to="/" className="btn-careers-home">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
