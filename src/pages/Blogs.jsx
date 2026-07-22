import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
      link: '#'
    },
    {
      id: 2,
      image: '/images/finance_graphic.png',
      date: 'July 16, 2026',
      author: 'Wealth Acumen',
      title: 'Market Trading Guide: Technical Breakouts in Chennai Petroleum and ABB India',
      excerpt: 'Despite geopolitical concerns and volatile crude prices, multiple stocks have broken out technically, showing strong volume-backed price trends.',
      link: '#'
    },
    {
      id: 3,
      image: '/images/mutual_funds.png',
      date: 'July 16, 2026',
      author: 'Wealth Acumen',
      title: 'Jio Financial Q1 Results: Consolidated Profit Skyrockets 155% YoY',
      excerpt: 'Jio Financial Services reported a massive 155% year-on-year growth in its consolidated net profit, reaching Rs 830 crore in the first quarter of the fiscal year.',
      link: '#'
    },
    {
      id: 4,
      image: '/images/mutual_funds.png',
      date: 'July 18, 2026',
      author: 'Wealth Acumen',
      title: 'Why Diversification is Key to Long-Term Wealth Generation',
      excerpt: 'Spreading your investments across different asset classes reduces risk and smoothes out returns over time. Here is how to build a resilient portfolio.',
      link: '#'
    },
    {
      id: 5,
      image: '/images/bse_building.png',
      date: 'July 20, 2026',
      author: 'Wealth Acumen',
      title: 'Understanding the Basics of Value Investing in the Indian Market',
      excerpt: 'Value investing involves finding undervalued stocks with strong fundamentals. Learn how to identify these opportunities in today\'s volatile market.',
      link: '#'
    },
    {
      id: 6,
      image: '/images/finance_graphic.png',
      date: 'July 22, 2026',
      author: 'Wealth Acumen',
      title: 'The Role of Insurance in Comprehensive Financial Planning',
      excerpt: 'While building wealth is important, protecting it is crucial. Discover why life and health insurance are foundational to any solid financial plan.',
      link: '#'
    }
  ];

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
                  <a href={blog.link} className="blog-read-more">
                    Read more <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
