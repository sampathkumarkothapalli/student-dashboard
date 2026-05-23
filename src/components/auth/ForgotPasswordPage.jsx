import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const emailError = !email.trim()
    ? 'Email is required'
    : !emailRegex.test(email)
    ? 'Invalid email format'
    : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (emailError) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const res = await forgotPassword(email);
    setLoading(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }
    setSent(res.token); // Store token instead of just true
  };

  return (
    <div className="auth-page">
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="brand-icon">📊</span>
            <span>EduMetrics</span>
          </div>

          {!sent ? (
            <>
              <h1 className="auth-title">Forgot Password?</h1>
              <p className="auth-subtitle">
                Enter your registered email and we'll send you a reset link
              </p>
            </>
          ) : (
            <div className="auth-success">
              <div className="auth-success-icon">📧</div>
              <h2 className="auth-success-title">Check Your Inbox</h2>
              <p className="auth-success-text">
                Password reset link sent to<br />
                <strong style={{ color: 'var(--accent-primary)' }}>{email}</strong>
              </p>

              <div style={{ margin: '1.5rem 0', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  <em>(Developer Note: Since email sending is mocked, here is your reset link)</em>
                </p>
                <Link to={`/reset-password?token=${sent}`} style={{ color: 'var(--accent-primary)', wordBreak: 'break-all' }}>
                  Click here to reset your password
                </Link>
              </div>

              <Link to="/login" className="auth-btn" style={{ display: 'inline-flex', textDecoration: 'none' }}>
                ← Back to Login
              </Link>
            </div>
          )}
        </div>

        {!sent && (
          <>
            {error && (
              <div className="auth-field-error" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                ⚠️ {error}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="auth-form-group">
                <label className="auth-label">Email Address</label>
                <div className="auth-input-wrapper">
                  <input
                    type="email"
                    className={`auth-input${emailError && touched ? ' error' : ''}`}
                    placeholder="you@university.edu"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    onBlur={() => setTouched(true)}
                    autoComplete="email"
                  />
                  <span className="auth-input-icon">✉️</span>
                </div>
                {emailError && touched && (
                  <span className="auth-field-error">⚠ {emailError}</span>
                )}
              </div>

              <button
                type="submit"
                className="auth-btn"
                disabled={!!(emailError && touched) || loading || !email.trim()}
              >
                {loading ? <span className="spinner" /> : <>Send Reset Link →</>}
              </button>
            </form>

            <div className="auth-footer">
              <span>Remember your password? </span>
              <Link to="/login">Sign In</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
