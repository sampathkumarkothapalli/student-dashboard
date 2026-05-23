import { useState } from 'react';
import StudentList from '../components/students/StudentList';
import StudentForm from '../components/students/StudentForm';

export default function StudentsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Students
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '14px',
          }}
        >
          {showForm ? 'Close Form' : '+ Add Student'}
        </button>
      </div>

      {showForm && (
        <div style={{ marginBottom: '20px' }}>
          <StudentForm onClose={() => setShowForm(false)} />
        </div>
      )}

      <StudentList />
    </div>
  );
}
