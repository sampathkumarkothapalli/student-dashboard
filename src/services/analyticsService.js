import api from './api';

export const analyticsService = {
  getAnalytics: async () => {
    const response = await api.get('/analytics');
    return response.data;
  },
  
  getSemesterAnalytics: async (semesterId) => {
    const response = await api.get(`/analytics/semester/${semesterId}`);
    return response.data;
  },
  
  getChartsData: async () => {
    const response = await api.get('/analytics/charts');
    return response.data;
  }
};

export default analyticsService;
