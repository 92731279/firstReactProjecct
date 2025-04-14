import React from 'react';

const ErrorModal = ({ errorMessage, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Invalid Input</h3>
        <div className="error-message">{errorMessage}</div>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;