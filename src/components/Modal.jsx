import React from 'react';
import './modal.css'; 


const Modal = ({ isOpen, onClose, bmi, name,  healthMessage  }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>BMI Calculation Result</h2>
        <p>Hello {name} ! Your BMI is <span>{bmi}</span></p>
        <p>{healthMessage}</p>
        <p>Have a good Day!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
