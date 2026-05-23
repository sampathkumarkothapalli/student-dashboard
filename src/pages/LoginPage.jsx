import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import bgImage from '../assets/images/login-bg.jpg';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';
import '../styles/login.css';

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (isLogin) {
      if (!username.trim() || !password.trim()) {
        setError('Please enter your username and password.');
        return;
      }
    } else {
      if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        setError('Please fill in all fields.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        setError('Please enter a valid email address.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      login({
        id: Math.random().toString(36).slice(2, 11),
        username: username.trim(),
        email: isLogin ? username.trim() + '@student.edu' : email.trim(),
        role: 'student',
        rememberMe,
      });

      navigate('/home', { replace: true });
    } catch (err) {
      setError(isLogin ? 'Unable to sign in. Please try again.' : 'Unable to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="background-animation">
        <div className="gradient-blob blob-1" />
        <div className="gradient-blob blob-2" />
        <div className="gradient-blob blob-3" />
      </div>

      <div className="login-card">
        <div className="login-header">
          <h1>{isLogin ? 'Sign in' : 'Create an account'}</h1>
          <p>{isLogin ? 'Enter your credentials to access the student dashboard.' : 'Sign up to start tracking your performance.'}</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                disabled={loading}
              />
            </div>
          )}

          {isLogin && (
            <div className="login-meta">
              <label className="remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <button
                type="button"
                className="forgot-password-link"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot password
              </button>
            </div>
          )}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (isLogin ? 'Signing in...' : 'Signing up...') : (isLogin ? 'Login' : 'Sign up')}
          </button>
        </form>

        <div className="signup-row">
          <span>{isLogin ? 'New here?' : 'Already have an account?'}</span>
          <button 
            type="button" 
            className="signup-link" 
            onClick={toggleMode}
          >
            {isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
      </div>

      {showForgotPassword && (
        <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
}
