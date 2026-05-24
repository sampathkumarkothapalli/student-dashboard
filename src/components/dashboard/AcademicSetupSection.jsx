import React, { useState, useEffect } from 'react';
import academicService from '../../services/academicService';

const AcademicSetupSection = ({ subjects = [], marks = [], onDataAdded }) => {
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [showMarksForm, setShowMarksForm] = useState(false);

  const [subjectForm, setSubjectForm] = useState({ id: null, subjectCode: '', subjectName: '', customSubject: false, credits: 3, semester: '' });
  const [marksForm, setMarksForm] = useState({ subjectId: '', semester: '', internalMarks: '', externalMarks: '', classesConducted: '', classesAttended: '' });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [subjectToRemove, setSubjectToRemove] = useState(null);

  const handleAddSubject = async () => {
    try {
      await academicService.addSubject(subjectForm);
      setShowSubjectForm(false);
      setSubjectForm({ id: null, subjectCode: '', subjectName: '', customSubject: false, credits: 3, semester: '' });
      if (onDataAdded) onDataAdded();
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveSubjectClick = (s) => {
    setSubjectToRemove(s);
    setShowConfirmModal(true);
  };

  const confirmRemoveSubject = async () => {
    try {
      if (subjectToRemove) {
        await academicService.deleteSubject(subjectToRemove.id);
      }
      setShowConfirmModal(false);
      setSubjectToRemove(null);
      if (onDataAdded) onDataAdded();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditSubject = (s) => {
    setSubjectForm({
      id: s.id,
      subjectCode: s.subjectCode || '',
      subjectName: s.subjectName || '',
      customSubject: s.customSubject || false,
      credits: s.credits || 3,
      semester: s.semester || ''
    });
    setShowSubjectForm(true);
  };

  const handleAddMarks = async () => {
    try {
      await academicService.addOrUpdateMarks({
        subjectId: marksForm.subjectId,
        semester: marksForm.semester,
        internalMarks: parseFloat(marksForm.internalMarks || 0),
        externalMarks: parseFloat(marksForm.externalMarks || 0)
      });
      
      if (marksForm.classesConducted && marksForm.classesAttended) {
        await academicService.addOrUpdateAttendance({
          subjectId: marksForm.subjectId,
          semester: marksForm.semester,
          classesConducted: parseInt(marksForm.classesConducted || 0),
          classesAttended: parseInt(marksForm.classesAttended || 0)
        });
      }

      setShowMarksForm(false);
      setMarksForm({ subjectId: '', semester: '', internalMarks: '', externalMarks: '', classesConducted: '', classesAttended: '' });
      if (onDataAdded) onDataAdded();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="academic-setup" className="section">
      <div className="section-inner">
        <span className="section-badge scroll-animate">⚙️ Academic Setup</span>
        <h2 className="section-title scroll-animate">Manage Academic Data</h2>
        <p className="section-subtitle scroll-animate delay-1">
          Add your subjects and marks manually to generate your performance analytics.
        </p>

        <div className="glass-card" style={{ marginBottom: '2rem' }}>
          <h3>Subjects</h3>
          {subjects.length === 0 ? (
            <p>No subjects added yet.</p>
          ) : (
            <ul style={{ marginBottom: '1rem', listStyle: 'none', padding: 0 }}>
              {subjects.map(s => (
                <li key={s.id} style={{ padding: '0.8rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  {showConfirmModal && subjectToRemove?.id === s.id ? (
                    <div style={{ padding: '1rem', background: 'rgba(255, 107, 107, 0.1)', border: '1px solid var(--coral)', borderRadius: '8px' }}>
                      <p style={{ marginBottom: '0.8rem', fontWeight: 'bold' }}>Remove "{s.subjectName}" and all its marks?</p>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="modal-btn" onClick={() => { setShowConfirmModal(false); setSubjectToRemove(null); }} style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.1)' }}>Cancel</button>
                        <button className="modal-btn" onClick={confirmRemoveSubject} style={{ padding: '4px 12px', background: 'var(--coral)', color: '#fff' }}>Remove</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>{s.subjectName}</strong> ({s.subjectCode || 'N/A'}) - {s.semester} - {s.credits} Credits {s.customSubject && <span style={{fontSize:'0.8em', color:'var(--teal)'}}>(Custom)</span>}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-edit" onClick={() => handleEditSubject(s)} style={{ background: 'transparent', border: '1px solid var(--teal)', color: 'var(--teal)', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}>✏ Edit</button>
                        <button className="btn-remove" onClick={() => handleRemoveSubjectClick(s)} style={{ background: 'transparent', border: '1px solid var(--coral)', color: 'var(--coral)', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}>🗑 Remove</button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
          <button className="profile-edit-btn" onClick={() => setShowSubjectForm(!showSubjectForm)}>
            {showSubjectForm ? 'Cancel' : '+ Add Subject'}
          </button>

          {showSubjectForm && (
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input type="checkbox" id="customSubject" checked={subjectForm.customSubject} onChange={(e) => setSubjectForm({...subjectForm, customSubject: e.target.checked})} />
                <label htmlFor="customSubject">Others (Custom Subject)</label>
              </div>
              <input type="text" className="auth-input" placeholder="Subject Name" value={subjectForm.subjectName} onChange={e => setSubjectForm({...subjectForm, subjectName: e.target.value})} />
              <input type="text" className="auth-input" placeholder="Subject Code (Optional)" value={subjectForm.subjectCode} onChange={e => setSubjectForm({...subjectForm, subjectCode: e.target.value})} />
              <input type="number" className="auth-input" placeholder="Credits" value={subjectForm.credits} onChange={e => setSubjectForm({...subjectForm, credits: parseInt(e.target.value) || 0})} />
              <input type="text" className="auth-input" placeholder="Semester (e.g. 1-1)" value={subjectForm.semester} onChange={e => setSubjectForm({...subjectForm, semester: e.target.value})} />
              <button className="modal-btn modal-btn-primary" onClick={handleAddSubject}>Save Subject</button>
            </div>
          )}
        </div>

        <div className="glass-card">
          <h3>Marks</h3>
          {marks.length === 0 ? (
            <p>No marks added yet.</p>
          ) : (
            <ul style={{ marginBottom: '1rem', listStyle: 'none', padding: 0 }}>
              {marks.map(m => (
                <li key={m.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <strong>{m.subject?.subjectName}</strong> - Internal: {m.internalMarks}, External: {m.externalMarks}, Total: {m.totalMarks}, Grade: {m.grade}
                </li>
              ))}
            </ul>
          )}
          <button className="profile-edit-btn" onClick={() => setShowMarksForm(!showMarksForm)}>
            {showMarksForm ? 'Cancel' : '+ Add/Edit Marks'}
          </button>

          {showMarksForm && (
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <select className="auth-input" value={marksForm.subjectId} onChange={e => {
                const subId = e.target.value;
                const sub = subjects.find(s => s.id.toString() === subId);
                setMarksForm({...marksForm, subjectId: subId, semester: sub ? sub.semester : ''});
              }}>
                <option value="">Select Subject</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.subjectName} ({s.semester})</option>)}
              </select>
              <input type="number" className="auth-input" placeholder="Internal Marks" value={marksForm.internalMarks} onChange={e => setMarksForm({...marksForm, internalMarks: e.target.value})} />
              <input type="number" className="auth-input" placeholder="External Marks" value={marksForm.externalMarks} onChange={e => setMarksForm({...marksForm, externalMarks: e.target.value})} />
              <input type="number" className="auth-input" placeholder="Classes Conducted (Optional)" value={marksForm.classesConducted} onChange={e => setMarksForm({...marksForm, classesConducted: e.target.value})} />
              <input type="number" className="auth-input" placeholder="Classes Attended (Optional)" value={marksForm.classesAttended} onChange={e => setMarksForm({...marksForm, classesAttended: e.target.value})} />
              <button className="modal-btn modal-btn-primary" onClick={handleAddMarks}>Save Marks</button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation is now inline within the subject list */}
    </section>
  );
};

export default AcademicSetupSection;
