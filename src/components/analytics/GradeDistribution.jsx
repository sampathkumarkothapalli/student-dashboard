import { useAnalytics } from '../../hooks/useAnalytics';
import { getGradeColor, getRiskBadgeColor } from '../../utils/formatters';

export default function GradeDistribution() {
  const { gradeDistribution } = useAnalytics();

  const maxCount = Math.max(...Object.values(gradeDistribution), 1);

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '20px',
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
        Grade Distribution
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Object.entries(gradeDistribution).map(([grade, count]) => (
          <div key={grade} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '24px', fontWeight: 600, color: getGradeColor(grade) }}>{grade}</span>
            <div style={{
              flex: 1,
              height: '20px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${(count / maxCount) * 100}%`,
                height: '100%',
                backgroundColor: getGradeColor(grade),
                borderRadius: '4px',
                transition: 'width 0.3s ease',
              }} />
            </div>
            <span style={{ width: '24px', fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'right' }}>
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
