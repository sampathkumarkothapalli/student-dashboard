import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import useScrollAnimation from './hooks/useScrollAnimation';

// Auth pages
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import ResetPasswordPage from './components/auth/ResetPasswordPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Dashboard sections
import Navbar from './components/dashboard/Navbar';
import HomeSection from './components/dashboard/HomeSection';
import DashboardSection from './components/dashboard/DashboardSection';
import AnalyticsSection from './components/dashboard/AnalyticsSection';
import PredictionSection from './components/dashboard/PredictionSection';
import ProfileSection from './components/dashboard/ProfileSection';
import AcademicSetupSection from './components/dashboard/AcademicSetupSection';
import Footer from './components/dashboard/Footer';
import academicService from './services/academicService';
import analyticsService from './services/analyticsService';

/* ── Main dashboard (protected) ── */
const Dashboard = () => {
  const [activeSemester, setActiveSemester] = useState('1-1');
  const [hasData, setHasData] = useState(false);
  const [loadingDataCheck, setLoadingDataCheck] = useState(true);
  const [globalMarks, setGlobalMarks] = useState([]);
  const [globalSubjects, setGlobalSubjects] = useState([]);
  const [globalAnalytics, setGlobalAnalytics] = useState([]);
  const [globalAttendance, setGlobalAttendance] = useState([]);

  // Attach scroll-triggered animations
  useScrollAnimation();

  useEffect(() => {
    checkData();
  }, []);

  const checkData = async () => {
    try {
      const [marksRes, attRes, analyticsRes, subjectsRes] = await Promise.all([
        academicService.getMarks().catch(() => []),
        academicService.getAttendance().catch(() => []),
        analyticsService.getAnalytics().catch(() => []),
        academicService.getSubjects().catch(() => [])
      ]);
      
      const m = Array.isArray(marksRes) ? marksRes : [];
      const a = Array.isArray(attRes) ? attRes : [];
      const an = Array.isArray(analyticsRes) ? analyticsRes : [];
      const subjs = Array.isArray(subjectsRes) ? subjectsRes : [];

      setGlobalMarks(m);
      setGlobalAttendance(a);
      setGlobalAnalytics(an);
      setGlobalSubjects(subjs);

      if (m.length > 0) {
        setHasData(true);
      } else {
        setHasData(false);
      }
    } catch (e) {
      console.error(e);
      setHasData(false);
    } finally {
      setLoadingDataCheck(false);
    }
  };

  if (loadingDataCheck) {
     return <div className="page-loader"><div className="spinner" /><span className="page-loader-text">Checking academic data…</span></div>;
  }

  return (
    <div className="page-enter">
      <Navbar onSemesterClick={(sem) => setActiveSemester(sem)} />
      <HomeSection />
      
      <DashboardSection marks={globalMarks} analytics={globalAnalytics} attendance={globalAttendance} />
      <AnalyticsSection
        marks={globalMarks}
        analytics={globalAnalytics}
        attendance={globalAttendance}
        activeSemester={activeSemester}
        setActiveSemester={setActiveSemester}
      />
      <PredictionSection />

      <AcademicSetupSection 
        subjects={globalSubjects} 
        marks={globalMarks} 
        onDataAdded={checkData} 
      />
      <ProfileSection />
      <Footer />
    </div>
  );
};

/* ── App root ── */
const App = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-loader">
        <div className="spinner" />
        <span className="page-loader-text">Loading EduMetrics…</span>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/" replace /> : <SignupPage />}
      />
      <Route
        path="/forgot-password"
        element={isAuthenticated ? <Navigate to="/" replace /> : <ForgotPasswordPage />}
      />
      <Route
        path="/reset-password"
        element={isAuthenticated ? <Navigate to="/" replace /> : <ResetPasswordPage />}
      />

      {/* Protected dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
