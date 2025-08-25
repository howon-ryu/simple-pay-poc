import React, { useEffect } from 'react';
import { PIN_SETTINGS } from '../../utils/constants';

const PinInput = ({ 
  pin, 
  onPinChange, 
  onComplete,
  disabled = false 
}) => {
  const handleNumberClick = (number) => {
    if (disabled || pin.length >= PIN_SETTINGS.LENGTH) return;
    
    const newPin = pin + number;
    onPinChange(newPin);
    
    if (newPin.length === PIN_SETTINGS.LENGTH && onComplete) {
      setTimeout(() => onComplete(newPin), 100);
    }
  };

  const handleBackspace = () => {
    if (disabled || pin.length === 0) return;
    onPinChange(pin.slice(0, -1));
  };

  const handleClear = () => {
    if (disabled) return;
    onPinChange('');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (disabled) return;
      
      if (event.key >= '0' && event.key <= '9') {
        handleNumberClick(event.key);
      } else if (event.key === 'Backspace') {
        handleBackspace();
      } else if (event.key === 'Delete') {
        handleClear();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [pin, disabled]);

  return (
    <div className="pin-container">
      <div className="pin-title">결제 비밀번호를 입력해주세요</div>
      <div className="pin-description">
        등록하신 {PIN_SETTINGS.LENGTH}자리 숫자를 입력해주세요
      </div>
      
      <div className="pin-dots">
        {Array.from({ length: PIN_SETTINGS.LENGTH }, (_, index) => (
          <div 
            key={index}
            className={`pin-dot ${index < pin.length ? 'filled' : ''}`}
          />
        ))}
      </div>

      <div className="keypad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
          <button
            key={number}
            className="keypad-btn"
            onClick={() => handleNumberClick(number.toString())}
            disabled={disabled}
          >
            {number}
          </button>
        ))}
        
        <button
          className="keypad-btn"
          onClick={handleBackspace}
          disabled={disabled || pin.length === 0}
          style={{ fontSize: 'var(--font-lg)' }}
        >
          ⌫
        </button>
        
        <button
          className="keypad-btn"
          onClick={() => handleNumberClick('0')}
          disabled={disabled}
        >
          0
        </button>
        
        <button
          className="keypad-btn"
          onClick={handleClear}
          disabled={disabled || pin.length === 0}
          style={{ fontSize: 'var(--font-xs)' }}
        >
          전체삭제
        </button>
      </div>
    </div>
  );
};

export default PinInput;