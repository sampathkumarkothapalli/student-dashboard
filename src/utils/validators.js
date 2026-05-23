export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== '';
};

export const validateGPA = (gpa) => {
  const num = Number(gpa);
  return !isNaN(num) && num >= 0 && num <= 4.0;
};

export const validateAttendance = (attendance) => {
  const num = Number(attendance);
  return !isNaN(num) && num >= 0 && num <= 100;
};

export const validateStudentForm = (data) => {
  const errors = {};
  if (!validateRequired(data.name)) errors.name = 'Name is required';
  if (!validateRequired(data.email)) errors.email = 'Email is required';
  else if (!validateEmail(data.email)) errors.email = 'Invalid email format';
  if (data.gpa !== undefined && !validateGPA(data.gpa)) errors.gpa = 'GPA must be between 0 and 4.0';
  if (data.attendance !== undefined && !validateAttendance(data.attendance))
    errors.attendance = 'Attendance must be between 0 and 100';
  return { isValid: Object.keys(errors).length === 0, errors };
};
