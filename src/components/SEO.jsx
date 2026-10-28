import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const PAGE_SEO = {
  '/': {
    title: 'Wealth Acumen | Strategic Wealth Management & Investment Advisory',
    description: 'Empower your financial future with Wealth Acumen. Expert guidance in mutual funds, equity research, portfolio management (PMS), bonds, and comprehensive financial planning.',
    keywords: 'wealth acumen, wealth management mumbai, mutual funds distributor, equity research, portfolio management, bonds, financial planning dadar'
  },
  '/about': {
    title: 'About Us | Wealth Acumen - Philosophy & Mission',
    description: 'Learn about Wealth Acumen’s mission, core values, and client-first approach to financial education, disciplined investing, and multi-generational wealth creation.',
    keywords: 'about wealth acumen, financial advisor mumbai, wealth philosophy, ethical financial guidance, mission and vision'
  },
  '/proprietor': {
    title: 'Founder & CEO - Atharva Wadekar | Wealth Acumen',
    description: 'Meet Atharva Wadekar, AMFI-Registered Mutual Fund Distributor, NISM-Certified Research Analyst, and Founder of Wealth Acumen with 5+ years of stock market experience.',
    keywords: 'atharva wadekar, founder wealth acumen, amfi registered distributor, nism research analyst mumbai, equity derivatives'
  },
  '/services': {
    title: 'Our Financial Services | Wealth Acumen',
    description: 'Explore our complete suite of financial solutions: Mutual Funds, Portfolio Management Services (PMS), Equity Advisory, ETFs, Bonds, Corporate FDs, and Insurance Planning.',
    keywords: 'financial services mumbai, investment options, wealth advisory, mutual funds, pms services, retirement planning'
  },
  '/mutual-funds': {
    title: 'Mutual Funds Advisory & Distribution | Wealth Acumen',
    description: 'Achieve your life goals with expertly curated mutual fund portfolios tailored to your risk appetite, investment horizon, and tax-saving requirements.',
    keywords: 'mutual funds investment, sip investment, best mutual funds india, amfi registered mutual fund distributor mumbai, elss tax saving'
  },
  '/equity': {
    title: 'Equity Advisory & Stock Market Research | Wealth Acumen',
    description: 'Build long-term wealth through ownership in high-quality Indian businesses. Research-backed stock selection, fundamental analysis, and disciplined risk management.',
    keywords: 'equity advisory, stock market investing, fundamental analysis, nism research analyst, indian share market guidance'
  },
  '/etfs': {
    title: 'Exchange Traded Funds (ETFs) | Wealth Acumen',
    description: 'Diversify your investments with low-cost, liquid, and transparent Exchange Traded Funds (ETFs) tracking major indices, gold, and sector benchmarks.',
    keywords: 'etf investing india, index funds, low cost portfolio, gold etf, nifty 50 etf, liquid etf'
  },
  '/bonds': {
    title: 'Corporate Bonds & Fixed Income Securities | Wealth Acumen',
    description: 'Secure predictable, regular income with high-rated corporate bonds, sovereign gold bonds (SGBs), and government securities tailored for capital preservation.',
    keywords: 'bond investments india, corporate bonds, fixed income securities, sovereign gold bonds, regular interest income'
  },
  '/fixed-deposit': {
    title: 'Corporate & Bank Fixed Deposits | Wealth Acumen',
    description: 'Earn guaranteed returns with zero market volatility through high-rated corporate fixed deposits and bank FDs offering attractive interest rates.',
    keywords: 'corporate fixed deposits, safe investment options, high interest fd, capital preservation, guaranteed returns'
  },
  '/sif': {
    title: 'Specialised Investment Funds (SIF) | Wealth Acumen',
    description: 'Discover SEBI-regulated Specialised Investment Funds (SIF) with ₹10 lakh minimum investment. Explore advanced long-short strategies and risk management.',
    keywords: 'specialised investment fund, sif sebi, advanced investment strategies, 10 lakh investment threshold, alternative investment'
  },
  '/pms': {
    title: 'Portfolio Management Services (PMS) | Wealth Acumen',
    description: 'Institutional-grade, personalized portfolio management for HNIs starting at ₹50 lakh. Direct security ownership, focused alpha generation, and custom strategies.',
    keywords: 'portfolio management services, pms india, hni investment management, discretionary pms, direct equity ownership'
  },
  '/insurance': {
    title: 'Life & Health Insurance Advisory | Wealth Acumen',
    description: 'Shield your family and wealth against unforeseen life and medical events with pure term life insurance and comprehensive health protection plans.',
    keywords: 'term insurance planning, health insurance advisory, wealth protection, family financial security, medical insurance'
  },
  '/downloads': {
    title: 'Downloads & KYC Portals | Wealth Acumen',
    description: 'Validate your KYC status across CVLKRA, NSDL, CAMS, and NSE portals. Download essential KYC and FATCA investor forms quickly and securely.',
    keywords: 'kyc status check, cvlkra, nsdl kra, download kyc form, fatca non individual, cams kra'
  },
  '/e-book': {
    title: 'Free Financial E-Books & Guides | Wealth Acumen',
    description: 'Download free educational e-books on Technical Analysis, Fundamental Analysis, Mutual Funds, Insurance, Fixed Income, and Stock Market Behind the Scenes.',
    keywords: 'free finance ebooks, stock market guide pdf, technical analysis ebook, mutual funds ebook, fundamental analysis guide'
  },
  '/blogs': {
    title: 'Market Insights, Financial News & Analysis | Wealth Acumen',
    description: 'Read deep-dive articles on macroeconomic trends, FII flows, emergency funds, SEBI regulations, and disciplined money management strategies.',
    keywords: 'financial blogs india, stock market insights, emergency fund planning, market analysis, fii selling india, pms guide'
  },
  '/contact': {
    title: 'Contact Us | Wealth Acumen - Dadar East, Mumbai',
    description: 'Get in touch with Wealth Acumen for a personalized financial consultation. Located near Dadar TT Circle, Mumbai. Call or WhatsApp +91 9325227357.',
    keywords: 'contact wealth acumen, financial advisor dadar east mumbai, wealth consultation, phone number, office location'
  },
  '/diy': {
    title: 'DIY Investing with Angel One | Wealth Acumen',
    description: 'Open your Angel One demat and trading account with Wealth Acumen partner link. Access cutting-edge trading tools, research, and zero account opening charges.',
    keywords: 'open angel one demat account, angel one channel partner, diy trading account, smartapi trading'
  },
  '/faqs': {
    title: 'FAQs - Mutual Funds & Wealth Advisory | Wealth Acumen',
    description: 'Find clear answers to common questions about mutual funds, SIPs, investment safety, advisory costs, account setup, and portfolio rebalancing.',
    keywords: 'wealth acumen faqs, mutual fund questions, sip investment guide, financial planning doubts, amfi distributor faqs'
  }
};

