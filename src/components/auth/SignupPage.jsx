import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    fullName: '', rollNumber: '', email: '',
    username: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ── validation ── */
  const validate = (f = form) => {
    const e = {};
    if (!f.fullName.trim()) e.fullName = 'Full name is required';
    if (!f.rollNumber.trim()) e.rollNumber = 'Roll number is required';
    if (!f.email.trim()) e.email = 'Email is required';
    else if (!emailRegex.test(f.email)) e.email = 'Invalid email format';
    if (!f.username.trim()) e.username = 'Username is required';
    else if (f.username.length < 3) e.username = 'Min 3 characters';
    if (!f.password) e.password = 'Password is required';
    else if (f.password.length < 6) e.password = 'Minimum 6 characters';
    if (!f.confirmPassword) e.confirmPassword = 'Please confirm password';
    else if (f.password !== f.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleChange = (field, value) => {
    const next = { ...form, [field]: value };
    setForm(next);
    setServerError('');
    if (touched[field]) {
      setErrors((prev) => {
        const v = validate(next);
        const updated = { ...prev };
        if (v[field]) updated[field] = v[field];
        else delete updated[field];
        // re-check confirmPassword when password changes
        if (field === 'password' && touched.confirmPassword) {
          if (v.confirmPassword) updated.confirmPassword = v.confirmPassword;
          else delete updated.confirmPassword;
        }
        return updated;
      });
    }
  };

  const handleBlur = (field) => {
    setTouched((p) => ({ ...p, [field]: true }));
    const v = validate();
    setErrors((prev) => {
      const updated = { ...prev };
      if (v[field]) updated[field] = v[field];
      else delete updated[field];
      return updated;
    });
  };

  const isValid = Object.keys(validate()).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    const allTouched = {};
    Object.keys(form).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const res = await signup(form);
    if (!res.ok) {
      setServerError(res.error);
      setLoading(false);
      return;
    }
    setLoading(false);
    setSuccess(true);
    setTimeout(() => navigate('/login'), 2500);
  };

  /* ── Success view ── */
  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
        <div className="auth-card">
          <div className="auth-success">
            <div className="auth-success-icon">✅</div>
            <h2 className="auth-success-title">Account created successfully</h2>
            <p className="auth-success-text">
              Your account has been registered successfully.<br />
              Redirecting to login…
            </p>
            <div className="spinner" style={{ margin: '0 auto', borderTopColor: 'var(--accent-primary)' }} />
          </div>
        </div>
      </div>
    );
  }

  /* ── Form fields config ── */
  const fields = [
    { key: 'fullName',    label: 'Full Name',        icon: '👤', placeholder: 'John Doe',               type: 'text',  half: true },
    { key: 'rollNumber',  label: 'Roll Number',      icon: '🆔', placeholder: 'CSE2022001',             type: 'text',  half: true },
    { key: 'email',       label: 'Email Address',    icon: '✉️', placeholder: 'you@university.edu',     type: 'email', half: false },
    { key: 'username',    label: 'Username',         icon: '🏷️', placeholder: 'johndoe',                type: 'text',  half: false },
    { key: 'password',    label: 'Password',         icon: '🔒', placeholder: 'Min 6 characters',       type: 'password', half: true, toggle: true, show: showPwd, setShow: setShowPwd },
    { key: 'confirmPassword', label: 'Confirm Password', icon: '🔐', placeholder: 'Re-enter password', type: 'password', half: true, toggle: true, show: showConfirm, setShow: setShowConfirm },
  ];

  /* Group fields into rows for side-by-side layout */
  const renderField = (f) => (
    <div className="auth-form-group" key={f.key}>
      <label className="auth-label">{f.label}</label>
      <div className="auth-input-wrapper">
        <input
          type={f.toggle ? (f.show ? 'text' : 'password') : f.type}
          className={`auth-input${errors[f.key] && touched[f.key] ? ' error' : ''}`}
          placeholder={f.placeholder}
          value={form[f.key]}
          onChange={(e) => handleChange(f.key, e.target.value)}
          onBlur={() => handleBlur(f.key)}
          autoComplete={f.key === 'password' ? 'new-password' : f.key === 'email' ? 'email' : 'off'}
        />
        <span className="auth-input-icon">{f.icon}</span>
        {f.toggle && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => f.setShow(!f.show)}
            tabIndex={-1}
          >
            {f.show ? '🙈' : '👁️'}
          </button>
        )}
      </div>
      {errors[f.key] && touched[f.key] && (
        <span className="auth-field-error">⚠ {errors[f.key]}</span>
      )}
      {!errors[f.key] && touched[f.key] && form[f.key] && (
        <span className="auth-field-success">✓ Looks good</span>
      )}
    </div>
  );

  return (
    <div className="auth-page">
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />

      <div className="auth-card" style={{ maxWidth: 520 }}>
        <div className="auth-header">
          <div className="auth-logo">
            <span className="brand-icon">📊</span>
            <span>EduMetrics</span>
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join the student analytics platform</p>
        </div>

        {serverError && (
          <div className="auth-field-error" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
            ⚠️ {serverError}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Row: Full Name + Roll Number */}
          <div className="auth-form-row">
            {renderField(fields[0])}
            {renderField(fields[1])}
          </div>
          {/* Email */}
          {renderField(fields[2])}
          {/* Username */}
          {renderField(fields[3])}
          {/* Row: Password + Confirm */}
          <div className="auth-form-row">
            {renderField(fields[4])}
            {renderField(fields[5])}
          </div>

          <button type="submit" className="auth-btn" disabled={!isValid || loading}>
            {loading ? <span className="spinner" /> : <>Create Account →</>}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account? </span>
          <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
