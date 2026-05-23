import { useState, useMemo } from 'react';
import { useStudentContext } from '../context/StudentContext';

export function useStudents() {
  const { students, addStudent, updateStudent, deleteStudent } = useStudentContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = student.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRisk =
        filterRisk === 'all' || student.riskLevel === filterRisk;
      return matchesSearch && matchesRisk;
    });
  }, [students, searchTerm, filterRisk]);

  const stats = useMemo(() => {
    const total = students.length;
    const avgGPA =
      total > 0
        ? students.reduce((sum, s) => sum + s.gpa, 0) / total
        : 0;
    const highRisk = students.filter((s) => s.riskLevel === 'high').length;
    const lowRisk = students.filter((s) => s.riskLevel === 'low').length;
    return { total, avgGPA, highRisk, lowRisk };
  }, [students]);

  return {
    students: filteredStudents,
    allStudents: students,
    stats,
    searchTerm,
    setSearchTerm,
    filterRisk,
    setFilterRisk,
    addStudent,
    updateStudent,
    deleteStudent,
  };
}

export default useStudents;
