import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

const AUTH_KEY = 'edumetrics_auth';
const TOKEN_KEY = 'jwt_token';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          // If we have a token, we could fetch fresh profile from backend
          // For immediate UI rendering, we load cached user data
          const storedUser = localStorage.getItem(AUTH_KEY);
          if (storedUser) setUser(JSON.parse(storedUser));
          
          // Optionally refresh from backend to get latest data
          try {
            const res = await authService.getProfile();
            if (res && res.success) {
              const freshUser = { 
                ...JSON.parse(storedUser || '{}'), 
                ...res.data,
                fullName: res.data.studentName || res.data.fullName || JSON.parse(storedUser || '{}').fullName
              };
              setUser(freshUser);
              localStorage.setItem(AUTH_KEY, JSON.stringify(freshUser));
            }
          } catch (e) {
            console.warn("Failed to fetch fresh profile, using cached", e);
          }
        }
      } catch (e) {
        console.error("Auth restore error:", e);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = useCallback(async (username, password) => {
    try {
      const res = await authService.login(username, password);
      if (res.success && res.data && res.data.token) {
        const { token, ...userData } = res.data;
        // The backend LoginResponse gives us studentName, rollNumber, etc.
        // We map studentName to fullName for the UI to stay consistent
        const mappedUser = {
          ...userData,
          fullName: userData.studentName || userData.username
        };
        
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(AUTH_KEY, JSON.stringify(mappedUser));
        setUser(mappedUser);
        return { ok: true };
      } else {
        return { ok: false, error: res.message || 'Login failed' };
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return { ok: false, error: error.response.data.message };
      }
      return { ok: false, error: 'Network error or server unreachable' };
    }
  }, []);

  const signup = useCallback(async (userData) => {
    try {
      // mapped to backend expectations
      const backendPayload = {
        username: userData.username,
        password: userData.password,
        studentName: userData.fullName,
        email: userData.email,
        rollNumber: userData.rollNumber,
        department: userData.department || 'Computer Science'
      };
      const res = await authService.signup(backendPayload);
      if (res.success) {
        return { ok: true };
      } else {
        return { ok: false, error: res.message || 'Signup failed' };
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return { ok: false, error: error.response.data.message };
      }
      return { ok: false, error: 'Network error or server unreachable' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.warn("Backend logout warning:", e);
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    try {
      // Prepare backend payload
      const payload = {
        studentName: updates.fullName || user?.fullName,
        rollNumber: updates.rollNumber || user?.rollNumber,
        department: updates.department || user?.department,
        email: updates.email || user?.email,
        semester: updates.semester || user?.semester,
        universityId: updates.universityId || user?.universityId,
        regulationId: updates.regulationId || user?.regulationId,
        branchId: updates.branchId || user?.branchId
      };
      const res = await authService.updateProfile(payload);
      
      let photoRes = null;
      if (updates.photo && updates.photo !== user?.photoUrl) {
        // Mock photo upload, ideally backend handles multipart. We have a simple endpoint
        try {
           photoRes = await authService.uploadPhoto(updates.photo);
        } catch(e) { console.warn("Photo upload warning", e); }
      }
      
      if (res.success) {
        const backendData = res.data;
        setUser((prev) => {
          const updated = {
            ...prev,
            ...backendData,
            fullName: backendData.studentName || updates.fullName,
            photoUrl: photoRes ? photoRes.data : prev?.photoUrl
          };
          localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
          return updated;
        });
        return { ok: true };
      }
      return { ok: false, error: res.message };
    } catch (error) {
      console.error("Update profile error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        return { ok: false, error: error.response.data.message };
      }
      return { ok: false, error: 'Update failed: ' + (error.message || '') };
    }
  }, [user]);

  const forgotPassword = useCallback(async (email) => {
    try {
      const res = await authService.forgotPassword(email);
      if (res.success) {
        return { ok: true, token: res.data };
      }
      return { ok: false, error: res.message || 'Failed to send reset link' };
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return { ok: false, error: error.response.data.message };
      }
      return { ok: false, error: 'Network error or server unreachable' };
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    forgotPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
