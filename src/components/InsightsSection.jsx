import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InsightsSection.css';

const InsightsSection = () => {
  const navigate = useNavigate();
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback images in case the RSS feed doesn't provide them
  const fallbackImages = [
    '/images/mutual_funds.png',
    '/images/bse_building.png',
    '/images/finance_graphic.png'
  ];

  useEffect(() => {
    const fetchETNews = async () => {
      try {
        const rssUrl = 'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms';
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
        const data = await response.json();
        
        if (data.status === 'ok') {
          // Take the top 3 items
          const topItems = data.items.slice(0, 3).map((item, index) => ({
            id: index,
            // Try to use RSS image, else use fallback
            image: (item.enclosure && item.enclosure.link) ? item.enclosure.link : fallbackImages[index],
            author: item.author || 'ECONOMIC TIMES',
            date: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase(),
            title: item.title,
            link: item.link
          }));
          setInsights(topItems);
        }
      } catch (error) {
        console.error('Error fetching ET news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchETNews();
  }, []);

  return (
    <section className="insights-section">
      <div className="insights-container">
        <div className="insights-header">
          <div className="insights-header-text">
            <h2>Market Intelligence & Insights</h2>
            <p>Stay ahead with the latest trends and deep-dive analysis from our research desk.</p>
          </div>
          <button className="btn-view-all" onClick={() => navigate('/resources')}>View All Insights</button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0', color: '#6b7280' }}>Loading latest market news...</div>
        ) : (
          <div className="insights-grid">
            {insights.map(insight => (
              <a href={insight.link} target="_blank" rel="noopener noreferrer" key={insight.id} className="insight-card" style={{ textDecoration: 'none' }}>
                <div className="insight-image-wrapper">
                  <img src={insight.image} alt={insight.title} className="insight-image" />
                </div>
                <div className="insight-content">
                  <div className="insight-meta">
                    BY <span className="insight-author">{insight.author}</span> | {insight.date}
                  </div>
                  <h3 className="insight-title">{insight.title}</h3>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default InsightsSection;
