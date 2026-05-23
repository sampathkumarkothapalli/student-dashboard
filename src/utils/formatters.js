export const formatGPA = (gpa) => {
  return Number(gpa).toFixed(2);
};

export const formatPercentage = (value) => {
  return `${Math.round(value)}%`;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getGradeColor = (grade) => {
  const colors = {
    A: '#22c55e',
    B: '#3b82f6',
    C: '#f59e0b',
    D: '#ef4444',
    F: '#dc2626',
  };
  return colors[grade] || '#6b7280';
};

export const getRiskBadgeColor = (risk) => {
  const colors = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444',
  };
  return colors[risk] || '#6b7280';
};
