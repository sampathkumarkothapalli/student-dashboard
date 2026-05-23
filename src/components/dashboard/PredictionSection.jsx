import React, { useState } from 'react';

const defaultMarks = { sub1: '', sub2: '', sub3: '', sub4: '', sub5: '', sub6: '' };
const subjectNames = [
  'Subject 1', 'Subject 2', 'Subject 3',
  'Subject 4', 'Subject 5', 'Subject 6',
];

const gradeFromPercentage = (pct) => {
  if (pct >= 90) return 'A+';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B+';
  if (pct >= 60) return 'B';
  if (pct >= 50) return 'C';
  return 'F';
};

const PredictionSection = () => {
  const [marks, setMarks] = useState(defaultMarks);
  const [result, setResult] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleChange = (key, val) => {
    const num = val === '' ? '' : Math.min(100, Math.max(0, Number(val)));
    setMarks((prev) => ({ ...prev, [key]: num }));
  };

  const allFilled = Object.values(marks).every((v) => v !== '' && !isNaN(v));

  const predict = () => {
    if (!allFilled) return;
    const vals = Object.values(marks).map(Number);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;

    // SGPA ≈ avg / 10  (simplified 10-point scale)
    const sgpa = +(avg / 10).toFixed(2);
    // CGPA kept same as SGPA for single-semester prediction
    const cgpa = sgpa;
    // Percentage = (SGPA × 10) − 7.5
    const percentage = +((sgpa * 10) - 7.5).toFixed(2);
    const grade = gradeFromPercentage(percentage);

    setAnimating(false);
    setTimeout(() => {
      setResult({ sgpa, cgpa, percentage, grade });
      setAnimating(true);
    }, 50);
  };

  const reset = () => {
    setMarks(defaultMarks);
    setResult(null);
    setAnimating(false);
  };

  return (
    <section id="prediction" className="section">
      <div className="section-inner">
        <span className="section-badge scroll-animate">🔮 Prediction</span>
        <h2 className="section-title scroll-animate">Grade Prediction</h2>
        <p className="section-subtitle scroll-animate delay-1">
          Enter your subject marks and instantly predict your SGPA, CGPA &amp; percentage.
        </p>

        <div className="prediction-layout">
          {/* ── Form ── */}
          <div className="glass-card prediction-form-card scroll-animate from-left">
            <div className="form-row">
              {Object.keys(marks).map((key, i) => (
                <div className="form-group" key={key}>
                  <label className="form-label">{subjectNames[i]}</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="0 – 100"
                    min={0}
                    max={100}
                    value={marks[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <button
              className="btn-predict"
              disabled={!allFilled}
              onClick={predict}
            >
              🚀 Predict Performance
            </button>

            {result && (
              <button
                className="btn-predict"
                style={{
                  marginTop: '0.8rem',
                  background: 'rgba(255,255,255,0.06)',
                  boxShadow: 'none',
                }}
                onClick={reset}
              >
                ↺ Reset
              </button>
            )}

            {/* Formula card */}
            <div className="glass-card formula-card" style={{ marginTop: '1.5rem' }}>
              <div className="form-label" style={{ marginBottom: '0.4rem' }}>Formula Used</div>
              <div className="formula-text">Percentage = (SGPA × 10) − 7.5</div>
            </div>
          </div>

          {/* ── Result ── */}
          <div className="scroll-animate from-right delay-2">
            {!result ? (
              <div className="glass-card prediction-empty">
                <div className="prediction-empty-icon">📝</div>
                <div className="prediction-empty-text">
                  Enter marks to see your predicted performance
                </div>
              </div>
            ) : (
              <div
                className={`glass-card prediction-result-card${animating ? ' show' : ''}`}
              >
                <div
                  className="result-glow"
                  style={{ background: 'radial-gradient(circle, rgba(102,126,234,0.5), transparent 70%)' }}
                />
                <div className="result-label">Predicted Grade</div>
                <div className="result-grade">{result.grade}</div>

                <div className="result-details">
                  <div>
                    <div className="result-detail-value">{result.sgpa}</div>
                    <div className="result-detail-label">SGPA</div>
                  </div>
                  <div>
                    <div className="result-detail-value">{result.cgpa}</div>
                    <div className="result-detail-label">CGPA</div>
                  </div>
                  <div>
                    <div className="result-detail-value">{result.percentage}%</div>
                    <div className="result-detail-label">Percentage</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionSection;
