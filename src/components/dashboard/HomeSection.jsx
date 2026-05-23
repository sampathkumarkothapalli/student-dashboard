import React from 'react';
import homeImg from '../../assets/home_student_img.jpg';

const HomeSection = () => {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="section home-section">
      <div className="home-inner">
        {/* ── Left: Quote ── */}
        <div className="home-left scroll-animate from-left">
          <p className="home-tagline">Student Performance Dashboard</p>

          <h1 className="home-quote">
            <span className="quote-glow" />
            Start where you are.{' '}
            <span className="highlight">Use what you have.</span>{' '}
            Do what you can.
          </h1>

          <p className="home-quote-sub">
            Track your academic journey, analyse semester-wise performance, and
            predict your future grades — all in one elegant dashboard.
          </p>

          <button className="btn-get-started" onClick={() => scrollTo('dashboard')}>
            Get Started
            <span className="btn-arrow">→</span>
          </button>
        </div>

        {/* ── Right: Main image ── */}
        <div className="home-right scroll-animate from-right delay-2">
          <div className="pen-image-wrapper">
            <img src={homeImg} alt="Student studying illustration" style={{ borderRadius: '12px', width: '100%', maxWidth: '350px', aspectRatio: '2/3', objectFit: 'cover' }} />

            {/* decorative orbits */}
            <div className="pen-orbit pen-orbit-1" />
            <div className="pen-orbit pen-orbit-2" />

            {/* floating dots */}
            <span className="pen-dot pen-dot-1" />
            <span className="pen-dot pen-dot-2" />
            <span className="pen-dot pen-dot-3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
