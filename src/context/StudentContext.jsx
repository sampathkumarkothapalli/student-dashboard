import { createContext, useContext, useState } from 'react';
import { mockStudents } from '../data/mockStudents';

const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const addStudent = (student) => {
    setStudents((prev) => [...prev, { ...student, id: Date.now() }]);
  };

  const updateStudent = (id, updates) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        selectedStudent,
        setSelectedStudent,
        addStudent,
        updateStudent,
        deleteStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudentContext() {
  const context = useContext(StudentContext);
  if (!context) throw new Error('useStudentContext must be used within StudentProvider');
  return context;
}

export default StudentContext;
