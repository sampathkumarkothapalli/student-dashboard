// ─── Semester-wise academic data ───
export const semesterData = [
  {
    id: '1-1', name: 'Semester 1-1', year: 1, sem: 1, sgpa: 7.8,
    subjects: [
      { name: 'Mathematics I', marks: 78, grade: 'B+', credits: 4 },
      { name: 'Physics', marks: 82, grade: 'A', credits: 4 },
      { name: 'Chemistry', marks: 75, grade: 'B+', credits: 3 },
      { name: 'Programming in C', marks: 85, grade: 'A', credits: 4 },
      { name: 'English', marks: 72, grade: 'B', credits: 2 },
      { name: 'Engineering Drawing', marks: 68, grade: 'B', credits: 3 },
    ],
  },
  {
    id: '1-2', name: 'Semester 1-2', year: 1, sem: 2, sgpa: 8.2,
    subjects: [
      { name: 'Mathematics II', marks: 82, grade: 'A', credits: 4 },
      { name: 'Data Structures', marks: 88, grade: 'A+', credits: 4 },
      { name: 'Digital Electronics', marks: 79, grade: 'B+', credits: 3 },
      { name: 'OOP with Java', marks: 84, grade: 'A', credits: 4 },
      { name: 'Environmental Science', marks: 76, grade: 'B+', credits: 2 },
      { name: 'Communication Skills', marks: 80, grade: 'A', credits: 3 },
    ],
  },
  {
    id: '2-1', name: 'Semester 2-1', year: 2, sem: 1, sgpa: 8.0,
    subjects: [
      { name: 'Mathematics III', marks: 76, grade: 'B+', credits: 4 },
      { name: 'DBMS', marks: 85, grade: 'A', credits: 4 },
      { name: 'Computer Networks', marks: 80, grade: 'A', credits: 3 },
      { name: 'Operating Systems', marks: 78, grade: 'B+', credits: 4 },
      { name: 'Software Engineering', marks: 82, grade: 'A', credits: 3 },
      { name: 'Discrete Mathematics', marks: 74, grade: 'B', credits: 3 },
    ],
  },
  {
    id: '2-2', name: 'Semester 2-2', year: 2, sem: 2, sgpa: 8.5,
    subjects: [
      { name: 'Web Technologies', marks: 90, grade: 'A+', credits: 4 },
      { name: 'Design Patterns', marks: 85, grade: 'A', credits: 3 },
      { name: 'Computer Architecture', marks: 78, grade: 'B+', credits: 4 },
      { name: 'Theory of Computation', marks: 82, grade: 'A', credits: 3 },
      { name: 'Probability & Statistics', marks: 86, grade: 'A', credits: 4 },
      { name: 'Professional Ethics', marks: 88, grade: 'A+', credits: 2 },
    ],
  },
  {
    id: '3-1', name: 'Semester 3-1', year: 3, sem: 1, sgpa: 8.9,
    subjects: [
      { name: 'Machine Learning', marks: 92, grade: 'A+', credits: 4 },
      { name: 'Compiler Design', marks: 84, grade: 'A', credits: 4 },
      { name: 'Information Security', marks: 88, grade: 'A+', credits: 3 },
      { name: 'Cloud Computing', marks: 90, grade: 'A+', credits: 3 },
      { name: 'Mobile App Dev', marks: 86, grade: 'A', credits: 4 },
      { name: 'Data Mining', marks: 85, grade: 'A', credits: 3 },
    ],
  },
  {
    id: '3-2', name: 'Semester 3-2', year: 3, sem: 2, sgpa: 9.1,
    subjects: [
      { name: 'Deep Learning', marks: 94, grade: 'A+', credits: 4 },
      { name: 'Big Data Analytics', marks: 90, grade: 'A+', credits: 4 },
      { name: 'NLP', marks: 88, grade: 'A+', credits: 3 },
      { name: 'DevOps', marks: 92, grade: 'A+', credits: 3 },
      { name: 'IoT', marks: 86, grade: 'A', credits: 3 },
      { name: 'Project Management', marks: 89, grade: 'A+', credits: 3 },
    ],
  },
  {
    id: '4-1', name: 'Semester 4-1', year: 4, sem: 1, sgpa: 9.3,
    subjects: [
      { name: 'Blockchain Technology', marks: 95, grade: 'A+', credits: 4 },
      { name: 'Quantum Computing', marks: 88, grade: 'A+', credits: 3 },
      { name: 'Advanced Algorithms', marks: 92, grade: 'A+', credits: 4 },
      { name: 'Distributed Systems', marks: 94, grade: 'A+', credits: 4 },
      { name: 'Elective I', marks: 90, grade: 'A+', credits: 3 },
      { name: 'Seminar', marks: 93, grade: 'A+', credits: 2 },
    ],
  },
  {
    id: '4-2', name: 'Semester 4-2', year: 4, sem: 2, sgpa: 9.5,
    subjects: [
      { name: 'Major Project', marks: 96, grade: 'A+', credits: 6 },
      { name: 'Elective II', marks: 94, grade: 'A+', credits: 3 },
      { name: 'Elective III', marks: 92, grade: 'A+', credits: 3 },
      { name: 'Industrial Training', marks: 95, grade: 'A+', credits: 4 },
      { name: 'Comprehensive Viva', marks: 93, grade: 'A+', credits: 4 },
    ],
  },
];

