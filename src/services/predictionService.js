import api from './api';

export const predictionService = {
  getPrediction: async (studentId) => {
    const response = await api.get(`/analytics?studentId=${studentId}`);
    return response.data;
  },

  getAllPredictions: async () => {
    const response = await api.get('/prediction/history');
    return response.data;
  },

  runPrediction: async (studentData) => {
    const response = await api.post('/prediction/calculate', studentData);
    return response.data;
  },
};

export default predictionService;
