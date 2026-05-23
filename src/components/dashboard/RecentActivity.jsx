import { useStudents } from '../../hooks/useStudents';
import { usePrediction } from '../../hooks/usePrediction';
import { getRiskBadgeColor } from '../../utils/formatters';

export default function RecentActivity() {
  const { allStudents } = useStudents();
  const { getPrediction } = usePrediction();

  const recentStudents = allStudents.slice(0, 5);

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '20px',
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
        Recent Students
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
            <th style={{ textAlign: 'left', padding: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Name</th>
            <th style={{ textAlign: 'left', padding: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>GPA</th>
            <th style={{ textAlign: 'left', padding: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Risk</th>
            <th style={{ textAlign: 'left', padding: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Prediction</th>
          </tr>
        </thead>
        <tbody>
          {recentStudents.map((student) => {
            const prediction = getPrediction(student.id);
            return (
              <tr key={student.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px', color: 'var(--text-primary)' }}>{student.name}</td>
                <td style={{ padding: '8px', color: 'var(--text-primary)' }}>{student.gpa}</td>
                <td style={{ padding: '8px' }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#fff',
                    backgroundColor: getRiskBadgeColor(student.riskLevel),
                  }}>
                    {student.riskLevel}
                  </span>
                </td>
                <td style={{ padding: '8px', color: 'var(--text-primary)' }}>
                  {prediction ? prediction.predictedGrade : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
