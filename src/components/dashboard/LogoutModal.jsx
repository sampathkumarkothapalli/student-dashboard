import React from 'react';

const LogoutModal = ({ onConfirm, onCancel }) => (
  <div className="modal-overlay" onClick={onCancel}>
    <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400 }}>
      <div className="logout-modal-body">
        <div className="logout-icon">👋</div>
        <h3 className="logout-title">Logging Out?</h3>
        <p className="logout-text">
          Are you sure you want to sign out of your dashboard?
        </p>
      </div>
      <div className="modal-footer">
        <button className="modal-btn modal-btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="modal-btn modal-btn-danger" onClick={onConfirm}>
          Yes, Logout
        </button>
      </div>
    </div>
  </div>
);

export default LogoutModal;
