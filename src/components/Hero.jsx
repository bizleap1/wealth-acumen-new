import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight, Activity, DollarSign, ArrowUpRight, ArrowDownRight, User } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);
  
  // Real-time Mouse Parallax Animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const parallax1 = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const parallax2 = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);
  const parallax3 = useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]);
  const parallax4 = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e) => {
    if (typeof window !== "undefined") {
      const { clientWidth, clientHeight } = document.documentElement;
      const x = e.clientX / clientWidth - 0.5;
      const y = e.clientY / clientHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const { scrollY } = useScroll();
  
  // As the user scrolls down from 0 to 600px, the background blurs up to 15px
  const backgroundBlur = useTransform(scrollY, [0, 600], ["blur(0px)", "blur(15px)"]);
  // As the user scrolls down, the background moves down slightly (parallax)
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 250]);

  return (
    <div ref={containerRef} className="hero-container dark-glow-theme" onMouseMove={handleMouseMove}>
      
      {/* Dark Glowing Background with Parallax and Blur */}
      <motion.div 
        className="bg-glow-base"
        style={{ y: backgroundY, filter: backgroundBlur }}
      ></motion.div>
      <motion.div 
        className="bg-glow-center"
        style={{ y: backgroundY, filter: backgroundBlur }}
      ></motion.div>

      <motion.div 
        className="hero-content-wrapper"
        style={{ y: backgroundY, filter: backgroundBlur, opacity: useTransform(scrollY, [0, 500], [1, 0.4]) }}
      >
        
        {/* Headlines */}
        <motion.div 
          className="hero-text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="hero-title-elegant">
            Unlock financial <br /> clarity with Wealth Acumen
          </h1>
          <p className="hero-subtitle-elegant">
            Empower your future with automated forecasting and revenue insights that scale with your life.
          </p>
          
          <div className="hero-actions-center">
            <button className="btn-get-started">Get Started <ArrowRight size={16}/></button>
            <button className="btn-try-demo">Try Demo</button>
          </div>
        </motion.div>

        {/* Floating UI Elements & Mockup */}
        <div className="hero-visuals">
          
          {/* Mobile Mockup */}
          <motion.div 
            className="mobile-mockup"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="mockup-screen">
              <div className="mockup-notch"></div>
              {/* Mockup internal UI */}
              <div className="mockup-header">
                <span className="mockup-time">9:41</span>
                <div className="mockup-icons">
                  <div className="signal-bars"></div>
                  <div className="battery-icon"></div>
                </div>
              </div>
              <div className="mockup-profile">
                <div className="profile-avatar"><User size={16} /></div>
                <span className="profile-name">Gauri</span>
              </div>
              {/* Some fading blocks */}
              <div className="mockup-block" style={{ width: '80%', height: '40px', marginTop: '20px' }}></div>
              <div className="mockup-block" style={{ width: '100%', height: '80px', marginTop: '10px' }}></div>
              <div className="mockup-block" style={{ width: '90%', height: '60px', marginTop: '10px' }}></div>
            </div>
          </motion.div>

          {/* Floating Card 6: Users Review */}
          <motion.div className="float-card card-reviews" style={{ x: parallax1, y: parallax2 }}>
            <div className="review-avatars">
              <div className="avatar a1"></div>
              <div className="avatar a2"></div>
              <div className="avatar a3"></div>
            </div>
            <div className="review-text">
              <span className="rt-val">12 million+</span>
              <span className="rt-lbl">users review</span>
            </div>
            <div className="review-star">⭐</div>
          </motion.div>

          {/* Floating Card 1: Targets */}
          <motion.div className="float-card card-targets" style={{ x: parallax3, y: parallax4 }}>
            <h4>Targets met</h4>
            <div className="target-item">
              <div className="target-icon orange"><Activity size={14}/></div>
              <div className="target-text">
                <span className="target-pct">68%</span>
                <span className="target-sub">In this year's hit rate</span>
              </div>
            </div>
            <div className="target-item">
              <div className="target-icon purple"><Activity size={14}/></div>
              <div className="target-text">
                <span className="target-pct">48%</span>
                <span className="target-sub">The best deals for this year</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Card 5: Vacation Fund */}
          <motion.div className="float-card card-vacation" style={{ x: parallax2, y: parallax3 }}>
            <span className="vacation-label">Vacation Fund</span>
            <div className="vacation-chart">
              <div className="chart-circle">
                <span className="chart-pct">43%</span>
              </div>
            </div>
            <span className="vacation-val">$4,200 <span className="light">/$10,000</span></span>
          </motion.div>

          {/* Floating Card 2: Balance */}
          <motion.div className="float-card card-balance" style={{ x: parallax1, y: parallax2 }}>
            <div className="balance-icon"><DollarSign size={16}/></div>
            <div className="balance-info">
              <span className="balance-label">Balance</span>
              <span className="balance-val">$32,300.00</span>
            </div>
          </motion.div>

          {/* Floating Card 4: Transactions */}
          <motion.div className="float-card card-transactions" style={{ x: parallax1, y: parallax4 }}>
            <h4>Transaction</h4>
            <div className="tx-item">
              <div className="tx-icon purple"></div>
              <div className="tx-text">
                <span className="tx-title">Donate to local</span>
                <span className="tx-sub">The best deals for this year</span>
              </div>
              <div className="tx-amt negative">-$14.00</div>
            </div>
            <div className="tx-item">
              <div className="tx-icon yellow"></div>
              <div className="tx-text">
                <span className="tx-title">Half sleave a t-shirt</span>
                <span className="tx-sub">The best deals for this year</span>
              </div>
              <div className="tx-amt positive">+$13.00</div>
            </div>
            <div className="tx-item">
              <div className="tx-icon orange"></div>
              <div className="tx-text">
                <span className="tx-title">Fried Chicken oregano</span>
                <span className="tx-sub">The best deals for this year</span>
              </div>
              <div className="tx-amt positive">+$15.00</div>
            </div>
          </motion.div>

          {/* Floating Card 3: Income */}
          <motion.div className="float-card card-income" style={{ x: parallax3, y: parallax2 }}>
            <span className="income-label">Income</span>
            <span className="income-val">$12,350.00</span>
            <span className="income-trend"><ArrowUpRight size={14}/> 5.4% <span className="light">vs previous months</span></span>
          </motion.div>

        </div>

      </motion.div>
    </div>
  );
};

export default Hero;
