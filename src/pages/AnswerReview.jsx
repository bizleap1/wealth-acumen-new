import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  HelpCircle, 
  BookOpen, 
  RotateCcw,
  Check,
  X,
  ChevronRight,
  Filter
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { MOCK_TESTS } from '../data/mockTestsData';
import './AnswerReview.css';

const AnswerReview = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('ALL');

  const result = useMemo(() => {
    try {
      const saved = sessionStorage.getItem(`exam_result_${testId}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  }, [testId]);

  const test = MOCK_TESTS.find(t => t.id === testId);
  const breakdown = useMemo(() => result?.breakdown || [], [result]);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return breakdown.filter(item => {
      if (filterType === 'CORRECT') return item.isCorrect;
      if (filterType === 'INCORRECT') return item.isAnswered && !item.isCorrect;
      if (filterType === 'UNANSWERED') return !item.isAnswered;
      return true;
    });
  }, [breakdown, filterType]);

  // If no result exists in session, prompt to take exam
  if (!result || !test) {
    return (
      <div className="review-empty-container">
        <div className="review-empty-card">
          <HelpCircle size={48} className="empty-icon" />
          <h2>Review Not Available</h2>
          <p>Please complete and submit the examination to view the detailed answers and explanations.</p>
          <div className="empty-actions">
            <Link to={`/mock-tests/${testId}/instructions`} className="btn-take-exam">
              Take Examination
            </Link>
            <Link to="/mock-tests" className="btn-back-tests">
              <ArrowLeft size={16} /> All Tests
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { obtainedMarks, totalMarks, percentage, correctCount, incorrectCount, unansweredCount } = result;

  const handleRetakeExam = () => {
    sessionStorage.removeItem(`exam_session_${test.id}`);
    sessionStorage.removeItem(`exam_result_${test.id}`);
    navigate(`/mock-tests/${test.id}/instructions`);
  };

  return (
    <div className="answer-review-page">
      <PageHeader 
        titleFirst="Answer" 
        titleLast="Explanations" 
        subtitle="Review full solutions, verified correct answers, and comprehensive educational explanations."
      />

      <div className="review-container">
        {/* Navigation Breadcrumb */}
        <div className="review-breadcrumb">
          <Link to="/mock-tests">Mock Tests</Link>
          <span className="sep">/</span>
          <Link to={`/mock-tests/${testId}/result`}>Result Dashboard</Link>
          <span className="sep">/</span>
          <span className="active">Detailed Review</span>
        </div>

        {/* Top Control Bar */}
        <div className="review-control-bar">
          <div className="review-info-left">
            <h2 className="review-test-title">{test.title}</h2>
            <div className="review-meta-pills">
              <span className="meta-pill score-pill">Score: {obtainedMarks} / {totalMarks} ({percentage}%)</span>
              <span className="meta-pill correct-pill">✓ {correctCount} Correct</span>
              <span className="meta-pill incorrect-pill">✕ {incorrectCount} Incorrect</span>
              <span className="meta-pill unans-pill">○ {unansweredCount} Unanswered</span>
            </div>
          </div>

          <div className="review-actions-right">
            <Link to={`/mock-tests/${testId}/result`} className="btn-back-result">
              <ArrowLeft size={16} />
              <span>Scorecard</span>
            </Link>
            <button type="button" className="btn-retake-review" onClick={handleRetakeExam}>
              <RotateCcw size={16} />
              <span>Retake</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="review-filter-tabs">
          <span className="filter-tab-label"><Filter size={15} /> Filter:</span>
          <button 
            type="button" 
            className={`filter-btn ${filterType === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilterType('ALL')}
          >
            All Questions ({breakdown.length})
          </button>
          <button 
            type="button" 
            className={`filter-btn correct ${filterType === 'CORRECT' ? 'active' : ''}`}
            onClick={() => setFilterType('CORRECT')}
          >
            Correct ({correctCount})
          </button>
          <button 
            type="button" 
            className={`filter-btn incorrect ${filterType === 'INCORRECT' ? 'active' : ''}`}
            onClick={() => setFilterType('INCORRECT')}
          >
            Incorrect ({incorrectCount})
          </button>
          <button 
            type="button" 
            className={`filter-btn unanswered ${filterType === 'UNANSWERED' ? 'active' : ''}`}
            onClick={() => setFilterType('UNANSWERED')}
          >
            Unanswered ({unansweredCount})
          </button>
        </div>

        {/* Questions List */}
        <div className="review-questions-list">
          {filteredQuestions.map((q) => {
            const originalIndex = breakdown.findIndex(item => item.questionId === q.questionId) + 1;
            const isUserCorrect = q.isCorrect;
            const isUnanswered = !q.isAnswered;

            let statusClass = 'correct';
            let statusLabel = 'Correct Answer';
            let StatusIcon = CheckCircle2;

            if (isUnanswered) {
              statusClass = 'unanswered';
              statusLabel = 'Not Attempted';
              StatusIcon = AlertCircle;
            } else if (!isUserCorrect) {
              statusClass = 'incorrect';
              statusLabel = 'Incorrect Answer';
              StatusIcon = XCircle;
            }

            return (
              <div key={q.questionId} className={`review-question-card ${statusClass}`}>
                {/* Question Header */}
                <div className="review-card-header">
                  <div className="q-badge-row">
                    <span className="q-number-pill">Question {originalIndex}</span>
                    <span className={`q-status-badge ${statusClass}`}>
                      <StatusIcon size={14} />
                      <span>{statusLabel}</span>
                    </span>
                  </div>

                  <div className="q-marks-info">
                    {isUserCorrect ? (
                      <span className="marks-awarded">+{test.marksPerQuestion} Marks</span>
                    ) : isUnanswered ? (
                      <span className="marks-zero">0 Marks</span>
                    ) : (
                      <span className="marks-deducted">
                        {test.negativeMarking > 0 ? `-${test.negativeMarking} Marks` : '0 Marks'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <h3 className="review-question-text">{q.question}</h3>

                {/* Options List */}
                <div className="review-options-list">
                  {q.options.map(opt => {
                    const isOptionCorrect = opt.id === q.correctOption;
                    const isOptionSelected = opt.id === q.userSelection;

                    let optionState = '';
                    if (isOptionCorrect) {
                      optionState = 'is-correct-target';
                    } else if (isOptionSelected && !isOptionCorrect) {
                      optionState = 'is-wrong-target';
                    }

                    return (
                      <div key={opt.id} className={`review-option-item ${optionState}`}>
                        <div className="option-indicator-circle">
                          {isOptionCorrect ? (
                            <Check size={16} className="check-icon" />
                          ) : isOptionSelected ? (
                            <X size={16} className="cross-icon" />
                          ) : (
                            <span>{opt.id}</span>
                          )}
                        </div>

                        <div className="option-text-wrapper">
                          <span className="option-text">{opt.text}</span>
                        </div>

                        <div className="option-tag-wrapper">
                          {isOptionCorrect && (
                            <span className="opt-tag tag-correct">Correct Answer</span>
                          )}
                          {isOptionSelected && !isOptionCorrect && (
                            <span className="opt-tag tag-user-wrong">Your Selection</span>
                          )}
                          {isOptionSelected && isOptionCorrect && (
                            <span className="opt-tag tag-user-right">Your Selection</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="review-explanation-box">
                  <div className="explanation-header">
                    <BookOpen size={16} className="exp-icon" />
                    <strong>Educational Explanation & Reference:</strong>
                  </div>
                  <p className="explanation-content">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="review-bottom-nav">
          <Link to={`/mock-tests/${testId}/result`} className="btn-return-scorecard">
            <ArrowLeft size={16} /> Return to Scorecard
          </Link>
          <Link to="/mock-tests" className="btn-all-tests-cta">
            <span>Explore More Mock Tests</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnswerReview;