// ─── Derived data helpers ───
export const getSemestersWithCGPA = () => {
  let totalSGPA = 0;
  return semesterData.map((sem, i) => {
    totalSGPA += sem.sgpa;
    const cgpa = +(totalSGPA / (i + 1)).toFixed(2);
    const percentage = +((cgpa * 10) - 7.5).toFixed(2);
    return { ...sem, cgpa, percentage };
  });
};

export const enrichedSemesters = getSemestersWithCGPA();

// ─── Student profile ───
export const studentProfile = {
  name: 'Sampath Kumar',
  rollNumber: 'CSE2022001',
  department: 'Computer Science & Engineering',
  currentSemester: '4-2',
  email: 'sampath.kumar@university.edu',
  joinYear: 2022,
  cgpa: enrichedSemesters[enrichedSemesters.length - 1].cgpa,
  sgpa: enrichedSemesters[enrichedSemesters.length - 1].sgpa,
  initials: 'SK',
};

// ─── Dashboard stats ───
export const dashboardStats = [
  { label: 'Current CGPA', value: studentProfile.cgpa, icon: '🎯', colorClass: 'blue',  change: '+0.12', up: true },
  { label: 'Latest SGPA',  value: studentProfile.sgpa, icon: '📈', colorClass: 'teal',  change: '+0.2',  up: true },
  { label: 'Total Subjects', value: 47,                 icon: '📚', colorClass: 'amber', change: '5 this sem', up: true },
  { label: 'Avg Attendance', value: '94%',               icon: '✅', colorClass: 'coral', change: '+2%',  up: true },
];

// ─── Chart colour palette ───
export const chartColors = {
  primary:   'rgba(102, 126, 234, 1)',
  primaryBg: 'rgba(102, 126, 234, 0.15)',
  teal:      'rgba(0, 212, 170, 1)',
  tealBg:    'rgba(0, 212, 170, 0.15)',
  amber:     'rgba(255, 167, 38, 1)',
  amberBg:   'rgba(255, 167, 38, 0.15)',
  coral:     'rgba(255, 107, 107, 1)',
  coralBg:   'rgba(255, 107, 107, 0.15)',
  pink:      'rgba(240, 98, 146, 1)',
  pinkBg:    'rgba(240, 98, 146, 0.15)',
  blue:      'rgba(66, 165, 245, 1)',
  blueBg:    'rgba(66, 165, 245, 0.15)',
  lime:      'rgba(174, 213, 129, 1)',
  limeBg:    'rgba(174, 213, 129, 0.15)',
  gridColor: 'rgba(255, 255, 255, 0.05)',
  tickColor: 'rgba(255, 255, 255, 0.4)',
};
