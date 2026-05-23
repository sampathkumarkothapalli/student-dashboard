import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
        🎓 Student Performance Dashboard
      </h1>
      <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>
        Monitor student performance, predict outcomes, and identify at-risk students with data-driven insights.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        textAlign: 'left',

      }}>
        {[
          { to: '/dashboard', icon: '📊', title: 'Dashboard', desc: 'View overall statistics and recent activity' },
          { to: '/students', icon: '👥', title: 'Students', desc: 'Manage student records and profiles' },
          { to: '/predictions', icon: '🔮', title: 'Predictions', desc: 'AI-powered performance predictions' },
          { to: '/analytics', icon: '📈', title: 'Analytics', desc: 'Grade and risk distribution analysis' },
        ].map((item) => (
          <Link key={item.to} to={item.to} style={{
            display: 'block',
            padding: '20px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            textDecoration: 'none',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
              {item.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
