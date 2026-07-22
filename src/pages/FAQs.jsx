import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import './FAQs.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqData = [
  {
    question: "What is Wealth Acumen Investment Services?",
    answer: "Wealth Acumen is a financial services platform that helps individuals invest in the stock market and mutual funds with confidence. We are an authorized channel partner of Angel One Ltd., offering access to research-backed investment tools, education, and client support."
  },
  {
    question: "Are you SEBI registered?",
    answer: "Yes, we work with SEBI-registered professionals and platforms to ensure all our services comply with regulatory standards."
  },
  {
    question: "Do you provide stock recommendations?",
    answer: "Yes, as an authorized partner, we provide research-backed guidance and access to top-tier stock recommendations through our platform."
  },
  {
    question: "What services do you offer?",
    answer: "We offer Mutual Funds, Equity trading, ETFs, Bonds, Insurance, and Fixed Deposits. We also provide learning resources to help you invest better."
  },
  {
    question: "How do I open a Demat and Trading Account with you?",
    answer: "You can easily open a Demat and Trading Account by clicking the Login/Register button and following the seamless digital onboarding process via our channel partner Angel One."
  },
  {
    question: "Do you charge any fees for your services?",
    answer: "Our mutual fund distribution services are typically commission-based from the AMCs. For trading, standard brokerage fees apply as per the Angel One platform."
  },
  {
    question: "Is my investment safe?",
    answer: "All investments are held securely in your Demat account, which is regulated by SEBI and governed by strict compliance standards to ensure your assets are protected."
  },
  {
    question: "Do you offer investment courses or training?",
    answer: "Yes, we offer an E-Book and various learning materials under our Learning section to help educate beginners and seasoned investors alike."
  },
  {
    question: "How can I get in touch with you?",
    answer: "You can reach out to us via the Contact Us page, email us directly, or call our support line. We are always happy to assist you."
  }
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <>
      <Navbar />
      <div className="faqs-page">
        <div className="faqs-container">
          <h1 className="faqs-title">Frequently Asked Questions</h1>
          
          <div className="faqs-list">
            {faqData.map((faq, index) => {
              const isActive = openIndex === index;
              return (
                <div key={index} className={`faq-item ${isActive ? 'active' : ''}`}>
                  <button 
                    className="faq-header" 
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isActive}
                  >
                    <h3 className="faq-question">{faq.question}</h3>
                    <div className={`faq-icon ${isActive ? 'active' : ''}`}>
                      {isActive ? <MinusCircle size={24} fill="#4b2bb0" color="white" /> : <PlusCircle size={24} strokeWidth={1.5} />}
                    </div>
                  </button>
                  <div className="faq-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQs;
