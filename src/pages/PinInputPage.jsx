import React, { useState } from 'react';
import Header from '../components/common/Header';
import PinInput from '../components/payment/PinInput';
import { generateOrderNumber } from '../utils/formatters';

const PinInputPage = ({ paymentData, onBack, onSuccess, onFail }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [localPin, setLocalPin] = useState('');
  
  const { selectedCard, totalAmount } = paymentData;

  const handlePinChange = (newPin) => {
    console.log('PIN changed to:', newPin);
    setLocalPin(newPin);
  };

  const handlePinComplete = async (pin) => {
    if (isProcessing) return;
    
    console.log('PIN Complete called with:', pin);
    
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // 로딩 시뮬레이션
      
      if (pin === '123456') {
        // 성공 결과 생성
        const result = {
          success: true,
          orderNumber: generateOrderNumber(),
          amount: totalAmount,
          card: selectedCard,
          timestamp: new Date().toISOString()
        };
        
        console.log('Payment success:', result);
        
        // paymentData에 결과 저장
        if (paymentData.setPaymentResult) {
          paymentData.setPaymentResult(result);
        }
        
        onSuccess();
      } else {
        const errorResult = {
          success: false,
          error: 'PIN이 올바르지 않습니다.',
          timestamp: new Date().toISOString()
        };
        
        if (paymentData.setPaymentResult) {
          paymentData.setPaymentResult(errorResult);
        }
        
        onFail();
      }
    } catch (error) {
      console.error('Payment failed:', error);
      onFail();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Header 
        title="결제 비밀번호"
        onBack={onBack}
        onClose={() => {}}
      />
      
      <PinInput
        pin={localPin}
        onPinChange={handlePinChange}
        onComplete={handlePinComplete}
        disabled={isProcessing}
      />
      
      {isProcessing && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center'
          }}>
            <div className="loading" style={{ marginBottom: '16px' }}></div>
            <div>결제 처리 중...</div>
          </div>
        </div>
      )}
    </>
  );
};

export default PinInputPage;