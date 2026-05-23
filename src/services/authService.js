import api from './api';

export const authService = {
  login: async (username, password) => {
    // Spring Boot endpoint uses 'username' and 'password'
    const response = await api.post('/auth/login', { username, password });
    return response.data; // Expected: { success: true, message: "...", data: { token, username, studentName, ... } }
  },

  signup: async (userData) => {
    // userData contains username, password, studentName, rollNumber, email, department
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  logout: async () => {
    // Optional backend logout if token blocklisting is implemented
    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.warn("Backend logout failed or not required", e);
    }
  },

  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data; // Expected: { success: true, data: { studentName, rollNumber, ... } }
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/profile/update', profileData);
    return response.data;
  },

  uploadPhoto: async (photoUrl) => {
    const response = await api.post(`/profile/upload?photoUrl=${encodeURIComponent(photoUrl)}`);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post(`/auth/forgot-password?email=${encodeURIComponent(email)}`);
    return response.data; // { success: true, message: "...", data: "token..." }
  },

  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', { token, newPassword });
    return response.data;
  }
};

export default authService;
