import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../../context/AuthContext';
import { getUniversities, getRegulations, getBranches, getSemesters } from '../../services/syllabusService';

const ProfileSection = () => {
  const { user, updateProfile } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const [saveMsg, setSaveMsg] = useState(false);
  const fileRef = useRef(null);

  // Lock body scroll when edit modal is open
  useEffect(() => {
    if (showEdit) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showEdit]);

  const profile = {
    name: user?.fullName || '-',
    rollNumber: user?.rollNumber || '-',
    department: user?.department || '-',
    currentSemester: user?.semester || '-',
    email: user?.email || '-',
    cgpa: user?.cgpa || 0.0,
    sgpa: user?.sgpa || 0.0,
    photo: user?.photo || null,
    universityId: user?.universityId,
    regulationId: user?.regulationId,
    branchId: user?.branchId,
    initials: (user?.fullName || 'ST')
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2),
  };

  const percentage = profile.cgpa > 0 ? ((profile.cgpa * 10) - 7.5).toFixed(2) : 0;

  /* ── Edit form state ── */
  const [editForm, setEditForm] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);

  const openEdit = () => {
    setEditForm({
      fullName: profile.name,
      rollNumber: profile.rollNumber,
      department: profile.department,
      email: profile.email,
      semester: profile.currentSemester,
      university: profile.universityId || '',
      regulation: profile.regulationId || '',
      branch: profile.branchId || ''
    });
    setPhotoPreview(profile.photo);
    setSaveMsg(false);
    setShowEdit(true);
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setErrorMsg('');
    const res = await updateProfile({
      fullName: editForm.fullName,
      rollNumber: editForm.rollNumber,
      department: editForm.department,
      email: editForm.email,
      semester: editForm.semester,
      photo: photoPreview,
      university: editForm.university || null,
      regulation: editForm.regulation || null,
      branch: editForm.branch || null
    });
    setSaving(false);
    
    if (res && res.ok) {
      setShowEdit(false);
      setSaveMsg(true);
      setTimeout(() => setSaveMsg(false), 3000);
    } else {
      setErrorMsg(res?.error || 'Failed to update profile');
    }
  };

  return (
    <>
      <section id="profile" className="section profile-section">
        <div className="scroll-animate scale-in">
          <div className="profile-card">
            {profile.photo ? (
              <img src={profile.photo} alt={profile.name} className="profile-avatar-img" />
            ) : (
              <div className="profile-avatar">{profile.initials}</div>
            )}

            <h3 className="profile-name">{profile.name}</h3>
            <p className="profile-role">{profile.department}</p>

            <div className="profile-info">
              <div className="profile-info-row">
                <span className="profile-info-label">Roll Number</span>
                <span className="profile-info-value">{profile.rollNumber}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Department</span>
                <span className="profile-info-value">{profile.department}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Semester</span>
                <span className="profile-info-value">{profile.currentSemester}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Email</span>
                <span className="profile-info-value">{profile.email}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">CGPA</span>
                <span className="profile-info-value profile-cgpa-highlight">{profile.cgpa}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">SGPA</span>
                <span className="profile-info-value profile-cgpa-highlight">{profile.sgpa}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Percentage</span>
                <span className="profile-info-value">{percentage}%</span>
              </div>
            </div>

            <div className="profile-actions">
              <button className="profile-edit-btn" onClick={openEdit}>
                ✏️ Edit Profile
              </button>
            </div>

            {saveMsg && (
              <div className="save-success">✅ Profile updated successfully</div>
            )}
          </div>
        </div>
      </section>

      {showEdit && createPortal(
        <div className="modal-overlay" onClick={() => setShowEdit(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Profile</h3>
              <button className="modal-close" onClick={() => setShowEdit(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="profile-photo-upload">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="profile-photo-preview" />
                ) : (
                  <div className="profile-avatar-preview">
                    {profile.initials}
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  style={{ display: 'none' }}
                  onChange={handlePhotoChange}
                />
                <button
                  type="button"
                  className="photo-upload-btn"
                  onClick={() => fileRef.current?.click()}
                >
                  📷 Change Photo
                </button>
              </div>

              <div className="auth-form-group">
                 <label className="auth-label">Full Name</label>
                 <input type="text" className="auth-input" value={editForm.fullName || ''} onChange={(e) => handleEditChange('fullName', e.target.value)} />
              </div>
              <div className="auth-form-group">
                 <label className="auth-label">Roll Number</label>
                 <input type="text" className="auth-input" value={editForm.rollNumber || ''} onChange={(e) => handleEditChange('rollNumber', e.target.value)} />
              </div>
              <div className="auth-form-group">
                 <label className="auth-label">Email</label>
                 <input type="text" className="auth-input" value={editForm.email || ''} onChange={(e) => handleEditChange('email', e.target.value)} />
              </div>

              {/* Manual Academic Details */}
              <div className="auth-form-group">
                 <label className="auth-label">University</label>
                 <input type="text" className="auth-input" placeholder="e.g. JNTUK" value={editForm.university || ''} onChange={(e) => handleEditChange('university', e.target.value)} />
              </div>
              
              <div className="auth-form-group">
                 <label className="auth-label">Regulation</label>
                 <input type="text" className="auth-input" placeholder="e.g. R23" value={editForm.regulation || ''} onChange={(e) => handleEditChange('regulation', e.target.value)} />
              </div>
              
              <div className="auth-form-group">
                 <label className="auth-label">Branch</label>
                 <input type="text" className="auth-input" placeholder="e.g. CSE" value={editForm.branch || ''} onChange={(e) => handleEditChange('branch', e.target.value)} />
              </div>

              <div className="auth-form-group">
                 <label className="auth-label">Current Semester</label>
                 <input type="text" className="auth-input" placeholder="e.g. 4-2" value={editForm.semester || ''} onChange={(e) => handleEditChange('semester', e.target.value)} />
              </div>

            </div>

            <div className="modal-footer">
              {errorMsg && <div className="auth-field-error" style={{ width: '100%', marginBottom: '1rem', textAlign: 'center' }}>⚠️ {errorMsg}</div>}
              <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                <button className="modal-btn modal-btn-secondary" onClick={() => setShowEdit(false)} disabled={saving}>
                  Cancel
                </button>
                <button className="modal-btn modal-btn-primary" onClick={handleSave} disabled={saving}>
                  {saving ? <span className="spinner" style={{ margin: '0 auto', width: '20px', height: '20px' }} /> : '💾 Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ProfileSection;
