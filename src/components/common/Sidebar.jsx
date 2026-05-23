export default function Sidebar() {
  return (
    <aside style={{
      width: '200px',
      minHeight: 'calc(100vh - 56px)',
      backgroundColor: 'var(--bg-card)',
      borderRight: '1px solid var(--border-color)',
      padding: '16px',
    }}>
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Quick Links
      </p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {['Overview', 'At-Risk Students', 'Top Performers', 'Reports'].map((item) => (
          <li key={item} style={{
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
          }}>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
