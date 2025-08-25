import React from 'react';
import Dialog from '../common/Dialog';
import Button from '../common/Button';
import { ADD_CARD_METHODS } from '../../utils/constants';

const AddCardDialog = ({ isOpen, onClose, onSelectMethod }) => {
  const handleMethodSelect = (method) => {
    onSelectMethod(method);
    onClose();
  };

  const methods = [
    {
      key: ADD_CARD_METHODS.SCAN,
      icon: '📷',
      title: '카드 스캔하기',
      description: '카메라로 카드를 스캔하여 등록'
    },
    {
      key: ADD_CARD_METHODS.MANUAL,
      icon: '✏️',
      title: '직접 입력하기',
      description: '카드 정보를 직접 입력하여 등록'
    },
    {
      key: ADD_CARD_METHODS.APP,
      icon: '📱',
      title: '앱카드 등록하기',
      description: '모바일 앱카드를 등록'
    }
  ];

  return (
    <Dialog 
      isOpen={isOpen} 
      onClose={onClose}
      title="카드 등록 방법을 선택해주세요"
    >
      <div className="dialog-options">
        {methods.map(method => (
          <button
            key={method.key}
            className="dialog-option"
            onClick={() => handleMethodSelect(method.key)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>{method.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                  {method.title}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {method.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <Button variant="secondary" onClick={onClose}>
          취소
        </Button>
      </div>
    </Dialog>
  );
};

export default AddCardDialog;