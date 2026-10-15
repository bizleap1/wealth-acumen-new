import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Share2, Check, Link as LinkIcon, MessageSquare } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import './Blogs.css';

const Blogs = () => {
  const blogsData = [
    {
      id: 1,
      category: 'Market Analysis',
      image: '/images/bse_building.png',
      date: 'July 16, 2026',
      readTime: '3 min read',
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
      category: 'Technical Analysis',
      image: '/images/finance_graphic.png',
      date: 'July 16, 2026',
      readTime: '4 min read',
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
      category: 'Corporate Earnings',
      image: '/images/mutual_funds.png',
      date: 'July 16, 2026',
      readTime: '3 min read',
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
      category: 'Portfolio Strategy',
      image: '/images/mutual_funds.png',
      date: 'July 18, 2026',
      readTime: '4 min read',
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
      category: 'Value Investing',
      image: '/images/bse_building.png',
      date: 'July 20, 2026',
      readTime: '4 min read',
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
      category: 'Financial Protection',
      image: '/images/finance_graphic.png',
      date: 'July 22, 2026',
      readTime: '4 min read',
      author: 'Wealth Acumen',
      title: 'The Role of Insurance in Comprehensive Financial Planning',
      excerpt: 'While building wealth is important, protecting it is crucial. Discover why life and health insurance are foundational to any solid financial plan.',
      content: [
        'Many investors focus entirely on wealth accumulation through mutual funds and stocks, completely ignoring the protection aspect of financial planning. A single medical emergency or the sudden loss of an earning member can wipe out years of savings.',
        'Health insurance is non-negotiable. With medical inflation running high, adequate health coverage ensures that your investments remain untouched during hospitalizations. Similarly, a pure term life insurance policy provides a financial safety net for your dependents, covering liabilities and future goals in your absence.',
        'Insurance should never be mixed with investment. Unit Linked Insurance Plans (ULIPs) or endowment policies often offer subpar returns and inadequate cover. The best approach is to buy pure term insurance and invest the rest of your money in mutual funds.'
      ],
      link: '#'
    },
    {
      id: 7,
      category: 'Financial Advisory',
      image: '/images/advisor_consultation.jpg',
      date: 'September 24, 2026',
      readTime: '5 min read',
      author: 'Wealth Acumen',
      title: 'Why Every Investor Needs an Advisor',
      excerpt: 'Today, we have access to more financial information than ever before. This is a great advantage, but it can also create confusion. Discover how professional guidance helps.',
      content: [
        { type: 'paragraph', text: 'Today, we have access to more financial information than ever before. The internet, social media, news platforms, and various financial apps make it easy for anyone to research investments and make their own decisions.' },
        { type: 'paragraph', text: 'This is a great advantage, but it can also create a new problem: **too much information can lead to confusion**.' },
        { type: 'paragraph', text: 'A retail investor may come across several opinions about the same investment. One person may recommend a particular mutual fund, another may suggest stocks, while someone else may recommend a completely different strategy. Since most of this information may appear genuine and convincing, investors often try to follow everything at once.' },
        { type: 'paragraph', text: 'Eventually, they may become confused, change their strategy frequently, or get stuck between different investment decisions.' },

        { type: 'heading', text: 'Investing Requires Discipline' },
        { type: 'paragraph', text: 'Investing and trading may look complicated, but many of the basic principles are simple. The real challenge is following them with discipline and consistency.' },
        { type: 'paragraph', text: 'Many investors start by using their own knowledge and following information available online. There is nothing wrong with learning and doing your own research. However, making financial decisions without a proper plan can sometimes lead to unnecessary mistakes and losses.' },
        { type: 'paragraph', text: 'This is where a financial advisor can add significant value.' },

        { type: 'heading', text: 'Think of an Advisor Like a Doctor for Your Wealth' },
        { type: 'paragraph', text: 'When you have a health problem, you may first try a simple home remedy. But if the problem continues or becomes complicated, you consult a doctor.' },
        { type: 'paragraph', text: 'The same approach is often seen in investing. Many people first try to manage their investments on their own. They watch videos, read articles, follow market opinions, and make decisions based on what they find. When things don’t go as expected, they then look for professional guidance.' },
        { type: 'paragraph', text: 'Just as you consult a doctor to understand your health before a problem becomes serious, seeking professional financial guidance at the right time can help you make more informed investment decisions.' },

        { type: 'heading', text: 'Is Financial Advice Expensive?' },
        { type: 'paragraph', text: 'One common misconception is that consulting a financial professional is always expensive.' },
        { type: 'paragraph', text: 'In reality, the cost of getting guidance should be considered in relation to the potential cost of making uninformed financial decisions. A wrong investment decision, lack of diversification, inappropriate risk-taking, or constantly changing your strategy can potentially have a much greater financial impact over time.' },
        { type: 'paragraph', text: 'Successful business owners and professionals often rely on different experts—such as tax advisors, legal advisors, financial professionals, and other specialists—to make better-informed decisions. Retail investors can also benefit from professional guidance.' },
        { type: 'paragraph', text: 'At Wealth Acumen, our objective is to help investors understand their investment options, assess their needs, and make decisions with greater clarity and discipline. In many cases, initial guidance and consultations may be available without any consultation charges, making it easier for investors to seek help before making important decisions.' },

        { type: 'heading', text: 'Don’t Let Information Become Confusion' },
        { type: 'paragraph', text: 'Having access to information is valuable. But information alone is not the same as understanding. The real benefit comes from knowing which information is relevant to you, understanding the risks involved, and following a structured investment approach.' },
        { type: 'paragraph', text: 'You don’t have to navigate the entire investment journey alone. The right guidance at the right time can help you replace confusion with clarity and random decisions with a disciplined approach.' },
        {
          type: 'callout',
          title: 'Our Guidance Principle',
          text: 'Your wealth deserves the same attention that you give to your health. Don’t wait for a financial mistake to happen before seeking guidance. Start with clarity, plan with discipline, and invest with awareness.'
        },
        {
          type: 'callout',
          title: 'Disclaimer',
          text: 'This article is for educational and awareness purposes only and should not be considered investment advice. Mutual fund investments are subject to market risks. Please consider your investment objectives, risk profile, and financial situation before making investment decisions.'
        }
      ],
      link: '#'
    },
    {
      id: 8,
      category: 'SEBI Regulation & Investment Guide',
      image: '/images/sif_blog.jpg',
      date: 'October 15, 2026',
      readTime: '6 min read',
      author: 'Wealth Acumen',
      title: 'Specialised Investment Fund (SIF): Everything a Beginner Should Know',
      excerpt: 'SEBI has introduced Specialised Investment Funds (SIF) in India. Understand how they differ from mutual funds, the ₹10 lakh minimum threshold, key strategies, and risks before investing.',
      content: [
        { type: 'paragraph', text: 'You may have heard about mutual funds, but now there is a new investment option in India called a **Specialised Investment Fund (SIF)**.' },
        { type: 'paragraph', text: 'What is it? Why has it been introduced? Is it better than a mutual fund? How much money do you need? And most importantly, can you withdraw your money whenever you need it?' },
        { type: 'paragraph', text: "Let's understand everything step by step." },

        { type: 'heading', text: '1. What is a SIF?' },
        { type: 'paragraph', text: 'A Specialised Investment Fund, or SIF, is an investment product regulated by SEBI.' },
        { type: 'paragraph', text: 'Like a mutual fund, it collects money from investors and invests it in the market. The main difference is that a SIF can use some more advanced investment strategies that are not generally available to traditional mutual funds.' },
        { type: 'paragraph', text: 'For example, a fund manager can buy shares that they believe will perform well and, in certain SIF strategies, take positions that could benefit if selected shares perform poorly.' },
        { type: 'paragraph', text: 'The aim is to manage investments differently and look for opportunities in different market conditions. However, there is no guarantee that the fund will make money.' },

        { type: 'heading', text: '2. How is a SIF different from a mutual fund?' },
        { type: 'paragraph', text: "Let's understand with a simple comparison:" },
        {
          type: 'table',
          headers: ['Feature', 'Mutual Fund', 'SIF'],
          rows: [
            ['Minimum investment', 'Often starts from a few hundred rupees', 'Generally ₹10 lakh'],
            ['Who can invest?', 'Almost anyone who meets the scheme requirements', 'Investors who meet the SIF requirements'],
            ['Investment strategy', 'Generally simpler and more traditional', 'Can use more advanced strategies'],
            ['Risk', 'Depends on the fund', 'Can be higher or more complex'],
            ['Withdrawal', 'Depends on the fund', 'Depends on the SIF strategy'],
            ['Guaranteed returns', 'No', 'No']
          ]
        },
        { type: 'paragraph', text: 'The biggest difference is that mutual funds are suitable for a wide range of investors, while SIFs are designed for investors who can invest a larger amount and understand the additional risks.' },

        { type: 'heading', text: '3. Why would someone invest in a SIF?' },
        { type: 'paragraph', text: 'Imagine that the stock market is going up, but some companies are performing poorly. A traditional equity fund generally looks for opportunities by buying shares it expects to perform well.' },
        { type: 'paragraph', text: 'Certain SIF strategies can also take positions that may benefit when selected shares fall in value.' },
        { type: 'paragraph', text: 'This gives the fund manager more ways to invest.' },
        { type: 'paragraph', text: 'Some possible benefits are:' },
        {
          type: 'list',
          items: [
            '**More investment options:** The fund manager can use different strategies depending on the market situation.',
            '**Better risk management:** Certain strategies may help manage some market risks.',
            '**Another option for diversification:** Investors can consider a SIF alongside their existing investments.'
          ]
        },
        { type: 'paragraph', text: 'But remember, these are possible benefits, not guaranteed results. A SIF can also lose money.' },

        { type: 'heading', text: '4. How much money do you need to invest?' },
        { type: 'paragraph', text: 'The standard minimum investment threshold is generally **₹10 lakh across the SIF strategies of the same fund house**, subject to the applicable rules.' },
        { type: 'paragraph', text: 'For example, you could invest ₹6 lakh in one SIF strategy and ₹4 lakh in another strategy offered by the same fund house, subject to the scheme conditions.' },
        { type: 'paragraph', text: 'However, investing ₹5 lakh each with two different fund houses would not satisfy the standard minimum for either one.' },
        { type: 'paragraph', text: 'There is also an exemption for eligible SEBI-accredited investors, subject to the applicable rules.' },
        { type: 'paragraph', text: 'One important thing to understand: you do not need to have ₹10 lakh in ordinary mutual funds. Your regular mutual fund investments do not count towards this requirement.' },

        { type: 'heading', text: '5. Can you withdraw your money whenever you want?' },
        { type: 'paragraph', text: 'This is one of the most important things to check before investing.' },
        { type: 'paragraph', text: 'The answer is: **it depends on the type of SIF you choose.**' },
        { type: 'paragraph', text: 'Some SIFs allow withdrawals on business days, while others allow withdrawals only during specific periods.' },
        { type: 'paragraph', text: "For example, if you invest ₹10 lakh in a SIF that allows daily withdrawals, you may be able to request your money on an eligible business day. However, the money will be paid according to the fund's rules." },
        { type: 'paragraph', text: 'There may also be charges if you withdraw within a certain period.' },
        { type: 'paragraph', text: 'Another important point is that the minimum investment requirement still matters. If you invest ₹10 lakh and withdraw ₹2 lakh, your remaining investment would be ₹8 lakh. This could create a problem because you may fall below the required minimum.' },
        { type: 'paragraph', text: 'Therefore, before investing, check the withdrawal rules carefully.' },
        {
          type: 'callout',
          title: 'Advisor Recommendation',
          text: 'Do not invest your emergency money in a SIF. Keep money for medical expenses, household needs and other emergencies somewhere you can access it easily.'
        },

        { type: 'heading', text: '6. What types of SIFs are available?' },
        { type: 'paragraph', text: 'SIFs can follow different investment strategies:' },
        {
          type: 'list',
          items: [
            '**Equity-based strategies:** These mainly focus on the stock market and may use permitted long and short positions.',
            '**Debt-based strategies:** These focus on investments such as bonds and other debt instruments. Their performance can be affected by interest rates and the ability of borrowers to repay.',
            '**Hybrid strategies:** These combine equity and debt investments and may use more advanced strategies.'
          ]
        },
        { type: 'paragraph', text: 'Each strategy works differently. Before investing, understand where the money will be invested and how the fund manager plans to manage it.' },

        { type: 'heading', text: '7. How much return can you earn?' },
        { type: 'paragraph', text: 'There is no fixed return from a SIF.' },
        { type: 'paragraph', text: 'Suppose you invest ₹10 lakh. Here is what could happen after one year:' },
        {
          type: 'table',
          headers: ['Annual return', 'Your investment value'],
          rows: [
            ['If you lose 15%', '₹8,50,000'],
            ['If you earn 0%', '₹10,00,000'],
            ['If you earn 8%', '₹10,80,000'],
            ['If you earn 15%', '₹11,50,000']
          ]
        },
        { type: 'paragraph', text: 'These are only examples to explain how returns work. They are not predictions of actual SIF performance.' },
        { type: 'paragraph', text: "Your investment value can go up or down depending on market conditions and the fund manager's decisions." },

        { type: 'heading', text: '8. What are the risks of investing in a SIF?' },
        { type: 'paragraph', text: 'Before investing, understand these points:' },
        {
          type: 'list',
          items: [
            'You can lose money.',
            'The fund may not perform as expected.',
            'Some strategies use complex investments that can increase losses.',
            'You may not be able to withdraw your money whenever you want.',
            'Charges and taxes can reduce your final returns.',
            'Your investment may fall below ₹10 lakh, even if you originally invested that amount.'
          ]
        },
        { type: 'paragraph', text: 'Do not invest simply because someone says a SIF can give better returns than a mutual fund.' },

        { type: 'heading', text: '9. What about taxes?' },
        { type: 'paragraph', text: 'You may have to pay tax on the profits you make.' },
        { type: 'paragraph', text: 'The tax depends on the type of SIF, the investments it makes and how long you hold it. Some strategies may have tax treatment similar to equity-oriented funds, while others may be treated differently.' },
        { type: 'paragraph', text: "Therefore, do not assume that every SIF has the same tax rules. Check the fund's official documents before investing." },

        { type: 'heading', text: '10. Who should consider investing in a SIF?' },
        { type: 'paragraph', text: 'A SIF may be worth considering if you already have a good investment portfolio, can comfortably invest ₹10 lakh or more, understand the risks and want to explore strategies beyond traditional mutual funds.' },
        { type: 'paragraph', text: 'It may not be the right choice if you are just starting your investment journey, need your money for emergencies or cannot afford to lose part of your investment.' },
        { type: 'paragraph', text: 'For most beginners, starting with suitable mutual funds is generally more practical because they are accessible with smaller amounts and offer many options for diversification.' },

        { type: 'heading', text: '11. How do you invest in a SIF?' },
        { type: 'paragraph', text: 'The process is similar to investing in other market-linked products:' },
        {
          type: 'ordered-list',
          items: [
            'Choose a fund house offering SIFs.',
            'Understand the investment strategy and its risks.',
            'Check the minimum investment and withdrawal rules.',
            'Complete the required KYC process.',
            'Invest through the fund house or an authorised platform.'
          ]
        },
        { type: 'paragraph', text: 'Before investing, read the official documents carefully and check all charges.' },

        { type: 'heading', text: '12. Final thoughts' },
        { type: 'paragraph', text: 'A SIF is another investment option for people who want to explore more specialised investment strategies.' },
        { type: 'paragraph', text: 'It offers fund managers more flexibility, but that does not mean it is always better than a mutual fund.' },
        { type: 'paragraph', text: 'If you are a beginner, do not rush into a SIF just because it is a new product. First understand mutual funds, build your savings and keep enough money for emergencies.' },
        { type: 'paragraph', text: 'Once you have a strong financial foundation, you can decide whether a SIF makes sense for your investment goals.' },
        {
          type: 'callout',
          title: 'Guiding Principle',
          text: 'The right investment is not the one with the most complicated strategy. It is the one that suits your goals, your financial situation and your ability to handle risk.'
        }
      ],
      link: '#'
    }
  ];

  const location = useLocation();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const blogId = params.get('blog');
    if (blogId) {
      const blog = blogsData.find(b => b.id === parseInt(blogId, 10));
      if (blog) {
        setSelectedBlog(blog);
      }
    }
  }, [location.search]);

  const getShareUrl = (id) => {
    const origin = window.location.origin.replace('localhost', '127.0.0.1');
    return `${origin}/blogs?blog=${id}`;
  };

  const handleCopyLink = (e, id) => {
    e.stopPropagation();
    const url = getShareUrl(id);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowShareMenu(false);
    }, 2000);
  };

  const handleWhatsAppShare = (e, blog) => {
    e.stopPropagation();
    const url = getShareUrl(blog.id);
    const text = `Check out this blog: ${blog.title} \n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    setShowShareMenu(false);
  };

  // Helper function to render text with **bold** parsed into <strong>
  const renderFormattedText = (text) => {
    if (typeof text !== 'string') return text;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} style={{ color: '#0f172a', fontWeight: 600 }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Helper to render both strings and structured content elements
  const renderBlogItem = (item, idx) => {
    if (typeof item === 'string') {
      if (item.startsWith('## ')) {
        return (
          <h3 key={idx} className="blog-article-heading">
            {item.replace(/^##\s*/, '')}
          </h3>
        );
      }
      return (
        <p key={idx} className="blog-article-paragraph">
          {renderFormattedText(item)}
        </p>
      );
    }

    switch (item.type) {
      case 'heading':
        return (
          <h3 key={idx} className="blog-article-heading">
            {item.text}
          </h3>
        );
      case 'paragraph':
        return (
          <p key={idx} className="blog-article-paragraph">
            {renderFormattedText(item.text)}
          </p>
        );
      case 'table':
        return (
          <div key={idx} className="blog-article-table-wrapper">
            <table className="blog-article-table">
              <thead>
                <tr>
                  {item.headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx}>{renderFormattedText(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'list':
        return (
          <ul key={idx} className="blog-article-list">
            {item.items.map((li, i) => (
              <li key={i}>{renderFormattedText(li)}</li>
            ))}
          </ul>
        );
      case 'ordered-list':
        return (
          <ol key={idx} className="blog-article-ordered-list">
            {item.items.map((li, i) => (
              <li key={i}>{renderFormattedText(li)}</li>
            ))}
          </ol>
        );
      case 'callout':
        return (
          <div key={idx} className="blog-article-callout">
            {item.title && <div className="blog-callout-title">{item.title}</div>}
            <p>{renderFormattedText(item.text)}</p>
          </div>
        );
      default:
        return null;
    }
  };

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
            {[...blogsData].reverse().map((blog, index) => (
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
                  <button 
                    onClick={() => {
                      setSelectedBlog(blog);
                      window.history.pushState({}, '', `/blogs?blog=${blog.id}`);
                    }} 
                    className="blog-read-more" 
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
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
            onClick={() => {
              setSelectedBlog(null);
              window.history.pushState({}, '', '/blogs');
            }}
          >
            <motion.div 
              className="blog-modal-content"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Share & Close Action Bar */}
              <div style={{ position: 'absolute', top: '24px', right: '65px' }}>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowShareMenu(!showShareMenu);
                  }}
                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Share options"
                >
                  <Share2 size={18} />
                </button>
                {showShareMenu && (
                  <div style={{
                    position: 'absolute', top: '100%', right: '0', marginTop: '10px',
                    backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
                    padding: '8px 0', minWidth: '160px', zIndex: 10
                  }}>
                    <button 
                      onClick={(e) => handleWhatsAppShare(e, selectedBlog)}
                      style={{ 
                        width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer',
                        color: '#128C7E', fontSize: '14px', textAlign: 'left', fontWeight: 500
                      }}
                    >
                      <FaWhatsapp size={18} /> WhatsApp
                    </button>
                    <button 
                      onClick={(e) => handleCopyLink(e, selectedBlog.id)}
                      style={{ 
                        width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer',
                        color: copied ? '#10b981' : '#475569', fontSize: '14px', textAlign: 'left', fontWeight: 500
                      }}
                    >
                      {copied ? <Check size={18} /> : <LinkIcon size={18} />} 
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                )}
              </div>

              <button 
                onClick={() => {
                  setSelectedBlog(null);
                  window.history.pushState({}, '', '/blogs');
                }}
                style={{ position: 'absolute', top: '24px', right: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}
                title="Close"
              >
                <X size={20} />
              </button>
              
              {/* Category Tag */}
              {selectedBlog.category && (
                <span className="blog-modal-category">{selectedBlog.category}</span>
              )}

              {/* Title */}
              <h2 className="blog-modal-title">
                {selectedBlog.title}
              </h2>
              
              {/* Meta */}
              <div className="blog-modal-meta">
                <span>{selectedBlog.date}</span>
                <span>•</span>
                <span>{selectedBlog.author}</span>
                {selectedBlog.readTime && (
                  <>
                    <span>•</span>
                    <span>{selectedBlog.readTime}</span>
                  </>
                )}
              </div>
              
              {/* Feature Image */}
              <img 
                src={selectedBlog.image} 
                alt={selectedBlog.title} 
                className="blog-modal-image"
              />
              
              {/* Article Content */}
              <div className="blog-article-body">
                {selectedBlog.content.map((item, idx) => renderBlogItem(item, idx))}
              </div>

              {/* CTA Box at Bottom */}
              <div className="blog-article-cta">
                <div className="blog-article-cta-text">
                  <h4>Want personalized guidance on SIFs & Wealth Planning?</h4>
                  <p>Speak with our certified wealth advisors for customized portfolio strategies.</p>
                </div>
                <Link 
                  to="/contact" 
                  className="blog-article-cta-btn"
                  onClick={() => setSelectedBlog(null)}
                >
                  <MessageSquare size={16} /> Contact Us
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blogs;
