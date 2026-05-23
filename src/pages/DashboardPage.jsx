import StatsOverview from '../components/dashboard/StatsOverview';
import RecentActivity from '../components/dashboard/RecentActivity';

export default function DashboardPage() {
  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>
        Dashboard
      </h2>
      <StatsOverview />
      <RecentActivity />
    </div>
  );
}
