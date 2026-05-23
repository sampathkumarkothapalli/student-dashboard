import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../../context/AuthContext';
import LogoutModal from './LogoutModal';

const semesters = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'];

const Navbar = ({ onSemesterClick }) => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [semOpen, setSemOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* highlight the link whose section is in view */
  useEffect(() => {
    const ids = ['home', 'dashboard', 'analytics', 'prediction', 'academic-setup', 'profile'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id === 'academic-setup' ? 'subjects' : e.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Lock body scroll when logout modal is open
  useEffect(() => {
    if (showLogout) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLogout]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
    setSemOpen(false);
  };

  const handleLogout = async () => {
    setShowLogout(false);
    await logout();
    window.location.replace('/login');
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">
          <div className="nav-brand" onClick={() => scrollTo('home')}>
            <span className="brand-icon">📊</span>
            <span>EduMetrics</span>
          </div>

          <div className={`nav-links${mobileOpen ? ' open' : ''}`}>
            {['home', 'dashboard', 'analytics', 'prediction', 'subjects', 'profile'].map((s) => (
              <a
                key={s}
                className={activeSection === s ? 'active' : ''}
                onClick={() => scrollTo(s === 'subjects' ? 'academic-setup' : s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}

            <div className={`semester-dropdown${semOpen ? ' open' : ''}`}>
              <button
                className="dropdown-toggle"
                onClick={() => setSemOpen(!semOpen)}
              >
                Semesters <span className="dropdown-arrow">▾</span>
              </button>
              <div className="dropdown-menu">
                {semesters.map((s) => (
                  <a
                    key={s}
                    onClick={() => {
                      scrollTo('analytics');
                      onSemesterClick?.(s);
                      setSemOpen(false);
                      setMobileOpen(false);
                    }}
                  >
                    Sem {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Logout */}
            <a
              className="nav-logout"
              onClick={() => { setMobileOpen(false); setShowLogout(true); }}
            >
              🚪 Logout
            </a>
          </div>

          <button
            className={`hamburger${mobileOpen ? ' active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* dark overlay behind mobile menu */}
      <div
        className={`mobile-overlay${mobileOpen ? ' active' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Logout confirmation modal rendered via Portal */}
      {showLogout && createPortal(
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />,
        document.body
      )}
    </>
  );
};

export default Navbar;
