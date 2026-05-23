import Card from '../common/Card';
import { useStudents } from '../../hooks/useStudents';
import { usePrediction } from '../../hooks/usePrediction';
import { formatGPA, formatPercentage } from '../../utils/formatters';

export default function StatsOverview() {
  const { stats } = useStudents();
  const { summaryStats } = usePrediction();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '24px',
    }}>
      <Card title="Total Students" value={stats.total} color="#4f46e5" />
      <Card title="Average GPA" value={formatGPA(stats.avgGPA)} color="#3b82f6" />
      <Card title="At-Risk Students" value={stats.highRisk} subtitle="Need attention" color="#ef4444" />
      <Card title="Avg Confidence" value={formatPercentage(summaryStats.avgConfidence)} color="#22c55e" />
    </div>
  );
}
