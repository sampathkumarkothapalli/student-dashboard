import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  /* ── validation ── */
  const validate = (f = form) => {
    const e = {};
    if (!f.username.trim()) e.username = 'Username is required';
    else if (f.username.length < 3) e.username = 'Minimum 3 characters';
    if (!f.password) e.password = 'Password is required';
    else if (f.password.length < 6) e.password = 'Minimum 6 characters';
    return e;
  };

  const handleChange = (field, value) => {
    const next = { ...form, [field]: value };
    setForm(next);
    setServerError('');
    if (touched[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        const v = validate(next);
        if (v[field]) updated[field] = v[field];
        else delete updated[field];
        return updated;
      });
    }
  };

  const handleBlur = (field) => {
    setTouched((p) => ({ ...p, [field]: true }));
    setErrors((prev) => {
      const v = validate();
      return v[field] ? { ...prev, [field]: v[field] } : (() => { const u = { ...prev }; delete u[field]; return u; })();
    });
  };

  const isValid = Object.keys(validate()).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setTouched({ username: true, password: true });
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);
    // simulate network delay
    await new Promise((r) => setTimeout(r, 900));
    const res = await login(form.username, form.password);
    if (!res.ok) {
      setServerError(res.error);
      setLoading(false);
      return;
    }
    // success → redirect
    navigate('/', { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />

      <div className="auth-container">
        <div className="auth-image-side">
          <div className="auth-image-content">
            <img src="/assets/login_illustration.png" alt="Student Dashboard" className="auth-floating-img" />
            <h2 className="auth-image-title">Welcome to EduMetrics</h2>
            <p className="auth-image-subtitle">Predict, Analyze, and Improve your Academic Performance</p>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <span className="brand-icon">📊</span>
              <span>EduMetrics</span>
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to access your performance dashboard</p>
          </div>

          {serverError && (
            <div className="auth-field-error" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
              ⚠️ {serverError}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {/* Username / Email */}
            <div className="auth-form-group">
              <label className="auth-label">Email or Username</label>
              <div className="auth-input-wrapper">
                <input
                  type="text"
                  className={`auth-input${errors.username && touched.username ? ' error' : ''}`}
                  placeholder="you@university.edu or username"
                  value={form.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  onBlur={() => handleBlur('username')}
                  autoComplete="username"
                />
                <span className="auth-input-icon">👤</span>
              </div>
              {errors.username && touched.username && (
                <span className="auth-field-error">⚠ {errors.username}</span>
              )}
            </div>

            {/* Password */}
            <div className="auth-form-group">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrapper">
                <input
                  type={showPwd ? 'text' : 'password'}
                  className={`auth-input${errors.password && touched.password ? ' error' : ''}`}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  autoComplete="current-password"
                />
                <span className="auth-input-icon">🔒</span>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPwd(!showPwd)}
                  tabIndex={-1}
                >
                  {showPwd ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && touched.password && (
                <span className="auth-field-error">⚠ {errors.password}</span>
              )}
            </div>

            {/* Forgot Password */}
            <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
              <Link to="/forgot-password" className="auth-link" style={{ fontSize: '0.82rem' }}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="auth-btn" disabled={!isValid || loading}>
              {loading ? <span className="spinner" /> : <>Sign In →</>}
            </button>
          </form>

          <div className="auth-footer">
            <span>Don't have an account? </span>
            <Link to="/signup">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
