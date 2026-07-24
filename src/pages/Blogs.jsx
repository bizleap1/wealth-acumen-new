import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './Blogs.css';

const Blogs = () => {
  const blogsData = [
    {
      id: 1,
      image: '/images/bse_building.png',
      date: 'July 16, 2026',
      author: 'Wealth Acumen',
      title: 'Ahead of Market: 10 Key Things Deciding Indian Stock Market Action',
      excerpt: 'Indian equities ended subdued as geopolitical tensions capped gains despite optimism around Q1 earnings. Here are the top factors that will drive market sentiment.',
      content: [
        'The Indian stock market has witnessed a rollercoaster ride recently. While early corporate earnings reports for Q1 have been largely optimistic, global geopolitical tensions have forced investors to adopt a cautious stance.',
        'Market experts believe that the upcoming week will be heavily influenced by macroeconomic data, foreign institutional investor (FII) flows, and inflation figures. Investors should keep a close eye on the banking and IT sectors, which are expected to dictate the broader market trend.',
        'Furthermore, oil prices remain a wildcard. Any sudden spike could negatively impact India’s import bill, adding pressure on the Rupee and potentially triggering a sell-off in auto and FMCG stocks.'
      ],
      link: '#'
    },
    {
      id: 2,
      image: '/images/finance_graphic.png',
      date: 'July 16, 2026',
      author: 'Wealth Acumen',
      title: 'Market Trading Guide: Technical Breakouts in Chennai Petroleum and ABB India',
      excerpt: 'Despite geopolitical concerns and volatile crude prices, multiple stocks have broken out technically, showing strong volume-backed price trends.',
      content: [
        'Technical analysts have spotted compelling breakout patterns in select mid and large-cap stocks. Chennai Petroleum has shown significant volume accumulation at lower levels, finally breaking out of its multi-week consolidation zone.',
        'Similarly, ABB India has crossed its critical resistance level with a strong bullish engulfing candle on the weekly charts. This suggests strong institutional buying.',
        'Traders are advised to use strict stop-losses, especially considering the broader market volatility. A buy-on-dips strategy towards the immediate support levels could offer a favorable risk-reward ratio for short-term trades.'
      ],
      link: '#'
    },
    {
      id: 3,
      image: '/images/mutual_funds.png',
      date: 'July 16, 2026',
      author: 'Wealth Acumen',
      title: 'Jio Financial Q1 Results: Consolidated Profit Skyrockets 155% YoY',
      excerpt: 'Jio Financial Services reported a massive 155% year-on-year growth in its consolidated net profit, reaching Rs 830 crore in the first quarter of the fiscal year.',
      content: [
        'Jio Financial Services (JFS) has delivered a stellar performance for the first quarter, reporting a consolidated net profit of Rs 830 crore, representing a 155% jump from the same period last year.',
        'The robust growth was primarily driven by strong core lending operations, strategic investments, and a significant reduction in operating expenses. The company\'s focus on digital lending and expanding its consumer finance footprint seems to be yielding excellent results.',
        'Analysts remain bullish on the stock, citing the company\'s strong parentage and aggressive expansion plans in the mutual fund and insurance broking segments as key growth drivers for the coming years.'
      ],
      link: '#'
    },
    {
      id: 4,
      image: '/images/mutual_funds.png',
      date: 'July 18, 2026',
      author: 'Wealth Acumen',
      title: 'Why Diversification is Key to Long-Term Wealth Generation',
      excerpt: 'Spreading your investments across different asset classes reduces risk and smoothes out returns over time. Here is how to build a resilient portfolio.',
      content: [
        'The age-old adage "don\'t put all your eggs in one basket" is the cornerstone of modern portfolio theory. Diversification is not just about avoiding losses; it\'s about creating a portfolio that can weather various economic cycles.',
        'A well-diversified portfolio should include a mix of equities, fixed income (bonds/FDs), real estate, and alternative investments like gold. When equities underperform due to market corrections, bonds and gold often act as a cushion, reducing overall portfolio volatility.',
        'At Wealth Acumen, we recommend periodic rebalancing. As asset classes grow at different rates, your portfolio can drift from its original target allocation. Rebalancing ensures you take profits from overperforming assets and reinvest in underperforming ones, keeping your risk profile in check.'
      ],
      link: '#'
    },
    {
      id: 5,
      image: '/images/bse_building.png',
      date: 'July 20, 2026',
      author: 'Wealth Acumen',
      title: 'Understanding the Basics of Value Investing in the Indian Market',
      excerpt: 'Value investing involves finding undervalued stocks with strong fundamentals. Learn how to identify these opportunities in today\'s volatile market.',
      content: [
        'Value investing is the art of buying stocks that are trading for less than their intrinsic value. Pioneered by Benjamin Graham and famously practiced by Warren Buffett, this strategy requires patience and deep fundamental analysis.',
        'In the Indian context, value can often be found in public sector undertakings (PSUs), traditional manufacturing companies, or sectors temporarily facing headwinds. Key metrics to look for include a low Price-to-Earnings (P/E) ratio, a low Price-to-Book (P/B) ratio, consistent dividend yields, and manageable debt.',
        'However, investors must beware of "value traps"—companies that are cheap for a reason, such as poor management or obsolete business models. The goal is to buy fundamentally strong businesses when they are temporarily out of favor.'
      ],
      link: '#'
    },
    {
      id: 6,
      image: '/images/finance_graphic.png',
      date: 'July 22, 2026',
      author: 'Wealth Acumen',
      title: 'The Role of Insurance in Comprehensive Financial Planning',
      excerpt: 'While building wealth is important, protecting it is crucial. Discover why life and health insurance are foundational to any solid financial plan.',
      content: [
        'Many investors focus entirely on wealth accumulation through mutual funds and stocks, completely ignoring the protection aspect of financial planning. A single medical emergency or the sudden loss of an earning member can wipe out years of savings.',
        'Health insurance is non-negotiable. With medical inflation running high, adequate health coverage ensures that your investments remain untouched during hospitalizations. Similarly, a pure term life insurance policy provides a financial safety net for your dependents, covering liabilities and future goals in your absence.',
        'Insurance should never be mixed with investment. Unit Linked Insurance Plans (ULIPs) or endowment policies often offer subpar returns and inadequate cover. The best approach is to buy pure term insurance and invest the rest of your money in mutual funds.'
      ],
      link: '#'
    }
  ];

  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="blogs-page">
      {/* Hero Section */}
      <PageHeader 
        titleFirst="Our" 
        titleLast="Blogs" 
        subtitle="Insights, updates, and expert advice to guide your financial journey." 
      />

      {/* Blog Cards Section */}
      <section className="blogs-content-section">
        <div className="blogs-container">
          <div className="blogs-grid">
            {blogsData.map((blog, index) => (
              <motion.div 
                key={blog.id} 
                className="blog-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="blog-card-image">
                  <img src={blog.image} alt={blog.title} />
                </div>
                <div className="blog-card-body">
                  <div className="blog-meta">
                    <span>{blog.date}</span>
                    <span className="meta-dot">•</span>
                    <span>{blog.author}</span>
                  </div>
                  <h3 className="blog-card-title">{blog.title}</h3>
                  <p className="blog-card-excerpt">{blog.excerpt}</p>
                  <button onClick={() => setSelectedBlog(blog)} className="blog-read-more" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Read more <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div 
            className="blog-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBlog(null)}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
              backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 10000, 
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
            }}
          >
            <motion.div 
              className="blog-modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#fff', borderRadius: '12px', padding: '30px', 
                maxWidth: '600px', width: '100%', position: 'relative',
                maxHeight: '80vh', overflowY: 'auto'
              }}
            >
              <button 
                onClick={() => setSelectedBlog(null)}
                style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={24} />
              </button>
              
              <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#0f172a', paddingRight: '20px' }}>
                {selectedBlog.title}
              </h2>
              
              <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '20px' }}>
                <span>{selectedBlog.date}</span> • <span>{selectedBlog.author}</span>
              </div>
              
              <img 
                src={selectedBlog.image} 
                alt={selectedBlog.title} 
                style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '20px', objectFit: 'cover', maxHeight: '250px' }} 
              />
              
              <div style={{ color: '#475569', lineHeight: '1.8' }}>
                {selectedBlog.content.map((paragraph, idx) => (
                  <p key={idx} style={{ marginBottom: '15px' }}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blogs;
