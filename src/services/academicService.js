import api from './api';

export const academicService = {
  getSubjects: async () => {
    const res = await api.get('/academic/subjects');
    return res.data;
  },
  
  getSubjectsBySemester: async (semester) => {
    const res = await api.get(`/academic/subjects/${semester}`);
    return res.data;
  },
  
  addSubject: async (subjectData) => {
    const res = await api.post('/academic/subject', subjectData);
    return res.data;
  },
  
  deleteSubject: async (id) => {
    const res = await api.delete(`/academic/subject/${id}`);
    return res.data;
  },
  
  getMarks: async () => {
    const res = await api.get('/academic/marks');
    return res.data;
  },
  
  addOrUpdateMarks: async (marksData) => {
    const res = await api.post('/academic/marks', marksData);
    return res.data;
  },
  
  getAttendance: async () => {
    const res = await api.get('/academic/attendance');
    return res.data;
  },
  
  addOrUpdateAttendance: async (attendanceData) => {
    const res = await api.post('/academic/attendance', attendanceData);
    return res.data;
  }
};

export default academicService;
