import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  ShieldAlert, 
  Award,
  Play
} from 'lucide-react';
import { MOCK_TESTS } from '../data/mockTestsData';
import PageHeader from '../components/PageHeader';
import './TestInstructions.css';

const TestInstructions = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const test = MOCK_TESTS.find(t => t.id === testId);

  if (!test) {
    return (
      <div className="instructions-error-page">
        <div className="error-card">
          <h2>Examination Not Found</h2>
          <p>The mock test you requested does not exist or has been relocated.</p>
          <Link to="/mock-tests" className="back-btn">
            <ArrowLeft size={16} /> Back to Mock Tests
          </Link>
        </div>
      </div>
    );
  }

  const totalQuestions = test.questions.length;
  const totalMarks = totalQuestions * test.marksPerQuestion;

  const handleStartExam = () => {
    // Clear any previous attempts from sessionStorage for a fresh test run
    sessionStorage.removeItem(`exam_state_${test.id}`);
    sessionStorage.removeItem(`exam_result_${test.id}`);
    navigate(`/mock-tests/${test.id}/exam`);
  };

  return (
    <div className="test-instructions-page">
      <PageHeader 
        titleFirst="Examination" 
        titleLast="Instructions" 
        subtitle="Review the marking scheme, test rules, and time constraints before beginning."
      />

      <div className="instructions-container">
        {/* Breadcrumb Navigation */}
        <div className="instructions-breadcrumb">
          <Link to="/mock-tests">Mock Tests</Link>
          <span className="separator">/</span>
          <span className="current">{test.title}</span>
        </div>

        <div className="instructions-card">
          {/* Header Summary */}
          <div className="instructions-header">
            <div className="test-badge-row">
              <span className="badge category-badge">{test.category}</span>
              <span className={`badge difficulty-badge ${test.difficulty.toLowerCase()}`}>
                {test.difficulty}
              </span>
            </div>
            <h1 className="exam-title">{test.title}</h1>
            <p className="exam-desc">{test.description}</p>
          </div>

          {/* Test Parameters Grid */}
          <div className="exam-params-grid">
            <div className="param-item">
              <div className="param-icon-box">
                <FileText size={20} />
              </div>
              <div className="param-info">
                <span className="param-label">Total Questions</span>
                <span className="param-value">{totalQuestions} MCQs</span>
              </div>
            </div>

            <div className="param-item">
              <div className="param-icon-box">
                <Clock size={20} />
              </div>
              <div className="param-info">
                <span className="param-label">Examination Duration</span>
                <span className="param-value">{test.durationMinutes} Minutes</span>
              </div>
            </div>

            <div className="param-item">
              <div className="param-icon-box">
                <Award size={20} />
              </div>
              <div className="param-info">
                <span className="param-label">Maximum Marks</span>
                <span className="param-value">{totalMarks} Marks</span>
              </div>
            </div>

            <div className="param-item">
              <div className="param-icon-box">
                <CheckCircle size={20} />
              </div>
              <div className="param-info">
                <span className="param-label">Marks Per Question</span>
                <span className="param-value">+{test.marksPerQuestion} Marks</span>
              </div>
            </div>

            <div className="param-item">
              <div className="param-icon-box danger">
                <AlertCircle size={20} />
              </div>
              <div className="param-info">
                <span className="param-label">Negative Marking</span>
                <span className="param-value">
                  {test.negativeMarking > 0 ? `-${test.negativeMarking} Marks per wrong answer` : 'No Negative Marking'}
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Instructions List */}
          <div className="instructions-body">
            <h3 className="section-heading">Important Examination Guidelines</h3>
            <ul className="guidelines-list">
              {test.importantInstructions.map((instruction, idx) => (
                <li key={idx} className="guideline-item">
                  <span className="bullet-number">{idx + 1}</span>
                  <span className="guideline-text">{instruction}</span>
                </li>
              ))}
            </ul>

            <div className="palette-legend-box">
              <h4 className="legend-box-title">Question Palette Legend</h4>
              <p className="legend-box-desc">During the examination, the question palette will indicate your status:</p>
              <div className="legend-items-row">
                <div className="legend-item">
                  <span className="legend-pill not-visited">1</span>
                  <span>Not Visited</span>
                </div>
                <div className="legend-item">
                  <span className="legend-pill not-answered">2</span>
                  <span>Not Answered</span>
                </div>
                <div className="legend-item">
                  <span className="legend-pill answered">3</span>
                  <span>Answered</span>
                </div>
                <div className="legend-item">
                  <span className="legend-pill review">4</span>
                  <span>Marked for Review</span>
                </div>
                <div className="legend-item">
                  <span className="legend-pill answered-review">5</span>
                  <span>Answered & Marked for Review</span>
                </div>
              </div>
            </div>

            <div className="rules-notice">
              <ShieldAlert size={20} className="notice-icon" />
              <div className="notice-content">
                <strong>System Integrity Notice:</strong>
                <p>Do not refresh the browser or switch tabs excessively. The timer runs continuously in real-time until submission.</p>
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <div className="agreement-wrapper">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={agreed} 
                  onChange={(e) => setAgreed(e.target.checked)} 
                  className="agreement-checkbox"
                />
                <span className="checkbox-text">
                  I have read and understood all the instructions above and confirm I am ready to begin the examination.
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="instructions-footer">
            <Link to="/mock-tests" className="btn-secondary">
              <ArrowLeft size={16} />
              <span>Back to Tests</span>
            </Link>

            <button 
              type="button" 
              className={`btn-primary ${!agreed ? 'disabled' : ''}`}
              onClick={handleStartExam}
              disabled={!agreed}
            >
              <span>Start Examination</span>
              <Play size={16} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInstructions;
