import { getGradeColor, getRiskBadgeColor, formatGPA } from '../../utils/formatters';

export default function StudentCard({ student }) {
  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '16px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>{student.name}</h4>
        <span style={{
          padding: '2px 10px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 500,
          color: '#fff',
          backgroundColor: getRiskBadgeColor(student.riskLevel),
        }}>
          {student.riskLevel}
        </span>
      </div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{student.email}</p>
      <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
        <span>Grade: <strong style={{ color: getGradeColor(student.grade) }}>{student.grade}</strong></span>
        <span>GPA: <strong>{formatGPA(student.gpa)}</strong></span>
        <span>Attendance: <strong>{student.attendance}%</strong></span>
      </div>
    </div>
  );
}
