import React from 'react';
import Dialog from './Dialog';
import Button from './Button';

const SuccessModal = ({ isOpen, onClose, title, message, buttonText = '확인' }) => {
  return (
    <Dialog 
      isOpen={isOpen} 
      onClose={onClose}
      title={title}
    >
      <div style={{
        textAlign: 'center',
        padding: '20px 0'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px'
        }}>
          ✅
        </div>
        
        <div style={{
          fontSize: 'var(--font-md)',
          color: 'var(--text-primary)',
          lineHeight: '1.5',
          marginBottom: '24px'
        }}>
          {message}
        </div>
        
        <Button onClick={onClose}>
          {buttonText}
        </Button>
      </div>
    </Dialog>
  );
};

export default SuccessModal;