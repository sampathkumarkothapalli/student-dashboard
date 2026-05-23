import React from 'react';

const Footer = () => {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand">
              <span className="brand-icon">📊</span>
              <span>EduMetrics</span>
            </div>
            <p className="footer-desc">
              A modern student performance analytics dashboard — track, analyse,
              and predict your academic journey with precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              <a onClick={() => scrollTo('home')}>Home</a>
              <a onClick={() => scrollTo('dashboard')}>Dashboard</a>
              <a onClick={() => scrollTo('analytics')}>Analytics</a>
              <a onClick={() => scrollTo('prediction')}>Prediction</a>
              <a onClick={() => scrollTo('profile')}>Profile</a>
            </div>
          </div>

          {/* Semesters */}
          <div>
            <h4 className="footer-heading">Semesters</h4>
            <div className="footer-links">
              {['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'].map(
                (s) => (
                  <a key={s} onClick={() => scrollTo('analytics')}>
                    Semester {s}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="footer-heading">Resources</h4>
            <div className="footer-links">
              <a href="#">University Portal</a>
              <a href="#">Academic Calendar</a>
              <a href="#">Exam Schedule</a>
              <a href="#">Library</a>
              <a href="#">Help &amp; Support</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} EduMetrics — Student Performance Dashboard.
            All rights reserved.
          </p>
          <div className="footer-socials">
            <a className="footer-social-link" href="#" aria-label="GitHub">🐙</a>
            <a className="footer-social-link" href="#" aria-label="LinkedIn">💼</a>
            <a className="footer-social-link" href="#" aria-label="Twitter">🐦</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
