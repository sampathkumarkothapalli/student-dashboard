import { useState } from 'react';
import '../../styles/forgotPassword.css';

export default function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('email'); // 'email' | 'code' | 'reset'
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email) {
        setError('Please enter your email address');
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage('Reset code sent to your email');
      setStep('code');
    } catch (err) {
      setError(err.message || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!code) {
        setError('Please enter the reset code');
        setLoading(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setMessage('');
      setStep('reset');
    } catch (err) {
      setError(err.message || 'Invalid reset code');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!newPassword || !confirmPassword) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (newPassword.length < 8) {
        setError('Password must be at least 8 characters');
        setLoading(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage('Password reset successfully!');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-overlay" onClick={onClose}>
      <div
        className="forgot-password-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>&times;</button>

        <h2>Reset Your Password</h2>

        {step === 'email' && (
          <form onSubmit={handleEmailSubmit}>
            <p className="step-description">
              Enter your email address and we'll send you a code to reset your password.
            </p>

            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <div className="form-group">
              <label htmlFor="reset-email">Email Address</label>
              <input
                type="email"
                id="reset-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Code'}
            </button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleCodeSubmit}>
            <p className="step-description">
              Enter the reset code sent to your email.
            </p>

            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <div className="form-group">
              <label htmlFor="reset-code">Reset Code</label>
              <input
                type="text"
                id="reset-code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="ABC123"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>

            <button
              type="button"
              className="back-button"
              onClick={() => {
                setStep('email');
                setCode('');
                setMessage('');
              }}
              disabled={loading}
            >
              Back
            </button>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={handlePasswordReset}>
            <p className="step-description">
              Enter your new password below.
            </p>

            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <div className="form-group">
              <label htmlFor="new-password">New Password</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <button
              type="button"
              className="back-button"
              onClick={() => {
                setStep('email');
                setEmail('');
                setCode('');
                setNewPassword('');
                setConfirmPassword('');
                setMessage('');
              }}
              disabled={loading}
            >
              Start Over
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