export const updatePageSEO = (customSEO = {}) => {
  const path = window.location.pathname.toLowerCase();
  const config = { ...(PAGE_SEO[path] || PAGE_SEO['/']), ...customSEO };

  const finalTitle = config.title;
  const finalDescription = config.description;
  const finalKeywords = config.keywords;
  const currentUrl = window.location.href;
  const defaultImage = `${window.location.origin}/favicon.png`;

  // 1. Title
  document.title = finalTitle;

  // 2. Helper for meta tags
  const setMeta = (attrName, attrVal, content) => {
    if (!content) return;
    let tag = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attrName, attrVal);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  // Standard Meta Tags
  setMeta('name', 'description', finalDescription);
  setMeta('name', 'keywords', finalKeywords);
  setMeta('name', 'author', 'Wealth Acumen');
  setMeta('name', 'robots', 'index, follow');

  // Open Graph / Facebook / WhatsApp
  setMeta('property', 'og:title', finalTitle);
  setMeta('property', 'og:description', finalDescription);
  setMeta('property', 'og:url', currentUrl);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', 'Wealth Acumen');
  setMeta('property', 'og:image', config.image || defaultImage);

  // Twitter Card
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', finalTitle);
  setMeta('name', 'twitter:description', finalDescription);
  setMeta('name', 'twitter:image', config.image || defaultImage);

  // Canonical Link
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute('href', currentUrl.split('?')[0]);
};

/**
 * RouteSEOListener: Automatically listens to route changes and applies corresponding SEO tags.
 */
export const RouteSEOListener = () => {
  const location = useLocation();

  useEffect(() => {
    updatePageSEO();
  }, [location.pathname]);

  return null;
};

export default RouteSEOListener;
