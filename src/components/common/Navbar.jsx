import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-color)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px' }}>🎓</span>
        <span style={{ fontWeight: 700, fontSize: '18px', color: 'var(--accent)' }}>
          Student Dashboard
        </span>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {[
          { to: '/', label: 'Home' },
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/students', label: 'Students' },
          { to: '/predictions', label: 'Predictions' },
          { to: '/analytics', label: 'Analytics' },
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
            })}
          >
            {link.label}
          </NavLink>
        ))}

        <button
          onClick={toggleTheme}
          style={{
            padding: '6px 12px',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background-color 0.3s, color 0.3s',
          }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button
          onClick={handleLogout}
          style={{
            padding: '6px 12px',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background-color 0.3s, color 0.3s',
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
