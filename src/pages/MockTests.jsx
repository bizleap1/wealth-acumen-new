import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  BarChart2, 
  Compass, 
  Award, 
  Landmark, 
  Search, 
  Clock, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Filter
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { TEST_CATEGORIES, MOCK_TESTS } from '../data/mockTestsData';
import './MockTests.css';

const ICON_MAP = {
  TrendingUp: TrendingUp,
  BarChart2: BarChart2,
  Compass: Compass,
  Award: Award,
  Landmark: Landmark,
};

const MockTests = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredTests = useMemo(() => {
    return MOCK_TESTS.filter(test => {
      const matchesSearch = 
        test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDifficulty = 
        selectedDifficulty === 'All' || test.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      
      const matchesCategory = 
        selectedCategory === 'All' || test.categoryId === selectedCategory || test.category === selectedCategory;

      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [searchQuery, selectedDifficulty, selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory('All');
    } else {
      setSelectedCategory(categoryId);
      const element = document.getElementById('available-tests-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="mock-tests-page">
      <PageHeader 
        titleFirst="Test Your" 
        titleLast="Knowledge" 
        subtitle="Prepare, practice and evaluate your understanding through structured mock examinations."
      />

      <div className="mock-tests-container">
        {/* Section 1: Examination Categories */}
        <section className="exam-section">
          <div className="section-header-block">
            <div className="section-subtitle">LEARNING DOMAINS</div>
            <h2 className="section-title">Examination Categories</h2>
            <p className="section-desc">
              Select a domain to view curated mock examinations designed to challenge and strengthen your market competencies.
            </p>
          </div>

          <div className="categories-grid">
            {TEST_CATEGORIES.map(cat => {
              const IconComponent = ICON_MAP[cat.icon] || BookOpen;
              const isSelected = selectedCategory === cat.id;

              return (
                <div 
                  key={cat.id} 
                  className={`category-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <div className="category-icon-wrapper">
                    <IconComponent size={26} className="category-icon" />
                  </div>
                  <div className="category-content">
                    <div className="category-header-row">
                      <h3 className="category-title">{cat.name}</h3>
                      <span className="test-count-badge">{cat.testCount} Tests</span>
                    </div>
                    <p className="category-desc">{cat.description}</p>
                    <button 
                      type="button"
                      className="category-explore-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryClick(cat.id);
                      }}
                    >
                      <span>{isSelected ? 'Viewing Tests' : 'Explore Tests'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Available Mock Tests */}
        <section className="exam-section" id="available-tests-section">
          <div className="section-header-block">
            <div className="section-subtitle">ACTIVE EVALUATIONS</div>
            <h2 className="section-title">Available Mock Tests</h2>
            <p className="section-desc">
              Choose an examination to begin your timed test. Review marking schemes, instructions, and verify results with detailed explanations.
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="exam-filters-bar">
            <div className="search-box-wrapper">
              <Search size={18} className="search-icon" />
              <input 
                type="text"
                placeholder="Search mock tests by topic, category or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="filter-chips-group">
              <span className="filter-label">
                <Filter size={15} /> Difficulty:
              </span>
              {difficulties.map(diff => (
                <button
                  key={diff}
                  type="button"
                  className={`filter-chip ${selectedDifficulty === diff ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>

            {selectedCategory !== 'All' && (
              <div className="active-category-pill">
                <span>Category: <strong>{TEST_CATEGORIES.find(c => c.id === selectedCategory)?.name || selectedCategory}</strong></span>
                <button type="button" onClick={() => setSelectedCategory('All')}>✕ Clear</button>
              </div>
            )}
          </div>

          {/* Tests Grid */}
          {filteredTests.length > 0 ? (
            <div className="tests-grid">
              {filteredTests.map(test => {
                const totalMarks = test.questions.length * test.marksPerQuestion;
                const difficultyClass = test.difficulty.toLowerCase();

                return (
                  <div key={test.id} className="test-card">
                    <div className="test-card-top">
                      <span className="test-category-tag">{test.category}</span>
                      <span className={`difficulty-badge ${difficultyClass}`}>
                        {test.difficulty}
                      </span>
                    </div>

                    <h3 className="test-card-title">{test.title}</h3>
                    <p className="test-card-desc">{test.description}</p>

                    <div className="test-meta-grid">
                      <div className="test-meta-item">
                        <FileText size={16} className="meta-icon" />
                        <div className="meta-text">
                          <span className="meta-value">{test.questions.length}</span>
                          <span className="meta-label">Questions</span>
                        </div>
                      </div>

                      <div className="test-meta-item">
                        <Clock size={16} className="meta-icon" />
                        <div className="meta-text">
                          <span className="meta-value">{test.durationMinutes} Mins</span>
                          <span className="meta-label">Duration</span>
                        </div>
                      </div>

                      <div className="test-meta-item">
                        <CheckCircle2 size={16} className="meta-icon" />
                        <div className="meta-text">
                          <span className="meta-value">{totalMarks} Marks</span>
                          <span className="meta-label">Max Marks</span>
                        </div>
                      </div>
                    </div>

                    <div className="test-card-footer">
                      <div className="test-marking-info">
                        +{test.marksPerQuestion} / {test.negativeMarking > 0 ? `-${test.negativeMarking} neg.` : 'No negative'}
                      </div>
                      <Link 
                        to={`/mock-tests/${test.id}/instructions`}
                        className="start-test-btn"
                      >
                        <span>Start Test</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-tests-found">
              <div className="no-tests-icon">🔍</div>
              <h3>No Mock Tests Found</h3>
              <p>We couldn't find any examinations matching your active search or filters.</p>
              <button 
                type="button" 
                className="reset-filters-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDifficulty('All');
                  setSelectedCategory('All');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MockTests;
