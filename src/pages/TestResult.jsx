import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Award, 
  Clock, 
  CheckCircle2, 
  RotateCcw, 
  BookOpen, 
  ArrowLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { MOCK_TESTS } from '../data/mockTestsData';
import './TestResult.css';

const TestResult = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  // Load result from sessionStorage
  const result = useMemo(() => {
    try {
      const saved = sessionStorage.getItem(`exam_result_${testId}`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return null;
  }, [testId]);

  const test = MOCK_TESTS.find(t => t.id === testId);

  // If no result exists in session, show empty state
  if (!result || !test) {
    return (
      <div className="result-empty-container">
        <div className="result-empty-card">
          <AlertCircle size={48} className="empty-icon" />
          <h2>No Examination Result Found</h2>
          <p>You haven't completed or submitted this mock examination yet, or your session has expired.</p>
          <div className="empty-actions">
            <Link to={`/mock-tests/${testId}/instructions`} className="btn-take-exam">
              Take Examination
            </Link>
            <Link to="/mock-tests" className="btn-back-tests">
              <ArrowLeft size={16} /> All Mock Tests
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const {
    testTitle,
    category,
    difficulty,
    totalQuestions,
    attemptedCount,
    correctCount,
    incorrectCount,
    unansweredCount,
    totalMarks,
    obtainedMarks,
    percentage,
    timeSpentSeconds,
    isAutoSubmit,
  } = result;

  // Format time spent as mm:ss or mm min ss sec
  const formatTimeSpent = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    if (mins === 0) return `${remainingSecs} sec`;
    return `${mins}m ${remainingSecs}s`;
  };

  // Performance Summary dependent on score
  const getPerformanceFeedback = (scorePct) => {
    if (scorePct >= 85) {
      return {
        badge: 'Outstanding Performance',
        badgeClass: 'outstanding',
        message: 'Outstanding Performance! You have demonstrated comprehensive mastery of this financial subject.',
        icon: Trophy,
      };
    } else if (scorePct >= 70) {
      return {
        badge: 'Very Good Performance',
        badgeClass: 'good',
        message: 'Good Performance! You have demonstrated a strong, dependable grasp of the subject principles.',
        icon: Award,
      };
    } else if (scorePct >= 50) {
      return {
        badge: 'Satisfactory Performance',
        badgeClass: 'satisfactory',
        message: 'Satisfactory understanding. Review the detailed answer explanations to strengthen your core concepts.',
        icon: CheckCircle2,
      };
    } else {
      return {
        badge: 'Needs Improvement',
        badgeClass: 'needs-improvement',
        message: 'Needs Improvement. We recommend reviewing the answers and exploring the learning modules before re-testing.',
        icon: AlertCircle,
      };
    }
  };

  const feedback = getPerformanceFeedback(percentage);
  const FeedbackIcon = feedback.icon;

  // Visual SVG Donut Chart Calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;

  const correctPct = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  const incorrectPct = totalQuestions > 0 ? (incorrectCount / totalQuestions) * 100 : 0;
  const unansweredPct = totalQuestions > 0 ? (unansweredCount / totalQuestions) * 100 : 0;

  const correctStroke = (correctPct / 100) * circumference;
  const incorrectStroke = (incorrectPct / 100) * circumference;
  const unansweredStroke = (unansweredPct / 100) * circumference;

  // Retake exam handler
  const handleRetakeExam = () => {
    sessionStorage.removeItem(`exam_session_${test.id}`);
    sessionStorage.removeItem(`exam_result_${test.id}`);
    navigate(`/mock-tests/${test.id}/instructions`);
  };

  return (
    <div className="test-result-page">
      <PageHeader 
        titleFirst="Performance" 
        titleLast="Dashboard" 
        subtitle="Review your examination score, accuracy breakdown, and detailed subject analysis."
      />

      <div className="result-container">
        {/* Navigation Breadcrumb */}
        <div className="result-breadcrumb">
          <Link to="/mock-tests">Mock Tests</Link>
          <span className="sep">/</span>
          <span>{testTitle}</span>
          <span className="sep">/</span>
          <span className="active">Result</span>
        </div>

        {/* Auto Submit Notification */}
        {isAutoSubmit && (
          <div className="auto-submit-banner">
            <Clock size={18} />
            <span>Time expired: Your examination was automatically submitted upon timer completion.</span>
          </div>
        )}

        {/* Main Result Card */}
        <div className="result-card-main">
          {/* Header Block with Score Summary */}
          <div className="result-header-block">
            <div className="header-meta-row">
              <span className="badge category-badge">{category}</span>
              <span className={`badge difficulty-badge ${difficulty.toLowerCase()}`}>
                {difficulty}
              </span>
              <span className={`performance-badge ${feedback.badgeClass}`}>
                <FeedbackIcon size={14} />
                <span>{feedback.badge}</span>
              </span>
            </div>

            <h1 className="result-exam-title">{testTitle}</h1>
            <p className="result-feedback-message">{feedback.message}</p>
          </div>

          {/* Primary Metrics Grid */}
          <div className="score-metrics-strip">
            <div className="metric-box score-box">
              <span className="metric-label">Marks Obtained</span>
              <div className="metric-value-row">
                <span className="metric-val primary-val">{obtainedMarks}</span>
                <span className="metric-sub">/ {totalMarks}</span>
              </div>
            </div>

            <div className="metric-box percent-box">
              <span className="metric-label">Percentage</span>
              <div className="metric-value-row">
                <span className="metric-val accent-val">{percentage}%</span>
              </div>
            </div>

            <div className="metric-box accuracy-box">
              <span className="metric-label">Accuracy Rate</span>
              <div className="metric-value-row">
                <span className="metric-val">
                  {attemptedCount > 0 ? ((correctCount / attemptedCount) * 100).toFixed(0) : 0}%
                </span>
              </div>
            </div>

            <div className="metric-box time-box">
              <span className="metric-label">Time Taken</span>
              <div className="metric-value-row">
                <span className="metric-val">{formatTimeSpent(timeSpentSeconds)}</span>
              </div>
            </div>
          </div>

          {/* Visual Performance Chart & Breakdown Section */}
          <div className="breakdown-section">
            <h3 className="section-title">Question Status & Accuracy Breakdown</h3>

            <div className="chart-and-stats-row">
              {/* Visual SVG Donut Chart */}
              <div className="donut-chart-container">
                <svg className="result-donut-svg" viewBox="0 0 160 160">
                  {/* Background Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke="#f1f5f9"
                    strokeWidth="16"
                  />

                  {/* Correct Answers Arc */}
                  {correctCount > 0 && (
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="transparent"
                      stroke="#10b981"
                      strokeWidth="16"
                      strokeDasharray={`${correctStroke} ${circumference - correctStroke}`}
                      strokeDashoffset="0"
                      transform="rotate(-90 80 80)"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Incorrect Answers Arc */}
                  {incorrectCount > 0 && (
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="transparent"
                      stroke="#ef4444"
                      strokeWidth="16"
                      strokeDasharray={`${incorrectStroke} ${circumference - incorrectStroke}`}
                      strokeDashoffset={-correctStroke}
                      transform="rotate(-90 80 80)"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Unanswered Arc */}
                  {unansweredCount > 0 && (
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="transparent"
                      stroke="#94a3b8"
                      strokeWidth="16"
                      strokeDasharray={`${unansweredStroke} ${circumference - unansweredStroke}`}
                      strokeDashoffset={-(correctStroke + incorrectStroke)}
                      transform="rotate(-90 80 80)"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Center Text */}
                  <text x="80" y="75" textAnchor="middle" className="donut-center-pct">
                    {percentage}%
                  </text>
                  <text x="80" y="93" textAnchor="middle" className="donut-center-lbl">
                    Score
                  </text>
                </svg>
              </div>

              {/* Statistical Cards Grid */}
              <div className="stats-cards-grid">
                <div className="status-stat-card">
                  <div className="stat-card-header">
                    <span className="dot total-dot"></span>
                    <span className="card-label">Total Questions</span>
                  </div>
                  <span className="card-number">{totalQuestions}</span>
                  <span className="card-sub">{attemptedCount} attempted</span>
                </div>

                <div className="status-stat-card correct-card">
                  <div className="stat-card-header">
                    <span className="dot correct-dot"></span>
                    <span className="card-label">Correct Answers</span>
                  </div>
                  <span className="card-number">{correctCount}</span>
                  <span className="card-sub">+{correctCount * test.marksPerQuestion} Marks</span>
                </div>

                <div className="status-stat-card incorrect-card">
                  <div className="stat-card-header">
                    <span className="dot incorrect-dot"></span>
                    <span className="card-label">Incorrect Answers</span>
                  </div>
                  <span className="card-number">{incorrectCount}</span>
                  <span className="card-sub">
                    {test.negativeMarking > 0 ? `-${incorrectCount * test.negativeMarking} Neg.` : '0 Negative'}
                  </span>
                </div>

                <div className="status-stat-card unanswered-card">
                  <div className="stat-card-header">
                    <span className="dot unanswered-dot"></span>
                    <span className="card-label">Unanswered</span>
                  </div>
                  <span className="card-number">{unansweredCount}</span>
                  <span className="card-sub">0 Marks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="result-actions-strip">
            <Link to="/mock-tests" className="action-button tertiary-btn">
              <ArrowLeft size={16} />
              <span>Back to Mock Tests</span>
            </Link>

            <button 
              type="button" 
              className="action-button secondary-btn"
              onClick={handleRetakeExam}
            >
              <RotateCcw size={16} />
              <span>Retake Test</span>
            </button>

            <Link 
              to={`/mock-tests/${test.id}/review`} 
              className="action-button primary-btn"
            >
              <BookOpen size={16} />
              <span>Review Answers</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
