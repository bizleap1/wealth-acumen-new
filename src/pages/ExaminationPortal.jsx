import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  RotateCcw, 
  Send, 
  AlertTriangle, 
  X,
  Info
} from 'lucide-react';
import { MOCK_TESTS } from '../data/mockTestsData';
import './ExaminationPortal.css';

const ExaminationPortal = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const test = MOCK_TESTS.find(t => t.id === testId);
  const totalQuestions = test ? test.questions.length : 0;
  const storageKey = test ? `exam_session_${test.id}` : 'exam_session_temp';

  // Read or initialize test session state
  const loadInitialSession = () => {
    if (!test) {
      return {
        currentIndex: 0,
        answers: {},
        reviewStatus: {},
        visited: {},
        startTimestamp: Date.now(),
        totalDurationSeconds: 0,
      };
    }

    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed;
      }
    } catch {
      // fallback to initial
    }

    const initialVisited = { [test.questions[0].id]: true };
    return {
      currentIndex: 0,
      answers: {},
      reviewStatus: {},
      visited: initialVisited,
      startTimestamp: Date.now(),
      totalDurationSeconds: test.durationMinutes * 60,
    };
  };

  const [session, setSession] = useState(loadInitialSession);
  const [timeLeft, setTimeLeft] = useState(() => {
    const elapsed = Math.floor((Date.now() - session.startTimestamp) / 1000);
    const remaining = session.totalDurationSeconds - elapsed;
    return remaining > 0 ? remaining : 0;
  });

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSubmittedRef = useRef(false);

  // Sync session state to sessionStorage
  useEffect(() => {
    if (!test) return;
    sessionStorage.setItem(storageKey, JSON.stringify(session));
  }, [session, storageKey, test]);

  // Submit test function
  const handleSubmitExam = useCallback((isAutoSubmit = false) => {
    if (!test || hasSubmittedRef.current || isSubmitting) return;
    hasSubmittedRef.current = true;
    setIsSubmitting(true);

    const questions = test.questions;
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    const breakdown = questions.map(q => {
      const userChoice = session.answers[q.id] || null;
      const isAnswered = Boolean(userChoice);
      const isCorrect = userChoice === q.correctOption;

      if (!isAnswered) {
        unansweredCount += 1;
      } else if (isCorrect) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }

      return {
        questionId: q.id,
        question: q.question,
        options: q.options,
        userSelection: userChoice,
        correctOption: q.correctOption,
        isCorrect,
        isAnswered,
        explanation: q.explanation,
      };
    });

    const marksGained = correctCount * test.marksPerQuestion;
    const negativeDeduction = incorrectCount * (test.negativeMarking || 0);
    const obtainedMarks = Math.max(0, marksGained - negativeDeduction);
    const totalPossibleMarks = questions.length * test.marksPerQuestion;
    const percentage = totalPossibleMarks > 0 ? ((obtainedMarks / totalPossibleMarks) * 100).toFixed(1) : '0';

    const timeSpentSeconds = Math.min(
      session.totalDurationSeconds,
      Math.floor((Date.now() - session.startTimestamp) / 1000)
    );

    const resultPayload = {
      testId: test.id,
      testTitle: test.title,
      category: test.category,
      difficulty: test.difficulty,
      totalQuestions: questions.length,
      attemptedCount: correctCount + incorrectCount,
      correctCount,
      incorrectCount,
      unansweredCount,
      totalMarks: totalPossibleMarks,
      obtainedMarks,
      marksPerQuestion: test.marksPerQuestion,
      negativeMarking: test.negativeMarking,
      percentage: Number(percentage),
      timeSpentSeconds,
      isAutoSubmit,
      submittedAt: new Date().toISOString(),
      breakdown,
    };

    // Store in sessionStorage
    sessionStorage.setItem(`exam_result_${test.id}`, JSON.stringify(resultPayload));
    // Clean active session
    sessionStorage.removeItem(storageKey);

    // Redirect to result page
    navigate(`/mock-tests/${test.id}/result`);
  }, [test, session, storageKey, navigate, isSubmitting]);

  // Continuous Timer
  useEffect(() => {
    if (!test) return;
    const timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - session.startTimestamp) / 1000);
      const remaining = session.totalDurationSeconds - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(timerInterval);
        handleSubmitExam(true);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [session.startTimestamp, session.totalDurationSeconds, handleSubmitExam, test]);

  // Guard: If test is missing
  if (!test) {
    return (
      <div className="exam-error-page">
        <h2>Examination Not Found</h2>
        <Link to="/mock-tests">Return to Mock Tests</Link>
      </div>
    );
  }

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentQ = test.questions[session.currentIndex];
  const selectedOption = session.answers[currentQ.id] || '';
  const isCurrentMarkedForReview = Boolean(session.reviewStatus[currentQ.id]);

  // Option selection
  const handleSelectOption = (optionId) => {
    setSession(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQ.id]: optionId,
      },
    }));
  };

  // Clear response
  const handleClearResponse = () => {
    setSession(prev => {
      const updatedAnswers = { ...prev.answers };
      delete updatedAnswers[currentQ.id];
      return {
        ...prev,
        answers: updatedAnswers,
      };
    });
  };

  // Toggle Mark for Review
  const handleToggleReview = () => {
    setSession(prev => ({
      ...prev,
      reviewStatus: {
        ...prev.reviewStatus,
        [currentQ.id]: !prev.reviewStatus[currentQ.id],
      },
    }));
  };

  // Navigate to Question
  const goToQuestion = (targetIndex) => {
    if (targetIndex < 0 || targetIndex >= totalQuestions) return;
    const targetQId = test.questions[targetIndex].id;
    setSession(prev => ({
      ...prev,
      currentIndex: targetIndex,
      visited: {
        ...prev.visited,
        [targetQId]: true,
      },
    }));
  };

  // Save & Next
  const handleSaveAndNext = () => {
    if (session.currentIndex < totalQuestions - 1) {
      goToQuestion(session.currentIndex + 1);
    }
  };

  // Previous
  const handlePrevious = () => {
    if (session.currentIndex > 0) {
      goToQuestion(session.currentIndex - 1);
    }
  };

  // Determine Question Palette State
  const getQuestionState = (qId) => {
    const isVisited = Boolean(session.visited[qId]);
    const isAnswered = Boolean(session.answers[qId]);
    const isMarked = Boolean(session.reviewStatus[qId]);

    if (!isVisited) return 'not-visited';
    if (isAnswered && isMarked) return 'answered-review';
    if (isMarked) return 'review';
    if (isAnswered) return 'answered';
    return 'not-answered';
  };

  // Counts for status
  const counts = {
    answered: Object.keys(session.answers).length,
    notAnswered: totalQuestions - Object.keys(session.answers).length,
    review: Object.values(session.reviewStatus).filter(Boolean).length,
  };

  const isTimeCritical = timeLeft < 180; // under 3 minutes

  return (
    <div className="exam-portal">
      {/* Top Navbar Header */}
      <header className="exam-topbar">
        <div className="topbar-left">
          <span className="portal-brand">WEALTH ACUMEN</span>
          <span className="brand-divider">|</span>
          <h1 className="exam-topbar-title">{test.title}</h1>
        </div>

        <div className="topbar-right">
          <div className={`countdown-clock ${isTimeCritical ? 'critical-alert' : ''}`}>
            <Clock size={18} className="clock-icon" />
            <div className="clock-details">
              <span className="clock-label">Time Remaining</span>
              <span className="clock-value">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <button 
            type="button" 
            className="submit-exam-cta"
            onClick={() => setShowSubmitModal(true)}
          >
            <Send size={15} />
            <span>Submit Test</span>
          </button>
        </div>
      </header>

      {/* Main Examination Layout */}
      <div className="exam-layout-container">
        {/* Left / Main Question Area */}
        <main className="exam-main-panel">
          <div className="question-header-strip">
            <div className="question-number-badge">
              Question {session.currentIndex + 1} of {totalQuestions}
            </div>
            <div className="question-marks-badge">
              +{test.marksPerQuestion} Marks {test.negativeMarking > 0 && `| -${test.negativeMarking} Neg.`}
            </div>
          </div>

          <div className="question-content-box">
            <h2 className="question-prompt-text">
              {currentQ.question}
            </h2>

            <div className="options-container">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <label 
                    key={opt.id} 
                    className={`option-row ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(opt.id)}
                  >
                    <div className="option-radio-circle">
                      <span className={`option-letter ${isSelected ? 'active-letter' : ''}`}>
                        {opt.id}
                      </span>
                    </div>
                    <span className="option-label-text">{opt.text}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Action Bar */}
          <div className="exam-action-bar">
            <div className="action-bar-left">
              <button 
                type="button" 
                className="action-btn secondary-btn"
                onClick={handlePrevious}
                disabled={session.currentIndex === 0}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <button 
                type="button" 
                className={`action-btn review-btn ${isCurrentMarkedForReview ? 'active' : ''}`}
                onClick={handleToggleReview}
              >
                <Bookmark size={16} />
                <span>{isCurrentMarkedForReview ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>

              {selectedOption && (
                <button 
                  type="button" 
                  className="action-btn clear-btn"
                  onClick={handleClearResponse}
                >
                  <RotateCcw size={15} />
                  <span>Clear Response</span>
                </button>
              )}
            </div>

            <div className="action-bar-right">
              {session.currentIndex < totalQuestions - 1 ? (
                <button 
                  type="button" 
                  className="action-btn save-next-btn"
                  onClick={handleSaveAndNext}
                >
                  <span>Save & Next</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button 
                  type="button" 
                  className="action-btn save-next-btn final-save"
                  onClick={() => setShowSubmitModal(true)}
                >
                  <span>Save & Submit</span>
                  <Send size={15} />
                </button>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar: Palette & Summary */}
        <aside className="exam-sidebar">
          {/* Quick Stats Summary */}
          <div className="sidebar-stats-card">
            <h3 className="sidebar-title">Question Palette</h3>
            
            <div className="palette-stats-row">
              <div className="stat-chip answered">
                <span className="stat-num">{counts.answered}</span>
                <span className="stat-name">Answered</span>
              </div>
              <div className="stat-chip not-answered">
                <span className="stat-num">{counts.notAnswered}</span>
                <span className="stat-name">Not Answered</span>
              </div>
              <div className="stat-chip review">
                <span className="stat-num">{counts.review}</span>
                <span className="stat-name">Review</span>
              </div>
            </div>
          </div>

          {/* Question Grid Buttons */}
          <div className="palette-grid-wrapper">
            <div className="palette-grid">
              {test.questions.map((q, idx) => {
                const state = getQuestionState(q.id);
                const isCurrent = idx === session.currentIndex;

                return (
                  <button
                    key={q.id}
                    type="button"
                    className={`palette-num-btn ${state} ${isCurrent ? 'current-active' : ''}`}
                    onClick={() => goToQuestion(idx)}
                    title={`Question ${idx + 1}: ${state}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend Guide */}
          <div className="sidebar-legend">
            <h4 className="legend-title">Status Legend</h4>
            <div className="legend-grid">
              <div className="legend-row">
                <span className="legend-dot answered"></span>
                <span>Answered ({counts.answered})</span>
              </div>
              <div className="legend-row">
                <span className="legend-dot not-answered"></span>
                <span>Not Answered</span>
              </div>
              <div className="legend-row">
                <span className="legend-dot review"></span>
                <span>Marked for Review</span>
              </div>
              <div className="legend-row">
                <span className="legend-dot answered-review"></span>
                <span>Answered & Review</span>
              </div>
              <div className="legend-row">
                <span className="legend-dot not-visited"></span>
                <span>Not Visited</span>
              </div>
            </div>
          </div>

          {/* Need help notice */}
          <div className="sidebar-help-box">
            <Info size={16} className="help-icon" />
            <p>Answers are saved instantly. You may jump between questions anytime.</p>
          </div>
        </aside>
      </div>

      {/* Manual Submission Confirmation Modal */}
      {showSubmitModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <div className="modal-icon-wrapper">
                <AlertTriangle size={24} className="modal-warning-icon" />
              </div>
              <div className="modal-header-text">
                <h3>Submit Examination?</h3>
                <p>Please review your test summary before final submission.</p>
              </div>
              <button 
                type="button" 
                className="modal-close-btn"
                onClick={() => setShowSubmitModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-summary-grid">
              <div className="summary-card">
                <span className="summary-val">{totalQuestions}</span>
                <span className="summary-lbl">Total Questions</span>
              </div>
              <div className="summary-card answered">
                <span className="summary-val">{counts.answered}</span>
                <span className="summary-lbl">Attempted</span>
              </div>
              <div className="summary-card not-answered">
                <span className="summary-val">{counts.notAnswered}</span>
                <span className="summary-lbl">Unattempted</span>
              </div>
              <div className="summary-card review">
                <span className="summary-val">{counts.review}</span>
                <span className="summary-lbl">Marked for Review</span>
              </div>
            </div>

            <div className="modal-warning-box">
              <AlertTriangle size={18} className="warn-icon" />
              <span>
                Once submitted, your responses will be evaluated immediately. You will not be able to resume or edit your answers for this session.
              </span>
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="modal-btn cancel-btn"
                onClick={() => setShowSubmitModal(false)}
              >
                Return to Examination
              </button>
              <button 
                type="button" 
                className="modal-btn confirm-btn"
                onClick={() => handleSubmitExam(false)}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Evaluating Score...' : 'Confirm & Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExaminationPortal;
