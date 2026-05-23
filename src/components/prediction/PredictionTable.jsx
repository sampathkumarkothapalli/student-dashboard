import { usePrediction } from '../../hooks/usePrediction';
import { useStudents } from '../../hooks/useStudents';

export default function PredictionTable() {
  const { predictions } = usePrediction();
  const { allStudents } = useStudents();

  const getStudentName = (studentId) => {
    const student = allStudents.find((s) => s.id === studentId);
    return student ? student.name : 'Unknown';
  };

  const trendIcon = (trend) => {
    if (trend === 'improving') return '↑';
    if (trend === 'declining') return '↓';
    return '→';
  };

  const trendColor = (trend) => {
    if (trend === 'improving') return '#22c55e';
    if (trend === 'declining') return '#ef4444';
    return '#6b7280';
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <th style={{ textAlign: 'left', padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Student</th>
            <th style={{ textAlign: 'center', padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Predicted Grade</th>
            <th style={{ textAlign: 'center', padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Confidence</th>
            <th style={{ textAlign: 'center', padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Trend</th>
            <th style={{ textAlign: 'left', padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Key Factors</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((p) => (
            <tr key={p.studentId} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '12px', color: 'var(--text-primary)', fontWeight: 500 }}>
                {getStudentName(p.studentId)}
              </td>
              <td style={{ padding: '12px', textAlign: 'center', fontWeight: 600, color: 'var(--text-primary)' }}>
                {p.predictedGrade}
              </td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <div style={{
                    width: '60px',
                    height: '6px',
                    backgroundColor: 'var(--border-color)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${p.confidence}%`,
                      height: '100%',
                      backgroundColor: p.confidence >= 80 ? '#22c55e' : p.confidence >= 60 ? '#f59e0b' : '#ef4444',
                      borderRadius: '3px',
                    }} />
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{p.confidence}%</span>
                </div>
              </td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                <span style={{ color: trendColor(p.trend), fontWeight: 600 }}>
                  {trendIcon(p.trend)} {p.trend}
                </span>
              </td>
              <td style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                {p.factors.join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
