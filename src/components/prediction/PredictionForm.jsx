import { useState } from 'react';

export default function PredictionForm() {
  const [formData, setFormData] = useState({
    attendance: '',
    studyHours: '',
    gpa: '',
    extracurricular: false,
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePredict = (e) => {
    e.preventDefault();
    // Simple mock prediction logic
    const gpa = Number(formData.gpa);
    const attendance = Number(formData.attendance);
    const hours = Number(formData.studyHours);

    let score = gpa * 20 + attendance * 0.3 + hours * 3;
    if (formData.extracurricular) score += 5;

    let grade = 'F';
    if (score >= 90) grade = 'A';
    else if (score >= 75) grade = 'B';
    else if (score >= 60) grade = 'C';
    else if (score >= 45) grade = 'D';

    const confidence = Math.min(95, Math.max(40, Math.round(score)));

    setResult({ grade, confidence });
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-card)',
    color: 'var(--text-primary)',
    fontSize: '14px',
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '24px',
      maxWidth: '500px',
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
        Run Prediction
      </h3>
      <form onSubmit={handlePredict} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>GPA</label>
          <input name="gpa" type="number" step="0.1" value={formData.gpa} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Attendance (%)</label>
          <input name="attendance" type="number" value={formData.attendance} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Study Hours/Day</label>
          <input name="studyHours" type="number" value={formData.studyHours} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" name="extracurricular" checked={formData.extracurricular} onChange={handleChange} />
          <label style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Extracurricular Activities</label>
        </div>
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: 'var(--accent)',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 500,
          marginTop: '4px',
        }}>
          Predict Performance
        </button>
      </form>

      {result && (
        <div style={{
          marginTop: '16px',
          padding: '16px',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '6px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Predicted Grade</p>
          <p style={{ fontSize: '36px', fontWeight: 700, color: 'var(--accent)' }}>{result.grade}</p>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Confidence: {result.confidence}%
          </p>
        </div>
      )}
    </div>
  );
}
