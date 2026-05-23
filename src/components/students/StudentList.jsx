import { useStudents } from '../../hooks/useStudents';
import { getRiskBadgeColor, getGradeColor } from '../../utils/formatters';

export default function StudentList() {
  const { students, searchTerm, setSearchTerm, filterRisk, setFilterRisk } = useStudents();

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            fontSize: '14px',
            flex: 1,
            minWidth: '200px',
          }}
        />
        <select
          value={filterRisk}
          onChange={(e) => setFilterRisk(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            fontSize: '14px',
          }}
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
        </select>
      </div>

      {/* Table */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <th style={{ textAlign: 'left', padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Name</th>
              <th style={{ textAlign: 'left', padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Email</th>
              <th style={{ textAlign: 'center', padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Grade</th>
              <th style={{ textAlign: 'center', padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>GPA</th>
              <th style={{ textAlign: 'center', padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Attendance</th>
              <th style={{ textAlign: 'center', padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Risk</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px', color: 'var(--text-primary)', fontWeight: 500 }}>{s.name}</td>
                <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{s.email}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <span style={{ fontWeight: 600, color: getGradeColor(s.grade) }}>{s.grade}</span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center', color: 'var(--text-primary)' }}>{s.gpa}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: 'var(--text-primary)' }}>{s.attendance}%</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <span style={{
                    padding: '2px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#fff',
                    backgroundColor: getRiskBadgeColor(s.riskLevel),
                  }}>
                    {s.riskLevel}
                  </span>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
