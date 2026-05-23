import { useState } from 'react';
import { useStudentContext } from '../../context/StudentContext';
import { validateStudentForm } from '../../utils/validators';

export default function StudentForm({ onClose }) {
  const { addStudent } = useStudentContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: 'B',
    gpa: '',
    attendance: '',
    riskLevel: 'medium',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateStudentForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    addStudent({
      ...formData,
      gpa: Number(formData.gpa),
      attendance: Number(formData.attendance),
    });
    if (onClose) onClose();
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

  const labelStyle = {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    marginBottom: '4px',
    display: 'block',
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '24px',
    }}>
      <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: 'var(--text-primary)' }}>
        Add New Student
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} style={inputStyle} />
          {errors.name && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} style={inputStyle} />
          {errors.email && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>}
        </div>
        <div>
          <label style={labelStyle}>GPA (0-4.0)</label>
          <input name="gpa" type="number" step="0.1" value={formData.gpa} onChange={handleChange} style={inputStyle} />
          {errors.gpa && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.gpa}</p>}
        </div>
        <div>
          <label style={labelStyle}>Attendance (%)</label>
          <input name="attendance" type="number" value={formData.attendance} onChange={handleChange} style={inputStyle} />
          {errors.attendance && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.attendance}</p>}
        </div>
        <div>
          <label style={labelStyle}>Grade</label>
          <select name="grade" value={formData.grade} onChange={handleChange} style={inputStyle}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Risk Level</label>
          <select name="riskLevel" value={formData.riskLevel} onChange={handleChange} style={inputStyle}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <button type="submit" style={{
          padding: '8px 20px',
          backgroundColor: 'var(--accent)',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 500,
        }}>
          Add Student
        </button>
        {onClose && (
          <button type="button" onClick={onClose} style={{
            padding: '8px 20px',
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            cursor: 'pointer',
          }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
