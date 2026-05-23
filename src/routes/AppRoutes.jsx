import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import StudentsPage from '../pages/StudentsPage';
import PredictionsPage from '../pages/PredictionsPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import NotFoundPage from '../pages/NotFoundPage';

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />}
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />}
      />
      <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
      <Route path="/students" element={<ProtectedRoute element={<StudentsPage />} />} />
      <Route path="/predictions" element={<ProtectedRoute element={<PredictionsPage />} />} />
      <Route path="/analytics" element={<ProtectedRoute element={<AnalyticsPage />} />} />
      <Route
        path="*"
        element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}
