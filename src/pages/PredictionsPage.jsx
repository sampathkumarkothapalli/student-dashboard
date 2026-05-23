import PredictionTable from '../components/prediction/PredictionTable';
import PredictionForm from '../components/prediction/PredictionForm';

export default function PredictionsPage() {
  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>
        Performance Predictions
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <PredictionForm />
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '20px',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: 'var(--text-primary)' }}>
            How it works
          </h3>
          <ul style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: '16px' }}>
            <li>Enter student metrics in the form</li>
            <li>Our model analyzes attendance, GPA, and study habits</li>
            <li>A predicted grade and confidence score are generated</li>
            <li>Use results to provide early intervention</li>
          </ul>
        </div>
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
        All Predictions
      </h3>
      <PredictionTable />
    </div>
  );
}
