import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, X, Sparkles, AlertCircle } from 'lucide-react';
import { searchMutualFunds } from '../services/mutualFundApi';
import { detectPlanType, detectOptionType } from '../utils/fundCalculations';
import './MutualFundSearch.css';

const POPULAR_SUGGESTIONS = [
  'HDFC Flexi Cap',
  'Parag Parikh Flexi Cap',
  'SBI Hybrid',
  'ICICI Prudential Corporate Bond',
  'Nippon India Gold',
];

const MutualFundSearch = ({ onSelectScheme, placeholder = "Search mutual funds by name (e.g., HDFC, Parag Parikh, SBI)..." }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const searchWrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced API search
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const debounceTimer = setTimeout(async () => {
      try {
        const data = await searchMutualFunds(trimmed);
        setResults(data);
        setIsOpen(true);
      } catch (err) {
        setError(err.message || 'Error fetching schemes');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelect = (scheme) => {
    onSelectScheme(scheme);
    setQuery(scheme.schemeName);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const handleSuggestionClick = (name) => {
    setQuery(name);
  };

  return (
    <div className="mf-search-container" ref={searchWrapperRef}>
      <div className="mf-search-bar-wrap">
        <Search size={18} className="search-lead-icon" />
        <input
          type="text"
          className="mf-search-input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
        />

        {isLoading && (
          <Loader2 size={18} className="search-spinner-icon" />
        )}

        {query && !isLoading && (
          <button type="button" className="search-clear-btn" onClick={handleClear}>
            <X size={16} />
          </button>
        )}
      </div>

      {/* Popular Chips */}
      {!query && (
        <div className="search-suggestions-row">
          <span className="suggestions-label">
            <Sparkles size={13} /> Popular Searches:
          </span>
          {POPULAR_SUGGESTIONS.map(item => (
            <button
              key={item}
              type="button"
              className="suggestion-chip"
              onClick={() => handleSuggestionClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="search-dropdown-menu">
          {error && (
            <div className="search-dropdown-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {!error && results.length === 0 && !isLoading && (
            <div className="search-dropdown-empty">
              No matching mutual fund schemes found for &quot;{query}&quot;. Try another keyword.
            </div>
          )}

          {results.slice(0, 30).map((scheme) => {
            const planType = detectPlanType(scheme.schemeName);
            const optionType = detectOptionType(scheme.schemeName);

            return (
              <div
                key={scheme.schemeCode}
                className="search-dropdown-item"
                onClick={() => handleSelect(scheme)}
              >
                <div className="item-text-block">
                  <div className="item-scheme-name">{scheme.schemeName}</div>
                  <div className="item-badges-row">
                    <span className="code-pill">Code: {scheme.schemeCode}</span>
                    <span className={`plan-pill ${planType.toLowerCase().includes('direct') ? 'direct' : 'regular'}`}>
                      {planType}
                    </span>
                    <span className="option-pill">{optionType}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MutualFundSearch;
