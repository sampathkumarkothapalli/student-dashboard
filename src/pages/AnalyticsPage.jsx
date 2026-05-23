import GradeDistribution from '../components/analytics/GradeDistribution';
import RiskAnalysis from '../components/analytics/RiskAnalysis';
import Card from '../components/common/Card';
import { useAnalytics } from '../hooks/useAnalytics';
import { formatGPA, formatPercentage } from '../utils/formatters';

export default function AnalyticsPage() {
  const { studentStats, predictionStats } = useAnalytics();

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>
        Analytics
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <Card title="Total Students" value={studentStats.total} color="#4f46e5" />
        <Card title="Avg GPA" value={formatGPA(studentStats.avgGPA)} color="#3b82f6" />
        <Card title="Improving" value={predictionStats.improving} color="#22c55e" />
        <Card title="Declining" value={predictionStats.declining} color="#ef4444" />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
      }}>
        <GradeDistribution />
        <RiskAnalysis />
      </div>
    </div>
  );
}
