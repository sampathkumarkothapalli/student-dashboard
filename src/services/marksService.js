import api from './api';

export const marksService = {
  getAllMarks: async () => {
    const response = await api.get('/marks');
    return response.data;
  },
  
  getMarksBySemester: async (semester) => {
    const response = await api.get(`/marks/semester/${semester}`);
    return response.data;
  }
};

export default marksService;
