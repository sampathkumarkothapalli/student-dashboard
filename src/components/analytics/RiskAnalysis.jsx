import { useAnalytics } from '../../hooks/useAnalytics';
import { getRiskBadgeColor } from '../../utils/formatters';

export default function RiskAnalysis() {
  const { riskDistribution, studentStats } = useAnalytics();

  const total = studentStats.total || 1;

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '20px',
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
        Risk Analysis
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(riskDistribution).map(([risk, count]) => {
          const percentage = Math.round((count / total) * 100);
          return (
            <div key={risk}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', textTransform: 'capitalize' }}>
                  {risk} Risk
                </span>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {count} ({percentage}%)
                </span>
              </div>
              <div style={{
                height: '8px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${percentage}%`,
                  height: '100%',
                  backgroundColor: getRiskBadgeColor(risk),
                  borderRadius: '4px',
                  transition: 'width 0.3s ease',
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
