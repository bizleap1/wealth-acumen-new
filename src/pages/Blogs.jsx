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
    },
    {
      id: 9,
      category: 'Portfolio Management Services',
      image: '/images/pms_blog.jpg',
      date: 'October 16, 2026',
      readTime: '6 min read',
      author: 'Wealth Acumen',
      title: 'Portfolio Management Services (PMS): How Wealthy Investors Manage Their Money',
      excerpt: 'Have you ever wondered how wealthy investors manage their money differently from regular mutual fund investors? Explore PMS, the ₹50 lakh threshold, strategy types, and key risks.',
      content: [
        { type: 'paragraph', text: 'Have you ever wondered how wealthy investors manage their money differently from regular mutual fund investors? One option they may consider is **Portfolio Management Services (PMS)**.' },
        { type: 'paragraph', text: 'PMS is designed for investors who want their investments to be managed professionally with a more personalised approach. However, it is important to understand how it works, how much money is required, and what risks are involved before investing.' },

        { type: 'heading', text: 'What is PMS?' },
        { type: 'paragraph', text: '**PMS stands for Portfolio Management Services.** In simple words, it is a service where a professional portfolio manager manages your investments on your behalf.' },
        { type: 'paragraph', text: 'Depending on the investment strategy, your money may be invested in shares, bonds, and other permitted securities. The manager makes investment decisions based on the strategy followed and your investment objectives.' },
        { type: 'paragraph', text: "Unlike a mutual fund, where many investors invest in a common pool of money, a PMS generally maintains a separate portfolio for each client. The securities are held in the client's account, subject to the arrangement and type of PMS." },
        { type: 'paragraph', text: 'The main idea behind PMS is to provide a more personalised way of managing investments.' },

        { type: 'heading', text: 'How does PMS work?' },
        { type: 'paragraph', text: 'Suppose you invest ₹50 lakh in a PMS:' },
        {
          type: 'list',
          items: [
            'You choose a PMS provider and investment strategy after understanding its approach and risks.',
            'The portfolio manager invests your money according to that strategy.',
            'Shares or other securities are held in your designated account.',
            'The manager makes investment decisions, including buying or selling securities, according to the agreed mandate.',
            'Your portfolio value changes depending on market movements and investment performance.'
          ]
        },
        { type: 'paragraph', text: 'Remember, the portfolio manager manages the investments, but the profits are not guaranteed. Your portfolio can also lose value.' },

        { type: 'heading', text: 'What is the minimum investment required for PMS?' },
        { type: 'paragraph', text: 'In India, the minimum investment required for PMS is generally **₹50 lakh per client**, as prescribed by SEBI. This amount can be invested in cash or eligible securities, subject to the applicable rules.' },
        { type: 'paragraph', text: 'Because of this high minimum amount, PMS is usually considered by investors who have a substantial amount of money available for investment.' },

        { type: 'heading', text: 'What is the difference between PMS and mutual funds?' },
        { type: 'paragraph', text: 'Both PMS and mutual funds offer professional investment management, but there are some important differences.' },
        {
          type: 'table',
          headers: ['Feature', 'Mutual Funds', 'PMS'],
          rows: [
            ['Minimum investment', 'Often starts with a small amount', 'Generally ₹50 lakh'],
            ['How money is managed', 'Money from many investors is pooled together', 'Each client generally has a separate portfolio'],
            ['Personalisation', "Follows the scheme's investment objective", 'Can offer a more personalised approach'],
            ['Portfolio ownership', 'Investor owns mutual fund units', 'Investor generally owns the underlying securities'],
            ['Charges', 'Scheme-related expenses', 'Fees and other charges as agreed with the provider'],
            ['Risk', 'Depends on the scheme', 'Depends on the strategy and investments']
          ]
        },
        { type: 'paragraph', text: 'Neither option is automatically better than the other. The right choice depends on your financial goals, investment amount, risk tolerance and preferences.' },

        { type: 'heading', text: 'What are the main types of PMS?' },
        { type: 'paragraph', text: 'PMS services generally fall into three categories:' },
        {
          type: 'ordered-list',
          items: [
            '**Discretionary PMS:** The portfolio manager makes investment decisions on your behalf within the agreed investment strategy. You do not need to decide every time a security is bought or sold.',
            '**Non-discretionary PMS:** The portfolio manager may suggest investment decisions, but transactions are carried out based on your directions or approval, as agreed in the service arrangement.',
            '**Advisory PMS:** The manager provides investment advice, but you make the final investment decisions and handle the transactions.'
          ]
        },
        { type: 'paragraph', text: 'The services available and their exact terms depend on the provider and agreement.' },

        { type: 'heading', text: 'What are the benefits of investing in PMS?' },
        { type: 'paragraph', text: 'PMS may offer several benefits to investors who are looking for a more personalised investment approach.' },
        {
          type: 'list',
          items: [
            '**Professional management:** Your portfolio is managed by an experienced investment team.',
            '**Personalised approach:** The strategy can be better aligned with your investment objectives and agreed preferences.',
            '**Direct ownership:** You generally hold the underlying securities in your own account.',
            '**Portfolio transparency:** You can track individual holdings and transactions.',
            '**Focused investment strategies:** Depending on the provider, you may access strategies that focus on particular sectors, companies or investment styles.'
          ]
        },
        { type: 'paragraph', text: 'However, these benefits do not guarantee better performance than mutual funds or the overall market.' },

        { type: 'heading', text: 'What are the risks of PMS?' },
        { type: 'paragraph', text: 'Before investing, it is equally important to understand the risks.' },
        {
          type: 'list',
          items: [
            '**Market risk:** The value of your investments can fall when markets decline.',
            '**Concentration risk:** A portfolio with limited holdings may be affected significantly if some investments perform poorly.',
            '**High investment requirement:** The minimum investment of ₹50 lakh means a substantial amount of your wealth may be involved.',
            '**Fees and charges:** Management fees, performance-linked fees, brokerage and other applicable expenses can affect your final returns.',
            '**Manager-related risk:** The performance depends partly on the investment decisions and strategy followed by the portfolio manager.'
          ]
        },
        { type: 'paragraph', text: "Always review the provider's investment approach, historical performance, fees and risk disclosures before making a decision. Past performance does not guarantee future returns." },

        { type: 'heading', text: 'How are PMS returns generated?' },
        { type: 'paragraph', text: 'PMS returns depend on how the underlying investments perform. If the securities in your portfolio increase in value, your portfolio may generate positive returns. If they decline, you may incur losses.' },
        { type: 'paragraph', text: 'For example, if your ₹50 lakh portfolio grows to ₹60 lakh, the increase in value is ₹10 lakh before fees, taxes and other applicable costs.' },
        { type: 'paragraph', text: 'Similarly, if the portfolio falls to ₹40 lakh, you would have a loss of ₹10 lakh before considering any distributions or other adjustments.' },
        {
          type: 'callout',
          title: 'Key Takeaway on Returns',
          text: 'The important thing to remember is that PMS does not guarantee returns. Do not select a PMS only because someone has shown you impressive past returns.'
        },

        { type: 'heading', text: 'Who should consider investing in PMS?' },
        { type: 'paragraph', text: 'PMS may be worth exploring for investors who:' },
        {
          type: 'list',
          items: [
            'Have at least **₹50 lakh** available for investment.',
            'Understand that stock market investments can involve significant losses.',
            'Have a long-term investment horizon.',
            'Want professional management and a more personalised investment strategy.',
            'Can handle market fluctuations without needing to withdraw the money immediately.'
          ]
        },
        { type: 'paragraph', text: 'Investors who are just starting their investment journey or need their money for short-term expenses should carefully consider whether PMS is suitable for them.' },
        {
          type: 'callout',
          title: 'Disclaimer',
          text: 'This article is for educational purposes only and should not be considered investment advice or a recommendation to invest in any particular PMS. Investments in securities are subject to market risks. Please read all relevant documents carefully before investing.'
        }
      ],
      link: '#'
    },
    {
      id: 10,
      category: 'Market Intelligence & Global Flows',
      image: '/images/fii_selling_blog.jpg',
      date: 'October 22, 2026',
      readTime: '7 min read',
      author: 'Wealth Acumen',
      title: 'Why Are FIIs Continuously Selling Indian Stocks? What Is Really Happening Behind the Market Fall?',
      excerpt: 'If India is still a growing economy, why are foreign institutional investors taking out record funds? We dive deep into global AI capital reallocation, currency impact, bond yield spreads, and what investors should watch next.',
      content: [
        { type: 'paragraph', text: 'The Indian stock market has been under persistent pressure, and one question is on almost every investor’s mind: **why are foreign investors continuously selling Indian shares?**' },
        { type: 'paragraph', text: 'We often hear the same reasons in daily news headlines—the rupee is falling, crude oil prices are volatile, and global markets are uncertain. While these factors certainly affect market sentiment, they do not explain the whole story.' },
        { type: 'paragraph', text: '**The bigger question is this:** *If India is still a fast-growing economy, why are foreign investors choosing to take their money out of the Indian stock market?*' },
        { type: 'paragraph', text: 'Are they worried about corporate profit growth? Are other countries offering significantly better returns? Have Indian stocks become less attractive on valuation? And why is the government not doing more to bring foreign investors back?' },
        { type: 'paragraph', text: 'To understand what is truly happening behind the market fall, we need to look beyond daily price fluctuations and understand how global institutional investors make their asset allocation decisions.' },

        { type: 'heading', text: '1. Foreign Investors Are Taking Out Huge Amounts of Money' },
        { type: 'paragraph', text: 'The first thing to understand is the sheer scale of foreign institutional selling.' },
        { type: 'paragraph', text: 'According to data reported by Business Standard on October 13, 2026, foreign portfolio investors (FPIs) withdrew around **₹3.08 lakh crore** from Indian equities during the first nine months and early October of 2026.' },
        { type: 'paragraph', text: 'At the same time, foreign investors continued to put money into new share offerings. This means they were heavily selling existing shares while still selectively investing in selected new companies and IPOs.' },
        { type: 'paragraph', text: 'This is an important detail. If foreign investors had completely lost interest in India, we might expect them to avoid new investments as well. Instead, the data suggests that **they are becoming much more selective and valuation-conscious** about where they deploy capital.' },
        { type: 'paragraph', text: 'They may not be interested in buying every stock at its current price, but they continue to see opportunities in specific high-growth businesses. The real question is why they are choosing to sell so many existing shares.' },

        { type: 'heading', text: '2. Other Countries Are Giving Investors Better Returns' },
        { type: 'paragraph', text: 'One major reason behind the selling is that foreign investors are finding higher and faster returns in competing global markets.' },
        { type: 'paragraph', text: 'Think about it from the point of view of a global fund manager. If you had capital to allocate, would you choose a market that was experiencing a drawdown or one that was delivering explosive momentum?' },
        { type: 'paragraph', text: 'Returns matter immensely to large international funds benchmarked against global indices. A Mint report published on October 6, 2026, using Bloomberg data, showed a stark difference in major market performance during **January to September 2026 (in US-dollar terms)**:' },
        {
          type: 'table',
          headers: ['Market Index', 'Country / Region', 'Performance (Jan–Sep 2026 in USD terms)'],
          rows: [
            ['South Korea KOSPI', 'South Korea', '+72.4%'],
            ['Taiwan Taiex', 'Taiwan', '+64.5%'],
            ['Nikkei 225', 'Japan', '+31.8%'],
            ['US S&P 500', 'United States', '+11.0%'],
            ['Nifty 50', 'India', '-18.4%']
          ]
        },
        { type: 'paragraph', text: 'These figures relate to that particular period and do not predict future returns. Still, the divergence is striking. A foreign fund manager seeing other markets surging by 30% to 70%+ may decide to trim allocations in India and reallocate capital where momentum is strongest.' },
        { type: 'paragraph', text: 'This does not mean India is a bad long-term investment. It simply means that, at this time, other global markets look tactically more attractive for large funds where even minor adjustments in expected returns drive billions of dollars in capital rotation.' },

        { type: 'heading', text: '3. The World Is Investing Heavily in AI, and India Is Missing Some of That Direct Opportunity' },
        { type: 'paragraph', text: 'Another crucial reason that does not receive enough attention in daily commentary is the massive global demand for **artificial intelligence (AI) and semiconductor hardware**.' },
        { type: 'paragraph', text: 'Countries such as Taiwan and South Korea are home to the world’s dominant semiconductor fabricators, memory manufacturers, and specialized hardware suppliers powering AI data centers worldwide.' },
        { type: 'paragraph', text: 'As global enterprise budgets flood into AI infrastructure, international investors are hunting for companies that benefit directly from this technological shift.' },
        { type: 'paragraph', text: 'India has world-class strengths in banking, financial services, consumer goods, pharmaceuticals, infrastructure, and IT services. However, its stock market does not have the same concentration of major semiconductor and AI hardware manufacturers found in East Asia.' },
        { type: 'paragraph', text: 'A global fund manager who believes that AI hardware will lead corporate profit growth over the next decade will naturally allocate more capital to countries with direct supply chain exposure. They may still believe in India’s long-term consumer story, but their immediate capital moves where AI monetization is highest.' },
        { type: 'paragraph', text: 'Finance Minister Nirmala Sitharaman also highlighted the movement of global money towards the United States and AI-related investments in October 2026, according to a report by Moneycontrol, confirming that this global competition for capital is recognized at the highest policy levels.' },

        { type: 'heading', text: '4. Indian Stocks Have Fallen, but That Does Not Automatically Make Them Cheap' },
        { type: 'paragraph', text: 'Many retail investors assume that once a stock or index experiences a sharp correction, it immediately becomes a value buy. However, professional investors look beyond nominal share prices—they scrutinize corporate earnings trajectories.' },
        {
          type: 'callout',
          title: 'Understanding the Valuation Math',
          text: 'Suppose a company earns ₹40 per share and trades at ₹1,000 (a P/E of 25). If the stock falls to ₹800, it looks cheaper at first glance. But what if the company’s expected earnings are downgraded from ₹40 to ₹28 per share? At ₹800 with ₹28 earnings, the stock now trades at a P/E of 28.6—making it actually more expensive relative to its earnings than before the fall!'
        },
        { type: 'paragraph', text: 'This is why foreign institutions do not rush to buy shares simply because prices have dropped. They must verify whether future corporate earnings will support the price.' },
        { type: 'paragraph', text: 'A Mint analysis published on October 6, 2026, reported that the Nifty 50’s price-to-earnings (P/E) ratio had eased to around **20.5** at the end of September 2026, down from 25 at its peak in September 2024. While multiples have moderated, if quarterly earnings fail to beat expectations or if analysts lower future profit guidance, foreign funds may continue to stay cautious.' },

        { type: 'heading', text: '5. Foreign Investors Look at Returns in Dollars, Not Just Rupees' },
        { type: 'paragraph', text: 'An Indian investor measures portfolio growth in rupees. A foreign investor must always evaluate returns after converting back into **US Dollars**.' },
        { type: 'paragraph', text: 'When the rupee weakens against the dollar, currency depreciation can completely wipe out stock market gains or worsen losses for global funds.' },
        {
          type: 'table',
          headers: ['Metric', 'In Indian Rupees (INR)', 'In US Dollars (USD)', 'Currency Impact'],
          rows: [
            ['Initial Capital', '₹8,500 (at ₹85 / USD)', '$100.00', 'Base investment'],
            ['Share Price Return (+5%)', '₹8,925 (+5.0% gain)', '$105.00 (at constant FX)', 'Positive equity return'],
            ['Rupee Weakens to ₹95 / USD', '₹8,925', '$93.95 (at ₹95 / USD)', '-6.05% net loss in USD terms!']
          ]
        },
        { type: 'paragraph', text: 'As shown above, even though the investment gained 5% in rupee terms, the foreign investor suffered a net 6% loss in dollar terms due to currency depreciation. When both the stock market faces volatility and the currency softens, dollar-denominated losses multiply, accelerating FII profit-taking.' },

        { type: 'heading', text: '6. Foreign Investors Have Other Options Besides the Stock Market' },
        { type: 'paragraph', text: 'Global investors are not restricted to equities. They can allocate billions into government bonds, sovereign debt, and money market instruments that carry substantially lower risk.' },
        { type: 'paragraph', text: 'When returns from safe developed-market sovereign debt become attractive, large funds become far less willing to accept emerging market equity volatility.' },
        { type: 'paragraph', text: 'Moneycontrol reported in October 2026 that the difference between Indian and US government 10-year bond yields had narrowed to around **2 percentage points**, hovering close to a 22-year low. A narrower spread reduces the yield buffer that emerging market equities traditionally offer to compensate for currency and volatility risks.' },

        { type: 'heading', text: '7. What Are Foreign Investors Really Worried About?' },
        { type: 'paragraph', text: 'While we cannot know the individual deliberations of every portfolio committee, institutional selling patterns reflect four central considerations:' },
        {
          type: 'list',
          items: [
            '**Will Indian companies deliver sufficient earnings growth?** If earnings do not expand fast enough, stock prices struggle even in an expanding macro economy.',
            '**Are other countries offering superior short-term opportunities?** Rapid gains in semiconductor-heavy markets like South Korea and Taiwan illustrate why capital is moving.',
            '**Are Indian stocks worth the risk at current valuations?** Institutional funds constantly weigh expected upside against downside risk before committing fresh capital.',
            '**Can capital earn safer returns elsewhere?** High sovereign yields in developed markets and alternatives provide viable choices with lower volatility.'
          ]
        },
        { type: 'paragraph', text: 'These concerns do not indicate that foreign investors have lost faith in India’s long-term economic prospects. They simply reflect tactical reallocation to where the risk-reward ratio is currently deemed superior.' },

        { type: 'heading', text: '8. Why Is the Government Not Doing More to Support the Market?' },
        { type: 'paragraph', text: 'During market corrections, investors frequently ask why the government or regulatory authorities do not intervene directly to halt the decline.' },
        { type: 'paragraph', text: 'Finance Minister Nirmala Sitharaman has addressed market trends and the global flow of money toward the US and AI assets. The government also regularly holds dialogues with global institutional investors. However, there are fundamental reasons why direct intervention is neither feasible nor desirable:' },
        {
          type: 'ordered-list',
          items: [
            '**Governments cannot guarantee stock prices:** Share prices are determined by willing buyers and willing sellers in a transparent marketplace.',
            '**Protection of taxpayer money:** Using public or sovereign funds to artificially support stock prices would transfer market risk onto citizens and public institutions.',
            '**Verbal statements cannot replace fundamentals:** Policy statements may cause a brief sentiment bounce, but sustained bull runs require real corporate earnings growth and attractive valuations.',
            '**Distinct regulatory mandates:** The Ministry of Finance, the Reserve Bank of India (RBI), and SEBI exist to maintain economic stability, ensure fair and orderly markets, and protect investors—not to engineer daily rises in share indices.'
          ]
        },
        { type: 'paragraph', text: 'The government’s role is to cultivate a robust business climate through predictable regulation, infrastructure buildout, and structural reforms. Ultimately, global investors will allocate capital based on risk-adjusted return expectations.' },

        { type: 'heading', text: '9. Does FII Selling Mean That Foreign Investors Have Lost Trust in India?' },
        { type: 'paragraph', text: 'Not at all. Large-scale institutional selling should not be mistaken for a loss of trust in India’s sovereign trajectory or future economic growth.' },
        { type: 'paragraph', text: 'Institutional capital moves according to global liquidity cycles, interest rate differentials, portfolio rebalancing rules, and relative valuations. When conditions align, institutional money returns just as quickly.' },
        { type: 'paragraph', text: 'The current market dynamics highlight increased global competition for capital and heightened selectivity, not a coordinated plan against the Indian market. Disciplined investors distinguish between factual capital reallocation and emotional market rumors.' },

        { type: 'heading', text: '10. One Interesting Detail: Foreign Investors Are Selling Old Shares but Still Buying New Ones' },
        { type: 'paragraph', text: 'A critical pattern emerges when examining where foreign capital is actually flowing within India.' },
        { type: 'paragraph', text: 'According to NSDL data reported by Mint, during September 2026, foreign portfolio investors sold approximately **₹45,537 crore** of existing shares in the secondary exchange market while simultaneously investing roughly **₹9,676 crore** in primary market offerings and new IPOs.' },
        { type: 'paragraph', text: 'Why would funds sell existing shares while subscribing to new ones? They are actively rebalancing: trimming holdings in mature companies facing slowing growth or rich valuations, and reinvesting into newly listing businesses with fresh growth runways and attractive pricing.' },
        { type: 'paragraph', text: 'This proves that foreign investors are not writing off India—they are executing targeted portfolio rotation.' },

        { type: 'heading', text: '11. What Should Investors Watch Next?' },
        { type: 'paragraph', text: 'Rather than reacting to day-to-day point swings in the Nifty or Sensex, prudent investors should monitor these key market indicators:' },
        {
          type: 'list',
          items: [
            '**Multi-Week FPI Flow Trends:** Track cumulative flows over several weeks or months rather than single-day net figures.',
            '**Corporate Earnings and Margin Trajectories:** Watch whether quarterly reports demonstrate resilient earnings growth and whether forward estimates are being revised upward or downward.',
            '**Market Breadth:** Observe whether rallies are concentrated in a few mega-cap stocks or supported by broad-based buying across mid and small-cap sectors.',
            '**Primary Market Momentum:** Continued foreign appetite for new share offerings indicates persistent long-term confidence in Indian entrepreneurship.',
            '**Global Market Relativities:** Monitor when the performance gap between Indian equities and global tech peers begins to narrow.',
            '**Commentary from Global Fund Managers:** Insights published in institutional asset allocation reports provide clues on when global sentiment shifts back to an overweight position on India.'
          ]
        },
        {
          type: 'callout',
          title: 'Strategic Takeaway for Long-Term Investors',
          text: 'Market drawdowns led by foreign liquidity outflows have historically created compelling entry opportunities for disciplined investors focusing on quality businesses. Stay focused on your long-term financial goals, diversify wisely, and avoid emotional decisions driven by short-term volatility.'
        },
        {
          type: 'callout',
          title: 'Disclaimer',
          text: 'This article is published for educational and awareness purposes only and does not constitute investment advice or a recommendation to buy or sell any securities. Please consult your financial advisor to align investments with your financial goals and risk profile.'
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
                  <h4>Need personalized guidance on Wealth & Portfolio Strategy?</h4>
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
