import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Invalid or missing reset token.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await authService.resetPassword(token, newPassword);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.message || 'Failed to reset password');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Network error. Failed to reset password.');
      }
    } finally {
      setLoading(false);
    }
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

          {!success ? (
            <>
              <h1 className="auth-title">Set New Password</h1>
              <p className="auth-subtitle">
                Enter your new password below.
              </p>
            </>
          ) : (
            <div className="auth-success">
              <div className="auth-success-icon">✅</div>
              <h2 className="auth-success-title">Password Reset</h2>
              <p className="auth-success-text">
                Your password has been successfully updated.
              </p>
              <Link to="/login" className="auth-btn" style={{ display: 'inline-flex', textDecoration: 'none' }}>
                Proceed to Login →
              </Link>
            </div>
          )}
        </div>

        {!success && (
          <>
            {error && (
              <div className="auth-field-error" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                ⚠️ {error}
              </div>
            )}
            {!token && (
              <div className="auth-field-error" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                ⚠️ No reset token provided in the URL.
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="auth-form-group">
                <label className="auth-label">New Password</label>
                <div className="auth-input-wrapper">
                  <input
                    type="password"
                    className="auth-input"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span className="auth-input-icon">🔒</span>
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-label">Confirm Password</label>
                <div className="auth-input-wrapper">
                  <input
                    type="password"
                    className="auth-input"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span className="auth-input-icon">🔒</span>
                </div>
              </div>

              <button
                type="submit"
                className="auth-btn"
                disabled={loading || !newPassword || !confirmPassword || !token}
              >
                {loading ? <span className="spinner" /> : <>Reset Password</>}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
