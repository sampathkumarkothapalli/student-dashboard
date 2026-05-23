export default function Footer() {
  return (
    <footer style={{
      padding: '16px 24px',
      textAlign: 'center',
      fontSize: '13px',
      color: 'var(--text-secondary)',
      borderTop: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-card)',
    }}>
      © {new Date().getFullYear()} Student Performance Dashboard. All rights reserved.
    </footer>
  );
}
