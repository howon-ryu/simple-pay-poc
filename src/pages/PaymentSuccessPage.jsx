import React from 'react';
import Button from '../components/common/Button';
import { formatCurrency, formatDate } from '../utils/formatters';

const PaymentSuccessPage = ({ paymentResult, onConfirm }) => {
  console.log('PaymentSuccessPage received:', paymentResult); // 디버깅용
  
  // 기본 결과가 없을 때 임시 데이터 표시
  if (!paymentResult) {
    const defaultResult = {
      success: true,
      orderNumber: '20241201-001',
      amount: 1400000,
      card: { company: 'KB국민카드', number: '**** **** **** 1234' },
      timestamp: new Date().toISOString()
    };
    
    return (
      <div className="result-page">
        <div className="result-icon success">✓</div>
        <div className="result-title">결제가 완료되었습니다</div>
        <div className="result-description">
          주문번호: {defaultResult.orderNumber}<br />
          결제금액: {formatCurrency(defaultResult.amount)}원<br />
          {defaultResult.card.company} ({defaultResult.card.number})<br />
          <div style={{ 
            fontSize: 'var(--font-sm)', 
            color: 'var(--text-muted)',
            marginTop: '8px'
          }}>
            {formatDate(defaultResult.timestamp)}
          </div>
        </div>
        
        <div>
          <Button onClick={onConfirm}>
            확인
          </Button>
        </div>
      </div>
    );
  }

  if (!paymentResult.success) {
    return null;
  }

  return (
    <div className="result-page">
      <div className="result-icon success">✓</div>
      <div className="result-title">결제가 완료되었습니다</div>
      <div className="result-description">
        주문번호: {paymentResult.orderNumber}<br />
        결제금액: {formatCurrency(paymentResult.amount)}원<br />
        {paymentResult.card.company} ({paymentResult.card.number})<br />
        <div style={{ 
          fontSize: 'var(--font-sm)', 
          color: 'var(--text-muted)',
          marginTop: '8px'
        }}>
          {formatDate(paymentResult.timestamp)}
        </div>
      </div>
      
      <div>
        <Button onClick={onConfirm}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;