export default function Card({ title, value, subtitle, color }) {
  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '20px',
      borderLeft: `4px solid ${color || 'var(--accent)'}`,
    }}>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
        {title}
      </p>
      <p style={{ fontSize: '28px', fontWeight: 700, color: color || 'var(--text-primary)' }}>
        {value}
      </p>
      {subtitle && (
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
