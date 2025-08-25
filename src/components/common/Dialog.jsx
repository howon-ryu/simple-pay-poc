import React from 'react';

const Dialog = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className = '' 
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="dialog-overlay" onClick={handleOverlayClick}>
      <div className={`dialog ${className}`}>
        {title && <div className="dialog-title">{title}</div>}
        {children}
      </div>
    </div>
  );
};

export default Dialog;