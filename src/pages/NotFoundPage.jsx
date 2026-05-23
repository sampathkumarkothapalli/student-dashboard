import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{
      padding: '60px 24px',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '48px', fontWeight: 700, color: 'var(--text-secondary)' }}>404</h1>
      <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Page not found
      </p>
      <Link to="/" style={{
        padding: '8px 20px',
        backgroundColor: 'var(--accent)',
        color: '#fff',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 500,
      }}>
        Go Home
      </Link>
    </div>
  );
}
