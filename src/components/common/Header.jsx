

import React from 'react';

const Header = ({ 
  title, 
  onBack, 
  onClose, 
  showBackButton = true, 
  showCloseButton = true 
}) => {
  return (
    <div className="header">
      {showBackButton && (
        <button 
          className="btn-icon" 
          onClick={onBack}
          aria-label="이전"
        >
          ←
        </button>
      )}
      
      {title && <h1>{title}</h1>}
      
      {showCloseButton && (
        <button 
          className="btn-icon" 
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Header;
